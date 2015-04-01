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

  Fixtable.prototype._moveStyles = function(from, to) {
    var computed, i, len, results, style, styles;
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
    var div, divs, i, len, results, selector;
    selector = 'tr.fixtable-column-headers th > div';
    divs = this.tableHeader.querySelectorAll(selector);
    results = [];
    for (i = 0, len = divs.length; i < len; i++) {
      div = divs[i];
      results.push(div.style.width = div.parentNode.offsetWidth + 'px');
    }
    return results;
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

  function Fixtable(element) {
    this._bindElements(element);
    this._bindEvents();
  }

  Fixtable.prototype.moveTableStyles = function() {
    var cell, div, divs, headerCells, i, j, len, len1, results, selector;
    if (this._stylesCirculated) {
      return;
    }
    this.fixtable.className += 'fixtable-styles-circulated';
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

  Fixtable.prototype.setColumnWidth = function(column, width) {
    var headerCell, selector;
    selector = 'th:nth-of-type(' + column + ')';
    headerCell = this.tableHeader.querySelectorAll(selector)[0];
    if (typeof width === 'number') {
      width = parseInt(width) + 'px';
    }
    headerCell.style.width = width;
    return this.table.style.tableLayout = 'fixed';
  };

  Fixtable.prototype.setDimensions = function() {
    this._setColumnHeaderWidths();
    this._setHeaderHeight();
    this._setColumnFilterWidths();
    this._setFiltersHeight();
    return this._setFixtablePadding();
  };

  return Fixtable;

})();

//# sourceMappingURL=fixtable.js.map
