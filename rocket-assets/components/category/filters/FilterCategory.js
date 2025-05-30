import v from "https://codigo-aberto-sandbox-assets.s3.amazonaws.com/yampi-templates-sandbox/rocket-assets/components/category/filters/BaseFilter.js";
function m(r, e, a, n, s, u, d, p) {
  var t = typeof r == "function" ? r.options : r;
  e && (t.render = e, t.staticRenderFns = a, t._compiled = !0), n && (t.functional = !0), u && (t._scopeId = "data-v-" + u);
  var i;
  if (d ? (i = function(o) {
    o = o || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !o && typeof __VUE_SSR_CONTEXT__ < "u" && (o = __VUE_SSR_CONTEXT__), s && s.call(this, o), o && o._registeredComponents && o._registeredComponents.add(d);
  }, t._ssrRegister = i) : s && (i = p ? function() {
    s.call(
      this,
      (t.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : s), i)
    if (t.functional) {
      t._injectStyles = i;
      var h = t.render;
      t.render = function(C, c) {
        return i.call(c), h(C, c);
      };
    } else {
      var _ = t.beforeCreate;
      t.beforeCreate = _ ? [].concat(_, i) : [i];
    }
  return {
    exports: r,
    options: t
  };
}
const g = {
  name: "FilterCategory",
  extends: v,
  props: {
    showCheckbox: {
      type: Boolean,
      default: !0
    },
    activeCategory: {
      type: String,
      default: ""
    }
  },
  data: () => ({
    route: "categories",
    mainQueryString: "category_id"
  })
};
var b = function() {
  var e = this, a = e._self._c;
  return e.payload.length ? a("div", { staticClass: "filter filter-category" }, [a("div", { staticClass: "-title" }, [e._v(" Categorias ")]), a("ul", { class: { "-category": !e.showCheckbox } }, e._l(e.payload, function(n) {
    return a("li", { key: n.id, class: { "filter-option": e.showCheckbox } }, [e.showCheckbox ? a("CustomCheckbox", { attrs: { text: n.name, checked: n.active }, on: { change: function(s) {
      return e.updateFilterStatus(n, s);
    } } }) : a("a", { class: { active: n.name === e.activeCategory }, attrs: { href: n.url_path }, domProps: { textContent: e._s(n.name) } })], 1);
  }), 0)]) : e._e();
}, w = [], y = /* @__PURE__ */ m(
  g,
  b,
  w,
  !1,
  null,
  null,
  null,
  null
);
const k = y.exports;
function f(r) {
  f.installed || (f.installed = !0, r.component("FilterCategory", k));
}
const F = {
  install: f
};
let l = null;
typeof window < "u" ? l = window.Vue : typeof global < "u" && (l = global.Vue);
l && l.use(F);
export {
  k as default
};
