import { mapGetters as _ } from "https://codigo-aberto-production-assets.s3.amazonaws.com/yampi-templates-main/rocket-assets/dist/vendor/vuex.js";
import m from "https://codigo-aberto-production-assets.s3.amazonaws.com/yampi-templates-main/rocket-assets/dist/vendor/lodash.js";
import w from "https://codigo-aberto-production-assets.s3.amazonaws.com/yampi-templates-main/rocket-assets/dist/vendor/modules/axios/rocket.js";
import E from "https://codigo-aberto-production-assets.s3.amazonaws.com/yampi-templates-main/rocket-assets/dist/vendor/mixins/errors.js";
import b from "https://codigo-aberto-production-assets.s3.amazonaws.com/yampi-templates-main/rocket-assets/dist/vendor/mixins/tracking/api.js";
function x(a, e, r, t, n, f, u, p) {
    var s = typeof a == "function" ? a.options : a;
    e && (s.render = e, s.staticRenderFns = r, s._compiled = !0), t && (s.functional = !0), f && (s._scopeId = "data-v-" + f);
    var i;
    if (u ? (i = function (o) {
        o = o || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !o && typeof __VUE_SSR_CONTEXT__ < "u" && (o = __VUE_SSR_CONTEXT__), n && n.call(this, o), o && o._registeredComponents && o._registeredComponents.add(u);
    }, s._ssrRegister = i) : n && (i = p ? function () {
        n.call(
            this,
            (s.functional ? this.parent : this).$root.$options.shadowRoot
        );
    } : n), i)
        if (s.functional) {
            s._injectStyles = i;
            var v = s.render;
            s.render = function (h, g) {
                return i.call(g), v(h, g);
            };
        } else {
            var c = s.beforeCreate;
            s.beforeCreate = c ? [].concat(c, i) : [i];
        }
    return {
        exports: a,
        options: s
    };
}
const y = {
    name: "ModalReview",
    mixins: [
        E,
        b
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
        ..._("product", [
            "product"
        ])
    },
    methods: {
        times: m.times,
        handleUploading(a) {
            this.uploading = a;
        },
        handleImageUrls({ event: a, imageNumber: e, imageUrl: r }) {
            return {
                DELETE: () => {
                    this.form.images.splice(e, 1);
                },
                APPEND: () => {
                    if (this.form.images.length < 3) {
                        const t = this.form.images.length ? m.lastIndexOf(this.form.images) : 0;
                        this.$set(this.form.images, t, r);
                    }
                }
            }[a]();
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
                const a = { ...this.form };
                a.images = m.compact(a.images), await w.post(`products/${this.product.id}/reviews`, a), this.closeModal(), this.handleTrackApi("product-review-entered", {
                    "photo-entered": this.form.images.length,
                    "review-grade": this.form.rating
                }), this.$emit("success");
            } catch (a) {
                a.response.status === 429 && (this.showError = !0), this.setErrorsFromResponse(a);
            } finally {
                this.sending = !1;
            }
        }
    }
};
var C = function () {
    var e = this, r = e._self._c;
    return r("Modal", {
        ref: "reviewBaseModal", attrs: { name: "review", title: "Avalie o produto" }, scopedSlots: e._u([{
            key: "subtitle", fn: function () {
                return [e._v(" " + e._s(e.product.name) + " ")];
            }, proxy: !0
        }])
    }, [r("form", { ref: "ReviewFormRef" }, [r("label", { attrs: { for: "review-rating" } }, [e._v("QUANTIDADE DE ESTRELAS")]), r("br"), e._l(e.times(5), function (t) {
        return r("i", {
            key: t, staticClass: "icon", class: `icon-star-${t < e.form.rating ? "dynamic" : "grey"}`, on: {
                click: function (n) {
                    e.form.rating = t + 1;
                }
            }
        });
    }), r("br"), r("label", { staticClass: "custom-margin", attrs: { for: "review-name" } }, [e._v("NOME")]), r("input", {
        directives: [{ name: "model", rawName: "v-model", value: e.form.name, expression: "form.name" }], class: { error: e.hasError("name") }, attrs: { id: "review-name", type: "text", name: "name", placeholder: "Ex.: Adriana", maxlength: "60" }, domProps: { value: e.form.name }, on: {
            input: function (t) {
                t.target.composing || e.$set(e.form, "name", t.target.value);
            }
        }
    }), r("ErrorText", { attrs: { text: e.getError("name") } }), r("label", { attrs: { for: "review-email" } }, [e._v("E-MAIL")]), r("input", {
        directives: [{ name: "model", rawName: "v-model", value: e.form.email, expression: "form.email" }], class: { error: e.hasError("email") }, attrs: { id: "review-email", type: "email", name: "email", placeholder: "Ex.: adriana@gmail.com" }, domProps: { value: e.form.email }, on: {
            input: function (t) {
                t.target.composing || e.$set(e.form, "email", t.target.value);
            }
        }
    }), r("ErrorText", { attrs: { text: e.getError("email") } }), r("label", { attrs: { for: "review-message" } }, [e._v("AVALIA\xC7\xC3O")]), r("textarea", {
        directives: [{ name: "model", rawName: "v-model", value: e.form.message, expression: "form.message" }], class: { error: e.hasError("message") }, attrs: { id: "review-message", type: "text", name: "review", placeholder: "Escreva o que voc\xEA achou deste produto...", rows: "4", maxlength: "250" }, domProps: { value: e.form.message }, on: {
            input: function (t) {
                t.target.composing || e.$set(e.form, "message", t.target.value);
            }
        }
    }), r("CharacterLimitText", { staticClass: "text-left inline-block", attrs: { limit: 250, "current-text-length": e.form.message.length } }), r("ErrorText", { attrs: { text: e.getError("message") } }), r("ImageSelector", { ref: "ImageUploader", attrs: { amount: "3", "images-urls": e.form.images }, on: { changeImageUrls: e.handleImageUrls, uploading: e.handleUploading } }), r("div", { staticClass: "alert -yellow" }, [e._v(" \u2022 Sua avalia\xE7\xE3o est\xE1 sujeita \xE0 aprova\xE7\xE3o por nossa equipe "), r("br"), e._v(" \u2022 Seus dados n\xE3o ser\xE3o divulgados "), r("br"), e._v(" \u2022 N\xE3o publicaremos termos ofensivos ou de baixo cal\xE3o. ")]), e.showError ? r("div", { staticClass: "alert -red" }, [r("b", [e._v("Opa! Voc\xEA est\xE1 enviando muitas avalia\xE7\xF5es seguidas.")]), r("br"), e._v(" Aguarde 1 minuto para enviar mais. ")]) : e._e()], 2), r("template", { slot: "footer" }, [r("LoaderButton", { staticClass: "btn -block btn-secundary", attrs: { sending: e.sending, disabled: e.uploading }, on: { click: e.submit } }, [e._v(" Enviar avalia\xE7\xE3o ")])], 1)], 2);
}, A = [], M = /* @__PURE__ */ x(
    y,
    C,
    A,
    !1,
    null,
    null,
    null,
    null
);
const T = M.exports;
function d(a) {
    d.installed || (d.installed = !0, a.component("ModalReview", T));
}
const $ = {
    install: d
};
let l = null;
typeof window < "u" ? l = window.Vue : typeof global < "u" && (l = global.Vue);
l && l.use($);
export {
    T as default
};
