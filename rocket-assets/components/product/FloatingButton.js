import v from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/lodash.js";
import b from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/components/product/installments/BaseInstallments.js";
import g from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/mixins/buttons.js";
function C(s, t, n, o, l, c, d, p) {
    var e = typeof s == "function" ? s.options : s;
    t && (e.render = t, e.staticRenderFns = n, e._compiled = !0), o && (e.functional = !0), c && (e._scopeId = "data-v-" + c);
    var a;
    if (d ? (a = function (i) {
        i = i || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !i && typeof __VUE_SSR_CONTEXT__ < "u" && (i = __VUE_SSR_CONTEXT__), l && l.call(this, i), i && i._registeredComponents && i._registeredComponents.add(d);
    }, e._ssrRegister = a) : l && (a = p ? function () {
        l.call(
            this,
            (e.functional ? this.parent : this).$root.$options.shadowRoot
        );
    } : l), a)
        if (e.functional) {
            e._injectStyles = a;
            var m = e.render;
            e.render = function (h, _) {
                return a.call(_), m(h, _);
            };
        } else {
            var f = e.beforeCreate;
            e.beforeCreate = f ? [].concat(f, a) : [a];
        }
    return {
        exports: s,
        options: e
    };
}
const k = {
    name: "FloatingButton",
    extends: b,
    mixins: [g],
    props: {
        quantity: {
            type: Number,
            default: 1
        },
        loadingButton: {
            type: Boolean,
            required: !0
        },
        disabled: {
            type: Boolean,
            default: !1
        }
    },
    data() {
        return {
            showFloatingButton: !1
        };
    },
    computed: {
        sku() {
            return this.selectedSku || this.firstValidSku;
        },
        buyButtonText() {
            return this.quantity > 1 ? `Comprar (${this.quantity})` : "Comprar";
        },
        originalPriceClass() {
            return this.sku.prices.data.has_promotion || this.sku.prices.data.price_discount > 0 ? "original-price-discount" : "original-price";
        },
        lastInstallment() {
            return v.last(this.installments.installments);
        }
    },
    async created() {
        this.scroll(), this.installments = await this.handleInstallments();
        const s = new IntersectionObserver((n) => {
            n.forEach((o) => {
                this.showFloatingButton = !o.isIntersecting;
            });
        }, { threshold: 0.4 });
        document.querySelectorAll(".main-product-buy-button-holder, .btn-stock-notifications").forEach((n) => {
            s.observe(n);
        });
    }
};
var y = function () {
    var t = this, n = t._self._c;
    return n("div", { staticClass: "floating-button" }, [n("Transition", { attrs: { name: "fade" } }, [t.sku && !t.sku.blocked_sale && t.showFloatingButton ? n("div", { staticClass: "floating-button-container" }, [n("div", { staticClass: "prices-container" }, [n("p", { class: t.originalPriceClass }, [t._v(" " + t._s(t.sku.prices.data.price_sale_formated) + " ")]), t.sku.prices.data.price_discount > 0 ? n("p", { staticClass: "original-price" }, [t._v(" " + t._s(t.sku.prices.data.price_discount_formated) + " ")]) : t._e(), t.lastInstallment ? n("div", { staticClass: "installments" }, [n("p", [t._v(" " + t._s(t.lastInstallment.installment) + "x de "), n("span", { staticClass: "installment-price" }, [t._v(" " + t._s(t._f("formatMoney")(t.lastInstallment.installment_value)) + " ")]), t.lastInstallment.tax_value === 0 ? n("span", [t._v(" sem juros ")]) : t._e()])]) : t._e()]), n("div", { staticClass: "button-container" }, [n("LoaderButton", {
        staticClass: "btn btn-primary", attrs: { sending: t.loadingButton, disabled: t.disabled }, on: {
            click: function (o) {
                return t.$emit("click");
            }
        }
    }, [t._v(" " + t._s(t.buyButtonText) + " ")])], 1)]) : t.sku && t.sku.blocked_sale && t.showFloatingButton ? n("div", { staticClass: "pl-22 pr-22 pt-16 pb-16 floating-button-container" }, [n("button", {
        staticClass: "btn-stock-notifications btn btn-secundary -block uppercase flex -hcenter -vcenter", on: {
            click: function (o) {
                return t.$emit("open-stock-notifications-modal");
            }
        }
    }, [n("IconEmail", { staticClass: "fill-current" }), t._v(" Avise-me quando chegar ")], 1)]) : t._e()])], 1);
}, B = [], w = /* @__PURE__ */ C(
    k,
    y,
    B,
    !1,
    null,
    null,
    null,
    null
);
const $ = w.exports;
function u(s) {
    u.installed || (u.installed = !0, s.component("FloatingButton", $));
}
const I = {
    install: u
};
let r = null;
typeof window < "u" ? r = window.Vue : typeof global < "u" && (r = global.Vue);
r && r.use(I);
export {
    $ as default
};
