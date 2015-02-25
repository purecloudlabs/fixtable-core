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

  _copyHeaderStyles: ->
    if @_headerStylesCopied then return
    @_headerStylesCopied = true

    headers = @headers.find 'th'
    newHeaders = @headers.find 'th > div'
    headers.each (index, header) ->
      theHeader = headers[index]
      newHeader = newHeaders[index]
      computedHeaderStyles = window.getComputedStyle(theHeader)

      # propogate header styles to fixtable headers
      newHeader.style.padding = computedHeaderStyles.padding
      newHeader.style.margin = computedHeaderStyles.margin

      # reset original header styles
      theHeader.style.padding = '0'
      theHeader.style.margin = '0'

  _setHeaderHeight: ->
    headerHeight = @_getHeaderHeight() + 'px'
    @el.css 'padding-top', headerHeight
    @el.find('.fixtable-header').css 'height', headerHeight

  constructor: (el) ->
    @_bindElements el
    @_setHeaderHeight()