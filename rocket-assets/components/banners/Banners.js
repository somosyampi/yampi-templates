import { mapGetters as B } from "https://openstore-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/vuex.js";
import b from "https://openstore-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/modules/axios/api.js";
import A from "https://openstore-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/modules/axios/rocket.js";
import v from "https://openstore-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/mixins/mobile.js";
function w(t, e, i, n, a, o, d, p) {
  var s = typeof t == "function" ? t.options : t;
  e && (s.render = e, s.staticRenderFns = i, s._compiled = !0), n && (s.functional = !0), o && (s._scopeId = "data-v-" + o);
  var l;
  if (d ? (l = function(r) {
    r = r || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !r && typeof __VUE_SSR_CONTEXT__ < "u" && (r = __VUE_SSR_CONTEXT__), a && a.call(this, r), r && r._registeredComponents && r._registeredComponents.add(d);
  }, s._ssrRegister = l) : a && (l = p ? function() {
    a.call(
      this,
      (s.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : a), l)
    if (s.functional) {
      s._injectStyles = l;
      var _ = s.render;
      s.render = function(y, m) {
        return l.call(m), _(y, m);
      };
    } else {
      var c = s.beforeCreate;
      s.beforeCreate = c ? [].concat(c, l) : [l];
    }
  return {
    exports: t,
    options: s
  };
}
const f = () => ({
  desktop: { width: "0.00", height: "0.00" },
  mobile: { width: "0.00", height: "0.00" }
}), g = () => ({
  id: null,
  link: null,
  image: null,
  mobile_image: null,
  stopwatch: null
}), C = {
  name: "Banners",
  mixins: [
    v
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
      type: [Object, Array],
      default: f
    },
    firstBanner: {
      type: [Object, Array],
      default: g
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
    ...B("preview", ["isPreview"]),
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
      const { desktop: t, mobile: e } = this.normalizedDimensions, i = this.isMobile ? e : t, n = parseFloat(i.width) || parseFloat(t.width), a = parseFloat(i.height) || parseFloat(t.height);
      return n ? a / n : 0;
    },
    normalizedDimensions() {
      return Array.isArray(this.dimensions) || !this.dimensions ? f() : this.dimensions;
    },
    normalizedFirstBanner() {
      return Array.isArray(this.firstBanner) || !this.firstBanner ? g() : this.firstBanner;
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
    if (this.normalizedFirstBanner.id) {
      const t = {
        id: this.normalizedFirstBanner.id,
        type: "",
        link: this.normalizedFirstBanner.link,
        image_url: this.normalizedFirstBanner.image,
        mobile_image_url: this.normalizedFirstBanner.mobile_image,
        stopwatch: this.normalizedFirstBanner.stopwatch
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
      if (!this.sectionIsMainBanner)
        return null;
      const e = ["width", "height"], i = this.normalizedFirstBanner.id === t.id ? this.normalizedDimensions : t.dimensions, n = this.isMobile ? i == null ? void 0 : i.mobile : i == null ? void 0 : i.desktop, a = {};
      return e.forEach((o) => {
        const d = n == null ? void 0 : n[o];
        d && (a[`placeholder-${o}`] = parseFloat(d));
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
        if (this.normalizedFirstBanner.id) {
          const n = this.ids.indexOf(this.normalizedFirstBanner.id);
          t.splice(n, 1);
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
        const { data: i } = await b.get("catalog/banners", {
          params: e
        });
        if (!i.data.length && this.isPreview) {
          await this.loadPlaceholders();
          return;
        }
        if (this.normalizedFirstBanner.id) {
          this.banners = this.banners.concat(i.data);
          return;
        }
        this.banners = i.data;
      } finally {
        this.loading = !1;
      }
    },
    async loadPlaceholders() {
      const { data: t } = await A({
        method: "get",
        url: `/placeholders/${this.section}`
      });
      this.banners = t.data;
    }
  }
};
var k = function() {
  var e = this, i = e._self._c;
  return e.banners.length ? i("section", [i("div", { class: e.getHolderClass() }, [e.ready ? i(e.getComponent("splide"), { tag: "component", class: e.classes, attrs: { slides: e.carousel ? e.banners : null, options: e.carousel ? e.carouselOptions : null } }, [e._l(e.banners, function(n, a) {
    return [e.isValid(n) ? i(e.getComponent("splide-slide"), { key: n.id, ref: "holderBanners", refInFor: !0, tag: "component", staticClass: "banner", class: {
      "--first": a === 0
    } }, [n.stopwatch ? i("div", { staticClass: "relative-banner relative", class: { container: e.sectionIsMainBanner } }, [i("BannerStopwatch")], 1) : e._e(), i("div", { staticClass: "banner-image-holder", style: e.imageHolderStyle }, [i("CustomImage", e._b({ class: { "-loading": !e.isPreview }, attrs: { src: e.getImage(n), alt: "Banner " + a, "thumbor-enabled": !1, lazyload: !e.isPreview, width: n.mobile_image ? "1200" : "333", height: n.mobile_image ? "332" : "118" } }, "CustomImage", e.getDimensionPlaceHolderSectionMainBanner(n), !1))], 1), e.getLink(n) !== "http://" ? i("a", { staticClass: "full-link", attrs: { href: e.getLink(n) } }, [i("span", { staticClass: "-invisible" }, [e._v("link")])]) : e._e()]) : e._e()];
  }), !e.carousel && e.banners.length < e.quantity ? e._l(e.quantity - e.banners.length, function(n) {
    return i("div", { key: n, staticClass: "banner -hack" });
  }) : e._e()], 2) : e._e()], 1)]) : e._e();
}, F = [], M = /* @__PURE__ */ w(
  C,
  k,
  F,
  !1,
  null,
  null,
  null,
  null
);
const S = M.exports;
function h(t) {
  h.installed || (h.installed = !0, t.component("Banners", S));
}
const $ = {
  install: h
};
let u = null;
typeof window < "u" ? u = window.Vue : typeof global < "u" && (u = global.Vue);
u && u.use($);
export {
  S as default
};
