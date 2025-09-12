import { mapMutations as b } from "https://openstore-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/vuex.js";
import h from "https://openstore-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/mixins/buttons.js";
function C(i, t, n, _, r, u, d, p) {
    var e = typeof i == "function" ? i.options : i;
    t && (e.render = t, e.staticRenderFns = n, e._compiled = !0), _ && (e.functional = !0), u && (e._scopeId = "data-v-" + u);
    var o;
    if (d ? (o = function (a) {
        a = a || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !a && typeof __VUE_SSR_CONTEXT__ < "u" && (a = __VUE_SSR_CONTEXT__), r && r.call(this, a), a && a._registeredComponents && a._registeredComponents.add(d);
    }, e._ssrRegister = o) : r && (o = p ? function () {
        r.call(
            this,
            (e.functional ? this.parent : this).$root.$options.shadowRoot
        );
    } : r), o)
        if (e.functional) {
            e._injectStyles = o;
            var m = e.render;
            e.render = function (v, c) {
                return o.call(c), m(v, c);
            };
        } else {
            var f = e.beforeCreate;
            e.beforeCreate = f ? [].concat(f, o) : [o];
        }
    return {
        exports: i,
        options: e
    };
}
const g = {
    name: "LoaderButton",
    mixins: [h],
    props: {
        sending: {
            type: Boolean,
            required: !0
        },
        disabled: {
            type: Boolean,
            default: !1
        },
        title: {
            type: String,
            default: ""
        },
        listenPosition: {
            type: Boolean,
            default: !1
        }
    },
    methods: {
        ...b("queue", ["PUSH", "POP"]),
        handleClick(i) {
            this.disabled || this.$emit("click", i);
        }
    }
};
var y = function () {
    var t = this, n = t._self._c;
    return n("button", { staticClass: "loader-button", class: { sending: t.sending }, attrs: { disabled: t.disabled }, on: { click: t.handleClick } }, [t._t("default", function () {
        return [t._v(t._s(t.title))];
    }), n("svg", { attrs: { viewBox: "0 0 36 8" } }, [n("circle", { attrs: { cx: "4", cy: "4", r: "4" } }, [n("animate", { attrs: { attributeName: "opacity", dur: "1s", values: "0;1;0", repeatCount: "indefinite", begin: ".1" } })]), n("circle", { attrs: { cx: "18", cy: "4", r: "4" } }, [n("animate", { attrs: { attributeName: "opacity", dur: "1s", values: "0;1;0", repeatCount: "indefinite", begin: ".2" } })]), n("circle", { attrs: { cx: "32", cy: "4", r: "4" } }, [n("animate", { attrs: { attributeName: "opacity", dur: "1s", values: "0;1;0", repeatCount: "indefinite", begin: ".3" } })])])], 2);
}, $ = [], w = /* @__PURE__ */ C(
    g,
    y,
    $,
    !1,
    null,
    null,
    null,
    null
);
const B = w.exports;
function l(i) {
    l.installed || (l.installed = !0, i.component("LoaderButton", B));
}
const R = {
    install: l
};
let s = null;
typeof window < "u" ? s = window.Vue : typeof global < "u" && (s = global.Vue);
s && s.use(R);
export {
    B as default
};
