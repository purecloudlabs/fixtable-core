class Fixtable

  _bindElements: (element) ->
    @fixtable = element
    @table = @fixtable.querySelectorAll('table')[0]
    @tableHeader = @table.querySelectorAll('thead')[0]
    @fixtableHeader = @fixtable.querySelectorAll('.fixtable-header')[0]
    @fixtableFooter = @fixtable.querySelectorAll('.fixtable-footer')[0]

  _bindEvents: ->

    # re-set dimensions on window resize (with 100ms debounce to throttle)
    resizeDebounce = null
    window.addEventListener 'resize', =>
      clearTimeout resizeDebounce
      resizeDebounce = setTimeout @setDimensions.bind(@), 100

  _moveStyles: (from, to) ->
    styles = [
      'margin'
      'padding'
      'borderTop'
      'borderRight'
      'borderBottom'
      'borderLeft'
    ]
    computed = window.getComputedStyle from
    for style in styles
      to.style[style] = computed[style]
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
    if @fixtableFooter
      @fixtable.style.paddingBottom = @fixtableFooter.style.height

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
