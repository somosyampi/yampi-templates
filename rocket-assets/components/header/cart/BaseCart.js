import r from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/lodash.js";
import { mapGetters as m, mapActions as y } from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/vuex.js";
import b from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/mixins/tracking/api.js";
import k from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/mixins/cashback.js";
function v(t, e, i, s, o, l, d, _) {
    var a = typeof t == "function" ? t.options : t;
    e && (a.render = e, a.staticRenderFns = i, a._compiled = !0), s && (a.functional = !0), l && (a._scopeId = "data-v-" + l);
    var u;
    if (d ? (u = function (n) {
        n = n || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !n && typeof __VUE_SSR_CONTEXT__ < "u" && (n = __VUE_SSR_CONTEXT__), o && o.call(this, n), n && n._registeredComponents && n._registeredComponents.add(d);
    }, a._ssrRegister = u) : o && (u = _ ? function () {
        o.call(
            this,
            (a.functional ? this.parent : this).$root.$options.shadowRoot
        );
    } : o), u)
        if (a.functional) {
            a._injectStyles = u;
            var g = a.render;
            a.render = function (C, p) {
                return u.call(p), g(C, p);
            };
        } else {
            var f = a.beforeCreate;
            a.beforeCreate = f ? [].concat(f, u) : [u];
        }
    return {
        exports: t,
        options: a
    };
}
const w = {
    name: "BaseCart",
    mixins: [
        b,
        k
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
        ...p("cart", ["cart"]),
        ...p("preview", ["isIframe"]),
        items() {
            return r.get(this.cart, "items", []);
        },
        buttonText() {
            return window.merchant.checkout.skip_cart ? "Finalizar compra" : "Ver carrinho";
        },
        cartValue() {
            return this.$formatMoney(this.cart.prices.total - this.cart.prices.shipment);
        },
        cartQuantity() {
            return r.sumBy(this.items, "quantity");
        },
        anyLoading() {
            return r.some(this.loading);
        },
        redirectUrl() {
            return this.$checkoutUrl(
                r.get(this.$store.getters, "merchant/merchant.checkout.redirect_to"),
                !0
            );
        },
        buyTogetherItems() {
            return r.groupBy(
                this.items.filter((t) => t.kit_id),
                (t) => t.kit_id
            );
        },
        totalValueCustomizations() {
            return this.items.reduce((t, e) => e.customizations.length ? e.customizations.filter(
                (i) => i.selected_value !== null
            ).reduce(
                (i, s) => parseFloat(s.price) + i,
                t
            ) : t, 0);
        },
        sortedByFreebies() {
            return r.cloneDeep(this.items).sort((e, i) => i.is_freebie - e.is_freebie);
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
                        value: parseFloat(r.get(t[e], "prices.total")),
                        percentage: parseFloat(r.get(t[e], "percent_discount")),
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
            return r.isEmpty(this.validCashback) ? !1 : this.validCashback.percent_amount > 0;
        }
    },
    methods: {
        ...y("cart", ["redirectToCart", "loadCart", "updateItemQuantity", "removeItem"]),
        handleRemoveCombo({ kitId: t, totalPrice: e }) {
            const i = this.items.filter((s) => s.kit_id === parseInt(t));
            this.remove({ items: i, totalPrice: e });
        },
        async bootCart() {
            this.setLoading("all", !0), await this.loadCart(), this.items.forEach((t) => {
                this.setLoading(t.id, !1);
            }), this.setLoading("all", !1);
        },
        handleQuantityChange: r.debounce(function (t, e) {
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
                items: r.map(this.items, "name"),
                amount: this.cartValue
            }), this.redirectToCart(), setTimeout(() => this.setLoading("all", !1), 200);
        },
        async updateQuantity(t, e) {
            if (this.loading[t.id] || t.quantity === e || this.isIframe)
                return;
            const i = t.quantity;
            this.$set(t, "quantity", e), this.setLoading(t.id, !0);
            const s = {};
            t.customizations.length > 0 && (s.customization = {
                [t.product_option_id]: t.customizations.reduce(
                    (o, l) => (o[l.id] = l.selected_value, o),
                    {}
                )
            }), await this.updateItemQuantity({ item: t, quantity: e, extras: s }), t.error && this.$set(t, "quantity", i), this.setLoading(t.id, !1);
        },
        async remove({ item: t, items: e, totalPrice: i }) {
            const s = t || e[0];
            this.loading[s.id] || (this.setLoading(s.id, !0), await this.removeItem({ item: t, items: e, totalPrice: i }), this.setLoading(s.id, !1));
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
    ...m("cart", ["cart"]),
    ...m("preview", ["isIframe"]),
        items() {
        return r.get(this.cart, "items", []);
    },
    buttonText() {
        return window.merchant.checkout.skip_cart ? "Finalizar compra" : "Ver carrinho";
    },
    cartValue() {
        return this.$formatMoney(this.cart.prices.total - this.cart.prices.shipment);
    },
    cartQuantity() {
        return r.sumBy(this.items, "quantity");
    },
    anyLoading() {
        return r.some(this.loading);
    },
    redirectUrl() {
        return this.$checkoutUrl(
            r.get(this.$store.getters, "merchant/merchant.checkout.redirect_to"),
            !0
        );
    },
    buyTogetherItems() {
        return r.groupBy(
            this.items.filter((t) => t.kit_id),
            (t) => t.kit_id
        );
    },
    totalValueCustomizations() {
        return this.items.reduce((t, e) => e.customizations.length ? e.customizations.filter(
            (i) => i.selected_value !== null
        ).reduce(
            (i, s) => parseFloat(s.price) + i,
            t
        ) : t, 0);
    },
    sortedByFreebies() {
        return r.cloneDeep(this.items).sort((e, i) => i.is_freebie - e.is_freebie);
    },
    totalFreebieValue() {
        return this.items.reduce((t, e) => {
            const i = Number(e.price_sale);
            return e.is_freebie && !Number.isNaN(i) ? t + i : t;
        }, 0);
    },
    totalCartValue() {
        return this.cart.prices ? parseFloat(this.cart.prices.items_amount) + this.totalValueCustomizations : 0;
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
                    value: parseFloat(r.get(t[e], "prices.total")),
                    percentage: parseFloat(r.get(t[e], "percent_discount")),
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
        return r.isEmpty(this.validCashback) ? !1 : this.validCashback.percent_amount > 0;
    }
},
methods: {
    ...y("cart", ["redirectToCart", "loadCart", "updateItemQuantity", "removeItem"]),
        handleRemoveCombo({ kitId: t, totalPrice: e }) {
        const i = this.items.filter((s) => s.kit_id === parseInt(t));
        this.remove({ items: i, totalPrice: e });
    },
    async bootCart() {
        this.setLoading("all", !0), await this.loadCart(), this.items.forEach((t) => {
            this.setLoading(t.id, !1);
        }), this.setLoading("all", !1);
    },
    handleQuantityChange: r.debounce(function (t, e) {
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
            items: r.map(this.items, "name"),
            amount: this.cartValue
        }), this.redirectToCart(), setTimeout(() => this.setLoading("all", !1), 200);
    },
    async updateQuantity(t, e) {
        if (this.loading[t.id] || t.quantity === e || this.isIframe)
            return;
        const i = t.quantity;
        this.$set(t, "quantity", e), this.setLoading(t.id, !0);
        const s = {};
        t.customizations.length > 0 && (s.customization = {
            [t.product_option_id]: t.customizations.reduce(
                (o, l) => (o[l.id] = l.selected_value, o),
                {}
            )
        }), await this.updateItemQuantity({ item: t, quantity: e, extras: s }), t.error && this.$set(t, "quantity", i), this.setLoading(t.id, !1);
    },
    async remove({ item: t, items: e, totalPrice: i }) {
        const s = t || e[0];
        this.loading[s.id] || (this.setLoading(s.id, !0), await this.removeItem({ item: t, items: e, totalPrice: i }), this.setLoading(s.id, !1));
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
}, L = null, B = null;
var V = /* @__PURE__ */ v(
    w,
    L,
    B,
    !1,
    null,
    null,
    null,
    null
);
const $ = V.exports;
function h(t) {
    h.installed || (h.installed = !0, t.component("BaseCart", $));
}
const F = {
    install: h
};
let c = null;
typeof window < "u" ? c = window.Vue : typeof global < "u" && (c = global.Vue);
c && c.use(F);
export {
    $ as default
};
