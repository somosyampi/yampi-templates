function a(t, e, s, m, _, w, p, v) {
  var o = typeof t == "function" ? t.options : t;
  return e && (o.render = e, o.staticRenderFns = s, o._compiled = !0), {
    exports: t,
    options: o
  };
}
const i = {
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
var c = function() {
  var e = this, s = e._self._c;
  return s("modal", { ref: "newsletterBaseModal", attrs: { name: "newsletter" } }, [s("i", { staticClass: "icon icon-success" }), s("div", { staticClass: "theme-title modal-success-title" }, [e._v(" Sucesso! ")]), s("div", { staticClass: "modal-success-subtitle" }, [e._v(" Seu e-mail foi cadastrado. ")]), s("button", { staticClass: "btn btn-secundary -success", on: { click: e.closeModal } }, [e._v(" Fechar ")])]);
}, d = [], r = /* @__PURE__ */ a(
  i,
  c,
  d
);
const u = r.exports;
function l(t) {
  l.installed || (l.installed = !0, t.component("ModalNewsletter", u));
}
const f = {
  install: l
};
let n = null;
typeof window < "u" ? n = window.Vue : typeof global < "u" && (n = global.Vue);
n && n.use(f);
export {
  u as default
};
