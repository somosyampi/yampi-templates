import c from "../vendor/mixins/mobile.js";
function u(e, t, s, o, i, r, a, b) {
  var l = typeof e == "function" ? e.options : e;
  return t && (l.render = t, l.staticRenderFns = s, l._compiled = !0), {
    exports: e,
    options: l
  };
}
const h = {
  name: "CategorySubcategory",
  mixins: [
    c
  ],
  mounted() {
    this.loadDomVariables(), this.handleClasses(), this.handleHover(), this.handleMobile(), this.enableMenu(), this.handleHeight();
  },
  data() {
    return {
      menu: null,
      categories: null,
      subCategories: null,
      hasSubDropdown: null,
      holderCategories: null
    };
  },
  methods: {
    loadDomVariables() {
      this.categories = document.querySelectorAll(".item-category"), this.menu = document.querySelector(".category-subcategory-menu"), this.holderCategories = document.querySelector(".holder-categories"), this.subCategories = document.querySelectorAll(".holder-sub-categories");
    },
    handleHeight() {
      let e = 0, t = this.menu.clientHeight;
      for (let s = 0; s < this.subCategories.length; s++)
        e = Math.max(
          e,
          this.subCategories[s].offsetHeight
        );
      e > t && (this.menu.style.height = e + "px");
    },
    handleMobile() {
      let e = document.querySelectorAll(".has-subdropdown"), t = document.querySelectorAll(".close-dropdown"), s = (o) => {
        this.isMobile && o.classList.contains("dropdown-holder") && (o.classList.contains("item-category") && o.closest(".category-dropdown-holder").classList.add("active-subdropdown"), o.classList.add("active-dropdown"));
      };
      document.querySelector(".category-dropdown-holder").addEventListener("click", (o) => {
        s(o.target);
      });
      for (let o = 0; o < e.length; o++)
        e[o].addEventListener("click", (i) => {
          s(i.target);
        });
      for (let o = 0; o < t.length; o++)
        t[o].addEventListener("click", (i) => {
          let r = i.target.closest(".active-dropdown"), a = i.target.closest(".active-subdropdown");
          r && r.classList.remove("active-dropdown"), a && a.classList.remove("active-subdropdown");
        });
    },
    handleHover() {
      let e = "is-active", t = !1, s = () => {
        t = !0, setTimeout(() => {
          t && this.menu.classList.remove(e);
        }, 100);
      };
      this.holderCategories.addEventListener("mouseover", (o) => {
        if (o.target.closest(".has-subdropdown"))
          return t = !1, this.menu.classList.add(e);
        s();
      }), this.holderCategories.addEventListener("mouseleave", () => {
        s();
      });
    },
    handleClasses() {
      for (let e = 0; e < this.categories.length; e++) {
        let t = this.categories[e];
        t.querySelector(".holder-sub-categories") && t.classList.add("has-subdropdown");
      }
    },
    enableMenu() {
      this.holderCategories.classList.remove("-is-loading");
    }
  }
};
var g = function() {
  var t = this, s = t._self._c;
  return s("div", [t._t("default")], 2);
}, m = [], f = /* @__PURE__ */ u(
  h,
  g,
  m
);
const v = f.exports;
function d(e) {
  d.installed || (d.installed = !0, e.component("CategorySubcategory", v));
}
const p = {
  install: d
};
let n = null;
typeof window < "u" ? n = window.Vue : typeof global < "u" && (n = global.Vue);
n && n.use(p);
export {
  v as default
};
