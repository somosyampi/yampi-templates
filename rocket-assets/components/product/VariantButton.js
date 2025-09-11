function b(t, e, r, l, s, d, f, v) {
  var n = typeof t == "function" ? t.options : t;
  e && (n.render = e, n.staticRenderFns = r, n._compiled = !0), l && (n.functional = !0), d && (n._scopeId = "data-v-" + d);
  var i;
  if (f ? (i = function(a) {
    a = a || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !a && typeof __VUE_SSR_CONTEXT__ < "u" && (a = __VUE_SSR_CONTEXT__), s && s.call(this, a), a && a._registeredComponents && a._registeredComponents.add(f);
  }, n._ssrRegister = i) : s && (i = v ? function() {
    s.call(
      this,
      (n.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : s), i)
    if (n.functional) {
      n._injectStyles = i;
      var h = n.render;
      n.render = function(p, _) {
        return i.call(_), h(p, _);
      };
    } else {
      var c = n.beforeCreate;
      n.beforeCreate = c ? [].concat(c, i) : [i];
    }
  return {
    exports: t,
    options: n
  };
}
const C = {
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
var m = function() {
  var e = this, r = e._self._c;
  return r("div", { staticClass: "holder-variant-button", class: {
    error: e.error && !e.selectedValue,
    disabled: e.disabled
  } }, e._l(e.options, function(l) {
    return r("button", { key: l.id, staticClass: "variant-button", class: {
      selected: l.id === e.value,
      unavailable: l.unavailable
    }, on: { click: function(s) {
      return e.handleClick(s, l.id);
    } } }, [l.unavailable ? r("IconEdit", { staticClass: "unavailable-icon" }) : e._e(), r("p", { staticClass: "text" }, [e._v(" " + e._s(l.value) + " ")])], 1);
  }), 0);
}, V = [], $ = /* @__PURE__ */ b(
  C,
  m,
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
let o = null;
typeof window < "u" ? o = window.Vue : typeof global < "u" && (o = global.Vue);
o && o.use(g);
export {
  y as default
};
