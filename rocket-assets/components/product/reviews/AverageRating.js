import g from "https://codigo-aberto-sandbox-assets.yampi.io.s3.amazonaws.com/yampi-templates-sandbox/rocket-assets/dist/vendor/lodash.js";
import { mapGetters as w } from "https://codigo-aberto-sandbox-assets.yampi.io.s3.amazonaws.com/yampi-templates-sandbox/rocket-assets/dist/vendor/vuex.js";
import { uuidv4 as R, smoothScroll as h } from "https://codigo-aberto-sandbox-assets.yampi.io.s3.amazonaws.com/yampi-templates-sandbox/rocket-assets/dist/vendor/mixins/helpers.js";
function y(t, e, i, a, o, l, f, p) {
  var n = typeof t == "function" ? t.options : t;
  e && (n.render = e, n.staticRenderFns = i, n._compiled = !0), a && (n.functional = !0), l && (n._scopeId = "data-v-" + l);
  var s;
  if (f ? (s = function(r) {
    r = r || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !r && typeof __VUE_SSR_CONTEXT__ < "u" && (r = __VUE_SSR_CONTEXT__), o && o.call(this, r), r && r._registeredComponents && r._registeredComponents.add(f);
  }, n._ssrRegister = s) : o && (s = p ? function() {
    o.call(
      this,
      (n.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : o), s)
    if (n.functional) {
      n._injectStyles = s;
      var v = n.render;
      n.render = function(_, m) {
        return s.call(m), v(_, m);
      };
    } else {
      var c = n.beforeCreate;
      n.beforeCreate = c ? [].concat(c, s) : [s];
    }
  return {
    exports: t,
    options: n
  };
}
const C = {
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
    ...w("images", ["lazyloadImages"]),
    ratingValue() {
      var t, e;
      return (e = (t = this.product.data) == null ? void 0 : t.rating) != null ? e : this.product.rating;
    },
    totalReviews() {
      var t, e;
      return (e = (t = this.product.data) == null ? void 0 : t.total_approved_reviews) != null ? e : this.product.total_approved_reviews;
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
      const t = document.getElementsByClassName("product-reviews")[0];
      this.elementPosition !== t.offsetTop && (this.elementPosition = t.offsetTop);
    });
  },
  methods: {
    uuidv4: R,
    times: g.times,
    async handleScroll() {
      if (this.isGrid)
        return;
      const t = document.getElementsByClassName("product-reviews")[0], e = document.getElementsByClassName("product-specifications")[0];
      if (this.elementPosition = t.offsetTop, !!t) {
        if (this.elementPosition > e.offsetTop) {
          const i = this.lazyloadImages.reduce((o, l) => l.y > 700 && window.innerWidth > 700 ? o + 700 : window.innerWidth < 700 && l.y > window.innerWidth ? window.innerWidth * 0.75 + o : l.y * 0.9 + o, 0), a = i ? this.elementPosition + i : this.elementPosition;
          await h(document.body, 0, a);
          return;
        }
        await h(document.body, 0, this.elementPosition);
      }
    },
    getStarPercentage(t) {
      if (t + 1 <= this.ratingValue)
        return "100%";
      const e = (this.ratingValue % 1).toFixed(1) * 100;
      let i = "0%";
      return e > 0 && e <= 40 && (i = "30%"), e > 40 && e <= 60 && (i = "50%"), e > 60 && e <= 75 && (i = "55%"), e > 75 && (i = "65%"), t > this.ratingValue ? "0%" : i;
    }
  }
};
var P = function() {
  var e = this, i = e._self._c;
  return i("div", { staticClass: "average-rating-container", class: { "is-grid": e.isGrid }, on: { click: e.handleScroll } }, [e._l(e.times(5), function(a) {
    return i("FilledStar", { key: a + e.uuidv4(), attrs: { width: "14", height: "15", "fill-id": a + e.uuidv4(), "filled-percentage": e.getStarPercentage(a) } });
  }), i("div", { staticClass: "average-rating-amount" }, [e._v(" " + e._s(e.ratingAmountText) + " ")])], 2);
}, T = [], V = /* @__PURE__ */ y(
  C,
  P,
  T,
  !1,
  null,
  null,
  null,
  null
);
const $ = V.exports;
function u(t) {
  u.installed || (u.installed = !0, t.component("AverageRating", $));
}
const b = {
  install: u
};
let d = null;
typeof window < "u" ? d = window.Vue : typeof global < "u" && (d = global.Vue);
d && d.use(b);
export {
  $ as default
};
