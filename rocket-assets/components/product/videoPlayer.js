function v(a, r, i, d, o, u, c, p) {
  var e = typeof a == "function" ? a.options : a;
  r && (e.render = r, e.staticRenderFns = i, e._compiled = !0), d && (e.functional = !0), u && (e._scopeId = "data-v-" + u);
  var t;
  if (c ? (t = function(n) {
    n = n || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !n && typeof __VUE_SSR_CONTEXT__ < "u" && (n = __VUE_SSR_CONTEXT__), o && o.call(this, n), n && n._registeredComponents && n._registeredComponents.add(c);
  }, e._ssrRegister = t) : o && (t = p ? function() {
    o.call(
      this,
      (e.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : o), t)
    if (e.functional) {
      e._injectStyles = t;
      var A = e.render;
      e.render = function(m, _) {
        return t.call(_), A(m, _);
      };
    } else {
      var f = e.beforeCreate;
      e.beforeCreate = f ? [].concat(f, t) : [t];
    }
  return {
    exports: a,
    options: e
  };
}
const g = {
  name: "VideoPlayer",
  props: {
    imgSrc: {
      type: String,
      required: !0
    },
    videoUrl: {
      type: String,
      required: !0
    }
  },
  data() {
    return {
      clicked: !0
    };
  },
  computed: {
    imageUrl() {
      return this.imgSrc || "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
    }
  }
};
var h = function() {
  var r = this, i = r._self._c;
  return i("div", [r.clicked ? i("div", { staticClass: "embed-container" }, [i("iframe", { attrs: { src: r.videoUrl + "&muted=1", frameborder: "0", allowfullscreen: "", allow: `accelerometer;
                    autoplay;
                    clipboard-write;
                    encrypted-media;
                    gyroscope;
                    picture-in-picture` } })]) : i("div", { staticClass: "relative", on: { click: function(d) {
    r.clicked = !0;
  } } }, [i("CustomImage", { staticClass: "-loading", attrs: { src: r.imageUrl, "thumbor-enabled": !1, alt: "product video" } }), i("i", { staticClass: "icon icon-yt-play" })], 1)]);
}, C = [], y = /* @__PURE__ */ v(
  g,
  h,
  C,
  !1,
  null,
  null,
  null,
  null
);
const b = y.exports;
function s(a) {
  s.installed || (s.installed = !0, a.component("videoPlayer", b));
}
const w = {
  install: s
};
let l = null;
typeof window < "u" ? l = window.Vue : typeof global < "u" && (l = global.Vue);
l && l.use(w);
export {
  b as default
};
