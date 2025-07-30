import v from "https://codigo-aberto-sandbox-assets.yampi.io.s3.amazonaws.com/yampi-templates-sandbox/rocket-assets/dist/vendor/lodash.js";
import g from "https://codigo-aberto-sandbox-assets.yampi.io.s3.amazonaws.com/yampi-templates-sandbox/rocket-assets/components/product/installments/BaseInstallments.js";
import C from "https://codigo-aberto-sandbox-assets.yampi.io.s3.amazonaws.com/yampi-templates-sandbox/rocket-assets/dist/vendor/mixins/buttons.js";
function b(a, t, n, u, o, d, c, p) {
  var e = typeof a == "function" ? a.options : a;
  t && (e.render = t, e.staticRenderFns = n, e._compiled = !0), u && (e.functional = !0), d && (e._scopeId = "data-v-" + d);
  var i;
  if (c ? (i = function(s) {
    s = s || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !s && typeof __VUE_SSR_CONTEXT__ < "u" && (s = __VUE_SSR_CONTEXT__), o && o.call(this, s), s && s._registeredComponents && s._registeredComponents.add(c);
  }, e._ssrRegister = i) : o && (i = p ? function() {
    o.call(
      this,
      (e.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : o), i)
    if (e.functional) {
      e._injectStyles = i;
      var m = e.render;
      e.render = function(h, f) {
        return i.call(f), m(h, f);
      };
    } else {
      var _ = e.beforeCreate;
      e.beforeCreate = _ ? [].concat(_, i) : [i];
    }
  return {
    exports: a,
    options: e
  };
}
const y = {
  name: "FloatingButton",
  extends: g,
  mixins: [C],
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
      return v.last(this.installments.installments);
    },
    showFloatingButton() {
      return !this.buttons.length;
    }
  },
  async created() {
    this.scroll(), this.installments = await this.handleInstallments();
  }
};
var k = function() {
  var t = this, n = t._self._c;
  return n("div", { staticClass: "floating-button" }, [n("Transition", { attrs: { name: "fade" } }, [t.sku && t.showFloatingButton ? n("div", { staticClass: "floating-button-container" }, [n("div", { staticClass: "prices-container" }, [n("p", { class: t.originalPriceClass }, [t._v(" " + t._s(t.sku.prices.data.price_sale_formated) + " ")]), t.sku.prices.data.price_discount > 0 ? n("p", { staticClass: "original-price" }, [t._v(" " + t._s(t.sku.prices.data.price_discount_formated) + " ")]) : t._e(), t.lastInstallment ? n("div", { staticClass: "installments" }, [n("p", [t._v(" " + t._s(t.lastInstallment.installment) + "x de "), n("span", { staticClass: "installment-price" }, [t._v(" " + t._s(t._f("formatMoney")(t.lastInstallment.installment_value)) + " ")]), t.lastInstallment.tax_value === 0 ? n("span", [t._v(" sem juros ")]) : t._e()])]) : t._e()]), n("div", { staticClass: "button-container" }, [n("LoaderButton", { staticClass: "btn btn-primary", attrs: { sending: t.loadingButton, disabled: t.disabled }, on: { click: function(u) {
    return t.$emit("click");
  } } }, [t._v(" " + t._s(t.buyButtonText) + " ")])], 1)]) : n("Loader", { attrs: { height: 50, margin: 13 } })], 1)], 1);
}, B = [], $ = /* @__PURE__ */ b(
  y,
  k,
  B,
  !1,
  null,
  null,
  null,
  null
);
const w = $.exports;
function r(a) {
  r.installed || (r.installed = !0, a.component("FloatingButton", w));
}
const I = {
  install: r
};
let l = null;
typeof window < "u" ? l = window.Vue : typeof global < "u" && (l = global.Vue);
l && l.use(I);
export {
  w as default
};
