import a from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/lodash.js";
import { mapGetters as l, mapActions as h } from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/vuex.js";
import d from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/mixins/tracking/api.js";
function m(t, e, i, n, r, o, C, _) {
  var c = typeof t == "function" ? t.options : t;
  return {
    exports: t,
    options: c
  };
}
const p = {
  name: "BaseCart",
  mixins: [d],
  props: {
    showCartSavings: {
      type: Boolean,
      default: !0
    },
    showProductCartSavings: {
      type: Boolean,
      default: !0
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
    ...l("cart", ["cart"]),
    ...l("preview", ["isIframe"]),
    items() {
      return a.get(this.cart, "items", []);
    },
    buttonText() {
      return window.merchant.checkout.skip_cart ? "Finalizar compra" : "Ver carrinho";
    },
    cartValue() {
      return this.$formatMoney(this.cart.prices.total - this.cart.prices.shipment);
    },
    cartQuantity() {
      return a.sumBy(this.items, "quantity");
    },
    anyLoading() {
      return a.some(this.loading);
    },
    redirectUrl() {
      return this.$checkoutUrl(
        a.get(this.$store.getters, "merchant/merchant.checkout.redirect_to"),
        !0
      );
    },
    buyTogetherItems() {
      return a.groupBy(
        this.items.filter((t) => t.kit_id),
        (t) => t.kit_id
      );
    },
    totalValueCustomizations() {
      return this.items.reduce((t, e) => e.customizations.length ? e.customizations.filter(
        (i) => i.selected_value !== null
      ).reduce(
        (i, n) => parseFloat(n.price) + i,
        t
      ) : t, 0);
    },
    totalCartValue() {
      return parseFloat(this.cart.prices.items_amount) + this.totalValueCustomizations;
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
            value: parseFloat(a.get(t[e], "prices.total")),
            percentage: parseFloat(a.get(t[e], "percent_discount")),
            configured: !0
          };
      return {
        configured: !1
      };
    }
  },
  methods: {
    ...h("cart", ["redirectToCart", "loadCart", "updateItemQuantity", "removeItem"]),
    handleRemoveCombo({ kitId: t, totalPrice: e }) {
      const i = this.items.filter((n) => n.kit_id === parseInt(t, 10));
      this.remove({ items: i, totalPrice: e });
    },
    async bootCart() {
      this.setLoading("all", !0), await this.loadCart(), this.items.forEach((t) => {
        this.setLoading(t.id, !1);
      }), this.setLoading("all", !1);
    },
    handleQuantityChange: a.debounce(function(t, e) {
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
        items: a.map(this.items, "name"),
        amount: this.cartValue
      }), this.redirectToCart(), setTimeout(() => this.setLoading("all", !1), 200);
    },
    async updateQuantity(t, e) {
      if (this.loading[t.id] || t.quantity === e || this.isIframe)
        return;
      const i = t.quantity;
      this.$set(t, "quantity", e), this.setLoading(t.id, !0);
      const n = {};
      t.customizations.length > 0 && (n.customization = {
        [t.product_option_id]: t.customizations.reduce(
          (r, o) => (r[o.id] = o.selected_value, r),
          {}
        )
      }), await this.updateItemQuantity({ item: t, quantity: e, extras: n }), t.error && this.$set(t, "quantity", i), this.setLoading(t.id, !1);
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
      if (i && !this.emptyCartLinkButton.startsWith(this.$baseUrl) && !this.isIframe) {
        window.location.href = this.$baseUrl;
        return;
      }
      this.isIframe || (window.location.href = this.emptyCartLinkButton);
    }
  }
};
var f = /* @__PURE__ */ m(
  p
);
const g = f.exports;
function u(t) {
  u.installed || (u.installed = !0, t.component("BaseCart", g));
}
const y = {
  install: u
};
let s = null;
typeof window < "u" ? s = window.Vue : typeof global < "u" && (s = global.Vue);
s && s.use(y);
export {
  g as default
};
