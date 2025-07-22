(function () { "use strict"; try { if (typeof document < "u") { var e = document.createElement("style"); e.appendChild(document.createTextNode(".touchable[data-v-00622897]{height:100%;width:100%}")), document.head.appendChild(e) } } catch (t) { console.error("vite-plugin-css-injected-by-js", t) } })();
import v from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/mixins/touchable.js";
function g(t, e, n, a, r, f, u, h) {
    var i = typeof t == "function" ? t.options : t;
    e && (i.render = e, i.staticRenderFns = n, i._compiled = !0), a && (i.functional = !0), f && (i._scopeId = "data-v-" + f);
    var o;
    if (u ? (o = function (s) {
        s = s || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !s && typeof __VUE_SSR_CONTEXT__ < "u" && (s = __VUE_SSR_CONTEXT__), r && r.call(this, s), s && s._registeredComponents && s._registeredComponents.add(u);
    }, i._ssrRegister = o) : r && (o = h ? function () {
        r.call(
            this,
            (i.functional ? this.parent : this).$root.$options.shadowRoot
        );
    } : r), o)
        if (i.functional) {
            i._injectStyles = o;
            var p = i.render;
            i.render = function (m, _) {
                return o.call(_), p(m, _);
            };
        } else {
            var c = i.beforeCreate;
            i.beforeCreate = c ? [].concat(c, o) : [o];
        }
    return {
        exports: t,
        options: i
    };
}
const C = {
    name: "ImagesSlider",
    mixins: [v],
    props: {
        images: {
            type: Array,
            required: !0
        }
    },
    data() {
        return {
            active: 0,
            currentIndex: 0
        };
    },
    watch: {
        touchDelta(t) {
            if (this.touchStartLength > 1)
                return;
            const e = this.$refs.imagePinch[this.currentIndex];
            (e.isZoomedIn || e.ivyPinch.scale > 1) && e.toggleZoom(), t >= 50 && (this.active = this.currentIndex + 1, this.$refs.splideRef.go(this.active)), t <= -50 && (this.active = this.currentIndex - 1, this.$refs.splideRef.go(this.active));
        }
    },
    mounted() {
        this.bootTouchable();
    },
    methods: {
        handleSplideMoved(t) {
            this.currentIndex = t.index;
        },
        handleSplideMounted(t) {
            this.active = t.index + 1;
        }
    }
};
var S = function () {
    var e = this, n = e._self._c;
    return n("div", { staticClass: "touchable" }, [n("Splide", {
        ref: "splideRef", staticClass: "custom-splide", attrs: {
            options: {
                perPage: 1,
                rewind: !1,
                arrows: !1,
                pagination: !1,
                drag: !1,
                start: 0
            }, slides: e.images
        }, on: { "splide:moved": e.handleSplideMoved, "splide:mounted": e.handleSplideMounted }
    }, e._l(e.images, function (a) {
        return n("SplideSlide", { key: a.url, staticClass: "review-details-photo-container" }, [n("PinchZoom", { ref: "imagePinch", refInFor: !0, attrs: { "auto-zoom-out": !1, overflow: "visible", "limit-pan": !0, "min-scale": 1, "limit-zoom": "50" } }, [n("img", { attrs: { src: a.url, alt: "zoom" } })])], 1);
    }), 1), n("div", { staticClass: "modal-review-details-pagination" }, [e._v(" ("), n("span", { staticClass: "bold" }, [e._v(e._s(e.currentIndex + 1))]), e._v("/" + e._s(e.images.length) + ") ")])], 1);
}, b = [], I = /* @__PURE__ */ g(
    C,
    S,
    b,
    !1,
    null,
    "00622897",
    null,
    null
);
const w = I.exports;
function d(t) {
    d.installed || (d.installed = !0, t.component("ImagesSlider", w));
}
const R = {
    install: d
};
let l = null;
typeof window < "u" ? l = window.Vue : typeof global < "u" && (l = global.Vue);
l && l.use(R);
export {
    w as default
};
