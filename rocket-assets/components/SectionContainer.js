function l(e, n, i, f, p, m, b, g) {
  var t = typeof e == "function" ? e.options : e;
  return n && (t.render = n, t.staticRenderFns = i, t._compiled = !0), {
    exports: e,
    options: t
  };
}
const r = {
  name: "SectionContainer",
  inject: ["params"]
};
var c = function() {
  var n = this, i = n._self._c;
  return i("div", { class: `section-container section-width--${n.params.width_section} align-content--${n.params.content_alignment}`, style: `--background-color: ${n.params.background_color}; --button-color: ${n.params.button_color}; --text-color: ${n.params.text_color}; ` }, [n._t("default", null, { titleText: n.params.title_text, descriptionText: n.params.description_text })], 2);
}, s = [], d = /* @__PURE__ */ l(
  r,
  c,
  s
);
const u = d.exports;
function a(e) {
  a.installed || (a.installed = !0, e.component("SectionContainer", u));
}
const _ = {
  install: a
};
let o = null;
typeof window < "u" ? o = window.Vue : typeof global < "u" && (o = global.Vue);
o && o.use(_);
export {
  u as default
};
