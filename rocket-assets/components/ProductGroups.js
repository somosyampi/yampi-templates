import l from "../components/product/BaseProduct";
function r(t, e, n, i, _, v, g, b) {
  var a = typeof t == "function" ? t.options : t;
  return e && (a.render = e, a.staticRenderFns = n, a._compiled = !0), {
    exports: t,
    options: a
  };
}
const u = {
  name: "ProductGroups",
  extends: l,
  data: () => ({
    route: "groups"
  })
};
var d = function() {
  var e = this, n = e._self._c;
  return e.payload.length || e.loading ? n("div", { directives: [{ name: "observe-visibility", rawName: "v-observe-visibility", value: {
    callback: e.visibilityChanged,
    once: !0
  }, expression: `{
        callback: visibilityChanged,
        once: true,
    }` }], staticClass: "main-product-group" }, [n("div", { staticClass: "-title", class: { "-loading": e.loading } }, [e._v(" Outras opções ")]), n("ul", { staticClass: "inline" }, e._l(e.payload, function(i) {
    return n("li", { key: i.id }, [n("a", { attrs: { href: i.url_path } }, [n("CustomImage", { staticClass: "-loading", attrs: { src: i.images.data[0].url, alt: i.name, thumbor: { resize: "60x60" } } })], 1)]);
  }), 0)]) : e._e();
}, c = [], f = /* @__PURE__ */ r(
  u,
  d,
  c
);
const m = f.exports;
function s(t) {
  s.installed || (s.installed = !0, t.component("ProductGroups", m));
}
const p = {
  install: s
};
let o = null;
typeof window < "u" ? o = window.Vue : typeof global < "u" && (o = global.Vue);
o && o.use(p);
export {
  m as default
};
