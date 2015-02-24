(function() {
  var Fixie;

  Fixie = (function() {
    Fixie.prototype._bindElements = function(el) {
      if (typeof el === 'string') {
        this.el = $(el);
      } else {
        this.el = el;
      }
      return this.headers = this.el.find('thead');
    };

    Fixie.prototype._bindEvents = function() {};

    Fixie.prototype._getHeaderHeight = function() {
      return this.headers.find('div').outerHeight();
    };

    Fixie.prototype._setColumnWidth = function(column, columnWidth) {
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

    Fixie.prototype._setHeaderHeight = function() {
      return this.el.css('padding-top', this._getHeaderHeight() + 'px');
    };

    function Fixie(el) {
      this._bindElements(el);
      this._setHeaderHeight();
    }

    return Fixie;

  })();

}).call(this);

//# sourceMappingURL=fixtable.js.map
