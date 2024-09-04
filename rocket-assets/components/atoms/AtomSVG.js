function s(t, o, e, c, g, h, w, m) {
  var n = typeof t == "function" ? t.options : t;
  return o && (n.render = o, n.staticRenderFns = e, n._compiled = !0), n.functional = !0, {
    exports: t,
    options: n
  };
}
const l = {
  name: "AtomSVG",
  props: {
    width: {
      type: String,
      required: !0
    },
    height: {
      type: String,
      required: !0
    },
    fill: {
      type: String,
      required: !0
    },
    customClass: {
      type: String,
      default: ""
    }
  }
};
var u = function(o, e) {
  return o("svg", { class: `rkt-svg ${e.props.customClass}`, attrs: { xmlns: "http://www.w3.org/2000/svg", width: e.props.width, height: e.props.heigth, viewBox: `0 0 ${e.props.width} ${e.props.height}`, fill: e.props.fill } }, [e._t("default")], 2);
}, p = [], d = /* @__PURE__ */ s(
  l,
  u,
  p
);
const a = d.exports;
function r(t) {
  r.installed || (r.installed = !0, t.component("AtomSVG", a));
}
const f = {
  install: r
};
let i = null;
typeof window < "u" ? i = window.Vue : typeof global < "u" && (i = global.Vue);
i && i.use(f);
export {
  a as default
};
