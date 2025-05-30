function k(c, e, i, f, a, l, r, s) {
  var t = typeof c == "function" ? c.options : c;
  e && (t.render = e, t.staticRenderFns = i, t._compiled = !0), f && (t.functional = !0), l && (t._scopeId = "data-v-" + l);
  var o;
  if (r ? (o = function(n) {
    n = n || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !n && typeof __VUE_SSR_CONTEXT__ < "u" && (n = __VUE_SSR_CONTEXT__), a && a.call(this, n), n && n._registeredComponents && n._registeredComponents.add(r);
  }, t._ssrRegister = o) : a && (o = s ? function() {
    a.call(
      this,
      (t.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : a), o)
    if (t.functional) {
      t._injectStyles = o;
      var m = t.render;
      t.render = function(p, _) {
        return o.call(_), m(p, _);
      };
    } else {
      var h = t.beforeCreate;
      t.beforeCreate = h ? [].concat(h, o) : [o];
    }
  return {
    exports: c,
    options: t
  };
}
const g = {
  name: "CustomCheckbox",
  props: {
    name: {
      type: String,
      default: ""
    },
    id: {
      type: String,
      default: ""
    },
    text: {
      type: String,
      default: ""
    },
    checked: {
      type: Boolean,
      default: !1
    },
    color: {
      type: String,
      default: null
    },
    image: {
      type: String,
      default: null
    }
  },
  data: () => ({
    checkedState: !1
  }),
  computed: {
    effectBoxStyle() {
      return {
        backgroundImage: this.image ? `url(${this.image})` : null,
        backgroundColor: this.color
      };
    }
  },
  watch: {
    checked: {
      immediate: !0,
      handler() {
        this.checkedState = this.checked;
      }
    }
  },
  methods: {
    change() {
      this.$emit("change", this.checkedState);
    }
  }
};
var v = function() {
  var e = this, i = e._self._c;
  return i("div", { staticClass: "custom-checkbox relative" }, [i("label", { class: { "with-effect": e.color || e.image } }, [e._v(" " + e._s(e.text) + " "), i("input", { directives: [{ name: "model", rawName: "v-model", value: e.checkedState, expression: "checkedState" }], attrs: { type: "checkbox" }, domProps: { checked: Array.isArray(e.checkedState) ? e._i(e.checkedState, null) > -1 : e.checkedState }, on: { change: [function(f) {
    var a = e.checkedState, l = f.target, r = !!l.checked;
    if (Array.isArray(a)) {
      var s = null, t = e._i(a, s);
      l.checked ? t < 0 && (e.checkedState = a.concat([s])) : t > -1 && (e.checkedState = a.slice(0, t).concat(a.slice(t + 1)));
    } else
      e.checkedState = r;
  }, e.change] } }), e.color || e.image ? i("span", { staticClass: "effect-box", style: e.effectBoxStyle }) : e._e(), i("span", { staticClass: "checkmark" })])]);
}, S = [], C = /* @__PURE__ */ k(
  g,
  v,
  S,
  !1,
  null,
  null,
  null,
  null
);
const y = C.exports;
function u(c) {
  u.installed || (u.installed = !0, c.component("CustomCheckbox", y));
}
const b = {
  install: u
};
let d = null;
typeof window < "u" ? d = window.Vue : typeof global < "u" && (d = global.Vue);
d && d.use(b);
export {
  y as default
};
