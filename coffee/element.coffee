class Element
  @movableStyles: do ->
    Array::concat.apply [], ['margin', 'padding', 'border'].map (property) ->
      ['Top', 'Right', 'Bottom', 'Left'].map (side) -> property + side
  @moveStyles: (fromElement, toElement) ->
    toElement?.setStyles fromElement.getStyles @movableStyles
    fromElement.setStyles @movableStyles.map (style) -> [style, '0']
  addClass: (cssClass) -> @element?.classList.add cssClass
  constructor: (element) -> @element = element
  getChild: (selector) -> new Element @element?.querySelector selector
  getChildren: (selector) ->
    children = Array::slice.call @element?.querySelectorAll(selector) or []
    children.map (child) -> new Element child
  getHeight: -> @element?.offsetHeight or 0
  getScrollWidth: -> @element?.scrollWidth or 0
  getStyles: (properties) ->
    if @element then computedStyle = getComputedStyle @element
    properties.map (property) ->
      [property, computedStyle?[property]]
  getWidth: -> @element?.offsetWidth or 0
  scrollTop: -> @element?.scrollTop = 0
  setHeight: (height) -> @setStyle 'height', height
  setStyle: (property, value) ->
    if typeof value is 'number' then value = "#{parseInt(value)}px"
    @element?.style[property] = value
  setStyles: (pairs) ->
    for [property, value] in pairs
      @setStyle property, value
  setWidth: (width) -> @setStyle 'width', width

module.exports = Element
