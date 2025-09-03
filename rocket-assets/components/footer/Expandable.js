import g from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/mixins/mobile.js";
function m(s, t, i, p, a, d, f, _) {
    var e = typeof s == "function" ? s.options : s;
    t && (e.render = t, e.staticRenderFns = i, e._compiled = !0), p && (e.functional = !0), d && (e._scopeId = "data-v-" + d);
    var r;
    if (f ? (r = function (n) {
        n = n || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !n && typeof __VUE_SSR_CONTEXT__ < "u" && (n = __VUE_SSR_CONTEXT__), a && a.call(this, n), n && n._registeredComponents && n._registeredComponents.add(f);
    }, e._ssrRegister = r) : a && (r = _ ? function () {
        a.call(
            this,
            (e.functional ? this.parent : this).$root.$options.shadowRoot
        );
    } : a), r)
        if (e.functional) {
            e._injectStyles = r;
            var c = e.render;
            e.render = function (v, u) {
                return r.call(u), c(v, u);
            };
        } else {
            var h = e.beforeCreate;
            e.beforeCreate = h ? [].concat(h, r) : [r];
        }
    return {
        exports: s,
        options: e
    };
}
const b = {
    name: "Expandable",
    mixins: [
        g
    ],
    props: {
        title: {
            type: String,
            required: !0
        },
        height: {
            type: Number,
            default: 53
        },
        expand: {
            type: Boolean,
            default: !1
        }
    },
    data() {
        return {
            isExpanded: !1
        };
    },
    watch: {
        isMobile() {
            this.start();
        }
    },
    mounted() {
        this.start();
    },
    methods: {
        open() {
            this.setHeight(this.$refs.target.scrollHeight, !0);
        },
        close() {
            this.setHeight(this.height, !1);
        },
        setHeight(s, t) {
            this.isExpanded = t, this.$refs.target.style.height = s ? `${s}px` : null;
        },
        reverse() {
            return this.isExpanded ? this.close() : this.open();
        },
        start() {
            if (this.isMobile)
                return this.startMobile();
            this.startDesktop();
        },
        startMobile() {
            return this.expand ? this.open() : this.close();
        },
        startDesktop() {
            this.setHeight(null, !0);
        }
    }
};
var C = function () {
    var t = this, i = t._self._c;
    return i("div", { ref: "target", staticClass: "expandable-holder", class: { "is-expanded": t.isExpanded } }, [t.isMobile ? i("div", { staticClass: "expandable-title flex -between -vcenter", on: { click: t.reverse } }, [i("span", { domProps: { textContent: t._s(t.title) } }), i("svg", { attrs: { width: "11", height: "6", fill: "none" } }, [i("defs"), i("path", { attrs: { d: "M4.878 5.727c.364.364.849.364 1.213 0l4.242-4.242c.364-.364.364-.849 0-1.212-.364-.364-.848-.364-1.212 0L4.878 4.515c-.363.364-.363.849 0 1.212z" } }), i("path", { attrs: { d: "M6.09 5.727c.364-.363.364-.848 0-1.212L1.849.273C1.484-.091 1-.091.636.273c-.364.363-.364.848 0 1.212l4.242 4.242c.364.364.849.364 1.213 0z" } })])]) : t._e(), t._t("default")], 2);
}, x = [], $ = /* @__PURE__ */ m(
    b,
    C,
    x,
    !1,
    null,
    null,
    null,
    null
);
const w = $.exports;
function l(s) {
    l.installed || (l.installed = !0, s.component("Expandable", w));
}
const M = {
    install: l
};
let o = null;
typeof window < "u" ? o = window.Vue : typeof global < "u" && (o = global.Vue);
o && o.use(M);
export {
    w as default
};
