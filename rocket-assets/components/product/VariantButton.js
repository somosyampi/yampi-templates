function b(t, e, o, i, r, d, f, v) {
  var n = typeof t == "function" ? t.options : t;
  e && (n.render = e, n.staticRenderFns = o, n._compiled = !0), i && (n.functional = !0), d && (n._scopeId = "data-v-" + d);
  var l;
  if (f ? (l = function(a) {
    a = a || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !a && typeof __VUE_SSR_CONTEXT__ < "u" && (a = __VUE_SSR_CONTEXT__), r && r.call(this, a), a && a._registeredComponents && a._registeredComponents.add(f);
  }, n._ssrRegister = l) : r && (l = v ? function() {
    r.call(
      this,
      (n.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : r), l)
    if (n.functional) {
      n._injectStyles = l;
      var h = n.render;
      n.render = function(p, c) {
        return l.call(c), h(p, c);
      };
    } else {
      var _ = n.beforeCreate;
      n.beforeCreate = _ ? [].concat(_, l) : [l];
    }
  return {
    exports: t,
    options: n
  };
}
const m = {
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
    value(t) {
      t === 0 && (this.selectedValue = null);
    }
  },
  methods: {
    handleClick(t, e) {
      this.selectedValue = e, this.$emit("change", e);
    }
  }
};
var C = function() {
  var e = this, o = e._self._c;
  return o("div", { staticClass: "holder-variant-button", class: {
    error: e.error && !e.selectedValue,
    disabled: e.disabled
  } }, e._l(e.options, function(i) {
    return o("button", { key: i.id, staticClass: "variant-button", class: {
      selected: i.id === e.value,
      unavailable: i.unavailable
    }, on: { click: function(r) {
      return e.handleClick(r, i.id);
    } } }, [e._v(" " + e._s(i.value) + " ")]);
  }), 0);
}, V = [], $ = /* @__PURE__ */ b(
  m,
  C,
  V,
  !1,
  null,
  null,
  null,
  null
);
const y = $.exports;
function u(t) {
  u.installed || (u.installed = !0, t.component("VariantButton", y));
}
const g = {
  install: u
};
let s = null;
typeof window < "u" ? s = window.Vue : typeof global < "u" && (s = global.Vue);
s && s.use(g);
export {
  y as default
};
