class Element

  # static property listing all styles to be moved from one element to another
  @movableStyles: do ->
    Array::concat.apply [], ['margin', 'padding', 'border'].map (property) ->
      ['Top', 'Right', 'Bottom', 'Left'].map (side) ->
        property + side

  # static method to move style properties from one element to another
  # (toElement can be left empty to simply remove styles from an element)
  @moveStyles: (fromElement, toElement) ->
    toElement?.setStyles fromElement.getStyles @movableStyles
    fromElement.setStyles @movableStyles.map (style) ->
      [style, '0']

  addClass: (cssClass) ->
    @element?.classList.add cssClass

  constructor: (element) ->
    @element = element

  # search for child html element; always returns an Element instance
  # (Element.element will be undefined if selector had no match)
  getChild: (selector) ->
    new Element @element?.querySelector selector

  # search for child html elements; returns an array of Element instances
  # (this array will be empty if selector had no matches)
  getChildren: (selector) ->
    children = Array::slice.call @element?.querySelectorAll(selector) or []
    children.map (child) ->
      new Element child

  getHeight: ->
    @element?.offsetHeight or 0

  getScrollWidth: ->
    @element?.scrollWidth or 0

  # given a list of style properties, return an array of property/value pairs
  # (e.g., [['position', 'absolute'], ['top', '0px']])
  getStyles: (properties) ->
    if @element then computedStyle = getComputedStyle @element
    properties.map (property) ->
      [property, computedStyle?[property]]

  getWidth: ->
    @element?.offsetWidth or 0

  scrollTop: ->
    @element?.scrollTop = 0

  setHeight: (height) ->
    @setStyle 'height', height

  # update element style, given a property & value (numbers assumed to be px)
  setStyle: (property, value) ->
    if typeof value is 'number' then value = "#{parseInt(value)}px"
    @element?.style[property] = value

  # set many styles at once, given pairs like those returned by getStyles()
  setStyles: (pairs) ->
    for [property, value] in pairs
      @setStyle property, value

  setWidth: (width) ->
    @setStyle 'width', width

module.exports = Element
