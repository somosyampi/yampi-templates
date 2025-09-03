import { mapMutations as _ } from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/vuex.js";
import { uuidv4 as A, getImageMeta as v } from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/mixins/helpers.js";
function y(t, e, n, d, o, u, h, c) {
  var i = typeof t == "function" ? t.options : t;
  e && (i.render = e, i.staticRenderFns = n, i._compiled = !0), d && (i.functional = !0), u && (i._scopeId = "data-v-" + u);
  var r;
  if (h ? (r = function(a) {
    a = a || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !a && typeof __VUE_SSR_CONTEXT__ < "u" && (a = __VUE_SSR_CONTEXT__), o && o.call(this, a), a && a._registeredComponents && a._registeredComponents.add(h);
  }, i._ssrRegister = r) : o && (r = c ? function() {
    o.call(
      this,
      (i.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : o), r)
    if (i.functional) {
      i._injectStyles = r;
      var p = i.render;
      i.render = function(g, m) {
        return r.call(m), p(g, m);
      };
    } else {
      var f = i.beforeCreate;
      i.beforeCreate = f ? [].concat(f, r) : [r];
    }
  return {
    exports: t,
    options: i
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
      v(this.imgSrc, (e, n) => {
        t.PUSH({
          uid: t.uid,
          element: t.$el,
          lazyload: t.lazyload,
          y: n,
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
  var e = this, n = e._self._c;
  return n("img", e._b({ directives: [{ name: "lazyload", rawName: "v-lazyload", value: e.lazyload, expression: "lazyload" }], attrs: { src: e.lazyload ? e.placeholderImg : e.imgSrc, "data-src": e.lazyload ? e.imgSrc : null, width: e.width, height: e.height, onerror: e.handleError() }, on: { load: e.handleLoad, click: function(d) {
    return e.$emit("click");
  } } }, "img", e.$attrs, !1));
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
const $ = S.exports;
function s(t) {
  s.installed || (s.installed = !0, t.component("CustomImage", $));
}
const z = {
  install: s
};
let l = null;
typeof window < "u" ? l = window.Vue : typeof global < "u" && (l = global.Vue);
l && l.use(z);
export {
  $ as default
};
