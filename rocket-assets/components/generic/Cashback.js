function C(n, t, s, d, o, f, c, p) {
  var e = typeof n == "function" ? n.options : n;
  t && (e.render = t, e.staticRenderFns = s, e._compiled = !0), d && (e.functional = !0), f && (e._scopeId = "data-v-" + f);
  var i;
  if (c ? (i = function(a) {
    a = a || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !a && typeof __VUE_SSR_CONTEXT__ < "u" && (a = __VUE_SSR_CONTEXT__), o && o.call(this, a), a && a._registeredComponents && a._registeredComponents.add(c);
  }, e._ssrRegister = i) : o && (i = p ? function() {
    o.call(
      this,
      (e.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : o), i)
    if (e.functional) {
      e._injectStyles = i;
      var h = e.render;
      e.render = function(v, _) {
        return i.call(_), h(v, _);
      };
    } else {
      var u = e.beforeCreate;
      e.beforeCreate = u ? [].concat(u, i) : [i];
    }
  return {
    exports: n,
    options: e
  };
}
const m = {
  name: "Cashback",
  props: {
    percentAmount: {
      required: !0,
      type: Number
    },
    textAlign: {
      type: String,
      default: "left",
      validator: (n) => ["left", "center"].includes(n)
    }
  }
};
var b = function() {
  var t = this, s = t._self._c;
  return s("div", { staticClass: "cashback", class: `align-${t.textAlign}` }, [s("i", { staticClass: "cashback-icon icon icon-money" }), s("span", { staticClass: "cashback-text" }, [t._v(" Ganhe "), s("span", { staticClass: "green" }, [t._v(t._s(t.percentAmount) + "% de cashback")])])]);
}, g = [], k = /* @__PURE__ */ C(
  m,
  b,
  g,
  !1,
  null,
  null,
  null,
  null
);
const $ = k.exports;
function l(n) {
  l.installed || (l.installed = !0, n.component("Cashback", $));
}
const R = {
  install: l
};
let r = null;
typeof window < "u" ? r = window.Vue : typeof global < "u" && (r = global.Vue);
r && r.use(R);
export {
  $ as default
};
