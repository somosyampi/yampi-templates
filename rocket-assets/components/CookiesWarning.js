import c from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/js-cookie.js";
function C(n, e, i, p, s, d, f, m) {
  var o = typeof n == "function" ? n.options : n;
  e && (o.render = e, o.staticRenderFns = i, o._compiled = !0), p && (o.functional = !0), d && (o._scopeId = "data-v-" + d);
  var a;
  if (f ? (a = function(t) {
    t = t || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !t && typeof __VUE_SSR_CONTEXT__ < "u" && (t = __VUE_SSR_CONTEXT__), s && s.call(this, t), t && t._registeredComponents && t._registeredComponents.add(f);
  }, o._ssrRegister = a) : s && (a = m ? function() {
    s.call(
      this,
      (o.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : s), a)
    if (o.functional) {
      o._injectStyles = a;
      var v = o.render;
      o.render = function(h, _) {
        return a.call(_), v(h, _);
      };
    } else {
      var u = o.beforeCreate;
      o.beforeCreate = u ? [].concat(u, a) : [a];
    }
  return {
    exports: n,
    options: o
  };
}
const k = {
  name: "CookiesWarning",
  data() {
    return {
      policyIsAccepted: !0,
      cookieName: "policy_accepted"
    };
  },
  mounted() {
    setTimeout(() => {
      this.policyIsAccepted = c.get(this.cookieName);
    }, 3e3);
  },
  methods: {
    storeCookie() {
      if (!c.get(this.cookieName)) {
        const n = new Date(), e = new Date(n.setFullYear(n.getFullYear() + 1));
        c.set(this.cookieName, "true", { expires: e }), this.policyIsAccepted = !0;
      }
    }
  }
};
var g = function() {
  var e = this, i = e._self._c;
  return i("Transition", { attrs: { name: "fade" } }, [e.policyIsAccepted ? e._e() : i("div", { staticClass: "cookies-warning" }, [i("p", { staticClass: "text" }, [e._v(" Utilizamos cookies para personalizar an\xFAncios e melhorar a sua experi\xEAncia no site. "), i("span", [e._v("Ao continuar")]), e._v(" navegando, voc\xEA concorda com a nossa "), i("a", { attrs: { href: "/atendimento/politica-de-cookies" } }, [e._v("Pol\xEDtica de cookies")]), e._v(". ")]), i("button", { staticClass: "btn btn-secundary", on: { click: e.storeCookie } }, [e._v(" Ok, entendi ")])])]);
}, y = [], b = /* @__PURE__ */ C(
  k,
  g,
  y,
  !1,
  null,
  null,
  null,
  null
);
const w = b.exports;
function l(n) {
  l.installed || (l.installed = !0, n.component("CookiesWarning", w));
}
const N = {
  install: l
};
let r = null;
typeof window < "u" ? r = window.Vue : typeof global < "u" && (r = global.Vue);
r && r.use(N);
export {
  w as default
};
