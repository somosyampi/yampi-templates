import c from "https://s3.amazonaws.com/codigo-aberto-sandbox-assets/undefined/assets/rocket-preview/components/cart/BaseCart.js";
function d(r, t, e, o, v, f, b, x) {
  var i = typeof r == "function" ? r.options : r;
  return t && (i.render = t, i.staticRenderFns = e, i._compiled = !0), {
    exports: r,
    options: i
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
    isFreebie() {
      return !!this.product.is_freebie;
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
    },
    decodedProductName() {
      return new DOMParser().parseFromString(this.product.name, "text/html").body.textContent;
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
  var t = this, e = t._self._c;
  return e("div", { class: {
    "product-cart-box__container": !t.isCombo,
    "product-cart-box__container--combo": t.isCombo,
    "--is-freebie": t.isFreebie
  } }, [e("div", { staticClass: "product-cart-box__metadata" }, [e("div", { staticClass: "product-cart-box__holder-image" }, [e("div", { staticClass: "image-ratio" }, [e("CustomImage", { attrs: { src: t.product.small, alt: "Imagem do Produto", thumbor: { resize: "60x60" } } })], 1)]), e("div", { staticClass: "product-cart-box__text--holder-info" }, [t.isFreebie ? e("div", { staticClass: "product-cart-box__freebie--tag" }, [t._v(" Brinde ")]) : t._e(), e("div", { staticClass: "product-cart-box__text--product-name", domProps: { textContent: t._s(t.decodedProductName) } }), t.isFreebie ? t._e() : e("div", { staticClass: "product-cart-box__text--product-extra" }, [e("ul", { staticClass: "mb-3" }, t._l(t.product.grids, function(o) {
    return e("li", { key: o.name + o.value, staticClass: "product-cart-box__text--sku" }, [t._v(" " + t._s(o.name) + ": " + t._s(o.value) + " ")]);
  }), 0), t.isFreebie ? t._e() : t._l(t.filteredCustomizations, function(o) {
    return e("div", { key: o.name + o.selected_value, staticClass: "product-cart-box__text--customization" }, [t._v(" " + t._s(o.name) + ": " + t._s(o.selected_value) + " "), e("span", { staticClass: "product-cart-box__text--customization--price" }, [t._v(" (+ " + t._s(o.price_formated) + ") ")])]);
  })], 2), t.showProductQuantity ? e("div", { staticClass: "product-cart-box__text--quantity" }, [t._v(" Qtd.: " + t._s(t.product.quantity) + " ")]) : t._e(), t.isFreebie ? t._e() : [t.showProductTotalPrice ? e("div", [t.shouldShowProductSavings ? e("div", [e("div", { staticClass: "product-cart-box__text--price-discount" }, [t._v(" " + t._s(t._f("formatMoney")(t.originalProductPrice)) + " ")]), e("div", { staticClass: "product-cart-box__text--price" }, [t._v(" " + t._s(t.product.price_total_formated) + " ")]), t.showProductCartSavings ? e("div", { staticClass: "product-cart-box__discount-tag mt-10" }, [e("div", { staticClass: "product-cart-box__discount-tag-text" }, [t._v(" " + t._s(t._f("formatMoney")(t.originalProductPrice - t.product.price)) + " mais barato ")])]) : t._e()]) : e("div", { staticClass: "product-cart-box__text--price" }, [t._v(" " + t._s(t._f("formatMoney")(t.product.price_total)) + " ")])]) : t._e()]], 2), !t.isCombo && !t.isFreebie ? e("div", { staticClass: "product-cart-box__holder-actions" }, [e("QuantitySelector", { class: {
    "is-preview": t.isIframe
  }, attrs: { value: t.product.quantity, disabled: t.loading[t.product.id] }, on: { change: function(o) {
    return t.handleQuantityChange(t.product, o);
  } } }), e("div", { staticClass: "product-cart-box__text--remove", class: { loading: t.loading[t.product.id] }, on: { click: function(o) {
    return t.remove({ item: t.product });
  } } }, [t._v(" Remover ")])], 1) : t._e()]), t.product.error ? e("div", { staticClass: "product-cart-box__text--error", domProps: { textContent: t._s(t.product.error) } }) : t._e()]);
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
let a = null;
typeof window < "u" ? a = window.Vue : typeof global < "u" && (a = global.Vue);
a && a.use(m);
export {
  p as default
};
