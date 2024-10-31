import l from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/lodash.js";
import u from "s3.amazonaws.com/codigo-aberto-sandbox-assets/rocket/assets/rocket-preview/components/components/product/BaseCustomization.js";
function c(e, t, s, a, o, v, C, z) {
  var i = typeof e == "function" ? e.options : e;
  return t && (i.render = t, i.staticRenderFns = s, i._compiled = !0), {
    exports: e,
    options: i
  };
}
const d = {
  name: "CustomizationContent",
  extends: u,
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
    optionalCustomization() {
      return this.sku.customizations.data.filter((e) => !e.required);
    }
  },
  watch: {
    values: {
      deep: !0,
      handler(e) {
        this.skuCustomized = !!Object.values(e).filter((t) => !!t.length).length;
      }
    }
  },
  methods: {
    updateAllCustomizations(e) {
      this.sku.customizations.data.forEach((t) => {
        this.setCustomizationValue(t, e, !1);
      });
    },
    handlePickedOption(e) {
      this.showContent = e, e ? this.updateAllCustomizations("") : this.updateAllCustomizations("");
    },
    hasErrorInCustomizations() {
      this.customizations.forEach((e) => {
        this.checkValues(e, this.values);
      });
    },
    getInvalidCustomizations() {
      if (this.customizations.length === 0)
        return;
      const e = this.customizations.filter((t) => l.isEmpty(this.values[t.id]));
      if (!(this.sku.allow_sell_without_customization && e.length === this.customizations.length && !this.showContent) && !e.every((t) => !t.required))
        return e.filter((t) => t.required);
    }
  }
};
var p = function() {
  var t = this, s = t._self._c;
  return s("div", { staticClass: "customization-content" }, [t.sku.allow_sell_without_customization ? s("custom-radio-group", { attrs: { options: [
    {
      key: 1,
      value: !1,
      text: "Não quero personalizar"
    },
    {
      key: 2,
      value: !0,
      text: "Quero personalizar"
    }
  ], "initial-value": !1, value: t.showContent }, on: { pick: t.handlePickedOption }, scopedSlots: t._u([{ key: "title", fn: function() {
    return [s("div", { staticClass: "radio-optional-customization" }, [t._v(" A personalização desse produto é "), s("b", [t._v("opcional")])])];
  }, proxy: !0 }, { key: "subtitle", fn: function() {
    return [t._v(" O que deseja fazer? ")];
  }, proxy: !0 }], null, !1, 142788896) }) : t._e(), t.showContent || !t.sku.allow_sell_without_customization ? s("div", { staticClass: "input-customization", attrs: { role: "form", "aria-labelledby": "customization-label" } }, [t._l(t.sku.customizations.data, function(a) {
    return s("div", { key: a.id }, [s("div", { staticClass: "input-customization-title", class: { "-optional": !a.required }, attrs: { id: "customization-label" } }, [t._v(" " + t._s(a.name) + " ")]), a.type === "input" ? s("input", { directives: [{ name: "mask", rawName: "v-mask", value: t.getMask(a), expression: "getMask(customization)" }], class: {
      error: t.hasError(a.id)
    }, attrs: { type: "text", placeholder: "Digite aqui..." }, domProps: { value: t.values[a.id] }, on: { input: function(o) {
      return t.setCustomizationValue(a, o.target.value, !0);
    }, change: function(o) {
      return t.checkValues(a, t.values);
    } } }) : s("custom-select", { class: {
      error: t.hasError(a.id)
    }, attrs: { value: t.values[a.id] }, on: { change: function(o) {
      return t.setCustomizationValue(a, o, !0);
    } } }, [s("option", { attrs: { value: "" } }, [t._v(" Selecionar... ")]), t._l(a.values, function(o) {
      return s("option", { key: o, domProps: { value: o, textContent: t._s(o) } });
    })], 2), t.hasError(a.id) ? s("p", { staticClass: "error-message", attrs: { role: "alert" } }, [t._v(" " + t._s(t.errors[a.id]) + " ")]) : t._e(), s("div", { staticClass: "row-spec" }, [s("p", { staticClass: "customization-spec" }, [a.type === "input" ? s("span", [t._v(" Máximo de " + t._s(a.max_chars) + " caracteres ")]) : t._e()]), a.price > 0 ? s("p", { staticClass: "customization-spec__value" }, [t._v(" + " + t._s(t._f("formatMoney")(a.price)) + " ")]) : t._e()])], 1);
  }), s("div", { staticClass: "row-total" }, [s("p", { staticClass: "customization-total" }, [t._v(" Valor total da personalização: ")]), s("p", { staticClass: "customization-total" }, [t._v(" " + t._s(t._f("formatMoney")(t.priceSum)) + " ")])])], 2) : t._e()], 1);
}, f = [], _ = /* @__PURE__ */ c(
  d,
  p,
  f
);
const m = _.exports;
function r(e) {
  r.installed || (r.installed = !0, e.component("CustomizationContent", m));
}
const h = {
  install: r
};
let n = null;
typeof window < "u" ? n = window.Vue : typeof global < "u" && (n = global.Vue);
n && n.use(h);
export {
  m as default
};
