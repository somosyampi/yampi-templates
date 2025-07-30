import m from "https://codigo-aberto-sandbox-assets.yampi.io.s3.amazonaws.com/yampi-templates-sandbox/rocket-assets/dist/vendor/lodash.js";
import g from "https://codigo-aberto-sandbox-assets.yampi.io.s3.amazonaws.com/yampi-templates-sandbox/rocket-assets/dist/vendor/modules/axios/rocket.js";
import y from "https://codigo-aberto-sandbox-assets.yampi.io.s3.amazonaws.com/yampi-templates-sandbox/rocket-assets/dist/vendor/mixins/errors.js";
import z from "https://codigo-aberto-sandbox-assets.yampi.io.s3.amazonaws.com/yampi-templates-sandbox/rocket-assets/dist/vendor/mixins/product.js";
import b from "https://codigo-aberto-sandbox-assets.yampi.io.s3.amazonaws.com/yampi-templates-sandbox/rocket-assets/dist/vendor/mixins/tracking/api.js";
function C(t, e, a, o, r, d, c, h) {
    var i = typeof t == "function" ? t.options : t;
    e && (i.render = e, i.staticRenderFns = a, i._compiled = !0), o && (i.functional = !0), d && (i._scopeId = "data-v-" + d);
    var n;
    if (c ? (n = function (s) {
        s = s || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !s && typeof __VUE_SSR_CONTEXT__ < "u" && (s = __VUE_SSR_CONTEXT__), r && r.call(this, s), s && s._registeredComponents && s._registeredComponents.add(c);
    }, i._ssrRegister = n) : r && (n = h ? function () {
        r.call(
            this,
            (i.functional ? this.parent : this).$root.$options.shadowRoot
        );
    } : r), n)
        if (i.functional) {
            i._injectStyles = n;
            var _ = i.render;
            i.render = function (v, f) {
                return n.call(f), _(v, f);
            };
        } else {
            var u = i.beforeCreate;
            i.beforeCreate = u ? [].concat(u, n) : [n];
        }
    return {
        exports: t,
        options: i
    };
}
const w = {
    name: "Zipcode",
    mixins: [
        y,
        z,
        b
    ],
    props: {
        quantity: {
            type: Number,
            default: 1
        },
        disabled: {
            type: Boolean,
            default: !1
        }
    },
    data: () => ({
        zipcode: window.Yampi.session.zipcode || "",
        sending: !1,
        data: {}
    }),
    computed: {
        isValidCep() {
            return /^[0-9]{5}\-[\d]{3}$/.test(this.zipcode);
        }
    },
    methods: {
        showModal() {
            this.$refs.modalZipcode.showModal();
        },
        async submit() {
            this.sending = !0, this.handleTrackApi("zipcode-entered", {
                location: "product-page"
            });
            try {
                const t = this.validSku.prices.data.price, { data: e } = await g.post(
                    `products/${this.validProduct.id}/shipping-costs`,
                    {
                        sku_id: this.validSku.id,
                        quantity: this.quantity,
                        zipcode: this.zipcode,
                        total: t * this.quantity
                    }
                );
                if (this.data = m.get(e, "data", {}), Object.keys(this.data).length === 0) {
                    this.setError("zipcode", "Ocorreu um erro ao cotar o frete");
                    return;
                }
                this.validProduct.custom_shipping && this.formatCustomShippingPrice(), this.showModal();
            } catch (t) {
                console.error(t), this.setError(
                    "zipcode",
                    m.get(t, "response.data.message", "Ocorreu um erro ao cotar o frete")
                );
            } finally {
                this.sending = !1;
            }
        },
        formatCustomShippingPrice() {
            const t = Object.keys(this.data);
            let e = 0, a = "", o = "", r = "";
            t.forEach((d) => {
                this.data[d].delivery_time > e && (e = this.data[d].delivery_time, a = this.data[d].city, o = this.data[d].zipcode, r = this.data[d].uf);
            }), this.data = {
                CUSTOMIZADO: {
                    service_display_name: "FRETE",
                    service_id: "shipping_custom",
                    service_name: "shipping_custom",
                    service_type_name: "shipping_custom",
                    id: "shipping_custom",
                    quote_id: "shipping_custom",
                    real_price: this.validProduct.shipping_price,
                    formated_price: this.validProduct.shipping_price ? this.$formatMoney(this.validProduct.shipping_price) : "Gr\xE1tis",
                    delivery_time: e,
                    formated_delivery_time: `at\xE9 ${e} dias \xFAteis`,
                    zipcode: o,
                    city: a,
                    uf: r
                }
            };
        }
    }
};
var E = function () {
    var e = this, a = e._self._c;
    return a("div", { staticClass: "main-product-shipping" }, [a("label", { attrs: { for: "zipcode" } }, [e._v("SIMULAR FRETE")]), a("form", {
        attrs: { id: "form-zipcode" }, on: {
            submit: function (o) {
                return o.preventDefault(), e.submit.apply(null, arguments);
            }
        }
    }, [a("div", { staticClass: "-holder relative" }, [a("input", {
        directives: [{ name: "model", rawName: "v-model", value: e.zipcode, expression: "zipcode" }, { name: "mask", rawName: "v-mask", value: "#####-###", expression: "'#####-###'" }], class: { error: e.hasError("zipcode") }, attrs: { "data-1p-ignore": "", type: "tel", name: "zipcode", placeholder: "Ex.: 00000-000", disabled: e.disabled }, domProps: { value: e.zipcode }, on: {
            input: function (o) {
                o.target.composing || (e.zipcode = o.target.value);
            }
        }
    }), a("LoaderButton", { staticClass: "btn btn-secundary -small", attrs: { sending: e.sending, disabled: e.disabled || !e.isValidCep } }, [e._v(" OK ")])], 1), a("ErrorText", { attrs: { text: e.getError("zipcode") } })], 1), a("ModalZipcode", { ref: "modalZipcode", attrs: { data: e.data } })], 1);
}, k = [], T = /* @__PURE__ */ C(
    w,
    E,
    k,
    !1,
    null,
    null,
    null,
    null
);
const $ = T.exports;
function p(t) {
    p.installed || (p.installed = !0, t.component("Zipcode", $));
}
const M = {
    install: p
};
let l = null;
typeof window < "u" ? l = window.Vue : typeof global < "u" && (l = global.Vue);
l && l.use(M);
export {
    $ as default
};
