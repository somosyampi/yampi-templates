import { mapMutations as b } from "https://codigo-aberto-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/vuex.js";
import v from "https://codigo-aberto-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/mixins/buttons.js";
function g(i, e, n, _, a, u, d, h) {
  var t = typeof i == "function" ? i.options : i;
  e && (t.render = e, t.staticRenderFns = n, t._compiled = !0), _ && (t.functional = !0), u && (t._scopeId = "data-v-" + u);
  var o;
  if (d ? (o = function(s) {
    s = s || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !s && typeof __VUE_SSR_CONTEXT__ < "u" && (s = __VUE_SSR_CONTEXT__), a && a.call(this, s), s && s._registeredComponents && s._registeredComponents.add(d);
  }, t._ssrRegister = o) : a && (o = h ? function() {
    a.call(
      this,
      (t.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : a), o)
    if (t.functional) {
      t._injectStyles = o;
      var p = t.render;
      t.render = function(m, c) {
        return o.call(c), p(m, c);
      };
    } else {
      var f = t.beforeCreate;
      t.beforeCreate = f ? [].concat(f, o) : [o];
    }
  return {
    exports: i,
    options: t
  };
}
const C = {
  name: "LoaderButton",
  mixins: [v],
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
    "scrollPos.y": function(i) {
      if (!this.listenPosition)
        return;
      const e = i + this.height > this.$el.offsetTop, n = i + this.height < this.$el.offsetTop + this.height;
      e && n ? this.PUSH({ queue: "buttons", itemId: this._uid }) : this.POP({ queue: "buttons", itemId: this._uid });
    }
  },
  methods: {
    ...b("queue", ["PUSH", "POP"]),
    handleClick(i) {
      this.disabled || this.$emit("click", i);
    }
  }
};
var y = function() {
  var e = this, n = e._self._c;
  return n("button", { staticClass: "loader-button", class: { sending: e.sending }, attrs: { disabled: e.disabled }, on: { click: e.handleClick } }, [e._t("default", function() {
    return [e._v(e._s(e.title))];
  }), n("svg", { attrs: { viewBox: "0 0 36 8" } }, [n("circle", { attrs: { cx: "4", cy: "4", r: "4" } }, [n("animate", { attrs: { attributeName: "opacity", dur: "1s", values: "0;1;0", repeatCount: "indefinite", begin: ".1" } })]), n("circle", { attrs: { cx: "18", cy: "4", r: "4" } }, [n("animate", { attrs: { attributeName: "opacity", dur: "1s", values: "0;1;0", repeatCount: "indefinite", begin: ".2" } })]), n("circle", { attrs: { cx: "32", cy: "4", r: "4" } }, [n("animate", { attrs: { attributeName: "opacity", dur: "1s", values: "0;1;0", repeatCount: "indefinite", begin: ".3" } })])])], 2);
}, P = [], $ = /* @__PURE__ */ g(
  C,
  y,
  P,
  !1,
  null,
  null,
  null,
  null
);
const w = $.exports;
function l(i) {
  l.installed || (l.installed = !0, i.component("LoaderButton", w));
}
const B = {
  install: l
};
let r = null;
typeof window < "u" ? r = window.Vue : typeof global < "u" && (r = global.Vue);
r && r.use(B);
export {
  w as default
};
