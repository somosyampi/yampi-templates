import a from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/js-cookie.js";
function c(o, e, t, m, _, k, v, y) {
  var n = typeof o == "function" ? o.options : o;
  return e && (n.render = e, n.staticRenderFns = t, n._compiled = !0), {
    exports: o,
    options: n
  };
}
const r = {
  name: "CookiesWarning",
  data() {
    return {
      policyIsAccepted: !0,
      cookieName: "policy_accepted"
    };
  },
  mounted() {
    setTimeout(() => {
      this.policyIsAccepted = a.get(this.cookieName);
    }, 3e3);
  },
  methods: {
    storeCookie() {
      if (!a.get(this.cookieName)) {
        const o = /* @__PURE__ */ new Date(), e = new Date(o.setFullYear(o.getFullYear() + 1));
        a.set(this.cookieName, "true", { expires: e }), this.policyIsAccepted = !0;
      }
    }
  }
};
var l = function() {
  var e = this, t = e._self._c;
  return t("transition", { attrs: { name: "fade" } }, [e.policyIsAccepted ? e._e() : t("div", { staticClass: "cookies-warning" }, [t("p", { staticClass: "text" }, [e._v(" Utilizamos cookies para personalizar anúncios e melhorar a sua experiência no site. "), t("span", [e._v("Ao continuar")]), e._v(" navegando, você concorda com a nossa "), t("a", { attrs: { href: "/atendimento/politica-de-cookies" } }, [e._v("Política de cookies")]), e._v(". ")]), t("button", { staticClass: "btn btn-secundary", on: { click: e.storeCookie } }, [e._v("Ok, entendi")])])]);
}, d = [], u = /* @__PURE__ */ c(
  r,
  l,
  d
);
const p = u.exports;
function s(o) {
  s.installed || (s.installed = !0, o.component("CookiesWarning", p));
}
const f = {
  install: s
};
let i = null;
typeof window < "u" ? i = window.Vue : typeof global < "u" && (i = global.Vue);
i && i.use(f);
export {
  p as default
};
