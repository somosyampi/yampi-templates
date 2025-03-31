(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode(".hide[data-v-940353da]{visibility:hidden}")),document.head.appendChild(e)}}catch(d){console.error("vite-plugin-css-injected-by-js",d)}})();
import { mapGetters as p, mapActions as _ } from "https://images-dev.yampi.me/rocket-sandbox/b/01/dist/vendor/vuex.js";
import v from "https://images-dev.yampi.me/rocket-sandbox/b/01/dist/vendor/modules/eventBus.js";
import w from "https://images-dev.yampi.me/rocket-sandbox/b/01/dist/vendor/modules/axios/api.js";
import y from "https://images-dev.yampi.me/rocket-sandbox/b/01/dist/vendor/modules/axios/rocket.js";
function g(e, t, r, d, i, s, u, C) {
  var a = typeof e == "function" ? e.options : e;
  t && (a.render = t, a.staticRenderFns = r, a._compiled = !0), d && (a.functional = !0), s && (a._scopeId = "data-v-" + s);
  var n;
  if (u ? (n = function(o) {
    o = o || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !o && typeof __VUE_SSR_CONTEXT__ < "u" && (o = __VUE_SSR_CONTEXT__), i && i.call(this, o), o && o._registeredComponents && o._registeredComponents.add(u);
  }, a._ssrRegister = n) : i && (n = C ? function() {
    i.call(
      this,
      (a.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : i), n)
    if (a.functional) {
      a._injectStyles = n;
      var m = a.render;
      a.render = function(T, h) {
        return n.call(h), m(T, h);
      };
    } else {
      var c = a.beforeCreate;
      a.beforeCreate = c ? [].concat(c, n) : [n];
    }
  return {
    exports: e,
    options: a
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
    const e = this.$refs.modalCartConfirmation;
    v.$on("addToCartClicked", this.handleAddToCartClick), this.$store.subscribe(({ type: t, payload: r }) => {
      if (t === "cart/EVENT_ADDED_TO_CART") {
        if (this.isPreview && this.cartType !== "side_cart") {
          e.showModal();
          return;
        }
        this.addedToCart(r);
      }
    }), this.isPreview && window.addEventListener(
      "message",
      (t) => {
        var r, d, i, s;
        ((d = (r = t.data) == null ? void 0 : r.show_modal_after_purchase) == null ? void 0 : d.value) && ((s = (i = t.target) == null ? void 0 : i.themeConfig) == null ? void 0 : s.page) === "product" && this.cartType !== "side_cart" && this.$refs.modalCartConfirmation.showModal();
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
      quantityAdded: r = 1
    }) {
      return {
        side_cart: () => t ? (this.error = t, this.quantity = r, this.$refs.modalCartConfirmation.showModal()) : null,
        suspended: () => t || e ? (this.error = t, this.quantity = r, this.$refs.modalCartConfirmation.showModal()) : this.redirectToCart()
      }[this.cartType]();
    },
    async loadProductSkus(e) {
      try {
        const t = `catalog/products/${e}`, { data: r } = await w.get(t);
        this.productData = r.data;
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
  var t = this, r = t._self._c;
  return r("div", [r("ModalCartConfirmation", { ref: "modalCartConfirmation", attrs: { error: t.error, "quantity-added": t.quantity } }), r("ModalConfirmAddToCart", { ref: "ModalConfirmAddToCart", attrs: { product: t.productData, "selected-price": t.selectedPrice } })], 1);
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
function f(e) {
  f.installed || (f.installed = !0, e.component("AddToCart", M));
}
const R = {
  install: f
};
let l = null;
typeof window < "u" ? l = window.Vue : typeof global < "u" && (l = global.Vue);
l && l.use(R);
export {
  M as default
};
