import r from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/lodash.js";
import S from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/mixins/product.js";
import { smoothScroll as k } from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/mixins/helpers.js";
function g(e, t, s, i, o, a, d, m) {
  var n = typeof e == "function" ? e.options : e;
  t && (n.render = t, n.staticRenderFns = s, n._compiled = !0), i && (n.functional = !0), a && (n._scopeId = "data-v-" + a);
  var c;
  if (d ? (c = function(l) {
    l = l || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !l && typeof __VUE_SSR_CONTEXT__ < "u" && (l = __VUE_SSR_CONTEXT__), o && o.call(this, l), l && l._registeredComponents && l._registeredComponents.add(d);
  }, n._ssrRegister = c) : o && (c = m ? function() {
    o.call(
      this,
      (n.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : o), c)
    if (n.functional) {
      n._injectStyles = c;
      var v = n.render;
      n.render = function(_, p) {
        return c.call(p), v(_, p);
      };
    } else {
      var f = n.beforeCreate;
      n.beforeCreate = f ? [].concat(f, c) : [c];
    }
  return {
    exports: e,
    options: n
  };
}
const $ = {
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
    }
  },
  data: () => ({
    selected: [],
    options: [],
    selectWithErrors: !1
  }),
  computed: {
    variations() {
      return r.get(this.validProduct, "variations.data", []);
    },
    skus() {
      return r.get(this.validProduct, "skus.data", []);
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
      if (this.selected = r.times(this.variations.length, r.constant(0)), this.variationsStyle === "list" || this.variations.length === 1) {
        this.options = r.times(this.variations.length, () => []), this.loadOptions();
        return;
      }
      this.options = this.variations.map((e) => e.values.data);
    },
    updateSelected(e, t) {
      this.selectWithErrors = !1, this.$set(this.selected, e, t);
      for (let s = e + 1; s < this.variations.length; s++)
        this.$set(this.selected, s, 0);
      e < this.variations.length - 1 && this.loadOptions(e + 1), this.checkIfValidSkuSelected();
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
        return r.isEqual(r.sortBy(this.selected), r.sortBy(s));
      });
      return this.$emit("update", e);
    },
    loadOptions(e = 0) {
      const t = this.filterVariationOptions(e);
      this.$set(this.options, e, t);
    },
    filterVariationOptions(e) {
      const t = r.get(this.variations, `${e}.values.data`, []), s = [];
      for (const i of t) {
        for (const o of this.skus)
          i.id === parseInt(o.combinations) && (i.blocked_sale = o.blocked_sale);
        s.push(i);
      }
      return s.filter((i) => this.skus.some((o) => this.skuHasOption(o, i)));
    },
    skuHasOption(e, t) {
      const s = e.combinations.split("-").map((o) => parseInt(o, 10)), i = [
        ...this.selected.filter((o) => o),
        t.id
      ];
      return r.difference(i, s).length === 0;
    },
    verifySelect() {
      const e = this.$refs.customSelect.filter((t) => !t.selectedValue);
      return this.selectWithErrors = !!e.length, this.selectWithErrors && this.shouldScrollOnError && this.smoothScroll(document.body, 0, this.$el.offsetTop - window.innerHeight / 6), this.selectWithErrors;
    }
  }
};
var b = function() {
  var t = this, s = t._self._c;
  return s("div", { staticClass: "sku-select" }, [t.variations.length ? s("p", { staticClass: "helper-text", class: { "-error": t.selectWithErrors } }, [t._v(" Selecione uma op\xE7\xE3o ")]) : t._e(), t._l(t.variations, function(i, o) {
    return s("div", { key: i.id, staticClass: "sku-option", class: t.variationsStyle }, [s("label", { attrs: { for: `${i.id}-${i.name}` }, domProps: { textContent: t._s(i.name) } }), s(t.variationsSelectStyle, { ref: "customSelect", refInFor: !0, tag: "component", attrs: { id: `${i.id}-${i.name}`, name: `${i.id}-${i.name}`, value: t.selected[o], disabled: o > 0 && t.selected[o - 1] === 0, error: t.selectWithErrors, options: t.options[o] }, on: { change: function(a) {
      return t.updateSelected(o, a);
    } } }, [t.variationsStyle === "list" ? [s("option", { domProps: { value: 0 } }, [t._v(" Selecionar... ")]), t._l(t.options[o], function(a) {
      return s("option", { key: a.id, domProps: { value: a.id, textContent: t._s(a.value) }, on: { click: function(d) {
        return t.updateVariation(a.id);
      } } });
    })] : t._e()], 2)], 1);
  })], 2);
}, C = [], y = /* @__PURE__ */ g(
  $,
  b,
  C,
  !1,
  null,
  null,
  null,
  null
);
const V = y.exports;
function h(e) {
  h.installed || (h.installed = !0, e.component("SelectSku", V));
}
const E = {
  install: h
};
let u = null;
typeof window < "u" ? u = window.Vue : typeof global < "u" && (u = global.Vue);
u && u.use(E);
export {
  V as default
};
