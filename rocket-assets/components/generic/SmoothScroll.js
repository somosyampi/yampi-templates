import w from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/lodash.js";
function p(n, e, i, s, f, o, a, d) {
  var t = typeof n == "function" ? n.options : n;
  return e && (t.render = e, t.staticRenderFns = i, t._compiled = !0), {
    exports: n,
    options: t
  };
}
const h = {
  name: "SmoothScroll",
  props: {
    elementId: {
      type: String,
      default: null
    },
    margin: {
      type: Number,
      default: 0
    },
    displayAt: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      canShow: !1
    };
  },
  mounted() {
    this.show();
  },
  methods: {
    scroll(n) {
      n.preventDefault();
      let e = 0;
      const i = 30, s = this.elementId ? document.getElementById(this.elementId) : document.body;
      s && (e = Math.max(s.offsetTop - this.margin, 0));
      let o = (e - window.scrollY) / i;
      const a = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame, d = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
      let t;
      const m = () => {
        window.scrollBy(0, o);
        const r = o < 0, u = e - window.scrollY;
        if (r && window.scrollY <= e || !r && window.scrollY >= e)
          return d(t);
        o = r ? Math.max(o, u) : Math.min(o, u), t = a(m);
      };
      t = a(m);
    },
    show() {
      if (!this.displayAt) {
        this.canShow = !0;
        return;
      }
      const n = () => {
        if (window.scrollY >= this.displayAt) {
          this.canShow = !0;
          return;
        }
        this.canShow = !1;
      };
      n(), document.addEventListener(
        "scroll",
        w.debounce(() => {
          n();
        }, 40),
        { passive: !0 }
      );
    }
  }
};
var _ = function() {
  var e = this, i = e._self._c;
  return i("div", { staticClass: "smooth-element", class: { visible: e.canShow } }, [e._t("default", null, { scroll: e.scroll })], 2);
}, y = [], A = /* @__PURE__ */ p(
  h,
  _,
  y
);
const v = A.exports;
function c(n) {
  c.installed || (c.installed = !0, n.component("SmoothScroll", v));
}
const F = {
  install: c
};
let l = null;
typeof window < "u" ? l = window.Vue : typeof global < "u" && (l = global.Vue);
l && l.use(F);
export {
  v as default
};
