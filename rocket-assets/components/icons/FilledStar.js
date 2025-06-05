import { mapGetters as g } from "https://codigo-aberto-production-assets.s3.amazonaws.com/yampi-templates-sandbox/rocket-assets/dist/vendor/vuex.js";
function m(o, t, r, p, l, f, d, h) {
    var e = typeof o == "function" ? o.options : o;
    t && (e.render = t, e.staticRenderFns = r, e._compiled = !0), p && (e.functional = !0), f && (e._scopeId = "data-v-" + f);
    var i;
    if (d ? (i = function (n) {
        n = n || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !n && typeof __VUE_SSR_CONTEXT__ < "u" && (n = __VUE_SSR_CONTEXT__), l && l.call(this, n), n && n._registeredComponents && n._registeredComponents.add(d);
    }, e._ssrRegister = i) : l && (i = h ? function () {
        l.call(
            this,
            (e.functional ? this.parent : this).$root.$options.shadowRoot
        );
    } : l), i)
        if (e.functional) {
            e._injectStyles = i;
            var c = e.render;
            e.render = function (C, _) {
                return i.call(_), c(C, _);
            };
        } else {
            var u = e.beforeCreate;
            e.beforeCreate = u ? [].concat(u, i) : [i];
        }
    return {
        exports: o,
        options: e
    };
}
const v = {
    name: "FilledStar",
    props: {
        fillId: {
            type: [Number, String],
            default: 1
        },
        width: {
            type: [Number, String],
            default: 14
        },
        height: {
            type: [Number, String],
            default: 13
        },
        filledPercentage: {
            type: String,
            required: !0
        }
    },
    computed: {
        ...g("theme", ["themeStyle"])
    }
};
var w = function () {
    var t = this, r = t._self._c;
    return r("svg", { attrs: { width: t.width, height: t.height, viewBox: "0 0 14 13", fill: "none", xmlns: "http://www.w3.org/2000/svg" } }, [r("defs", [r("linearGradient", { attrs: { id: `half_grad-${t.fillId}` } }, [r("stop", { attrs: { offset: t.filledPercentage, "stop-color": t.themeStyle.grids_review_average_star_color } }), r("stop", { staticClass: "fixed-color", attrs: { offset: t.filledPercentage, "stop-color": "rgba(153, 153, 153, .3)", "stop-opacity": "1" } })], 1)], 1), r("path", { attrs: { d: "M7.13557 10.5846C6.92869 10.437 6.64896 10.437 6.44208 10.5846L3.26702 12.8498C3.11469 12.9585 2.91895 12.9892 2.73983 12.9327C2.42896 12.8345 2.25773 12.5067 2.35738 12.2005L3.55886 8.50882C3.63805 8.26549 3.54691 7.99973 3.33412 7.85355L0.252948 5.73677C0.0944532 5.62789 0 5.44957 0 5.25923C0 4.93768 0.264648 4.67701 0.591107 4.67701H4.34417C4.59811 4.67701 4.82368 4.51725 4.90452 4.28014L6.22848 0.397028C6.28741 0.224174 6.42516 0.0884988 6.60065 0.03045C6.91012 -0.0719175 7.24525 0.0922051 7.34918 0.397028L8.67313 4.28014C8.75398 4.51725 8.97954 4.67701 9.23349 4.67701H12.9866C13.1798 4.67701 13.3608 4.77004 13.4714 4.92616C13.6581 5.18989 13.5925 5.55282 13.3247 5.73677L10.2435 7.85355C10.0308 7.99973 9.93961 8.26549 10.0188 8.50882L11.2203 12.2005C11.2777 12.3769 11.2464 12.5697 11.1361 12.7198C10.9446 12.9802 10.575 13.0384 10.3106 12.8498L7.13557 10.5846Z", fill: `url(#half_grad-${t.fillId})` } })]);
}, S = [], b = /* @__PURE__ */ m(
    v,
    w,
    S,
    !1,
    null,
    null,
    null,
    null
);
const y = b.exports;
function s(o) {
    s.installed || (s.installed = !0, o.component("FilledStar", y));
}
const L = {
    install: s
};
let a = null;
typeof window < "u" ? a = window.Vue : typeof global < "u" && (a = global.Vue);
a && a.use(L);
export {
    y as default
};
