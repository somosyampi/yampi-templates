import { mapMutations as b } from "https://codigo-aberto-sandbox-assets.yampi.io.s3.amazonaws.com/yampi-templates-sandbox/rocket-assets/dist/vendor/vuex.js";
import y from "https://codigo-aberto-sandbox-assets.yampi.io.s3.amazonaws.com/yampi-templates-sandbox/rocket-assets/components/product/BaseProduct.js";
function C(o, e, i, l, r, d, f, h) {
    var t = typeof o == "function" ? o.options : o;
    e && (t.render = e, t.staticRenderFns = i, t._compiled = !0), l && (t.functional = !0), d && (t._scopeId = "data-v-" + d);
    var a;
    if (f ? (a = function (n) {
        n = n || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !n && typeof __VUE_SSR_CONTEXT__ < "u" && (n = __VUE_SSR_CONTEXT__), r && r.call(this, n), n && n._registeredComponents && n._registeredComponents.add(f);
    }, t._ssrRegister = a) : r && (a = h ? function () {
        r.call(
            this,
            (t.functional ? this.parent : this).$root.$options.shadowRoot
        );
    } : r), a)
        if (t.functional) {
            t._injectStyles = a;
            var m = t.render;
            t.render = function (_, p) {
                return a.call(p), m(_, p);
            };
        } else {
            var c = t.beforeCreate;
            t.beforeCreate = c ? [].concat(c, a) : [a];
        }
    return {
        exports: o,
        options: t
    };
}
const v = {
    name: "ProductCombos",
    extends: y,
    props: {
        title: {
            type: String,
            default: "Compre junto e economize"
        },
        buyButtonText: {
            type: String,
            default: "Comprar"
        },
        showModalAfterPurchase: {
            type: Boolean,
            default: !1
        },
        center: {
            type: Boolean,
            default: !1
        },
        highlightTypePayment: {
            type: String,
            default: "promotional"
        }
    },
    data: () => ({
        route: "combos?expired=false",
        currentComboId: ""
    }),
    watch: {
        payload(o) {
            this.SET_COMBOS(o);
        }
    },
    methods: {
        ...b("buyTogether", ["SET_COMBOS"]),
        updateComboKey(o) {
            this.currentComboId = o;
        }
    }
};
var g = function () {
    var e = this, i = e._self._c;
    return e.payload.length || e.loading ? i("section", {
        directives: [{
            name: "observe-visibility", rawName: "v-observe-visibility", value: {
                callback: e.visibilityChanged,
                once: !0
            }, expression: `{
        callback: visibilityChanged,
        once: true,
    }` }], staticClass: "buy-together container"
    }, [i("div", { staticClass: "theme-title", class: { "-loading": e.loading } }, [e._v(" " + e._s(e.title) + " ")]), e._l(e.payload, function (l) {
        return i("Combo", { key: l.id, attrs: { "current-combo-key": e.currentComboId, combo: l, "buy-button-text": e.buyButtonText, "show-modal-after-purchase": e.showModalAfterPurchase, center: e.center, "highlight-type-payment": e.highlightTypePayment }, on: { updateCurrentComboKey: e.updateComboKey } });
    })], 2) : e._e();
}, T = [], w = /* @__PURE__ */ C(
    v,
    g,
    T,
    !1,
    null,
    null,
    null,
    null
);
const S = w.exports;
function u(o) {
    u.installed || (u.installed = !0, o.component("ProductCombos", S));
}
const B = {
    install: u
};
let s = null;
typeof window < "u" ? s = window.Vue : typeof global < "u" && (s = global.Vue);
s && s.use(B);
export {
    S as default
};
