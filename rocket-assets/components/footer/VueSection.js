function v(t, i, a, c, s, f, u, h) {
  var e = typeof t == "function" ? t.options : t;
  i && (e.render = i, e.staticRenderFns = a, e._compiled = !0), c && (e.functional = !0), f && (e._scopeId = "data-v-" + f);
  var o;
  if (u ? (o = function(n) {
    n = n || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !n && typeof __VUE_SSR_CONTEXT__ < "u" && (n = __VUE_SSR_CONTEXT__), s && s.call(this, n), n && n._registeredComponents && n._registeredComponents.add(u);
  }, e._ssrRegister = o) : s && (o = h ? function() {
    s.call(
      this,
      (e.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : s), o)
    if (e.functional) {
      e._injectStyles = o;
      var p = e.render;
      e.render = function(m, _) {
        return o.call(_), p(m, _);
      };
    } else {
      var d = e.beforeCreate;
      e.beforeCreate = d ? [].concat(d, o) : [o];
    }
  return {
    exports: t,
    options: e
  };
}
const w = {
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
var C = function() {
  var i = this, a = i._self._c;
  return i.show ? a("section", { staticClass: "done" }, [i._t("default")], 2) : i._e();
}, V = [], b = /* @__PURE__ */ v(
  w,
  C,
  V,
  !1,
  null,
  null,
  null,
  null
);
const R = b.exports;
function l(t) {
  l.installed || (l.installed = !0, t.component("VueSection", R));
}
const S = {
  install: l
};
let r = null;
typeof window < "u" ? r = window.Vue : typeof global < "u" && (r = global.Vue);
r && r.use(S);
export {
  R as default
};
