import p from "https://codigo-aberto-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/lodash.js";
import _ from "https://codigo-aberto-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/mixins/mobile.js";
function g(t, e, i, o, n, l, w, f) {
    var s = typeof t == "function" ? t.options : t;
    e && (s.render = e, s.staticRenderFns = i, s._compiled = !0), o && (s.functional = !0), l && (s._scopeId = "data-v-" + l);
    var a;
    if (w ? (a = function (r) {
        r = r || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !r && typeof __VUE_SSR_CONTEXT__ < "u" && (r = __VUE_SSR_CONTEXT__), n && n.call(this, r), r && r._registeredComponents && r._registeredComponents.add(w);
    }, s._ssrRegister = a) : n && (a = f ? function () {
        n.call(
            this,
            (s.functional ? this.parent : this).$root.$options.shadowRoot
        );
    } : n), a)
        if (s.functional) {
            s._injectStyles = a;
            var v = s.render;
            s.render = function (m, u) {
                return a.call(u), v(m, u);
            };
        } else {
            var c = s.beforeCreate;
            s.beforeCreate = c ? [].concat(c, a) : [a];
        }
    return {
        exports: t,
        options: s
    };
}
const C = {
    name: "ReviewCard",
    mixins: [
        _
    ],
    props: {
        review: {
            type: Object,
            required: !0
        },
        showDates: {
            type: Boolean,
            required: !0
        },
        loading: {
            type: Boolean,
            default: !1
        }
    },
    data() {
        return {
            activePhoto: 0,
            imageHasError: [!1, !1, !1],
            photos: this.review.photos.data,
            windowWidth: window.outerWidth,
            showMobile: !1,
            ready: !1
        };
    },
    computed: {
        reviewPhotos() {
            return this.review.photos.data.filter(
                (t) => t.url.match(/\.([^./?]+)($|\?)/)
            );
        },
        reviewFilteredPhotos() {
            const t = this.review;
            return t.photos.data = this.reviewPhotos, t;
        }
    },
    watch: {
        loading() {
            this.resizeAllGridItems();
        }
    },
    mounted() {
        window.addEventListener("load", () => {
            this.windowWidth = document.documentElement.offsetWidth, this.resizeAllGridItems();
        }), window.addEventListener("resize", () => {
            this.windowWidth = document.documentElement.offsetWidth, this.resizeAllGridItems();
        });
    },
    updated() {
        this.resizeAllGridItems();
    },
    methods: {
        times: p.times,
        handleContentDetails() {
            this.review.photos.data.length && (this.$refs.ModalReviewDetailsRef.handleModal(), this.showMobile = !0);
        },
        resizeGridItem(t) {
            const e = t, i = this.$parent.$el, o = parseInt(window.getComputedStyle(i).getPropertyValue("grid-auto-rows"), 10), n = parseInt(window.getComputedStyle(i).getPropertyValue("grid-row-gap"), 10), l = Math.ceil((t.querySelector(".review-content").getBoundingClientRect().height + n) / (o + n));
            e.style.gridRowEnd = `span ${l}`;
        },
        resizeAllGridItems() {
            const t = document.getElementsByClassName("holder-review");
            for (let e = 0; e < t.length; e++)
                this.resizeGridItem(t[e]);
        },
        resizeInstance(t) {
            const e = t.elements[0];
            this.resizeGridItem(e);
        }
    }
};
var y = function () {
    var e = this, i = e._self._c;
    return i("div", { staticClass: "holder-review" }, [i("div", {
        staticClass: "review-content", class: {
            "-cursor-pointer": e.reviewPhotos.length
        }, on: {
            click: function (o) {
                return e.handleContentDetails();
            }
        }
    }, [i("div", { staticClass: "-rating" }, e._l(e.times(5), function (o) {
        return i("i", { key: o, staticClass: "icon", class: `icon-star-${o < e.review.rating ? "dynamic" : "grey"}` });
    }), 0), i("div", { staticClass: "flex" }, [i("span", { staticClass: "-name ellipsis", domProps: { textContent: e._s(e.review.name) } }), e.showDates ? i("Timeago", { staticClass: "-time-ago", attrs: { date: e.review.created_at.date } }) : e._e()], 1), i("div", { staticClass: "-text", domProps: { textContent: e._s(e.review.message) } }), e.review.photos.data.length ? i("div", { staticClass: "review-photos-wrapper" }, [e._l(e.reviewPhotos, function (o) {
        return [i("div", { key: o.url, staticClass: "review-photo-container" }, [i("img", { key: o.url, staticClass: "review-photo-product-page", attrs: { src: o.url } })])];
    })], 2) : e._e()]), i("div", [e.isMobile ? i("ModalReviewDetailsMobile", { ref: "ModalReviewDetailsRef", attrs: { review: e.reviewFilteredPhotos, "show-dates": e.showDates } }) : i("ModalReviewDetails", { ref: "ModalReviewDetailsRef", attrs: { review: e.reviewFilteredPhotos, "show-dates": e.showDates } })], 1)]);
}, R = [], I = /* @__PURE__ */ g(
    C,
    y,
    R,
    !1,
    null,
    null,
    null,
    null
);
const $ = I.exports;
function h(t) {
    h.installed || (h.installed = !0, t.component("ReviewCard", $));
}
const M = {
    install: h
};
let d = null;
typeof window < "u" ? d = window.Vue : typeof global < "u" && (d = global.Vue);
d && d.use(M);
export {
    $ as default
};
