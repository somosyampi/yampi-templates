import d from "http://rocket.test/dist/vendor/lodash.js";
function c(t, e, o, i, n, g, b, v) {
  var l = typeof t == "function" ? t.options : t;
  return e && (l.render = e, l.staticRenderFns = o, l._compiled = !0), {
    exports: t,
    options: l
  };
}
const r = {
  name: "Modal",
  props: {
    name: {
      type: String,
      required: !0
    },
    title: {
      type: String,
      default: ""
    },
    scrollable: {
      type: Boolean,
      default: !1
    },
    fixSafariBackground: {
      type: Boolean,
      default: !1
    }
  },
  data: () => ({
    show: !1
  }),
  mounted() {
    this.listenToEscape();
  },
  methods: {
    handleModal() {
      return {
        true: this.closeModal,
        false: this.showModal
      }[this.show]();
    },
    showModal() {
      this.show = !0;
      const t = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.marginRight = `${t}px`, document.getElementsByTagName("body")[0].classList.add("block-scroll");
    },
    closeModal() {
      this.$children.map(function(t, e) {
        t.$options.name === "ImageSelector" && t.$children.map(function(i, n) {
          i.deleteInputFromClosingModal();
        });
      }), this.show = !1, document.getElementById("app").style.overflow = "", d.delay(() => {
        document.getElementsByTagName("body")[0].classList.remove("block-scroll"), document.documentElement.classList.remove("block-scroll"), document.body.style.marginRight = "0px";
      }, 350, "later"), this.$emit("close");
    },
    backgroundClick(t) {
      this.$el === t.target && this.closeModal();
    },
    listenToEscape() {
      document.addEventListener("keydown", (t) => {
        (t || window.event).key === "Escape" && this.closeModal();
      });
    }
  }
};
var m = function() {
  var e = this, o = e._self._c;
  return o("div", { staticClass: "modal-background", class: { active: e.show }, attrs: { role: "dialog", "aria-labelledby": "modal-title", "aria-describedby": "modal-desc" }, on: { mousedown: e.backgroundClick } }, [o("div", { staticClass: "modal", class: { scrollable: e.scrollable, "-fix": e.fixSafariBackground }, attrs: { id: "modal-" + e.name } }, [o("div", { staticClass: "flex -between" }, [o("div", { staticClass: "modal-header" }, [o("div", { staticClass: "theme-title", attrs: { id: "modal-title" }, domProps: { textContent: e._s(e.title) } }), o("div", { staticClass: "-subtitle", attrs: { id: "modal-desc" } }, [e._t("subtitle")], 2)]), o("div", { staticClass: "close-modal", on: { click: e.closeModal } }, [o("i", { staticClass: "icon icon-close-modal" })])]), o("div", { staticClass: "modal-content" }, [e._t("default")], 2), o("div", { staticClass: "modal-footer" }, [e._t("footer")], 2)])]);
}, u = [], f = /* @__PURE__ */ c(
  r,
  m,
  u
);
const p = f.exports;
function a(t) {
  a.installed || (a.installed = !0, t.component("Modal", p));
}
const h = {
  install: a
};
let s = null;
typeof window < "u" ? s = window.Vue : typeof global < "u" && (s = global.Vue);
s && s.use(h);
export {
  p as default
};
