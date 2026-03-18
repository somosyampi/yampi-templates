import { mapActions as _ } from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/vuex.js";
import b from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/mixins/queryParams.js";
import w from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/modules/axios/search.js";
import { builderSearch as v } from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/modules/search/searchHelpers.js";
function C(e, r, o, s, i, c, u, t) {
    var a = typeof e == "function" ? e.options : e;
    r && (a.render = r, a.staticRenderFns = o, a._compiled = !0), s && (a.functional = !0), c && (a._scopeId = "data-v-" + c);
    var l;
    if (u ? (l = function (n) {
        n = n || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !n && typeof __VUE_SSR_CONTEXT__ < "u" && (n = __VUE_SSR_CONTEXT__), i && i.call(this, n), n && n._registeredComponents && n._registeredComponents.add(u);
    }, a._ssrRegister = l) : i && (l = t ? function () {
        i.call(
            this,
            (a.functional ? this.parent : this).$root.$options.shadowRoot
        );
    } : i), l)
        if (a.functional) {
            a._injectStyles = l;
            var m = a.render;
            a.render = function (p, y) {
                return l.call(y), m(p, y);
            };
        } else {
            var h = a.beforeCreate;
            a.beforeCreate = h ? [].concat(h, l) : [l];
        }
    return {
        exports: e,
        options: a
    };
}
const k = {
    name: "Filters",
    mixins: [
        b
    ],
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
        },
        productsPerPage: {
            type: [Number, String],
            default: 10
        }
    },
    data() {
        return {
            mounted: !1,
            allCategories: [],
            allBrands: [],
            allPrices: [],
            allFilters: {},
            parsingFilters: !1
        };
    },
    computed: {
        showCategoryCheckbox() {
            return window.data.context !== "category";
        },
        shouldShowFilters() {
            var e;
            return this.shouldUseNewSearchStrategy ? !!(this.mounted && !this.parsingFilters && ((e = this.allBrands) == null ? void 0 : e.length)) : this.mounted;
        }
    },
    async mounted() {
        if (await this.bootQueryParams(), this.mounted = !0, !this.shouldUseNewSearchStrategy)
            return;
        const e = new URLSearchParams(window.location.search), r = await v.execute(
            w,
            {
                q: e.get("q")
            }
        );
        this.parseAggs({ elasticAggregations: r.aggs }), this.syncUrlParamsWithActiveFilters(e);
    },
    methods: {
        ..._("filters", [
            "bootQueryParams"
        ]),
        syncUrlParamsWithActiveFilters(e) {
            if (e.has("max") || e.has("min")) {
                const o = e.has("max") ? Number(e.get("max")).toLocaleString(void 0, { style: "currency", currency: "BRL" }) : Number(this.allPrices[1]).toLocaleString(void 0, { style: "currency", currency: "BRL" }), s = e.has("min") ? Number(e.get("min")).toLocaleString(void 0, { style: "currency", currency: "BRL" }) : Number("0").toLocaleString(void 0, { style: "currency", currency: "BRL" });
                this.addActiveFilter({
                    alias: "price",
                    id: this.$randomString(),
                    key: "price",
                    name: `${s} - ${o}`,
                    query: {
                        min: s,
                        max: o
                    }
                });
            }
            const r = ["q", "min", "max", "attributes"];
            e.forEach((o, s) => {
                if (r.includes(s))
                    return;
                const i = s.replace(/\[\]/g, "");
                this.addActiveFilter({
                    alias: `${i}-${o}`,
                    id: o,
                    key: i,
                    name: o,
                    query: {
                        [i]: o
                    }
                });
            });
        },
        closeMobileFilters() {
            document.querySelector(".filters-trigger .over-background").dispatchEvent(new Event("mousedown"));
        },
        parseAggs({ elasticAggregations: e }) {
            var c, u;
            if (!e || typeof e != "object")
                return;
            const r = /* @__PURE__ */ new Map();
            e.brands && Array.isArray(e.brands.buckets) && e.brands.buckets.forEach((t) => {
                t.key && r.set(t.key, { id: t.key, name: t.key, count: t.doc_count });
            });
            const o = /* @__PURE__ */ new Map();
            Array.isArray(e.categories) && e.categories.forEach((t) => {
                t.key && o.set(t.key, { id: t.key, name: t.key, count: t.doc_count });
            });
            const s = /* @__PURE__ */ new Set();
            typeof ((c = e.min_price) == null ? void 0 : c.value) == "number" && s.add(e.min_price.value), typeof ((u = e.max_price) == null ? void 0 : u.value) == "number" && s.add(e.max_price.value);
            const i = {};
            Array.isArray(e.attributes) && e.attributes.forEach((t) => {
                !t.key || !t.values || !Array.isArray(t.values.buckets) || (i[t.key] || (i[t.key] = /* @__PURE__ */ new Set()), t.values.buckets.forEach((a) => {
                    a.key && i[t.key].add({ key: a.key, count: a.doc_count });
                }));
            }), this.allBrands = Array.from(r.values()), this.allCategories = Array.from(o.values()), this.allPrices = Array.from(s), this.allFilters = Object.keys(i).reduce((t, a) => (t[a] = Array.from(i[a]), t), {});
        }
    }
};
var F = function () {
    var s;
    var r = this, o = r._self._c;
    return ((s = r.allBrands) == null ? void 0 : s.length) || !r.shouldUseNewSearchStrategy ? o("div", { staticClass: "filters-wrapper" }, [r.shouldShowFilters ? o("div", { staticClass: "filters" }, [o("div", [r.showCategories ? o("FilterCategory", { attrs: { "show-checkbox": r.showCategoryCheckbox, "active-category": r.activeCategory, "all-categories": r.allCategories } }) : r._e(), r.showPrice ? o("FilterPrice", { attrs: { "all-prices": r.allPrices } }) : r._e(), r.showBrand ? o("FilterBrand", { attrs: { "all-brands": r.allBrands } }) : r._e(), o("FilterCustom", { attrs: { "search-filters": r.allFilters } }), r.showPromotions ? o("FilterPromotion", { attrs: { "active-promotion": r.activePromotion } }) : r._e(), o("button", { staticClass: "btn btn-secundary mobile -block", on: { click: r.closeMobileFilters } }, [r._v(" VER PRODUTOS ")])], 1)]) : o("Loader", { attrs: { width: 100, height: 900, margin: 32 } })], 1) : r._e();
}, S = [], P = /* @__PURE__ */ C(
    k,
    F,
    S,
    !1,
    null,
    null,
    null,
    null
);
const B = P.exports;
function f(e) {
    f.installed || (f.installed = !0, e.component("Filters", B));
}
const g = {
    install: f
};
let d = null;
typeof window < "u" ? d = window.Vue : typeof global < "u" && (d = global.Vue);
d && d.use(g);
export {
    B as default
};
