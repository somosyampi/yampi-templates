function v(i, n, l, c, o, f, u, m) {
  var e = typeof i == "function" ? i.options : i;
  n && (e.render = n, e.staticRenderFns = l, e._compiled = !0), c && (e.functional = !0), f && (e._scopeId = "data-v-" + f);
  var r;
  if (u ? (r = function(t) {
    t = t || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !t && typeof __VUE_SSR_CONTEXT__ < "u" && (t = __VUE_SSR_CONTEXT__), o && o.call(this, t), t && t._registeredComponents && t._registeredComponents.add(u);
  }, e._ssrRegister = r) : o && (r = m ? function() {
    o.call(
      this,
      (e.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : o), r)
    if (e.functional) {
      e._injectStyles = r;
      var p = e.render;
      e.render = function(h, d) {
        return r.call(d), p(h, d);
      };
    } else {
      var _ = e.beforeCreate;
      e.beforeCreate = _ ? [].concat(_, r) : [r];
    }
  return {
    exports: i,
    options: e
  };
}
const C = {
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
var T = function() {
  var n = this, l = n._self._c;
  return l("div", { staticClass: "char-limit", class: { "near-limit": n.currentTextLength > n.limit - 50 } }, [n._v(" " + n._s(n.$tc("forms.character-limit", n.limit - n.currentTextLength)) + " ")]);
}, g = [], b = /* @__PURE__ */ v(
  C,
  T,
  g,
  !1,
  null,
  null,
  null,
  null
);
const $ = b.exports;
function s(i) {
  s.installed || (s.installed = !0, i.component("CharacterLimitText", $));
}
const R = {
  install: s
};
let a = null;
typeof window < "u" ? a = window.Vue : typeof global < "u" && (a = global.Vue);
a && a.use(R);
export {
  $ as default
};
