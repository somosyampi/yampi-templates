import t from "http://rocket.test/dist/vendor/vue.js";
function i(e, d, u, f, m, c, g, b) {
  var a = typeof e == "function" ? e.options : e;
  return {
    exports: e,
    options: a
  };
}
const r = {
  name: "SectionProvider",
  provide() {
    return {
      params: t.observable(this.params),
      pageConfig: t.observable(this.pageParams)
    };
  },
  props: {
    config: {
      type: Object,
      required: !0
    },
    pageConfig: {
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    var e;
    return {
      params: this.config.params,
      pageParams: (e = this.pageConfig) == null ? void 0 : e.data.theme.params
    };
  },
  render(e) {
    return this.$scopedSlots.default();
  }
};
var s = /* @__PURE__ */ i(
  r
);
const l = s.exports;
function o(e) {
  o.installed || (o.installed = !0, e.component("SectionProvider", l));
}
const p = {
  install: o
};
let n = null;
typeof window < "u" ? n = window.Vue : typeof global < "u" && (n = global.Vue);
n && n.use(p);
export {
  l as default
};
