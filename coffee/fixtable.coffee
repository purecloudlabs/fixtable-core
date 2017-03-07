Element = require './element'
Logger = require './logger'

class Fixtable

  # static method factory for creating instance methods that will not run
  # until the component has fully rendered (deferring up to 10 times)
  @_postRenderFunction: (fnName, fn) ->
    attempts = 0
    ->
      @logger.log fnName, arguments, 'attempt', ++attempts
      argumentsCopy = Array::slice.call arguments
      if @_isRendered()
        fn.apply @, argumentsCopy
        attempts = 0
      else if attempts < 10
        @logger.log "not yet rendered, deferring #{fnName}"
        setTimeout (=> @[fnName].apply @, argumentsCopy), 1
      else
        attempts = 0

  # re-run setDimensions() on window resize (with 100ms debounce)
  _addResizeListener: ->
    debounce = null
    addEventListener 'resize', =>
      clearTimeout debounce
      debounce = setTimeout @setDimensions.bind(@), 100

  # check whether at least one header label has rendered
  _isRendered: ->
    @element.getChild('th > div').getHeight()

  # move styles from table elements to corresponding fixtable elements
  _moveStyles: do ->
    Fixtable._postRenderFunction '_moveStyles', ->
      unless @stylesCirculated
        Element.moveStyles @tableElement, @element
        @columnHeaders.getChildren('th').forEach (th) ->
          Element.moveStyles th, th.getChild 'div'
        @columnFilters.getChildren('th').forEach (th) ->
          Element.moveStyles th
        @element.addClass 'fixtable-styles-circulated'
        @stylesCirculated = true

  # create element instances from key fixtable elements
  _registerElements: do ->
    Fixtable._postRenderFunction '_registerElements', ->
      @tableElement = @element.getChild 'table'
      @headerElement = @element.getChild '.fixtable-header'
      @filtersElement = @element.getChild '.fixtable-filters'
      @columnHeaders = @element.getChild 'tr.fixtable-column-headers'
      @columnFilters = @element.getChild 'tr.fixtable-column-filters'
      @footerElement = @element.getChild '.fixtable-footer'

  constructor: (element, debugMode = false) ->

    # ensure the component root html element was supplied
    unless element instanceof HTMLElement
      throw new Error 'Fixtable requires root HTML element of component'

    # create an Element instance from the component root html element
    @element = new Element element

    # configure logger and log init message
    @logger = new Logger debugMode, ['[fixtable]', @element]
    @logger.log 'initializing'

    # do one-time setup
    @_addResizeListener()
    @_registerElements()
    @_moveStyles()

  # programmatically return scroll position to top of table
  scrollTop: ->
    @element.getChild('.fixtable-inner').scrollTop()

  # set preferred width for a column (by column index, starting at 1)
  setColumnWidth: do ->
    Fixtable._postRenderFunction 'setColumnWidth', (columnIndex, width) ->
      @columnHeaders.getChild("th:nth-of-type(#{columnIndex})").setWidth width
      @tableElement.setStyle 'tableLayout', 'fixed'

  # re-calculate width and height of dynamic elements
  setDimensions: do ->
    Fixtable._postRenderFunction 'setDimensions', ->

      unless @stylesCirculated
        @_registerElements()
        @_moveStyles()

      headerCells = @columnHeaders.getChildren 'th'
      filterCells = @columnFilters.getChildren 'th'

      # remove column label heights (so they're re-calculated on each pass)
      headerCells.forEach (th) ->
        th.getChild('div').setHeight 'auto'

      # update width of column labels to match column width
      headerCells.forEach (th) ->
        th.getChild('div').setWidth th.getWidth()

      # update all column labels & header element to height of tallest label
      tallestLabel = Math.max.apply null, headerCells.map (th) ->
        th.getChild('div').getHeight()
      headerCells.forEach (th) ->
        th.getChild('div').setHeight tallestLabel
      @headerElement.setHeight tallestLabel

      # ensure column header labels don't overflow parent table cells
      headerCells.forEach (th) =>
        div = th.getChild 'div'
        if div.getScrollWidth() > div.getWidth()
          th.setWidth div.getScrollWidth() + 25
          th.addClass 'header-temp-width'
          @tableElement.setStyle 'tableLayout', 'auto'

      # update width of filters to match column width
      filterCells.forEach (th) ->
        th.getChild('div').setWidth th.getWidth()

      # update height and position of column filters
      tallestFilter = Math.max.apply null, filterCells.map (th) ->
        th.getChild('div').getHeight()
      filterCells.forEach (th) ->
        th.getChild('div').setHeight tallestFilter
        th.getChild('div').setStyle 'top', tallestLabel

      # update position of div behind column filters
      @filtersElement.setStyle 'paddingTop', tallestFilter
      @filtersElement.setStyle 'top', tallestLabel

      # set padding on fixtable element to clear space behind header & footer
      paddingTop = @headerElement.getHeight() + @filtersElement.getHeight()
      paddingBottom = @footerElement.getHeight()
      @element.setStyle 'paddingTop', paddingTop
      @element.setStyle 'paddingBottom', paddingBottom

      # force browser to repaint column headers
      @columnHeaders.setStyle 'display', 'none'
      @columnHeaders.getHeight()
      @columnHeaders.setStyle 'display', 'table-row'

module.exports = Fixtable
