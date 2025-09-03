import { mapGetters as v, mapActions as y } from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/vuex.js";
import g from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/modules/axios/api.js";
import w from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/modules/axios/rocket.js";
import P from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/mixins/product.js";
function $(e, a, s, m, n, d, u, h) {
  var t = typeof e == "function" ? e.options : e;
  a && (t.render = a, t.staticRenderFns = s, t._compiled = !0), m && (t.functional = !0), d && (t._scopeId = "data-v-" + d);
  var o;
  if (u ? (o = function(i) {
    i = i || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !i && typeof __VUE_SSR_CONTEXT__ < "u" && (i = __VUE_SSR_CONTEXT__), n && n.call(this, i), i && i._registeredComponents && i._registeredComponents.add(u);
  }, t._ssrRegister = o) : n && (o = h ? function() {
    n.call(
      this,
      (t.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : n), o)
    if (t.functional) {
      t._injectStyles = o;
      var p = t.render;
      t.render = function(_, c) {
        return o.call(c), p(_, c);
      };
    } else {
      var f = t.beforeCreate;
      t.beforeCreate = f ? [].concat(f, o) : [o];
    }
  return {
    exports: e,
    options: t
  };
}
const C = {
  name: "BaseProduct",
  mixins: [P],
  data: () => ({
    payload: [],
    loading: !1,
    route: "",
    queryParams: "",
    alreadyViewed: !1
  }),
  computed: {
    ...v("preview", ["isPreview"])
  },
  mounted() {
    this.loading = !0;
  },
  methods: {
    ...y("environment", [
      "setRecomm"
    ]),
    async loadProducts() {
      try {
        this.loading = !0;
        let e = `catalog/products/${this.validProduct.id}/${this.route}`;
        this.queryParams && (e = this.$applyQueriesToUrl(e, this.queryParams));
        const { data: a } = await g.get(e);
        if (!a.data.length && this.isPreview) {
          await this.loadPlaceholders();
          return;
        }
        a.recomm_id && (this.setRecomm(a.recomm_id), a.data.forEach((s) => {
          s.url_path += `?has_recomm=1&recomm_id=${a.recomm_id}`;
        })), this.payload = a.data;
      } catch (e) {
        if (e.response.status >= 400 && this.isPreview) {
          await this.loadPlaceholders();
          return;
        }
      } finally {
        this.loading = !1;
      }
    },
    async loadPlaceholders() {
      const { data: e } = await w.get(`/placeholders/${this.route}`);
      this.payload = e.data;
    },
    visibilityChanged(e) {
      e && this.loadProducts();
    }
  }
}, R = null, b = null;
var V = /* @__PURE__ */ $(
  C,
  R,
  b,
  !1,
  null,
  null,
  null,
  null
);
const T = V.exports;
function l(e) {
  l.installed || (l.installed = !0, e.component("BaseProduct", T));
}
const q = {
  install: l
};
let r = null;
typeof window < "u" ? r = window.Vue : typeof global < "u" && (r = global.Vue);
r && r.use(q);
export {
  T as default
};
