import { mapGetters as c } from "http://rocket.test/dist/vendor/vuex.js";
import f from "http://rocket.test/dist/vendor/modules/axios/api.js";
import p from "http://rocket.test/dist/vendor/modules/axios/rocket.js";
import g from "http://rocket.test/dist/vendor/mixins/mobile.js";
function m(t, e, i, s, n, l, o, d) {
  var a = typeof t == "function" ? t.options : t;
  return e && (a.render = e, a.staticRenderFns = i, a._compiled = !0), {
    exports: t,
    options: a
  };
}
const y = {
  name: "Banners",
  mixins: [
    g
  ],
  props: {
    section: {
      type: String,
      required: !0
    },
    container: {
      type: [Boolean, Number],
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
      type: [Array, Object],
      default: () => ({})
    },
    firstBanner: {
      type: [Array, Object],
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
    ...c("preview", ["isPreview", "isEditing"]),
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
      var i, s, n, l, o, d, a, h;
      let t = parseFloat((s = (i = this.dimensions) == null ? void 0 : i.desktop) == null ? void 0 : s.width), e = parseFloat((l = (n = this.dimensions) == null ? void 0 : n.desktop) == null ? void 0 : l.height);
      return this.isMobile && (t = parseFloat((d = (o = this.dimensions) == null ? void 0 : o.mobile) == null ? void 0 : d.width) || t, e = parseFloat((h = (a = this.dimensions) == null ? void 0 : a.mobile) == null ? void 0 : h.height) || e), t ? e / t : 0;
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
      const t = this.container ? "container" : "", e = this.isPreview ? "preview" : "";
      return `holder-${this.section} ${t} ${e} relative`;
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
        if (this.loading = !0, !t.length && (this.isPreview || this.isEditing) && !this.slug.length) {
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
        const { data: i } = await f.get("catalog/banners", {
          params: e
        });
        if (!i.data.length && (this.isPreview || this.isEditing)) {
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
      const { data: t } = await p({
        method: "get",
        url: `/placeholders/${this.section}`
      });
      this.banners = t.data;
    }
  }
};
var b = function() {
  var e = this, i = e._self._c;
  return e.banners.length ? i("section", [i("div", { class: e.getHolderClass() }, [e.ready ? i(e.getComponent("splide"), { tag: "component", class: e.classes, attrs: { slides: e.carousel ? e.banners : null, options: e.carousel ? e.carouselOptions : null } }, [e._l(e.banners, function(s, n) {
    return [e.isValid(s) ? i(e.getComponent("splide-slide"), { key: s.id, ref: "holderBanners", refInFor: !0, tag: "component", staticClass: "banner" }, [s.stopwatch ? i("div", { staticClass: "relative-banner relative", class: { container: e.section === "main-banner" } }, [i("banner-stopwatch")], 1) : e._e(), s.type === "product" ? i("Banner-Product", { attrs: { product: s.product.data, "is-mobile": e.isMobile } }) : i("div", { staticClass: "banner-image-holder", style: e.imageHolderStyle }, [i("CustomImage", { class: { "-loading": !e.isPreview }, attrs: { src: e.getImage(s), alt: "Banner " + n, "thumbor-enabled": !1, lazyload: !e.isPreview } })], 1), e.getLink(s) !== "http://" ? i("a", { staticClass: "full-link", attrs: { href: e.getLink(s) } }, [i("span", { staticClass: "-invisible" }, [e._v("link")])]) : e._e()], 1) : e._e()];
  }), !e.carousel && e.banners.length < e.quantity ? e._l(e.quantity - e.banners.length, function(s) {
    return i("div", { key: s, staticClass: "banner -hack" });
  }) : e._e()], 2) : e._e()], 1)]) : e._e();
}, _ = [], A = /* @__PURE__ */ m(
  y,
  b,
  _
);
const v = A.exports;
function u(t) {
  u.installed || (u.installed = !0, t.component("Banners", v));
}
const B = {
  install: u
};
let r = null;
typeof window < "u" ? r = window.Vue : typeof global < "u" && (r = global.Vue);
r && r.use(B);
export {
  v as default
};
