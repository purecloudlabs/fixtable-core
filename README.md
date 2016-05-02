# Fixtable
A grid library to present tabular data

### Installation

`bower install fixtable`

### Usage

The Fixtable library consists of a script file and a stylesheet. To use it, include dist/fixtable.js and dist/fixtable.css (or preferably, their minified versions, dist/fixtable.min.js and dist/fixtable.min.css) in your project. You should also make sure your project includes [Bootstrap 3](http://getbootstrap.com/getting-started/).

To create a Fixtable, first you'll need to lay out some markup. At the top level, you need a div element to contain the Fixtable.

- The container div should have the `fixtable` CSS class.
- The container div should contain another div with the `fixtable-header` CSS class. (The header div is outside of the table and should not include any content.)
- Optionally, the container may include a div with the `fixtable-filters` class.
- The container div should include a div with the `fixtable-inner` class, which in turns contains a table element with the CSS class `table`.

Sample HTML markup:
```html
<div id="my-fixtable" class="fixtable">
  <div class="fixtable-header"></div>
  <div class="fixtable-filters"></div>
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
</div>
```

From our JavaScript, we should then call the Fixtable constructor, passing it a reference to the container element. After constructing the Fixtable, call its `setDimensions()` method to force it to resize itself correctly.

Sample JavaScript code:
```JavaScript
var element = document.getElementById('my-fixtable');
var fixtable = new Fixtable(element);
fixtable.setDimensions();
```

Once created, the Fixtable instance will have the following public properties:
- fixtable (HTMLElement) - The DOM element passed into into the constructor
- table (HTMLElement) - The table element inside of the 'fixtable' element
- tableHeader (HTMLElement) - The thead element within the table
- fixtableHeader (HTMLElement) - The element inside the fixtable with the 'fixtable-header' CSS class, meant to reserve space for the fixed header
- fixtableInner (HTMLElement) - The element inside the fixtable with the 'fixtable-inner' CSS class, meant to host the actual table element
- fixtableFilters (HTMLElement) - An element inside the fixtable with the 'fixtable-filters' CSS class, meant to host any filters for the table

It has the following public methods:
- setDimensions() - Updates styles and resizes the table
- scrollTop() - Programmatically scrolls to the top of the table
- setColumnWidth(column, width) - Attempts to update the width of a single column. Column is identified by the 1-indexed column number. Width should be an integer number of pixels.

### Getting Started
Follow these steps if you'd like to check out and run the fixtable-core source.

- Clone this repository and navigate into the project's root directory
- `npm install`
- `bower install`

To build:
- `grunt`
