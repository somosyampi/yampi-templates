import "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/external-svg-loader.js";
import l from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/mixins/mobile.js";
function c(e, t, i, s, a, m, w, _) {
  var o = typeof e == "function" ? e.options : e;
  return t && (o.render = t, o.staticRenderFns = i, o._compiled = !0), {
    exports: e,
    options: o
  };
}
const d = {
  name: "Highlight",
  mixins: [
    l
  ],
  props: {
    icons: {
      type: Array,
      required: !0
    },
    iconColor: {
      type: String,
      default: "#705BC2"
    },
    textColor: {
      type: String,
      default: "#222222"
    }
  },
  data() {
    return {
      ready: !0,
      carousselOptions: {
        perPage: 1,
        rewind: !1,
        arrows: !0,
        pagination: !1,
        drag: !0,
        start: 0
      },
      baseIconUrl: `${window.Yampi.icon_url}/rocket-icons`
    };
  },
  computed: {
    showCaroussel() {
      return this.width < 901;
    }
  },
  async mounted() {
    this.ready = !1, await this.$nextTick(() => {
      this.ready = !0;
    });
  },
  methods: {
    tagOrDiv(e) {
      return this.showCaroussel ? e : "div";
    },
    getCarousselOptions() {
      return this.width < 901 && this.width > 768 && (this.carousselOptions.perPage = 3), this.width < 769 && this.width > 595 && (this.carousselOptions.perPage = 2), this.width <= this.isMobile && (this.carousselOptions.perPage = 1), this.carousselOptions;
    }
  }
};
var h = function() {
  var t = this, i = t._self._c;
  return i("div", { staticClass: "container" }, [i("div", { staticClass: "highlight-holder" }, [t.ready ? i(t.tagOrDiv("splide"), { tag: "component", attrs: { options: t.showCaroussel ? t.getCarousselOptions() : null } }, t._l(t.icons, function(s, a) {
    return i(t.tagOrDiv("splide-slide"), { key: a, tag: "component", staticClass: "highlight-container" }, [s.text !== "" ? i("div", { staticClass: "highlight-container-flexible" }, [i("svg", { key: s.icon, staticClass: "highlight-icon", attrs: { "data-src": `${t.baseIconUrl}/${s.icon}`, fill: t.iconColor, width: "46", height: "46" } }), i("span", { staticClass: "highlight-text", style: `color: ${t.textColor}`, domProps: { innerHTML: t._s(s.text) } })]) : t._e()]);
  }), 1) : t._e()], 1)]);
}, u = [], p = /* @__PURE__ */ c(
  d,
  h,
  u
);
const g = p.exports;
function r(e) {
  r.installed || (r.installed = !0, e.component("Highlight", g));
}
const f = {
  install: r
};
let n = null;
typeof window < "u" ? n = window.Vue : typeof global < "u" && (n = global.Vue);
n && n.use(f);
export {
  g as default
};
