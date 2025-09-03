import { mapGetters as v, mapActions as _ } from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/vuex.js";
function z(i, t, e, n, a, d, l, m) {
    var o = typeof i == "function" ? i.options : i;
    t && (o.render = t, o.staticRenderFns = e, o._compiled = !0), n && (o.functional = !0), d && (o._scopeId = "data-v-" + d);
    var s;
    if (l ? (s = function (r) {
        r = r || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !r && typeof __VUE_SSR_CONTEXT__ < "u" && (r = __VUE_SSR_CONTEXT__), a && a.call(this, r), r && r._registeredComponents && r._registeredComponents.add(l);
    }, o._ssrRegister = s) : a && (s = m ? function () {
        a.call(
            this,
            (o.functional ? this.parent : this).$root.$options.shadowRoot
        );
    } : a), s)
        if (o.functional) {
            o._injectStyles = s;
            var C = o.render;
            o.render = function (p, f) {
                return s.call(f), C(p, f);
            };
        } else {
            var h = o.beforeCreate;
            o.beforeCreate = h ? [].concat(h, s) : [s];
        }
    return {
        exports: i,
        options: o
    };
}
const P = {
    name: "ModalBuyTogetherCustomization",
    data() {
        return {
            active: 0,
            allProductsCustomizations: {}
        };
    },
    computed: {
        ...v("buyTogether", ["productsForCustomization", "customizedProducts"]),
        isFirstProductActive() {
            return this.active === 0;
        },
        isLastProductActive() {
            return this.active + 1 === this.productsForCustomization.length;
        },
        primaryButtonText() {
            return this.isLastProductActive ? "Salvar" : "Pr\xF3ximo";
        },
        currentProductRef() {
            return this.$refs[`CustomizationContent-${this.productsForCustomization[this.active].id}`][0];
        },
        currentProductId() {
            return this.productsForCustomization[this.active].id;
        }
    },
    methods: {
        ..._("buyTogether", ["addSkuCustomization", "reset"]),
        handleModal() {
            this.$refs.baseModal.handleModal();
        },
        handleActive(i) {
            this.currentProductRef.$refs.customizationContent.hasErrorInCustomizations(), this.currentProductRef.$refs.customizationContent.hasErrors || (this.addSkuCustomization({
                [this.currentProductRef.sku.id]: {
                    ...this.currentProductRef.$refs.customizationContent.values,
                    isPersonalized: this.currentProductRef.skuCustomized
                }
            }), this.active = i);
        },
        handlePrimaryButton() {
            this.currentProductRef.$refs.customizationContent.hasErrorInCustomizations(), !this.currentProductRef.$refs.customizationContent.hasErrors && (this.addSkuCustomization({
                [this.currentProductRef.sku.id]: {
                    isPersonalized: this.currentProductRef.$refs.customizationContent.skuCustomized,
                    isMandatory: !this.currentProductRef.sku.allow_sell_without_customization,
                    ...this.currentProductRef.$refs.customizationContent.values
                }
            }), this.isLastProductActive ? (this.$emit("save"), this.handleModal(), this.active = 0) : this.active++);
        },
        handleSecundaryButton() {
            if (this.active > 0) {
                this.active--;
                return;
            }
            this.isFirstProductActive && (this.reset(), this.handleModal());
        }
    }
};
var $ = function () {
    var t = this, e = t._self._c;
    return e("Modal", { ref: "baseModal", attrs: { name: "ProductCustomization", title: `${t.$tc("common.count-product", t.productsForCustomization.length)} para personalizar`, scrollable: !1 } }, [t.productsForCustomization.length > 1 ? e("Stepper", { staticClass: "pl-40 pr-40 pl-xs-22 pr-xs-22 mt-30", attrs: { items: t.productsForCustomization, active: t.active }, on: { click: t.handleActive } }) : t._e(), e("div", { staticClass: "buy-together-modal-form mt-38" }, [t.productsForCustomization.length ? e("div", { staticClass: "pl-40 pr-40 pl-xs-22 pr-xs-22 mb-38" }, t._l(t.productsForCustomization, function (n) {
        return e("div", { key: n.id }, [t.currentProductId === n.id ? e("BuyTogetherCustomizationContent", { ref: `CustomizationContent-${n.id}`, refInFor: !0, attrs: { sku: n } }) : t._e()], 1);
    }), 0) : t._e()]), e("hr"), e("div", { staticClass: "control-button" }, [e("button", { staticClass: "btn btn-modal-secundary", on: { click: t.handleSecundaryButton } }, [t._v(" Voltar ")]), e("button", { staticClass: "btn btn-modal-primary", on: { click: t.handlePrimaryButton } }, [t._v(" " + t._s(t.primaryButtonText) + " ")])])], 1);
}, b = [], y = /* @__PURE__ */ z(
    P,
    $,
    b,
    !1,
    null,
    null,
    null,
    null
);
const R = y.exports;
function c(i) {
    c.installed || (c.installed = !0, i.component("ModalBuyTogetherCustomization", R));
}
const g = {
    install: c
};
let u = null;
typeof window < "u" ? u = window.Vue : typeof global < "u" && (u = global.Vue);
u && u.use(g);
export {
    R as default
};
