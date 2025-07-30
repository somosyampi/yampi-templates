import { mapGetters as l, mapActions as w } from "https://codigo-aberto-sandbox-assets.yampi.io.s3.amazonaws.com/yampi-templates-sandbox/rocket-assets/dist/vendor/vuex.js";
import h from "https://codigo-aberto-sandbox-assets.yampi.io.s3.amazonaws.com/yampi-templates-sandbox/rocket-assets/dist/vendor/lodash.js";
import M from "https://codigo-aberto-sandbox-assets.yampi.io.s3.amazonaws.com/yampi-templates-sandbox/rocket-assets/dist/vendor/mixins/tracking/api.js";
import b from "https://codigo-aberto-sandbox-assets.yampi.io.s3.amazonaws.com/yampi-templates-sandbox/rocket-assets/dist/vendor/modules/eventBus.js";
function g(o, e, a, p, i, c, f, C) {
    var t = typeof o == "function" ? o.options : o;
    e && (t.render = e, t.staticRenderFns = a, t._compiled = !0), p && (t.functional = !0), c && (t._scopeId = "data-v-" + c);
    var n;
    if (f ? (n = function (r) {
        r = r || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !r && typeof __VUE_SSR_CONTEXT__ < "u" && (r = __VUE_SSR_CONTEXT__), i && i.call(this, r), r && r._registeredComponents && r._registeredComponents.add(f);
    }, t._ssrRegister = n) : i && (n = C ? function () {
        i.call(
            this,
            (t.functional ? this.parent : this).$root.$options.shadowRoot
        );
    } : i), n)
        if (t.functional) {
            t._injectStyles = n;
            var _ = t.render;
            t.render = function (v, u) {
                return n.call(u), _(v, u);
            };
        } else {
            var m = t.beforeCreate;
            t.beforeCreate = m ? [].concat(m, n) : [n];
        }
    return {
        exports: o,
        options: t
    };
}
const y = {
    name: "ModalCartConfirmation",
    mixins: [M],
    props: {
        error: {
            type: [String, void 0],
            default: () => {
            }
        },
        quantityAdded: {
            type: Number,
            default: 1
        }
    },
    computed: {
        ...l("cart", [
            "cart"
        ]),
        ...l("merchant", [
            "merchant"
        ]),
        ...l("preview", [
            "isIframe"
        ])
    },
    mounted() {
        b.$on("addedToCart", this.showModal);
    },
    methods: {
        ...w("cart", ["redirectToCart"]),
        showModal() {
            this.$refs.cartConfirmBaseModal && this.$refs.cartConfirmBaseModal.showModal();
        },
        closeModal() {
            this.$refs.cartConfirmBaseModal && this.$refs.cartConfirmBaseModal.closeModal();
        },
        handleKeepBuying() {
            this.handleTrackApi("keep-buying-clicked"), this.closeModal();
        },
        async handleRedirectoToCart() {
            this.isIframe && this.closeModal();
            const o = window.themeConfig.theme.params;
            await this.handleTrackApi("checkout-intended", {
                location: "modal-cart-confirm",
                quick_buy_button_enabled: o.show_add_to_cart_button,
                items: h.map(this.cart.items, "name"),
                amount: h.sumBy(this.cart.items, "price_total")
            }), this.redirectToCart();
        }
    }
};
var V = function () {
    var e = this, a = e._self._c;
    return a("Modal", { ref: "cartConfirmBaseModal", attrs: { name: "cart-confirm" } }, [e.error ? [a("h3", { staticClass: "theme-title" }, [e._v(" Oops!"), a("br"), e._v(" Ocorreu um erro. ")]), a("p", { staticClass: "alert -red", domProps: { textContent: e._s(e.error) } })] : [a("h3", { staticClass: "theme-title", domProps: { innerHTML: e._s(e.$tc("add-to-cart.product-added", e.quantityAdded)) } }), a("p", { staticClass: "description" }, [e._v(" O que deseja fazer agora? ")]), a("button", { staticClass: "btn btn-primary", on: { click: e.handleRedirectoToCart } }, [a("svg", { attrs: { width: "11", height: "14", viewBox: "0 0 11 14", fill: "none", xmlns: "http://www.w3.org/2000/svg" } }, [a("path", { attrs: { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M10.1081 5.63865H9.83601V4.36532C9.83601 2.01021 7.96708 0.0428572 5.63113 0.000860586C5.5673 -0.000286862 5.43977 -0.000286862 5.37597 0.000860586C3.03996 0.0428572 1.17106 2.01021 1.17106 4.36532V5.63865H0.89897C0.479692 5.63865 0.137695 6.07129 0.137695 6.60563V12.9921C0.137695 13.5258 0.479692 13.9625 0.898998 13.9625H10.1081C10.5273 13.9625 10.8694 13.5258 10.8694 12.9921V6.60563C10.8694 6.07132 10.5274 5.63865 10.1081 5.63865ZM6.36631 9.79239V11.7221C6.36631 11.9431 6.18132 12.1301 5.96017 12.1301H5.04698C4.82581 12.1301 4.64081 11.9431 4.64081 11.7221V9.79239C4.42632 9.58126 4.30145 9.28932 4.30145 8.96637C4.30145 8.35438 4.77452 7.82851 5.37601 7.80421C5.43975 7.80163 5.56743 7.80163 5.63117 7.80421C6.23266 7.82851 6.70573 8.35438 6.70573 8.96637C6.70567 9.28932 6.5808 9.58126 6.36631 9.79239ZM5.6311 5.6387H8.04281H8.04284V4.36537C8.04284 2.96247 6.90268 1.80249 5.50351 1.80249C4.10434 1.80249 2.96423 2.96247 2.96423 4.36537V5.6387H5.37594H5.6311Z" } })]), e._v(" Finalizar compra ")])], a("div", { staticClass: "btn-clean link-alike flex -vcenter -hcenter", on: { click: e.handleKeepBuying } }, [a("SelectArrow", { staticClass: "icon icon-select-arrow -left" }), e._v(" Continuar comprando ")], 1)], 2);
}, k = [], T = /* @__PURE__ */ g(
    y,
    V,
    k,
    !1,
    null,
    null,
    null,
    null
);
const $ = T.exports;
function d(o) {
    d.installed || (d.installed = !0, o.component("ModalCartConfirmation", $));
}
const B = {
    install: d
};
let s = null;
typeof window < "u" ? s = window.Vue : typeof global < "u" && (s = global.Vue);
s && s.use(B);
export {
    $ as default
};
