function v(n, o, s, p, i, l, u, c) {
  var e = typeof n == "function" ? n.options : n;
  o && (e.render = o, e.staticRenderFns = s, e._compiled = !0), p && (e.functional = !0), l && (e._scopeId = "data-v-" + l);
  var r;
  if (u ? (r = function(t) {
    t = t || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !t && typeof __VUE_SSR_CONTEXT__ < "u" && (t = __VUE_SSR_CONTEXT__), i && i.call(this, t), t && t._registeredComponents && t._registeredComponents.add(u);
  }, e._ssrRegister = r) : i && (r = c ? function() {
    i.call(
      this,
      (e.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : i), r)
    if (e.functional) {
      e._injectStyles = r;
      var m = e.render;
      e.render = function(h, d) {
        return r.call(d), m(h, d);
      };
    } else {
      var _ = e.beforeCreate;
      e.beforeCreate = _ ? [].concat(_, r) : [r];
    }
  return {
    exports: n,
    options: e
  };
}
const g = {
  name: "EmptyLogo",
  props: {
    storeName: {
      type: String,
      required: !0
    }
  },
  computed: {
    fontSize() {
      const n = Math.round(37.8 - 1.3 * this.storeName.length);
      return n < 17 ? 17 : n;
    }
  }
};
var C = function() {
  var o = this, s = o._self._c;
  return s("div", { ref: "emptyLogo", staticClass: "empty-logo", style: `font-size: ${o.fontSize}px` }, [s("a", { staticClass: "-clean", attrs: { href: "/" } }, [o._v(" " + o._s(o.storeName) + " ")])]);
}, y = [], $ = /* @__PURE__ */ v(
  g,
  C,
  y,
  !1,
  null,
  null,
  null,
  null
);
const R = $.exports;
function f(n) {
  f.installed || (f.installed = !0, n.component("EmptyLogo", R));
}
const S = {
  install: f
};
let a = null;
typeof window < "u" ? a = window.Vue : typeof global < "u" && (a = global.Vue);
a && a.use(S);
export {
  R as default
};
