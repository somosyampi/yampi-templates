import { uuidv4 as m } from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/mixins/helpers.js";
function C(n, t, o, a, r, u, d, p) {
  var e = typeof n == "function" ? n.options : n;
  t && (e.render = t, e.staticRenderFns = o, e._compiled = !0), a && (e.functional = !0), u && (e._scopeId = "data-v-" + u);
  var s;
  if (d ? (s = function(i) {
    i = i || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !i && typeof __VUE_SSR_CONTEXT__ < "u" && (i = __VUE_SSR_CONTEXT__), r && r.call(this, i), i && i._registeredComponents && i._registeredComponents.add(d);
  }, e._ssrRegister = s) : r && (s = p ? function() {
    r.call(
      this,
      (e.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : r), s)
    if (e.functional) {
      e._injectStyles = s;
      var v = e.render;
      e.render = function(h, _) {
        return s.call(_), v(h, _);
      };
    } else {
      var c = e.beforeCreate;
      e.beforeCreate = c ? [].concat(c, s) : [s];
    }
  return {
    exports: n,
    options: e
  };
}
const y = {
  name: "Stepper",
  props: {
    active: {
      type: Number,
      required: !0
    },
    items: {
      type: Array,
      required: !0
    }
  },
  methods: {
    uuidv4: m,
    calculateKey(n) {
      return n.id || this.uuidv4();
    },
    stepClass(n) {
      return this.items.indexOf(n) <= this.active ? "active" : "";
    },
    handleClick(n) {
      this.$emit("click", n);
    }
  }
};
var $ = function() {
  var t = this, o = t._self._c;
  return o("div", { staticClass: "stepper-container" }, [o("ul", { staticClass: "progressbar" }, t._l(t.items, function(a, r) {
    return o("li", { key: t.calculateKey(a), class: t.stepClass(a), on: { click: function(u) {
      return t.handleClick(r);
    } } }, [o("p", [t._v(t._s(r + 1))])]);
  }), 0)]);
}, b = [], g = /* @__PURE__ */ C(
  y,
  $,
  b,
  !1,
  null,
  null,
  null,
  null
);
const k = g.exports;
function f(n) {
  f.installed || (f.installed = !0, n.component("Stepper", k));
}
const R = {
  install: f
};
let l = null;
typeof window < "u" ? l = window.Vue : typeof global < "u" && (l = global.Vue);
l && l.use(R);
export {
  k as default
};
