import c from "https://s3.amazonaws.com/codigo-aberto-sandbox-assets/rocket/assets/rocket-preview/vendor/lodash.js";
import p from "https://s3.amazonaws.com/codigo-aberto-sandbox-assets/rocket/assets/rocket-preview/vendor/modules/axios/rocket.js";
import l from "https://s3.amazonaws.com/codigo-aberto-sandbox-assets/rocket/assets/rocket-preview/vendor/mixins/errors.js";
import u from "https://s3.amazonaws.com/codigo-aberto-sandbox-assets/rocket/assets/rocket-preview/vendor/mixins/product.js";
import m from "https://s3.amazonaws.com/codigo-aberto-sandbox-assets/rocket/assets/rocket-preview/vendor/mixins/tracking/api.js";
function f(t, e, i, o, d, a, b, w) {
  var s = typeof t == "function" ? t.options : t;
  return e && (s.render = e, s.staticRenderFns = i, s._compiled = !0), {
    exports: t,
    options: s
  };
}
const h = {
  name: "Zipcode",
  mixins: [
    l,
    u,
    m
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
        const t = this.validSku.prices.data.price, { data: e } = await p.post(
          `products/${this.validProduct.id}/shipping-costs`,
          {
            sku_id: this.validSku.id,
            quantity: this.quantity,
            zipcode: this.zipcode,
            total: t * this.quantity
          }
        );
        if (this.data = c.get(e, "data", {}), Object.keys(this.data).length === 0) {
          this.setError("zipcode", "Ocorreu um erro ao cotar o frete");
          return;
        }
        this.validProduct.custom_shipping && this.formatCustomShippingPrice(), this.showModal();
      } catch (t) {
        console.error(t), this.setError(
          "zipcode",
          // eslint-disable-next-line
          c.get(t, "response.data.message", "Ocorreu um erro ao cotar o frete")
        );
      } finally {
        this.sending = !1;
      }
    },
    formatCustomShippingPrice() {
      const t = Object.keys(this.data);
      let e = 0, i = "", o = "", d = "";
      t.forEach((a) => {
        this.data[a].delivery_time > e && (e = this.data[a].delivery_time, i = this.data[a].city, o = this.data[a].zipcode, d = this.data[a].uf);
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
          formated_delivery_time: `até ${e} dias úteis`,
          zipcode: o,
          city: i,
          uf: d
        }
      };
    }
  }
};
var _ = function() {
  var e = this, i = e._self._c;
  return i("div", { staticClass: "main-product-shipping" }, [i("label", { attrs: { for: "zipcode" } }, [e._v("SIMULAR FRETE")]), i("form", { attrs: { id: "form-zipcode" }, on: { submit: function(o) {
    return o.preventDefault(), e.submit.apply(null, arguments);
  } } }, [i("div", { staticClass: "-holder relative" }, [i("input", { directives: [{ name: "model", rawName: "v-model", value: e.zipcode, expression: "zipcode" }, { name: "mask", rawName: "v-mask", value: "#####-###", expression: "'#####-###'" }], class: { error: e.hasError("zipcode") }, attrs: { "data-1p-ignore": "", type: "tel", name: "zipcode", placeholder: "Ex.: 00000-000", disabled: e.disabled }, domProps: { value: e.zipcode }, on: { input: function(o) {
    o.target.composing || (e.zipcode = o.target.value);
  } } }), i("LoaderButton", { staticClass: "btn btn-secundary -small", attrs: { sending: e.sending, disabled: e.disabled || !e.isValidCep } }, [e._v(" OK ")])], 1), i("ErrorText", { attrs: { text: e.getError("zipcode") } })], 1), i("ModalZipcode", { ref: "modalZipcode", attrs: { data: e.data } })], 1);
}, v = [], g = /* @__PURE__ */ f(
  h,
  _,
  v
);
const y = g.exports;
function n(t) {
  n.installed || (n.installed = !0, t.component("Zipcode", y));
}
const z = {
  install: n
};
let r = null;
typeof window < "u" ? r = window.Vue : typeof global < "u" && (r = global.Vue);
r && r.use(z);
export {
  y as default
};
