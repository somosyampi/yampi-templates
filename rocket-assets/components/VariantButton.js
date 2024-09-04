function u(n, e, l, t, s, p, m, b) {
  var a = typeof n == "function" ? n.options : n;
  return e && (a.render = e, a.staticRenderFns = l, a._compiled = !0), {
    exports: n,
    options: a
  };
}
const d = {
  name: "VariantButton",
  props: {
    options: {
      type: void 0,
      default: () => []
    },
    value: {
      type: Number,
      default: 0
    },
    error: {
      type: Boolean
    },
    disabled: {
      type: Boolean,
      default: !1
    }
  },
  data() {
    return {
      selectedValue: null
    };
  },
  watch: {
    value(n) {
      n === 0 && (this.selectedValue = null);
    }
  },
  methods: {
    handleClick(n, e) {
      this.selectedValue = e, this.$emit("change", e);
    }
  }
};
var r = function() {
  var e = this, l = e._self._c;
  return l("div", { staticClass: "holder-variant-button", class: {
    error: e.error && !e.selectedValue,
    disabled: e.disabled
  } }, e._l(e.options, function(t) {
    return l("button", { key: t.id, staticClass: "variant-button", class: {
      selected: t.id === e.value,
      unavailable: t.unavailable
    }, on: { click: function(s) {
      return e.handleClick(s, t.id);
    } } }, [e._v(" " + e._s(t.value) + " ")]);
  }), 0);
}, c = [], f = /* @__PURE__ */ u(
  d,
  r,
  c
);
const _ = f.exports;
function o(n) {
  o.installed || (o.installed = !0, n.component("VariantButton", _));
}
const v = {
  install: o
};
let i = null;
typeof window < "u" ? i = window.Vue : typeof global < "u" && (i = global.Vue);
i && i.use(v);
export {
  _ as default
};
