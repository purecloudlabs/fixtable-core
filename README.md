# Fixtable

A grid library to present tabular data, with support for a fixed header and footer.

## Installation

`bower install fixtable`

## Usage

If you're working on an AngularJS or Ember.js app, check out the [fixtable-angular](https://github.com/MyPureCloud/fixtable-angular) or [fixtable-ember](https://github.com/MyPureCloud/fixtable-ember) projects, both of which incorporate this library and extend it with useful features like pagination, row selection, edit-in-place, and easy templating.

Otherwise, the documentation below describes how you can use the core Fixtable library on its own.

### Basic Setup

The Fixtable library consists of a script file and a stylesheet. To use it, include dist/fixtable.js and dist/fixtable.css (or preferably, their minified versions, dist/fixtable.min.js and dist/fixtable.min.css) in your project.

It's not strictly required, but for optimal display you should also make sure your project includes [Bootstrap](http://getbootstrap.com/getting-started/).

To create a Fixtable component, first you'll need to lay out some markup:

```html
<div id="my-fixtable" class="fixtable">
  <div class="fixtable-header"></div>
  <div class="fixtable-filters">
    <!-- filter fields go here; omit div if not needed -->
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
    <!-- footer content goes here; omit div if not needed -->
  </div>
</div>
```

From our JavaScript, we should then call the Fixtable constructor, passing it a reference to the root element. After constructing the Fixtable, call its `setDimensions()` method to force it to resize itself correctly.

Sample JavaScript code:
```JavaScript
var element = document.getElementById('my-fixtable');
var fixtable = new Fixtable(element);
fixtable.setDimensions();
```

### Fixed Header / Footer

Fixtable's distinguishing feature is its support for scrollable content with a fixed header and footer. All you have to do is specify a height for the Fixtable root element, and the Fixtable code will take care of the rest, including dealing with window resizes (any other events that adjust the available width or height should manually re-call `setDimensions()`).

Sample CSS:
```css
#my-fixtable {
  height: 400px;
}
```

If the content is too long to fit, the content will become scrollable, but the header and footer will be fixed -- that is, always visible regardless of scrolling.

### Styles

Fixtable wraps a standard HTML `<table>` element to create the fixed header and footer. To simplify the process of styling, and to keep Fixtable consistent with standard tables, the component will move border, padding and margin styles from the table and table header cells to the appropriate elements. Generally this "just works".

If you need to explicitly target the table or table header cells within the Fixtable component, prefix your styles with `.fixtable-styles-circulated`. This class is only added to the root element after styles are moved, so this allows for styles that will only take effect after this process.

### Fixtable API

Once created, the Fixtable instance will have the following public methods:
- `setDimensions()` - Updates styles and resizes the table
- `scrollTop()` - Programmatically scrolls to the top of the table
- `setColumnWidth(column, width)` - Updates the width of a single column. Column is identified by the 1-indexed column number. Width can be either an integer number of pixels (in which case the argument should be a Number) or a string percentage (like "50%").

After calling `setColumnWidth` on all desired columns, you should call `setDimensions` to force the Fixtable to resize itself appropriately.

## Development / Contributing
Follow these steps if you'd like to check out and run the fixtable-core source.

- Clone this repository and navigate into the project's root directory
- `npm install`
- `bower install`

To build:
- `grunt dist` or `grunt` (which will set up a watch and re-build as source files are changed)

You'll probably want to start with coffee/fixtable.coffee and css/fixtable.css, which are the CoffeeScript source file and CSS stylesheet respectively.

Automated tests may be run using `grunt test`. These also run automatically as a pre-commit hook to prevent committing any code that causes a regression.
