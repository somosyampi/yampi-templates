function m(a, n, r, p, i, u, f, c) {
  var e = typeof a == "function" ? a.options : a;
  n && (e.render = n, e.staticRenderFns = r, e._compiled = !0), p && (e.functional = !0), u && (e._scopeId = "data-v-" + u);
  var o;
  if (f ? (o = function(t) {
    t = t || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !t && typeof __VUE_SSR_CONTEXT__ < "u" && (t = __VUE_SSR_CONTEXT__), i && i.call(this, t), t && t._registeredComponents && t._registeredComponents.add(f);
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
      var _ = e.beforeCreate;
      e.beforeCreate = _ ? [].concat(_, o) : [o];
    }
  return {
    exports: a,
    options: e
  };
}
const C = {
  name: "DiscountTag",
  props: {
    value: {
      type: Number,
      default: 0
    }
  },
  computed: {
    formattedValue() {
      return Math.round(this.value);
    }
  }
};
var g = function() {
  var n = this, r = n._self._c;
  return n.value > 0 ? r("div", { staticClass: "discount-tag" }, [r("span", [n._v(n._s(n.formattedValue))])]) : n._e();
}, V = [], b = /* @__PURE__ */ m(
  C,
  g,
  V,
  !1,
  null,
  null,
  null,
  null
);
const R = b.exports;
function l(a) {
  l.installed || (l.installed = !0, a.component("DiscountTag", R));
}
const T = {
  install: l
};
let s = null;
typeof window < "u" ? s = window.Vue : typeof global < "u" && (s = global.Vue);
s && s.use(T);
export {
  R as default
};
