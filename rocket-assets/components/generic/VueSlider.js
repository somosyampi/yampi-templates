(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode(".vue-slider__wrapper{position:relative;width:100%;height:100%}.vue-slider__background{background-color:var(--default-background-color);border-radius:15px;position:absolute;width:100%;height:100%}.vue-slider__track{pointer-events:none;position:absolute;height:100%;background-color:var(--color-general-primary)}.vue-slider{margin:0 -7px}.vue-slider input[type=range]{position:absolute;width:100%;appearance:none;height:100%;background:transparent;pointer-events:none;margin:0}.vue-slider input[type=range]::-webkit-slider-thumb{pointer-events:auto;appearance:none;width:17px;height:17px;border-radius:50%;cursor:pointer;box-shadow:none;background-color:var(--default-background-color);border:solid 4px var(--color-general-primary)}")),document.head.appendChild(e)}}catch(r){console.error("vite-plugin-css-injected-by-js",r)}})();
function v(a, e, l, s, o, d, c, m) {
  var t = typeof a == "function" ? a.options : a;
  e && (t.render = e, t.staticRenderFns = l, t._compiled = !0), s && (t.functional = !0), d && (t._scopeId = "data-v-" + d);
  var n;
  if (c ? (n = function(i) {
    i = i || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !i && typeof __VUE_SSR_CONTEXT__ < "u" && (i = __VUE_SSR_CONTEXT__), o && o.call(this, i), i && i._registeredComponents && i._registeredComponents.add(c);
  }, t._ssrRegister = n) : o && (n = m ? function() {
    o.call(
      this,
      (t.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : o), n)
    if (t.functional) {
      t._injectStyles = n;
      var _ = t.render;
      t.render = function(f, p) {
        return n.call(p), _(f, p);
      };
    } else {
      var h = t.beforeCreate;
      t.beforeCreate = h ? [].concat(h, n) : [n];
    }
  return {
    exports: a,
    options: t
  };
}
const M = {
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
      const a = (this.localMin - this.min) / (this.max - this.min) * 100, e = (this.localMax - this.min) / (this.max - this.min) * 100;
      return {
        left: `${a}%`,
        width: `${e - a}%`
      };
    }
  },
  watch: {
    value: {
      handler(a) {
        this.localMin = Number(a[0]), this.localMax = Number(a[1]);
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
var g = function() {
  var e = this, l = e._self._c;
  return l("div", { staticClass: "vue-slider", style: `height: ${e.height}px;` }, [l("div", { staticClass: "vue-slider__wrapper" }, [l("div", { staticClass: "vue-slider__background" }), l("div", { staticClass: "vue-slider__track", style: e.trackStyle }), l("input", { directives: [{ name: "model", rawName: "v-model", value: e.localMin, expression: "localMin" }], attrs: { type: "range", min: e.min, max: e.max, step: e.step }, domProps: { value: e.localMin }, on: { input: e.updateMin, change: e.onSliderChange, __r: function(s) {
    e.localMin = s.target.value;
  } } }), l("input", { directives: [{ name: "model", rawName: "v-model", value: e.localMax, expression: "localMax" }], attrs: { type: "range", min: e.min, max: e.max, step: e.step }, domProps: { value: e.localMax }, on: { input: e.updateMax, change: e.onSliderChange, __r: function(s) {
    e.localMax = s.target.value;
  } } })])]);
}, x = [], y = /* @__PURE__ */ v(
  M,
  g,
  x,
  !1,
  null,
  null,
  null,
  null
);
const C = y.exports;
function u(a) {
  u.installed || (u.installed = !0, a.component("VueSlider", C));
}
const b = {
  install: u
};
let r = null;
typeof window < "u" ? r = window.Vue : typeof global < "u" && (r = global.Vue);
r && r.use(b);
export {
  C as default
};
