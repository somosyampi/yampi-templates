import n from "http://rocket.test/dist/vendor/mixins/mobile.js";
function r(i, e, t, _, f, m, h, g) {
  var o = typeof i == "function" ? i.options : i;
  return e && (o.render = e, o.staticRenderFns = t, o._compiled = !0), {
    exports: i,
    options: o
  };
}
const l = {
  name: "CategoryOptions",
  mixins: [
    n
  ],
  props: {
    isMosaic: {
      type: Boolean,
      required: !0
    },
    showSort: {
      type: Boolean,
      required: !0
    },
    showFilters: {
      type: Boolean,
      required: !0
    },
    selectedOrder: {
      type: String,
      default: "relevance"
    }
  },
  mounted() {
  },
  data: () => ({}),
  methods: {
    updateOrderBy(i) {
      this.$emit("change", i);
    },
    updateGrid() {
      this.$emit("change-grid", !this.isMosaic);
    }
  }
};
var c = function() {
  var e = this, t = e._self._c;
  return e.isMobile ? t("div", { staticClass: "category-options flex" }, [e.showSort ? t("div", { staticClass: "holder-sort flex -vcenter -hcenter" }, [t("i", { staticClass: "icon icon-order" }), t("custom-select", { tag: "select", attrs: { id: "category-order-select", name: "category-order", value: e.selectedOrder }, on: { change: e.updateOrderBy } }, [t("option", { attrs: { selected: "", value: "relevance" } }, [e._v("Relevância")]), t("option", { attrs: { value: "best_sellers" } }, [e._v("Mais vendidos")]), t("option", { attrs: { value: "highest_price" } }, [e._v("Maior preço")]), t("option", { attrs: { value: "lowest_price" } }, [e._v("Menor preço")]), t("option", { attrs: { value: "newest" } }, [e._v("Lançamentos")]), t("option", { attrs: { value: "rating" } }, [e._v("Melhor avaliação")]), t("option", { attrs: { value: "name_asc" } }, [e._v("A-Z")]), t("option", { attrs: { value: "name_desc" } }, [e._v("Z-A")])])], 1) : e._e(), t("div", { staticClass: "holder-grid-type flex -vcenter -hcenter", on: { click: e.updateGrid } }, [t("i", { staticClass: "icon", class: {
    "icon-mosaic": !e.isMosaic,
    "icon-list": e.isMosaic
  } }), t("span", [e._v(e._s(e.isMosaic ? "Lista" : "Mosaico"))])]), e.showFilters ? t("side-bar-trigger", { staticClass: "flex -vcenter -hcenter", attrs: { "active-class": "active-filters", name: "filters" } }, [t("i", { staticClass: "icon icon-filters" }), t("span", [e._v("Filtrar")])]) : e._e()], 1) : e._e();
}, d = [], u = /* @__PURE__ */ r(
  l,
  c,
  d
);
const p = u.exports;
function a(i) {
  a.installed || (a.installed = !0, i.component("CategoryOptions", p));
}
const v = {
  install: a
};
let s = null;
typeof window < "u" ? s = window.Vue : typeof global < "u" && (s = global.Vue);
s && s.use(v);
export {
  p as default
};
