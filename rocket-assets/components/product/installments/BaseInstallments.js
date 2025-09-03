import f from "https://openstore-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/lodash.js";
import C from "https://openstore-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/modules/axios/api.js";
import S from "https://openstore-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/mixins/product.js";
import v from "https://openstore-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/mixins/merchant.js";
function w(e, a, i, n, o, l, c, u) {
    var t = typeof e == "function" ? e.options : e;
    a && (t.render = a, t.staticRenderFns = i, t._compiled = !0), n && (t.functional = !0), l && (t._scopeId = "data-v-" + l);
    var s;
    if (c ? (s = function (r) {
        r = r || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !r && typeof __VUE_SSR_CONTEXT__ < "u" && (r = __VUE_SSR_CONTEXT__), o && o.call(this, r), r && r._registeredComponents && r._registeredComponents.add(c);
    }, t._ssrRegister = s) : o && (s = u ? function () {
        o.call(
            this,
            (t.functional ? this.parent : this).$root.$options.shadowRoot
        );
    } : o), s)
        if (t.functional) {
            t._injectStyles = s;
            var _ = t.render;
            t.render = function (m, p) {
                return s.call(p), _(m, p);
            };
        } else {
            var g = t.beforeCreate;
            t.beforeCreate = g ? [].concat(g, s) : [s];
        }
    return {
        exports: e,
        options: t
    };
}
const $ = {
    name: "BaseInstallments",
    mixins: [S, v],
    data: () => ({
        installments: {},
        loading: !1
    }),
    methods: {
        setLocalStorageCache(e, a, i) {
            const n = window.localStorage, o = window.Yampi.cache.js || 10;
            if (!n)
                return null;
            a.expire_at = new Date().getTime() + o * 6e4, n.setItem(
                this.getLocalStorageCacheKey(e, i),
                JSON.stringify(a)
            );
        },
        getLocalStorageCache(e, a) {
            const i = window.localStorage;
            if (!i)
                return null;
            const n = JSON.parse(
                i.getItem(this.getLocalStorageCacheKey(e, a))
            ) || {};
            return (n.expire_at || 0) < new Date().getTime() ? null : n;
        },
        getLocalStorageCacheKey(e, a) {
            var n;
            const i = a || ((n = this.defaultCard) == null ? void 0 : n.alias);
            return i ? `installments_${i}_${e}` : null;
        },
        async handleInstallments(e) {
            var t;
            const a = e || ((t = this.defaultCard) == null ? void 0 : t.alias);
            if (!a)
                return {};
            const i = this.isSku && f.get(this.validSku, "id") ? this.validSku : void 0, n = f.get(
                i || this.validProduct,
                "prices.data.price"
            ), o = f.get(this.validProduct, "id"), l = this.getLocalStorageCache(n, e);
            if (l)
                return this.loading = !1, l;
            if (!n || !o)
                return this.loading = !1, {};
            this.loading = !0;
            const c = this.$applyQueriesToUrl(
                `catalog/products/${o}/installments`,
                {
                    amount: n,
                    brand: a
                }
            ), { data: u } = await C.get(c);
            return this.setLocalStorageCache(
                n,
                u.data,
                e
            ), u.data;
        }
    }
}, y = null, L = null;
var T = /* @__PURE__ */ w(
    $,
    y,
    L,
    !1,
    null,
    null,
    null,
    null
);
const b = T.exports;
function h(e) {
    h.installed || (h.installed = !0, e.component("BaseInstallments", b));
}
const I = {
    install: h
};
let d = null;
typeof window < "u" ? d = window.Vue : typeof global < "u" && (d = global.Vue);
d && d.use(I);
export {
    b as default
};
