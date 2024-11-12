import { mapGetters as h, mapActions as l } from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/vuex.js";
import o from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/lodash.js";
import m from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/mixins/tracking/api.js";
import d from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/vue.js";
import { createPriceObjects as f } from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/mixins/helpers.js";
function p(e, t, s, i, r, c, v, k) {
  var a = typeof e == "function" ? e.options : e;
  return t && (a.render = t, a.staticRenderFns = s, a._compiled = !0), {
    exports: e,
    options: a
  };
}
const g = {
  name: "ProductCombo",
  mixins: [m],
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
      imageUrl: d.observable({}),
      productId: !1
    };
  },
  computed: {
    ...h("buyTogether", [
      "productsForCustomization",
      "customizedProducts",
      "currentCombo"
    ]),
    url() {
      return this.imageUrl ? this.imageUrl : this.products[0].skus.data[0].images.data[0].url;
    },
    products() {
      return o.get(this.combo, "products.data", []);
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
      return f({ basePath: "prices.data.", pricePath: "price" })[this.highlightTypePayment];
    },
    fullPrice() {
      return this.selectedSkus.reduce((e, t, s) => {
        let i = t;
        i || (i = o.get(this.products, `${s}.skus.data.0`));
        const r = o.get(i, "prices.data.price", 0);
        return o.get(i, this.price.path, !1) || (this.invalidSelectedPrice = !0), e + o.get(i, this.price.path, r);
      }, 0);
    },
    priceWithDiscount() {
      const e = o.get(this.combo, "discount_value", 0), t = o.get(this.combo, "discount_type", "v"), s = {
        p: this.fullPrice / 100,
        v: 1
      };
      return this.fullPrice - e * s[t];
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
        (this.customizedProducts[t].isMandatory || this.customizedProducts[t].isPersonalized) && (e = { ...e, [t]: o.omit(this.customizedProducts[t], ["isPersonalized", "isMandatory"]) });
      }), e;
    }
  },
  watch: {
    currentCombo(e) {
      e !== this.combo.id && this.$refs.SelectSkuRef.forEach((t) => {
        t.bootSelected();
      });
    }
  },
  mounted() {
    this.setSelectedSkus();
  },
  methods: {
    ...l("cart", ["addProductsToCart"]),
    ...l("buyTogether", [
      "addSkuToCustomize",
      "updateSkusToCustomize",
      "setCombo",
      "reset"
    ]),
    changeVariationImage(e) {
      d.set(this.imageUrl, e.productId, e.imageUrl);
    },
    handleSave() {
      this.$refs.SelectSkuRef.forEach((e) => {
        e.$refs.customSelect && e.verifySelect();
      }), this.$refs.BuyTogether.checkError();
    },
    getIcon(e) {
      return e + 1 === this.products.length ? "equal" : "plus";
    },
    updateSelectedSkus(e, t) {
      const { images: s } = t;
      s.data[0] !== void 0 && (this.$set(this.imageUrl, t.product_id, s.data[0].url), this.setCombo(this.combo.id), this.$emit("updateCurrentComboKey", this.combo.id), this.$set(this.selectedSkus, e, t), this.updateSkusToCustomize({
        index: e,
        skus: this.selectedSkus.filter((i) => i && i.customizations.data.length)
      }));
    },
    setSelectedSkus() {
      this.selectedSkus = this.products.map((e) => o.get(e, "skus.data.0"));
    },
    handleBuyTogetherCustomization() {
      this.allSkusAreValid ? this.$refs.BuyTogether.handleCustomization() : this.$refs.SelectSkuRef.forEach((e) => {
        e.$refs.customSelect && e.verifySelect();
      });
    },
    async addToCart() {
      if (this.loading = !0, !this.buyTogetherError && this.allSkusAreValid) {
        await this.addProductsToCart({
          skus: this.selectedSkus,
          products: this.products,
          showModal: this.showModalAfterPurchase,
          value: this.priceWithDiscount,
          extras: {
            kit_id: this.combo.id,
            customization: this.filteredCustomizations || {}
          }
        });
        const e = window.themeConfig.theme.params;
        this.handleTrackApi("purchase-intended", {
          location: "buy-together",
          quick_buy_button_enabled: e.show_add_to_cart_button,
          items: o.map(this.products, "name"),
          amount: this.priceWithDiscount
        });
      }
      this.loading = !1;
    }
  }
};
var y = function() {
  var t = this, s = t._self._c;
  return s("div", { staticClass: "buy-together-offer flex -between", class: { "-three": t.threeProducts, "-center-box": t.center } }, [t._l(t.products, function(i, r) {
    return [s("div", { key: i.id, staticClass: "buy-together-product" }, [s("a", { staticClass: "-clean", attrs: { href: i.url_path } }, [s("div", [s("CustomImage", { key: t.url[i.id] ? t.url[i.id] : t.$get(i, "images.data.0.url"), staticClass: "-loading", attrs: { src: t.url[i.id] ? t.url[i.id] : t.$get(i, "images.data.0.url"), alt: i.name, thumbor: t.thumborFilters } })], 1), s("div", { staticClass: "buy-together-quantity" }, [t._v(" 1 unidade ")]), s("div", { staticClass: "buy-together-product-name" }, [s("p", [t._v(t._s(i.name))])])]), s("SelectSku", { ref: "SelectSkuRef", refInFor: !0, attrs: { product: i }, on: { update: function(c) {
      return t.updateSelectedSkus(r, c);
    }, updateVariation: t.changeVariationImage } })], 1), s("div", { key: `${i.id}-icon`, class: `buy-together-${t.getIcon(r)}` }, [s("i", { staticClass: "icon", class: `icon-big-${t.getIcon(r)}` })])];
  }), s("div", { staticClass: "buy-together-total" }, [t.discountTotal > 0 ? s("div", { staticClass: "total-value" }, [t._v(" Valor total: "), s("span", { staticClass: "old-price" }, [t._v(" " + t._s(t._f("formatMoney")(t.fullPrice)) + " ")])]) : t._e(), s("div", { staticClass: "final-value price" }, [t._v(" " + t._s(t._f("formatMoney")(t.priceWithDiscount)) + " "), s("br"), t.invalidSelectedPrice ? t._e() : s("span", { staticClass: "payment-type" }, [t._v(" " + t._s(t.price.text))])]), t.discountTotal > 0 ? s("div", { staticClass: "discount-value" }, [t._v(" Economize " + t._s(t._f("formatMoney")(t.discountTotal)) + " ")]) : t._e(), t.productsForCustomization.length && t.combo.id === t.currentCombo ? s("BuyTogetherCustomization", { ref: "BuyTogether", staticClass: "ma-2", on: { click: t.handleBuyTogetherCustomization, save: t.handleSave } }) : t._e(), s("LoaderButton", { staticClass: "btn btn-primary mt-14", staticStyle: { width: "100%" }, attrs: { sending: t.loading, title: t.buyButtonText }, on: { click: function(i) {
    return t.addToCart();
  } } })], 1)], 2);
}, b = [], S = /* @__PURE__ */ p(
  g,
  y,
  b
);
const _ = S.exports;
function n(e) {
  n.installed || (n.installed = !0, e.component("Combo", _));
}
const C = {
  install: n
};
let u = null;
typeof window < "u" ? u = window.Vue : typeof global < "u" && (u = global.Vue);
u && u.use(C);
export {
  _ as default
};