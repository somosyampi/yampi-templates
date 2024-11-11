import { mapGetters as n, mapActions as r } from "http://rocket.test/dist/vendor/vuex.js";
import d from "http://rocket.test/dist/vendor/modules/axios/api.js";
import l from "http://rocket.test/dist/vendor/modules/axios/rocket.js";
import m from "http://rocket.test/dist/vendor/mixins/product.js";
function c(e, t, o, y, g, w, P, _) {
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
    ...n("preview", ["isPreview", "isEditing"])
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
        if (!t.data.length && (this.isPreview || this.isEditing)) {
          await this.loadPlaceholders();
          return;
        }
        t.recomm_id && (this.setRecomm(t.recomm_id), t.data.forEach((o) => {
          o.url_path += `?has_recomm=1&recomm_id=${t.recomm_id}`;
        })), this.payload = t.data;
      } catch (e) {
        if (e.response.status >= 400 && (this.isPreview || this.isEditing)) {
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
var h = /* @__PURE__ */ c(
  u
);
const f = h.exports;
function a(e) {
  a.installed || (a.installed = !0, e.component("BaseProduct", f));
}
const p = {
  install: a
};
let i = null;
typeof window < "u" ? i = window.Vue : typeof global < "u" && (i = global.Vue);
i && i.use(p);
export {
  f as default
};
