import { mapGetters as d } from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/vuex.js";
import r from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/lodash.js";
import s from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/modules/axios/api.js";
function u(t, o, a, i, m, g, y, w) {
  var l = typeof t == "function" ? t.options : t;
  return {
    exports: t,
    options: l
  };
}
const p = {
  props: {
    loading: {
      type: Boolean,
      default: !1
    },
    count: {
      type: Number,
      default: 0
    },
    active: {
      type: Boolean,
      default: !1
    },
    showDates: {
      type: Boolean,
      required: !0
    }
  },
  data: () => ({
    payload: [],
    loaded: !1,
    isLoading: !1,
    route: "",
    pagination: {
      total: 0,
      loaded: 0,
      currentPage: 1,
      limit: 4
    }
  }),
  computed: {
    ...d("product", [
      "product"
    ]),
    showLoadMore() {
      return this.pagination.loaded < this.pagination.total;
    }
  },
  watch: {
    active() {
      this.loadData();
    }
  },
  mounted() {
    this.loadData(), this.loadCount();
  },
  methods: {
    async loadData(t = !1, o = "newest") {
      if (!(!t && (this.loaded || !this.active)))
        try {
          this.isLoading = !0, this.$emit("update:loading", !0), t && (this.pagination.currentPage += 1);
          const a = this.$applyQueriesToUrl(`catalog/products/${this.route}`, {
            product_id: this.product.id,
            filterBy: o,
            limit: this.pagination.limit,
            page: this.pagination.currentPage,
            include: "photos"
          }), { data: i } = await s.get(a);
          this.payload.push(...i.data), this.pagination.loaded += i.data.length;
        } catch (a) {
          console.error(a);
        } finally {
          this.loaded = !0, this.isLoading = !1, this.$emit("update:loading", !1);
        }
    },
    async loadCount() {
      try {
        const t = this.$applyQueriesToUrl(`catalog/products/${this.route}/count`, {
          product_id: this.product.id,
          limit: this.pagination.limit
        }), { data: o } = await s.get(t);
        this.pagination.total = r.get(o, "data.total", 0), this.$emit("update:count", this.pagination.total);
      } catch (t) {
        console.error(t);
      }
    },
    showModal() {
      this.$refs.modal.showModal();
    },
    showModalSuccess() {
      this.$refs.modalSuccess.showModal();
    }
  }
};
var c = /* @__PURE__ */ u(
  p
);
const h = c.exports;
function n(t) {
  n.installed || (n.installed = !0, t.component("BaseContent", h));
}
const f = {
  install: n
};
let e = null;
typeof window < "u" ? e = window.Vue : typeof global < "u" && (e = global.Vue);
e && e.use(f);
export {
  h as default
};
