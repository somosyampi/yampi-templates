import f from "https://images-dev.yampi.me/rocket-sandbox/b/01/dist/vendor/lodash.js";
import C from "https://codigo-aberto-sandbox-assets.s3.amazonaws.com/yampi-templates-sandbox/rocket-assets/components/product/installments/BaseInstallments.js";
function g(l, e, t, n, r, c, u, m) {
  var a = typeof l == "function" ? l.options : l;
  e && (a.render = e, a.staticRenderFns = t, a._compiled = !0), n && (a.functional = !0), c && (a._scopeId = "data-v-" + c);
  var i;
  if (u ? (i = function(s) {
    s = s || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !s && typeof __VUE_SSR_CONTEXT__ < "u" && (s = __VUE_SSR_CONTEXT__), r && r.call(this, s), s && s._registeredComponents && s._registeredComponents.add(u);
  }, a._ssrRegister = i) : r && (i = m ? function() {
    r.call(
      this,
      (a.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : r), i)
    if (a.functional) {
      a._injectStyles = i;
      var p = a.render;
      a.render = function(v, h) {
        return i.call(h), p(v, h);
      };
    } else {
      var _ = a.beforeCreate;
      a.beforeCreate = _ ? [].concat(_, i) : [i];
    }
  return {
    exports: l,
    options: a
  };
}
const b = {
  name: "ModalInstallments",
  extends: C,
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
    get: f.get,
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
      return f.trimEnd(l, " *");
    }
  }
};
var y = function() {
  var e = this, t = e._self._c;
  return t("Modal", { ref: "installmentsBaseModal", attrs: { name: "installments", title: "Parcelamento", scrollable: !0 }, on: { close: e.cleanData } }, [t("template", { slot: "subtitle" }, [e._v(" " + e._s(e.product.name) + " ")]), t("div", { staticStyle: { "margin-bottom": "34px" } }, [t("div", { staticClass: "select-title" }, [e._v(" BANDEIRA ")]), t("CustomSelect", { attrs: { value: e.selectedAlias, "icon-url": e.iconUrl }, on: { change: e.handleSelectCard } }, e._l(e.creditCardOnly, function({ name: n, alias: r }) {
    return t("option", { key: n, domProps: { value: r, textContent: e._s(n) } });
  }), 0)], 1), t("div", [e.loading ? t("Loader", { attrs: { height: 50, margin: 13 } }) : t("div", [e.get(e.installments, "installments", []).length ? t("div", { class: { "-loading": e.loading } }, [t("div", { staticClass: "table-title" }, [e._v(" Valores para 1 unidade do produto ")]), t("table", { staticClass: "table" }, [t("tr", [t("th", [e._v("N\xBA parcela")]), t("th", [e._v("Valor da parcela")]), t("th", [e._v("Total do produto")])]), e._l(e.installments.installments, function(n) {
    return t("tr", { key: n.installment_value }, [t("td", [e._v(e._s(n.installment))]), t("td", [e._v(e._s(e.cleanText(n.text)))]), t("td", [e._v(e._s(n.amount_formated))])]);
  })], 2)]) : e._e()])], 1)], 2);
}, M = [], w = /* @__PURE__ */ g(
  b,
  y,
  M,
  !1,
  null,
  null,
  null,
  null
);
const S = w.exports;
function d(l) {
  d.installed || (d.installed = !0, l.component("ModalInstallments", S));
}
const $ = {
  install: d
};
let o = null;
typeof window < "u" ? o = window.Vue : typeof global < "u" && (o = global.Vue);
o && o.use($);
export {
  S as default
};
