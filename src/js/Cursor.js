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
    const onMouseMove = () => {
      document.documentElement.classList.add('custom-cursor-initialized')
      this.initialize()
    }
    const onTouchStart = () => {
      document.removeEventListener('mousemove', onMouseMove)
    }

    this._settings = Object.assign({}, Cursor.defaults, options)
    this._isInitialized = false

    document.addEventListener('mousemove', onMouseMove, {once: true})
    document.addEventListener('touchstart', onTouchStart, {once: true})
  }

  /**
   * Initializes the Cursor instance.
   * @returns {Cursor} The Cursor instance.
   */
  initialize() {
    const { cursor } = this._settings

    if (!this._isInitialized && matchMedia('(pointer:fine)').matches) {
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
    const last = {
      x: 0,
      y: 0,
    }
    const animate = () => {
      const x = this._mouse.x + (last.x - this._mouse.x) * .85
      const y = this._mouse.y + (last.y - this._mouse.y) * .85

      this._cursor.style.transform = `translate(${x}px, ${y}px)`

      last.x = x
      last.y = y

      this._raf = window.requestAnimationFrame(animate)
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
   * @returns {Cursor} The Cursor instance.
   */
  initTriggers(context) {
    if (this._isInitialized) {
      const triggers = context.querySelectorAll(this._settings.triggers)
      for (let i = 0; i < triggers.length; i++) {
        triggers[i].addEventListener('mouseenter', this._onMouseEnterHandler)
        triggers[i].addEventListener('mouseleave', this._onMouseLeaveHandler)
      }
    }
    return this
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
