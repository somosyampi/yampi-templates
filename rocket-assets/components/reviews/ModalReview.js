import m from "lodash/times";
import l from "lodash/compact";
import d from "lodash/lastIndexOf";
import { mapGetters as c } from "../vendor/vuex.js";
import u from "../vendor/modules/axios/rocket.js";
import f from "../vendor/mixins/errors.js";
import g from "../vendor/mixins/tracking/api.js";
import "lodash/get";
function p(t, e, r, a, n, E, y, A) {
  var o = typeof t == "function" ? t.options : t;
  return e && (o.render = e, o.staticRenderFns = r, o._compiled = !0), {
    exports: t,
    options: o
  };
}
const v = {
  name: "ModalReview",
  mixins: [
    f,
    g
  ],
  data: () => ({
    sending: !1,
    form: {
      name: "",
      email: "",
      message: "",
      rating: 5,
      images: []
    },
    uploading: !1,
    showError: !1
  }),
  computed: {
    ...c("product", [
      "product"
    ])
  },
  methods: {
    times: m,
    handleUploading(t) {
      this.uploading = t;
    },
    handleImageUrls({ event: t, imageNumber: e, imageUrl: r }) {
      return {
        DELETE: () => {
          this.form.images.splice(e, 1);
        },
        APPEND: () => {
          if (this.form.images.length < 3) {
            const a = this.form.images.length ? d(this.form.images) : 0;
            this.$set(this.form.images, a, r);
          }
        }
      }[t]();
    },
    showModal() {
      this.resetForm(), this.$refs.reviewBaseModal.showModal(), this.handleTrackApi("product-review-intended");
    },
    closeModal() {
      this.$refs.reviewBaseModal.closeModal(), this.$nextTick(() => this.resetForm());
    },
    resetForm() {
      this.form = {
        name: "",
        email: "",
        message: "",
        rating: 5,
        images: []
      };
    },
    async submit() {
      this.sending = !0;
      try {
        const t = { ...this.form };
        t.images = l(t.images), await u.post(`products/${this.product.id}/reviews`, t), this.closeModal(), this.handleTrackApi("product-review-entered", {
          "photo-entered": this.form.images.length,
          "review-grade": this.form.rating
        }), this.$emit("success");
      } catch (t) {
        t.response.status === 429 && (this.showError = !0), this.setErrorsFromResponse(t);
      } finally {
        this.sending = !1;
      }
    }
  }
};
var h = function() {
  var e = this, r = e._self._c;
  return r("modal", { ref: "reviewBaseModal", attrs: { name: "review", title: "Avalie o produto" }, scopedSlots: e._u([{ key: "subtitle", fn: function() {
    return [e._v(" " + e._s(e.product.name) + " ")];
  }, proxy: !0 }]) }, [r("form", { ref: "ReviewFormRef" }, [r("label", { attrs: { for: "review-rating" } }, [e._v("QUANTIDADE DE ESTRELAS")]), r("br"), e._l(e.times(5), function(a) {
    return r("i", { key: a, staticClass: "icon", class: `icon-star-${a < e.form.rating ? "gold" : "grey"}`, on: { click: function(n) {
      e.form.rating = a + 1;
    } } });
  }), r("br"), r("label", { staticClass: "custom-margin", attrs: { for: "review-name" } }, [e._v("NOME")]), r("input", { directives: [{ name: "model", rawName: "v-model", value: e.form.name, expression: "form.name" }], class: { error: e.hasError("name") }, attrs: { id: "review-name", type: "text", name: "name", placeholder: "Ex.: Adriana", maxlength: "60" }, domProps: { value: e.form.name }, on: { input: function(a) {
    a.target.composing || e.$set(e.form, "name", a.target.value);
  } } }), r("ErrorText", { attrs: { text: e.getError("name") } }), r("label", { attrs: { for: "review-email" } }, [e._v("E-MAIL")]), r("input", { directives: [{ name: "model", rawName: "v-model", value: e.form.email, expression: "form.email" }], class: { error: e.hasError("email") }, attrs: { id: "review-email", type: "email", name: "email", placeholder: "Ex.: adriana@gmail.com" }, domProps: { value: e.form.email }, on: { input: function(a) {
    a.target.composing || e.$set(e.form, "email", a.target.value);
  } } }), r("ErrorText", { attrs: { text: e.getError("email") } }), r("label", { attrs: { for: "review-message" } }, [e._v("AVALIAÇÃO")]), r("textarea", { directives: [{ name: "model", rawName: "v-model", value: e.form.message, expression: "form.message" }], class: { error: e.hasError("message") }, attrs: { id: "review-message", type: "text", name: "review", placeholder: "Escreva o que você achou deste produto...", rows: "4", maxlength: "250" }, domProps: { value: e.form.message }, on: { input: function(a) {
    a.target.composing || e.$set(e.form, "message", a.target.value);
  } } }), r("CharacterLimitText", { staticClass: "text-left inline-block", attrs: { limit: 250, "current-text-length": e.form.message.length } }), r("ErrorText", { attrs: { text: e.getError("message") } }), r("image-selector", { ref: "ImageUploader", attrs: { amount: "3", "images-urls": e.form.images }, on: { changeImageUrls: e.handleImageUrls, uploading: e.handleUploading } }), r("div", { staticClass: "alert -yellow" }, [e._v(" • Sua avaliação está sujeita à aprovação por nossa equipe "), r("br"), e._v(" • Seus dados não serão divulgados "), r("br"), e._v(" • Não publicaremos termos ofensivos ou de baixo calão. ")]), e.showError ? r("div", { staticClass: "alert -red" }, [r("b", [e._v("Opa! Você está enviando muitas avaliações seguidas.")]), r("br"), e._v(" Aguarde 1 minuto para enviar mais. ")]) : e._e()], 2), r("template", { slot: "footer" }, [r("loader-button", { staticClass: "btn -block btn-secundary", attrs: { sending: e.sending, disabled: e.uploading }, on: { click: e.submit } }, [e._v(" Enviar avaliação ")])], 1)], 2);
}, w = [], _ = /* @__PURE__ */ p(
  v,
  h,
  w
);
const b = _.exports;
function i(t) {
  i.installed || (i.installed = !0, t.component("ModalReview", b));
}
const x = {
  install: i
};
let s = null;
typeof window < "u" ? s = window.Vue : typeof global < "u" && (s = global.Vue);
s && s.use(x);
export {
  b as default
};
