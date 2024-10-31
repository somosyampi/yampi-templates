import a from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/lodash.js";
import u from "https://s3.amazonaws.com/codigo-aberto-sandbox-assets/yampi-templates-sandbox/rocket-assets/components/product/BaseCustomization.js";
import { smoothScroll as c } from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/mixins/helpers.js";
import d from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/mixins/errors.js";
function m(s, t, e, i, o, w, g, k) {
  var r = typeof s == "function" ? s.options : s;
  return t && (r.render = t, r.staticRenderFns = e, r._compiled = !0), {
    exports: s,
    options: r
  };
}
const h = {
  name: "SkuCustomizations",
  extends: u,
  mixins: [d],
  props: {
    sku: {
      type: Object,
      required: !0
    }
  },
  data: () => ({
    showContent: !1,
    values: {},
    priceSum: 0
  }),
  computed: {
    allOptional() {
      return this.customizations.every((s) => !s.required);
    },
    customizations() {
      return a.get(this.sku, "customizations.data", []);
    },
    hasCustomizations() {
      return !a.isEmpty(this.customizations);
    }
  },
  watch: {
    sku: {
      immediate: !0,
      handler() {
        this.showContent = !a.get(this.sku, "allow_sell_without_customization", !0);
      }
    },
    values: {
      deep: !0,
      handler() {
        this.calculateSum(this.customizations), this.$emit("change", this.values);
      }
    }
  },
  mounted() {
    this.bootValues();
  },
  methods: {
    smoothScroll: c,
    getMask(s) {
      const t = {
        letters: /[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ.!@#$%^&*()_\-?"{} ]/,
        numbers: /[0-9 ]/,
        all: /[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ.!@#$%^&*()_\-?"{}0-9 ]/
      };
      return a.times(s.max_chars, a.constant(t[s.allowed_values]));
    },
    calculateSum() {
      this.priceSum = this.customizations.reduce((s, t) => {
        let e = s;
        return this.values[t.id] && (e += t.price), e;
      }, 0);
    },
    toggleShowContent() {
      this.showContent = !this.showContent;
    },
    bootValues() {
      this.customizations.forEach((s) => {
        this.setCustomizationValue(s, "");
      });
    },
    setCustomizationValue(s, t, e = !1) {
      this.$set(this.values, s.id, t), e && this.checkValues(s);
    },
    checkValues(s = void 0) {
      s ? this.setError(s.id, "") : this.clearErrors();
      const t = this.getInvalidCustomizations();
      return a.isEmpty(t) ? !0 : (t.forEach((e) => {
        this.setError(e.id, "Campo obrigatório");
      }), this.smoothScroll(document.body, 0, this.$el.offsetTop), !1);
    },
    getInvalidCustomizations() {
      if (this.customizations.length === 0 || a.get(this.sku, "allow_sell_without_customization", !0))
        return;
      const s = this.customizations.filter((t) => a.isEmpty(this.values[t.id]));
      if (!s.every((t) => !t.required))
        return s.filter((t) => t.required);
    },
    isMandatoryCustomization(s, t) {
      return t ? s.required : !0;
    }
  }
};
var f = function() {
  var t = this, e = t._self._c;
  return t.hasCustomizations ? e("div", { staticClass: "text-center" }, [t.sku.allow_sell_without_customization ? e("div", { staticClass: "-all-optional", on: { click: t.toggleShowContent } }, [e("span", { staticClass: "link-alike" }, [t._v("Personalize o Produto")]), e("SelectArrow", { staticClass: "icon icon-select-arrow", class: { "-up": t.showContent } })], 1) : t._e(), t.showContent ? e("div", { staticClass: "main-product-customization text-left" }, [e("div", { staticClass: "-title" }, [t._v(" Personalizar produto ")]), t._l(t.customizations, function(i) {
    return e("div", { key: i.id, staticClass: "customization" }, [e("label", { attrs: { for: `customization-${i.id}` } }, [t._v(" " + t._s(i.name) + " "), t.isMandatoryCustomization(i, t.sku.allow_sell_without_customization) ? e("span", { staticClass: "required" }, [t._v("*")]) : t._e()]), i.type === "input" ? e("input", { directives: [{ name: "mask", rawName: "v-mask", value: t.getMask(i), expression: "getMask(customization)" }], ref: "customizationField", refInFor: !0, class: { error: t.hasError(i.id) }, attrs: { type: "text", placeholder: "Digite aqui...", maxlength: i.max_chars }, domProps: { value: t.values[i.id] }, on: { input: function(o) {
      return t.setCustomizationValue(i, o.target.value, !0);
    }, change: function(o) {
      return t.checkValues(i, t.values);
    } } }) : e("custom-select", { ref: "customizationField", refInFor: !0, class: { error: t.hasError(i.id) }, attrs: { value: "" }, on: { change: function(o) {
      return t.setCustomizationValue(i, o, !0);
    } } }, [e("option", { attrs: { value: "" } }, [t._v(" Selecionar... ")]), t._l(i.values, function(o) {
      return e("option", { key: o, domProps: { value: o, textContent: t._s(o) } });
    })], 2), e("ErrorText", { attrs: { text: t.getError(i.id) } }), e("div", { staticClass: "flex -between" }, [e("div", { staticClass: "-max-chars" }, [i.type === "input" ? [t._v(" Máximo de " + t._s(i.max_chars) + " caracteres ")] : t._e()], 2), i.price > 0 ? e("div", { staticClass: "-customization-price" }, [t._v(" + " + t._s(t._f("formatMoney")(i.price)) + " ")]) : t._e()])], 1);
  }), t.priceSum > 0 ? e("div", { staticClass: "total-sum flex -between" }, [e("div", { staticClass: "-text" }, [t._v(" Valor total da personalização: ")]), e("div", [t._v(t._s(t._f("formatMoney")(t.priceSum)))])]) : t._e()], 2) : t._e()]) : t._e();
}, _ = [], p = /* @__PURE__ */ m(
  h,
  f,
  _
);
const v = p.exports;
function l(s) {
  l.installed || (l.installed = !0, s.component("SkuCustomizations", v));
}
const C = {
  install: l
};
let n = null;
typeof window < "u" ? n = window.Vue : typeof global < "u" && (n = global.Vue);
n && n.use(C);
export {
  v as default
};
