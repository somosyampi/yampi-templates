import v from "https://codigo-aberto-production-assets.s3.amazonaws.com/yampi-templates-main/rocket-assets/dist/vendor/lodash.js";
import I from "https://codigo-aberto-production-assets.s3.amazonaws.com/yampi-templates-main/rocket-assets/dist/vendor/vue-debounce.js";
import w from "https://codigo-aberto-production-assets.s3.amazonaws.com/yampi-templates-main/rocket-assets/components/product/installments/BaseInstallments.js";
function g(n, t, a, d, i, f, u, c) {
    var e = typeof n == "function" ? n.options : n;
    t && (e.render = t, e.staticRenderFns = a, e._compiled = !0), d && (e.functional = !0), f && (e._scopeId = "data-v-" + f);
    var s;
    if (u ? (s = function (l) {
        l = l || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !l && typeof __VUE_SSR_CONTEXT__ < "u" && (l = __VUE_SSR_CONTEXT__), i && i.call(this, l), l && l._registeredComponents && l._registeredComponents.add(u);
    }, e._ssrRegister = s) : i && (s = c ? function () {
        i.call(
            this,
            (e.functional ? this.parent : this).$root.$options.shadowRoot
        );
    } : i), s)
        if (e.functional) {
            e._injectStyles = s;
            var _ = e.render;
            e.render = function (p, h) {
                return s.call(h), _(p, h);
            };
        } else {
            var m = e.beforeCreate;
            e.beforeCreate = m ? [].concat(m, s) : [s];
        }
    return {
        exports: n,
        options: e
    };
}
const y = {
    name: "Installments",
    extends: w,
    props: {
        loaderHeight: {
            type: Number,
            default: null
        },
        defaultInstallments: {
            type: Object,
            default: void 0
        },
        showAllInstallments: {
            type: Boolean,
            default: !1
        }
    },
    data: () => ({
        lazyLoaded: !1
    }),
    computed: {
        isSku() {
            return !this.product.id && !v.isNil(this.validSku);
        }
    },
    mounted() {
        this.validProduct && this.showAllInstallments && this.validProduct.has_variations && this.$watch("validSku", () => this.loadInstallments()), this.isInViewport(this.$refs.installmentText) || !this.installments.installments ? this.loadInstallments() : this.lazyLoadInstallment();
    },
    methods: {
        async loadInstallments(n) {
            try {
                this.installments = await this.handleInstallments(n);
            } catch (t) {
                console.error(t);
            } finally {
                this.loading = !1;
            }
        },
        showInstallmentsModal() {
            this.$refs.modalInstallments.showModal();
        },
        lazyLoadInstallment() {
            document.addEventListener(
                "scroll",
                I(() => {
                    !this.lazyLoaded && this.isInViewport(this.$refs.installmentText) && (this.lazyLoaded = !0, this.loadInstallments());
                }, 40),
                { passive: !0 }
            );
        },
        isInViewport(n) {
            if (!n)
                return !0;
            const t = n.getBoundingClientRect(), a = (window.innerHeight || document.documentElement.clientHeight) + 30;
            return t.top >= 0 && t.bottom <= a;
        }
    }
};
var C = function () {
    var t = this, a = t._self._c;
    return a("div", [t.installments.installments ? [t.showAllInstallments ? [a("div", {
        staticClass: "show-installments link-alike", class: { "-loading": t.loading }, on: {
            click: function (d) {
                return t.showInstallmentsModal();
            }
        }
    }, [t._v(" Ver op\xE7\xF5es de parcelamento ")])] : t._e()] : t._e(), t.showAllInstallments ? a("ModalInstallments", { ref: "modalInstallments", attrs: { product: t.validSku } }) : t._e()], 2);
}, $ = [], b = /* @__PURE__ */ g(
    y,
    C,
    $,
    !1,
    null,
    null,
    null,
    null
);
const V = b.exports;
function r(n) {
    r.installed || (r.installed = !0, n.component("Installments", V));
}
const k = {
    install: r
};
let o = null;
typeof window < "u" ? o = window.Vue : typeof global < "u" && (o = global.Vue);
o && o.use(k);
export {
    V as default
};
