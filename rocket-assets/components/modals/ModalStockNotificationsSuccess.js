function p(i, t, s, _, a, r, f, v) {
  var e = typeof i == "function" ? i.options : i;
  t && (e.render = t, e.staticRenderFns = s, e._compiled = !0), _ && (e.functional = !0), r && (e._scopeId = "data-v-" + r);
  var n;
  if (f ? (n = function(o) {
    o = o || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !o && typeof __VUE_SSR_CONTEXT__ < "u" && (o = __VUE_SSR_CONTEXT__), a && a.call(this, o), o && o._registeredComponents && o._registeredComponents.add(f);
  }, e._ssrRegister = n) : a && (n = v ? function() {
    a.call(
      this,
      (e.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : a), n)
    if (e.functional) {
      e._injectStyles = n;
      var h = e.render;
      e.render = function(m, u) {
        return n.call(u), h(m, u);
      };
    } else {
      var d = e.beforeCreate;
      e.beforeCreate = d ? [].concat(d, n) : [n];
    }
  return {
    exports: i,
    options: e
  };
}
const C = {
  name: "ModalStockNotificationsSuccess",
  methods: {
    showModal() {
      this.$refs.stockNotificationsModal.showModal();
    },
    closeModal() {
      this.$refs.stockNotificationsModal.closeModal();
    }
  }
};
var M = function() {
  var t = this, s = t._self._c;
  return s("Modal", { ref: "stockNotificationsModal", attrs: { name: "stock-notifications" } }, [s("div", { staticClass: "flex flex-col -vcenter text-center" }, [s("i", { staticClass: "icon icon-success" }), s("div", { staticClass: "theme-title modal-success-title" }, [t._v(" Sucesso! ")]), s("div", { staticClass: "modal-success-subtitle" }, [t._v(" Voc\xEA receber\xE1 um e-mail quando este produto estiver em estoque ")]), s("button", { staticClass: "btn btn-secundary -success", on: { click: t.closeModal } }, [t._v(" Fechar ")])])]);
}, b = [], k = /* @__PURE__ */ p(
  C,
  M,
  b,
  !1,
  null,
  null,
  null,
  null
);
const $ = k.exports;
function c(i) {
  c.installed || (c.installed = !0, i.component("ModalStockNotificationsSuccess", $));
}
const w = {
  install: c
};
let l = null;
typeof window < "u" ? l = window.Vue : typeof global < "u" && (l = global.Vue);
l && l.use(w);
export {
  $ as default
};
