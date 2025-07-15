import m from "https://codigo-aberto-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/mixins/mobile.js";
function g(o, e, t, f, n, c, d, p) {
    var i = typeof o == "function" ? o.options : o;
    e && (i.render = e, i.staticRenderFns = t, i._compiled = !0), f && (i.functional = !0), c && (i._scopeId = "data-v-" + c);
    var a;
    if (d ? (a = function (s) {
        s = s || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !s && typeof __VUE_SSR_CONTEXT__ < "u" && (s = __VUE_SSR_CONTEXT__), n && n.call(this, s), s && s._registeredComponents && s._registeredComponents.add(d);
    }, i._ssrRegister = a) : n && (a = p ? function () {
        n.call(
            this,
            (i.functional ? this.parent : this).$root.$options.shadowRoot
        );
    } : n), a)
        if (i.functional) {
            i._injectStyles = a;
            var v = i.render;
            i.render = function (h, _) {
                return a.call(_), v(h, _);
            };
        } else {
            var u = i.beforeCreate;
            i.beforeCreate = u ? [].concat(u, a) : [a];
        }
    return {
        exports: o,
        options: i
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
    return e.isMobile ? t("div", { staticClass: "category-options flex" }, [e.showSort ? t("div", { staticClass: "holder-sort flex -vcenter -hcenter" }, [t("i", { staticClass: "icon icon-order" }), t("custom-select", { tag: "select", attrs: { id: "category-order-select", name: "category-order", value: e.selectedOrder }, on: { change: e.updateOrderBy } }, [t("option", { attrs: { selected: "", value: "relevance" } }, [e._v(" Relev\xE2ncia ")]), t("option", { attrs: { value: "best_sellers" } }, [e._v("Mais vendidos")]), t("option", { attrs: { value: "highest_price" } }, [e._v("Maior pre\xE7o")]), t("option", { attrs: { value: "lowest_price" } }, [e._v("Menor pre\xE7o")]), t("option", { attrs: { value: "newest" } }, [e._v("Lan\xE7amentos")]), t("option", { attrs: { value: "rating" } }, [e._v("Melhor avalia\xE7\xE3o")]), t("option", { attrs: { value: "name_asc" } }, [e._v("A-Z")]), t("option", { attrs: { value: "name_desc" } }, [e._v("Z-A")])])], 1) : e._e(), t("div", { staticClass: "holder-grid-type flex -vcenter -hcenter", on: { click: e.updateGrid } }, [t("i", {
        staticClass: "icon", class: {
            "icon-mosaic": !e.isMosaic,
            "icon-list": e.isMosaic
        }
    }), t("span", [e._v(e._s(e.isMosaic ? "Lista" : "Mosaico"))])]), e.showFilters ? t("SideBarTrigger", { staticClass: "flex -vcenter -hcenter", attrs: { "active-class": "active-filters", name: "filters" } }, [t("i", { staticClass: "icon icon-filters" }), t("span", [e._v("Filtrar")])]) : e._e()], 1) : e._e();
}, M = [], w = /* @__PURE__ */ g(
    C,
    y,
    M,
    !1,
    null,
    null,
    null,
    null
);
const b = w.exports;
function l(o) {
    l.installed || (l.installed = !0, o.component("CategoryOptions", b));
}
const O = {
    install: l
};
let r = null;
typeof window < "u" ? r = window.Vue : typeof global < "u" && (r = global.Vue);
r && r.use(O);
export {
    b as default
};
