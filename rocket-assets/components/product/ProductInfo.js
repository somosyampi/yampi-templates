import s from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/lodash.js";
import v from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/mixins/product.js";
import g from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/mixins/prices.js";
import { createPriceObjects as b } from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/mixins/helpers.js";
function y(t, e, o, c, n, u, p, _) {
  var i = typeof t == "function" ? t.options : t;
  e && (i.render = e, i.staticRenderFns = o, i._compiled = !0), c && (i.functional = !0), u && (i._scopeId = "data-v-" + u);
  var a;
  if (p ? (a = function(r) {
    r = r || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !r && typeof __VUE_SSR_CONTEXT__ < "u" && (r = __VUE_SSR_CONTEXT__), n && n.call(this, r), r && r._registeredComponents && r._registeredComponents.add(p);
  }, i._ssrRegister = a) : n && (a = _ ? function() {
    n.call(
      this,
      (i.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : n), a)
    if (i.functional) {
      i._injectStyles = a;
      var m = i.render;
      i.render = function(P, h) {
        return a.call(h), m(P, h);
      };
    } else {
      var f = i.beforeCreate;
      i.beforeCreate = f ? [].concat(f, a) : [a];
    }
  return {
    exports: t,
    options: i
  };
}
const T = {
  name: "ProductInfo",
  mixins: [
    v,
    g
  ],
  props: {
    highlightTypePayment: {
      type: String,
      default: "promotional"
    }
  },
  computed: {
    skuText() {
      return this.validSku ? this.validSku.sku : this.validProduct ? this.validProduct.sku.split(",", 1)[0] : "";
    },
    price() {
      const t = this.validSku || this.validProduct, e = s.get(t, "prices.data", {});
      return this.productPrices && !this.loadingPrices ? this.productPrices : e;
    },
    priceObject() {
      return !this.selectedPriceMeta || !this.selectedPriceMeta.path ? {} : s.get(this.price, this.selectedPriceMeta.path, {});
    },
    currentFormattedPrice() {
      return Object.keys(this.priceObject).length ? `${s.get(this.price, this.selectedPriceMeta.path, this.firstSku[0].prices.data.price_formated)}` : `${s.get(this.price, "price_formated", this.firstSku[0].prices.data.price_formated)}`;
    },
    selectedPriceText() {
      return Object.keys(this.priceObject).length ? this.selectedPriceMeta.text : "";
    },
    selectedPriceMeta() {
      const t = b({ basePath: "", pricePath: "price_formatted" });
      return t[this.highlightTypePayment] || t.promotional;
    },
    availability() {
      return s.get(this.validSku, "days_availability_formated");
    }
  },
  watch: {
    selectedSku(t) {
      var o, c, n;
      const e = ((o = this.validProduct) == null ? void 0 : o.id) || ((n = (c = window.data) == null ? void 0 : c.product) == null ? void 0 : n.data.id);
      !e || (this.productPricesParams = t != null && t.id ? { product_id: e, sku_id: t.id } : { product_id: e });
    }
  }
};
var k = function() {
  var e = this, o = e._self._c;
  return o("div", [e._t("default", null, { sku: e.skuText, availability: e.availability, warranty: e.validProduct.warranty, price: e.price, formattedPrice: e.currentFormattedPrice, priceTypeText: e.selectedPriceText, loadingPrices: e.loadingPrices }), o("AddToCart")], 2);
}, w = [], C = /* @__PURE__ */ y(
  T,
  k,
  w,
  !1,
  null,
  null,
  null,
  null
);
const S = C.exports;
function l(t) {
  l.installed || (l.installed = !0, t.component("ProductInfo", S));
}
const O = {
  install: l
};
let d = null;
typeof window < "u" ? d = window.Vue : typeof global < "u" && (d = global.Vue);
d && d.use(O);
export {
  S as default
};
