import m from "https://codigo-aberto-production-assets.s3.amazonaws.com/yampi-templates-sandbox/rocket-assets/dist/vendor/lodash.js";
function v(t, e, s, u, n, o, l, _) {
    var i = typeof t == "function" ? t.options : t;
    e && (i.render = e, i.staticRenderFns = s, i._compiled = !0), u && (i.functional = !0), o && (i._scopeId = "data-v-" + o);
    var a;
    if (l ? (a = function (r) {
        r = r || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !r && typeof __VUE_SSR_CONTEXT__ < "u" && (r = __VUE_SSR_CONTEXT__), n && n.call(this, r), r && r._registeredComponents && r._registeredComponents.add(l);
    }, i._ssrRegister = a) : n && (a = _ ? function () {
        n.call(
            this,
            (i.functional ? this.parent : this).$root.$options.shadowRoot
        );
    } : n), a)
        if (i.functional) {
            i._injectStyles = a;
            var g = i.render;
            i.render = function (p, c) {
                return a.call(c), g(p, c);
            };
        } else {
            var f = i.beforeCreate;
            i.beforeCreate = f ? [].concat(f, a) : [a];
        }
    return {
        exports: t,
        options: i
    };
}
const w = {
    name: "RocketDesktopCategoriesNav",
    inject: ["mainCategory", "categoriesDisplay"],
    data() {
        return {
            isVisible: !1
        };
    },
    computed: {
        subcategories() {
            var t;
            return ((t = this.mainCategory.children) == null ? void 0 : t.data) || [];
        },
        filteredSubcategories() {
            return this.subcategories.slice(0, 27);
        },
        chunkedSubcategories() {
            return m.chunk([
                {
                    ...m.omit(this.mainCategory, ["children"]),
                    name: "Todos os produtos"
                },
                ...this.filteredSubcategories
            ], 7);
        },
        hasDropdown() {
            return !!this.subcategories.length && this.categoriesDisplay === "both";
        }
    },
    methods: {
        getCalculatedSubmenuLeftOffset({
            drawPosition: t,
            clientX: e,
            viewportWidth: s
        }) {
            const u = this.chunkedSubcategories.length * 200 + 80 + (this.chunkedSubcategories.length - 1) * 40;
            return {
                rightDraw: () => {
                    const n = u + e - s, o = 40 + (this.chunkedSubcategories.length - 1) * 200, l = e > n + o ? e - (n + o) : e - n;
                    return n > 0 ? l : e - (u - 140);
                },
                leftDraw: () => {
                    const n = u + e - s;
                    return n > 0 ? e - n : e * 0.97;
                }
            }[t]();
        },
        getDrawPosition({ viewportWidth: t, clientX: e, itemWidth: s }) {
            return e + s > t / 2 ? "rightDraw" : "leftDraw";
        },
        handleMouseEnter() {
            if (this.hasDropdown) {
                const t = this.$refs.menuitem.getBoundingClientRect(), e = this.getDrawPosition({
                    viewportWidth: window.innerWidth,
                    clientX: t.x,
                    itemWidth: t.width
                }), s = this.getCalculatedSubmenuLeftOffset({
                    drawPosition: e,
                    clientX: t.x,
                    itemWidth: t.width,
                    viewportWidth: window.innerWidth
                });
                this.$refs.submenu.style.left = `${s}px`, this.$refs.submenu.style.setProperty(
                    "--nav-left-pos-x",
                    `${t.x - s + t.width / 2 - 10}px`
                );
            }
            this.isVisible = !0;
        },
        handleMouseLeave() {
            this.isVisible = !1;
        }
    }
};
var b = function () {
    var e = this, s = e._self._c;
    return s("div", { staticClass: "h-anchor-container", on: { mouseenter: e.handleMouseEnter, mouseleave: e.handleMouseLeave } }, [s("RocketAnchor", { attrs: { "custom-ref": "menuitem", href: e.mainCategory.url_path, label: e.mainCategory.name, "custom-classes": "main-category" } }), e.hasDropdown ? s("Transition", { attrs: { name: "fade" } }, [s("ul", { directives: [{ name: "show", rawName: "v-show", value: e.isVisible, expression: "isVisible" }], ref: "submenu", staticClass: "subcategories-list", on: { mouseenter: e.handleMouseEnter, mouseleave: e.handleMouseLeave } }, e._l(e.chunkedSubcategories, function (u, n) {
        return s("li", { key: n, staticClass: "subcategory-container" }, e._l(u, function (o, l) {
            return s("a", { key: o.id, class: `subcategory ${l === 0 && n === 0 ? "--all-products" : ""}`, attrs: { href: o.url_path } }, [e._v(" " + e._s(o.name) + " ")]);
        }), 0);
    }), 0)]) : e._e()], 1);
}, C = [], y = /* @__PURE__ */ v(
    w,
    b,
    C,
    !1,
    null,
    null,
    null,
    null
);
const k = y.exports;
function h(t) {
    h.installed || (h.installed = !0, t.component("RocketDesktopCategoriesNav", k));
}
const D = {
    install: h
};
let d = null;
typeof window < "u" ? d = window.Vue : typeof global < "u" && (d = global.Vue);
d && d.use(D);
export {
    k as default
};
