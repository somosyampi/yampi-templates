import { mapGetters as m } from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/vuex.js";
import v from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/mixins/mobile.js";
import w from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/modules/axios/rocket.js";
import C from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/modules/axios/api.js";
function y(t, e, s, r, n, d, u, f) {
    var i = typeof t == "function" ? t.options : t;
    e && (i.render = e, i.staticRenderFns = s, i._compiled = !0), r && (i.functional = !0), d && (i._scopeId = "data-v-" + d);
    var o;
    if (u ? (o = function (a) {
        a = a || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !a && typeof __VUE_SSR_CONTEXT__ < "u" && (a = __VUE_SSR_CONTEXT__), n && n.call(this, a), a && a._registeredComponents && a._registeredComponents.add(u);
    }, i._ssrRegister = o) : n && (o = f ? function () {
        n.call(
            this,
            (i.functional ? this.parent : this).$root.$options.shadowRoot
        );
    } : n), o)
        if (i.functional) {
            i._injectStyles = o;
            var p = i.render;
            i.render = function (_, g) {
                return o.call(g), p(_, g);
            };
        } else {
            var c = i.beforeCreate;
            i.beforeCreate = c ? [].concat(c, o) : [o];
        }
    return {
        exports: t,
        options: i
    };
}
const b = {
    name: "CategoriesHighlight",
    mixins: [
        v
    ],
    props: {
        showCategoriesNames: {
            type: Boolean,
            default: !0
        },
        categoriesIds: {
            type: Array,
            default: () => []
        },
        title: {
            type: String,
            default: ""
        },
        mobileLayout: {
            type: String,
            default: "carousel"
        }
    },
    data() {
        return {
            categories: [],
            loading: !0,
            showAll: !1,
            screenWidth: window.innerWidth
        };
    },
    computed: {
        ...m("preview", ["isPreview"]),
        highlightedCategoriesIds() {
            try {
                return JSON.parse(this.categoriesIds);
            } catch {
                return [];
            }
        },
        sectionTitle() {
            try {
                return this.title || (this.isPreview ? "Categorias" : null);
            } catch {
                return null;
            }
        },
        showCaroussel() {
            return this.mobileLayout === "carousel";
        },
        carousselOptions() {
            return {
                perPage: 7,
                arrows: !this.isMobile,
                pagination: !0,
                gap: 20,
                fixedWidth: "149px",
                breakpoints: {
                    700: {
                        perPage: 2,
                        fixedWidth: "160px"
                    },
                    900: {
                        perPage: 3,
                        fixedWidth: "300px"
                    },
                    1e3: {
                        perPage: 4,
                        fixedWidth: "230px"
                    },
                    1220: {
                        perPage: 5
                    }
                }
            };
        },
        useVueSplide() {
            return {
                [!1]: (e) => e > 7,
                [!0]: (e) => e > 2 ? this.showCaroussel : !1
            }[this.isMobile](this.categories.length);
        },
        filterAmountCategories() {
            return this.useVueSplide || !this.isMobile ? this.categories : this.showAll ? this.categories : this.categories.slice(0, 6);
        },
        showLoadMoreItems() {
            return !this.useVueSplide && this.isMobile && this.categories.length > 6 && !this.showAll;
        }
    },
    async mounted() {
        if (!this.categoriesIds.length) {
            this.categories = await this.loadPlaceholders();
            return;
        }
        this.categories = await this.loadCategories(this.categoriesIds), window.addEventListener("resize", () => {
            this.screenWidth = window.innerWidth;
        });
    },
    methods: {
        getItemCover(t) {
            return t || (!t && this.isPreview ? "http://cdn.yampi.io/rocket/helpers/placeholders/banner-3.png" : null);
        },
        tagOrDiv(t) {
            return this.useVueSplide ? t : "div";
        },
        async loadCategories(t) {
            try {
                this.loading = !0;
                const { data: e } = await C.get("/catalog/categories", {
                    params: {
                        id: t
                    }
                });
                return !e.data.length && this.isPreview ? this.loadPlaceholders() : e.data;
            } finally {
                this.loading = !1;
            }
        },
        async loadPlaceholders() {
            if (!this.isPreview)
                return [];
            try {
                this.loading = !0;
                const { data: t } = await w({
                    method: "get",
                    url: "/placeholders/highlighted-categories"
                });
                return t.data;
            } finally {
                this.loading = !1;
            }
        }
    }
};
var P = function () {
    var e = this, s = e._self._c;
    return !e.loading && e.categories.length ? s("div", { key: e.screenWidth, staticClass: "container c-highlight-container" }, [e.sectionTitle ? s("div", { staticClass: "c-highlight-header" }, [s("div", {
        staticClass: "theme-title c-highlight-header__title", class: {
            "--full-width": !e.useVueSplide,
            "--mobile": e.isMobile
        }
    }, [e._v(" " + e._s(e.sectionTitle) + " ")])]) : e._e(), s("div", { staticClass: "c-highlight-content" }, [e.categories ? s(e.tagOrDiv("splide"), {
        ref: "CarousselRef", tag: "component", class: {
            "--grid": !e.showCaroussel && e.isMobile,
            "--center": !e.isMobile
        }, attrs: { options: e.useVueSplide ? e.carousselOptions : null, slides: e.useVueSplide ? e.categories : null }
    }, e._l(e.filterAmountCategories, function (r) {
        return s(e.tagOrDiv("splide-slide"), {
            key: r.id, tag: "component", class: {
                "category-item": !e.useVueSplide
            }
        }, [r.url_path && r.name ? s("a", { staticClass: "c-highlight-content--slide", attrs: { href: `${e.$baseUrl}${r.url_path}` } }, [s("CustomImage", { attrs: { src: e.getItemCover(r.category_cover), width: "200", height: "200", alt: "Categoria " + r.name } }), e.showCategoriesNames ? s("div", [e._v(e._s(r.name))]) : e._e()], 1) : e._e()]);
    }), 1) : e._e(), e.showLoadMoreItems ? s("div", {
        staticClass: "load-more", on: {
            click: function (r) {
                e.showAll = !0;
            }
        }
    }, [e._v(" Carregar mais ")]) : e._e()], 1)]) : e._e();
}, S = [], V = /* @__PURE__ */ y(
    b,
    P,
    S,
    !1,
    null,
    null,
    null,
    null
);
const I = V.exports;
function h(t) {
    h.installed || (h.installed = !0, t.component("CategoriesHighlight", I));
}
const M = {
    install: h
};
let l = null;
typeof window < "u" ? l = window.Vue : typeof global < "u" && (l = global.Vue);
l && l.use(M);
export {
    I as default
};
