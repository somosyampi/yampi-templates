import a from "https://s3.amazonaws.com/codigo-aberto-sandbox-assets/yampi-templates-main/rocket-assets/components/product/BaseProduct.js";
function s(t, e, i, r, _, v, y, b) {
  var o = typeof t == "function" ? t.options : t;
  return e && (o.render = e, o.staticRenderFns = i, o._compiled = !0), {
    exports: t,
    options: o
  };
}
const u = {
  name: "ProductSimilars",
  extends: a,
  props: {
    desktopLayout: {
      type: String,
      default: "grid",
      validator: (t) => ["grid", "carousel"].includes(t)
    },
    title: {
      type: String,
      default: ""
    },
    productsPerLine: {
      type: Number,
      default: 2,
      validator: (t) => [1, 2].includes(t)
    }
  },
  data: () => ({
    route: "similars",
    completed: !1,
    queryParams: {
      cart_token: window.Yampi.cart_token
    }
  }),
  computed: {
    isCarousel() {
      return this.desktopLayout === "carousel";
    }
  },
  mounted() {
    this.completed = !0;
  }
};
var d = function() {
  var e = this, i = e._self._c;
  return i("Grid", { directives: [{ name: "observe-visibility", rawName: "v-observe-visibility", value: {
    callback: e.visibilityChanged,
    once: !0
  }, expression: `{
        callback: visibilityChanged,
        once: true,
    }` }], class: { completed: e.completed, "has-carousel": e.isCarousel }, attrs: { title: e.title, loading: e.loading, products: e.payload, "products-per-line": e.productsPerLine, carousel: e.isCarousel }, scopedSlots: e._u([{ key: "default", fn: function({ product: r }) {
    return [e._t("default", null, { product: r })];
  } }], null, !0) });
}, c = [], p = /* @__PURE__ */ s(
  u,
  d,
  c
);
const f = p.exports;
function l(t) {
  l.installed || (l.installed = !0, t.component("ProductSimilars", f));
}
const m = {
  install: l
};
let n = null;
typeof window < "u" ? n = window.Vue : typeof global < "u" && (n = global.Vue);
n && n.use(m);
export {
  f as default
};
