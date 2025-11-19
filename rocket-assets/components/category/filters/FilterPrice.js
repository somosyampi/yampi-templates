import { mapGetters as v, mapActions as P } from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/vuex.js";
import _ from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/components/category/filters/BaseFilter.js";
function x(r, e, t, n, o, m, c, f) {
  var a = typeof r == "function" ? r.options : r;
  e && (a.render = e, a.staticRenderFns = t, a._compiled = !0), n && (a.functional = !0), m && (a._scopeId = "data-v-" + m);
  var s;
  if (c ? (s = function(i) {
    i = i || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !i && typeof __VUE_SSR_CONTEXT__ < "u" && (i = __VUE_SSR_CONTEXT__), o && o.call(this, i), i && i._registeredComponents && i._registeredComponents.add(c);
  }, a._ssrRegister = s) : o && (s = f ? function() {
    o.call(
      this,
      (a.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : o), s)
    if (a.functional) {
      a._injectStyles = s;
      var p = a.render;
      a.render = function(y, d) {
        return s.call(d), p(y, d);
      };
    } else {
      var h = a.beforeCreate;
      a.beforeCreate = h ? [].concat(h, s) : [s];
    }
  return {
    exports: r,
    options: a
  };
}
const g = {
  name: "FilterPrice",
  extends: _,
  props: {
    allPrices: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    mainQueryString: "price",
    route: "prices",
    value: [],
    currentPayload: { min: 0, max: 0 }
  }),
  computed: {
    ...v("preview", [
      "isIframe"
    ])
  },
  watch: {
    payload(r) {
      this.shouldUseNewSearchStrategy || (this.currentPayload = r);
    },
    allPrices(r) {
      !this.shouldUseNewSearchStrategy || this.processAllPrices(r);
    }
  },
  mounted() {
    this.value.push(this.queryParams.min || 0), this.queryParams.max && this.value.push(this.queryParams.max), this.shouldUseNewSearchStrategy && this.processAllPrices(this.allPrices);
  },
  methods: {
    ...P("queryParams", [
      "removeQueryParams"
    ]),
    processAllPrices(r) {
      const e = r.map((n) => Number(n));
      if (!e.length)
        return;
      const t = Math.max(...e);
      this.currentPayload = this.parsePayload({
        min: 0,
        max: Number(t)
      }), this.queryParams.max && this.value.length < 2 && (this.value = [
        this.queryParams.min || 0,
        this.queryParams.max || t
      ]);
    },
    updatePriceStatus([r, e]) {
      if (this.isIframe)
        return;
      if (r === 0 && Number(this.queryParams.min)) {
        this.removeQueryParams({ key: "min" }), this.parseActiveFilter();
        return;
      }
      if (e === this.currentPayload.max && Number(this.queryParams.max)) {
        this.removeQueryParams({ key: "max" }), this.parseActiveFilter();
        return;
      }
      const t = {};
      r !== Number(this.queryParams.min) && r > 0 && (t.min = r), e !== Number(this.queryParams.max) && e < this.currentPayload.max && (t.max = e), this.setQueryParams({ ...t, page: 1 }), this.parseActiveFilter();
    },
    parsePayload(r) {
      const e = Number(r.max);
      return this.value.length < 2 && (this.value.push(e), this.currentPayload.max = e), {
        min: Number(r.min),
        max: e
      };
    },
    parseFilterStatuses() {
      const [r, e] = this.value;
      if (r === 0 && e === this.currentPayload.max)
        return;
      const t = {};
      r !== 0 && (t.min = r), e !== this.currentPayload.max && (t.max = e);
      const n = this.$formatMoney(Number(r)), o = this.$formatMoney(Number(e));
      this.addActiveFilter({
        id: this.$randomString(),
        key: "price",
        query: t,
        alias: "price",
        name: `${n} - ${o}`
      });
    },
    parseActiveFilter() {
      this.removeActiveFilter({
        alias: "price"
      }), this.parseFilterStatuses();
    },
    filterRemoved() {
      this.value = [0, this.currentPayload.max];
    }
  }
};
var b = function() {
  var e = this, t = e._self._c;
  return t("div", { staticClass: "filter filter-price" }, [t("div", { staticClass: "-title" }, [e._v(" Faixa de pre\xE7o ")]), e.loading ? [t("Loader", { attrs: { margin: 33 } }), t("Loader", { staticStyle: { display: "block", margin: "20px auto 54px", width: "50%" } })] : e.currentPayload.max ? t("RangeSlider", { attrs: { max: e.currentPayload.max, "remove-prefix": !0 }, on: { input: e.updatePriceStatus }, model: { value: e.value, callback: function(n) {
    e.value = n;
  }, expression: "value" } }) : e._e()], 2);
}, F = [], S = /* @__PURE__ */ x(
  g,
  b,
  F,
  !1,
  null,
  null,
  null,
  null
);
const N = S.exports;
function u(r) {
  u.installed || (u.installed = !0, r.component("FilterPrice", N));
}
const q = {
  install: u
};
let l = null;
typeof window < "u" ? l = window.Vue : typeof global < "u" && (l = global.Vue);
l && l.use(q);
export {
  N as default
};
