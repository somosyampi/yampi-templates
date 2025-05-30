function v(n, e, a, r, s, c, f, m) {
  var t = typeof n == "function" ? n.options : n;
  e && (t.render = e, t.staticRenderFns = a, t._compiled = !0), r && (t.functional = !0), c && (t._scopeId = "data-v-" + c);
  var u;
  if (f ? (u = function(i) {
    i = i || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !i && typeof __VUE_SSR_CONTEXT__ < "u" && (i = __VUE_SSR_CONTEXT__), s && s.call(this, i), i && i._registeredComponents && i._registeredComponents.add(f);
  }, t._ssrRegister = u) : s && (u = m ? function() {
    s.call(
      this,
      (t.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : s), u)
    if (t.functional) {
      t._injectStyles = u;
      var p = t.render;
      t.render = function(_, h) {
        return u.call(h), p(_, h);
      };
    } else {
      var d = t.beforeCreate;
      t.beforeCreate = d ? [].concat(d, u) : [u];
    }
  return {
    exports: n,
    options: t
  };
}
const V = {
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
    checkInput(n) {
      return /^[0-9]*$/g.test(n.key) ? !0 : (n.preventDefault(), !1);
    },
    checkIfEmpty() {
      this.currentValue === "" && (this.currentValue = this.min !== !1 ? this.min : 0);
    }
  }
};
var b = function() {
  var e = this, a = e._self._c;
  return a("div", { staticClass: "quantity-selector relative", class: { disabled: e.disabled } }, [a("span", { staticClass: "quantity-btn -minus", on: { click: function(r) {
    return e.decrease();
  } } }, [a("i", { staticClass: "icon icon-minus" })]), a("input", { directives: [{ name: "model", rawName: "v-model.number.lazy", value: e.currentValue, expression: "currentValue", modifiers: { number: !0, lazy: !0 } }], attrs: { type: "text", name: "product-quantity", disabled: e.disabled }, domProps: { value: e.currentValue }, on: { keypress: function(r) {
    return e.checkInput(r);
  }, blur: [function(r) {
    return e.checkIfEmpty();
  }, function(r) {
    return e.$forceUpdate();
  }], change: function(r) {
    e.currentValue = e._n(r.target.value);
  } } }), a("span", { staticClass: "quantity-btn -more", on: { click: function(r) {
    return e.increase();
  } } }, [a("i", { staticClass: "icon icon-more" })])]);
}, y = [], C = /* @__PURE__ */ v(
  V,
  b,
  y,
  !1,
  null,
  null,
  null,
  null
);
const $ = C.exports;
function o(n) {
  o.installed || (o.installed = !0, n.component("QuantitySelector", $));
}
const g = {
  install: o
};
let l = null;
typeof window < "u" ? l = window.Vue : typeof global < "u" && (l = global.Vue);
l && l.use(g);
export {
  $ as default
};
