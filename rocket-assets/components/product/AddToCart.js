(function () { "use strict"; try { if (typeof document < "u") { var e = document.createElement("style"); e.appendChild(document.createTextNode(".hide[data-v-cfa76180]{visibility:hidden}")), document.head.appendChild(e) } } catch (d) { console.error("vite-plugin-css-injected-by-js", d) } })();
import { mapGetters as p, mapActions as _ } from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/vuex.js";
import v from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/modules/eventBus.js";
import w from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/modules/axios/api.js";
import y from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/modules/axios/rocket.js";
function g(r, t, a, s, i, f, u, C) {
    var e = typeof r == "function" ? r.options : r;
    t && (e.render = t, e.staticRenderFns = a, e._compiled = !0), s && (e.functional = !0), f && (e._scopeId = "data-v-" + f);
    var n;
    if (u ? (n = function (o) {
        o = o || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !o && typeof __VUE_SSR_CONTEXT__ < "u" && (o = __VUE_SSR_CONTEXT__), i && i.call(this, o), o && o._registeredComponents && o._registeredComponents.add(u);
    }, e._ssrRegister = n) : i && (n = C ? function () {
        i.call(
            this,
            (e.functional ? this.parent : this).$root.$options.shadowRoot
        );
    } : i), n)
        if (e.functional) {
            e._injectStyles = n;
            var m = e.render;
            e.render = function (T, h) {
                return n.call(h), m(T, h);
            };
        } else {
            var c = e.beforeCreate;
            e.beforeCreate = c ? [].concat(c, n) : [n];
        }
    return {
        exports: r,
        options: e
    };
}
const $ = {
    name: "AddToCart",
    props: {
        selectedPrice: {
            type: String,
            default: "promotional"
        }
    },
    data() {
        return {
            error: void 0,
            quantity: 1,
            productData: {}
        };
    },
    computed: {
        ...p("cart", ["cartType"]),
        ...p("preview", ["isPreview"]),
        ..._("cart", ["addProductsToCart"])
    },
    mounted() {
        v.$on("addToCartClicked", this.handleAddToCartClick), this.$store.subscribe(({ type: r, payload: t }) => {
            if (r === "cart/EVENT_ADDED_TO_CART") {
                if (this.isPreview && this.cartType !== "side_cart") {
                    this.$refs.modalCartConfirmation && this.$refs.modalCartConfirmation.showModal();
                    return;
                }
                this.addedToCart(t);
            }
        }), this.isPreview && window.addEventListener(
            "message",
            (r) => {
                var t, a, s, i;
                ((a = (t = r.data) == null ? void 0 : t.show_modal_after_purchase) == null ? void 0 : a.value) && ((i = (s = r.target) == null ? void 0 : s.themeConfig) == null ? void 0 : i.page) === "product" && this.cartType !== "side_cart" && this.$refs.modalCartConfirmation.showModal();
            },
            !1
        );
    },
    methods: {
        ..._("cart", [
            "redirectToCart"
        ]),
        async handleAddToCartClick(r) {
            this.productData = {}, this.loadProductSkus(r.slug), this.$refs.ModalConfirmAddToCart.showModal();
        },
        addedToCart({
            showModal: r,
            error: t = void 0,
            quantityAdded: a = 1
        }) {
            return {
                side_cart: () => t ? (this.error = t, this.quantity = a, this.$refs.modalCartConfirmation.showModal()) : null,
                suspended: () => t || r ? (this.error = t, this.quantity = a, this.$refs.modalCartConfirmation.showModal()) : this.redirectToCart()
            }[this.cartType]();
        },
        async loadProductSkus(r) {
            try {
                const t = `catalog/products/${r}`, { data: a } = await w.get(t);
                this.productData = a.data;
            } catch (t) {
                t.response.status >= 400 && this.isPreview && await this.loadPlaceholders();
            }
        },
        async loadPlaceholders() {
            const { data: r } = await y.get("/placeholders/productDetail");
            this.productData = r;
        }
    }
};
var P = function () {
    var t = this, a = t._self._c;
    return a("div", [a("ModalCartConfirmation", { ref: "modalCartConfirmation", attrs: { error: t.error, "quantity-added": t.quantity } }), a("ModalConfirmAddToCart", { ref: "ModalConfirmAddToCart", attrs: { product: t.productData, "selected-price": t.selectedPrice } })], 1);
}, A = [], D = /* @__PURE__ */ g(
    $,
    P,
    A,
    !1,
    null,
    null,
    null,
    null
);
const M = D.exports;
function l(r) {
    l.installed || (l.installed = !0, r.component("AddToCart", M));
}
const b = {
    install: l
};
let d = null;
typeof window < "u" ? d = window.Vue : typeof global < "u" && (d = global.Vue);
d && d.use(b);
export {
    M as default
};
