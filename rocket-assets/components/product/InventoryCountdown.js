import v from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/lodash.js";
function C(a, n, e, _, i, u, d, p) {
    var t = typeof a == "function" ? a.options : a;
    n && (t.render = n, t.staticRenderFns = e, t._compiled = !0), _ && (t.functional = !0), u && (t._scopeId = "data-v-" + u);
    var s;
    if (d ? (s = function (o) {
        o = o || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !o && typeof __VUE_SSR_CONTEXT__ < "u" && (o = __VUE_SSR_CONTEXT__), i && i.call(this, o), o && o._registeredComponents && o._registeredComponents.add(d);
    }, t._ssrRegister = s) : i && (s = p ? function () {
        i.call(
            this,
            (t.functional ? this.parent : this).$root.$options.shadowRoot
        );
    } : i), s)
        if (t.functional) {
            t._injectStyles = s;
            var h = t.render;
            t.render = function (m, f) {
                return s.call(f), h(m, f);
            };
        } else {
            var c = t.beforeCreate;
            t.beforeCreate = c ? [].concat(c, s) : [s];
        }
    return {
        exports: a,
        options: t
    };
}
const w = {
    name: "InventoryCountdown",
    data: () => ({
        actual: 12,
        start: 12,
        max: 48,
        min: 2,
        timeout: 1e4
    }),
    computed: {
        barStyle() {
            return {
                width: `${10 + v.round(this.actual / this.max * 100, 2)}%`
            };
        }
    },
    mounted() {
        this.runCountdown();
    },
    methods: {
        runCountdown() {
            const a = (this.start - this.actual + 1) * this.timeout;
            setTimeout(() => {
                this.actual--, this.actual > this.min && this.runCountdown();
            }, a);
        }
    }
};
var b = function () {
    var n = this, e = n._self._c;
    return e("div", { staticClass: "main-product-inventory-countdown" }, [e("div", { staticClass: "quantity-left-text" }, [n._v(" Apenas "), e("span", { staticClass: "quantity-left", domProps: { textContent: n._s(n.actual) } }), n._v(" produtos "), e("span", { staticClass: "inline-block" }, [n._v(" em estoque ")])]), e("div", { staticClass: "percentage-bar-holder" }, [e("div", { staticClass: "percentage-bar", style: n.barStyle })]), e("div", { staticClass: "countdown flex -vcenter -hcenter" }, [e("span", { staticClass: "countdown-text" }, [n._v("Oferta acaba em")]), e("Stopwatch", { staticClass: "countdown-timer" })], 1)]);
}, y = [], g = /* @__PURE__ */ C(
    w,
    b,
    y,
    !1,
    null,
    null,
    null,
    null
);
const $ = g.exports;
function l(a) {
    l.installed || (l.installed = !0, a.component("InventoryCountdown", $));
}
const R = {
    install: l
};
let r = null;
typeof window < "u" ? r = window.Vue : typeof global < "u" && (r = global.Vue);
r && r.use(R);
export {
    $ as default
};
