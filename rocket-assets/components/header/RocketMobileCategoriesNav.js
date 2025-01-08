function l(t, e, a, n, f, g, C, _) {
  var o = typeof t == "function" ? t.options : t;
  return e && (o.render = e, o.staticRenderFns = a, o._compiled = !0), {
    exports: t,
    options: o
  };
}
const r = {
  name: "RocketMobileCategoriesNav",
  inject: ["mainCategory"],
  data() {
    return {
      isVisible: !1
    };
  },
  computed: {
    mainCategoryData() {
      var t, e;
      return ((e = (t = this.mainCategory) == null ? void 0 : t.children) == null ? void 0 : e.data) || [];
    }
  },
  methods: {
    handleClick() {
      this.isVisible = !1, document.getElementsByClassName("categories-menu h-navigation")[0].classList.remove("mh100"), document.getElementsByClassName("categories-menu h-navigation")[0].classList.remove("mh100");
    },
    handleDrawer() {
      this.isVisible = !0, document.getElementsByClassName("categories-menu h-navigation")[0].classList.add("mh100"), document.getElementsByClassName("categories-menu h-navigation")[0].classList.add("mh100");
    }
  }
};
var c = function() {
  var e = this, a = e._self._c;
  return a("div", { staticClass: "h-anchor-container" }, [e.mainCategoryData.length ? a("rocket-button", e._b({ on: { click: e.handleDrawer } }, "rocket-button", { label: e.mainCategory.name, customClasses: "main-link" }, !1)) : a("rocket-anchor", e._b({}, "rocket-anchor", { label: e.mainCategory.name, href: e.mainCategory.url_path }, !1)), a("transition", { attrs: { name: "nav-drawer-left" } }, [e.isVisible ? a("div", { staticClass: "nav-drawer-content", on: { click: function(n) {
    n.stopPropagation();
  } } }, [a("rocket-button", { attrs: { label: "Voltar", "custom-classes": "--close-btn" }, on: { click: e.handleClick } }), a("div", { staticClass: "selected-category-name" }, [e._v(" " + e._s(e.mainCategory.name) + " ")]), a("hr", { staticClass: "spacer" }), a("rocket-anchor", e._b({}, "rocket-anchor", {
    label: "Todos os produtos",
    customClasses: "--all-products",
    href: e.mainCategory.url_path
  }, !1)), e._l(e.mainCategoryData, function(n) {
    return a("div", { key: n.id, staticClass: "h-category-child" }, [a("rocket-anchor", e._b({}, "rocket-anchor", { label: n.name, href: n.url_path }, !1))], 1);
  })], 2) : e._e()])], 1);
}, m = [], d = /* @__PURE__ */ l(
  r,
  c,
  m
);
const u = d.exports;
function i(t) {
  i.installed || (i.installed = !0, t.component("RocketMobileCategoriesNav", u));
}
const h = {
  install: i
};
let s = null;
typeof window < "u" ? s = window.Vue : typeof global < "u" && (s = global.Vue);
s && s.use(h);
export {
  u as default
};
