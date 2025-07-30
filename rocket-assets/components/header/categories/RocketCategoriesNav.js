import g from "https://codigo-aberto-sandbox-assets.yampi.io.s3.amazonaws.com/yampi-templates-sandbox/rocket-assets/dist/vendor/mixins/mobile.js";
import C from "https://codigo-aberto-sandbox-assets.yampi.io.s3.amazonaws.com/yampi-templates-sandbox/rocket-assets/components/header/categories/RocketMobileCategoriesNav.js";
import v from "https://codigo-aberto-sandbox-assets.yampi.io.s3.amazonaws.com/yampi-templates-sandbox/rocket-assets/components/header/categories/RocketDesktopCategoriesNav.js";
function y(t, o, s, c, r, f, u, _) {
  var e = typeof t == "function" ? t.options : t;
  o && (e.render = o, e.staticRenderFns = s, e._compiled = !0), c && (e.functional = !0), f && (e._scopeId = "data-v-" + f);
  var n;
  if (u ? (n = function(i) {
    i = i || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !i && typeof __VUE_SSR_CONTEXT__ < "u" && (i = __VUE_SSR_CONTEXT__), r && r.call(this, i), i && i._registeredComponents && i._registeredComponents.add(u);
  }, e._ssrRegister = n) : r && (n = _ ? function() {
    r.call(
      this,
      (e.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : r), n)
    if (e.functional) {
      e._injectStyles = n;
      var m = e.render;
      e.render = function(h, p) {
        return n.call(p), m(h, p);
      };
    } else {
      var d = e.beforeCreate;
      e.beforeCreate = d ? [].concat(d, n) : [n];
    }
  return {
    exports: t,
    options: e
  };
}
const b = {
  name: "RocketCategoriesNav",
  mixins: [
    g
  ],
  provide() {
    return {
      mainCategory: this.notFeaturedCategories,
      categoriesDisplay: this.categoriesDisplay,
      isVisible: this.isVisible
    };
  },
  props: {
    mainCategory: {
      type: Object,
      required: !0
    },
    categoriesDisplay: {
      type: String,
      required: !0
    }
  },
  computed: {
    component() {
      return {
        [!0]: C,
        [!1]: v
      }[this.isMobile];
    },
    notFeaturedCategories() {
      if (!this.mainCategory.children)
        return this.mainCategory;
      const t = this.mainCategory.children.data.filter((o) => !o.featured);
      return {
        ...this.mainCategory,
        children: {
          data: t
        }
      };
    }
  }
};
var R = function() {
  var o = this, s = o._self._c;
  return s(o.component, { tag: "component" });
}, V = [], k = /* @__PURE__ */ y(
  b,
  R,
  V,
  !1,
  null,
  null,
  null,
  null
);
const N = k.exports;
function l(t) {
  l.installed || (l.installed = !0, t.component("RocketCategoriesNav", N));
}
const $ = {
  install: l
};
let a = null;
typeof window < "u" ? a = window.Vue : typeof global < "u" && (a = global.Vue);
a && a.use($);
export {
  N as default
};
