function u(n, e, t, _, p, m, v, g) {
  var o = typeof n == "function" ? n.options : n;
  return e && (o.render = e, o.staticRenderFns = t, o._compiled = !0), {
    exports: n,
    options: o
  };
}
const l = {
  name: "DiscountTag",
  props: {
    value: {
      type: Number,
      default: 0
    }
  },
  computed: {
    formattedValue() {
      return Math.round(this.value);
    }
  }
};
var s = function() {
  var e = this, t = e._self._c;
  return e.value > 0 ? t("div", { staticClass: "discount-tag" }, [t("span", [e._v(e._s(e.formattedValue))])]) : e._e();
}, d = [], r = /* @__PURE__ */ u(
  l,
  s,
  d
);
const f = r.exports;
function i(n) {
  i.installed || (i.installed = !0, n.component("DiscountTag", f));
}
const c = {
  install: i
};
let a = null;
typeof window < "u" ? a = window.Vue : typeof global < "u" && (a = global.Vue);
a && a.use(c);
export {
  f as default
};
