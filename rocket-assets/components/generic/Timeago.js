function l(e, n, i, p, _, m, g, v) {
  var t = typeof e == "function" ? e.options : e;
  return n && (t.render = n, t.staticRenderFns = i, t._compiled = !0), {
    exports: e,
    options: t
  };
}
const r = {
  name: "Timeago",
  props: {
    date: {
      type: [Date, String],
      required: !0
    },
    prefix: {
      type: String,
      default: ""
    }
  }
};
var s = function() {
  var n = this, i = n._self._c;
  return i("span", [n._v(n._s(new Date(n.date.replace(/\s+/g, "T")).toLocaleDateString("pt-BR")))]);
}, d = [], f = /* @__PURE__ */ l(
  r,
  s,
  d
);
const u = f.exports;
function a(e) {
  a.installed || (a.installed = !0, e.component("Timeago", u));
}
const c = {
  install: a
};
let o = null;
typeof window < "u" ? o = window.Vue : typeof global < "u" && (o = global.Vue);
o && o.use(c);
export {
  u as default
};
