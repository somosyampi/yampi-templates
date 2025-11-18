import { mapActions as _ } from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/vuex.js";
import b from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/mixins/queryParams.js";
import w from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/mixins/cache.js";
import v from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/modules/axios/search.js";
function g(e, r, t, i, o, c, u, a) {
  var s = typeof e == "function" ? e.options : e;
  r && (s.render = r, s.staticRenderFns = t, s._compiled = !0), i && (s.functional = !0), c && (s._scopeId = "data-v-" + c);
  var l;
  if (u ? (l = function(n) {
    n = n || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !n && typeof __VUE_SSR_CONTEXT__ < "u" && (n = __VUE_SSR_CONTEXT__), o && o.call(this, n), n && n._registeredComponents && n._registeredComponents.add(u);
  }, s._ssrRegister = l) : o && (l = a ? function() {
    o.call(
      this,
      (s.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : o), l)
    if (s.functional) {
      s._injectStyles = l;
      var y = s.render;
      s.render = function(p, m) {
        return l.call(m), y(p, m);
      };
    } else {
      var h = s.beforeCreate;
      s.beforeCreate = h ? [].concat(h, l) : [l];
    }
  return {
    exports: e,
    options: s
  };
}
const C = {
  name: "Filters",
  mixins: [
    b,
    w
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
    const e = this.getLocalStorageCache({
      itemId: this.queryParams.q,
      itemAlias: "search_aggs"
    }), r = new URLSearchParams(window.location.search);
    if (this.syncUrlParamsWithActiveFilters(r), e && e.aggs) {
      this.parseAggs({ elasticAggregations: e.aggs });
      return;
    }
    const { builderSearch: t } = await import("https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/modules/search/searchHelpers.js"), i = await t.execute(
      v,
      {
        q: r.get("q")
      }
    );
    this.setLocalStorageCache({
      itemId: this.queryParams.q,
      itemAlias: "search_aggs",
      data: {
        aggs: i == null ? void 0 : i.aggs
      }
    }), this.parseAggs({ elasticAggregations: i.aggs });
  },
  methods: {
    ..._("filters", [
      "bootQueryParams"
    ]),
    syncUrlParamsWithActiveFilters(e) {
      if (e.has("max") || e.has("min")) {
        const t = e.has("max") ? Number(e.get("max")).toLocaleString(void 0, { style: "currency", currency: "BRL" }) : Number(this.allPrices[1]).toLocaleString(void 0, { style: "currency", currency: "BRL" }), i = e.has("min") ? Number(e.get("min")).toLocaleString(void 0, { style: "currency", currency: "BRL" }) : Number("0").toLocaleString(void 0, { style: "currency", currency: "BRL" });
        this.addActiveFilter({
          alias: "price",
          id: this.$randomString(),
          key: "price",
          name: `${i} - ${t}`,
          query: {
            min: i,
            max: t
          }
        });
      }
      const r = ["q", "min", "max", "attributes"];
      e.forEach((t, i) => {
        if (r.includes(i))
          return;
        const o = i.replace(/\[\]/g, "");
        this.addActiveFilter({
          alias: `${o}-${t}`,
          id: t,
          key: o,
          name: t,
          query: {
            [o]: t
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
      e.brands && Array.isArray(e.brands.buckets) && e.brands.buckets.forEach((a) => {
        a.key && r.set(a.key, { id: a.key, name: a.key, count: a.doc_count });
      });
      const t = /* @__PURE__ */ new Map();
      Array.isArray(e.categories) && e.categories.forEach((a) => {
        a.key && t.set(a.key, { id: a.key, name: a.key, count: a.doc_count });
      });
      const i = /* @__PURE__ */ new Set();
      typeof ((c = e.min_price) == null ? void 0 : c.value) == "number" && i.add(e.min_price.value), typeof ((u = e.max_price) == null ? void 0 : u.value) == "number" && i.add(e.max_price.value);
      const o = {};
      Array.isArray(e.attributes) && e.attributes.forEach((a) => {
        !a.key || !a.values || !Array.isArray(a.values.buckets) || (o[a.key] || (o[a.key] = /* @__PURE__ */ new Set()), a.values.buckets.forEach((s) => {
          s.key && o[a.key].add({ key: s.key, count: s.doc_count });
        }));
      }), this.allBrands = Array.from(r.values()), this.allCategories = Array.from(t.values()), this.allPrices = Array.from(i), this.allFilters = Object.keys(o).reduce((a, s) => (a[s] = Array.from(o[s]), a), {});
    }
  }
};
var k = function() {
  var i;
  var r = this, t = r._self._c;
  return ((i = r.allBrands) == null ? void 0 : i.length) || !r.shouldUseNewSearchStrategy ? t("div", { staticClass: "filters-wrapper" }, [r.shouldShowFilters ? t("div", { staticClass: "filters" }, [t("div", [r.showCategories ? t("FilterCategory", { attrs: { "show-checkbox": r.showCategoryCheckbox, "active-category": r.activeCategory, "all-categories": r.allCategories } }) : r._e(), r.showPrice ? t("FilterPrice", { attrs: { "all-prices": r.allPrices } }) : r._e(), r.showBrand ? t("FilterBrand", { attrs: { "all-brands": r.allBrands } }) : r._e(), t("FilterCustom", { attrs: { "search-filters": r.allFilters } }), r.showPromotions ? t("FilterPromotion", { attrs: { "active-promotion": r.activePromotion } }) : r._e(), t("button", { staticClass: "btn btn-secundary mobile -block", on: { click: r.closeMobileFilters } }, [r._v(" VER PRODUTOS ")])], 1)]) : t("Loader", { attrs: { width: 100, height: 900, margin: 32 } })], 1) : r._e();
}, F = [], S = /* @__PURE__ */ g(
  C,
  k,
  F,
  !1,
  null,
  null,
  null,
  null
);
const P = S.exports;
function f(e) {
  f.installed || (f.installed = !0, e.component("Filters", P));
}
const B = {
  install: f
};
let d = null;
typeof window < "u" ? d = window.Vue : typeof global < "u" && (d = global.Vue);
d && d.use(B);
export {
  P as default
};
