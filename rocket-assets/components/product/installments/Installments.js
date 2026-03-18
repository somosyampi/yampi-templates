import v from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/lodash.js";
import I from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/vue-debounce.js";
import w from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/components/product/installments/BaseInstallments.js";
function g(n, t, i, d, a, u, f, c) {
  var e = typeof n == "function" ? n.options : n;
  t && (e.render = t, e.staticRenderFns = i, e._compiled = !0), d && (e.functional = !0), u && (e._scopeId = "data-v-" + u);
  var s;
  if (f ? (s = function(l) {
    l = l || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !l && typeof __VUE_SSR_CONTEXT__ < "u" && (l = __VUE_SSR_CONTEXT__), a && a.call(this, l), l && l._registeredComponents && l._registeredComponents.add(f);
  }, e._ssrRegister = s) : a && (s = c ? function() {
    a.call(
      this,
      (e.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : a), s)
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
    exports: n,
    options: e
  };
}
const y = {
  name: "Installments",
  extends: w,
  props: {
    loaderHeight: {
      type: Number,
      default: null
    },
    defaultInstallments: {
      type: Object,
      default: void 0
    },
    showAllInstallments: {
      type: Boolean,
      default: !1
    },
    productPrices: {
      type: Object,
      default: null
    }
  },
  data: () => ({
    lazyLoaded: !1
  }),
  computed: {
    isSku() {
      return !this.product.id && !v.isNil(this.validSku);
    }
  },
  mounted() {
    this.validProduct && this.showAllInstallments && this.validProduct.has_variations && this.$watch("validSku", () => this.loadInstallments()), this.isInViewport(this.$refs.installmentText) || !this.installments.installments ? this.loadInstallments() : this.lazyLoadInstallment();
  },
  methods: {
    async loadInstallments(n) {
      try {
        this.installments = await this.handleInstallments(n);
      } catch (t) {
        console.error(t);
      } finally {
        this.loading = !1;
      }
    },
    showInstallmentsModal() {
      this.$refs.modalInstallments.showModal();
    },
    lazyLoadInstallment() {
      document.addEventListener(
        "scroll",
        I(() => {
          !this.lazyLoaded && this.isInViewport(this.$refs.installmentText) && (this.lazyLoaded = !0, this.loadInstallments());
        }, 40),
        { passive: !0 }
      );
    },
    isInViewport(n) {
      if (!n)
        return !0;
      const t = n.getBoundingClientRect(), i = (window.innerHeight || document.documentElement.clientHeight) + 30;
      return t.top >= 0 && t.bottom <= i;
    }
  }
};
var C = function() {
  var t = this, i = t._self._c;
  return i("div", [t.installments.installments ? [t.showAllInstallments ? [i("div", { staticClass: "show-installments link-alike", class: { "-loading": t.loading }, on: { click: function(d) {
    return t.showInstallmentsModal();
  } } }, [t._v(" Ver op\xE7\xF5es de parcelamento ")])] : t._e()] : t._e(), t.showAllInstallments ? i("ModalInstallments", { ref: "modalInstallments", attrs: { product: t.validSku, "product-prices": t.productPrices } }) : t._e()], 2);
}, $ = [], b = /* @__PURE__ */ g(
  y,
  C,
  $,
  !1,
  null,
  null,
  null,
  null
);
const V = b.exports;
function r(n) {
  r.installed || (r.installed = !0, n.component("Installments", V));
}
const k = {
  install: r
};
let o = null;
typeof window < "u" ? o = window.Vue : typeof global < "u" && (o = global.Vue);
o && o.use(k);
export {
  V as default
};
