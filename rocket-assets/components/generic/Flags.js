import d from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/lodash.js";
import v from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/modules/axios/api.js";
import y from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/mixins/product.js";
import C from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/mixins/cache.js";
function S(t, e, i, n, l, u, c, _) {
    var a = typeof t == "function" ? t.options : t;
    e && (a.render = e, a.staticRenderFns = i, a._compiled = !0), n && (a.functional = !0), u && (a._scopeId = "data-v-" + u);
    var o;
    if (c ? (o = function (s) {
        s = s || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !s && typeof __VUE_SSR_CONTEXT__ < "u" && (s = __VUE_SSR_CONTEXT__), l && l.call(this, s), s && s._registeredComponents && s._registeredComponents.add(c);
    }, a._ssrRegister = o) : l && (o = _ ? function () {
        l.call(
            this,
            (a.functional ? this.parent : this).$root.$options.shadowRoot
        );
    } : l), o)
        if (a.functional) {
            a._injectStyles = o;
            var p = a.render;
            a.render = function (m, h) {
                return o.call(h), p(m, h);
            };
        } else {
            var g = a.beforeCreate;
            a.beforeCreate = g ? [].concat(g, o) : [o];
        }
    return {
        exports: t,
        options: a
    };
}
const F = {
    name: "Flags",
    mixins: [
        y,
        C
    ],
    props: {
        defaultFlags: {
            type: Array,
            default: () => []
        },
        productId: {
            type: [Number, String],
            default: null
        }
    },
    data: () => ({
        flags: [],
        loading: !1
    }),
    computed: {
        shouldUseNewSearchStrategy() {
            const { new_search: t } = this.$store.getters["merchant/storeModules"];
            return t;
        }
    },
    mounted() {
        if (!d.isEmpty(this.defaultFlags)) {
            this.flags = this.defaultFlags;
            return;
        }
        const t = d.get(this.validProduct, "flags.data");
        if (!d.isNil(t)) {
            this.flags = t;
            return;
        }
        this.loadFlags();
    },
    methods: {
        getStyle(t) {
            return {
                "--flag-color": t.text_color,
                "--flag-bg-color": t.background_color
            };
        },
        async loadFlags() {
            try {
                if (!this.validProduct && !this.shouldUseNewSearchStrategy)
                    return;
                this.loading = !0;
                const t = this.productId || this.validProduct.id, e = this.getLocalStorageCache({ itemId: t, itemAlias: "flags" });
                if (e) {
                    this.flags = e, this.loading = !1;
                    return;
                }
                const { data: i } = await v.get(`catalog/products/${t}/flags`);
                this.flags = i.data, this.setLocalStorageCache({ itemId: t, data: this.flags, itemAlias: "flags" });
            } finally {
                this.loading = !1;
            }
        }
    }
};
var w = function () {
    var e = this, i = e._self._c;
    return e.flags.length ? i("div", { staticClass: "holder-flags", class: { "not-mosaic": !e.$parent.isMosaic } }, e._l(e.flags, function (n) {
        return i("span", { key: n.id, staticClass: "flag", style: e.getStyle(n), domProps: { textContent: e._s(n.name) } });
    }), 0) : e._e();
}, $ = [], b = /* @__PURE__ */ S(
    F,
    w,
    $,
    !1,
    null,
    null,
    null,
    null
);
const N = b.exports;
function f(t) {
    f.installed || (f.installed = !0, t.component("Flags", N));
}
const R = {
    install: f
};
let r = null;
typeof window < "u" ? r = window.Vue : typeof global < "u" && (r = global.Vue);
r && r.use(R);
export {
    N as default
};
