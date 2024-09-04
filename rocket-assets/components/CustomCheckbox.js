function u(c, e, a, d, n, l, r, i) {
  var t = typeof c == "function" ? c.options : c;
  return e && (t.render = e, t.staticRenderFns = a, t._compiled = !0), {
    exports: c,
    options: t
  };
}
const f = {
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
  watch: {
    checked: {
      immediate: !0,
      handler() {
        this.checkedState = this.checked;
      }
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
  methods: {
    change() {
      this.$emit("change", this.checkedState);
    }
  }
};
var h = function() {
  var e = this, a = e._self._c;
  return a("div", { staticClass: "custom-checkbox relative" }, [a("label", { class: { "with-effect": e.color || e.image } }, [e._v(" " + e._s(e.text) + " "), a("input", { directives: [{ name: "model", rawName: "v-model", value: e.checkedState, expression: "checkedState" }], attrs: { type: "checkbox" }, domProps: { checked: Array.isArray(e.checkedState) ? e._i(e.checkedState, null) > -1 : e.checkedState }, on: { change: [function(d) {
    var n = e.checkedState, l = d.target, r = !!l.checked;
    if (Array.isArray(n)) {
      var i = null, t = e._i(n, i);
      l.checked ? t < 0 && (e.checkedState = n.concat([i])) : t > -1 && (e.checkedState = n.slice(0, t).concat(n.slice(t + 1)));
    } else
      e.checkedState = r;
  }, e.change] } }), e.color || e.image ? a("span", { staticClass: "effect-box", style: e.effectBoxStyle }) : e._e(), a("span", { staticClass: "checkmark" })])]);
}, m = [], k = /* @__PURE__ */ u(
  f,
  h,
  m
);
const p = k.exports;
function s(c) {
  s.installed || (s.installed = !0, c.component("CustomCheckbox", p));
}
const g = {
  install: s
};
let o = null;
typeof window < "u" ? o = window.Vue : typeof global < "u" && (o = global.Vue);
o && o.use(g);
export {
  p as default
};
