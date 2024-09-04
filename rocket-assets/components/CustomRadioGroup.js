function s(t, e, a, i, o, r, k, _) {
  var n = typeof t == "function" ? t.options : t;
  return e && (n.render = e, n.staticRenderFns = a, n._compiled = !0), {
    exports: t,
    options: n
  };
}
const u = {
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
var c = function() {
  var e = this, a = e._self._c;
  return a("div", { staticClass: "custom-radio", attrs: { id: "custom-radio", role: "radiogroup", "aria-labelledby": "group_label" } }, [a("div", { attrs: { id: "group_label" } }, [e._t("title")], 2), a("div", { staticClass: "radio-title" }, [e._t("subtitle")], 2), e._l(e.options, function(i, o) {
    return a("label", { key: i.key, staticClass: "radio-group-item", attrs: { role: "radio", "aria-checked": !!e.isChecked(e.picked, i), tabindex: o }, on: { click: function(r) {
      return e.handlePick(i.value);
    } } }, [e._v(" " + e._s(i.text) + " "), a("input", { directives: [{ name: "model", rawName: "v-model", value: e.picked, expression: "picked" }], attrs: { type: "radio", name: "radio" }, domProps: { value: i.value, checked: e._q(e.picked, i.value) }, on: { change: function(r) {
      e.picked = i.value;
    } } }), a("span", { staticClass: "checkmark", class: e.isChecked(e.picked, i) })]);
  })], 2);
}, p = [], m = /* @__PURE__ */ s(
  u,
  c,
  p
);
const f = m.exports;
function d(t) {
  d.installed || (d.installed = !0, t.component("CustomRadioGroup", f));
}
const v = {
  install: d
};
let l = null;
typeof window < "u" ? l = window.Vue : typeof global < "u" && (l = global.Vue);
l && l.use(v);
export {
  f as default
};
