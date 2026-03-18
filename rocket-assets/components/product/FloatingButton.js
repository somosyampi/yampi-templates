import h from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/components/product/installments/BaseInstallments.js";
import v from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/mixins/buttons.js";
function C(o, t, e, a, r, c, d, _) {
  var n = typeof o == "function" ? o.options : o;
  t && (n.render = t, n.staticRenderFns = e, n._compiled = !0), a && (n.functional = !0), c && (n._scopeId = "data-v-" + c);
  var s;
  if (d ? (s = function(i) {
    i = i || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !i && typeof __VUE_SSR_CONTEXT__ < "u" && (i = __VUE_SSR_CONTEXT__), r && r.call(this, i), i && i._registeredComponents && i._registeredComponents.add(d);
  }, n._ssrRegister = s) : r && (s = _ ? function() {
    r.call(
      this,
      (n.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : r), s)
    if (n.functional) {
      n._injectStyles = s;
      var m = n.render;
      n.render = function(b, p) {
        return s.call(p), m(b, p);
      };
    } else {
      var f = n.beforeCreate;
      n.beforeCreate = f ? [].concat(f, s) : [s];
    }
  return {
    exports: o,
    options: n
  };
}
const g = {
  name: "FloatingButton",
  extends: h,
  mixins: [v],
  props: {
    quantity: {
      type: Number,
      default: 1
    },
    loadingButton: {
      type: Boolean,
      required: !0
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    price: {
      type: Object,
      required: !0
    }
  },
  data() {
    return {
      showFloatingButton: !1
    };
  },
  computed: {
    sku() {
      return this.selectedSku || this.firstValidSku;
    },
    buyButtonText() {
      return this.quantity > 1 ? `Comprar (${this.quantity})` : "Comprar";
    }
  },
  async created() {
    this.scroll();
    const o = new IntersectionObserver((e) => {
      e.forEach((a) => {
        this.showFloatingButton = !a.isIntersecting;
      });
    }, { threshold: 0.4 });
    document.querySelectorAll(".main-product-buy-button-holder, .btn-stock-notifications").forEach((e) => {
      o.observe(e);
    });
  }
};
var k = function() {
  var t = this, e = t._self._c;
  return e("div", { staticClass: "floating-button" }, [e("Transition", { attrs: { name: "fade" } }, [t.sku && !t.sku.blocked_sale && t.showFloatingButton ? e("div", { staticClass: "floating-button-container" }, [e("div", { staticClass: "prices-container" }, [t.price.has_promotion ? e("p", { staticClass: "original-price-discount" }, [t._v(" " + t._s(t.price.price_sale_formated) + " ")]) : t._e(), e("p", { staticClass: "original-price" }, [t._v(" " + t._s(t.price.price_formated) + " ")]), t.price.installments_data ? e("div", { staticClass: "installments" }, [e("p", { domProps: { textContent: t._s(t.price.installments_data.text) } })]) : t._e()]), e("div", { staticClass: "button-container" }, [e("LoaderButton", { staticClass: "btn btn-primary", attrs: { sending: t.loadingButton, disabled: t.disabled }, on: { click: function(a) {
    return t.$emit("click");
  } } }, [t._v(" " + t._s(t.buyButtonText) + " ")])], 1)]) : t.sku && t.sku.blocked_sale && t.showFloatingButton ? e("div", { staticClass: "pl-22 pr-22 pt-16 pb-16 floating-button-container" }, [e("button", { staticClass: "btn-stock-notifications btn btn-secundary -block uppercase flex -hcenter -vcenter", on: { click: function(a) {
    return t.$emit("open-stock-notifications-modal");
  } } }, [e("IconEmail", { staticClass: "fill-current" }), t._v(" Avise-me quando chegar ")], 1)]) : t._e()])], 1);
}, y = [], B = /* @__PURE__ */ C(
  g,
  k,
  y,
  !1,
  null,
  null,
  null,
  null
);
const $ = B.exports;
function u(o) {
  u.installed || (u.installed = !0, o.component("FloatingButton", $));
}
const w = {
  install: u
};
let l = null;
typeof window < "u" ? l = window.Vue : typeof global < "u" && (l = global.Vue);
l && l.use(w);
export {
  $ as default
};
