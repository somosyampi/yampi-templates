import d from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/lodash.js";
import w from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/mixins/mobile.js";
function c(t, e, i, s, n, l, g, _) {
  var o = typeof t == "function" ? t.options : t;
  return e && (o.render = e, o.staticRenderFns = i, o._compiled = !0), {
    exports: t,
    options: o
  };
}
const h = {
  name: "ReviewCard",
  mixins: [
    w
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
    times: d.times,
    handleContentDetails() {
      this.review.photos.data.length && (this.$refs.ModalReviewDetailsRef.handleModal(), this.showMobile = !0);
    },
    resizeGridItem(t) {
      const e = t, i = this.$parent.$el, s = parseInt(window.getComputedStyle(i).getPropertyValue("grid-auto-rows"), 10), n = parseInt(window.getComputedStyle(i).getPropertyValue("grid-row-gap"), 10), l = Math.ceil((t.querySelector(".review-content").getBoundingClientRect().height + n) / (s + n));
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
var m = function() {
  var e = this, i = e._self._c;
  return i("div", { staticClass: "holder-review" }, [i("div", { staticClass: "review-content", class: {
    "-cursor-pointer": e.reviewPhotos.length
  }, on: { click: function(s) {
    return e.handleContentDetails();
  } } }, [i("div", { staticClass: "-rating" }, e._l(e.times(5), function(s) {
    return i("i", { key: s, staticClass: "icon", class: `icon-star-${s < e.review.rating ? "gold" : "grey"}` });
  }), 0), i("div", { staticClass: "flex" }, [i("span", { staticClass: "-name ellipsis", domProps: { textContent: e._s(e.review.name) } }), e.showDates ? i("Timeago", { staticClass: "-time-ago", attrs: { date: e.review.created_at.date } }) : e._e()], 1), i("div", { staticClass: "-text", domProps: { textContent: e._s(e.review.message) } }), e.review.photos.data.length ? i("div", { staticClass: "review-photos-wrapper" }, [e._l(e.reviewPhotos, function(s) {
    return [i("div", { key: s.url, staticClass: "review-photo-container" }, [i("img", { key: s.url, staticClass: "review-photo-product-page", attrs: { src: s.url } })])];
  })], 2) : e._e()]), i("div", [e.isMobile ? i("modal-review-details-mobile", { ref: "ModalReviewDetailsRef", attrs: { review: e.reviewFilteredPhotos, "show-dates": e.showDates } }) : i("modal-review-details", { ref: "ModalReviewDetailsRef", attrs: { review: e.reviewFilteredPhotos, "show-dates": e.showDates } })], 1)]);
}, u = [], v = /* @__PURE__ */ c(
  h,
  m,
  u
);
const p = v.exports;
function a(t) {
  a.installed || (a.installed = !0, t.component("ReviewCard", p));
}
const f = {
  install: a
};
let r = null;
typeof window < "u" ? r = window.Vue : typeof global < "u" && (r = global.Vue);
r && r.use(f);
export {
  p as default
};
