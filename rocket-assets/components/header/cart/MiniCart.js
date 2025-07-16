import { mapGetters as f, mapMutations as v } from "https://openstore-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/vuex.js";
import g from "https://openstore-production-assets.yampi.io/yampi-templates-main/rocket-assets/components/header/cart/BaseCart.js";
function y(t, e, r, d, o, c, l, m) {
    var n = typeof t == "function" ? t.options : t;
    e && (n.render = e, n.staticRenderFns = r, n._compiled = !0), d && (n.functional = !0), c && (n._scopeId = "data-v-" + c);
    var s;
    if (l ? (s = function (a) {
        a = a || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !a && typeof __VUE_SSR_CONTEXT__ < "u" && (a = __VUE_SSR_CONTEXT__), o && o.call(this, a), a && a._registeredComponents && a._registeredComponents.add(l);
    }, n._ssrRegister = s) : o && (s = m ? function () {
        o.call(
            this,
            (n.functional ? this.parent : this).$root.$options.shadowRoot
        );
    } : o), s)
        if (n.functional) {
            n._injectStyles = s;
            var C = n.render;
            n.render = function (_, h) {
                return s.call(h), C(_, h);
            };
        } else {
            var p = n.beforeCreate;
            n.beforeCreate = p ? [].concat(p, s) : [s];
        }
    return {
        exports: t,
        options: n
    };
}
const w = {
    name: "MiniCart",
    extends: g,
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
    computed: {
        ...f("merchant", ["merchant"]),
        ...f("preview", ["isIframe"]),
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
    watch: {
        mouseHover(t) {
            !t && this.isIframe && !this.items.length && this.bootCart();
        }
    },
    async mounted() {
        this.SET_CART_TYPE(this.cartType), await this.bootCart();
    },
    methods: {
        ...v("cart", ["SET_CART_TYPE"])
    }
};
var T = function () {
    var e = this, r = e._self._c;
    return r("div", {
        staticClass: "dropdown-holder", on: {
            mouseenter: function (d) {
                e.mouseHover = !0;
            }, mouseleave: function (d) {
                e.mouseHover = !1;
            }
        }
    }, [r("div", { staticClass: "-align -clean", on: { click: e.cartRedirectAction } }, [r("svg", { staticClass: "cart-icon", attrs: { width: "23", height: "21" } }, [r("defs", [r("path", { attrs: { id: "reuse-1", d: "M9.705 15.205a2.423 2.423 0 00-2.423 2.443C7.282 19.005 8.36 20 9.705 20a2.423 2.423 0 002.423-2.443c0-1.357-1.077-2.352-2.423-2.352zm1.167 2.352c0 .634-.539 1.176-1.167 1.176s-1.167-.543-1.167-1.176c0-.633.539-1.176 1.167-1.176s1.167.543 1.167 1.176zM16.167 15.205a2.423 2.423 0 00-2.423 2.443 2.423 2.423 0 104.846 0 2.423 2.423 0 00-2.423-2.443zm1.166 2.352c0 .634-.538 1.176-1.166 1.176-.629 0-1.167-.543-1.167-1.176 0-.633.539-1.176 1.167-1.176s1.166.543 1.166 1.176z" } }), r("path", { attrs: { id: "reuse-0", "clip-rule": "evenodd", d: "M1.718 1C1.359 1 1 1.362 1 1.724s.359.724.718.724h1.885l1.525 5.79 1.077 4.524c.18.724.808 1.267 1.526 1.267H18.5c.718 0 1.346-.453 1.526-1.177L21.91 6.52c.18-.452.09-.995-.269-1.448-.27-.452-.808-.633-1.256-.633H5.577l-.718-2.895v-.09C4.679 1.18 4.41 1 4.141 1H1.718zm18.936 4.795l-1.974 6.696H7.64L6.026 5.795h14.628z" } })]), r("use", { attrs: { "clip-rule": "evenodd", "xlink:href": "#reuse-0" } }), r("use", { attrs: { "xlink:href": "#reuse-1" } }), r("use", { attrs: { "clip-rule": "evenodd", "xlink:href": "#reuse-0" } }), r("use", { attrs: { "xlink:href": "#reuse-1" } })]), r("span", { staticClass: "cart-quantity", class: { "-loading": e.anyLoading }, domProps: { textContent: e._s(e.cartQuantity) } })]), r(e.cartComponent, { ref: "cartComponent", tag: "component", attrs: { "show-cart-savings": e.showCartSavings, "show-product-cart-savings": e.showProductCartSavings, "mouse-hover": e.mouseHover, "empty-cart-helper-text": e.emptyCartHelperText, "empty-cart-text-button": e.emptyCartTextButton, "empty-cart-link-button": e.emptyCartLinkButton, "highlighted-price": e.highlightedPrice, cashbacks: e.cashbacks } })], 1);
}, S = [], b = /* @__PURE__ */ y(
    w,
    T,
    S,
    !1,
    null,
    null,
    null,
    null
);
const k = b.exports;
function u(t) {
    u.installed || (u.installed = !0, t.component("MiniCart", k));
}
const H = {
    install: u
};
let i = null;
typeof window < "u" ? i = window.Vue : typeof global < "u" && (i = global.Vue);
i && i.use(H);
export {
    k as default
};
