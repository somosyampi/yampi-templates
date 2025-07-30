import { mapGetters as m } from "https://codigo-aberto-sandbox-assets.yampi.io.s3.amazonaws.com/yampi-templates-sandbox/rocket-assets/dist/vendor/vuex.js";
import y from "https://codigo-aberto-sandbox-assets.yampi.io.s3.amazonaws.com/yampi-templates-sandbox/rocket-assets/dist/vendor/modules/axios/rocket.js";
import b from "https://codigo-aberto-sandbox-assets.yampi.io.s3.amazonaws.com/yampi-templates-sandbox/rocket-assets/dist/vendor/modules/axios/api.js";
import v from "https://codigo-aberto-sandbox-assets.yampi.io.s3.amazonaws.com/yampi-templates-sandbox/rocket-assets/dist/vendor/mixins/mobile.js";
function C(t, e, r, u, o, a, d, p) {
    var n = typeof t == "function" ? t.options : t;
    e && (n.render = e, n.staticRenderFns = r, n._compiled = !0), u && (n.functional = !0), a && (n._scopeId = "data-v-" + a);
    var s;
    if (d ? (s = function (i) {
        i = i || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !i && typeof __VUE_SSR_CONTEXT__ < "u" && (i = __VUE_SSR_CONTEXT__), o && o.call(this, i), i && i._registeredComponents && i._registeredComponents.add(d);
    }, n._ssrRegister = s) : o && (s = p ? function () {
        o.call(
            this,
            (n.functional ? this.parent : this).$root.$options.shadowRoot
        );
    } : o), s)
        if (n.functional) {
            n._injectStyles = s;
            var g = n.render;
            n.render = function (_, f) {
                return s.call(f), g(_, f);
            };
        } else {
            var h = n.beforeCreate;
            n.beforeCreate = h ? [].concat(h, s) : [s];
        }
    return {
        exports: t,
        options: n
    };
}
const P = {
    name: "SectionGridCollection",
    mixins: [v],
    props: {
        section: {
            type: String,
            required: !0
        },
        titleText: {
            type: String,
            required: !0
        },
        subtitleText: {
            type: String,
            required: !0
        },
        textPosition: {
            type: String,
            required: !0,
            validator: (t) => [
                "left",
                "right"
            ].includes(t)
        },
        resourceBannerIds: {
            type: Array,
            required: !0,
            default: () => []
        },
        resourceProductsSlugs: {
            type: Array,
            required: !0,
            default: () => []
        }
    },
    data() {
        return {
            banner: {},
            products: [],
            loading: !1,
            ready: !0,
            placeholders: null
        };
    },
    computed: {
        ...m("preview", ["isPreview"]),
        contentClasses() {
            return [
                `--${this.textPosition}`,
                ` --count-${this.countResourceProducts}`
            ];
        },
        resourceProducts() {
            return this.resourceProductsSlugs.length ? this.resourceProductsSlugs.filter((t) => t !== null) : Array(3).fill("");
        },
        countResourceProducts() {
            return this.resourceProductsSlugs.length !== 0 ? this.resourceProductsSlugs.length : 3;
        },
        linkConfig() {
            return !this.banner || !this.banner.link ? null : {
                href: this.banner.link,
                "target-type": "_blank"
            };
        },
        isEmptyBannerList() {
            return this.resourceBannerIds.length === 0;
        },
        hasBannerStopwatch() {
            return this.banner && this.banner.stopwatch;
        }
    },
    watch: {
        isMobile() {
            this.ready = !1, this.$nextTick(() => {
                this.ready = !0;
            });
        }
    },
    mounted() {
        this.loadBanner();
    },
    methods: {
        async loadBanner() {
            try {
                if (this.loading = !0, this.isEmptyBannerList && this.isPreview) {
                    await this.loadPlaceholders();
                    return;
                }
                if (this.isEmptyBannerList)
                    return;
                const t = await this.getBanner();
                if (this.isEmptyPayload(t) && this.isPreview) {
                    await this.loadPlaceholders();
                    return;
                }
                this.banner = t;
            } catch (t) {
                t.response.status >= 400 && this.isPreview && await this.loadPlaceholders();
            } finally {
                this.loading = !1;
            }
        },
        async getBanner() {
            try {
                const { data: t } = await b.get("catalog/banners", {
                    params: {
                        status: "active",
                        id: this.resourceBannerIds
                    }
                }), [e] = t == null ? void 0 : t.data;
                return e != null ? e : null;
            } catch (t) {
                throw console.error("Erro ao obter banner -", t), t;
            }
        },
        async loadPlaceholders() {
            var e, r;
            const { data: t } = await y.get(
                `/placeholders/${this.section}`
            );
            this.banner = (r = (e = t == null ? void 0 : t.data) == null ? void 0 : e.banner) != null ? r : null;
        },
        getImage(t) {
            return t ? this.isMobile && t.mobile_image_url || t.image_url : "";
        },
        isEmptyPayload(t) {
            return !t || Object.keys(t).length === 0;
        }
    }
};
var w = function () {
    var e = this, r = e._self._c;
    return e.ready ? r("div", { staticClass: "section-grid-collection--container container" }, [r("div", { staticClass: "section-grid-collection--text" }, [r("h2", { staticClass: "theme-title title-text", domProps: { innerHTML: e._s(e.titleText) } }), r("p", { staticClass: "subtitle-text", domProps: { innerHTML: e._s(e.subtitleText) } })]), r("div", { staticClass: "section-grid-collection--content", class: e.contentClasses }, [r("div", { staticClass: "section-grid-collection--banner" }, [e.loading ? e._e() : r("RocketAnchor", e._b({ attrs: { label: "" } }, "RocketAnchor", e.linkConfig, !1), [e.hasBannerStopwatch ? r("BannerStopwatch") : e._e(), r("CustomImage", { attrs: { src: e.getImage(e.banner) || "", alt: `${e.banner ? e.banner.name : ""}`, lazyload: !0, width: "333", height: "406" } })], 1)], 1), r("div", { staticClass: "section-grid-collection--products" }, e._l(e.resourceProducts, function (u, o) {
        return r("GridCollectionBoxProduct", {
            key: o, attrs: { "product-slug": u }, scopedSlots: e._u([{
                key: "default", fn: function ({ product: a }) {
                    return [e._t("default", null, { product: a })];
                }
            }], null, !0)
        });
    }), 1)])]) : e._e();
}, S = [], B = /* @__PURE__ */ C(
    P,
    w,
    S,
    !1,
    null,
    null,
    null,
    null
);
const k = B.exports;
function c(t) {
    c.installed || (c.installed = !0, t.component("SectionGridCollection", k));
}
const T = {
    install: c
};
let l = null;
typeof window < "u" ? l = window.Vue : typeof global < "u" && (l = global.Vue);
l && l.use(T);
export {
    k as default
};
