import { mapGetters as y, mapActions as _ } from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/vuex.js";
import b from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/mixins/queryParams.js";
import F from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/modules/SearchAttributesHandler.js";
function C(e, r, a, o, i, d, c, v) {
    var t = typeof e == "function" ? e.options : e;
    r && (t.render = r, t.staticRenderFns = a, t._compiled = !0), o && (t.functional = !0), d && (t._scopeId = "data-v-" + d);
    var s;
    if (c ? (s = function (n) {
        n = n || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !n && typeof __VUE_SSR_CONTEXT__ < "u" && (n = __VUE_SSR_CONTEXT__), i && i.call(this, n), n && n._registeredComponents && n._registeredComponents.add(c);
    }, t._ssrRegister = s) : i && (s = v ? function () {
        i.call(
            this,
            (t.functional ? this.parent : this).$root.$options.shadowRoot
        );
    } : i), s)
        if (t.functional) {
            t._injectStyles = s;
            var p = t.render;
            t.render = function (h, f) {
                return s.call(f), p(h, f);
            };
        } else {
            var m = t.beforeCreate;
            t.beforeCreate = m ? [].concat(m, s) : [s];
        }
    return {
        exports: e,
        options: t
    };
}
const g = ["categories_name", "brand_name", "attributes", "price", "brand_id", "category_id", "filter_id"], A = {
    name: "SelectedFilters",
    mixins: [
        b
    ],
    computed: {
        ...y("filters", [
            "activeFilters"
        ]),
        validActiveFilters() {
            return this.activeFilters.filter((e) => e.name && g.includes(e.key));
        }
    },
    methods: {
        ..._("filters", [
            "removeActiveFilter"
        ]),
        ..._("queryParams", [
            "setQueryParams",
            "removeQueryParams"
        ]),
        removeFilter(e) {
            var r, a;
            if (e.key === "attributes") {
                const o = (a = (r = this.queryParams) == null ? void 0 : r.attributes) != null && a.length ? this.queryParams.attributes : "", i = F.removeAttributeValue(decodeURIComponent(o), e.name);
                i ? this.setQueryParams({ attributes: i, page: 1 }) : this.removeQueryParams({ key: ["attributes", "page"] }), this.removeActiveFilter(e);
                return;
            }
            this.removeActiveFilter(e), this.setQueryParams({ ...e.query, page: 1 }), e.alias === "price" && this.removeQueryParams({ key: Object.keys(e.query) });
        }
    }
};
var P = function () {
    var r = this, a = r._self._c;
    return r.activeFilters.length ? a("div", { staticClass: "selected-filters" }, r._l(r.validActiveFilters, function (o) {
        return a("div", {
            key: o.alias, staticClass: "selected-filter", domProps: { textContent: r._s(o.name) }, on: {
                click: function (i) {
                    return r.removeFilter(o);
                }
            }
        });
    }), 0) : r._e();
}, k = [], R = /* @__PURE__ */ C(
    A,
    P,
    k,
    !1,
    null,
    null,
    null,
    null
);
const $ = R.exports;
function u(e) {
    u.installed || (u.installed = !0, e.component("SelectedFilters", $));
}
const q = {
    install: u
};
let l = null;
typeof window < "u" ? l = window.Vue : typeof global < "u" && (l = global.Vue);
l && l.use(q);
export {
    $ as default
};
