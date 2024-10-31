import a from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/mixins/mobile.js";
import s from "https://s3.amazonaws.com/codigo-aberto-sandbox-assets/yampi-templates-main/rocket-assets/components/RocketMobileCategoriesNav.js";
import l from "https://s3.amazonaws.com/codigo-aberto-sandbox-assets/yampi-templates-main/rocket-assets/components/RocketDesktopCategoriesNav.js";
function c(e, t, n, y, _, h, C, v) {
  var i = typeof e == "function" ? e.options : e;
  return t && (i.render = t, i.staticRenderFns = n, i._compiled = !0), {
    exports: e,
    options: i
  };
}
const u = {
  name: "RocketCategoriesNav",
  mixins: [
    a
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
        [!0]: s,
        [!1]: l
      }[this.isMobile];
    },
    notFeaturedCategories() {
      if (!this.mainCategory.children)
        return this.mainCategory;
      const e = this.mainCategory.children.data.filter((t) => !t.featured);
      return {
        ...this.mainCategory,
        children: {
          data: e
        }
      };
    }
  }
};
var d = function() {
  var t = this, n = t._self._c;
  return n(t.component, { tag: "component" });
}, m = [], f = /* @__PURE__ */ c(
  u,
  d,
  m
);
const p = f.exports;
function r(e) {
  r.installed || (r.installed = !0, e.component("RocketCategoriesNav", p));
}
const g = {
  install: r
};
let o = null;
typeof window < "u" ? o = window.Vue : typeof global < "u" && (o = global.Vue);
o && o.use(g);
export {
  p as default
};
