function g(i, o, s, _, r, f, u, p) {
  var e = typeof i == "function" ? i.options : i;
  o && (e.render = o, e.staticRenderFns = s, e._compiled = !0), _ && (e.functional = !0), f && (e._scopeId = "data-v-" + f);
  var t;
  if (u ? (t = function(n) {
    n = n || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !n && typeof __VUE_SSR_CONTEXT__ < "u" && (n = __VUE_SSR_CONTEXT__), r && r.call(this, n), n && n._registeredComponents && n._registeredComponents.add(u);
  }, e._ssrRegister = t) : r && (t = p ? function() {
    r.call(
      this,
      (e.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : r), t)
    if (e.functional) {
      e._injectStyles = t;
      var c = e.render;
      e.render = function(m, h) {
        return t.call(h), c(m, h);
      };
    } else {
      var d = e.beforeCreate;
      e.beforeCreate = d ? [].concat(d, t) : [t];
    }
  return {
    exports: i,
    options: e
  };
}
const v = {
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
var y = function() {
  var o = this, s = o._self._c;
  return s("div", { staticClass: "loader-bg", style: o.getStyle() });
}, C = [], b = /* @__PURE__ */ g(
  v,
  y,
  C,
  !1,
  null,
  null,
  null,
  null
);
const w = b.exports;
function a(i) {
  a.installed || (a.installed = !0, i.component("Loader", w));
}
const $ = {
  install: a
};
let l = null;
typeof window < "u" ? l = window.Vue : typeof global < "u" && (l = global.Vue);
l && l.use($);
export {
  w as default
};
