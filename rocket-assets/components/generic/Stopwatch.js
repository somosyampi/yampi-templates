import d from "https://codigo-aberto-production-assets.s3.amazonaws.com/yampi-templates-sandbox/rocket-assets/dist/vendor/lodash.js";
function C(t, o, a, l, i, u, _, h) {
    var n = typeof t == "function" ? t.options : t;
    o && (n.render = o, n.staticRenderFns = a, n._compiled = !0), l && (n.functional = !0), u && (n._scopeId = "data-v-" + u);
    var s;
    if (_ ? (s = function (e) {
        e = e || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !e && typeof __VUE_SSR_CONTEXT__ < "u" && (e = __VUE_SSR_CONTEXT__), i && i.call(this, e), e && e._registeredComponents && e._registeredComponents.add(_);
    }, n._ssrRegister = s) : i && (s = h ? function () {
        i.call(
            this,
            (n.functional ? this.parent : this).$root.$options.shadowRoot
        );
    } : i), s)
        if (n.functional) {
            n._injectStyles = s;
            var m = n.render;
            n.render = function (v, p) {
                return s.call(p), m(v, p);
            };
        } else {
            var c = n.beforeCreate;
            n.beforeCreate = c ? [].concat(c, s) : [s];
        }
    return {
        exports: t,
        options: n
    };
}
const w = {
    name: "Stopwatch",
    data: () => ({
        html: ""
    }),
    mounted() {
        this.loadCountdown();
    },
    methods: {
        loadCountdown() {
            const t = new Date(), o = d.padStart(23 - t.getHours(), 2, "0"), a = d.padStart(59 - t.getMinutes(), 2, "0"), l = d.padStart(59 - t.getSeconds(), 2, "0");
            this.html = `${o} : ${a} : ${l}`, setTimeout(() => {
                this.loadCountdown();
            }, 500);
        }
    }
};
var $ = function () {
    var o = this, a = o._self._c;
    return a("span", { staticClass: "stopwatch", domProps: { textContent: o._s(o.html) } });
}, g = [], S = /* @__PURE__ */ C(
    w,
    $,
    g,
    !1,
    null,
    null,
    null,
    null
);
const R = S.exports;
function f(t) {
    f.installed || (f.installed = !0, t.component("Stopwatch", R));
}
const b = {
    install: f
};
let r = null;
typeof window < "u" ? r = window.Vue : typeof global < "u" && (r = global.Vue);
r && r.use(b);
export {
    R as default
};
