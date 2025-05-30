function _(n, t, a, d, l, o, r, c) {
  var e = typeof n == "function" ? n.options : n;
  t && (e.render = t, e.staticRenderFns = a, e._compiled = !0), d && (e.functional = !0), o && (e._scopeId = "data-v-" + o);
  var i;
  if (r ? (i = function(s) {
    s = s || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !s && typeof __VUE_SSR_CONTEXT__ < "u" && (s = __VUE_SSR_CONTEXT__), l && l.call(this, s), s && s._registeredComponents && s._registeredComponents.add(r);
  }, e._ssrRegister = i) : l && (i = c ? function() {
    l.call(
      this,
      (e.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : l), i)
    if (e.functional) {
      e._injectStyles = i;
      var m = e.render;
      e.render = function(u, g) {
        return i.call(g), m(u, g);
      };
    } else {
      var f = e.beforeCreate;
      e.beforeCreate = f ? [].concat(f, i) : [i];
    }
  return {
    exports: n,
    options: e
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
    resize(n) {
      const { file: t } = n, { maxSize: a } = n, d = new FileReader(), l = new Image(), o = document.createElement("canvas"), r = (e) => {
        const i = e.split(",")[0].indexOf("base64") >= 0 ? atob(e.split(",")[1]) : unescape(e.split(",")[1]), m = e.split(",")[0].split(":")[1].split(";")[0], f = i.length, s = new Uint8Array(f);
        for (let u = 0; u < f; u++)
          s[u] = i.charCodeAt(u);
        return new Blob([s], { type: m });
      }, c = () => {
        let { height: e, width: i } = l;
        i > e ? i > a && (e *= a / i, i = a) : e > a && (i *= a / e, e = a), o.width = i, o.height = e, o.getContext("2d").drawImage(l, 0, 0, i, e);
        const m = o.toDataURL("image/jpeg"), f = r(m);
        return new File([f], t.name);
      };
      return new Promise((e, i) => {
        if (!t.type.match(/image.*/)) {
          i(new Error("Not an image"));
          return;
        }
        d.onload = (m) => {
          l.onload = () => e(c()), l.src = m.target.result;
        }, d.readAsDataURL(t);
      });
    },
    async appendNewImage(n) {
      const t = [], a = new FormData(), d = this.limit - this.uplodaded, l = n.length <= d ? n.length : d;
      for (let o = 0; o < l; o++)
        t.push(this.resize({ file: n[o], maxSize: 2048 }));
      return await Promise.all(t).then((o) => {
        for (let r = 0; r < o.length; r++)
          a.append(this.formName, o[r]);
      }), a;
    },
    async handleChange(n) {
      const { files: t } = n.target || n.dataTransfer, a = await this.appendNewImage(t);
      this.$emit("change", {
        formData: a,
        formName: this.formName
      });
    },
    deleteInputFromClosingModal() {
      this.$refs.inputFile.value = null, this.dialog = "", this.imgSrc = "", this.fileName = "", this.imgUrl = "", this.file = "";
    },
    handleDelete(n) {
      this.deleteInputFromClosingModal(), n.stopPropagation(), n.preventDefault(), this.$emit("deleteImage", this.item);
    }
  }
};
var v = function() {
  var t = this, a = t._self._c;
  return a("label", { attrs: { for: `review-image-${t.item}` } }, [t.showDeleteButton ? a("div", { staticClass: "review-image-delete-button", on: { click: t.handleDelete } }, [t._v("\xD7 ")]) : t._e(), a("div", { staticClass: "images-selector" }, [t._t("images")], 2), a("input", { ref: "inputFile", staticClass: "image-selector-input", attrs: { id: `review-image-${t.item}`, type: "file", name: t.formName, multiple: t.isMultiple, accept: "image/jpg, image/png, image/jpeg", disabled: t.disabled }, on: { change: t.handleChange } })]);
}, b = [], C = /* @__PURE__ */ _(
  w,
  v,
  b,
  !1,
  null,
  null,
  null,
  null
);
const y = C.exports;
function h(n) {
  h.installed || (h.installed = !0, n.component("InputImage", y));
}
const N = {
  install: h
};
let p = null;
typeof window < "u" ? p = window.Vue : typeof global < "u" && (p = global.Vue);
p && p.use(N);
export {
  y as default
};
