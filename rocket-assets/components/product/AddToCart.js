(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode(".hide[data-v-6f42125c]{visibility:hidden}")),document.head.appendChild(e)}}catch(d){console.error("vite-plugin-css-injected-by-js",d)}})();
import { mapGetters as p, mapActions as _ } from "https://images-dev.yampi.me/rocket-sandbox/b/01/dist/vendor/vuex.js";
import v from "https://images-dev.yampi.me/rocket-sandbox/b/01/dist/vendor/modules/eventBus.js";
import w from "https://images-dev.yampi.me/rocket-sandbox/b/01/dist/vendor/modules/axios/api.js";
import y from "https://images-dev.yampi.me/rocket-sandbox/b/01/dist/vendor/modules/axios/rocket.js";
function g(r, t, e, d, i, s, u, C) {
  var a = typeof r == "function" ? r.options : r;
  t && (a.render = t, a.staticRenderFns = e, a._compiled = !0), d && (a.functional = !0), s && (a._scopeId = "data-v-" + s);
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
    exports: r,
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
    const r = this.$refs.modalCartConfirmation;
    v.$on("addToCartClicked", this.handleAddToCartClick), this.$store.subscribe(({ type: t, payload: e }) => {
      if (t === "cart/EVENT_ADDED_TO_CART") {
        if (this.isPreview && this.cartType !== "side_cart") {
          r.showModal();
          return;
        }
        this.addedToCart(e);
      }
    }), this.isPreview && window.addEventListener(
      "message",
      (t) => {
        var e, d, i, s;
        ((d = (e = t.data) == null ? void 0 : e.show_modal_after_purchase) == null ? void 0 : d.value) && ((s = (i = t.target) == null ? void 0 : i.themeConfig) == null ? void 0 : s.page) === "product" && this.cartType !== "side_cart" && this.$refs.modalCartConfirmation.showModal();
      },
      !1
    );
  },
  methods: {
    ..._("cart", [
      "redirectToCart"
    ]),
    async handleAddToCartClick(r) {
      this.productData = {}, this.loadProductSkus(r.slug), this.$refs.ModalConfirmAddToCart.showModal();
    },
    addedToCart({
      showModal: r,
      error: t = void 0,
      quantityAdded: e = 1
    }) {
      return {
        side_cart: () => t ? (this.error = t, this.quantity = e, this.$refs.modalCartConfirmation.showModal()) : null,
        suspended: () => t || r ? (this.error = t, this.quantity = e, this.$refs.modalCartConfirmation.showModal()) : this.redirectToCart()
      }[this.cartType]();
    },
    async loadProductSkus(r) {
      try {
        const t = `catalog/products/${r}`, { data: e } = await w.get(t);
        this.productData = e.data;
      } catch (t) {
        t.response.status >= 400 && this.isPreview && await this.loadPlaceholders();
      }
    },
    async loadPlaceholders() {
      const { data: r } = await y.get("/placeholders/productDetail");
      this.productData = r;
    }
  }
};
var P = function() {
  var t = this, e = t._self._c;
  return e("div", [e("ModalCartConfirmation", { ref: "modalCartConfirmation", attrs: { error: t.error, "quantity-added": t.quantity } }), e("ModalConfirmAddToCart", { ref: "ModalConfirmAddToCart", attrs: { product: t.productData, "selected-price": t.selectedPrice } })], 1);
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
function f(r) {
  f.installed || (f.installed = !0, r.component("AddToCart", M));
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
