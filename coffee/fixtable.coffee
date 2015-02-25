class Fixtable
  _bindElements: (el) ->
    @el = $ el
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

    for th in @headers.find 'th'
      th = $ th
      th.find('div').css
        'width': th.outerWidth()

    headerHeight = @_getHeaderHeight() + 'px'
    @el.css 'padding-top', headerHeight
    @el.find('.fixtable-header').css 'height', headerHeight

  constructor: (el) ->
    @_bindElements el
