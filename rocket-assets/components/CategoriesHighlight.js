import { mapGetters as l } from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/vuex.js";
import n from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/mixins/mobile.js";
import h from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/modules/axios/rocket.js";
import d from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/modules/axios/api.js";
function u(t, e, i, s, v, w, y, C) {
  var r = typeof t == "function" ? t.options : t;
  return e && (r.render = e, r.staticRenderFns = i, r._compiled = !0), {
    exports: t,
    options: r
  };
}
const c = {
  name: "CategoriesHighlight",
  mixins: [
    n
  ],
  props: {
    showCategoriesNames: {
      type: Boolean,
      default: !0
    },
    highlightedCategory: {
      type: String,
      default: "[]"
    },
    title: {
      type: String,
      default: ""
    },
    mobileLayout: {
      type: String,
      default: "carousel"
    }
  },
  data() {
    return {
      categories: [],
      loading: !0,
      showAll: !1,
      screenWidth: window.innerWidth
    };
  },
  computed: {
    ...l("preview", ["isPreview"]),
    highlightedCategoriesIds() {
      try {
        return JSON.parse(this.highlightedCategory);
      } catch {
        return [];
      }
    },
    sectionTitle() {
      try {
        return this.title || (this.isPreview ? "Categorias" : null);
      } catch {
        return null;
      }
    },
    showCaroussel() {
      return this.mobileLayout === "carousel";
    },
    carousselOptions() {
      return {
        perPage: 7,
        arrows: !this.isMobile,
        pagination: !0,
        gap: 20,
        fixedWidth: "149px",
        breakpoints: {
          700: {
            perPage: 2,
            fixedWidth: "160px"
          },
          900: {
            perPage: 3,
            fixedWidth: "300px"
          },
          1e3: {
            perPage: 4,
            fixedWidth: "230px"
          },
          1220: {
            perPage: 5
          }
        }
      };
    },
    useVueSplide() {
      return {
        [!1]: (e) => e > 7,
        [!0]: (e) => e > 2 ? this.showCaroussel : !1
      }[this.isMobile](this.categories.length);
    },
    filterAmountCategories() {
      return this.useVueSplide || !this.isMobile ? this.categories : this.showAll ? this.categories : this.categories.slice(0, 6);
    },
    showLoadMoreItems() {
      return !this.useVueSplide && this.isMobile && this.categories.length > 6 && !this.showAll;
    }
  },
  watch: {
    highlightedCategoriesIds: {
      async handler(t) {
        if (!(t != null && t.length)) {
          this.categories = await this.loadPlaceholders();
          return;
        }
        this.categories = await this.loadCategories(t);
      },
      immediate: !0
    }
  },
  mounted() {
    window.addEventListener("resize", () => {
      this.screenWidth = window.innerWidth;
    });
  },
  methods: {
    getItemCover(t) {
      return t || (!t && this.isPreview ? "http://cdn.yampi.io/rocket/helpers/placeholders/banner-3.png" : null);
    },
    tagOrDiv(t) {
      return this.useVueSplide ? t : "div";
    },
    async loadCategories(t) {
      try {
        this.loading = !0;
        const { data: e } = await d.get("/catalog/categories", {
          params: {
            id: t
          }
        });
        return !e.data.length && this.isPreview ? this.loadPlaceholders() : e.data;
      } finally {
        this.loading = !1;
      }
    },
    async loadPlaceholders() {
      if (!this.isPreview)
        return [];
      try {
        this.loading = !0;
        const { data: t } = await h({
          method: "get",
          url: "/placeholders/highlighted-categories"
        });
        return t.data;
      } finally {
        this.loading = !1;
      }
    }
  }
};
var g = function() {
  var e = this, i = e._self._c;
  return !e.loading && e.categories.length ? i("div", { key: e.screenWidth, staticClass: "container c-highlight-container" }, [e.sectionTitle ? i("div", { staticClass: "c-highlight-header" }, [i("div", { staticClass: "theme-title c-highlight-header__title", class: {
    "--full-width": !e.useVueSplide,
    "--mobile": e.isMobile
  } }, [e._v(" " + e._s(e.sectionTitle) + " ")])]) : e._e(), i("div", { staticClass: "c-highlight-content" }, [e.categories ? i(e.tagOrDiv("splide"), { ref: "CarousselRef", tag: "component", class: {
    "--grid": !e.showCaroussel && e.isMobile,
    "--center": !e.isMobile
  }, attrs: { options: e.useVueSplide ? e.carousselOptions : null, slides: e.useVueSplide ? e.categories : null } }, e._l(e.filterAmountCategories, function(s) {
    return i(e.tagOrDiv("splide-slide"), { key: s.id, tag: "component", class: {
      "category-item": !e.useVueSplide
    } }, [s.url_path && s.name ? i("a", { staticClass: "c-highlight-content--slide", attrs: { href: `${e.$baseUrl}${s.url_path}` } }, [i("custom-image", { attrs: { src: e.getItemCover(s.category_cover) } }), e.showCategoriesNames ? i("div", [e._v(e._s(s.name))]) : e._e()], 1) : e._e()]);
  }), 1) : e._e(), e.showLoadMoreItems ? i("div", { staticClass: "load-more", on: { click: function(s) {
    e.showAll = !0;
  } } }, [e._v(" Carregar mais ")]) : e._e()], 1)]) : e._e();
}, p = [], f = /* @__PURE__ */ u(
  c,
  g,
  p
);
const m = f.exports;
function o(t) {
  o.installed || (o.installed = !0, t.component("CategoriesHighlight", m));
}
const _ = {
  install: o
};
let a = null;
typeof window < "u" ? a = window.Vue : typeof global < "u" && (a = global.Vue);
a && a.use(_);
export {
  m as default
};
