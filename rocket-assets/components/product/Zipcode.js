import d from "lodash/get";
import n from "../vendor/modules/axios/rocket.js";
import p from "../vendor/mixins/errors.js";
import c from "../vendor/mixins/product.js";
import l from "../vendor/mixins/tracking/api.js";
function u(i, e, t, o, y, z, b, w) {
  var s = typeof i == "function" ? i.options : i;
  return e && (s.render = e, s.staticRenderFns = t, s._compiled = !0), {
    exports: i,
    options: s
  };
}
const m = {
  name: "Zipcode",
  mixins: [
    p,
    c,
    l
  ],
  props: {
    quantity: {
      type: Number,
      default: 1
    },
    disabled: {
      type: Boolean,
      default: !1
    }
  },
  data: () => ({
    zipcode: window.Yampi.session.zipcode || "",
    sending: !1,
    data: {}
  }),
  computed: {
    isValidCep() {
      return /^[0-9]{5}\-[\d]{3}$/.test(this.zipcode);
    }
  },
  methods: {
    showModal() {
      this.$refs.modalZipcode.showModal();
    },
    async submit() {
      this.sending = !0, this.handleTrackApi("zipcode-entered", {
        location: "product-page"
      });
      try {
        const i = this.validSku.prices.data.price, { data: e } = await n.post(
          `products/${this.validProduct.id}/shipping-costs`,
          {
            sku_id: this.validSku.id,
            quantity: this.quantity,
            zipcode: this.zipcode,
            total: i * this.quantity
          }
        );
        if (this.data = d(e, "data", {}), Object.keys(this.data).length === 0) {
          this.setError("zipcode", "Ocorreu um erro ao cotar o frete");
          return;
        }
        this.validProduct.custom_shipping && this.formatCustomShippingPrice(), this.showModal();
      } catch (i) {
        console.error(i), this.setError(
          "zipcode",
          // eslint-disable-next-line
          d(i, "response.data.message", "Ocorreu um erro ao cotar o frete")
        );
      } finally {
        this.sending = !1;
      }
    },
    formatCustomShippingPrice() {
      const i = Object.keys(this.data);
      let e = 0;
      i.forEach((t) => {
        this.data[t].delivery_time > e && (e = this.data[t].delivery_time);
      }), this.data = {
        CUSTOMIZADO: {
          service_display_name: "FRETE",
          service_id: "shipping_custom",
          service_name: "shipping_custom",
          service_type_name: "shipping_custom",
          id: "shipping_custom",
          quote_id: "shipping_custom",
          real_price: this.validProduct.shipping_price,
          formated_price: this.validProduct.shipping_price ? this.$formatMoney(this.validProduct.shipping_price) : "Grátis",
          delivery_time: e,
          formated_delivery_time: `até ${e} dias úteis`
        }
      };
    }
  }
};
var f = function() {
  var e = this, t = e._self._c;
  return t("div", { staticClass: "main-product-shipping" }, [t("label", { attrs: { for: "zipcode" } }, [e._v("SIMULAR FRETE")]), t("form", { attrs: { id: "form-zipcode" }, on: { submit: function(o) {
    return o.preventDefault(), e.submit.apply(null, arguments);
  } } }, [t("div", { staticClass: "-holder relative" }, [t("input", { directives: [{ name: "model", rawName: "v-model", value: e.zipcode, expression: "zipcode" }, { name: "mask", rawName: "v-mask", value: "#####-###", expression: "'#####-###'" }], class: { error: e.hasError("zipcode") }, attrs: { "data-1p-ignore": "", type: "tel", name: "zipcode", placeholder: "Ex.: 00000-000", disabled: e.disabled }, domProps: { value: e.zipcode }, on: { input: function(o) {
    o.target.composing || (e.zipcode = o.target.value);
  } } }), t("LoaderButton", { staticClass: "btn btn-secundary -small", attrs: { sending: e.sending, disabled: e.disabled || !e.isValidCep } }, [e._v(" OK ")])], 1), t("ErrorText", { attrs: { text: e.getError("zipcode") } })], 1), t("ModalZipcode", { ref: "modalZipcode", attrs: { data: e.data } })], 1);
}, h = [], _ = /* @__PURE__ */ u(
  m,
  f,
  h
);
const v = _.exports;
function r(i) {
  r.installed || (r.installed = !0, i.component("Zipcode", v));
}
const g = {
  install: r
};
let a = null;
typeof window < "u" ? a = window.Vue : typeof global < "u" && (a = global.Vue);
a && a.use(g);
export {
  v as default
};
