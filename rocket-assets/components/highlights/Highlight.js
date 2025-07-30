import "https://codigo-aberto-sandbox-assets.yampi.io.s3.amazonaws.com/yampi-templates-sandbox/rocket-assets/dist/vendor/external-svg-loader.js";
import C from "https://codigo-aberto-sandbox-assets.yampi.io.s3.amazonaws.com/yampi-templates-sandbox/rocket-assets/dist/vendor/mixins/mobile.js";
function v(i, t, s, a, r, d, u, p) {
  var e = typeof i == "function" ? i.options : i;
  t && (e.render = t, e.staticRenderFns = s, e._compiled = !0), a && (e.functional = !0), d && (e._scopeId = "data-v-" + d);
  var o;
  if (u ? (o = function(n) {
    n = n || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !n && typeof __VUE_SSR_CONTEXT__ < "u" && (n = __VUE_SSR_CONTEXT__), r && r.call(this, n), n && n._registeredComponents && n._registeredComponents.add(u);
  }, e._ssrRegister = o) : r && (o = p ? function() {
    r.call(
      this,
      (e.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : r), o)
    if (e.functional) {
      e._injectStyles = o;
      var _ = e.render;
      e.render = function(g, c) {
        return o.call(c), _(g, c);
      };
    } else {
      var f = e.beforeCreate;
      e.beforeCreate = f ? [].concat(f, o) : [o];
    }
  return {
    exports: i,
    options: e
  };
}
const m = {
  name: "Highlight",
  mixins: [
    C
  ],
  props: {
    items: {
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
    this.ready = !1, this.$nextTick(() => {
      this.ready = !0;
    });
  },
  methods: {
    tagOrDiv(i) {
      return this.showCaroussel ? i : "div";
    },
    getCarousselOptions() {
      return this.width < 901 && this.width > 768 && (this.carousselOptions.perPage = 3), this.width < 769 && this.width > 595 && (this.carousselOptions.perPage = 2), this.width <= this.isMobile && (this.carousselOptions.perPage = 1), this.carousselOptions;
    }
  }
};
var w = function() {
  var t = this, s = t._self._c;
  return s("div", { staticClass: "container" }, [s("div", { staticClass: "highlight-holder" }, [t.ready ? s(t.tagOrDiv("splide"), { tag: "component", attrs: { options: t.showCaroussel ? t.getCarousselOptions() : null } }, t._l(t.items, function(a, r) {
    return s(t.tagOrDiv("splide-slide"), { key: r, tag: "component", staticClass: "highlight-container" }, [a.text !== "" ? s("div", { staticClass: "highlight-container-flexible" }, [s("svg", { key: a.icon, staticClass: "highlight-icon", attrs: { "data-src": `${t.baseIconUrl}/${a.icon}`, fill: t.iconColor, width: "46", height: "46" } }), s("span", { staticClass: "highlight-text", style: `color: ${t.textColor}`, domProps: { innerHTML: t._s(a.text) } })]) : t._e()]);
  }), 1) : t._e()], 1)]);
}, y = [], O = /* @__PURE__ */ v(
  m,
  w,
  y,
  !1,
  null,
  null,
  null,
  null
);
const $ = O.exports;
function h(i) {
  h.installed || (h.installed = !0, i.component("Highlight", $));
}
const b = {
  install: h
};
let l = null;
typeof window < "u" ? l = window.Vue : typeof global < "u" && (l = global.Vue);
l && l.use(b);
export {
  $ as default
};
