import u from "https://s3.amazonaws.com/codigo-aberto-sandbox-assets/rocket/assets/rocket-preview/vendor/lodash.js";
import { mapGetters as m } from "https://s3.amazonaws.com/codigo-aberto-sandbox-assets/rocket/assets/rocket-preview/vendor/vuex.js";
import p from "https://s3.amazonaws.com/codigo-aberto-sandbox-assets/rocket/assets/rocket-preview/vendor/modules/axios/rocket.js";
import h from "https://s3.amazonaws.com/codigo-aberto-sandbox-assets/rocket/assets/rocket-preview/vendor/modules/axios/api.js";
import g from "https://s3.amazonaws.com/codigo-aberto-sandbox-assets/rocket/assets/rocket-preview/vendor/mixins/queryParams.js";
import f from "https://s3.amazonaws.com/codigo-aberto-sandbox-assets/rocket/assets/rocket-preview/vendor/mixins/mobile.js";
function y(e, t, i, a, o, s, n, d) {
  var r = typeof e == "function" ? e.options : e;
  return t && (r.render = t, r.staticRenderFns = i, r._compiled = !0), {
    exports: e,
    options: r
  };
}
const C = {
  name: "CategoryContent",
  mixins: [
    g,
    f
  ],
  props: {
    productsPerPage: {
      type: [Number, String],
      default: 10
    }
  },
  data: () => ({
    loading: !1,
    newHtml: "",
    isMosaic: !0,
    paginate: {
      loading: !1,
      pageCount: 7,
      currentPage: 1
    }
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
    ...m("merchant", [
      "merchant"
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
    this.setGridType(), await this.bootQueryParams(), this.paginate.currentPage = this.queryParams.page || 1, await this.loadCountPaginate(), this.$store.subscribe(({ type: e }) => {
      e === "queryParams/EVENT_URL_UPDATED" && (this.updateFilters(), this.loadCountPaginate());
    }), this.displayMosaicGrid();
  },
  methods: {
    updateFilters: u.debounce(async function() {
      this.loading = !0;
      const { queryParams: e } = this;
      e.resultsOnly = !0, this.paginate.currentPage !== this.queryParams.page && (this.paginate.currentPage = this.queryParams.page || 1);
      try {
        const t = this.$applyQueriesToUrl(window.location.pathname, e), { data: i } = await p.get(t);
        this.newHtml = `<div>${i}</div>`, this.scrollToTop();
      } catch (t) {
        console.error(t);
      } finally {
        this.loading = !1;
      }
      this.displayMosaicGrid();
    }),
    displayMosaicGrid() {
      this.$nextTick(() => {
        if (!this.isMobile || !this.isMosaic)
          return;
        const e = this.getResultsElement(), t = e.getElementsByClassName("products-list")[0], i = Array.from(e.getElementsByClassName("box-product"));
        if (!t)
          return;
        const a = document.createElement("div"), o = document.createElement("div");
        a.classList.add("mosaic-column"), o.classList.add("mosaic-column");
        for (let s = 0; s < i.length; s++) {
          const n = i[s], d = s % 2 === 0 ? a : o;
          n && (d.appendChild(n), n.setAttribute("order", s));
        }
        t.append(a), t.append(o), this.newHtml && (this.newHtml = e.innerHTML);
      });
    },
    displayListGrid() {
      this.$nextTick(() => {
        const e = this.getResultsElement(), t = e.getElementsByClassName("products-list")[0], i = e.getElementsByClassName("box-product").length, a = () => e.querySelector(".mosaic-column");
        for (let s = 0; s < i; s++) {
          const n = e.querySelector(`.box-product[order="${s}"]`);
          n && t.append(n);
        }
        let o = a();
        for (; o; )
          o.remove(), o = a();
        this.newHtml = e.innerHTML;
      });
    },
    getResultsElement() {
      let e = document;
      return this.newHtml && (e = document.createElement("div"), e.innerHTML = this.newHtml), e;
    },
    handleGridCookie() {
      const e = this.getCookieName(), t = /* @__PURE__ */ new Date(), i = new Date(t.setMonth(t.getMonth() + 1)), a = this.isMosaic ? "mosaic" : "list";
      document.cookie = `${e}=${a}; expires=${i}`;
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
      this.paginate.loading = !0;
      const { queryParams: e } = this;
      e.limit = this.productsPerPage;
      try {
        const t = this.$applyQueriesToUrl("search/products/count", e), { data: i } = await h.get(t);
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
        this.removeQueryParams("page");
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
var P = function() {
  var t = this, i = t._self._c;
  return i("div", { ref: "content", class: { "grid-list": !t.isMosaic } }, [t.loading ? i("div", { staticClass: "over-background -loader" }, [i("i", { staticClass: "icon icon-general-loader" })]) : t._e(), t._t("default", null, { isMosaic: t.isMosaic, isMobile: t.isMobile, newHtml: t.newHtml, updateFilters: t.updateFilters, updateOrderBy: t.updateOrderBy, updateCurrentPage: t.updateCurrentPage, updateGrid: t.updateGrid, selectedOrder: t.selectedOrder, paginate: t.paginate }), i("AddToCart")], 2);
}, M = [], _ = /* @__PURE__ */ y(
  C,
  P,
  M
);
const w = _.exports;
function c(e) {
  c.installed || (c.installed = !0, e.component("CategoryContent", w));
}
const b = {
  install: c
};
let l = null;
typeof window < "u" ? l = window.Vue : typeof global < "u" && (l = global.Vue);
l && l.use(b);
export {
  w as default
};
