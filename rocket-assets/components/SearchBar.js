import { mapGetters as i } from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/vuex.js";
function c(a, e, t, r, f, _, v, g) {
  var n = typeof a == "function" ? a.options : a;
  return e && (n.render = e, n.staticRenderFns = t, n._compiled = !0), {
    exports: a,
    options: n
  };
}
const u = {
  name: "SearchBar",
  data: () => ({
    productName: ""
  }),
  computed: {
    ...i("header", [
      "showSearchBar"
    ])
  },
  mounted() {
    this.parseQueryString();
  },
  methods: {
    search() {
      this.productName.length && this.$redirectTo(this.$applyQueriesToUrl(
        `${this.$baseUrl}/busca`,
        { q: this.productName }
      ));
    },
    parseQueryString() {
      this.productName = new URLSearchParams(window.location.search).get("q") || "";
    }
  }
};
var d = function() {
  var e = this, t = e._self._c;
  return t("transition", { attrs: { name: "fadeHeight" } }, [e.showSearchBar ? t("div", [t("form", { staticClass: "search-bar", attrs: { id: "product-search", role: "search", action: "/busca" }, on: { submit: function(r) {
    return r.preventDefault(), e.search.apply(null, arguments);
  } } }, [t("label", { staticClass: "-hide", attrs: { for: "product-name" } }, [e._v("Busca")]), t("input", { directives: [{ name: "model", rawName: "v-model", value: e.productName, expression: "productName" }], attrs: { id: "product-name", type: "text", name: "product-name", placeholder: "Buscar produto" }, domProps: { value: e.productName }, on: { input: function(r) {
    r.target.composing || (e.productName = r.target.value);
  } } }), t("span", { staticClass: "search-btn", on: { click: e.search } }, [t("i", { staticClass: "icon icon-search" })])])]) : e._e()]);
}, l = [], p = /* @__PURE__ */ c(
  u,
  d,
  l
);
const m = p.exports;
function s(a) {
  s.installed || (s.installed = !0, a.component("SearchBar", m));
}
const h = {
  install: s
};
let o = null;
typeof window < "u" ? o = window.Vue : typeof global < "u" && (o = global.Vue);
o && o.use(h);
export {
  m as default
};
