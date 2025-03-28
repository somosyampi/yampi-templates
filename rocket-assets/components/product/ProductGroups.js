import h from "https://s3.amazonaws.com/codigo-aberto-sandbox-assets/yampi-templates-sandbox/rocket-assets/components/product/BaseProduct.js";
function g(o, n, a, s, r, d, f, v) {
  var e = typeof o == "function" ? o.options : o;
  n && (e.render = n, e.staticRenderFns = a, e._compiled = !0), s && (e.functional = !0), d && (e._scopeId = "data-v-" + d);
  var t;
  if (f ? (t = function(i) {
    i = i || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !i && typeof __VUE_SSR_CONTEXT__ < "u" && (i = __VUE_SSR_CONTEXT__), r && r.call(this, i), i && i._registeredComponents && i._registeredComponents.add(f);
  }, e._ssrRegister = t) : r && (t = v ? function() {
    r.call(
      this,
      (e.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : r), t)
    if (e.functional) {
      e._injectStyles = t;
      var p = e.render;
      e.render = function(m, c) {
        return t.call(c), p(m, c);
      };
    } else {
      var _ = e.beforeCreate;
      e.beforeCreate = _ ? [].concat(_, t) : [t];
    }
  return {
    exports: o,
    options: e
  };
}
const C = {
  name: "ProductGroups",
  extends: h,
  data: () => ({
    route: "groups"
  })
};
var b = function() {
  var n = this, a = n._self._c;
  return n.payload.length || n.loading ? a("div", { directives: [{ name: "observe-visibility", rawName: "v-observe-visibility", value: {
    callback: n.visibilityChanged,
    once: !0
  }, expression: `{
        callback: visibilityChanged,
        once: true,
    }` }], staticClass: "main-product-group" }, [a("div", { staticClass: "-title", class: { "-loading": n.loading } }, [n._v(" Outras op\xE7\xF5es ")]), a("ul", { staticClass: "inline" }, n._l(n.payload, function(s) {
    return a("li", { key: s.id }, [a("a", { attrs: { href: s.url_path } }, [a("CustomImage", { staticClass: "-loading", attrs: { src: s.images.data[0].url, alt: s.name, thumbor: { resize: "60x60" } } })], 1)]);
  }), 0)]) : n._e();
}, y = [], w = /* @__PURE__ */ g(
  C,
  b,
  y,
  !1,
  null,
  null,
  null,
  null
);
const R = w.exports;
function u(o) {
  u.installed || (u.installed = !0, o.component("ProductGroups", R));
}
const $ = {
  install: u
};
let l = null;
typeof window < "u" ? l = window.Vue : typeof global < "u" && (l = global.Vue);
l && l.use($);
export {
  R as default
};
