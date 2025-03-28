import { mapGetters as m } from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/vuex.js";
function h(s, i, a, _, o, f, u, c) {
  var e = typeof s == "function" ? s.options : s;
  i && (e.render = i, e.staticRenderFns = a, e._compiled = !0), _ && (e.functional = !0), f && (e._scopeId = "data-v-" + f);
  var r;
  if (u ? (r = function(n) {
    n = n || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !n && typeof __VUE_SSR_CONTEXT__ < "u" && (n = __VUE_SSR_CONTEXT__), o && o.call(this, n), n && n._registeredComponents && n._registeredComponents.add(u);
  }, e._ssrRegister = r) : o && (r = c ? function() {
    o.call(
      this,
      (e.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : o), r)
    if (e.functional) {
      e._injectStyles = r;
      var p = e.render;
      e.render = function(w, v) {
        return r.call(v), p(w, v);
      };
    } else {
      var d = e.beforeCreate;
      e.beforeCreate = d ? [].concat(d, r) : [r];
    }
  return {
    exports: s,
    options: e
  };
}
const C = {
  name: "PreviewWarning",
  data() {
    return {
      previewIsClosed: !1
    };
  },
  computed: {
    ...m("preview", ["isIframe"]),
    showPreviewWarning() {
      return this.isIframe ? !1 : !this.previewIsClosed;
    }
  },
  methods: {
    closePreview() {
      this.previewIsClosed = !0;
    }
  }
};
var g = function() {
  var i = this, a = i._self._c;
  return a("Transition", { attrs: { name: "fade" } }, [i.showPreviewWarning ? a("div", { staticClass: "preview-warning" }, [a("span", { staticClass: "preview-warning--text" }, [i._v(" Esta \xE9 uma pr\xE9via da sua loja com os arquivos de c\xF3digo que foram salvos. Publique a loja para tornar esta vers\xE3o dispon\xEDvel para seus clientes. ")]), a("button", { staticClass: "preview-warning--close", on: { click: i.closePreview } }, [a("i", { staticClass: "icon icon-close-modal-white" })])]) : i._e()]);
}, b = [], P = /* @__PURE__ */ h(
  C,
  g,
  b,
  !1,
  null,
  null,
  null,
  null
);
const R = P.exports;
function l(s) {
  l.installed || (l.installed = !0, s.component("PreviewWarning", R));
}
const $ = {
  install: l
};
let t = null;
typeof window < "u" ? t = window.Vue : typeof global < "u" && (t = global.Vue);
t && t.use($);
export {
  R as default
};
