import { mapGetters as v } from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/vuex.js";
import g from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/lodash.js";
function b(e, t, o, s, i, u, h, m) {
    var r = typeof e == "function" ? e.options : e;
    t && (r.render = t, r.staticRenderFns = o, r._compiled = !0), s && (r.functional = !0), u && (r._scopeId = "data-v-" + u);
    var a;
    if (h ? (a = function (n) {
        n = n || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !n && typeof __VUE_SSR_CONTEXT__ < "u" && (n = __VUE_SSR_CONTEXT__), i && i.call(this, n), n && n._registeredComponents && n._registeredComponents.add(h);
    }, r._ssrRegister = a) : i && (a = m ? function () {
        i.call(
            this,
            (r.functional ? this.parent : this).$root.$options.shadowRoot
        );
    } : i), a)
        if (r.functional) {
            r._injectStyles = a;
            var _ = r.render;
            r.render = function (p, d) {
                return a.call(d), _(p, d);
            };
        } else {
            var f = r.beforeCreate;
            r.beforeCreate = f ? [].concat(f, a) : [a];
        }
    return {
        exports: e,
        options: r
    };
}
const y = {
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
        ...v("buyTogether", ["combos"])
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
            return this.combos.length > 0 ? (this.comboByKitId[e] = g.omit(
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
            !t || (this.finalPrices = {
                ...this.finalPrices,
                [e]: this.getFinalPrice({ kitId: e, actualCombo: t })
            }, this.totalDiscounts = {
                ...this.totalDiscount,
                [e]: this.getTotalDiscount({ kitId: e, actualCombo: t })
            }, this.totalPrices = { ...this.totalPrices, [e]: this.getTotalPrice(e) });
        }
    }
};
var C = function () {
    var t = this, o = t._self._c;
    return o("div", t._l(Object.keys(t.buyTogetherItems), function (s) {
        return o("div", { key: s, staticClass: "buy-together-cart-group__container" }, [o("div", { staticClass: "buy-together-cart-group-title" }, [t._v(" Compre Junto ")]), o("div", {
            staticClass: "side-cart-remove", on: {
                click: () => t.$emit("removeCombo", {
                    kitId: s,
                    totalPrice: t.finalPrices[s]
                })
            }
        }, [o("div", [o("Trashcan")], 1), o("div", { staticClass: "remove-text" }, [t._v(" Remover Tudo ")])]), t._l(t.buyTogetherItems[s], function (i) {
            return o("div", {
                key: i.id, class: {
                    loading: t.loading[i.id],
                    "-vcenter": i.kit_id
                }
            }, [o("ProductCartBox", { attrs: { product: i, "show-product-total-price": !1, "show-cart-savings": !1 } })], 1);
        }), o("div", { staticClass: "buy-together-total-value" }, [o("div", { staticClass: "row" }, [o("div", { staticClass: "text discount-original-value" }, [t._v(" " + t._s(t._f("formatMoney")(t.totalPrices[s])) + " ")]), o("div", { staticClass: "text after-discount-value" }, [t._v(" " + t._s(t._f("formatMoney")(t.finalPrices[s])) + " ")])]), o("div", { staticClass: "row discount-percent" }, [t._v(" Desconto (-" + t._s(t._f("formatMoney")(t.totalPrices[s] - t.finalPrices[s])) + ") ")])])], 2);
    }), 0);
}, T = [], P = /* @__PURE__ */ b(
    y,
    C,
    T,
    !1,
    null,
    null,
    null,
    null
);
const D = P.exports;
function l(e) {
    l.installed || (l.installed = !0, e.component("BuyTogetherCartGroup", D));
}
const w = {
    install: l
};
let c = null;
typeof window < "u" ? c = window.Vue : typeof global < "u" && (c = global.Vue);
c && c.use(w);
export {
    D as default
};
