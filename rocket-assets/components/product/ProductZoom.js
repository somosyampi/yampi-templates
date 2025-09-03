import f from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/lodash.js";
import b from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/mixins/mobile.js";
import _ from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-main/rocket-assets/dist/vendor/mixins/product.js";
function C(t, e, i, a, s, r, d, g) {
    var o = typeof t == "function" ? t.options : t;
    e && (o.render = e, o.staticRenderFns = i, o._compiled = !0), a && (o.functional = !0), r && (o._scopeId = "data-v-" + r);
    var l;
    if (d ? (l = function (n) {
        n = n || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !n && typeof __VUE_SSR_CONTEXT__ < "u" && (n = __VUE_SSR_CONTEXT__), s && s.call(this, n), n && n._registeredComponents && n._registeredComponents.add(d);
    }, o._ssrRegister = l) : s && (l = g ? function () {
        s.call(
            this,
            (o.functional ? this.parent : this).$root.$options.shadowRoot
        );
    } : s), l)
        if (o.functional) {
            o._injectStyles = l;
            var p = o.render;
            o.render = function (v, c) {
                return l.call(c), p(v, c);
            };
        } else {
            var m = o.beforeCreate;
            o.beforeCreate = m ? [].concat(m, l) : [l];
        }
    return {
        exports: t,
        options: o
    };
}
const I = {
    name: "ProductZoom",
    mixins: [
        b,
        _
    ],
    props: {
        hasVideo: {
            type: Boolean,
            default: !1
        },
        thumbWidth: {
            type: Number,
            default: 0
        },
        thumbHeight: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            defaultThumbSize: 75,
            imageIndicator: 0,
            activeZoom: !1,
            zoomImage: "",
            isZooming: !1,
            mounted: !1,
            lastEvent: 0,
            xDown: null,
            yDown: null,
            ready: !0,
            loadedImages: [],
            lastSku: null,
            carouselMinHeight: 0,
            imgPlaceholder: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        };
    },
    computed: {
        thumbnailWidth() {
            return this.thumbWidth || this.thumbHeight || this.defaultThumbSize;
        },
        thumbnailHeight() {
            return this.thumbHeight || this.thumbWidth || this.defaultThumbSize;
        },
        hasArrows() {
            return this.productImages.length > (this.hasVideo ? 5 : 6);
        },
        carouselHeight() {
            return this.hasVideo ? 445 : 530;
        },
        carouselOption() {
            return {
                gap: 16,
                height: this.carouselHeight,
                fixedWidth: this.thumbnailWidth,
                fixedHeight: this.thumbnailHeight,
                pagination: !1,
                rewind: !0,
                cover: !0,
                direction: "ttb",
                isNavigation: !0,
                arrows: this.hasArrows
            };
        },
        productImages() {
            const t = f.get(this.validProduct, "use_different_images") ? this.lastSku || this.validProduct : this.validProduct;
            return f.get(t, "images.data", []);
        },
        imageIndicatorText() {
            return `<span class='-active'>${this.imageIndicator + 1}</span><span class="-total">${this.productImages.length}</span>`;
        },
        mainCarouselHolderStyle() {
            return !this.isMobile || !this.carouselMinHeight ? null : `min-height: ${this.carouselMinHeight}px;`;
        }
    },
    watch: {
        isMobile() {
            this.ready = !1, this.$nextTick(() => {
                this.ready = !0, this.isMobile ? this.syncZoomCarousel() : (this.setMobileMinHeight(), this.syncCarousel());
            });
        },
        selectedSku() {
            this.selectedSku && (this.lastSku = { ...this.selectedSku }, this.validProduct.use_different_images && (this.loadedImages = [], this.updateIndex(0)), this.isMobile && (this.ready = !1, this.$nextTick(() => {
                this.ready = !0;
            })));
        }
    },
    mounted() {
        this.syncCarousel(), this.syncZoomCarousel(), this.handleZoomMobileGestures(), this.loadInitialImages();
    },
    methods: {
        treatCustomImage(t) {
            const e = "https://s3.sa-east-1.amazonaws.com/king";
            let i = t;
            return i.startsWith(e) && (i = i.replace(e, "https://king")), i;
        },
        syncCarousel() {
            setTimeout(() => {
                const t = this.$refs.mainImage, e = this.$refs.thumbnail;
                !t || !e || t.sync(e.splide);
            }, 0);
        },
        syncZoomCarousel() {
            setTimeout(() => {
                const t = this.$refs.mainImage, e = this.$refs.zoomMobile;
                !t || !e || t.sync(e.splide);
            }, 0);
        },
        openZoomMobile(t) {
            const e = t.Components.Elements.list.querySelector(".splide__slide.is-active .mobile-zoom-image"), i = e ? e.getAttribute("data-zoom") : null;
            !i || (this.zoomImage = i, this.activeZoom = !0, document.body.classList.add("no-scroll"));
        },
        handleTouchStart(t) {
            const e = t.touches[0];
            this.xDown = e.clientX, this.yDown = e.clientY, t.touches.length > 1 && this.handleZooming();
        },
        handleTouchMove(t) {
            if (!this.xDown || !this.yDown || t.touches.length > 1)
                return;
            const { transform: e } = document.querySelector(".pinch-zoom-content").style;
            if (e && e.match(/matrix.*\((.+)\)/)[1].split(", ")[0] > 1)
                return;
            const i = t.touches[0].clientX, a = t.touches[0].clientY, s = this.xDown - i, r = this.yDown - a;
            Math.abs(s) < Math.abs(r) && r < 0 && !this.isZooming && this.closeModalZoom(), this.xDown = null, this.yDown = null;
        },
        handleZooming() {
            this.isZooming = !0, this.lastEvent++;
            const { lastEvent: t } = this;
            setTimeout(() => {
                t === this.lastEvent && (this.isZooming = !1);
            }, 500);
        },
        handleZoomMobileGestures() {
            const t = document.querySelector(".modal-zoom-mobile");
            t && (t.addEventListener("touchstart", this.handleTouchStart, !1), t.addEventListener("touchmove", this.handleTouchMove, !1));
        },
        mountMainCarousel() {
            setTimeout(() => {
                this.mounted = !0, this.handleMinHeight();
            }, 0);
        },
        closeModalZoom() {
            this.activeZoom = !1, document.body.classList.remove("no-scroll");
        },
        updateIndex(t) {
            this.imageIndicator = t;
        },
        async handleCarouselChange(t) {
            await this.$nextTick();
            const { index: e } = t;
            !this.loadedImages[e] && this.productImages[e] && (this.loadedImages[e] = this.$thumborize(this.productImages[e].url, { resize: "600x600" })), this.updateIndex(e), this.setMobileMinHeight(this.$refs.mainImage.$el.offsetHeight);
        },
        handleMinHeight() {
            this.$nextTick(() => {
                this.isMobile && this.setMobileMinHeight(this.$refs.mainImage.$el.offsetHeight);
            });
        },
        setMobileMinHeight(t) {
            t && (this.carouselMinHeight = t);
        },
        loadInitialImages() {
            this.productImages.forEach((t, e) => {
                const i = e < 2 ? this.$thumborize(t.url, { resize: "600x600" }) : null;
                this.loadedImages[e] = i;
            });
        }
    }
};
var y = function () {
    var e = this, i = e._self._c;
    return i("div", [i("div", { staticClass: "main-product-image-wrapper relative flex -between" }, [i("div", { staticClass: "main-product-images-nav" }, [e.hasVideo ? i("div", { staticClass: "video-thumb" }, [i("SmoothScroll", {
        attrs: { "element-id": "holder-main-product-video", margin: 80 }, scopedSlots: e._u([{
            key: "default", fn: function ({ scroll: a }) {
                return [i("div", { on: { click: a } }, [i("i", { staticClass: "icon icon-video-play" }), i("div", { staticClass: "-text" }, [e._v(" V\xCDDEO ")])])];
            }
        }], null, !1, 1934646775)
    })], 1) : e._e(), i("Splide", { ref: "thumbnail", class: { arrows: e.hasArrows }, attrs: { options: e.carouselOption, slides: e.productImages } }, e._l(e.productImages, function (a, s) {
        return i("SplideSlide", { key: "main-photo-thumb-" + s }, [i("CustomImage", { attrs: { src: a.url, alt: `${e.validProduct.name} thumbnail`, lazyload: !1, thumbor: { resize: "75x75" }, width: "75", height: "75" } })], 1);
    }), 1)], 1), i("div", { staticClass: "main-product-image", class: { mounted: e.mounted, "-loading": !e.mounted }, style: e.mainCarouselHolderStyle }, [e.ready ? i("Splide", {
        ref: "mainImage", attrs: {
            options: {
                perPage: 1,
                gap: "16px",
                rewind: !0,
                lazyLoad: e.isMobile,
                arrows: e.productImages.length > 1,
                pagination: e.productImages.length > 1
            }, slides: e.productImages
        }, on: { "splide:click": e.openZoomMobile, "splide:lazyload:loaded": e.mountMainCarousel, "splide:move": e.handleCarouselChange, "splide:mounted": e.handleMinHeight }
    }, e._l(e.productImages, function (a, s) {
        return i("SplideSlide", { key: "main-photo-" + s }, [e.isMobile ? i("img", { staticClass: "mobile-zoom-image", attrs: { "data-splide-lazy": e.$thumborize(e.treatCustomImage(a.url), { resize: "700x700" }), "data-zoom": e.$thumborize(e.treatCustomImage(a.url), { resize: "1000x1000" }), alt: e.validProduct.name, width: "700", height: "700" } }) : i("zoom-on-hover", { attrs: { scale: 1, "alt-text": e.validProduct.name, "img-zoom": e.imageIndicator === s ? e.$thumborize(e.treatCustomImage(a.url), { resize: "1000x1000" }) : null, "img-normal": e.loadedImages[s] || [s - 1, s, s + 1].includes(e.imageIndicator) ? e.$thumborize(e.treatCustomImage(a.url), { resize: "600x600" }) : e.imgPlaceholder }, on: { loaded: e.mountMainCarousel } })], 1);
    }), 1) : e._e(), e.isMobile ? [e.isMobile ? i("div", { staticClass: "zoom-hint" }, [e._v(" Clique para zoom ")]) : e._e(), i("div", { staticClass: "total-images-indicator", domProps: { innerHTML: e._s(e.imageIndicatorText) } })] : e._e()], 2)]), e.isMobile ? i("div", { staticClass: "modal-zoom-mobile", class: { "is-active": e.activeZoom } }, [i("div", { staticClass: "-header flex -between -vcenter" }, [e._m(0), i("div", { staticClass: "-close flex -vcenter -hcenter", on: { click: e.closeModalZoom } }, [i("i", { staticClass: "icon icon-close-modal-white" })])]), i("PinchZoom", { attrs: { "auto-zoom-out": !1, overflow: "visible", "limit-pan": !0, "min-scale": 1 } }, [i("img", { attrs: { src: e.zoomImage, alt: `${e.validProduct.name} zoom` } })])], 1) : e._e()]);
}, M = [function () {
    var t = this, e = t._self._c;
    return e("div", { staticClass: "-message flex -vcenter" }, [e("i", { staticClass: "icon icon-pinch-zoom" }), t._v(" Arraste com os dedos ")]);
}], z = /* @__PURE__ */ C(
    I,
    y,
    M,
    !1,
    null,
    null,
    null,
    null
);
const A = z.exports;
function h(t) {
    h.installed || (h.installed = !0, t.component("ProductZoom", A));
}
const w = {
    install: h
};
let u = null;
typeof window < "u" ? u = window.Vue : typeof global < "u" && (u = global.Vue);
u && u.use(w);
export {
    A as default
};
