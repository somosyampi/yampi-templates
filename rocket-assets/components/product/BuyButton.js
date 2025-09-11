(function () { "use strict"; try { if (typeof document < "u") { var t = document.createElement("style"); t.appendChild(document.createTextNode(".button-style .buy-button[data-v-6ba997ac]{display:flex;justify-content:center;align-items:center;position:absolute;bottom:var(--grids-products-images-margin);right:var(--grids-products-images-margin);width:46px;height:46px;background-color:var(--add-to-cart-button-color);border:1px solid var(--black-lightest);box-shadow:0 1px 4px #0000000d;border-radius:var(--theme-border-radius);cursor:pointer}.button-style .buy-button-text-icon[data-v-6ba997ac]{display:inline-flex;justify-content:center;align-items:center;gap:10px;width:var(--add-to-cart-icon-text-button-width);padding:15px 16px;background-color:var(--add-to-cart-icon-text-button-color);border:1px solid var(--add-to-cart-icon-text-button-border-color);border-radius:var(--theme-border-radius);cursor:pointer;transition:opacity .3s}@media only screen and (min-width: 700px){.button-style .buy-button-text-icon[data-v-6ba997ac]:hover{opacity:.8}}.button-style .buy-button-text-icon .text[data-v-6ba997ac]{font-size:16px;line-height:15px;font-weight:500;letter-spacing:.04em;color:var(--add-to-cart-icon-text-button-text-color)}.button-style .buy-button-text-icon .icon[data-v-6ba997ac]{flex-shrink:0;margin:0}")), document.head.appendChild(t) } } catch (o) { console.error("vite-plugin-css-injected-by-js", o) } })();
import s from "https://openstore-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/mixins/product.js";
import c from "https://openstore-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/modules/eventBus.js";
import r from "https://openstore-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/mixins/tracking/api.js";
function d(n, t, o, i, B, u, h, v) {
    var e = typeof n == "function" ? n.options : n;
    return t && (e.render = t, e.staticRenderFns = o, e._compiled = !0), e._scopeId = "data-v-" + u, {
        exports: n,
        options: e
    };
}
const f = {
    name: "BuyButton",
    mixins: [
        s,
        r
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
            c.$emit("addToCartClicked", this.validProduct), this.handleTrackApi("quick-buy-button-clicked");
        }
    }
};
var p = function () {
    var t = this, o = t._self._c;
    return o("div", { staticClass: "holder-buy-button", class: t.containerClasses }, [o("div", {
        class: t.buyButtonClass, on: {
            click: function (i) {
                return i.stopPropagation(), i.preventDefault(), t.handleClick.apply(null, arguments);
            }
        }
    }, [t._t("default")], 2)]);
}, m = [], y = /* @__PURE__ */ d(
    f,
    p,
    m,
    !1,
    null,
    "6ba997ac"
);
const _ = y.exports;
function l(n) {
    l.installed || (l.installed = !0, n.component("BuyButton", _));
}
const b = {
    install: l
};
let a = null;
typeof window < "u" ? a = window.Vue : typeof global < "u" && (a = global.Vue);
a && a.use(b);
export {
    _ as default
};