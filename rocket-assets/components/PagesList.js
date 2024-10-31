import l from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/mixins/mobile.js";
function r(t, e, n, i, _, g, v, P) {
  var o = typeof t == "function" ? t.options : t;
  return e && (o.render = e, o.staticRenderFns = n, o._compiled = !0), {
    exports: t,
    options: o
  };
}
const u = {
  name: "PagesList",
  mixins: [
    l
  ],
  props: {
    pageList: {
      type: Array,
      required: !0
    },
    selectedPage: {
      type: String,
      required: !0
    }
  },
  mounted() {
  },
  data: () => ({}),
  methods: {
    openPage(t) {
      this.$redirectTo(t);
    },
    activePage() {
      return `/atendimento/${this.selectedPage}`;
    }
  }
};
var d = function() {
  var e = this, n = e._self._c;
  return e.isMobile ? n("div", { staticClass: "pages-list flex" }, [n("custom-select", { tag: "select", attrs: { id: "pages-select", name: "pages", value: e.activePage() }, on: { change: e.openPage } }, e._l(e.pageList, function(i) {
    return n("option", { key: i.slug, domProps: { value: i.path } }, [e._v(" " + e._s(i.name) + " ")]);
  }), 0)], 1) : e._e();
}, c = [], f = /* @__PURE__ */ r(
  u,
  d,
  c
);
const p = f.exports;
function a(t) {
  a.installed || (a.installed = !0, t.component("PagesList", p));
}
const m = {
  install: a
};
let s = null;
typeof window < "u" ? s = window.Vue : typeof global < "u" && (s = global.Vue);
s && s.use(m);
export {
  p as default
};
