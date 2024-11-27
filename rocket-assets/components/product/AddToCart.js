import { mapGetters as c, mapActions as l } from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/vuex.js";
import u from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/modules/eventBus.js";
import f from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/modules/axios/api.js";
import m from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/modules/axios/rocket.js";
function p(e, t, r, i, d, n, v, g) {
  var a = typeof e == "function" ? e.options : e;
  return t && (a.render = t, a.staticRenderFns = r, a._compiled = !0), {
    exports: e,
    options: a
  };
}
const h = {
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
    ...c("cart", ["cartType"]),
    ...c("preview", ["isPreview"]),
    ...l("cart", ["addProductsToCart"])
  },
  mounted() {
    const e = this.$refs.modalCartConfirmation;
    u.$on("addToCartClicked", this.handleAddToCartClick), this.$store.subscribe(({ type: t, payload: r }) => {
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
        var r, i, d, n;
        (i = (r = t.data) == null ? void 0 : r.show_modal_after_purchase) != null && i.value && ((n = (d = t.target) == null ? void 0 : d.themeConfig) == null ? void 0 : n.page) === "product" && this.cartType !== "side_cart" && this.$refs.modalCartConfirmation.showModal();
      },
      !1
    );
  },
  methods: {
    ...l("cart", [
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
        const t = `catalog/products/${e}`, { data: r } = await f.get(t);
        this.productData = r.data;
      } catch (t) {
        t.response.status >= 400 && this.isPreview && await this.loadPlaceholders();
      }
    },
    async loadPlaceholders() {
      const { data: e } = await m.get("/placeholders/productDetail");
      this.productData = e;
    }
  }
};
var C = function() {
  var t = this, r = t._self._c;
  return r("div", [r("ModalCartConfirmation", { ref: "modalCartConfirmation", attrs: { error: t.error, "quantity-added": t.quantity } }), r("ModalConfirmAddToCart", { ref: "ModalConfirmAddToCart", attrs: { product: t.productData, "selected-price": t.selectedPrice } })], 1);
}, _ = [], w = /* @__PURE__ */ p(
  h,
  C,
  _
);
const T = w.exports;
function s(e) {
  s.installed || (s.installed = !0, e.component("AddToCart", T));
}
const y = {
  install: s
};
let o = null;
typeof window < "u" ? o = window.Vue : typeof global < "u" && (o = global.Vue);
o && o.use(y);
export {
  T as default
};