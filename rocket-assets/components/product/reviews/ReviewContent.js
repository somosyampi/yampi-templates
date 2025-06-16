import p from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/lodash.js";
import w from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/modules/axios/api.js";
import m from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/components/product/reviews/BaseContent.js";
function C(a, e, t, s, o, l, u, f) {
    var r = typeof a == "function" ? a.options : a;
    e && (r.render = e, r.staticRenderFns = t, r._compiled = !0), s && (r.functional = !0), l && (r._scopeId = "data-v-" + l);
    var n;
    if (u ? (n = function (i) {
        i = i || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !i && typeof __VUE_SSR_CONTEXT__ < "u" && (i = __VUE_SSR_CONTEXT__), o && o.call(this, i), i && i._registeredComponents && i._registeredComponents.add(u);
    }, r._ssrRegister = n) : o && (n = f ? function () {
        o.call(
            this,
            (r.functional ? this.parent : this).$root.$options.shadowRoot
        );
    } : o), n)
        if (r.functional) {
            r._injectStyles = n;
            var h = r.render;
            r.render = function (_, g) {
                return n.call(g), h(_, g);
            };
        } else {
            var v = r.beforeCreate;
            r.beforeCreate = v ? [].concat(v, n) : [n];
        }
    return {
        exports: a,
        options: r
    };
}
const R = {
    name: "ReviewContent",
    extends: m,
    props: {
        showAverageReviews: {
            type: Boolean,
            default: !0
        },
        count: {
            type: Number,
            required: !0
        }
    },
    data: () => ({
        route: "reviews",
        ratings: {},
        order: "newest"
    }),
    computed: {
        roundedAverage() {
            return this.ratings.average_rating ? Number(this.ratings.average_rating).toFixed(1) : 0;
        },
        showAverageElement() {
            return this.showAverageReviews && this.count > 0;
        },
        groupedRatings() {
            if (!this.ratings.grouped_rating)
                return [];
            const a = [];
            return Object.keys(this.ratings.grouped_rating).forEach((e) => {
                a.push({
                    index: e,
                    count: this.ratings.grouped_rating[e]
                });
            }), a.reverse();
        }
    },
    mounted() {
        this.getAllRatings();
    },
    updated() {
        const a = this.$refs.ReviewCardRef;
        if (a)
            for (let e = 0; e < a.length; e++)
                this.$refs.ReviewCardRef[e].resizeAllGridItems();
    },
    methods: {
        times: p.times,
        async getAllRatings() {
            const a = `catalog/products/reviews/ratings?product_id=${this.product.id}`;
            try {
                this.isLoading = !0;
                const { data: e } = await w.get(a);
                this.ratings = e;
            } catch (e) {
                console.error(e);
            } finally {
                this.isLoading = !1;
            }
        },
        getReviewBarClass(a) {
            return `w-${Math.round(
                this.ratings.grouped_rating[a] / this.count * 100
            )}`;
        },
        getStarPercentage(a) {
            if (a + 1 <= this.roundedAverage)
                return "100%";
            const e = (this.roundedAverage % 1).toFixed(1) * 100;
            let t = "0%";
            return e > 0 && e <= 40 && (t = "30%"), e > 40 && e <= 60 && (t = "50%"), e > 60 && e <= 75 && (t = "55%"), e > 75 && (t = "65%"), a > this.roundedAverage ? "0%" : t;
        },
        updateOrderBy(a) {
            this.order = a, this.loaded = !1, this.payload.splice(0, this.payload.length), this.pagination.currentPage = 0, this.pagination.loaded = 0, this.loadData(!0, this.order);
        }
    }
};
var y = function () {
    var e = this, t = e._self._c;
    return t("div", { staticClass: "tab-content" }, [t("div", { staticClass: "holder-reviews", class: { grid: e.showAverageElement } }, [e.showAverageElement ? t("div", { staticClass: "average-reviews" }, [t("p", { staticClass: "average-reviews__number" }, [e._v(" " + e._s(e.roundedAverage) + " ")]), t("div", { staticClass: "stars" }, e._l(e.times(5), function (s) {
        return t("FilledStar", { key: s, attrs: { width: "23", height: "22", "fill-id": s, "filled-percentage": e.getStarPercentage(s) } });
    }), 1), t("p", { staticClass: "helper-text mt-5" }, [e._v(" baseada em "), t("strong", [e._v(e._s(e.$tc("reviews.total-reviews", e.count)))])]), t("div", { staticClass: "holder-grades mt-30" }, e._l(e.groupedRatings, function (s) {
        return t("div", { key: s.index, staticClass: "grade" }, [t("span", [e._v(e._s(s.index))]), t("i", { staticClass: "icon icon-star-dynamic" }), t("div", { staticClass: "bar", class: e.getReviewBarClass(s.index) }), t("span", { staticClass: "review-count" }, [e._v(e._s(s.count))])]);
    }), 0), t("div", { staticClass: "btn btn-secundary -block mt-43", on: { click: e.showModal } }, [e._v(" Avaliar produto ")])]) : t("div", { staticClass: "btn btn-secundary", on: { click: e.showModal } }, [e._v(" Avaliar produto ")]), t("div", [e.payload.length ? [t("MasonryLayout", {
        scopedSlots: e._u([{
            key: "header", fn: function () {
                return [t("div", { staticClass: "select-order flex -vcenter -hend" }, [t("span", { staticClass: "-title mr-12" }, [e._v(" ORDENAR POR: ")]), t("custom-select", { tag: "select", attrs: { id: "reviews-order-select", name: "reviews-order", value: e.order }, on: { change: e.updateOrderBy } }, [t("option", { attrs: { value: "newest" } }, [e._v(" Mais Recentes ")]), t("option", { attrs: { value: "oldest" } }, [e._v(" Mais Antigas ")]), t("option", { attrs: { value: "best_rating" } }, [e._v(" Notas Positivas ")]), t("option", { attrs: { value: "worst_rating" } }, [e._v(" Notas Negativas ")])])], 1)];
            }, proxy: !0
        }], null, !1, 43242722)
    }, e._l(e.payload, function (s, o) {
        return t("ReviewCard", { key: s.id, ref: "ReviewCardRef", refInFor: !0, attrs: { review: s, "show-dates": e.showDates, loading: e.isLoading }, on: { error: (l) => e.handleReviewCardError(l, o) } });
    }), 1), t("br"), e.showLoadMore ? t("div", {
        staticClass: "load-more", on: {
            click: function (s) {
                return e.loadData(!0, e.order);
            }
        }
    }, [e._v(" + Ver mais avalia\xE7\xF5es ")]) : e._e()] : e._e(), e.isLoading ? t("div", { staticClass: "text-center" }, [t("br"), t("i", { staticClass: "icon icon-loader-dark" })]) : e._e()], 2), !e.loading && !e.payload.length ? [t("br"), t("div", { staticClass: "alert -yellow" }, [e._v(" Esse produto ainda n\xE3o possui nenhuma avalia\xE7\xE3o. "), t("b", { staticClass: "link-alike", on: { click: e.showModal } }, [e._v("Seja o primeiro a avaliar")])])] : e._e()], 2), t("ModalReview", { ref: "modal", on: { success: e.showModalSuccess } }), t("ModalReviewSuccess", { ref: "modalSuccess" })], 1);
}, b = [], A = /* @__PURE__ */ C(
    R,
    y,
    b,
    !1,
    null,
    null,
    null,
    null
);
const k = A.exports;
function c(a) {
    c.installed || (c.installed = !0, a.component("ReviewContent", k));
}
const $ = {
    install: c
};
let d = null;
typeof window < "u" ? d = window.Vue : typeof global < "u" && (d = global.Vue);
d && d.use($);
export {
    k as default
};
