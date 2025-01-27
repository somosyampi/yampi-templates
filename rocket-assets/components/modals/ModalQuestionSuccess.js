function i(o, e, s, m, _, v, p, M) {
  var t = typeof o == "function" ? o.options : o;
  return e && (t.render = e, t.staticRenderFns = s, t._compiled = !0), {
    exports: o,
    options: t
  };
}
const l = {
  name: "ModalQuestion",
  methods: {
    showModal() {
      this.$refs.questionBaseModal.showModal();
    },
    closeModal() {
      this.$refs.questionBaseModal.closeModal();
    }
  }
};
var c = function() {
  var e = this, s = e._self._c;
  return s("modal", { ref: "questionBaseModal", attrs: { name: "question-success" } }, [s("i", { staticClass: "icon icon-success" }), s("div", { staticClass: "theme-title modal-success-title" }, [e._v(" Recebemos sua dúvida ")]), s("div", { staticClass: "modal-success-subtitle" }, [e._v(" Enviaremos uma resposta no e-mail "), s("br"), e._v(" cadastrado assim que possível. ")]), s("button", { staticClass: "btn btn-secundary -success", on: { click: e.closeModal } }, [e._v("Fechar")])]);
}, d = [], u = /* @__PURE__ */ i(
  l,
  c,
  d
);
const r = u.exports;
function a(o) {
  a.installed || (a.installed = !0, o.component("ModalQuestionSuccess", r));
}
const f = {
  install: a
};
let n = null;
typeof window < "u" ? n = window.Vue : typeof global < "u" && (n = global.Vue);
n && n.use(f);
export {
  r as default
};
