import v from "https://codigo-aberto-production-assets.s3.amazonaws.com/yampi-templates-main/rocket-assets/dist/vendor/mixins/mobile.js";
function g(o, e, n, r, s, u, f, _) {
    var t = typeof o == "function" ? o.options : o;
    e && (t.render = e, t.staticRenderFns = n, t._compiled = !0), r && (t.functional = !0), u && (t._scopeId = "data-v-" + u);
    var i;
    if (f ? (i = function (l) {
        l = l || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !l && typeof __VUE_SSR_CONTEXT__ < "u" && (l = __VUE_SSR_CONTEXT__), s && s.call(this, l), l && l._registeredComponents && l._registeredComponents.add(f);
    }, t._ssrRegister = i) : s && (i = _ ? function () {
        s.call(
            this,
            (t.functional ? this.parent : this).$root.$options.shadowRoot
        );
    } : s), i)
        if (t.functional) {
            t._injectStyles = i;
            var h = t.render;
            t.render = function (m, p) {
                return i.call(p), h(m, p);
            };
        } else {
            var c = t.beforeCreate;
            t.beforeCreate = c ? [].concat(c, i) : [i];
        }
    return {
        exports: o,
        options: t
    };
}
const C = {
    name: "Grid",
    mixins: [
        v
    ],
    props: {
        products: {
            type: Array,
            default: () => []
        },
        carousel: {
            type: Boolean,
            default: !1
        },
        title: {
            type: String,
            default: ""
        },
        link: {
            type: String,
            default: null
        },
        showLink: {
            type: Boolean,
            default: !1
        },
        loading: {
            type: Boolean,
            default: !1
        },
        productsPerLine: {
            type: Number,
            default: 2,
            validator: (o) => [1, 2].includes(o)
        }
    }
};
var b = function () {
    var e = this, n = e._self._c;
    return e.loading || e.products.length > 0 ? n("section", [n("div", { staticClass: "container holder-collection" }, [n("div", { staticClass: "flex -between" }, [n("div", { staticClass: "holder-left flex -vcenter" }, [n("h2", { staticClass: "theme-title collection-name", class: { "-loading": e.loading }, domProps: { textContent: e._s(e.title || "loading collection title") } }), e.isMobile && e.showLink || !e.isMobile && e.link ? n("a", { staticClass: "collection-link", class: { "-loading": e.loading }, attrs: { href: e.link } }, [e._v(" Ver todos ")]) : e._e()])]), n("RocketEmitter", { attrs: { emits: "grids", label: "Vitrine de produtos" } }, [e.products.length ? n("ProductsList", {
        class: { "-carousel": e.carousel }, attrs: { products: e.products, carousel: e.carousel, loading: e.loading, "products-per-line": e.productsPerLine, "is-mobile": e.isMobile }, scopedSlots: e._u([{
            key: "default", fn: function ({ product: r }) {
                return [e._t("default", null, { product: r })];
            }
        }], null, !0)
    }) : e._e()], 1)], 1)]) : e._e();
}, y = [], k = /* @__PURE__ */ g(
    C,
    b,
    y,
    !1,
    null,
    null,
    null,
    null
);
const w = k.exports;
function d(o) {
    d.installed || (d.installed = !0, o.component("Grid", w));
}
const R = {
    install: d
};
let a = null;
typeof window < "u" ? a = window.Vue : typeof global < "u" && (a = global.Vue);
a && a.use(R);
export {
    w as default
};
