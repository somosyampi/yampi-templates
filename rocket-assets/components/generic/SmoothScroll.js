import _ from "https://codigo-aberto-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/lodash.js";
function v(t, n, r, u, l, s, a, c) {
  var e = typeof t == "function" ? t.options : t;
  n && (e.render = n, e.staticRenderFns = r, e._compiled = !0), u && (e.functional = !0), s && (e._scopeId = "data-v-" + s);
  var o;
  if (a ? (o = function(i) {
    i = i || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !i && typeof __VUE_SSR_CONTEXT__ < "u" && (i = __VUE_SSR_CONTEXT__), l && l.call(this, i), i && i._registeredComponents && i._registeredComponents.add(a);
  }, e._ssrRegister = o) : l && (o = c ? function() {
    l.call(
      this,
      (e.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : l), o)
    if (e.functional) {
      e._injectStyles = o;
      var d = e.render;
      e.render = function(p, h) {
        return o.call(h), d(p, h);
      };
    } else {
      var f = e.beforeCreate;
      e.beforeCreate = f ? [].concat(f, o) : [o];
    }
  return {
    exports: t,
    options: e
  };
}
const y = {
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
    scroll(t) {
      t.preventDefault();
      let n = 0;
      const r = 30, u = this.elementId ? document.getElementById(this.elementId) : document.body;
      u && (n = Math.max(u.offsetTop - this.margin, 0));
      let s = (n - window.scrollY) / r;
      const a = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame, c = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
      let e;
      const o = () => {
        window.scrollBy(0, s);
        const d = s < 0, f = n - window.scrollY;
        if (d && window.scrollY <= n || !d && window.scrollY >= n)
          return c(e);
        s = d ? Math.max(s, f) : Math.min(s, f), e = a(o);
      };
      e = a(o);
    },
    show() {
      if (!this.displayAt) {
        this.canShow = !0;
        return;
      }
      const t = () => {
        if (window.scrollY >= this.displayAt) {
          this.canShow = !0;
          return;
        }
        this.canShow = !1;
      };
      t(), document.addEventListener(
        "scroll",
        _.debounce(() => {
          t();
        }, 40),
        { passive: !0 }
      );
    }
  }
};
var A = function() {
  var n = this, r = n._self._c;
  return r("div", { staticClass: "smooth-element", class: { visible: n.canShow } }, [n._t("default", null, { scroll: n.scroll })], 2);
}, S = [], b = /* @__PURE__ */ v(
  y,
  A,
  S,
  !1,
  null,
  null,
  null,
  null
);
const g = b.exports;
function w(t) {
  w.installed || (w.installed = !0, t.component("SmoothScroll", g));
}
const C = {
  install: w
};
let m = null;
typeof window < "u" ? m = window.Vue : typeof global < "u" && (m = global.Vue);
m && m.use(C);
export {
  g as default
};
