import { mapGetters as i, mapMutations as c } from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/vuex.js";
import d from "https://s3.amazonaws.com/codigo-aberto-sandbox-assets/rocket/assets/rocket-preview/components/cart/BaseCart.js";
function u(t, e, r, o, v, y, g, _) {
    var a = typeof t == "function" ? t.options : t;
    return e && (a.render = e, a.staticRenderFns = r, a._compiled = !0), {
        exports: t,
        options: a
    };
}
const l = {
    name: "MiniCart",
    extends: d,
    props: {
        cartType: {
            type: String,
            default: "suspended",
            validator: (t) => ["suspended", "side_cart"].includes(t)
        },
        showCartSavings: {
            type: Boolean,
            required: !0
        },
        showProductCartSavings: {
            type: Boolean,
            required: !0
        },
        emptyCartHelperText: {
            type: String,
            required: !1,
            default: "Navegue pela loja e adicione produtos."
        },
        emptyCartTextButton: {
            type: String,
            required: !0
        },
        emptyCartLinkButton: {
            type: String,
            required: !0,
            default: ""
        },
        highlightedPrice: {
            type: String,
            required: !0,
            default: ""
        },
        cashbacks: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            mouseHover: !1
        };
    },
    watch: {
        mouseHover(t) {
            !t && this.isIframe && !this.items.length && this.bootCart();
        }
    },
    computed: {
        ...i("merchant", ["merchant"]),
        ...i("preview", ["isIframe"]),
        cartComponent() {
            return {
                suspended: "dropdown-cart",
                side_cart: "side-cart"
            }[this.cartType] || "dropdown-cart";
        },
        cartRedirectAction() {
            const t = {
                suspended: () => {
                    this.isIframe || window.location.assign(this.redirectUrl);
                },
                side_cart: () => {
                    this.$refs.cartComponent.handleShow();
                }
            };
            return t[this.cartType] || t.suspended;
        }
    },
    async mounted() {
        this.SET_CART_TYPE(this.cartType), await this.bootCart();
    },
    methods: {
        ...c("cart", ["SET_CART_TYPE"])
    }
};
var p = function () {
    var e = this, r = e._self._c;
    return r("div", {
        staticClass: "dropdown-holder", on: {
            mouseenter: function (o) {
                e.mouseHover = !0;
            }, mouseleave: function (o) {
                e.mouseHover = !1;
            }
        }
    }, [r("div", { staticClass: "-align -clean", on: { click: e.cartRedirectAction } }, [r("svg", { staticClass: "cart-icon", attrs: { width: "23", height: "21" } }, [r("defs", [r("path", { attrs: { id: "reuse-1", d: "M9.705 15.205a2.423 2.423 0 00-2.423 2.443C7.282 19.005 8.36 20 9.705 20a2.423 2.423 0 002.423-2.443c0-1.357-1.077-2.352-2.423-2.352zm1.167 2.352c0 .634-.539 1.176-1.167 1.176s-1.167-.543-1.167-1.176c0-.633.539-1.176 1.167-1.176s1.167.543 1.167 1.176zM16.167 15.205a2.423 2.423 0 00-2.423 2.443 2.423 2.423 0 104.846 0 2.423 2.423 0 00-2.423-2.443zm1.166 2.352c0 .634-.538 1.176-1.166 1.176-.629 0-1.167-.543-1.167-1.176 0-.633.539-1.176 1.167-1.176s1.166.543 1.166 1.176z" } }), r("path", { attrs: { id: "reuse-0", "clip-rule": "evenodd", d: "M1.718 1C1.359 1 1 1.362 1 1.724s.359.724.718.724h1.885l1.525 5.79 1.077 4.524c.18.724.808 1.267 1.526 1.267H18.5c.718 0 1.346-.453 1.526-1.177L21.91 6.52c.18-.452.09-.995-.269-1.448-.27-.452-.808-.633-1.256-.633H5.577l-.718-2.895v-.09C4.679 1.18 4.41 1 4.141 1H1.718zm18.936 4.795l-1.974 6.696H7.64L6.026 5.795h14.628z" } })]), r("use", { attrs: { "clip-rule": "evenodd", "xlink:href": "#reuse-0" } }), r("use", { attrs: { "xlink:href": "#reuse-1" } }), r("use", { attrs: { "clip-rule": "evenodd", "xlink:href": "#reuse-0" } }), r("use", { attrs: { "xlink:href": "#reuse-1" } })]), r("span", { staticClass: "cart-quantity", class: { "-loading": e.anyLoading }, domProps: { textContent: e._s(e.cartQuantity) } })]), r(e.cartComponent, { ref: "cartComponent", tag: "component", attrs: { "show-cart-savings": e.showCartSavings, "show-product-cart-savings": e.showProductCartSavings, "mouse-hover": e.mouseHover, "empty-cart-helper-text": e.emptyCartHelperText, "empty-cart-text-button": e.emptyCartTextButton, "empty-cart-link-button": e.emptyCartLinkButton, "highlighted-price": e.highlightedPrice, cashbacks: e.cashbacks } })], 1);
}, m = [], h = /* @__PURE__ */ u(
    l,
    p,
    m
);
const f = h.exports;
function s(t) {
    s.installed || (s.installed = !0, t.component("MiniCart", f));
}
const C = {
    install: s
};
let n = null;
typeof window < "u" ? n = window.Vue : typeof global < "u" && (n = global.Vue);
n && n.use(C);
export {
    f as default
};
