import { mapGetters as C, mapActions as p } from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/vuex.js";
import u from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/lodash.js";
import g from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/vue.js";
import { createPriceObjects as b } from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/mixins/helpers.js";
function S(e, t, s, i, o, l, h, _) {
    var r = typeof e == "function" ? e.options : e;
    t && (r.render = t, r.staticRenderFns = s, r._compiled = !0), i && (r.functional = !0), l && (r._scopeId = "data-v-" + l);
    var n;
    if (h ? (n = function (a) {
        a = a || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !a && typeof __VUE_SSR_CONTEXT__ < "u" && (a = __VUE_SSR_CONTEXT__), o && o.call(this, a), a && a._registeredComponents && a._registeredComponents.add(h);
    }, r._ssrRegister = n) : o && (n = _ ? function () {
        o.call(
            this,
            (r.functional ? this.parent : this).$root.$options.shadowRoot
        );
    } : o), n)
        if (r.functional) {
            r._injectStyles = n;
            var v = r.render;
            r.render = function (y, m) {
                return n.call(m), v(y, m);
            };
        } else {
            var f = r.beforeCreate;
            r.beforeCreate = f ? [].concat(f, n) : [n];
        }
    return {
        exports: e,
        options: r
    };
}
const k = {
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
            imageUrl: g.observable({}),
            productId: !1
        };
    },
    computed: {
        ...C("buyTogether", [
            "productsForCustomization",
            "customizedProducts",
            "currentCombo"
        ]),
        url() {
            return this.imageUrl ? this.imageUrl : this.products[0].skus.data[0].images.data[0].url;
        },
        products() {
            return u.get(this.combo, "products.data", []);
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
            return b({ basePath: "prices.data.", pricePath: "price" })[this.highlightTypePayment];
        },
        fullPrice() {
            return this.selectedSkus.reduce((e, t, s) => {
                let i = t;
                i || (i = u.get(this.products, `${s}.skus.data.0`));
                const o = u.get(i, "prices.data.price", 0);
                return u.get(i, this.price.path, !1) || (this.invalidSelectedPrice = !0), e + u.get(i, this.price.path, o);
            }, 0);
        },
        priceWithDiscount() {
            const e = u.get(this.combo, "discount_value", 0), t = u.get(this.combo, "discount_type", "v"), s = {
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
                (this.customizedProducts[t].isMandatory || this.customizedProducts[t].isPersonalized) && (e = {
                    ...e,
                    [t]: u.omit(this.customizedProducts[t], ["isPersonalized", "isMandatory"])
                });
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
        ...p("cart", ["addProductsToCart"]),
        ...p("buyTogether", [
            "addSkuToCustomize",
            "updateSkusToCustomize",
            "setCombo",
            "reset"
        ]),
        changeVariationImage(e) {
            g.set(this.imageUrl, e.productId, e.imageUrl);
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
            this.selectedSkus = this.products.map((e) => u.get(e, "skus.data.0"));
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
var T = function () {
    var t = this, s = t._self._c;
    return s("div", { staticClass: "buy-together-offer flex -between", class: { "-three": t.threeProducts, "-center-box": t.center } }, [t._l(t.products, function (i, o) {
        return [s("div", { key: i.id, staticClass: "buy-together-product" }, [s("a", { staticClass: "-clean", attrs: { href: i.url_path } }, [s("div", [s("CustomImage", { key: t.url[i.id] ? t.url[i.id] : t.$get(i, "images.data.0.url"), staticClass: "-loading", attrs: { src: t.url[i.id] ? t.url[i.id] : t.$get(i, "images.data.0.url"), alt: i.name, thumbor: t.thumborFilters, width: "200", height: "200" } })], 1), s("div", { staticClass: "buy-together-quantity" }, [t._v(" 1 unidade ")]), s("div", { staticClass: "buy-together-product-name" }, [s("p", [t._v(t._s(i.name))])])]), s("SelectSku", {
            ref: "SelectSkuRef", refInFor: !0, attrs: { product: i }, on: {
                update: function (l) {
                    return t.updateSelectedSkus(o, l);
                }, updateVariation: t.changeVariationImage
            }
        })], 1), s("div", { key: `${i.id}-icon`, class: `buy-together-${t.getIcon(o)}` }, [s("i", { staticClass: "icon", class: `icon-big-${t.getIcon(o)}` })])];
    }), s("div", { staticClass: "buy-together-total" }, [t.discountTotal > 0 ? s("div", { staticClass: "total-value" }, [t._v(" Valor total: "), s("span", { staticClass: "old-price" }, [t._v(" " + t._s(t._f("formatMoney")(t.fullPrice)) + " ")])]) : t._e(), s("div", { staticClass: "final-value price" }, [t._v(" " + t._s(t._f("formatMoney")(t.priceWithDiscount)) + " "), s("br"), t.invalidSelectedPrice ? t._e() : s("span", { staticClass: "payment-type" }, [t._v(" " + t._s(t.price.text))])]), t.discountTotal > 0 ? s("div", { staticClass: "discount-value" }, [t._v(" Economize " + t._s(t._f("formatMoney")(t.discountTotal)) + " ")]) : t._e(), t.productsForCustomization.length && t.combo.id === t.currentCombo ? s("BuyTogetherCustomization", { ref: "BuyTogether", staticClass: "ma-2", on: { click: t.handleBuyTogetherCustomization, save: t.handleSave } }) : t._e(), s("LoaderButton", {
        staticClass: "btn btn-primary mt-14", staticStyle: { width: "100%" }, attrs: { sending: t.loading, title: t.buyButtonText }, on: {
            click: function (i) {
                return t.addToCart();
            }
        }
    })], 1)], 2);
}, P = [], $ = /* @__PURE__ */ S(
    k,
    T,
    P,
    !1,
    null,
    null,
    null,
    null
);
const z = $.exports;
function d(e) {
    d.installed || (d.installed = !0, e.component("Combo", z));
}
const B = {
    install: d
};
let c = null;
typeof window < "u" ? c = window.Vue : typeof global < "u" && (c = global.Vue);
c && c.use(B);
export {
    z as default
};
