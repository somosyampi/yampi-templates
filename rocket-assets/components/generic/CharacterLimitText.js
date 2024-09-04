function l(t, e, r, m, _, p, h, v) {
  var n = typeof t == "function" ? t.options : t;
  return e && (n.render = e, n.staticRenderFns = r, n._compiled = !0), {
    exports: t,
    options: n
  };
}
const a = {
  name: "CharacterLimitText",
  props: {
    limit: {
      type: Number,
      required: !0
    },
    currentTextLength: {
      type: Number,
      required: !0
    }
  }
};
var c = function() {
  var e = this, r = e._self._c;
  return r("div", { staticClass: "char-limit", class: { "near-limit": e.currentTextLength > e.limit - 50 } }, [e._v(" " + e._s(e.$tc("forms.character-limit", e.limit - e.currentTextLength)) + " ")]);
}, u = [], s = /* @__PURE__ */ l(
  a,
  c,
  u
);
const d = s.exports;
function o(t) {
  o.installed || (o.installed = !0, t.component("CharacterLimitText", d));
}
const f = {
  install: o
};
let i = null;
typeof window < "u" ? i = window.Vue : typeof global < "u" && (i = global.Vue);
i && i.use(f);
export {
  d as default
};
