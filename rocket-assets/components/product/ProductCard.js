import A from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/mixins/prices.js";
import h from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/mixins/productCardTheme.js";
function v(r, t, e, d, s, i, c, u) {
    var o = typeof r == "function" ? r.options : r;
    t && (o.render = t, o.staticRenderFns = e, o._compiled = !0), d && (o.functional = !0), i && (o._scopeId = "data-v-" + i);
    var n;
    if (c ? (n = function (a) {
        a = a || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !a && typeof __VUE_SSR_CONTEXT__ < "u" && (a = __VUE_SSR_CONTEXT__), s && s.call(this, a), a && a._registeredComponents && a._registeredComponents.add(c);
    }, o._ssrRegister = n) : s && (n = u ? function () {
        s.call(
            this,
            (o.functional ? this.parent : this).$root.$options.shadowRoot
        );
    } : s), n)
        if (o.functional) {
            o._injectStyles = n;
            var p = o.render;
            o.render = function (g, m) {
                return n.call(m), p(g, m);
            };
        } else {
            var l = o.beforeCreate;
            o.beforeCreate = l ? [].concat(l, n) : [n];
        }
    return {
        exports: r,
        options: o
    };
}
const C = {
    name: "ProductCard",
    mixins: [
        A,
        h
    ],
    props: {
        product: { type: Object, required: !0 },
        imageSize: { type: String, default: "default" }
    },
    data() {
        return {
            productSku: {}
        };
    },
    computed: {
        selectedImageSize() {
            const r = {
                medium: "500x500",
                default: "275x275"
            };
            return r[this.imageSize] || r.default;
        },
        placeholder() {
            return "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
        }
    }
};
var y = function () {
    var d, s, i, c, u, o, n, p, l;
    var t = this, e = t._self._c;
    return e("div", {
        staticClass: "-clear box-product product-card", class: [
            { "-center": t.isTextCentered },
            t.flagDisplayClass
        ]
    }, [e("a", { staticClass: "-clean product-card-container", attrs: { href: `/${(d = t.product) == null ? void 0 : d.content.slug}/p` } }, [e("div", { staticClass: "holder-image relative-tags" }, [t.showDiscountTag ? e("DiscountTag", { attrs: { value: t.percentDiscount } }) : t._e(), e("div", { staticClass: "image-ratio", class: `--${t.imageFitBehavior}` }, [e("img", { directives: [{ name: "lazyload", rawName: "v-lazyload" }], staticClass: "-loading", attrs: { fetchpriority: "high", decoding: "async", src: t.placeholder, alt: (s = t.product.content) == null ? void 0 : s.name, "data-src": t.$thumborize(t.product.content.image_url, { resize: t.selectedImageSize }) } })]), t.showAddToCartButton && !t.isTextAndIconButton ? e("BuyButton", {
        attrs: { "has-button-style": !0, product: t.product.content }, scopedSlots: t._u([{
            key: "default", fn: function () {
                return [e("IconBuyButton", { attrs: { "icon-color": t.iconColor } })];
            }, proxy: !0
        }], null, !1, 1366432017)
    }) : t._e(), ((i = t.themeStyle) == null ? void 0 : i.grids_label_position) === "above_image" ? e("Flags", { attrs: { "product-id": t.product.content.id } }) : t._e()], 1), e("div", { staticClass: "holder-info", class: `--space-bottom-${t.spaceBelowImage}` }, [((c = t.themeStyle) == null ? void 0 : c.grids_label_position) !== "above_image" ? e("Flags", { attrs: { "product-id": t.product.content.id } }) : t._e(), t.showReviewAverage ? e("AverageRating", { class: `${t.isTextCentered ? "-center" : ""}`, attrs: { product: t.product.content, "is-grid": !0, "color-star-icon": t.reviewAverageStarColor } }) : t._e(), t.showBrand ? e("div", { staticClass: "product-brand ellipsis" }, [t._v(" " + t._s((n = (o = (u = t.product) == null ? void 0 : u.content) == null ? void 0 : o.brand) == null ? void 0 : n.name) + " ")]) : t._e(), e("div", { staticClass: "product-name ellipsis-multiline l2" }, [t._v(" " + t._s((l = (p = t.product) == null ? void 0 : p.content) == null ? void 0 : l.name) + " ")]), e("ProductCardPrices", { attrs: { product: t.product } }), t.showAddToCartButton && t.isTextAndIconButton ? e("BuyButton", {
        staticClass: "--space-top-medium", attrs: { "has-button-style": !0, "is-text-and-icon-button": !0, product: t.product.content }, scopedSlots: t._u([{
            key: "default", fn: function () {
                return [e("IconBuyButton", { attrs: { "icon-color": t.iconColor } }), e("span", { staticClass: "text" }, [t._v(" " + t._s(t.quickBuyTextButton) + " ")])];
            }, proxy: !0
        }], null, !1, 1875835672)
    }) : t._e()], 1)])]);
}, B = [], b = /* @__PURE__ */ v(
    C,
    y,
    B,
    !1,
    null,
    null,
    null,
    null
);
const w = b.exports;
function _(r) {
    _.installed || (_.installed = !0, r.component("ProductCard", w));
}
const T = {
    install: _
};
let f = null;
typeof window < "u" ? f = window.Vue : typeof global < "u" && (f = global.Vue);
f && f.use(T);
export {
    w as default
};
