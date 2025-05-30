function m(o, n, a, _, l, d, f, h) {
  var e = typeof o == "function" ? o.options : o;
  n && (e.render = n, e.staticRenderFns = a, e._compiled = !0), _ && (e.functional = !0), d && (e._scopeId = "data-v-" + d);
  var t;
  if (f ? (t = function(s) {
    s = s || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !s && typeof __VUE_SSR_CONTEXT__ < "u" && (s = __VUE_SSR_CONTEXT__), l && l.call(this, s), s && s._registeredComponents && s._registeredComponents.add(f);
  }, e._ssrRegister = t) : l && (t = h ? function() {
    l.call(
      this,
      (e.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : l), t)
    if (e.functional) {
      e._injectStyles = t;
      var v = e.render;
      e.render = function(p, u) {
        return t.call(u), v(p, u);
      };
    } else {
      var c = e.beforeCreate;
      e.beforeCreate = c ? [].concat(c, t) : [t];
    }
  return {
    exports: o,
    options: e
  };
}
const w = {
  name: "ModalNewsletter",
  methods: {
    showModal() {
      this.$refs.newsletterBaseModal.showModal();
    },
    closeModal() {
      this.$refs.newsletterBaseModal.closeModal();
    }
  }
};
var C = function() {
  var n = this, a = n._self._c;
  return a("Modal", { ref: "newsletterBaseModal", attrs: { name: "newsletter" } }, [a("i", { staticClass: "icon icon-success" }), a("div", { staticClass: "theme-title modal-success-title" }, [n._v(" Sucesso! ")]), a("div", { staticClass: "modal-success-subtitle" }, [n._v(" Seu e-mail foi cadastrado. ")]), a("button", { staticClass: "btn btn-secundary -success", on: { click: n.closeModal } }, [n._v(" Fechar ")])]);
}, M = [], b = /* @__PURE__ */ m(
  w,
  C,
  M,
  !1,
  null,
  null,
  null,
  null
);
const $ = b.exports;
function r(o) {
  r.installed || (r.installed = !0, o.component("ModalNewsletter", $));
}
const R = {
  install: r
};
let i = null;
typeof window < "u" ? i = window.Vue : typeof global < "u" && (i = global.Vue);
i && i.use(R);
export {
  $ as default
};
