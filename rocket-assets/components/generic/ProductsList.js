function v(r, e, a, s, i, d, p, _) {
  var t = typeof r == "function" ? r.options : r;
  e && (t.render = e, t.staticRenderFns = a, t._compiled = !0), s && (t.functional = !0), d && (t._scopeId = "data-v-" + d);
  var o;
  if (p ? (o = function(n) {
    n = n || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !n && typeof __VUE_SSR_CONTEXT__ < "u" && (n = __VUE_SSR_CONTEXT__), i && i.call(this, n), n && n._registeredComponents && n._registeredComponents.add(p);
  }, t._ssrRegister = o) : i && (o = _ ? function() {
    i.call(
      this,
      (t.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : i), o)
    if (t.functional) {
      t._injectStyles = o;
      var g = t.render;
      t.render = function(h, c) {
        return o.call(c), g(h, c);
      };
    } else {
      var f = t.beforeCreate;
      t.beforeCreate = f ? [].concat(f, o) : [o];
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
  var e = this, a = e._self._c;
  return a("div", { staticClass: "products-list" }, [e.ready ? a(e.tagOrDiv("splide"), { tag: "component", class: {
    "flex -wrap": !e.carousel,
    "single-per-line": e.isMobile && e.productsPerLine === 1,
    "-no-pagination": e.carousel && e.products.length <= e.productsPerPage
  }, attrs: { options: e.carousel ? e.carouselOptions : null, slides: e.carousel ? e.products : null } }, e._l(e.products, function(s) {
    return a(e.tagOrDiv("splide-slide"), { key: s.id, tag: "component", class: {
      "box-product-wrapper": !e.carousel,
      "-loading": e.loading
    } }, [e._t("default", null, { product: s, loading: e.loading })], 2);
  }), 1) : e._e()], 1);
}, y = [], P = /* @__PURE__ */ v(
  m,
  w,
  y,
  !1,
  null,
  null,
  null,
  null
);
const b = P.exports;
function u(r) {
  u.installed || (u.installed = !0, r.component("ProductsList", b));
}
const C = {
  install: u
};
let l = null;
typeof window < "u" ? l = window.Vue : typeof global < "u" && (l = global.Vue);
l && l.use(C);
export {
  b as default
};
