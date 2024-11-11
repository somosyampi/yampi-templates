import { mapGetters as n } from "http://rocket.test/dist/vendor/vuex.js";
function u(o, t, e, a, f, z, _, y) {
  var s = typeof o == "function" ? o.options : o;
  return t && (s.render = t, s.staticRenderFns = e, s._compiled = !0), {
    exports: o,
    options: s
  };
}
const d = {
  name: "BuyTogetherCustomization",
  props: {
    error: {
      type: Boolean,
      default: !1
    }
  },
  data() {
    return {
      customizationError: !1,
      screenWidth: window.innerWidth
    };
  },
  computed: {
    ...n("buyTogether", ["productsForCustomization", "customizedProducts"]),
    ...n("theme", ["themeStyle"]),
    productsUserAlreadyCustomized() {
      return Object.values(this.customizedProducts).filter((o) => o.isPersonalized).length;
    },
    shouldChangeMargin() {
      return !(this.themeStyle.fonts_texts_size === 14 && this.themeStyle.fonts_texts_family.match(/rubik/gi) || this.productsUserAlreadyCustomized > 0 || this.screenWidth < 700);
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
var c = function() {
  var t = this, e = t._self._c;
  return e("div", [e("div", { staticClass: "products-customization", class: { error: t.customizationError }, on: { click: function(a) {
    return t.$emit("click");
  } } }, [t.productsForCustomization.length && !Object.keys(t.customizedProducts).length ? e("div", [e("p", { staticClass: "mt-12 mb-7" }, [t._v(" Você tem "), e("span", [t._v(t._s(t.productsForCustomization.length))]), t._v(" " + t._s(t.$tc("common.product", t.productsForCustomization.length)) + " "), e("br"), t._v(" para personalizar ")]), e("p", { staticClass: "helper-text" }, [t._v(" Personalizar ")])]) : e("div", [e("p", { class: {
    "none-products": t.productsUserAlreadyCustomized === 0,
    "already-customized-products": t.productsUserAlreadyCustomized > 0,
    "mt-12": t.shouldChangeMargin
  }, domProps: { innerHTML: t._s(t.$tc(
    "buy-together-customization.product-customization",
    t.productsUserAlreadyCustomized
  )) } }), e("p", { staticClass: "helper-text" }, [t._v(" Editar ")])])]), e("ModalBuyTogetherCustomization", { ref: "ModalBuyTogetherCustomization", on: { save: t.handleSave } })], 1);
}, l = [], m = /* @__PURE__ */ u(
  d,
  c,
  l
);
const h = m.exports;
function r(o) {
  r.installed || (r.installed = !0, o.component("BuyTogetherCustomization", h));
}
const p = {
  install: r
};
let i = null;
typeof window < "u" ? i = window.Vue : typeof global < "u" && (i = global.Vue);
i && i.use(p);
export {
  h as default
};
