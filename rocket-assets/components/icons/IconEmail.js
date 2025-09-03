function C(t, r, l, p, i, f, d, c) {
  var e = typeof t == "function" ? t.options : t;
  r && (e.render = r, e.staticRenderFns = l, e._compiled = !0), p && (e.functional = !0), f && (e._scopeId = "data-v-" + f);
  var o;
  if (d ? (o = function(n) {
    n = n || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !n && typeof __VUE_SSR_CONTEXT__ < "u" && (n = __VUE_SSR_CONTEXT__), i && i.call(this, n), n && n._registeredComponents && n._registeredComponents.add(d);
  }, e._ssrRegister = o) : i && (o = c ? function() {
    i.call(
      this,
      (e.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : i), o)
    if (e.functional) {
      e._injectStyles = o;
      var v = e.render;
      e.render = function(h, _) {
        return o.call(_), v(h, _);
      };
    } else {
      var u = e.beforeCreate;
      e.beforeCreate = u ? [].concat(u, o) : [o];
    }
  return {
    exports: t,
    options: e
  };
}
const m = {
  name: "IconEmail"
};
var w = function() {
  var r = this, l = r._self._c;
  return l("svg", { attrs: { width: "32", height: "32", viewBox: "0 0 32 32", xmlns: "http://www.w3.org/2000/svg" } }, [l("path", { attrs: { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M27 9C27 7.89543 26.1046 7 25 7H7C5.89543 7 5 7.89543 5 9V23C5 24.1046 5.89543 25 7 25H25C26.1046 25 27 24.1046 27 23V9ZM25 13.4705V23H7L7 13.4703L15.4795 18.6408C15.7992 18.8357 16.2011 18.8357 16.5208 18.6408L25 13.4705ZM25 11.128V9L7 9V11.1279L16.0001 16.6158L25 11.128Z" } })]);
}, V = [], g = /* @__PURE__ */ C(
  m,
  w,
  V,
  !1,
  null,
  null,
  null,
  null
);
const L = g.exports;
function s(t) {
  s.installed || (s.installed = !0, t.component("IconEmail", L));
}
const R = {
  install: s
};
let a = null;
typeof window < "u" ? a = window.Vue : typeof global < "u" && (a = global.Vue);
a && a.use(R);
export {
  L as default
};
