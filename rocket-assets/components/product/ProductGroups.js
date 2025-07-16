import m from "https://openstore-production-assets.yampi.io/yampi-templates-main/rocket-assets/components/product/BaseProduct.js";
function g(o, n, t, s, r, d, f, v) {
    var e = typeof o == "function" ? o.options : o;
    n && (e.render = n, e.staticRenderFns = t, e._compiled = !0), s && (e.functional = !0), d && (e._scopeId = "data-v-" + d);
    var a;
    if (f ? (a = function (i) {
        i = i || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !i && typeof __VUE_SSR_CONTEXT__ < "u" && (i = __VUE_SSR_CONTEXT__), r && r.call(this, i), i && i._registeredComponents && i._registeredComponents.add(f);
    }, e._ssrRegister = a) : r && (a = v ? function () {
        r.call(
            this,
            (e.functional ? this.parent : this).$root.$options.shadowRoot
        );
    } : r), a)
        if (e.functional) {
            e._injectStyles = a;
            var p = e.render;
            e.render = function (h, c) {
                return a.call(c), p(h, c);
            };
        } else {
            var _ = e.beforeCreate;
            e.beforeCreate = _ ? [].concat(_, a) : [a];
        }
    return {
        exports: o,
        options: e
    };
}
const C = {
    name: "ProductGroups",
    extends: m,
    data: () => ({
        route: "groups"
    })
};
var b = function () {
    var n = this, t = n._self._c;
    return n.payload.length || n.loading ? t("div", {
        directives: [{
            name: "observe-visibility", rawName: "v-observe-visibility", value: {
                callback: n.visibilityChanged,
                once: !0
            }, expression: `{
        callback: visibilityChanged,
        once: true,
    }` }], staticClass: "main-product-group"
    }, [t("div", { staticClass: "-title", class: { "-loading": n.loading } }, [n._v(" Outras op\xE7\xF5es ")]), t("ul", { staticClass: "inline" }, n._l(n.payload, function (s) {
        return t("li", { key: s.id }, [t("a", { attrs: { href: s.url_path } }, [t("CustomImage", { staticClass: "-loading", attrs: { src: s.images.data[0].url, alt: s.name, thumbor: { resize: "60x60" }, width: "60", height: "60" } })], 1)]);
    }), 0)]) : n._e();
}, y = [], w = /* @__PURE__ */ g(
    C,
    b,
    y,
    !1,
    null,
    null,
    null,
    null
);
const R = w.exports;
function u(o) {
    u.installed || (u.installed = !0, o.component("ProductGroups", R));
}
const $ = {
    install: u
};
let l = null;
typeof window < "u" ? l = window.Vue : typeof global < "u" && (l = global.Vue);
l && l.use($);
export {
    R as default
};
