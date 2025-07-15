function v(o, t, i, d, a, u, c, p) {
  var e = typeof o == "function" ? o.options : o;
  t && (e.render = t, e.staticRenderFns = i, e._compiled = !0), d && (e.functional = !0), u && (e._scopeId = "data-v-" + u);
  var r;
  if (c ? (r = function(n) {
    n = n || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !n && typeof __VUE_SSR_CONTEXT__ < "u" && (n = __VUE_SSR_CONTEXT__), a && a.call(this, n), n && n._registeredComponents && n._registeredComponents.add(c);
  }, e._ssrRegister = r) : a && (r = p ? function() {
    a.call(
      this,
      (e.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : a), r)
    if (e.functional) {
      e._injectStyles = r;
      var A = e.render;
      e.render = function(m, _) {
        return r.call(_), A(m, _);
      };
    } else {
      var f = e.beforeCreate;
      e.beforeCreate = f ? [].concat(f, r) : [r];
    }
  return {
    exports: o,
    options: e
  };
}
const h = {
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
var g = function() {
  var t = this, i = t._self._c;
  return i("div", [t.clicked ? i("div", { staticClass: "embed-container" }, [i("iframe", { attrs: { title: "Youtube video player", src: t.videoUrl + "&muted=1", frameborder: "0", allowfullscreen: "", allow: `accelerometer;
                    autoplay;
                    clipboard-write;
                    encrypted-media;
                    gyroscope;
                    picture-in-picture` } })]) : i("div", { staticClass: "relative", on: { click: function(d) {
    t.clicked = !0;
  } } }, [i("CustomImage", { staticClass: "-loading", attrs: { src: t.imageUrl, "thumbor-enabled": !1, alt: "product video", width: "900", heigth: "500" } }), i("i", { staticClass: "icon icon-yt-play" })], 1)]);
}, C = [], y = /* @__PURE__ */ v(
  h,
  g,
  C,
  !1,
  null,
  null,
  null,
  null
);
const b = y.exports;
function s(o) {
  s.installed || (s.installed = !0, o.component("videoPlayer", b));
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
