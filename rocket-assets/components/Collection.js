import i from "lodash/get";
import { mapGetters as s } from "../vendor/vuex.js";
import c from "../vendor/modules/axios/api.js";
import d from "../vendor/modules/axios/rocket.js";
function u(t, e, o, a, g, w, v, k) {
  var l = typeof t == "function" ? t.options : t;
  return e && (l.render = e, l.staticRenderFns = o, l._compiled = !0), {
    exports: t,
    options: l
  };
}
const p = {
  name: "Collection",
  props: {
    desktopLayout: {
      type: String,
      default: "grid",
      validator: (t) => ["grid", "carousel"].includes(t)
    },
    collectionId: {
      type: Number
    },
    showLink: {
      type: Boolean,
      default: !1
    },
    productsPerLine: {
      type: Number,
      default: 2,
      validator: (t) => [1, 2].includes(t)
    },
    totalProducts: {
      type: Number,
      required: !0,
      validator: (t) => t > 0
    }
  },
  data: () => ({
    collection: {
      products: {
        data: []
      }
    },
    loading: !0,
    completed: !1
  }),
  computed: {
    ...s("preview", ["isPreview"]),
    link() {
      return this.showLink ? i(this.collection, "url_path", "") : "";
    },
    collectionProducts() {
      if (this.loading) {
        const t = [], e = {
          brand: {
            data: {
              name: "."
            }
          },
          prices: {
            data: {
              price_formated: 0,
              percent_discount: 0,
              has_promotion: !1,
              price_sale_formated: 0,
              pix: {
                discount_percent: 0,
                discount_text: 0,
                discount_value: 0,
                price: 0,
                price_formatted: 0
              },
              billet: {
                discount_percent: 0,
                discount_text: 0,
                discount_value: 0,
                price: 0,
                price_formated: 5
              }
            }
          },
          url_path: "."
        };
        for (let o = 0; o < this.totalProducts; o++)
          t.push(e);
        return t;
      }
      return i(this.collection, "products.data", []);
    },
    isCarousel() {
      return this.desktopLayout === "carousel";
    }
  },
  mounted() {
    this.loadCollection(), this.completed = !0;
  },
  methods: {
    async loadCollection() {
      try {
        if (this.loading = !0, !this.collectionId && this.isPreview) {
          await this.loadPlaceholders();
          return;
        }
        const t = this.$applyQueriesToUrl("catalog/collections", {
          id: [this.collectionId],
          limit: this.totalProducts
        }), { data: e } = await c.get(t);
        this.collection = i(e, "data.0", {});
      } finally {
        this.loading = !1;
      }
    },
    async loadPlaceholders() {
      const { data: t } = await d({
        method: "get",
        url: "/placeholders/collections"
      });
      this.collection = i(t, "data.0", {});
    }
  }
};
var f = function() {
  var e = this, o = e._self._c;
  return o("Grid", { class: { completed: e.completed, "has-carousel": e.isCarousel }, attrs: { link: e.link, "show-link": e.showLink, loading: e.loading, title: e.collection.name, "products-per-line": e.productsPerLine, carousel: e.isCarousel, products: e.collectionProducts }, scopedSlots: e._u([{ key: "default", fn: function({ product: a }) {
    return [e._t("default", null, { product: a })];
  } }], null, !0) });
}, m = [], h = /* @__PURE__ */ u(
  p,
  f,
  m
);
const _ = h.exports;
function r(t) {
  r.installed || (r.installed = !0, t.component("Collection", _));
}
const y = {
  install: r
};
let n = null;
typeof window < "u" ? n = window.Vue : typeof global < "u" && (n = global.Vue);
n && n.use(y);
export {
  _ as default
};
