import f from "https://images-dev.yampi.me/rocket-sandbox/b/01/dist/vendor/lodash.js";
import C from "https://images-dev.yampi.me/rocket-sandbox/b/01/dist/vendor/modules/axios/api.js";
import S from "https://images-dev.yampi.me/rocket-sandbox/b/01/dist/vendor/mixins/product.js";
import v from "https://images-dev.yampi.me/rocket-sandbox/b/01/dist/vendor/mixins/merchant.js";
function w(e, a, o, n, i, l, c, u) {
  var t = typeof e == "function" ? e.options : e;
  a && (t.render = a, t.staticRenderFns = o, t._compiled = !0), n && (t.functional = !0), l && (t._scopeId = "data-v-" + l);
  var s;
  if (c ? (s = function(r) {
    r = r || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !r && typeof __VUE_SSR_CONTEXT__ < "u" && (r = __VUE_SSR_CONTEXT__), i && i.call(this, r), r && r._registeredComponents && r._registeredComponents.add(c);
  }, t._ssrRegister = s) : i && (s = u ? function() {
    i.call(
      this,
      (t.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : i), s)
    if (t.functional) {
      t._injectStyles = s;
      var _ = t.render;
      t.render = function(m, p) {
        return s.call(p), _(m, p);
      };
    } else {
      var g = t.beforeCreate;
      t.beforeCreate = g ? [].concat(g, s) : [s];
    }
  return {
    exports: e,
    options: t
  };
}
const $ = {
  name: "BaseProduct",
  mixins: [S, v],
  data: () => ({
    installments: {},
    loading: !1
  }),
  methods: {
    setLocalStorageCache(e, a, o) {
      const n = window.localStorage, i = window.Yampi.cache.js || 10;
      if (!n)
        return null;
      a.expire_at = new Date().getTime() + i * 6e4, n.setItem(
        this.getLocalStorageCacheKey(e, o),
        JSON.stringify(a)
      );
    },
    getLocalStorageCache(e, a) {
      const o = window.localStorage;
      if (!o)
        return null;
      const n = JSON.parse(
        o.getItem(this.getLocalStorageCacheKey(e, a))
      ) || {};
      return (n.expire_at || 0) < new Date().getTime() ? null : n;
    },
    getLocalStorageCacheKey(e, a) {
      var n;
      const o = a || ((n = this.defaultCard) == null ? void 0 : n.alias);
      return o ? `installments_${o}_${e}` : null;
    },
    async handleInstallments(e) {
      var t;
      const a = e || ((t = this.defaultCard) == null ? void 0 : t.alias);
      if (!a)
        return {};
      const o = this.isSku && f.get(this.validSku, "id") ? this.validSku : void 0, n = f.get(
        o || this.validProduct,
        "prices.data.price"
      ), i = f.get(this.validProduct, "id"), l = this.getLocalStorageCache(n, e);
      if (l)
        return this.loading = !1, l;
      if (!n || !i)
        return this.loading = !1, {};
      this.loading = !0;
      const c = this.$applyQueriesToUrl(
        `catalog/products/${i}/installments`,
        {
          amount: n,
          brand: a
        }
      ), { data: u } = await C.get(c);
      return this.setLocalStorageCache(
        n,
        u.data,
        e
      ), u.data;
    }
  }
}, y = null, L = null;
var T = /* @__PURE__ */ w(
  $,
  y,
  L,
  !1,
  null,
  null,
  null,
  null
);
const b = T.exports;
function h(e) {
  h.installed || (h.installed = !0, e.component("BaseInstallments", b));
}
const R = {
  install: h
};
let d = null;
typeof window < "u" ? d = window.Vue : typeof global < "u" && (d = global.Vue);
d && d.use(R);
export {
  b as default
};
