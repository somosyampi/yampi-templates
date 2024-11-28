import { mapGetters as r } from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/vuex.js";
import n from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/lodash.js";
import l from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/modules/axios/api.js";
import d from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/modules/axios/rocket.js";
import u from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/mixins/queryParams.js";
function f(e, t, a, y, w, P, g, v) {
  var s = typeof e == "function" ? e.options : e;
  return {
    exports: e,
    options: s
  };
}
const c = {
  name: "BaseFilter",
  mixins: [
    u
  ],
  data: () => ({
    loading: !0,
    route: "",
    payload: []
  }),
  computed: {
    ...r("preview", ["isPreview"])
  },
  mounted() {
    this.loadData(), this.$store.subscribe(({ type: e, payload: t }) => {
      e === "filters/REMOVE_ACTIVE_FILTER" && t.key === this.mainQueryString && this.filterRemoved(t);
    });
  },
  methods: {
    async loadData() {
      try {
        this.loading = !0;
        const e = n.pick(this.queryParams, ["slug", "q", "context"]), t = this.$applyQueriesToUrl(`search/products/${this.route}`, e), { data: a } = await l.get(t);
        if (this.isPreview && !a.data.length) {
          await this.loadPlaceholders();
          return;
        }
        this.payload = this.parsePayload(a.data), this.parseFilterStatuses(this.payload);
      } catch (e) {
        if (e.response.status >= 400 && this.isPreview) {
          await this.loadPlaceholders();
          return;
        }
        console.error(e);
      } finally {
        this.loading = !1;
      }
    },
    parsePayload(e) {
      return e.map((t) => ({
        ...t,
        active: this.queryParams[this.mainQueryString].includes(t.id)
      }));
    },
    filterRemoved(e) {
      const t = this.payload.find((a) => a.id === e.id);
      t && (t.active = !1);
    },
    async loadPlaceholders() {
      const { data: e } = await d.get(`/placeholders/filter-${this.route}`);
      this.payload = this.parsePayload(e.data);
    }
  }
};
var p = /* @__PURE__ */ f(
  c
);
const m = p.exports;
function o(e) {
  o.installed || (o.installed = !0, e.component("BaseFilter", m));
}
const h = {
  install: o
};
let i = null;
typeof window < "u" ? i = window.Vue : typeof global < "u" && (i = global.Vue);
i && i.use(h);
export {
  m as default
};