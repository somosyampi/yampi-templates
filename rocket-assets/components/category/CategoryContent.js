import g from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/lodash.js";
import { mapGetters as _ } from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/vuex.js";
import C from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/modules/axios/rocket.js";
import P from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/modules/axios/api.js";
import M from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/mixins/queryParams.js";
import v from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/mixins/mobile.js";
function w(e, t, i, o, a, n, r, u) {
  var s = typeof e == "function" ? e.options : e;
  t && (s.render = t, s.staticRenderFns = i, s._compiled = !0), o && (s.functional = !0), n && (s._scopeId = "data-v-" + n);
  var c;
  if (r ? (c = function(l) {
    l = l || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !l && typeof __VUE_SSR_CONTEXT__ < "u" && (l = __VUE_SSR_CONTEXT__), a && a.call(this, l), l && l._registeredComponents && l._registeredComponents.add(r);
  }, s._ssrRegister = c) : a && (c = u ? function() {
    a.call(
      this,
      (s.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : a), c)
    if (s.functional) {
      s._injectStyles = c;
      var f = s.render;
      s.render = function(y, m) {
        return c.call(m), f(y, m);
      };
    } else {
      var h = s.beforeCreate;
      s.beforeCreate = h ? [].concat(h, c) : [c];
    }
  return {
    exports: e,
    options: s
  };
}
const b = {
  name: "CategoryContent",
  mixins: [
    M,
    v
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
    ..._("merchant", [
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
    updateFilters: g.debounce(async function() {
      this.loading = !0;
      const { queryParams: e } = this;
      e.resultsOnly = !0, this.paginate.currentPage !== this.queryParams.page && (this.paginate.currentPage = this.queryParams.page || 1);
      try {
        const t = this.$applyQueriesToUrl(window.location.pathname, e), { data: i } = await C.get(t);
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
        const o = document.createElement("div"), a = document.createElement("div");
        o.classList.add("mosaic-column"), a.classList.add("mosaic-column");
        for (let n = 0; n < i.length; n++) {
          const r = i[n], u = n % 2 === 0 ? o : a;
          r && (u.appendChild(r), r.setAttribute("order", n));
        }
        t.append(o), t.append(a), this.newHtml && (this.newHtml = e.innerHTML);
      });
    },
    displayListGrid() {
      this.$nextTick(() => {
        const e = this.getResultsElement(), t = e.getElementsByClassName("products-list")[0], i = e.getElementsByClassName("box-product").length, o = () => e.querySelector(".mosaic-column");
        for (let n = 0; n < i; n++) {
          const r = e.querySelector(`.box-product[order="${n}"]`);
          r && t.append(r);
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
      const e = this.getCookieName(), t = new Date(), i = new Date(t.setMonth(t.getMonth() + 1)), o = this.isMosaic ? "mosaic" : "list";
      document.cookie = `${e}=${o}; expires=${i}`;
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
        const t = this.$applyQueriesToUrl("search/products/count", e), { data: i } = await P.get(t);
        this.paginate.pageCount = g.get(i, "data.total_pages", 1);
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
var G = function() {
  var t = this, i = t._self._c;
  return i("div", { ref: "content", class: { "grid-list": !t.isMosaic } }, [t.loading ? i("div", { staticClass: "over-background -loader" }, [i("i", { staticClass: "icon icon-general-loader" })]) : t._e(), t._t("default", null, { isMosaic: t.isMosaic, isMobile: t.isMobile, newHtml: t.newHtml, updateFilters: t.updateFilters, updateOrderBy: t.updateOrderBy, updateCurrentPage: t.updateCurrentPage, updateGrid: t.updateGrid, selectedOrder: t.selectedOrder, paginate: t.paginate }), i("AddToCart")], 2);
}, T = [], $ = /* @__PURE__ */ w(
  b,
  G,
  T,
  !1,
  null,
  null,
  null,
  null
);
const k = $.exports;
function p(e) {
  p.installed || (p.installed = !0, e.component("CategoryContent", k));
}
const E = {
  install: p
};
let d = null;
typeof window < "u" ? d = window.Vue : typeof global < "u" && (d = global.Vue);
d && d.use(E);
export {
  k as default
};
