import h from "https://openstore-production-assets.yampi.io/yampi-templates-main/rocket-assets/components/product/installments/BaseInstallments.js";
import v from "https://openstore-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/mixins/buttons.js";
function C(o, t, n, a, r, c, d, _) {
    var e = typeof o == "function" ? o.options : o;
    t && (e.render = t, e.staticRenderFns = n, e._compiled = !0), a && (e.functional = !0), c && (e._scopeId = "data-v-" + c);
    var s;
    if (d ? (s = function (i) {
        i = i || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !i && typeof __VUE_SSR_CONTEXT__ < "u" && (i = __VUE_SSR_CONTEXT__), r && r.call(this, i), i && i._registeredComponents && i._registeredComponents.add(d);
    }, e._ssrRegister = s) : r && (s = _ ? function () {
        r.call(
            this,
            (e.functional ? this.parent : this).$root.$options.shadowRoot
        );
    } : r), s)
        if (e.functional) {
            e._injectStyles = s;
            var m = e.render;
            e.render = function (b, p) {
                return s.call(p), m(b, p);
            };
        } else {
            var f = e.beforeCreate;
            e.beforeCreate = f ? [].concat(f, s) : [s];
        }
    return {
        exports: o,
        options: e
    };
}
const g = {
    name: "FloatingButton",
    extends: h,
    mixins: [v],
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
        },
        price: {
            type: Object,
            required: !0
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
        }
    },
    async mounted() {
        this.scroll();
        const o = new IntersectionObserver((n) => {
            n.forEach((a) => {
                this.showFloatingButton = !a.isIntersecting;
            });
        }, { threshold: 0.4 });
        document.querySelectorAll(".main-product-buy-button-holder, .btn-stock-notifications").forEach((n) => {
            o.observe(n);
        });
    }
};
var k = function () {
    var t = this, n = t._self._c;
    return n("div", { staticClass: "floating-button" }, [n("Transition", { attrs: { name: "fade" } }, [t.sku && !t.sku.blocked_sale && t.showFloatingButton ? n("div", { staticClass: "floating-button-container" }, [n("div", { staticClass: "prices-container" }, [t.price.has_promotion ? n("p", { staticClass: "original-price-discount" }, [t._v(" " + t._s(t.price.price_sale_formated) + " ")]) : t._e(), n("p", { staticClass: "original-price" }, [t._v(" " + t._s(t.price.price_formated) + " ")]), t.price.installments_data ? n("div", { staticClass: "installments" }, [n("p", { domProps: { textContent: t._s(t.price.installments_data.text) } })]) : t._e()]), n("div", { staticClass: "button-container" }, [n("LoaderButton", {
        staticClass: "btn btn-primary", attrs: { sending: t.loadingButton, disabled: t.disabled }, on: {
            click: function (a) {
                return t.$emit("click");
            }
        }
    }, [t._v(" " + t._s(t.buyButtonText) + " ")])], 1)]) : t.sku && t.sku.blocked_sale && t.showFloatingButton ? n("div", { staticClass: "pl-22 pr-22 pt-16 pb-16 floating-button-container" }, [n("button", {
        staticClass: "btn-stock-notifications btn btn-secundary -block uppercase flex -hcenter -vcenter", on: {
            click: function (a) {
                return t.$emit("open-stock-notifications-modal");
            }
        }
    }, [n("IconEmail", { staticClass: "fill-current" }), t._v(" Avise-me quando chegar ")], 1)]) : t._e()])], 1);
}, y = [], B = /* @__PURE__ */ C(
    g,
    k,
    y,
    !1,
    null,
    null,
    null,
    null
);
const $ = B.exports;
function u(o) {
    u.installed || (u.installed = !0, o.component("FloatingButton", $));
}
const w = {
    install: u
};
let l = null;
typeof window < "u" ? l = window.Vue : typeof global < "u" && (l = global.Vue);
l && l.use(w);
export {
    $ as default
};
