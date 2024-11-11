(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode(".touchable[data-v-27f6bcb9]{height:100%;width:100%}")),document.head.appendChild(e)}}catch(t){console.error("vite-plugin-css-injected-by-js",t)}})();
import r from "http://rocket.test/dist/vendor/mixins/touchable.js";
function d(t, e, i, o, v, l, _, g) {
  var n = typeof t == "function" ? t.options : t;
  return e && (n.render = e, n.staticRenderFns = i, n._compiled = !0), n._scopeId = "data-v-" + l, {
    exports: t,
    options: n
  };
}
const c = {
  name: "Touchable",
  mixins: [r],
  props: {
    images: {
      type: Array,
      required: !0
    }
  },
  data() {
    return {
      active: 0,
      currentIndex: 0
    };
  },
  watch: {
    touchDelta(t) {
      if (this.touchStartLength > 1)
        return;
      const e = this.$refs.imagePinch[this.currentIndex];
      (e.isZoomedIn || e.ivyPinch.scale > 1) && e.toggleZoom(), t >= 50 && (this.active = this.currentIndex + 1, this.$refs.splideRef.go(this.active)), t <= -50 && (this.active = this.currentIndex - 1, this.$refs.splideRef.go(this.active));
    }
  },
  mounted() {
    this.bootTouchable();
  },
  methods: {
    handleSplideMoved(t) {
      this.currentIndex = t.index;
    },
    handleSplideMounted(t) {
      this.active = t.index + 1;
    }
  }
};
var u = function() {
  var e = this, i = e._self._c;
  return i("div", { staticClass: "touchable" }, [i("splide", { ref: "splideRef", staticClass: "custom-splide", attrs: { options: {
    perPage: 1,
    rewind: !1,
    arrows: !1,
    pagination: !1,
    drag: !1,
    start: 0
  }, slides: e.images }, on: { "splide:moved": e.handleSplideMoved, "splide:mounted": e.handleSplideMounted } }, e._l(e.images, function(o) {
    return i("splide-slide", { key: o.url, staticClass: "review-details-photo-container" }, [i("pinch-zoom", { ref: "imagePinch", refInFor: !0, attrs: { "auto-zoom-out": !1, overflow: "visible", "limit-pan": !0, "min-scale": 1, "limit-zoom": "50" } }, [i("img", { attrs: { src: o.url, alt: "zoom" } })])], 1);
  }), 1), i("div", { staticClass: "modal-review-details-pagination" }, [e._v(" ("), i("span", { staticClass: "bold" }, [e._v(e._s(e.currentIndex + 1))]), e._v("/" + e._s(e.images.length) + ") ")])], 1);
}, f = [], m = /* @__PURE__ */ d(
  c,
  u,
  f,
  !1,
  null,
  "27f6bcb9"
);
const h = m.exports;
function a(t) {
  a.installed || (a.installed = !0, t.component("ImagesSlider", h));
}
const p = {
  install: a
};
let s = null;
typeof window < "u" ? s = window.Vue : typeof global < "u" && (s = global.Vue);
s && s.use(p);
export {
  h as default
};
