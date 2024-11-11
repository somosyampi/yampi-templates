(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode(".masonry-container[data-v-656b38fd]{display:grid;max-width:740px;grid-template-columns:repeat(2,1fr);grid-gap:32px;margin:0 auto;grid-auto-rows:0px}@media screen and (max-width: 1220px){.masonry-container[data-v-656b38fd]{max-width:538px;display:flex;flex-flow:column nowrap;grid-gap:0}.masonry-container .holder-review[data-v-656b38fd]{max-width:100%;margin-top:32px}}@media screen and (max-width: 700px){.masonry-container[data-v-656b38fd]{grid-gap:0;max-width:unset}.masonry-container .holder-review[data-v-656b38fd]{margin-top:0}}.masonry-container .header[data-v-656b38fd]{grid-area:1/1/4/3;border:none;display:flex;align-items:flex-end;justify-content:flex-end;grid-row-end:span 2}@media screen and (max-width: 700px){.masonry-container .header[data-v-656b38fd]{display:block}}@media screen and (max-width: 700px){.masonry-container .header .select-order[data-v-656b38fd]{display:flex;justify-content:space-between;margin-top:51px}}@media screen and (max-width: 700px){.masonry-container .header .select-order .custom-select[data-v-656b38fd]{flex-grow:2}}.masonry-container .header .select-order .-title[data-v-656b38fd]{color:var(--black-medium);font-size:var(--font-12)}")),document.head.appendChild(e)}}catch(a){console.error("vite-plugin-css-injected-by-js",a)}})();
function s(e, n, o, m, p, l, v, y) {
  var t = typeof e == "function" ? e.options : e;
  return n && (t.render = n, t.staticRenderFns = o, t._compiled = !0), t._scopeId = "data-v-" + l, {
    exports: e,
    options: t
  };
}
const d = {
  name: "MansonryLayout"
};
var f = function() {
  var n = this, o = n._self._c;
  return o("div", { staticClass: "masonry-container" }, [o("div", { staticClass: "header" }, [n._t("header")], 2), n._t("default")], 2);
}, r = [], u = /* @__PURE__ */ s(
  d,
  f,
  r,
  !1,
  null,
  "656b38fd"
);
const c = u.exports;
function i(e) {
  i.installed || (i.installed = !0, e.component("MasonryLayout", c));
}
const _ = {
  install: i
};
let a = null;
typeof window < "u" ? a = window.Vue : typeof global < "u" && (a = global.Vue);
a && a.use(_);
export {
  c as default
};
