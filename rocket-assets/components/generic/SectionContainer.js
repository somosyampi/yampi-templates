function c(n, t, i, p, _, m, b, g) {
  var e = typeof n == "function" ? n.options : n;
  return t && (e.render = t, e.staticRenderFns = i, e._compiled = !0), {
    exports: n,
    options: e
  };
}
const r = {
  name: "SectionContainer",
  props: [
    "widthSection",
    "contentAlignment",
    "backgroundColor",
    "buttonColor",
    "textColor",
    "titleText",
    "descriptionText"
  ]
};
var a = function() {
  var t = this, i = t._self._c;
  return i("div", { class: `section-container section-width--${t.widthSection} align-content--${t.contentAlignment}`, style: `--background-color: ${t.backgroundColor}; --button-color: ${t.buttonColor}; --text-color: ${t.textColor}; ` }, [t._t("default", null, { titleText: t.titleText, descriptionText: t.descriptionText })], 2);
}, d = [], s = /* @__PURE__ */ c(
  r,
  a,
  d
);
const u = s.exports;
function l(n) {
  l.installed || (l.installed = !0, n.component("SectionContainer", u));
}
const f = {
  install: l
};
let o = null;
typeof window < "u" ? o = window.Vue : typeof global < "u" && (o = global.Vue);
o && o.use(f);
export {
  u as default
};
