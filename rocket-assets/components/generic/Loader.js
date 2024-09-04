function s(e, t, l, c, p, m, g, _) {
  var n = typeof e == "function" ? e.options : e;
  return t && (n.render = t, n.staticRenderFns = l, n._compiled = !0), {
    exports: e,
    options: n
  };
}
const a = {
  props: {
    width: {
      type: Number,
      default: null
    },
    height: {
      type: Number,
      default: null
    },
    margin: {
      type: Number,
      default: 0
    },
    customStyle: {
      type: String,
      default: null
    }
  },
  methods: {
    getStyle() {
      return {
        width: this.width ? `${this.width}%` : !1,
        height: this.height ? `${this.height}px` : !1,
        marginTop: this.margin ? `${this.margin}px` : !1
      };
    }
  }
};
var u = function() {
  var t = this, l = t._self._c;
  return l("div", { staticClass: "loader-bg", style: t.getStyle() });
}, d = [], r = /* @__PURE__ */ s(
  a,
  u,
  d
);
const f = r.exports;
function o(e) {
  o.installed || (o.installed = !0, e.component("Loader", f));
}
const h = {
  install: o
};
let i = null;
typeof window < "u" ? i = window.Vue : typeof global < "u" && (i = global.Vue);
i && i.use(h);
export {
  f as default
};
