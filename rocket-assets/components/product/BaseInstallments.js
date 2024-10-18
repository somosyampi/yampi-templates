import c from "https://s3.amazonaws.com/codigo-aberto-sandbox-assets/rocket/assets/rocket-preview/vendor/lodash.js";
import f from "https://s3.amazonaws.com/codigo-aberto-sandbox-assets/rocket/assets/rocket-preview/vendor/modules/axios/api.js";
import g from "https://s3.amazonaws.com/codigo-aberto-sandbox-assets/rocket/assets/rocket-preview/vendor/mixins/product.js";
import m from "https://s3.amazonaws.com/codigo-aberto-sandbox-assets/rocket/assets/rocket-preview/vendor/mixins/merchant.js";
function h(t, a, n, e, o, r, u, s) {
  var i = typeof t == "function" ? t.options : t;
  return {
    exports: t,
    options: i
  };
}
const p = {
  name: "BaseProduct",
  mixins: [g, m],
  data: () => ({
    installments: {},
    loading: !1
  }),
  methods: {
    setLocalStorageCache(t, a, n) {
      let e = window.localStorage, o = window.Yampi.cache.js || 10;
      if (!e)
        return null;
      a.expire_at = (/* @__PURE__ */ new Date()).getTime() + o * 6e4, e.setItem(
        this.getLocalStorageCacheKey(t, n),
        JSON.stringify(a)
      );
    },
    getLocalStorageCache(t, a) {
      let n = window.localStorage;
      if (!n)
        return null;
      let e = JSON.parse(
        n.getItem(this.getLocalStorageCacheKey(t, a))
      ) || {};
      return (e.expire_at || 0) < (/* @__PURE__ */ new Date()).getTime() ? null : e;
    },
    getLocalStorageCacheKey(t, a) {
      var e;
      const n = a || ((e = this.defaultCard) == null ? void 0 : e.alias);
      return n ? `installments_${n}_${t}` : null;
    },
    async handleInstallments(t) {
      var i;
      const a = t || ((i = this.defaultCard) == null ? void 0 : i.alias);
      if (!a)
        return {};
      const n = this.isSku && c.get(this.validSku, "id") ? this.validSku : void 0, e = c.get(
        n || this.validProduct,
        "prices.data.price"
      ), o = c.get(this.validProduct, "id"), r = this.getLocalStorageCache(e, t);
      if (r)
        return this.loading = !1, r;
      if (!e || !o)
        return this.loading = !1, {};
      this.loading = !0;
      const u = this.$applyQueriesToUrl(
        `catalog/products/${o}/installments`,
        {
          amount: e,
          brand: a
        }
      ), { data: s } = await f.get(u);
      return this.setLocalStorageCache(
        e,
        s.data,
        t
      ), s.data;
    }
  }
};
var S = /* @__PURE__ */ h(
  p
);
const w = S.exports;
function d(t) {
  d.installed || (d.installed = !0, t.component("BaseInstallments", w));
}
const _ = {
  install: d
};
let l = null;
typeof window < "u" ? l = window.Vue : typeof global < "u" && (l = global.Vue);
l && l.use(_);
export {
  w as default
};
