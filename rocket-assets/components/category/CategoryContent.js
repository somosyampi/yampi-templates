import p from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/lodash.js";
import { mapGetters as f } from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/vuex.js";
import P from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/modules/axios/rocket.js";
import C from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/modules/axios/api.js";
import w from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/mixins/queryParams.js";
import v from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/mixins/mobile.js";
import M from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/modules/axios/search.js";
import q from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/mixins/cache.js";
import b from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/mixins/tracking/api.js";
function S(e, t, s, o, a, i, n, u) {
  var r = typeof e == "function" ? e.options : e;
  t && (r.render = t, r.staticRenderFns = s, r._compiled = !0), o && (r.functional = !0), i && (r._scopeId = "data-v-" + i);
  var d;
  if (n ? (d = function(l) {
    l = l || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !l && typeof __VUE_SSR_CONTEXT__ < "u" && (l = __VUE_SSR_CONTEXT__), a && a.call(this, l), l && l._registeredComponents && l._registeredComponents.add(n);
  }, r._ssrRegister = d) : a && (d = u ? function() {
    a.call(
      this,
      (r.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : a), d)
    if (r.functional) {
      r._injectStyles = d;
      var y = r.render;
      r.render = function(_, g) {
        return d.call(g), y(_, g);
      };
    } else {
      var m = r.beforeCreate;
      r.beforeCreate = m ? [].concat(m, d) : [d];
    }
  return {
    exports: e,
    options: r
  };
}
const k = {
  name: "CategoryContent",
  mixins: [
    w,
    v,
    b,
    q
  ],
  props: {
    productsPerPage: {
      type: [Number, String],
      default: 10
    }
  },
  data: () => ({
    loading: !0,
    newHtml: "",
    isMosaic: !0,
    paginate: {
      loading: !1,
      pageCount: 7,
      currentPage: 1
    },
    searchData: [],
    firstLoadFinished: !1
  }),
  computed: {
    selectedOrder() {
      return [
        "relevance",
        "best_sellers",
        "highest_price",
        "lowest_price",
        "newest",
        "rating",
        "name_asc",
        "name_desc"
      ].includes(this.queryParams.sort_by) ? this.queryParams.sort_by : "relevance";
    },
    ...f("merchant", [
      "merchant"
    ]),
    ...f("filters", [
      "activeFilters"
    ])
  },
  watch: {
    isMosaic() {
      return this.handleGridCookie(), this.isMosaic ? this.displayMosaicGrid() : this.displayListGrid();
    },
    isMobile() {
      return this.isMobile && this.isMosaic ? this.displayMosaicGrid() : this.displayListGrid();
    }
  },
  async mounted() {
    this.loading = !0;
    try {
      this.setGridType(), await this.bootQueryParams(), this.paginate.currentPage = this.queryParams.page || 1, await this.loadCountPaginate(), this.$store.subscribe(({ type: e }) => {
        e === "queryParams/EVENT_URL_UPDATED" && (!this.firstLoadFinished || (this.updateFilters(), this.loadCountPaginate()));
      }), this.displayMosaicGrid();
    } catch (e) {
      console.error(e);
    } finally {
      document.readyState === "complete" ? this.firstLoad() : window.addEventListener("load", this.firstLoad);
    }
  },
  destroyed() {
    window.removeEventListener("load", this.firstLoad);
  },
  methods: {
    searchTrackings() {
      if (!this.shouldUseNewSearchStrategy)
        return;
      const e = this.getLocalStorageCache({
        itemId: this.queryParams.q,
        itemAlias: "search_query"
      });
      !this.firstLoadFinished && !!(e != null && e.q) && (this.handleTrackApi("store-search-returned", {
        "store-search-returned": !!this.searchData.length
      }), this.removeLocalStorageCache({
        itemId: this.queryParams.q,
        itemAlias: "search_query"
      }));
    },
    async firstLoad() {
      if (!this.shouldUseNewSearchStrategy) {
        this.firstLoadFinished = !0, this.loading = !1;
        return;
      }
      this.loading = !0, await this.loadProductsStrategy(), this.searchTrackings(), this.firstLoadFinished = !0, this.loading = !1;
    },
    async loadProductsStrategy() {
      var t;
      if (this.shouldUseNewSearchStrategy) {
        const { builderSearch: s } = await import("https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/modules/search/searchHelpers.js"), o = new URLSearchParams(window.location.search), a = Array.from(o.keys()).filter((n) => n !== "q");
        this.queryParams.q = o.get("q") || "", this.queryParams.limit = this.productsPerPage, this.queryParams.include = "skus,url_path,image_url,tags,brand,name,slug,id,rating,attributes,categories,price";
        const i = await s.execute(
          M,
          this.queryParams
        );
        if (this.paginate.pageCount = ((t = i == null ? void 0 : i.data) == null ? void 0 : t.last_page) || 1, this.searchData = i == null ? void 0 : i.data.data, a.length)
          return;
        this.setLocalStorageCache({
          itemId: this.queryParams.q,
          itemAlias: "search_aggs",
          data: {
            aggs: i == null ? void 0 : i.aggs
          }
        });
        return;
      }
      const { urlSearch: e } = await import("https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/modules/search/searchHelpers.js");
      this.newHtml = await e.execute(P, this.queryParams);
    },
    updateFilters: p.debounce(async function() {
      this.loading = !0;
      const { queryParams: e } = this;
      e.resultsOnly = !0, this.paginate.currentPage !== this.queryParams.page && (this.paginate.currentPage = this.queryParams.page || 1);
      try {
        await this.loadProductsStrategy(), this.scrollToTop();
      } catch (t) {
        console.error(t);
      } finally {
        this.loading = !1;
      }
      this.displayMosaicGrid();
    }),
    displayMosaicGrid() {
      this.shouldUseNewSearchStrategy || this.$nextTick(() => {
        if (!this.isMobile || !this.isMosaic)
          return;
        const e = this.getResultsElement(), t = e.getElementsByClassName("products-list")[0], s = Array.from(e.getElementsByClassName("box-product"));
        if (!t)
          return;
        const o = document.createElement("div"), a = document.createElement("div");
        o.classList.add("mosaic-column"), a.classList.add("mosaic-column");
        for (let i = 0; i < s.length; i++) {
          const n = s[i], u = i % 2 === 0 ? o : a;
          n && (u.appendChild(n), n.setAttribute("order", i));
        }
        t.append(o), t.append(a), this.newHtml && (this.newHtml = e.innerHTML);
      });
    },
    displayListGrid() {
      this.shouldUseNewSearchStrategy || this.$nextTick(() => {
        const e = this.getResultsElement(), t = e.getElementsByClassName("products-list")[0], s = e.getElementsByClassName("box-product").length, o = () => e.querySelector(".mosaic-column");
        for (let i = 0; i < s; i++) {
          const n = e.querySelector(`.box-product[order="${i}"]`);
          n && t.append(n);
        }
        let a = o();
        for (; a; )
          a.remove(), a = o();
        this.newHtml = e.innerHTML;
      });
    },
    getResultsElement() {
      let e = document;
      return this.newHtml && (e = document.createElement("div"), e.innerHTML = this.newHtml), e;
    },
    handleGridCookie() {
      const e = this.getCookieName(), t = new Date(), s = new Date(t.setMonth(t.getMonth() + 1)), o = this.isMosaic ? "mosaic" : "list";
      document.cookie = `${e}=${o}; expires=${s}`;
    },
    getGridCookie() {
      const e = this.getCookieName(), s = `; ${document.cookie}`.split(`; ${e}=`);
      return s.length === 2 ? s.pop().split(";").shift() : (this.handleGridCookie(), null);
    },
    getCookieName() {
      return `grid_${this.merchant.alias}`;
    },
    setGridType() {
      const e = this.getGridCookie();
      e && (this.isMosaic = e === "mosaic");
    },
    async loadCountPaginate() {
      if (this.shouldUseNewSearchStrategy)
        return;
      this.paginate.loading = !0;
      const { queryParams: e } = this;
      e.limit = this.productsPerPage;
      try {
        const t = this.$applyQueriesToUrl("search/products/count", e), { data: s } = await C.get(t);
        this.paginate.pageCount = p.get(s, "data.total_pages", 1);
      } catch (t) {
        console.error(t);
      } finally {
        this.paginate.loading = !1;
      }
    },
    updateOrderBy(e) {
      this.setQueryParams({
        sort_by: e
      });
    },
    updateGrid() {
      this.isMosaic = !this.isMosaic;
    },
    updateCurrentPage(e) {
      if (this.paginate.currentPage = e, this.paginate.currentPage === 1) {
        this.removeQueryParams({ key: "page" });
        return;
      }
      this.setQueryParams({
        page: this.paginate.currentPage
      });
    },
    async scrollToTop() {
      await this.$nextTick(), this.$refs.content.scrollIntoView({ behavior: "smooth" });
    }
  }
};
var L = function() {
  var t = this, s = t._self._c;
  return s("div", { ref: "content", class: { "grid-list": !t.isMosaic } }, [t.loading && t.firstLoadFinished ? s("div", { staticClass: "over-background -loader" }, [s("i", { staticClass: "icon icon-general-loader" })]) : t._e(), t._t("default", null, { isMosaic: t.isMosaic, isMobile: t.isMobile, newHtml: t.newHtml, updateFilters: t.updateFilters, updateOrderBy: t.updateOrderBy, updateCurrentPage: t.updateCurrentPage, updateGrid: t.updateGrid, selectedOrder: t.selectedOrder, paginate: t.paginate, searchData: t.searchData, loading: t.loading, queryParams: t.queryParams }), s("AddToCart")], 2);
}, T = [], G = /* @__PURE__ */ S(
  k,
  L,
  T,
  !1,
  null,
  null,
  null,
  null
);
const $ = G.exports;
function h(e) {
  h.installed || (h.installed = !0, e.component("CategoryContent", $));
}
const N = {
  install: h
};
let c = null;
typeof window < "u" ? c = window.Vue : typeof global < "u" && (c = global.Vue);
c && c.use(N);
export {
  $ as default
};
