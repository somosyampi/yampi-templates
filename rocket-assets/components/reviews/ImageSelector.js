import d from "https://s3.amazonaws.com/codigo-aberto-sandbox-assets/rocket/assets/rocket-preview/vendor/lodash.js";
import u from "https://s3.amazonaws.com/codigo-aberto-sandbox-assets/rocket/assets/rocket-preview/vendor/modules/axios/rocket.js";
function m(t, e, i, a, l, s, I, U) {
  var n = typeof t == "function" ? t.options : t;
  return e && (n.render = e, n.staticRenderFns = i, n._compiled = !0), {
    exports: t,
    options: n
  };
}
const c = {
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
      return this.imagesUrls.length ? d.lastIndexOf(this.imagesUrls) : 0;
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
      const i = this.amount - this.imagesUrls.length;
      if (this.uploadedAmount = t.getAll(e).length, !this.uploadedAmount || !i) return;
      for (let s = 0; s < this.uploadedAmount; s++)
        this.lastIndexUrl + s <= this.amount && this.$set(this.loading, this.lastIndexUrl + s, !0);
      const a = await u({
        method: "post",
        url: "/uploads",
        data: t,
        headers: { "Content-Type": "multipart/form-data" }
      }), { data: l } = a;
      for (let s = 0; s < l.length; s++)
        this.$emit("changeImageUrls", { event: "APPEND", imageNumber: s, imageUrl: l[s] }), this.$set(this.loading, this.lastIndexUrl - 1, !1);
      this.$emit("uploading", !1);
    }
  }
};
var g = function() {
  var e = this, i = e._self._c;
  return i("div", [i("div", { staticClass: "image-selector-label" }, [e._v(" Imagem do produto (opcional) ")]), i("div", { staticClass: "image-selector-container" }, e._l(parseInt(e.amount, 10), function(a) {
    return i("input-image", { key: a, attrs: { item: a, "show-delete-button": !!(e.imagesUrls[a - 1] && e.imagesUrls[a - 1].length), disabled: e.checkIfDisabled(a), "is-multiple": !0, limit: parseInt(e.amount, 10), uplodaded: e.imagesUrls.length }, on: { change: (l) => e.handleChange(l), deleteImage: e.handleDelete }, scopedSlots: e._u([{ key: "images", fn: function() {
      return [i("div", { staticClass: "image-selector", class: { disabled: e.checkIfDisabled(a) } }, [e.loading[a - 1] ? i("review-photo-loading-icon") : e.imagesUrls[a - 1] ? i("custom-image", { staticClass: "review-thumb", attrs: { src: e.imagesUrls[a - 1] } }) : i("review-photo-icon")], 1)];
    }, proxy: !0 }], null, !0) });
  }), 1)]);
}, h = [], f = /* @__PURE__ */ m(
  c,
  g,
  h
);
const p = f.exports;
function r(t) {
  r.installed || (r.installed = !0, t.component("ImageSelector", p));
}
const _ = {
  install: r
};
let o = null;
typeof window < "u" ? o = window.Vue : typeof global < "u" && (o = global.Vue);
o && o.use(_);
export {
  p as default
};
