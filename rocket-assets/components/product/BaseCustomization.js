import s from "https://s3.amazonaws.com/codigo-aberto-sandbox-assets/rocket/assets/rocket-preview/vendor/lodash.js";
import r from "https://s3.amazonaws.com/codigo-aberto-sandbox-assets/rocket/assets/rocket-preview/vendor/mixins/errors.js";
function l(t, i, e, n, f, p, z, _) {
  var u = typeof t == "function" ? t.options : t;
  return {
    exports: t,
    options: u
  };
}
const m = {
  name: "BaseCustomization",
  mixins: [r],
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
      return s.get(this.sku, "customizations.data", []);
    },
    hasCustomizations() {
      return !s.isEmpty(this.customizations);
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
        this.showContent = !s.get(
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
      return s.times(
        t.max_chars,
        s.constant(i[t.allowed_values])
      );
    },
    calculateSum(t) {
      this.priceSum = t.reduce((i, e) => {
        let n = i;
        return this.values[e.id] && (n += e.price), n;
      }, 0);
    },
    setCustomizationValue(t, i, e = !1) {
      this.$set(this.values, t.id, i), e && this.checkValues(t, this.values);
    },
    checkValues(t = void 0, i) {
      t ? this.setError(t.id, "") : this.clearErrors();
      const e = this.getInvalidCustomizations(i);
      return s.isEmpty(e) ? !0 : (e.forEach((n) => {
        (!t || s.get(t, "id") === n.id) && this.setError(n.id, "Campo obrigatório");
      }), !1);
    },
    getInvalidCustomizations(t) {
      if (this.customizations.length === 0)
        return [];
      const i = this.customizations.filter(
        (e) => s.isEmpty(t[e.id])
      );
      return this.sku.allow_sell_without_customization && i.length === this.customizations.length && !this.showContent ? [] : i.every(
        (e) => !e.required
      ) ? [] : i.filter(
        (e) => e.required
      );
    }
  }
};
var h = /* @__PURE__ */ l(
  m
);
const d = h.exports;
function a(t) {
  a.installed || (a.installed = !0, t.component("BaseCustomization", d));
}
const c = {
  install: a
};
let o = null;
typeof window < "u" ? o = window.Vue : typeof global < "u" && (o = global.Vue);
o && o.use(c);
export {
  d as default
};
