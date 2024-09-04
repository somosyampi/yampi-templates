import l from "../vendor/mixins/mobile.js";
function s(e, n, t, p, _, h, w, v) {
  var o = typeof e == "function" ? e.options : e;
  return n && (o.render = n, o.staticRenderFns = t, o._compiled = !0), {
    exports: e,
    options: o
  };
}
const a = {
  name: "ImageInput",
  mixins: {
    mobileMixin: l
  }
};
var f = function() {
  var n = this, t = n._self._c;
  return t("svg", { attrs: { viewBox: "0 0 96 96", fill: "none", xmlns: "http://www.w3.org/2000/svg" } }, [t("rect", { attrs: { x: "0.5", y: "0.5", width: "95", height: "95", rx: "4.5", fill: "#F5F5F5", stroke: "#666666", "stroke-dasharray": "3 3" } }), t("path", { attrs: { d: `M6.8586 4.22456L1.20577 11.8386C0.960834 12.1685 1.19632 12.6366
                    1.60723 12.6366H20.5186C20.8822 12.6366 21.1243 12.2608 20.9738
                    11.9297L16.028 1.04899C15.8655 0.691433 15.3731 0.652266 15.1561
                    0.979634L11.2821 6.82375C11.1108 7.0822 10.748 7.12401 10.5224
                    6.91129L7.60307 4.15882C7.38526 3.95346 7.03705 3.98421 6.8586 4.22456Z`, fill: "#666666", stroke: "#666666", transform: "translate(40,42)" } }), t("circle", { attrs: { cx: "38", cy: "40", r: "2.60227", fill: "#666666", stroke: "#666666" } }), t("rect", { attrs: { x: "30", y: "30", width: "37.23", height: "33.09", rx: "4.5", fill: "", stroke: "#666666", "stroke-dasharray": "3 3" } })]);
}, c = [], d = /* @__PURE__ */ s(
  a,
  f,
  c
);
const u = d.exports;
function r(e) {
  r.installed || (r.installed = !0, e.component("ReviewPhotoIcon", u));
}
const m = {
  install: r
};
let i = null;
typeof window < "u" ? i = window.Vue : typeof global < "u" && (i = global.Vue);
i && i.use(m);
export {
  u as default
};
