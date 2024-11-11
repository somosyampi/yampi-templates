import a from "http://rocket.test/dist/vendor/lodash.js";
import { mapGetters as l, mapActions as r } from "http://rocket.test/dist/vendor/vuex.js";
import { smoothScroll as d } from "http://rocket.test/dist/vendor/mixins/helpers.js";
function m(s, t, e, o, C, g, z, v) {
  var i = typeof s == "function" ? s.options : s;
  return t && (i.render = t, i.staticRenderFns = e, i._compiled = !0), {
    exports: s,
    options: i
  };
}
const c = {
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
    ...l("buyTogether", ["customizedProducts"]),
    skuImageUrl() {
      return this.sku.images.data.length ? this.sku.images.data[0].url : "";
    }
  },
  watch: {
    showContent(s) {
      const t = document.getElementsByClassName("buy-together-modal-form");
      s && this.smoothScroll(t[0], 0, this.$el.offsetHeight);
    }
  },
  mounted() {
    !this.sku.allow_sell_without_customization && !this.customizedProducts[this.sku.id] && this.$refs.customizationContent.updateAllCustomizations(""), this.customizedProducts[this.sku.id] && (this.showContent = this.customizedProducts[this.sku.id].isPersonalized, this.values = a.omit(this.customizedProducts[this.sku.id], ["isPersonalized"]));
  },
  methods: {
    ...r("buyTogether", ["addSkuCustomization", "removeCustomization"]),
    smoothScroll: d
  }
};
var f = function() {
  var t = this, e = t._self._c;
  return t.sku ? e("div", { staticClass: "buy-together-content" }, [e("div", { staticClass: "product-description", attrs: { "aria-labelledby": "sku-title" } }, [e("img", { attrs: { src: t.skuImageUrl } }), e("div", { staticClass: "text" }, [e("div", { staticClass: "sku-title", attrs: { id: "sku-title" } }, [t._v(" " + t._s(t.sku.title) + " ")]), t.sku.variations.length ? e("ul", t._l(t.sku.variations, function(o) {
    return e("li", { key: o.name }, [t._v(" " + t._s(o.name) + ": " + t._s(o.value) + " ")]);
  }), 0) : t._e()])]), e("CustomizationContent", { ref: "customizationContent", attrs: { sku: t.sku } })], 1) : t._e();
}, h = [], _ = /* @__PURE__ */ m(
  c,
  f,
  h
);
const p = _.exports;
function u(s) {
  u.installed || (u.installed = !0, s.component("BuyTogetherCustomizationContent", p));
}
const k = {
  install: u
};
let n = null;
typeof window < "u" ? n = window.Vue : typeof global < "u" && (n = global.Vue);
n && n.use(k);
export {
  p as default
};
