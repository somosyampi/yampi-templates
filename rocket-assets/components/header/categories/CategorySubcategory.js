import p from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/mixins/mobile.js";
function _(e, o, i, t, n, l, d, g) {
  var s = typeof e == "function" ? e.options : e;
  o && (s.render = o, s.staticRenderFns = i, s._compiled = !0), t && (s.functional = !0), l && (s._scopeId = "data-v-" + l);
  var a;
  if (d ? (a = function(r) {
    r = r || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !r && typeof __VUE_SSR_CONTEXT__ < "u" && (r = __VUE_SSR_CONTEXT__), n && n.call(this, r), r && r._registeredComponents && r._registeredComponents.add(d);
  }, s._ssrRegister = a) : n && (a = g ? function() {
    n.call(
      this,
      (s.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : n), a)
    if (s.functional) {
      s._injectStyles = a;
      var m = s.render;
      s.render = function(v, f) {
        return a.call(f), m(v, f);
      };
    } else {
      var h = s.beforeCreate;
      s.beforeCreate = h ? [].concat(h, a) : [a];
    }
  return {
    exports: e,
    options: s
  };
}
const b = {
  name: "CategorySubcategory",
  mixins: [
    p
  ],
  data() {
    return {
      menu: null,
      categories: null,
      subCategories: null,
      hasSubDropdown: null,
      holderCategories: null
    };
  },
  mounted() {
    this.loadDomVariables(), this.handleClasses(), this.handleHover(), this.handleMobile(), this.enableMenu(), this.handleHeight();
  },
  methods: {
    loadDomVariables() {
      this.categories = document.querySelectorAll(".item-category"), this.menu = document.querySelector(".category-subcategory-menu"), this.holderCategories = document.querySelector(".holder-categories"), this.subCategories = document.querySelectorAll(".holder-sub-categories");
    },
    handleHeight() {
      let e = 0;
      const o = this.menu.clientHeight;
      for (let i = 0; i < this.subCategories.length; i++)
        e = Math.max(
          e,
          this.subCategories[i].offsetHeight
        );
      e > o && (this.menu.style.height = `${e}px`);
    },
    handleMobile() {
      const e = document.querySelectorAll(".has-subdropdown"), o = document.querySelectorAll(".close-dropdown"), i = (t) => {
        this.isMobile && t.classList.contains("dropdown-holder") && (t.classList.contains("item-category") && t.closest(".category-dropdown-holder").classList.add("active-subdropdown"), t.classList.add("active-dropdown"));
      };
      document.querySelector(".category-dropdown-holder").addEventListener("click", (t) => {
        i(t.target);
      });
      for (let t = 0; t < e.length; t++)
        e[t].addEventListener("click", (n) => {
          i(n.target);
        });
      for (let t = 0; t < o.length; t++)
        o[t].addEventListener("click", (n) => {
          const l = n.target.closest(".active-dropdown"), d = n.target.closest(".active-subdropdown");
          l && l.classList.remove("active-dropdown"), d && d.classList.remove("active-subdropdown");
        });
    },
    handleHover() {
      const e = "is-active";
      let o = !1;
      const i = () => {
        o = !0, setTimeout(() => {
          o && this.menu.classList.remove(e);
        }, 100);
      };
      this.holderCategories.addEventListener("mouseover", (t) => {
        if (t.target.closest(".has-subdropdown"))
          return o = !1, this.menu.classList.add(e);
        i();
      }), this.holderCategories.addEventListener("mouseleave", () => {
        i();
      });
    },
    handleClasses() {
      for (let e = 0; e < this.categories.length; e++) {
        const o = this.categories[e];
        o.querySelector(".holder-sub-categories") && o.classList.add("has-subdropdown");
      }
    },
    enableMenu() {
      this.holderCategories.classList.remove("-is-loading");
    }
  }
};
var C = function() {
  var o = this, i = o._self._c;
  return i("div", [o._t("default")], 2);
}, w = [], y = /* @__PURE__ */ _(
  b,
  C,
  w,
  !1,
  null,
  null,
  null,
  null
);
const L = y.exports;
function u(e) {
  u.installed || (u.installed = !0, e.component("CategorySubcategory", L));
}
const S = {
  install: u
};
let c = null;
typeof window < "u" ? c = window.Vue : typeof global < "u" && (c = global.Vue);
c && c.use(S);
export {
  L as default
};
