function p(i, s, l, v, t, f, u, b) {
  var e = typeof i == "function" ? i.options : i;
  s && (e.render = s, e.staticRenderFns = l, e._compiled = !0), v && (e.functional = !0), f && (e._scopeId = "data-v-" + f);
  var r;
  if (u ? (r = function(n) {
    n = n || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !n && typeof __VUE_SSR_CONTEXT__ < "u" && (n = __VUE_SSR_CONTEXT__), t && t.call(this, n), n && n._registeredComponents && n._registeredComponents.add(u);
  }, e._ssrRegister = r) : t && (r = b ? function() {
    t.call(
      this,
      (e.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : t), r)
    if (e.functional) {
      e._injectStyles = r;
      var c = e.render;
      e.render = function(h, _) {
        return r.call(_), c(h, _);
      };
    } else {
      var d = e.beforeCreate;
      e.beforeCreate = d ? [].concat(d, r) : [r];
    }
  return {
    exports: i,
    options: e
  };
}
const m = {
  name: "LazyVisibility",
  data() {
    return {
      isVisible: !1,
      observer: null
    };
  },
  mounted() {
    this.observer = new IntersectionObserver(
      ([i]) => {
        i.isIntersecting && (this.isVisible = !0, this.observer.disconnect());
      },
      {
        root: null,
        threshold: 0.2
      }
    ), this.observer.observe(this.$refs.observerRoot);
  },
  beforeDestroy() {
    this.observer && this.observer.disconnect();
  }
};
var V = function() {
  var s = this, l = s._self._c;
  return l("div", { ref: "observerRoot", staticClass: "lazy-visibility", class: { "is-visible": s.isVisible } }, [s.isVisible ? s._t("default") : s._e()], 2);
}, C = [], y = /* @__PURE__ */ p(
  m,
  V,
  C,
  !1,
  null,
  null,
  null,
  null
);
const R = y.exports;
function a(i) {
  a.installed || (a.installed = !0, i.component("LazyVisibility", R));
}
const $ = {
  install: a
};
let o = null;
typeof window < "u" ? o = window.Vue : typeof global < "u" && (o = global.Vue);
o && o.use($);
export {
  R as default
};
