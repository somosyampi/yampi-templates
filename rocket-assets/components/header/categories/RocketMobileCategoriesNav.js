function g(n, e, t, i, l, d, u, h) {
  var a = typeof n == "function" ? n.options : n;
  e && (a.render = e, a.staticRenderFns = t, a._compiled = !0), i && (a.functional = !0), d && (a._scopeId = "data-v-" + d);
  var s;
  if (u ? (s = function(o) {
    o = o || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !o && typeof __VUE_SSR_CONTEXT__ < "u" && (o = __VUE_SSR_CONTEXT__), l && l.call(this, o), o && o._registeredComponents && o._registeredComponents.add(u);
  }, a._ssrRegister = s) : l && (s = h ? function() {
    l.call(
      this,
      (a.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : l), s)
    if (a.functional) {
      a._injectStyles = s;
      var _ = a.render;
      a.render = function(C, f) {
        return s.call(f), _(C, f);
      };
    } else {
      var m = a.beforeCreate;
      a.beforeCreate = m ? [].concat(m, s) : [s];
    }
  return {
    exports: n,
    options: a
  };
}
const v = {
  name: "RocketMobileCategoriesNav",
  inject: ["mainCategory"],
  data() {
    return {
      isVisible: !1
    };
  },
  computed: {
    mainCategoryData() {
      var n, e;
      return ((e = (n = this.mainCategory) == null ? void 0 : n.children) == null ? void 0 : e.data) || [];
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
var p = function() {
  var e = this, t = e._self._c;
  return t("div", { staticClass: "h-anchor-container" }, [e.mainCategoryData.length ? t("RocketButton", e._b({ on: { click: e.handleDrawer } }, "RocketButton", { label: e.mainCategory.name, customClasses: "main-link" }, !1)) : t("RocketAnchor", e._b({}, "RocketAnchor", { label: e.mainCategory.name, href: e.mainCategory.url_path }, !1)), t("Transition", { attrs: { name: "nav-drawer-left" } }, [e.isVisible ? t("div", { staticClass: "nav-drawer-content", on: { click: function(i) {
    i.stopPropagation();
  } } }, [t("RocketButton", { attrs: { label: "Voltar", "custom-classes": "--close-btn" }, on: { click: e.handleClick } }), t("div", { staticClass: "selected-category-name" }, [e._v(" " + e._s(e.mainCategory.name) + " ")]), t("hr", { staticClass: "spacer" }), t("RocketAnchor", e._b({}, "RocketAnchor", {
    label: "Todos os produtos",
    customClasses: "--all-products",
    href: e.mainCategory.url_path
  }, !1)), e._l(e.mainCategoryData, function(i) {
    return t("div", { key: i.id, staticClass: "h-category-child" }, [t("RocketAnchor", e._b({}, "RocketAnchor", { label: i.name, href: i.url_path }, !1))], 1);
  })], 2) : e._e()])], 1);
}, b = [], k = /* @__PURE__ */ g(
  v,
  p,
  b,
  !1,
  null,
  null,
  null,
  null
);
const y = k.exports;
function c(n) {
  c.installed || (c.installed = !0, n.component("RocketMobileCategoriesNav", y));
}
const R = {
  install: c
};
let r = null;
typeof window < "u" ? r = window.Vue : typeof global < "u" && (r = global.Vue);
r && r.use(R);
export {
  y as default
};
