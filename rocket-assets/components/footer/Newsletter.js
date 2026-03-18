import v from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/mixins/errors.js";
import g from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/modules/axios/rocket.js";
function w(n, t, r, a, l, f, u, c) {
    var e = typeof n == "function" ? n.options : n;
    t && (e.render = t, e.staticRenderFns = r, e._compiled = !0), a && (e.functional = !0), f && (e._scopeId = "data-v-" + f);
    var i;
    if (u ? (i = function (s) {
        s = s || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !s && typeof __VUE_SSR_CONTEXT__ < "u" && (s = __VUE_SSR_CONTEXT__), l && l.call(this, s), s && s._registeredComponents && s._registeredComponents.add(u);
    }, e._ssrRegister = i) : l && (i = c ? function () {
        l.call(
            this,
            (e.functional ? this.parent : this).$root.$options.shadowRoot
        );
    } : l), i)
        if (e.functional) {
            e._injectStyles = i;
            var _ = e.render;
            e.render = function (h, p) {
                return i.call(p), _(h, p);
            };
        } else {
            var m = e.beforeCreate;
            e.beforeCreate = m ? [].concat(m, i) : [i];
        }
    return {
        exports: n,
        options: e
    };
}
const C = {
    name: "Newsletter",
    mixins: [
        v
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
                await g.post("leads", {
                    email: this.email
                }), this.$refs.modalNewsletter.showModal(), this.email = "";
            } catch (n) {
                console.error(n), this.setErrorsFromResponse(n);
            } finally {
                this.sending = !1;
            }
        }
    }
};
var b = function () {
    var t = this, r = t._self._c;
    return r("div", { staticClass: "holder-newsletter-form" }, [r("form", {
        attrs: { id: "form-newsletter" }, on: {
            submit: function (a) {
                return a.preventDefault(), t.submit.apply(null, arguments);
            }
        }
    }, [r("label", { staticClass: "-hide", attrs: { for: "newsletter-email" } }, [t._v("E-mail")]), r("div", { staticClass: "holder-input" }, [r("input", {
        directives: [{ name: "model", rawName: "v-model", value: t.email, expression: "email" }], attrs: { id: "newsletter-email", type: "email", name: "newsletter-email", placeholder: t.placeholder }, domProps: { value: t.email }, on: {
            input: function (a) {
                a.target.composing || (t.email = a.target.value);
            }
        }
    }), r("ErrorText", { attrs: { text: t.getError("email") } })], 1), r("LoaderButton", { staticClass: "btn btn-secundary", attrs: { sending: t.sending, title: t.buttonText } })], 1), r("ModalNewsletter", { ref: "modalNewsletter" })], 1);
}, y = [], N = /* @__PURE__ */ w(
    C,
    b,
    y,
    !1,
    null,
    null,
    null,
    null
);
const R = N.exports;
function d(n) {
    d.installed || (d.installed = !0, n.component("Newsletter", R));
}
const T = {
    install: d
};
let o = null;
typeof window < "u" ? o = window.Vue : typeof global < "u" && (o = global.Vue);
o && o.use(T);
export {
    R as default
};
