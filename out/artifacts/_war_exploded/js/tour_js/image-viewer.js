/******/ (function(modules) { // webpackBootstrap
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
/*!*****************************************!*\
  !*** ./components/image-viewer/Base.js ***!
  \*****************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ = __webpack_require__(/*! @global/event/1.0.0 */ 6);

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** @constant {String} 未初始状态 */
var UNINITED = 'UNINITED';
/** @constant {String} 已初始状态 */
var INITED = 'INITED';
/** @constant {String} 未加载状态 */
var UNLOADED = 'UNLOADED';
/** @constant {String} 已加载状态 */
var LOADED = 'LOADED';
/** @constant {String} 未加载DOM状态 */
var UNMOUNTED = 'UNMOUNTED';
/** @constant {String} 已加载DOM状态 */
var MOUNTED = 'MOUNTED';
/** @constant {String} 未渲染状态 */
var UNRENDERED = 'UNRENDERED';
/** @constant {String} 已渲染状态 */
var RENDERED = 'RENDERED';

var $$ = window.$;

var _class = function (_Events) {
    _inherits(_class, _Events);

    function _class() {
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this));

        _this.data = null;
        _this.initState = UNINITED;
        _this.loadState = UNLOADED;
        _this.mountState = UNMOUNTED;
        _this.renderState = UNRENDERED;
        _this.$el = $$('<div />');
        return _this;
    }

    _createClass(_class, [{
        key: 'setInitedState',
        value: function setInitedState() {
            this.initState = INITED;
        }
    }, {
        key: 'setLoadedState',
        value: function setLoadedState() {
            this.loadState = LOADED;
        }
    }, {
        key: 'setUnloadedState',
        value: function setUnloadedState() {
            this.loadState = UNLOADED;
        }
    }, {
        key: 'setMountedState',
        value: function setMountedState() {
            this.mountState = MOUNTED;
        }
    }, {
        key: 'setUnmountedState',
        value: function setUnmountedState() {
            this.mountState = UNMOUNTED;
        }
    }, {
        key: 'setRenderedState',
        value: function setRenderedState() {
            this.renderState = RENDERED;
        }
    }, {
        key: 'setUnrenderedState',
        value: function setUnrenderedState() {
            this.renderState = UNRENDERED;
        }
    }, {
        key: 'updateRenderState',
        value: function updateRenderState() {
            if (this.initState === INITED && this.loadState === LOADED && this.mountState === MOUNTED) {
                this.setRenderedState();
            } else {
                this.setUnrenderedState();
            }
        }
    }, {
        key: 'isInited',
        value: function isInited() {
            return this.initState === INITED;
        }
    }, {
        key: 'isLoaded',
        value: function isLoaded() {
            return this.loadState === LOADED;
        }
    }, {
        key: 'isMounted',
        value: function isMounted() {
            return this.mountState === MOUNTED;
        }
    }, {
        key: 'isRendered',
        value: function isRendered() {
            return this.renderState === RENDERED;
        }
        /**
         * 初始操作
         *  同时置为已初始状态
         *  此方法应执行一次
         * @return {Boolean} 是否成功初始化
         */

    }, {
        key: 'init',
        value: function init() {
            if (this.isInited()) {
                return false;
            }
            this.setInitedState();
            return true;
        }
        /**
         * 加载数据
         *  同时置为已加载状态
         * @param {Any} data
         */

    }, {
        key: 'load',
        value: function load(data) {
            this.data = data;
            this.setLoadedState();
            this.updateRenderState();
            this.render();
        }
    }, {
        key: 'unload',
        value: function unload() {
            this.data = null;
            this.setUnloadedState();
            this.updateRenderState();
        }

        /**
         * 加载视图到DOM树
         * @param {jQueryElement|Function} arg
         *  如果传入jQueryElement，则直接append
         *  如果传入function，则将$el传入arg，且在该函数返回true时，表示加载成功
         * @return {Boolean} 是否成功加载试图
         */

    }, {
        key: 'mount',
        value: function mount(arg) {
            if (this.isMounted()) {
                return;
            }
            var result = false;

            if ($$.isFunction(arg)) {
                result = arg(this.$el);
            } else if (arg instanceof $$) {
                arg.append(this.$el);
                result = true;
            }

            if (result === true) {
                this.setMountedState();
                this.updateRenderState();
                this.render();
            }

            return !!result;
        }
    }, {
        key: 'unmount',
        value: function unmount(notEmpty) {
            if (this.isMounted()) {
                this.$el.detach();
                if (!notEmpty) {
                    this.$el.empty();
                }
                this.setUnmountedState();
                this.updateRenderState();
            }
        }

        /**
         * 渲染
         *  只有在已渲染状态下，才允许执行渲染操作
         * @return {Boolean} 是否成功渲染
         */

    }, {
        key: 'render',
        value: function render() {
            return this.isRendered();
        }
    }, {
        key: '$',
        value: function $(selector) {
            if (this.$el) {
                return this.$el.find(selector);
            }
            return null;
        }

        /**
         * 销毁当前实例
         *  删除data引用
         *  删除视图
         */

    }, {
        key: 'destroy',
        value: function destroy() {
            this.data = null;
            if (this.$el) {
                this.$el.remove();
                this.$el = null;
            }
        }
        /**
         * 显示视图
         */

    }, {
        key: 'show',
        value: function show() {
            if (this.$el) {
                this.$el.show();
            }
        }
        /**
         * 隐藏视图
         */

    }, {
        key: 'hide',
        value: function hide() {
            if (this.$el) {
                this.$el.hide();
            }
        }
    }]);

    return _class;
}(_2["default"]);

exports["default"] = _class;

/***/ }),
/* 1 */
/*!**********************************************!*\
  !*** ./components/common/is-support-flex.js ***!
  \**********************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
function isSupportFlex() {
    try {
        var tempElement = document.createElement('div');
        tempElement.style.display = 'flex';

        return tempElement.style.display === 'flex';
    } catch (err) {
        return false;
    }
}

exports["default"] = isSupportFlex();

/***/ }),
/* 2 */
/*!*********************************!*\
  !*** ./entries/image-viewer.js ***!
  \*********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * 详情大图预览
 * 适用于跟团、自助、自驾、定制游
 * @author transformer
 */
var openImageViewer = __webpack_require__(/*! @/image-viewer */ 3);

/** @global */
window.openImageViewer = openImageViewer;

/***/ }),
/* 3 */
/*!******************************************!*\
  !*** ./components/image-viewer/index.js ***!
  \******************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// export {default} from '@/image-viewer/viewer';
var viewer = __webpack_require__(/*! @/image-viewer/viewer */ 4);
module.exports = viewer;

