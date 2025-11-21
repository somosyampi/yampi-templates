import { mapGetters as v } from "https://openstore-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/vuex.js";
import c from "https://openstore-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/lodash.js";
import g from "https://openstore-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/modules/axios/api.js";
import P from "https://openstore-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/modules/axios/rocket.js";
import w from "https://openstore-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/mixins/queryParams.js";
function R(e, t, r, p, n, u, d, m) {
    var i = typeof e == "function" ? e.options : e;
    t && (i.render = t, i.staticRenderFns = r, i._compiled = !0), p && (i.functional = !0), u && (i._scopeId = "data-v-" + u);
    var s;
    if (d ? (s = function (a) {
        a = a || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !a && typeof __VUE_SSR_CONTEXT__ < "u" && (a = __VUE_SSR_CONTEXT__), n && n.call(this, a), a && a._registeredComponents && a._registeredComponents.add(d);
    }, i._ssrRegister = s) : n && (s = m ? function () {
        n.call(
            this,
            (i.functional ? this.parent : this).$root.$options.shadowRoot
        );
    } : n), s)
        if (i.functional) {
            i._injectStyles = s;
            var _ = i.render;
            i.render = function (y, h) {
                return s.call(h), _(y, h);
            };
        } else {
            var f = i.beforeCreate;
            i.beforeCreate = f ? [].concat(f, s) : [s];
        }
    return {
        exports: e,
        options: i
    };
}
const C = {
    name: "BaseFilter",
    mixins: [
        w
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
        this.shouldUseNewSearchStrategy || this.loadData(), this.$store.subscribe(({ type: e, payload: t }) => {
            e === "filters/REMOVE_ACTIVE_FILTER" && t.key === this.mainQueryString && this.filterRemoved(t);
        }), this.loading = !1;
    },
    methods: {
        processQueryParams(e) {
            if (!this.queryParams[this.mainQueryString])
                return e;
            const t = this.queryParams[this.mainQueryString];
            return t.length && e.forEach((r) => {
                r.active = t.includes(r.id);
            }), e;
        },
        async loadData() {
            try {
                this.loading = !0;
                const e = c.pick(this.queryParams, ["slug", "q", "context"]), t = this.$applyQueriesToUrl(`search/products/${this.route}`, e), { data: r } = await g.get(t);
                if (this.isPreview && c.isEmpty(r.data)) {
                    await this.loadPlaceholders();
                    return;
                }
                this.payload = this.parsePayload(r.data), this.parseFilterStatuses(this.payload);
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
            const t = this.currentPayload.find((r) => r.id === e.id);
            t && (t.active = !1);
        },
        async loadPlaceholders() {
            const { data: e } = await P.get(`/placeholders/filter-${this.route}`);
            this.payload = this.parsePayload(e.data);
        }
    }
}, $ = null, S = null;
var T = /* @__PURE__ */ R(
    C,
    $,
    S,
    !1,
    null,
    null,
    null,
    null
);
const b = T.exports;
function l(e) {
    l.installed || (l.installed = !0, e.component("BaseFilter", b));
}
const E = {
    install: l
};
let o = null;
typeof window < "u" ? o = window.Vue : typeof global < "u" && (o = global.Vue);
o && o.use(E);
export {
    b as default
};
