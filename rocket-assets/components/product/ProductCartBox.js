import c from "https://s3.amazonaws.com/codigo-aberto-sandbox-assets/yampi-templates-sandbox/rocket-assets/components/cart/BaseCart.js";
function d(r, t, o, e, v, f, x, C) {
  var a = typeof r == "function" ? r.options : r;
  return t && (a.render = t, a.staticRenderFns = o, a._compiled = !0), {
    exports: r,
    options: a
  };
}
const u = {
  name: "ProductCartBox",
  extends: c,
  props: {
    product: {
      type: Object,
      required: !0
    },
    showProductTotalPrice: {
      type: Boolean,
      default: !0
    },
    showProductQuantity: {
      type: Boolean,
      default: !0
    }
  },
  computed: {
    isCombo() {
      return !!this.product.kit_id;
    },
    filteredCustomizations() {
      return this.product.customizations.filter(
        (r) => r.selected_value !== null
      );
    },
    originalProductPrice() {
      return parseFloat(this.product.price_sale) + this.getTotalCustomizationValues();
    },
    shouldShowProductSavings() {
      return this.originalProductPrice - this.product.price > 0;
    }
  },
  methods: {
    getTotalCustomizationValues() {
      return this.filteredCustomizations ? this.filteredCustomizations.reduce(
        (r, t) => r + parseFloat(t.price),
        0
      ) : 0;
    }
  }
};
var n = function() {
  var t = this, o = t._self._c;
  return o("div", { class: {
    "product-cart-box__container": !t.isCombo,
    "product-cart-box__container--combo": t.isCombo
  } }, [o("div", { staticClass: "product-cart-box__metadata" }, [o("div", { staticClass: "product-cart-box__holder-image" }, [o("div", { staticClass: "image-ratio" }, [o("CustomImage", { attrs: { src: t.product.small, alt: "Imagem do Produto", thumbor: { resize: "60x60" } } })], 1)]), o("div", { staticClass: "product-cart-box__text--holder-info" }, [o("div", { staticClass: "product-cart-box__text--product-name", domProps: { textContent: t._s(t.product.name) } }), o("div", { staticClass: "product-cart-box__text--product-extra" }, [o("ul", { staticClass: "mb-3" }, t._l(t.product.grids, function(e) {
    return o("li", { key: e.name + e.value, staticClass: "product-cart-box__text--sku" }, [t._v(" " + t._s(e.name) + ": " + t._s(e.value) + " ")]);
  }), 0), t._l(t.filteredCustomizations, function(e) {
    return o("div", { key: e.name + e.selected_value, staticClass: "product-cart-box__text--customization" }, [t._v(" " + t._s(e.name) + ": " + t._s(e.selected_value) + " "), o("span", { staticClass: "product-cart-box__text--customization--price" }, [t._v(" (+ " + t._s(e.price_formated) + ") ")])]);
  })], 2), t.showProductQuantity ? o("div", { staticClass: "product-cart-box__text--quantity" }, [t._v(" Qtd.: " + t._s(t.product.quantity) + " ")]) : t._e(), t.showProductTotalPrice ? o("div", [t.shouldShowProductSavings ? o("div", [o("div", { staticClass: "product-cart-box__text--price-discount" }, [t._v(" " + t._s(t._f("formatMoney")(t.originalProductPrice)) + " ")]), o("div", { staticClass: "product-cart-box__text--price" }, [t._v(" " + t._s(t.product.price_total_formated) + " ")]), t.showProductCartSavings ? o("div", { staticClass: "product-cart-box__discount-tag mt-10" }, [o("div", { staticClass: "product-cart-box__discount-tag-text" }, [t._v(" " + t._s(t._f("formatMoney")(t.originalProductPrice - t.product.price)) + " mais barato ")])]) : t._e()]) : o("div", { staticClass: "product-cart-box__text--price" }, [t._v(" " + t._s(t._f("formatMoney")(t.product.price_total)) + " ")])]) : t._e()]), t.product.kit_id ? t._e() : o("div", { staticClass: "product-cart-box__holder-actions" }, [o("QuantitySelector", { class: {
    "is-preview": t.isIframe
  }, attrs: { value: t.product.quantity, disabled: t.loading[t.product.id] }, on: { change: function(e) {
    return t.handleQuantityChange(t.product, e);
  } } }), o("div", { staticClass: "product-cart-box__text--remove", class: { loading: t.loading[t.product.id] }, on: { click: function(e) {
    return t.remove({ item: t.product });
  } } }, [t._v(" Remover ")])], 1)]), t.product.error ? o("div", { staticClass: "product-cart-box__text--error", domProps: { textContent: t._s(t.product.error) } }) : t._e()]);
}, l = [], _ = /* @__PURE__ */ d(
  u,
  n,
  l
);
const p = _.exports;
function s(r) {
  s.installed || (s.installed = !0, r.component("ProductCartBox", p));
}
const m = {
  install: s
};
let i = null;
typeof window < "u" ? i = window.Vue : typeof global < "u" && (i = global.Vue);
i && i.use(m);
export {
  p as default
};
