import m from "https://codigo-aberto-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/lodash.js";
import C from "https://codigo-aberto-production-assets.yampi.io/yampi-templates-main/rocket-assets/components/product/customization/BaseCustomization.js";
function k(e, t, s, a, i, d, p, _) {
  var o = typeof e == "function" ? e.options : e;
  t && (o.render = t, o.staticRenderFns = s, o._compiled = !0), a && (o.functional = !0), d && (o._scopeId = "data-v-" + d);
  var r;
  if (p ? (r = function(n) {
    n = n || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !n && typeof __VUE_SSR_CONTEXT__ < "u" && (n = __VUE_SSR_CONTEXT__), i && i.call(this, n), n && n._registeredComponents && n._registeredComponents.add(p);
  }, o._ssrRegister = r) : i && (r = _ ? function() {
    i.call(
      this,
      (o.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : i), r)
    if (o.functional) {
      o._injectStyles = r;
      var h = o.render;
      o.render = function(v, f) {
        return r.call(f), h(v, f);
      };
    } else {
      var c = o.beforeCreate;
      o.beforeCreate = c ? [].concat(c, r) : [r];
    }
  return {
    exports: e,
    options: o
  };
}
const z = {
  name: "CustomizationContent",
  extends: C,
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
      const e = this.customizations.filter((t) => m.isEmpty(this.values[t.id]));
      if (!(this.sku.allow_sell_without_customization && e.length === this.customizations.length && !this.showContent) && !e.every((t) => !t.required))
        return e.filter((t) => t.required);
    }
  }
};
var y = function() {
  var t = this, s = t._self._c;
  return s("div", { staticClass: "customization-content" }, [t.sku.allow_sell_without_customization ? s("CustomRadioGroup", { attrs: { options: [
    {
      key: 1,
      value: !1,
      text: "N\xE3o quero personalizar"
    },
    {
      key: 2,
      value: !0,
      text: "Quero personalizar"
    }
  ], "initial-value": !1, value: t.showContent }, on: { pick: t.handlePickedOption }, scopedSlots: t._u([{ key: "title", fn: function() {
    return [s("div", { staticClass: "radio-optional-customization" }, [t._v(" A personaliza\xE7\xE3o desse produto \xE9 "), s("b", [t._v("opcional")])])];
  }, proxy: !0 }, { key: "subtitle", fn: function() {
    return [t._v(" O que deseja fazer? ")];
  }, proxy: !0 }], null, !1, 142788896) }) : t._e(), t.showContent || !t.sku.allow_sell_without_customization ? s("div", { staticClass: "input-customization", attrs: { role: "form", "aria-labelledby": "customization-label" } }, [t._l(t.sku.customizations.data, function(a) {
    return s("div", { key: a.id }, [s("div", { staticClass: "input-customization-title", class: { "-optional": !a.required }, attrs: { id: "customization-label" } }, [t._v(" " + t._s(a.name) + " ")]), a.type === "input" ? s("input", { directives: [{ name: "mask", rawName: "v-mask", value: t.getMask(a), expression: "getMask(customization)" }], class: {
      error: t.hasError(a.id)
    }, attrs: { type: "text", placeholder: "Digite aqui..." }, domProps: { value: t.values[a.id] }, on: { input: function(i) {
      return t.setCustomizationValue(a, i.target.value, !0);
    }, change: function(i) {
      return t.checkValues(a, t.values);
    } } }) : s("CustomSelect", { class: {
      error: t.hasError(a.id)
    }, attrs: { value: t.values[a.id] }, on: { change: function(i) {
      return t.setCustomizationValue(a, i, !0);
    } } }, [s("option", { attrs: { value: "" } }, [t._v(" Selecionar... ")]), t._l(a.values, function(i) {
      return s("option", { key: i, domProps: { value: i, textContent: t._s(i) } });
    })], 2), t.hasError(a.id) ? s("p", { staticClass: "error-message", attrs: { role: "alert" } }, [t._v(" " + t._s(t.errors[a.id]) + " ")]) : t._e(), s("div", { staticClass: "row-spec" }, [s("p", { staticClass: "customization-spec" }, [a.type === "input" ? s("span", [t._v(" M\xE1ximo de " + t._s(a.max_chars) + " caracteres ")]) : t._e()]), a.price > 0 ? s("p", { staticClass: "customization-spec__value" }, [t._v(" + " + t._s(t._f("formatMoney")(a.price)) + " ")]) : t._e()])], 1);
  }), s("div", { staticClass: "row-total" }, [s("p", { staticClass: "customization-total" }, [t._v(" Valor total da personaliza\xE7\xE3o: ")]), s("p", { staticClass: "customization-total" }, [t._v(" " + t._s(t._f("formatMoney")(t.priceSum)) + " ")])])], 2) : t._e()], 1);
}, w = [], g = /* @__PURE__ */ k(
  z,
  y,
  w,
  !1,
  null,
  null,
  null,
  null
);
const b = g.exports;
function u(e) {
  u.installed || (u.installed = !0, e.component("CustomizationContent", b));
}
const V = {
  install: u
};
let l = null;
typeof window < "u" ? l = window.Vue : typeof global < "u" && (l = global.Vue);
l && l.use(V);
export {
  b as default
};
