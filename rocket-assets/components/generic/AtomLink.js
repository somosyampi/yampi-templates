function v(r, l, i, _, o, f, u, c) {
  var e = typeof r == "function" ? r.options : r;
  l && (e.render = l, e.staticRenderFns = i, e._compiled = !0), _ && (e.functional = !0), f && (e._scopeId = "data-v-" + f);
  var t;
  if (u ? (t = function(n) {
    n = n || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !n && typeof __VUE_SSR_CONTEXT__ < "u" && (n = __VUE_SSR_CONTEXT__), o && o.call(this, n), n && n._registeredComponents && n._registeredComponents.add(u);
  }, e._ssrRegister = t) : o && (t = c ? function() {
    o.call(
      this,
      (e.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : o), t)
    if (e.functional) {
      e._injectStyles = t;
      var h = e.render;
      e.render = function(C, p) {
        return t.call(p), h(C, p);
      };
    } else {
      var d = e.beforeCreate;
      e.beforeCreate = d ? [].concat(d, t) : [t];
    }
  return {
    exports: r,
    options: e
  };
}
const g = {
  name: "AtomLink",
  props: {
    title: {
      type: String,
      required: !0
    },
    href: {
      type: String,
      required: !0
    },
    label: {
      type: String,
      required: !0
    }
  }
};
var b = function(l, i) {
  return l("a", { staticClass: "rkt-link", attrs: { title: i.props.title, href: i.props.href } }, [i._v(" " + i._s(i.props.label) + " ")]);
}, m = [], R = /* @__PURE__ */ v(
  g,
  b,
  m,
  !0,
  null,
  null,
  null,
  null
);
const $ = R.exports;
function a(r) {
  a.installed || (a.installed = !0, r.component("AtomLink", $));
}
const k = {
  install: a
};
let s = null;
typeof window < "u" ? s = window.Vue : typeof global < "u" && (s = global.Vue);
s && s.use(k);
export {
  $ as default
};
