import p from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/vue.js";
function v(n, s, _, c, r, l, f, m) {
  var e = typeof n == "function" ? n.options : n;
  s && (e.render = s, e.staticRenderFns = _, e._compiled = !0), c && (e.functional = !0), l && (e._scopeId = "data-v-" + l);
  var t;
  if (f ? (t = function(o) {
    o = o || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !o && typeof __VUE_SSR_CONTEXT__ < "u" && (o = __VUE_SSR_CONTEXT__), r && r.call(this, o), o && o._registeredComponents && o._registeredComponents.add(f);
  }, e._ssrRegister = t) : r && (t = m ? function() {
    r.call(
      this,
      (e.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : r), t)
    if (e.functional) {
      e._injectStyles = t;
      var h = e.render;
      e.render = function(g, d) {
        return t.call(d), h(g, d);
      };
    } else {
      var u = e.beforeCreate;
      e.beforeCreate = u ? [].concat(u, t) : [t];
    }
  return {
    exports: n,
    options: e
  };
}
const C = {
  name: "SectionProvider",
  provide() {
    return {
      params: p.observable(this.params),
      pageConfig: p.observable(this.pageParams)
    };
  },
  props: {
    config: {
      type: Object,
      required: !0
    },
    pageConfig: {
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    var n;
    return {
      params: this.config.params,
      pageParams: (n = this.pageConfig) == null ? void 0 : n.data.theme.params
    };
  },
  render() {
    return this.$scopedSlots.default();
  }
}, b = null, $ = null;
var R = /* @__PURE__ */ v(
  C,
  b,
  $,
  !1,
  null,
  null,
  null,
  null
);
const V = R.exports;
function i(n) {
  i.installed || (i.installed = !0, n.component("SectionProvider", V));
}
const w = {
  install: i
};
let a = null;
typeof window < "u" ? a = window.Vue : typeof global < "u" && (a = global.Vue);
a && a.use(w);
export {
  V as default
};
