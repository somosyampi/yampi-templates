import C from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/lodash.js";
import { smoothScroll as k } from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/mixins/helpers.js";
function v(i, t, s, u, r, d, f, h) {
    var e = typeof i == "function" ? i.options : i;
    t && (e.render = t, e.staticRenderFns = s, e._compiled = !0), u && (e.functional = !0), d && (e._scopeId = "data-v-" + d);
    var n;
    if (f ? (n = function (o) {
        o = o || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !o && typeof __VUE_SSR_CONTEXT__ < "u" && (o = __VUE_SSR_CONTEXT__), r && r.call(this, o), o && o._registeredComponents && o._registeredComponents.add(f);
    }, e._ssrRegister = n) : r && (n = h ? function () {
        r.call(
            this,
            (e.functional ? this.parent : this).$root.$options.shadowRoot
        );
    } : r), n)
        if (e.functional) {
            e._injectStyles = n;
            var _ = e.render;
            e.render = function (p, m) {
                return n.call(m), _(p, m);
            };
        } else {
            var c = e.beforeCreate;
            e.beforeCreate = c ? [].concat(c, n) : [n];
        }
    return {
        exports: i,
        options: e
    };
}
const g = {
    name: "BuyTogetherCustomizationContent",
    props: {
        sku: {
            type: Object,
            default: () => {
            }
        },
        customizedProducts: {
            type: Object,
            required: !0
        }
    },
    data() {
        return {
            skuCustomized: !1
        };
    },
    computed: {
        skuImageUrl() {
            return this.sku.images.data.length ? this.sku.images.data[0].url : "";
        }
    },
    watch: {
        showContent(i) {
            const t = document.getElementsByClassName("buy-together-modal-form");
            i && this.smoothScroll(t[0], 0, this.$el.offsetHeight);
        }
    },
    mounted() {
        !this.sku.allow_sell_without_customization && !this.customizedProducts[this.sku.id] && this.$refs.customizationContent && this.$refs.customizationContent.updateAllCustomizations(""), this.customizedProducts[this.sku.id] && (this.showContent = this.customizedProducts[this.sku.id].isPersonalized, this.values = C.omit(this.customizedProducts[this.sku.id], ["isPersonalized"]));
    },
    methods: {
        smoothScroll: k
    }
};
var z = function () {
    var t = this, s = t._self._c;
    return t.sku ? s("div", { staticClass: "buy-together-content" }, [s("div", { staticClass: "product-description", attrs: { "aria-labelledby": "sku-title" } }, [s("img", { attrs: { src: t.skuImageUrl } }), s("div", { staticClass: "text" }, [s("div", { staticClass: "sku-title", attrs: { id: "sku-title" } }, [t._v(" " + t._s(t.sku.title) + " ")]), t.sku.variations.length ? s("ul", t._l(t.sku.variations, function (u) {
        return s("li", { key: u.name }, [t._v(" " + t._s(u.name) + ": " + t._s(u.value) + " ")]);
    }), 0) : t._e()])]), s("CustomizationContent", { ref: "customizationContent", attrs: { sku: t.sku } })], 1) : t._e();
}, b = [], y = /* @__PURE__ */ v(
    g,
    z,
    b,
    !1,
    null,
    null,
    null,
    null
);
const w = y.exports;
function l(i) {
    l.installed || (l.installed = !0, i.component("BuyTogetherCustomizationContent", w));
}
const $ = {
    install: l
};
let a = null;
typeof window < "u" ? a = window.Vue : typeof global < "u" && (a = global.Vue);
a && a.use($);
export {
    w as default
};
