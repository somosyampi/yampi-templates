(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode(".vue-slider__wrapper{position:relative;width:100%;height:100%}.vue-slider__background{background-color:var(--default-background-color);border-radius:15px;position:absolute;width:100%;height:100%}.vue-slider__track{pointer-events:none;position:absolute;height:100%;background-color:var(--color-general-primary)}.vue-slider{margin:0 -7px}.vue-slider input[type=range]{position:absolute;width:100%;-webkit-appearance:none;-moz-appearance:none;appearance:none;height:100%;background:transparent;pointer-events:none;margin:0}.vue-slider input[type=range]::-webkit-slider-thumb{pointer-events:auto;-webkit-appearance:none;-moz-appearance:none;appearance:none;width:17px;height:17px;border-radius:50%;cursor:pointer;box-shadow:none;background-color:var(--default-background-color);border:solid 4px var(--color-general-primary)}")),document.head.appendChild(e)}}catch(r){console.error("vite-plugin-css-injected-by-js",r)}})();
function o(t, e, a, i, p, f, M, v) {
  var l = typeof t == "function" ? t.options : t;
  return e && (l.render = e, l.staticRenderFns = a, l._compiled = !0), {
    exports: t,
    options: l
  };
}
const c = {
  props: {
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    step: {
      type: Number,
      default: 1
    },
    value: {
      type: Array,
      default: () => []
    },
    height: {
      type: Number,
      default: 5
    }
  },
  data() {
    return {
      localMin: this.value[0],
      localMax: this.value[1]
    };
  },
  computed: {
    trackStyle() {
      const t = (this.localMin - this.min) / (this.max - this.min) * 100, e = (this.localMax - this.min) / (this.max - this.min) * 100;
      return {
        left: `${t}%`,
        width: `${e - t}%`
      };
    }
  },
  watch: {
    value: {
      handler(t) {
        this.localMin = Number(t[0]), this.localMax = Number(t[1]);
      },
      deep: !0
    }
  },
  methods: {
    updateMin() {
      this.localMin > this.localMax - this.step && (this.localMin = this.localMax - this.step), this.emitValues();
    },
    updateMax() {
      this.localMax < this.localMin + this.step && (this.localMax = this.localMin + this.step), this.emitValues();
    },
    emitValues() {
      this.$emit("input", [this.localMin, this.localMax]);
    },
    onSliderChange() {
      this.$emit("change", [this.localMin, this.localMax]);
    }
  }
};
var r = function() {
  var e = this, a = e._self._c;
  return a("div", { staticClass: "vue-slider", style: `height: ${e.height}px;` }, [a("div", { staticClass: "vue-slider__wrapper" }, [a("div", { staticClass: "vue-slider__background" }), a("div", { staticClass: "vue-slider__track", style: e.trackStyle }), a("input", { directives: [{ name: "model", rawName: "v-model", value: e.localMin, expression: "localMin" }], attrs: { type: "range", min: e.min, max: e.max, step: e.step }, domProps: { value: e.localMin }, on: { input: e.updateMin, change: e.onSliderChange, __r: function(i) {
    e.localMin = i.target.value;
  } } }), a("input", { directives: [{ name: "model", rawName: "v-model", value: e.localMax, expression: "localMax" }], attrs: { type: "range", min: e.min, max: e.max, step: e.step }, domProps: { value: e.localMax }, on: { input: e.updateMax, change: e.onSliderChange, __r: function(i) {
    e.localMax = i.target.value;
  } } })])]);
}, u = [], d = /* @__PURE__ */ o(
  c,
  r,
  u
);
const m = d.exports;
function s(t) {
  s.installed || (s.installed = !0, t.component("VueSlider", m));
}
const h = {
  install: s
};
let n = null;
typeof window < "u" ? n = window.Vue : typeof global < "u" && (n = global.Vue);
n && n.use(h);
export {
  m as default
};
