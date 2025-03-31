(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode(".masonry-container[data-v-0b049570]{display:grid;max-width:740px;grid-template-columns:repeat(2,1fr);grid-gap:32px;margin:0 auto;grid-auto-rows:0px}@media screen and (max-width: 1220px){.masonry-container[data-v-0b049570]{max-width:538px;display:flex;flex-flow:column nowrap;grid-gap:0}.masonry-container .holder-review[data-v-0b049570]{max-width:100%;margin-top:32px}}@media screen and (max-width: 700px){.masonry-container[data-v-0b049570]{grid-gap:0;max-width:unset}.masonry-container .holder-review[data-v-0b049570]{margin-top:0}}.masonry-container .header[data-v-0b049570]{grid-area:1/1/4/3;border:none;display:flex;align-items:flex-end;justify-content:flex-end;grid-row-end:span 2}@media screen and (max-width: 700px){.masonry-container .header[data-v-0b049570]{display:block}}@media screen and (max-width: 700px){.masonry-container .header .select-order[data-v-0b049570]{display:flex;justify-content:space-between;margin-top:51px}}@media screen and (max-width: 700px){.masonry-container .header .select-order .custom-select[data-v-0b049570]{flex-grow:2}}.masonry-container .header .select-order .-title[data-v-0b049570]{color:var(--black-medium);font-size:var(--font-12)}")),document.head.appendChild(e)}}catch(a){console.error("vite-plugin-css-injected-by-js",a)}})();
function m(t, a, r, c, i, l, f, p) {
  var e = typeof t == "function" ? t.options : t;
  a && (e.render = a, e.staticRenderFns = r, e._compiled = !0), c && (e.functional = !0), l && (e._scopeId = "data-v-" + l);
  var o;
  if (f ? (o = function(n) {
    n = n || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !n && typeof __VUE_SSR_CONTEXT__ < "u" && (n = __VUE_SSR_CONTEXT__), i && i.call(this, n), n && n._registeredComponents && n._registeredComponents.add(f);
  }, e._ssrRegister = o) : i && (o = p ? function() {
    i.call(
      this,
      (e.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : i), o)
    if (e.functional) {
      e._injectStyles = o;
      var v = e.render;
      e.render = function(h, u) {
        return o.call(u), v(h, u);
      };
    } else {
      var d = e.beforeCreate;
      e.beforeCreate = d ? [].concat(d, o) : [o];
    }
  return {
    exports: t,
    options: e
  };
}
const y = {
  name: "MansonryLayout"
};
var C = function() {
  var a = this, r = a._self._c;
  return r("div", { staticClass: "masonry-container" }, [r("div", { staticClass: "header" }, [a._t("header")], 2), a._t("default")], 2);
}, b = [], g = /* @__PURE__ */ m(
  y,
  C,
  b,
  !1,
  null,
  "0b049570",
  null,
  null
);
const R = g.exports;
function _(t) {
  _.installed || (_.installed = !0, t.component("MasonryLayout", R));
}
const $ = {
  install: _
};
let s = null;
typeof window < "u" ? s = window.Vue : typeof global < "u" && (s = global.Vue);
s && s.use($);
export {
  R as default
};
