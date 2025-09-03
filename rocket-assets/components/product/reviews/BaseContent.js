import { mapGetters as w } from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/vuex.js";
import y from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/lodash.js";
import c from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/modules/axios/api.js";
function $(o, i, n, l, s, u, p, _) {
    var t = typeof o == "function" ? o.options : o;
    i && (t.render = i, t.staticRenderFns = n, t._compiled = !0), l && (t.functional = !0), u && (t._scopeId = "data-v-" + u);
    var e;
    if (p ? (e = function (a) {
        a = a || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !a && typeof __VUE_SSR_CONTEXT__ < "u" && (a = __VUE_SSR_CONTEXT__), s && s.call(this, a), a && a._registeredComponents && a._registeredComponents.add(p);
    }, t._ssrRegister = e) : s && (e = _ ? function () {
        s.call(
            this,
            (t.functional ? this.parent : this).$root.$options.shadowRoot
        );
    } : s), e)
        if (t.functional) {
            t._injectStyles = e;
            var g = t.render;
            t.render = function (m, h) {
                return e.call(h), g(m, h);
            };
        } else {
            var f = t.beforeCreate;
            t.beforeCreate = f ? [].concat(f, e) : [e];
        }
    return {
        exports: o,
        options: t
    };
}
const v = {
    name: "BaseContent",
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
        ...w("product", [
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
        async loadData(o = !1, i = "newest") {
            if (!(!o && (this.loaded || !this.active)))
                try {
                    this.isLoading = !0, this.$emit("update:loading", !0), o && (this.pagination.currentPage += 1);
                    const n = this.$applyQueriesToUrl(`catalog/products/${this.route}`, {
                        product_id: this.product.id,
                        filterBy: i,
                        limit: this.pagination.limit,
                        page: this.pagination.currentPage,
                        include: "photos"
                    }), { data: l } = await c.get(n);
                    this.payload.push(...l.data), this.pagination.loaded += l.data.length;
                } catch (n) {
                    console.error(n);
                } finally {
                    this.loaded = !0, this.isLoading = !1, this.$emit("update:loading", !1);
                }
        },
        async loadCount() {
            try {
                const o = this.$applyQueriesToUrl(`catalog/products/${this.route}/count`, {
                    product_id: this.product.id,
                    limit: this.pagination.limit
                }), { data: i } = await c.get(o);
                this.pagination.total = y.get(i, "data.total", 0), this.$emit("update:count", this.pagination.total);
            } catch (o) {
                console.error(o);
            }
        },
        showModal() {
            this.$refs.modal.showModal();
        },
        showModalSuccess() {
            this.$refs.modalSuccess.showModal();
        }
    }
}, C = null, b = null;
var R = /* @__PURE__ */ $(
    v,
    C,
    b,
    !1,
    null,
    null,
    null,
    null
);
const T = R.exports;
function d(o) {
    d.installed || (d.installed = !0, o.component("BaseContent", T));
}
const B = {
    install: d
};
let r = null;
typeof window < "u" ? r = window.Vue : typeof global < "u" && (r = global.Vue);
r && r.use(B);
export {
    T as default
};
