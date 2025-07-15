import l from "https://codigo-aberto-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/lodash.js";
import { smoothScroll as C } from "https://codigo-aberto-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/mixins/helpers.js";
import w from "https://codigo-aberto-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/mixins/errors.js";
import g from "https://codigo-aberto-production-assets.yampi.io/yampi-templates-main/rocket-assets/components/product/customization/BaseCustomization.js";
function z(s, t, e, i, o, d, m, f) {
  var r = typeof s == "function" ? s.options : s;
  t && (r.render = t, r.staticRenderFns = e, r._compiled = !0), i && (r.functional = !0), d && (r._scopeId = "data-v-" + d);
  var n;
  if (m ? (n = function(a) {
    a = a || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !a && typeof __VUE_SSR_CONTEXT__ < "u" && (a = __VUE_SSR_CONTEXT__), o && o.call(this, a), a && a._registeredComponents && a._registeredComponents.add(m);
  }, r._ssrRegister = n) : o && (n = f ? function() {
    o.call(
      this,
      (r.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : o), n)
    if (r.functional) {
      r._injectStyles = n;
      var p = r.render;
      r.render = function(v, h) {
        return n.call(h), p(v, h);
      };
    } else {
      var _ = r.beforeCreate;
      r.beforeCreate = _ ? [].concat(_, n) : [n];
    }
  return {
    exports: s,
    options: r
  };
}
const k = {
  name: "SkuCustomizations",
  extends: g,
  mixins: [w],
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
      return l.get(this.sku, "customizations.data", []);
    },
    hasCustomizations() {
      return !l.isEmpty(this.customizations);
    }
  },
  watch: {
    sku: {
      immediate: !0,
      handler() {
        this.showContent = !l.get(this.sku, "allow_sell_without_customization", !0);
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
    smoothScroll: C,
    getMask(s) {
      const t = {
        letters: /[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ.!@#$%^&*()_\-?"{} ]/,
        numbers: /[0-9 ]/,
        all: /[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ.!@#$%^&*()_\-?"{}0-9 ]/
      };
      return l.times(s.max_chars, l.constant(t[s.allowed_values]));
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
      this.$set(this.values, s.id, t);
    },
    checkValues(s = void 0) {
      s ? this.setError(s.id, "") : this.clearErrors();
      const t = this.getInvalidCustomizations();
      return l.isEmpty(t) ? !0 : (t.forEach((e) => {
        this.setError(e.id, "Campo obrigat\xF3rio");
      }), !1);
    },
    getInvalidCustomizations() {
      if (this.customizations.length === 0 || l.get(this.sku, "allow_sell_without_customization", !0))
        return;
      const s = this.customizations.filter((t) => l.isEmpty(this.values[t.id]));
      if (!s.every((t) => !t.required))
        return s.filter((t) => t.required);
    },
    isMandatoryCustomization(s, t) {
      return t ? s.required : !0;
    }
  }
};
var y = function() {
  var t = this, e = t._self._c;
  return t.hasCustomizations ? e("div", { staticClass: "text-center" }, [t.sku.allow_sell_without_customization ? e("div", { staticClass: "-all-optional", on: { click: t.toggleShowContent } }, [e("span", { staticClass: "link-alike" }, [t._v("Personalize o Produto")]), e("SelectArrow", { staticClass: "icon icon-select-arrow", class: { "-up": t.showContent } })], 1) : t._e(), t.showContent ? e("div", { staticClass: "main-product-customization text-left" }, [e("div", { staticClass: "-title" }, [t._v(" Personalizar produto ")]), t._l(t.customizations, function(i) {
    return e("div", { key: i.id, staticClass: "customization" }, [e("label", { attrs: { for: `customization-${i.id}` } }, [t._v(" " + t._s(i.name) + " "), t.isMandatoryCustomization(i, t.sku.allow_sell_without_customization) ? e("span", { staticClass: "required" }) : t._e()]), i.type === "input" ? e("input", { directives: [{ name: "mask", rawName: "v-mask", value: t.getMask(i), expression: "getMask(customization)" }], ref: "customizationField", refInFor: !0, class: { error: t.hasError(i.id) }, attrs: { type: "text", placeholder: "Digite aqui...", maxlength: i.max_chars }, domProps: { value: t.values[i.id] }, on: { input: function(o) {
      return t.setCustomizationValue(i, o.target.value, !0);
    } } }) : e("CustomSelect", { ref: "customizationField", refInFor: !0, class: { error: t.hasError(i.id) }, attrs: { value: "" }, on: { change: function(o) {
      return t.setCustomizationValue(i, o, !0);
    } } }, [e("option", { attrs: { value: "" } }, [t._v(" Selecionar... ")]), t._l(i.values, function(o) {
      return e("option", { key: o, domProps: { value: o, textContent: t._s(o) } });
    })], 2), e("ErrorText", { attrs: { text: t.getError(i.id) } }), e("div", { staticClass: "flex -between" }, [e("div", { staticClass: "-max-chars" }, [i.type === "input" ? [t._v(" M\xE1ximo de " + t._s(i.max_chars) + " caracteres ")] : t._e()], 2), i.price > 0 ? e("div", { staticClass: "-customization-price" }, [t._v(" + " + t._s(t._f("formatMoney")(i.price)) + " ")]) : t._e()])], 1);
  }), t.priceSum > 0 ? e("div", { staticClass: "total-sum flex -between" }, [e("div", { staticClass: "-text" }, [t._v(" Valor total da personaliza\xE7\xE3o: ")]), e("div", [t._v(t._s(t._f("formatMoney")(t.priceSum)))])]) : t._e()], 2) : t._e()]) : t._e();
}, S = [], E = /* @__PURE__ */ z(
  k,
  y,
  S,
  !1,
  null,
  null,
  null,
  null
);
const b = E.exports;
function c(s) {
  c.installed || (c.installed = !0, s.component("SkuCustomizations", b));
}
const V = {
  install: c
};
let u = null;
typeof window < "u" ? u = window.Vue : typeof global < "u" && (u = global.Vue);
u && u.use(V);
export {
  b as default
};
