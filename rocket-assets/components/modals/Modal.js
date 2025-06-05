import v from "https://codigo-aberto-production-assets.s3.amazonaws.com/yampi-templates-sandbox/rocket-assets/dist/vendor/lodash.js";
function g(t, e, o, m, n, r, c, h) {
    var l = typeof t == "function" ? t.options : t;
    e && (l.render = e, l.staticRenderFns = o, l._compiled = !0), m && (l.functional = !0), r && (l._scopeId = "data-v-" + r);
    var a;
    if (c ? (a = function (s) {
        s = s || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !s && typeof __VUE_SSR_CONTEXT__ < "u" && (s = __VUE_SSR_CONTEXT__), n && n.call(this, s), s && s._registeredComponents && s._registeredComponents.add(c);
    }, l._ssrRegister = a) : n && (a = h ? function () {
        n.call(
            this,
            (l.functional ? this.parent : this).$root.$options.shadowRoot
        );
    } : n), a)
        if (l.functional) {
            l._injectStyles = a;
            var p = l.render;
            l.render = function (_, f) {
                return a.call(f), p(_, f);
            };
        } else {
            var u = l.beforeCreate;
            l.beforeCreate = u ? [].concat(u, a) : [a];
        }
    return {
        exports: t,
        options: l
    };
}
const b = {
    name: "Modal",
    props: {
        name: {
            type: String,
            required: !0
        },
        title: {
            type: String,
            default: ""
        },
        scrollable: {
            type: Boolean,
            default: !1
        },
        fixSafariBackground: {
            type: Boolean,
            default: !1
        }
    },
    data: () => ({
        show: !1
    }),
    mounted() {
        this.listenToEscape();
    },
    methods: {
        handleModal() {
            return {
                true: this.closeModal,
                false: this.showModal
            }[this.show]();
        },
        showModal() {
            this.show = !0;
            const t = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.marginRight = `${t}px`, document.getElementsByTagName("body")[0].classList.add("block-scroll");
        },
        closeModal() {
            this.$children.map((t) => {
                t.$options.name === "ImageSelector" && t.$children.map((o) => {
                    o.deleteInputFromClosingModal();
                });
            }), this.show = !1, document.getElementById("app").style.overflow = "", v.delay(() => {
                document.getElementsByTagName("body")[0].classList.remove("block-scroll"), document.documentElement.classList.remove("block-scroll"), document.body.style.marginRight = "0px";
            }, 350, "later"), this.$emit("close");
        },
        backgroundClick(t) {
            this.$el === t.target && this.closeModal();
        },
        listenToEscape() {
            document.addEventListener("keydown", (t) => {
                (t || window.event).key === "Escape" && this.closeModal();
            });
        }
    }
};
var C = function () {
    var e = this, o = e._self._c;
    return o("div", { staticClass: "modal-background", class: { active: e.show }, attrs: { role: "dialog", "aria-labelledby": "modal-title", "aria-describedby": "modal-desc" }, on: { mousedown: e.backgroundClick } }, [o("div", { staticClass: "modal", class: { scrollable: e.scrollable, "-fix": e.fixSafariBackground }, attrs: { id: "modal-" + e.name } }, [o("div", { staticClass: "flex -between" }, [o("div", { staticClass: "modal-header" }, [o("div", { staticClass: "theme-title", attrs: { id: "modal-title" }, domProps: { textContent: e._s(e.title) } }), o("div", { staticClass: "-subtitle", attrs: { id: "modal-desc" } }, [e._t("subtitle")], 2)]), o("div", { staticClass: "close-modal", on: { click: e.closeModal } }, [o("i", { staticClass: "icon icon-close-modal" })])]), o("div", { staticClass: "modal-content" }, [e._t("default")], 2), o("div", { staticClass: "modal-footer" }, [e._t("footer")], 2)])]);
}, y = [], w = /* @__PURE__ */ g(
    b,
    C,
    y,
    !1,
    null,
    null,
    null,
    null
);
const k = w.exports;
function d(t) {
    d.installed || (d.installed = !0, t.component("Modal", k));
}
const $ = {
    install: d
};
let i = null;
typeof window < "u" ? i = window.Vue : typeof global < "u" && (i = global.Vue);
i && i.use($);
export {
    k as default
};
