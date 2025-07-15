import a from "https://codigo-aberto-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/lodash.js";
import { mapGetters as v } from "https://codigo-aberto-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/vuex.js";
import y from "https://codigo-aberto-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/modules/axios/api.js";
import C from "https://codigo-aberto-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/modules/axios/rocket.js";
function w(e, t, n, d, r, u, p, h) {
    var o = typeof e == "function" ? e.options : e;
    t && (o.render = t, o.staticRenderFns = n, o._compiled = !0), d && (o.functional = !0), u && (o._scopeId = "data-v-" + u);
    var l;
    if (p ? (l = function (i) {
        i = i || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !i && typeof __VUE_SSR_CONTEXT__ < "u" && (i = __VUE_SSR_CONTEXT__), r && r.call(this, i), i && i._registeredComponents && i._registeredComponents.add(p);
    }, o._ssrRegister = l) : r && (l = h ? function () {
        r.call(
            this,
            (o.functional ? this.parent : this).$root.$options.shadowRoot
        );
    } : r), l)
        if (o.functional) {
            o._injectStyles = l;
            var m = o.render;
            o.render = function (g, _) {
                return l.call(_), m(g, _);
            };
        } else {
            var f = o.beforeCreate;
            o.beforeCreate = f ? [].concat(f, l) : [l];
        }
    return {
        exports: e,
        options: o
    };
}
const k = {
    name: "Collection",
    props: {
        desktopLayout: {
            type: String,
            default: "grid",
            validator: (e) => ["grid", "carousel"].includes(e)
        },
        collectionId: {
            type: Number
        },
        showLink: {
            type: Boolean,
            default: !1
        },
        productsPerLine: {
            type: Number,
            default: 2,
            validator: (e) => [1, 2].includes(e)
        },
        totalProducts: {
            type: Number,
            default: 4
        }
    },
    data: () => ({
        collection: {
            products: {
                data: []
            }
        },
        loading: !0,
        completed: !1
    }),
    computed: {
        ...v("preview", ["isPreview"]),
        link() {
            return this.showLink ? a.get(this.collection, "url_path", "") : "";
        },
        collectionProducts() {
            if (this.loading) {
                const e = [], t = {
                    brand: {
                        data: {
                            name: "."
                        }
                    },
                    prices: {
                        data: {
                            price_formated: 0,
                            percent_discount: 0,
                            has_promotion: !1,
                            price_sale_formated: 0,
                            pix: {
                                discount_percent: 0,
                                discount_text: 0,
                                discount_value: 0,
                                price: 0,
                                price_formatted: 0
                            },
                            billet: {
                                discount_percent: 0,
                                discount_text: 0,
                                discount_value: 0,
                                price: 0,
                                price_formated: 5
                            }
                        }
                    },
                    url_path: "."
                };
                for (let n = 0; n < this.totalProducts; n++)
                    e.push(t);
                return e;
            }
            return a.get(this.collection, "products.data", []);
        },
        isCarousel() {
            return this.desktopLayout === "carousel";
        }
    },
    mounted() {
        this.loadCollection(), this.completed = !0;
    },
    methods: {
        async loadCollection() {
            try {
                if (this.loading = !0, !this.collectionId && this.isPreview) {
                    await this.loadPlaceholders();
                    return;
                }
                const e = this.$applyQueriesToUrl("catalog/collections", {
                    id: [this.collectionId],
                    limit: this.totalProducts
                }), { data: t } = await y.get(e);
                this.collection = a.get(t, "data.0", {});
            } finally {
                this.loading = !1;
            }
        },
        async loadPlaceholders() {
            const { data: e } = await C({
                method: "get",
                url: "/placeholders/collections"
            });
            this.collection = a.get(e, "data.0", {});
        }
    }
};
var P = function () {
    var t = this, n = t._self._c;
    return n("Grid", {
        class: { completed: t.completed, "has-carousel": t.isCarousel }, attrs: { link: t.link, "show-link": t.showLink, loading: t.loading, title: t.collection.name, "products-per-line": t.productsPerLine, carousel: t.isCarousel, products: t.collectionProducts }, scopedSlots: t._u([{
            key: "default", fn: function ({ product: d }) {
                return [t._t("default", null, { product: d })];
            }
        }], null, !0)
    });
}, b = [], L = /* @__PURE__ */ w(
    k,
    P,
    b,
    !1,
    null,
    null,
    null,
    null
);
const $ = L.exports;
function c(e) {
    c.installed || (c.installed = !0, e.component("Collection", $));
}
const R = {
    install: c
};
let s = null;
typeof window < "u" ? s = window.Vue : typeof global < "u" && (s = global.Vue);
s && s.use(R);
export {
    $ as default
};
