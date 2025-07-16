import r from "https://openstore-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/lodash.js";
import C from "https://openstore-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/mixins/errors.js";
function z(t, i, e, a, u, f, d, _) {
    var s = typeof t == "function" ? t.options : t;
    i && (s.render = i, s.staticRenderFns = e, s._compiled = !0), a && (s.functional = !0), f && (s._scopeId = "data-v-" + f);
    var o;
    if (d ? (o = function (n) {
        n = n || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !n && typeof __VUE_SSR_CONTEXT__ < "u" && (n = __VUE_SSR_CONTEXT__), u && u.call(this, n), n && n._registeredComponents && n._registeredComponents.add(d);
    }, s._ssrRegister = o) : u && (o = _ ? function () {
        u.call(
            this,
            (s.functional ? this.parent : this).$root.$options.shadowRoot
        );
    } : u), o)
        if (s.functional) {
            s._injectStyles = o;
            var p = s.render;
            s.render = function (v, c) {
                return o.call(c), p(v, c);
            };
        } else {
            var m = s.beforeCreate;
            s.beforeCreate = m ? [].concat(m, o) : [o];
        }
    return {
        exports: t,
        options: s
    };
}
const g = {
    name: "BaseCustomization",
    mixins: [C],
    data: () => ({
        values: {},
        priceSum: 0,
        customization: {},
        showContent: !1
    }),
    computed: {
        allOptional() {
            return this.customizations.every(
                (t) => !t.required
            );
        },
        customizations() {
            return r.get(this.sku, "customizations.data", []);
        },
        hasCustomizations() {
            return !r.isEmpty(this.customizations);
        }
    },
    watch: {
        values: {
            deep: !0,
            handler() {
                this.calculateSum(this.customizations), this.$emit("change", this.values);
            }
        },
        sku: {
            immediate: !0,
            handler() {
                this.showContent = !r.get(
                    this.sku,
                    "allow_sell_without_customization",
                    !0
                );
            }
        }
    },
    methods: {
        getMask(t) {
            const i = {
                letters: /[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ.!@#$%^&*()_\-?"{} ]/,
                numbers: /[0-9 ]/,
                all: /[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ.!@#$%^&*()_\-?"{}0-9 ]/
            };
            return r.times(
                t.max_chars,
                r.constant(i[t.allowed_values])
            );
        },
        calculateSum(t) {
            this.priceSum = t.reduce((i, e) => {
                let a = i;
                return this.values[e.id] && (a += e.price), a;
            }, 0);
        },
        setCustomizationValue(t, i, e = !1) {
            this.$set(this.values, t.id, i), e && this.checkValues(t, this.values);
        },
        checkValues(t = void 0, i) {
            t ? this.setError(t.id, "") : this.clearErrors();
            const e = this.getInvalidCustomizations(i);
            return r.isEmpty(e) ? !0 : (e.forEach((a) => {
                (!t || r.get(t, "id") === a.id) && this.setError(a.id, "Campo obrigat\xF3rio");
            }), !1);
        },
        getInvalidCustomizations(t) {
            if (this.customizations.length === 0)
                return [];
            const i = this.customizations.filter(
                (e) => r.isEmpty(t[e.id])
            );
            return this.sku.allow_sell_without_customization && i.length === this.customizations.length && !this.showContent ? [] : i.every(
                (e) => !e.required
            ) ? [] : i.filter(
                (e) => e.required
            );
        }
    }
}, w = null, $ = null;
var k = /* @__PURE__ */ z(
    g,
    w,
    $,
    !1,
    null,
    null,
    null,
    null
);
const y = k.exports;
function h(t) {
    h.installed || (h.installed = !0, t.component("BaseCustomization", y));
}
const E = {
    install: h
};
let l = null;
typeof window < "u" ? l = window.Vue : typeof global < "u" && (l = global.Vue);
l && l.use(E);
export {
    y as default
};
