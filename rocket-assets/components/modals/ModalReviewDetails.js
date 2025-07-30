import w from "https://codigo-aberto-sandbox-assets.yampi.io.s3.amazonaws.com/yampi-templates-sandbox/rocket-assets/dist/vendor/lodash.js";
function m(s, e, t, r, o, f, c, _) {
    var a = typeof s == "function" ? s.options : s;
    e && (a.render = e, a.staticRenderFns = t, a._compiled = !0), r && (a.functional = !0), f && (a._scopeId = "data-v-" + f);
    var n;
    if (c ? (n = function (i) {
        i = i || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !i && typeof __VUE_SSR_CONTEXT__ < "u" && (i = __VUE_SSR_CONTEXT__), o && o.call(this, i), i && i._registeredComponents && i._registeredComponents.add(c);
    }, a._ssrRegister = n) : o && (n = _ ? function () {
        o.call(
            this,
            (a.functional ? this.parent : this).$root.$options.shadowRoot
        );
    } : o), n)
        if (a.functional) {
            a._injectStyles = n;
            var p = a.render;
            a.render = function (h, v) {
                return n.call(v), p(h, v);
            };
        } else {
            var u = a.beforeCreate;
            a.beforeCreate = u ? [].concat(u, n) : [n];
        }
    return {
        exports: s,
        options: a
    };
}
const C = {
    name: "ModalReviewDetails",
    props: {
        review: {
            type: Object,
            required: !0
        },
        showDates: {
            type: Boolean,
            required: !0
        }
    },
    data() {
        return {
            active: 0,
            show: !1,
            ready: !1
        };
    },
    methods: {
        times: w.times,
        handleModal() {
            this.ready = !this.ready, this.$refs.reviewsDetailsModal.handleModal();
        },
        setActive(s) {
            this.active = s;
        },
        handleClose() {
            this.ready = !this.ready;
        }
    }
};
var g = function () {
    var e = this, t = e._self._c;
    return t("Modal", { ref: "reviewsDetailsModal", staticClass: "testing", attrs: { name: "review-details", scrollable: !0 }, on: { close: e.handleClose } }, [t("Transition", { attrs: { name: "fade" } }, [e.ready ? t("div", { staticClass: "wrapper -row" }, [t("Splide", {
        staticClass: "custom-splide", attrs: {
            options: {
                perPage: 1,
                rewind: !0,
                arrows: e.review.photos.data.length > 1,
                pagination: e.review.photos.data.length > 1
            }, slides: e.review.photos.data
        }
    }, e._l(e.review.photos.data, function (r) {
        return t("SplideSlide", { key: r.url, staticClass: "review-details-photo-container" }, [t("img", { attrs: { src: r.url } })]);
    }), 1), t("div", { staticClass: "review-details-content" }, [t("div", { staticClass: "review-details-message-title" }, [e._v(" Avalia\xE7\xE3o ")]), t("div", { staticClass: "-rating" }, e._l(e.times(5), function (r) {
        return t("i", { key: r, staticClass: "icon", class: `icon-star-${r < e.review.rating ? "dynamic" : "grey"}` });
    }), 0), t("span", { staticClass: "-name", domProps: { textContent: e._s(e.review.name) } }), e.showDates ? t("Timeago", { staticClass: "-time-ago", attrs: { date: e.review.created_at.date } }) : e._e(), t("div", { staticClass: "-text review-details-message", domProps: { textContent: e._s(e.review.message) } })], 1)], 1) : e._e()])], 1);
}, y = [], R = /* @__PURE__ */ m(
    C,
    g,
    y,
    !1,
    null,
    null,
    null,
    null
);
const $ = R.exports;
function d(s) {
    d.installed || (d.installed = !0, s.component("ModalReviewDetails", $));
}
const b = {
    install: d
};
let l = null;
typeof window < "u" ? l = window.Vue : typeof global < "u" && (l = global.Vue);
l && l.use(b);
export {
    $ as default
};
