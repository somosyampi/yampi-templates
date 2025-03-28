function c(t, r, l, C, i, f, d, p) {
  var e = typeof t == "function" ? t.options : t;
  r && (e.render = r, e.staticRenderFns = l, e._compiled = !0), C && (e.functional = !0), f && (e._scopeId = "data-v-" + f);
  var o;
  if (d ? (o = function(n) {
    n = n || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !n && typeof __VUE_SSR_CONTEXT__ < "u" && (n = __VUE_SSR_CONTEXT__), i && i.call(this, n), n && n._registeredComponents && n._registeredComponents.add(d);
  }, e._ssrRegister = o) : i && (o = p ? function() {
    i.call(
      this,
      (e.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : i), o)
    if (e.functional) {
      e._injectStyles = o;
      var h = e.render;
      e.render = function(v, _) {
        return o.call(_), h(v, _);
      };
    } else {
      var u = e.beforeCreate;
      e.beforeCreate = u ? [].concat(u, o) : [o];
    }
  return {
    exports: t,
    options: e
  };
}
const w = {};
var m = function() {
  var r = this, l = r._self._c;
  return l("svg", { attrs: { width: "44", height: "37", viewBox: "0 0 44 16", fill: "none", xmlns: "http://www.w3.org/2000/svg" } }, [l("path", { attrs: { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M27.2 2.03158H25V1.01542C25 0.245189 24.7547 0 24 0H21C20.3078 0 20 0.34044 20 1.01542V2.03163H17.8C17.3579 2.03163 17 2.37241 17 2.79352C17 3.21469 17.3579 3.55547 17.8 3.55547H27.2C27.6421 3.55547 28 3.21469 28 2.79352C28 2.37241 27.6421 2.03158 27.2 2.03158ZM19.8995 15.2308C18.7495 15.2308 18.526 14.197 18.526 14.197L17.4995 4.06155H27.4995L26.473 14.197C26.473 14.197 26.2495 15.2308 25.0995 15.2308H19.8995ZM24.9999 5.07703C24.7237 5.07703 24.4999 5.30429 24.4999 5.58471L23.9999 13.2001C23.9999 13.4805 24.2238 13.7078 24.4999 13.7078C24.776 13.7078 24.9999 13.4805 24.9999 13.2001L25.4999 5.58471C25.4999 5.30429 25.276 5.07703 24.9999 5.07703ZM22.0005 5.58471C22.0005 5.30429 22.2244 5.07703 22.5005 5.07703C22.7766 5.07703 23.0005 5.30429 23.0005 5.58471V13.2001C23.0005 13.4805 22.7766 13.7078 22.5005 13.7078C22.2243 13.7078 22.0005 13.4805 22.0005 13.2001V5.58471ZM20.5002 5.58471C20.5002 5.30429 20.2764 5.07703 20.0002 5.07703C19.7241 5.07703 19.5002 5.30435 19.5002 5.58476L20.0002 13.2001C20.0002 13.4805 20.2241 13.7078 20.5002 13.7078C20.7764 13.7078 21.0003 13.4805 21.0003 13.2001L20.5002 5.58471ZM21.0001 2.03169H24.0001H24.0002V1.01547H21.0002L21.0001 2.03169Z", fill: "#999999" } })]);
}, V = [], g = /* @__PURE__ */ c(
  w,
  m,
  V,
  !1,
  null,
  null,
  null,
  null
);
const H = g.exports;
function a(t) {
  a.installed || (a.installed = !0, t.component("Trashcan", H));
}
const L = {
  install: a
};
let s = null;
typeof window < "u" ? s = window.Vue : typeof global < "u" && (s = global.Vue);
s && s.use(L);
export {
  H as default
};
