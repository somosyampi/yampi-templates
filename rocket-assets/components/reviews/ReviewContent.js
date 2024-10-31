import l from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/lodash.js";
import c from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/modules/axios/api.js";
import u from "s3.amazonaws.com/codigo-aberto-sandbox-assets/rocket/assets/rocket-preview/components/reviews/BaseContent.js";
function v(a, e, t, s, n, d, w, C) {
  var r = typeof a == "function" ? a.options : a;
  return e && (r.render = e, r.staticRenderFns = t, r._compiled = !0), {
    exports: a,
    options: r
  };
}
const g = {
  name: "ReviewContent",
  extends: u,
  props: {
    showAverageReviews: {
      type: Boolean,
      default: !0
    },
    count: {
      type: Number,
      required: !0
    }
  },
  data: () => ({
    route: "reviews",
    ratings: {},
    order: "newest"
  }),
  computed: {
    roundedAverage() {
      return this.ratings.average_rating ? Number(this.ratings.average_rating).toFixed(1) : 0;
    },
    showAverageElement() {
      return this.showAverageReviews && this.count > 0;
    },
    groupedRatings() {
      if (!this.ratings.grouped_rating)
        return [];
      const a = [];
      return Object.keys(this.ratings.grouped_rating).forEach((e) => {
        a.push({
          index: e,
          count: this.ratings.grouped_rating[e]
        });
      }), a.reverse();
    }
  },
  mounted() {
    this.getAllRatings();
  },
  updated() {
    const a = this.$refs.ReviewCardRef;
    if (a)
      for (let e = 0; e < a.length; e++)
        this.$refs.ReviewCardRef[e].resizeAllGridItems();
  },
  methods: {
    times: l.times,
    async getAllRatings() {
      const a = `catalog/products/reviews/ratings?product_id=${this.product.id}`;
      try {
        this.isLoading = !0;
        const { data: e } = await c.get(a);
        this.ratings = e;
      } catch (e) {
        console.error(e);
      } finally {
        this.isLoading = !1;
      }
    },
    getReviewBarClass(a) {
      return `w-${Math.round(
        this.ratings.grouped_rating[a] / this.count * 100
      )}`;
    },
    getStarPercentage(a) {
      if (a + 1 <= this.roundedAverage)
        return "100%";
      const e = (this.roundedAverage % 1).toFixed(1) * 100;
      let t = "0%";
      return e > 0 && e <= 40 && (t = "30%"), e > 40 && e <= 60 && (t = "50%"), e > 60 && e <= 75 && (t = "55%"), e > 75 && (t = "65%"), a > this.roundedAverage ? "0%" : t;
    },
    updateOrderBy(a) {
      this.order = a, this.loaded = !1, this.payload.splice(0, this.payload.length), this.pagination.currentPage = 0, this.pagination.loaded = 0, this.loadData(!0, this.order);
    }
  }
};
var p = function() {
  var e = this, t = e._self._c;
  return t("div", { staticClass: "tab-content" }, [t("div", { staticClass: "holder-reviews", class: { grid: e.showAverageElement } }, [e.showAverageElement ? t("div", { staticClass: "average-reviews" }, [t("p", { staticClass: "average-reviews__number" }, [e._v(" " + e._s(e.roundedAverage) + " ")]), t("div", { staticClass: "stars" }, e._l(e.times(5), function(s) {
    return t("FilledStar", { key: s, attrs: { width: "23", height: "22", "fill-id": s, "filled-percentage": e.getStarPercentage(s) } });
  }), 1), t("p", { staticClass: "helper-text mt-5" }, [e._v(" baseada em "), t("strong", [e._v(e._s(e.$tc("reviews.total-reviews", e.count)))])]), t("div", { staticClass: "holder-grades mt-30" }, e._l(e.groupedRatings, function(s) {
    return t("div", { key: s.index, staticClass: "grade" }, [t("span", [e._v(e._s(s.index))]), t("i", { staticClass: "icon icon-star-gold" }), t("div", { staticClass: "bar", class: e.getReviewBarClass(s.index) }), t("span", { staticClass: "review-count" }, [e._v(e._s(s.count))])]);
  }), 0), t("div", { staticClass: "btn btn-secundary -block mt-43", on: { click: e.showModal } }, [e._v(" Avaliar produto ")])]) : t("div", { staticClass: "btn btn-secundary", on: { click: e.showModal } }, [e._v(" Avaliar produto ")]), t("div", [e.payload.length ? [t("masonry-layout", { scopedSlots: e._u([{ key: "header", fn: function() {
    return [t("div", { staticClass: "select-order flex -vcenter -hend" }, [t("span", { staticClass: "-title mr-12" }, [e._v(" ORDENAR POR: ")]), t("custom-select", { tag: "select", attrs: { id: "reviews-order-select", name: "reviews-order", value: e.order }, on: { change: e.updateOrderBy } }, [t("option", { attrs: { value: "newest" } }, [e._v(" Mais Recentes ")]), t("option", { attrs: { value: "oldest" } }, [e._v(" Mais Antigas ")]), t("option", { attrs: { value: "best_rating" } }, [e._v(" Notas Positivas ")]), t("option", { attrs: { value: "worst_rating" } }, [e._v(" Notas Negativas ")])])], 1)];
  }, proxy: !0 }], null, !1, 43242722) }, e._l(e.payload, function(s, n) {
    return t("review-card", { key: s.id, ref: "ReviewCardRef", refInFor: !0, attrs: { review: s, "show-dates": e.showDates, loading: e.isLoading }, on: { error: (d) => e.handleReviewCardError(d, n) } });
  }), 1), t("br"), e.showLoadMore ? t("div", { staticClass: "load-more", on: { click: function(s) {
    return e.loadData(!0, e.order);
  } } }, [e._v(" + Ver mais avaliações ")]) : e._e()] : e._e(), e.isLoading ? t("div", { staticClass: "text-center" }, [t("br"), t("i", { staticClass: "icon icon-loader-dark" })]) : e._e()], 2), !e.loading && !e.payload.length ? [t("br"), t("div", { staticClass: "alert -yellow" }, [e._v(" Esse produto ainda não possui nenhuma avaliação. "), t("b", { staticClass: "link-alike", on: { click: e.showModal } }, [e._v("Seja o primeiro a avaliar")])])] : e._e()], 2), t("modal-review", { ref: "modal", on: { success: e.showModalSuccess } }), t("modal-review-success", { ref: "modalSuccess" })], 1);
}, h = [], f = /* @__PURE__ */ v(
  g,
  p,
  h
);
const _ = f.exports;
function o(a) {
  o.installed || (o.installed = !0, a.component("ReviewContent", _));
}
const m = {
  install: o
};
let i = null;
typeof window < "u" ? i = window.Vue : typeof global < "u" && (i = global.Vue);
i && i.use(m);
export {
  _ as default
};
