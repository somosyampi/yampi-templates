import o from "https://s3.amazonaws.com/codigo-aberto-sandbox-assets/rocket/assets/rocket-preview/vendor/lodash.js";
import r from "https://s3.amazonaws.com/codigo-aberto-sandbox-assets/rocket/assets/rocket-preview/components/product/BaseInstallments.js";
import u from "https://s3.amazonaws.com/codigo-aberto-sandbox-assets/rocket/assets/rocket-preview/vendor/mixins/buttons.js";
function c(e, t, n, l, h, v, b, y) {
  var s = typeof e == "function" ? e.options : e;
  return t && (s.render = t, s.staticRenderFns = n, s._compiled = !0), {
    exports: e,
    options: s
  };
}
const d = {
  name: "FloatingButton",
  extends: r,
  mixins: [u],
  props: {
    quantity: {
      type: Number,
      default: 1
    },
    loadingButton: {
      type: Boolean,
      required: !0
    },
    disabled: {
      type: Boolean,
      default: !1
    }
  },
  computed: {
    sku() {
      return this.selectedSku || this.firstValidSku;
    },
    buyButtonText() {
      return this.quantity > 1 ? `Comprar (${this.quantity})` : "Comprar";
    },
    originalPriceClass() {
      return this.sku.prices.data.has_promotion || this.sku.prices.data.price_discount > 0 ? "original-price-discount" : "original-price";
    },
    lastInstallment() {
      return o.last(this.installments.installments);
    },
    showFloatingButton() {
      return !this.buttons.length;
    }
  },
  async created() {
    this.scroll(), this.installments = await this.handleInstallments();
  }
};
var m = function() {
  var t = this, n = t._self._c;
  return n("div", { staticClass: "floating-button" }, [n("transition", { attrs: { name: "fade" } }, [t.sku && t.showFloatingButton ? n("div", { staticClass: "floating-button-container" }, [n("div", { staticClass: "prices-container" }, [n("p", { class: t.originalPriceClass }, [t._v(" " + t._s(t.sku.prices.data.price_sale_formated) + " ")]), t.sku.prices.data.price_discount > 0 ? n("p", { staticClass: "original-price" }, [t._v(" " + t._s(t.sku.prices.data.price_discount_formated) + " ")]) : t._e(), t.lastInstallment ? n("div", { staticClass: "installments" }, [n("p", [t._v(" " + t._s(t.lastInstallment.installment) + "x de "), n("span", { staticClass: "installment-price" }, [t._v(" " + t._s(t._f("formatMoney")(t.lastInstallment.installment_value)) + " ")]), t.lastInstallment.tax_value === 0 ? n("span", [t._v(" sem juros ")]) : t._e()])]) : t._e()]), n("div", { staticClass: "button-container" }, [n("LoaderButton", { staticClass: "btn btn-primary", attrs: { sending: t.loadingButton, disabled: t.disabled }, on: { click: function(l) {
    return t.$emit("click");
  } } }, [t._v(" " + t._s(t.buyButtonText) + " ")])], 1)]) : n("loader", { attrs: { height: 50, margin: 13 } })], 1)], 1);
}, p = [], _ = /* @__PURE__ */ c(
  d,
  m,
  p
);
const f = _.exports;
function a(e) {
  a.installed || (a.installed = !0, e.component("FloatingButton", f));
}
const g = {
  install: a
};
let i = null;
typeof window < "u" ? i = window.Vue : typeof global < "u" && (i = global.Vue);
i && i.use(g);
export {
  f as default
};
