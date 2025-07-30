import { mapGetters as w } from "https://codigo-aberto-sandbox-assets.yampi.io.s3.amazonaws.com/yampi-templates-sandbox/rocket-assets/dist/vendor/vuex.js";
function g(n, e, i, a, s, d, f, v) {
    var t = typeof n == "function" ? n.options : n;
    e && (t.render = e, t.staticRenderFns = i, t._compiled = !0), a && (t.functional = !0), d && (t._scopeId = "data-v-" + d);
    var o;
    if (f ? (o = function (r) {
        r = r || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !r && typeof __VUE_SSR_CONTEXT__ < "u" && (r = __VUE_SSR_CONTEXT__), s && s.call(this, r), r && r._registeredComponents && r._registeredComponents.add(f);
    }, t._ssrRegister = o) : s && (o = v ? function () {
        s.call(
            this,
            (t.functional ? this.parent : this).$root.$options.shadowRoot
        );
    } : s), o)
        if (t.functional) {
            t._injectStyles = o;
            var h = t.render;
            t.render = function (_, u) {
                return o.call(u), h(_, u);
            };
        } else {
            var m = t.beforeCreate;
            t.beforeCreate = m ? [].concat(m, o) : [o];
        }
    return {
        exports: n,
        options: t
    };
}
const p = {
    name: "NavigationDrawer",
    data() {
        return {
            active: !1,
            scrollY: 0
        };
    },
    computed: {
        ...w("preview", ["activeSection"])
    },
    mounted() {
        this.$store.subscribe(({ type: n, payload: e }) => {
            n !== "cart/EVENT_ADDED_TO_CART" || (e == null ? void 0 : e.error) || this.handleDrawer();
        }), window.addEventListener("touchstart", () => {
            this.syncHeight();
        }), window.addEventListener("resize", () => {
            this.syncHeight();
        });
    },
    destroyed() {
        window.removeEventListener("touchstart", () => {
        }), window.removeEventListener("resize", () => {
        });
    },
    methods: {
        handleDrawer() {
            this.active = !this.active;
        },
        syncHeight() {
            document.documentElement.style.setProperty(
                "--window-inner-height",
                `${window.innerHeight}px`
            ), document.documentElement.style.setProperty(
                "--margin-to-scroll",
                `${this.scrollY}px`
            );
        },
        beforeEnter() {
            this.scrollY = window.scrollY, this.syncHeight(), document.documentElement.classList.add("block-scroll"), document.getElementsByTagName("body")[0].classList.add("drawer-active"), document.getElementsByTagName("body")[0].classList.add("block-scroll"), this.$emit("beforeEnter");
        },
        afterEnter() {
            this.$emit("afterEnter");
        },
        beforeLeave() {
            document.getElementsByTagName("body")[0].classList.remove("drawer-active"), this.$emit("beforeLeave");
        },
        afterLeave() {
            document.body.style.marginRight = "0px", document.getElementsByTagName("body")[0].classList.remove("block-scroll"), document.documentElement.classList.remove("block-scroll"), window.scrollTo(0, this.scrollY), this.$emit("afterLeave");
        }
    }
};
var b = function () {
    var e = this, i = e._self._c;
    return i("RocketEmitter", { staticClass: "side-cart-emitter", attrs: { emits: "cart", label: "Carrinho de compras" }, on: { openCategory: e.handleDrawer } }, [i("Transition", { attrs: { name: "drawer-animation" }, on: { "after-enter": e.afterEnter, "before-enter": e.beforeEnter, "after-leave": e.afterLeave, "before-leave": e.beforeLeave } }, [e.active ? i("div", {
        staticClass: "navigation-drawer-background", on: {
            click: function (a) {
                return a.stopPropagation(), e.handleDrawer.apply(null, arguments);
            }
        }
    }, [i("div", {
        staticClass: "navigation-drawer-container", on: {
            click: function (a) {
                a.stopPropagation();
            }
        }
    }, [i("div", { staticClass: "navigation-drawer" }, [e._t("default")], 2)])]) : e._e()])], 1);
}, E = [], y = /* @__PURE__ */ g(
    p,
    b,
    E,
    !1,
    null,
    null,
    null,
    null
);
const C = y.exports;
function c(n) {
    c.installed || (c.installed = !0, n.component("NavigationDrawer", C));
}
const L = {
    install: c
};
let l = null;
typeof window < "u" ? l = window.Vue : typeof global < "u" && (l = global.Vue);
l && l.use(L);
export {
    C as default
};
