function r(t, o, e, p, g, y, b, h) {
  var n = typeof t == "function" ? t.options : t;
  return o && (n.render = o, n.staticRenderFns = e, n._compiled = !0), n.functional = !0, {
    exports: t,
    options: n
  };
}
const a = {
  props: {
    href: {
      type: String,
      default: null
    },
    label: {
      type: String,
      required: !0
    },
    customClasses: {
      type: String,
      default: ""
    },
    customRef: {
      type: String,
      default: null
    }
  }
};
var u = function(o, e) {
  return o("a", e._g(e._b({ ref: e.props.customRef, class: `rocket-anchor ${e.props.customClasses}`, attrs: { href: e.props.href } }, "a", e.data.attrs, !1), e.listeners), [e._v(" " + e._s(e.props.label) + " "), e._t("default")], 2);
}, i = [], f = /* @__PURE__ */ r(
  a,
  u,
  i
);
const c = f.exports;
function s(t) {
  s.installed || (s.installed = !0, t.component("RocketAnchor", c));
}
const d = {
  install: s
};
let l = null;
typeof window < "u" ? l = window.Vue : typeof global < "u" && (l = global.Vue);
l && l.use(d);
export {
  c as default
};
