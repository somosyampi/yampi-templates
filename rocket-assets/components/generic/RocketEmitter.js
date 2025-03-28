import { mapGetters as g, mapActions as v } from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/vuex.js";
function w(t, e, r, _, s, d, l, h) {
  var i = typeof t == "function" ? t.options : t;
  e && (i.render = e, i.staticRenderFns = r, i._compiled = !0), _ && (i.functional = !0), d && (i._scopeId = "data-v-" + d);
  var o;
  if (l ? (o = function(n) {
    n = n || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !n && typeof __VUE_SSR_CONTEXT__ < "u" && (n = __VUE_SSR_CONTEXT__), s && s.call(this, n), n && n._registeredComponents && n._registeredComponents.add(l);
  }, i._ssrRegister = o) : s && (o = h ? function() {
    s.call(
      this,
      (i.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : s), o)
    if (i.functional) {
      i._injectStyles = o;
      var u = i.render;
      i.render = function(p, m) {
        return o.call(m), u(p, m);
      };
    } else {
      var f = i.beforeCreate;
      i.beforeCreate = f ? [].concat(f, o) : [o];
    }
  return {
    exports: t,
    options: i
  };
}
const k = {
  name: "RocketEmitter",
  props: {
    emits: {
      type: String,
      required: !0
    },
    label: {
      type: [String, null],
      default: null
    },
    showStroke: {
      type: Boolean,
      default: !0
    },
    order: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      actived: !1,
      key: 0
    };
  },
  computed: {
    ...g("preview", ["isPreview", "isIframe", "activeSection"])
  },
  watch: {
    activeSection(t) {
      !this.isIframe || t === this.emits && this.$emit("openCategory");
    },
    isPreview() {
      this.key += 1;
    }
  },
  mounted() {
    !this.isIframe || (this.$nextTick(this.handleTagPosition), window.addEventListener("scroll", this.handleTagPosition), window.addEventListener("load", this.handleTagPosition));
  },
  destroyed() {
    window.removeEventListener("scroll", () => {
    }), window.removeEventListener("load", () => {
    });
  },
  methods: {
    ...v("preview", ["setActiveSection"]),
    handleTagPosition() {
      if (!this.$refs.rocketEmitterRef)
        return;
      if (this.$refs.rocketEmitterRef.getBoundingClientRect().top > 24) {
        this.$refs.rocketEmitterRef.classList.add("--on-top");
        return;
      }
      this.$refs.rocketEmitterRef.classList.remove("--on-top");
    },
    handleClick(t) {
      t.preventDefault(), this.handleTagPosition(), this.setActiveSection(`${this.emits}-${this.order}`), window.parent.postMessage(
        {
          selectMenu: this.emits,
          order: this.order,
          from: "rocket-emitter"
        },
        "*"
      ), t.stopPropagation();
    },
    getComponent(t) {
      return this.getSectionIcon(t);
    },
    getSectionIcon(t) {
      return {
        header: "icon-header",
        footer: "icon-footer",
        main_banner: "icon-image-slide",
        collection: "icon-grid",
        grids: "icon-grid",
        banner_1: "icon-image",
        banner_2: "icon-image",
        banner_3: "icon-image",
        highlights: "icon-highlights",
        video_home: "icon-video",
        categories_highlight: "icon-star",
        top_ratings: "icon-comments",
        text_button: "icon-cta",
        main_category_content: "icon-grid",
        main_product_content: "icon-shirt",
        buy_together: "icon-bag",
        video: "icon-video",
        product_specifications: "icon-page",
        product_reviews: "icon-question",
        product_similars: "icon-grid",
        main_pages_content: "icon-page",
        main_promotion_content: "icon-marketing",
        cart: "icon-cart",
        text_button_2_banners: "icon-text-banners",
        grid_collection: "icon-collections-grid"
      }[t];
    }
  }
};
var b = function() {
  var e = this, r = e._self._c;
  return r("div", { key: e.key }, [e.isPreview && e.isIframe ? r("div", { ref: "rocketEmitterRef", staticClass: "rocket-emitter", class: {
    "--hide-stroke": !e.showStroke,
    "--active": e.activeSection === `${e.emits}-${e.order}` || e.activeSection === `${e.emits}`
  }, on: { click: e.handleClick } }, [e.showStroke ? r("div", { staticClass: "emitter-title" }, [r(e.getComponent(e.emits), { tag: "component" }), e._v(" " + e._s(e.label) + " ")], 1) : e._e(), e._t("default")], 2) : r("div", [e._t("default")], 2)]);
}, C = [], $ = /* @__PURE__ */ w(
  k,
  b,
  C,
  !1,
  null,
  null,
  null,
  null
);
const S = $.exports;
function c(t) {
  c.installed || (c.installed = !0, t.component("RocketEmitter", S));
}
const y = {
  install: c
};
let a = null;
typeof window < "u" ? a = window.Vue : typeof global < "u" && (a = global.Vue);
a && a.use(y);
export {
  S as default
};
