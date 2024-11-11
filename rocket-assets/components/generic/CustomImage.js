import { mapMutations as r } from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/vuex.js";
import { uuidv4 as l, getImageMeta as s } from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/mixins/helpers.js";
function d(t, e, a, p, g, y, _, b) {
  var o = typeof t == "function" ? t.options : t;
  return e && (o.render = e, o.staticRenderFns = a, o._compiled = !0), {
    exports: t,
    options: o
  };
}
const u = {
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
      uid: l()
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
      s(this.imgSrc, (e, a) => {
        t.PUSH({
          uid: t.uid,
          element: t.$el,
          lazyload: t.lazyload,
          y: a,
          x: e
        });
      });
    }
  },
  methods: {
    ...r("images", ["PUSH", "CLEAR"]),
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
var m = function() {
  var e = this, a = e._self._c;
  return a("img", e._b({ directives: [{ name: "lazyload", rawName: "v-lazyload", value: e.lazyload, expression: "lazyload" }], attrs: { src: e.lazyload ? "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" : e.imgSrc, "data-src": e.lazyload ? e.imgSrc : null, width: "auto", height: "auto", onerror: e.handleError() }, on: { load: e.handleLoad } }, "img", e.$attrs, !1));
}, f = [], c = /* @__PURE__ */ d(
  u,
  m,
  f
);
const h = c.exports;
function i(t) {
  i.installed || (i.installed = !0, t.component("CustomImage", h));
}
const A = {
  install: i
};
let n = null;
typeof window < "u" ? n = window.Vue : typeof global < "u" && (n = global.Vue);
n && n.use(A);
export {
  h as default
};
