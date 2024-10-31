import { mapGetters as m, mapActions as l } from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/vuex.js";
import u from "https://s3.amazonaws.com/codigo-aberto-sandbox-assets/rocket/assets/rocket-preview/components/filters/BaseFilter.js";
function d(t, e, i, a, o, x, P, _) {
  var r = typeof t == "function" ? t.options : t;
  return e && (r.render = e, r.staticRenderFns = i, r._compiled = !0), {
    exports: t,
    options: r
  };
}
const c = {
  name: "FilterPrice",
  extends: u,
  data: () => ({
    mainQueryString: "price",
    route: "prices",
    value: []
  }),
  computed: {
    ...m("preview", [
      "isPreview"
    ])
  },
  mounted() {
    this.value.push(this.queryParams.min || 0), this.queryParams.max && this.value.push(this.queryParams.max);
  },
  methods: {
    ...l("queryParams", [
      "removeQueryParams"
    ]),
    updatePriceStatus([t, e]) {
      if (this.isPreview)
        return;
      if (t === 0 && this.queryParams.min) {
        this.removeQueryParams("min"), this.parseActiveFilter();
        return;
      }
      if (e === this.payload.max && this.queryParams.max) {
        this.removeQueryParams("max"), this.parseActiveFilter();
        return;
      }
      const i = {};
      t !== this.queryParams.min && t > 0 && (i.min = t), e !== this.queryParams.max && e < this.payload.max && (i.max = e), this.setQueryParams({ ...i, page: 1 }), this.parseActiveFilter();
    },
    parsePayload(t) {
      const e = Number(t.max);
      return this.value.length < 2 && this.value.push(e), {
        min: Number(t.min),
        max: e
      };
    },
    parseFilterStatuses() {
      const [t, e] = this.value;
      if (t === 0 && e === this.payload.max)
        return;
      const i = {};
      t !== 0 && (i.min = t), e !== this.payload.max && (i.max = e);
      const a = this.$formatMoney(Number(t)), o = this.$formatMoney(Number(e));
      this.addActiveFilter({
        id: this.$randomString(),
        key: "price",
        query: i,
        alias: "price",
        name: `${a} - ${o}`
      });
    },
    parseActiveFilter() {
      this.removeActiveFilter({
        alias: "price"
      }), this.parseFilterStatuses();
    },
    filterRemoved() {
      this.value = [0, this.payload.max];
    }
  }
};
var p = function() {
  var e = this, i = e._self._c;
  return i("div", { staticClass: "filter filter-price" }, [i("div", { staticClass: "-title" }, [e._v(" Faixa de preço ")]), e.loading ? [i("loader", { attrs: { margin: 33 } }), i("loader", { staticStyle: { display: "block", margin: "20px auto 54px", width: "50%" } })] : e.payload.max ? i("range-slider", { attrs: { max: e.payload.max, "remove-prefix": !0 }, on: { input: e.updatePriceStatus }, model: { value: e.value, callback: function(a) {
    e.value = a;
  }, expression: "value" } }) : e._e()], 2);
}, f = [], h = /* @__PURE__ */ d(
  c,
  p,
  f
);
const v = h.exports;
function n(t) {
  n.installed || (n.installed = !0, t.component("Price", v));
}
const y = {
  install: n
};
let s = null;
typeof window < "u" ? s = window.Vue : typeof global < "u" && (s = global.Vue);
s && s.use(y);
export {
  v as default
};
