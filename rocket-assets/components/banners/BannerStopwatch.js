function s(n, t, e, p, _, m, w, h) {
  var o = typeof n == "function" ? n.options : n;
  return t && (o.render = t, o.staticRenderFns = e, o._compiled = !0), {
    exports: n,
    options: o
  };
}
const c = {
  name: "BannerStopwatch"
};
var l = function() {
  var t = this, e = t._self._c;
  return e("div", { staticClass: "banner-stopwatch-holder flex -vcenter" }, [e("i", { staticClass: "icon icon-stopwatch" }), e("Stopwatch", { staticClass: "banner-stopwatch" })], 1);
}, r = [], f = /* @__PURE__ */ s(
  c,
  l,
  r
);
const d = f.exports;
function i(n) {
  i.installed || (i.installed = !0, n.component("BannerStopwatch", d));
}
const u = {
  install: i
};
let a = null;
typeof window < "u" ? a = window.Vue : typeof global < "u" && (a = global.Vue);
a && a.use(u);
export {
  d as default
};
