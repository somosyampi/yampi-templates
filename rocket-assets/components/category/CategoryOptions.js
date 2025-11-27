import m from "https://openstore-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/mixins/mobile.js";
function g(o, e, t, f, a, c, d, p) {
    var s = typeof o == "function" ? o.options : o;
    e && (s.render = e, s.staticRenderFns = t, s._compiled = !0), f && (s.functional = !0), c && (s._scopeId = "data-v-" + c);
    var i;
    if (d ? (i = function (r) {
        r = r || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !r && typeof __VUE_SSR_CONTEXT__ < "u" && (r = __VUE_SSR_CONTEXT__), a && a.call(this, r), r && r._registeredComponents && r._registeredComponents.add(d);
    }, s._ssrRegister = i) : a && (i = p ? function () {
        a.call(
            this,
            (s.functional ? this.parent : this).$root.$options.shadowRoot
        );
    } : a), i)
        if (s.functional) {
            s._injectStyles = i;
            var v = s.render;
            s.render = function (h, _) {
                return i.call(_), v(h, _);
            };
        } else {
            var u = s.beforeCreate;
            s.beforeCreate = u ? [].concat(u, i) : [i];
        }
    return {
        exports: o,
        options: s
    };
}
const C = {
    name: "CategoryOptions",
    mixins: [
        m
    ],
    props: {
        isMosaic: {
            type: Boolean,
            required: !0
        },
        showSort: {
            type: Boolean,
            required: !0
        },
        showFilters: {
            type: Boolean,
            required: !0
        },
        selectedOrder: {
            type: String,
            default: "relevance"
        }
    },
    data: () => ({}),
    computed: {
        shouldUseNewSearchStrategy() {
            const { new_search: o } = this.$store.getters["merchant/storeModules"];
            return o;
        }
    },
    mounted() {
    },
    methods: {
        updateOrderBy(o) {
            this.$emit("change", o);
        },
        updateGrid() {
            this.$emit("change-grid", !this.isMosaic);
        }
    }
};
var y = function () {
    var e = this, t = e._self._c;
    return e.isMobile ? t("div", { staticClass: "category-options flex" }, [e.showSort ? t("div", { staticClass: "holder-sort flex -vcenter -hcenter" }, [t("i", { staticClass: "icon icon-order" }), t("custom-select", { tag: "select", attrs: { id: "category-order-select", name: "category-order", value: e.selectedOrder }, on: { change: e.updateOrderBy } }, [t("option", { attrs: { selected: "", value: "relevance" } }, [e._v(" Relev\xE2ncia ")]), t("option", { attrs: { value: "best_sellers" } }, [e._v("Mais vendidos")]), t("option", { attrs: { value: "highest_price" } }, [e._v("Maior pre\xE7o")]), t("option", { attrs: { value: "lowest_price" } }, [e._v("Menor pre\xE7o")]), t("option", { attrs: { value: "newest" } }, [e._v("Lan\xE7amentos")]), t("option", { attrs: { value: "rating" } }, [e._v("Melhor avalia\xE7\xE3o")]), e.shouldUseNewSearchStrategy ? e._e() : t("option", { attrs: { value: "name_asc" } }, [e._v(" A-Z ")]), e.shouldUseNewSearchStrategy ? e._e() : t("option", { attrs: { value: "name_desc" } }, [e._v(" Z-A ")])])], 1) : e._e(), t("div", { staticClass: "holder-grid-type flex -vcenter -hcenter", on: { click: e.updateGrid } }, [t("i", {
        staticClass: "icon", class: {
            "icon-mosaic": !e.isMosaic,
            "icon-list": e.isMosaic
        }
    }), t("span", [e._v(e._s(e.isMosaic ? "Lista" : "Mosaico"))])]), e.showFilters ? t("SideBarTrigger", { staticClass: "flex -vcenter -hcenter", attrs: { "active-class": "active-filters", name: "filters" } }, [t("i", { staticClass: "icon icon-filters" }), t("span", [e._v("Filtrar")])]) : e._e()], 1) : e._e();
}, w = [], M = /* @__PURE__ */ g(
    C,
    y,
    w,
    !1,
    null,
    null,
    null,
    null
);
const S = M.exports;
function l(o) {
    l.installed || (l.installed = !0, o.component("CategoryOptions", S));
}
const $ = {
    install: l
};
let n = null;
typeof window < "u" ? n = window.Vue : typeof global < "u" && (n = global.Vue);
n && n.use($);
export {
    S as default
};
