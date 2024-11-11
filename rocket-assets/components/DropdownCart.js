import n from "/components/BaseCart.js";
function l(a, t, e, s, _, m, f, g) {
  var i = typeof a == "function" ? a.options : a;
  return t && (i.render = t, i.staticRenderFns = e, i._compiled = !0), {
    exports: a,
    options: i
  };
}
const c = {
  name: "DropdownCart",
  extends: n,
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
    mouseHover(a) {
      if (a) {
        this.interval = setInterval(() => {
          this.animate = !this.animate;
        }, 1300);
        return;
      }
      clearInterval(this.interval);
    }
  }
};
var d = function() {
  var t = this, e = t._self._c;
  return e("div", { staticClass: "dropdown" }, [e("rocket-emitter", { staticClass: "child-emitter", attrs: { emits: "cart", label: "Carrinho de compras" } }, [t.items.length ? e("div", { staticClass: "products-cart" }, [e("div", { staticClass: "cart-header flex -between" }, [e("span", { staticClass: "-title" }, [t._v("MEU CARRINHO")]), t.shouldShowCartSavings ? t._e() : e("span", { staticClass: "cart-value price" }, [t._v(t._s(t._f("formatMoney")(t.totalCartValue)))])]), e("div", { staticClass: "cart-products-list" }, [e("buy-together-cart-group", { staticClass: "buy-together-dropdown", attrs: { "buy-together-items": t.buyTogetherItems, loading: t.loading }, on: { removeCombo: t.handleRemoveCombo } }), t._l(t.items.filter((s) => !s.kit_id), function(s) {
    return e("div", { key: s.id, staticClass: "cart-product flex -between -wrap", class: {
      loading: t.loading[s.id],
      "-vcenter": s.kit_id
    } }, [e("product-cart-box", { attrs: { product: s, "show-product-quantity": !1, "show-product-cart-savings": t.showProductCartSavings } })], 1);
  })], 2), t.shouldShowCartSavings ? e("div", { staticClass: "side-cart-total-value mt-21" }, [e("div", { staticClass: "side-cart-row mb-15" }, [e("div", { staticClass: "side-cart-total-text" }, [t._v(" PRODUTOS (" + t._s(t.$tc("cart.amount-of-products", parseInt(t.cart.prices.total_items), { count: parseInt(t.cart.prices.total_items) })) + ") ")]), e("div", { staticClass: "side-cart-subtotal" }, [t._v(" " + t._s(t._f("formatMoney")(t.totalCartValue)) + " ")])]), e("div", { staticClass: "side-cart-row mb-21", class: { shake: t.animate } }, [e("div", { staticClass: "side-cart-savings-text" }, [t._v(" VOCÊ ESTÁ ECONOMIZANDO ")]), e("div", { staticClass: "side-cart-savings-price" }, [t._v(" " + t._s(t._f("formatMoney")(t.totalCartSavings)) + " ")])])]) : t._e(), t.shouldShowCartSavings ? e("hr", { staticClass: "mb-22" }) : t._e(), t.shouldShowCartSavings ? e("div", { staticClass: "side-cart-total-value mb-24" }, [e("div", { staticClass: "side-cart-row" }, [e("span", { staticClass: "side-cart-total-text" }, [t._v("SUBTOTAL")]), e("span", { staticClass: "side-cart-subtotal-after-discounts" }, [t._v(t._s(t.cartValue) + " ")])])]) : t._e(), t.highlightedPrice === "billet" && t.getCartValueByPaymentMethod.configured ? e("div", { staticClass: "side-cart-total-value mb-24" }, [e("div", { staticClass: "side-cart-row" }, [e("span", { staticClass: "side-cart-total-text" }, [e("b", [t._v(t._s(t.getCartValueByPaymentMethod.percentage) + "% DE DESCONTOS")]), t._v(" NO BOLETO")]), e("span", [e("b", [t._v(t._s(t._f("formatMoney")(t.getCartValueByPaymentMethod.value)))])])])]) : t._e(), t.highlightedPrice === "pix" && t.getCartValueByPaymentMethod.configured ? e("div", { staticClass: "side-cart-total-value mb-24" }, [e("div", { staticClass: "side-cart-row" }, [e("span", { staticClass: "side-cart-total-text" }, [e("b", [t._v(t._s(t.getCartValueByPaymentMethod.percentage) + "% DE DESCONTOS")]), t._v(" NO PIX")]), e("span", [e("b", [t._v(t._s(t._f("formatMoney")(t.getCartValueByPaymentMethod.value)))])])])]) : t._e(), e("LoaderButton", { staticClass: "btn btn-primary -block btn-cart-product", attrs: { title: t.buttonText, sending: t.anyLoading, disabled: t.anyLoading }, on: { click: function(s) {
    return t.redirect();
  } } })], 1) : e("div", { staticClass: "empty-cart" }, [e("i", { staticClass: "icon icon-empty-cart" }), e("div", { staticClass: "-title" }, [t._v(" Seu carrinho está vazio ")]), e("span", [t.emptyCartHelperText ? e("div", { staticClass: "-subtitle", domProps: { innerHTML: t._s(t.emptyCartHelperText) } }) : e("div", { staticClass: "-subtitle" }, [t._v(" Navegue pela loja e adicione produtos. ")])]), t.emptyCartTextButton ? e("div", { staticClass: "-cta-holder" }, [e("a", { staticClass: "-cta", on: { click: function(s) {
    return t.linkValidation();
  } } }, [t._v(" " + t._s(t.emptyCartTextButton) + " ")])]) : t._e()])])], 1);
}, u = [], v = /* @__PURE__ */ l(
  c,
  d,
  u
);
const p = v.exports;
function o(a) {
  o.installed || (o.installed = !0, a.component("DropdownCart", p));
}
const C = {
  install: o
};
let r = null;
typeof window < "u" ? r = window.Vue : typeof global < "u" && (r = global.Vue);
r && r.use(C);
export {
  p as default
};
