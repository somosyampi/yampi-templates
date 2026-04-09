import { mapGetters as z } from "https://openstore-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/vuex.js";
function C(r, t, o, n, u, c, l, f) {
  var e = typeof r == "function" ? r.options : r;
  t && (e.render = t, e.staticRenderFns = o, e._compiled = !0), n && (e.functional = !0), c && (e._scopeId = "data-v-" + c);
  var s;
  if (l ? (s = function(i) {
    i = i || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !i && typeof __VUE_SSR_CONTEXT__ < "u" && (i = __VUE_SSR_CONTEXT__), u && u.call(this, i), i && i._registeredComponents && i._registeredComponents.add(l);
  }, e._ssrRegister = s) : u && (s = f ? function() {
    u.call(
      this,
      (e.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : u), s)
    if (e.functional) {
      e._injectStyles = s;
      var p = e.render;
      e.render = function(_, h) {
        return s.call(h), p(_, h);
      };
    } else {
      var m = e.beforeCreate;
      e.beforeCreate = m ? [].concat(m, s) : [s];
    }
  return {
    exports: r,
    options: e
  };
}
const v = {
  name: "BuyTogetherCustomization",
  props: {
    error: {
      type: Boolean,
      default: !1
    },
    productsForCustomization: {
      type: Array,
      required: !0
    },
    customizedProducts: {
      type: Object,
      required: !0
    },
    comboId: {
      type: [String, Number],
      required: !0
    }
  },
  data() {
    return {
      customizationError: !1,
      screenWidth: window.innerWidth
    };
  },
  computed: {
    ...z("theme", ["themeStyle"]),
    productsUserAlreadyCustomized() {
      return Object.values(this.customizedProducts).filter((r) => r.isPersonalized).length;
    },
    shouldChangeMargin() {
      return !(this.themeStyle.fonts_texts_size === 14 && !!this.themeStyle.fonts_texts_family.match(/rubik/gi) || this.productsUserAlreadyCustomized > 0 || this.screenWidth < 700);
    }
  },
  watch: {
    customizedProducts() {
      this.customizationError && this.checkError();
    }
  },
  mounted() {
    window.addEventListener("resize", () => {
      this.screenWidth = window.innerWidth;
    });
  },
  methods: {
    handleCustomization() {
      this.$refs.ModalBuyTogetherCustomization.handleModal();
    },
    checkError() {
      this.customizationError = this.productsForCustomization.length !== Object.keys(this.customizedProducts).length;
    },
    handleSave() {
      this.$emit("save");
    }
  }
};
var g = function() {
  var t = this, o = t._self._c;
  return o("div", [o("div", { staticClass: "products-customization", class: { error: t.customizationError }, on: { click: function(n) {
    return t.$emit("click");
  } } }, [t.productsForCustomization.length && Object.keys(t.customizedProducts).length < t.productsForCustomization.length ? o("div", [o("p", { staticClass: "mt-12 mb-7" }, [t._v(" Voc\xEA tem "), o("span", [t._v(t._s(t.productsForCustomization.length))]), t._v(" " + t._s(t.$tc("common.product", t.productsForCustomization.length)) + " "), o("br"), t._v(" para personalizar ")]), o("p", { staticClass: "helper-text" }, [t._v(" Personalizar ")])]) : o("div", [o("p", { class: {
    "none-products": t.productsUserAlreadyCustomized === 0,
    "already-customized-products": t.productsUserAlreadyCustomized > 0,
    "mt-12": t.shouldChangeMargin
  }, domProps: { innerHTML: t._s(t.$tc(
    "buy-together-customization.product-customization",
    t.productsUserAlreadyCustomized
  )) } }), o("p", { staticClass: "helper-text" }, [t._v(" Editar ")])])]), o("ModalBuyTogetherCustomization", { ref: "ModalBuyTogetherCustomization", attrs: { "products-for-customization": t.productsForCustomization, "customized-products": t.customizedProducts, "combo-id": t.comboId }, on: { save: t.handleSave, addSkuCustomization: function(n) {
    return t.$emit("addSkuCustomization", n);
  }, resetCustomizations: function(n) {
    return t.$emit("resetCustomizations");
  } } })], 1);
}, y = [], b = /* @__PURE__ */ C(
  v,
  g,
  y,
  !1,
  null,
  null,
  null,
  null
);
const $ = b.exports;
function d(r) {
  d.installed || (d.installed = !0, r.component("BuyTogetherCustomization", $));
}
const w = {
  install: d
};
let a = null;
typeof window < "u" ? a = window.Vue : typeof global < "u" && (a = global.Vue);
a && a.use(w);
export {
  $ as default
};
