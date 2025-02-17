import { mapActions as h } from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/vuex.js";
import a from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/lodash.js";
import m from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/mixins/product.js";
import f from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/mixins/cashback.js";
import p from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/mixins/tracking/api.js";
function y(i, t, e, s, u, r, d, c) {
  var o = typeof i == "function" ? i.options : i;
  return t && (o.render = t, o.staticRenderFns = e, o._compiled = !0), {
    exports: i,
    options: o
  };
}
const k = {
  name: "ProductCustomizations",
  mixins: [
    m,
    f,
    p
  ],
  props: {
    buyButtonText: {
      type: String,
      default: "Comprar"
    },
    showQuantitySelector: {
      type: Boolean,
      default: !1
    },
    showInventoryCountdown: {
      type: Boolean,
      default: !1
    },
    showShippingForm: {
      type: Boolean,
      default: !1
    },
    showModalAfterPurchase: {
      type: Boolean,
      default: !1
    },
    showMobileFloatingButton: {
      type: Boolean,
      default: !1
    },
    cartType: {
      type: String,
      default: "suspended"
    },
    variationsStyle: {
      type: String,
      default: "list"
    },
    cashbacks: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    quantity: 1,
    loading: !1,
    customizationValues: {},
    customizationHasErrors: !1
  }),
  computed: {
    canAddToCart() {
      return !!this.firstValidSku;
    },
    customizations() {
      return a.get(this.selectedSku, "customizations.data", []);
    },
    areCustomizationsValid() {
      return !this.selectedSku || this.customizations.length === 0 ? !0 : this.selectedSku.allow_sell_without_customization ? this.customizations.every((i) => a.isEmpty(this.customizationValues[i.id])) : this.customizations.every((i) => i.required ? !a.isEmpty(this.customizationValues[i.id]) : !0);
    },
    validCashback() {
      const {
        price_sale: i,
        price_discount: t
      } = this.validSku;
      let e = i;
      return t > 0 && (e = t), this.getValidCashback(this.cashbacks, e);
    },
    hasCashbackValid() {
      return a.isEmpty(this.validCashback) ? !1 : this.validCashback.percent_amount > 0;
    }
  },
  mounted() {
    this.bootSelectedSku(), this.viewItem();
  },
  methods: {
    ...h("cart", ["addProductsToCart"]),
    ...h("product", ["trackViewItem"]),
    viewItem() {
      this.trackViewItem({
        skus: this.firstValidSku,
        products: this.validProduct,
        value: this.firstValidSku.prices.data.price * this.quantity,
        quantities: this.quantity
      });
    },
    bootSelectedSku() {
      this.validProduct.has_variations || this.setSelectedSku(this.firstValidSku);
    },
    setCustomizations(i) {
      this.customizationValues = i;
    },
    async addToCart(i = "main-product-buy-button") {
      if (!this.selectedSku) {
        this.$refs.selectSku.verifySelect();
        return;
      }
      if (!this.$refs.skuCustomizations.checkValues(
        this.$refs.skuCustomizations.values
      ))
        return;
      this.loading = !0;
      const t = {}, e = a.omitBy(this.customizationValues, a.isEmpty);
      this.customizations.every((c) => !c.required) && a.isEmpty(e) && !this.selectedSku.allow_sell_without_customization && (t[this.selectedSku.id] = this.customizationValues), a.isEmpty(e) || (t[this.selectedSku.id] = e);
      let s = !1;
      const { recomm_id: u } = window.Yampi.mago_config, r = [];
      u && (s = !0, r.push({ recomm_id: u })), await this.addProductsToCart({
        skus: this.selectedSku,
        quantities: this.quantity,
        products: this.validProduct,
        value: this.selectedSku.prices.data.price * this.quantity,
        showModal: this.showModalAfterPurchase,
        cartType: this.cartType,
        extras: { has_recomm: s, customization: t, item_metadata: r }
      });
      const d = window.themeConfig.theme.params;
      this.handleTrackApi("purchase-intended", {
        location: i,
        quick_buy_button_enabled: d.show_add_to_cart_button,
        product_quantity_updated: this.quantity,
        items: this.validProduct.name,
        amount: this.quantity * this.selectedSku.prices.data.price
      }), this.loading = !1;
    }
  }
};
var _ = function() {
  var t = this, e = t._self._c;
  return e("div", { staticClass: "product-customizations" }, [t.firstValidSku ? [t.validProduct.simple ? t._e() : e("SelectSku", { ref: "selectSku", attrs: { "variations-style": t.variationsStyle }, on: { update: function(s) {
    return t.setSelectedSku(s);
  } } }), t.selectedSku ? e("SkuCustomizations", { ref: "skuCustomizations", attrs: { sku: t.selectedSku }, on: { change: function(s) {
    return t.setCustomizations(s);
  } } }) : t._e()] : t._e(), e("div", { staticClass: "main-product-buy-button-holder flex" }, [t.showQuantitySelector ? e("QuantitySelector", { attrs: { disabled: !t.canAddToCart }, model: { value: t.quantity, callback: function(s) {
    t.quantity = s;
  }, expression: "quantity" } }) : t._e(), e("LoaderButton", { staticClass: "btn btn-primary", attrs: { title: t.buyButtonText, sending: t.loading, disabled: !t.canAddToCart, "listen-position": !0 }, on: { click: function(s) {
    return t.addToCart();
  } } }), t.showMobileFloatingButton ? e("FloatingButton", { attrs: { quantity: t.quantity, "loading-button": t.loading, disabled: !t.canAddToCart }, on: { click: function(s) {
    return t.addToCart("floating-button");
  } } }) : t._e()], 1), t.hasCashbackValid ? e("Cashback", { staticClass: "mt-21 mb-21", attrs: { "percent-amount": t.validCashback.percent_amount } }) : t._e(), t.firstValidSku ? t._e() : e("div", { staticClass: "main-product-unavailable alert -yellow" }, [t._v(" Produto indisponível. ")]), t.firstValidSku && t.showInventoryCountdown ? e("InventoryCountdown") : t._e(), t.showShippingForm ? e("Zipcode", { attrs: { quantity: t.quantity, disabled: !t.firstValidSku } }) : t._e()], 2);
}, S = [], v = /* @__PURE__ */ y(
  k,
  _,
  S
);
const b = v.exports;
function l(i) {
  l.installed || (l.installed = !0, i.component("ProductCustomizations", b));
}
const C = {
  install: l
};
let n = null;
typeof window < "u" ? n = window.Vue : typeof global < "u" && (n = global.Vue);
n && n.use(C);
export {
  b as default
};
