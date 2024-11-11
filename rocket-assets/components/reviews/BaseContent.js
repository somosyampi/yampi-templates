import { mapGetters as s } from "http://rocket.test/dist/vendor/vuex.js";
import r from "http://rocket.test/dist/vendor/lodash.js";
import l from "http://rocket.test/dist/vendor/modules/axios/api.js";
function u(t, o, a, i, m, g, w, y) {
  var d = typeof t == "function" ? t.options : t;
  return {
    exports: t,
    options: d
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
    ...s("product", [
      "product"
    ]),
    ...s("preview", ["isPreview"]),
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
          }), { data: i } = await l.get(a);
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
        }), { data: o } = await l.get(t);
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
