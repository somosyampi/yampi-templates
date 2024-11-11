import { mapGetters as s, mapActions as c } from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/vuex.js";
function a(t, e, i, g, p, _, v, w) {
  var o = typeof t == "function" ? t.options : t;
  return e && (o.render = e, o.staticRenderFns = i, o._compiled = !0), {
    exports: t,
    options: o
  };
}
const d = {
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
    ...s("preview", ["isPreview", "isEditing", "activeSection"])
  },
  watch: {
    activeSection(t) {
      this.isPreview && t === this.emits && this.$emit("openCategory");
    },
    isEditing() {
      this.key += 1;
    }
  },
  mounted() {
    this.isPreview && (this.$nextTick(this.handleTagPosition), window.addEventListener("scroll", this.handleTagPosition), window.addEventListener("load", this.handleTagPosition));
  },
  destroyed() {
    window.removeEventListener("scroll", () => {
    }), window.removeEventListener("load", () => {
    });
  },
  methods: {
    ...c("preview", ["setActiveSection"]),
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
        cart: "icon-cart"
      }[t];
    }
  }
};
var l = function() {
  var e = this, i = e._self._c;
  return i("div", { key: e.key }, [e.isPreview ? i("div", { ref: "rocketEmitterRef", staticClass: "rocket-emitter", class: {
    "--hide-stroke": !e.showStroke,
    "--active": e.activeSection === `${e.emits}-${e.order}` || e.activeSection === `${e.emits}`
  }, on: { click: e.handleClick } }, [e.showStroke ? i("div", { staticClass: "emitter-title" }, [i(e.getComponent(e.emits), { tag: "component" }), e._v(" " + e._s(e.label) + " ")], 1) : e._e(), e._t("default")], 2) : i("div", [e._t("default")], 2)]);
}, m = [], h = /* @__PURE__ */ a(
  d,
  l,
  m
);
const u = h.exports;
function r(t) {
  r.installed || (r.installed = !0, t.component("RocketEmitter", u));
}
const f = {
  install: r
};
let n = null;
typeof window < "u" ? n = window.Vue : typeof global < "u" && (n = global.Vue);
n && n.use(f);
export {
  u as default
};