/***/ }),
/* 4 */
/*!*************************************************!*\
  !*** ./components/image-viewer/viewer/index.js ***!
  \*************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

__webpack_require__(/*! ./index.scss */ 5);

var _Base2 = __webpack_require__(/*! @/image-viewer/Base */ 0);

var _Base3 = _interopRequireDefault(_Base2);

var _stage = __webpack_require__(/*! @/image-viewer/stage */ 7);

var _stage2 = _interopRequireDefault(_stage);

var _toolbar = __webpack_require__(/*! @/image-viewer/toolbar */ 14);

var _toolbar2 = _interopRequireDefault(_toolbar);

var _slide = __webpack_require__(/*! @/image-viewer/slide */ 16);

var _slide2 = _interopRequireDefault(_slide);

var _isSupportFlex = __webpack_require__(/*! @/common/is-support-flex */ 1);

var _isSupportFlex2 = _interopRequireDefault(_isSupportFlex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var frameHtml = '\n<div class="viewer-mask"></div>\n<div class="J_imageViewerContainer viewer-container">\n    <a class="J_imageViewerClose viewer-close" href="javascript:;"><i class="icon"></i></a>\n    <div class="J_imageViewerToolbarShadow viewer-toolbar-shadow"></div>\n</div>\n';

var $ = window.$;
var $win = $(window);

var defaultOptions = {
    wrap: $('body')
};

var ImageViewer = function (_Base) {
    _inherits(ImageViewer, _Base);

    function ImageViewer() {
        _classCallCheck(this, ImageViewer);

        return _possibleConstructorReturn(this, (ImageViewer.__proto__ || Object.getPrototypeOf(ImageViewer)).apply(this, arguments));
    }

    _createClass(ImageViewer, [{
        key: 'init',
        value: function init() {
            var _this2 = this;

            _get(ImageViewer.prototype.__proto__ || Object.getPrototypeOf(ImageViewer.prototype), 'init', this).call(this);
            // 创建模块实例
            this.stage = (0, _stage2["default"])();
            this.toolbar = (0, _toolbar2["default"])();
            this.slide = (0, _slide2["default"])();
            // 初始模块
            this.stage.init();
            this.toolbar.init();
            this.slide.init();
            // 初始view
            this.$container = null;
            this.$close = null;
            this.length = 0;
            this.activeIndex = -1;

            this._globalKeyupHandler = function (event) {
                _this2.__globalKeyupHandler(event);
            };

            this._globalResizeHandler = function () {
                _this2.__globalResizeHandler();
            };

            this.initFrameView();
            this.bind();
        }
    }, {
        key: 'bind',
        value: function bind() {
            var _this3 = this;

            this.slide.on('change', function (index) {
                _this3.active(index);
            });
            this.slide.on('visibilitychange', function (state) {
                if (state) {
                    _this3.toolbar.disableAutoHide();
                } else {
                    _this3.toolbar.enableAutoHide();
                }
                _this3.toolbar.updateToggleView(state);
                _this3.updateView();
            });
            this.toolbar.on('visibilitychange', function (state) {
                if (state) {
                    _this3.$toolbarShadow.hide();
                } else {
                    _this3.$toolbarShadow.show();
                }
                _this3.updateView();
            });
            this.toolbar.on('toggle', function () {
                _this3.slide.toggle();
            });
            this.toolbar.on('reduce', function () {
                _this3.stage.reduce();
            });
            this.toolbar.on('increase', function () {
                _this3.stage.increase();
            });
            this.stage.on('percentchange', function (percent) {
                _this3.toolbar.updatePercent(percent);
            });
            this.stage.on('reducechange', function (available) {
                _this3.toolbar.updatePercentReduce(available);
            });
            this.stage.on('increasechange', function (available) {
                _this3.toolbar.updatePercentIncrease(available);
            });
            this.stage.on('prev', function () {
                _this3.slide.activePrev();
            });
            this.stage.on('next', function () {
                _this3.slide.activeNext();
            });
            this.stage.on('enable', function () {
                _this3.toolbar.enableScale();
            });
            this.stage.on('disable', function () {
                _this3.toolbar.disableScale();
            });

            var slideTimer = void 0;
            this.$el.on('click', '.J_imageViewerClose', function () {
                _this3.close();
            }).on('mouseover', '.J_imageViewerToolbarShadow', function () {
                if (!slideTimer) {
                    slideTimer = setTimeout(function () {
                        _this3.toolbar.slideDown();
                    }, 500);
                }
            }).on('mouseout', '.J_imageViewerToolbarShadow', function () {
                clearTimeout(slideTimer);
                slideTimer = null;
            });
        }
    }, {
        key: 'active',
        value: function active(index) {
            var data = this.getDataByIndex(index);
            if (!data) {
                return;
            }
            this.activeIndex = index;
            this.slide.active(index);
            this.stage.update(data.src);
            this.toolbar.update(data, this.activeIndex, this.length);
        }
    }, {
        key: 'getDataByIndex',
        value: function getDataByIndex(index) {
            var data = this.data[index];
            return data;
        }
    }, {
        key: 'reset',
        value: function reset() {
            this.options = defaultOptions;
            this.length = 0;
            this.activeIndex = -1;
        }
    }, {
        key: 'initFrameView',
        value: function initFrameView() {
            this.$el.addClass('image-viewer');
            if (_isSupportFlex2["default"]) {
                this.$el.addClass('support-flex');
            } else {
                this.$el.addClass('not-support-flex');
            }
            this.$el.html(frameHtml);
            this.$container = this.$('.J_imageViewerContainer');
            this.$close = this.$('.J_imageViewerClose');
            this.$toolbarShadow = this.$('.J_imageViewerToolbarShadow');
        }
    }, {
        key: 'load',
        value: function load(data, options) {
            if (!(Array.isArray(data) && data.length)) {
                return;
            }
            this.options = Object.assign({}, defaultOptions, options);
            this.activeIndex = this.options.index || 0;
            this.stage.load();
            this.toolbar.load();
            this.slide.load(data.map(function (item) {
                return item.src;
            }));
            _get(ImageViewer.prototype.__proto__ || Object.getPrototypeOf(ImageViewer.prototype), 'load', this).call(this, data);
            this.length = data.length;
            this.addGlobalHandler();
            if (data.length <= 1) {
                this.stage.disableNav();
            }
        }
    }, {
        key: 'unload',
        value: function unload() {
            this.stage.unload();
            this.toolbar.unload();
            this.slide.unload();
            _get(ImageViewer.prototype.__proto__ || Object.getPrototypeOf(ImageViewer.prototype), 'unload', this).call(this);
            this.reset();
            this.removeGlobalHandler();
            $('html').css('overflow', this.htmlOverflowStyle);
        }
    }, {
        key: 'mount',
        value: function mount() {
            var _this4 = this;

            this.htmlOverflowStyle = $('html').css('overflow');
            $('html').css('overflow', 'hidden');
            this.stage.mount(this.$container);
            this.toolbar.mount(this.$container);
            this.slide.mount(function ($el) {
                return _this4.toolbar.appendSlide($el);
            });
            _get(ImageViewer.prototype.__proto__ || Object.getPrototypeOf(ImageViewer.prototype), 'mount', this).call(this, this.options.wrap);
            this.updateView();
        }
    }, {
        key: 'unmount',
        value: function unmount() {
            _get(ImageViewer.prototype.__proto__ || Object.getPrototypeOf(ImageViewer.prototype), 'unmount', this).call(this, true);
            this.slide.unmount();
            this.toolbar.unmount();
        }
    }, {
        key: 'addGlobalHandler',
        value: function addGlobalHandler() {
            $(window).on('keyup', this._globalKeyupHandler).on('resize', this._globalResizeHandler);
        }
    }, {
        key: 'removeGlobalHandler',
        value: function removeGlobalHandler() {
            $(window).off('keyup', this._globalKeyupHandler).off('resize', this._globalResizeHandler);
        }
    }, {
        key: '__globalKeyupHandler',
        value: function __globalKeyupHandler(event) {
            switch (event.keyCode) {
                // up
                case 38:
                // left
                /* eslint-disable no-fallthrough */
                case 37:
                    this.slide.activePrev();
                    break;
                // down
                case 40:
                // right
                /* eslint-disable no-fallthrough */
                case 39:
                    // default:
                    this.slide.activeNext();
                    break;
            }
        }
    }, {
        key: '__globalResizeHandler',
        value: function __globalResizeHandler() {
            this.updateView();
        }
    }, {
        key: 'updateView',
        value: function updateView() {
            var width = $win.width();
            var height = $win.height();

            this.$el.width(width).height(height);
            this.slide.updateView();
            this.stage.updateView({
                width: width,
                height: height,
                marginBottom: this.toolbar.getWrapHeight()
            });
        }
    }, {
        key: 'close',
        value: function close() {
            this.unmount();
            this.unload();
        }
    }, {
        key: 'hideToolbar',
        value: function hideToolbar() {
            this.toolbar.slideUp(3000);
        }
    }]);

    return ImageViewer;
}(_Base3["default"]);

var imageViewer = void 0;

function createImageViewer() {
    if (!imageViewer) {
        imageViewer = new ImageViewer();
        imageViewer.init();
    }
    return imageViewer;
}

module.exports = function (data, options) {
    var imageViewer = createImageViewer();
    options = Object.assign({
        index: 0
    }, options);
    imageViewer.load(data, options);
    imageViewer.mount(document.body);
    imageViewer.updateView();
    imageViewer.active(options.index);
    imageViewer.hideToolbar();
};

/***/ }),
/* 5 */
/*!***************************************************!*\
  !*** ./components/image-viewer/viewer/index.scss ***!
  \***************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 6 */
