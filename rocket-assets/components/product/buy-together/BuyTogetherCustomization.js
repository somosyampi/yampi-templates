import { mapGetters as f } from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/vuex.js";
function v(s, t, o, d, n, l, c, p) {
    var e = typeof s == "function" ? s.options : s;
    t && (e.render = t, e.staticRenderFns = o, e._compiled = !0), d && (e.functional = !0), l && (e._scopeId = "data-v-" + l);
    var i;
    if (c ? (i = function (r) {
        r = r || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !r && typeof __VUE_SSR_CONTEXT__ < "u" && (r = __VUE_SSR_CONTEXT__), n && n.call(this, r), r && r._registeredComponents && r._registeredComponents.add(c);
    }, e._ssrRegister = i) : n && (i = p ? function () {
        n.call(
            this,
            (e.functional ? this.parent : this).$root.$options.shadowRoot
        );
    } : n), i)
        if (e.functional) {
            e._injectStyles = i;
            var _ = e.render;
            e.render = function (z, m) {
                return i.call(m), _(z, m);
            };
        } else {
            var h = e.beforeCreate;
            e.beforeCreate = h ? [].concat(h, i) : [i];
        }
    return {
        exports: s,
        options: e
    };
}
const C = {
    name: "BuyTogetherCustomization",
    props: {
        error: {
            type: Boolean,
            default: !1
        }
    },
    data() {
        return {
            customizationError: !1,
            screenWidth: window.innerWidth
        };
    },
    computed: {
        ...f("buyTogether", ["productsForCustomization", "customizedProducts"]),
        ...f("theme", ["themeStyle"]),
        productsUserAlreadyCustomized() {
            return Object.values(this.customizedProducts).filter((s) => s.isPersonalized).length;
        },
        shouldChangeMargin() {
            return !(this.themeStyle.fonts_texts_size === 14 && !!this.themeStyle.fonts_texts_family.match(/rubik/gi) || this.productsUserAlreadyCustomized > 0 || this.screenWidth < 700);
        }
    },
    mounted() {
        window.addEventListener("resize", () => {
            this.screenWidth = window.innerWidth;
        });
    },
    methods: {
        handleCustomization() {
            this.$refs.ModalBuyTogetherCustomization.handleModal();
        },
        checkError() {
            this.customizationError = this.productsForCustomization.length !== Object.keys(this.customizedProducts).length;
        },
        handleSave() {
            this.$emit("save");
        }
    }
};
var g = function () {
    var t = this, o = t._self._c;
    return o("div", [o("div", {
        staticClass: "products-customization", class: { error: t.customizationError }, on: {
            click: function (d) {
                return t.$emit("click");
            }
        }
    }, [t.productsForCustomization.length && !Object.keys(t.customizedProducts).length ? o("div", [o("p", { staticClass: "mt-12 mb-7" }, [t._v(" Voc\xEA tem "), o("span", [t._v(t._s(t.productsForCustomization.length))]), t._v(" " + t._s(t.$tc("common.product", t.productsForCustomization.length)) + " "), o("br"), t._v(" para personalizar ")]), o("p", { staticClass: "helper-text" }, [t._v(" Personalizar ")])]) : o("div", [o("p", {
        class: {
            "none-products": t.productsUserAlreadyCustomized === 0,
            "already-customized-products": t.productsUserAlreadyCustomized > 0,
            "mt-12": t.shouldChangeMargin
        }, domProps: {
            innerHTML: t._s(t.$tc(
                "buy-together-customization.product-customization",
                t.productsUserAlreadyCustomized
            ))
        }
    }), o("p", { staticClass: "helper-text" }, [t._v(" Editar ")])])]), o("ModalBuyTogetherCustomization", { ref: "ModalBuyTogetherCustomization", on: { save: t.handleSave } })], 1);
}, y = [], b = /* @__PURE__ */ v(
    C,
    g,
    y,
    !1,
    null,
    null,
    null,
    null
);
const $ = b.exports;
function u(s) {
    u.installed || (u.installed = !0, s.component("BuyTogetherCustomization", $));
}
const w = {
    install: u
};
let a = null;
typeof window < "u" ? a = window.Vue : typeof global < "u" && (a = global.Vue);
a && a.use(w);
export {
    $ as default
};
