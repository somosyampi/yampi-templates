import l from "https://s3.amazonaws.com/codigo-aberto-sandbox-assets/rocket/assets/rocket-preview/vendor/mixins/mobile.js";
function o(t, e, s, c, m, _, g, x) {
  var i = typeof t == "function" ? t.options : t;
  return e && (i.render = e, i.staticRenderFns = s, i._compiled = !0), {
    exports: t,
    options: i
  };
}
const r = {
  name: "Expandable",
  mixins: [
    l
  ],
  props: {
    title: {
      type: String,
      required: !0
    },
    height: {
      type: Number,
      default: 53
    },
    expand: {
      type: Boolean,
      default: !1
    }
  },
  mounted() {
    this.start();
  },
  watch: {
    isMobile() {
      this.start();
    }
  },
  data() {
    return {
      isExpanded: !1
    };
  },
  methods: {
    open() {
      this.setHeight(this.$refs.target.scrollHeight, !0);
    },
    close() {
      this.setHeight(this.height, !1);
    },
    setHeight(t, e) {
      this.isExpanded = e, this.$refs.target.style.height = t ? t + "px" : null;
    },
    reverse() {
      return this.isExpanded ? this.close() : this.open();
    },
    start() {
      if (this.isMobile)
        return this.startMobile();
      this.startDesktop();
    },
    startMobile() {
      return this.expand ? this.open() : this.close();
    },
    startDesktop() {
      this.setHeight(null, !0);
    }
  }
};
var d = function() {
  var e = this, s = e._self._c;
  return s("div", { ref: "target", staticClass: "expandable-holder", class: { "is-expanded": e.isExpanded } }, [e.isMobile ? s("div", { staticClass: "expandable-title flex -between -vcenter", on: { click: e.reverse } }, [s("span", { domProps: { textContent: e._s(e.title) } }), s("svg", { attrs: { width: "11", height: "6", fill: "none" } }, [s("defs"), s("path", { attrs: { d: "M4.878 5.727c.364.364.849.364 1.213 0l4.242-4.242c.364-.364.364-.849 0-1.212-.364-.364-.848-.364-1.212 0L4.878 4.515c-.363.364-.363.849 0 1.212z" } }), s("path", { attrs: { d: "M6.09 5.727c.364-.363.364-.848 0-1.212L1.849.273C1.484-.091 1-.091.636.273c-.364.363-.364.848 0 1.212l4.242 4.242c.364.364.849.364 1.213 0z" } })])]) : e._e(), e._t("default")], 2);
}, p = [], f = /* @__PURE__ */ o(
  r,
  d,
  p
);
const h = f.exports;
function a(t) {
  a.installed || (a.installed = !0, t.component("Expandable", h));
}
const u = {
  install: a
};
let n = null;
typeof window < "u" ? n = window.Vue : typeof global < "u" && (n = global.Vue);
n && n.use(u);
export {
  h as default
};
