import m from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/components/category/filters/BaseFilter.js";
function v(r, e, o, n, s, f, d, h) {
    var t = typeof r == "function" ? r.options : r;
    e && (t.render = e, t.staticRenderFns = o, t._compiled = !0), n && (t.functional = !0), f && (t._scopeId = "data-v-" + f);
    var i;
    if (d ? (i = function (a) {
        a = a || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !a && typeof __VUE_SSR_CONTEXT__ < "u" && (a = __VUE_SSR_CONTEXT__), s && s.call(this, a), a && a._registeredComponents && a._registeredComponents.add(d);
    }, t._ssrRegister = i) : s && (i = h ? function () {
        s.call(
            this,
            (t.functional ? this.parent : this).$root.$options.shadowRoot
        );
    } : s), i)
        if (t.functional) {
            t._injectStyles = i;
            var p = t.render;
            t.render = function (C, _) {
                return i.call(_), p(C, _);
            };
        } else {
            var c = t.beforeCreate;
            t.beforeCreate = c ? [].concat(c, i) : [i];
        }
    return {
        exports: r,
        options: t
    };
}
const y = {
    name: "FilterCategory",
    extends: m,
    props: {
        showCheckbox: {
            type: Boolean,
            default: !0
        },
        activeCategory: {
            type: String,
            default: ""
        },
        allCategories: {
            type: Array,
            default: () => []
        }
    },
    data: () => ({
        route: "categories",
        mainQueryString: "category_id"
    }),
    computed: {
        currentPayload() {
            const r = this.shouldUseNewSearchStrategy ? this.allCategories : this.payload;
            return this.processQueryParams(r);
        }
    },
    mounted() {
        !this.shouldUseNewSearchStrategy || (this.mainQueryString = "categories_name");
    }
};
var g = function () {
    var e = this, o = e._self._c;
    return e.currentPayload.length ? o("div", { staticClass: "filter filter-category" }, [o("div", { staticClass: "-title" }, [e._v(" Categorias ")]), o("ul", { class: { "-category": !e.showCheckbox } }, e._l(e.currentPayload, function (n) {
        return o("li", { key: n.id, class: { "filter-option": e.showCheckbox } }, [e.showCheckbox ? o("CustomCheckbox", {
            attrs: { text: n.name, checked: n.active }, on: {
                change: function (s) {
                    return e.updateFilterStatus(n, s);
                }
            }, scopedSlots: e._u([{
                key: "count", fn: function () {
                    return [n.count ? o("span", [e._v(e._s(`(${n.count})`))]) : e._e()];
                }, proxy: !0
            }], null, !0)
        }) : o("a", { class: { active: n.name === e.activeCategory }, attrs: { href: n.url_path }, domProps: { textContent: e._s(n.name) } })], 1);
    }), 0)]) : e._e();
}, w = [], S = /* @__PURE__ */ v(
    y,
    g,
    w,
    !1,
    null,
    null,
    null,
    null
);
const b = S.exports;
function u(r) {
    u.installed || (u.installed = !0, r.component("FilterCategory", b));
}
const k = {
    install: u
};
let l = null;
typeof window < "u" ? l = window.Vue : typeof global < "u" && (l = global.Vue);
l && l.use(k);
export {
    b as default
};
