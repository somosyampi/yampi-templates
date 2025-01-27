function d(t, e, s, i, n, o, w, m) {
  var a = typeof t == "function" ? t.options : t;
  return e && (a.render = e, a.staticRenderFns = s, a._compiled = !0), {
    exports: t,
    options: a
  };
}
const u = {
  name: "ProductReviews",
  props: {
    order: {
      type: String,
      default: "reviews_first",
      validator: (t) => ["reviews_first", "questions_first"].includes(t)
    },
    showReviews: {
      type: Boolean,
      required: !0
    },
    showQuestions: {
      type: Boolean,
      required: !0
    },
    showDates: {
      type: Boolean,
      required: !0
    },
    showAverageReviews: {
      type: Boolean,
      required: !0
    },
    reviewsTitle: {
      type: String,
      default: "Avaliações"
    },
    questionsTitle: {
      type: String,
      default: "Dúvidas"
    },
    icon: {
      type: String,
      default: ""
    },
    limit: {
      type: Number,
      default: 0
    }
  },
  data: () => ({
    items: [],
    activeIndex: 0
  }),
  computed: {
    getSliderStyle() {
      return `--active-left: ${this.activeIndex ? "50%" : "5px"};`;
    },
    allLoading() {
      return this.items.some((t) => t.loading);
    }
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      const t = this.order === "questions_first";
      if (this.showReviews && this.items.push({
        type: "review",
        component: "review-content",
        title: this.reviewsTitle,
        active: !t,
        loading: !1,
        count: 0
      }), this.showQuestions) {
        const e = t ? "unshift" : "push";
        this.items[e]({
          type: "question",
          component: "question-content",
          title: this.questionsTitle,
          active: t,
          loading: !1,
          count: 0
        });
      }
    },
    limitedText(t) {
      return this.limit && this.limit < t ? `${this.limit}+` : t;
    }
  }
};
var c = function() {
  var e = this, s = e._self._c;
  return e.showReviews || e.showQuestions ? s("div", [s("div", { staticClass: "holder-product-reviews-title relative", class: { single: e.items.length == 1 } }, [e.items.length > 1 ? s("div", { staticClass: "active-slider", style: e.getSliderStyle }) : e._e(), s("div", { staticClass: "titles flex -between relative" }, e._l(e.items, function(i, n) {
    return s("div", { key: i.type, staticClass: "theme-title", class: { active: e.activeIndex === n }, on: { click: function(o) {
      e.activeIndex = n;
    } } }, [s("span", { staticClass: "-title", domProps: { textContent: e._s(i.title) } }), s("span", { staticClass: "-quantity", domProps: { textContent: e._s(e.limitedText(i.count)) } })]);
  }), 0)]), e._l(e.items, function(i, n) {
    return s(i.component, { directives: [{ name: "show", rawName: "v-show", value: e.activeIndex === n, expression: "activeIndex === key" }], key: i.type, tag: "component", attrs: { active: e.activeIndex === n, icon: e.icon, loading: i.loading, count: i.count, "show-dates": e.showDates, "show-average-reviews": e.showAverageReviews }, on: { "update:loading": function(o) {
      return e.$set(i, "loading", o);
    }, "update:count": function(o) {
      return e.$set(i, "count", o);
    } } });
  })], 2) : e._e();
}, v = [], f = /* @__PURE__ */ d(
  u,
  c,
  v
);
const p = f.exports;
function r(t) {
  r.installed || (r.installed = !0, t.component("ProductReviews", p));
}
const h = {
  install: r
};
let l = null;
typeof window < "u" ? l = window.Vue : typeof global < "u" && (l = global.Vue);
l && l.use(h);
export {
  p as default
};
