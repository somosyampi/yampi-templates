import { mapGetters as C, mapActions as m } from "https://codigo-aberto-production-assets.s3.amazonaws.com/yampi-templates-sandbox/rocket-assets/dist/vendor/vuex.js";
import F from "https://codigo-aberto-production-assets.s3.amazonaws.com/yampi-templates-sandbox/rocket-assets/dist/vendor/mixins/queryParams.js";
function y(t, n, a, s, o, u, d, v) {
    var e = typeof t == "function" ? t.options : t;
    n && (e.render = n, e.staticRenderFns = a, e._compiled = !0), s && (e.functional = !0), u && (e._scopeId = "data-v-" + u);
    var i;
    if (d ? (i = function (r) {
        r = r || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !r && typeof __VUE_SSR_CONTEXT__ < "u" && (r = __VUE_SSR_CONTEXT__), o && o.call(this, r), r && r._registeredComponents && r._registeredComponents.add(d);
    }, e._ssrRegister = i) : o && (i = v ? function () {
        o.call(
            this,
            (e.functional ? this.parent : this).$root.$options.shadowRoot
        );
    } : o), i)
        if (e.functional) {
            e._injectStyles = i;
            var p = e.render;
            e.render = function (h, c) {
                return i.call(c), p(h, c);
            };
        } else {
            var _ = e.beforeCreate;
            e.beforeCreate = _ ? [].concat(_, i) : [i];
        }
    return {
        exports: t,
        options: e
    };
}
const g = {
    name: "SelectedFilters",
    mixins: [
        F
    ],
    computed: {
        ...C("filters", [
            "activeFilters"
        ])
    },
    methods: {
        ...m("filters", [
            "removeActiveFilter"
        ]),
        ...m("queryParams", [
            "setQueryParams"
        ]),
        removeFilter(t) {
            this.setQueryParams({ ...t.query, page: 1 }), this.removeActiveFilter(t);
        }
    }
};
var $ = function () {
    var n = this, a = n._self._c;
    return n.activeFilters.length ? a("div", { staticClass: "selected-filters" }, n._l(n.activeFilters, function (s) {
        return a("div", {
            key: s.alias, staticClass: "selected-filter", domProps: { textContent: n._s(s.name) }, on: {
                click: function (o) {
                    return n.removeFilter(s);
                }
            }
        });
    }), 0) : n._e();
}, R = [], b = /* @__PURE__ */ y(
    g,
    $,
    R,
    !1,
    null,
    null,
    null,
    null
);
const w = b.exports;
function f(t) {
    f.installed || (f.installed = !0, t.component("SelectedFilters", w));
}
const P = {
    install: f
};
let l = null;
typeof window < "u" ? l = window.Vue : typeof global < "u" && (l = global.Vue);
l && l.use(P);
export {
    w as default
};
