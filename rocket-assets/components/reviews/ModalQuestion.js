import { mapGetters as i } from "http://rocket.test/dist/vendor/vuex.js";
import "http://rocket.test/dist/vendor/lodash.js";
import m from "http://rocket.test/dist/vendor/modules/axios/rocket.js";
import l from "http://rocket.test/dist/vendor/mixins/errors.js";
function u(o, e, t, s, h, _, x, b) {
  var r = typeof o == "function" ? o.options : o;
  return e && (r.render = e, r.staticRenderFns = t, r._compiled = !0), {
    exports: o,
    options: r
  };
}
const d = {
  name: "ModalQuestion",
  mixins: [
    l
  ],
  data: () => ({
    sending: !1,
    form: {
      name: "",
      email: "",
      message: ""
    }
  }),
  computed: {
    ...i("product", [
      "product"
    ])
  },
  methods: {
    showModal() {
      this.resetForm(), this.$refs.questionBaseModal.showModal();
    },
    closeModal() {
      this.$refs.questionBaseModal.closeModal(), this.$nextTick(() => this.resetForm());
    },
    resetForm() {
      this.form = {
        name: "",
        email: "",
        message: ""
      };
    },
    async submit() {
      this.sending = !0;
      try {
        await m.post(`products/${this.product.id}/questions`, this.form), this.closeModal(), this.$emit("success");
      } catch (o) {
        this.setErrorsFromResponse(o);
      } finally {
        this.sending = !1;
      }
    }
  }
};
var f = function() {
  var e = this, t = e._self._c;
  return t("modal", { ref: "questionBaseModal", attrs: { name: "question", title: "Tire suas dúvidas" } }, [t("template", { slot: "subtitle" }, [e._v(" " + e._s(e.product.name) + " ")]), t("form", { on: { submit: function(s) {
    return s.preventDefault(), e.submit.apply(null, arguments);
  } } }, [t("label", { attrs: { for: "question-username" } }, [e._v("NOME*")]), t("input", { directives: [{ name: "model", rawName: "v-model", value: e.form.name, expression: "form.name" }], class: { error: e.hasError("name") }, attrs: { id: "question-username", type: "text", name: "name", placeholder: "Ex.: Adriana" }, domProps: { value: e.form.name }, on: { input: function(s) {
    s.target.composing || e.$set(e.form, "name", s.target.value);
  } } }), t("ErrorText", { attrs: { text: e.getError("name") } }), t("label", { attrs: { for: "question-email" } }, [e._v("E-MAIL*")]), t("input", { directives: [{ name: "model", rawName: "v-model", value: e.form.email, expression: "form.email" }], class: { error: e.hasError("email") }, attrs: { id: "question-email", type: "text", name: "email", placeholder: "Ex.: adriana@gmail.com" }, domProps: { value: e.form.email }, on: { input: function(s) {
    s.target.composing || e.$set(e.form, "email", s.target.value);
  } } }), t("ErrorText", { attrs: { text: e.getError("email") } }), t("label", { attrs: { for: "question-message" } }, [e._v("DÚVIDA*")]), t("textarea", { directives: [{ name: "model", rawName: "v-model", value: e.form.message, expression: "form.message" }], class: { error: e.hasError("message") }, attrs: { id: "question-message", type: "text", name: "question", placeholder: "Escreva sua dúvida...", rows: "4" }, domProps: { value: e.form.message }, on: { input: function(s) {
    s.target.composing || e.$set(e.form, "message", s.target.value);
  } } }), t("ErrorText", { attrs: { text: e.getError("message") } }), t("loader-button", { staticClass: "btn -block btn-secundary", attrs: { sending: e.sending } }, [e._v(" Enviar dúvida ")])], 1)], 2);
}, c = [], p = /* @__PURE__ */ u(
  d,
  f,
  c
);
const g = p.exports;
function n(o) {
  n.installed || (n.installed = !0, o.component("ModalQuestion", g));
}
const v = {
  install: n
};
let a = null;
typeof window < "u" ? a = window.Vue : typeof global < "u" && (a = global.Vue);
a && a.use(v);
export {
  g as default
};