/*!*************************************************!*\
  !*** ../common/components/event/1.0.0/index.js ***!
  \*************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function isFunction(fn) {
    return typeof fn === 'function';
}

var _class = function () {
    function _class() {
        _classCallCheck(this, _class);

        this._events = {};
    }

    _createClass(_class, [{
        key: 'on',
        value: function on(eventType) {
            var handlers = void 0;
            if (!(handlers = this._events[eventType])) {
                handlers = this._events[eventType] = [];
            }

            for (var _len = arguments.length, newHandlers = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                newHandlers[_key - 1] = arguments[_key];
            }

            newHandlers.filter(function (handler) {
                return isFunction(handler);
            }).forEach(function (handler) {
                return handlers.push(handler);
            });
        }
    }, {
        key: 'dispatch',
        value: function dispatch(eventType) {
            var _this = this;

            for (var _len2 = arguments.length, data = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                data[_key2 - 1] = arguments[_key2];
            }

            var handlers = this._events[eventType];
            if (Array.isArray(handlers)) {
                handlers.forEach(function (handler) {
                    handler.apply(_this, data);
                });
            }
        }
    }]);

    return _class;
}();

exports["default"] = _class;

/***/ }),
/* 7 */
/*!************************************************!*\
  !*** ./components/image-viewer/stage/index.js ***!
  \************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

exports["default"] = function () {
    return new Stage();
};

__webpack_require__(/*! ./index.scss */ 8);

var _Base2 = __webpack_require__(/*! @/image-viewer/Base */ 0);

var _Base3 = _interopRequireDefault(_Base2);

var _nav = __webpack_require__(/*! @/image-viewer/nav */ 9);

var _nav2 = _interopRequireDefault(_nav);

var _tip = __webpack_require__(/*! @/image-viewer/tip */ 11);

var _tip2 = _interopRequireDefault(_tip);

var _resizeImage = __webpack_require__(/*! @/common/helper/resize-image */ 13);

