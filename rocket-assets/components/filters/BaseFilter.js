import { mapGetters as r } from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/vuex.js";
import n from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/lodash.js";
import l from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/modules/axios/api.js";
import d from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/modules/axios/rocket.js";
import u from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/mixins/queryParams.js";
function f(e, t, i, y, g, w, P, v) {
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
    ...r("preview", ["isPreview", "isEditing"])
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
        const e = n.pick(this.queryParams, ["slug", "q", "context"]), t = this.$applyQueriesToUrl(`search/products/${this.route}`, e), { data: i } = await l.get(t);
        if ((this.isPreview || this.isEditing) && !i.data.length) {
          await this.loadPlaceholders();
          return;
        }
        this.payload = this.parsePayload(i.data), this.parseFilterStatuses(this.payload);
      } catch (e) {
        if (e.response.status >= 400 && (this.isPreview || this.isEditing)) {
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
      const t = this.payload.find((i) => i.id === e.id);
      t && (t.active = !1);
    },
    async loadPlaceholders() {
      const { data: e } = await d.get(`/placeholders/filter-${this.route}`);
      this.payload = this.parsePayload(e.data);
    }
  }
};
var h = /* @__PURE__ */ f(
  c
);
const p = h.exports;
function o(e) {
  o.installed || (o.installed = !0, e.component("BaseFilter", p));
}
const m = {
  install: o
};
let a = null;
typeof window < "u" ? a = window.Vue : typeof global < "u" && (a = global.Vue);
a && a.use(m);
export {
  p as default
};
