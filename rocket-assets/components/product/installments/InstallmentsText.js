import v from "https://codigo-aberto-production-assets.s3.amazonaws.com/yampi-templates-main/rocket-assets/dist/vendor/vue-debounce.js";
import I from "https://codigo-aberto-production-assets.s3.amazonaws.com/yampi-templates-main/rocket-assets/dist/vendor/lodash.js";
import g from "https://codigo-aberto-production-assets.s3.amazonaws.com/yampi-templates-main/rocket-assets/components/product/installments/BaseInstallments.js";
function w(t, n, l, h, a, d, m, c) {
    var e = typeof t == "function" ? t.options : t;
    n && (e.render = n, e.staticRenderFns = l, e._compiled = !0), h && (e.functional = !0), d && (e._scopeId = "data-v-" + d);
    var i;
    if (m ? (i = function (s) {
        s = s || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !s && typeof __VUE_SSR_CONTEXT__ < "u" && (s = __VUE_SSR_CONTEXT__), a && a.call(this, s), s && s._registeredComponents && s._registeredComponents.add(m);
    }, e._ssrRegister = i) : a && (i = c ? function () {
        a.call(
            this,
            (e.functional ? this.parent : this).$root.$options.shadowRoot
        );
    } : a), i)
        if (e.functional) {
            e._injectStyles = i;
            var _ = e.render;
            e.render = function (p, f) {
                return i.call(f), _(p, f);
            };
        } else {
            var u = e.beforeCreate;
            e.beforeCreate = u ? [].concat(u, i) : [i];
        }
    return {
        exports: t,
        options: e
    };
}
const $ = {
    name: "InstallmentsText",
    extends: g,
    props: {
        price: {
            type: Number,
            default: null
        }
    },
    computed: {
        isSku() {
            return !this.product.id && !I.isNil(this.validSku);
        }
    },
    mounted() {
        this.validProduct && this.showAllInstallments && this.validProduct.has_variations && this.$watch("validSku", () => this.loadInstallments()), this.isInViewport(this.$refs.installmentText) || !this.installments.installments ? this.loadInstallments() : this.lazyLoadInstallment();
    },
    methods: {
        async loadInstallments(t) {
            try {
                this.installments = await this.handleInstallments(t);
            } catch (n) {
                console.error(n);
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
                return "_";
            const t = this.installments.installments[this.installments.installments.length - 1], n = t.installment_value_formated || this.$formatMoney(t.installment_value);
            let l = `${t.installment}x de <span class="price">${n}</span>`;
            return t.text.includes("sem juros") && (l += ' <span class="-free-tax">sem juros</span>'), l;
        },
        isInViewport(t) {
            if (!t)
                return !0;
            const n = t.getBoundingClientRect(), l = (window.innerHeight || document.documentElement.clientHeight) + 30;
            return n.top >= 0 && n.bottom <= l;
        }
    }
};
var y = function () {
    var n = this, l = n._self._c;
    return l("div", { staticClass: "installment-text", class: { "-loading": n.loading }, domProps: { innerHTML: n._s(n.formattedInstallmentText()) } });
}, C = [], T = /* @__PURE__ */ w(
    $,
    y,
    C,
    !1,
    null,
    null,
    null,
    null
);
const V = T.exports;
function r(t) {
    r.installed || (r.installed = !0, t.component("InstallmentsText", V));
}
const b = {
    install: r
};
let o = null;
typeof window < "u" ? o = window.Vue : typeof global < "u" && (o = global.Vue);
o && o.use(b);
export {
    V as default
};
