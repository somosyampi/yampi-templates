function v(i, t, o, n, a, d, l, m) {
    var e = typeof i == "function" ? i.options : i;
    t && (e.render = t, e.staticRenderFns = o, e._compiled = !0), n && (e.functional = !0), d && (e._scopeId = "data-v-" + d);
    var s;
    if (l ? (s = function (r) {
        r = r || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !r && typeof __VUE_SSR_CONTEXT__ < "u" && (r = __VUE_SSR_CONTEXT__), a && a.call(this, r), r && r._registeredComponents && r._registeredComponents.add(l);
    }, e._ssrRegister = s) : a && (s = m ? function () {
        a.call(
            this,
            (e.functional ? this.parent : this).$root.$options.shadowRoot
        );
    } : a), s)
        if (e.functional) {
            e._injectStyles = s;
            var C = e.render;
            e.render = function (p, f) {
                return s.call(f), C(p, f);
            };
        } else {
            var h = e.beforeCreate;
            e.beforeCreate = h ? [].concat(h, s) : [s];
        }
    return {
        exports: i,
        options: e
    };
}
const _ = {
    name: "ModalBuyTogetherCustomization",
    props: {
        productsForCustomization: {
            type: Array,
            required: !0
        },
        customizedProducts: {
            type: Object,
            required: !0
        },
        comboId: {
            type: [String, Number],
            required: !0
        }
    },
    data() {
        return {
            active: 0,
            allProductsCustomizations: {}
        };
    },
    computed: {
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
        handleModal() {
            this.$refs.baseModal.handleModal();
        },
        handleActive(i) {
            this.currentProductRef.$refs.customizationContent.hasErrorInCustomizations(), this.currentProductRef.$refs.customizationContent.hasErrors || (this.$emit("addSkuCustomization", {
                [this.currentProductRef.sku.id]: {
                    ...this.currentProductRef.$refs.customizationContent.values,
                    isPersonalized: this.currentProductRef.skuCustomized
                }
            }), this.active = i);
        },
        handlePrimaryButton() {
            this.currentProductRef.$refs.customizationContent.hasErrorInCustomizations(), !this.currentProductRef.$refs.customizationContent.hasErrors && (this.$emit("addSkuCustomization", {
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
            this.isFirstProductActive && (this.$emit("resetCustomizations"), this.handleModal());
        }
    }
};
var z = function () {
    var t = this, o = t._self._c;
    return o("Modal", { ref: "baseModal", attrs: { name: `ProductCustomization-${t.comboId}`, title: `${t.$tc("common.count-product", t.productsForCustomization.length)} para personalizar`, scrollable: !1 } }, [t.productsForCustomization.length > 1 ? o("Stepper", { staticClass: "pl-40 pr-40 pl-xs-22 pr-xs-22 mt-30", attrs: { items: t.productsForCustomization, active: t.active }, on: { click: t.handleActive } }) : t._e(), o("div", { staticClass: "buy-together-modal-form mt-38" }, [t.productsForCustomization.length ? o("div", { staticClass: "pl-40 pr-40 pl-xs-22 pr-xs-22 mb-38" }, t._l(t.productsForCustomization, function (n) {
        return o("div", { key: n.id }, [t.currentProductId === n.id ? o("BuyTogetherCustomizationContent", { ref: `CustomizationContent-${n.id}`, refInFor: !0, attrs: { sku: n, "customized-products": t.customizedProducts } }) : t._e()], 1);
    }), 0) : t._e()]), o("hr"), o("div", { staticClass: "control-button" }, [o("button", { staticClass: "btn btn-modal-secundary", on: { click: t.handleSecundaryButton } }, [t._v(" Voltar ")]), o("button", { staticClass: "btn btn-modal-primary", on: { click: t.handlePrimaryButton } }, [t._v(" " + t._s(t.primaryButtonText) + " ")])])], 1);
}, P = [], $ = /* @__PURE__ */ v(
    _,
    z,
    P,
    !1,
    null,
    null,
    null,
    null
);
const b = $.exports;
function c(i) {
    c.installed || (c.installed = !0, i.component("ModalBuyTogetherCustomization", b));
}
const y = {
    install: c
};
let u = null;
typeof window < "u" ? u = window.Vue : typeof global < "u" && (u = global.Vue);
u && u.use(y);
export {
    b as default
};