var _resizeImage2 = _interopRequireDefault(_resizeImage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var $ = window.$;

var PERCENT_STEP = 20;
var PERCENT_MIN = 20;
var PERCENT_MAX = 300;

var IMG_PADDING = 0;
var IMG_DRAG_SAFE_PADDING = 60;

function removeImgClip(src) {
    if (src) {
        if (/m[1-4]?\.tuniucdn\.com\/filebroker/.test(src)) {
            return (0, _resizeImage2["default"])(src, 800, 0, 0, 0);
        } else {
            return String(src).replace(/(_w\d+_h\d+_c\d+_t\d+)*/g, '');
        }
    }
}

var Stage = function (_Base) {
    _inherits(Stage, _Base);

    function Stage() {
        _classCallCheck(this, Stage);

        return _possibleConstructorReturn(this, (Stage.__proto__ || Object.getPrototypeOf(Stage)).apply(this, arguments));
    }

    _createClass(Stage, [{
        key: 'init',
        value: function init() {
            var _this2 = this;

            _get(Stage.prototype.__proto__ || Object.getPrototypeOf(Stage.prototype), 'init', this).call(this);
            this.$el.addClass('viewer-stage');
            this.$img = $('<img />');
            this.percent = -1;
            this.manualScaled = false;
            this.manualDragged = false;
            this.disable = true;
            this.size = {
                width: 0,
                height: 0
            };
            this.offset = {
                left: 0,
                top: 0
            };
            this.imgOriginSize = {
                width: 0,
                height: 0
            };
            this.imgSize = {
                width: 0,
                height: 0
            };
            this.imgPosition = {
                x: 0,
                y: 0
            };
            this.nav = (0, _nav2["default"])();
            this.tip = (0, _tip2["default"])();
            this.nav.init();
            this.tip.init();
            this.$img.attr('draggable', 'false');

            this._globalMousedownHandler = function (event) {
                _this2.__globalMousedownHandler(event);
            };
            this._globalMousemoveHandler = function (event) {
                _this2.__globalMousemoveHandler(event);
            };
            this._globalMouseupHandler = function () {
                _this2.__globalMouseupHandler();
            };
            this._mousemoveHandler = function (event) {
                _this2.__mousemoveHandler(event);
            };
            this._mouseleaveHandler = function (event) {
                _this2.__mouseleaveHandler(event);
            };
            this.nav.on('prev', function () {
                _this2.dispatch('prev');
            });
            this.nav.on('next', function () {
                _this2.dispatch('next');
            });
            this.$el.on('mousemove', this._mousemoveHandler);
            this.$img.on('dragstart drag drop', function (e) {
                e.preventDefault();
            });
        }
    }, {
        key: 'load',
        value: function load() {
            this.nav.load();
            this.tip.load();
            _get(Stage.prototype.__proto__ || Object.getPrototypeOf(Stage.prototype), 'load', this).call(this);
        }
    }, {
        key: 'unload',
        value: function unload() {
            this.nav.unload();
            this.$el.on('mousemove', this._mousemoveHandler);
            $(document).off('mousemove', this._globalMousemoveHandler).off('mouseup', this._globalMouseupHandler);
            _get(Stage.prototype.__proto__ || Object.getPrototypeOf(Stage.prototype), 'unload', this).call(this);
        }
    }, {
        key: 'mount',
        value: function mount($el) {
            var _this3 = this;

            _get(Stage.prototype.__proto__ || Object.getPrototypeOf(Stage.prototype), 'mount', this).call(this, $el);
            this.nav.mount(function ($el) {
                return _this3.appendNav($el);
            });
            this.tip.mount(this.$el);
            if (!this.mousewheelBound) {
                this.$el.on('mousemove', this._mousemoveHandler).on('mousewheel', function (e) {
                    if (e.deltaY > 0) {
                        _this3.increase(10);
                    } else if (e.deltaY < 0) {
                        _this3.reduce(10);
                    }
                    e.preventDefault();
                });
                this.mousewheelBound = true;
            }
        }
    }, {
        key: 'update',
        value: function update(src) {
            if (src) {
                _get(Stage.prototype.__proto__ || Object.getPrototypeOf(Stage.prototype), 'load', this).call(this, removeImgClip(src));
                this.clearStage();
                this.showLoading();
                this.fetchImg();
            }
        }
    }, {
        key: 'updateView',
        value: function updateView(size) {
            this.$el.css('margin-bottom', size.marginBottom).width(size.width).height(size.height - size.marginBottom);
            // let offset = this.$el.offset();
            this.size.width = this.$el.width();
            this.size.height = this.$el.height();
            // this.offset = Object.assign({
            //     left: 0,
            //     top: 0
            // }, offset);

            if (this.manualScaled) {
                this.adjustImgPosition();
            } else {
                this.autoUpdatePercent();
                this.updateImgSize();
                this.updateImgPosition();
            }
            this.updateImgView();
            this.updateNavView();
        }
    }, {
        key: 'updateNavView',
        value: function updateNavView() {
            this.nav.updateView({
                wrapWidth: this.size.width,
                wrapHeight: this.size.height,
                imgWidth: this.imgSize.width || 50,
                imgHeight: this.imgSize.height || 50
            });
        }
    }, {
        key: 'fetchImg',
        value: function fetchImg() {
            this.destroyImg();
            var $temp = new Image();
            this.$tempImg = $temp;
            $temp.onload = this._loadImg.bind(this);
            $temp.src = this.data;
        }
    }, {
        key: '_loadImg',
        value: function _loadImg() {
            this.disable = false;
            this.imgOriginSize.width = this.$tempImg.width;
            this.imgOriginSize.height = this.$tempImg.height;
            this.autoUpdatePercent();
            this.destroyImg();
            this.showImg();
            this.updateNavView();
            this.dispatch('enable');
        }
    }, {
        key: 'autoUpdatePercent',
        value: function autoUpdatePercent() {
            var widthPercent = (this.size.width - IMG_PADDING * 2) / this.imgOriginSize.width;
            var heightPercent = (this.size.height - IMG_PADDING * 2) / this.imgOriginSize.height;
            var percent = Math.min(100, parseInt(Math.min(widthPercent, heightPercent) * 100, 10));
            this._changePercent(percent);
        }
    }, {
        key: 'updateImgSize',
        value: function updateImgSize() {
            this.imgSize.width = this.imgOriginSize.width * this.percent / 100;
            this.imgSize.height = this.imgOriginSize.height * this.percent / 100;
        }
    }, {
        key: 'updateImgPosition',
        value: function updateImgPosition() {
            this.imgPosition.x = this.size.width / 2;
            this.imgPosition.y = this.size.height / 2;
        }
    }, {
        key: 'showImg',
        value: function showImg() {
            this.updateImgSize();
            this.updateImgPosition();
            this.updateImgView();
            this.$img.prop({
                src: this.data
            }).appendTo(this.$el);
            this.hideLoading();
        }
    }, {
        key: 'updateImgView',
        value: function updateImgView() {
            this.$img.css({
                width: this.imgSize.width,
                height: this.imgSize.height,
                left: this.imgPosition.x - this.imgSize.width / 2,
                top: this.imgPosition.y - this.imgSize.height / 2
            });
        }
    }, {
        key: 'destroyImg',
        value: function destroyImg() {
            if (this.$tempImg) {
                this.$tempImg.onload = null;
                this.$tempImg.onerror = null;
                this.$tempImg = null;
            }
        }
    }, {
        key: 'clearStage',
        value: function clearStage() {
            this.percent = -1;
            this.manualScaled = false;
            this.manualDragged = false;
            this.disable = true;
            this.$img.detach();
            this.destroyDrag();
            this.dispatch('disable');
        }
    }, {
        key: 'showLoading',
        value: function showLoading() {
            this.$el.addClass('loading');
        }
    }, {
        key: 'hideLoading',
        value: function hideLoading() {
            this.$el.removeClass('loading');
        }
    }, {
        key: 'reduce',
        value: function reduce(delta) {
            delta = delta || PERCENT_STEP;
            this.changePercent(this.percent - delta);
        }
    }, {
        key: 'increase',
        value: function increase(delta) {
            delta = delta || PERCENT_STEP;
            this.changePercent(this.percent + delta);
        }
    }, {
        key: '_changePercent',
        value: function _changePercent(newPercent) {
            if (this.disable) {
                return;
            }
            newPercent = parseInt(newPercent, 10);
            if (isNaN(newPercent)) {
                return;
            }
            if (newPercent < PERCENT_MIN) {
                newPercent = PERCENT_MIN;
            } else if (newPercent > PERCENT_MAX) {
                newPercent = PERCENT_MAX;
            }

            if (newPercent !== this.percent) {
                this.percent = newPercent;
                this.dispatch('percentchange', this.percent);
                this.dispatch('reducechange', newPercent !== PERCENT_MIN);
                this.dispatch('increasechange', newPercent !== PERCENT_MAX);
                return true;
            } else {
                return false;
            }
        }
    }, {
        key: 'changePercent',
        value: function changePercent(newPercent) {
            if (this._changePercent(newPercent)) {
                this.manualScaled = true;
                this.prepareDrag();
                this.updateImgSize();
                if (this.manualDragged) {
                    this.adjustImgPosition();
                } else {
                    this.updateImgPosition();
                }
                this.updateImgView();
                this.updateNavView();
                this.tip.show(this.percent + '%');
            }
        }
    }, {
        key: 'prepareDrag',
        value: function prepareDrag() {
            this.$el.addClass('draggable');
            this.$img.on('mousedown', this._globalMousedownHandler);
        }
    }, {
        key: 'destroyDrag',
        value: function destroyDrag() {
            this.$el.removeClass('draggable');
            this.$img.off('mousedown', this._globalMousedownHandler);
        }
    }, {
        key: '__globalMousedownHandler',
        value: function __globalMousedownHandler(event) {
            this.prevMousePosition = {
                x: event.clientX,
                y: event.clientY
            };
            $(document).on('mousemove', this._globalMousemoveHandler).on('mouseup', this._globalMouseupHandler);
            event.preventDefault();
            event.stopPropagation();
        }
    }, {
        key: '__globalMousemoveHandler',
        value: function __globalMousemoveHandler(event) {
            var mousePosition = {
                x: event.clientX,
                y: event.clientY
            };
            var prevMousePosition = this.prevMousePosition;
            if (prevMousePosition) {
                this.manualDragged = true;
                this.imgPosition.x = this.imgPosition.x + (mousePosition.x - prevMousePosition.x);
                this.imgPosition.y = this.imgPosition.y + (mousePosition.y - prevMousePosition.y);
                this.adjustImgPosition();
                this.updateImgView();
            }
            this.prevMousePosition = mousePosition;
        }
    }, {
        key: '__globalMouseupHandler',
        value: function __globalMouseupHandler() {
            $(document).off('mousemove', this._globalMousemoveHandler).off('mouseup', this._globalMouseupHandler);
        }
    }, {
        key: '__mousemoveHandler',
        value: function __mousemoveHandler(event) {
            var x = event.clientX;
            if (x < Math.max((this.size.width - this.imgSize.width) / 2, 320) || x > Math.min((this.size.width + this.imgSize.width) / 2, this.size.width - 320)) {
                this.nav.show();
            } else {
                this.nav.hide();
            }
        }
    }, {
        key: '__mouseleaveHandler',
        value: function __mouseleaveHandler() {
            this.nav.hide();
        }
    }, {
        key: 'adjustImgPosition',
        value: function adjustImgPosition() {
            this.imgPosition.x = Math.max(this.imgPosition.x, this.offset.left - this.imgSize.width / 2 + IMG_DRAG_SAFE_PADDING);
            this.imgPosition.x = Math.min(this.imgPosition.x, this.offset.left + this.size.width + this.imgSize.width / 2 - IMG_DRAG_SAFE_PADDING);
            this.imgPosition.y = Math.max(this.imgPosition.y, this.offset.top - this.imgSize.height / 2 + IMG_DRAG_SAFE_PADDING);
            this.imgPosition.y = Math.min(this.imgPosition.y, this.offset.top + this.size.height + this.imgSize.height / 2 - IMG_DRAG_SAFE_PADDING);
        }
    }, {
        key: 'appendNav',
        value: function appendNav($el) {
            this.$el.append($el);
            return true;
        }
    }, {
        key: 'disableNav',
        value: function disableNav() {
            this.nav.disable();
        }
    }]);

    return Stage;
}(_Base3["default"]);

/***/ }),
/* 8 */
/*!**************************************************!*\
  !*** ./components/image-viewer/stage/index.scss ***!
  \**************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 9 */
