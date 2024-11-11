import u from "http://rocket.test/dist/vendor/lodash.js";
import { mapGetters as c } from "http://rocket.test/dist/vendor/vuex.js";
import { uuidv4 as m, smoothScroll as d } from "http://rocket.test/dist/vendor/mixins/helpers.js";
function f(e, t, i, n, o, r, y, R) {
  var s = typeof e == "function" ? e.options : e;
  return t && (s.render = t, s.staticRenderFns = i, s._compiled = !0), {
    exports: e,
    options: s
  };
}
const p = {
  name: "AverageRating",
  props: {
    isGrid: {
      type: Boolean,
      default: !1
    },
    product: {
      type: Object,
      required: !0
    }
  },
  data() {
    return {
      elementPosition: 0
    };
  },
  computed: {
    ...c("images", ["lazyloadImages"]),
    ratingValue() {
      var e;
      return ((e = this.product.data) == null ? void 0 : e.rating) ?? this.product.rating;
    },
    totalReviews() {
      var e;
      return ((e = this.product.data) == null ? void 0 : e.total_approved_reviews) ?? this.product.total_approved_reviews;
    },
    gridReviewsAmount() {
      return this.totalReviews > 0 ? `(${this.totalReviews})` : "";
    },
    productReviewsAmount() {
      return `(${this.$tc("common.reviews", this.totalReviews)})`;
    },
    ratingAmountText() {
      return this.isGrid ? this.gridReviewsAmount : this.productReviewsAmount;
    }
  },
  mounted() {
    this.isGrid || window.addEventListener("scroll", () => {
      const e = document.getElementsByClassName("product-reviews")[0];
      this.elementPosition !== e.offsetTop && (this.elementPosition = e.offsetTop);
    });
  },
  methods: {
    uuidv4: m,
    times: u.times,
    async handleScroll() {
      if (this.isGrid) return;
      const e = document.getElementsByClassName("product-reviews")[0], t = document.getElementsByClassName("product-specifications")[0];
      if (this.elementPosition = e.offsetTop, !!e) {
        if (this.elementPosition > t.offsetTop) {
          const i = this.lazyloadImages.reduce((o, r) => r.y > 700 && window.innerWidth > 700 ? o + 700 : window.innerWidth < 700 && r.y > window.innerWidth ? window.innerWidth * 0.75 + o : r.y * 0.9 + o, 0), n = i ? this.elementPosition + i : this.elementPosition;
          await d(document.body, 0, n);
          return;
        }
        await d(document.body, 0, this.elementPosition);
      }
    },
    getStarPercentage(e) {
      if (e + 1 <= this.ratingValue)
        return "100%";
      const t = (this.ratingValue % 1).toFixed(1) * 100;
      let i = "0%";
      return t > 0 && t <= 40 && (i = "30%"), t > 40 && t <= 60 && (i = "50%"), t > 60 && t <= 75 && (i = "55%"), t > 75 && (i = "65%"), e > this.ratingValue ? "0%" : i;
    }
  }
};
var h = function() {
  var t = this, i = t._self._c;
  return i("div", { staticClass: "average-rating-container", class: { "is-grid": t.isGrid }, on: { click: t.handleScroll } }, [t._l(t.times(5), function(n) {
    return i("FilledStar", { key: n + t.uuidv4(), attrs: { width: "14", height: "15", "fill-id": n + t.uuidv4(), "filled-percentage": t.getStarPercentage(n) } });
  }), i("div", { staticClass: "average-rating-amount" }, [t._v(" " + t._s(t.ratingAmountText) + " ")])], 2);
}, g = [], v = /* @__PURE__ */ f(
  p,
  h,
  g
);
const w = v.exports;
function l(e) {
  l.installed || (l.installed = !0, e.component("AverageRating", w));
}
const _ = {
  install: l
};
let a = null;
typeof window < "u" ? a = window.Vue : typeof global < "u" && (a = global.Vue);
a && a.use(_);
export {
  w as default
};
