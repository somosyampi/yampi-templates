(function () { "use strict"; try { if (typeof document < "u") { var t = document.createElement("style"); t.appendChild(document.createTextNode(".button-style .buy-button[data-v-dcd64d5c]{display:flex;justify-content:center;align-items:center;position:absolute;bottom:8px;right:8px;width:46px;height:46px;background-color:var(--add-to-cart-button-color);border:1px solid var(--black-lightest);box-shadow:0 1px 4px #0000000d;border-radius:var(--theme-border-radius);cursor:pointer}.button-style .buy-button-text-icon[data-v-dcd64d5c]{display:inline-flex;justify-content:center;align-items:center;gap:10px;width:var(--add-to-cart-icon-text-button-width);padding:15px 16px;background-color:var(--add-to-cart-icon-text-button-color);border:1px solid var(--add-to-cart-icon-text-button-border-color);border-radius:var(--theme-border-radius);cursor:pointer;transition:opacity .3s}@media only screen and (min-width: 700px){.button-style .buy-button-text-icon[data-v-dcd64d5c]:hover{opacity:.8}}.button-style .buy-button-text-icon .text[data-v-dcd64d5c]{font-size:16px;line-height:15px;font-weight:500;letter-spacing:.04em;color:var(--add-to-cart-icon-text-button-text-color)}.button-style .buy-button-text-icon .icon[data-v-dcd64d5c]{flex-shrink:0;margin:0}")), document.head.appendChild(t) } } catch (o) { console.error("vite-plugin-css-injected-by-js", o) } })();
import m from "https://codigo-aberto-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/mixins/product.js";
import v from "https://codigo-aberto-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/modules/eventBus.js";
import C from "https://codigo-aberto-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/mixins/tracking/api.js";
function b(i, e, a, l, s, d, f, p) {
    var t = typeof i == "function" ? i.options : i;
    e && (t.render = e, t.staticRenderFns = a, t._compiled = !0), l && (t.functional = !0), d && (t._scopeId = "data-v-" + d);
    var o;
    if (f ? (o = function (n) {
        n = n || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !n && typeof __VUE_SSR_CONTEXT__ < "u" && (n = __VUE_SSR_CONTEXT__), s && s.call(this, n), n && n._registeredComponents && n._registeredComponents.add(f);
    }, t._ssrRegister = o) : s && (o = p ? function () {
        s.call(
            this,
            (t.functional ? this.parent : this).$root.$options.shadowRoot
        );
    } : s), o)
        if (t.functional) {
            t._injectStyles = o;
            var h = t.render;
            t.render = function (y, _) {
                return o.call(_), h(y, _);
            };
        } else {
            var c = t.beforeCreate;
            t.beforeCreate = c ? [].concat(c, o) : [o];
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
        C
    ],
    props: {
        isTextAndIconButton: {
            type: Boolean,
            default: !1
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
                click: function (l) {
                    return l.stopPropagation(), l.preventDefault(), e.handleClick.apply(null, arguments);
                }
            }
        }, [e._t("default")], 2)]);
    }, k =[], T = /* @__PURE__ */ b(
        B,
        g,
        k,
        !1,
        null,
        "dcd64d5c",
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
let r = null;
typeof window < "u" ? r = window.Vue : typeof global < "u" && (r = global.Vue);
r && r.use($);
export {
    R as default
};
