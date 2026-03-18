import s from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/lodash.js";
import P from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/mixins/product.js";
import { createPriceObjects as b } from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/mixins/helpers.js";
function k(i, t, o, _, a, d, u, h) {
    var e = typeof i == "function" ? i.options : i;
    t && (e.render = t, e.staticRenderFns = o, e._compiled = !0), _ && (e.functional = !0), d && (e._scopeId = "data-v-" + d);
    var n;
    if (u ? (n = function (r) {
        r = r || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !r && typeof __VUE_SSR_CONTEXT__ < "u" && (r = __VUE_SSR_CONTEXT__), a && a.call(this, r), r && r._registeredComponents && r._registeredComponents.add(u);
    }, e._ssrRegister = n) : a && (n = h ? function () {
        a.call(
            this,
            (e.functional ? this.parent : this).$root.$options.shadowRoot
        );
    } : a), n)
        if (e.functional) {
            e._injectStyles = n;
            var m = e.render;
            e.render = function (v, p) {
                return n.call(p), m(v, p);
            };
        } else {
            var f = e.beforeCreate;
            e.beforeCreate = f ? [].concat(f, n) : [n];
        }
    return {
        exports: i,
        options: e
    };
}
const g = {
    name: "ProductInfo",
    mixins: [
        P
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
            const i = this.validSku || this.validProduct;
            return s.get(i, "prices.data", {});
        },
        priceObject() {
            return s.get(this.price, this.selectedPriceMeta.path, {});
        },
        currentFormattedPrice() {
            return Object.keys(this.priceObject).length ? `${s.get(this.price, this.selectedPriceMeta.path, this.firstSku[0].prices.data.price_formated)}` : `${s.get(this.price, "price_formated", this.firstSku[0].prices.data.price_formated)}`;
        },
        selectedPriceText() {
            return Object.keys(this.priceObject).length ? this.selectedPriceMeta.text : "";
        },
        selectedPriceMeta() {
            return b({ basePath: "", pricePath: "price_formatted" })[this.selectedPrice];
        },
        availability() {
            return s.get(this.validSku, "days_availability_formated");
        }
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
var k = function () {
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
