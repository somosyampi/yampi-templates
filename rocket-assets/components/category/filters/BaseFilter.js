import { mapGetters as v } from "https://codigo-aberto-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/vuex.js";
import p from "https://codigo-aberto-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/lodash.js";
import g from "https://codigo-aberto-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/modules/axios/api.js";
import w from "https://codigo-aberto-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/modules/axios/rocket.js";
import P from "https://codigo-aberto-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/mixins/queryParams.js";
function R(e, i, s, c, o, d, f, m) {
    var t = typeof e == "function" ? e.options : e;
    i && (t.render = i, t.staticRenderFns = s, t._compiled = !0), c && (t.functional = !0), d && (t._scopeId = "data-v-" + d);
    var r;
    if (f ? (r = function (a) {
        a = a || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !a && typeof __VUE_SSR_CONTEXT__ < "u" && (a = __VUE_SSR_CONTEXT__), o && o.call(this, a), a && a._registeredComponents && a._registeredComponents.add(f);
    }, t._ssrRegister = r) : o && (r = m ? function () {
        o.call(
            this,
            (t.functional ? this.parent : this).$root.$options.shadowRoot
        );
    } : o), r)
        if (t.functional) {
            t._injectStyles = r;
            var _ = t.render;
            t.render = function (y, h) {
                return r.call(h), _(y, h);
            };
        } else {
            var u = t.beforeCreate;
            t.beforeCreate = u ? [].concat(u, r) : [r];
        }
    return {
        exports: e,
        options: t
    };
}
const C = {
    name: "BaseFilter",
    mixins: [
        P
    ],
    data: () => ({
        loading: !0,
        route: "",
        payload: []
    }),
    computed: {
        ...v("preview", ["isPreview"])
    },
    mounted() {
        this.loadData(), this.$store.subscribe(({ type: e, payload: i }) => {
            e === "filters/REMOVE_ACTIVE_FILTER" && i.key === this.mainQueryString && this.filterRemoved(i);
        });
    },
    methods: {
        async loadData() {
            try {
                this.loading = !0;
                const e = p.pick(this.queryParams, ["slug", "q", "context"]), i = this.$applyQueriesToUrl(`search/products/${this.route}`, e), { data: s } = await g.get(i);
                if (this.isPreview && p.isEmpty(s.data)) {
                    await this.loadPlaceholders();
                    return;
                }
                this.payload = this.parsePayload(s.data), this.parseFilterStatuses(this.payload);
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
            return e.map((i) => ({
                ...i,
                active: this.queryParams[this.mainQueryString].includes(i.id)
            }));
        },
        filterRemoved(e) {
            const i = this.payload.find((s) => s.id === e.id);
            i && (i.active = !1);
        },
        async loadPlaceholders() {
            const { data: e } = await w.get(`/placeholders/filter-${this.route}`);
            this.payload = this.parsePayload(e.data);
        }
    }
}, $ = null, T = null;
var b = /* @__PURE__ */ R(
    C,
    $,
    T,
    !1,
    null,
    null,
    null,
    null
);
const V = b.exports;
function l(e) {
    l.installed || (l.installed = !0, e.component("BaseFilter", V));
}
const E = {
    install: l
};
let n = null;
typeof window < "u" ? n = window.Vue : typeof global < "u" && (n = global.Vue);
n && n.use(E);
export {
    V as default
};
