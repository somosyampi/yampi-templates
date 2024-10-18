import u from "https://s3.amazonaws.com/codigo-aberto-sandbox-assets/rocket/assets/rocket-preview/components/filters/BaseFilter.js";
function d(n, e, t, i, a, r, h, y) {
  var s = typeof n == "function" ? n.options : n;
  return e && (s.render = e, s.staticRenderFns = t, s._compiled = !0), {
    exports: n,
    options: s
  };
}
const c = {
  name: "FilterCustom",
  extends: u,
  data: () => ({
    route: "filters",
    mainQueryString: "filter_id"
  }),
  methods: {
    parsePayload(n) {
      return n.map((e) => ({
        ...e,
        id: this.$randomString(),
        values: e.values.data.map((t) => ({
          ...t,
          active: this.queryParams.filter_id.includes(t.id)
        }))
      }));
    },
    parseFilterStatuses(n) {
      n.forEach(
        (e) => e.values.forEach((t) => this.checkFilterStatus(t, !1))
      );
    },
    filterRemoved(n) {
      this.payload.some((e) => {
        const t = e.values.find((i) => i.id === n.id);
        if (t)
          return t.active = !1, !0;
      });
    }
  }
};
var f = function() {
  var e = this, t = e._self._c;
  return t("div", { staticClass: "filter" }, e._l(e.payload, function(i) {
    return t("div", { key: i.id, staticClass: "filter filter-generic" }, [t("div", { staticClass: "-title", domProps: { textContent: e._s(i.name) } }), t("ul", e._l(i.values, function(a) {
      return t("li", { key: a.id, staticClass: "filter-option" }, [t("custom-checkbox", { attrs: { text: a.name, color: a.color, image: a.image_url, checked: a.active }, on: { change: function(r) {
        return e.updateFilterStatus(a, r);
      } } })], 1);
    }), 0)]);
  }), 0);
}, m = [], _ = /* @__PURE__ */ d(
  c,
  f,
  m
);
const v = _.exports;
function l(n) {
  l.installed || (l.installed = !0, n.component("Custom", v));
}
const p = {
  install: l
};
let o = null;
typeof window < "u" ? o = window.Vue : typeof global < "u" && (o = global.Vue);
o && o.use(p);
export {
  v as default
};
