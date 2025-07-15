import { mapGetters as C, mapActions as p } from "https://codigo-aberto-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/vuex.js";
import a from "https://codigo-aberto-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/lodash.js";
import g from "https://codigo-aberto-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/vue.js";
import v from "https://codigo-aberto-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/mixins/tracking/api.js";
import { createPriceObjects as S } from "https://codigo-aberto-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/mixins/helpers.js";
function k(e, t, s, i, o, c, h, _) {
    var r = typeof e == "function" ? e.options : e;
    t && (r.render = t, r.staticRenderFns = s, r._compiled = !0), i && (r.functional = !0), c && (r._scopeId = "data-v-" + c);
    var n;
    if (h ? (n = function (u) {
        u = u || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !u && typeof __VUE_SSR_CONTEXT__ < "u" && (u = __VUE_SSR_CONTEXT__), o && o.call(this, u), u && u._registeredComponents && u._registeredComponents.add(h);
    }, r._ssrRegister = n) : o && (n = _ ? function () {
        o.call(
            this,
            (r.functional ? this.parent : this).$root.$options.shadowRoot
        );
    } : o), n)
        if (r.functional) {
            r._injectStyles = n;
            var b = r.render;
            r.render = function (y, m) {
                return n.call(m), b(y, m);
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
const T = {
    name: "Combo",
    mixins: [v],
    props: {
        combo: {
            type: Object,
            required: !0
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
                return S({ basePath: "prices.data.", pricePath: "price" })[this.highlightTypePayment];
            },
            fullPrice() {
                return this.selectedSkus.reduce((e, t, s) => {
                    let i = t;
                    i || (i = a.get(this.products, `${s}.skus.data.0`));
                    const o = a.get(i, "prices.data.price", 0);
                    return a.get(i, this.price.path, !1) || (this.invalidSelectedPrice = !0), e + a.get(i, this.price.path, o);
                }, 0);
            },
            priceWithDiscount() {
                const e = a.get(this.combo, "discount_value", 0), t = a.get(this.combo, "discount_type", "v"), s = {
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
                        [t]: a.omit(this.customizedProducts[t], ["isPersonalized", "isMandatory"])
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
                this.selectedSkus = this.products.map((e) => a.get(e, "skus.data.0"));
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
                        items: a.map(this.products, "name"),
                        amount: this.priceWithDiscount
                    });
                }
                this.loading = !1;
            }
        }
    };
    var P = function () {
        var t = this, s = t._self._c;
        return s("div", { staticClass: "buy-together-offer flex -between", class: { "-three": t.threeProducts, "-center-box": t.center } }, [t._l(t.products, function (i, o) {
            return [s("div", { key: i.id, staticClass: "buy-together-product" }, [s("a", { staticClass: "-clean", attrs: { href: i.url_path } }, [s("div", [s("CustomImage", { key: t.url[i.id] ? t.url[i.id] : t.$get(i, "images.data.0.url"), staticClass: "-loading", attrs: { src: t.url[i.id] ? t.url[i.id] : t.$get(i, "images.data.0.url"), alt: i.name, thumbor: t.thumborFilters, width: "200", height: "200" } })], 1), s("div", { staticClass: "buy-together-quantity" }, [t._v(" 1 unidade ")]), s("div", { staticClass: "buy-together-product-name" }, [s("p", [t._v(t._s(i.name))])])]), s("SelectSku", {
                ref: "SelectSkuRef", refInFor: !0, attrs: { product: i }, on: {
                    update: function (c) {
                        return t.updateSelectedSkus(o, c);
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
    }, $ =[], z = /* @__PURE__ */ k(
        T,
        P,
        $,
        !1,
        null,
        null,
        null,
        null
    );
    const w = z.exports;
    function d(e) {
        d.installed || (d.installed = !0, e.component("Combo", w));
}
const B = {
    install: d
};
let l = null;
typeof window < "u" ? l = window.Vue : typeof global < "u" && (l = global.Vue);
l && l.use(B);
export {
    w as default
};
