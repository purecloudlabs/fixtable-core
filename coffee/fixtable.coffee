class Fixtable
  _bindElements: (el) ->
    if typeof el is 'string'
      @el = $ el
    else
      @el = el

    @headers = @el.find 'thead'

  _bindEvents: ->
    console.log 'foo'

  _getHeaderHeight: ->
    return @headers.find('div').outerHeight()

  _setColumnWidth: (column, columnWidth) ->
    if typeof column is 'number'
      header = @headers.find 'th:nth-of-type(' + column + ')'
    else if typeof column is 'object'
      header = column
    else
      header = @headers.find column

    columnWidth = parseInt(columnWidth) + 'px'

    @_copyHeaderStyle()

    header.css
      'max-width': columnWidth
      'min-width': columnWidth
      'width': columnWidth
      'padding': 0
      'margin': 0

  _copyHeaderStyle: (header) ->
    # headerStyles = window.getComputedStyle(header.get(0),null).cssText 

    header.find('div').css
      padding: header.css('padding')
      margin: header.css('margin')

  _setHeaderHeight: ->
    headerHeight = @_getHeaderHeight() + 'px'
    @el.css 'padding-top', headerHeight
    @el.find('.fixtable-header').css 'height', headerHeight

    header
    @headers.find('th:first').css('padding')


  constructor: (el) ->
    @_bindElements el
    @_setHeaderHeight()
