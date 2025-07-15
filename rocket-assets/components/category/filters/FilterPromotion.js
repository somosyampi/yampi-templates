import h from "https://codigo-aberto-production-assets.yampi.io/yampi-templates-main/rocket-assets/components/category/filters/BaseFilter.js";
function C(o, n, r, l, a, u, d, p) {
  var e = typeof o == "function" ? o.options : o;
  n && (e.render = n, e.staticRenderFns = r, e._compiled = !0), l && (e.functional = !0), u && (e._scopeId = "data-v-" + u);
  var i;
  if (d ? (i = function(t) {
    t = t || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !t && typeof __VUE_SSR_CONTEXT__ < "u" && (t = __VUE_SSR_CONTEXT__), a && a.call(this, t), t && t._registeredComponents && t._registeredComponents.add(d);
  }, e._ssrRegister = i) : a && (i = p ? function() {
    a.call(
      this,
      (e.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : a), i)
    if (e.functional) {
      e._injectStyles = i;
      var v = e.render;
      e.render = function(m, c) {
        return i.call(c), v(m, c);
      };
    } else {
      var _ = e.beforeCreate;
      e.beforeCreate = _ ? [].concat(_, i) : [i];
    }
  return {
    exports: o,
    options: e
  };
}
const g = {
  name: "FilterPromotion",
  extends: h,
  props: {
    activePromotion: {
      type: String,
      default: ""
    }
  },
  data: () => ({
    route: "promotions",
    mainQueryString: "promotion_id"
  })
};
var y = function() {
  var n = this, r = n._self._c;
  return n.payload.length ? r("div", { staticClass: "filter filter-category" }, [r("div", { staticClass: "-title" }, [n._v(" Promo\xE7\xF5es ")]), r("ul", n._l(n.payload, function(l) {
    return r("li", { key: l.id, staticClass: "filter-option" }, [r("CustomCheckbox", { attrs: { text: l.name, checked: l.active }, on: { change: function(a) {
      return n.updateFilterStatus(l, a);
    } } })], 1);
  }), 0)]) : n._e();
}, b = [], F = /* @__PURE__ */ C(
  g,
  y,
  b,
  !1,
  null,
  null,
  null,
  null
);
const R = F.exports;
function f(o) {
  f.installed || (f.installed = !0, o.component("FilterPromotion", R));
}
const $ = {
  install: f
};
let s = null;
typeof window < "u" ? s = window.Vue : typeof global < "u" && (s = global.Vue);
s && s.use($);
export {
  R as default
};
