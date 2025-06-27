function g(t, n, a, p, o, d, f, c) {
  var e = typeof t == "function" ? t.options : t;
  n && (e.render = n, e.staticRenderFns = a, e._compiled = !0), p && (e.functional = !0), d && (e._scopeId = "data-v-" + d);
  var s;
  if (f ? (s = function(i) {
    i = i || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !i && typeof __VUE_SSR_CONTEXT__ < "u" && (i = __VUE_SSR_CONTEXT__), o && o.call(this, i), i && i._registeredComponents && i._registeredComponents.add(f);
  }, e._ssrRegister = s) : o && (s = c ? function() {
    o.call(
      this,
      (e.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : o), s)
    if (e.functional) {
      e._injectStyles = s;
      var m = e.render;
      e.render = function(_, h) {
        return s.call(h), m(_, h);
      };
    } else {
      var u = e.beforeCreate;
      e.beforeCreate = u ? [].concat(u, s) : [s];
    }
  return {
    exports: t,
    options: e
  };
}
const x = {
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
        let t = "";
        this.mounted && this.isExpandable && this.expanded && (t = `height: ${this.$refs.text.scrollHeight}px;`), this.style = t, this.animating = !0, setTimeout(() => {
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
      const t = document.querySelector(".category-description.-loading");
      t && t.classList.remove("-loading");
    }
  }
};
var v = function() {
  var n = this, a = n._self._c;
  return a("div", { staticClass: "read-more" }, [a("div", { ref: "text", staticClass: "-text", class: n.textClass, style: n.style }, [n._t("default")], 2), n.isExpandable ? a("div", { staticClass: "-button link-alike", domProps: { textContent: n._s(n.buttonText) }, on: { click: n.toggleExpand } }) : n._e()]);
}, C = [], b = /* @__PURE__ */ g(
  x,
  v,
  C,
  !1,
  null,
  null,
  null,
  null
);
const $ = b.exports;
function r(t) {
  r.installed || (r.installed = !0, t.component("ReadMore", $));
}
const y = {
  install: r
};
let l = null;
typeof window < "u" ? l = window.Vue : typeof global < "u" && (l = global.Vue);
l && l.use(y);
export {
  $ as default
};
