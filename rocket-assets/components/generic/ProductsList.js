function s(t, e, a, n, g, m, _, w) {
  var o = typeof t == "function" ? t.options : t;
  return e && (o.render = e, o.staticRenderFns = a, o._compiled = !0), {
    exports: t,
    options: o
  };
}
const l = {
  name: "ProductsList",
  props: {
    products: {
      type: Array,
      default: () => []
    },
    carousel: {
      type: Boolean,
      default: !1
    },
    loading: {
      type: Boolean,
      default: !1
    },
    productsPerLine: {
      type: Number,
      default: 2,
      validator: (t) => [1, 2].includes(t)
    },
    isMobile: {
      type: Boolean,
      default: !1
    }
  },
  data() {
    return {
      ready: !0
    };
  },
  computed: {
    carouselOptions() {
      return {
        gap: 32,
        perPage: 4,
        pagination: !0,
        arrows: !0,
        breakpoints: {
          700: {
            gap: 12,
            perPage: 3,
            pagination: !0,
            arrows: !1
          },
          580: {
            gap: 12,
            perPage: this.productsPerLine,
            pagination: !0,
            arrows: !1
          }
        }
      };
    },
    productsPerPage() {
      return this.isMobile ? window.innerWidth <= 580 ? this.productsPerLine : 3 : 4;
    }
  },
  watch: {
    isMobile() {
      this.carousel && (this.ready = !1, this.$nextTick(() => {
        this.ready = !0;
      }));
    }
  },
  methods: {
    tagOrDiv(t) {
      return this.carousel ? t : "div";
    }
  }
};
var u = function() {
  var e = this, a = e._self._c;
  return a("div", { staticClass: "products-list" }, [e.ready ? a(e.tagOrDiv("splide"), { tag: "component", class: {
    "flex -wrap": !e.carousel,
    "single-per-line": e.isMobile && e.productsPerLine === 1,
    "-no-pagination": e.carousel && e.products.length <= e.productsPerPage
  }, attrs: { options: e.carousel ? e.carouselOptions : null, slides: e.carousel ? e.products : null } }, [e._l(e.products, function(n) {
    return a(e.tagOrDiv("splide-slide"), { key: n.id, tag: "component", class: {
      "box-product-wrapper": !e.carousel,
      "-loading": e.loading
    } }, [e._t("default", null, { product: n, loading: e.loading })], 2);
  }), a(e.tagOrDiv("li"), { tag: "component", staticClass: "box-product-wrapper -clear" }), a(e.tagOrDiv("li"), { tag: "component", staticClass: "box-product-wrapper -clear" }), a(e.tagOrDiv("li"), { tag: "component", staticClass: "box-product-wrapper -clear" })], 2) : e._e()], 1);
}, d = [], p = /* @__PURE__ */ s(
  l,
  u,
  d
);
const c = p.exports;
function i(t) {
  i.installed || (i.installed = !0, t.component("ProductsList", c));
}
const f = {
  install: i
};
let r = null;
typeof window < "u" ? r = window.Vue : typeof global < "u" && (r = global.Vue);
r && r.use(f);
export {
  c as default
};
