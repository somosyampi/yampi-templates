import i from "lodash/get";
import r from "lodash/isNil";
import d from "lodash/isEmpty";
import f from "../vendor/modules/axios/api.js";
import c from "../vendor/mixins/product.js";
function u(t, e, a, o, v, F, w, b) {
  var l = typeof t == "function" ? t.options : t;
  return e && (l.render = e, l.staticRenderFns = a, l._compiled = !0), {
    exports: t,
    options: l
  };
}
const g = {
  name: "Flags",
  mixins: [
    c
  ],
  props: {
    defaultFlags: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    flags: [],
    loading: !1
  }),
  mounted() {
    if (!d(this.defaultFlags)) {
      this.flags = this.defaultFlags;
      return;
    }
    const t = i(this.validProduct, "flags.data");
    if (!r(t)) {
      this.flags = t;
      return;
    }
    this.loadFlags();
  },
  methods: {
    getStyle(t) {
      return {
        "--flag-color": t.text_color,
        "--flag-bg-color": t.background_color
      };
    },
    async loadFlags() {
      try {
        if (!this.validProduct) return;
        this.loading = !0;
        const { data: t } = await f.get(`catalog/products/${this.validProduct.id}/flags`);
        this.flags = t.data.filter((e) => e.active);
      } finally {
        this.loading = !1;
      }
    }
  }
};
var m = function() {
  var e = this, a = e._self._c;
  return e.flags.length ? a("div", { staticClass: "holder-flags", class: { "not-mosaic": !e.$parent.isMosaic } }, e._l(e.flags, function(o) {
    return a("span", { key: o.id, staticClass: "flag", style: e.getStyle(o), domProps: { textContent: e._s(o.name) } });
  }), 0) : e._e();
}, p = [], _ = /* @__PURE__ */ u(
  g,
  m,
  p
);
const h = _.exports;
function s(t) {
  s.installed || (s.installed = !0, t.component("Flags", h));
}
const y = {
  install: s
};
let n = null;
typeof window < "u" ? n = window.Vue : typeof global < "u" && (n = global.Vue);
n && n.use(y);
export {
  h as default
};
