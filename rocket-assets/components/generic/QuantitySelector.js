function s(t, e, n, i, h, p, y, V) {
  var r = typeof t == "function" ? t.options : t;
  return e && (r.render = e, r.staticRenderFns = n, r._compiled = !0), {
    exports: t,
    options: r
  };
}
const l = {
  name: "QuantitySelector",
  props: {
    value: {
      type: Number,
      default: 1
    },
    min: {
      type: [Number, Boolean],
      default: 1
    },
    max: {
      type: [Number, Boolean],
      default: !1
    },
    disabled: {
      type: Boolean,
      default: !1
    }
  },
  data: () => ({
    currentValue: 1
  }),
  watch: {
    value: {
      immediate: !0,
      handler() {
        this.currentValue = this.value;
      }
    },
    currentValue() {
      if (this.currentValue !== "") {
        if (this.min !== !1 && this.currentValue < this.min) {
          this.currentValue = this.min;
          return;
        }
        this.$emit("input", this.currentValue), this.$emit("change", this.currentValue);
      }
    }
  },
  methods: {
    decrease() {
      this.disabled || this.min !== !1 && this.currentValue <= this.min || this.currentValue--;
    },
    increase() {
      this.disabled || this.max !== !1 && this.currentValue >= this.max || this.currentValue++;
    },
    checkInput(t) {
      return /^[0-9]*$/g.test(t.key) ? !0 : (t.preventDefault(), !1);
    },
    checkIfEmpty() {
      this.currentValue === "" && (this.currentValue = this.min !== !1 ? this.min : 0);
    }
  }
};
var c = function() {
  var e = this, n = e._self._c;
  return n("div", { staticClass: "quantity-selector relative", class: { disabled: e.disabled } }, [n("span", { staticClass: "quantity-btn -minus", on: { click: function(i) {
    return e.decrease();
  } } }, [n("i", { staticClass: "icon icon-minus" })]), n("input", { directives: [{ name: "model", rawName: "v-model.number.lazy", value: e.currentValue, expression: "currentValue", modifiers: { number: !0, lazy: !0 } }], attrs: { type: "text", name: "product-quantity", disabled: e.disabled }, domProps: { value: e.currentValue }, on: { keypress: function(i) {
    return e.checkInput(i);
  }, blur: [function(i) {
    return e.checkIfEmpty();
  }, function(i) {
    return e.$forceUpdate();
  }], change: function(i) {
    e.currentValue = e._n(i.target.value);
  } } }), n("span", { staticClass: "quantity-btn -more", on: { click: function(i) {
    return e.increase();
  } } }, [n("i", { staticClass: "icon icon-more" })])]);
}, o = [], d = /* @__PURE__ */ s(
  l,
  c,
  o
);
const f = d.exports;
function u(t) {
  u.installed || (u.installed = !0, t.component("QuantitySelector", f));
}
const m = {
  install: u
};
let a = null;
typeof window < "u" ? a = window.Vue : typeof global < "u" && (a = global.Vue);
a && a.use(m);
export {
  f as default
};
