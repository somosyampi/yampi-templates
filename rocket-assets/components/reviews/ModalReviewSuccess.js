function i(o, e, s, v, _, m, w, p) {
  var n = typeof o == "function" ? o.options : o;
  return e && (n.render = e, n.staticRenderFns = s, n._compiled = !0), {
    exports: o,
    options: n
  };
}
const l = {
  name: "ModalReview",
  methods: {
    showModal() {
      this.$refs.reviewBaseModal.showModal();
    },
    closeModal() {
      this.$refs.reviewBaseModal.closeModal();
    }
  }
};
var c = function() {
  var e = this, s = e._self._c;
  return s("modal", { ref: "reviewBaseModal", attrs: { name: "review-success" } }, [s("i", { staticClass: "icon icon-success" }), s("div", { staticClass: "theme-title modal-success-title" }, [e._v(" Avaliação enviada"), s("br"), e._v(" com sucesso! ")]), s("button", { staticClass: "btn btn-secundary -success", on: { click: e.closeModal } }, [e._v("Fechar")])]);
}, d = [], r = /* @__PURE__ */ i(
  l,
  c,
  d
);
const u = r.exports;
function a(o) {
  a.installed || (a.installed = !0, o.component("ModalReviewSuccess", u));
}
const f = {
  install: a
};
let t = null;
typeof window < "u" ? t = window.Vue : typeof global < "u" && (t = global.Vue);
t && t.use(f);
export {
  u as default
};
