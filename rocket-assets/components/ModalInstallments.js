import r from "lodash/trimEnd";
import d from "lodash/get";
import c from "../components/product/BaseInstallments";
function u(l, e, t, a, i, g, y, C) {
  var s = typeof l == "function" ? l.options : l;
  return e && (s.render = e, s.staticRenderFns = t, s._compiled = !0), {
    exports: l,
    options: s
  };
}
const m = {
  name: "ModalInstallments",
  extends: c,
  props: {
    product: {
      type: Object,
      required: !0
    }
  },
  data() {
    return {
      selected: []
    };
  },
  computed: {
    selectedCard() {
      return this.selected.length ? this.selected[0] : this.defaultCard;
    },
    iconUrl() {
      var l;
      return ((l = this.selectedCard) == null ? void 0 : l.icon_url) || "";
    },
    selectedAlias() {
      var l;
      return ((l = this.selectedCard) == null ? void 0 : l.alias) || "";
    }
  },
  watch: {
    product() {
      this.handleSelectCard(this.selectedAlias);
    }
  },
  created() {
    this.handleSelectCard(this.selectedAlias);
  },
  methods: {
    get: d,
    async handleSelectCard(l) {
      try {
        if (!l)
          return;
        this.selected = this.merchant.payments.filter(
          (e) => e.alias === l
        ), this.installments = await this.handleInstallments(
          l
        );
      } catch (e) {
        console.error(e);
      } finally {
        this.loading = !1;
      }
    },
    showModal() {
      this.$refs.installmentsBaseModal.showModal();
    },
    cleanData() {
      this.selected = [], this.handleSelectCard(this.selectedAlias);
    },
    closeModal() {
      this.$refs.installmentsBaseModal.closeModal();
    },
    cleanText(l) {
      return r(l, " *");
    }
  }
};
var h = function() {
  var e = this, t = e._self._c;
  return t("modal", { ref: "installmentsBaseModal", attrs: { name: "installments", title: "Parcelamento", scrollable: !0 }, on: { close: e.cleanData } }, [t("template", { slot: "subtitle" }, [e._v(" " + e._s(e.product.name) + " ")]), t("div", { staticStyle: { "margin-bottom": "34px" } }, [t("div", { staticClass: "select-title" }, [e._v(" BANDEIRA ")]), t("custom-select", { attrs: { value: e.selectedAlias, "icon-url": e.iconUrl }, on: { change: e.handleSelectCard } }, e._l(e.creditCardOnly, function({ name: a, alias: i }) {
    return t("option", { key: a, domProps: { value: i, textContent: e._s(a) } });
  }), 0)], 1), t("div", [e.loading ? t("loader", { attrs: { height: 50, margin: 13 } }) : t("div", [e.get(e.installments, "installments", []).length ? t("div", { class: { "-loading": e.loading } }, [t("div", { staticClass: "table-title" }, [e._v(" Valores para 1 unidade do produto ")]), t("table", { staticClass: "table" }, [t("tr", [t("th", [e._v("Nº parcela")]), t("th", [e._v("Valor da parcela")]), t("th", [e._v("Total do produto")])]), e._l(e.installments.installments, function(a) {
    return t("tr", { key: a.installment_value }, [t("td", [e._v(e._s(a.installment))]), t("td", [e._v(e._s(e.cleanText(a.text)))]), t("td", [e._v(e._s(a.amount_formated))])]);
  })], 2)]) : e._e()])], 1)], 2);
}, _ = [], f = /* @__PURE__ */ u(
  m,
  h,
  _
);
const p = f.exports;
function o(l) {
  o.installed || (o.installed = !0, l.component("ModalInstallments", p));
}
const v = {
  install: o
};
let n = null;
typeof window < "u" ? n = window.Vue : typeof global < "u" && (n = global.Vue);
n && n.use(v);
export {
  p as default
};
