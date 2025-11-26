import a from "https://openstore-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/mixins/prices.js";
import d from "https://openstore-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/mixins/productCardTheme.js";
function l(s, e, t, n, c, v, h, C) {
  var r = typeof s == "function" ? s.options : s;
  return e && (r.render = e, r.staticRenderFns = t, r._compiled = !0), {
    exports: s,
    options: r
  };
}
const p = {
  name: "ProductCardPrices",
  mixins: [
    a,
    d
  ],
  props: {
    product: { type: Object, required: !0 }
  }
};
var u = function() {
  var n, c;
  var e = this, t = e._self._c;
  return t("div", { staticClass: "product-prices", class: `--space-top-${e.spaceBetweenNamePrice}` }, [!e.loadingPrices && Object.keys(e.productPrices).length ? t("div", [t("div", { staticClass: "flex -vcenter -wrap" }, [e.hasPromotion ? t("span", { staticClass: "product-old-price", class: `--font-size-${e.oldPriceSize}` }, [e._v(" " + e._s((n = e.productPrices) == null ? void 0 : n.price_sale_formated) + " ")]) : e._e(), t("span", { staticClass: "product-actual-price", class: { "--small-cents-price": e.smallCentsPrice } }, [t("div", [t("span", { domProps: { innerHTML: e._s(e.selectedPrice) } }), e.hasPrice ? t("span", { staticClass: "payment-type" }, [e._v(" " + e._s(e.priceText))]) : e._e()])])]), e.showMaxInstallment && e.productPrices.price ? t("div", [t("InstallmentsText", { attrs: { product: ((c = e.product) == null ? void 0 : c.content) || e.product, "product-prices": e.productPrices } })], 1) : e._e()]) : t("div", [t("Loader", { attrs: { width: 100, height: 36 } })], 1)]);
}, f = [], m = /* @__PURE__ */ l(
  p,
  u,
  f
);
const _ = m.exports;
function o(s) {
  o.installed || (o.installed = !0, s.component("ProductCardPrices", _));
}
const P = {
  install: o
};
let i = null;
typeof window < "u" ? i = window.Vue : typeof global < "u" && (i = global.Vue);
i && i.use(P);
export {
  _ as default
};
