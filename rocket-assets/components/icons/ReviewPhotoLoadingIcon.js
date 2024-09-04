function a(e, n, t, m, p, _, w, v) {
  var o = typeof e == "function" ? e.options : e;
  return n && (o.render = n, o.staticRenderFns = t, o._compiled = !0), {
    exports: e,
    options: o
  };
}
const s = {};
var l = function() {
  var n = this, t = n._self._c;
  return t("svg", { attrs: { viewBox: "0 0 96 96", fill: "none", xmlns: "http://www.w3.org/2000/svg" } }, [t("rect", { attrs: { opacity: "0.3", x: "0.5", y: "0.5", width: "94.4545", height: "94.4545", rx: "4.5", fill: "#F5F5F5", stroke: "#666666" } }), t("circle", { attrs: { cx: "48", cy: "48", fill: "none", stroke: "#666666", "stroke-width": "4", r: "17", "stroke-dasharray": "80.11061266653974 28.703537555513243" } }, [t("animateTransform", { attrs: { attributeName: "transform", type: "rotate", repeatCount: "indefinite", dur: "1s", values: "0 48 48;360 48 48", keyTimes: "0;1" } })], 1)]);
}, f = [], c = /* @__PURE__ */ a(
  s,
  l,
  f
);
const d = c.exports;
function r(e) {
  r.installed || (r.installed = !0, e.component("ReviewPhotoLoadingIcon", d));
}
const u = {
  install: r
};
let i = null;
typeof window < "u" ? i = window.Vue : typeof global < "u" && (i = global.Vue);
i && i.use(u);
export {
  d as default
};
