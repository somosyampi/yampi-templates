import a from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/mixins/product.js";
import s from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/modules/eventBus.js";
import c from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/mixins/tracking/api.js";
function r(n, t, e, u, _, B, h, v) {
  var o = typeof n == "function" ? n.options : n;
  return t && (o.render = t, o.staticRenderFns = e, o._compiled = !0), {
    exports: n,
    options: o
  };
}
const d = {
  name: "BuyButton",
  mixins: [
    a,
    c
  ],
  props: {
    isTextAndIconButton: {
      type: Boolean,
      default: !1
    }
  },
  computed: {
    buyButtonClass() {
      return this.isTextAndIconButton ? "buy-button-text-icon" : "buy-button";
    }
  },
  methods: {
    async handleClick() {
      s.$emit("addToCartClicked", this.validProduct), this.handleTrackApi("quick-buy-button-clicked");
    }
  }
};
var f = function() {
  var t = this, e = t._self._c;
  return e("div", { staticClass: "holder-buy-button" }, [e("div", { class: t.buyButtonClass, on: { click: function(u) {
    return u.stopPropagation(), u.preventDefault(), t.handleClick.apply(null, arguments);
  } } }, [t._t("buy-button"), t._t("buy-button-text-icon")], 2)]);
}, p = [], m = /* @__PURE__ */ r(
  d,
  f,
  p
);
const y = m.exports;
function l(n) {
  l.installed || (l.installed = !0, n.component("BuyButton", y));
}
const b = {
  install: l
};
let i = null;
typeof window < "u" ? i = window.Vue : typeof global < "u" && (i = global.Vue);
i && i.use(b);
export {
  y as default
};
