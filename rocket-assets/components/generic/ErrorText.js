function m(r, t, a, p, i, f, _, c) {
  var e = typeof r == "function" ? r.options : r;
  t && (e.render = t, e.staticRenderFns = a, e._compiled = !0), p && (e.functional = !0), f && (e._scopeId = "data-v-" + f);
  var o;
  if (_ ? (o = function(n) {
    n = n || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !n && typeof __VUE_SSR_CONTEXT__ < "u" && (n = __VUE_SSR_CONTEXT__), i && i.call(this, n), n && n._registeredComponents && n._registeredComponents.add(_);
  }, e._ssrRegister = o) : i && (o = c ? function() {
    i.call(
      this,
      (e.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : i), o)
    if (e.functional) {
      e._injectStyles = o;
      var v = e.render;
      e.render = function(h, d) {
        return o.call(d), v(h, d);
      };
    } else {
      var u = e.beforeCreate;
      e.beforeCreate = u ? [].concat(u, o) : [o];
    }
  return {
    exports: r,
    options: e
  };
}
const C = {
  name: "ErrorText",
  props: {
    text: {
      type: String,
      default: ""
    }
  }
};
var g = function() {
  var t = this, a = t._self._c;
  return t.text ? a("div", { staticClass: "error-text", domProps: { textContent: t._s(t.text) } }) : t._e();
}, R = [], T = /* @__PURE__ */ m(
  C,
  g,
  R,
  !1,
  null,
  null,
  null,
  null
);
const $ = T.exports;
function l(r) {
  l.installed || (l.installed = !0, r.component("ErrorText", $));
}
const b = {
  install: l
};
let s = null;
typeof window < "u" ? s = window.Vue : typeof global < "u" && (s = global.Vue);
s && s.use(b);
export {
  $ as default
};
