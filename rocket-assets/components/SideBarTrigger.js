import { mapGetters as a } from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/vuex.js";
import l from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/mixins/mobile.js";
import c from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/modules/axios/rocket.js";
function d(t, e, i, r, _, g, y, b) {
  var s = typeof t == "function" ? t.options : t;
  return e && (s.render = e, s.staticRenderFns = i, s._compiled = !0), {
    exports: t,
    options: s
  };
}
const u = {
  name: "SideBarTrigger",
  mixins: [
    l
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
  mounted() {
    this.isActive = document.body.classList.contains(this.activeClass), this.isIframe && this.$store.subscribe(({ type: t, payload: e }) => {
      if (t !== "preview/PREVIEW_MOBILE_PARAMS" || this.activeClass !== "active-filters")
        return;
      e.filter((r) => r.group === "filters").length && this.openMenu();
    });
  },
  data() {
    return {
      isActive: !1
    };
  },
  computed: {
    ...a("preview", [
      "isIframe"
    ])
  },
  methods: {
    openMenu() {
      this.isActive = !0, document.body.classList.add(this.activeClass);
    },
    closeMenu() {
      this.isActive = !1, document.body.classList.remove(this.activeClass);
    },
    async loadPlaceholders() {
      const { data: t } = await c.get(`/placeholders/filter-${this.route}`);
      this.payload = this.parsePayload(t.data);
    }
  }
};
var f = function() {
  var e = this, i = e._self._c;
  return e.isMobile ? i("div", { class: e.name + "-trigger-holder" }, [i("div", { class: e.name + "-trigger", on: { click: e.openMenu } }, [e.isActive ? i("div", { staticClass: "over-background", on: { mousedown: e.closeMenu } }) : e._e(), e._t("default")], 2)]) : e._e();
}, m = [], p = /* @__PURE__ */ d(
  u,
  f,
  m
);
const v = p.exports;
function o(t) {
  o.installed || (o.installed = !0, t.component("SideBarTrigger", v));
}
const h = {
  install: o
};
let n = null;
typeof window < "u" ? n = window.Vue : typeof global < "u" && (n = global.Vue);
n && n.use(h);
export {
  v as default
};
