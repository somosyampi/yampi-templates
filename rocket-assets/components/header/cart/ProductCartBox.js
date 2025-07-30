import C from "https://codigo-aberto-sandbox-assets.yampi.io.s3.amazonaws.com/yampi-templates-sandbox/rocket-assets/components/header/cart/BaseCart.js";
function b(i, t, e, r, c, u, _, f) {
  var o = typeof i == "function" ? i.options : i;
  t && (o.render = t, o.staticRenderFns = e, o._compiled = !0), r && (o.functional = !0), u && (o._scopeId = "data-v-" + u);
  var s;
  if (_ ? (s = function(a) {
    a = a || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !a && typeof __VUE_SSR_CONTEXT__ < "u" && (a = __VUE_SSR_CONTEXT__), c && c.call(this, a), a && a._registeredComponents && a._registeredComponents.add(_);
  }, o._ssrRegister = s) : c && (s = f ? function() {
    c.call(
      this,
      (o.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : c), s)
    if (o.functional) {
      o._injectStyles = s;
      var m = o.render;
      o.render = function(v, p) {
        return s.call(p), m(v, p);
      };
    } else {
      var l = o.beforeCreate;
      o.beforeCreate = l ? [].concat(l, s) : [s];
    }
  return {
    exports: i,
    options: o
  };
}
const h = {
  name: "ProductCartBox",
  extends: C,
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
        (i) => i.selected_value !== null
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
        (i, t) => i + parseFloat(t.price),
        0
      ) : 0;
    }
  }
};
var x = function() {
  var t = this, e = t._self._c;
  return e("div", { class: {
    "product-cart-box__container": !t.isCombo,
    "product-cart-box__container--combo": t.isCombo,
    "--is-freebie": t.isFreebie
  } }, [e("div", { staticClass: "product-cart-box__metadata" }, [e("div", { staticClass: "product-cart-box__holder-image" }, [e("div", { staticClass: "image-ratio" }, [e("CustomImage", { attrs: { src: t.product.small, alt: "Imagem do Produto", thumbor: { resize: "60x60" }, width: "60", height: "60" } })], 1)]), e("div", { staticClass: "product-cart-box__text--holder-info" }, [t.isFreebie ? e("div", { staticClass: "product-cart-box__freebie--tag" }, [t._v(" Brinde ")]) : t._e(), e("div", { staticClass: "product-cart-box__text--product-name", domProps: { textContent: t._s(t.decodedProductName) } }), t.isFreebie ? t._e() : e("div", { staticClass: "product-cart-box__text--product-extra" }, [e("ul", { staticClass: "mb-3" }, t._l(t.product.grids, function(r) {
    return e("li", { key: r.name + r.value, staticClass: "product-cart-box__text--sku" }, [t._v(" " + t._s(r.name) + ": " + t._s(r.value) + " ")]);
  }), 0), t.isFreebie ? t._e() : t._l(t.filteredCustomizations, function(r) {
    return e("div", { key: r.name + r.selected_value, staticClass: "product-cart-box__text--customization" }, [t._v(" " + t._s(r.name) + ": " + t._s(r.selected_value) + " "), e("span", { staticClass: "product-cart-box__text--customization--price" }, [t._v(" (+ " + t._s(r.price_formated) + ") ")])]);
  })], 2), t.showProductQuantity ? e("div", { staticClass: "product-cart-box__text--quantity" }, [t._v(" Qtd.: " + t._s(t.product.quantity) + " ")]) : t._e(), t.isFreebie ? t._e() : [t.showProductTotalPrice ? e("div", [t.shouldShowProductSavings ? e("div", [e("div", { staticClass: "product-cart-box__text--price-discount" }, [t._v(" " + t._s(t._f("formatMoney")(t.originalProductPrice)) + " ")]), e("div", { staticClass: "product-cart-box__text--price" }, [t._v(" " + t._s(t.product.price_formated) + " ")]), t.showProductCartSavings ? e("div", { staticClass: "product-cart-box__discount-tag mt-10" }, [e("div", { staticClass: "product-cart-box__discount-tag-text" }, [t._v(" " + t._s(t._f("formatMoney")(t.originalProductPrice - t.product.price)) + " mais barato ")])]) : t._e()]) : e("div", { staticClass: "product-cart-box__text--price" }, [t._v(" " + t._s(t.product.price_formated) + " ")])]) : t._e()]], 2), !t.isCombo && !t.isFreebie ? e("div", { staticClass: "product-cart-box__holder-actions" }, [e("QuantitySelector", { class: {
    "is-preview": t.isIframe
  }, attrs: { value: t.product.quantity, disabled: t.loading[t.product.id] }, on: { change: function(r) {
    return t.handleQuantityChange(t.product, r);
  } } }), e("div", { staticClass: "product-cart-box__text--remove", class: { loading: t.loading[t.product.id] }, on: { click: function(r) {
    return t.remove({ item: t.product });
  } } }, [t._v(" Remover ")])], 1) : t._e()]), t.product.error ? e("div", { staticClass: "product-cart-box__text--error", domProps: { textContent: t._s(t.product.error) } }) : t._e()]);
}, g = [], P = /* @__PURE__ */ b(
  h,
  x,
  g,
  !1,
  null,
  null,
  null,
  null
);
const y = P.exports;
function d(i) {
  d.installed || (d.installed = !0, i.component("ProductCartBox", y));
}
const w = {
  install: d
};
let n = null;
typeof window < "u" ? n = window.Vue : typeof global < "u" && (n = global.Vue);
n && n.use(w);
export {
  y as default
};
