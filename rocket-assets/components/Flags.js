import s from "http://rocket.test/dist/vendor/lodash.js";
import r from "http://rocket.test/dist/vendor/modules/axios/api.js";
import d from "http://rocket.test/dist/vendor/mixins/product.js";
function f(t, e, a, o, h, y, v, F) {
  var l = typeof t == "function" ? t.options : t;
  return e && (l.render = e, l.staticRenderFns = a, l._compiled = !0), {
    exports: t,
    options: l
  };
}
const c = {
  name: "Flags",
  mixins: [
    d
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
    if (!s.isEmpty(this.defaultFlags)) {
      this.flags = this.defaultFlags;
      return;
    }
    const t = s.get(this.validProduct, "flags.data");
    if (!s.isNil(t)) {
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
        const { data: t } = await r.get(`catalog/products/${this.validProduct.id}/flags`);
        this.flags = t.data.filter((e) => e.active);
      } finally {
        this.loading = !1;
      }
    }
  }
};
var u = function() {
  var e = this, a = e._self._c;
  return e.flags.length ? a("div", { staticClass: "holder-flags", class: { "not-mosaic": !e.$parent.isMosaic } }, e._l(e.flags, function(o) {
    return a("span", { key: o.id, staticClass: "flag", style: e.getStyle(o), domProps: { textContent: e._s(o.name) } });
  }), 0) : e._e();
}, g = [], m = /* @__PURE__ */ f(
  c,
  u,
  g
);
const p = m.exports;
function i(t) {
  i.installed || (i.installed = !0, t.component("Flags", p));
}
const _ = {
  install: i
};
let n = null;
typeof window < "u" ? n = window.Vue : typeof global < "u" && (n = global.Vue);
n && n.use(_);
export {
  p as default
};
