import { mapGetters as h } from "https://codigo-aberto-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/vuex.js";
import "https://codigo-aberto-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/lodash.js";
import g from "https://codigo-aberto-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/modules/axios/rocket.js";
import E from "https://codigo-aberto-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/mixins/errors.js";
function b(o, e, t, s, i, u, d, c) {
  var r = typeof o == "function" ? o.options : o;
  e && (r.render = e, r.staticRenderFns = t, r._compiled = !0), s && (r.functional = !0), u && (r._scopeId = "data-v-" + u);
  var n;
  if (d ? (n = function(a) {
    a = a || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !a && typeof __VUE_SSR_CONTEXT__ < "u" && (a = __VUE_SSR_CONTEXT__), i && i.call(this, a), a && a._registeredComponents && a._registeredComponents.add(d);
  }, r._ssrRegister = n) : i && (n = c ? function() {
    i.call(
      this,
      (r.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : i), n)
    if (r.functional) {
      r._injectStyles = n;
      var _ = r.render;
      r.render = function(v, p) {
        return n.call(p), _(v, p);
      };
    } else {
      var f = r.beforeCreate;
      r.beforeCreate = f ? [].concat(f, n) : [n];
    }
  return {
    exports: o,
    options: r
  };
}
const M = {
  name: "ModalQuestion",
  mixins: [
    E
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
    ...h("product", [
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
        await g.post(`products/${this.product.id}/questions`, this.form), this.closeModal(), this.$emit("success");
      } catch (o) {
        this.setErrorsFromResponse(o);
      } finally {
        this.sending = !1;
      }
    }
  }
};
var q = function() {
  var e = this, t = e._self._c;
  return t("Modal", { ref: "questionBaseModal", attrs: { name: "question", title: "Tire suas d\xFAvidas" } }, [t("template", { slot: "subtitle" }, [e._v(" " + e._s(e.product.name) + " ")]), t("form", { on: { submit: function(s) {
    return s.preventDefault(), e.submit.apply(null, arguments);
  } } }, [t("label", { attrs: { for: "question-username" } }, [e._v("NOME*")]), t("input", { directives: [{ name: "model", rawName: "v-model", value: e.form.name, expression: "form.name" }], class: { error: e.hasError("name") }, attrs: { id: "question-username", type: "text", name: "name", placeholder: "Ex.: Adriana" }, domProps: { value: e.form.name }, on: { input: function(s) {
    s.target.composing || e.$set(e.form, "name", s.target.value);
  } } }), t("ErrorText", { attrs: { text: e.getError("name") } }), t("label", { attrs: { for: "question-email" } }, [e._v("E-MAIL*")]), t("input", { directives: [{ name: "model", rawName: "v-model", value: e.form.email, expression: "form.email" }], class: { error: e.hasError("email") }, attrs: { id: "question-email", type: "text", name: "email", placeholder: "Ex.: adriana@gmail.com" }, domProps: { value: e.form.email }, on: { input: function(s) {
    s.target.composing || e.$set(e.form, "email", s.target.value);
  } } }), t("ErrorText", { attrs: { text: e.getError("email") } }), t("label", { attrs: { for: "question-message" } }, [e._v("D\xDAVIDA*")]), t("textarea", { directives: [{ name: "model", rawName: "v-model", value: e.form.message, expression: "form.message" }], class: { error: e.hasError("message") }, attrs: { id: "question-message", type: "text", name: "question", placeholder: "Escreva sua d\xFAvida...", rows: "4" }, domProps: { value: e.form.message }, on: { input: function(s) {
    s.target.composing || e.$set(e.form, "message", s.target.value);
  } } }), e._v(" "), t("ErrorText", { attrs: { text: e.getError("message") } }), t("LoaderButton", { staticClass: "btn -block btn-secundary", attrs: { sending: e.sending } }, [e._v(" Enviar d\xFAvida ")])], 1)], 2);
}, w = [], x = /* @__PURE__ */ b(
  M,
  q,
  w,
  !1,
  null,
  null,
  null,
  null
);
const $ = x.exports;
function m(o) {
  m.installed || (m.installed = !0, o.component("ModalQuestion", $));
}
const y = {
  install: m
};
let l = null;
typeof window < "u" ? l = window.Vue : typeof global < "u" && (l = global.Vue);
l && l.use(y);
export {
  $ as default
};
