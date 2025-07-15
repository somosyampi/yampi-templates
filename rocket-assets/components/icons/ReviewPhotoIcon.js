import m from "https://codigo-aberto-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/mixins/mobile.js";
function w(r, s, o, h, i, f, d, c) {
    var e = typeof r == "function" ? r.options : r;
    s && (e.render = s, e.staticRenderFns = o, e._compiled = !0), h && (e.functional = !0), f && (e._scopeId = "data-v-" + f);
    var t;
    if (d ? (t = function (n) {
        n = n || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !n && typeof __VUE_SSR_CONTEXT__ < "u" && (n = __VUE_SSR_CONTEXT__), i && i.call(this, n), n && n._registeredComponents && n._registeredComponents.add(d);
    }, e._ssrRegister = t) : i && (t = c ? function () {
        i.call(
            this,
            (e.functional ? this.parent : this).$root.$options.shadowRoot
        );
    } : i), t)
        if (e.functional) {
            e._injectStyles = t;
            var p = e.render;
            e.render = function (v, u) {
                return t.call(u), p(v, u);
            };
        } else {
            var _ = e.beforeCreate;
            e.beforeCreate = _ ? [].concat(_, t) : [t];
        }
    return {
        exports: r,
        options: e
    };
}
const C = {
    name: "ReviewPhotoIcon",
    mixins: {
        mobileMixin: m
    }
};
var g = function () {
    var s = this, o = s._self._c;
    return o("svg", { attrs: { viewBox: "0 0 96 96", fill: "none", xmlns: "http://www.w3.org/2000/svg" } }, [o("rect", { attrs: { x: "0.5", y: "0.5", width: "95", height: "95", rx: "4.5", fill: "#F5F5F5", stroke: "#666666", "stroke-dasharray": "3 3" } }), o("path", {
        attrs: {
            d: `M6.8586 4.22456L1.20577 11.8386C0.960834 12.1685 1.19632 12.6366
                    1.60723 12.6366H20.5186C20.8822 12.6366 21.1243 12.2608 20.9738
                    11.9297L16.028 1.04899C15.8655 0.691433 15.3731 0.652266 15.1561
                    0.979634L11.2821 6.82375C11.1108 7.0822 10.748 7.12401 10.5224
                    6.91129L7.60307 4.15882C7.38526 3.95346 7.03705 3.98421 6.8586 4.22456Z`, fill: "#666666", stroke: "#666666", transform: "translate(40,42)"
        }
    }), o("circle", { attrs: { cx: "38", cy: "40", r: "2.60227", fill: "#666666", stroke: "#666666" } }), o("rect", { attrs: { x: "30", y: "30", width: "37.23", height: "33.09", rx: "4.5", fill: "", stroke: "#666666", "stroke-dasharray": "3 3" } })]);
}, R = [], k = /* @__PURE__ */ w(
    C,
    g,
    R,
    !1,
    null,
    null,
    null,
    null
);
const y = k.exports;
function l(r) {
    l.installed || (l.installed = !0, r.component("ReviewPhotoIcon", y));
}
const b = {
    install: l
};
let a = null;
typeof window < "u" ? a = window.Vue : typeof global < "u" && (a = global.Vue);
a && a.use(b);
export {
    y as default
};
