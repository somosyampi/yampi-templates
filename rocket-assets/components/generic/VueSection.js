function l(e, n, i, _, m, p, h, w) {
  var t = typeof e == "function" ? e.options : e;
  return n && (t.render = n, t.staticRenderFns = i, t._compiled = !0), {
    exports: e,
    options: t
  };
}
const a = {
  name: "VueSection",
  props: {
    delay: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      show: !1
    };
  },
  mounted() {
    this.showSection();
  },
  methods: {
    showSection() {
      setTimeout(() => {
        this.show = !0;
      }, this.delay);
    }
  }
};
var u = function() {
  var n = this, i = n._self._c;
  return n.show ? i("section", { staticClass: "done" }, [n._t("default")], 2) : n._e();
}, d = [], c = /* @__PURE__ */ l(
  a,
  u,
  d
);
const f = c.exports;
function s(e) {
  s.installed || (s.installed = !0, e.component("VueSection", f));
}
const r = {
  install: s
};
let o = null;
typeof window < "u" ? o = window.Vue : typeof global < "u" && (o = global.Vue);
o && o.use(r);
export {
  f as default
};
