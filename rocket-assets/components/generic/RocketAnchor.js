function C(t, s, e, _, a, f, u, c) {
  var n = typeof t == "function" ? t.options : t;
  s && (n.render = s, n.staticRenderFns = e, n._compiled = !0), _ && (n.functional = !0), f && (n._scopeId = "data-v-" + f);
  var o;
  if (u ? (o = function(r) {
    r = r || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !r && typeof __VUE_SSR_CONTEXT__ < "u" && (r = __VUE_SSR_CONTEXT__), a && a.call(this, r), r && r._registeredComponents && r._registeredComponents.add(u);
  }, n._ssrRegister = o) : a && (o = c ? function() {
    a.call(
      this,
      (n.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : a), o)
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
const R = {
  name: "RocketAnchor",
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
var b = function(s, e) {
  return s("a", e._g(e._b({ ref: e.props.customRef, class: `rocket-anchor ${e.props.customClasses}`, attrs: { href: e.props.href, target: e.props.targetType } }, "a", e.data.attrs, !1), e.listeners), [e._v(" " + e._s(e.props.label) + " "), e._t("default")], 2);
}, y = [], S = /* @__PURE__ */ C(
  R,
  b,
  y,
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
