(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define('fixtable', [], function () {
      return (root['Fixtable'] = factory());
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    root['Fixtable'] = factory();
  }
}(this, function () {

var Fixtable;

Fixtable = (function() {
  Fixtable.prototype._bindElements = function(element) {
    this.fixtable = element;
    this.table = this.fixtable.querySelectorAll('table')[0];
    this.tableHeader = this.table.querySelectorAll('thead')[0];
    this.fixtableHeader = this.fixtable.querySelectorAll('.fixtable-header')[0];
    this.fixtableInner = this.fixtable.querySelectorAll('.fixtable-inner')[0];
    return this.fixtableFilters = this.fixtable.querySelectorAll('.fixtable-filters')[0];
  };

  Fixtable.prototype._bindEvents = function() {
    var resizeDebounce;
    resizeDebounce = null;
    return window.addEventListener('resize', (function(_this) {
      return function() {
        clearTimeout(resizeDebounce);
        return resizeDebounce = setTimeout(_this.setDimensions.bind(_this), 100);
      };
    })(this));
  };

  Fixtable.prototype._log = function() {
    var messages;
    if (!this._DEBUG) {
      return;
    }
    messages = Array.prototype.slice.call(arguments);
    messages.unshift('[fixtable]');
    return console.log.apply(console, messages);
  };

  Fixtable.prototype._moveStyles = function(from, to) {
    var computed, i, len, results, style, styles;
    this._log('moving styles from', from, 'to', to);
    styles = ['margin-top', 'margin-right', 'margin-bottom', 'margin-left', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left', 'border-top-color', 'border-top-style', 'border-top-width', 'border-right-color', 'border-right-style', 'border-right-width', 'border-bottom-color', 'border-bottom-style', 'border-bottom-width', 'border-left-color', 'border-left-style', 'border-left-width'];
    computed = window.getComputedStyle(from);
    results = [];
    for (i = 0, len = styles.length; i < len; i++) {
      style = styles[i];
      to.style[style] = computed.getPropertyValue(style);
      results.push(from.style[style] = '0');
    }
    return results;
  };

  Fixtable.prototype._getColumnHeaderMaxHeight = function() {
    var divs, selector;
    selector = 'tr.fixtable-column-headers th > div';
    divs = [].slice.call(this.tableHeader.querySelectorAll(selector));
    return Math.max.apply(null, divs.map(function(div) {
      return div.offsetHeight;
    }));
  };

  Fixtable.prototype._getColumnFilterMaxHeight = function() {
    var divs, selector;
    selector = 'tr.fixtable-column-filters th > div';
    divs = [].slice.call(this.tableHeader.querySelectorAll(selector));
    return Math.max.apply(null, divs.map(function(div) {
      return div.offsetHeight;
    }));
  };

  Fixtable.prototype._setColumnHeaderWidths = function() {
    var column, div, divs, headerCell, i, len, selector;
    selector = 'tr.fixtable-column-headers th > div';
    divs = this.tableHeader.querySelectorAll(selector);
    for (column = i = 0, len = divs.length; i < len; column = ++i) {
      div = divs[column];
      div.style.width = div.parentNode.offsetWidth + 'px';
      headerCell = this.tableHeader.querySelector('th:nth-of-type(' + (column + 1) + ')');
      if (div.scrollWidth > div.offsetWidth) {
        this.setColumnWidth(column + 1, div.scrollWidth + 25);
        headerCell.classList.add('header-temp-width');
        this.table.style.tableLayout = 'auto';
      } else if (headerCell.classList.contains('header-temp-width')) {
        headerCell.style.width = '';
        headerCell.classList.remove('header-temp-width');
      }
    }
    if (!this.tableHeader.querySelectorAll('.header-temp-width').length) {
      return this.table.style.tableLayout = 'fixed';
    }
  };

  Fixtable.prototype._setColumnFilterWidths = function() {
    var div, divs, i, len, results, selector;
    selector = 'tr.fixtable-column-filters th > div';
    divs = this.tableHeader.querySelectorAll(selector);
    results = [];
    for (i = 0, len = divs.length; i < len; i++) {
      div = divs[i];
      results.push(div.style.width = div.parentNode.offsetWidth + 'px');
    }
    return results;
  };

  Fixtable.prototype._setFixtablePadding = function() {
    var fixtableFooter, topPadding;
    topPadding = this.fixtableHeader.offsetHeight + this.fixtableFilters.offsetHeight;
    this.fixtable.style.paddingTop = topPadding + 'px';
    if (fixtableFooter = this.fixtable.querySelectorAll('.fixtable-footer')[0]) {
      return this.fixtable.style.paddingBottom = fixtableFooter.offsetHeight + 'px';
    }
  };

  Fixtable.prototype._setHeaderHeight = function() {
    var headerHeight;
    headerHeight = this._getColumnHeaderMaxHeight() + 'px';
    return this.fixtableHeader.style.height = headerHeight;
  };

  Fixtable.prototype._setFiltersHeight = function() {
    var div, divs, filtersHeight, headerHeight, i, len, results, selector;
    filtersHeight = this._getColumnFilterMaxHeight() + 'px';
    headerHeight = this.fixtableHeader.style.height;
    if (this.fixtableFilters) {
      this.fixtableFilters.style.paddingTop = filtersHeight;
      this.fixtableFilters.style.top = headerHeight;
    }
    selector = 'tr.fixtable-column-filters th > div';
    divs = this.tableHeader.querySelectorAll(selector);
    results = [];
    for (i = 0, len = divs.length; i < len; i++) {
      div = divs[i];
      results.push(div.style.top = headerHeight);
    }
    return results;
  };

  Fixtable.prototype._tableIsRendered = function() {
    var headerDivs, selector;
    selector = 'tr.fixtable-column-headers th > div';
    headerDivs = this.fixtable.querySelectorAll(selector);
    return headerDivs.length && headerDivs[0].offsetHeight;
  };

  Fixtable.prototype._checkColumnWidthsSet = function() {
    var column, i, index, len, ref;
    ref = this._columnWidths;
    for (index = i = 0, len = ref.length; i < len; index = ++i) {
      column = ref[index];
      if (!column) {
        continue;
      }
      if (!column.set) {
        return false;
      }
    }
    return true;
  };

  Fixtable.prototype._retrySetColumnWidths = function() {
    var column, i, index, len, ref, results;
    ref = this._columnWidths;
    results = [];
    for (index = i = 0, len = ref.length; i < len; index = ++i) {
      column = ref[index];
      if (!column) {
        continue;
      }
      if (!column.set) {
        results.push(this.setColumnWidth(index, column.width));
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  function Fixtable(element, debugMode) {
    var e;
    if (debugMode == null) {
      debugMode = false;
    }
    try {
      this._bindElements(element);
      this._bindEvents();
    } catch (_error) {
      e = _error;
      console.error('Fixtable requires an element to bind to, e.g. new Fixtable(\'.fixtable\')');
    }
    this._DEBUG = debugMode;
    this._columnWidths = [];
  }

  Fixtable.prototype.moveTableStyles = function(attempts) {
    var cell, div, divs, headerCells, i, j, len, len1, results, selector;
    if (attempts == null) {
      attempts = 0;
    }
    if (++attempts > 10) {
      return;
    }
    this._log('attempt', attempts, 'of 10 to move table styles');
    if (!this._tableIsRendered()) {
      this._log('table not yet rendered; will try again momentarily');
      return setTimeout((function(_this) {
        return function() {
          return _this.moveTableStyles(attempts);
        };
      })(this), 0);
    }
    if (this._stylesCirculated) {
      return;
    }
    this.fixtable.className += ' fixtable-styles-circulated';
    this._stylesCirculated = true;
    this._moveStyles(this.table, this.fixtable);
    selector = 'tr.fixtable-column-headers th > div';
    divs = this.tableHeader.querySelectorAll(selector);
    for (i = 0, len = divs.length; i < len; i++) {
      div = divs[i];
      this._moveStyles(div.parentNode, div);
    }
    selector = 'tr.fixtable-column-filters th';
    headerCells = this.tableHeader.querySelectorAll(selector);
    results = [];
    for (j = 0, len1 = headerCells.length; j < len1; j++) {
      cell = headerCells[j];
      cell.style.margin = '0';
      cell.style.padding = '0';
      results.push(cell.style.border = '0');
    }
    return results;
  };

  Fixtable.prototype.scrollTop = function() {
    return this.fixtableInner.scrollTop = 0;
  };

  Fixtable.prototype.setColumnWidth = function(column, width, attempts) {
    var headerCell, selector;
    if (attempts == null) {
      attempts = 0;
    }
    this._columnWidths[column] = {
      width: width,
      set: false
    };
    if (++attempts > 10) {
      return;
    }
    this._log('attempt', attempts, 'of 10 to set width of column', column);
    if (!this._tableIsRendered()) {
      this._log('table not yet rendered; will try again momentarily');
      return setTimeout((function(_this) {
        return function() {
          return _this.setColumnWidth(column, width, attempts);
        };
      })(this), 1);
    }
    selector = 'th:nth-of-type(' + column + ')';
    headerCell = this.tableHeader.querySelectorAll(selector)[0];
    if (typeof width === 'number') {
      width = parseInt(width) + 'px';
    }
    this._log('setting width of column', column, 'to', width);
    headerCell.style.width = width;
    this._columnWidths[column].set = true;
    return this.table.style.tableLayout = 'fixed';
  };

  Fixtable.prototype.setDimensions = function(attempts) {
    if (attempts == null) {
      attempts = 0;
    }
    if (++attempts > 10) {
      return;
    }
    this._log('attempt', attempts, 'of 10 to set dimensions');
    if (!(this._stylesCirculated && this._checkColumnWidthsSet() && this._tableIsRendered())) {
      this.moveTableStyles();
      this._retrySetColumnWidths();
      this._log('table styles / column widths not yet done; will try again momentarily');
      return setTimeout((function(_this) {
        return function() {
          return _this.setDimensions(attempts);
        };
      })(this), 1);
    }
    this._log('proceeding to set dimensions');
    this._setColumnHeaderWidths();
    this._setHeaderHeight();
    this._setColumnFilterWidths();
    this._setFiltersHeight();
    return this._setFixtablePadding();
  };

  return Fixtable;

})();

//# sourceMappingURL=fixtable.js.map

return Fixtable;

}));
