import { mapActions as a } from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/vuex.js";
function s(o, e, t, p, y, w, _, h) {
  var n = typeof o == "function" ? o.options : o;
  return e && (n.render = e, n.staticRenderFns = t, n._compiled = !0), {
    exports: o,
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
  data() {
    return {
      mounted: !1
    };
  },
  computed: {
    showCategoryCheckbox() {
      return window.data.context !== "category";
    }
  },
  async mounted() {
    await this.bootQueryParams(), this.mounted = !0;
  },
  methods: {
    ...a("filters", [
      "bootQueryParams"
    ]),
    closeMobileFilters() {
      document.querySelector(".filters-trigger .over-background").dispatchEvent(new Event("mousedown"));
    }
  }
};
var c = function() {
  var e = this, t = e._self._c;
  return e.mounted ? t("div", [e.showCategories ? t("FilterCategory", { attrs: { "show-checkbox": e.showCategoryCheckbox, "active-category": e.activeCategory } }) : e._e(), e.showPrice ? t("FilterPrice") : e._e(), e.showBrand ? t("FilterBrand") : e._e(), t("FilterCustom"), e.showPromotions ? t("FilterPromotion", { attrs: { "active-promotion": e.activePromotion } }) : e._e(), t("button", { staticClass: "btn btn-secundary mobile -block", on: { click: e.closeMobileFilters } }, [e._v(" VER PRODUTOS ")])], 1) : e._e();
}, u = [], d = /* @__PURE__ */ s(
  l,
  c,
  u
);
const f = d.exports;
function i(o) {
  i.installed || (i.installed = !0, o.component("Filters", f));
}
const m = {
  install: i
};
let r = null;
typeof window < "u" ? r = window.Vue : typeof global < "u" && (r = global.Vue);
r && r.use(m);
export {
  f as default
};