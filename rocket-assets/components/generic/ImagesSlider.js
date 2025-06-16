(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode(".touchable[data-v-5e940a16]{height:100%;width:100%}")),document.head.appendChild(e)}}catch(t){console.error("vite-plugin-css-injected-by-js",t)}})();
import v from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/mixins/touchable.js";
function g(i, e, n, r, a, f, u, h) {
  var t = typeof i == "function" ? i.options : i;
  e && (t.render = e, t.staticRenderFns = n, t._compiled = !0), r && (t.functional = !0), f && (t._scopeId = "data-v-" + f);
  var o;
  if (u ? (o = function(s) {
    s = s || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !s && typeof __VUE_SSR_CONTEXT__ < "u" && (s = __VUE_SSR_CONTEXT__), a && a.call(this, s), s && s._registeredComponents && s._registeredComponents.add(u);
  }, t._ssrRegister = o) : a && (o = h ? function() {
    a.call(
      this,
      (t.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : a), o)
    if (t.functional) {
      t._injectStyles = o;
      var p = t.render;
      t.render = function(m, _) {
        return o.call(_), p(m, _);
      };
    } else {
      var c = t.beforeCreate;
      t.beforeCreate = c ? [].concat(c, o) : [o];
    }
  return {
    exports: i,
    options: t
  };
}
const C = {
  name: "ImagesSlider",
  mixins: [v],
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
    touchDelta(i) {
      if (this.touchStartLength > 1)
        return;
      const e = this.$refs.imagePinch[this.currentIndex];
      (e.isZoomedIn || e.ivyPinch.scale > 1) && e.toggleZoom(), i >= 50 && (this.active = this.currentIndex + 1, this.$refs.splideRef.go(this.active)), i <= -50 && (this.active = this.currentIndex - 1, this.$refs.splideRef.go(this.active));
    }
  },
  mounted() {
    this.bootTouchable();
  },
  methods: {
    handleSplideMoved(i) {
      this.currentIndex = i.index;
    },
    handleSplideMounted(i) {
      this.active = i.index + 1;
    }
  }
};
var S = function() {
  var e = this, n = e._self._c;
  return n("div", { staticClass: "touchable" }, [n("Splide", { ref: "splideRef", staticClass: "custom-splide", attrs: { options: {
    perPage: 1,
    rewind: !1,
    arrows: !1,
    pagination: !1,
    drag: !1,
    start: 0
  }, slides: e.images }, on: { "splide:moved": e.handleSplideMoved, "splide:mounted": e.handleSplideMounted } }, e._l(e.images, function(r) {
    return n("SplideSlide", { key: r.url, staticClass: "review-details-photo-container" }, [n("PinchZoom", { ref: "imagePinch", refInFor: !0, attrs: { "auto-zoom-out": !1, overflow: "visible", "limit-pan": !0, "min-scale": 1, "limit-zoom": "50" } }, [n("img", { attrs: { src: r.url, alt: "zoom" } })])], 1);
  }), 1), n("div", { staticClass: "modal-review-details-pagination" }, [e._v(" ("), n("span", { staticClass: "bold" }, [e._v(e._s(e.currentIndex + 1))]), e._v("/" + e._s(e.images.length) + ") ")])], 1);
}, b = [], I = /* @__PURE__ */ g(
  C,
  S,
  b,
  !1,
  null,
  "5e940a16",
  null,
  null
);
const w = I.exports;
function d(i) {
  d.installed || (d.installed = !0, i.component("ImagesSlider", w));
}
const R = {
  install: d
};
let l = null;
typeof window < "u" ? l = window.Vue : typeof global < "u" && (l = global.Vue);
l && l.use(R);
export {
  w as default
};
