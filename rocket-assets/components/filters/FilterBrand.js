import s from "https://s3.amazonaws.com/codigo-aberto-sandbox-assets/yampi-templates-sandbox/rocket-assets/components/filters/BaseFilter.js";
function c(t, e, n, i, r, v, y, F) {
  var o = typeof t == "function" ? t.options : t;
  return e && (o.render = e, o.staticRenderFns = n, o._compiled = !0), {
    exports: t,
    options: o
  };
}
const d = {
  name: "FilterBrand",
  extends: s,
  data: () => ({
    route: "brands",
    mainQueryString: "brand_id"
  })
};
var u = function() {
  var e = this, n = e._self._c;
  return n("div", { staticClass: "filter filter-brand" }, [n("div", { staticClass: "-title" }, [e._v("Marca")]), n("ul", e._l(e.payload, function(i) {
    return n("li", { key: i.id, staticClass: "filter-option" }, [n("custom-checkbox", { attrs: { text: i.name, checked: i.active }, on: { change: function(r) {
      return e.updateFilterStatus(i, r);
    } } })], 1);
  }), 0)]);
}, f = [], _ = /* @__PURE__ */ c(
  d,
  u,
  f
);
const m = _.exports;
function l(t) {
  l.installed || (l.installed = !0, t.component("FilterBrand", m));
}
const p = {
  install: l
};
let a = null;
typeof window < "u" ? a = window.Vue : typeof global < "u" && (a = global.Vue);
a && a.use(p);
export {
  m as default
};