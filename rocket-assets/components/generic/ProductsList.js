function v(r, e, n, s, i, d, p, g) {
  var t = typeof r == "function" ? r.options : r;
  e && (t.render = e, t.staticRenderFns = n, t._compiled = !0), s && (t.functional = !0), d && (t._scopeId = "data-v-" + d);
  var o;
  if (p ? (o = function(a) {
    a = a || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !a && typeof __VUE_SSR_CONTEXT__ < "u" && (a = __VUE_SSR_CONTEXT__), i && i.call(this, a), a && a._registeredComponents && a._registeredComponents.add(p);
  }, t._ssrRegister = o) : i && (o = g ? function() {
    i.call(
      this,
      (t.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : i), o)
    if (t.functional) {
      t._injectStyles = o;
      var _ = t.render;
      t.render = function(h, f) {
        return o.call(f), _(h, f);
      };
    } else {
      var c = t.beforeCreate;
      t.beforeCreate = c ? [].concat(c, o) : [o];
    }
  return {
    exports: r,
    options: t
  };
}
const m = {
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
      validator: (r) => [1, 2].includes(r)
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
    tagOrDiv(r) {
      return this.carousel ? r : "div";
    }
  }
};
var w = function() {
  var e = this, n = e._self._c;
  return n("div", { staticClass: "products-list" }, [e.ready ? n(e.tagOrDiv("splide"), { tag: "component", class: {
    "flex -wrap": !e.carousel,
    "single-per-line": e.isMobile && e.productsPerLine === 1,
    "-no-pagination": e.carousel && e.products.length <= e.productsPerPage
  }, attrs: { options: e.carousel ? e.carouselOptions : null, slides: e.carousel ? e.products : null } }, [e._l(e.products, function(s) {
    return n(e.tagOrDiv("splide-slide"), { key: s.id, tag: "component", class: {
      "box-product-wrapper": !e.carousel,
      "-loading": e.loading
    } }, [e._t("default", null, { product: s, loading: e.loading })], 2);
  }), n(e.tagOrDiv("li"), { tag: "component", staticClass: "box-product-wrapper -clear" }), n(e.tagOrDiv("li"), { tag: "component", staticClass: "box-product-wrapper -clear" }), n(e.tagOrDiv("li"), { tag: "component", staticClass: "box-product-wrapper -clear" })], 2) : e._e()], 1);
}, b = [], y = /* @__PURE__ */ v(
  m,
  w,
  b,
  !1,
  null,
  null,
  null,
  null
);
const C = y.exports;
function u(r) {
  u.installed || (u.installed = !0, r.component("ProductsList", C));
}
const P = {
  install: u
};
let l = null;
typeof window < "u" ? l = window.Vue : typeof global < "u" && (l = global.Vue);
l && l.use(P);
export {
  C as default
};
