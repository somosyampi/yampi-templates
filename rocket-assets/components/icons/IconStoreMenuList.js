function l(e, n, i, m, z, p, h, M) {
  var c = typeof e == "function" ? e.options : e;
  return n && (c.render = n, c.staticRenderFns = i, c._compiled = !0), c.functional = !0, {
    exports: e,
    options: c
  };
}
const a = {};
var u = function(n, i) {
  return n("g", [n("path", { attrs: { d: "M1.51 9.927c0 .367-.311.688-.72.688-.408 0-.72-.321-.72-.688 0-.39.312-.688.72-.688.409 0 .72.298.72.688zm11.9-.688H4.185c-.408 0-.72.298-.72.688 0 .367.312.688.72.688h9.225c.408 0 .72-.321.72-.688 0-.39-.312-.688-.72-.688zM.79 4.655c-.408 0-.72.298-.72.688 0 .366.312.687.72.687.409 0 .72-.32.72-.687 0-.39-.311-.688-.72-.688zm12.62 0H4.185c-.408 0-.72.298-.72.688 0 .366.312.687.72.687h9.225c.408 0 .72-.32.72-.687 0-.39-.312-.688-.72-.688zM.79.07C.383.07.07.368.07.758c0 .367.312.688.72.688.409 0 .72-.321.72-.688C1.51.368 1.2.07.79.07zm3.395 1.376h9.225c.408 0 .72-.321.72-.688 0-.39-.312-.688-.72-.688H4.185c-.408 0-.72.298-.72.688 0 .367.312.688.72.688z" } }), n("path", { attrs: { "clip-rule": "evenodd", d: "M0 .758C0 .326.347 0 .79 0c.444 0 .79.326.79.758 0 .407-.344.758-.79.758-.445 0-.79-.35-.79-.758zM.79.141C.418.14.14.41.14.758c0 .326.28.617.65.617.371 0 .65-.29.65-.617C1.44.41 1.163.141.79.141zm2.605.617c0-.432.346-.758.79-.758h9.225c.443 0 .79.326.79.758 0 .407-.345.758-.79.758H4.185c-.445 0-.79-.35-.79-.758zm.79-.617c-.372 0-.65.27-.65.617 0 .326.28.617.65.617h9.225c.37 0 .65-.29.65-.617 0-.348-.278-.617-.65-.617H4.185zM0 5.343c0-.432.347-.758.79-.758.444 0 .79.326.79.758 0 .407-.344.758-.79.758C.345 6.1 0 5.75 0 5.343zm.79-.618c-.372 0-.65.27-.65.618 0 .326.28.617.65.617.371 0 .65-.291.65-.617 0-.348-.277-.618-.65-.618zm2.605.618c0-.432.346-.758.79-.758h9.225c.443 0 .79.326.79.758 0 .407-.345.758-.79.758H4.185c-.445 0-.79-.351-.79-.758zm.79-.618c-.372 0-.65.27-.65.618 0 .326.28.617.65.617h9.225c.37 0 .65-.291.65-.617 0-.348-.278-.618-.65-.618H4.185zM.79 9.31c-.372 0-.65.27-.65.617 0 .327.28.618.65.618.371 0 .65-.291.65-.618 0-.348-.277-.617-.65-.617zM0 9.927c0-.431.347-.758.79-.758.444 0 .79.327.79.758 0 .407-.344.758-.79.758-.445 0-.79-.35-.79-.758zm3.395 0c0-.431.346-.758.79-.758h9.225c.443 0 .79.327.79.758 0 .407-.345.758-.79.758H4.185c-.445 0-.79-.35-.79-.758zm.79-.617c-.372 0-.65.27-.65.617 0 .327.28.618.65.618h9.225c.37 0 .65-.291.65-.618 0-.348-.278-.617-.65-.617H4.185z" } })]);
}, d = [], r = /* @__PURE__ */ l(
  a,
  u,
  d
);
const f = r.exports;
function o(e) {
  o.installed || (o.installed = !0, e.component("IconStoreMenuList", f));
}
const s = {
  install: o
};
let t = null;
typeof window < "u" ? t = window.Vue : typeof global < "u" && (t = global.Vue);
t && t.use(s);
export {
  f as default
};
