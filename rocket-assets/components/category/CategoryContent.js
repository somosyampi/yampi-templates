import u from "https://openstore-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/lodash.js";
import { mapGetters as h } from "https://openstore-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/vuex.js";
import m from "https://openstore-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/modules/axios/rocket.js";
import g from "https://openstore-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/modules/axios/api.js";
import p from "https://openstore-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/mixins/queryParams.js";
import y from "https://openstore-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/mixins/mobile.js";
import f from "https://openstore-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/modules/axios/search.js";
import P from "https://openstore-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/mixins/cache.js";
import w from "https://openstore-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/mixins/tracking/api.js";
import { builderSearch as C, urlSearch as _ } from "https://openstore-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/modules/search/searchHelpers.js";
function M(e, t, i, s, a, r, o, d) {
  var n = typeof e == "function" ? e.options : e;
  return t && (n.render = t, n.staticRenderFns = i, n._compiled = !0), {
    exports: e,
    options: n
  };
}
const q = {
  name: "CategoryContent",
  mixins: [
    p,
    y,
    w,
    P
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
    ...h("merchant", [
      "merchant"
    ]),
    ...h("filters", [
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
        e === "queryParams/EVENT_URL_UPDATED" && this.firstLoadFinished && (this.updateFilters(), this.loadCountPaginate());
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
      !this.firstLoadFinished && (e != null && e.q) && (this.handleTrackApi("store-search-returned", {
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
      var e;
      if (this.shouldUseNewSearchStrategy) {
        const t = new URLSearchParams(window.location.search), i = Array.from(t.keys()).filter((a) => a !== "q");
        this.queryParams.q = t.get("q") || "", this.queryParams.limit = this.productsPerPage, this.queryParams.include = "skus,url_path,image_url,tags,brand,name,slug,id,rating,attributes,categories,price";
        const s = await C.execute(
          f,
          this.queryParams
        );
        if (this.paginate.pageCount = ((e = s == null ? void 0 : s.data) == null ? void 0 : e.last_page) || 1, this.searchData = s == null ? void 0 : s.data.data, i.length)
          return;
        this.setLocalStorageCache({
          itemId: this.queryParams.q,
          itemAlias: "search_aggs",
          data: {
            aggs: s == null ? void 0 : s.aggs
          }
        });
        return;
      }
      this.newHtml = await _.execute(m, this.queryParams);
    },
    updateFilters: u.debounce(async function() {
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
        const e = this.getResultsElement(), t = e.getElementsByClassName("products-list")[0], i = Array.from(e.getElementsByClassName("box-product"));
        if (!t)
          return;
        const s = document.createElement("div"), a = document.createElement("div");
        s.classList.add("mosaic-column"), a.classList.add("mosaic-column");
        for (let r = 0; r < i.length; r++) {
          const o = i[r], d = r % 2 === 0 ? s : a;
          o && (d.appendChild(o), o.setAttribute("order", r));
        }
        t.append(s), t.append(a), this.newHtml && (this.newHtml = e.innerHTML);
      });
    },
    displayListGrid() {
      this.shouldUseNewSearchStrategy || this.$nextTick(() => {
        const e = this.getResultsElement(), t = e.getElementsByClassName("products-list")[0], i = e.getElementsByClassName("box-product").length, s = () => e.querySelector(".mosaic-column");
        for (let r = 0; r < i; r++) {
          const o = e.querySelector(`.box-product[order="${r}"]`);
          o && t.append(o);
        }
        let a = s();
        for (; a; )
          a.remove(), a = s();
        this.newHtml = e.innerHTML;
      });
    },
    getResultsElement() {
      let e = document;
      return this.newHtml && (e = document.createElement("div"), e.innerHTML = this.newHtml), e;
    },
    handleGridCookie() {
      const e = this.getCookieName(), t = /* @__PURE__ */ new Date(), i = new Date(t.setMonth(t.getMonth() + 1)), s = this.isMosaic ? "mosaic" : "list";
      document.cookie = `${e}=${s}; expires=${i}`;
    },
    getGridCookie() {
      const e = this.getCookieName(), i = `; ${document.cookie}`.split(`; ${e}=`);
      return i.length === 2 ? i.pop().split(";").shift() : (this.handleGridCookie(), null);
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
        const t = this.$applyQueriesToUrl("search/products/count", e), { data: i } = await g.get(t);
        this.paginate.pageCount = u.get(i, "data.total_pages", 1);
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
var S = function() {
  var t = this, i = t._self._c;
  return i("div", { ref: "content", class: { "grid-list": !t.isMosaic } }, [t.loading && t.firstLoadFinished ? i("div", { staticClass: "over-background -loader" }, [i("i", { staticClass: "icon icon-general-loader" })]) : t._e(), t._t("default", null, { isMosaic: t.isMosaic, isMobile: t.isMobile, newHtml: t.newHtml, updateFilters: t.updateFilters, updateOrderBy: t.updateOrderBy, updateCurrentPage: t.updateCurrentPage, updateGrid: t.updateGrid, selectedOrder: t.selectedOrder, paginate: t.paginate, searchData: t.searchData, loading: t.loading, queryParams: t.queryParams }), i("AddToCart")], 2);
}, b = [], k = /* @__PURE__ */ M(
  q,
  S,
  b
);
const L = k.exports;
function c(e) {
  c.installed || (c.installed = !0, e.component("CategoryContent", L));
}
const v = {
  install: c
};
let l = null;
typeof window < "u" ? l = window.Vue : typeof global < "u" && (l = global.Vue);
l && l.use(v);
export {
  L as default
};
