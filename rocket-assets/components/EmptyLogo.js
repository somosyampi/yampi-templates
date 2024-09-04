function r(e, t, n, p, m, _, y, g) {
  var o = typeof e == "function" ? e.options : e;
  return t && (o.render = t, o.staticRenderFns = n, o._compiled = !0), {
    exports: e,
    options: o
  };
}
const a = {
  name: "EmptyLogo",
  props: {
    storeName: {
      type: String,
      required: !0
    }
  },
  computed: {
    fontSize() {
      const e = Math.round(37.8 - 1.3 * this.storeName.length);
      return e < 17 ? 17 : e;
    }
  }
};
var l = function() {
  var t = this, n = t._self._c;
  return n("div", { ref: "emptyLogo", staticClass: "empty-logo", style: `font-size: ${t.fontSize}px` }, [n("a", { staticClass: "-clean", attrs: { href: "/" } }, [t._v(" " + t._s(t.storeName) + " ")])]);
}, f = [], u = /* @__PURE__ */ r(
  a,
  l,
  f
);
const d = u.exports;
function s(e) {
  s.installed || (s.installed = !0, e.component("EmptyLogo", d));
}
const c = {
  install: s
};
let i = null;
typeof window < "u" ? i = window.Vue : typeof global < "u" && (i = global.Vue);
i && i.use(c);
export {
  d as default
};
