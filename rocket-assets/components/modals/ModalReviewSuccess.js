function m(a, s, i, _, t, d, c, v) {
  var e = typeof a == "function" ? a.options : a;
  s && (e.render = s, e.staticRenderFns = i, e._compiled = !0), _ && (e.functional = !0), d && (e._scopeId = "data-v-" + d);
  var o;
  if (c ? (o = function(n) {
    n = n || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !n && typeof __VUE_SSR_CONTEXT__ < "u" && (n = __VUE_SSR_CONTEXT__), t && t.call(this, n), n && n._registeredComponents && n._registeredComponents.add(c);
  }, e._ssrRegister = o) : t && (o = v ? function() {
    t.call(
      this,
      (e.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : t), o)
    if (e.functional) {
      e._injectStyles = o;
      var h = e.render;
      e.render = function(p, u) {
        return o.call(u), h(p, u);
      };
    } else {
      var f = e.beforeCreate;
      e.beforeCreate = f ? [].concat(f, o) : [o];
    }
  return {
    exports: a,
    options: e
  };
}
const w = {
  name: "ModalReviewSuccess",
  methods: {
    showModal() {
      this.$refs.reviewBaseModal.showModal();
    },
    closeModal() {
      this.$refs.reviewBaseModal.closeModal();
    }
  }
};
var C = function() {
  var s = this, i = s._self._c;
  return i("Modal", { ref: "reviewBaseModal", attrs: { name: "review-success" } }, [i("i", { staticClass: "icon icon-success" }), i("div", { staticClass: "theme-title modal-success-title" }, [s._v(" Avalia\xE7\xE3o enviada"), i("br"), s._v(" com sucesso! ")]), i("button", { staticClass: "btn btn-secundary -success", on: { click: s.closeModal } }, [s._v(" Fechar ")])]);
}, M = [], b = /* @__PURE__ */ m(
  w,
  C,
  M,
  !1,
  null,
  null,
  null,
  null
);
const R = b.exports;
function r(a) {
  r.installed || (r.installed = !0, a.component("ModalReviewSuccess", R));
}
const $ = {
  install: r
};
let l = null;
typeof window < "u" ? l = window.Vue : typeof global < "u" && (l = global.Vue);
l && l.use($);
export {
  R as default
};
