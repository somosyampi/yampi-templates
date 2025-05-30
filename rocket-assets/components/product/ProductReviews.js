function w(t, e, o, n, s, l, c, h) {
  var i = typeof t == "function" ? t.options : t;
  e && (i.render = e, i.staticRenderFns = o, i._compiled = !0), n && (i.functional = !0), l && (i._scopeId = "data-v-" + l);
  var r;
  if (c ? (r = function(a) {
    a = a || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !a && typeof __VUE_SSR_CONTEXT__ < "u" && (a = __VUE_SSR_CONTEXT__), s && s.call(this, a), a && a._registeredComponents && a._registeredComponents.add(c);
  }, i._ssrRegister = r) : s && (r = h ? function() {
    s.call(
      this,
      (i.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : s), r)
    if (i.functional) {
      i._injectStyles = r;
      var p = i.render;
      i.render = function(_, v) {
        return r.call(v), p(_, v);
      };
    } else {
      var f = i.beforeCreate;
      i.beforeCreate = f ? [].concat(f, r) : [r];
    }
  return {
    exports: t,
    options: i
  };
}
const m = {
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
      default: "Avalia\xE7\xF5es"
    },
    questionsTitle: {
      type: String,
      default: "D\xFAvidas"
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
var g = function() {
  var e = this, o = e._self._c;
  return e.showReviews || e.showQuestions ? o("div", [o("div", { staticClass: "holder-product-reviews-title relative", class: { single: e.items.length == 1 } }, [e.items.length > 1 ? o("div", { staticClass: "active-slider", style: e.getSliderStyle }) : e._e(), o("div", { staticClass: "titles flex -between relative" }, e._l(e.items, function(n, s) {
    return o("div", { key: n.type, staticClass: "theme-title", class: { active: e.activeIndex === s }, on: { click: function(l) {
      e.activeIndex = s;
    } } }, [o("span", { staticClass: "-title", domProps: { textContent: e._s(n.title) } }), o("span", { staticClass: "-quantity", domProps: { textContent: e._s(e.limitedText(n.count)) } })]);
  }), 0)]), e._l(e.items, function(n, s) {
    return o(n.component, { directives: [{ name: "show", rawName: "v-show", value: e.activeIndex === s, expression: "activeIndex === key" }], key: n.type, tag: "component", attrs: { active: e.activeIndex === s, icon: e.icon, loading: n.loading, count: n.count, "show-dates": e.showDates, "show-average-reviews": e.showAverageReviews }, on: { "update:loading": function(l) {
      return e.$set(n, "loading", l);
    }, "update:count": function(l) {
      return e.$set(n, "count", l);
    } } });
  })], 2) : e._e();
}, y = [], C = /* @__PURE__ */ w(
  m,
  g,
  y,
  !1,
  null,
  null,
  null,
  null
);
const R = C.exports;
function d(t) {
  d.installed || (d.installed = !0, t.component("ProductReviews", R));
}
const q = {
  install: d
};
let u = null;
typeof window < "u" ? u = window.Vue : typeof global < "u" && (u = global.Vue);
u && u.use(q);
export {
  R as default
};
