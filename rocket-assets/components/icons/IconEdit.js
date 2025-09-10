function L(o, r, s, p, i, f, _, c) {
  var n = typeof o == "function" ? o.options : o;
  r && (n.render = r, n.staticRenderFns = s, n._compiled = !0), p && (n.functional = !0), f && (n._scopeId = "data-v-" + f);
  var t;
  if (_ ? (t = function(e) {
    e = e || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !e && typeof __VUE_SSR_CONTEXT__ < "u" && (e = __VUE_SSR_CONTEXT__), i && i.call(this, e), e && e._registeredComponents && e._registeredComponents.add(_);
  }, n._ssrRegister = t) : i && (t = c ? function() {
    i.call(
      this,
      (n.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : i), t)
    if (n.functional) {
      n._injectStyles = t;
      var h = n.render;
      n.render = function(v, u) {
        return t.call(u), h(v, u);
      };
    } else {
      var d = n.beforeCreate;
      n.beforeCreate = d ? [].concat(d, t) : [t];
    }
  return {
    exports: o,
    options: n
  };
}
const m = {
  name: "IconEdit"
};
var w = function() {
  var r = this, s = r._self._c;
  return s("svg", { attrs: { width: "32", height: "32", viewBox: "0 0 32 32", xmlns: "http://www.w3.org/2000/svg" } }, [s("path", { attrs: { d: "M14.586 16L10.4828 20.1032L11.897 21.5174L16.0002 17.4142L20.1035 21.5175L21.5177 20.1033L17.4144 16L21.5171 11.8974L20.1029 10.4832L16.0002 14.5858L11.8976 10.4832L10.4834 11.8974L14.586 16Z" } })]);
}, g = [], C = /* @__PURE__ */ L(
  m,
  w,
  g,
  !1,
  null,
  null,
  null,
  null
);
const R = C.exports;
function l(o) {
  l.installed || (l.installed = !0, o.component("IconEdit", R));
}
const $ = {
  install: l
};
let a = null;
typeof window < "u" ? a = window.Vue : typeof global < "u" && (a = global.Vue);
a && a.use($);
export {
  R as default
};
