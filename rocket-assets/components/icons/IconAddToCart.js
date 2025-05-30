function v(r, e, i, h, l, f, d, p) {
  var n = typeof r == "function" ? r.options : r;
  e && (n.render = e, n.staticRenderFns = i, n._compiled = !0), h && (n.functional = !0), f && (n._scopeId = "data-v-" + f);
  var o;
  if (d ? (o = function(t) {
    t = t || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !t && typeof __VUE_SSR_CONTEXT__ < "u" && (t = __VUE_SSR_CONTEXT__), l && l.call(this, t), t && t._registeredComponents && t._registeredComponents.add(d);
  }, n._ssrRegister = o) : l && (o = p ? function() {
    l.call(
      this,
      (n.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : l), o)
    if (n.functional) {
      n._injectStyles = o;
      var C = n.render;
      n.render = function(c, _) {
        return o.call(_), C(c, _);
      };
    } else {
      var u = n.beforeCreate;
      n.beforeCreate = u ? [].concat(u, o) : [o];
    }
  return {
    exports: r,
    options: n
  };
}
const g = {
  name: "IconAddToCart",
  props: {
    width: {
      type: [Number, String],
      default: 32
    },
    height: {
      type: [Number, String],
      default: 32
    },
    color: {
      type: String,
      default: "#FFFFFF"
    }
  }
};
var V = function() {
  var e = this, i = e._self._c;
  return i("svg", { attrs: { width: e.width, height: e.height, viewBox: "0 0 32 32", fill: "none", xmlns: "http://www.w3.org/2000/svg" } }, [i("path", { attrs: { d: `M10.0898 5.98438H11.9758C13.496 5.98438 14.7759 7.1215
        14.9549 8.63115L15.8789 16.4242H24.471C24.9383 16.4242
        25.3434 16.1005 25.4464 15.6446L26.7741 9.76953H17.6783
        V7.76953H26.7741C28.0566 7.76953 29.0076 8.9595 28.7249
        10.2104L27.3972 16.0855C27.0881 17.453 25.8731 18.4242
        24.471 18.4242H16.116L16.4163 20.9565L24.9221 20.9565
        V22.9565H16.4163C15.4028 22.9565 14.5495 22.1984 14.4302
        21.192L12.9688 8.86663C12.9092 8.36342 12.4825 7.98438
        11.9758 7.98438L10.0898 7.98438V5.98438Z`, fill: e.color } }), i("path", { attrs: { d: `M17.1406 27C17.831 27 18.3906 26.4404 18.3906 25.75
        C18.3906 25.0596 17.831 24.5 17.1406 24.5C16.4503
        24.5 15.8906 25.0596 15.8906 25.75C15.8906 26.4404
        16.4503 27 17.1406 27Z`, fill: e.color } }), i("path", { attrs: { d: `M22.626 27C23.3163 27 23.876 26.4404 23.876 25.75
        C23.876 25.0596 23.3163 24.5 22.626 24.5C21.9356
        24.5 21.376 25.0596 21.376 25.75C21.376 26.4404 21.9356
        27 22.626 27Z`, fill: e.color } }), i("path", { attrs: { d: `M6.5 18.417H3.5V16.417H6.5V13.417H8.5V16.417H11.5
        V18.417H8.5V21.417H6.5V18.417Z`, fill: e.color } })]);
}, m = [], w = /* @__PURE__ */ v(
  g,
  V,
  m,
  !1,
  null,
  null,
  null,
  null
);
const H = w.exports;
function s(r) {
  s.installed || (s.installed = !0, r.component("IconAddToCart", H));
}
const F = {
  install: s
};
let a = null;
typeof window < "u" ? a = window.Vue : typeof global < "u" && (a = global.Vue);
a && a.use(F);
export {
  H as default
};
