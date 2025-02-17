import s from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/lodash.js";
import { mapGetters as c, mapActions as h } from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/vuex.js";
import d from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/mixins/tracking/api.js";
import m from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/mixins/cashback.js";
function p(t, e, i, a, n, o, b, _) {
  var l = typeof t == "function" ? t.options : t;
  return {
    exports: t,
    options: l
  };
}
const f = {
  name: "BaseCart",
  mixins: [
    d,
    m
  ],
  props: {
    showCartSavings: {
      type: Boolean,
      default: !0
    },
    showProductCartSavings: {
      type: Boolean,
      default: !0
    },
    cashbacks: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      loading: {
        all: !1
      },
      interval: null,
      animate: !1
    };
  },
  computed: {
    ...c("cart", ["cart"]),
    ...c("preview", ["isIframe"]),
    items() {
      return s.get(this.cart, "items", []);
    },
    buttonText() {
      return window.merchant.checkout.skip_cart ? "Finalizar compra" : "Ver carrinho";
    },
    cartValue() {
      return this.$formatMoney(this.cart.prices.total - this.cart.prices.shipment);
    },
    cartQuantity() {
      return s.sumBy(this.items, "quantity");
    },
    anyLoading() {
      return s.some(this.loading);
    },
    redirectUrl() {
      return this.$checkoutUrl(
        s.get(this.$store.getters, "merchant/merchant.checkout.redirect_to"),
        !0
      );
    },
    buyTogetherItems() {
      return s.groupBy(
        this.items.filter((t) => t.kit_id),
        (t) => t.kit_id
      );
    },
    totalValueCustomizations() {
      return this.items.reduce((t, e) => e.customizations.length ? e.customizations.filter(
        (i) => i.selected_value !== null
      ).reduce(
        (i, a) => parseFloat(a.price) + i,
        t
      ) : t, 0);
    },
    sortedByFreebies() {
      return s.cloneDeep(this.items).sort((e, i) => i.is_freebie - e.is_freebie);
    },
    totalFreebieValue() {
      return this.items.reduce((t, e) => {
        const i = Number(e.price_sale);
        return e.is_freebie && !Number.isNaN(i) ? t + i : t;
      }, 0);
    },
    totalCartValue() {
      return this.cart.prices ? parseFloat(this.cart.prices.items_amount) + this.totalValueCustomizations - this.totalFreebieValue : 0;
    },
    totalCartSavings() {
      const t = parseFloat(this.cart.prices.subtotal), e = parseFloat(this.cart.prices.discount);
      return this.totalCartValue - t + e;
    },
    shouldShowCartSavings() {
      return this.showCartSavings && this.totalCartSavings > 0;
    },
    getCartValueByPaymentMethod() {
      const t = this.cart.cart_discounts;
      for (const e in t)
        if (t[e].alias === this.highlightedPrice)
          return {
            value: parseFloat(_get(t[e], "prices.total")),
            percentage: parseFloat(_get(t[e], "percent_discount")),
            configured: !0
          };
      return {
        configured: !1
      };
    },
    validCashback() {
      const t = parseFloat(this.cart.prices.subtotal);
      return this.getValidCashback(this.cashbacks, t);
    },
    hasCashbackValid() {
      return _isEmpty(this.validCashback) ? !1 : this.validCashback.percent_amount > 0;
    }
  },
  methods: {
    ...h("cart", ["redirectToCart", "loadCart", "updateItemQuantity", "removeItem"]),
    handleRemoveCombo({ kitId: t, totalPrice: e }) {
      const i = this.items.filter((a) => a.kit_id === parseInt(t, 10));
      this.remove({ items: i, totalPrice: e });
    },
    async bootCart() {
      this.setLoading("all", !0), await this.loadCart(), this.items.forEach((t) => {
        this.setLoading(t.id, !1);
      }), this.setLoading("all", !1);
    },
    handleQuantityChange: s.debounce(function(t, e) {
      this.updateQuantity(t, e);
    }, 300),
    redirect() {
      if (!this.items.length)
        return;
      this.setLoading("all", !0);
      const t = window.themeConfig.theme.params, e = window.merchant.checkout.skip_cart ? "checkout-intended" : "view-cart-intended";
      this.handleTrackApi(e, {
        location: "side-cart",
        quick_buy_button_enabled: t.show_add_to_cart_button,
        items: s.map(this.items, "name"),
        amount: this.cartValue
      }), this.redirectToCart(), setTimeout(() => this.setLoading("all", !1), 200);
    },
    async updateQuantity(t, e) {
      if (this.loading[t.id] || t.quantity === e || this.isIframe)
        return;
      const i = t.quantity;
      this.$set(t, "quantity", e), this.setLoading(t.id, !0);
      const a = {};
      t.customizations.length > 0 && (a.customization = {
        [t.product_option_id]: t.customizations.reduce(
          (n, o) => (n[o.id] = o.selected_value, n),
          {}
        )
      }), await this.updateItemQuantity({ item: t, quantity: e, extras: a }), t.error && this.$set(t, "quantity", i), this.setLoading(t.id, !1);
    },
    async remove({ item: t, items: e, totalPrice: i }) {
      t = t || e[0], !this.loading[t.id] && (this.setLoading(t.id, !0), await this.removeItem({ item: t, items: e, totalPrice: i }), this.setLoading(t.id, !1));
    },
    setLoading(t, e) {
      this.$set(this.loading, t, e);
    },
    getFilteredCustomizations(t) {
      return t.customizations.filter(
        (e) => e.selected_value !== null
      );
    },
    linkValidation() {
      (this.emptyCartLinkButton === "0" || this.emptyCartLinkButton === "/") && (this.emptyCartLinkButton = this.$baseUrl);
      const t = this.$baseUrl.concat(this.emptyCartLinkButton), e = this.emptyCartLinkButton.startsWith("/"), i = this.emptyCartLinkButton.startsWith("http");
      if (e && !this.isIframe) {
        window.location.href = t;
        return;
      }
      if (i && !this.emptyCartLinkButton.startsWith(this.$baseUrl) && !this.isPreview) {
        window.location.href = this.$baseUrl;
        return;
      }
      this.isIframe || (window.location.href = this.emptyCartLinkButton);
    }
  }
};
var g = /* @__PURE__ */ p(
  f
);
const y = g.exports;
function u(t) {
  u.installed || (u.installed = !0, t.component("BaseCart", y));
}
const C = {
  install: u
};
let r = null;
typeof window < "u" ? r = window.Vue : typeof global < "u" && (r = global.Vue);
r && r.use(C);
export {
  y as default
};
