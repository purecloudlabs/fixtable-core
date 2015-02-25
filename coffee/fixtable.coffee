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

    header.css
      'max-width': columnWidth
      'min-width': columnWidth
      'width': columnWidth

  _setHeaderHeight: ->
    @el.css 'padding-top', @_getHeaderHeight() + 'px'

  constructor: (el) ->
    @_bindElements el
    @_setHeaderHeight()
