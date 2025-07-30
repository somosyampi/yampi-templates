import s from "https://codigo-aberto-sandbox-assets.yampi.io.s3.amazonaws.com/yampi-templates-sandbox/rocket-assets/dist/vendor/lodash.js";
import P from "https://codigo-aberto-sandbox-assets.yampi.io.s3.amazonaws.com/yampi-templates-sandbox/rocket-assets/dist/vendor/mixins/product.js";
import { createPriceObjects as b } from "https://codigo-aberto-sandbox-assets.yampi.io.s3.amazonaws.com/yampi-templates-sandbox/rocket-assets/dist/vendor/mixins/helpers.js";
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
};
var y = function () {
    var t = this, o = t._self._c;
    return o("div", [t._t("default", null, { sku: t.skuText, availability: t.availability, warranty: t.validProduct.warranty, price: t.price, formattedPrice: t.currentFormattedPrice, priceTypeText: t.selectedPriceText }), o("AddToCart")], 2);
}, T = [], C = /* @__PURE__ */ k(
    g,
    y,
    T,
    !1,
    null,
    null,
    null,
    null
);
const S = C.exports;
function l(i) {
    l.installed || (l.installed = !0, i.component("ProductInfo", S));
}
const O = {
    install: l
};
let c = null;
typeof window < "u" ? c = window.Vue : typeof global < "u" && (c = global.Vue);
c && c.use(O);
export {
    S as default
};
