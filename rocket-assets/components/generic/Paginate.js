import f from "http://rocket.test/dist/vendor/mixins/queryParams.js";
function d(s, e, t, a, i, r, l, n) {
  var o = typeof s == "function" ? s.options : s;
  return e && (o.render = e, o.staticRenderFns = t, o._compiled = !0), {
    exports: s,
    options: o
  };
}
const p = {
  name: "Paginate",
  mixins: [
    f
  ],
  props: {
    value: {
      type: Number,
      required: !0
    },
    pageCount: {
      type: Number,
      default: 10
    },
    pagerCount: {
      type: Number,
      default: 7
    },
    disabled: {
      type: Boolean,
      default: !1
    }
  },
  watch: {
    value: {
      immediate: !0,
      handler() {
        this.current = this.value;
      }
    }
  },
  methods: {
    onPagerClick(s) {
      const e = s.target;
      if (e.tagName === "UL" || this.disabled)
        return;
      let t = Number(s.target.textContent);
      const a = this.pageCount, i = this.current, r = this.pagerCount - 2;
      e.className.indexOf("more") !== -1 && (e.className.indexOf("quickprev") !== -1 ? t = i - r : e.className.indexOf("quicknext") !== -1 && (t = i + r)), isNaN(t) || (t < 1 && (t = 1), t > a && (t = a)), t !== i && (this.current = t, this.$emit("input", t));
    }
  },
  computed: {
    pagers() {
      const s = this.pagerCount, e = (s - 1) / 2, t = Number(this.current), a = Number(this.pageCount);
      let i = !1, r = !1;
      a > s && (t > s - e && (i = !0), t < a - e && (r = !0));
      const l = [];
      if (i && !r) {
        const n = a - (s - 2);
        for (let o = n; o < a; o++)
          l.push(o);
      } else if (!i && r)
        for (let n = 2; n < s; n++)
          l.push(n);
      else if (i && r) {
        const n = Math.floor(s / 2) - 1;
        for (let o = t - n; o <= t + n; o++)
          l.push(o);
      } else
        for (let n = 2; n < a; n++)
          l.push(n);
      return this.showPrevMore = i, this.showNextMore = r, l;
    }
  },
  data: () => ({
    current: null,
    showPrevMore: !1,
    showNextMore: !1
  })
};
var m = function() {
  var e = this, t = e._self._c;
  return t("ul", { staticClass: "paginate", on: { click: e.onPagerClick } }, [e.pageCount > 0 ? t("li", { staticClass: "number", class: { active: e.current === 1, disabled: e.disabled } }, [e._v("1")]) : e._e(), e.showPrevMore ? t("li", { staticClass: "more", class: { disabled: e.disabled } }, [e._v("...")]) : e._e(), e._l(e.pagers, function(a) {
    return t("li", { key: a, staticClass: "number", class: { active: e.current === a, disabled: e.disabled }, domProps: { textContent: e._s(a) } });
  }), e.showNextMore ? t("li", { staticClass: "more", class: { disabled: e.disabled } }, [e._v("...")]) : e._e(), e.pageCount > 1 ? t("li", { staticClass: "number", class: { active: e.current === e.pageCount, disabled: e.disabled }, domProps: { textContent: e._s(e.pageCount) } }) : e._e()], 2);
}, h = [], g = /* @__PURE__ */ d(
  p,
  m,
  h
);
const C = g.exports;
function c(s) {
  c.installed || (c.installed = !0, s.component("Paginate", C));
}
const _ = {
  install: c
};
let u = null;
typeof window < "u" ? u = window.Vue : typeof global < "u" && (u = global.Vue);
u && u.use(_);
export {
  C as default
};
