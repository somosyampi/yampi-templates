function v(r, i, s, _, t, f, u, c) {
  var n = typeof r == "function" ? r.options : r;
  i && (n.render = i, n.staticRenderFns = s, n._compiled = !0), _ && (n.functional = !0), f && (n._scopeId = "data-v-" + f);
  var o;
  if (u ? (o = function(e) {
    e = e || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !e && typeof __VUE_SSR_CONTEXT__ < "u" && (e = __VUE_SSR_CONTEXT__), t && t.call(this, e), e && e._registeredComponents && e._registeredComponents.add(u);
  }, n._ssrRegister = o) : t && (o = c ? function() {
    t.call(
      this,
      (n.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : t), o)
    if (n.functional) {
      n._injectStyles = o;
      var h = n.render;
      n.render = function(m, p) {
        return o.call(p), h(m, p);
      };
    } else {
      var d = n.beforeCreate;
      n.beforeCreate = d ? [].concat(d, o) : [o];
    }
  return {
    exports: r,
    options: n
  };
}
const g = {
  name: "ShoppingPageRow",
  props: {
    redirectTo: {
      type: String,
      required: !0
    }
  }
};
var C = function(i, s) {
  return i("div", { staticClass: "rkt-link-container-row" }, [i("AtomLink", { staticClass: "shopping-cart-link", attrs: { label: "Minhas compras", href: s.props.redirectTo, title: "Ir para minhas compras" } })], 1);
}, w = [], R = /* @__PURE__ */ v(
  g,
  C,
  w,
  !0,
  null,
  null,
  null,
  null
);
const b = R.exports;
function l(r) {
  l.installed || (l.installed = !0, r.component("ShoppingPageRow", b));
}
const T = {
  install: l
};
let a = null;
typeof window < "u" ? a = window.Vue : typeof global < "u" && (a = global.Vue);
a && a.use(T);
export {
  b as default
};
