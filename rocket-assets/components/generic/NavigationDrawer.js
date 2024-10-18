import { mapGetters as s } from "https://s3.amazonaws.com/codigo-aberto-sandbox-assets/rocket/assets/rocket-preview/vendor/vuex.js";
function c(t, e, n, r, w, h, g, b) {
  var o = typeof t == "function" ? t.options : t;
  return e && (o.render = e, o.staticRenderFns = n, o._compiled = !0), {
    exports: t,
    options: o
  };
}
const l = {
  name: "NavigationDrawer",
  data() {
    return {
      active: !1,
      scrollY: 0
    };
  },
  computed: {
    ...s("preview", ["isPreview", "activeSection"])
  },
  mounted() {
    this.$store.subscribe(({ type: t, payload: e }) => {
      t !== "cart/EVENT_ADDED_TO_CART" || e != null && e.error || this.handleDrawer();
    }), window.addEventListener("touchstart", () => {
      this.syncHeight();
    }), window.addEventListener("resize", () => {
      this.syncHeight();
    });
  },
  destroyed() {
    window.removeEventListener("touchstart", () => {
    }), window.removeEventListener("resize", () => {
    });
  },
  methods: {
    handleDrawer() {
      this.active = !this.active;
    },
    syncHeight() {
      document.documentElement.style.setProperty(
        "--window-inner-height",
        `${window.innerHeight}px`
      ), document.documentElement.style.setProperty(
        "--margin-to-scroll",
        `${this.scrollY}px`
      );
    },
    beforeEnter() {
      const t = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.marginRight = `${t}px`, this.scrollY = window.scrollY, this.syncHeight(), document.documentElement.classList.add("block-scroll"), document.getElementsByTagName("body")[0].classList.add("drawer-active"), document.getElementsByTagName("body")[0].classList.add("block-scroll"), this.$emit("beforeEnter");
    },
    afterEnter() {
      this.$emit("afterEnter");
    },
    beforeLeave() {
      document.getElementsByTagName("body")[0].classList.remove("drawer-active"), this.$emit("beforeLeave");
    },
    afterLeave() {
      document.body.style.marginRight = "0px", document.getElementsByTagName("body")[0].classList.remove("block-scroll"), document.documentElement.classList.remove("block-scroll"), window.scrollTo(0, this.scrollY), this.$emit("afterLeave");
    }
  }
};
var d = function() {
  var e = this, n = e._self._c;
  return n("rocket-emitter", { staticClass: "side-cart-emitter", attrs: { emits: "cart", label: "Carrinho de compras" }, on: { openCategory: e.handleDrawer } }, [n("transition", { attrs: { name: "drawer-animation" }, on: { "after-enter": e.afterEnter, "before-enter": e.beforeEnter, "after-leave": e.afterLeave, "before-leave": e.beforeLeave } }, [e.active ? n("div", { staticClass: "navigation-drawer-background", on: { click: function(r) {
    return r.stopPropagation(), e.handleDrawer.apply(null, arguments);
  } } }, [n("div", { staticClass: "navigation-drawer-container", on: { click: function(r) {
    r.stopPropagation();
  } } }, [n("div", { staticClass: "navigation-drawer" }, [e._t("default")], 2)])]) : e._e()])], 1);
}, m = [], u = /* @__PURE__ */ c(
  l,
  d,
  m
);
const f = u.exports;
function a(t) {
  a.installed || (a.installed = !0, t.component("NavigationDrawer", f));
}
const v = {
  install: a
};
let i = null;
typeof window < "u" ? i = window.Vue : typeof global < "u" && (i = global.Vue);
i && i.use(v);
export {
  f as default
};
