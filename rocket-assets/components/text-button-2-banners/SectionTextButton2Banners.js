import { mapGetters as _ } from "https://codigo-aberto-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/vuex.js";
import b from "https://codigo-aberto-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/modules/axios/api.js";
import B from "https://codigo-aberto-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/modules/axios/rocket.js";
import v from "https://codigo-aberto-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/mixins/mobile.js";
import { isLinkSameStoreDomain as y } from "https://codigo-aberto-production-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/mixins/helpers.js";
function C(t, e, n, s, o, d, c, p) {
    var r = typeof t == "function" ? t.options : t;
    e && (r.render = e, r.staticRenderFns = n, r._compiled = !0), s && (r.functional = !0), d && (r._scopeId = "data-v-" + d);
    var a;
    if (c ? (a = function (i) {
        i = i || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !i && typeof __VUE_SSR_CONTEXT__ < "u" && (i = __VUE_SSR_CONTEXT__), o && o.call(this, i), i && i._registeredComponents && i._registeredComponents.add(c);
    }, r._ssrRegister = a) : o && (a = p ? function () {
        o.call(
            this,
            (r.functional ? this.parent : this).$root.$options.shadowRoot
        );
    } : o), a)
        if (r.functional) {
            r._injectStyles = a;
            var f = r.render;
            r.render = function (g, m) {
                return a.call(m), f(g, m);
            };
        } else {
            var h = r.beforeCreate;
            r.beforeCreate = h ? [].concat(h, a) : [a];
        }
    return {
        exports: t,
        options: r
    };
}
const w = {
    name: "SectionTextButton2Banners",
    mixins: [
        v
    ],
    props: {
        numberBanner: {
            type: Number,
            required: !0
        },
        resourceIds: {
            type: Array,
            required: !0
        },
        textAlign: {
            type: String,
            required: !0
        },
        titleText: {
            type: String,
            required: !0
        },
        descriptionText: {
            type: String,
            required: !0
        },
        textPosition: {
            type: String,
            required: !0
        },
        buttonStyle: {
            type: String,
            required: !0
        },
        buttonSwitch: {
            type: Boolean,
            required: !0
        },
        textInButton: {
            type: String,
            required: !0
        },
        linkInButton: {
            type: String,
            required: !0
        }
    },
    data() {
        return {
            banners: [],
            loading: !1,
            isMounted: !1,
            ready: !0,
            isPlaceholder: !1,
            placeholders: null
        };
    },
    computed: {
        ..._("preview", ["isPreview"]),
        customContainerClasses() {
            return [
                `--${this.textPosition}`,
                {
                    "--multiple-resources": this.numberBanner > 1
                }
            ];
        },
        customBannersClasses() {
            return [
                {
                    "--multiple-resources": this.numberBanner > 1
                }
            ];
        },
        customDescriptionClasses() {
            return [
                `--${this.textAlign}`
            ];
        },
        computedAttrs() {
            const t = this.linkInButton === "javascript:void(0)";
            return !this.linkInButton || t ? {} : y(this.linkInButton, window.merchant.domain) ? {
                rel: "noreferrer nofollow",
                "target-type": "_blank"
            } : {
                "target-type": "_blank"
            };
        },
        computedBanners() {
            return !this.banners || this.banners.length === 0 ? [] : this.numberBanner > 1 ? this.banners : [this.banners[0]];
        },
        remainingBannersCount() {
            const t = this.resourceIds.length;
            return this.numberBanner - t;
        },
        hasEnoughUploadedBanners() {
            return this.remainingBannersCount === 0;
        },
        srcFirstPlaceholder() {
            var t, e;
            return !this.placeholders || !this.isPreview ? "" : (e = (t = this.placeholders) == null ? void 0 : t[0]) == null ? void 0 : e.image_url;
        }
    },
    watch: {
        isMobile() {
            this.ready = !1, this.$nextTick(() => {
                this.ready = !0;
            });
        }
    },
    mounted() {
        this.loadBanners(), this.loadPlaceholders();
    },
    methods: {
        async loadPlaceholders() {
            !this.isPreview || (this.placeholders = await this.getPlaceholders());
        },
        async getPlaceholders() {
            const { data: t } = await B({
                method: "get",
                url: "/placeholders/text-button-2-banners"
            });
            return t.data;
        },
        getImage(t) {
            return this.isMobile && t.mobile_image_url || t.image_url;
        },
        async loadBanners() {
            try {
                const t = this.resourceIds;
                if (this.loading = !0, !t.length && this.isPreview) {
                    this.banners = await this.getPlaceholders();
                    return;
                }
                if (!t.length)
                    return;
                let e = {
                    id: t
                };
                e = {
                    status: "active",
                    ...e
                };
                const { data: n } = await b.get("catalog/banners", {
                    params: e
                });
                if (!n.data.length && this.isPreview) {
                    this.banners = await this.getPlaceholders();
                    return;
                }
                if (!this.hasEnoughUploadedBanners && this.isPreview) {
                    let s = await this.getPlaceholders();
                    s = s.slice(
                        0,
                        this.remainingBannersCount
                    ), this.banners = [
                        ...n.data,
                        ...s
                    ];
                    return;
                }
                this.banners = n.data;
            } finally {
                this.loading = !1;
            }
        }
    }
};
var S = function () {
    var e = this, n = e._self._c;
    return e.ready ? n("div", { staticClass: "section-text-button-2-banners--container container", class: e.customContainerClasses }, [n("div", { staticClass: "section-text-button-2-banners--description", class: e.customDescriptionClasses }, [n("div", { staticClass: "theme-title title-text", domProps: { innerHTML: e._s(e.titleText) } }), n("div", { staticClass: "description-text", domProps: { innerHTML: e._s(e.descriptionText) } }), n("div", [e.buttonSwitch ? n("RocketAnchor", e._b({ attrs: { "custom-classes": `section--button btn btn-${e.buttonStyle} ellipsis-multiline`, label: e.textInButton, href: e.linkInButton } }, "RocketAnchor", e.computedAttrs, !1)) : e._e()], 1)]), n("div", { staticClass: "section-text-button-2-banners--banners", class: e.customBannersClasses }, e._l(e.computedBanners, function (s) {
        return n("CustomImage", { key: s.id, attrs: { src: e.getImage(s) || e.srcFirstPlaceholder, alt: `${s.name}`, lazyload: !0, width: "158", height: "237" } });
    }), 1)]) : e._e();
}, P = [], k = /* @__PURE__ */ C(
    w,
    S,
    P,
    !1,
    null,
    null,
    null,
    null
);
const x = k.exports;
function u(t) {
    u.installed || (u.installed = !0, t.component("SectionTextButton2Banners", x));
}
const I = {
    install: u
};
let l = null;
typeof window < "u" ? l = window.Vue : typeof global < "u" && (l = global.Vue);
l && l.use(I);
export {
    x as default
};
