function d(o, t, e, f, m, _, v, C) {
  var a = typeof o == "function" ? o.options : o;
  return t && (a.render = t, a.staticRenderFns = e, a._compiled = !0), {
    exports: o,
    options: a
  };
}
const i = {
  name: "BannerProduct",
  props: {
    product: {
      type: Object,
      required: !0
    },
    isMobile: {
      type: Boolean,
      default: !1
    }
  }
};
var n = function() {
  var t = this, e = t._self._c;
  return e("div", { staticClass: "holder-banner-product flex" }, [e("div", { staticClass: "holder flex -hcenter" }, [e("div", { staticClass: "holder-image relative-tags" }, [e("div", { staticClass: "holder-image" }, [e("discount-tag", { attrs: { value: t.product.prices.data.percent_discount } }), e("CustomImage", { attrs: { src: t.product.images.data[0].url, alt: t.product.name } }), t.isMobile ? t._e() : e("Flags", { attrs: { product: t.product } })], 1)]), e("div", { staticClass: "holder-info" }, [t.isMobile ? e("Flags", { attrs: { product: t.product } }) : t._e(), t.product.brand.data ? e("div", { staticClass: "product-brand ellipsis", domProps: { textContent: t._s(t.product.brand.data.name) } }) : t._e(), e("div", { staticClass: "product-name ellipsis-multiline l2", domProps: { textContent: t._s(t.product.name) } }), e("div", { staticClass: "product-prices" }, [t.product.prices.data.price_discount ? e("div", { staticClass: "product-old-price old-price", domProps: { textContent: t._s(t.product.prices.data.price_sale_formated) } }) : t._e(), e("div", { staticClass: "product-actual-price price", domProps: { textContent: t._s(t.product.prices.data.price_formated) } }), e("Installments", { attrs: { product: t.product } })], 1)], 1)])]);
}, c = [], l = /* @__PURE__ */ d(
  i,
  n,
  c
);
const p = l.exports;
function r(o) {
  r.installed || (r.installed = !0, o.component("BannerProduct", p));
}
const u = {
  install: r
};
let s = null;
typeof window < "u" ? s = window.Vue : typeof global < "u" && (s = global.Vue);
s && s.use(u);
export {
  p as default
};
