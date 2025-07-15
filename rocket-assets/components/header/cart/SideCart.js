import p from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/components/header/cart/BaseCart.js";
function g(r, t, e, s, o, c, u, f) {
  var a = typeof r == "function" ? r.options : r;
  t && (a.render = t, a.staticRenderFns = e, a._compiled = !0), s && (a.functional = !0), c && (a._scopeId = "data-v-" + c);
  var n;
  if (u ? (n = function(i) {
    i = i || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !i && typeof __VUE_SSR_CONTEXT__ < "u" && (i = __VUE_SSR_CONTEXT__), o && o.call(this, i), i && i._registeredComponents && i._registeredComponents.add(u);
  }, a._ssrRegister = n) : o && (n = f ? function() {
    o.call(
      this,
      (a.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : o), n)
    if (a.functional) {
      a._injectStyles = n;
      var C = a.render;
      a.render = function(_, h) {
        return n.call(h), C(_, h);
      };
    } else {
      var v = a.beforeCreate;
      a.beforeCreate = v ? [].concat(v, n) : [n];
    }
  return {
    exports: r,
    options: a
  };
}
const m = {
  name: "SideCart",
  extends: p,
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
var w = function() {
  var t = this, e = t._self._c;
  return e("NavigationDrawer", { ref: "navigationDrawer", on: { beforeEnter: t.handleBeforeEnter, afterEnter: t.handleAfterEnter, afterLeave: t.handleAfterLeave } }, [e("div", { staticClass: "side-cart-container" }, [e("div", { staticClass: "side-cart-header", class: {
    "--overflows": t.isOverflowing
  } }, [e("div", { staticClass: "theme-title side-cart-title" }, [t._v(" Meu carrinho ")]), e("div", { staticClass: "close-modal", on: { click: t.handleShow } }, [e("i", { staticClass: "icon icon-close-modal" })])]), !t.items.length && !t.loading.all ? e("div", { staticClass: "empty-cart" }, [e("i", { staticClass: "icon icon-empty-cart" }), e("div", { staticClass: "-title" }, [t._v(" Seu carrinho est\xE1 vazio ")]), e("span", [t.emptyCartHelperText ? e("div", { staticClass: "-subtitle", domProps: { innerHTML: t._s(t.emptyCartHelperText) } }) : e("div", { staticClass: "-subtitle" }, [t._v(" Navegue pela loja e adicione produtos. ")])]), t.emptyCartTextButton ? e("div", { staticClass: "-cta-holder" }, [e("a", { staticClass: "-cta", on: { click: function(s) {
    return t.linkValidation();
  } } }, [t._v(" " + t._s(t.emptyCartTextButton) + " ")])]) : e("div", { staticClass: "continue-buying", on: { click: t.handleShow } }, [e("span", [e("SelectArrow", { staticClass: "icon icon-select-arrow -left" })], 1), t._v(" Continuar comprando ")])]) : e("div", { staticClass: "side-cart-content", class: {
    "--overflows": t.isOverflowing
  } }, [e("div", { ref: "sideCartProductList", staticClass: "side-cart-products-list", class: {
    "--overflows": t.isOverflowing
  } }, [e("BuyTogetherCartGroup", { attrs: { "buy-together-items": t.buyTogetherItems, loading: t.loading }, on: { removeCombo: t.handleRemoveCombo } }), t._l(t.sortedByFreebies.filter((s) => !s.kit_id), function(s) {
    return e("div", { key: s.id, class: {
      loading: t.loading[s.id],
      "-vcenter": s.kit_id
    } }, [e("ProductCartBox", { attrs: { product: s, "show-product-quantity": !1, "show-product-cart-savings": t.showProductCartSavings } })], 1);
  })], 2), e("Transition", { attrs: { name: "fade" } }, [t.showButton ? e("div", { staticClass: "side-cart-button-container", class: {
    "--overflows": t.isOverflowing
  } }, [e("div", { staticClass: "side-cart-total-value" }, [e("div", { staticClass: "side-cart-row mb-15" }, [e("div", { staticClass: "side-cart-total-text" }, [t._v(" PRODUTOS (" + t._s(t.$tc("cart.amount-of-products", parseInt(t.cart.prices.total_items), { count: parseInt(t.cart.prices.total_items) })) + ") ")]), e("div", { staticClass: "side-cart-subtotal" }, [t._v(" " + t._s(t._f("formatMoney")(t.totalCartValue)) + " ")])]), t.shouldShowCartSavings ? e("div", { staticClass: "side-cart-row mb-21", class: { shake: t.animate } }, [e("div", { staticClass: "side-cart-savings-text" }, [t._v(" VOC\xCA EST\xC1 ECONOMIZANDO ")]), e("div", { staticClass: "side-cart-savings-price" }, [t._v(" " + t._s(t._f("formatMoney")(t.totalCartSavings)) + " ")])]) : t._e()]), t.shouldShowCartSavings ? e("hr", { staticClass: "mb-20" }) : t._e(), e("div", { staticClass: "side-cart-total-value mb-22" }, [e("div", { staticClass: "side-cart-row" }, [e("span", { staticClass: "side-cart-total-text" }, [t._v("SUBTOTAL")]), e("span", { staticClass: "side-cart-subtotal-after-discounts" }, [t._v(t._s(t.cartValue) + " ")])])]), t.highlightedPrice === "billet" ? e("div", { staticClass: "side-cart-total-value mb-24" }, [e("div", { staticClass: "side-cart-row" }, [e("span", { staticClass: "side-cart-total-text" }, [e("b", [t._v(t._s(t.getCartValueByPaymentMethod.percentage) + "% DE DESCONTOS")]), t._v(" NO BOLETO")]), e("span", [e("b", [t._v(t._s(t._f("formatMoney")(t.getCartValueByPaymentMethod.value)))])])])]) : t._e(), t.highlightedPrice === "pix" ? e("div", { staticClass: "side-cart-total-value mb-24" }, [e("div", { staticClass: "side-cart-row" }, [e("span", { staticClass: "side-cart-total-text" }, [e("b", [t._v(t._s(t.getCartValueByPaymentMethod.percentage) + "% DE DESCONTOS")]), t._v(" NO PIX")]), e("span", [e("b", [t._v(t._s(t._f("formatMoney")(t.getCartValueByPaymentMethod.value)))])])])]) : t._e(), e("LoaderButton", { staticClass: "btn btn-primary side-cart-button", attrs: { title: t.buttonText, sending: t.anyLoading, disabled: t.anyLoading }, on: { click: function(s) {
    return t.redirect();
  } } }), t.hasCashbackValid ? e("Cashback", { staticClass: "mt-21", attrs: { "percent-amount": t.validCashback.percent_amount, "text-align": "center" } }) : t._e()], 1) : t._e()])], 1)])]);
}, y = [], b = /* @__PURE__ */ g(
  m,
  w,
  y,
  !1,
  null,
  null,
  null,
  null
);
const S = b.exports;
function d(r) {
  d.installed || (d.installed = !0, r.component("SideCart", S));
}
const O = {
  install: d
};
let l = null;
typeof window < "u" ? l = window.Vue : typeof global < "u" && (l = global.Vue);
l && l.use(O);
export {
  S as default
};
