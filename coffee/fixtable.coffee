class Fixtable

  _bindElements: (element) ->
    @fixtable = element
    @table = @fixtable.querySelectorAll('table')[0]
    @tableHeader = @table.querySelectorAll('thead')[0]
    @fixtableHeader = @fixtable.querySelectorAll('.fixtable-header')[0]

  _bindEvents: ->

    # re-set dimensions on window resize (with 100ms debounce to throttle)
    resizeDebounce = null
    window.addEventListener 'resize', =>
      clearTimeout resizeDebounce
      resizeDebounce = setTimeout @setDimensions.bind(@), 100

  _moveStyles: (from, to) ->
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
    divs = [].slice.call @tableHeader.querySelectorAll 'th > div'
    Math.max.apply null, divs.map (div) -> div.offsetHeight

  _setColumnHeaderWidths: ->
    divs = @tableHeader.querySelectorAll 'th > div'
    for div in divs
      div.style.width = div.parentNode.offsetWidth + 'px'

  _setFixtablePadding: ->
    @fixtable.style.paddingTop = @fixtableHeader.style.height
    if fixtableFooter = @fixtable.querySelectorAll('.fixtable-footer')[0]
      @fixtable.style.paddingBottom = fixtableFooter.offsetHeight + 'px'

  _setHeaderHeight: ->
    headerHeight = @_getColumnHeaderMaxHeight() + 'px'
    @fixtableHeader.style.height = headerHeight


  constructor: (element) ->
    @_bindElements element
    @_bindEvents()

  # move styles from <table> and <th> elements to their fixtable equivalents
  moveTableStyles: ->

    # only do this once
    return if @_stylesCirculated
    @fixtable.className += 'fixtable-styles-circulated'
    @_stylesCirculated = true

    # move styles from table to .fixtable
    @_moveStyles @table, @fixtable

    # move styles from header cells to child divs
    divs = @tableHeader.querySelectorAll 'th > div'
    for div in divs
      @_moveStyles div.parentNode, div

  setColumnWidth: (column, width) ->
    selector = 'th:nth-of-type(' + column + ')'
    headerCell = @tableHeader.querySelectorAll(selector)[0]
    if typeof width is 'number' then width = parseInt(width) + 'px'
    headerCell.style.width = width
    @table.style.tableLayout = 'fixed'

  setDimensions: ->
    @_setColumnHeaderWidths()
    @_setHeaderHeight()
    @_setFixtablePadding()
