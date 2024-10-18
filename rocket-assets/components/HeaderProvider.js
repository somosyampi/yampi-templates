import i from "https://s3.amazonaws.com/codigo-aberto-sandbox-assets/rocket/assets/rocket-preview/vendor/vue.js";
function r(e, u, f, p, c, m, b, v) {
  var t = typeof e == "function" ? e.options : e;
  return {
    exports: e,
    options: t
  };
}
const a = {
  name: "HeaderProvider",
  provide() {
    return {
      section: "header",
      params: i.observable(this.config.params)
    };
  },
  props: {
    config: {
      type: Object,
      required: !0
    }
  },
  render(e) {
    return this.$scopedSlots.default();
  }
};
var d = /* @__PURE__ */ r(
  a
);
const l = d.exports;
function o(e) {
  o.installed || (o.installed = !0, e.component("HeaderProvider", l));
}
const s = {
  install: o
};
let n = null;
typeof window < "u" ? n = window.Vue : typeof global < "u" && (n = global.Vue);
n && n.use(s);
export {
  l as default
};
