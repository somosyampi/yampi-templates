function m(t, e, r, a, o, s, c, _) {
  var i = typeof t == "function" ? t.options : t;
  e && (i.render = e, i.staticRenderFns = r, i._compiled = !0), a && (i.functional = !0), s && (i._scopeId = "data-v-" + s);
  var l;
  if (c ? (l = function(n) {
    n = n || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !n && typeof __VUE_SSR_CONTEXT__ < "u" && (n = __VUE_SSR_CONTEXT__), o && o.call(this, n), n && n._registeredComponents && n._registeredComponents.add(c);
  }, i._ssrRegister = l) : o && (l = _ ? function() {
    o.call(
      this,
      (i.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : o), l)
    if (i.functional) {
      i._injectStyles = l;
      var v = i.render;
      i.render = function(h, p) {
        return l.call(p), v(h, p);
      };
    } else {
      var f = i.beforeCreate;
      i.beforeCreate = f ? [].concat(f, l) : [l];
    }
  return {
    exports: t,
    options: i
  };
}
const k = {
  name: "CustomRadioGroup",
  props: {
    name: {
      type: String,
      default: ""
    },
    options: {
      type: Array,
      required: !0,
      validator: (t) => !!t.length
    },
    initialValue: {
      type: Boolean,
      required: !0
    },
    value: {
      type: Boolean,
      required: !1
    }
  },
  data: () => ({
    picked: ""
  }),
  mounted() {
    this.picked = this.initialValue;
  },
  updated() {
    this.picked = this.value;
  },
  methods: {
    isChecked(t, e) {
      return t === e.value ? "checked" : "";
    },
    handlePick(t) {
      this.$emit("pick", t);
    }
  }
};
var C = function() {
  var e = this, r = e._self._c;
  return r("div", { staticClass: "custom-radio", attrs: { id: "custom-radio", role: "radiogroup", "aria-labelledby": "group_label" } }, [r("div", { attrs: { id: "group_label" } }, [e._t("title")], 2), r("div", { staticClass: "radio-title" }, [e._t("subtitle")], 2), e._l(e.options, function(a, o) {
    return r("label", { key: a.key, staticClass: "radio-group-item", attrs: { role: "radio", "aria-checked": !!e.isChecked(e.picked, a), tabindex: o }, on: { click: function(s) {
      return e.handlePick(a.value);
    } } }, [e._v(" " + e._s(a.text) + " "), r("input", { directives: [{ name: "model", rawName: "v-model", value: e.picked, expression: "picked" }], attrs: { type: "radio", name: "radio" }, domProps: { value: a.value, checked: e._q(e.picked, a.value) }, on: { change: function(s) {
      e.picked = a.value;
    } } }), r("span", { staticClass: "checkmark", class: e.isChecked(e.picked, a) })]);
  })], 2);
}, b = [], g = /* @__PURE__ */ m(
  k,
  C,
  b,
  !1,
  null,
  null,
  null,
  null
);
const y = g.exports;
function u(t) {
  u.installed || (u.installed = !0, t.component("CustomRadioGroup", y));
}
const $ = {
  install: u
};
let d = null;
typeof window < "u" ? d = window.Vue : typeof global < "u" && (d = global.Vue);
d && d.use($);
export {
  y as default
};
