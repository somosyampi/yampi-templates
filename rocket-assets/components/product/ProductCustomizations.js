import { mapActions as k } from "https://openstore-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/vuex.js";
import r from "https://openstore-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/lodash.js";
import S from "https://openstore-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/mixins/product.js";
import v from "https://openstore-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/mixins/cashback.js";
import b from "https://openstore-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/mixins/tracking/api.js";
import C from "https://openstore-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/mixins/tracking/sdk.js";
function w(i, t, e, a, n, l, c, h) {
    var s = typeof i == "function" ? i.options : i;
    t && (s.render = t, s.staticRenderFns = e, s._compiled = !0), a && (s.functional = !0), l && (s._scopeId = "data-v-" + l);
    var u;
    if (c ? (u = function (o) {
        o = o || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !o && typeof __VUE_SSR_CONTEXT__ < "u" && (o = __VUE_SSR_CONTEXT__), n && n.call(this, o), o && o._registeredComponents && o._registeredComponents.add(c);
    }, s._ssrRegister = u) : n && (u = h ? function () {
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
        exports: i,
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
            return !this.selectedSku || this.customizations.length === 0 ? !0 : this.selectedSku.allow_sell_without_customization ? this.customizations.every((i) => r.isEmpty(this.customizationValues[i.id])) : this.customizations.every((i) => i.required ? !r.isEmpty(this.customizationValues[i.id]) : !0);
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
            const t = {}, e = r.omitBy(this.customizationValues, r.isEmpty);
            this.customizations.every((h) => !h.required) && r.isEmpty(e) && !this.selectedSku.allow_sell_without_customization && (t[this.selectedSku.id] = this.customizationValues), r.isEmpty(e) || (t[this.selectedSku.id] = e);
            let a = !1;
            const { recomm_id: n } = window.Yampi.mago_config, l = [];
            n && (a = !0, l.push({ recomm_id: n })), await this.addProductsToCart({
                skus: this.selectedSku,
                quantities: this.quantity,
                products: this.validProduct,
                value: this.selectedSku.prices.data.price * this.quantity,
                showModal: this.showModalAfterPurchase,
                cartType: this.cartType,
                extras: { has_recomm: a, customization: t, item_metadata: l }
            });
            const c = window.themeConfig.theme.params;
            this.handleTrackApi("purchase-intended", {
                location: i,
                quick_buy_button_enabled: c.show_add_to_cart_button,
                product_quantity_updated: this.quantity,
                items: this.validProduct.name,
                amount: this.quantity * this.selectedSku.prices.data.price
            }), this.loading = !1;
        },
        openStockNotificationsModal() {
            this.handleTrackSDK("notify_when_available_subscribed_intended"), this.$refs.stockNotificationsModal.showModal();
        }
    }
};
var z = function () {
    var t = this, e = t._self._c;
    return e("div", { staticClass: "product-customizations" }, [t.validProduct.simple ? t._e() : e("SelectSku", {
        ref: "selectSku", attrs: { "variations-style": t.variationsStyle }, on: {
            update: function (a) {
                return t.setSelectedSku(a);
            }
        }
    }), t.selectedSku && t.showBuyButton ? e("SkuCustomizations", {
        ref: "skuCustomizations", attrs: { sku: t.selectedSku }, on: {
            change: function (a) {
                return t.setCustomizations(a);
            }
        }
    }) : t._e(), t.showBuyButton ? [e("div", { staticClass: "main-product-buy-button-holder flex" }, [t.showQuantitySelector ? e("QuantitySelector", {
        attrs: { disabled: !t.canAddToCart }, model: {
            value: t.quantity, callback: function (a) {
                t.quantity = a;
            }, expression: "quantity"
        }
    }) : t._e(), e("LoaderButton", {
        staticClass: "btn btn-primary", attrs: { title: t.buyButtonText, sending: t.loading, disabled: !t.canAddToCart, "listen-position": !0 }, on: {
            click: function (a) {
                return t.addToCart();
            }
        }
    })], 1)] : t._e(), t.showMobileFloatingButton ? e("FloatingButton", {
        attrs: { quantity: t.quantity, "loading-button": t.loading, disabled: !t.canAddToCart }, on: {
            click: function (a) {
                return t.addToCart("floating-button");
            }, "open-stock-notifications-modal": t.openStockNotificationsModal
        }
    }) : t._e(), t.showBuyButton ? t._e() : [e("div", { staticClass: "main-product-unavailable alert -yellow" }, [t._v(" Produto indispon\xEDvel. ")]), e("button", { staticClass: "btn-stock-notifications btn btn-secundary -block flex -hcenter -vcenter mt-23", on: { click: t.openStockNotificationsModal } }, [e("IconEmail", { staticClass: "fill-current mr-3" }), t._v(" Avise-me quando chegar ")], 1)], t.hasCashbackValid ? e("Cashback", { staticClass: "mt-21 mb-21", attrs: { "percent-amount": t.validCashback.percent_amount } }) : t._e(), t.firstValidSku && t.showInventoryCountdown ? e("InventoryCountdown") : t._e(), t.showShippingForm ? e("Zipcode", { attrs: { quantity: t.quantity, disabled: !t.firstValidSku } }) : t._e(), t.selectedSku || t.validProduct.simple ? e("ModalStockNotifications", {
        ref: "stockNotificationsModal", attrs: { sku: t.selectedSku || t.firstSku[0] }, on: {
            success: function (a) {
                return t.$refs.stockNotificationsSuccessModal.showModal();
            }
        }
    }) : t._e(), e("ModalStockNotificationsSuccess", { ref: "stockNotificationsSuccessModal" })], 2);
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
function f(i) {
    f.installed || (f.installed = !0, i.component("ProductCustomizations", q));
}
const T = {
    install: f
};
let d = null;
typeof window < "u" ? d = window.Vue : typeof global < "u" && (d = global.Vue);
d && d.use(T);
export {
    q as default
};
