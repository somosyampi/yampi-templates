import { uuidv4 as u } from "https://s3.amazonaws.com/codigo-aberto-sandbox-assets/rocket/assets/rocket-preview/vendor/mixins/helpers.js";
function c(e, t, n, o, r, a, y, h) {
  var i = typeof e == "function" ? e.options : e;
  return t && (i.render = t, i.staticRenderFns = n, i._compiled = !0), {
    exports: e,
    options: i
  };
}
const d = {
  name: "Stepper",
  props: {
    active: {
      type: Number,
      required: !0
    },
    items: {
      type: Array,
      required: !0
    }
  },
  methods: {
    uuidv4: u,
    calculateKey(e) {
      return e.id || this.uuidv4();
    },
    stepClass(e) {
      return this.items.indexOf(e) <= this.active ? "active" : "";
    },
    handleClick(e) {
      this.$emit("click", e);
    }
  }
};
var p = function() {
  var t = this, n = t._self._c;
  return n("div", { staticClass: "stepper-container" }, [n("ul", { staticClass: "progressbar" }, t._l(t.items, function(o, r) {
    return n("li", { key: t.calculateKey(o), class: t.stepClass(o), on: { click: function(a) {
      return t.handleClick(r);
    } } }, [n("p", [t._v(t._s(r + 1))])]);
  }), 0)]);
}, f = [], m = /* @__PURE__ */ c(
  d,
  p,
  f
);
const _ = m.exports;
function l(e) {
  l.installed || (l.installed = !0, e.component("Stepper", _));
}
const v = {
  install: l
};
let s = null;
typeof window < "u" ? s = window.Vue : typeof global < "u" && (s = global.Vue);
s && s.use(v);
export {
  _ as default
};
