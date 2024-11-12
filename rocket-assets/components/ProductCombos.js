import { mapMutations as l } from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/vuex.js";
import s from "https://s3.amazonaws.com/codigo-aberto-sandbox-assets/yampi-templates-sandbox/rocket-assets/components/product/BaseProduct.js";
function u(t, e, o, i, b, h, _, g) {
  var n = typeof t == "function" ? t.options : t;
  return e && (n.render = e, n.staticRenderFns = o, n._compiled = !0), {
    exports: t,
    options: n
  };
}
const d = {
  name: "ProductCombos",
  extends: s,
  props: {
    title: {
      type: String,
      default: "Compre junto e economize"
    },
    buyButtonText: {
      type: String,
      default: "Comprar"
    },
    showModalAfterPurchase: {
      type: Boolean,
      default: !1
    },
    center: {
      type: Boolean,
      default: !1
    },
    highlightTypePayment: {
      type: String,
      default: "promotional"
    }
  },
  data: () => ({
    route: "combos?expired=false",
    currentComboId: ""
  }),
  watch: {
    payload(t) {
      this.SET_COMBOS(t);
    }
  },
  methods: {
    ...l("buyTogether", ["SET_COMBOS"]),
    updateComboKey(t) {
      this.currentComboId = t;
    }
  }
};
var c = function() {
  var e = this, o = e._self._c;
  return e.payload.length || e.loading ? o("section", { directives: [{ name: "observe-visibility", rawName: "v-observe-visibility", value: {
    callback: e.visibilityChanged,
    once: !0
  }, expression: `{
        callback: visibilityChanged,
        once: true,
    }` }], staticClass: "buy-together container" }, [o("div", { staticClass: "theme-title", class: { "-loading": e.loading } }, [e._v(" " + e._s(e.title) + " ")]), e._l(e.payload, function(i) {
    return o("Combo", { key: i.id, attrs: { "current-combo-key": e.currentComboId, combo: i, "buy-button-text": e.buyButtonText, "show-modal-after-purchase": e.showModalAfterPurchase, center: e.center, "highlight-type-payment": e.highlightTypePayment }, on: { updateCurrentComboKey: e.updateComboKey } });
  })], 2) : e._e();
}, m = [], p = /* @__PURE__ */ u(
  d,
  c,
  m
);
const f = p.exports;
function r(t) {
  r.installed || (r.installed = !0, t.component("ProductCombos", f));
}
const y = {
  install: r
};
let a = null;
typeof window < "u" ? a = window.Vue : typeof global < "u" && (a = global.Vue);
a && a.use(y);
export {
  f as default
};