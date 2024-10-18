import o from "https://s3.amazonaws.com/codigo-aberto-sandbox-assets/rocket/assets/rocket-preview/components/BaseCart.js";
function l(s, t, e, a, C, p, g, m) {
  var i = typeof s == "function" ? s.options : s;
  return t && (i.render = t, i.staticRenderFns = e, i._compiled = !0), {
    exports: s,
    options: i
  };
}
const d = {
  name: "SideCart",
  extends: o,
  props: {
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
      isOverflowing: !1,
      showButton: !1,
      animate: !1
    };
  },
  computed: {
    isVisible() {
      return this.$refs.navigationDrawer.active;
    }
  },
  watch: {
    cartQuantity() {
      this.shouldUpdate();
    }
  },
  mounted() {
    window.addEventListener("resize", () => {
      this.shouldUpdate();
    }), window.addEventListener("click", () => {
      if (this.isVisible) {
        this.interval = setInterval(() => {
          this.animate = !this.animate;
        }, 1300);
        return;
      }
      clearInterval(this.interval);
    });
  },
  destroyed() {
    window.removeEventListener("resize", () => {
    });
  },
  methods: {
    shouldUpdate() {
      this.$nextTick().then(() => {
        var t;
        !((t = this.$refs) != null && t.sideCartProductList) || this.$refs.sideCartProductList.scrollHeight > this.$refs.sideCartProductList.clientHeight === this.isOverflowing || this.updateIsOverflowing();
      });
    },
    updateIsOverflowing() {
      this.isOverflowing = this.$refs.sideCartProductList.scrollHeight > this.$refs.sideCartProductList.clientHeight;
    },
    handleShow() {
      this.$refs.navigationDrawer.handleDrawer();
    },
    handleBeforeEnter() {
      this.shouldUpdate();
    },
    handleAfterEnter() {
      this.showButton = !0;
    },
    handleAfterLeave() {
      this.showButton = !1;
    }
  }
};
var c = function() {
  var t = this, e = t._self._c;
  return e("navigation-drawer", { ref: "navigationDrawer", on: { beforeEnter: t.handleBeforeEnter, afterEnter: t.handleAfterEnter, afterLeave: t.handleAfterLeave } }, [e("div", { staticClass: "side-cart-container" }, [e("div", { staticClass: "side-cart-header", class: {
    "--overflows": t.isOverflowing
  } }, [e("div", { staticClass: "theme-title side-cart-title" }, [t._v(" Meu carrinho ")]), e("div", { staticClass: "close-modal", on: { click: t.handleShow } }, [e("i", { staticClass: "icon icon-close-modal" })])]), !t.items.length && !t.loading.all ? e("div", { staticClass: "empty-cart" }, [e("i", { staticClass: "icon icon-empty-cart" }), e("div", { staticClass: "-title" }, [t._v(" Seu carrinho está vazio ")]), e("span", [t.emptyCartHelperText ? e("div", { staticClass: "-subtitle", domProps: { innerHTML: t._s(t.emptyCartHelperText) } }) : e("div", { staticClass: "-subtitle" }, [t._v(" Navegue pela loja e adicione produtos. ")])]), t.emptyCartTextButton ? e("div", { staticClass: "-cta-holder" }, [e("a", { staticClass: "-cta", on: { click: function(a) {
    return t.linkValidation();
  } } }, [t._v(" " + t._s(t.emptyCartTextButton) + " ")])]) : e("div", { staticClass: "continue-buying", on: { click: t.handleShow } }, [e("span", [e("SelectArrow", { staticClass: "icon icon-select-arrow -left" })], 1), t._v(" Continuar comprando ")])]) : e("div", { staticClass: "side-cart-content", class: {
    "--overflows": t.isOverflowing
  } }, [e("div", { ref: "sideCartProductList", staticClass: "side-cart-products-list", class: {
    "--overflows": t.isOverflowing,
    "--show-saved-money": t.shouldShowCartSavings
  } }, [e("buy-together-cart-group", { attrs: { "buy-together-items": t.buyTogetherItems, loading: t.loading }, on: { removeCombo: t.handleRemoveCombo } }), t._l(t.items.filter((a) => !a.kit_id), function(a) {
    return e("div", { key: a.id, class: {
      loading: t.loading[a.id],
      "-vcenter": a.kit_id
    } }, [e("product-cart-box", { attrs: { product: a, "show-product-quantity": !1, "show-product-cart-savings": t.showProductCartSavings } })], 1);
  })], 2), e("transition", { attrs: { name: "fade" } }, [t.showButton ? e("div", { staticClass: "side-cart-button-container", class: {
    "--overflows": t.isOverflowing,
    "--show-saved-money": t.shouldShowCartSavings
  } }, [e("div", { staticClass: "side-cart-total-value" }, [e("div", { staticClass: "side-cart-row mb-15" }, [e("div", { staticClass: "side-cart-total-text" }, [t._v(" PRODUTOS (" + t._s(t.$tc("cart.amount-of-products", parseInt(t.cart.prices.total_items), { count: parseInt(t.cart.prices.total_items) })) + ") ")]), e("div", { staticClass: "side-cart-subtotal" }, [t._v(" " + t._s(t._f("formatMoney")(t.totalCartValue)) + " ")])]), t.shouldShowCartSavings ? e("div", { staticClass: "side-cart-row mb-21", class: { shake: t.animate } }, [e("div", { staticClass: "side-cart-savings-text" }, [t._v(" VOCÊ ESTÁ ECONOMIZANDO ")]), e("div", { staticClass: "side-cart-savings-price" }, [t._v(" " + t._s(t._f("formatMoney")(t.totalCartSavings)) + " ")])]) : t._e()]), t.shouldShowCartSavings ? e("hr", { staticClass: "mb-20" }) : t._e(), e("div", { staticClass: "side-cart-total-value mb-22" }, [e("div", { staticClass: "side-cart-row" }, [e("span", { staticClass: "side-cart-total-text" }, [t._v("SUBTOTAL")]), e("span", { staticClass: "side-cart-subtotal-after-discounts" }, [t._v(t._s(t.cartValue) + " ")])])]), t.highlightedPrice === "billet" ? e("div", { staticClass: "side-cart-total-value mb-24" }, [e("div", { staticClass: "side-cart-row" }, [e("span", { staticClass: "side-cart-total-text" }, [e("b", [t._v(t._s(t.getCartValueByPaymentMethod.percentage) + "% DE DESCONTOS")]), t._v(" NO BOLETO")]), e("span", [e("b", [t._v(t._s(t._f("formatMoney")(t.getCartValueByPaymentMethod.value)))])])])]) : t._e(), t.highlightedPrice === "pix" ? e("div", { staticClass: "side-cart-total-value mb-24" }, [e("div", { staticClass: "side-cart-row" }, [e("span", { staticClass: "side-cart-total-text" }, [e("b", [t._v(t._s(t.getCartValueByPaymentMethod.percentage) + "% DE DESCONTOS")]), t._v(" NO PIX")]), e("span", [e("b", [t._v(t._s(t._f("formatMoney")(t.getCartValueByPaymentMethod.value)))])])])]) : t._e(), e("LoaderButton", { staticClass: "btn btn-primary side-cart-button", attrs: { title: t.buttonText, sending: t.anyLoading, disabled: t.anyLoading }, on: { click: function(a) {
    return t.redirect();
  } } })], 1) : t._e()])], 1)])]);
}, u = [], v = /* @__PURE__ */ l(
  d,
  c,
  u
);
const h = v.exports;
function n(s) {
  n.installed || (n.installed = !0, s.component("SideCart", h));
}
const f = {
  install: n
};
let r = null;
typeof window < "u" ? r = window.Vue : typeof global < "u" && (r = global.Vue);
r && r.use(f);
export {
  h as default
};
