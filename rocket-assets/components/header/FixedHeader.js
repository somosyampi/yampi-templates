import v from "https://codigo-aberto-production-assets.s3.amazonaws.com/yampi-templates-sandbox/rocket-assets/dist/vendor/lodash.js";
import { mapGetters as w } from "https://codigo-aberto-production-assets.s3.amazonaws.com/yampi-templates-sandbox/rocket-assets/dist/vendor/vuex.js";
function b(t, o, d, s, r, f, u, p) {
    var e = typeof t == "function" ? t.options : t;
    o && (e.render = o, e.staticRenderFns = d, e._compiled = !0), s && (e.functional = !0), f && (e._scopeId = "data-v-" + f);
    var i;
    if (u ? (i = function (n) {
        n = n || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !n && typeof __VUE_SSR_CONTEXT__ < "u" && (n = __VUE_SSR_CONTEXT__), r && r.call(this, n), n && n._registeredComponents && n._registeredComponents.add(u);
    }, e._ssrRegister = i) : r && (i = p ? function () {
        r.call(
            this,
            (e.functional ? this.parent : this).$root.$options.shadowRoot
        );
    } : r), i)
        if (e.functional) {
            e._injectStyles = i;
            var _ = e.render;
            e.render = function (m, h) {
                return i.call(h), _(m, h);
            };
        } else {
            var c = e.beforeCreate;
            e.beforeCreate = c ? [].concat(c, i) : [i];
        }
    return {
        exports: t,
        options: e
    };
}
const g = {
    name: "FixedHeader",
    props: {
        fixed: {
            type: Boolean,
            default: !1
        }
    },
    data() {
        return {
            headerIsFixed: !1
        };
    },
    computed: {
        ...w("header", [
            "showSearchBar"
        ])
    },
    mounted() {
        this.listen();
    },
    updated() {
        this.updateScrollbarWidth();
    },
    methods: {
        updateScrollbarWidth() {
            document.documentElement.style.setProperty("--scrollbar-width", `${window.innerWidth - document.documentElement.clientWidth}px`);
        },
        listen() {
            if (window.onresize = () => {
                this.updateScrollbarWidth();
            }, !this.fixed)
                return;
            const t = document.getElementById("section-header"), o = 1;
            document.addEventListener(
                "scroll",
                v.debounce(() => {
                    const d = window.pageYOffset, s = t.clientHeight, r = d - s > o;
                    this.$store.dispatch("header/updateShowSearchBar", !r), this.headerIsFixed = r;
                }, 0),
                { passive: !0 }
            );
        }
    }
};
var C = function () {
    var o = this, d = o._self._c;
    return d("div", { class: { "fixed-header": o.headerIsFixed } }, [o._t("default")], 2);
}, F = [], S = /* @__PURE__ */ b(
    g,
    C,
    F,
    !1,
    null,
    null,
    null,
    null
);
const $ = S.exports;
function l(t) {
    l.installed || (l.installed = !0, t.component("FixedHeader", $));
}
const y = {
    install: l
};
let a = null;
typeof window < "u" ? a = window.Vue : typeof global < "u" && (a = global.Vue);
a && a.use(y);
export {
    $ as default
};
