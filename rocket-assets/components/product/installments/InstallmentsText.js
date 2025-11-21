import v from "https://openstore-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/vue-debounce.js";
import I from "https://openstore-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/lodash.js";
import { mapGetters as g } from "https://openstore-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/vuex.js";
import w from "https://openstore-production-assets.yampi.io/yampi-templates-main/rocket-assets/components/product/installments/BaseInstallments.js";
function T(t, e, n, f, i, m, d, c) {
    var s = typeof t == "function" ? t.options : t;
    e && (s.render = e, s.staticRenderFns = n, s._compiled = !0), f && (s.functional = !0), m && (s._scopeId = "data-v-" + m);
    var a;
    if (d ? (a = function (l) {
        l = l || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !l && typeof __VUE_SSR_CONTEXT__ < "u" && (l = __VUE_SSR_CONTEXT__), i && i.call(this, l), l && l._registeredComponents && l._registeredComponents.add(d);
    }, s._ssrRegister = a) : i && (a = c ? function () {
        i.call(
            this,
            (s.functional ? this.parent : this).$root.$options.shadowRoot
        );
    } : i), a)
        if (s.functional) {
            s._injectStyles = a;
            var p = s.render;
            s.render = function (_, h) {
                return a.call(h), p(_, h);
            };
        } else {
            var u = s.beforeCreate;
            s.beforeCreate = u ? [].concat(u, a) : [a];
        }
    return {
        exports: t,
        options: s
    };
}
const x = {
    name: "InstallmentsText",
    extends: w,
    props: {
        price: {
            type: Number,
            default: null
        },
        product: {
            type: Object,
            required: !0
        },
        productPrices: {
            type: Object,
            default: null
        }
    },
    computed: {
        ...g("merchant", [
            "storeModules",
            "defaultCard"
        ]),
        isSku() {
            return !this.product.id && !I.isNil(this.validSku);
        },
        hasTaxes() {
            return this.installmentsData.installments.some((t) => t.tax_value > 0);
        },
        installmentsData() {
            var t;
            return (t = this.productPrices) == null ? void 0 : t.installments_data;
        },
        taxesText() {
            return this.hasTaxes ? "*" : "sem juros";
        },
        shouldShowInstallments() {
            return this.storeModules.new_search && !!this.installmentsData && !!this.defaultCard;
        },
        installmentText() {
            var e, n;
            return (n = (e = this.installmentsData) == null ? void 0 : e.installments) != null && n.length ? this.installmentsData.installments[this.installmentsData.installments.length - 1].text : " ";
        }
    },
    mounted() {
        this.storeModules.new_search || (this.validProduct && this.showAllInstallments && this.validProduct.has_variations && this.$watch("validSku", () => this.loadInstallments()), this.isInViewport(this.$refs.installmentText) || !this.installments.installments ? this.loadInstallments() : this.lazyLoadInstallment());
    },
    methods: {
        async loadInstallments(t) {
            try {
                this.installments = await this.handleInstallments(t);
            } catch (e) {
                console.error(e);
            } finally {
                this.loading = !1;
            }
        },
        lazyLoadInstallment() {
            document.addEventListener(
                "scroll",
                v(() => {
                    !this.lazyLoaded && this.isInViewport(this.$refs.installmentText) && (this.lazyLoaded = !0, this.loadInstallments());
                }, 40),
                { passive: !0 }
            );
        },
        formattedInstallmentText() {
            if (!this.installments.installments || !this.installments.installments.length)
                return " ";
            const t = this.installments.installments[this.installments.installments.length - 1], e = t.installment_value_formated || this.$formatMoney(t.installment_value);
            let n = `${t.installment}x de <span class="price">${e}</span>`;
            return t.text.includes("sem juros") && (n += ' <span class="-free-tax">sem juros</span>'), n;
        },
        isInViewport(t) {
            if (!t)
                return !0;
            const e = t.getBoundingClientRect(), n = (window.innerHeight || document.documentElement.clientHeight) + 30;
            return e.top >= 0 && e.bottom <= n;
        }
    }
};
var y = function () {
    var e = this, n = e._self._c;
    return n("LazyVisibility", { staticClass: "installments-text" }, [e.shouldShowInstallments ? n("div", { staticClass: "installment-text", domProps: { innerHTML: e._s(e.installmentText) } }) : n("div", { staticClass: "installment-text", class: { "-loading": e.loading }, domProps: { innerHTML: e._s(e.formattedInstallmentText()) } })]);
}, C = [], $ = /* @__PURE__ */ T(
    x,
    y,
    C,
    !1,
    null,
    null,
    null,
    null
);
const b = $.exports;
function o(t) {
    o.installed || (o.installed = !0, t.component("InstallmentsText", b));
}
const V = {
    install: o
};
let r = null;
typeof window < "u" ? r = window.Vue : typeof global < "u" && (r = global.Vue);
r && r.use(V);
export {
    b as default
};
