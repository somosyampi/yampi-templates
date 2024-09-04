function a(t, e, o, m, p, w, _, y) {
  var n = typeof t == "function" ? t.options : t;
  return e && (n.render = e, n.staticRenderFns = o, n._compiled = !0), {
    exports: t,
    options: n
  };
}
const l = {
  name: "Filters",
  props: {
    showBrand: {
      type: Boolean,
      default: !0
    },
    showPrice: {
      type: Boolean,
      default: !0
    },
    showCategories: {
      type: Boolean,
      default: !0
    },
    showPromotions: {
      type: Boolean,
      default: !1
    },
    activeCategory: {
      type: String,
      default: ""
    },
    activePromotion: {
      type: String,
      default: ""
    }
  },
  computed: {
    showCategoryCheckbox() {
      return window.data.context !== "category";
    }
  },
  methods: {
    closeMobileFilters() {
      document.querySelector(".filters-trigger .over-background").dispatchEvent(new Event("mousedown"));
    }
  }
};
var s = function() {
  var e = this, o = e._self._c;
  return o("div", [e.showCategories ? o("FilterCategory", { attrs: { "show-checkbox": e.showCategoryCheckbox, "active-category": e.activeCategory } }) : e._e(), e.showPrice ? o("FilterPrice") : e._e(), e.showBrand ? o("FilterBrand") : e._e(), o("FilterCustom"), e.showPromotions ? o("FilterPromotion", { attrs: { "active-promotion": e.activePromotion } }) : e._e(), o("button", { staticClass: "btn btn-secundary mobile -block", on: { click: e.closeMobileFilters } }, [e._v(" VER PRODUTOS ")])], 1);
}, c = [], d = /* @__PURE__ */ a(
  l,
  s,
  c
);
const u = d.exports;
function i(t) {
  i.installed || (i.installed = !0, t.component("Filters", u));
}
const f = {
  install: i
};
let r = null;
typeof window < "u" ? r = window.Vue : typeof global < "u" && (r = global.Vue);
r && r.use(f);
export {
  u as default
};
