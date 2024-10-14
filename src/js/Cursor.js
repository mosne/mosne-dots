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
    const self = this
    const onMouseMove = function () {
      document.removeEventListener('mousemove', onMouseMove)
      document.documentElement.classList.add('custom-cursor-initialized')
      self.initialize()
    }
    const onTouchStart = function () {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mousemove', onTouchStart)
    }

    this._settings = Object.assign({}, Cursor.defaults, options)
    this._isInitialized = false

    document.addEventListener('mousemove', onMouseMove)
  }

  /**
   * Initializes the Cursor instance.
   *
   * @returns {Cursor} The Cursor instance.
   */
  initialize() {
    const { cursor } = this._settings

    if (!this._isInitialized) {
      this._cursor = parseHtml(cursor)
      this._raf = null
      this._isInitialized = true
      this._mouse = {
        x: 0,
        y: 0,
      }
      this._onMouseEnterHandler = onMouseEnter.bind(this)
      this._onMouseLeaveHandler = onMouseLeave.bind(this)
      this._onMouseMoveHandler = onMouseMove.bind(this)

      document.body.appendChild(this._cursor)
      this.initTriggers(document)
      
      window.addEventListener(`mousemove`, this._onMouseMoveHandler)
      window.document.addEventListener(`touchmove`, this._onMouseMoveHandler)
      this.startAnimation()
    }

    return this
  }

  /**
   * Returns whether the cursor is initialized or not.
   *
   * @returns {boolean} Whether the cursor is initialized or not.
   */
  isInitialized() {
    return this._isInitialized
  }

  /**
   * Starts the cursor animation.
   * @returns {Cursor} The Cursor instance.
   */
  startAnimation() {
    let lastX = 0
    let lastY = 0
    let self = this

    /**
     * Animates the cursor using requestAnimationFrame.
     */
    function animate() {
      self._raf = window.requestAnimationFrame(loop)
    }

    /**
     * Animates the cursor and updates its position on the screen.
     */
    function loop() {
      animate()
      let x = self._mouse.x + (lastX - self._mouse.x) * 0.8
      let y = self._mouse.y + (lastY - self._mouse.y) * 0.8
      self._cursor.style.setProperty('--cursor-x', x + 'px')
      self._cursor.style.setProperty('--cursor-y', y + 'px')
      lastX = x
      lastY = y
    }

    if (this._isInitialized) {
      animate()
    }

    return this
  }

  /**
   * Stops the animation frame of the cursor.
   * @returns {Cursor} The Cursor instance.
   */
  stopAnimantion() {
    window.cancelAnimationFrame(this._raf)
    return this
  }

  /**
   * Initializes the triggers for the cursor.
   * @param {HTMLElement} context - The context in which to search for triggers.
   */
  initTriggers(context) {
    if (this._isInitialized) {
      const triggers = context.querySelectorAll(this._settings.triggers)
      for (let i = 0; i < triggers.length; i++) {
        triggers[i].addEventListener('mouseenter', this._onMouseEnterHandler)
        triggers[i].addEventListener('mouseleave', this._onMouseLeaveHandler)
      }
    }
  }

  /**
   * Sets the cursor as active.
   * @returns {Cursor} The Cursor instance.
   */
  setCursorActive() {
    if (this._isInitialized) {
      this._cursor.classList.add(this._settings.activeClass)
    }
    return this
  }

  /**
   * Sets the cursor to its default state by removing the active class.
   *
   * @returns {Cursor} The Cursor instance.
   */
  setCursorDefault() {
    if (this._isInitialized) {
      this._cursor.classList.remove(this._settings.activeClass)
    }
    return this
  }

  /**
   * Returns the cursor.
   *
   * @returns {Cursor} The cursor object.
   */
  getCursor() {
    return this._cursor
  }
}

// ----
// defaults
// ----
Cursor.defaults = {
  cursor: '<div class="custom-cursor"><div class="cursor"></div></div>',
  triggers: 'a, button, input[type="submit"], input[type="button"], input[type="reset"',
  activeClass: 'custom-cursor-active',
}

// ----
// private
// ----

// ----
// utils
// ----
function parseHtml(htmlStr) {
  var div = document.createElement('div')
  div.innerHTML = htmlStr
  return div.children[0]
}

// ----
// events
// ----
function onMouseEnter() {
  this.setCursorActive()
}

function onMouseLeave() {
  this.setCursorDefault()
}

function onMouseMove(e) {
  this._mouse.x = e.clientX
  this._mouse.y = e.clientY
}
// ----
// init
// ----

export default new Cursor()
