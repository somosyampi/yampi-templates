import l from "http://rocket.test/dist/vendor/lodash.js";
import { mapGetters as d } from "http://rocket.test/dist/vendor/vuex.js";
import c from "http://rocket.test/dist/vendor/modules/axios/api.js";
import u from "http://rocket.test/dist/vendor/modules/axios/rocket.js";
import p from "http://rocket.test/dist/vendor/mixins/mobile.js";
function g(a, t, e, s, o, y, C, V) {
  var i = typeof a == "function" ? a.options : a;
  return t && (i.render = t, i.staticRenderFns = e, i._compiled = !0), {
    exports: a,
    options: i
  };
}
const m = {
  name: "TopRatings",
  mixins: [
    p
  ],
  props: {
    title: {
      type: String,
      required: !0
    },
    ratingId: {
      type: Array,
      required: !0
    },
    totalRatings: {
      type: Number,
      required: !0,
      validator: (a) => a > 0
    },
    carousel: {
      type: Boolean,
      default: !0
    }
  },
  data: () => ({
    loading: !0,
    ready: !0,
    ratings: []
  }),
  computed: {
    ...d("preview", ["isPreview", "isEditing"]),
    ratingsPerPage() {
      return this.isMobile ? 1 : 4;
    },
    carouselOptions() {
      return {
        gap: 19,
        perPage: 4,
        pagination: !0,
        arrows: !0,
        breakpoints: {
          700: {
            gap: 16,
            perPage: 1,
            pagination: !0,
            arrows: !1
          }
        }
      };
    }
  },
  watch: {
    isMobile() {
      this.carousel && (this.ready = !1, this.$nextTick(() => {
        this.ready = !0;
      }));
    }
  },
  mounted() {
    this.loadRating();
  },
  methods: {
    times: l.times,
    tagOrDiv(a) {
      return this.carousel ? a : "div";
    },
    async loadRating() {
      this.loading = !0;
      try {
        if (!this.ratingId.length && (this.isPreview || this.isEditing)) {
          await this.loadPlaceholders();
          return;
        }
        if (!this.ratingId.length)
          return;
        const a = this.ratingId.slice(0, this.totalRatings);
        if (!a.length)
          return;
        const t = this.$applyQueriesToUrl("catalog/reviews", {
          id: a,
          include: "product",
          filterBy: "id"
        }), { data: e } = await c.get(t);
        this.ratings = e.data, this.loading = !1;
      } catch {
        console.error(`Ops! Algo deu errado durante o carregamento das avaliações.
                 Por favor, tente novamente mais tarde.`);
      }
    },
    async loadPlaceholders() {
      this.loading = !0;
      try {
        const { data: a } = await u.get("/placeholders/reviews-home");
        this.ratings = a.data.slice(0, this.totalRatings), this.loading = !1;
      } catch {
        console.error(`Ops! Algo deu errado durante o carregamento das avaliações.
                 Por favor, tente novamente mais tarde.`);
      }
    }
  }
};
var h = function() {
  var t = this, e = t._self._c;
  return t.ratings.length > 0 && t.ready ? e("section", [e("div", { staticClass: "container top-ratings-holder" }, [e("div", { staticClass: "flex -between" }, [e("div", { staticClass: "holder-left flex -vcenter" }, [e("div", { staticClass: "theme-title top-ratings-name" }, [t._v(" " + t._s(t.title) + " ")])])]), e("div", { staticClass: "ratings-list -carousel", class: { "-loading": t.loading } }, [t.ready ? e(t.tagOrDiv("splide"), { tag: "component", class: {
    "flex -wrap": !t.carousel,
    "single-per-line": t.isMobile === 1,
    "-no-pagination": t.carousel && t.ratings.length <= t.ratingsPerPage
  }, attrs: { options: t.carousel ? t.carouselOptions : null, slides: t.carousel ? t.ratings : null } }, t._l(t.ratings, function(s) {
    return e(t.tagOrDiv("splide-slide"), { key: s.id, tag: "component", class: { "box-rating-wrapper": !t.carousel } }, [e("div", { staticClass: "holder-review" }, [e("div", { staticClass: "review-content" }, [e("div", { staticClass: "-plr10" }, [e("div", { staticClass: "-rating" }, t._l(t.times(5), function(o) {
      return e("i", { key: o, staticClass: "icon", class: `icon-star-${o < s.rating ? "gold" : "grey"}` });
    }), 0), e("span", { staticClass: "-client", domProps: { textContent: t._s(s.name) } }), e("div", { staticClass: "-message" }, [e("ReadMore", { attrs: { "max-lines": 4, "read-more": "+ Ver mais", "read-less": "- Ver menos" } }, [t._v(" " + t._s(s.message) + " ")])], 1)]), e("div", { staticClass: "-product" }, [e("a", { staticClass: "-product-link", attrs: { href: s.product.data.url } }, [s.product.data.images.data[0] ? e("custom-image", { staticClass: "-product-image", attrs: { src: s.product.data.images.data[0].url, alt: s.product.data.name, thumbor: { resize: "35x35" }, width: "35", height: "35" } }) : t._e(), e("div", [e("p", { staticClass: "-product-title ellipsis-multiline l1" }, [t._v(" " + t._s(s.product.data.name) + " ")]), e("span", { staticClass: "redirect" }, [t._v("Ver produto")]), e("svg", { attrs: { width: "11", height: "10", viewBox: "0 0 11 10" } }, [e("path", { attrs: { d: "M10.061 3.22917V0H6.60252V0.9375H8.48895L4.29687 5.10417L5.03049 5.72917L9.11776 1.66667V3.22917H10.061Z" } }), e("path", { attrs: { d: "M4.92569 0.9375V0H0V10H10.061V5H9.11776V9.0625H0.943216V0.9375H4.92569Z" } })])])], 1)])])])]);
  }), 1) : t._e()], 1)])]) : t._e();
}, f = [], v = /* @__PURE__ */ g(
  m,
  h,
  f
);
const _ = v.exports;
function n(a) {
  n.installed || (n.installed = !0, a.component("TopRatings", _));
}
const w = {
  install: n
};
let r = null;
typeof window < "u" ? r = window.Vue : typeof global < "u" && (r = global.Vue);
r && r.use(w);
export {
  _ as default
};
