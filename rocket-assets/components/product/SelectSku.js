import a from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/lodash.js";
import d from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/mixins/product.js";
import { smoothScroll as h } from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/mixins/helpers.js";
import f from "https://s3.amazonaws.com/codigo-aberto-sandbox-assets/yampi-templates-main/rocket-assets/components/CustomSelect.js";
import p from "https://s3.amazonaws.com/codigo-aberto-sandbox-assets/yampi-templates-main/rocket-assets/components/VariantButton.js";
function m(e, t, s, i, o, n, u, y) {
  var r = typeof e == "function" ? e.options : e;
  return t && (r.render = t, r.staticRenderFns = s, r._compiled = !0), {
    exports: e,
    options: r
  };
}
const v = {
  name: "SelectSku",
  mixins: [d],
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
      return a.get(this.validProduct, "variations.data", []);
    },
    skus() {
      return a.get(this.validProduct, "skus.data", []);
    },
    variationsSelectStyle() {
      return {
        list: f,
        buttons: p
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
    smoothScroll: h,
    bootSelected() {
      if (this.selected = a.times(this.variations.length, a.constant(0)), this.variationsStyle === "list" || this.variations.length === 1) {
        this.options = a.times(this.variations.length, () => []), this.loadOptions();
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
        for (let s of this.product.skus.data)
          for (let i of s.variations)
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
        return a.isEqual(a.sortBy(this.selected), a.sortBy(s));
      });
      return this.$emit("update", e);
    },
    loadOptions(e = 0) {
      const t = this.variationsStyle === "list" ? this.filterVariationOptions(e) : this.mapUnavailableVariationOptions(e);
      this.$set(this.options, e, t);
    },
    mapUnavailableVariationOptions(e) {
      return this.variations[e].values.data.map((s) => (s.unavailable = !1, (s.blocked_sale === 1 || !this.skus.some((i) => this.skuHasOption(i, s))) && (s.unavailable = !0), s));
    },
    filterVariationOptions(e) {
      const t = a.get(this.variations, `${e}.values.data`, []);
      let s = [];
      return s = this.availabilitySkuVariationsWithoutCache(t), e === 0 ? s.filter((i) => i.blocked_sale != !0) : s.filter((i) => i.blocked_sale === !0 || t.blocked_sale === 1 ? !1 : this.skus.some((o) => this.skuHasOption(o, i)));
    },
    availabilitySkuVariationsWithoutCache(e) {
      let t = [];
      for (let s of e) {
        let i = !0;
        for (let o of this.skus)
          if (o.variations.some(
            (u) => u.value_id === s.id && o.blocked_sale == !1
          )) {
            i = !1;
            break;
          }
        s.blocked_sale = i, t.push(s);
      }
      return t;
    },
    skuHasOption(e, t) {
      if (e.blocked_sale)
        return !1;
      const s = e.combinations.split("-").map((o) => parseInt(o, 10)), i = [
        ...this.selected.filter((o) => o),
        // get only valid selected ids
        t.id
      ];
      return a.difference(i, s).length === 0;
    },
    verifySelect() {
      const e = this.$refs.customSelect.filter((t) => !t.selectedValue);
      return this.selectWithErrors = !!e.length, this.selectWithErrors && this.shouldScrollOnError && this.smoothScroll(document.body, 0, this.$el.offsetTop - window.innerHeight / 6), this.selectWithErrors;
    }
  }
};
var S = function() {
  var t = this, s = t._self._c;
  return s("div", { staticClass: "sku-select" }, [t.variations.length ? s("p", { staticClass: "helper-text", class: { "-error": t.selectWithErrors } }, [t._v(" Selecione uma opção ")]) : t._e(), t._l(t.variations, function(i, o) {
    return s("div", { key: i.id, staticClass: "sku-option", class: t.variationsStyle }, [s("label", { attrs: { for: `${i.id}-${i.name}` }, domProps: { textContent: t._s(i.name) } }), s(t.variationsSelectStyle, { ref: "customSelect", refInFor: !0, tag: "component", attrs: { id: `${i.id}-${i.name}`, name: `${i.id}-${i.name}`, value: t.selected[o], disabled: o > 0 && t.selected[o - 1] === 0, error: t.selectWithErrors, options: t.options[o] }, on: { change: function(n) {
      return t.updateSelected(o, n);
    } } }, [t.variationsStyle === "list" ? [s("option", { domProps: { value: 0 } }, [t._v(" Selecionar... ")]), t._l(t.options[o], function(n) {
      return s("option", { key: n.id, domProps: { value: n.id, textContent: t._s(n.value) }, on: { click: function(u) {
        return t.updateVariation(n.id);
      } } });
    })] : t._e()], 2)], 1);
  })], 2);
}, k = [], _ = /* @__PURE__ */ m(
  v,
  S,
  k
);
const b = _.exports;
function c(e) {
  c.installed || (c.installed = !0, e.component("SelectSku", b));
}
const g = {
  install: c
};
let l = null;
typeof window < "u" ? l = window.Vue : typeof global < "u" && (l = global.Vue);
l && l.use(g);
export {
  b as default
};
