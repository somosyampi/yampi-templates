import o from "https://codigo-aberto-production-assets.s3.amazonaws.com/yampi-templates-sandbox/rocket-assets/dist/vendor/lodash.js";
import { mapGetters as f, mapActions as C } from "https://codigo-aberto-production-assets.s3.amazonaws.com/yampi-templates-sandbox/rocket-assets/dist/vendor/vuex.js";
import v from "https://codigo-aberto-production-assets.s3.amazonaws.com/yampi-templates-sandbox/rocket-assets/dist/vendor/mixins/tracking/api.js";
import { createPriceObjects as y } from "https://codigo-aberto-production-assets.s3.amazonaws.com/yampi-templates-sandbox/rocket-assets/dist/vendor/mixins/helpers.js";
function z(s, t, e, a, r, d, h, _) {
    var i = typeof s == "function" ? s.options : s;
    t && (i.render = t, i.staticRenderFns = e, i._compiled = !0), a && (i.functional = !0), d && (i._scopeId = "data-v-" + d);
    var u;
    if (h ? (u = function (n) {
        n = n || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !n && typeof __VUE_SSR_CONTEXT__ < "u" && (n = __VUE_SSR_CONTEXT__), r && r.call(this, n), n && n._registeredComponents && n._registeredComponents.add(h);
    }, i._ssrRegister = u) : r && (u = _ ? function () {
        r.call(
            this,
            (i.functional ? this.parent : this).$root.$options.shadowRoot
        );
    } : r), u)
        if (i.functional) {
            i._injectStyles = u;
            var k = i.render;
            i.render = function (S, p) {
                return u.call(p), k(S, p);
            };
        } else {
            var m = i.beforeCreate;
            i.beforeCreate = m ? [].concat(m, u) : [u];
        }
    return {
        exports: s,
        options: i
    };
}
const g = {
    name: "ModalConfirmAddToCart",
    mixins: [v],
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
        ...f("environment", ["recomm"]),
        ...f("preview", ["isIframe"]),
        modalTitle() {
            return this.showCustomization && this.customizations.length ? "Produto com personaliza\xE7\xE3o" : "Adicionar ao carrinho";
        },
        skuPriceDiscount() {
            return this.selectedSku ? this.selectedSku.prices.data.price_discount : this.product.prices.data.price_discount;
        },
        skuPriceSaleFormated() {
            return this.selectedSku ? this.selectedSku.prices.data.price_sale_formated : this.product.prices.data.price_sale_formated;
        },
        price() {
            return y({ basePath: "prices.data.", pricePath: "price_formatted" });
        },
        skuPriceFormated() {
            return this.selectedSku ? `${o.get(
                this.selectedSku,
                this.price[this.selectedPrice].path,
                this.selectedSku.prices.data.price_formated
            )}` : `${o.get(
                this.product,
                this.price[this.selectedPrice].path,
                this.product.prices.data.price_formated
            )}`;
        },
        imageUrl() {
            return this.selectedSku ? o.get(this.selectedSku, "images.data.0.url", null) : o.get(this.product, "images.data.0.url", null);
        },
        primaryButtonText() {
            return !this.showCustomization && this.customizations.length ? "Pr\xF3ximo" : this.showCustomization && this.customizations.length > 1 ? "Salvar" : "Adicionar";
        },
        customizations() {
            return o.get(this.selectedSku, "customizations.data", []);
        },
        validSku() {
            return this.selectedSku || this.firstValidSku || this.firstSku;
        },
        firstValidSku() {
            return o.get(this.product, "skus.data", []).find((s) => !s.blocked_sale);
        },
        firstSku() {
            return o.get(this.product, "skus.data", []);
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
    methods: {
        ...C("cart", ["addProductsToCart"]),
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
            if (!this.isIframe)
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
            const s = {}, t = o.omitBy(this.customizationValues, o.isEmpty);
            this.customizations.every((r) => !r.required) && o.isEmpty(t) && !this.selectedSku.allow_sell_without_customization && (s[this.selectedSku.id] = this.customizationValues), o.isEmpty(t) || (s[this.selectedSku.id] = t);
            let e = !1;
            const a = [];
            this.recomm && (e = !0, a.push({ recomm_id: this.recomm })), this.sending = !0;
            try {
                await this.addProductsToCart({
                    skus: this.selectedSku,
                    quantities: this.quantity,
                    products: this.product,
                    value: this.selectedSku.prices.data.price,
                    showModal: !0,
                    extras: { has_recomm: e, customization: s, item_metadata: a }
                }), this.handleTrackApi("purchase-intended", {
                    location: "quick-buy-button-modal",
                    product_quantity_updated: this.quantity,
                    items: this.product.name,
                    amount: this.quantity * this.selectedSku.prices.data.price
                });
            } catch (r) {
                this.error = r, console.error(r);
            } finally {
                this.sending = !1, this.closeModal(), this.resetComponent();
            }
        }
    }
};
var w = function () {
    var t = this, e = t._self._c;
    return e("Modal", { ref: "baseModal", attrs: { name: "confirm-add-to-cart", title: t.modalTitle }, on: { close: t.resetComponent } }, [t.product && t.product.skus ? [e("div", { staticClass: "pl-sm-40 pl-xs-24 mb-38" }, [e("div", { staticClass: "product" }, [e("CustomImage", { key: t.imageUrl, staticClass: "-loading", attrs: { src: t.imageUrl, alt: t.product.name, thumbor: { resize: "60x60" }, width: "60", height: "60" } }), e("div", { staticClass: "text" }, [e("p", { staticClass: "name ellipsis-multiline", class: t.ellipsisClass }, [t._v(" " + t._s(t.product.name) + " ")]), t.selectedSku && t.selectedSku.variations.length ? e("ul", t._l(t.selectedSku.variations, function (a) {
        return e("li", { key: a.name }, [t._v(" " + t._s(a.name) + ": " + t._s(a.value) + " ")]);
    }), 0) : t._e(), e("div", { staticClass: "product-prices mt-8" }, [t.skuPriceDiscount ? e("span", { staticClass: "product-old-price old-price mr-6", domProps: { textContent: t._s(t.skuPriceSaleFormated) } }) : t._e(), e("span", { staticClass: "product-actual-price price" }, [t._v(" " + t._s(t.skuPriceFormated) + " "), e("span", { staticClass: "payment-type" }, [t._v(" " + t._s(t.price[t.selectedPrice].text) + " ")])]), e("Installments", { key: JSON.stringify(t.validSku), attrs: { product: t.validSku } })], 1)])], 1), t.firstValidSku ? [e("SelectSku", {
        directives: [{ name: "show", rawName: "v-show", value: t.product.has_variations && !t.showCustomization, expression: "product.has_variations && !showCustomization" }], ref: "selectSku", attrs: { product: t.product, "should-scroll-on-error": !1 }, on: {
            update: function (a) {
                return t.setSelectedSku(a);
            }
        }
    }), t.showCustomization ? [e("CustomizationContent", { ref: "customizationContent", attrs: { sku: t.selectedSku }, on: { change: t.setCustomizations } })] : [e("div", { staticClass: "holder-quantity mt-16" }, [e("label", { attrs: { for: "product-quantity" } }, [t._v("Quantidade")]), e("QuantitySelector", {
        attrs: { id: "product-quantity" }, model: {
            value: t.quantity, callback: function (a) {
                t.quantity = a;
            }, expression: "quantity"
        }
    })], 1)]] : e("div", { staticClass: "alert -yellow" }, [t._v(" Produto indispon\xEDvel. ")])], 2), e("template", { slot: "footer" }, [e("hr"), e("div", { staticClass: "control-button pr-xs-14" }, [e("button", { staticClass: "btn btn-modal-secundary", on: { click: t.handleSecondaryButton } }, [t._v(" Voltar ")]), e("LoaderButton", { staticClass: "btn btn-modal-primary", attrs: { sending: t.sending, disabled: !t.canAddToCart }, on: { click: t.handlePrimaryButton } }, [t._v(" " + t._s(t.primaryButtonText) + " ")])], 1)])] : [e("div", { staticClass: "pl-sm-40 pr-sm-40 pl-xs-24 pr-xs-24 mb-38" }, [e("div", { staticClass: "-loading", staticStyle: { height: "70px" } }), e("div", { staticClass: "-loading mt-30", staticStyle: { height: "70px" } })])]], 2);
}, b = [], P = /* @__PURE__ */ z(
    g,
    w,
    b,
    !1,
    null,
    null,
    null,
    null
);
const V = P.exports;
function c(s) {
    c.installed || (c.installed = !0, s.component("ModalConfirmAddToCart", V));
}
const T = {
    install: c
};
let l = null;
typeof window < "u" ? l = window.Vue : typeof global < "u" && (l = global.Vue);
l && l.use(T);
export {
    V as default
};
