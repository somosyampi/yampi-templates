import m from "https://codigo-aberto-production-assets.s3.amazonaws.com/yampi-templates-main/rocket-assets/components/category/filters/BaseFilter.js";
function C(r, t, o, l, a, u, d, p) {
    var e = typeof r == "function" ? r.options : r;
    t && (e.render = t, e.staticRenderFns = o, e._compiled = !0), l && (e.functional = !0), u && (e._scopeId = "data-v-" + u);
    var i;
    if (d ? (i = function (n) {
        n = n || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !n && typeof __VUE_SSR_CONTEXT__ < "u" && (n = __VUE_SSR_CONTEXT__), a && a.call(this, n), n && n._registeredComponents && n._registeredComponents.add(d);
    }, e._ssrRegister = i) : a && (i = p ? function () {
        a.call(
            this,
            (e.functional ? this.parent : this).$root.$options.shadowRoot
        );
    } : a), i)
        if (e.functional) {
            e._injectStyles = i;
            var v = e.render;
            e.render = function (h, c) {
                return i.call(c), v(h, c);
            };
        } else {
            var _ = e.beforeCreate;
            e.beforeCreate = _ ? [].concat(_, i) : [i];
        }
    return {
        exports: r,
        options: e
    };
}
const g = {
    name: "FilterBrand",
    extends: m,
    data: () => ({
        route: "brands",
        mainQueryString: "brand_id"
    })
};
var b = function () {
    var t = this, o = t._self._c;
    return o("div", { staticClass: "filter filter-brand" }, [o("div", { staticClass: "-title" }, [t._v(" Marca ")]), o("ul", t._l(t.payload, function (l) {
        return o("li", { key: l.id, staticClass: "filter-option" }, [o("CustomCheckbox", {
            attrs: { text: l.name, checked: l.active }, on: {
                change: function (a) {
                    return t.updateFilterStatus(l, a);
                }
            }
        })], 1);
    }), 0)]);
}, F = [], R = /* @__PURE__ */ C(
    g,
    b,
    F,
    !1,
    null,
    null,
    null,
    null
);
const $ = R.exports;
function f(r) {
    f.installed || (f.installed = !0, r.component("FilterBrand", $));
}
const w = {
    install: f
};
let s = null;
typeof window < "u" ? s = window.Vue : typeof global < "u" && (s = global.Vue);
s && s.use(w);
export {
    $ as default
};
