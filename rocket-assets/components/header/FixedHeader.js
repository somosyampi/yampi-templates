import s from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/lodash.js";
import { mapGetters as l } from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/vuex.js";
function c(e, t, n, a, i, w, x, v) {
  var d = typeof e == "function" ? e.options : e;
  return t && (d.render = t, d.staticRenderFns = n, d._compiled = !0), {
    exports: e,
    options: d
  };
}
const u = {
  name: "FixedHeader",
  props: {
    fixed: {
      type: Boolean,
      default: !1
    }
  },
  data() {
    return {
      headerIsFixed: !1
    };
  },
  computed: {
    ...l("header", [
      "showSearchBar"
    ])
  },
  mounted() {
    this.listen();
  },
  updated() {
    this.updateScrollbarWidth();
  },
  methods: {
    updateScrollbarWidth() {
      document.documentElement.style.setProperty("--scrollbar-width", `${window.innerWidth - document.documentElement.clientWidth}px`);
    },
    listen() {
      if (window.onresize = () => {
        this.updateScrollbarWidth();
      }, !this.fixed)
        return;
      const e = document.getElementById("section-header"), t = 1;
      document.addEventListener(
        "scroll",
        s.debounce(() => {
          const n = window.pageYOffset, a = e.clientHeight, i = n - a > t;
          this.$store.dispatch("header/updateShowSearchBar", !i), this.headerIsFixed = i;
        }, 0),
        { passive: !0 }
      );
    }
  }
};
var f = function() {
  var t = this, n = t._self._c;
  return n("div", { class: { "fixed-header": t.headerIsFixed } }, [t._t("default")], 2);
}, h = [], m = /* @__PURE__ */ c(
  u,
  f,
  h
);
const p = m.exports;
function r(e) {
  r.installed || (r.installed = !0, e.component("FixedHeader", p));
}
const _ = {
  install: r
};
let o = null;
typeof window < "u" ? o = window.Vue : typeof global < "u" && (o = global.Vue);
o && o.use(_);
export {
  p as default
};
