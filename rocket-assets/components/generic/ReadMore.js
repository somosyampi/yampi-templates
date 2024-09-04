function l(e, t, n, m, p, h, x, g) {
  var s = typeof e == "function" ? e.options : e;
  return t && (s.render = t, s.staticRenderFns = n, s._compiled = !0), {
    exports: e,
    options: s
  };
}
const o = {
  name: "ReadMore",
  props: {
    maxLines: {
      type: Number,
      default: 3
    },
    readLess: {
      type: String,
      default: "- Ler menos"
    },
    readMore: {
      type: String,
      default: "+ Ler mais"
    }
  },
  data: () => ({
    style: "",
    mounted: !1,
    expanded: !1,
    animating: !1,
    isExpandable: !1
  }),
  computed: {
    textClass() {
      return {
        "ellipsis-multiline": !this.expanded,
        [`l${this.maxLines}`]: !!this.maxLines,
        expandable: this.isExpandable,
        animating: this.animating
      };
    },
    buttonText() {
      return this.expanded ? this.readLess : this.readMore;
    }
  },
  watch: {
    expanded() {
      this.$nextTick(() => {
        let e = "";
        this.mounted && this.isExpandable && this.expanded && (e = `height: ${this.$refs.text.scrollHeight}px;`), this.style = e, this.animating = !0, setTimeout(() => {
          this.animating = !1;
        }, 300);
      });
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.isExpandable = this.$refs.text.clientHeight < this.$refs.text.scrollHeight, this.mounted = !0, this.removeLoadingClass();
    });
  },
  methods: {
    toggleExpand() {
      this.expanded = !this.expanded;
    },
    removeLoadingClass() {
      const e = document.querySelector(".category-description.-loading");
      e && e.classList.remove("-loading");
    }
  }
};
var d = function() {
  var t = this, n = t._self._c;
  return n("div", { staticClass: "read-more" }, [n("div", { ref: "text", staticClass: "-text", class: t.textClass, style: t.style }, [t._t("default")], 2), t.isExpandable ? n("div", { staticClass: "-button link-alike", domProps: { textContent: t._s(t.buttonText) }, on: { click: t.toggleExpand } }) : t._e()]);
}, r = [], u = /* @__PURE__ */ l(
  o,
  d,
  r
);
const c = u.exports;
function a(e) {
  a.installed || (a.installed = !0, e.component("ReadMore", c));
}
const f = {
  install: a
};
let i = null;
typeof window < "u" ? i = window.Vue : typeof global < "u" && (i = global.Vue);
i && i.use(f);
export {
  c as default
};
