import { mapMutations as y } from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/vuex.js";
import v from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/components/product/BaseProduct.js";
function b(n, e, a, l, r, d, f, _) {
  var t = typeof n == "function" ? n.options : n;
  e && (t.render = e, t.staticRenderFns = a, t._compiled = !0), l && (t.functional = !0), d && (t._scopeId = "data-v-" + d);
  var i;
  if (f ? (i = function(o) {
    o = o || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !o && typeof __VUE_SSR_CONTEXT__ < "u" && (o = __VUE_SSR_CONTEXT__), r && r.call(this, o), o && o._registeredComponents && o._registeredComponents.add(f);
  }, t._ssrRegister = i) : r && (i = _ ? function() {
    r.call(
      this,
      (t.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : r), i)
    if (t.functional) {
      t._injectStyles = i;
      var h = t.render;
      t.render = function(m, p) {
        return i.call(p), h(m, p);
      };
    } else {
      var c = t.beforeCreate;
      t.beforeCreate = c ? [].concat(c, i) : [i];
    }
  return {
    exports: n,
    options: t
  };
}
const g = {
  name: "ProductCombos",
  extends: v,
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
    route: "combos?expired=false"
  }),
  watch: {
    payload(n) {
      this.SET_COMBOS(n);
    }
  },
  methods: {
    ...y("buyTogether", ["SET_COMBOS"])
  }
};
var C = function() {
  var e = this, a = e._self._c;
  return e.payload.length || e.loading ? a("section", { directives: [{ name: "observe-visibility", rawName: "v-observe-visibility", value: {
    callback: e.visibilityChanged,
    once: !0
  }, expression: `{
        callback: visibilityChanged,
        once: true,
    }` }], staticClass: "buy-together container" }, [a("div", { staticClass: "theme-title", class: { "-loading": e.loading } }, [e._v(" " + e._s(e.title) + " ")]), e._l(e.payload, function(l) {
    return a("Combo", { key: l.id, attrs: { combo: l, "buy-button-text": e.buyButtonText, "show-modal-after-purchase": e.showModalAfterPurchase, center: e.center, "highlight-type-payment": e.highlightTypePayment } });
  })], 2) : e._e();
}, T = [], w = /* @__PURE__ */ b(
  g,
  C,
  T,
  !1,
  null,
  null,
  null,
  null
);
const S = w.exports;
function u(n) {
  u.installed || (u.installed = !0, n.component("ProductCombos", S));
}
const B = {
  install: u
};
let s = null;
typeof window < "u" ? s = window.Vue : typeof global < "u" && (s = global.Vue);
s && s.use(B);
export {
  S as default
};
