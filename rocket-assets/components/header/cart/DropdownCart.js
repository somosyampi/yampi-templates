import h from "https://codigo-aberto-sandbox-assets.yampi.io.s3.amazonaws.com/yampi-templates-sandbox/rocket-assets/components/header/cart/BaseCart.js";
function m(i, t, a, s, n, c, u, _) {
    var e = typeof i == "function" ? i.options : i;
    t && (e.render = t, e.staticRenderFns = a, e._compiled = !0), s && (e.functional = !0), c && (e._scopeId = "data-v-" + c);
    var o;
    if (u ? (o = function (r) {
        r = r || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !r && typeof __VUE_SSR_CONTEXT__ < "u" && (r = __VUE_SSR_CONTEXT__), n && n.call(this, r), r && r._registeredComponents && r._registeredComponents.add(u);
    }, e._ssrRegister = o) : n && (o = _ ? function () {
        n.call(
            this,
            (e.functional ? this.parent : this).$root.$options.shadowRoot
        );
    } : n), o)
        if (e.functional) {
            e._injectStyles = o;
            var p = e.render;
            e.render = function (f, C) {
                return o.call(C), p(f, C);
            };
        } else {
            var v = e.beforeCreate;
            e.beforeCreate = v ? [].concat(v, o) : [o];
        }
    return {
        exports: i,
        options: e
    };
}
const g = {
    name: "DropdownCart",
    extends: h,
    props: {
        mouseHover: {
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
            default: "/"
        },
        highlightedPrice: {
            type: String,
            required: !0,
            default: ""
        }
    },
    data() {
        return {
            show: !1
        };
    },
    watch: {
        mouseHover(i) {
            if (i) {
                this.interval = setInterval(() => {
                    this.animate = !this.animate;
                }, 1300);
                return;
            }
            clearInterval(this.interval);
        }
    }
};
var y = function () {
    var t = this, a = t._self._c;
    return a("div", { staticClass: "dropdown" }, [a("RocketEmitter", { staticClass: "child-emitter", attrs: { emits: "cart", label: "Carrinho de compras" } }, [t.items.length ? a("div", { staticClass: "products-cart" }, [a("div", { staticClass: "cart-header flex -between" }, [a("span", { staticClass: "-title" }, [t._v("MEU CARRINHO")]), t.shouldShowCartSavings ? t._e() : a("span", { staticClass: "cart-value price" }, [t._v(t._s(t._f("formatMoney")(t.totalCartValue)))])]), a("div", { staticClass: "cart-products-list" }, [a("BuyTogetherCartGroup", { staticClass: "buy-together-dropdown", attrs: { "buy-together-items": t.buyTogetherItems, loading: t.loading }, on: { removeCombo: t.handleRemoveCombo } }), t._l(t.sortedByFreebies.filter((s) => !s.kit_id), function (s) {
        return a("div", {
            key: s.id, staticClass: "cart-product flex -between -wrap", class: {
                loading: t.loading[s.id],
                "-vcenter": s.kit_id
            }
        }, [a("ProductCartBox", { attrs: { product: s, "show-product-quantity": !1, "show-product-cart-savings": t.showProductCartSavings } })], 1);
    })], 2), t.shouldShowCartSavings ? a("div", { staticClass: "side-cart-total-value mt-21" }, [a("div", { staticClass: "side-cart-row mb-15" }, [a("div", { staticClass: "side-cart-total-text" }, [t._v(" PRODUTOS (" + t._s(t.$tc("cart.amount-of-products", parseInt(t.cart.prices.total_items), { count: parseInt(t.cart.prices.total_items) })) + ") ")]), a("div", { staticClass: "side-cart-subtotal" }, [t._v(" " + t._s(t._f("formatMoney")(t.totalCartValue)) + " ")])]), a("div", { staticClass: "side-cart-row mb-21", class: { shake: t.animate } }, [a("div", { staticClass: "side-cart-savings-text" }, [t._v(" VOC\xCA EST\xC1 ECONOMIZANDO ")]), a("div", { staticClass: "side-cart-savings-price" }, [t._v(" " + t._s(t._f("formatMoney")(t.totalCartSavings)) + " ")])])]) : t._e(), t.shouldShowCartSavings ? a("hr", { staticClass: "mb-22" }) : t._e(), t.shouldShowCartSavings ? a("div", { staticClass: "side-cart-total-value mb-24" }, [a("div", { staticClass: "side-cart-row" }, [a("span", { staticClass: "side-cart-total-text" }, [t._v("SUBTOTAL")]), a("span", { staticClass: "side-cart-subtotal-after-discounts" }, [t._v(t._s(t.cartValue) + " ")])])]) : t._e(), t.highlightedPrice === "billet" && t.getCartValueByPaymentMethod.configured ? a("div", { staticClass: "side-cart-total-value mb-24" }, [a("div", { staticClass: "side-cart-row" }, [a("span", { staticClass: "side-cart-total-text" }, [a("b", [t._v(" " + t._s(t.getCartValueByPaymentMethod.percentage) + "% DE DESCONTOS")]), t._v(" NO BOLETO ")]), a("span", [a("b", [t._v(t._s(t._f("formatMoney")(t.getCartValueByPaymentMethod.value)))])])])]) : t._e(), t.highlightedPrice === "pix" && t.getCartValueByPaymentMethod.configured ? a("div", { staticClass: "side-cart-total-value mb-24" }, [a("div", { staticClass: "side-cart-row" }, [a("span", { staticClass: "side-cart-total-text" }, [a("b", [t._v(t._s(t.getCartValueByPaymentMethod.percentage) + "% DE DESCONTOS")]), t._v(" NO PIX ")]), a("span", [a("b", [t._v(t._s(t._f("formatMoney")(t.getCartValueByPaymentMethod.value)))])])])]) : t._e(), a("LoaderButton", {
        staticClass: "btn btn-primary -block btn-cart-product", attrs: { title: t.buttonText, sending: t.anyLoading, disabled: t.anyLoading }, on: {
            click: function (s) {
                return t.redirect();
            }
        }
    }), t.hasCashbackValid ? a("Cashback", { staticClass: "mt-21", attrs: { "percent-amount": t.validCashback.percent_amount, "text-align": "center" } }) : t._e()], 1) : a("div", { staticClass: "empty-cart" }, [a("i", { staticClass: "icon icon-empty-cart" }), a("div", { staticClass: "-title" }, [t._v(" Seu carrinho est\xE1 vazio ")]), a("span", [t.emptyCartHelperText ? a("div", { staticClass: "-subtitle", domProps: { innerHTML: t._s(t.emptyCartHelperText) } }) : a("div", { staticClass: "-subtitle" }, [t._v(" Navegue pela loja e adicione produtos. ")])]), t.emptyCartTextButton ? a("div", { staticClass: "-cta-holder" }, [a("a", {
        staticClass: "-cta", on: {
            click: function (s) {
                return t.linkValidation();
            }
        }
    }, [t._v(" " + t._s(t.emptyCartTextButton) + " ")])]) : t._e()])])], 1);
}, b = [], w = /* @__PURE__ */ m(
    g,
    y,
    b,
    !1,
    null,
    null,
    null,
    null
);
const S = w.exports;
function d(i) {
    d.installed || (d.installed = !0, i.component("DropdownCart", S));
}
const T = {
    install: d
};
let l = null;
typeof window < "u" ? l = window.Vue : typeof global < "u" && (l = global.Vue);
l && l.use(T);
export {
    S as default
};
