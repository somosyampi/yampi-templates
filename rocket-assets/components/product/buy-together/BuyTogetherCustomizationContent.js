import C from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/lodash.js";
import { mapGetters as k, mapActions as v } from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/vuex.js";
import { smoothScroll as g } from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/mixins/helpers.js";
function z(o, t, s, u, a, d, m, h) {
  var e = typeof o == "function" ? o.options : o;
  t && (e.render = t, e.staticRenderFns = s, e._compiled = !0), u && (e.functional = !0), d && (e._scopeId = "data-v-" + d);
  var n;
  if (m ? (n = function(i) {
    i = i || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !i && typeof __VUE_SSR_CONTEXT__ < "u" && (i = __VUE_SSR_CONTEXT__), a && a.call(this, i), i && i._registeredComponents && i._registeredComponents.add(m);
  }, e._ssrRegister = n) : a && (n = h ? function() {
    a.call(
      this,
      (e.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : a), n)
    if (e.functional) {
      e._injectStyles = n;
      var _ = e.render;
      e.render = function(p, c) {
        return n.call(c), _(p, c);
      };
    } else {
      var f = e.beforeCreate;
      e.beforeCreate = f ? [].concat(f, n) : [n];
    }
  return {
    exports: o,
    options: e
  };
}
const b = {
  name: "BuyTogetherCustomizationContent",
  props: {
    sku: {
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    return {
      skuCustomized: !1
    };
  },
  computed: {
    ...k("buyTogether", ["customizedProducts"]),
    skuImageUrl() {
      return this.sku.images.data.length ? this.sku.images.data[0].url : "";
    }
  },
  watch: {
    showContent(o) {
      const t = document.getElementsByClassName("buy-together-modal-form");
      o && this.smoothScroll(t[0], 0, this.$el.offsetHeight);
    }
  },
  mounted() {
    !this.sku.allow_sell_without_customization && !this.customizedProducts[this.sku.id] && this.$refs.customizationContent.updateAllCustomizations(""), this.customizedProducts[this.sku.id] && (this.showContent = this.customizedProducts[this.sku.id].isPersonalized, this.values = C.omit(this.customizedProducts[this.sku.id], ["isPersonalized"]));
  },
  methods: {
    ...v("buyTogether", ["addSkuCustomization", "removeCustomization"]),
    smoothScroll: g
  }
};
var y = function() {
  var t = this, s = t._self._c;
  return t.sku ? s("div", { staticClass: "buy-together-content" }, [s("div", { staticClass: "product-description", attrs: { "aria-labelledby": "sku-title" } }, [s("img", { attrs: { src: t.skuImageUrl } }), s("div", { staticClass: "text" }, [s("div", { staticClass: "sku-title", attrs: { id: "sku-title" } }, [t._v(" " + t._s(t.sku.title) + " ")]), t.sku.variations.length ? s("ul", t._l(t.sku.variations, function(u) {
    return s("li", { key: u.name }, [t._v(" " + t._s(u.name) + ": " + t._s(u.value) + " ")]);
  }), 0) : t._e()])]), s("CustomizationContent", { ref: "customizationContent", attrs: { sku: t.sku } })], 1) : t._e();
}, w = [], T = /* @__PURE__ */ z(
  b,
  y,
  w,
  !1,
  null,
  null,
  null,
  null
);
const $ = T.exports;
function l(o) {
  l.installed || (l.installed = !0, o.component("BuyTogetherCustomizationContent", $));
}
const P = {
  install: l
};
let r = null;
typeof window < "u" ? r = window.Vue : typeof global < "u" && (r = global.Vue);
r && r.use(P);
export {
  $ as default
};
