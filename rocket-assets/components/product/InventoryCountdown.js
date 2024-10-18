import i from "https://s3.amazonaws.com/codigo-aberto-sandbox-assets/rocket/assets/rocket-preview/vendor/lodash.js";
function u(e, t, n, p, _, v, h, w) {
  var o = typeof e == "function" ? e.options : e;
  return t && (o.render = t, o.staticRenderFns = n, o._compiled = !0), {
    exports: e,
    options: o
  };
}
const c = {
  name: "InventoryCountdown",
  data: () => ({
    actual: 12,
    start: 12,
    max: 48,
    min: 2,
    timeout: 1e4
  }),
  computed: {
    barStyle() {
      return {
        width: `${10 + i.round(this.actual / this.max * 100, 2)}%`
      };
    }
  },
  methods: {
    runCountdown() {
      const e = (this.start - this.actual + 1) * this.timeout;
      setTimeout(() => {
        this.actual--, this.actual > this.min && this.runCountdown();
      }, e);
    }
  },
  mounted() {
    this.runCountdown();
  }
};
var l = function() {
  var t = this, n = t._self._c;
  return n("div", { staticClass: "main-product-inventory-countdown" }, [n("div", { staticClass: "quantity-left-text" }, [t._v(" Apenas "), n("span", { staticClass: "quantity-left", domProps: { textContent: t._s(t.actual) } }), t._v(" produtos "), n("span", { staticClass: "inline-block" }, [t._v(" em estoque ")])]), n("div", { staticClass: "percentage-bar-holder" }, [n("div", { staticClass: "percentage-bar", style: t.barStyle })]), n("div", { staticClass: "countdown flex -vcenter -hcenter" }, [n("span", { staticClass: "countdown-text" }, [t._v("Oferta acaba em")]), n("Stopwatch", { staticClass: "countdown-timer" })], 1)]);
}, r = [], d = /* @__PURE__ */ u(
  c,
  l,
  r
);
const m = d.exports;
function s(e) {
  s.installed || (s.installed = !0, e.component("InventoryCountdown", m));
}
const f = {
  install: s
};
let a = null;
typeof window < "u" ? a = window.Vue : typeof global < "u" && (a = global.Vue);
a && a.use(f);
export {
  m as default
};
