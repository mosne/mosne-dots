(()=>{"use strict";class t{constructor(i){const s=()=>{document.documentElement.classList.add("custom-cursor-initialized"),this.initialize()};this._settings=Object.assign({},t.defaults,i),this._isInitialized=!1,document.addEventListener("mousemove",s,{once:!0}),document.addEventListener("touchstart",(()=>{document.removeEventListener("mousemove",s)}),{once:!0})}initialize(){const{cursor:t}=this._settings;var n,r;return!this._isInitialized&&matchMedia("(pointer:fine)").matches&&(this._cursor=(n=t,(r=document.createElement("div")).innerHTML=n,r.children[0]),this._raf=null,this._isInitialized=!0,this._mouse={x:0,y:0},this._onMouseEnterHandler=i.bind(this),this._onMouseLeaveHandler=s.bind(this),this._onMouseMoveHandler=e.bind(this),document.body.appendChild(this._cursor),this.initTriggers(document),window.addEventListener("mousemove",this._onMouseMoveHandler),window.document.addEventListener("touchmove",this._onMouseMoveHandler),this.startAnimation()),this}isInitialized(){return this._isInitialized}startAnimation(){const t={x:0,y:0},i=()=>{const s=this._mouse.x+.85*(t.x-this._mouse.x),e=this._mouse.y+.85*(t.y-this._mouse.y);this._cursor.style.transform=`translate(${s}px, ${e}px)`,t.x=s,t.y=e,this._raf=window.requestAnimationFrame(i)};return this._isInitialized&&i(),this}stopAnimantion(){return window.cancelAnimationFrame(this._raf),this}initTriggers(t){if(this._isInitialized){const i=t.querySelectorAll(this._settings.triggers);for(let t=0;t<i.length;t++)i[t].addEventListener("mouseenter",this._onMouseEnterHandler),i[t].addEventListener("mouseleave",this._onMouseLeaveHandler)}return this}setCursorActive(){return this._isInitialized&&this._cursor.classList.add(this._settings.activeClass),this}setCursorDefault(){return this._isInitialized&&this._cursor.classList.remove(this._settings.activeClass),this}getCursor(){return this._cursor}}function i(){this.setCursorActive()}function s(){this.setCursorDefault()}function e(t){this._mouse.x=t.clientX,this._mouse.y=t.clientY}t.defaults={cursor:'<div class="custom-cursor"><div class="cursor"></div></div>',triggers:'a, button, input[type="submit"], input[type="button"], input[type="reset"',activeClass:"custom-cursor-active"},new t})();