import p from "https://openstore-production-assets.yampi.io/yampi-templates-main/rocket-assets/components/category/filters/BaseFilter.js";
function y(t, e, s, i, a, l, d, _) {
    var r = typeof t == "function" ? t.options : t;
    e && (r.render = e, r.staticRenderFns = s, r._compiled = !0), i && (r.functional = !0), l && (r._scopeId = "data-v-" + l);
    var u;
    if (d ? (u = function (n) {
        n = n || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !n && typeof __VUE_SSR_CONTEXT__ < "u" && (n = __VUE_SSR_CONTEXT__), a && a.call(this, n), n && n._registeredComponents && n._registeredComponents.add(d);
    }, r._ssrRegister = u) : a && (u = _ ? function () {
        a.call(
            this,
            (r.functional ? this.parent : this).$root.$options.shadowRoot
        );
    } : a), u)
        if (r.functional) {
            r._injectStyles = u;
            var v = r.render;
            r.render = function (m, f) {
                return u.call(f), v(m, f);
            };
        } else {
            var h = r.beforeCreate;
            r.beforeCreate = h ? [].concat(h, u) : [u];
        }
    return {
        exports: t,
        options: r
    };
}
const S = {
    name: "FilterCustom",
    extends: p,
    props: {
        searchFilters: {
            type: Object,
            default: () => ({})
        }
    },
    data: () => ({
        route: "filters",
        mainQueryString: "filter_id",
        searchSelectedAttributes: []
    }),
    computed: {
        activeCustomFilterKeys() {
            return this.searchSelectedAttributes.map((t) => `${t.attributeName}-${t.value}`).flat();
        }
    },
    mounted() {
        !this.shouldUseNewSearchStrategy || this.parseAttributes(this.queryParams.attributes).forEach((t) => {
            this.updateSearchSelectedAttributes(t, !0);
        });
    },
    methods: {
        updateSearchSelectedAttributes(t, e) {
            e ? this.searchSelectedAttributes = [...this.searchSelectedAttributes, t] : this.searchSelectedAttributes = this.searchSelectedAttributes.filter(
                (s) => !(s.attributeName === t.attributeName && s.value === t.value)
            ), this.mainQueryString = "attributes", this.updateFilterAttributes({
                filterData: {
                    id: `${t.attributeName}-${t.value}`,
                    key: "attributes",
                    query: {
                        attributes: t
                    },
                    alias: `${t.attributeName}-${t.value}`,
                    name: t.value,
                    active: e
                },
                allActiveFilters: this.searchSelectedAttributes
            });
        },
        parsePayload(t) {
            return t.map((e) => ({
                ...e,
                id: this.$randomString(),
                values: e.values.data.map((s) => ({
                    ...s,
                    active: this.queryParams.filter_id.includes(s.id)
                }))
            }));
        },
        parseFilterStatuses(t) {
            t.forEach((e) => e.values.forEach((s) => this.checkFilterStatus(s, !1)));
        },
        filterRemoved(t) {
            if (t.key === "attributes") {
                this.searchSelectedAttributes = this.searchSelectedAttributes.filter(
                    (e) => e.value !== t.name
                );
                return;
            }
            this.payload.some((e) => {
                const s = e.values.find((i) => i.id === t.id);
                return s ? (s.active = !1, !0) : !1;
            });
        }
    }
};
var b = function () {
    var e = this, s = e._self._c;
    return s("div", { staticClass: "filter" }, [e.shouldUseNewSearchStrategy ? s("div", e._l(Object.keys(e.searchFilters), function (i) {
        return s("div", { key: i, staticClass: "filter filter-generic" }, [s("div", { staticClass: "-title", domProps: { innerHTML: e._s(i) } }), s("ul", e._l(e.searchFilters[i], function (a) {
            return s("li", { key: `${i}.${a.key}`, staticClass: "filter-option" }, [s("CustomCheckbox", {
                attrs: { text: a.key, color: a.color, image: a.image_url, checked: e.activeCustomFilterKeys.includes(`${i}-${a.key}`) }, on: {
                    change: function (l) {
                        return e.updateSearchSelectedAttributes({ attributeName: i, value: a.key }, l);
                    }
                }, scopedSlots: e._u([{
                    key: "count", fn: function () {
                        return [a.count ? s("span", [e._v(e._s(`(${a.count})`))]) : e._e()];
                    }, proxy: !0
                }], null, !0)
            })], 1);
        }), 0)]);
    }), 0) : s("div", e._l(e.payload, function (i) {
        return s("div", { key: i.id, staticClass: "filter filter-generic" }, [s("div", { staticClass: "-title", domProps: { innerHTML: e._s(i.name) } }), s("ul", e._l(i.values, function (a) {
            return s("li", { key: a.id, staticClass: "filter-option" }, [s("CustomCheckbox", {
                attrs: { text: a.name, color: a.color, image: a.image_url, checked: a.active }, on: {
                    change: function (l) {
                        return e.updateFilterStatus(a, l);
                    }
                }
            })], 1);
        }), 0)]);
    }), 0)]);
}, C = [], g = /* @__PURE__ */ y(
    S,
    b,
    C,
    !1,
    null,
    null,
    null,
    null
);
const k = g.exports;
function c(t) {
    c.installed || (c.installed = !0, t.component("FilterCustom", k));
}
const $ = {
    install: c
};
let o = null;
typeof window < "u" ? o = window.Vue : typeof global < "u" && (o = global.Vue);
o && o.use($);
export {
    k as default
};
