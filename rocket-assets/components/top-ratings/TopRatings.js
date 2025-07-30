import v from "https://codigo-aberto-sandbox-assets.yampi.io.s3.amazonaws.com/yampi-templates-sandbox/rocket-assets/dist/vendor/lodash.js";
import { mapGetters as _ } from "https://codigo-aberto-sandbox-assets.yampi.io.s3.amazonaws.com/yampi-templates-sandbox/rocket-assets/dist/vendor/vuex.js";
import C from "https://codigo-aberto-sandbox-assets.yampi.io.s3.amazonaws.com/yampi-templates-sandbox/rocket-assets/dist/vendor/modules/axios/api.js";
import w from "https://codigo-aberto-sandbox-assets.yampi.io.s3.amazonaws.com/yampi-templates-sandbox/rocket-assets/dist/vendor/modules/axios/rocket.js";
import y from "https://codigo-aberto-sandbox-assets.yampi.io.s3.amazonaws.com/yampi-templates-sandbox/rocket-assets/dist/vendor/mixins/mobile.js";
function V(a, t, e, i, o, c, u, f) {
    var s = typeof a == "function" ? a.options : a;
    t && (s.render = t, s.staticRenderFns = e, s._compiled = !0), i && (s.functional = !0), c && (s._scopeId = "data-v-" + c);
    var n;
    if (u ? (n = function (r) {
        r = r || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !r && typeof __VUE_SSR_CONTEXT__ < "u" && (r = __VUE_SSR_CONTEXT__), o && o.call(this, r), r && r._registeredComponents && r._registeredComponents.add(u);
    }, s._ssrRegister = n) : o && (n = f ? function () {
        o.call(
            this,
            (s.functional ? this.parent : this).$root.$options.shadowRoot
        );
    } : o), n)
        if (s.functional) {
            s._injectStyles = n;
            var h = s.render;
            s.render = function (m, g) {
                return n.call(g), h(m, g);
            };
        } else {
            var p = s.beforeCreate;
            s.beforeCreate = p ? [].concat(p, n) : [n];
        }
    return {
        exports: a,
        options: s
    };
}
const b = {
    name: "TopRatings",
    mixins: [
        y
    ],
    props: {
        title: {
            type: String,
            required: !0
        },
        ratingsIds: {
            type: Array,
            required: !0
        },
        totalRatings: {
            type: Number,
            required: !0,
            validator: (a) => a > 0
        },
        carousel: {
            type: Boolean,
            default: !0
        }
    },
    data: () => ({
        loading: !0,
        ready: !0,
        ratings: []
    }),
    computed: {
        ..._("preview", ["isPreview"]),
        ratingsPerPage() {
            return this.isMobile ? 1 : 4;
        },
        carouselOptions() {
            return {
                gap: 19,
                perPage: 4,
                pagination: !0,
                arrows: !0,
                breakpoints: {
                    700: {
                        gap: 16,
                        perPage: 1,
                        pagination: !0,
                        arrows: !1
                    }
                }
            };
        }
    },
    watch: {
        isMobile() {
            this.carousel && (this.ready = !1, this.$nextTick(() => {
                this.ready = !0;
            }));
        }
    },
    mounted() {
        this.loadRating();
    },
    methods: {
        times: v.times,
        tagOrDiv(a) {
            return this.carousel ? a : "div";
        },
        async loadRating() {
            this.loading = !0;
            try {
                if (!this.ratingsIds.length && this.isPreview) {
                    await this.loadPlaceholders();
                    return;
                }
                if (!this.ratingsIds.length)
                    return;
                const a = this.ratingsIds.slice(0, this.totalRatings);
                if (!a.length)
                    return;
                const t = this.$applyQueriesToUrl("catalog/reviews", {
                    id: a,
                    include: "product",
                    filterBy: "id"
                }), { data: e } = await C.get(t);
                this.ratings = e.data, this.loading = !1;
            } catch {
                console.error(`Ops! Algo deu errado durante o carregamento das avalia\xE7\xF5es.
                 Por favor, tente novamente mais tarde.`);
            }
        },
        async loadPlaceholders() {
            this.loading = !0;
            try {
                const { data: a } = await w.get("/placeholders/reviews-home");
                this.ratings = a.data.slice(0, this.totalRatings), this.loading = !1;
            } catch {
                console.error(`Ops! Algo deu errado durante o carregamento das avalia\xE7\xF5es.
                 Por favor, tente novamente mais tarde.`);
            }
        }
    }
};
var R = function () {
    var t = this, e = t._self._c;
    return t.ratings.length > 0 && t.ready ? e("section", [e("div", { staticClass: "container top-ratings-holder" }, [e("div", { staticClass: "flex -between" }, [e("div", { staticClass: "holder-left flex -vcenter" }, [e("div", { staticClass: "theme-title top-ratings-name" }, [t._v(" " + t._s(t.title) + " ")])])]), e("div", { staticClass: "ratings-list -carousel", class: { "-loading": t.loading } }, [t.ready ? e(t.tagOrDiv("splide"), {
        tag: "component", class: {
            "flex -wrap": !t.carousel,
            "single-per-line": t.isMobile === 1,
            "-no-pagination": t.carousel && t.ratings.length <= t.ratingsPerPage
        }, attrs: { options: t.carousel ? t.carouselOptions : null, slides: t.carousel ? t.ratings : null }
    }, t._l(t.ratings, function (i) {
        return e(t.tagOrDiv("splide-slide"), { key: i.id, tag: "component", class: { "box-rating-wrapper": !t.carousel } }, [e("div", { staticClass: "holder-review" }, [e("div", { staticClass: "review-content" }, [e("div", { staticClass: "-plr10" }, [e("div", { staticClass: "-rating" }, t._l(t.times(5), function (o) {
            return e("i", { key: o, staticClass: "icon", class: `icon-star-${o < i.rating ? "dynamic" : "grey"}` });
        }), 0), e("span", { staticClass: "-client", domProps: { textContent: t._s(i.name) } }), e("div", { staticClass: "-message" }, [e("ReadMore", { attrs: { "max-lines": 4, "read-more": "+ Ver mais", "read-less": "- Ver menos" } }, [t._v(" " + t._s(i.message) + " ")])], 1)]), e("div", { staticClass: "-product" }, [e("a", { staticClass: "-product-link", attrs: { href: i.product.data.url } }, [i.product.data.images.data[0] ? e("CustomImage", { staticClass: "-product-image", attrs: { src: i.product.data.images.data[0].url, alt: i.product.data.name, thumbor: { resize: "35x35" }, width: "35", height: "35" } }) : t._e(), e("div", [e("p", { staticClass: "-product-title ellipsis-multiline l1" }, [t._v(" " + t._s(i.product.data.name) + " ")]), e("span", { staticClass: "redirect" }, [t._v("Ver produto")]), e("svg", { attrs: { width: "11", height: "10", viewBox: "0 0 11 10" } }, [e("path", { attrs: { d: "M10.061 3.22917V0H6.60252V0.9375H8.48895L4.29687 5.10417L5.03049 5.72917L9.11776 1.66667V3.22917H10.061Z" } }), e("path", { attrs: { d: "M4.92569 0.9375V0H0V10H10.061V5H9.11776V9.0625H0.943216V0.9375H4.92569Z" } })])])], 1)])])])]);
    }), 1) : t._e()], 1)])]) : t._e();
}, P = [], O = /* @__PURE__ */ V(
    b,
    R,
    P,
    !1,
    null,
    null,
    null,
    null
);
const $ = O.exports;
function d(a) {
    d.installed || (d.installed = !0, a.component("TopRatings", $));
}
const H = {
    install: d
};
let l = null;
typeof window < "u" ? l = window.Vue : typeof global < "u" && (l = global.Vue);
l && l.use(H);
export {
    $ as default
};
