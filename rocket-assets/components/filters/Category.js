import r from "../components/filters/BaseFilter";
function c(o, e, t, n, s, h, v, C) {
  var a = typeof o == "function" ? o.options : o;
  return e && (a.render = e, a.staticRenderFns = t, a._compiled = !0), {
    exports: o,
    options: a
  };
}
const u = {
  name: "FilterCategory",
  extends: r,
  props: {
    showCheckbox: {
      type: Boolean,
      default: !0
    },
    activeCategory: {
      type: String,
      default: ""
    }
  },
  data: () => ({
    route: "categories",
    mainQueryString: "category_id"
  })
};
var d = function() {
  var e = this, t = e._self._c;
  return e.payload.length ? t("div", { staticClass: "filter filter-category" }, [t("div", { staticClass: "-title" }, [e._v("Categorias")]), t("ul", { class: { "-category": !e.showCheckbox } }, e._l(e.payload, function(n) {
    return t("li", { key: n.id, class: { "filter-option": e.showCheckbox } }, [e.showCheckbox ? t("custom-checkbox", { attrs: { text: n.name, checked: n.active }, on: { change: function(s) {
      return e.updateFilterStatus(n, s);
    } } }) : t("a", { class: { active: n.name === e.activeCategory }, attrs: { href: n.url_path }, domProps: { textContent: e._s(n.name) } })], 1);
  }), 0)]) : e._e();
}, f = [], p = /* @__PURE__ */ c(
  u,
  d,
  f
);
const _ = p.exports;
function l(o) {
  l.installed || (l.installed = !0, o.component("Category", _));
}
const m = {
  install: l
};
let i = null;
typeof window < "u" ? i = window.Vue : typeof global < "u" && (i = global.Vue);
i && i.use(m);
export {
  _ as default
};
