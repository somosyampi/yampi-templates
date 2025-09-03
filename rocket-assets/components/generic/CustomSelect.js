import { mapGetters as h } from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/vuex.js";
function g(i, e, s, o, n, l, u, p) {
    var r = typeof i == "function" ? i.options : i;
    e && (r.render = e, r.staticRenderFns = s, r._compiled = !0), o && (r.functional = !0), l && (r._scopeId = "data-v-" + l);
    var a;
    if (u ? (a = function (t) {
        t = t || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !t && typeof __VUE_SSR_CONTEXT__ < "u" && (t = __VUE_SSR_CONTEXT__), n && n.call(this, t), t && t._registeredComponents && t._registeredComponents.add(u);
    }, r._ssrRegister = a) : n && (a = p ? function () {
        n.call(
            this,
            (r.functional ? this.parent : this).$root.$options.shadowRoot
        );
    } : n), a)
        if (r.functional) {
            r._injectStyles = a;
            var m = r.render;
            r.render = function (v, _) {
                return a.call(_), m(v, _);
            };
        } else {
            var d = r.beforeCreate;
            r.beforeCreate = d ? [].concat(d, a) : [a];
        }
    return {
        exports: i,
        options: r
    };
}
const C = {
    name: "CustomSelect",
    props: {
        value: {
            type: [String, Number],
            default: ""
        },
        iconUrl: {
            type: String,
            default: null
        },
        error: {
            type: Boolean,
            default: !1
        }
    },
    data: () => ({
        selectedValue: null,
        internalError: !1
    }),
    computed: {
        ...h("preview", ["isIframe"]),
        selectType() {
            return this.iconUrl ? "custom-select-image-prefix relative" : "custom-select relative";
        }
    },
    watch: {
        value: {
            immediate: !0,
            handler() {
                this.selectedValue = this.value;
            }
        }
    },
    methods: {
        change() {
            this.isIframe || (this.validateInternal(), this.$emit("change", this.selectedValue));
        },
        validateInternal() {
            if (!this.selectedValue) {
                this.internalError = !0;
                return;
            }
            this.internalError = !1;
        }
    }
};
var V = function () {
    var e = this, s = e._self._c;
    return s("div", { class: e.selectType }, [e.iconUrl ? s("img", { staticClass: "icon svg-brand", class: { "-error": e.error || e.internalError }, attrs: { src: e.iconUrl } }) : e._e(), s("select", e._b({
        directives: [{ name: "model", rawName: "v-model", value: e.selectedValue, expression: "selectedValue" }], ref: "standardSelect", class: { error: e.error || e.internalError }, on: {
            change: [function (o) {
                var n = Array.prototype.filter.call(o.target.options, function (l) {
                    return l.selected;
                }).map(function (l) {
                    var u = "_value" in l ? l._value : l.value;
                    return u;
                });
                e.selectedValue = o.target.multiple ? n : n[0];
            }, e.change]
        }
    }, "select", e.$attrs, !1), [e._t("default")], 2), s("SelectArrow", { staticClass: "icon icon-select-arrow", class: { "-error": e.error || e.internalError } })], 1);
}, w = [], y = /* @__PURE__ */ g(
    C,
    V,
    w,
    !1,
    null,
    null,
    null,
    null
);
const $ = y.exports;
function f(i) {
    f.installed || (f.installed = !0, i.component("CustomSelect", $));
}
const b = {
    install: f
};
let c = null;
typeof window < "u" ? c = window.Vue : typeof global < "u" && (c = global.Vue);
c && c.use(b);
export {
    $ as default
};
