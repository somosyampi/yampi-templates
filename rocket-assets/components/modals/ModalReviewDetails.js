import r from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/lodash.js";
function l(s, e, t, a, w, f, _, h) {
  var i = typeof s == "function" ? s.options : s;
  return e && (i.render = e, i.staticRenderFns = t, i._compiled = !0), {
    exports: s,
    options: i
  };
}
const d = {
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
    times: r.times,
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
var c = function() {
  var e = this, t = e._self._c;
  return t("modal", { ref: "reviewsDetailsModal", staticClass: "testing", attrs: { name: "review-details", scrollable: !0 }, on: { close: e.handleClose } }, [t("transition", { attrs: { name: "fade" } }, [e.ready ? t("div", { staticClass: "wrapper -row" }, [t("splide", { staticClass: "custom-splide", attrs: { options: {
    perPage: 1,
    rewind: !0,
    arrows: e.review.photos.data.length > 1,
    pagination: e.review.photos.data.length > 1
  }, slides: e.review.photos.data } }, e._l(e.review.photos.data, function(a) {
    return t("splide-slide", { key: a.url, staticClass: "review-details-photo-container" }, [t("img", { attrs: { src: a.url } })]);
  }), 1), t("div", { staticClass: "review-details-content" }, [t("div", { staticClass: "review-details-message-title" }, [e._v(" Avaliação ")]), t("div", { staticClass: "-rating" }, e._l(e.times(5), function(a) {
    return t("i", { key: a, staticClass: "icon", class: `icon-star-${a < e.review.rating ? "dynamic" : "grey"}` });
  }), 0), t("span", { staticClass: "-name", domProps: { textContent: e._s(e.review.name) } }), e.showDates ? t("Timeago", { staticClass: "-time-ago", attrs: { date: e.review.created_at.date } }) : e._e(), t("div", { staticClass: "-text review-details-message", domProps: { textContent: e._s(e.review.message) } })], 1)], 1) : e._e()])], 1);
}, u = [], v = /* @__PURE__ */ l(
  d,
  c,
  u
);
const p = v.exports;
function n(s) {
  n.installed || (n.installed = !0, s.component("ModalReviewDetails", p));
}
const m = {
  install: n
};
let o = null;
typeof window < "u" ? o = window.Vue : typeof global < "u" && (o = global.Vue);
o && o.use(m);
export {
  p as default
};
