import v from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/components/category/filters/BaseFilter.js";
function y(n, t, a, i, s, f, d, p) {
  var e = typeof n == "function" ? n.options : n;
  t && (e.render = t, e.staticRenderFns = a, e._compiled = !0), i && (e.functional = !0), f && (e._scopeId = "data-v-" + f);
  var o;
  if (d ? (o = function(r) {
    r = r || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !r && typeof __VUE_SSR_CONTEXT__ < "u" && (r = __VUE_SSR_CONTEXT__), s && s.call(this, r), r && r._registeredComponents && r._registeredComponents.add(d);
  }, e._ssrRegister = o) : s && (o = p ? function() {
    s.call(
      this,
      (e.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : s), o)
    if (e.functional) {
      e._injectStyles = o;
      var h = e.render;
      e.render = function(m, c) {
        return o.call(c), h(m, c);
      };
    } else {
      var _ = e.beforeCreate;
      e.beforeCreate = _ ? [].concat(_, o) : [o];
    }
  return {
    exports: n,
    options: e
  };
}
const C = {
  name: "FilterBrand",
  extends: v,
  props: {
    allBrands: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    route: "brands",
    mainQueryString: "brand_id"
  }),
  computed: {
    currentPayload() {
      const n = this.shouldUseNewSearchStrategy ? this.allBrands : this.payload;
      return this.processQueryParams(n);
    }
  },
  mounted() {
    !this.shouldUseNewSearchStrategy || (this.mainQueryString = "brand_name");
  }
};
var g = function() {
  var t = this, a = t._self._c;
  return a("div", { staticClass: "filter filter-brand" }, [a("div", { staticClass: "-title" }, [t._v(" Marca ")]), a("ul", t._l(t.currentPayload, function(i) {
    return a("li", { key: i.id, staticClass: "filter-option" }, [a("CustomCheckbox", { attrs: { text: i.name, checked: i.active }, on: { change: function(s) {
      return t.updateFilterStatus(i, s);
    } }, scopedSlots: t._u([{ key: "count", fn: function() {
      return [i.count ? a("span", [t._v(t._s(`(${i.count})`))]) : t._e()];
    }, proxy: !0 }], null, !0) })], 1);
  }), 0)]);
}, S = [], w = /* @__PURE__ */ y(
  C,
  g,
  S,
  !1,
  null,
  null,
  null,
  null
);
const $ = w.exports;
function u(n) {
  u.installed || (u.installed = !0, n.component("FilterBrand", $));
}
const F = {
  install: u
};
let l = null;
typeof window < "u" ? l = window.Vue : typeof global < "u" && (l = global.Vue);
l && l.use(F);
export {
  $ as default
};
