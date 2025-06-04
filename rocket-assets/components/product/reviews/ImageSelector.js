import _ from "https://codigo-aberto-sandbox-assets.s3.amazonaws.com/yampi-templates-sandbox/rocket-assets/dist/vendor/lodash.js";
import v from "https://codigo-aberto-sandbox-assets.s3.amazonaws.com/yampi-templates-sandbox/rocket-assets/dist/vendor/modules/axios/rocket.js";
function I(t, e, s, a, l, n, m, g) {
  var i = typeof t == "function" ? t.options : t;
  e && (i.render = e, i.staticRenderFns = s, i._compiled = !0), a && (i.functional = !0), n && (i._scopeId = "data-v-" + n);
  var o;
  if (m ? (o = function(r) {
    r = r || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !r && typeof __VUE_SSR_CONTEXT__ < "u" && (r = __VUE_SSR_CONTEXT__), l && l.call(this, r), r && r._registeredComponents && r._registeredComponents.add(m);
  }, i._ssrRegister = o) : l && (o = g ? function() {
    l.call(
      this,
      (i.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : l), o)
    if (i.functional) {
      i._injectStyles = o;
      var c = i.render;
      i.render = function(p, f) {
        return o.call(f), c(p, f);
      };
    } else {
      var h = i.beforeCreate;
      i.beforeCreate = h ? [].concat(h, o) : [o];
    }
  return {
    exports: t,
    options: i
  };
}
const U = {
  name: "ImageSelector",
  props: {
    amount: {
      type: [Number, String],
      required: !0
    },
    imagesUrls: {
      type: Array,
      required: !0
    }
  },
  data() {
    return {
      loading: [!1, !1, !1]
    };
  },
  computed: {
    lastIndexUrl() {
      return this.imagesUrls.length ? _.lastIndexOf(this.imagesUrls) : 0;
    }
  },
  methods: {
    handleDelete(t) {
      this.$emit("changeImageUrls", { event: "DELETE", imageNumber: t - 1 });
    },
    checkIfDisabled(t) {
      return this.imagesUrls.length < t - 1;
    },
    async handleChange({ formData: t, formName: e }) {
      this.$emit("uploading", !0);
      const s = this.amount - this.imagesUrls.length;
      if (this.uploadedAmount = t.getAll(e).length, !this.uploadedAmount || !s)
        return;
      for (let n = 0; n < this.uploadedAmount; n++)
        this.lastIndexUrl + n <= this.amount && this.$set(this.loading, this.lastIndexUrl + n, !0);
      const a = await v({
        method: "post",
        url: "/uploads",
        data: t,
        headers: { "Content-Type": "multipart/form-data" }
      }), { data: l } = a;
      for (let n = 0; n < l.length; n++)
        this.$emit("changeImageUrls", { event: "APPEND", imageNumber: n, imageUrl: l[n] }), this.$set(this.loading, this.lastIndexUrl - 1, !1);
      this.$emit("uploading", !1);
    }
  }
};
var C = function() {
  var e = this, s = e._self._c;
  return s("div", [s("div", { staticClass: "image-selector-label" }, [e._v(" Imagem do produto (opcional) ")]), s("div", { staticClass: "image-selector-container" }, e._l(parseInt(e.amount, 10), function(a) {
    return s("InputImage", { key: a, attrs: { item: a, "show-delete-button": !!(e.imagesUrls[a - 1] && e.imagesUrls[a - 1].length), disabled: e.checkIfDisabled(a), "is-multiple": !0, limit: parseInt(e.amount, 10), uplodaded: e.imagesUrls.length }, on: { change: (l) => e.handleChange(l), deleteImage: e.handleDelete }, scopedSlots: e._u([{ key: "images", fn: function() {
      return [s("div", { staticClass: "image-selector", class: { disabled: e.checkIfDisabled(a) } }, [e.loading[a - 1] ? s("ReviewPhotoLoadingIcon") : e.imagesUrls[a - 1] ? s("CustomImage", { staticClass: "review-thumb", attrs: { src: e.imagesUrls[a - 1], width: "100", height: "100" } }) : s("ReviewPhotoIcon")], 1)];
    }, proxy: !0 }], null, !0) });
  }), 1)]);
}, b = [], $ = /* @__PURE__ */ I(
  U,
  C,
  b,
  !1,
  null,
  null,
  null,
  null
);
const w = $.exports;
function u(t) {
  u.installed || (u.installed = !0, t.component("ImageSelector", w));
}
const y = {
  install: u
};
let d = null;
typeof window < "u" ? d = window.Vue : typeof global < "u" && (d = global.Vue);
d && d.use(y);
export {
  w as default
};
