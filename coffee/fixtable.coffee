class Fixtable

  _bindElements: (el) ->
    @el = $ el
    @headers = @el.find 'thead'

  _bindEvents: ->
    console.log 'foo'

  _getHeaderHeight: ->
    Math.max.apply null, @headers.find('div').map (i, div) -> $(div).outerHeight()

  _setColumnWidth: (column, columnWidth) ->
    if typeof column is 'number'
      header = @headers.find 'th:nth-of-type(' + column + ')'
    else if typeof column is 'object'
      header = column
    else
      header = @headers.find column

    if typeof columnWidth is 'number'
      columnWidth = parseInt(columnWidth) + 'px'

    header.css
      'width': columnWidth

  _circulateStyles: ->
    if @_stylesCirculated then return
    @_stylesCirculated = true
    @el.addClass 'fixtable-styles-circulated'

    headers = @headers.find 'th'
    newHeaders = @headers.find 'th > div'
    headers.each (index, header) ->
      theHeader = headers[index]
      newHeader = newHeaders[index]
      computedHeaderStyles = window.getComputedStyle(theHeader)

      # propagate header styles to fixtable headers
      newHeader.style.padding = computedHeaderStyles.padding
      newHeader.style.margin = computedHeaderStyles.margin
      newHeader.style.border = computedHeaderStyles.border

      # reset original header styles
      theHeader.style.padding = '0'
      theHeader.style.margin = '0'
      theHeader.style.border = 'none'

    theTable = @el.find('table').get(0)
    computedTableStyles = window.getComputedStyle(theTable)
    @el.css 
      padding: computedTableStyles.padding
      margin: computedTableStyles.margin
      border: computedTableStyles.border

    theTable.style.padding = '0'
    theTable.style.margin = '0'
    theTable.style.border = 'none'


  _setHeaderHeight: ->

    for th in @headers.find 'th'
      th = $ th
      th.find('div').css
        'width': th.outerWidth()

    headerHeight = @_getHeaderHeight() + 'px'
    @el.css 'padding-top', headerHeight
    @el.find('.fixtable-header').css 'height', headerHeight

  _setFooterHeight: ->
    footer = @el.find '.fixtable-footer'
    footerHeight = footer.css 'height'
    @el.css 'padding-bottom', footerHeight

  constructor: (el) ->
    @_bindElements el
    timeout = null
    window.addEventListener 'resize', =>
      clearTimeout timeout
      timeout = setTimeout @_setHeaderHeight.bind(@), 100
