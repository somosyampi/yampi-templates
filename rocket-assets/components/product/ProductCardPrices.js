import h from "https://openstore-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/mixins/prices.js";
import C from "https://openstore-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/mixins/productCardTheme.js";
function P(o, e, t, a, n, d, p, _) {
    var r = typeof o == "function" ? o.options : o;
    e && (r.render = e, r.staticRenderFns = t, r._compiled = !0), a && (r.functional = !0), d && (r._scopeId = "data-v-" + d);
    var i;
    if (p ? (i = function (s) {
        s = s || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !s && typeof __VUE_SSR_CONTEXT__ < "u" && (s = __VUE_SSR_CONTEXT__), n && n.call(this, s), s && s._registeredComponents && s._registeredComponents.add(p);
    }, r._ssrRegister = i) : n && (i = _ ? function () {
        n.call(
            this,
            (r.functional ? this.parent : this).$root.$options.shadowRoot
        );
    } : n), i)
        if (r.functional) {
            r._injectStyles = i;
            var m = r.render;
            r.render = function (v, f) {
                return i.call(f), m(v, f);
            };
        } else {
            var u = r.beforeCreate;
            r.beforeCreate = u ? [].concat(u, i) : [i];
        }
    return {
        exports: o,
        options: r
    };
}
const w = {
    name: "ProductCardPrices",
    mixins: [
        h,
        C
    ],
    props: {
        product: { type: Object, required: !0 }
    }
};
var g = function () {
    var a, n;
    var e = this, t = e._self._c;
    return t("div", { staticClass: "product-prices", class: `--space-top-${e.spaceBetweenNamePrice}` }, [!e.loadingPrices && Object.keys(e.productPrices).length ? t("div", [t("div", { staticClass: "flex -vcenter -wrap" }, [e.hasPromotion ? t("span", { staticClass: "product-old-price", class: `--font-size-${e.oldPriceSize}` }, [e._v(" " + e._s((a = e.productPrices) == null ? void 0 : a.price_sale_formated) + " ")]) : e._e(), t("span", { staticClass: "product-actual-price", class: { "--small-cents-price": e.smallCentsPrice } }, [t("div", [t("span", { domProps: { innerHTML: e._s(e.selectedPrice) } }), e.hasPrice ? t("span", { staticClass: "payment-type" }, [e._v(e._s(e.priceText))]) : e._e()])])]), e.showMaxInstallment && !!e.productPrices.price ? t("div", [t("InstallmentsText", { attrs: { product: ((n = e.product) == null ? void 0 : n.content) || e.product, "product-prices": e.productPrices } })], 1) : e._e()]) : t("div", [t("Loader", { attrs: { width: 100, height: 36 } })], 1)]);
}, T = [], $ = /* @__PURE__ */ P(
    w,
    g,
    T,
    !1,
    null,
    null,
    null,
    null
);
const b = $.exports;
function l(o) {
    l.installed || (l.installed = !0, o.component("ProductCardPrices", b));
}
const y = {
    install: l
};
let c = null;
typeof window < "u" ? c = window.Vue : typeof global < "u" && (c = global.Vue);
c && c.use(y);
export {
    b as default
};
