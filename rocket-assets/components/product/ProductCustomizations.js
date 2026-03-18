import { mapActions as m } from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/vuex.js";
import u from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/lodash.js";
import v from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/mixins/product.js";
import y from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/mixins/cashback.js";
function C(s, t, e, a, n, l, h, k) {
    var i = typeof s == "function" ? s.options : s;
    t && (i.render = t, i.staticRenderFns = e, i._compiled = !0), a && (i.functional = !0), l && (i._scopeId = "data-v-" + l);
    var r;
    if (h ? (r = function (o) {
        o = o || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !o && typeof __VUE_SSR_CONTEXT__ < "u" && (o = __VUE_SSR_CONTEXT__), n && n.call(this, o), o && o._registeredComponents && o._registeredComponents.add(h);
    }, i._ssrRegister = r) : n && (r = k ? function () {
        n.call(
            this,
            (i.functional ? this.parent : this).$root.$options.shadowRoot
        );
    } : n), r)
        if (i.functional) {
            i._injectStyles = r;
            var _ = i.render;
            i.render = function (S, p) {
                return r.call(p), _(S, p);
            };
        } else {
            var f = i.beforeCreate;
            i.beforeCreate = f ? [].concat(f, r) : [r];
        }
    return {
        exports: s,
        options: i
    };
}
const b = {
    name: "ProductCustomizations",
    mixins: [
        v,
        y
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
        },
        price: {
            type: Object,
            required: !0
        }
    },
    data: () => ({
        quantity: 1,
        loading: !1,
        customizationValues: {},
        customizationHasErrors: !1,
        showErrorMessage: !1
    }),
    computed: {
        canAddToCart() {
            return !!this.firstValidSku;
        },
        customizations() {
            return u.get(this.selectedSku, "customizations.data", []);
        },
        areCustomizationsValid() {
            return !this.selectedSku || this.customizations.length === 0 ? !0 : this.selectedSku.allow_sell_without_customization ? this.customizations.every((s) => u.isEmpty(this.customizationValues[s.id])) : this.customizations.every((s) => s.required ? !u.isEmpty(this.customizationValues[s.id]) : !0);
        },
        validCashback() {
            const {
                price_sale: s,
                price_discount: t
            } = this.validSku;
            let e = s;
            return t > 0 && (e = t), this.getValidCashback(this.cashbacks, e);
        },
        hasCashbackValid() {
            return u.isEmpty(this.validCashback) ? !1 : this.validCashback.percent_amount > 0;
        },
        showBuyButton() {
            return !(this.selectedSku && this.selectedSku.blocked_sale || this.validProduct.simple && this.validProduct.blocked_sale);
        },
        showUnavailableMessage() {
            return !this.firstValidSku || this.selectedSku && this.selectedSku.blocked_sale;
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
        setCustomizations(s) {
            this.customizationValues = s;
        },
        handleSelectSkuUpdate(s) {
            this.showErrorMessage = !1, this.setSelectedSku(s);
        },
        async addToCart() {
            if (this.showErrorMessage = !1, !this.selectedSku) {
                this.$refs.selectSku.verifySelect(), this.showErrorMessage = !0;
                return;
            }
            if (!this.$refs.skuCustomizations.checkValues(
                this.$refs.skuCustomizations.values
            ))
                return;
            this.loading = !0;
            const s = {}, t = u.omitBy(this.customizationValues, u.isEmpty);
            this.customizations.every((l) => !l.required) && u.isEmpty(t) && !this.selectedSku.allow_sell_without_customization && (s[this.selectedSku.id] = this.customizationValues), u.isEmpty(t) || (s[this.selectedSku.id] = t);
            let e = !1;
            const { recomm_id: a } = window.Yampi.mago_config, n = [];
            a && (e = !0, n.push({ recomm_id: a })), await this.addProductsToCart({
                skus: this.selectedSku,
                quantities: this.quantity,
                products: this.validProduct,
                value: this.selectedSku.prices.data.price * this.quantity,
                showModal: this.showModalAfterPurchase,
                cartType: this.cartType,
                extras: { has_recomm: e, customization: s, item_metadata: n }
            }), this.loading = !1;
        },
        openStockNotificationsModal() {
            this.$refs.stockNotificationsModal.showModal();
        }
    }
};
var w = function () {
    var t = this, e = t._self._c;
    return e("div", { staticClass: "product-customizations" }, [t.validProduct.simple ? t._e() : e("SelectSku", { ref: "selectSku", attrs: { "variations-style": t.variationsStyle, "show-error-message": !1 }, on: { update: t.handleSelectSkuUpdate } }), t.selectedSku && t.showBuyButton ? e("SkuCustomizations", {
        ref: "skuCustomizations", attrs: { sku: t.selectedSku }, on: {
            change: function (a) {
                return t.setCustomizations(a);
            }
        }
    }) : t._e(), t.showUnavailableMessage ? e("div", { staticClass: "main-product-unavailable alert -yellow" }, [t._v(" Produto indispon\xEDvel. ")]) : t._e(), t.showBuyButton ? [e("div", { staticClass: "main-product-buy-button-holder flex" }, [t.showQuantitySelector ? e("QuantitySelector", {
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
    }), t.showErrorMessage ? e("p", { staticClass: "helper-text -error" }, [t._v(" Selecione uma op\xE7\xE3o para comprar ")]) : t._e()], 1)] : t._e(), t.showBuyButton ? t._e() : e("button", { staticClass: "btn-stock-notifications btn btn-secundary -block flex -hcenter -vcenter mt-23", on: { click: t.openStockNotificationsModal } }, [e("IconEmail", { staticClass: "fill-current mr-3" }), t._v(" Avise-me quando chegar ")], 1), t.hasCashbackValid ? e("Cashback", { staticClass: "mt-21 mb-21", attrs: { "percent-amount": t.validCashback.percent_amount } }) : t._e(), t.firstValidSku && t.showInventoryCountdown ? e("InventoryCountdown") : t._e(), t.showShippingForm ? e("Zipcode", { attrs: { quantity: t.quantity, disabled: !t.firstValidSku } }) : t._e(), t.showMobileFloatingButton ? e("FloatingButton", {
        attrs: { quantity: t.quantity, "loading-button": t.loading, disabled: !t.canAddToCart, price: t.price }, on: {
            click: function (a) {
                return t.addToCart();
            }, "open-stock-notifications-modal": t.openStockNotificationsModal
        }
    }) : t._e(), t.selectedSku || t.validProduct.simple ? e("ModalStockNotifications", {
        ref: "stockNotificationsModal", attrs: { sku: t.selectedSku || t.firstSku[0] }, on: {
            success: function (a) {
                return t.$refs.stockNotificationsSuccessModal.showModal();
            }
        }
    }) : t._e(), e("ModalStockNotificationsSuccess", { ref: "stockNotificationsSuccessModal" })], 2);
}, g = [], z = /* @__PURE__ */ C(
    b,
    w,
    g,
    !1,
    null,
    null,
    null,
    null
);
const V = z.exports;
function d(s) {
    d.installed || (d.installed = !0, s.component("ProductCustomizations", V));
}
const M = {
    install: d
};
let c = null;
typeof window < "u" ? c = window.Vue : typeof global < "u" && (c = global.Vue);
c && c.use(M);
export {
    V as default
};
