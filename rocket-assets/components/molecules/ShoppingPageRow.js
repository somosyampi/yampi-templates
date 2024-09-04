function r(e, n, i, f, m, _, g, w) {
  var t = typeof e == "function" ? e.options : e;
  return n && (t.render = n, t.staticRenderFns = i, t._compiled = !0), t.functional = !0, {
    exports: e,
    options: t
  };
}
const l = {
  name: "ShoppingPageRow",
  props: {
    redirectTo: {
      type: String,
      required: !0
    }
  }
};
var s = function(n, i) {
  return n("div", { staticClass: "rkt-link-container-row" }, [n("atom-link", { staticClass: "shopping-cart-link", attrs: { label: "Minhas compras", href: i.props.redirectTo, title: "Ir para minhas compras" } })], 1);
}, p = [], c = /* @__PURE__ */ r(
  l,
  s,
  p
);
const u = c.exports;
function a(e) {
  a.installed || (a.installed = !0, e.component("ShoppingPageRow", u));
}
const d = {
  install: a
};
let o = null;
typeof window < "u" ? o = window.Vue : typeof global < "u" && (o = global.Vue);
o && o.use(d);
export {
  u as default
};
