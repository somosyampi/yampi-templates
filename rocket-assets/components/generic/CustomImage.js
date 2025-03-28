import { mapMutations as A } from "https://images-dev.yampi.me/rocket-sandbox/b/01/dist/vendor/vuex.js";
import { uuidv4 as g, getImageMeta as v } from "https://images-dev.yampi.me/rocket-sandbox/b/01/dist/vendor/mixins/helpers.js";
function y(t, e, i, m, r, d, u, c) {
  var a = typeof t == "function" ? t.options : t;
  e && (a.render = e, a.staticRenderFns = i, a._compiled = !0), m && (a.functional = !0), d && (a._scopeId = "data-v-" + d);
  var o;
  if (u ? (o = function(n) {
    n = n || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !n && typeof __VUE_SSR_CONTEXT__ < "u" && (n = __VUE_SSR_CONTEXT__), r && r.call(this, n), n && n._registeredComponents && n._registeredComponents.add(u);
  }, a._ssrRegister = o) : r && (o = c ? function() {
    r.call(
      this,
      (a.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : r), o)
    if (a.functional) {
      a._injectStyles = o;
      var p = a.render;
      a.render = function(_, h) {
        return o.call(h), p(_, h);
      };
    } else {
      var f = a.beforeCreate;
      a.beforeCreate = f ? [].concat(f, o) : [o];
    }
  return {
    exports: t,
    options: a
  };
}
const b = {
  name: "CustomImage",
  props: {
    src: {
      type: String,
      required: !0
    },
    lazyload: {
      type: Boolean,
      default: !0
    },
    thumbor: {
      type: [Object, void 0],
      default: void 0
    },
    thumborEnabled: {
      type: Boolean,
      default: !0
    },
    listInStore: {
      type: Boolean,
      default: !1
    }
  },
  data() {
    return {
      width: 0,
      height: 0,
      uid: g()
    };
  },
  computed: {
    imgSrc() {
      const t = "https://s3.sa-east-1.amazonaws.com/king";
      let e = this.src;
      return this.src.startsWith(t) && (e = e.replace(t, "https://king")), this.thumborEnabled ? this.$thumborize(e, this.thumbor) : this.src;
    }
  },
  mounted() {
    if (this.listInStore) {
      const t = this;
      v(this.imgSrc, (e, i) => {
        t.PUSH({
          uid: t.uid,
          element: t.$el,
          lazyload: t.lazyload,
          y: i,
          x: e
        });
      });
    }
  },
  methods: {
    ...A("images", ["PUSH", "CLEAR"]),
    handleError() {
      this.$emit("onError");
    },
    handleLoad() {
      this.listInStore && this.CLEAR(
        "images"
      );
    }
  }
};
var C = function() {
  var e = this, i = e._self._c;
  return i("img", e._b({ directives: [{ name: "lazyload", rawName: "v-lazyload", value: e.lazyload, expression: "lazyload" }], attrs: { src: e.lazyload ? "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" : e.imgSrc, "data-src": e.lazyload ? e.imgSrc : null, width: "auto", height: "auto", onerror: e.handleError() }, on: { load: e.handleLoad } }, "img", e.$attrs, !1));
}, z = [], S = /* @__PURE__ */ y(
  b,
  C,
  z,
  !1,
  null,
  null,
  null,
  null
);
const E = S.exports;
function s(t) {
  s.installed || (s.installed = !0, t.component("CustomImage", E));
}
const R = {
  install: s
};
let l = null;
typeof window < "u" ? l = window.Vue : typeof global < "u" && (l = global.Vue);
l && l.use(R);
export {
  E as default
};
