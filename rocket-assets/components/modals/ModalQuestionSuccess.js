function p(a, s, o, _, i, u, d, v) {
  var e = typeof a == "function" ? a.options : a;
  s && (e.render = s, e.staticRenderFns = o, e._compiled = !0), _ && (e.functional = !0), u && (e._scopeId = "data-v-" + u);
  var t;
  if (d ? (t = function(n) {
    n = n || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !n && typeof __VUE_SSR_CONTEXT__ < "u" && (n = __VUE_SSR_CONTEXT__), i && i.call(this, n), n && n._registeredComponents && n._registeredComponents.add(d);
  }, e._ssrRegister = t) : i && (t = v ? function() {
    i.call(
      this,
      (e.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : i), t)
    if (e.functional) {
      e._injectStyles = t;
      var h = e.render;
      e.render = function(m, f) {
        return t.call(f), h(m, f);
      };
    } else {
      var c = e.beforeCreate;
      e.beforeCreate = c ? [].concat(c, t) : [t];
    }
  return {
    exports: a,
    options: e
  };
}
const C = {
  name: "ModalQuestionSuccess",
  methods: {
    showModal() {
      this.$refs.questionBaseModal.showModal();
    },
    closeModal() {
      this.$refs.questionBaseModal.closeModal();
    }
  }
};
var b = function() {
  var s = this, o = s._self._c;
  return o("Modal", { ref: "questionBaseModal", attrs: { name: "question-success" } }, [o("i", { staticClass: "icon icon-success" }), o("div", { staticClass: "theme-title modal-success-title" }, [s._v(" Recebemos sua d\xFAvida ")]), o("div", { staticClass: "modal-success-subtitle" }, [s._v(" Enviaremos uma resposta no e-mail "), o("br"), s._v(" cadastrado assim que poss\xEDvel. ")]), o("button", { staticClass: "btn btn-secundary -success", on: { click: s.closeModal } }, [s._v(" Fechar ")])]);
}, M = [], $ = /* @__PURE__ */ p(
  C,
  b,
  M,
  !1,
  null,
  null,
  null,
  null
);
const w = $.exports;
function r(a) {
  r.installed || (r.installed = !0, a.component("ModalQuestionSuccess", w));
}
const R = {
  install: r
};
let l = null;
typeof window < "u" ? l = window.Vue : typeof global < "u" && (l = global.Vue);
l && l.use(R);
export {
  w as default
};
