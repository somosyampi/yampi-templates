import { mapGetters as n } from "https://s3.amazonaws.com/codigo-aberto-sandbox-assets/rocket/assets/rocket-preview/vendor/vuex.js";
import l from "https://s3.amazonaws.com/codigo-aberto-sandbox-assets/rocket/assets/rocket-preview/vendor/lodash.js";
function u(e, t, o, s, r, y, b, v) {
  var i = typeof e == "function" ? e.options : e;
  return t && (i.render = t, i.staticRenderFns = o, i._compiled = !0), {
    exports: e,
    options: i
  };
}
const h = {
  name: "BuyTogetherCartGroup",
  props: {
    buyTogetherItems: {
      type: Object,
      required: !0
    },
    loading: {
      type: Object,
      required: !0
    }
  },
  data() {
    return {
      totalPrices: {},
      finalPrices: {},
      totalDiscounts: {},
      comboByKitId: {}
    };
  },
  computed: {
    ...n("buyTogether", ["combos"])
  },
  watch: {
    combos: {
      handler() {
        this.calculateDiscountForAll();
      }
    }
  },
  mounted() {
    this.calculateDiscountForAll();
  },
  methods: {
    calculateDiscountForAll() {
      Object.keys(this.buyTogetherItems).forEach((e) => this.getDiscount(e));
    },
    getTotalPrice(e) {
      return this.buyTogetherItems[e].reduce(
        (t, o) => t + Number(o.price),
        0
      );
    },
    getCombo(e) {
      return this.combos.length > 0 ? (this.comboByKitId[e] = l.omit(
        this.combos.filter((t) => t.id === parseInt(e, 10))[0],
        ["products"]
      ), this.cacheCombo(this.comboByKitId), this.comboByKitId[e]) : (this.hydrateCombo(), this.comboByKitId[e]);
    },
    getFinalPrice({ kitId: e, actualCombo: t }) {
      return t.discount_type === "p" ? (1 - t.discount_value / 100) * this.getTotalPrice(e) : this.getTotalPrice(e) - t.discount_value;
    },
    getTotalDiscount({ kitId: e, actualCombo: t }) {
      return t.discount_type === "p" ? t.discount_value / 100 * this.getTotalPrice(e) : t.discount_value;
    },
    cacheCombo(e) {
      localStorage.setItem("buyTogetherCartGroupCombo", JSON.stringify(e));
    },
    hydrateCombo() {
      this.comboByKitId = JSON.parse(localStorage.getItem("buyTogetherCartGroupCombo"));
    },
    getDiscount(e) {
      const t = this.getCombo(e);
      t && (this.finalPrices = {
        ...this.finalPrices,
        [e]: this.getFinalPrice({ kitId: e, actualCombo: t })
      }, this.totalDiscounts = {
        ...this.totalDiscount,
        [e]: this.getTotalDiscount({ kitId: e, actualCombo: t })
      }, this.totalPrices = { ...this.totalPrices, [e]: this.getTotalPrice(e) });
    }
  }
};
var d = function() {
  var t = this, o = t._self._c;
  return o("div", t._l(Object.keys(t.buyTogetherItems), function(s) {
    return o("div", { key: s, staticClass: "buy-together-cart-group__container" }, [o("div", { staticClass: "buy-together-cart-group-title" }, [t._v(" Compre Junto ")]), o("div", { staticClass: "side-cart-remove", on: { click: () => t.$emit("removeCombo", {
      kitId: s,
      totalPrice: t.finalPrices[s]
    }) } }, [o("div", [o("trashcan")], 1), o("div", { staticClass: "remove-text" }, [t._v(" Remover Tudo ")])]), t._l(t.buyTogetherItems[s], function(r) {
      return o("div", { key: r.id, class: {
        loading: t.loading[r.id],
        "-vcenter": r.kit_id
      } }, [o("product-cart-box", { attrs: { product: r, "show-product-total-price": !1, "show-cart-savings": !1 } })], 1);
    }), o("div", { staticClass: "buy-together-total-value" }, [o("div", { staticClass: "row" }, [o("div", { staticClass: "text discount-original-value" }, [t._v(" " + t._s(t._f("formatMoney")(t.totalPrices[s])) + " ")]), o("div", { staticClass: "text after-discount-value" }, [t._v(" " + t._s(t._f("formatMoney")(t.finalPrices[s])) + " ")])]), o("div", { staticClass: "row discount-percent" }, [t._v(" Desconto (-" + t._s(t._f("formatMoney")(t.totalPrices[s] - t.finalPrices[s])) + ") ")])])], 2);
  }), 0);
}, m = [], f = /* @__PURE__ */ u(
  h,
  d,
  m
);
const g = f.exports;
function a(e) {
  a.installed || (a.installed = !0, e.component("BuyTogetherCartGroup", g));
}
const p = {
  install: a
};
let c = null;
typeof window < "u" ? c = window.Vue : typeof global < "u" && (c = global.Vue);
c && c.use(p);
export {
  g as default
};
