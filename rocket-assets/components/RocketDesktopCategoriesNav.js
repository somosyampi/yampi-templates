import d from "lodash/chunk";
import h from "lodash/omit";
function f(t, e, s, o, n, i, r, c) {
  var a = typeof t == "function" ? t.options : t;
  return e && (a.render = e, a.staticRenderFns = s, a._compiled = !0), {
    exports: t,
    options: a
  };
}
const m = {
  name: "RocketDesktopCategoriesNav",
  inject: ["mainCategory", "categoriesDisplay"],
  data() {
    return {
      isVisible: !1
    };
  },
  computed: {
    subcategories() {
      var t;
      return ((t = this.mainCategory.children) == null ? void 0 : t.data) || [];
    },
    filteredSubcategories() {
      return this.subcategories.slice(0, 27);
    },
    chunkedSubcategories() {
      return d([
        {
          ...h(this.mainCategory, ["children"]),
          name: "Todos os produtos"
        },
        ...this.filteredSubcategories
      ], 7);
    },
    hasDropdown() {
      return !!this.subcategories.length && this.categoriesDisplay === "both";
    }
  },
  methods: {
    getCalculatedSubmenuLeftOffset({ drawPosition: t, clientX: e, itemWidth: s, viewportWidth: o }) {
      const n = this.chunkedSubcategories.length * 200 + 80 + (this.chunkedSubcategories.length - 1) * 40;
      return {
        rightDraw: () => {
          const i = n + e - o, r = 40 + (this.chunkedSubcategories.length - 1) * 200, c = e > i + r ? e - (i + r) : e - i;
          return i > 0 ? c : e - (n - 140);
        },
        leftDraw: () => {
          const i = n + e - o;
          return i > 0 ? e - i : e * 0.97;
        }
      }[t]();
    },
    getDrawPosition({ viewportWidth: t, clientX: e, itemWidth: s }) {
      return e + s > t / 2 ? "rightDraw" : "leftDraw";
    },
    handleMouseEnter() {
      if (this.hasDropdown) {
        const t = this.$refs.menuitem.getBoundingClientRect(), e = this.getDrawPosition({
          viewportWidth: window.innerWidth,
          clientX: t.x,
          itemWidth: t.width
        }), s = this.getCalculatedSubmenuLeftOffset({
          drawPosition: e,
          clientX: t.x,
          itemWidth: t.width,
          viewportWidth: window.innerWidth
        });
        this.$refs.submenu.style.left = `${s}px`, this.$refs.submenu.style.setProperty(
          "--nav-left-pos-x",
          `${t.x - s + t.width / 2 - 10}px`
        );
      }
      this.isVisible = !0;
    },
    handleMouseLeave() {
      this.isVisible = !1;
    }
  }
};
var g = function() {
  var e = this, s = e._self._c;
  return s("div", { staticClass: "h-anchor-container", on: { mouseenter: e.handleMouseEnter, mouseleave: e.handleMouseLeave } }, [s("rocket-anchor", { attrs: { "custom-ref": "menuitem", href: e.mainCategory.url_path, label: e.mainCategory.name, "custom-classes": "main-category" } }), e.hasDropdown ? s("transition", { attrs: { name: "fade" } }, [s("ul", { directives: [{ name: "show", rawName: "v-show", value: e.isVisible, expression: "isVisible" }], ref: "submenu", staticClass: "subcategories-list", on: { mouseenter: e.handleMouseEnter, mouseleave: e.handleMouseLeave } }, e._l(e.chunkedSubcategories, function(o, n) {
    return s("li", { key: n, staticClass: "subcategory-container" }, e._l(o, function(i, r) {
      return s("a", { key: i.id, class: `subcategory ${r === 0 && n === 0 ? "--all-products" : ""}`, attrs: { href: i.url_path } }, [e._v(" " + e._s(i.name) + " ")]);
    }), 0);
  }), 0)]) : e._e()], 1);
}, p = [], w = /* @__PURE__ */ f(
  m,
  g,
  p
);
const b = w.exports;
function l(t) {
  l.installed || (l.installed = !0, t.component("RocketDesktopCategoriesNav", b));
}
const _ = {
  install: l
};
let u = null;
typeof window < "u" ? u = window.Vue : typeof global < "u" && (u = global.Vue);
u && u.use(_);
export {
  b as default
};