/*!**********************************************!*\
  !*** ./components/image-viewer/nav/index.js ***!
  \**********************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

exports["default"] = function () {
    return new Nav();
};

__webpack_require__(/*! ./index.scss */ 10);

var _Base2 = __webpack_require__(/*! @/image-viewer/Base */ 0);

var _Base3 = _interopRequireDefault(_Base2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var navHtml = '\n<div class="J_imageViewerNavPrev viewer-prev viewer-btn">\n    <i class="icon"></i>\n</div>\n<div class="J_imageViewerNavNext viewer-next viewer-btn">\n    <i class="icon"></i>\n</div>';

var OFFSET = 20;

var Nav = function (_Base) {
    _inherits(Nav, _Base);

    function Nav() {
        _classCallCheck(this, Nav);

        return _possibleConstructorReturn(this, (Nav.__proto__ || Object.getPrototypeOf(Nav)).apply(this, arguments));
    }

    _createClass(Nav, [{
        key: 'init',
        value: function init() {
            _get(Nav.prototype.__proto__ || Object.getPrototypeOf(Nav.prototype), 'init', this).call(this);
            this.disabled = false;
            this.initFrameView();
            this.bind();
        }
    }, {
        key: 'initFrameView',
        value: function initFrameView() {
            this.$el.addClass('viewer-nav');
            this.$el.html(navHtml);
            this.$prev = this.$('.J_imageViewerNavPrev');
            this.$next = this.$('.J_imageViewerNavNext');
        }
    }, {
        key: 'bind',
        value: function bind() {
            var self = this;
            this.$el.on('click', '.J_imageViewerNavPrev', function () {
                self.dispatch('prev');
            }).on('click', '.J_imageViewerNavNext', function () {
                self.dispatch('next');
            });
        }
    }, {
        key: 'unload',
        value: function unload() {
            this.disabled = false;
            this.$el.show();
        }
    }, {
        key: 'disable',
        value: function disable() {
            this.disabled = true;
            this.$el.hide();
        }
    }, {
        key: 'show',
        value: function show() {
            if (this.disabled) {
                return;
            }
            this.$('.viewer-btn').addClass('active');
        }
    }, {
        key: 'hide',
        value: function hide() {
            if (this.disabled) {
                return;
            }
            this.$('.viewer-btn').removeClass('active');
        }
    }, {
        key: 'updateView',
        value: function updateView(offset) {
            if (this.disabled) {
                return;
            }
            if (offset && offset.wrapWidth && offset.wrapHeight) {
                var hOffset = Math.min(300, offset.wrapWidth / 2);
                var top = offset.wrapHeight / 2;
                this.$prev.css({
                    left: Math.max(OFFSET, hOffset - this.$prev.width() - OFFSET),
                    top: top - this.$prev.height() / 2
                });
                this.$next.css({
                    right: Math.max(OFFSET, hOffset - this.$next.width() - OFFSET),
                    top: top - this.$next.height() / 2
                });
            }
        }
    }]);

    return Nav;
}(_Base3["default"]);

/***/ }),
/* 10 */
/*!************************************************!*\
  !*** ./components/image-viewer/nav/index.scss ***!
  \************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 11 */
