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
    return this.headers.find('div').outerHeight();
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

  Fixtable.prototype._copyHeaderStyles = function() {
    var headers, newHeaders;
    if (this._headerStylesCopied) {
      return;
    }
    this._headerStylesCopied = true;
    headers = this.headers.find('th');
    newHeaders = this.headers.find('th > div');
    return headers.each(function(index, header) {
      var computedHeaderStyles, newHeader, theHeader;
      theHeader = headers[index];
      newHeader = newHeaders[index];
      computedHeaderStyles = window.getComputedStyle(theHeader);
      newHeader.style.padding = computedHeaderStyles.padding;
      newHeader.style.margin = computedHeaderStyles.margin;
      theHeader.style.padding = '0';
      return theHeader.style.margin = '0';
    });
  };

  Fixtable.prototype._setHeaderHeight = function() {
    var headerHeight, i, len, ref, th;
    ref = this.headers.find('th');
    for (i = 0, len = ref.length; i < len; i++) {
      th = ref[i];
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
