import o from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/lodash.js";
import d from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/vue-debounce.js";
import r from "https://s3.amazonaws.com/codigo-aberto-sandbox-assets/yampi-templates-main/rocket-assets/components/product/BaseInstallments.js";
function m(e, t, n, i, _, w, v, y) {
  var l = typeof e == "function" ? e.options : e;
  return t && (l.render = t, l.staticRenderFns = n, l._compiled = !0), {
    exports: e,
    options: l
  };
}
const u = {
  name: "Installments",
  extends: r,
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
    }
  },
  data: () => ({
    lazyLoaded: !1
  }),
  computed: {
    isSku() {
      return !this.product.id && !o.isNil(this.validSku);
    }
  },
  mounted() {
    this.validProduct && this.showAllInstallments && this.validProduct.has_variations && this.$watch("validSku", () => this.loadInstallments()), this.isInViewport(this.$refs.installmentText) || !this.installments.installments ? this.loadInstallments() : this.lazyLoadInstallment();
  },
  methods: {
    async loadInstallments(e) {
      try {
        this.installments = await this.handleInstallments(e);
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
        d(() => {
          !this.lazyLoaded && this.isInViewport(this.$refs.installmentText) && (this.lazyLoaded = !0, this.loadInstallments());
        }, 40),
        { passive: !0 }
      );
    },
    isInViewport(e) {
      if (!e)
        return !0;
      const t = e.getBoundingClientRect(), n = (window.innerHeight || document.documentElement.clientHeight) + 30;
      return t.top >= 0 && t.bottom <= n;
    }
  }
};
var c = function() {
  var t = this, n = t._self._c;
  return n("div", [t.installments.installments ? [t.showAllInstallments ? [n("div", { staticClass: "show-installments link-alike", class: { "-loading": t.loading }, on: { click: function(i) {
    return t.showInstallmentsModal();
  } } }, [t._v(" Ver opções de parcelamento ")])] : t._e()] : t._e(), t.showAllInstallments ? n("modal-installments", { ref: "modalInstallments", attrs: { product: t.validSku } }) : t._e()], 2);
}, f = [], h = /* @__PURE__ */ m(
  u,
  c,
  f
);
const p = h.exports;
function a(e) {
  a.installed || (a.installed = !0, e.component("Installments", p));
}
const I = {
  install: a
};
let s = null;
typeof window < "u" ? s = window.Vue : typeof global < "u" && (s = global.Vue);
s && s.use(I);
export {
  p as default
};
