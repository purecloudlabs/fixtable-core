var Fixtable;

Fixtable = (function() {
  Fixtable.prototype._bindElements = function(el) {
    this.el = $(el);
    return this.headers = this.el.find('thead');
  };

  Fixtable.prototype._bindEvents = function() {
    return console.log('foo');
  };

  Fixtable.prototype._getHeaderHeight = function() {
    return Math.max.apply(null, this.headers.find('div').map(function(i, div) {
      return $(div).outerHeight();
    }));
  };

  Fixtable.prototype._setColumnWidth = function(column, columnWidth) {
    var header;
    if (typeof column === 'number') {
      header = this.headers.find('th:nth-of-type(' + column + ')');
    } else if (typeof column === 'object') {
      header = column;
    } else {
      header = this.headers.find(column);
    }
    columnWidth = parseInt(columnWidth) + 'px';
    return header.css({
      'max-width': columnWidth,
      'min-width': columnWidth,
      'width': columnWidth
    });
  };

  Fixtable.prototype._circulateStyles = function() {
    var computedTableStyles, headers, newHeaders, theTable;
    if (this._stylesCirculated) {
      return;
    }
    this._stylesCirculated = true;
    headers = this.headers.find('th');
    newHeaders = this.headers.find('th > div');
    headers.each(function(index, header) {
      var computedHeaderStyles, newHeader, theHeader;
      theHeader = headers[index];
      newHeader = newHeaders[index];
      computedHeaderStyles = window.getComputedStyle(theHeader);
      newHeader.style.padding = computedHeaderStyles.padding;
      newHeader.style.margin = computedHeaderStyles.margin;
      newHeader.style.border = computedHeaderStyles.border;
      theHeader.style.padding = '0';
      theHeader.style.margin = '0';
      return theHeader.style.border = 'none';
    });
    theTable = this.el.find('table').get(0);
    computedTableStyles = window.getComputedStyle(theTable);
    this.el.css({
      padding: computedTableStyles.padding,
      margin: computedTableStyles.margin,
      border: computedTableStyles.border
    });
    theTable.style.padding = '0';
    theTable.style.margin = '0';
    return theTable.style.border = 'none';
  };

  Fixtable.prototype._setHeaderHeight = function() {
    var headerHeight, j, len, ref, th;
    ref = this.headers.find('th');
    for (j = 0, len = ref.length; j < len; j++) {
      th = ref[j];
      th = $(th);
      th.find('div').css({
        'width': th.outerWidth()
      });
    }
    headerHeight = this._getHeaderHeight() + 'px';
    this.el.css('padding-top', headerHeight);
    return this.el.find('.fixtable-header').css('height', headerHeight);
  };

  function Fixtable(el) {
    this._bindElements(el);
  }

  return Fixtable;

})();

//# sourceMappingURL=fixtable.js.map
