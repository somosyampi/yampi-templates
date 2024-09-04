import r from "lodash/debounce";
import { mapGetters as a } from "../vendor/vuex.js";
function s(e, t, o, p, _, w, x, v) {
  var n = typeof e == "function" ? e.options : e;
  return t && (n.render = t, n.staticRenderFns = o, n._compiled = !0), {
    exports: e,
    options: n
  };
}
const l = {
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
    ...a("header", [
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
      const e = document.getElementById("section-header");
      document.addEventListener(
        "scroll",
        r(() => {
          const t = window.pageYOffset - e.clientHeight > 0;
          this.$store.dispatch("header/updateShowSearchBar", !t), this.headerIsFixed = t;
        }, 0),
        { passive: !0 }
      );
    }
  }
};
var c = function() {
  var t = this, o = t._self._c;
  return o("div", { class: { "fixed-header": t.headerIsFixed } }, [t._t("default")], 2);
}, u = [], f = /* @__PURE__ */ s(
  l,
  c,
  u
);
const h = f.exports;
function i(e) {
  i.installed || (i.installed = !0, e.component("FixedHeader", h));
}
const m = {
  install: i
};
let d = null;
typeof window < "u" ? d = window.Vue : typeof global < "u" && (d = global.Vue);
d && d.use(m);
export {
  h as default
};
