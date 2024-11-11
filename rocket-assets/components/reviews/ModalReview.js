import { mapGetters as l } from "http://rocket.test/dist/vendor/vuex.js";
import d from "http://rocket.test/dist/vendor/modules/axios/rocket.js";
import c from "http://rocket.test/dist/vendor/mixins/errors.js";
import u from "http://rocket.test/dist/vendor/mixins/tracking/api.js";
import i from "http://rocket.test/dist/vendor/lodash.js";
function f(t, e, r, a, m, b, x, E) {
  var s = typeof t == "function" ? t.options : t;
  return e && (s.render = e, s.staticRenderFns = r, s._compiled = !0), {
    exports: t,
    options: s
  };
}
const g = {
  name: "ModalReview",
  mixins: [
    c,
    u
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
    ...l("product", [
      "product"
    ])
  },
  methods: {
    times: i.times,
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
            const a = this.form.images.length ? i.lastIndexOf(this.form.images) : 0;
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
        t.images = i.compact(t.images), await d.post(`products/${this.product.id}/reviews`, t), this.closeModal(), this.handleTrackApi("product-review-entered", {
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
var p = function() {
  var e = this, r = e._self._c;
  return r("modal", { ref: "reviewBaseModal", attrs: { name: "review", title: "Avalie o produto" }, scopedSlots: e._u([{ key: "subtitle", fn: function() {
    return [e._v(" " + e._s(e.product.name) + " ")];
  }, proxy: !0 }]) }, [r("form", { ref: "ReviewFormRef" }, [r("label", { attrs: { for: "review-rating" } }, [e._v("QUANTIDADE DE ESTRELAS")]), r("br"), e._l(e.times(5), function(a) {
    return r("i", { key: a, staticClass: "icon", class: `icon-star-${a < e.form.rating ? "gold" : "grey"}`, on: { click: function(m) {
      e.form.rating = a + 1;
    } } });
  }), r("br"), r("label", { staticClass: "custom-margin", attrs: { for: "review-name" } }, [e._v("NOME")]), r("input", { directives: [{ name: "model", rawName: "v-model", value: e.form.name, expression: "form.name" }], class: { error: e.hasError("name") }, attrs: { id: "review-name", type: "text", name: "name", placeholder: "Ex.: Adriana", maxlength: "60" }, domProps: { value: e.form.name }, on: { input: function(a) {
    a.target.composing || e.$set(e.form, "name", a.target.value);
  } } }), r("ErrorText", { attrs: { text: e.getError("name") } }), r("label", { attrs: { for: "review-email" } }, [e._v("E-MAIL")]), r("input", { directives: [{ name: "model", rawName: "v-model", value: e.form.email, expression: "form.email" }], class: { error: e.hasError("email") }, attrs: { id: "review-email", type: "email", name: "email", placeholder: "Ex.: adriana@gmail.com" }, domProps: { value: e.form.email }, on: { input: function(a) {
    a.target.composing || e.$set(e.form, "email", a.target.value);
  } } }), r("ErrorText", { attrs: { text: e.getError("email") } }), r("label", { attrs: { for: "review-message" } }, [e._v("AVALIAÇÃO")]), r("textarea", { directives: [{ name: "model", rawName: "v-model", value: e.form.message, expression: "form.message" }], class: { error: e.hasError("message") }, attrs: { id: "review-message", type: "text", name: "review", placeholder: "Escreva o que você achou deste produto...", rows: "4", maxlength: "250" }, domProps: { value: e.form.message }, on: { input: function(a) {
    a.target.composing || e.$set(e.form, "message", a.target.value);
  } } }), r("CharacterLimitText", { staticClass: "text-left inline-block", attrs: { limit: 250, "current-text-length": e.form.message.length } }), r("ErrorText", { attrs: { text: e.getError("message") } }), r("image-selector", { ref: "ImageUploader", attrs: { amount: "3", "images-urls": e.form.images }, on: { changeImageUrls: e.handleImageUrls, uploading: e.handleUploading } }), r("div", { staticClass: "alert -yellow" }, [e._v(" • Sua avaliação está sujeita à aprovação por nossa equipe "), r("br"), e._v(" • Seus dados não serão divulgados "), r("br"), e._v(" • Não publicaremos termos ofensivos ou de baixo calão. ")]), e.showError ? r("div", { staticClass: "alert -red" }, [r("b", [e._v("Opa! Você está enviando muitas avaliações seguidas.")]), r("br"), e._v(" Aguarde 1 minuto para enviar mais. ")]) : e._e()], 2), r("template", { slot: "footer" }, [r("loader-button", { staticClass: "btn -block btn-secundary", attrs: { sending: e.sending, disabled: e.uploading }, on: { click: e.submit } }, [e._v(" Enviar avaliação ")])], 1)], 2);
}, v = [], h = /* @__PURE__ */ f(
  g,
  p,
  v
);
const w = h.exports;
function n(t) {
  n.installed || (n.installed = !0, t.component("ModalReview", w));
}
const _ = {
  install: n
};
let o = null;
typeof window < "u" ? o = window.Vue : typeof global < "u" && (o = global.Vue);
o && o.use(_);
export {
  w as default
};
