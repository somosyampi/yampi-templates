import { mapActions as m } from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/vuex.js";
import o from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/lodash.js";
import h from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/mixins/product.js";
import f from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/mixins/tracking/api.js";
function p(e, t, i, s, u, r, d, c) {
  var a = typeof e == "function" ? e.options : e;
  return t && (a.render = t, a.staticRenderFns = i, a._compiled = !0), {
    exports: e,
    options: a
  };
}
const y = {
  name: "ProductCustomizations",
  mixins: [
    h,
    f
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
      return o.get(this.selectedSku, "customizations.data", []);
    },
    areCustomizationsValid() {
      return !this.selectedSku || this.customizations.length === 0 ? !0 : this.selectedSku.allow_sell_without_customization ? this.customizations.every((e) => o.isEmpty(this.customizationValues[e.id])) : this.customizations.every((e) => e.required ? !o.isEmpty(this.customizationValues[e.id]) : !0);
    }
  },
  mounted() {
    this.bootSelectedSku(), this.viewItem();
  },
  methods: {
    ...m("cart", ["addProductsToCart"]),
    ...m("product", ["trackViewItem"]),
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
    setCustomizations(e) {
      this.customizationValues = e;
    },
    async addToCart(e = "main-product-buy-button") {
      if (!this.selectedSku) {
        this.$refs.selectSku.verifySelect();
        return;
      }
      if (!this.$refs.skuCustomizations.checkValues(
        this.$refs.skuCustomizations.values
      ))
        return;
      this.loading = !0;
      const t = {}, i = o.omitBy(this.customizationValues, o.isEmpty);
      this.customizations.every((c) => !c.required) && o.isEmpty(i) && !this.selectedSku.allow_sell_without_customization && (t[this.selectedSku.id] = this.customizationValues), o.isEmpty(i) || (t[this.selectedSku.id] = i);
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
        location: e,
        quick_buy_button_enabled: d.show_add_to_cart_button,
        product_quantity_updated: this.quantity,
        items: this.validProduct.name,
        amount: this.quantity * this.selectedSku.prices.data.price
      }), this.loading = !1;
    }
  }
};
var S = function() {
  var t = this, i = t._self._c;
  return i("div", { staticClass: "product-customizations" }, [t.firstValidSku ? [t.validProduct.simple ? t._e() : i("SelectSku", { ref: "selectSku", attrs: { "variations-style": t.variationsStyle }, on: { update: function(s) {
    return t.setSelectedSku(s);
  } } }), t.selectedSku ? i("SkuCustomizations", { ref: "skuCustomizations", attrs: { sku: t.selectedSku }, on: { change: function(s) {
    return t.setCustomizations(s);
  } } }) : t._e()] : t._e(), i("div", { staticClass: "main-product-buy-button-holder flex" }, [t.showQuantitySelector ? i("QuantitySelector", { attrs: { disabled: !t.canAddToCart }, model: { value: t.quantity, callback: function(s) {
    t.quantity = s;
  }, expression: "quantity" } }) : t._e(), i("LoaderButton", { staticClass: "btn btn-primary", attrs: { title: t.buyButtonText, sending: t.loading, disabled: !t.canAddToCart, "listen-position": !0 }, on: { click: function(s) {
    return t.addToCart();
  } } }), t.showMobileFloatingButton ? i("FloatingButton", { attrs: { quantity: t.quantity, "loading-button": t.loading, disabled: !t.canAddToCart }, on: { click: function(s) {
    return t.addToCart("floating-button");
  } } }) : t._e()], 1), t.firstValidSku ? t._e() : i("div", { staticClass: "main-product-unavailable alert -yellow" }, [t._v(" Produto indisponível. ")]), t.firstValidSku && t.showInventoryCountdown ? i("InventoryCountdown") : t._e(), t.showShippingForm ? i("Zipcode", { attrs: { quantity: t.quantity, disabled: !t.firstValidSku } }) : t._e()], 2);
}, _ = [], k = /* @__PURE__ */ p(
  y,
  S,
  _
);
const v = k.exports;
function l(e) {
  l.installed || (l.installed = !0, e.component("ProductCustomizations", v));
}
const w = {
  install: l
};
let n = null;
typeof window < "u" ? n = window.Vue : typeof global < "u" && (n = global.Vue);
n && n.use(w);
export {
  v as default
};
