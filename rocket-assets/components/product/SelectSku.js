import r from "https://codigo-aberto-sandbox-assets.yampi.io.s3.amazonaws.com/yampi-templates-sandbox/rocket-assets/dist/vendor/lodash.js";
import S from "https://codigo-aberto-sandbox-assets.yampi.io.s3.amazonaws.com/yampi-templates-sandbox/rocket-assets/dist/vendor/mixins/product.js";
import { smoothScroll as k } from "https://codigo-aberto-sandbox-assets.yampi.io.s3.amazonaws.com/yampi-templates-sandbox/rocket-assets/dist/vendor/mixins/helpers.js";
function b(e, t, s, i, o, n, c, m) {
  var a = typeof e == "function" ? e.options : e;
  t && (a.render = t, a.staticRenderFns = s, a._compiled = !0), i && (a.functional = !0), n && (a._scopeId = "data-v-" + n);
  var u;
  if (c ? (u = function(l) {
    l = l || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !l && typeof __VUE_SSR_CONTEXT__ < "u" && (l = __VUE_SSR_CONTEXT__), o && o.call(this, l), l && l._registeredComponents && l._registeredComponents.add(c);
  }, a._ssrRegister = u) : o && (u = m ? function() {
    o.call(
      this,
      (a.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : o), u)
    if (a.functional) {
      a._injectStyles = u;
      var v = a.render;
      a.render = function(_, p) {
        return u.call(p), v(_, p);
      };
    } else {
      var f = a.beforeCreate;
      a.beforeCreate = f ? [].concat(f, u) : [u];
    }
  return {
    exports: e,
    options: a
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
      const t = this.variationsStyle === "list" ? this.filterVariationOptions(e) : this.mapUnavailableVariationOptions(e);
      this.$set(this.options, e, t);
    },
    mapUnavailableVariationOptions(e) {
      return this.variations[e].values.data.map((s) => (s.unavailable = !1, (s.blocked_sale === 1 || !this.skus.some((i) => this.skuHasOption(i, s))) && (s.unavailable = !0), s));
    },
    filterVariationOptions(e) {
      const t = r.get(this.variations, `${e}.values.data`, []);
      let s = [];
      return s = this.availabilitySkuVariationsWithoutCache(t), e === 0 ? s.filter((i) => i.blocked_sale != !0) : s.filter((i) => i.blocked_sale === !0 || t.blocked_sale === 1 ? !1 : this.skus.some((o) => this.skuHasOption(o, i)));
    },
    availabilitySkuVariationsWithoutCache(e) {
      const t = [];
      for (const s of e) {
        let i = !0;
        for (const o of this.skus)
          if (o.variations.some((c) => c.value_id === s.id && o.blocked_sale == !1)) {
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
var $ = function() {
  var t = this, s = t._self._c;
  return s("div", { staticClass: "sku-select" }, [t.variations.length ? s("p", { staticClass: "helper-text", class: { "-error": t.selectWithErrors } }, [t._v(" Selecione uma op\xE7\xE3o ")]) : t._e(), t._l(t.variations, function(i, o) {
    return s("div", { key: i.id, staticClass: "sku-option", class: t.variationsStyle }, [s("label", { attrs: { for: `${i.id}-${i.name}` }, domProps: { textContent: t._s(i.name) } }), s(t.variationsSelectStyle, { ref: "customSelect", refInFor: !0, tag: "component", attrs: { id: `${i.id}-${i.name}`, name: `${i.id}-${i.name}`, value: t.selected[o], disabled: o > 0 && t.selected[o - 1] === 0, error: t.selectWithErrors, options: t.options[o] }, on: { change: function(n) {
      return t.updateSelected(o, n);
    } } }, [t.variationsStyle === "list" ? [s("option", { domProps: { value: 0 } }, [t._v(" Selecionar... ")]), t._l(t.options[o], function(n) {
      return s("option", { key: n.id, domProps: { value: n.id, textContent: t._s(n.value) }, on: { click: function(c) {
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
const V = C.exports;
function h(e) {
  h.installed || (h.installed = !0, e.component("SelectSku", V));
}
const O = {
  install: h
};
let d = null;
typeof window < "u" ? d = window.Vue : typeof global < "u" && (d = global.Vue);
d && d.use(O);
export {
  V as default
};