/*!**********************************************!*\
  !*** ./components/image-viewer/tip/index.js ***!
  \**********************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

exports["default"] = function () {
    return new Tip();
};

__webpack_require__(/*! ./index.scss */ 12);

var _Base2 = __webpack_require__(/*! @/image-viewer/Base */ 0);

var _Base3 = _interopRequireDefault(_Base2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tip = function (_Base) {
    _inherits(Tip, _Base);

    function Tip() {
        _classCallCheck(this, Tip);

        return _possibleConstructorReturn(this, (Tip.__proto__ || Object.getPrototypeOf(Tip)).apply(this, arguments));
    }

    _createClass(Tip, [{
        key: 'init',
        value: function init() {
            _get(Tip.prototype.__proto__ || Object.getPrototypeOf(Tip.prototype), 'init', this).call(this);
            this.$el.addClass('viewer-tip');
        }
    }, {
        key: 'show',
        value: function show(text) {
            var _this2 = this;

            clearTimeout(this.hideTimer);
            this.$el.stop().css('opacity', 1).text(text).show();
            this.hideTimer = setTimeout(function () {
                _this2.hide();
            }, 2000);
        }
    }, {
        key: 'hide',
        value: function hide() {
            var _this3 = this;

            this.$el.animate({
                opacity: 0
            }, 2000, function () {
                _this3.$el.hide().text('');
            });
        }
    }]);

    return Tip;
}(_Base3["default"]);

/***/ }),
/* 12 */
/*!************************************************!*\
  !*** ./components/image-viewer/tip/index.scss ***!
  \************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 13 */
/*!**************************************************!*\
  !*** ./components/common/helper/resize-image.js ***!
  \**************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports["default"] = function (url, width, height, clip, stretch) {
    var pattern = /^(.*?)(_w\d+_h\d+_c\d+_t\d+)*\.([\w]+)$/;
    var res = void 0;

    width = width || 0;
    height = height || 0;
    clip = clip || 0;
    stretch = stretch || 0;
    res = pattern.exec(url);

    if (res) {
        return [res[1], '_', ['w' + width, 'h' + height, 'c' + clip, 't' + stretch].join('_'), '.', res[3]].join('');
    }
    return url;
};

/***/ }),
/* 14 */
/*!**************************************************!*\
  !*** ./components/image-viewer/toolbar/index.js ***!
  \**************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

exports["default"] = function () {
    return new Toolbar();
};

__webpack_require__(/*! ./index.scss */ 15);

var _Base2 = __webpack_require__(/*! @/image-viewer/Base */ 0);

var _Base3 = _interopRequireDefault(_Base2);

var _isSupportFlex = __webpack_require__(/*! @/common/is-support-flex */ 1);

