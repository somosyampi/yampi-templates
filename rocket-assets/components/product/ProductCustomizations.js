import { mapActions as k } from "https://openstore-production-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/vuex.js";
import r from "https://openstore-production-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/lodash.js";
import S from "https://openstore-production-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/mixins/product.js";
import v from "https://openstore-production-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/mixins/cashback.js";
import b from "https://openstore-production-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/mixins/tracking/api.js";
import C from "https://openstore-production-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/mixins/tracking/sdk.js";
function w(e, t, i, o, n, l, c, f) {
    var s = typeof e == "function" ? e.options : e;
    t && (s.render = t, s.staticRenderFns = i, s._compiled = !0), o && (s.functional = !0), l && (s._scopeId = "data-v-" + l);
    var u;
    if (c ? (u = function (a) {
        a = a || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !a && typeof __VUE_SSR_CONTEXT__ < "u" && (a = __VUE_SSR_CONTEXT__), n && n.call(this, a), a && a._registeredComponents && a._registeredComponents.add(c);
    }, s._ssrRegister = u) : n && (u = f ? function () {
        n.call(
            this,
            (s.functional ? this.parent : this).$root.$options.shadowRoot
        );
    } : n), u)
        if (s.functional) {
            s._injectStyles = u;
            var _ = s.render;
            s.render = function (y, p) {
                return u.call(p), _(y, p);
            };
        } else {
            var m = s.beforeCreate;
            s.beforeCreate = m ? [].concat(m, u) : [u];
        }
    return {
        exports: e,
        options: s
    };
}
const g = {
    name: "ProductCustomizations",
    mixins: [
        S,
        v,
        b,
        C
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
            return !(this.selectedSku && !this.firstValidSku);
        },
        customizations() {
            return r.get(this.selectedSku, "customizations.data", []);
        },
        areCustomizationsValid() {
            return !this.selectedSku || this.customizations.length === 0 ? !0 : this.selectedSku.allow_sell_without_customization ? this.customizations.every((e) => r.isEmpty(this.customizationValues[e.id])) : this.customizations.every((e) => e.required ? !r.isEmpty(this.customizationValues[e.id]) : !0);
        },
        validCashback() {
            const {
                price_sale: e,
                price_discount: t
            } = this.validSku;
            let i = e;
            return t > 0 && (i = t), this.getValidCashback(this.cashbacks, i);
        },
        hasCashbackValid() {
            return r.isEmpty(this.validCashback) ? !1 : this.validCashback.percent_amount > 0;
        },
        showBuyButton() {
            return !(this.selectedSku && this.selectedSku.blocked_sale || this.validProduct.simple && this.validProduct.blocked_sale);
        }
    },
    mounted() {
        this.bootSelectedSku(), this.viewItem();
    },
    methods: {
        ...k("cart", ["addProductsToCart"]),
        ...k("product", ["trackViewItem"]),
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
            const t = {}, i = r.omitBy(this.customizationValues, r.isEmpty);
            this.customizations.every((f) => !f.required) && r.isEmpty(i) && !this.selectedSku.allow_sell_without_customization && (t[this.selectedSku.id] = this.customizationValues), r.isEmpty(i) || (t[this.selectedSku.id] = i);
            let o = !1;
            const { recomm_id: n } = window.Yampi.mago_config, l = [];
            n && (o = !0, l.push({ recomm_id: n })), await this.addProductsToCart({
                skus: this.selectedSku,
                quantities: this.quantity,
                products: this.validProduct,
                value: this.selectedSku.prices.data.price * this.quantity,
                showModal: this.showModalAfterPurchase,
                cartType: this.cartType,
                extras: { has_recomm: o, customization: t, item_metadata: l }
            });
            const c = window.themeConfig.theme.params;
            this.handleTrackApi("purchase-intended", {
                location: e,
                quick_buy_button_enabled: c.show_add_to_cart_button,
                product_quantity_updated: this.quantity,
                items: this.validProduct.name,
                amount: this.quantity * this.selectedSku.prices.data.price
            }), this.loading = !1;
        },
        openStockNotificationsModal() {
            this.handleTrackSDK("notify_when_available_subscribed_intended"), this.$refs.stockNotificationsModal && this.$refs.stockNotificationsModal.showModal();
        }
    }
};
var z = function () {
    var t = this, i = t._self._c;
    return i("div", { staticClass: "product-customizations" }, [t.validProduct.simple ? t._e() : i("SelectSku", {
        ref: "selectSku", attrs: { "variations-style": t.variationsStyle }, on: {
            update: function (o) {
                return t.setSelectedSku(o);
            }
        }
    }), t.selectedSku && t.showBuyButton ? i("SkuCustomizations", {
        ref: "skuCustomizations", attrs: { sku: t.selectedSku }, on: {
            change: function (o) {
                return t.setCustomizations(o);
            }
        }
    }) : t._e(), t.showBuyButton ? [i("div", { staticClass: "main-product-buy-button-holder flex" }, [t.showQuantitySelector ? i("QuantitySelector", {
        attrs: { disabled: !t.canAddToCart }, model: {
            value: t.quantity, callback: function (o) {
                t.quantity = o;
            }, expression: "quantity"
        }
    }) : t._e(), i("LoaderButton", {
        staticClass: "btn btn-primary", attrs: { title: t.buyButtonText, sending: t.loading, disabled: !t.canAddToCart, "listen-position": !0 }, on: {
            click: function (o) {
                return t.addToCart();
            }
        }
    })], 1)] : t._e(), t.showMobileFloatingButton ? i("FloatingButton", {
        attrs: { quantity: t.quantity, "loading-button": t.loading, disabled: !t.canAddToCart }, on: {
            click: function (o) {
                return t.addToCart("floating-button");
            }, "open-stock-notifications-modal": t.openStockNotificationsModal
        }
    }) : t._e(), t.showBuyButton ? t._e() : [i("div", { staticClass: "main-product-unavailable alert -yellow" }, [t._v(" Produto indispon\xEDvel. ")]), i("button", { staticClass: "btn-stock-notifications btn btn-secundary -block flex -hcenter -vcenter mt-23", on: { click: t.openStockNotificationsModal } }, [i("IconEmail", { staticClass: "fill-current mr-3" }), t._v(" Avise-me quando chegar ")], 1)], t.hasCashbackValid ? i("Cashback", { staticClass: "mt-21 mb-21", attrs: { "percent-amount": t.validCashback.percent_amount } }) : t._e(), t.firstValidSku && t.showInventoryCountdown ? i("InventoryCountdown") : t._e(), t.showShippingForm ? i("Zipcode", { attrs: { quantity: t.quantity, disabled: !t.firstValidSku } }) : t._e(), t.selectedSku || t.validProduct.simple ? i("ModalStockNotifications", {
        ref: "stockNotificationsModal", attrs: { sku: t.selectedSku || t.firstSku[0] }, on: {
            success: function (o) {
                return t.$refs.stockNotificationsSuccessModal.showModal();
            }
        }
    }) : t._e(), i("ModalStockNotificationsSuccess", { ref: "stockNotificationsSuccessModal" })], 2);
}, V = [], B = /* @__PURE__ */ w(
    g,
    z,
    V,
    !1,
    null,
    null,
    null,
    null
);
const q = B.exports;
function h(e) {
    h.installed || (h.installed = !0, e.component("ProductCustomizations", q));
}
const T = {
    install: h
};
let d = null;
typeof window < "u" ? d = window.Vue : typeof global < "u" && (d = global.Vue);
d && d.use(T);
export {
    q as default
};
