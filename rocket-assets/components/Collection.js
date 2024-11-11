import l from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/lodash.js";
import { mapGetters as s } from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/vuex.js";
import c from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/modules/axios/api.js";
import d from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/modules/axios/rocket.js";
function u(t, e, o, a, y, w, v, k) {
  var i = typeof t == "function" ? t.options : t;
  return e && (i.render = e, i.staticRenderFns = o, i._compiled = !0), {
    exports: t,
    options: i
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
    ...s("preview", ["isPreview", "isEditing"]),
    link() {
      return this.showLink ? l.get(this.collection, "url_path", "") : "";
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
      return l.get(this.collection, "products.data", []);
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
        if (this.loading = !0, !this.collectionId && (this.isPreview || this.isEditing)) {
          await this.loadPlaceholders();
          return;
        }
        const t = this.$applyQueriesToUrl("catalog/collections", {
          id: [this.collectionId],
          limit: this.totalProducts
        }), { data: e } = await c.get(t);
        this.collection = l.get(e, "data.0", {});
      } finally {
        this.loading = !1;
      }
    },
    async loadPlaceholders() {
      const { data: t } = await d({
        method: "get",
        url: "/placeholders/collections"
      });
      this.collection = l.get(t, "data.0", {});
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
const g = {
  install: r
};
let n = null;
typeof window < "u" ? n = window.Vue : typeof global < "u" && (n = global.Vue);
n && n.use(g);
export {
  _ as default
};
