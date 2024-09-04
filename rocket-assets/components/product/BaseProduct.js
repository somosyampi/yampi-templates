import { mapGetters as n, mapActions as r } from "../vendor/vuex.js";
import d from "../vendor/modules/axios/api.js";
import l from "../vendor/modules/axios/rocket.js";
import m from "../vendor/mixins/product.js";
function c(e, t, i, y, w, P, g, _) {
  var s = typeof e == "function" ? e.options : e;
  return {
    exports: e,
    options: s
  };
}
const u = {
  name: "BaseProduct",
  mixins: [m],
  data: () => ({
    payload: [],
    loading: !1,
    route: "",
    queryParams: "",
    alreadyViewed: !1
  }),
  computed: {
    ...n("preview", ["isPreview"])
  },
  mounted() {
    this.loading = !0;
  },
  methods: {
    ...r("environment", [
      "setRecomm"
    ]),
    async loadProducts() {
      try {
        this.loading = !0;
        let e = `catalog/products/${this.validProduct.id}/${this.route}`;
        this.queryParams && (e = this.$applyQueriesToUrl(e, this.queryParams));
        const { data: t } = await d.get(e);
        if (!t.data.length && this.isPreview) {
          await this.loadPlaceholders();
          return;
        }
        t.recomm_id && (this.setRecomm(t.recomm_id), t.data.forEach((i) => {
          i.url_path += `?has_recomm=1&recomm_id=${t.recomm_id}`;
        })), this.payload = t.data;
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
      const { data: e } = await l.get(`/placeholders/${this.route}`);
      this.payload = e.data;
    },
    visibilityChanged(e) {
      e && this.loadProducts();
    }
  }
};
var f = /* @__PURE__ */ c(
  u
);
const h = f.exports;
function o(e) {
  o.installed || (o.installed = !0, e.component("BaseProduct", h));
}
const p = {
  install: o
};
let a = null;
typeof window < "u" ? a = window.Vue : typeof global < "u" && (a = global.Vue);
a && a.use(p);
export {
  h as default
};
