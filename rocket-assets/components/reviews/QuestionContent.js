import d from "https://s3.amazonaws.com/codigo-aberto-sandbox-assets/rocket/assets/rocket-preview/components/reviews/BaseContent.js";
function r(a, e, t, s, l, v, C, g) {
  var n = typeof a == "function" ? a.options : a;
  return e && (n.render = e, n.staticRenderFns = t, n._compiled = !0), {
    exports: a,
    options: n
  };
}
const c = {
  name: "QuestionContent",
  extends: d,
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
var u = function() {
  var e = this, t = e._self._c;
  return t("div", { staticClass: "tab-content" }, [t("div", { staticClass: "holder-questions" }, [t("div", { staticClass: "btn btn-secundary", on: { click: e.showModal } }, [e._v(" Perguntar ")]), t("br"), e.payload.length ? t("div", [t("div", e._l(e.payload, function(s, l) {
    return t("div", { key: l, staticClass: "holder-question" }, [t("div", { staticClass: "question" }, [t("span", { staticClass: "-name", domProps: { textContent: e._s(s.name) } }), e.showDates ? t("Timeago", { staticClass: "-time-ago", attrs: { date: s.created_at.date } }) : e._e(), t("div", { staticClass: "-text", domProps: { textContent: e._s(s.message) } })], 1), s.answer ? t("div", { staticClass: "answer" }, [t("div", { staticClass: "-store-icon", style: e.getIconStyle() }), t("span", { staticClass: "-store-name", domProps: { textContent: e._s(s.answer.name) } }), e.showDates ? t("Timeago", { staticClass: "-time-ago", attrs: { date: s.answer.created_at.date } }) : e._e(), t("div", { staticClass: "-text", domProps: { innerHTML: e._s(s.answer.message) } })], 1) : e._e()]);
  }), 0), t("br"), e.showLoadMore ? t("div", { staticClass: "load-more", on: { click: function(s) {
    return e.loadData(!0);
  } } }, [e._v(" + Ver mais dúvidas ")]) : e._e()]) : e.loading ? e._e() : t("div", { staticClass: "alert -yellow" }, [e._v(" Esse produto ainda não possui nenhuma dúvida. "), t("b", { staticClass: "link-alike", on: { click: e.showModal } }, [e._v("Seja o primeiro a perguntar")])]), e.isLoading ? t("div", [t("br"), t("i", { staticClass: "icon icon-loader-dark" })]) : e._e()]), t("modal-question", { ref: "modal", on: { success: e.showModalSuccess } }), t("modal-question-success", { ref: "modalSuccess" })], 1);
}, m = [], _ = /* @__PURE__ */ r(
  c,
  u,
  m
);
const f = _.exports;
function i(a) {
  i.installed || (i.installed = !0, a.component("QuestionContent", f));
}
const p = {
  install: i
};
let o = null;
typeof window < "u" ? o = window.Vue : typeof global < "u" && (o = global.Vue);
o && o.use(p);
export {
  f as default
};
