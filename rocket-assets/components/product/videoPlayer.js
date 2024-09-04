function l(n, e, t, a, m, p, v, _) {
  var i = typeof n == "function" ? n.options : n;
  return e && (i.render = e, i.staticRenderFns = t, i._compiled = !0), {
    exports: n,
    options: i
  };
}
const c = {
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
var d = function() {
  var e = this, t = e._self._c;
  return t("div", [e.clicked ? t("div", { staticClass: "embed-container" }, [t("iframe", { attrs: { src: e.videoUrl + "&muted=1", frameborder: "0", allowfullscreen: "", allow: `accelerometer;
                    autoplay;
                    clipboard-write;
                    encrypted-media;
                    gyroscope;
                    picture-in-picture` } })]) : t("div", { staticClass: "relative", on: { click: function(a) {
    e.clicked = !0;
  } } }, [t("custom-image", { staticClass: "-loading", attrs: { src: e.imageUrl, "thumbor-enabled": !1, alt: "product video" } }), t("i", { staticClass: "icon icon-yt-play" })], 1)]);
}, s = [], u = /* @__PURE__ */ l(
  c,
  d,
  s
);
const A = u.exports;
function o(n) {
  o.installed || (o.installed = !0, n.component("videoPlayer", A));
}
const f = {
  install: o
};
let r = null;
typeof window < "u" ? r = window.Vue : typeof global < "u" && (r = global.Vue);
r && r.use(f);
export {
  A as default
};
