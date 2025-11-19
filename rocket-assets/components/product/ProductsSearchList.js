function m(s, t, o, a, i, u, f, p) {
  var e = typeof s == "function" ? s.options : s;
  t && (e.render = t, e.staticRenderFns = o, e._compiled = !0), a && (e.functional = !0), u && (e._scopeId = "data-v-" + u);
  var r;
  if (f ? (r = function(n) {
    n = n || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !n && typeof __VUE_SSR_CONTEXT__ < "u" && (n = __VUE_SSR_CONTEXT__), i && i.call(this, n), n && n._registeredComponents && n._registeredComponents.add(f);
  }, e._ssrRegister = r) : i && (r = p ? function() {
    i.call(
      this,
      (e.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : i), r)
    if (e.functional) {
      e._injectStyles = r;
      var h = e.render;
      e.render = function(v, _) {
        return r.call(_), h(v, _);
      };
    } else {
      var c = e.beforeCreate;
      e.beforeCreate = c ? [].concat(c, r) : [r];
    }
  return {
    exports: s,
    options: e
  };
}
const C = {
  name: "ProductsSearchList",
  props: {
    products: {
      type: Array,
      default: () => []
    },
    isMosaic: {
      type: Boolean,
      default: !0
    },
    loading: {
      type: Boolean,
      default: !0
    }
  }
};
var g = function() {
  var a;
  var t = this, o = t._self._c;
  return o("div", [(a = t.products) != null && a.length ? o("div", { staticClass: "products-search-list flex", class: {
    "-mosaic": t.isMosaic,
    "-list": !t.isMosaic
  }, attrs: { role: "list" } }, t._l(t.products, function(i) {
    return o("LazyVisibility", { key: i.id, staticClass: "product-card" }, [o("ProductCard", { attrs: { product: i, role: "listitem" } })], 1);
  }), 1) : t.loading ? o("Loader", { attrs: { width: 100, height: 200, margin: 32 } }) : o("div", { staticClass: "alert -yellow" }, [t._v(" Nenhum produto foi encontrado. ")])], 1);
}, y = [], w = /* @__PURE__ */ m(
  C,
  g,
  y,
  !1,
  null,
  null,
  null,
  null
);
const b = w.exports;
function d(s) {
  d.installed || (d.installed = !0, s.component("ProductsSearchList", b));
}
const R = {
  install: d
};
let l = null;
typeof window < "u" ? l = window.Vue : typeof global < "u" && (l = global.Vue);
l && l.use(R);
export {
  b as default
};
