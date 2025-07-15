function C(r, i, n, _, s, u, f, c) {
  var e = typeof r == "function" ? r.options : r;
  i && (e.render = i, e.staticRenderFns = n, e._compiled = !0), _ && (e.functional = !0), u && (e._scopeId = "data-v-" + u);
  var o;
  if (f ? (o = function(t) {
    t = t || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !t && typeof __VUE_SSR_CONTEXT__ < "u" && (t = __VUE_SSR_CONTEXT__), s && s.call(this, t), t && t._registeredComponents && t._registeredComponents.add(f);
  }, e._ssrRegister = o) : s && (o = c ? function() {
    s.call(
      this,
      (e.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : s), o)
    if (e.functional) {
      e._injectStyles = o;
      var h = e.render;
      e.render = function(b, p) {
        return o.call(p), h(b, p);
      };
    } else {
      var d = e.beforeCreate;
      e.beforeCreate = d ? [].concat(d, o) : [o];
    }
  return {
    exports: r,
    options: e
  };
}
const g = {
  name: "RocketButton",
  props: {
    label: {
      type: String,
      required: !0
    },
    customClasses: {
      type: String,
      default: ""
    }
  }
};
var R = function(i, n) {
  return i("button", n._g(n._b({ class: `rocket-button ${n.props.customClasses}` }, "button", n.data.attrs, !1), n.listeners), [n._v(" " + n._s(n.props.label) + " ")]);
}, $ = [], v = /* @__PURE__ */ C(
  g,
  R,
  $,
  !0,
  null,
  null,
  null,
  null
);
const w = v.exports;
function l(r) {
  l.installed || (l.installed = !0, r.component("RocketButton", w));
}
const V = {
  install: l
};
let a = null;
typeof window < "u" ? a = window.Vue : typeof global < "u" && (a = global.Vue);
a && a.use(V);
export {
  w as default
};
