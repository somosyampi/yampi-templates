function v(i, o, a, _, r, f, u, p) {
  var n = typeof i == "function" ? i.options : i;
  o && (n.render = o, n.staticRenderFns = a, n._compiled = !0), _ && (n.functional = !0), f && (n._scopeId = "data-v-" + f);
  var t;
  if (u ? (t = function(e) {
    e = e || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !e && typeof __VUE_SSR_CONTEXT__ < "u" && (e = __VUE_SSR_CONTEXT__), r && r.call(this, e), e && e._registeredComponents && e._registeredComponents.add(u);
  }, n._ssrRegister = t) : r && (t = p ? function() {
    r.call(
      this,
      (n.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : r), t)
    if (n.functional) {
      n._injectStyles = t;
      var C = n.render;
      n.render = function(h, c) {
        return t.call(c), C(h, c);
      };
    } else {
      var d = n.beforeCreate;
      n.beforeCreate = d ? [].concat(d, t) : [t];
    }
  return {
    exports: i,
    options: n
  };
}
const m = {
  name: "SectionContainer",
  props: [
    "widthSection",
    "contentAlignment",
    "backgroundColor",
    "buttonColor",
    "textColor"
  ]
};
var b = function() {
  var o = this, a = o._self._c;
  return a("div", { class: `section-container section-width--${o.widthSection} align-content--${o.contentAlignment}`, style: `--background-color: ${o.backgroundColor}; --button-color: ${o.buttonColor}; --text-color: ${o.textColor}; ` }, [o._t("default")], 2);
}, g = [], $ = /* @__PURE__ */ v(
  m,
  b,
  g,
  !1,
  null,
  null,
  null,
  null
);
const w = $.exports;
function s(i) {
  s.installed || (s.installed = !0, i.component("SectionContainer", w));
}
const R = {
  install: s
};
let l = null;
typeof window < "u" ? l = window.Vue : typeof global < "u" && (l = global.Vue);
l && l.use(R);
export {
  w as default
};
