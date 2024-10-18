import o from "https://s3.amazonaws.com/codigo-aberto-sandbox-assets/rocket/assets/rocket-preview/vendor/lodash.js";
function r(t, e, a, l, p, v, _, x) {
  var s = typeof t == "function" ? t.options : t;
  return e && (s.render = e, s.staticRenderFns = a, s._compiled = !0), {
    exports: t,
    options: s
  };
}
const d = {
  name: "RangeSlider",
  props: {
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      required: !0
    },
    currency: {
      type: Boolean,
      default: !0
    },
    value: {
      type: Array,
      default: () => []
    },
    removePrefix: {
      type: Boolean,
      default: !1
    },
    height: {
      type: Number,
      default: 5
    },
    dotSize: {
      type: Number,
      default: 17
    }
  },
  mounted() {
    this.selectedMin = o.get(this.value, 0, this.min), this.selectedMax = o.get(this.value, 1, this.max);
  },
  computed: {
    formatedMin() {
      return this.currency ? this.$formatMoney(this.selectedMin, this.removePrefix) : this.selectedMin;
    },
    formatedMax() {
      return this.currency ? this.$formatMoney(this.selectedMax, this.removePrefix) : this.selectedMax;
    }
  },
  watch: {
    value: {
      deep: !0,
      immediate: !0,
      handler() {
        this.values = this.value, this.updateValues(this.value);
      }
    }
  },
  data: () => ({
    selectedMin: 0,
    selectedMax: 0,
    values: []
  }),
  methods: {
    updateValues([t, e]) {
      this.selectedMin = t, this.selectedMax = e;
    },
    change(t) {
      this.updateValues(t), this.$emit("input", t);
    }
  }
};
var u = function() {
  var e = this, a = e._self._c;
  return a("div", { staticClass: "holder-price-slider" }, [a("vue-slider", { attrs: { min: e.min, max: e.max, lazy: !0, interval: 0.01, height: e.height, "dot-size": e.dotSize, tooltip: "none" }, on: { dragging: e.updateValues, change: e.change }, model: { value: e.values, callback: function(l) {
    e.values = l;
  }, expression: "values" } }), a("div", { staticClass: "step-values" }, [a("span", { staticClass: "selected-min", domProps: { textContent: e._s(e.formatedMin) } }), a("span", { staticClass: "divisor" }, [e._v(" - ")]), a("span", { staticClass: "selected-max", domProps: { textContent: e._s(e.formatedMax) } })])], 1);
}, c = [], m = /* @__PURE__ */ r(
  d,
  u,
  c
);
const f = m.exports;
function n(t) {
  n.installed || (n.installed = !0, t.component("RangeSlider", f));
}
const h = {
  install: n
};
let i = null;
typeof window < "u" ? i = window.Vue : typeof global < "u" && (i = global.Vue);
i && i.use(h);
export {
  f as default
};
