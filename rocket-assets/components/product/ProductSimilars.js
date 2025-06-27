import h from "https://codigo-aberto-production-assets.s3.amazonaws.com/yampi-templates-main/rocket-assets/components/product/BaseProduct.js";
function b(n, e, l, s, r, d, c, _) {
    var t = typeof n == "function" ? n.options : n;
    e && (t.render = e, t.staticRenderFns = l, t._compiled = !0), s && (t.functional = !0), d && (t._scopeId = "data-v-" + d);
    var o;
    if (c ? (o = function (i) {
        i = i || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !i && typeof __VUE_SSR_CONTEXT__ < "u" && (i = __VUE_SSR_CONTEXT__), r && r.call(this, i), i && i._registeredComponents && i._registeredComponents.add(c);
    }, t._ssrRegister = o) : r && (o = _ ? function () {
        r.call(
            this,
            (t.functional ? this.parent : this).$root.$options.shadowRoot
        );
    } : r), o)
        if (t.functional) {
            t._injectStyles = o;
            var m = t.render;
            t.render = function (v, p) {
                return o.call(p), m(v, p);
            };
        } else {
            var f = t.beforeCreate;
            t.beforeCreate = f ? [].concat(f, o) : [o];
        }
    return {
        exports: n,
        options: t
    };
}
const y = {
    name: "ProductSimilars",
    extends: h,
    props: {
        desktopLayout: {
            type: String,
            default: "grid",
            validator: (n) => ["grid", "carousel"].includes(n)
        },
        title: {
            type: String,
            default: ""
        },
        productsPerLine: {
            type: Number,
            default: 2,
            validator: (n) => [1, 2].includes(n)
        }
    },
    data: () => ({
        route: "similars",
        completed: !1,
        queryParams: {
            cart_token: window.Yampi.cart_token
        }
    }),
    computed: {
        isCarousel() {
            return this.desktopLayout === "carousel";
        }
    },
    mounted() {
        this.completed = !0;
    }
};
var C = function () {
    var e = this, l = e._self._c;
    return l("Grid", {
        directives: [{
            name: "observe-visibility", rawName: "v-observe-visibility", value: {
                callback: e.visibilityChanged,
                once: !0
            }, expression: `{
        callback: visibilityChanged,
        once: true,
    }` }], class: { completed: e.completed, "has-carousel": e.isCarousel }, attrs: { title: e.title, loading: e.loading, products: e.payload, "products-per-line": e.productsPerLine, carousel: e.isCarousel }, scopedSlots: e._u([{
                key: "default", fn: function ({ product: s }) {
                    return [e._t("default", null, { product: s })];
                }
            }], null, !0)
    });
}, g = [], k = /* @__PURE__ */ b(
    y,
    C,
    g,
    !1,
    null,
    null,
    null,
    null
);
const w = k.exports;
function u(n) {
    u.installed || (u.installed = !0, n.component("ProductSimilars", w));
}
const S = {
    install: u
};
let a = null;
typeof window < "u" ? a = window.Vue : typeof global < "u" && (a = global.Vue);
a && a.use(S);
export {
    w as default
};
