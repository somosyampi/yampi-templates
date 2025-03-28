import { mapGetters as _ } from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/vuex.js";
import y from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/modules/axios/api.js";
import b from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/modules/axios/rocket.js";
import v from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/mixins/mobile.js";
function A(t, e, i, n, a, o, d, u) {
  var s = typeof t == "function" ? t.options : t;
  e && (s.render = e, s.staticRenderFns = i, s._compiled = !0), n && (s.functional = !0), o && (s._scopeId = "data-v-" + o);
  var r;
  if (d ? (r = function(l) {
    l = l || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !l && typeof __VUE_SSR_CONTEXT__ < "u" && (l = __VUE_SSR_CONTEXT__), a && a.call(this, l), l && l._registeredComponents && l._registeredComponents.add(d);
  }, s._ssrRegister = r) : a && (r = u ? function() {
    a.call(
      this,
      (s.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : a), r)
    if (s.functional) {
      s._injectStyles = r;
      var g = s.render;
      s.render = function(m, p) {
        return r.call(p), g(m, p);
      };
    } else {
      var c = s.beforeCreate;
      s.beforeCreate = c ? [].concat(c, r) : [r];
    }
  return {
    exports: t,
    options: s
  };
}
const B = {
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
      var i, n, a, o, d, u, s, r;
      let t = parseFloat((n = (i = this.dimensions) == null ? void 0 : i.desktop) == null ? void 0 : n.width), e = parseFloat((o = (a = this.dimensions) == null ? void 0 : a.desktop) == null ? void 0 : o.height);
      return this.isMobile && (t = parseFloat((u = (d = this.dimensions) == null ? void 0 : d.mobile) == null ? void 0 : u.width) || t, e = parseFloat((r = (s = this.dimensions) == null ? void 0 : s.mobile) == null ? void 0 : r.height) || e), t ? e / t : 0;
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
          const n = this.ids.indexOf(this.firstBanner.id);
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
var w = function() {
  var e = this, i = e._self._c;
  return e.banners.length ? i("section", [i("div", { class: e.getHolderClass() }, [e.ready ? i(e.getComponent("splide"), { tag: "component", class: e.classes, attrs: { slides: e.carousel ? e.banners : null, options: e.carousel ? e.carouselOptions : null } }, [e._l(e.banners, function(n, a) {
    return [e.isValid(n) ? i(e.getComponent("splide-slide"), { key: n.id, ref: "holderBanners", refInFor: !0, tag: "component", staticClass: "banner", class: {
      "--first": a === 0
    } }, [n.stopwatch ? i("div", { staticClass: "relative-banner relative", class: { container: e.section === "main-banner" } }, [i("BannerStopwatch")], 1) : e._e(), i("div", { staticClass: "banner-image-holder", style: e.imageHolderStyle }, [i("CustomImage", { class: { "-loading": !e.isPreview }, attrs: { src: e.getImage(n), alt: "Banner " + a, "thumbor-enabled": !1, lazyload: !e.isPreview } })], 1), e.getLink(n) !== "http://" ? i("a", { staticClass: "full-link", attrs: { href: e.getLink(n) } }, [i("span", { staticClass: "-invisible" }, [e._v("link")])]) : e._e()]) : e._e()];
  }), !e.carousel && e.banners.length < e.quantity ? e._l(e.quantity - e.banners.length, function(n) {
    return i("div", { key: n, staticClass: "banner -hack" });
  }) : e._e()], 2) : e._e()], 1)]) : e._e();
}, C = [], k = /* @__PURE__ */ A(
  B,
  w,
  C,
  !1,
  null,
  null,
  null,
  null
);
const $ = k.exports;
function f(t) {
  f.installed || (f.installed = !0, t.component("Banners", $));
}
const S = {
  install: f
};
let h = null;
typeof window < "u" ? h = window.Vue : typeof global < "u" && (h = global.Vue);
h && h.use(S);
export {
  $ as default
};
