function w(i, s, n, h, o, f, u, _) {
  var e = typeof i == "function" ? i.options : i;
  s && (e.render = s, e.staticRenderFns = n, e._compiled = !0), h && (e.functional = !0), f && (e._scopeId = "data-v-" + f);
  var r;
  if (u ? (r = function(t) {
    t = t || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !t && typeof __VUE_SSR_CONTEXT__ < "u" && (t = __VUE_SSR_CONTEXT__), o && o.call(this, t), t && t._registeredComponents && t._registeredComponents.add(u);
  }, e._ssrRegister = r) : o && (r = _ ? function() {
    o.call(
      this,
      (e.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : o), r)
    if (e.functional) {
      e._injectStyles = r;
      var c = e.render;
      e.render = function(g, p) {
        return r.call(p), c(g, p);
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
const C = {
  name: "AtomSVG",
  props: {
    width: {
      type: String,
      required: !0
    },
    height: {
      type: String,
      required: !0
    },
    fill: {
      type: String,
      required: !0
    },
    customClass: {
      type: String,
      default: ""
    }
  }
};
var v = function(s, n) {
  return s("svg", { class: `rkt-svg ${n.props.customClass}`, attrs: { xmlns: "http://www.w3.org/2000/svg", width: n.props.width, height: n.props.heigth, viewBox: `0 0 ${n.props.width} ${n.props.height}`, fill: n.props.fill } }, [n._t("default")], 2);
}, $ = [], m = /* @__PURE__ */ w(
  C,
  v,
  $,
  !0,
  null,
  null,
  null,
  null
);
const S = m.exports;
function a(i) {
  a.installed || (a.installed = !0, i.component("AtomSVG", S));
}
const V = {
  install: a
};
let l = null;
typeof window < "u" ? l = window.Vue : typeof global < "u" && (l = global.Vue);
l && l.use(V);
export {
  S as default
};
