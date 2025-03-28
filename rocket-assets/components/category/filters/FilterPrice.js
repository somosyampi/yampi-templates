import { mapGetters as _, mapActions as y } from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/vuex.js";
import P from "https://s3.amazonaws.com/codigo-aberto-sandbox-assets/yampi-templates-sandbox/rocket-assets/components/category/filters/BaseFilter.js";
function F(t, e, a, o, n, m, f, h) {
  var i = typeof t == "function" ? t.options : t;
  e && (i.render = e, i.staticRenderFns = a, i._compiled = !0), o && (i.functional = !0), m && (i._scopeId = "data-v-" + m);
  var s;
  if (f ? (s = function(r) {
    r = r || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !r && typeof __VUE_SSR_CONTEXT__ < "u" && (r = __VUE_SSR_CONTEXT__), n && n.call(this, r), r && r._registeredComponents && r._registeredComponents.add(f);
  }, i._ssrRegister = s) : n && (s = h ? function() {
    n.call(
      this,
      (i.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : n), s)
    if (i.functional) {
      i._injectStyles = s;
      var c = i.render;
      i.render = function(v, p) {
        return s.call(p), c(v, p);
      };
    } else {
      var d = i.beforeCreate;
      i.beforeCreate = d ? [].concat(d, s) : [s];
    }
  return {
    exports: t,
    options: i
  };
}
const b = {
  name: "FilterPrice",
  extends: P,
  data: () => ({
    mainQueryString: "price",
    route: "prices",
    value: []
  }),
  computed: {
    ..._("preview", [
      "isIframe"
    ])
  },
  mounted() {
    this.value.push(this.queryParams.min || 0), this.queryParams.max && this.value.push(this.queryParams.max);
  },
  methods: {
    ...y("queryParams", [
      "removeQueryParams"
    ]),
    updatePriceStatus([t, e]) {
      if (this.isIframe)
        return;
      if (t === 0 && Number(this.queryParams.min)) {
        this.removeQueryParams("min"), this.parseActiveFilter();
        return;
      }
      if (e === this.payload.max && Number(this.queryParams.max)) {
        this.removeQueryParams("max"), this.parseActiveFilter();
        return;
      }
      const a = {};
      t !== Number(this.queryParams.min) && t > 0 && (a.min = t), e !== Number(this.queryParams.max) && e < this.payload.max && (a.max = e), this.setQueryParams({ ...a, page: 1 }), this.parseActiveFilter();
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
      const a = {};
      t !== 0 && (a.min = t), e !== this.payload.max && (a.max = e);
      const o = this.$formatMoney(Number(t)), n = this.$formatMoney(Number(e));
      this.addActiveFilter({
        id: this.$randomString(),
        key: "price",
        query: a,
        alias: "price",
        name: `${o} - ${n}`
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
var x = function() {
  var e = this, a = e._self._c;
  return a("div", { staticClass: "filter filter-price" }, [a("div", { staticClass: "-title" }, [e._v(" Faixa de pre\xE7o ")]), e.loading ? [a("TheLoader", { attrs: { margin: 33 } }), a("TheLoader", { staticStyle: { display: "block", margin: "20px auto 54px", width: "50%" } })] : e.payload.max ? a("RangeSlider", { attrs: { max: e.payload.max, "remove-prefix": !0 }, on: { input: e.updatePriceStatus }, model: { value: e.value, callback: function(o) {
    e.value = o;
  }, expression: "value" } }) : e._e()], 2);
}, g = [], q = /* @__PURE__ */ F(
  b,
  x,
  g,
  !1,
  null,
  null,
  null,
  null
);
const C = q.exports;
function l(t) {
  l.installed || (l.installed = !0, t.component("FilterPrice", C));
}
const $ = {
  install: l
};
let u = null;
typeof window < "u" ? u = window.Vue : typeof global < "u" && (u = global.Vue);
u && u.use($);
export {
  C as default
};
