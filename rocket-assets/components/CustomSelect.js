import { mapGetters as u } from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/vuex.js";
function d(t, e, r, i, s, l, c, g) {
  var n = typeof t == "function" ? t.options : t;
  return e && (n.render = e, n.staticRenderFns = r, n._compiled = !0), {
    exports: t,
    options: n
  };
}
const f = {
  name: "CustomSelect",
  props: {
    value: {
      type: [String, Number],
      default: ""
    },
    iconUrl: {
      type: String,
      default: null
    },
    error: {
      type: Boolean,
      default: !1
    }
  },
  data: () => ({
    selectedValue: null,
    internalError: !1
  }),
  computed: {
    ...u("preview", ["isPreview"]),
    selectType() {
      return this.iconUrl ? "custom-select-image-prefix relative" : "custom-select relative";
    }
  },
  watch: {
    value: {
      immediate: !0,
      handler() {
        this.selectedValue = this.value;
      }
    }
  },
  methods: {
    change() {
      this.isPreview || (this.validateInternal(), this.$emit("change", this.selectedValue));
    },
    validateInternal() {
      if (!this.selectedValue) {
        this.internalError = !0;
        return;
      }
      this.internalError = !1;
    }
  }
};
var m = function() {
  var e = this, r = e._self._c;
  return r("div", { class: e.selectType }, [e.iconUrl ? r("img", { staticClass: "icon svg-brand", class: { "-error": e.error || e.internalError }, attrs: { src: e.iconUrl } }) : e._e(), r("select", e._b({ directives: [{ name: "model", rawName: "v-model", value: e.selectedValue, expression: "selectedValue" }], ref: "standardSelect", class: { error: e.error || e.internalError }, on: { change: [function(i) {
    var s = Array.prototype.filter.call(i.target.options, function(l) {
      return l.selected;
    }).map(function(l) {
      var c = "_value" in l ? l._value : l.value;
      return c;
    });
    e.selectedValue = i.target.multiple ? s : s[0];
  }, e.change] } }, "select", e.$attrs, !1), [e._t("default")], 2), r("SelectArrow", { staticClass: "icon icon-select-arrow", class: { "-error": e.error || e.internalError } })], 1);
}, p = [], v = /* @__PURE__ */ d(
  f,
  m,
  p
);
const _ = v.exports;
function o(t) {
  o.installed || (o.installed = !0, t.component("CustomSelect", _));
}
const h = {
  install: o
};
let a = null;
typeof window < "u" ? a = window.Vue : typeof global < "u" && (a = global.Vue);
a && a.use(h);
export {
  _ as default
};
