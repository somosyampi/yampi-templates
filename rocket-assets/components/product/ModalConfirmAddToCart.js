import o from "lodash/get";
import d from "lodash/omitBy";
import u from "lodash/isEmpty";
import { mapGetters as c, mapActions as h } from "../vendor/vuex.js";
import m from "../vendor/mixins/tracking/api.js";
import { createPriceObjects as p } from "../vendor/mixins/helpers.js";
function f(s, t, e, i, a, z, w, g) {
  var r = typeof s == "function" ? s.options : s;
  return t && (r.render = t, r.staticRenderFns = e, r._compiled = !0), {
    exports: s,
    options: r
  };
}
const k = {
  name: "ModalConfirmAddToCart",
  mixins: [m],
  props: {
    product: {
      type: Object,
      required: !0,
      default: () => ({})
    },
    selectedPrice: {
      type: String,
      default: "promotional"
    }
  },
  data() {
    return {
      error: !1,
      quantity: 1,
      customizationValues: {},
      sending: !1,
      showCustomization: !1,
      selectedSku: void 0
    };
  },
  computed: {
    ...c("environment", ["recomm"]),
    ...c("preview", ["isPreview"]),
    modalTitle() {
      return this.showCustomization && this.customizations.length ? "Produto com personalização" : "Adicionar ao carrinho";
    },
    skuPriceDiscount() {
      return this.selectedSku ? this.selectedSku.prices.data.price_discount : this.product.prices.data.price_discount;
    },
    skuPriceSaleFormated() {
      return this.selectedSku ? this.selectedSku.prices.data.price_sale_formated : this.product.prices.data.price_sale_formated;
    },
    price() {
      return p({ basePath: "prices.data.", pricePath: "price_formatted" });
    },
    skuPriceFormated() {
      return this.selectedSku ? `${o(
        this.selectedSku,
        this.price[this.selectedPrice].path,
        this.selectedSku.prices.data.price_formated
      )}` : `${o(
        this.product,
        this.price[this.selectedPrice].path,
        this.product.prices.data.price_formated
      )}`;
    },
    imageUrl() {
      return this.selectedSku ? o(this.selectedSku, "images.data.0.url", null) : o(this.product, "images.data.0.url", null);
    },
    primaryButtonText() {
      return !this.showCustomization && this.customizations.length ? "Próximo" : this.showCustomization && this.customizations.length > 1 ? "Salvar" : "Adicionar";
    },
    customizations() {
      return o(this.selectedSku, "customizations.data", []);
    },
    validSku() {
      return this.selectedSku || this.firstValidSku || this.firstSku;
    },
    firstValidSku() {
      return o(this.product, "skus.data", []).find((s) => !s.blocked_sale);
    },
    firstSku() {
      return o(this.product, "skus.data", []);
    },
    ellipsisClass() {
      return this.selectedSku ? {
        l3: !this.selectedSku.variations.length,
        l2: this.selectedSku.variations.length === 1,
        l1: this.selectedSku.variations.length >= 2
      } : "l3";
    },
    canAddToCart() {
      return !!this.firstValidSku;
    }
  },
  watch: {
    product() {
      this.bootSelectedSku(), this.showCustomizationContent();
    }
  },
  mounted() {
    this.$refs.baseModal.$on("close", this.resetComponent);
  },
  methods: {
    ...h("cart", ["addProductsToCart"]),
    bootSelectedSku() {
      this.product.has_variations || this.setSelectedSku(this.firstValidSku);
    },
    setSelectedSku(s) {
      this.selectedSku = s;
    },
    async handlePrimaryButton() {
      if (!this.showCustomization && this.customizations.length) {
        if (this.$refs.selectSku.verifySelect())
          return;
        this.showCustomization = !0;
        return;
      }
      if (!this.isPreview)
        try {
          await this.addToCart();
        } catch (s) {
          console.error(s);
        }
    },
    handleSecondaryButton() {
      if (this.showCustomization && this.product.has_variations) {
        this.showCustomization = !1;
        return;
      }
      this.closeModal();
    },
    showModal() {
      this.$refs.baseModal.showModal(), this.bootSelectedSku(), this.showCustomizationContent();
    },
    closeModal() {
      this.$refs.baseModal.closeModal();
    },
    setCustomizations(s) {
      this.customizationValues = s;
    },
    resetComponent() {
      this.product.has_variations && this.$refs.selectSku.bootSelected(), this.setSelectedSku(void 0), this.quantity = 1, this.customizationValues = {}, this.showCustomization = !1;
    },
    customizationsAreValid() {
      return this.$refs.customizationContent ? !this.customizations.filter((t) => !this.$refs.customizationContent.checkValues(t)).length : !0;
    },
    showCustomizationContent() {
      if (!this.product.has_variations && this.customizations.length) {
        this.showCustomization = !0;
        return;
      }
      this.showCustomization = !1;
    },
    async addToCart() {
      if (!this.selectedSku) {
        this.$refs.selectSku.verifySelect();
        return;
      }
      if (!this.customizationsAreValid())
        return;
      const s = {}, t = d(this.customizationValues, u);
      this.customizations.every((a) => !a.required) && u(t) && !this.selectedSku.allow_sell_without_customization && (s[this.selectedSku.id] = this.customizationValues), u(t) || (s[this.selectedSku.id] = t);
      let e = !1;
      const i = [];
      this.recomm && (e = !0, i.push({ recomm_id: this.recomm })), this.sending = !0;
      try {
        await this.addProductsToCart({
          skus: this.selectedSku,
          quantities: this.quantity,
          products: this.product,
          value: this.selectedSku.prices.data.price,
          showModal: !0,
          extras: { has_recomm: e, customization: s, item_metadata: i }
        }), this.handleTrackApi("purchase-intended", {
          location: "quick-buy-button-modal",
          product_quantity_updated: this.quantity,
          items: this.product.name,
          amount: this.quantity * this.selectedSku.prices.data.price
        });
      } catch (a) {
        this.error = a, console.error(a);
      } finally {
        this.sending = !1, this.closeModal(), this.resetComponent();
      }
    }
  }
};
var S = function() {
  var t = this, e = t._self._c;
  return e("modal", { ref: "baseModal", attrs: { name: "confirm-add-to-cart", title: t.modalTitle } }, [t.product && t.product.skus ? [e("div", { staticClass: "pl-sm-40 pl-xs-24 mb-38" }, [e("div", { staticClass: "product" }, [e("CustomImage", { key: t.imageUrl, staticClass: "-loading", attrs: { src: t.imageUrl, alt: t.product.name, thumbor: { resize: "60x60" } } }), e("div", { staticClass: "text" }, [e("p", { staticClass: "name ellipsis-multiline", class: t.ellipsisClass }, [t._v(" " + t._s(t.product.name) + " ")]), t.selectedSku && t.selectedSku.variations.length ? e("ul", t._l(t.selectedSku.variations, function(i) {
    return e("li", { key: i.name }, [t._v(" " + t._s(i.name) + ": " + t._s(i.value) + " ")]);
  }), 0) : t._e(), e("div", { staticClass: "product-prices mt-8" }, [t.skuPriceDiscount ? e("span", { staticClass: "product-old-price old-price mr-6", domProps: { textContent: t._s(t.skuPriceSaleFormated) } }) : t._e(), e("span", { staticClass: "product-actual-price price" }, [t._v(" " + t._s(t.skuPriceFormated) + " "), e("span", { staticClass: "payment-type" }, [t._v(" " + t._s(t.price[t.selectedPrice].text) + " ")])]), e("Installments", { key: JSON.stringify(t.validSku), attrs: { product: t.validSku } })], 1)])], 1), t.firstValidSku ? [e("SelectSku", { directives: [{ name: "show", rawName: "v-show", value: t.product.has_variations && !t.showCustomization, expression: "product.has_variations && !showCustomization" }], ref: "selectSku", attrs: { product: t.product, "should-scroll-on-error": !1 }, on: { update: function(i) {
    return t.setSelectedSku(i);
  } } }), t.showCustomization ? [e("CustomizationContent", { ref: "customizationContent", attrs: { sku: t.selectedSku }, on: { change: t.setCustomizations } })] : [e("div", { staticClass: "holder-quantity mt-16" }, [e("label", { attrs: { for: "product-quantity" } }, [t._v("Quantidade")]), e("QuantitySelector", { attrs: { id: "product-quantity" }, model: { value: t.quantity, callback: function(i) {
    t.quantity = i;
  }, expression: "quantity" } })], 1)]] : e("div", { staticClass: "alert -yellow" }, [t._v(" Produto indisponível. ")])], 2), e("template", { slot: "footer" }, [e("hr"), e("div", { staticClass: "control-button pr-xs-14" }, [e("button", { staticClass: "btn btn-modal-secundary", on: { click: t.handleSecondaryButton } }, [t._v(" Voltar ")]), e("LoaderButton", { staticClass: "btn btn-modal-primary", attrs: { sending: t.sending, disabled: !t.canAddToCart }, on: { click: t.handlePrimaryButton } }, [t._v(" " + t._s(t.primaryButtonText) + " ")])], 1)])] : [e("div", { staticClass: "pl-sm-40 pr-sm-40 pl-xs-24 pr-xs-24 mb-38" }, [e("div", { staticClass: "-loading", staticStyle: { height: "70px" } }), e("div", { staticClass: "-loading mt-30", staticStyle: { height: "70px" } })])]], 2);
}, C = [], _ = /* @__PURE__ */ f(
  k,
  S,
  C
);
const v = _.exports;
function l(s) {
  l.installed || (l.installed = !0, s.component("ModalConfirmAddToCart", v));
}
const y = {
  install: l
};
let n = null;
typeof window < "u" ? n = window.Vue : typeof global < "u" && (n = global.Vue);
n && n.use(y);
export {
  v as default
};
