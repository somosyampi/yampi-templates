(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode(".hide[data-v-84a9083f]{visibility:hidden}")),document.head.appendChild(e)}}catch(d){console.error("vite-plugin-css-injected-by-js",d)}})();
import a from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/lodash.js";
function d(t, e, o, v, _, l, p, w) {
  var s = typeof t == "function" ? t.options : t;
  return e && (s.render = e, s.staticRenderFns = o, s._compiled = !0), s._scopeId = "data-v-" + l, {
    exports: t,
    options: s
  };
}
const r = {
  name: "ModalReviewDetailsMobile",
  props: {
    review: {
      type: Object,
      required: !0
    },
    showDates: {
      type: Boolean,
      required: !0
    }
  },
  data() {
    return {
      show: !1,
      ready: !1
    };
  },
  methods: {
    times: a.times,
    handleModal() {
      this.show = !this.show, this.show ? (document.getElementById("app").style.overflow = "hidden", document.getElementsByTagName("body")[0].style = "overflow-y: hidden") : (document.getElementById("app").style.overflow = "", a.delay(() => {
        document.getElementsByTagName("body")[0].style = "overflow-y: auto";
      }, 350, "later"), this.$emit("close"));
    },
    handleClose() {
      this.ready = !this.ready;
    }
  }
};
var c = function() {
  var e = this, o = e._self._c;
  return o("div", { staticClass: "modal-zoom-mobile", class: { "is-active": e.show } }, [o("div", { staticClass: "-header flex -between -vcenter" }, [e._m(0), o("div", { staticClass: "-close flex -vcenter -hcenter", on: { click: e.handleModal } }, [o("i", { staticClass: "icon icon-close-modal-white" })])]), e.show ? o("images-slider", { ref: "imagesSlider", attrs: { images: e.review.photos.data } }) : e._e(), o("div", { staticClass: "control-button" })], 1);
}, m = [function() {
  var t = this, e = t._self._c;
  return e("div", { staticClass: "-message flex -vcenter" }, [e("i", { staticClass: "icon icon-pinch-zoom" }), t._v(" Arraste com os dedos ")]);
}], f = /* @__PURE__ */ d(
  r,
  c,
  m,
  !1,
  null,
  "84a9083f"
);
const u = f.exports;
function n(t) {
  n.installed || (n.installed = !0, t.component("ModalReviewDetailsMobile", u));
}
const h = {
  install: n
};
let i = null;
typeof window < "u" ? i = window.Vue : typeof global < "u" && (i = global.Vue);
i && i.use(h);
export {
  u as default
};
