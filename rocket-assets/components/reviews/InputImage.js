function h(t, e, n, s, o, a, r, f) {
  var i = typeof t == "function" ? t.options : t;
  return e && (i.render = e, i.staticRenderFns = n, i._compiled = !0), {
    exports: t,
    options: i
  };
}
const w = {
  name: "InputImage",
  props: {
    item: {
      type: Number,
      required: !0
    },
    showDeleteButton: {
      type: Boolean,
      default: !1
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    isMultiple: {
      type: Boolean,
      default: !1
    },
    limit: {
      type: Number,
      default: 1
    },
    uplodaded: {
      type: Number,
      required: !0
    }
  },
  computed: {
    formName() {
      return this.isMultiple ? "file[]" : "file";
    }
  },
  methods: {
    resize(t) {
      const { file: e } = t, { maxSize: n } = t, s = new FileReader(), o = new Image(), a = document.createElement("canvas"), r = (i) => {
        const l = i.split(",")[0].indexOf("base64") >= 0 ? atob(i.split(",")[1]) : unescape(i.split(",")[1]), m = i.split(",")[0].split(":")[1].split(";")[0], d = l.length, g = new Uint8Array(d);
        for (let u = 0; u < d; u++)
          g[u] = l.charCodeAt(u);
        return new Blob([g], { type: m });
      }, f = () => {
        let { height: i, width: l } = o;
        l > i ? l > n && (i *= n / l, l = n) : i > n && (l *= n / i, i = n), a.width = l, a.height = i, a.getContext("2d").drawImage(o, 0, 0, l, i);
        const m = a.toDataURL("image/jpeg"), d = r(m);
        return new File([d], e.name);
      };
      return new Promise((i, l) => {
        if (!e.type.match(/image.*/)) {
          l(new Error("Not an image"));
          return;
        }
        s.onload = (m) => {
          o.onload = () => i(f()), o.src = m.target.result;
        }, s.readAsDataURL(e);
      });
    },
    async appendNewImage(t) {
      const e = [], n = new FormData(), s = this.limit - this.uplodaded, o = t.length <= s ? t.length : s;
      for (let a = 0; a < o; a++)
        e.push(this.resize({ file: t[a], maxSize: 2048 }));
      return await Promise.all(e).then((a) => {
        for (let r = 0; r < a.length; r++)
          n.append(this.formName, a[r]);
      }), n;
    },
    async handleChange(t) {
      const { files: e } = t.target || t.dataTransfer, n = await this.appendNewImage(e);
      this.$emit("change", {
        formData: n,
        formName: this.formName
      });
    },
    deleteInputFromClosingModal() {
      this.$refs.inputFile.value = null, this.dialog = "", this.imgSrc = "", this.fileName = "", this.imgUrl = "", this.file = "";
    },
    handleDelete(t) {
      this.deleteInputFromClosingModal(), t.stopPropagation(), t.preventDefault(), this.$emit("deleteImage", this.item);
    }
  }
};
var b = function() {
  var e = this, n = e._self._c;
  return n("label", { attrs: { for: `review-image-${e.item}` } }, [e.showDeleteButton ? n("div", { staticClass: "review-image-delete-button", on: { click: e.handleDelete } }, [e._v("× ")]) : e._e(), n("div", { staticClass: "images-selector" }, [e._t("images")], 2), n("input", { ref: "inputFile", staticClass: "image-selector-input", attrs: { id: `review-image-${e.item}`, type: "file", name: e.formName, multiple: e.isMultiple, accept: "image/jpg, image/png, image/jpeg", disabled: e.disabled }, on: { change: e.handleChange } })]);
}, _ = [], y = /* @__PURE__ */ h(
  w,
  b,
  _
);
const v = y.exports;
function p(t) {
  p.installed || (p.installed = !0, t.component("InputImage", v));
}
const N = {
  install: p
};
let c = null;
typeof window < "u" ? c = window.Vue : typeof global < "u" && (c = global.Vue);
c && c.use(N);
export {
  v as default
};