var _isSupportFlex2 = _interopRequireDefault(_isSupportFlex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var frameHtml = '\n<div class="J_viewerToolbar toolbar">\n    <div class="inner">\n        <div class="title"><span class="serial"><strong class="J_imageViewerToolbarIndex">6</strong>/ <span class="J_imageViewerToolbarTotal">15</span></span><span class="J_imageViewerToolbarName"></span></div>\n        <div class="tool">\n            <div class="J_imageViewerToolbarToggle toggle"><i class="icon"></i>\u56FE\u7247\u5217\u8868</div>\n            <div class="seperate"></div>\n            <div class="scaler">\n                <a class="J_imageViewerToolbarReduce reduce disable" href="javascript:;"><i class="icon"></i></a>\n                <span class="J_imageViewerToolbarLabel label">100%</span>\n                <a class="J_imageViewerToolbarIncrease increase disable" href="javascript:;"><i class="icon"></i></a>\n            </div>\n        </div>\n    </div>\n</div>\n<div class="J_imageViewerToolbarSlide toolbar-slide"></div>';

var Toolbar = function (_Base) {
    _inherits(Toolbar, _Base);

    function Toolbar() {
        _classCallCheck(this, Toolbar);

        return _possibleConstructorReturn(this, (Toolbar.__proto__ || Object.getPrototypeOf(Toolbar)).apply(this, arguments));
    }

    _createClass(Toolbar, [{
        key: 'init',
        value: function init() {
            _get(Toolbar.prototype.__proto__ || Object.getPrototypeOf(Toolbar.prototype), 'init', this).call(this);
            this.visible = false;
            this.autoHideDisabled = false;
            this.initFrameView();
            this.bind();
        }
    }, {
        key: 'initFrameView',
        value: function initFrameView() {
            this.$el.addClass('viewer-toolbar');
            this.$el.html(frameHtml);
            this.$toolbar = this.$('.J_viewerToolbar');
            this.$reduce = this.$('.J_imageViewerToolbarReduce');
            this.$increase = this.$('.J_imageViewerToolbarIncrease');
            this.$slide = this.$('.J_imageViewerToolbarSlide');
        }
    }, {
        key: 'reset',
        value: function reset() {
            this.visible = false;
            this.autoHideDisabled = false;
        }
    }, {
        key: 'unload',
        value: function unload() {
            clearTimeout(this.slideTimer);
            this.$toolbar.stop();
        }
    }, {
        key: 'unmount',
        value: function unmount() {
            this.$reduce.addClass('disable');
            this.$increase.addClass('disable');
            this.$toolbar.css('top', -40);
            this.$('.J_imageViewerToolbarToggle').removeClass('expand');
            this.updatePercent(100);
        }
    }, {
        key: 'getWrapHeight',
        value: function getWrapHeight() {
            if (_isSupportFlex2["default"]) {
                return 0;
            } else {
                return this.$el.height();
            }
        }
    }, {
        key: 'bind',
        value: function bind() {
            var self = this;
            this.$el.on('click', '.J_imageViewerToolbarToggle', function () {
                self.dispatch('toggle');
            }).on('click', '.J_imageViewerToolbarReduce', function () {
                self.dispatch('reduce');
            }).on('click', '.J_imageViewerToolbarIncrease', function () {
                self.dispatch('increase');
            }).on('mouseout', function () {
                if (self.autoHideDisabled) {
                    return;
                }
                if (!self.slideTimer) {
                    self.slideTimer = setTimeout(function () {
                        self.slideUp();
                    }, 500);
                }
            }).on('mouseover', function () {
                if (self.autoHideDisabled) {
                    return;
                }
                clearTimeout(self.slideTimer);
                self.slideTimer = null;
            });
        }
    }, {
        key: 'update',
        value: function update(data, index, total) {
            _get(Toolbar.prototype.__proto__ || Object.getPrototypeOf(Toolbar.prototype), 'load', this).call(this, Object.assign({
                index: index,
                total: total
            }, data));
            this.$('.J_imageViewerToolbarIndex').text(this.data.index + 1);
            this.$('.J_imageViewerToolbarTotal').text(this.data.total);
            this.$('.J_imageViewerToolbarName').text(this.data.name);
        }
    }, {
        key: 'updateToggleView',
        value: function updateToggleView(state) {
            if (state) {
                this.$('.J_imageViewerToolbarToggle').addClass('expand');
            } else {
                this.$('.J_imageViewerToolbarToggle').removeClass('expand');
            }
        }
    }, {
        key: 'updatePercent',
        value: function updatePercent(percent) {
            this.$('.J_imageViewerToolbarLabel').text(percent + '%');
        }
    }, {
        key: 'updatePercentReduce',
        value: function updatePercentReduce(available) {
            if (available) {
                this.$reduce.removeClass('disable');
            } else {
                this.$reduce.addClass('disable');
            }
        }
    }, {
        key: 'updatePercentIncrease',
        value: function updatePercentIncrease(available) {
            if (available) {
                this.$increase.removeClass('disable');
            } else {
                this.$increase.addClass('disable');
            }
        }
    }, {
        key: 'slideDown',
        value: function slideDown(delay) {
            var _this2 = this;

            clearTimeout(this.slideTimer);
            if (delay) {
                this.slideTimer = setTimeout(function () {
                    _this2._slideDown();
                    _this2.slideTimer = null;
                }, delay);
            } else {
                this._slideDown();
            }
        }
    }, {
        key: '_slideDown',
        value: function _slideDown() {
            var _this3 = this;

            this.$toolbar.animate({
                top: -40
            }, 200, function () {
                _this3.visible = true;
                _this3.dispatch('visibilitychange', true);
            });
        }
    }, {
        key: 'slideUp',
        value: function slideUp(delay) {
            var _this4 = this;

            clearTimeout(this.slideTimer);
            if (delay) {
                this.slideTimer = setTimeout(function () {
                    _this4._slideUp();
                    _this4.slideTimer = null;
                }, delay);
            } else {
                this._slideUp();
            }
        }
    }, {
        key: '_slideUp',
        value: function _slideUp() {
            var _this5 = this;

            this.$toolbar.animate({
                top: 0
            }, 200, function () {
                _this5.visible = false;
                _this5.dispatch('visibilitychange', false);
            });
        }
    }, {
        key: 'toggle',
        value: function toggle() {
            if (this.visible) {
                this.slideUp();
            } else {
                this.slideDown();
            }
        }
    }, {
        key: 'appendSlide',
        value: function appendSlide($el) {
            this.$slide.append($el);
            return true;
        }
    }, {
        key: 'disableAutoHide',
        value: function disableAutoHide() {
            this.autoHideDisabled = true;
            clearTimeout(this.slideTimer);
            self.slideTimer = null;
        }
    }, {
        key: 'enableAutoHide',
        value: function enableAutoHide() {
            this.autoHideDisabled = false;
        }
    }, {
        key: 'disableScale',
        value: function disableScale() {
            this.$reduce.addClass('disable');
            this.$increase.addClass('disable');
        }
    }, {
        key: 'enableScale',
        value: function enableScale() {
            this.$reduce.removeClass('disable');
            this.$increase.removeClass('disable');
        }
    }]);

    return Toolbar;
}(_Base3["default"]);

/***/ }),
/* 15 */
/*!****************************************************!*\
  !*** ./components/image-viewer/toolbar/index.scss ***!
  \****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 16 */
/*!************************************************!*\
  !*** ./components/image-viewer/slide/index.js ***!
  \************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

exports["default"] = function () {
    return new Slide();
};

__webpack_require__(/*! ./index.scss */ 17);

var _Base2 = __webpack_require__(/*! @/image-viewer/Base */ 0);

var _Base3 = _interopRequireDefault(_Base2);

var _isSupportFlex = __webpack_require__(/*! @/common/is-support-flex */ 1);

