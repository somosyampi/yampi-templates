import a from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/lodash.js";
import s from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/mixins/mobile.js";
function c(o, e, n, l, m, v, g, _) {
  var t = typeof o == "function" ? o.options : o;
  return e && (t.render = e, t.staticRenderFns = n, t._compiled = !0), {
    exports: o,
    options: t
  };
}
const d = {
  name: "MoleculeShoppingPageRedirect",
  mixins: [
    s
  ],
  props: {
    section: {
      type: String,
      required: !0
    },
    headerIconColor: {
      type: String,
      default: "#333333"
    },
    cartIconColor: {
      type: String,
      default: "#333333"
    }
  },
  data() {
    return {
      visible: !1,
      shopperUrl: this.$shopperUrl(
        a.get(this.$store.getters, "merchant/merchant.checkout.shopper_url"),
        !0
      )
    };
  },
  methods: {
    handleTransition(o) {
      this.isMobile || (o || (this.visible = !this.visible), this.visible = o);
    },
    handleMouseClick() {
      window.location.assign(this.shopperUrl);
    }
  }
};
var p = function() {
  var e = this, n = e._self._c;
  return n("div", { class: `rkt-${e.section}-shopping-page-redirect`, on: { mouseenter: function(l) {
    return e.handleTransition(!0);
  }, mouseleave: function(l) {
    return e.handleTransition(!1);
  }, click: e.handleMouseClick } }, [n("atom-SVG", { attrs: { width: "16", height: "18", fill: e.headerIconColor ? e.headerIconColor : e.cartIconColor } }, [n("path", { attrs: { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M11.5714 12.2C13.9068 12.2 15.8 14.0932 15.8 16.4286C15.8 17.186 15.186 17.8 14.4286 17.8L1.57144 17.8C0.814021 17.8 0.200012 17.186 0.200012 16.4286C0.200012 14.0932 2.09321 12.2 4.42858 12.2L11.5714 12.2ZM14.1902 16.2C14.0744 14.8553 12.9462 13.8 11.5714 13.8H4.42858C3.05387 13.8 1.92564 14.8553 1.80981 16.2L14.1902 16.2Z", fill: e.headerIconColor ? e.headerIconColor : e.cartIconColor } }), n("path", { attrs: { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M8.00001 8.4C9.87778 8.4 11.4 6.87777 11.4 5C11.4 3.12223 9.87778 1.6 8.00001 1.6C6.12224 1.6 4.60001 3.12223 4.60001 5C4.60001 6.87777 6.12224 8.4 8.00001 8.4ZM8.00001 10C10.7614 10 13 7.76142 13 5C13 2.23858 10.7614 0 8.00001 0C5.23859 0 3.00001 2.23858 3.00001 5C3.00001 7.76142 5.23859 10 8.00001 10Z", fill: e.headerIconColor ? e.headerIconColor : e.cartIconColor } })]), n("transition", { attrs: { name: "dropdown" } }, [e.visible ? n("div", { staticClass: "rkt-link-container" }, [n("shopping-page-row", { attrs: { "redirect-to": e.shopperUrl } })], 1) : e._e()])], 1);
}, u = [], h = /* @__PURE__ */ c(
  d,
  p,
  u
);
const f = h.exports;
function i(o) {
  i.installed || (i.installed = !0, o.component("HShoppingPageRedirect", f));
}
const C = {
  install: i
};
let r = null;
typeof window < "u" ? r = window.Vue : typeof global < "u" && (r = global.Vue);
r && r.use(C);
export {
  f as default
};
