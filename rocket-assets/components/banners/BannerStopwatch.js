function C(o, r, a, c, i, f, _, p) {
  var n = typeof o == "function" ? o.options : o;
  r && (n.render = r, n.staticRenderFns = a, n._compiled = !0), c && (n.functional = !0), f && (n._scopeId = "data-v-" + f);
  var t;
  if (_ ? (t = function(e) {
    e = e || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !e && typeof __VUE_SSR_CONTEXT__ < "u" && (e = __VUE_SSR_CONTEXT__), i && i.call(this, e), e && e._registeredComponents && e._registeredComponents.add(_);
  }, n._ssrRegister = t) : i && (t = p ? function() {
    i.call(
      this,
      (n.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : i), t)
    if (n.functional) {
      n._injectStyles = t;
      var h = n.render;
      n.render = function(v, d) {
        return t.call(d), h(v, d);
      };
    } else {
      var u = n.beforeCreate;
      n.beforeCreate = u ? [].concat(u, t) : [t];
    }
  return {
    exports: o,
    options: n
  };
}
const w = {
  name: "BannerStopwatch"
};
var m = function() {
  var r = this, a = r._self._c;
  return a("div", { staticClass: "banner-stopwatch-holder flex -vcenter" }, [a("i", { staticClass: "icon icon-stopwatch" }), a("Stopwatch", { staticClass: "banner-stopwatch" })], 1);
}, b = [], R = /* @__PURE__ */ C(
  w,
  m,
  b,
  !1,
  null,
  null,
  null,
  null
);
const $ = R.exports;
function l(o) {
  l.installed || (l.installed = !0, o.component("BannerStopwatch", $));
}
const g = {
  install: l
};
let s = null;
typeof window < "u" ? s = window.Vue : typeof global < "u" && (s = global.Vue);
s && s.use(g);
export {
  $ as default
};
