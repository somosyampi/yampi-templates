import i from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/lodash.js";
import o from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/mixins/product.js";
import { createPriceObjects as s } from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/mixins/helpers.js";
function d(t, e, r, _, P, v, y, b) {
  var a = typeof t == "function" ? t.options : t;
  return e && (a.render = e, a.staticRenderFns = r, a._compiled = !0), {
    exports: t,
    options: a
  };
}
const l = {
  name: "ProductInfo",
  mixins: [
    o
  ],
  props: {
    selectedPrice: {
      type: String,
      default: "promotional"
    }
  },
  computed: {
    skuText() {
      return this.validSku ? this.validSku.sku : this.validProduct ? this.validProduct.sku.split(",", 1)[0] : "";
    },
    price() {
      const t = this.validSku || this.validProduct;
      return i.get(t, "prices.data", {});
    },
    priceObject() {
      return i.get(this.price, this.selectedPriceMeta.path, {});
    },
    currentFormattedPrice() {
      return Object.keys(this.priceObject).length ? `${i.get(this.price, this.selectedPriceMeta.path, this.firstSku[0].prices.data.price_formated)}` : `${i.get(this.price, "price_formated", this.firstSku[0].prices.data.price_formated)}`;
    },
    selectedPriceText() {
      return Object.keys(this.priceObject).length ? this.selectedPriceMeta.text : "";
    },
    selectedPriceMeta() {
      return s({ basePath: "", pricePath: "price_formatted" })[this.selectedPrice];
    },
    availability() {
      return i.get(this.validSku, "days_availability_formated");
    }
  }
};
var u = function() {
  var e = this, r = e._self._c;
  return r("div", [e._t("default", null, { sku: e.skuText, availability: e.availability, warranty: e.validProduct.warranty, price: e.price, formattedPrice: e.currentFormattedPrice, priceTypeText: e.selectedPriceText }), r("AddToCart")], 2);
}, p = [], f = /* @__PURE__ */ d(
  l,
  u,
  p
);
const m = f.exports;
function n(t) {
  n.installed || (n.installed = !0, t.component("ProductInfo", m));
}
const h = {
  install: n
};
let c = null;
typeof window < "u" ? c = window.Vue : typeof global < "u" && (c = global.Vue);
c && c.use(h);
export {
  m as default
};