var _isSupportFlex2 = _interopRequireDefault(_isSupportFlex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var $ = window.$;

var frameHtml = '\n<div class="J_imageViewerSlideBox box">\n    <div class="J_imageViewerSlideList list">\n    </div>\n</div>\n';

function getItemHtml(src) {
    return '<div class="J_imageViewerSlideItem item">\n        <img draggable="false" src="' + src + '">\n    </div>';
}

var Slide = function (_Base) {
    _inherits(Slide, _Base);

    function Slide() {
        _classCallCheck(this, Slide);

        return _possibleConstructorReturn(this, (Slide.__proto__ || Object.getPrototypeOf(Slide)).apply(this, arguments));
    }

    _createClass(Slide, [{
        key: 'init',
        value: function init() {
            _get(Slide.prototype.__proto__ || Object.getPrototypeOf(Slide.prototype), 'init', this).call(this);
            this.activeIndex = -1;
            this.length = 0;
            this.visible = false;
            this.scrolling = false;
            this.initFrameView();
            this.bind();
        }
    }, {
        key: 'initFrameView',
        value: function initFrameView() {
            this.$el.addClass('viewer-slide');
            this.$el.html(frameHtml);
            this.$list = this.$('.J_imageViewerSlideList');
            this.$box = this.$('.J_imageViewerSlideBox');
            this.scrollbar = null;
        }
    }, {
        key: 'reset',
        value: function reset() {
            this.activeIndex = -1;
            this.length = 0;
            this.visible = false;
            this.scrolling = false;
        }
    }, {
        key: 'render',
        value: function render() {
            var html = this.data.map(getItemHtml).join('');
            html += '<i class="J_imageViewerSlideMask mask"></i>';
            this.$list.html(html);
            this.$mask = this.$('.J_imageViewerSlideMask');
        }
    }, {
        key: 'bind',
        value: function bind() {
            var self = this;
            this.$el.on('click', '.J_imageViewerSlideItem', function () {
                self.preactive($(this).index());
            });
        }
    }, {
        key: 'load',
        value: function load(data, initIndex) {
            if (Array.isArray(data) && data.length) {
                if (initIndex !== undefined) {
                    this.activeIndex = initIndex;
                }
                this.length = data.length;
                _get(Slide.prototype.__proto__ || Object.getPrototypeOf(Slide.prototype), 'load', this).call(this, data);
            }
        }
    }, {
        key: 'unload',
        value: function unload() {
            this.reset();
            _get(Slide.prototype.__proto__ || Object.getPrototypeOf(Slide.prototype), 'unload', this).call(this);
            this.activeIndex = -1;
            this.length = 0;
            this.$mask.hide();
        }
    }, {
        key: 'unmount',
        value: function unmount() {
            this.$el.hide();
        }
    }, {
        key: 'updateView',
        value: function updateView() {
            if (this.visible) {
                var width = 0;
                this.$('.J_imageViewerSlideItem').each(function () {
                    width += $(this).outerWidth(true);
                });
                this.$list.width(width);
                this.updateScrollbar();
                this.updateMask();
            }
        }
    }, {
        key: 'getWrapHeight',
        value: function getWrapHeight() {
            if (_isSupportFlex2["default"]) {
                return 0;
            } else {
                return this.$el.height();
            }
        }
    }, {
        key: 'preactive',
        value: function preactive(index) {
            index = parseInt(index, 10);
            if (isNaN(index) || index === this.activeIndex || index >= this.length || index < 0) {
                return;
            }
            this.dispatch('change', index);
        }
    }, {
        key: 'active',
        value: function active(index) {
            index = parseInt(index, 10);
            if (isNaN(index) || index === this.activeIndex || index >= this.length || index < 0) {
                return;
            }
            this.activeIndex = index;
            this.updatePosition(true, true);
        }
    }, {
        key: 'activeNext',
        value: function activeNext() {
            if (this.length) {
                this.preactive((this.activeIndex + 1) % this.length);
            }
        }
    }, {
        key: 'activePrev',
        value: function activePrev() {
            if (this.length) {
                this.preactive((this.activeIndex - 1 + this.length) % this.length);
            }
        }
    }, {
        key: 'updateMask',
        value: function updateMask(noAnimation) {
            this.updatePosition(true, false, noAnimation);
        }
    }, {
        key: 'updateScroll',
        value: function updateScroll() {
            this.updatePosition(false, true);
        }
    }, {
        key: 'updatePosition',
        value: function updatePosition(mask, scroll, noAnimation) {
            if (!this.visible || !this.$mask) {
                return;
            }
            var listOffset = this.$list.offset();
            var $element = this.$('.J_imageViewerSlideItem').eq(this.activeIndex);
            var offset = $element.offset();
            var position = {
                left: offset.left - listOffset.left,
                top: offset.top - listOffset.top,
                width: $element.outerWidth(true),
                originLeft: offset.left,
                originTop: offset.top
            };
            if (mask) {
                this.updateMaskPosition(position, noAnimation);
            }
            if (scroll) {
                this.updateScrollPosition(position);
            }
        }
    }, {
        key: 'updateScrollPosition',
        value: function updateScrollPosition(position) {
            if (this.scrolling) {
                return;
            }
            var width = this.$box.width();
            if (position.originLeft < 0) {
                this.$box.mCustomScrollbar('scrollTo', -position.left + 7);
            } else if (position.originLeft + position.width > width) {
                this.$box.mCustomScrollbar('scrollTo', position.left + position.width - width);
            }
        }
    }, {
        key: 'updateMaskPosition',
        value: function updateMaskPosition(position, noAnimation) {
            if (!this.visible || !this.$mask) {
                return;
            }
            var left = position.left,
                top = position.top;

            var newPosition = { left: left, top: top };
            if (noAnimation) {
                this.$mask.css(newPosition, 200);
            } else {
                this.$mask.animate(newPosition, 200);
            }
            this.$mask.show();
        }
    }, {
        key: 'slideDown',
        value: function slideDown() {
            var _this2 = this;

            this.$el.slideDown(200, function () {
                _this2.visible = true;
                _this2.updateMask(true);
                _this2.dispatch('visibilitychange', true);
            });
        }
    }, {
        key: 'slideUp',
        value: function slideUp() {
            var _this3 = this;

            this.$el.slideUp(200, function () {
                _this3.visible = false;
                _this3.$mask.hide();
                _this3.dispatch('visibilitychange', false);
            });
        }
    }, {
        key: 'toggle',
        value: function toggle() {
            if (this.visible) {
                this.slideUp();
            } else {
                this.slideDown();
            }
        }
        // ***************************************

    }, {
        key: 'getScrollbar',
        value: function getScrollbar() {
            var self = this;
            if (!this.scrollbar) {
                this.scrollbar = this.$box.mCustomScrollbar({
                    axis: 'x',
                    autoExpandScrollbar: true,
                    advanced: {
                        autoExpandHorizontalScroll: true
                    },
                    mouseWheel: {
                        axis: 'x'
                    },
                    keyboard: {
                        enable: false
                    },
                    documentTouchScroll: true,
                    callbacks: {
                        onScroll: function onScroll() {
                            self.scrolling = false;
                        },
                        whileScrolling: function whileScrolling() {
                            self.scrolling = true;
                        }
                    }
                });
            }
            return this.scrollbar;
        }
    }, {
        key: 'updateScrollbar',
        value: function updateScrollbar() {
            if (this.visible) {
                this.getScrollbar();
                this.$box.mCustomScrollbar('update');
            }
        }
        // ***************************************

    }]);

    return Slide;
}(_Base3["default"]);

/***/ }),
/* 17 */
/*!**************************************************!*\
  !*** ./components/image-viewer/slide/index.scss ***!
  \**************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);