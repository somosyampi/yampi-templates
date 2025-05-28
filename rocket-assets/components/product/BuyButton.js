(function(){"use strict";try{if(typeof document<"u"){var t=document.createElement("style");t.appendChild(document.createTextNode(".button-style .buy-button[data-v-1274c1f2]{display:flex;justify-content:center;align-items:center;position:absolute;bottom:8px;right:8px;width:46px;height:46px;background-color:var(--add-to-cart-button-color);border:1px solid var(--black-lightest);box-shadow:0 1px 4px #0000000d;border-radius:var(--theme-border-radius);cursor:pointer}.button-style .buy-button-text-icon[data-v-1274c1f2]{display:inline-flex;justify-content:center;align-items:center;gap:10px;width:var(--add-to-cart-icon-text-button-width);padding:15px 16px;background-color:var(--add-to-cart-icon-text-button-color);border:1px solid var(--add-to-cart-icon-text-button-border-color);border-radius:var(--theme-border-radius);cursor:pointer;transition:opacity .3s}@media only screen and (min-width: 700px){.button-style .buy-button-text-icon[data-v-1274c1f2]:hover{opacity:.8}}.button-style .buy-button-text-icon .text[data-v-1274c1f2]{font-size:16px;line-height:15px;font-weight:500;letter-spacing:.04em;color:var(--add-to-cart-icon-text-button-text-color)}.button-style .buy-button-text-icon .icon[data-v-1274c1f2]{flex-shrink:0;margin:0}")),document.head.appendChild(t)}}catch(o){console.error("vite-plugin-css-injected-by-js",o)}})();
import y from "https://images-dev.yampi.me/rocket-sandbox/b/01/dist/vendor/mixins/product.js";
import v from "https://images-dev.yampi.me/rocket-sandbox/b/01/dist/vendor/modules/eventBus.js";
import C from "https://images-dev.yampi.me/rocket-sandbox/b/01/dist/vendor/mixins/tracking/api.js";
function b(i, e, a, l, s, f, d, p) {
  var n = typeof i == "function" ? i.options : i;
  e && (n.render = e, n.staticRenderFns = a, n._compiled = !0), l && (n.functional = !0), f && (n._scopeId = "data-v-" + f);
  var o;
  if (d ? (o = function(t) {
    t = t || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !t && typeof __VUE_SSR_CONTEXT__ < "u" && (t = __VUE_SSR_CONTEXT__), s && s.call(this, t), t && t._registeredComponents && t._registeredComponents.add(d);
  }, n._ssrRegister = o) : s && (o = p ? function() {
    s.call(
      this,
      (n.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : s), o)
    if (n.functional) {
      n._injectStyles = o;
      var h = n.render;
      n.render = function(m, _) {
        return o.call(_), h(m, _);
      };
    } else {
      var c = n.beforeCreate;
      n.beforeCreate = c ? [].concat(c, o) : [o];
    }
  return {
    exports: i,
    options: n
  };
}
const B = {
  name: "BuyButton",
  mixins: [
    y,
    C
  ],
  props: {
    isTextAndIconButton: {
      type: Boolean,
      default: !1
    },
    hasButtonStyle: {
      type: Boolean,
      default: !1
    }
  },
  computed: {
    containerClasses() {
      return {
        "button-style": this.hasButtonStyle
      };
    },
    buyButtonClass() {
      return this.isTextAndIconButton ? "buy-button-text-icon" : "buy-button";
    }
  },
  methods: {
    async handleClick() {
      v.$emit("addToCartClicked", this.validProduct), this.handleTrackApi("quick-buy-button-clicked");
    }
  }
};
var k = function() {
  var e = this, a = e._self._c;
  return a("div", { staticClass: "holder-buy-button", class: e.containerClasses }, [a("div", { class: e.buyButtonClass, on: { click: function(l) {
    return l.stopPropagation(), l.preventDefault(), e.handleClick.apply(null, arguments);
  } } }, [e._t("default")], 2)]);
}, g = [], T = /* @__PURE__ */ b(
  B,
  k,
  g,
  !1,
  null,
  "1274c1f2",
  null,
  null
);
const w = T.exports;
function u(i) {
  u.installed || (u.installed = !0, i.component("BuyButton", w));
}
const R = {
  install: u
};
let r = null;
typeof window < "u" ? r = window.Vue : typeof global < "u" && (r = global.Vue);
r && r.use(R);
export {
  w as default
};
