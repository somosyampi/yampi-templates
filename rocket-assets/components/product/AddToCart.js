(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode(".hide[data-v-ab5cf582]{visibility:hidden}")),document.head.appendChild(e)}}catch(d){console.error("vite-plugin-css-injected-by-js",d)}})();
import { mapGetters as p, mapActions as _ } from "https://codigo-aberto-sandbox-assets.s3.amazonaws.com/yampi-templates-sandbox/rocket-assets/dist/vendor/vuex.js";
import T from "https://codigo-aberto-sandbox-assets.s3.amazonaws.com/yampi-templates-sandbox/rocket-assets/dist/vendor/modules/eventBus.js";
import w from "https://codigo-aberto-sandbox-assets.s3.amazonaws.com/yampi-templates-sandbox/rocket-assets/dist/vendor/modules/axios/api.js";
import y from "https://codigo-aberto-sandbox-assets.s3.amazonaws.com/yampi-templates-sandbox/rocket-assets/dist/vendor/modules/axios/rocket.js";
function g(e, t, a, s, i, f, u, C) {
  var r = typeof e == "function" ? e.options : e;
  t && (r.render = t, r.staticRenderFns = a, r._compiled = !0), s && (r.functional = !0), f && (r._scopeId = "data-v-" + f);
  var n;
  if (u ? (n = function(o) {
    o = o || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !o && typeof __VUE_SSR_CONTEXT__ < "u" && (o = __VUE_SSR_CONTEXT__), i && i.call(this, o), o && o._registeredComponents && o._registeredComponents.add(u);
  }, r._ssrRegister = n) : i && (n = C ? function() {
    i.call(
      this,
      (r.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : i), n)
    if (r.functional) {
      r._injectStyles = n;
      var m = r.render;
      r.render = function(v, h) {
        return n.call(h), m(v, h);
      };
    } else {
      var c = r.beforeCreate;
      r.beforeCreate = c ? [].concat(c, n) : [n];
    }
  return {
    exports: e,
    options: r
  };
}
const $ = {
  name: "AddToCart",
  props: {
    selectedPrice: {
      type: String,
      default: "promotional"
    }
  },
  data() {
    return {
      error: void 0,
      quantity: 1,
      productData: {}
    };
  },
  computed: {
    ...p("cart", ["cartType"]),
    ...p("preview", ["isPreview"]),
    ..._("cart", ["addProductsToCart"])
  },
  mounted() {
    T.$on("addToCartClicked", this.handleAddToCartClick), this.$store.subscribe(({ type: e, payload: t }) => {
      if (e === "cart/EVENT_ADDED_TO_CART") {
        if (this.isPreview && this.cartType !== "side_cart") {
          this.$refs.modalCartConfirmation && this.$refs.modalCartConfirmation.showModal();
          return;
        }
        this.addedToCart(t);
      }
    }), this.isPreview && window.addEventListener(
      "message",
      (e) => {
        var t, a, s, i;
        ((a = (t = e.data) == null ? void 0 : t.show_modal_after_purchase) == null ? void 0 : a.value) && ((i = (s = e.target) == null ? void 0 : s.themeConfig) == null ? void 0 : i.page) === "product" && this.cartType !== "side_cart" && this.$refs.modalCartConfirmation.showModal();
      },
      !1
    );
  },
  methods: {
    ..._("cart", [
      "redirectToCart"
    ]),
    async handleAddToCartClick(e) {
      this.productData = {}, this.loadProductSkus(e.slug), this.$refs.ModalConfirmAddToCart.showModal();
    },
    addedToCart({
      showModal: e,
      error: t = void 0,
      quantityAdded: a = 1
    }) {
      return {
        side_cart: () => t ? (this.error = t, this.quantity = a, this.$refs.modalCartConfirmation.showModal()) : null,
        suspended: () => t || e ? (this.error = t, this.quantity = a, this.$refs.modalCartConfirmation.showModal()) : this.redirectToCart()
      }[this.cartType]();
    },
    async loadProductSkus(e) {
      try {
        const t = `catalog/products/${e}`, { data: a } = await w.get(t);
        this.productData = a.data;
      } catch (t) {
        t.response.status >= 400 && this.isPreview && await this.loadPlaceholders();
      }
    },
    async loadPlaceholders() {
      const { data: e } = await y.get("/placeholders/productDetail");
      this.productData = e;
    }
  }
};
var P = function() {
  var t = this, a = t._self._c;
  return a("div", [a("ModalCartConfirmation", { ref: "modalCartConfirmation", attrs: { error: t.error, "quantity-added": t.quantity } }), a("ModalConfirmAddToCart", { ref: "ModalConfirmAddToCart", attrs: { product: t.productData, "selected-price": t.selectedPrice } })], 1);
}, A = [], D = /* @__PURE__ */ g(
  $,
  P,
  A,
  !1,
  null,
  null,
  null,
  null
);
const M = D.exports;
function l(e) {
  l.installed || (l.installed = !0, e.component("AddToCart", M));
}
const b = {
  install: l
};
let d = null;
typeof window < "u" ? d = window.Vue : typeof global < "u" && (d = global.Vue);
d && d.use(b);
export {
  M as default
};
