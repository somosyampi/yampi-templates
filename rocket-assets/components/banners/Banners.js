import { mapGetters as _ } from "https://codigo-aberto-production-assets.s3.amazonaws.com/yampi-templates-sandbox/rocket-assets/dist/vendor/vuex.js";
import y from "https://codigo-aberto-production-assets.s3.amazonaws.com/yampi-templates-sandbox/rocket-assets/dist/vendor/modules/axios/api.js";
import b from "https://codigo-aberto-production-assets.s3.amazonaws.com/yampi-templates-sandbox/rocket-assets/dist/vendor/modules/axios/rocket.js";
import B from "https://codigo-aberto-production-assets.s3.amazonaws.com/yampi-templates-sandbox/rocket-assets/dist/vendor/mixins/mobile.js";
function v(t, e, i, s, a, o, d, u) {
    var n = typeof t == "function" ? t.options : t;
    e && (n.render = e, n.staticRenderFns = i, n._compiled = !0), s && (n.functional = !0), o && (n._scopeId = "data-v-" + o);
    var r;
    if (d ? (r = function (l) {
        l = l || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !l && typeof __VUE_SSR_CONTEXT__ < "u" && (l = __VUE_SSR_CONTEXT__), a && a.call(this, l), l && l._registeredComponents && l._registeredComponents.add(d);
    }, n._ssrRegister = r) : a && (r = u ? function () {
        a.call(
            this,
            (n.functional ? this.parent : this).$root.$options.shadowRoot
        );
    } : a), r)
        if (n.functional) {
            n._injectStyles = r;
            var g = n.render;
            n.render = function (m, p) {
                return r.call(p), g(m, p);
            };
        } else {
            var f = n.beforeCreate;
            n.beforeCreate = f ? [].concat(f, r) : [r];
        }
    return {
        exports: t,
        options: n
    };
}
const A = {
    name: "Banners",
    mixins: [
        B
    ],
    props: {
        section: {
            type: String,
            required: !0
        },
        container: {
            type: Boolean,
            default: !0
        },
        carousel: {
            type: Boolean,
            default: !1
        },
        ids: {
            type: Array,
            required: !0,
            validator: (t) => t.every(Number.isFinite)
        },
        customClass: {
            type: String,
            default: ""
        },
        sliderDelay: {
            type: Number,
            default: 0
        },
        quantity: {
            type: Number,
            default: 0
        },
        dimensions: {
            type: Object,
            default: () => ({})
        },
        firstBanner: {
            type: Object,
            default: null
        },
        slug: {
            type: String,
            default: ""
        },
        autoHeight: {
            type: Boolean,
            default: !1
        },
        autoWidth: {
            type: Boolean,
            default: !1
        }
    },
    data: () => ({
        banners: [],
        loading: !1,
        isMounted: !1,
        ready: !0,
        isPlaceholder: !1
    }),
    computed: {
        ..._("preview", ["isPreview"]),
        carouselOptions() {
            return {
                rewind: !0,
                arrows: !0,
                autoplay: !!this.sliderDelay,
                interval: this.sliderDelay * 1e3,
                pauseOnHover: !0,
                updateOnMove: !0,
                pagination: !0,
                autoHeight: this.autoHeight,
                autoWidth: this.autoWidth
            };
        },
        classes() {
            let { customClass: t } = this;
            return this.banners.length <= 1 && (t += " -no-pagination"), t;
        },
        imageHolderStyle() {
            return !this.isMounted || !this.loading || !this.loaderRatio ? "" : `height: ${(this.$refs.holderBanners[0].$el || this.$refs.holderBanners[0]).offsetWidth * this.loaderRatio}px; background-color: #d0d0d0;`;
        },
        loaderRatio() {
            var i, s, a, o, d, u, n, r;
            let t = parseFloat((s = (i = this.dimensions) == null ? void 0 : i.desktop) == null ? void 0 : s.width), e = parseFloat((o = (a = this.dimensions) == null ? void 0 : a.desktop) == null ? void 0 : o.height);
            return this.isMobile && (t = parseFloat((u = (d = this.dimensions) == null ? void 0 : d.mobile) == null ? void 0 : u.width) || t, e = parseFloat((r = (n = this.dimensions) == null ? void 0 : n.mobile) == null ? void 0 : r.height) || e), t ? e / t : 0;
        },
        sectionIsMainBanner() {
            return this.section === "main-banner";
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
        if (this.firstBanner) {
            const t = {
                id: this.firstBanner.id,
                type: "",
                link: this.firstBanner.link,
                image_url: this.firstBanner.image,
                mobile_image_url: this.firstBanner.mobile_image,
                stopwatch: this.firstBanner.stopwatch
            };
            this.banners.push(t);
        } else
            this.loadStaticBanners();
        this.loadBanners(), this.$nextTick(() => {
            this.isMounted = !0;
        });
    },
    methods: {
        getLastSlug(t) {
            const [e] = t.split("/").slice(-1);
            return e;
        },
        getComponent(t) {
            return this.carousel ? t : "div";
        },
        getHolderClass() {
            const t = this.container ? "container" : "";
            return `holder-${this.section} ${t} relative`;
        },
        isValid(t) {
            return t.type === "product" ? !1 : !!t.image_url;
        },
        getLink(t) {
            return this.$safeCleanLink(
                t.type === "product" ? t.product.data.url : t.link
            );
        },
        getImage(t) {
            return this.isMobile && t.mobile_image_url || t.image_url;
        },
        getDimensionPlaceHolderSectionMainBanner(t) {
            var o;
            if (!this.sectionIsMainBanner)
                return null;
            const e = ["width", "height"], i = ((o = this.firstBanner) == null ? void 0 : o.id) === t.id ? this.dimensions : t.dimensions, s = this.isMobile ? i == null ? void 0 : i.mobile : i == null ? void 0 : i.desktop, a = {};
            return e.forEach((d) => {
                const u = s == null ? void 0 : s[d];
                u && (a[`placeholder-${d}`] = parseFloat(u));
            }), a;
        },
        loadStaticBanners() {
            const t = {
                id: 0,
                type: "",
                link: "",
                image_url: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
                mobile_image_url: ""
            }, e = {
                "banner-2": 2,
                "banner-3": 3
            };
            for (let i = 0; i < (e[this.section] || 1); i++)
                t.id = i, this.banners.push({ ...t });
        },
        async loadBanners() {
            try {
                const t = [...this.ids];
                if (this.loading = !0, !t.length && this.isPreview && !this.slug.length) {
                    await this.loadPlaceholders();
                    return;
                }
                if (this.firstBanner) {
                    const s = this.ids.indexOf(this.firstBanner.id);
                    t.splice(s, 1);
                }
                if (!t.length && !this.slug.length)
                    return;
                let e = this.slug.length ? {
                    slug: this.getLastSlug(this.slug)
                } : {
                    id: t
                };
                e = {
                    status: "active",
                    ...e
                };
                const { data: i } = await y.get("catalog/banners", {
                    params: e
                });
                if (!i.data.length && this.isPreview) {
                    await this.loadPlaceholders();
                    return;
                }
                if (this.firstBanner) {
                    this.banners = this.banners.concat(i.data);
                    return;
                }
                this.banners = i.data;
            } finally {
                this.loading = !1;
            }
        },
        async loadPlaceholders() {
            const { data: t } = await b({
                method: "get",
                url: `/placeholders/${this.section}`
            });
            this.banners = t.data;
        }
    }
};
var w = function () {
    var e = this, i = e._self._c;
    return e.banners.length ? i("section", [i("div", { class: e.getHolderClass() }, [e.ready ? i(e.getComponent("splide"), { tag: "component", class: e.classes, attrs: { slides: e.carousel ? e.banners : null, options: e.carousel ? e.carouselOptions : null } }, [e._l(e.banners, function (s, a) {
        return [e.isValid(s) ? i(e.getComponent("splide-slide"), {
            key: s.id, ref: "holderBanners", refInFor: !0, tag: "component", staticClass: "banner", class: {
                "--first": a === 0
            }
        }, [s.stopwatch ? i("div", { staticClass: "relative-banner relative", class: { container: e.sectionIsMainBanner } }, [i("BannerStopwatch")], 1) : e._e(), i("div", { staticClass: "banner-image-holder", style: e.imageHolderStyle }, [i("CustomImage", e._b({ class: { "-loading": !e.isPreview }, attrs: { src: e.getImage(s), alt: "Banner " + a, "thumbor-enabled": !1, lazyload: !e.isPreview, width: s.mobile_image ? "1200" : "333", height: s.mobile_image ? "332" : "118" } }, "CustomImage", e.getDimensionPlaceHolderSectionMainBanner(s), !1))], 1), e.getLink(s) !== "http://" ? i("a", { staticClass: "full-link", attrs: { href: e.getLink(s) } }, [i("span", { staticClass: "-invisible" }, [e._v("link")])]) : e._e()]) : e._e()];
    }), !e.carousel && e.banners.length < e.quantity ? e._l(e.quantity - e.banners.length, function (s) {
        return i("div", { key: s, staticClass: "banner -hack" });
    }) : e._e()], 2) : e._e()], 1)]) : e._e();
}, C = [], k = /* @__PURE__ */ v(
    A,
    w,
    C,
    !1,
    null,
    null,
    null,
    null
);
const $ = k.exports;
function c(t) {
    c.installed || (c.installed = !0, t.component("Banners", $));
}
const M = {
    install: c
};
let h = null;
typeof window < "u" ? h = window.Vue : typeof global < "u" && (h = global.Vue);
h && h.use(M);
export {
    $ as default
};
