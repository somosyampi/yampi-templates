function v(o, s, r, C, i, f, _, p) {
  var e = typeof o == "function" ? o.options : o;
  s && (e.render = s, e.staticRenderFns = r, e._compiled = !0), C && (e.functional = !0), f && (e._scopeId = "data-v-" + f);
  var t;
  if (_ ? (t = function(n) {
    n = n || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !n && typeof __VUE_SSR_CONTEXT__ < "u" && (n = __VUE_SSR_CONTEXT__), i && i.call(this, n), n && n._registeredComponents && n._registeredComponents.add(_);
  }, e._ssrRegister = t) : i && (t = p ? function() {
    i.call(
      this,
      (e.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : i), t)
    if (e.functional) {
      e._injectStyles = t;
      var h = e.render;
      e.render = function(c, u) {
        return t.call(u), h(c, u);
      };
    } else {
      var d = e.beforeCreate;
      e.beforeCreate = d ? [].concat(d, t) : [t];
    }
  return {
    exports: o,
    options: e
  };
}
const w = {};
var m = function() {
  var s = this, r = s._self._c;
  return r("svg", { attrs: { width: "11", height: "6", viewBox: "0 0 11 6", xmlns: "http://www.w3.org/2000/svg" } }, [r("path", { attrs: { d: "M4.87843 5.72727C5.24207 6.09091 5.72692 6.09091 6.09056 5.72727C7.18147 4.63636 9.24207 2.57576 10.333 1.48485C10.6966 1.12121 10.6966 0.636364 10.333 0.272728C9.96935 -0.0909089 9.4845 -0.0909089 9.12086 0.272727C8.02995 1.36364 5.96934 3.42424 4.87843 4.51515C4.5148 4.87879 4.5148 5.36364 4.87843 5.72727Z" } }), r("path", { attrs: { d: "M6.09056 5.72727C6.45419 5.36364 6.45419 4.87879 6.09055 4.51515C4.99965 3.42424 2.93904 1.36364 1.84813 0.272727C1.48449 -0.0909091 0.999645 -0.0909091 0.636009 0.272727C0.272372 0.636364 0.272372 1.12121 0.636009 1.48485C1.72692 2.57576 3.78753 4.63636 4.87843 5.72727C5.24207 6.09091 5.72692 6.09091 6.09056 5.72727Z" } })]);
}, g = [], R = /* @__PURE__ */ v(
  w,
  m,
  g,
  !1,
  null,
  null,
  null,
  null
);
const $ = R.exports;
function l(o) {
  l.installed || (l.installed = !0, o.component("SelectArrow", $));
}
const b = {
  install: l
};
let a = null;
typeof window < "u" ? a = window.Vue : typeof global < "u" && (a = global.Vue);
a && a.use(b);
export {
  $ as default
};
