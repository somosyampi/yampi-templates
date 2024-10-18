import a from "https://s3.amazonaws.com/codigo-aberto-sandbox-assets/rocket/assets/rocket-preview/vendor/mixins/mobile.js";
function r(l, e, t, s, _, g, y, v) {
  var o = typeof l == "function" ? l.options : l;
  return e && (o.render = e, o.staticRenderFns = t, o._compiled = !0), {
    exports: l,
    options: o
  };
}
const d = {
  name: "Grid",
  mixins: [
    a
  ],
  props: {
    products: {
      type: Array,
      default: () => []
    },
    carousel: {
      type: Boolean,
      default: !1
    },
    title: {
      type: String,
      default: ""
    },
    link: {
      type: String,
      default: null
    },
    showLink: {
      type: Boolean,
      default: !1
    },
    loading: {
      type: Boolean,
      default: !1
    },
    productsPerLine: {
      type: Number,
      default: 2,
      validator: (l) => [1, 2].includes(l)
    }
  }
};
var c = function() {
  var e = this, t = e._self._c;
  return e.loading || e.products.length > 0 ? t("section", [t("div", { staticClass: "container holder-collection" }, [t("div", { staticClass: "flex -between" }, [t("div", { staticClass: "holder-left flex -vcenter" }, [t("h2", { staticClass: "theme-title collection-name", class: { "-loading": e.loading }, domProps: { textContent: e._s(e.title || "loading collection title") } }), e.isMobile && e.showLink || !e.isMobile && e.link ? t("a", { staticClass: "collection-link", class: { "-loading": e.loading }, attrs: { href: e.link } }, [e._v(" Ver todos ")]) : e._e()])]), t("rocket-emitter", { attrs: { emits: "grids", label: "Vitrine de produtos" } }, [e.products.length ? t("products-list", { class: { "-carousel": e.carousel }, attrs: { products: e.products, carousel: e.carousel, loading: e.loading, "products-per-line": e.productsPerLine, "is-mobile": e.isMobile }, scopedSlots: e._u([{ key: "default", fn: function({ product: s }) {
    return [e._t("default", null, { product: s })];
  } }], null, !0) }) : e._e()], 1)], 1)]) : e._e();
}, u = [], f = /* @__PURE__ */ r(
  d,
  c,
  u
);
const p = f.exports;
function i(l) {
  i.installed || (i.installed = !0, l.component("Grid", p));
}
const m = {
  install: i
};
let n = null;
typeof window < "u" ? n = window.Vue : typeof global < "u" && (n = global.Vue);
n && n.use(m);
export {
  p as default
};
