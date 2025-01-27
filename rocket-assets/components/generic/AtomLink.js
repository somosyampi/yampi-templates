function l(e, o, n, c, _, m, y, g) {
  var t = typeof e == "function" ? e.options : e;
  return o && (t.render = o, t.staticRenderFns = n, t._compiled = !0), t.functional = !0, {
    exports: e,
    options: t
  };
}
const u = {
  name: "AtomLink",
  props: {
    title: {
      type: String,
      required: !0
    },
    href: {
      type: String,
      required: !0
    },
    label: {
      type: String,
      required: !0
    }
  }
};
var a = function(o, n) {
  return o("a", { staticClass: "rkt-link", attrs: { title: n.props.title, href: n.props.href } }, [n._v(" " + n._s(n.props.label) + " ")]);
}, s = [], f = /* @__PURE__ */ l(
  u,
  a,
  s
);
const d = f.exports;
function r(e) {
  r.installed || (r.installed = !0, e.component("AtomLink", d));
}
const p = {
  install: r
};
let i = null;
typeof window < "u" ? i = window.Vue : typeof global < "u" && (i = global.Vue);
i && i.use(p);
export {
  d as default
};
