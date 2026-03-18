import _ from "https://openstore-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/lodash.js";
import P from "https://openstore-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/mixins/product.js";
import g from "https://openstore-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/mixins/prices.js";
function y(t, i, a, d, n, u, c, h) {
    var e = typeof t == "function" ? t.options : t;
    i && (e.render = i, e.staticRenderFns = a, e._compiled = !0), d && (e.functional = !0), u && (e._scopeId = "data-v-" + u);
    var o;
    if (c ? (o = function (r) {
        r = r || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !r && typeof __VUE_SSR_CONTEXT__ < "u" && (r = __VUE_SSR_CONTEXT__), n && n.call(this, r), r && r._registeredComponents && r._registeredComponents.add(c);
    }, e._ssrRegister = o) : n && (o = h ? function () {
        n.call(
            this,
            (e.functional ? this.parent : this).$root.$options.shadowRoot
        );
    } : n), o)
        if (e.functional) {
            e._injectStyles = o;
            var v = e.render;
            e.render = function (m, p) {
                return o.call(p), v(m, p);
            };
        } else {
            var f = e.beforeCreate;
            e.beforeCreate = f ? [].concat(f, o) : [o];
        }
    return {
        exports: t,
        options: e
    };
}
const w = {
    name: "ProductInfo",
    mixins: [
        P,
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
            const t = this.validSku || this.validProduct, i = _.get(t, "prices.data", {});
            return this.productPrices && !this.loadingPrices ? this.productPrices : i;
        },
        availability() {
            return _.get(this.validSku, "days_availability_formated");
        }
    },
    watch: {
        selectedSku(t) {
            var a, d, n;
            const i = ((a = this.validProduct) == null ? void 0 : a.id) || ((n = (d = window.data) == null ? void 0 : d.product) == null ? void 0 : n.data.id);
            !i || (this.productPricesParams = t != null && t.id ? { product_id: i, sku_id: t.id } : { product_id: i });
        }
    }
};
var C = function () {
    var i = this, a = i._self._c;
    return a("div", [i._t("default", null, { sku: i.skuText, availability: i.availability, warranty: i.validProduct.warranty, price: i.price, selectedPrice: i.selectedPrice, priceText: i.priceText, loadingPrices: i.loadingPrices }), a("AddToCart")], 2);
}, T = [], b = /* @__PURE__ */ y(
    w,
    C,
    T,
    !1,
    null,
    null,
    null,
    null
);
const S = b.exports;
function l(t) {
    l.installed || (l.installed = !0, t.component("ProductInfo", S));
}
const k = {
    install: l
};
let s = null;
typeof window < "u" ? s = window.Vue : typeof global < "u" && (s = global.Vue);
s && s.use(k);
export {
    S as default
};
