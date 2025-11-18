import v from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/components/LazyVisibility.js";
import C from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/components/product/ProductCard.js";
function y(s, t, n, a, i, u, f, p) {
  var e = typeof s == "function" ? s.options : s;
  t && (e.render = t, e.staticRenderFns = n, e._compiled = !0), a && (e.functional = !0), u && (e._scopeId = "data-v-" + u);
  var r;
  if (f ? (r = function(o) {
    o = o || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !o && typeof __VUE_SSR_CONTEXT__ < "u" && (o = __VUE_SSR_CONTEXT__), i && i.call(this, o), o && o._registeredComponents && o._registeredComponents.add(f);
  }, e._ssrRegister = r) : i && (r = p ? function() {
    i.call(
      this,
      (e.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : i), r)
    if (e.functional) {
      e._injectStyles = r;
      var h = e.render;
      e.render = function(m, _) {
        return r.call(_), h(m, _);
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
const g = {
  name: "ProductsSearchList",
  components: {
    ProductCard: C,
    LazyVisibility: v
  },
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
var b = function() {
  var a;
  var t = this, n = t._self._c;
  return n("div", [(a = t.products) != null && a.length ? n("div", { staticClass: "products-search-list flex", class: {
    "-mosaic": t.isMosaic,
    "-list": !t.isMosaic
  }, attrs: { role: "list" } }, t._l(t.products, function(i) {
    return n("LazyVisibility", { key: i.id, staticClass: "product-card" }, [n("ProductCard", { attrs: { product: i, role: "listitem" } })], 1);
  }), 1) : t.loading ? n("Loader", { attrs: { width: 100, height: 200, margin: 32 } }) : n("div", { staticClass: "alert -yellow" }, [t._v(" Nenhum produto foi encontrado. ")])], 1);
}, w = [], V = /* @__PURE__ */ y(
  g,
  b,
  w,
  !1,
  null,
  null,
  null,
  null
);
const R = V.exports;
function d(s) {
  d.installed || (d.installed = !0, s.component("ProductsSearchList", R));
}
const $ = {
  install: d
};
let l = null;
typeof window < "u" ? l = window.Vue : typeof global < "u" && (l = global.Vue);
l && l.use($);
export {
  R as default
};
