import { mapGetters as h } from "https://codigo-aberto-sandbox-assets.yampi.io.s3.amazonaws.com/yampi-templates-sandbox/rocket-assets/dist/vendor/vuex.js";
import g from "https://codigo-aberto-sandbox-assets.yampi.io.s3.amazonaws.com/yampi-templates-sandbox/rocket-assets/dist/vendor/mixins/mobile.js";
import C from "https://codigo-aberto-sandbox-assets.yampi.io.s3.amazonaws.com/yampi-templates-sandbox/rocket-assets/dist/vendor/modules/axios/rocket.js";
function b(t, e, r, l, o, u, f, _) {
  var i = typeof t == "function" ? t.options : t;
  e && (i.render = e, i.staticRenderFns = r, i._compiled = !0), l && (i.functional = !0), u && (i._scopeId = "data-v-" + u);
  var n;
  if (f ? (n = function(s) {
    s = s || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !s && typeof __VUE_SSR_CONTEXT__ < "u" && (s = __VUE_SSR_CONTEXT__), o && o.call(this, s), s && s._registeredComponents && s._registeredComponents.add(f);
  }, i._ssrRegister = n) : o && (n = _ ? function() {
    o.call(
      this,
      (i.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : o), n)
    if (i.functional) {
      i._injectStyles = n;
      var m = i.render;
      i.render = function(v, p) {
        return n.call(p), m(v, p);
      };
    } else {
      var c = i.beforeCreate;
      i.beforeCreate = c ? [].concat(c, n) : [n];
    }
  return {
    exports: t,
    options: i
  };
}
const y = {
  name: "SideBarTrigger",
  mixins: [
    g
  ],
  props: {
    activeClass: {
      type: String,
      required: !0
    },
    name: {
      type: String,
      required: !0
    }
  },
  data() {
    return {
      isActive: !1
    };
  },
  computed: {
    ...h("preview", [
      "isIframe"
    ])
  },
  mounted() {
    this.isActive = document.body.classList.contains(this.activeClass), this.isIframe && this.$store.subscribe(({ type: t, payload: e }) => {
      if (t !== "preview/PREVIEW_MOBILE_PARAMS" || this.activeClass !== "active-filters")
        return;
      e.filter((l) => l.group === "filters").length && this.openMenu();
    });
  },
  methods: {
    openMenu() {
      this.isActive = !0, document.body.classList.add(this.activeClass);
    },
    closeMenu() {
      this.isActive = !1, document.body.classList.remove(this.activeClass);
    },
    async loadPlaceholders() {
      const { data: t } = await C.get(`/placeholders/filter-${this.route}`);
      this.payload = this.parsePayload(t.data);
    }
  }
};
var w = function() {
  var e = this, r = e._self._c;
  return e.isMobile ? r("div", { class: e.name + "-trigger-holder" }, [r("div", { class: e.name + "-trigger", on: { click: e.openMenu } }, [e.isActive ? r("div", { staticClass: "over-background", on: { mousedown: e.closeMenu } }) : e._e(), e._t("default")], 2)]) : e._e();
}, M = [], R = /* @__PURE__ */ b(
  y,
  w,
  M,
  !1,
  null,
  null,
  null,
  null
);
const $ = R.exports;
function d(t) {
  d.installed || (d.installed = !0, t.component("SideBarTrigger", $));
}
const A = {
  install: d
};
let a = null;
typeof window < "u" ? a = window.Vue : typeof global < "u" && (a = global.Vue);
a && a.use(A);
export {
  $ as default
};
