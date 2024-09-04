function r(t, e, i, _, p, m, v, x) {
  var n = typeof t == "function" ? t.options : t;
  return e && (n.render = e, n.staticRenderFns = i, n._compiled = !0), {
    exports: t,
    options: n
  };
}
const s = {
  props: {
    text: {
      type: String,
      default: ""
    }
  }
};
var a = function() {
  var e = this, i = e._self._c;
  return e.text ? i("div", { staticClass: "error-text", domProps: { textContent: e._s(e.text) } }) : e._e();
}, d = [], f = /* @__PURE__ */ r(
  s,
  a,
  d
);
const u = f.exports;
function l(t) {
  l.installed || (l.installed = !0, t.component("ErrorText", u));
}
const c = {
  install: l
};
let o = null;
typeof window < "u" ? o = window.Vue : typeof global < "u" && (o = global.Vue);
o && o.use(c);
export {
  u as default
};
