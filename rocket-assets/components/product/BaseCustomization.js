import n from "lodash/get";
import a from "lodash/isEmpty";
import l from "lodash/times";
import m from "lodash/constant";
import h from "../vendor/mixins/errors.js";
function d(t, i, e, s, z, v, w, C) {
  var u = typeof t == "function" ? t.options : t;
  return {
    exports: t,
    options: u
  };
}
const c = {
  name: "BaseCustomization",
  mixins: [h],
  data: () => ({
    values: {},
    priceSum: 0,
    customization: {},
    showContent: !1
  }),
  computed: {
    allOptional() {
      return this.customizations.every(
        (t) => !t.required
      );
    },
    customizations() {
      return n(this.sku, "customizations.data", []);
    },
    hasCustomizations() {
      return !a(this.customizations);
    }
  },
  watch: {
    values: {
      deep: !0,
      handler() {
        this.calculateSum(this.customizations), this.$emit("change", this.values);
      }
    },
    sku: {
      immediate: !0,
      handler() {
        this.showContent = !n(
          this.sku,
          "allow_sell_without_customization",
          !0
        );
      }
    }
  },
  methods: {
    getMask(t) {
      const i = {
        letters: /[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ.!@#$%^&*()_\-?"{} ]/,
        numbers: /[0-9 ]/,
        all: /[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ.!@#$%^&*()_\-?"{}0-9 ]/
      };
      return l(
        t.max_chars,
        m(i[t.allowed_values])
      );
    },
    calculateSum(t) {
      this.priceSum = t.reduce((i, e) => {
        let s = i;
        return this.values[e.id] && (s += e.price), s;
      }, 0);
    },
    setCustomizationValue(t, i, e = !1) {
      this.$set(this.values, t.id, i), e && this.checkValues(t, this.values);
    },
    checkValues(t = void 0, i) {
      t ? this.setError(t.id, "") : this.clearErrors();
      const e = this.getInvalidCustomizations(i);
      return a(e) ? !0 : (e.forEach((s) => {
        (!t || n(t, "id") === s.id) && this.setError(s.id, "Campo obrigatório");
      }), !1);
    },
    getInvalidCustomizations(t) {
      if (this.customizations.length === 0)
        return [];
      const i = this.customizations.filter(
        (e) => a(t[e.id])
      );
      return this.sku.allow_sell_without_customization && i.length === this.customizations.length && !this.showContent ? [] : i.every(
        (e) => !e.required
      ) ? [] : i.filter(
        (e) => e.required
      );
    }
  }
};
var f = /* @__PURE__ */ d(
  c
);
const p = f.exports;
function r(t) {
  r.installed || (r.installed = !0, t.component("BaseCustomization", p));
}
const _ = {
  install: r
};
let o = null;
typeof window < "u" ? o = window.Vue : typeof global < "u" && (o = global.Vue);
o && o.use(_);
export {
  p as default
};
