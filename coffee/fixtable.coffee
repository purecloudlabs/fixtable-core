Element = require './element'
Logger = require './logger'

class Fixtable

  @postRenderFunction: (fnName, fn) ->
    attempts = 0
    ->
      @logger.log fnName, arguments, 'attempt', ++attempts
      argumentsCopy = Array::slice.call arguments
      if @isRendered()
        fn.apply @, argumentsCopy
        attempts = 0
      else if attempts < 10
        @logger.log "not yet rendered, deferring #{fnName}"
        setTimeout (=> @[fnName].apply @, argumentsCopy), 1
      else
        attempts = 0

  constructor: (element, debugMode = false) ->
    unless element instanceof HTMLElement
      throw new Error 'Fixtable requires root HTML element of component'
    @element = new Element element
    @logger = new Logger debugMode, ['[fixtable]', @element]
    @logger.log 'initializing'
    @addResizeListener()
    @registerElements()
    @moveStyles()

  # re-run setDimensions() on window resize (with 100ms debounce)
  addResizeListener: ->
    debounce = null
    addEventListener 'resize', =>
      clearTimeout debounce
      debounce = setTimeout @setDimensions.bind(@), 100

  isRendered: -> @element.getChild('th > div').getHeight()

  # move styles from table elements to corresponding fixtable elements
  moveStyles: do ->
    Fixtable.postRenderFunction 'moveStyles', ->
      Element.moveStyles @tableElement, @element
      @columnHeaders.getChildren('th').forEach (th) ->
        Element.moveStyles th, th.getChild 'div'
      @columnFilters.getChildren('th').forEach (th) ->
        Element.moveStyles th
      @element.addClass 'fixtable-styles-circulated'

  # create element instance from key fixtable elements
  registerElements: do ->
    Fixtable.postRenderFunction 'registerElements', ->
      @tableElement = @element.getChild 'table'
      @headerElement = @element.getChild '.fixtable-header'
      @filtersElement = @element.getChild '.fixtable-filters'
      @columnHeaders = @element.getChild 'tr.fixtable-column-headers'
      @columnFilters = @element.getChild 'tr.fixtable-column-filters'
      @footerElement = @element.getChild '.fixtable-footer'

  # programmatically return scroll position to top of table
  scrollTop: -> @element.getChild('.fixtable-inner').scrollTop()

  setColumnWidth: do ->
    Fixtable.postRenderFunction 'setColumnWidth', (columnIndex, width) ->
      @columnHeaders.getChild("th:nth-of-type(#{columnIndex})").setWidth width
      @tableElement.setStyle 'tableLayout', 'fixed'

  # re-calculate width and height of dynamic elements
  setDimensions: do ->
    Fixtable.postRenderFunction 'setDimensions', ->

      headerCells = @columnHeaders.getChildren 'th'
      filterCells = @columnFilters.getChildren 'th'

      # update width of column labels to match column width
      headerCells.forEach (th) -> th.getChild('div').setWidth th.getWidth()

      # update all column labels & header element to height of tallest label
      tallestLabel = Math.max.apply null, headerCells.map (th) ->
        th.getChild('div').getHeight()
      headerCells.forEach (th) -> th.getChild('div').setHeight tallestLabel
      @headerElement.setHeight tallestLabel

      # ensure column header labels don't overflow parent table cells
      headerCells.forEach (th) =>
        div = th.getChild 'div'
        if div.getScrollWidth() > div.getWidth()
          th.setWidth div.getScrollWidth() + 25
          th.addClass 'header-temp-width'
          @tableElement.setStyle 'tableLayout', 'auto'

      # update width of filters to match column width
      filterCells.forEach (th) -> th.getChild('div').setWidth th.getWidth()

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
