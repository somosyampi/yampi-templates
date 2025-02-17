function a(t, o, e, c, g, y, _, b) {
  var n = typeof t == "function" ? t.options : t;
  return o && (n.render = o, n.staticRenderFns = e, n._compiled = !0), n.functional = !0, {
    exports: t,
    options: n
  };
}
const s = {
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
    },
    targetType: {
      type: String,
      default: "_self",
      validator: (t) => [
        "_self",
        "_blank",
        "_parent",
        "_top"
      ].includes(t)
    }
  }
};
var i = function(o, e) {
  return o("a", e._g(e._b({ ref: e.props.customRef, class: `rocket-anchor ${e.props.customClasses}`, attrs: { href: e.props.href, target: e.props.targetType } }, "a", e.data.attrs, !1), e.listeners), [e._v(" " + e._s(e.props.label) + " "), e._t("default")], 2);
}, u = [], f = /* @__PURE__ */ a(
  s,
  i,
  u
);
const p = f.exports;
function r(t) {
  r.installed || (r.installed = !0, t.component("RocketAnchor", p));
}
const d = {
  install: r
};
let l = null;
typeof window < "u" ? l = window.Vue : typeof global < "u" && (l = global.Vue);
l && l.use(d);
export {
  p as default
};
