import v from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/mixins/errors.js";
import g from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/modules/axios/rocket.js";
import w from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/mixins/tracking/api.js";
function b(n, t, r, a, l, f, u, c) {
  var e = typeof n == "function" ? n.options : n;
  t && (e.render = t, e.staticRenderFns = r, e._compiled = !0), a && (e.functional = !0), f && (e._scopeId = "data-v-" + f);
  var s;
  if (u ? (s = function(i) {
    i = i || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !i && typeof __VUE_SSR_CONTEXT__ < "u" && (i = __VUE_SSR_CONTEXT__), l && l.call(this, i), i && i._registeredComponents && i._registeredComponents.add(u);
  }, e._ssrRegister = s) : l && (s = c ? function() {
    l.call(
      this,
      (e.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : l), s)
    if (e.functional) {
      e._injectStyles = s;
      var _ = e.render;
      e.render = function(h, p) {
        return s.call(p), _(h, p);
      };
    } else {
      var m = e.beforeCreate;
      e.beforeCreate = m ? [].concat(m, s) : [s];
    }
  return {
    exports: n,
    options: e
  };
}
const C = {
  name: "Newsletter",
  mixins: [
    v,
    w
  ],
  props: {
    placeholder: {
      type: String,
      default: "Digite seu e-mail"
    },
    buttonText: {
      type: String,
      default: "Cadastre-se"
    }
  },
  data: () => ({
    email: "",
    sending: !1,
    modalSuccessOpened: !1
  }),
  methods: {
    async submit() {
      this.sending = !0, this.clearErrors();
      try {
        await g.post("leads", {
          email: this.email
        }), this.$refs.modalNewsletter.showModal(), this.email = "", this.handleTrackApi("newsletter-inscribed");
      } catch (n) {
        console.error(n), this.setErrorsFromResponse(n);
      } finally {
        this.sending = !1;
      }
    }
  }
};
var y = function() {
  var t = this, r = t._self._c;
  return r("div", { staticClass: "holder-newsletter-form" }, [r("form", { attrs: { id: "form-newsletter" }, on: { submit: function(a) {
    return a.preventDefault(), t.submit.apply(null, arguments);
  } } }, [r("label", { staticClass: "-hide", attrs: { for: "newsletter-email" } }, [t._v("E-mail")]), r("div", { staticClass: "holder-input" }, [r("input", { directives: [{ name: "model", rawName: "v-model", value: t.email, expression: "email" }], attrs: { id: "newsletter-email", type: "email", name: "newsletter-email", placeholder: t.placeholder }, domProps: { value: t.email }, on: { input: function(a) {
    a.target.composing || (t.email = a.target.value);
  } } }), r("ErrorText", { attrs: { text: t.getError("email") } })], 1), r("LoaderButton", { staticClass: "btn btn-secundary", attrs: { sending: t.sending, title: t.buttonText } })], 1), r("ModalNewsletter", { ref: "modalNewsletter" })], 1);
}, N = [], T = /* @__PURE__ */ b(
  C,
  y,
  N,
  !1,
  null,
  null,
  null,
  null
);
const R = T.exports;
function d(n) {
  d.installed || (d.installed = !0, n.component("Newsletter", R));
}
const E = {
  install: d
};
let o = null;
typeof window < "u" ? o = window.Vue : typeof global < "u" && (o = global.Vue);
o && o.use(E);
export {
  R as default
};
