import { mapActions as v } from "https://codigo-aberto-production-assets.s3.amazonaws.com/yampi-templates-sandbox/rocket-assets/dist/vendor/vuex.js";
function w(i, e, t, _, a, u, d, h) {
    var o = typeof i == "function" ? i.options : i;
    e && (o.render = e, o.staticRenderFns = t, o._compiled = !0), _ && (o.functional = !0), u && (o._scopeId = "data-v-" + u);
    var r;
    if (d ? (r = function (n) {
        n = n || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !n && typeof __VUE_SSR_CONTEXT__ < "u" && (n = __VUE_SSR_CONTEXT__), a && a.call(this, n), n && n._registeredComponents && n._registeredComponents.add(d);
    }, o._ssrRegister = r) : a && (r = h ? function () {
        a.call(
            this,
            (o.functional ? this.parent : this).$root.$options.shadowRoot
        );
    } : a), r)
        if (o.functional) {
            o._injectStyles = r;
            var m = o.render;
            o.render = function (p, c) {
                return r.call(c), m(p, c);
            };
        } else {
            var f = o.beforeCreate;
            o.beforeCreate = f ? [].concat(f, r) : [r];
        }
    return {
        exports: i,
        options: o
    };
}
const y = {
    name: "Filters",
    props: {
        showBrand: {
            type: Boolean,
            default: !0
        },
        showPrice: {
            type: Boolean,
            default: !0
        },
        showCategories: {
            type: Boolean,
            default: !0
        },
        showPromotions: {
            type: Boolean,
            default: !1
        },
        activeCategory: {
            type: String,
            default: ""
        },
        activePromotion: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            mounted: !1
        };
    },
    computed: {
        showCategoryCheckbox() {
            return window.data.context !== "category";
        }
    },
    async mounted() {
        await this.bootQueryParams(), this.mounted = !0;
    },
    methods: {
        ...v("filters", [
            "bootQueryParams"
        ]),
        closeMobileFilters() {
            document.querySelector(".filters-trigger .over-background").dispatchEvent(new Event("mousedown"));
        }
    }
};
var C = function () {
    var e = this, t = e._self._c;
    return e.mounted ? t("div", [e.showCategories ? t("FilterCategory", { attrs: { "show-checkbox": e.showCategoryCheckbox, "active-category": e.activeCategory } }) : e._e(), e.showPrice ? t("FilterPrice") : e._e(), e.showBrand ? t("FilterBrand") : e._e(), t("FilterCustom"), e.showPromotions ? t("FilterPromotion", { attrs: { "active-promotion": e.activePromotion } }) : e._e(), t("button", { staticClass: "btn btn-secundary mobile -block", on: { click: e.closeMobileFilters } }, [e._v(" VER PRODUTOS ")])], 1) : e._e();
}, g = [], b = /* @__PURE__ */ w(
    y,
    C,
    g,
    !1,
    null,
    null,
    null,
    null
);
const F = b.exports;
function l(i) {
    l.installed || (l.installed = !0, i.component("Filters", F));
}
const P = {
    install: l
};
let s = null;
typeof window < "u" ? s = window.Vue : typeof global < "u" && (s = global.Vue);
s && s.use(P);
export {
    F as default
};
