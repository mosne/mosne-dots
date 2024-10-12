/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/Cursor.js":
/*!**************************!*\
  !*** ./src/js/Cursor.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Simple cursor trail
 */

class Cursor {
  /**
   * Creates a new Cursor instance.
   * @constructor
   * @param {Object} options - The options for the Cursor instance.
   */
  constructor(options) {
    const self = this;
    const onMouseMove = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.documentElement.classList.add('custom-cursor-initialized');
      self.initialize();
    };
    const onTouchStart = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousemove', onTouchStart);
    };
    this._settings = Object.assign({}, Cursor.defaults, options);
    this._isInitialized = false;
    document.addEventListener('mousemove', onMouseMove);
  }

  /**
   * Initializes the Cursor instance.
   *
   * @returns {Cursor} The Cursor instance.
   */
  initialize() {
    const {
      cursor
    } = this._settings;
    if (!this._isInitialized) {
      this._cursor = parseHtml(cursor);
      this._raf = null;
      this._isInitialized = true;
      this._mouse = {
        x: 0,
        y: 0
      };
      this._onMouseEnterHandler = onMouseEnter.bind(this);
      this._onMouseLeaveHandler = onMouseLeave.bind(this);
      this._onMouseMoveHandler = onMouseMove.bind(this);
      document.body.appendChild(this._cursor);
      this.initTriggers(document);
      window.addEventListener(`mousemove`, this._onMouseMoveHandler);
      window.document.addEventListener(`touchmove`, this._onMouseMoveHandler);
      this.startAnimation();
    }
    return this;
  }

  /**
   * Returns whether the cursor is initialized or not.
   *
   * @returns {boolean} Whether the cursor is initialized or not.
   */
  isInitialized() {
    return this._isInitialized;
  }

  /**
   * Starts the cursor animation.
   * @returns {Cursor} The Cursor instance.
   */
  startAnimation() {
    let lastX = 0;
    let lastY = 0;
    let self = this;

    /**
     * Animates the cursor using requestAnimationFrame.
     */
    function animate() {
      self._raf = window.requestAnimationFrame(loop);
    }

    /**
     * Calculates the delta values based on the cursor position and updates the CSS variables for eye-x and eye-y accordingly.
     * @param {number} cx - The x-coordinate of the cursor position.
     * @param {number} cy - The y-coordinate of the cursor position.
     */
    function delta(cx, cy) {
      const ex = window.innerWidth / 2;
      const ey = window.innerHeight / 2;
      const dy = ey - cy;
      const dx = ex - cx;
      const deltax = dx / 20 * -1;
      const deltay = dy / 20 * -1;
      document.body.style.setProperty('--eye-x', deltax + 'px');
      document.body.style.setProperty('--eye-y', deltay + 'px');
    }

    /**
     * Animates the cursor and updates its position on the screen.
     */
    function loop() {
      animate();
      let x = self._mouse.x + (lastX - self._mouse.x) * 0.8;
      let y = self._mouse.y + (lastY - self._mouse.y) * 0.8;
      delta(self._mouse.x, self._mouse.y);
      document.body.style.setProperty('--cursor-x', x + 'px');
      document.body.style.setProperty('--cursor-y', y + 'px');
      lastX = x;
      lastY = y;
    }
    if (this._isInitialized) {
      animate();
    }
    return this;
  }

  /**
   * Stops the animation frame of the cursor.
   * @returns {Cursor} The Cursor instance.
   */
  stopAnimantion() {
    window.cancelAnimationFrame(this._raf);
    return this;
  }

  /**
   * Initializes the triggers for the cursor.
   * @param {HTMLElement} context - The context in which to search for triggers.
   */
  initTriggers(context) {
    if (this._isInitialized) {
      const triggers = context.querySelectorAll(this._settings.triggers);
      for (let i = 0; i < triggers.length; i++) {
        triggers[i].addEventListener('mouseenter', this._onMouseEnterHandler);
        triggers[i].addEventListener('mouseleave', this._onMouseLeaveHandler);
      }
    }
  }

  /**
   * Sets the cursor as active.
   * @returns {Cursor} The Cursor instance.
   */
  setCursorActive() {
    if (this._isInitialized) {
      this._cursor.classList.add(this._settings.activeClass);
    }
    return this;
  }

  /**
   * Sets the cursor to its default state by removing the active class.
   *
   * @returns {Cursor} The Cursor instance.
   */
  setCursorDefault() {
    if (this._isInitialized) {
      this._cursor.classList.remove(this._settings.activeClass);
    }
    return this;
  }

  /**
   * Returns the cursor.
   *
   * @returns {Cursor} The cursor object.
   */
  getCursor() {
    return this._cursor;
  }
}

// ----
// defaults
// ----
Cursor.defaults = {
  cursor: '<div class="custom-cursor"><div class="cursor"></div></div>',
  triggers: 'a, button',
  activeClass: 'custom-cursor-active'
};

// ----
// private
// ----

// ----
// utils
// ----
function parseHtml(htmlStr) {
  var div = document.createElement('div');
  div.innerHTML = htmlStr;
  return div.children[0];
}

// ----
// events
// ----
function onMouseEnter() {
  this.setCursorActive();
}
function onMouseLeave() {
  this.setCursorDefault();
}
function onMouseMove(e) {
  this._mouse.x = e.clientX;
  this._mouse.y = e.clientY;
}
// ----
// init
// ----

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new Cursor());

/***/ }),

/***/ "./src/index.scss":
/*!************************!*\
  !*** ./src/index.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_Cursor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/Cursor */ "./src/js/Cursor.js");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.scss */ "./src/index.scss");


})();

/******/ })()
;
//# sourceMappingURL=index.js.map