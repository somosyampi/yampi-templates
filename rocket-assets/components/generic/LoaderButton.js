import { mapMutations as a } from "http://rocket.test/dist/vendor/vuex.js";
import l from "http://rocket.test/dist/vendor/mixins/buttons.js";
function r(e, t, i, h, _, b, y, g) {
  var n = typeof e == "function" ? e.options : e;
  return t && (n.render = t, n.staticRenderFns = i, n._compiled = !0), {
    exports: e,
    options: n
  };
}
const u = {
  name: "LoaderButton",
  mixins: [l],
  props: {
    sending: {
      type: Boolean,
      required: !0
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    title: {
      type: String,
      default: ""
    },
    listenPosition: {
      type: Boolean,
      default: !1
    }
  },
  watch: {
    "scrollPos.y"(e) {
      if (!this.listenPosition) return;
      const t = e + this.height > this.$el.offsetTop, i = e + this.height < this.$el.offsetTop + this.height;
      t && i ? this.PUSH({ queue: "buttons", itemId: this._uid }) : this.POP({ queue: "buttons", itemId: this._uid });
    }
  },
  methods: {
    ...a("queue", ["PUSH", "POP"]),
    handleClick(e) {
      this.disabled || this.$emit("click", e);
    }
  }
};
var d = function() {
  var t = this, i = t._self._c;
  return i("button", { staticClass: "loader-button", class: { sending: t.sending }, attrs: { disabled: t.disabled }, on: { click: t.handleClick } }, [t._t("default", function() {
    return [t._v(t._s(t.title))];
  }), i("svg", { attrs: { viewBox: "0 0 36 8" } }, [i("circle", { attrs: { cx: "4", cy: "4", r: "4" } }, [i("animate", { attrs: { attributeName: "opacity", dur: "1s", values: "0;1;0", repeatCount: "indefinite", begin: ".1" } })]), i("circle", { attrs: { cx: "18", cy: "4", r: "4" } }, [i("animate", { attrs: { attributeName: "opacity", dur: "1s", values: "0;1;0", repeatCount: "indefinite", begin: ".2" } })]), i("circle", { attrs: { cx: "32", cy: "4", r: "4" } }, [i("animate", { attrs: { attributeName: "opacity", dur: "1s", values: "0;1;0", repeatCount: "indefinite", begin: ".3" } })])])], 2);
}, c = [], f = /* @__PURE__ */ r(
  u,
  d,
  c
);
const m = f.exports;
function s(e) {
  s.installed || (s.installed = !0, e.component("LoaderButton", m));
}
const p = {
  install: s
};
let o = null;
typeof window < "u" ? o = window.Vue : typeof global < "u" && (o = global.Vue);
o && o.use(p);
export {
  m as default
};
