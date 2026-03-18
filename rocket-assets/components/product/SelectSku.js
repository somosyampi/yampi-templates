import u from "https://openstore-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/lodash.js";
import S from "https://openstore-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/mixins/product.js";
import { smoothScroll as k } from "https://openstore-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/mixins/helpers.js";
function b(e, t, s, i, o, n, d, m) {
  var r = typeof e == "function" ? e.options : e;
  t && (r.render = t, r.staticRenderFns = s, r._compiled = !0), i && (r.functional = !0), n && (r._scopeId = "data-v-" + n);
  var l;
  if (d ? (l = function(a) {
    a = a || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !a && typeof __VUE_SSR_CONTEXT__ < "u" && (a = __VUE_SSR_CONTEXT__), o && o.call(this, a), a && a._registeredComponents && a._registeredComponents.add(d);
  }, r._ssrRegister = l) : o && (l = m ? function() {
    o.call(
      this,
      (r.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : o), l)
    if (r.functional) {
      r._injectStyles = l;
      var v = r.render;
      r.render = function(_, p) {
        return l.call(p), v(_, p);
      };
    } else {
      var f = r.beforeCreate;
      r.beforeCreate = f ? [].concat(f, l) : [l];
    }
  return {
    exports: e,
    options: r
  };
}
const g = {
  name: "SelectSku",
  mixins: [S],
  props: {
    shouldScrollOnError: {
      type: Boolean,
      default: !0
    },
    variationsStyle: {
      type: String,
      default: "list"
    },
    showErrorMessage: {
      type: Boolean,
      default: !0
    }
  },
  data: () => ({
    selected: [],
    options: [],
    selectWithErrors: !1
  }),
  computed: {
    variations() {
      return u.get(this.validProduct, "variations.data", []);
    },
    skus() {
      return u.get(this.validProduct, "skus.data", []);
    },
    variationsSelectStyle() {
      return {
        list: "custom-select",
        buttons: "variant-button"
      }[this.variationsStyle];
    }
  },
  watch: {
    validProduct() {
      this.bootSelected();
    }
  },
  mounted() {
    this.bootSelected();
  },
  methods: {
    smoothScroll: k,
    bootSelected() {
      this.selected = u.times(this.variations.length, u.constant(0)), this.mapOptionsToFindSomeSkuAvailable();
    },
    updateSelected(e, t) {
      this.selectWithErrors = !1, this.$set(this.selected, e, t);
      for (let s = e + 1; s < this.variations.length; s++)
        this.$set(this.selected, s, 0);
      e < this.variations.length - 1 && this.mapOptionsToFindSomeSkuAvailable(e + 1), this.checkIfValidSkuSelected();
    },
    updateVariation(e) {
      if (this.product.skus !== void 0) {
        for (const s of this.product.skus.data)
          for (const i of s.variations)
            if (i.value_id === e) {
              this.$emit("updateVariation", {
                imageUrl: s.images.data[0].url,
                productId: s.product_id
              });
              return;
            }
      }
    },
    checkIfValidSkuSelected() {
      if (this.selected.some((t) => t === 0))
        return this.$emit("update");
      const e = this.skus.find((t) => {
        const s = t.combinations.split("-").map((i) => parseInt(i, 10));
        return u.isEqual(u.sortBy(this.selected), u.sortBy(s));
      });
      return this.$emit("update", e);
    },
    mapOptionsToFindSomeSkuAvailable(e = 0) {
      for (let t = e; t < this.variations.length; t++) {
        const s = this.variations[t].values.data.filter((i) => this.skus.some((o) => this.skuHasOption(o, i))).map((i) => {
          const o = this.skus.filter((n) => this.skuHasOption(n, i)).some((n) => n.blocked_sale === !1);
          return i.unavailable = !o, i;
        });
        this.$set(this.options, t, s);
      }
    },
    skuHasOption(e, t) {
      const s = e.combinations.split("-").map((o) => parseInt(o)), i = [
        ...this.selected.filter((o) => o),
        t.id
      ];
      return u.difference(i, s).length === 0;
    },
    verifySelect() {
      const e = this.$refs.customSelect.filter((t) => !t.selectedValue);
      return this.selectWithErrors = !!e.length, this.selectWithErrors && this.shouldScrollOnError && this.smoothScroll(document.body, 0, this.$el.offsetTop - window.innerHeight / 6), this.selectWithErrors;
    }
  }
};
var $ = function() {
  var t = this, s = t._self._c;
  return s("div", { staticClass: "sku-select" }, [t.variations.length && t.showErrorMessage ? s("p", { staticClass: "helper-text", class: { "-error": t.selectWithErrors } }, [t._v(" Selecione uma op\xE7\xE3o ")]) : t._e(), t._l(t.variations, function(i, o) {
    return s("div", { key: i.id, staticClass: "sku-option", class: t.variationsStyle }, [s("label", { attrs: { for: `${i.id}-${i.name}` }, domProps: { textContent: t._s(i.name) } }), s(t.variationsSelectStyle, { ref: "customSelect", refInFor: !0, tag: "component", attrs: { id: `${i.id}-${i.name}`, name: `${i.id}-${i.name}`, value: t.selected[o], disabled: o > 0 && t.selected[o - 1] === 0, error: t.selectWithErrors, options: t.options[o] }, on: { change: function(n) {
      return t.updateSelected(o, n);
    } } }, [t.variationsStyle === "list" ? [s("option", { domProps: { value: 0 } }, [t._v(" Selecionar... ")]), t._l(t.options[o], function(n) {
      return s("option", { key: n.id, class: { unavailable: n.unavailable }, domProps: { value: n.id, textContent: t._s(n.value) }, on: { click: function(d) {
        return t.updateVariation(n.id);
      } } });
    })] : t._e()], 2)], 1);
  })], 2);
}, y = [], C = /* @__PURE__ */ b(
  g,
  $,
  y,
  !1,
  null,
  null,
  null,
  null
);
const E = C.exports;
function h(e) {
  h.installed || (h.installed = !0, e.component("SelectSku", E));
}
const V = {
  install: h
};
let c = null;
typeof window < "u" ? c = window.Vue : typeof global < "u" && (c = global.Vue);
c && c.use(V);
export {
  E as default
};
