import u from "lodash/get";
import d from "lodash/times";
import f from "lodash/difference";
import p from "lodash/constant";
import h from "lodash/sortBy";
import m from "lodash/isEqual";
import v from "../vendor/mixins/product.js";
import { smoothScroll as S } from "../vendor/mixins/helpers.js";
import _ from "../components/CustomSelect";
import k from "../components/VariantButton";
function b(e, t, i, s, o, a, l, W) {
  var r = typeof e == "function" ? e.options : e;
  return t && (r.render = t, r.staticRenderFns = i, r._compiled = !0), {
    exports: e,
    options: r
  };
}
const y = {
  name: "SelectSku",
  mixins: [v],
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
      return u(this.validProduct, "variations.data", []);
    },
    skus() {
      return u(this.validProduct, "skus.data", []);
    },
    variationsSelectStyle() {
      return {
        list: _,
        buttons: k
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
    smoothScroll: S,
    bootSelected() {
      if (this.selected = d(this.variations.length, p(0)), this.variationsStyle === "list" || this.variations.length === 1) {
        this.options = d(this.variations.length, () => []), this.loadOptions();
        return;
      }
      this.options = this.variations.map((e) => e.values.data);
    },
    updateSelected(e, t) {
      this.selectWithErrors = !1, this.$set(this.selected, e, t);
      for (let i = e + 1; i < this.variations.length; i++)
        this.$set(this.selected, i, 0);
      e < this.variations.length - 1 && this.loadOptions(e + 1), this.checkIfValidSkuSelected();
    },
    updateVariation(e) {
      if (this.product.skus !== void 0) {
        for (let i of this.product.skus.data)
          for (let s of i.variations)
            if (s.value_id === e) {
              this.$emit("updateVariation", {
                imageUrl: i.images.data[0].url,
                productId: i.product_id
              });
              return;
            }
      }
    },
    checkIfValidSkuSelected() {
      if (this.selected.some((t) => t === 0))
        return this.$emit("update");
      const e = this.skus.find((t) => {
        const i = t.combinations.split("-").map((s) => parseInt(s, 10));
        return m(h(this.selected), h(i));
      });
      return this.$emit("update", e);
    },
    loadOptions(e = 0) {
      const t = this.variationsStyle === "list" ? this.filterVariationOptions(e) : this.mapUnavailableVariationOptions(e);
      this.$set(this.options, e, t);
    },
    mapUnavailableVariationOptions(e) {
      return this.variations[e].values.data.map((i) => (i.unavailable = !1, (i.blocked_sale === 1 || !this.skus.some((s) => this.skuHasOption(s, i))) && (i.unavailable = !0), i));
    },
    filterVariationOptions(e) {
      const t = u(this.variations, `${e}.values.data`, []);
      let i = [];
      return i = this.availabilitySkuVariationsWithoutCache(t), e === 0 ? i.filter((s) => s.blocked_sale != !0) : i.filter((s) => s.blocked_sale === !0 || t.blocked_sale === 1 ? !1 : this.skus.some((o) => this.skuHasOption(o, s)));
    },
    availabilitySkuVariationsWithoutCache(e) {
      let t = [];
      for (let i of e) {
        let s = !0;
        for (let o of this.skus)
          if (o.variations.some(
            (l) => l.value_id === i.id && o.blocked_sale == !1
          )) {
            s = !1;
            break;
          }
        i.blocked_sale = s, t.push(i);
      }
      return t;
    },
    skuHasOption(e, t) {
      if (e.blocked_sale)
        return !1;
      const i = e.combinations.split("-").map((o) => parseInt(o, 10)), s = [
        ...this.selected.filter((o) => o),
        // get only valid selected ids
        t.id
      ];
      return f(s, i).length === 0;
    },
    verifySelect() {
      const e = this.$refs.customSelect.filter((t) => !t.selectedValue);
      return this.selectWithErrors = !!e.length, this.selectWithErrors && this.shouldScrollOnError && this.smoothScroll(document.body, 0, this.$el.offsetTop - window.innerHeight / 6), this.selectWithErrors;
    }
  }
};
var g = function() {
  var t = this, i = t._self._c;
  return i("div", { staticClass: "sku-select" }, [t.variations.length ? i("p", { staticClass: "helper-text", class: { "-error": t.selectWithErrors } }, [t._v(" Selecione uma opção ")]) : t._e(), t._l(t.variations, function(s, o) {
    return i("div", { key: s.id, staticClass: "sku-option", class: t.variationsStyle }, [i("label", { attrs: { for: `${s.id}-${s.name}` }, domProps: { textContent: t._s(s.name) } }), i(t.variationsSelectStyle, { ref: "customSelect", refInFor: !0, tag: "component", attrs: { id: `${s.id}-${s.name}`, name: `${s.id}-${s.name}`, value: t.selected[o], disabled: o > 0 && t.selected[o - 1] === 0, error: t.selectWithErrors, options: t.options[o] }, on: { change: function(a) {
      return t.updateSelected(o, a);
    } } }, [t.variationsStyle === "list" ? [i("option", { domProps: { value: 0 } }, [t._v(" Selecionar... ")]), t._l(t.options[o], function(a) {
      return i("option", { key: a.id, domProps: { value: a.id, textContent: t._s(a.value) }, on: { click: function(l) {
        return t.updateVariation(a.id);
      } } });
    })] : t._e()], 2)], 1);
  })], 2);
}, V = [], $ = /* @__PURE__ */ b(
  y,
  g,
  V
);
const C = $.exports;
function c(e) {
  c.installed || (c.installed = !0, e.component("SelectSku", C));
}
const O = {
  install: c
};
let n = null;
typeof window < "u" ? n = window.Vue : typeof global < "u" && (n = global.Vue);
n && n.use(O);
export {
  C as default
};
