import C from "https://codigo-aberto-production-assets.s3.amazonaws.com/yampi-templates-sandbox/rocket-assets/components/product/reviews/BaseContent.js";
function h(i, e, t, a, r, c, u, m) {
    var s = typeof i == "function" ? i.options : i;
    e && (s.render = e, s.staticRenderFns = t, s._compiled = !0), a && (s.functional = !0), c && (s._scopeId = "data-v-" + c);
    var o;
    if (u ? (o = function (n) {
        n = n || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !n && typeof __VUE_SSR_CONTEXT__ < "u" && (n = __VUE_SSR_CONTEXT__), r && r.call(this, n), n && n._registeredComponents && n._registeredComponents.add(u);
    }, s._ssrRegister = o) : r && (o = m ? function () {
        r.call(
            this,
            (s.functional ? this.parent : this).$root.$options.shadowRoot
        );
    } : r), o)
        if (s.functional) {
            s._injectStyles = o;
            var v = s.render;
            s.render = function (p, f) {
                return o.call(f), v(p, f);
            };
        } else {
            var _ = s.beforeCreate;
            s.beforeCreate = _ ? [].concat(_, o) : [o];
        }
    return {
        exports: i,
        options: s
    };
}
const g = {
    name: "QuestionContent",
    extends: C,
    props: {
        icon: {
            type: String,
            default: null
        }
    },
    data: () => ({
        route: "comments"
    }),
    methods: {
        getIconStyle() {
            return {
                "--store-icon": this.icon ? `url('${this.icon}')` : !1
            };
        }
    }
};
var w = function () {
    var e = this, t = e._self._c;
    return t("div", { staticClass: "tab-content" }, [t("div", { staticClass: "holder-questions" }, [t("div", { staticClass: "btn btn-secundary", on: { click: e.showModal } }, [e._v(" Perguntar ")]), t("br"), e.payload.length ? t("div", [t("div", e._l(e.payload, function (a, r) {
        return t("div", { key: r, staticClass: "holder-question" }, [t("div", { staticClass: "question" }, [t("span", { staticClass: "-name", domProps: { textContent: e._s(a.name) } }), e.showDates ? t("Timeago", { staticClass: "-time-ago", attrs: { date: a.created_at.date } }) : e._e(), t("div", { staticClass: "-text", domProps: { textContent: e._s(a.message) } })], 1), a.answer ? t("div", { staticClass: "answer" }, [t("div", { staticClass: "-store-icon", style: e.getIconStyle() }), t("span", { staticClass: "-store-name", domProps: { textContent: e._s(a.answer.name) } }), e.showDates ? t("Timeago", { staticClass: "-time-ago", attrs: { date: a.answer.created_at.date } }) : e._e(), t("div", { staticClass: "-text", domProps: { innerHTML: e._s(a.answer.message) } })], 1) : e._e()]);
    }), 0), t("br"), e.showLoadMore ? t("div", {
        staticClass: "load-more", on: {
            click: function (a) {
                return e.loadData(!0);
            }
        }
    }, [e._v(" + Ver mais d\xFAvidas ")]) : e._e()]) : e.loading ? e._e() : t("div", { staticClass: "alert -yellow" }, [e._v(" Esse produto ainda n\xE3o possui nenhuma d\xFAvida. "), t("b", { staticClass: "link-alike", on: { click: e.showModal } }, [e._v("Seja o primeiro a perguntar")])]), e.isLoading ? t("div", [t("br"), t("i", { staticClass: "icon icon-loader-dark" })]) : e._e()]), t("ModalQuestion", { ref: "modal", on: { success: e.showModalSuccess } }), t("ModalQuestionSuccess", { ref: "modalSuccess" })], 1);
}, b = [], y = /* @__PURE__ */ h(
    g,
    w,
    b,
    !1,
    null,
    null,
    null,
    null
);
const S = y.exports;
function d(i) {
    d.installed || (d.installed = !0, i.component("QuestionContent", S));
}
const k = {
    install: d
};
let l = null;
typeof window < "u" ? l = window.Vue : typeof global < "u" && (l = global.Vue);
l && l.use(k);
export {
    S as default
};
