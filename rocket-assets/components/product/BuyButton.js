(function () { "use strict"; try { if (typeof document < "u") { var t = document.createElement("style"); t.appendChild(document.createTextNode(".button-style .buy-button[data-v-59f9b959]{display:flex;justify-content:center;align-items:center;position:absolute;bottom:8px;right:8px;width:46px;height:46px;background-color:var(--add-to-cart-button-color);border:1px solid var(--black-lightest);box-shadow:0 1px 4px #0000000d;border-radius:var(--theme-border-radius);cursor:pointer}.button-style .buy-button-text-icon[data-v-59f9b959]{display:inline-flex;justify-content:center;align-items:center;gap:10px;width:var(--add-to-cart-icon-text-button-width);padding:15px 16px;background-color:var(--add-to-cart-icon-text-button-color);border:1px solid var(--add-to-cart-icon-text-button-border-color);border-radius:var(--theme-border-radius);cursor:pointer;transition:opacity .3s}@media only screen and (min-width: 700px){.button-style .buy-button-text-icon[data-v-59f9b959]:hover{opacity:.8}}.button-style .buy-button-text-icon .text[data-v-59f9b959]{font-size:16px;line-height:15px;font-weight:500;letter-spacing:.04em;color:var(--add-to-cart-icon-text-button-text-color)}.button-style .buy-button-text-icon .icon[data-v-59f9b959]{flex-shrink:0;margin:0}")), document.head.appendChild(t) } } catch (o) { console.error("vite-plugin-css-injected-by-js", o) } })();
import m from "https://codigo-aberto-production-assets.s3.amazonaws.com/yampi-templates-main/rocket-assets/dist/vendor/mixins/product.js";
import v from "https://codigo-aberto-production-assets.s3.amazonaws.com/yampi-templates-main/rocket-assets/dist/vendor/modules/eventBus.js";
import b from "https://codigo-aberto-production-assets.s3.amazonaws.com/yampi-templates-main/rocket-assets/dist/vendor/mixins/tracking/api.js";
function C(i, e, a, r, s, f, d, p) {
    var t = typeof i == "function" ? i.options : i;
    e && (t.render = e, t.staticRenderFns = a, t._compiled = !0), r && (t.functional = !0), f && (t._scopeId = "data-v-" + f);
    var o;
    if (d ? (o = function (n) {
        n = n || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !n && typeof __VUE_SSR_CONTEXT__ < "u" && (n = __VUE_SSR_CONTEXT__), s && s.call(this, n), n && n._registeredComponents && n._registeredComponents.add(d);
    }, t._ssrRegister = o) : s && (o = p ? function () {
        s.call(
            this,
            (t.functional ? this.parent : this).$root.$options.shadowRoot
        );
    } : s), o)
        if (t.functional) {
            t._injectStyles = o;
            var h = t.render;
            t.render = function (y, c) {
                return o.call(c), h(y, c);
            };
        } else {
            var _ = t.beforeCreate;
            t.beforeCreate = _ ? [].concat(_, o) : [o];
        }
    return {
        exports: i,
        options: t
    };
}
const B = {
    name: "BuyButton",
    mixins: [
        m,
        b
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
var g = function () {
    var e = this, a = e._self._c;
    return a("div", { staticClass: "holder-buy-button", class: e.containerClasses }, [a("div", {
        class: e.buyButtonClass, on: {
            click: function (r) {
                return r.stopPropagation(), r.preventDefault(), e.handleClick.apply(null, arguments);
            }
        }
    }, [e._t("default")], 2)]);
}, k = [], T = /* @__PURE__ */ C(
    B,
    g,
    k,
    !1,
    null,
    "59f9b959",
    null,
    null
);
const R = T.exports;
function u(i) {
    u.installed || (u.installed = !0, i.component("BuyButton", R));
}
const $ = {
    install: u
};
let l = null;
typeof window < "u" ? l = window.Vue : typeof global < "u" && (l = global.Vue);
l && l.use($);
export {
    R as default
};
