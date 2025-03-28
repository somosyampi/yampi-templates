import p from "https://images-dev.yampi.me/rocket-sandbox/b/01/dist/vendor/lodash.js";
function y(i, e, n, o, r, d, f, m) {
  var t = typeof i == "function" ? i.options : i;
  e && (t.render = e, t.staticRenderFns = n, t._compiled = !0), o && (t.functional = !0), d && (t._scopeId = "data-v-" + d);
  var a;
  if (f ? (a = function(s) {
    s = s || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !s && typeof __VUE_SSR_CONTEXT__ < "u" && (s = __VUE_SSR_CONTEXT__), r && r.call(this, s), s && s._registeredComponents && s._registeredComponents.add(f);
  }, t._ssrRegister = a) : r && (a = m ? function() {
    r.call(
      this,
      (t.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : r), a)
    if (t.functional) {
      t._injectStyles = a;
      var _ = t.render;
      t.render = function(v, c) {
        return a.call(c), _(v, c);
      };
    } else {
      var h = t.beforeCreate;
      t.beforeCreate = h ? [].concat(h, a) : [a];
    }
  return {
    exports: i,
    options: t
  };
}
const C = {
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
  data: () => ({
    selectedMin: 0,
    selectedMax: 0,
    values: []
  }),
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
  mounted() {
    this.selectedMin = p.get(this.value, 0, this.min), this.selectedMax = p.get(this.value, 1, this.max);
  },
  methods: {
    updateValues([i, e]) {
      this.selectedMin = i, this.selectedMax = e;
    },
    change(i) {
      this.updateValues(i), this.$emit("input", i);
    }
  }
};
var M = function() {
  var e = this, n = e._self._c;
  return n("div", { staticClass: "holder-price-slider" }, [n("VueSlider", { attrs: { min: e.min, max: e.max, lazy: !0, step: 0.01, height: e.height, "dot-size": e.dotSize, tooltip: "none" }, on: { input: e.updateValues, change: e.change }, model: { value: e.values, callback: function(o) {
    e.values = o;
  }, expression: "values" } }), n("div", { staticClass: "step-values" }, [n("span", { staticClass: "selected-min", domProps: { textContent: e._s(e.formatedMin) } }), n("span", { staticClass: "divisor" }, [e._v(" - ")]), n("span", { staticClass: "selected-max", domProps: { textContent: e._s(e.formatedMax) } })])], 1);
}, g = [], x = /* @__PURE__ */ y(
  C,
  M,
  g,
  !1,
  null,
  null,
  null,
  null
);
const b = x.exports;
function u(i) {
  u.installed || (u.installed = !0, i.component("RangeSlider", b));
}
const V = {
  install: u
};
let l = null;
typeof window < "u" ? l = window.Vue : typeof global < "u" && (l = global.Vue);
l && l.use(V);
export {
  b as default
};
