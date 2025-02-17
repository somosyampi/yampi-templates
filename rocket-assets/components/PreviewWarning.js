import { mapGetters as o } from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/vuex.js";
function r(n, e, i, v, w, m, _, g) {
  var s = typeof n == "function" ? n.options : n;
  return e && (s.render = e, s.staticRenderFns = i, s._compiled = !0), {
    exports: n,
    options: s
  };
}
const l = {
  name: "PreviewWarning",
  data() {
    return {
      previewIsClosed: !1
    };
  },
  computed: {
    ...o("preview", ["isIframe"]),
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
var c = function() {
  var e = this, i = e._self._c;
  return i("transition", { attrs: { name: "fade" } }, [e.showPreviewWarning ? i("div", { staticClass: "preview-warning" }, [i("span", { staticClass: "preview-warning--text" }, [e._v(" Esta Ã© uma prÃ©via da sua loja com os arquivos de cÃ³digo que foram salvos. Publique a loja para tornar esta versÃ£o disponÃ­vel para seus clientes. ")]), i("button", { staticClass: "preview-warning--close", on: { click: e.closePreview } }, [i("i", { staticClass: "icon icon-close-modal-white" })])]) : e._e()]);
}, u = [], d = /* @__PURE__ */ r(
  l,
  c,
  u
);
const f = d.exports;
function a(n) {
  a.installed || (a.installed = !0, n.component("PreviewWarning", f));
}
const p = {
  install: a
};
let t = null;
typeof window < "u" ? t = window.Vue : typeof global < "u" && (t = global.Vue);
t && t.use(p);
export {
  f as default
};