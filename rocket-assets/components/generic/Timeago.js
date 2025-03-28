function m(o, i, s, p, r, f, _, c) {
  var e = typeof o == "function" ? o.options : o;
  i && (e.render = i, e.staticRenderFns = s, e._compiled = !0), p && (e.functional = !0), f && (e._scopeId = "data-v-" + f);
  var t;
  if (_ ? (t = function(n) {
    n = n || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !n && typeof __VUE_SSR_CONTEXT__ < "u" && (n = __VUE_SSR_CONTEXT__), r && r.call(this, n), n && n._registeredComponents && n._registeredComponents.add(_);
  }, e._ssrRegister = t) : r && (t = c ? function() {
    r.call(
      this,
      (e.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : r), t)
    if (e.functional) {
      e._injectStyles = t;
      var v = e.render;
      e.render = function(h, d) {
        return t.call(d), v(h, d);
      };
    } else {
      var u = e.beforeCreate;
      e.beforeCreate = u ? [].concat(u, t) : [t];
    }
  return {
    exports: o,
    options: e
  };
}
const g = {
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
var C = function() {
  var i = this, s = i._self._c;
  return s("span", [i._v(i._s(new Date(i.date.replace(/\s+/g, "T")).toLocaleDateString("pt-BR")))]);
}, R = [], T = /* @__PURE__ */ m(
  g,
  C,
  R,
  !1,
  null,
  null,
  null,
  null
);
const w = T.exports;
function l(o) {
  l.installed || (l.installed = !0, o.component("Timeago", w));
}
const $ = {
  install: l
};
let a = null;
typeof window < "u" ? a = window.Vue : typeof global < "u" && (a = global.Vue);
a && a.use($);
export {
  w as default
};
