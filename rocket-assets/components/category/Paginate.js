import C from "https://codigo-aberto-sandbox-assets.yampi.io.s3.amazonaws.com/yampi-templates-sandbox/rocket-assets/dist/vendor/mixins/queryParams.js";
function g(n, e, t, r, a, o, u, i) {
    var s = typeof n == "function" ? n.options : n;
    e && (s.render = e, s.staticRenderFns = t, s._compiled = !0), r && (s.functional = !0), o && (s._scopeId = "data-v-" + o);
    var f;
    if (u ? (f = function (l) {
        l = l || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !l && typeof __VUE_SSR_CONTEXT__ < "u" && (l = __VUE_SSR_CONTEXT__), a && a.call(this, l), l && l._registeredComponents && l._registeredComponents.add(u);
    }, s._ssrRegister = f) : a && (f = i ? function () {
        a.call(
            this,
            (s.functional ? this.parent : this).$root.$options.shadowRoot
        );
    } : a), f)
        if (s.functional) {
            s._injectStyles = f;
            var _ = s.render;
            s.render = function (m, h) {
                return f.call(h), _(m, h);
            };
        } else {
            var p = s.beforeCreate;
            s.beforeCreate = p ? [].concat(p, f) : [f];
        }
    return {
        exports: n,
        options: s
    };
}
const v = {
    name: "Paginate",
    mixins: [
        C
    ],
    props: {
        value: {
            type: Number,
            required: !0
        },
        pageCount: {
            type: Number,
            default: 10
        },
        pagerCount: {
            type: Number,
            default: 7
        },
        disabled: {
            type: Boolean,
            default: !1
        }
    },
    data: () => ({
        current: null,
        showPrevMore: !1,
        showNextMore: !1
    }),
    computed: {
        pagers() {
            const { pagerCount: n } = this, e = (n - 1) / 2, t = Number(this.current), r = Number(this.pageCount);
            let a = !1, o = !1;
            r > n && (t > n - e && (a = !0), t < r - e && (o = !0));
            const u = [];
            if (a && !o) {
                const i = r - (n - 2);
                for (let s = i; s < r; s++)
                    u.push(s);
            } else if (!a && o)
                for (let i = 2; i < n; i++)
                    u.push(i);
            else if (a && o) {
                const i = Math.floor(n / 2) - 1;
                for (let s = t - i; s <= t + i; s++)
                    u.push(s);
            } else
                for (let i = 2; i < r; i++)
                    u.push(i);
            return this.showPrevMore = a, this.showNextMore = o, u;
        }
    },
    watch: {
        value: {
            immediate: !0,
            handler() {
                this.current = this.value;
            }
        }
    },
    methods: {
        onPagerClick(n) {
            const { target: e } = n;
            if (e.tagName === "UL" || this.disabled)
                return;
            let t = Number(n.target.textContent);
            const { pageCount: r } = this, a = this.current, o = this.pagerCount - 2;
            e.className.indexOf("more") !== -1 && (e.className.indexOf("quickprev") !== -1 ? t = a - o : e.className.indexOf("quicknext") !== -1 && (t = a + o)), isNaN(t) || (t < 1 && (t = 1), t > r && (t = r)), t !== a && (this.current = t, this.$emit("input", t));
        }
    }
};
var b = function () {
    var e = this, t = e._self._c;
    return t("ul", { staticClass: "paginate", on: { click: e.onPagerClick } }, [e.pageCount > 0 ? t("li", { staticClass: "number", class: { active: e.current === 1, disabled: e.disabled } }, [e._v(" 1 ")]) : e._e(), e.showPrevMore ? t("li", { staticClass: "more", class: { disabled: e.disabled } }, [e._v(" ... ")]) : e._e(), e._l(e.pagers, function (r) {
        return t("li", { key: r, staticClass: "number", class: { active: e.current === r, disabled: e.disabled }, domProps: { textContent: e._s(r) } });
    }), e.showNextMore ? t("li", { staticClass: "more", class: { disabled: e.disabled } }, [e._v(" ... ")]) : e._e(), e.pageCount > 1 ? t("li", { staticClass: "number", class: { active: e.current === e.pageCount, disabled: e.disabled }, domProps: { textContent: e._s(e.pageCount) } }) : e._e()], 2);
}, N = [], P = /* @__PURE__ */ g(
    v,
    b,
    N,
    !1,
    null,
    null,
    null,
    null
);
const w = P.exports;
function c(n) {
    c.installed || (c.installed = !0, n.component("Paginate", w));
}
const y = {
    install: c
};
let d = null;
typeof window < "u" ? d = window.Vue : typeof global < "u" && (d = global.Vue);
d && d.use(y);
export {
    w as default
};
