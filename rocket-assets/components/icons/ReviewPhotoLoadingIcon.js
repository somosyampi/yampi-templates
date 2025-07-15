function m(o, a, r, c, i, f, d, h) {
  var e = typeof o == "function" ? o.options : o;
  a && (e.render = a, e.staticRenderFns = r, e._compiled = !0), c && (e.functional = !0), f && (e._scopeId = "data-v-" + f);
  var t;
  if (d ? (t = function(n) {
    n = n || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !n && typeof __VUE_SSR_CONTEXT__ < "u" && (n = __VUE_SSR_CONTEXT__), i && i.call(this, n), n && n._registeredComponents && n._registeredComponents.add(d);
  }, e._ssrRegister = t) : i && (t = h ? function() {
    i.call(
      this,
      (e.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : i), t)
    if (e.functional) {
      e._injectStyles = t;
      var p = e.render;
      e.render = function(v, _) {
        return t.call(_), p(v, _);
      };
    } else {
      var u = e.beforeCreate;
      e.beforeCreate = u ? [].concat(u, t) : [t];
    }
  return {
    exports: o,
    options: e
  };
}
const w = {
  name: "ReviewPhotoLoadingIcon"
};
var g = function() {
  var a = this, r = a._self._c;
  return r("svg", { attrs: { viewBox: "0 0 96 96", fill: "none", xmlns: "http://www.w3.org/2000/svg" } }, [r("rect", { attrs: { opacity: "0.3", x: "0.5", y: "0.5", width: "94.4545", height: "94.4545", rx: "4.5", fill: "#F5F5F5", stroke: "#666666" } }), r("circle", { attrs: { cx: "48", cy: "48", fill: "none", stroke: "#666666", "stroke-width": "4", r: "17", "stroke-dasharray": "80.11061266653974 28.703537555513243" } }, [r("animateTransform", { attrs: { attributeName: "transform", type: "rotate", repeatCount: "indefinite", dur: "1s", values: "0 48 48;360 48 48", keyTimes: "0;1" } })], 1)]);
}, C = [], y = /* @__PURE__ */ m(
  w,
  g,
  C,
  !1,
  null,
  null,
  null,
  null
);
const R = y.exports;
function l(o) {
  l.installed || (l.installed = !0, o.component("ReviewPhotoLoadingIcon", R));
}
const b = {
  install: l
};
let s = null;
typeof window < "u" ? s = window.Vue : typeof global < "u" && (s = global.Vue);
s && s.use(b);
export {
  R as default
};
