import a from "https://s3.amazonaws.com/codigo-aberto-sandbox-assets/yampi-templates-sandbox/rocket-assets/components/product/BaseInstallments.js";
import o from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/vue-debounce.js";
import r from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/lodash.js";
function m(t, e, n, _, I, v, g, w) {
  var s = typeof t == "function" ? t.options : t;
  return e && (s.render = e, s.staticRenderFns = n, s._compiled = !0), {
    exports: t,
    options: s
  };
}
const d = {
  name: "InstallmentsText",
  extends: a,
  props: {
    price: {
      type: Number,
      default: null
    }
  },
  computed: {
    isSku() {
      return !this.product.id && !r.isNil(this.validSku);
    }
  },
  mounted() {
    this.validProduct && this.showAllInstallments && this.validProduct.has_variations && this.$watch("validSku", () => this.loadInstallments()), this.isInViewport(this.$refs.installmentText) || !this.installments.installments ? this.loadInstallments() : this.lazyLoadInstallment();
  },
  methods: {
    async loadInstallments(t) {
      try {
        this.installments = await this.handleInstallments(t);
      } catch (e) {
        console.error(e);
      } finally {
        this.loading = !1;
      }
    },
    lazyLoadInstallment() {
      document.addEventListener(
        "scroll",
        o(() => {
          !this.lazyLoaded && this.isInViewport(this.$refs.installmentText) && (this.lazyLoaded = !0, this.loadInstallments());
        }, 40),
        { passive: !0 }
      );
    },
    formattedInstallmentText() {
      if (!this.installments.installments || !this.installments.installments.length)
        return "_";
      const t = this.installments.installments[this.installments.installments.length - 1], e = t.installment_value_formated || this.$formatMoney(t.installment_value);
      let n = `${t.installment}x de <span class="price">${e}</span>`;
      return t.text.includes("sem juros") && (n += ' <span class="-free-tax">sem juros</span>'), n;
    },
    isInViewport(t) {
      if (!t)
        return !0;
      const e = t.getBoundingClientRect(), n = (window.innerHeight || document.documentElement.clientHeight) + 30;
      return e.top >= 0 && e.bottom <= n;
    }
  }
};
var u = function() {
  var e = this, n = e._self._c;
  return n("div", { staticClass: "installment-text", class: { "-loading": e.loading }, domProps: { innerHTML: e._s(e.formattedInstallmentText()) } });
}, c = [], f = /* @__PURE__ */ m(
  d,
  u,
  c
);
const h = f.exports;
function i(t) {
  i.installed || (i.installed = !0, t.component("InstallmentsText", h));
}
const p = {
  install: i
};
let l = null;
typeof window < "u" ? l = window.Vue : typeof global < "u" && (l = global.Vue);
l && l.use(p);
export {
  h as default
};
