(function () { "use strict"; try { if (typeof document < "u") { var e = document.createElement("style"); e.appendChild(document.createTextNode(".helper-text[data-v-40c92a30]{font-size:14px;line-height:1.6;margin-bottom:15px}.product[data-v-40c92a30]{background-color:var(--default-background-color);border-radius:var(--theme-border-radius);display:flex;align-items:center;margin:0 auto 31px;padding:17px 19px;width:100%}.product img[data-v-40c92a30]{height:60px;margin:0 15px 0 0;width:60px;border-radius:var(--mini-cart-product-border-radius)}.product .name[data-v-40c92a30]{color:var(--color-general-primary);font-size:14px;line-height:1.15;font-weight:var(--font-medium);word-break:break-word}")), document.head.appendChild(e) } } catch (r) { console.error("vite-plugin-css-injected-by-js", r) } })();
import v from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/mixins/errors.js";
import k from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/modules/axios/rocket.js";
import g from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/mixins/tracking/sdk.js";
function b(i, t, e, s, r, c, f, p) {
    var o = typeof i == "function" ? i.options : i;
    t && (o.render = t, o.staticRenderFns = e, o._compiled = !0), s && (o.functional = !0), c && (o._scopeId = "data-v-" + c);
    var n;
    if (f ? (n = function (a) {
        a = a || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !a && typeof __VUE_SSR_CONTEXT__ < "u" && (a = __VUE_SSR_CONTEXT__), r && r.call(this, a), a && a._registeredComponents && a._registeredComponents.add(f);
    }, o._ssrRegister = n) : r && (n = p ? function () {
        r.call(
            this,
            (o.functional ? this.parent : this).$root.$options.shadowRoot
        );
    } : r), n)
        if (o.functional) {
            o._injectStyles = n;
            var _ = o.render;
            o.render = function (h, u) {
                return n.call(u), _(h, u);
            };
        } else {
            var d = o.beforeCreate;
            o.beforeCreate = d ? [].concat(d, n) : [n];
        }
    return {
        exports: i,
        options: o
    };
}
const C = {
    name: "ModalStockNotifications",
    mixins: [
        v,
        g
    ],
    props: {
        sku: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            sending: !1,
            form: {
                name: "",
                email: ""
            }
        };
    },
    methods: {
        showModal() {
            this.$refs.stockNotificationsModal && this.$refs.stockNotificationsModal.showModal();
        },
        closeModal() {
            this.$refs.stockNotificationsModal.closeModal();
        },
        resetForm() {
            this.form.name = "", this.form.email = "", this.clearErrors();
        },
        async submit() {
            this.sending = !0;
            const i = {
                sku_id: this.sku.id,
                ...this.form
            };
            try {
                await k.post(`/products/${this.sku.product_id}/stock-notifications`, i), this.handleTrackSDK("notify_when_available_subscribed"), this.closeModal(), this.$emit("success");
            } catch (t) {
                this.setErrorsFromResponse(t);
            } finally {
                this.sending = !1;
            }
        }
    }
};
var M = function () {
    var t = this, e = t._self._c;
    return e("Modal", { ref: "stockNotificationsModal", attrs: { name: "stock-notifications", title: "Avise-me quando chegar" }, on: { close: t.resetForm } }, [e("p", { staticClass: "helper-text" }, [t._v(" N\xF3s te avisaremos por e-mail quando este produto estiver novamente em nosso estoque. ")]), e("div", { staticClass: "mb-30" }, [e("div", { staticClass: "product" }, [t.sku.images.data.length ? e("CustomImage", { staticClass: "-loading", attrs: { src: t.sku.images.data[0].url, alt: t.sku.name, thumbor: { resize: "60x60" } } }) : t._e(), e("div", { staticClass: "text" }, [e("p", { staticClass: "name" }, [t._v(" " + t._s(t.sku.title) + " ")])])], 1)]), e("form", {
        attrs: { id: "form-stock-notifications" }, on: {
            submit: function (s) {
                return s.preventDefault(), t.submit.apply(null, arguments);
            }
        }
    }, [e("label", { attrs: { for: "stock-notifications-name" } }, [t._v("NOME")]), e("div", { staticClass: "holder-input mb-24" }, [e("input", {
        directives: [{ name: "model", rawName: "v-model", value: t.form.name, expression: "form.name" }], class: { error: t.hasError("name") }, attrs: { id: "stock-notifications-name", type: "text", name: "stock-notifications-name", placeholder: "Adriana" }, domProps: { value: t.form.name }, on: {
            input: [function (s) {
                s.target.composing || t.$set(t.form, "name", s.target.value);
            }, function (s) {
                return t.setError("name", "");
            }]
        }
    }), e("ErrorText", { attrs: { text: t.getError("name") } })], 1), e("label", { attrs: { for: "stock-notifications-email" } }, [t._v("E-MAIL")]), e("div", { staticClass: "holder-input" }, [e("input", {
        directives: [{ name: "model", rawName: "v-model", value: t.form.email, expression: "form.email" }], class: { error: t.hasError("email") }, attrs: { id: "stock-notifications-email", type: "email", name: "stock-notifications-email", placeholder: "Ex.: adriana@gmail.com" }, domProps: { value: t.form.email }, on: {
            input: [function (s) {
                s.target.composing || t.$set(t.form, "email", s.target.value);
            }, function (s) {
                return t.setError("email", "");
            }]
        }
    }), e("ErrorText", { attrs: { text: t.getError("email") } })], 1), e("LoaderButton", { staticClass: "btn btn-secundary -block mt-24 mb-16", attrs: { sending: t.sending, title: "Entrar na lista de espera", type: "submit" } })], 1)]);
}, y = [], E = /* @__PURE__ */ b(
    C,
    M,
    y,
    !1,
    null,
    "40c92a30",
    null,
    null
);
const N = E.exports;
function m(i) {
    m.installed || (m.installed = !0, i.component("ModalStockNotifications", N));
}
const $ = {
    install: m
};
let l = null;
typeof window < "u" ? l = window.Vue : typeof global < "u" && (l = global.Vue);
l && l.use($);
export {
    N as default
};
