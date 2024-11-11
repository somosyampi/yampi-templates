import l from "http://rocket.test/dist/vendor/lodash.js";
function r(a, e, t, o, n, v, h, y) {
  var s = typeof a == "function" ? a.options : a;
  return e && (s.render = e, s.staticRenderFns = t, s._compiled = !0), {
    exports: a,
    options: s
  };
}
const c = {
  name: "ModalZipcode",
  props: {
    data: {
      type: Object,
      required: !0
    }
  },
  data: () => ({
    subtitle: ""
  }),
  computed: {
    firstQuote() {
      return l.find(this.data) || {};
    }
  },
  methods: {
    showModal() {
      this.$refs.zipcodeBaseModal.showModal();
    },
    closeModal() {
      this.$refs.zipcodeBaseModal.closeModal();
    }
  }
};
var _ = function() {
  var e = this, t = e._self._c;
  return t("modal", { ref: "zipcodeBaseModal", attrs: { name: "zipcode", title: "Simular frete" } }, [t("template", { slot: "subtitle" }, [e._v(" Para o cep "), t("span", { staticClass: "selected-zipcode" }, [e._v(e._s(e._f("mask")(e.firstQuote.zipcode, "#####-###")))]), t("span", { staticClass: "-divisor" }, [e._v(" | ")]), t("span", { staticClass: "selected-city" }, [e._v(e._s(e.firstQuote.city) + " - " + e._s(e.firstQuote.uf))])]), t("table", { staticClass: "table" }, [t("tr", [t("th", [e._v("Tipo")]), t("th", [e._v("Prazo")]), t("th", [e._v("Valor")])]), e._l(e.data, function(o, n) {
    return t("tr", { key: o.quote_id }, [t("td", [e._v(e._s(o.service_display_name))]), t("td", [e._v(e._s(o.formated_delivery_time))]), t("td", { staticClass: "price" }, [e._v(e._s(o.formated_price))])]);
  })], 2), t("div", { staticClass: "disclaimer" }, [e._v(" Prazo de entrega a partir da aprovação de pagamento "), t("span", { staticClass: "display-hibrid" }, [e._v("e envio ao operador logístico.")])])], 2);
}, p = [], f = /* @__PURE__ */ r(
  c,
  _,
  p
);
const u = f.exports;
function d(a) {
  d.installed || (d.installed = !0, a.component("ModalZipcode", u));
}
const m = {
  install: d
};
let i = null;
typeof window < "u" ? i = window.Vue : typeof global < "u" && (i = global.Vue);
i && i.use(m);
export {
  u as default
};
