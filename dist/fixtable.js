(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Fixtable"] = factory();
	else
		root["Fixtable"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

(function() {
  var Element;

  Element = (function() {
    Element._movableStyles = (function() {
      return Array.prototype.concat.apply([], ['margin', 'padding', 'border'].map(function(property) {
        return ['Top', 'Right', 'Bottom', 'Left'].map(function(side) {
          return property + side;
        });
      }));
    })();

    Element.moveStyles = function(fromElement, toElement) {
      if (toElement != null) {
        toElement.setStyles(fromElement.getStyles(this._movableStyles));
      }
      return fromElement.setStyles(this._movableStyles.map(function(style) {
        return [style, '0'];
      }));
    };

    Element.prototype.addClass = function(cssClass) {
      var ref;
      return (ref = this.element) != null ? ref.classList.add(cssClass) : void 0;
    };

    function Element(element) {
      this.element = element;
    }

    Element.prototype.getChild = function(selector) {
      var ref;
      return new Element((ref = this.element) != null ? ref.querySelector(selector) : void 0);
    };

    Element.prototype.getChildren = function(selector) {
      var children, ref;
      children = Array.prototype.slice.call(((ref = this.element) != null ? ref.querySelectorAll(selector) : void 0) || []);
      return children.map(function(child) {
        return new Element(child);
      });
    };

    Element.prototype.getHeight = function() {
      var ref;
      return ((ref = this.element) != null ? ref.offsetHeight : void 0) || 0;
    };

    Element.prototype.getScrollWidth = function() {
      var ref;
      return ((ref = this.element) != null ? ref.scrollWidth : void 0) || 0;
    };

    Element.prototype.getStyles = function(properties) {
      var computedStyle;
      if (this.element) {
        computedStyle = getComputedStyle(this.element);
      }
      return properties.map(function(property) {
        return [property, computedStyle != null ? computedStyle[property] : void 0];
      });
    };

    Element.prototype.getWidth = function() {
      var ref;
      return ((ref = this.element) != null ? ref.offsetWidth : void 0) || 0;
    };

    Element.prototype.scrollTop = function() {
      var ref;
      return (ref = this.element) != null ? ref.scrollTop = 0 : void 0;
    };

    Element.prototype.setHeight = function(height) {
      return this.setStyle('height', height);
    };

    Element.prototype.setStyle = function(property, value) {
      var ref;
      if (typeof value === 'number') {
        value = (parseInt(value)) + "px";
      }
      return (ref = this.element) != null ? ref.style[property] = value : void 0;
    };

    Element.prototype.setStyles = function(pairs) {
      var i, len, property, ref, results, value;
      results = [];
      for (i = 0, len = pairs.length; i < len; i++) {
        ref = pairs[i], property = ref[0], value = ref[1];
        results.push(this.setStyle(property, value));
      }
      return results;
    };

    Element.prototype.setWidth = function(width) {
      return this.setStyle('width', width);
    };

    return Element;

  })();

  module.exports = Element;

}).call(this);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

(function() {
  var Logger;

  Logger = (function() {
    function Logger(debugMode, prefix) {
      if (debugMode == null) {
        debugMode = false;
      }
      if (prefix == null) {
        prefix = [];
      }
      this.debugMode = debugMode;
      this.prefix = prefix instanceof Array ? prefix : [prefix];
    }

    Logger.prototype.log = function() {
      if (this.debugMode) {
        return console.log.apply(console, Array.prototype.concat.apply(this.prefix, arguments));
      }
    };

    return Logger;

  })();

  module.exports = Logger;

}).call(this);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

(function() {
  var Element, Fixtable, Logger;

  Element = __webpack_require__(0);

  Logger = __webpack_require__(1);

  Fixtable = (function() {
    Fixtable._postRenderFunction = function(fnName, fn) {
      var attempts;
      attempts = 0;
      return function() {
        var argumentsCopy;
        this.logger.log(fnName, arguments, 'attempt', ++attempts);
        argumentsCopy = Array.prototype.slice.call(arguments);
        if (this._isRendered()) {
          fn.apply(this, argumentsCopy);
          return attempts = 0;
        } else if (attempts < 10) {
          this.logger.log("not yet rendered, deferring " + fnName);
          return setTimeout(((function(_this) {
            return function() {
              return _this[fnName].apply(_this, argumentsCopy);
            };
          })(this)), 1);
        } else {
          return attempts = 0;
        }
      };
    };

    Fixtable.prototype._addResizeListener = function() {
      var debounce;
      debounce = null;
      return addEventListener('resize', (function(_this) {
        return function() {
          clearTimeout(debounce);
          return debounce = setTimeout(_this.setDimensions.bind(_this), 100);
        };
      })(this));
    };

    Fixtable.prototype._isRendered = function() {
      return this.element.getChild('th > div').getHeight();
    };

    Fixtable.prototype._moveStyles = (function() {
      return Fixtable._postRenderFunction('_moveStyles', function() {
        if (!this.stylesCirculated) {
          Element.moveStyles(this.tableElement, this.element);
          this.columnHeaders.getChildren('th').forEach(function(th) {
            return Element.moveStyles(th, th.getChild('div'));
          });
          this.columnFilters.getChildren('th').forEach(function(th) {
            return Element.moveStyles(th);
          });
          this.element.addClass('fixtable-styles-circulated');
          return this.stylesCirculated = true;
        }
      });
    })();

    Fixtable.prototype._registerElements = (function() {
      return Fixtable._postRenderFunction('_registerElements', function() {
        this.tableElement = this.element.getChild('table');
        this.headerElement = this.element.getChild('.fixtable-header');
        this.filtersElement = this.element.getChild('.fixtable-filters');
        this.columnHeaders = this.element.getChild('tr.fixtable-column-headers');
        this.columnFilters = this.element.getChild('tr.fixtable-column-filters');
        return this.footerElement = this.element.getChild('.fixtable-footer');
      });
    })();

    function Fixtable(element, debugMode) {
      if (debugMode == null) {
        debugMode = false;
      }
      if (!(element instanceof HTMLElement)) {
        throw new Error('Fixtable requires root HTML element of component');
      }
      this.element = new Element(element);
      this.logger = new Logger(debugMode, ['[fixtable]', this.element]);
      this.logger.log('initializing');
      this._addResizeListener();
      this._registerElements();
      this._moveStyles();
    }

    Fixtable.prototype.scrollTop = function() {
      return this.element.getChild('.fixtable-inner').scrollTop();
    };

    Fixtable.prototype.setColumnWidth = (function() {
      return Fixtable._postRenderFunction('setColumnWidth', function(columnIndex, width) {
        this.columnHeaders.getChild("th:nth-of-type(" + columnIndex + ")").setWidth(width);
        return this.tableElement.setStyle('tableLayout', 'fixed');
      });
    })();

    Fixtable.prototype.setDimensions = (function() {
      return Fixtable._postRenderFunction('setDimensions', function() {
        var filterCells, headerCells, paddingBottom, paddingTop, tallestFilter, tallestLabel;
        if (!this.stylesCirculated) {
          this._registerElements();
          this._moveStyles();
        }
        headerCells = this.columnHeaders.getChildren('th');
        filterCells = this.columnFilters.getChildren('th');
        headerCells.forEach(function(th) {
          return th.getChild('div').setHeight('auto');
        });
        headerCells.forEach(function(th) {
          return th.getChild('div').setWidth(th.getWidth());
        });
        tallestLabel = Math.max.apply(null, headerCells.map(function(th) {
          return th.getChild('div').getHeight();
        }));
        headerCells.forEach(function(th) {
          return th.getChild('div').setHeight(tallestLabel);
        });
        this.headerElement.setHeight(tallestLabel);
        headerCells.forEach((function(_this) {
          return function(th) {
            var div;
            div = th.getChild('div');
            if (div.getScrollWidth() > div.getWidth()) {
              th.setWidth(div.getScrollWidth() + 25);
              th.addClass('header-temp-width');
              return _this.tableElement.setStyle('tableLayout', 'auto');
            }
          };
        })(this));
        filterCells.forEach(function(th) {
          return th.getChild('div').setWidth(th.getWidth());
        });
        tallestFilter = Math.max.apply(null, filterCells.map(function(th) {
          return th.getChild('div').getHeight();
        }));
        filterCells.forEach(function(th) {
          th.getChild('div').setHeight(tallestFilter);
          return th.getChild('div').setStyle('top', tallestLabel);
        });
        this.filtersElement.setStyle('paddingTop', tallestFilter);
        this.filtersElement.setStyle('top', tallestLabel);
        paddingTop = this.headerElement.getHeight() + this.filtersElement.getHeight();
        paddingBottom = this.footerElement.getHeight();
        this.element.setStyle('paddingTop', paddingTop);
        this.element.setStyle('paddingBottom', paddingBottom);
        this.columnHeaders.setStyle('display', 'none');
        this.columnHeaders.getHeight();
        return this.columnHeaders.setStyle('display', 'table-row');
      });
    })();

    return Fixtable;

  })();

  module.exports = Fixtable;

}).call(this);


/***/ })
/******/ ]);
});