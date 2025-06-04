import { mapMutations as _ } from "https://codigo-aberto-sandbox-assets.s3.amazonaws.com/yampi-templates-sandbox/rocket-assets/dist/vendor/vuex.js";
import { uuidv4 as A, getImageMeta as v } from "https://codigo-aberto-sandbox-assets.s3.amazonaws.com/yampi-templates-sandbox/rocket-assets/dist/vendor/mixins/helpers.js";
function y(t, e, o, m, n, d, u, p) {
  var a = typeof t == "function" ? t.options : t;
  e && (a.render = e, a.staticRenderFns = o, a._compiled = !0), m && (a.functional = !0), d && (a._scopeId = "data-v-" + d);
  var i;
  if (u ? (i = function(r) {
    r = r || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !r && typeof __VUE_SSR_CONTEXT__ < "u" && (r = __VUE_SSR_CONTEXT__), n && n.call(this, r), r && r._registeredComponents && r._registeredComponents.add(u);
  }, a._ssrRegister = i) : n && (i = p ? function() {
    n.call(
      this,
      (a.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : n), i)
    if (a.functional) {
      a._injectStyles = i;
      var c = a.render;
      a.render = function(g, f) {
        return i.call(f), c(g, f);
      };
    } else {
      var h = a.beforeCreate;
      a.beforeCreate = h ? [].concat(h, i) : [i];
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
    },
    placeholderWidth: {
      type: Number,
      default: 0
    },
    placeholderHeight: {
      type: Number,
      default: 0
    },
    width: {
      type: [Number, String],
      default: "auto"
    },
    height: {
      type: [Number, String],
      default: "auto"
    }
  },
  data() {
    return {
      uid: A()
    };
  },
  computed: {
    imgSrc() {
      const t = "https://s3.sa-east-1.amazonaws.com/king";
      let e = this.src;
      return this.src.startsWith(t) && (e = e.replace(t, "https://king")), this.thumborEnabled ? this.$thumborize(e, this.thumbor) : this.src;
    },
    placeholderImg() {
      return this.placeholderWidth === 0 || this.placeholderHeight === 0 ? "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" : `data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20${this.placeholderWidth}%20${this.placeholderHeight}%22%3E%3C%2Fsvg%3E`;
    }
  },
  mounted() {
    if (this.listInStore) {
      const t = this;
      v(this.imgSrc, (e, o) => {
        t.PUSH({
          uid: t.uid,
          element: t.$el,
          lazyload: t.lazyload,
          y: o,
          x: e
        });
      });
    }
  },
  methods: {
    ..._("images", ["PUSH", "CLEAR"]),
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
var w = function() {
  var e = this, o = e._self._c;
  return o("img", e._b({ directives: [{ name: "lazyload", rawName: "v-lazyload", value: e.lazyload, expression: "lazyload" }], attrs: { src: e.lazyload ? e.placeholderImg : e.imgSrc, "data-src": e.lazyload ? e.imgSrc : null, width: e.width, height: e.height, onerror: e.handleError() }, on: { load: e.handleLoad } }, "img", e.$attrs, !1));
}, C = [], S = /* @__PURE__ */ y(
  b,
  w,
  C,
  !1,
  null,
  null,
  null,
  null
);
const z = S.exports;
function s(t) {
  s.installed || (s.installed = !0, t.component("CustomImage", z));
}
const E = {
  install: s
};
let l = null;
typeof window < "u" ? l = window.Vue : typeof global < "u" && (l = global.Vue);
l && l.use(E);
export {
  z as default
};
