# Fixtable
A grid library to present tabular data, with support for a fixed header and footer.

## Installation

`bower install fixtable`

## Usage

If you're working on an Angular app, check out the [Fixtable-Angular](https://github.com/MyPureCloud/fixtable-angular) project, which provides an Angular wrapper around the core Fixtable functionality. Fixtable-Angular also adds useful features like support for pagination, a loading indicator, editing data in-place, and easy templating.

If you're not using Angular, the documentation below describes how you can use the core Fixtable library on its own.

### Basic Setup

The Fixtable library consists of a script file and a stylesheet. To use it, include dist/fixtable.js and dist/fixtable.css (or preferably, their minified versions, dist/fixtable.min.js and dist/fixtable.min.css) in your project.

It's not strictly required, but for optimal display you should also make sure your project includes [Bootstrap 3](http://getbootstrap.com/getting-started/).

To create a Fixtable, first you'll need to lay out some markup. At the top level, you need a div element to contain the Fixtable.

- The container div should have the `fixtable` CSS class.
- The container div should contain another div with the `fixtable-header` CSS class. (The header div is outside of the table and should not include any content.)
- Optionally, the container may include a div with the `fixtable-filters` class. This is where you should place fields used for filtering the table.
- The container div should include a div with the `fixtable-inner` class, which in turns contains a table element with the CSS class `table`. If you want to use the Fixtable's fixed header functionality, the table's thead element should contain a tr element with the class `fixtable-column-headers`.
- Optionally, the container may include a div with the `fixtable-footer` class. This would be an ideal location for pagination controls, for example.

Sample HTML markup:
```html
<div id="my-fixtable" class="fixtable">
  <div class="fixtable-header"></div>
  <div class="fixtable-filters">
    <!-- filter fields go here -->
  </div>
  <div class="fixtable-inner">
    <table class="table">
      <thead>
        <tr class="fixtable-column-headers">
          <!-- column headers go here -->
        </tr>
      </thead>
      <tbody>
        <!-- rows go here -->
      </tbody>
    </table>
  </div>
  <div class="fixtable-footer">
    <!-- footer content goes here -->
  </div>
</div>
```

From our JavaScript, we should then call the Fixtable constructor, passing it a reference to the container element. After constructing the Fixtable, invoke its `setDimensions()` method to force it to resize itself correctly.

Sample JavaScript code:
```JavaScript
var element = document.getElementById('my-fixtable');
var fixtable = new Fixtable(element);
fixtable.setDimensions();
```

### Fixed Header / Footer


### Fixtable API

Once created, the Fixtable instance will have the following public properties:
- `fixtable` (*HTMLElement*) - The DOM element passed into into the constructor
- `table` (*HTMLElement*) - The table element inside of the 'fixtable' element
- `tableHeader` (*HTMLElement*) - The thead element within the table
- `fixtableHeader` (*HTMLElement*) - The element inside the fixtable with the 'fixtable-header' CSS class, meant to reserve space for the fixed header
- `fixtableInner` (*HTMLElement*) - The element inside the fixtable with the 'fixtable-inner' CSS class, meant to host the actual table element
- `fixtableFilters` (*HTMLElement*) - An element inside the fixtable with the 'fixtable-filters' CSS class, meant to host any filters for the table

It has the following public methods:
- `setDimensions()` - Updates styles and resizes the table
- `scrollTop()` - Programmatically scrolls to the top of the table
- `setColumnWidth(column, width)` - Updates the width of a single column. Column is identified by the 1-indexed column number. Width can be either an integer number of pixels (in which case the param should be a Number) or a string percentage (like "50%").

After calling `setColumnWidth`, you should call `setDimensions` to force the Fixtable to resize itself appropriately.

## Development / Contributing
Follow these steps if you'd like to check out and run the fixtable-core source.

- Clone this repository and navigate into the project's root directory
- `npm install`
- `bower install`

To build:
- `grunt`

You'll probably want to start with coffee/fixtable.coffee and css/fixtable.css, which are the CoffeeScript source file and CSS stylesheet respectively.
