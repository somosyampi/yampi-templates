import s from "s3.amazonaws.com/codigo-aberto-sandbox-assets/rocket/assets/rocket-preview/components/filters/BaseFilter.js";
function c(t, e, n, o, r, v, y, g) {
  var i = typeof t == "function" ? t.options : t;
  return e && (i.render = e, i.staticRenderFns = n, i._compiled = !0), {
    exports: t,
    options: i
  };
}
const u = {
  name: "FilterPromotion",
  extends: s,
  props: {
    activePromotion: {
      type: String,
      default: ""
    }
  },
  data: () => ({
    route: "promotions",
    mainQueryString: "promotion_id"
  })
};
var d = function() {
  var e = this, n = e._self._c;
  return e.payload.length ? n("div", { staticClass: "filter filter-category" }, [n("div", { staticClass: "-title" }, [e._v(" Promoções ")]), n("ul", e._l(e.payload, function(o) {
    return n("li", { key: o.id, staticClass: "filter-option" }, [n("custom-checkbox", { attrs: { text: o.name, checked: o.active }, on: { change: function(r) {
      return e.updateFilterStatus(o, r);
    } } })], 1);
  }), 0)]) : e._e();
}, f = [], m = /* @__PURE__ */ c(
  u,
  d,
  f
);
const _ = m.exports;
function l(t) {
  l.installed || (l.installed = !0, t.component("Promotion", _));
}
const p = {
  install: l
};
let a = null;
typeof window < "u" ? a = window.Vue : typeof global < "u" && (a = global.Vue);
a && a.use(p);
export {
  _ as default
};
