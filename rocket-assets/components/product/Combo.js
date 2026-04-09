import { mapActions as y } from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/vuex.js";
import a from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/lodash.js";
import p from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/vue.js";
import { createPriceObjects as v } from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/mixins/helpers.js";
function S(e, t, s, i, r, c, h, g) {
  var o = typeof e == "function" ? e.options : e;
  t && (o.render = t, o.staticRenderFns = s, o._compiled = !0), i && (o.functional = !0), c && (o._scopeId = "data-v-" + c);
  var n;
  if (h ? (n = function(u) {
    u = u || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !u && typeof __VUE_SSR_CONTEXT__ < "u" && (u = __VUE_SSR_CONTEXT__), r && r.call(this, u), u && u._registeredComponents && u._registeredComponents.add(h);
  }, o._ssrRegister = n) : r && (n = g ? function() {
    r.call(
      this,
      (o.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : r), n)
    if (o.functional) {
      o._injectStyles = n;
      var _ = o.render;
      o.render = function(C, m) {
        return n.call(m), _(C, m);
      };
    } else {
      var f = o.beforeCreate;
      o.beforeCreate = f ? [].concat(f, n) : [n];
    }
  return {
    exports: e,
    options: o
  };
}
const b = {
  name: "Combo",
  props: {
    combo: {
      type: Object,
      required: !0
    },
    buyButtonText: {
      type: String,
      default: "Comprar"
    },
    showModalAfterPurchase: {
      type: Boolean,
      default: !1
    },
    center: {
      type: Boolean,
      default: !1
    },
    highlightTypePayment: {
      type: String,
      default: "promotional"
    }
  },
  data() {
    return {
      loading: !1,
      selectedSkus: [],
      invalidFormClass: !1,
      invalidSelectedPrice: !1,
      imageUrl: p.observable({}),
      productId: !1,
      productsForCustomization: [],
      customizedProducts: {}
    };
  },
  computed: {
    url() {
      return this.imageUrl ? this.imageUrl : this.products[0].skus.data[0].images.data[0].url;
    },
    products() {
      return a.get(this.combo, "products.data", []);
    },
    threeProducts() {
      return this.products.length === 3;
    },
    thumborFilters() {
      return {
        resize: this.threeProducts ? "215x215" : "275x275"
      };
    },
    allSkusAreValid() {
      return this.products.length === this.selectedSkus.length && this.selectedSkus.every((e) => e);
    },
    price() {
      return v({ basePath: "prices.data.", pricePath: "price" })[this.highlightTypePayment];
    },
    fullPrice() {
      return this.selectedSkus.reduce((e, t, s) => {
        let i = t;
        i || (i = a.get(this.products, `${s}.skus.data.0`));
        const r = a.get(i, "prices.data.price", 0);
        return a.get(i, this.price.path, !1) || (this.invalidSelectedPrice = !0), e + r;
      }, 0);
    },
    paymentMethodPrice() {
      return this.selectedSkus.reduce((e, t, s) => {
        let i = t;
        i || (i = a.get(this.products, `${s}.skus.data.0`));
        const r = a.get(i, "prices.data.price", 0);
        return e + a.get(i, this.price.path, r);
      }, 0);
    },
    priceWithDiscount() {
      const e = a.get(this.combo, "discount_value", 0), t = a.get(this.combo, "discount_type", "v"), s = {
        p: this.fullPrice / 100,
        v: 1
      }, i = this.fullPrice - e * s[t];
      return this.fullPrice > 0 && this.paymentMethodPrice < this.fullPrice ? i * (this.paymentMethodPrice / this.fullPrice) : i;
    },
    discountTotal() {
      return this.fullPrice - this.priceWithDiscount;
    },
    buyTogetherError() {
      let e;
      return this.$refs.SelectSkuRef.forEach((t) => {
        t.$refs.customSelect && (e = t.verifySelect());
      }), this.$refs.BuyTogether ? (this.$refs.BuyTogether.checkError(), this.$refs.BuyTogether.customizationError || e) : e;
    },
    filteredCustomizations() {
      let e = {};
      return Object.keys(this.customizedProducts).forEach((t) => {
        (this.customizedProducts[t].isMandatory || this.customizedProducts[t].isPersonalized) && (e = {
          ...e,
          [t]: a.omit(this.customizedProducts[t], ["isPersonalized", "isMandatory"])
        });
      }), e;
    }
  },
  mounted() {
    this.setSelectedSkus();
  },
  methods: {
    ...y("cart", ["addProductsToCart"]),
    updateSkusToCustomize(e) {
      this.productsForCustomization = e;
    },
    addSkuCustomization(e) {
      this.customizedProducts = { ...this.customizedProducts, ...e };
    },
    resetCustomizations() {
      this.customizedProducts = {};
    },
    changeVariationImage(e) {
      p.set(this.imageUrl, e.productId, e.imageUrl);
    },
    handleSave() {
      this.$refs.BuyTogether.checkError();
    },
    getIcon(e) {
      return e + 1 === this.products.length ? "equal" : "plus";
    },
    updateSelectedSkus(e, t) {
      const { images: s } = t;
      if (s.data[0] === void 0)
        return;
      this.$set(this.imageUrl, t.product_id, s.data[0].url);
      const i = [...this.selectedSkus];
      i[e] = t, this.selectedSkus = i, this.updateSkusToCustomize(
        i.filter((r) => r && r.customizations.data.length)
      ), this.$refs.BuyTogether && this.$refs.BuyTogether.checkError();
    },
    setSelectedSkus() {
      const e = [];
      this.selectedSkus = this.products.map((t) => {
        const [s] = t.skus.data;
        return t.simple && s.customizations.data.length && e.push(s), s;
      }), e.length && this.updateSkusToCustomize(e);
    },
    handleBuyTogetherCustomization() {
      this.allSkusAreValid ? this.$refs.BuyTogether.handleCustomization() : this.$refs.SelectSkuRef.forEach((e) => {
        e.$refs.customSelect && e.verifySelect();
      });
    },
    async addToCart() {
      this.loading = !0, !this.buyTogetherError && this.allSkusAreValid && await this.addProductsToCart({
        skus: this.selectedSkus,
        products: this.products,
        showModal: this.showModalAfterPurchase,
        value: this.priceWithDiscount,
        extras: {
          kit_id: this.combo.id,
          customization: this.filteredCustomizations || {}
        }
      }), this.loading = !1;
    }
  }
};
var k = function() {
  var t = this, s = t._self._c;
  return s("div", { staticClass: "buy-together-offer flex -between", class: { "-three": t.threeProducts, "-center-box": t.center } }, [t._l(t.products, function(i, r) {
    return [s("div", { key: i.id, staticClass: "buy-together-product" }, [s("a", { staticClass: "-clean", attrs: { href: i.url_path } }, [s("div", [s("CustomImage", { key: t.url[i.id] ? t.url[i.id] : t.$get(i, "images.data.0.url"), staticClass: "-loading", attrs: { src: t.url[i.id] ? t.url[i.id] : t.$get(i, "images.data.0.url"), alt: i.name, thumbor: t.thumborFilters, width: "200", height: "200" } })], 1), s("div", { staticClass: "buy-together-quantity" }, [t._v(" 1 unidade ")]), s("div", { staticClass: "buy-together-product-name" }, [s("p", [t._v(t._s(i.name))])])]), s("SelectSku", { ref: "SelectSkuRef", refInFor: !0, attrs: { product: i }, on: { update: function(c) {
      return t.updateSelectedSkus(r, c);
    }, updateVariation: t.changeVariationImage } })], 1), s("div", { key: `${i.id}-icon`, class: `buy-together-${t.getIcon(r)}` }, [s("i", { staticClass: "icon", class: `icon-big-${t.getIcon(r)}` })])];
  }), s("div", { staticClass: "buy-together-total" }, [t.discountTotal > 0 ? s("div", { staticClass: "total-value" }, [t._v(" Valor total: "), s("span", { staticClass: "old-price" }, [t._v(" " + t._s(t._f("formatMoney")(t.fullPrice)) + " ")])]) : t._e(), s("div", { staticClass: "final-value price" }, [t._v(" " + t._s(t._f("formatMoney")(t.priceWithDiscount)) + " "), s("br"), t.invalidSelectedPrice ? t._e() : s("span", { staticClass: "payment-type" }, [t._v(" " + t._s(t.price.text))])]), t.discountTotal > 0 ? s("div", { staticClass: "discount-value" }, [t._v(" Economize " + t._s(t._f("formatMoney")(t.discountTotal)) + " ")]) : t._e(), t.productsForCustomization.length ? s("BuyTogetherCustomization", { ref: "BuyTogether", staticClass: "ma-2", attrs: { "products-for-customization": t.productsForCustomization, "customized-products": t.customizedProducts, "combo-id": t.combo.id }, on: { click: t.handleBuyTogetherCustomization, save: t.handleSave, addSkuCustomization: t.addSkuCustomization, resetCustomizations: t.resetCustomizations } }) : t._e(), s("LoaderButton", { staticClass: "btn btn-primary mt-14", staticStyle: { width: "100%" }, attrs: { sending: t.loading, title: t.buyButtonText }, on: { click: function(i) {
    return t.addToCart();
  } } })], 1)], 2);
}, z = [], P = /* @__PURE__ */ S(
  b,
  k,
  z,
  !1,
  null,
  null,
  null,
  null
);
const T = P.exports;
function d(e) {
  d.installed || (d.installed = !0, e.component("Combo", T));
}
const $ = {
  install: d
};
let l = null;
typeof window < "u" ? l = window.Vue : typeof global < "u" && (l = global.Vue);
l && l.use($);
export {
  T as default
};
