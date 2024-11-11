import a from "http://rocket.test/dist/vendor/lodash.js";
function l(t, n, e, d, _, h, w, S) {
  var o = typeof t == "function" ? t.options : t;
  return n && (o.render = n, o.staticRenderFns = e, o._compiled = !0), {
    exports: t,
    options: o
  };
}
const u = {
  name: "Stopwatch",
  mounted() {
    this.loadCountdown();
  },
  data: () => ({
    html: ""
  }),
  methods: {
    loadCountdown() {
      const t = /* @__PURE__ */ new Date(), n = a.padStart(23 - t.getHours(), 2, "0"), e = a.padStart(59 - t.getMinutes(), 2, "0"), d = a.padStart(59 - t.getSeconds(), 2, "0");
      this.html = `${n} : ${e} : ${d}`, setTimeout(() => {
        this.loadCountdown();
      }, 500);
    }
  }
};
var c = function() {
  var n = this, e = n._self._c;
  return e("span", { staticClass: "stopwatch", domProps: { textContent: n._s(n.html) } });
}, r = [], f = /* @__PURE__ */ l(
  u,
  c,
  r
);
const m = f.exports;
function i(t) {
  i.installed || (i.installed = !0, t.component("Stopwatch", m));
}
const p = {
  install: i
};
let s = null;
typeof window < "u" ? s = window.Vue : typeof global < "u" && (s = global.Vue);
s && s.use(p);
export {
  m as default
};
