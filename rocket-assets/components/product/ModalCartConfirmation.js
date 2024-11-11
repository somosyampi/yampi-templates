import { mapGetters as r, mapActions as d } from "http://rocket.test/dist/vendor/vuex.js";
import s from "http://rocket.test/dist/vendor/lodash.js";
import l from "http://rocket.test/dist/vendor/mixins/tracking/api.js";
import c from "http://rocket.test/dist/vendor/modules/eventBus.js";
function m(o, e, t, v, w, M, y, b) {
  var a = typeof o == "function" ? o.options : o;
  return e && (a.render = e, a.staticRenderFns = t, a._compiled = !0), {
    exports: o,
    options: a
  };
}
const u = {
  name: "ModalCartConfirmation",
  mixins: [l],
  props: {
    error: {
      type: [String, void 0],
      default: () => {
      }
    },
    quantityAdded: {
      type: Number,
      default: 1
    }
  },
  computed: {
    ...r("cart", [
      "cart"
    ]),
    ...r("merchant", [
      "merchant"
    ]),
    ...r("preview", [
      "isPreview"
    ])
  },
  mounted() {
    c.$on("addedToCart", this.showModal);
  },
  methods: {
    ...d("cart", ["redirectToCart"]),
    showModal() {
      this.$refs.cartConfirmBaseModal.showModal();
    },
    closeModal() {
      this.$refs.cartConfirmBaseModal.closeModal();
    },
    handleKeepBuying() {
      this.handleTrackApi("keep-buying-clicked"), this.closeModal();
    },
    async handleRedirectoToCart() {
      this.isPreview && this.closeModal();
      const o = window.themeConfig.theme.params;
      await this.handleTrackApi("checkout-intended", {
        location: "modal-cart-confirm",
        quick_buy_button_enabled: o.show_add_to_cart_button,
        items: s.map(this.cart.items, "name"),
        amount: s.sumBy(this.cart.items, "price_total")
      }), this.redirectToCart();
    }
  }
};
var f = function() {
  var e = this, t = e._self._c;
  return t("modal", { ref: "cartConfirmBaseModal", attrs: { name: "cart-confirm" } }, [e.error ? [t("h3", { staticClass: "theme-title" }, [e._v(" Oops!"), t("br"), e._v(" Ocorreu um erro. ")]), t("p", { staticClass: "alert -red", domProps: { textContent: e._s(e.error) } })] : [t("h3", { staticClass: "theme-title", domProps: { innerHTML: e._s(e.$tc("add-to-cart.product-added", e.quantityAdded)) } }), t("p", { staticClass: "description" }, [e._v(" O que deseja fazer agora? ")]), t("button", { staticClass: "btn btn-primary flex -vcenter", on: { click: e.handleRedirectoToCart } }, [t("svg", { attrs: { width: "11", height: "14", viewBox: "0 0 11 14", fill: "none", xmlns: "http://www.w3.org/2000/svg" } }, [t("path", { attrs: { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M10.1081 5.63865H9.83601V4.36532C9.83601 2.01021 7.96708 0.0428572 5.63113 0.000860586C5.5673 -0.000286862 5.43977 -0.000286862 5.37597 0.000860586C3.03996 0.0428572 1.17106 2.01021 1.17106 4.36532V5.63865H0.89897C0.479692 5.63865 0.137695 6.07129 0.137695 6.60563V12.9921C0.137695 13.5258 0.479692 13.9625 0.898998 13.9625H10.1081C10.5273 13.9625 10.8694 13.5258 10.8694 12.9921V6.60563C10.8694 6.07132 10.5274 5.63865 10.1081 5.63865ZM6.36631 9.79239V11.7221C6.36631 11.9431 6.18132 12.1301 5.96017 12.1301H5.04698C4.82581 12.1301 4.64081 11.9431 4.64081 11.7221V9.79239C4.42632 9.58126 4.30145 9.28932 4.30145 8.96637C4.30145 8.35438 4.77452 7.82851 5.37601 7.80421C5.43975 7.80163 5.56743 7.80163 5.63117 7.80421C6.23266 7.82851 6.70573 8.35438 6.70573 8.96637C6.70567 9.28932 6.5808 9.58126 6.36631 9.79239ZM5.6311 5.6387H8.04281H8.04284V4.36537C8.04284 2.96247 6.90268 1.80249 5.50351 1.80249C4.10434 1.80249 2.96423 2.96247 2.96423 4.36537V5.6387H5.37594H5.6311Z" } })]), e._v(" Finalizar compra ")])], t("div", { staticClass: "btn-clean link-alike flex -vcenter -hcenter", on: { click: e.handleKeepBuying } }, [t("SelectArrow", { staticClass: "icon icon-select-arrow -left" }), e._v(" Continuar comprando ")], 1)], 2);
}, p = [], h = /* @__PURE__ */ m(
  u,
  f,
  p
);
const C = h.exports;
function i(o) {
  i.installed || (i.installed = !0, o.component("ModalCartConfirmation", C));
}
const _ = {
  install: i
};
let n = null;
typeof window < "u" ? n = window.Vue : typeof global < "u" && (n = global.Vue);
n && n.use(_);
export {
  C as default
};
