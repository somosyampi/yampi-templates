import { mapGetters as v } from "https://codigo-aberto-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/vuex.js";
function g(o, r, t, s, i, l, d, h) {
    var e = typeof o == "function" ? o.options : o;
    r && (e.render = r, e.staticRenderFns = t, e._compiled = !0), s && (e.functional = !0), l && (e._scopeId = "data-v-" + l);
    var n;
    if (d ? (n = function (a) {
        a = a || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !a && typeof __VUE_SSR_CONTEXT__ < "u" && (a = __VUE_SSR_CONTEXT__), i && i.call(this, a), a && a._registeredComponents && a._registeredComponents.add(d);
    }, e._ssrRegister = n) : i && (n = h ? function () {
        i.call(
            this,
            (e.functional ? this.parent : this).$root.$options.shadowRoot
        );
    } : i), n)
        if (e.functional) {
            e._injectStyles = n;
            var m = e.render;
            e.render = function (_, f) {
                return n.call(f), m(_, f);
            };
        } else {
            var p = e.beforeCreate;
            e.beforeCreate = p ? [].concat(p, n) : [n];
        }
    return {
        exports: o,
        options: e
    };
}
const C = {
    name: "SearchBar",
    data: () => ({
        productName: ""
    }),
    computed: {
        ...v("header", [
            "showSearchBar"
        ])
    },
    mounted() {
        this.parseQueryString();
    },
    methods: {
        search() {
            !this.productName.length || this.$redirectTo(this.$applyQueriesToUrl(
                `${this.$baseUrl}/busca`,
                { q: this.productName }
            ));
        },
        parseQueryString() {
            this.productName = new URLSearchParams(window.location.search).get("q") || "";
        }
    }
};
var b = function () {
    var r = this, t = r._self._c;
    return t("Transition", { attrs: { name: "fadeHeight" } }, [r.showSearchBar ? t("div", [t("form", {
        staticClass: "search-bar", attrs: { id: "product-search", role: "search", action: "/busca" }, on: {
            submit: function (s) {
                return s.preventDefault(), r.search.apply(null, arguments);
            }
        }
    }, [t("label", { staticClass: "-hide", attrs: { for: "product-name" } }, [r._v("Busca")]), t("input", {
        directives: [{ name: "model", rawName: "v-model", value: r.productName, expression: "productName" }], attrs: { id: "product-name", type: "text", name: "product-name", placeholder: "Buscar produto" }, domProps: { value: r.productName }, on: {
            input: function (s) {
                s.target.composing || (r.productName = s.target.value);
            }
        }
    }), t("span", { staticClass: "search-btn", on: { click: r.search } }, [t("i", { staticClass: "icon icon-search" })])])]) : r._e()]);
}, w = [], N = /* @__PURE__ */ g(
    C,
    b,
    w,
    !1,
    null,
    null,
    null,
    null
);
const S = N.exports;
function c(o) {
    c.installed || (c.installed = !0, o.component("SearchBar", S));
}
const $ = {
    install: c
};
let u = null;
typeof window < "u" ? u = window.Vue : typeof global < "u" && (u = global.Vue);
u && u.use($);
export {
    S as default
};
