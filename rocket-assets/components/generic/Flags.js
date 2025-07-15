import f from "https://codigo-aberto-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/lodash.js";
import v from "https://codigo-aberto-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/modules/axios/api.js";
import y from "https://codigo-aberto-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/mixins/product.js";
function C(t, a, l, s, i, u, _, p) {
    var e = typeof t == "function" ? t.options : t;
    a && (e.render = a, e.staticRenderFns = l, e._compiled = !0), s && (e.functional = !0), u && (e._scopeId = "data-v-" + u);
    var o;
    if (_ ? (o = function (n) {
        n = n || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !n && typeof __VUE_SSR_CONTEXT__ < "u" && (n = __VUE_SSR_CONTEXT__), i && i.call(this, n), n && n._registeredComponents && n._registeredComponents.add(_);
    }, e._ssrRegister = o) : i && (o = p ? function () {
        i.call(
            this,
            (e.functional ? this.parent : this).$root.$options.shadowRoot
        );
    } : i), o)
        if (e.functional) {
            e._injectStyles = o;
            var h = e.render;
            e.render = function (m, g) {
                return o.call(g), h(m, g);
            };
        } else {
            var c = e.beforeCreate;
            e.beforeCreate = c ? [].concat(c, o) : [o];
        }
    return {
        exports: t,
        options: e
    };
}
const F = {
    name: "Flags",
    mixins: [
        y
    ],
    props: {
        defaultFlags: {
            type: Array,
            default: () => []
        }
    },
    data: () => ({
        flags: [],
        loading: !1
    }),
    mounted() {
        if (!f.isEmpty(this.defaultFlags)) {
            this.flags = this.defaultFlags;
            return;
        }
        const t = f.get(this.validProduct, "flags.data");
        if (!f.isNil(t)) {
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
                if (!this.validProduct)
                    return;
                this.loading = !0;
                const { data: t } = await v.get(`catalog/products/${this.validProduct.id}/flags`);
                this.flags = t.data.filter((a) => a.active);
            } finally {
                this.loading = !1;
            }
        }
    }
};
var $ = function () {
    var a = this, l = a._self._c;
    return a.flags.length ? l("div", { staticClass: "holder-flags", class: { "not-mosaic": !a.$parent.isMosaic } }, a._l(a.flags, function (s) {
        return l("span", { key: s.id, staticClass: "flag", style: a.getStyle(s), domProps: { textContent: a._s(s.name) } });
    }), 0) : a._e();
}, b = [], w = /* @__PURE__ */ C(
    F,
    $,
    b,
    !1,
    null,
    null,
    null,
    null
);
const R = w.exports;
function d(t) {
    d.installed || (d.installed = !0, t.component("Flags", R));
}
const V = {
    install: d
};
let r = null;
typeof window < "u" ? r = window.Vue : typeof global < "u" && (r = global.Vue);
r && r.use(V);
export {
    R as default
};
