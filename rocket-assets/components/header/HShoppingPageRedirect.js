import v from "https://openstore-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/lodash.js";
import m from "https://openstore-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/mixins/mobile.js";
function g(o, e, r, s, l, c, f, p) {
    var n = typeof o == "function" ? o.options : o;
    e && (n.render = e, n.staticRenderFns = r, n._compiled = !0), s && (n.functional = !0), c && (n._scopeId = "data-v-" + c);
    var t;
    if (f ? (t = function (i) {
        i = i || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !i && typeof __VUE_SSR_CONTEXT__ < "u" && (i = __VUE_SSR_CONTEXT__), l && l.call(this, i), i && i._registeredComponents && i._registeredComponents.add(f);
    }, n._ssrRegister = t) : l && (t = p ? function () {
        l.call(
            this,
            (n.functional ? this.parent : this).$root.$options.shadowRoot
        );
    } : l), t)
        if (n.functional) {
            n._injectStyles = t;
            var C = n.render;
            n.render = function (_, h) {
                return t.call(h), C(_, h);
            };
        } else {
            var u = n.beforeCreate;
            n.beforeCreate = u ? [].concat(u, t) : [t];
        }
    return {
        exports: o,
        options: n
    };
}
const b = {
    name: "HShoppingPageRedirect",
    mixins: [
        m
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
                v.get(this.$store.getters, "merchant/merchant.checkout.shopper_url"),
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
var I = function () {
    var e = this, r = e._self._c;
    return r("div", {
        class: `rkt-${e.section}-shopping-page-redirect`, on: {
            mouseenter: function (s) {
                return e.handleTransition(!0);
            }, mouseleave: function (s) {
                return e.handleTransition(!1);
            }, click: e.handleMouseClick
        }
    }, [r("AtomSVG", { attrs: { width: "16", height: "18", fill: e.headerIconColor ? e.headerIconColor : e.cartIconColor } }, [r("path", { attrs: { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M11.5714 12.2C13.9068 12.2 15.8 14.0932 15.8 16.4286C15.8 17.186 15.186 17.8 14.4286 17.8L1.57144 17.8C0.814021 17.8 0.200012 17.186 0.200012 16.4286C0.200012 14.0932 2.09321 12.2 4.42858 12.2L11.5714 12.2ZM14.1902 16.2C14.0744 14.8553 12.9462 13.8 11.5714 13.8H4.42858C3.05387 13.8 1.92564 14.8553 1.80981 16.2L14.1902 16.2Z", fill: e.headerIconColor ? e.headerIconColor : e.cartIconColor } }), r("path", { attrs: { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M8.00001 8.4C9.87778 8.4 11.4 6.87777 11.4 5C11.4 3.12223 9.87778 1.6 8.00001 1.6C6.12224 1.6 4.60001 3.12223 4.60001 5C4.60001 6.87777 6.12224 8.4 8.00001 8.4ZM8.00001 10C10.7614 10 13 7.76142 13 5C13 2.23858 10.7614 0 8.00001 0C5.23859 0 3.00001 2.23858 3.00001 5C3.00001 7.76142 5.23859 10 8.00001 10Z", fill: e.headerIconColor ? e.headerIconColor : e.cartIconColor } })]), r("Transition", { attrs: { name: "dropdown" } }, [e.visible ? r("div", { staticClass: "rkt-link-container" }, [r("ShoppingPageRow", { attrs: { "redirect-to": e.shopperUrl } })], 1) : e._e()])], 1);
}, $ = [], w = /* @__PURE__ */ g(
    b,
    I,
    $,
    !1,
    null,
    null,
    null,
    null
);
const R = w.exports;
function d(o) {
    d.installed || (d.installed = !0, o.component("HShoppingPageRedirect", R));
}
const S = {
    install: d
};
let a = null;
typeof window < "u" ? a = window.Vue : typeof global < "u" && (a = global.Vue);
a && a.use(S);
export {
    R as default
};
