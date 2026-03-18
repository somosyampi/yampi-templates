(function () { "use strict"; try { if (typeof document < "u") { var t = document.createElement("style"); t.appendChild(document.createTextNode(".button-style .buy-button[data-v-7008d80e]{display:flex;justify-content:center;align-items:center;position:absolute;bottom:var(--grids-products-images-margin);right:var(--grids-products-images-margin);width:46px;height:46px;background-color:var(--add-to-cart-button-color);border:1px solid var(--black-lightest);box-shadow:0 1px 4px #0000000d;border-radius:var(--theme-border-radius);cursor:pointer}.button-style .buy-button-text-icon[data-v-7008d80e]{display:inline-flex;justify-content:center;align-items:center;gap:10px;width:var(--add-to-cart-icon-text-button-width);padding:15px 16px;background-color:var(--add-to-cart-icon-text-button-color);border:1px solid var(--add-to-cart-icon-text-button-border-color);border-radius:var(--theme-border-radius);cursor:pointer;transition:opacity .3s}@media only screen and (min-width: 700px){.button-style .buy-button-text-icon[data-v-7008d80e]:hover{opacity:.8}}.button-style .buy-button-text-icon .text[data-v-7008d80e]{font-size:16px;line-height:15px;font-weight:500;letter-spacing:.04em;color:var(--add-to-cart-icon-text-button-text-color)}.button-style .buy-button-text-icon .icon[data-v-7008d80e]{flex-shrink:0;margin:0}")), document.head.appendChild(t) } } catch (e) { console.error("vite-plugin-css-injected-by-js", e) } })();
import v from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/mixins/product.js";
import y from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/modules/eventBus.js";
function C(s, e, a, l, i, d, f, p) {
    var n = typeof s == "function" ? s.options : s;
    e && (n.render = e, n.staticRenderFns = a, n._compiled = !0), l && (n.functional = !0), d && (n._scopeId = "data-v-" + d);
    var o;
    if (f ? (o = function (t) {
        t = t || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !t && typeof __VUE_SSR_CONTEXT__ < "u" && (t = __VUE_SSR_CONTEXT__), i && i.call(this, t), t && t._registeredComponents && t._registeredComponents.add(f);
    }, n._ssrRegister = o) : i && (o = p ? function () {
        i.call(
            this,
            (n.functional ? this.parent : this).$root.$options.shadowRoot
        );
    } : i), o)
        if (n.functional) {
            n._injectStyles = o;
            var h = n.render;
            n.render = function (m, c) {
                return o.call(c), h(m, c);
            };
        } else {
            var _ = n.beforeCreate;
            n.beforeCreate = _ ? [].concat(_, o) : [o];
        }
    return {
        exports: s,
        options: n
    };
}
const B = {
    name: "BuyButton",
    mixins: [
        v
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
            y.$emit("addToCartClicked", this.validProduct);
        }
    }
};
var b = function () {
    var e = this, a = e._self._c;
    return a("div", { staticClass: "holder-buy-button", class: e.containerClasses }, [a("div", {
        class: e.buyButtonClass, on: {
            click: function (l) {
                return l.stopPropagation(), l.preventDefault(), e.handleClick.apply(null, arguments);
            }
        }
    }, [e._t("default")], 2)]);
}, g = [], T = /* @__PURE__ */ C(
    B,
    b,
    g,
    !1,
    null,
    "7008d80e",
    null,
    null
);
const R = T.exports;
function r(s) {
    r.installed || (r.installed = !0, s.component("BuyButton", R));
}
const $ = {
    install: r
};
let u = null;
typeof window < "u" ? u = window.Vue : typeof global < "u" && (u = global.Vue);
u && u.use($);
export {
    R as default
};
