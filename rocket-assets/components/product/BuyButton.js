import a from "../vendor/mixins/product.js";
import r from "../vendor/modules/eventBus.js";
import c from "../vendor/mixins/tracking/api.js";
function s(n, t, e, l, b, v, h, k) {
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
  methods: {
    async handleClick() {
      r.$emit("addToCartClicked", this.validProduct), this.handleTrackApi("quick-buy-button-clicked");
    }
  }
};
var f = function() {
  var t = this, e = t._self._c;
  return e("div", { staticClass: "holder-buy-button" }, [e("div", { staticClass: "buy-button", on: { click: function(l) {
    return l.stopPropagation(), l.preventDefault(), t.handleClick.apply(null, arguments);
  } } }, [t._t("buy-button")], 2)]);
}, p = [], m = /* @__PURE__ */ s(
  d,
  f,
  p
);
const _ = m.exports;
function u(n) {
  u.installed || (u.installed = !0, n.component("BuyButton", _));
}
const y = {
  install: u
};
let i = null;
typeof window < "u" ? i = window.Vue : typeof global < "u" && (i = global.Vue);
i && i.use(y);
export {
  _ as default
};
