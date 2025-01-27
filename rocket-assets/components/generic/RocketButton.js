function i(n, o, e, p, b, _, g, y) {
  var t = typeof n == "function" ? n.options : n;
  return o && (t.render = o, t.staticRenderFns = e, t._compiled = !0), t.functional = !0, {
    exports: n,
    options: t
  };
}
const u = {
  props: {
    label: {
      type: String,
      required: !0
    },
    customClasses: {
      type: String,
      default: ""
    }
  }
};
var a = function(o, e) {
  return o("button", e._g(e._b({ class: `rocket-button ${e.props.customClasses}` }, "button", e.data.attrs, !1), e.listeners), [e._v(" " + e._s(e.props.label) + " ")]);
}, r = [], f = /* @__PURE__ */ i(
  u,
  a,
  r
);
const c = f.exports;
function l(n) {
  l.installed || (l.installed = !0, n.component("RocketButton", c));
}
const d = {
  install: l
};
let s = null;
typeof window < "u" ? s = window.Vue : typeof global < "u" && (s = global.Vue);
s && s.use(d);
export {
  c as default
};
