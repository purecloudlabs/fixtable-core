var Fixtable;

Fixtable = (function() {
  Fixtable.prototype._bindElements = function(element) {
    this.fixtable = element;
    this.table = this.fixtable.querySelectorAll('table')[0];
    this.tableHeader = this.table.querySelectorAll('thead')[0];
    this.fixtableHeader = this.fixtable.querySelectorAll('.fixtable-header')[0];
    return this.fixtableFooter = this.fixtable.querySelectorAll('.fixtable-footer')[0];
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
    styles = ['margin', 'padding', 'borderTop', 'borderRight', 'borderBottom', 'borderLeft'];
    computed = window.getComputedStyle(from);
    results = [];
    for (i = 0, len = styles.length; i < len; i++) {
      style = styles[i];
      to.style[style] = computed[style];
      results.push(from.style[style] = '0');
    }
    return results;
  };

  Fixtable.prototype._getColumnHeaderMaxHeight = function() {
    var divs;
    divs = [].slice.call(this.tableHeader.querySelectorAll('th > div'));
    return Math.max.apply(null, divs.map(function(div) {
      return div.offsetHeight;
    }));
  };

  Fixtable.prototype._setColumnHeaderWidths = function() {
    var div, divs, i, len, results;
    divs = this.tableHeader.querySelectorAll('th > div');
    results = [];
    for (i = 0, len = divs.length; i < len; i++) {
      div = divs[i];
      results.push(div.style.width = div.parentNode.offsetWidth + 'px');
    }
    return results;
  };

  Fixtable.prototype._setFixtablePadding = function() {
    this.fixtable.style.paddingTop = this.fixtableHeader.style.height;
    if (this.fixtableFooter) {
      return this.fixtable.style.paddingBottom = this.fixtableFooter.style.height;
    }
  };

  Fixtable.prototype._setHeaderHeight = function() {
    var headerHeight;
    headerHeight = this._getColumnHeaderMaxHeight() + 'px';
    return this.fixtableHeader.style.height = headerHeight;
  };

  function Fixtable(element) {
    this._bindElements(element);
    this._bindEvents();
  }

  Fixtable.prototype.moveTableStyles = function() {
    var div, divs, i, len, results;
    if (this._stylesCirculated) {
      return;
    }
    this.fixtable.className += 'fixtable-styles-circulated';
    this._stylesCirculated = true;
    this._moveStyles(this.table, this.fixtable);
    divs = this.tableHeader.querySelectorAll('th > div');
    results = [];
    for (i = 0, len = divs.length; i < len; i++) {
      div = divs[i];
      results.push(this._moveStyles(div.parentNode, div));
    }
    return results;
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
    return this._setFixtablePadding();
  };

  return Fixtable;

})();

//# sourceMappingURL=fixtable.js.map
