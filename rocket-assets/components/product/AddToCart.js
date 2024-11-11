import { mapGetters as s, mapActions as c } from "http://rocket.test/dist/vendor/vuex.js";
import l from "http://rocket.test/dist/vendor/modules/eventBus.js";
import u from "http://rocket.test/dist/vendor/modules/axios/api.js";
import f from "http://rocket.test/dist/vendor/modules/axios/rocket.js";
function p(e, t, r, i, d, y, g, v) {
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
    ...s("cart", ["cartType"]),
    ...s("preview", ["isPreview", "isEditing"]),
    ...c("cart", ["addProductsToCart"])
  },
  mounted() {
    l.$on("addToCartClicked", this.handleAddToCartClick), this.$store.subscribe(({ type: e, payload: t }) => {
      if (e === "cart/EVENT_ADDED_TO_CART") {
        if (this.isPreview && this.cartType !== "side_cart") {
          this.$refs.modalCartConfirmation.showModal();
          return;
        }
        this.addedToCart(t);
      }
    }), this.isPreview && window.addEventListener(
      "message",
      (e) => {
        var t, r, i, d;
        (r = (t = e.data) == null ? void 0 : t.show_modal_after_purchase) != null && r.value && ((d = (i = e.target) == null ? void 0 : i.themeConfig) == null ? void 0 : d.page) === "product" && this.cartType !== "side_cart" && this.$refs.modalCartConfirmation.showModal();
      },
      !1
    );
  },
  methods: {
    ...c("cart", [
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
        const t = `catalog/products/${e}`, { data: r } = await u.get(t);
        this.productData = r.data;
      } catch (t) {
        t.response.status >= 400 && (this.isPreview || this.isEditing) && await this.loadPlaceholders();
      }
    },
    async loadPlaceholders() {
      const { data: e } = await f.get("/placeholders/productDetail");
      this.productData = e;
    }
  }
};
var m = function() {
  var t = this, r = t._self._c;
  return r("div", [r("ModalCartConfirmation", { ref: "modalCartConfirmation", attrs: { error: t.error, "quantity-added": t.quantity } }), r("ModalConfirmAddToCart", { ref: "ModalConfirmAddToCart", attrs: { product: t.productData, "selected-price": t.selectedPrice } })], 1);
}, C = [], _ = /* @__PURE__ */ p(
  h,
  m,
  C
);
const w = _.exports;
function n(e) {
  n.installed || (n.installed = !0, e.component("AddToCart", w));
}
const T = {
  install: n
};
let o = null;
typeof window < "u" ? o = window.Vue : typeof global < "u" && (o = global.Vue);
o && o.use(T);
export {
  w as default
};
