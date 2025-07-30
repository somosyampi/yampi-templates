import p from "https://codigo-aberto-sandbox-assets.yampi.io.s3.amazonaws.com/yampi-templates-sandbox/rocket-assets/components/category/filters/BaseFilter.js";
function C(a, e, t, r, i, l, f, m) {
  var n = typeof a == "function" ? a.options : a;
  e && (n.render = e, n.staticRenderFns = t, n._compiled = !0), r && (n.functional = !0), l && (n._scopeId = "data-v-" + l);
  var o;
  if (f ? (o = function(s) {
    s = s || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !s && typeof __VUE_SSR_CONTEXT__ < "u" && (s = __VUE_SSR_CONTEXT__), i && i.call(this, s), s && s._registeredComponents && s._registeredComponents.add(f);
  }, n._ssrRegister = o) : i && (o = m ? function() {
    i.call(
      this,
      (n.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : i), o)
    if (n.functional) {
      n._injectStyles = o;
      var v = n.render;
      n.render = function(h, _) {
        return o.call(_), v(h, _);
      };
    } else {
      var c = n.beforeCreate;
      n.beforeCreate = c ? [].concat(c, o) : [o];
    }
  return {
    exports: a,
    options: n
  };
}
const g = {
  name: "FilterCustom",
  extends: p,
  data: () => ({
    route: "filters",
    mainQueryString: "filter_id"
  }),
  methods: {
    parsePayload(a) {
      return a.map((e) => ({
        ...e,
        id: this.$randomString(),
        values: e.values.data.map((t) => ({
          ...t,
          active: this.queryParams.filter_id.includes(t.id)
        }))
      }));
    },
    parseFilterStatuses(a) {
      a.forEach((e) => e.values.forEach((t) => this.checkFilterStatus(t, !1)));
    },
    filterRemoved(a) {
      this.payload.some((e) => {
        const t = e.values.find((r) => r.id === a.id);
        return t ? (t.active = !1, !0) : !1;
      });
    }
  }
};
var y = function() {
  var e = this, t = e._self._c;
  return t("div", { staticClass: "filter" }, e._l(e.payload, function(r) {
    return t("div", { key: r.id, staticClass: "filter filter-generic" }, [t("div", { staticClass: "-title", domProps: { textContent: e._s(r.name) } }), t("ul", e._l(r.values, function(i) {
      return t("li", { key: i.id, staticClass: "filter-option" }, [t("CustomCheckbox", { attrs: { text: i.name, color: i.color, image: i.image_url, checked: i.active }, on: { change: function(l) {
        return e.updateFilterStatus(i, l);
      } } })], 1);
    }), 0)]);
  }), 0);
}, F = [], R = /* @__PURE__ */ C(
  g,
  y,
  F,
  !1,
  null,
  null,
  null,
  null
);
const S = R.exports;
function d(a) {
  d.installed || (d.installed = !0, a.component("FilterCustom", S));
}
const $ = {
  install: d
};
let u = null;
typeof window < "u" ? u = window.Vue : typeof global < "u" && (u = global.Vue);
u && u.use($);
export {
  S as default
};
