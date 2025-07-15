import v from "https://codigo-aberto-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/mixins/mobile.js";
function h(t, n, s, a, r, f, d, c) {
    var e = typeof t == "function" ? t.options : t;
    n && (e.render = n, e.staticRenderFns = s, e._compiled = !0), a && (e.functional = !0), f && (e._scopeId = "data-v-" + f);
    var o;
    if (d ? (o = function (i) {
        i = i || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !i && typeof __VUE_SSR_CONTEXT__ < "u" && (i = __VUE_SSR_CONTEXT__), r && r.call(this, i), i && i._registeredComponents && i._registeredComponents.add(d);
    }, e._ssrRegister = o) : r && (o = c ? function () {
        r.call(
            this,
            (e.functional ? this.parent : this).$root.$options.shadowRoot
        );
    } : r), o)
        if (e.functional) {
            e._injectStyles = o;
            var m = e.render;
            e.render = function (g, p) {
                return o.call(p), m(g, p);
            };
        } else {
            var _ = e.beforeCreate;
            e.beforeCreate = _ ? [].concat(_, o) : [o];
        }
    return {
        exports: t,
        options: e
    };
}
const C = {
    name: "PagesList",
    mixins: [
        v
    ],
    props: {
        pageList: {
            type: Array,
            required: !0
        },
        selectedPage: {
            type: String,
            required: !0
        }
    },
    data: () => ({}),
    mounted() {
    },
    methods: {
        openPage(t) {
            this.$redirectTo(t);
        },
        activePage() {
            return `/atendimento/${this.selectedPage}`;
        }
    }
};
var P = function () {
    var n = this, s = n._self._c;
    return n.isMobile ? s("div", { staticClass: "pages-list flex" }, [s("custom-select", { tag: "select", attrs: { id: "pages-select", name: "pages", value: n.activePage() }, on: { change: n.openPage } }, n._l(n.pageList, function (a) {
        return s("option", { key: a.slug, domProps: { value: a.path } }, [n._v(" " + n._s(a.name) + " ")]);
    }), 0)], 1) : n._e();
}, $ = [], b = /* @__PURE__ */ h(
    C,
    P,
    $,
    !1,
    null,
    null,
    null,
    null
);
const y = b.exports;
function u(t) {
    u.installed || (u.installed = !0, t.component("PagesList", y));
}
const R = {
    install: u
};
let l = null;
typeof window < "u" ? l = window.Vue : typeof global < "u" && (l = global.Vue);
l && l.use(R);
export {
    y as default
};
