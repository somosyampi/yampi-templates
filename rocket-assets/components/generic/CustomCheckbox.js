function k(c, e, o, f, a, l, s, r) {
  var t = typeof c == "function" ? c.options : c;
  e && (t.render = e, t.staticRenderFns = o, t._compiled = !0), f && (t.functional = !0), l && (t._scopeId = "data-v-" + l);
  var i;
  if (s ? (i = function(n) {
    n = n || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !n && typeof __VUE_SSR_CONTEXT__ < "u" && (n = __VUE_SSR_CONTEXT__), a && a.call(this, n), n && n._registeredComponents && n._registeredComponents.add(s);
  }, t._ssrRegister = i) : a && (i = r ? function() {
    a.call(
      this,
      (t.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : a), i)
    if (t.functional) {
      t._injectStyles = i;
      var m = t.render;
      t.render = function(p, _) {
        return i.call(_), m(p, _);
      };
    } else {
      var h = t.beforeCreate;
      t.beforeCreate = h ? [].concat(h, i) : [i];
    }
  return {
    exports: c,
    options: t
  };
}
const g = {
  name: "CustomCheckbox",
  props: {
    name: {
      type: String,
      default: ""
    },
    id: {
      type: String,
      default: ""
    },
    text: {
      type: String,
      default: ""
    },
    checked: {
      type: Boolean,
      default: !1
    },
    color: {
      type: String,
      default: null
    },
    image: {
      type: String,
      default: null
    }
  },
  data: () => ({
    checkedState: !1
  }),
  computed: {
    effectBoxStyle() {
      return {
        backgroundImage: this.image ? `url(${this.image})` : null,
        backgroundColor: this.color
      };
    }
  },
  watch: {
    checked: {
      immediate: !0,
      handler() {
        this.checkedState = this.checked;
      }
    }
  },
  methods: {
    change() {
      this.$emit("change", this.checkedState);
    }
  }
};
var v = function() {
  var e = this, o = e._self._c;
  return o("div", { staticClass: "custom-checkbox relative" }, [o("label", { class: { "with-effect": e.color || e.image } }, [e._v(" " + e._s(e.text) + " "), o("span", { staticClass: "item-count" }, [e._t("count")], 2), o("input", { directives: [{ name: "model", rawName: "v-model", value: e.checkedState, expression: "checkedState" }], attrs: { type: "checkbox" }, domProps: { checked: Array.isArray(e.checkedState) ? e._i(e.checkedState, null) > -1 : e.checkedState }, on: { change: [function(f) {
    var a = e.checkedState, l = f.target, s = !!l.checked;
    if (Array.isArray(a)) {
      var r = null, t = e._i(a, r);
      l.checked ? t < 0 && (e.checkedState = a.concat([r])) : t > -1 && (e.checkedState = a.slice(0, t).concat(a.slice(t + 1)));
    } else
      e.checkedState = s;
  }, e.change] } }), e.color || e.image ? o("span", { staticClass: "effect-box", style: e.effectBoxStyle }) : e._e(), o("span", { staticClass: "checkmark" })])]);
}, S = [], C = /* @__PURE__ */ k(
  g,
  v,
  S,
  !1,
  null,
  null,
  null,
  null
);
const y = C.exports;
function u(c) {
  u.installed || (u.installed = !0, c.component("CustomCheckbox", y));
}
const b = {
  install: u
};
let d = null;
typeof window < "u" ? d = window.Vue : typeof global < "u" && (d = global.Vue);
d && d.use(b);
export {
  y as default
};
