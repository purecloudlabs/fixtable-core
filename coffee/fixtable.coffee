class Fixtable

  _bindElements: (element) ->
    @fixtable = element
    @table = @fixtable.querySelectorAll('table')[0]
    @tableHeader = @table.querySelectorAll('thead')[0]
    @fixtableHeader = @fixtable.querySelectorAll('.fixtable-header')[0]
    @fixtableInner = @fixtable.querySelectorAll('.fixtable-inner')[0]
    @fixtableFilters = @fixtable.querySelectorAll('.fixtable-filters')[0]

  _bindEvents: ->

    # re-set dimensions on window resize (with 100ms debounce to throttle)
    resizeDebounce = null
    window.addEventListener 'resize', =>
      clearTimeout resizeDebounce
      resizeDebounce = setTimeout @setDimensions.bind(@), 100

  _log: ->
    unless @_DEBUG then return
    messages = Array::slice.call arguments
    messages.unshift '[fixtable]'
    console.log.apply console, messages

  _moveStyles: (from, to) ->
    @_log 'moving styles from', from, 'to', to
    styles = [
      'margin-top'
      'margin-right'
      'margin-bottom'
      'margin-left'
      'padding-top'
      'padding-right'
      'padding-bottom'
      'padding-left'
      'border-top-color'
      'border-top-style'
      'border-top-width'
      'border-right-color'
      'border-right-style'
      'border-right-width'
      'border-bottom-color'
      'border-bottom-style'
      'border-bottom-width'
      'border-left-color'
      'border-left-style'
      'border-left-width'
    ]
    computed = window.getComputedStyle from
    for style in styles
      to.style[style] = computed.getPropertyValue style
      from.style[style] = '0'

  _getColumnHeaderMaxHeight: ->
    selector = 'tr.fixtable-column-headers th > div'
    divs = [].slice.call @tableHeader.querySelectorAll selector
    Math.max.apply null, divs.map (div) -> div.offsetHeight

  _getColumnFilterMaxHeight: ->
    selector = 'tr.fixtable-column-filters th > div'
    divs = [].slice.call @tableHeader.querySelectorAll selector
    Math.max.apply null, divs.map (div) -> div.offsetHeight

  _setColumnHeaderWidths: ->
    selector = 'tr.fixtable-column-headers th > div'
    divs = @tableHeader.querySelectorAll selector
    for div, column in divs
      div.style.width = div.parentNode.offsetWidth + 'px'

      # increase column width if header contents overflow
      if div.scrollWidth > div.offsetWidth
        @setColumnWidth column + 1, div.scrollWidth + 10

        # override normal behavior of switching to fixed table layout
        @table.style.tableLayout = 'auto'

  _setColumnFilterWidths: ->
    selector = 'tr.fixtable-column-filters th > div'
    divs = @tableHeader.querySelectorAll selector
    for div in divs
      div.style.width = div.parentNode.offsetWidth + 'px'

  _setFixtablePadding: ->
    topPadding = @fixtableHeader.offsetHeight + @fixtableFilters.offsetHeight
    @fixtable.style.paddingTop = topPadding + 'px'
    if fixtableFooter = @fixtable.querySelectorAll('.fixtable-footer')[0]
      @fixtable.style.paddingBottom = fixtableFooter.offsetHeight + 'px'

  _setHeaderHeight: ->
    headerHeight = @_getColumnHeaderMaxHeight() + 'px'
    @fixtableHeader.style.height = headerHeight

  _setFiltersHeight: ->
    filtersHeight = @_getColumnFilterMaxHeight() + 'px'
    headerHeight = @fixtableHeader.style.height
    if @fixtableFilters
      @fixtableFilters.style.paddingTop = filtersHeight
      @fixtableFilters.style.top = headerHeight
    selector = 'tr.fixtable-column-filters th > div'
    divs = @tableHeader.querySelectorAll selector
    for div in divs
      div.style.top = headerHeight

  # check whether at least one header div is rendered in the dom
  _tableIsRendered: ->
    selector = 'tr.fixtable-column-headers th > div'
    headerDivs = @fixtable.querySelectorAll selector
    headerDivs.length and headerDivs[0].offsetHeight

  # check whether all columns that attempted to set width were successful
  _checkColumnWidthsSet: ->
    for column, index in @_columnWidths
      unless column then continue
      return false unless column.set
    return true

  _retrySetColumnWidths: ->
    for column, index in @_columnWidths
      unless column then continue
      unless column.set then @setColumnWidth index, column.width


  constructor: (element, debugMode = false) ->
    try
      @_bindElements element
      @_bindEvents()
    catch e
      console.error 'Fixtable requires an element to bind to, e.g. new Fixtable(\'.fixtable\')'

    @_DEBUG = debugMode
    @_columnWidths = []

  # move styles from <table> and <th> elements to their fixtable equivalents
  moveTableStyles: (attempts = 0) ->

    # defer up to 10x until header divs have been rendered to dom
    return if ++attempts > 10
    @_log 'attempt', attempts, 'of 10 to move table styles'
    unless @_tableIsRendered()
      @_log 'table not yet rendered; will try again momentarily'
      return setTimeout =>
        @moveTableStyles attempts
      , 0

    # only do this once
    return if @_stylesCirculated
    @fixtable.className += ' fixtable-styles-circulated'
    @_stylesCirculated = true

    # move styles from table to .fixtable
    @_moveStyles @table, @fixtable

    # move styles from header cells to child divs
    selector = 'tr.fixtable-column-headers th > div'
    divs = @tableHeader.querySelectorAll selector
    for div in divs
      @_moveStyles div.parentNode, div

    # remove styles from filter <th> elements
    selector = 'tr.fixtable-column-filters th'
    headerCells = @tableHeader.querySelectorAll selector
    for cell in headerCells
      cell.style.margin = '0'
      cell.style.padding = '0'
      cell.style.border = '0'

  scrollTop: ->
    @fixtableInner.scrollTop = 0

  setColumnWidth: (column, width, attempts = 0) ->

    @_columnWidths[column] =
      width: width
      set: false

    # defer up to 10x until header divs have been rendered to dom
    return if ++attempts > 10
    @_log 'attempt', attempts, 'of 10 to set width of column', column
    unless @_tableIsRendered()
      @_log 'table not yet rendered; will try again momentarily'
      return setTimeout =>
        @setColumnWidth column, width, attempts
      , 1

    selector = 'th:nth-of-type(' + column + ')'
    headerCell = @tableHeader.querySelectorAll(selector)[0]
    if typeof width is 'number' then width = parseInt(width) + 'px'
    @_log 'setting width of column', column, 'to', width
    headerCell.style.width = width
    @_columnWidths[column].set = true
    @table.style.tableLayout = 'fixed'

  setDimensions: (attempts = 0) ->

    # defer up to 10x until styles have been circulated
    return if ++attempts > 10
    @_log 'attempt', attempts, 'of 10 to set dimensions'
    unless @_stylesCirculated and @_checkColumnWidthsSet() and @_tableIsRendered()
      @moveTableStyles()
      @_retrySetColumnWidths()
      @_log 'table styles / column widths not yet done; will try again momentarily'
      return setTimeout =>
        @setDimensions attempts
      , 1

    @_log 'proceeding to set dimensions'
    @_setColumnHeaderWidths()
    @_setHeaderHeight()
    @_setColumnFilterWidths()
    @_setFiltersHeight()
    @_setFixtablePadding()
