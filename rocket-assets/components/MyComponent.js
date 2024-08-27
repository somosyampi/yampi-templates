(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode("li[data-v-b97a86db]{margin-left:14px}.holder[data-v-b97a86db]{padding:60px 0;border:1px solid var(--default-background-color);border-radius:var(--theme-border-radius)}")),document.head.appendChild(e)}}catch(d){console.error("vite-plugin-css-injected-by-js",d)}})();
function r(n, e, t, a, m, s, y, b) {
  var o = typeof n == "function" ? n.options : n;
  return e && (o.render = e, o.staticRenderFns = t, o._compiled = !0), o._scopeId = "data-v-" + s, {
    exports: n,
    options: o
  };
}
const u = {
  props: {
    buyButtonText: {
      type: String,
      default: "Comprar agora"
    }
  },
  data() {
    return {
      items: [
        "Apple",
        "Juice",
        "Banana",
        "Orange",
        "Pineapple"
      ]
    };
  },
  methods: {
    handleClick() {
      alert("OlÃ¡ mundo");
    }
  }
};
var d = function() {
  var e = this, t = e._self._c;
  return t("div", { staticClass: "holder" }, [t("ul", e._l(e.items, function(a) {
    return t("li", { key: a }, [e._v(e._s(a))]);
  }), 0), t("LoaderButton", { staticClass: "btn btn-primary", attrs: { title: e.buyButtonText, sending: !1 }, on: { click: e.handleClick } })], 1);
}, c = [], f = /* @__PURE__ */ r(
  u,
  d,
  c,
  !1,
  null,
  "b97a86db"
);
const p = f.exports;
function i(n) {
  i.installed || (i.installed = !0, n.component("MyComponent", p));
}
const _ = {
  install: i
};
let l = null;
typeof window < "u" ? l = window.Vue : typeof global < "u" && (l = global.Vue);
l && l.use(_);