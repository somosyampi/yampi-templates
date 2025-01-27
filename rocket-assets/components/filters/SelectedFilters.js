import { mapGetters as c, mapActions as l } from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/vuex.js";
import m from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/mixins/queryParams.js";
function u(e, t, n, i, a, y, h, g) {
  var o = typeof e == "function" ? e.options : e;
  return t && (o.render = t, o.staticRenderFns = n, o._compiled = !0), {
    exports: e,
    options: o
  };
}
const d = {
  name: "SelectedFilters",
  mixins: [
    m
  ],
  computed: {
    ...c("filters", [
      "activeFilters"
    ])
  },
  methods: {
    ...l("filters", [
      "removeActiveFilter"
    ]),
    ...l("queryParams", [
      "setQueryParams"
    ]),
    removeFilter(e) {
      this.setQueryParams({ ...e.query, page: 1 }), this.removeActiveFilter(e);
    }
  }
};
var f = function() {
  var t = this, n = t._self._c;
  return t.activeFilters.length ? n("div", { staticClass: "selected-filters" }, t._l(t.activeFilters, function(i) {
    return n("div", { key: i.alias, staticClass: "selected-filter", domProps: { textContent: t._s(i.name) }, on: { click: function(a) {
      return t.removeFilter(i);
    } } });
  }), 0) : t._e();
}, p = [], v = /* @__PURE__ */ u(
  d,
  f,
  p
);
const _ = v.exports;
function s(e) {
  s.installed || (s.installed = !0, e.component("SelectedFilters", _));
}
const F = {
  install: s
};
let r = null;
typeof window < "u" ? r = window.Vue : typeof global < "u" && (r = global.Vue);
r && r.use(F);
export {
  _ as default
};
