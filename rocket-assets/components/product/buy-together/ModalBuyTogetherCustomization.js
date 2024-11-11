import { mapGetters as a, mapActions as u } from "http://rocket.test/dist/vendor/vuex.js";
function c(e, t, o, i, p, z, v, P) {
  var s = typeof e == "function" ? e.options : e;
  return t && (s.render = t, s.staticRenderFns = o, s._compiled = !0), {
    exports: e,
    options: s
  };
}
const d = {
  name: "ModalBuyTogetherCustomization",
  data() {
    return {
      active: 0,
      allProductsCustomizations: {}
    };
  },
  computed: {
    ...a("buyTogether", ["productsForCustomization", "customizedProducts"]),
    isFirstProductActive() {
      return this.active === 0;
    },
    isLastProductActive() {
      return this.active + 1 === this.productsForCustomization.length;
    },
    primaryButtonText() {
      return this.isLastProductActive ? "Salvar" : "Próximo";
    },
    currentProductRef() {
      return this.$refs[`CustomizationContent-${this.productsForCustomization[this.active].id}`][0];
    },
    currentProductId() {
      return this.productsForCustomization[this.active].id;
    }
  },
  methods: {
    ...u("buyTogether", ["addSkuCustomization", "reset"]),
    handleModal() {
      this.$refs.baseModal.handleModal();
    },
    handleActive(e) {
      this.currentProductRef.$refs.customizationContent.hasErrorInCustomizations(), this.currentProductRef.$refs.customizationContent.hasErrors || (this.addSkuCustomization({
        [this.currentProductRef.sku.id]: {
          ...this.currentProductRef.$refs.customizationContent.values,
          isPersonalized: this.currentProductRef.skuCustomized
        }
      }), this.active = e);
    },
    handlePrimaryButton() {
      this.currentProductRef.$refs.customizationContent.hasErrorInCustomizations(), !this.currentProductRef.$refs.customizationContent.hasErrors && (this.addSkuCustomization({
        [this.currentProductRef.sku.id]: {
          isPersonalized: this.currentProductRef.$refs.customizationContent.skuCustomized,
          isMandatory: !this.currentProductRef.sku.allow_sell_without_customization,
          ...this.currentProductRef.$refs.customizationContent.values
        }
      }), this.isLastProductActive ? (this.$emit("save"), this.handleModal(), this.active = 0) : this.active++);
    },
    handleSecundaryButton() {
      if (this.active > 0) {
        this.active--;
        return;
      }
      this.isFirstProductActive && (this.reset(), this.handleModal());
    }
  }
};
var l = function() {
  var t = this, o = t._self._c;
  return o("modal", { ref: "baseModal", attrs: { name: "ProductCustomization", title: `${t.$tc("common.count-product", t.productsForCustomization.length)} para personalizar`, scrollable: !1 } }, [t.productsForCustomization.length > 1 ? o("Stepper", { staticClass: "pl-40 pr-40 pl-xs-22 pr-xs-22 mt-30", attrs: { items: t.productsForCustomization, active: t.active }, on: { click: t.handleActive } }) : t._e(), o("div", { staticClass: "buy-together-modal-form mt-38" }, [t.productsForCustomization.length ? o("div", { staticClass: "pl-40 pr-40 pl-xs-22 pr-xs-22 mb-38" }, t._l(t.productsForCustomization, function(i) {
    return o("div", { key: i.id }, [t.currentProductId === i.id ? o("BuyTogetherCustomizationContent", { ref: `CustomizationContent-${i.id}`, refInFor: !0, attrs: { sku: i } }) : t._e()], 1);
  }), 0) : t._e()]), o("hr"), o("div", { staticClass: "control-button" }, [o("button", { staticClass: "btn btn-modal-secundary", on: { click: t.handleSecundaryButton } }, [t._v(" Voltar ")]), o("button", { staticClass: "btn btn-modal-primary", on: { click: t.handlePrimaryButton } }, [t._v(" " + t._s(t.primaryButtonText) + " ")])])], 1);
}, m = [], h = /* @__PURE__ */ c(
  d,
  l,
  m
);
const f = h.exports;
function n(e) {
  n.installed || (n.installed = !0, e.component("ModalBuyTogetherCustomization", f));
}
const C = {
  install: n
};
let r = null;
typeof window < "u" ? r = window.Vue : typeof global < "u" && (r = global.Vue);
r && r.use(C);
export {
  f as default
};
