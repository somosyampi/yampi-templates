function s(e, t, n, _, p, C, w, m) {
  var o = typeof e == "function" ? e.options : e;
  return t && (o.render = t, o.staticRenderFns = n, o._compiled = !0), {
    exports: e,
    options: o
  };
}
const a = {};
var r = function() {
  var t = this, n = t._self._c;
  return n("svg", { attrs: { width: "11", height: "6", viewBox: "0 0 11 6", xmlns: "http://www.w3.org/2000/svg" } }, [n("path", { attrs: { d: "M4.87843 5.72727C5.24207 6.09091 5.72692 6.09091 6.09056 5.72727C7.18147 4.63636 9.24207 2.57576 10.333 1.48485C10.6966 1.12121 10.6966 0.636364 10.333 0.272728C9.96935 -0.0909089 9.4845 -0.0909089 9.12086 0.272727C8.02995 1.36364 5.96934 3.42424 4.87843 4.51515C4.5148 4.87879 4.5148 5.36364 4.87843 5.72727Z" } }), n("path", { attrs: { d: "M6.09056 5.72727C6.45419 5.36364 6.45419 4.87879 6.09055 4.51515C4.99965 3.42424 2.93904 1.36364 1.84813 0.272727C1.48449 -0.0909091 0.999645 -0.0909091 0.636009 0.272727C0.272372 0.636364 0.272372 1.12121 0.636009 1.48485C1.72692 2.57576 3.78753 4.63636 4.87843 5.72727C5.24207 6.09091 5.72692 6.09091 6.09056 5.72727Z" } })]);
}, d = [], f = /* @__PURE__ */ s(
  a,
  r,
  d
);
const u = f.exports;
function l(e) {
  l.installed || (l.installed = !0, e.component("SelectArrow", u));
}
const c = {
  install: l
};
let i = null;
typeof window < "u" ? i = window.Vue : typeof global < "u" && (i = global.Vue);
i && i.use(c);
export {
  u as default
};
