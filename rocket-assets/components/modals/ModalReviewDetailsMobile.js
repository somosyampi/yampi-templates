(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode(".hide[data-v-940353da]{visibility:hidden}")),document.head.appendChild(e)}}catch(d){console.error("vite-plugin-css-injected-by-js",d)}})();
import u from "https://images-dev.yampi.me/rocket-sandbox/b/01/dist/vendor/lodash.js";
function w(o, t, i, h, a, d, c, m) {
  var e = typeof o == "function" ? o.options : o;
  t && (e.render = t, e.staticRenderFns = i, e._compiled = !0), h && (e.functional = !0), d && (e._scopeId = "data-v-" + d);
  var n;
  if (c ? (n = function(s) {
    s = s || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !s && typeof __VUE_SSR_CONTEXT__ < "u" && (s = __VUE_SSR_CONTEXT__), a && a.call(this, s), s && s._registeredComponents && s._registeredComponents.add(c);
  }, e._ssrRegister = n) : a && (n = m ? function() {
    a.call(
      this,
      (e.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : a), n)
    if (e.functional) {
      e._injectStyles = n;
      var v = e.render;
      e.render = function(p, _) {
        return n.call(_), v(p, _);
      };
    } else {
      var f = e.beforeCreate;
      e.beforeCreate = f ? [].concat(f, n) : [n];
    }
  return {
    exports: o,
    options: e
  };
}
const y = {
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
    times: u.times,
    handleModal() {
      this.show = !this.show, this.show ? (document.getElementById("app").style.overflow = "hidden", document.getElementsByTagName("body")[0].style = "overflow-y: hidden") : (document.getElementById("app").style.overflow = "", u.delay(() => {
        document.getElementsByTagName("body")[0].style = "overflow-y: auto";
      }, 350, "later"), this.$emit("close"));
    },
    handleClose() {
      this.ready = !this.ready;
    }
  }
};
var C = function() {
  var t = this, i = t._self._c;
  return i("div", { staticClass: "modal-zoom-mobile", class: { "is-active": t.show } }, [i("div", { staticClass: "-header flex -between -vcenter" }, [t._m(0), i("div", { staticClass: "-close flex -vcenter -hcenter", on: { click: t.handleModal } }, [i("i", { staticClass: "icon icon-close-modal-white" })])]), t.show ? i("ImagesSlider", { ref: "imagesSlider", attrs: { images: t.review.photos.data } }) : t._e(), i("div", { staticClass: "control-button" })], 1);
}, g = [function() {
  var o = this, t = o._self._c;
  return t("div", { staticClass: "-message flex -vcenter" }, [t("i", { staticClass: "icon icon-pinch-zoom" }), o._v(" Arraste com os dedos ")]);
}], b = /* @__PURE__ */ w(
  y,
  C,
  g,
  !1,
  null,
  "940353da",
  null,
  null
);
const R = b.exports;
function r(o) {
  r.installed || (r.installed = !0, o.component("ModalReviewDetailsMobile", R));
}
const M = {
  install: r
};
let l = null;
typeof window < "u" ? l = window.Vue : typeof global < "u" && (l = global.Vue);
l && l.use(M);
export {
  R as default
};
