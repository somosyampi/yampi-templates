import l from "http://rocket.test/dist/vendor/mixins/errors.js";
import o from "http://rocket.test/dist/vendor/modules/axios/rocket.js";
import d from "http://rocket.test/dist/vendor/mixins/tracking/api.js";
function m(t, e, n, i, g, _, v, y) {
  var r = typeof t == "function" ? t.options : t;
  return e && (r.render = e, r.staticRenderFns = n, r._compiled = !0), {
    exports: t,
    options: r
  };
}
const u = {
  name: "Newsletter",
  mixins: [
    l,
    d
  ],
  props: {
    placeholder: {
      type: String,
      default: "Digite seu e-mail"
    },
    buttonText: {
      type: String,
      default: "Cadastre-se"
    }
  },
  data: () => ({
    email: "",
    sending: !1,
    modalSuccessOpened: !1
  }),
  methods: {
    async submit() {
      this.sending = !0, this.clearErrors();
      try {
        await o.post("leads", {
          email: this.email
        }), this.$refs.modalNewsletter.showModal(), this.email = "", this.handleTrackApi("newsletter-inscribed");
      } catch (t) {
        console.error(t), this.setErrorsFromResponse(t);
      } finally {
        this.sending = !1;
      }
    }
  }
};
var c = function() {
  var e = this, n = e._self._c;
  return n("div", { staticClass: "holder-newsletter-form" }, [n("form", { attrs: { id: "form-newsletter" }, on: { submit: function(i) {
    return i.preventDefault(), e.submit.apply(null, arguments);
  } } }, [n("label", { staticClass: "-hide", attrs: { for: "newsletter-email" } }, [e._v("E-mail")]), n("div", { staticClass: "holder-input" }, [n("input", { directives: [{ name: "model", rawName: "v-model", value: e.email, expression: "email" }], attrs: { id: "newsletter-email", type: "email", name: "newsletter-email", placeholder: e.placeholder }, domProps: { value: e.email }, on: { input: function(i) {
    i.target.composing || (e.email = i.target.value);
  } } }), n("ErrorText", { attrs: { text: e.getError("email") } })], 1), n("LoaderButton", { staticClass: "btn btn-secundary", attrs: { sending: e.sending, title: e.buttonText } })], 1), n("ModalNewsletter", { ref: "modalNewsletter" })], 1);
}, f = [], p = /* @__PURE__ */ m(
  u,
  c,
  f
);
const h = p.exports;
function a(t) {
  a.installed || (a.installed = !0, t.component("Newsletter", h));
}
const w = {
  install: a
};
let s = null;
typeof window < "u" ? s = window.Vue : typeof global < "u" && (s = global.Vue);
s && s.use(w);
export {
  h as default
};
