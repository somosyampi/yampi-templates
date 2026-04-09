import v from "https://openstore-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/vue-debounce.js";
import I from "https://openstore-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/lodash.js";
import { mapGetters as g } from "https://openstore-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/vuex.js";
import w from "https://openstore-production-assets.yampi.io/yampi-templates-main/rocket-assets/components/product/installments/BaseInstallments.js";
function C(t, n, s, f, a, d, m, c) {
  var e = typeof t == "function" ? t.options : t;
  n && (e.render = n, e.staticRenderFns = s, e._compiled = !0), f && (e.functional = !0), d && (e._scopeId = "data-v-" + d);
  var i;
  if (m ? (i = function(l) {
    l = l || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !l && typeof __VUE_SSR_CONTEXT__ < "u" && (l = __VUE_SSR_CONTEXT__), a && a.call(this, l), l && l._registeredComponents && l._registeredComponents.add(m);
  }, e._ssrRegister = i) : a && (i = c ? function() {
    a.call(
      this,
      (e.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : a), i)
    if (e.functional) {
      e._injectStyles = i;
      var p = e.render;
      e.render = function(_, h) {
        return i.call(h), p(_, h);
      };
    } else {
      var u = e.beforeCreate;
      e.beforeCreate = u ? [].concat(u, i) : [i];
    }
  return {
    exports: t,
    options: e
  };
}
const y = {
  name: "InstallmentsText",
  extends: w,
  props: {
    product: {
      type: Object,
      required: !0
    },
    productPrices: {
      type: Object,
      default: null
    }
  },
  computed: {
    ...g("merchant", [
      "storeModules",
      "defaultCard"
    ]),
    isSku() {
      return !this.product.id && !I.isNil(this.validSku);
    },
    installmentsData() {
      var t;
      return (t = this.productPrices) == null ? void 0 : t.installments_data;
    },
    shouldShowInstallments() {
      return !!this.installmentsData && !!this.defaultCard;
    },
    installmentText() {
      var n, s;
      return (s = (n = this.installmentsData) == null ? void 0 : n.installments) != null && s.length ? this.installmentsData.installments[this.installmentsData.installments.length - 1].text.replace("*", "").trim() : " ";
    }
  },
  mounted() {
    this.storeModules.new_search || (this.validProduct && this.showAllInstallments && this.validProduct.has_variations && this.$watch("validSku", () => this.loadInstallments()), this.isInViewport(this.$refs.installmentText) || !this.installments.installments ? this.loadInstallments() : this.lazyLoadInstallment());
  },
  methods: {
    async loadInstallments(t) {
      try {
        if (this.installmentsData || this.loading)
          return;
        this.installments = await this.handleInstallments(t);
      } catch (n) {
        console.error(n);
      } finally {
        this.loading = !1;
      }
    },
    lazyLoadInstallment() {
      document.addEventListener(
        "scroll",
        v(() => {
          !this.lazyLoaded && this.isInViewport(this.$refs.installmentText) && (this.lazyLoaded = !0, this.loadInstallments());
        }, 40),
        { passive: !0 }
      );
    },
    formattedInstallmentText() {
      if (!this.installments.installments || !this.installments.installments.length)
        return " ";
      const t = this.installments.installments[this.installments.installments.length - 1], n = t.installment_value_formated || this.$formatMoney(t.installment_value);
      let s = `${t.installment}x de <span class="price">${n}</span>`;
      return t.text.includes("sem juros") && (s += ' <span class="-free-tax">sem juros</span>'), s;
    },
    isInViewport(t) {
      if (!t)
        return !0;
      const n = t.getBoundingClientRect(), s = (window.innerHeight || document.documentElement.clientHeight) + 30;
      return n.top >= 0 && n.bottom <= s;
    }
  }
};
var T = function() {
  var n = this, s = n._self._c;
  return s("LazyVisibility", { staticClass: "installments-text" }, [n.shouldShowInstallments ? s("div", { staticClass: "installment-text", domProps: { innerHTML: n._s(n.installmentText) } }) : s("div", { staticClass: "installment-text", class: { "-loading": n.loading }, domProps: { innerHTML: n._s(n.formattedInstallmentText()) } })]);
}, $ = [], b = /* @__PURE__ */ C(
  y,
  T,
  $,
  !1,
  null,
  null,
  null,
  null
);
const x = b.exports;
function o(t) {
  o.installed || (o.installed = !0, t.component("InstallmentsText", x));
}
const V = {
  install: o
};
let r = null;
typeof window < "u" ? r = window.Vue : typeof global < "u" && (r = global.Vue);
r && r.use(V);
export {
  x as default
};
