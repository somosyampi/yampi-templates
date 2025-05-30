function C(t, a, e, _, s, f, u, c) {
  var n = typeof t == "function" ? t.options : t;
  a && (n.render = a, n.staticRenderFns = e, n._compiled = !0), _ && (n.functional = !0), f && (n._scopeId = "data-v-" + f);
  var o;
  if (u ? (o = function(r) {
    r = r || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !r && typeof __VUE_SSR_CONTEXT__ < "u" && (r = __VUE_SSR_CONTEXT__), s && s.call(this, r), r && r._registeredComponents && r._registeredComponents.add(u);
  }, n._ssrRegister = o) : s && (o = c ? function() {
    s.call(
      this,
      (n.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : s), o)
    if (n.functional) {
      n._injectStyles = o;
      var h = n.render;
      n.render = function(g, d) {
        return o.call(d), h(g, d);
      };
    } else {
      var p = n.beforeCreate;
      n.beforeCreate = p ? [].concat(p, o) : [o];
    }
  return {
    exports: t,
    options: n
  };
}
const b = {
  props: {
    href: {
      type: String,
      default: null
    },
    label: {
      type: String,
      required: !0
    },
    customClasses: {
      type: String,
      default: ""
    },
    customRef: {
      type: String,
      default: null
    },
    targetType: {
      type: String,
      default: "_self",
      validator: (t) => [
        "_self",
        "_blank",
        "_parent",
        "_top"
      ].includes(t)
    }
  }
};
var y = function(a, e) {
  return a("a", e._g(e._b({ ref: e.props.customRef, class: `rocket-anchor ${e.props.customClasses}`, attrs: { href: e.props.href, target: e.props.targetType } }, "a", e.data.attrs, !1), e.listeners), [e._v(" " + e._s(e.props.label) + " "), e._t("default")], 2);
}, R = [], S = /* @__PURE__ */ C(
  b,
  y,
  R,
  !0,
  null,
  null,
  null,
  null
);
const $ = S.exports;
function i(t) {
  i.installed || (i.installed = !0, t.component("RocketAnchor", $));
}
const T = {
  install: i
};
let l = null;
typeof window < "u" ? l = window.Vue : typeof global < "u" && (l = global.Vue);
l && l.use(T);
export {
  $ as default
};
