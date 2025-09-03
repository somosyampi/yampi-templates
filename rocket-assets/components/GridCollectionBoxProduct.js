import { mapGetters as h } from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/vuex.js";
import b from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/modules/axios/api.js";
import g from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/modules/axios/rocket.js";
function w(o, t, n, p, s, l, u, f) {
    var e = typeof o == "function" ? o.options : o;
    t && (e.render = t, e.staticRenderFns = n, e._compiled = !0), p && (e.functional = !0), l && (e._scopeId = "data-v-" + l);
    var i;
    if (u ? (i = function (r) {
        r = r || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !r && typeof __VUE_SSR_CONTEXT__ < "u" && (r = __VUE_SSR_CONTEXT__), s && s.call(this, r), r && r._registeredComponents && r._registeredComponents.add(u);
    }, e._ssrRegister = i) : s && (i = f ? function () {
        s.call(
            this,
            (e.functional ? this.parent : this).$root.$options.shadowRoot
        );
    } : s), i)
        if (e.functional) {
            e._injectStyles = i;
            var m = e.render;
            e.render = function (y, _) {
                return i.call(_), m(y, _);
            };
        } else {
            var c = e.beforeCreate;
            e.beforeCreate = c ? [].concat(c, i) : [i];
        }
    return {
        exports: o,
        options: e
    };
}
const v = {
    name: "GridCollectionBoxProduct",
    props: {
        productSlug: {
            type: String,
            required: !0
        }
    },
    data: () => ({
        product: null
    }),
    computed: {
        ...h("preview", ["isPreview"]),
        ...h("theme", ["themeStyle"]),
        buttonClass() {
            return [
                `--space-top-${this.themeStyle.grids_add_to_cart_space_between_price}`
            ];
        },
        buttonText() {
            return this.themeStyle.grids_quickbuy_text_button || "Adicionar ao carrinho";
        },
        buttonHasIcon() {
            return this.themeStyle.grids_add_to_cart_icon_text_button_display_icon;
        },
        iconColor() {
            var t;
            return {
                primary: this.themeStyle.color_btn_primary_text,
                secondary: this.themeStyle.color_btn_secundary_text,
                custom: this.themeStyle.grids_add_to_cart_icon_text_button_text_color
            }[(t = this.themeStyle.grids_quickbuy_prices_color) != null ? t : "custom"];
        },
        displayButton() {
            const t = this.themeStyle.grids_add_to_cart_button_type === "icon_and_text", n = this.themeStyle.show_add_to_cart_button;
            return this.product && t && n;
        }
    },
    mounted() {
        this.loadProduct();
    },
    methods: {
        async loadProduct() {
            try {
                if (!this.productSlug && this.isPreview) {
                    await this.loadPlaceholders();
                    return;
                }
                if (!this.productSlug)
                    return;
                const o = await this.getProduct();
                if (this.isEmptyPayload(o) && this.isPreview) {
                    await this.loadPlaceholders();
                    return;
                }
                this.product = o;
            } catch (o) {
                o.response.status >= 400 && this.isPreview && await this.loadPlaceholders();
            }
        },
        async getProduct() {
            var o;
            try {
                const { data: t } = await b.get(
                    `catalog/products/${this.productSlug}`
                );
                return (o = t == null ? void 0 : t.data) != null ? o : null;
            } catch (t) {
                throw console.error("Erro ao obter produto -", t), t;
            }
        },
        async loadPlaceholders() {
            var t;
            const { data: o } = await g.get(
                "/placeholders/grid-collection"
            );
            this.product = (t = o.data.product) != null ? t : null;
        },
        isEmptyPayload(o) {
            return !o || Object.keys(o).length === 0;
        }
    }
};
var C = function () {
    var t = this, n = t._self._c;
    return n("div", { staticClass: "grid-collection-box" }, [t.product ? t._t("default", null, { product: t.product }) : t._e(), t.displayButton ? n("BuyButton", { attrs: { "has-button-style": !0, "is-text-and-icon-button": !0, product: t.product } }, [t.buttonHasIcon ? n("IconAddToCart", { attrs: { color: t.iconColor, width: "20", height: "20" } }) : t._e(), n("span", { staticClass: "text", domProps: { textContent: t._s(t.buttonText) } })], 1) : t._e()], 2);
}, S = [], P = /* @__PURE__ */ w(
    v,
    C,
    S,
    !1,
    null,
    null,
    null,
    null
);
const T = P.exports;
function d(o) {
    d.installed || (d.installed = !0, o.component("GridCollectionBoxProduct", T));
}
const x = {
    install: d
};
let a = null;
typeof window < "u" ? a = window.Vue : typeof global < "u" && (a = global.Vue);
a && a.use(x);
export {
    T as default
};
