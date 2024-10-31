import l from "https://images-dev.yampi.me/rocket-sandbox/b/01-dev/latest/dist/vendor/mixins/mobile.js";
function r(n, e, t, m, h, _, w, v) {
  var a = typeof n == "function" ? n.options : n;
  return e && (a.render = e, a.staticRenderFns = t, a._compiled = !0), {
    exports: n,
    options: a
  };
}
const s = {
  name: "Whatsapp",
  mixins: [
    l
  ],
  props: {
    number: {
      type: String,
      required: !0
    },
    url: {
      type: String,
      required: !0
    }
  },
  methods: {
    handleClick(n) {
      this.isMobile && (n.preventDefault(), window.location.replace("https://api.whatsapp.com/send?phone=55" + this.number));
    }
  },
  mounted() {
    this.$refs.whatsappLink.parentNode.classList.add("done");
  }
};
var c = function() {
  var e = this, t = e._self._c;
  return t("a", { ref: "whatsappLink", attrs: { href: e.url, target: "_blank", rel: "noreferrer nofollow" }, on: { click: e.handleClick } }, [t("svg", { staticClass: "-whatsapp", attrs: { width: "19", height: "19", fill: "none", viewBox: "0 0 19 19" } }, [t("defs"), t("path", { attrs: { d: "M14.06 10.916c-.038-.017-1.423-.7-1.67-.788a.955.955 0 00-.322-.071c-.187 0-.344.093-.467.276-.137.205-.556.695-.686.841-.017.02-.04.043-.053.043-.013 0-.227-.089-.292-.117-1.487-.644-2.614-2.197-2.769-2.458-.022-.038-.022-.056-.022-.056a.447.447 0 01.08-.095c.075-.075.157-.173.236-.268l.112-.133c.115-.134.167-.237.226-.358l.03-.061a.646.646 0 00-.019-.608c-.032-.066-.617-1.478-.68-1.626-.15-.358-.346-.524-.62-.524l-.108.004c-.13.006-.838.1-1.151.296-.332.21-.894.877-.894 2.05 0 1.058.67 2.055.957 2.435l.04.056c1.103 1.611 2.477 2.805 3.87 3.36 1.341.536 1.977.598 2.338.598.152 0 .274-.011.38-.022l.068-.007c.464-.041 1.482-.569 1.713-1.213.184-.506.232-1.06.11-1.261-.083-.137-.226-.206-.407-.293z" } }), t("path", { attrs: { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M.338 9.26C.338 4.156 4.525 0 9.668 0 14.815 0 19 4.154 19 9.262c0 5.106-4.185 9.26-9.331 9.26a9.396 9.396 0 01-4.418-1.101L.322 18.988a.246.246 0 01-.308-.315l1.604-4.73a9.189 9.189 0 01-1.28-4.682zm5.264 6.12a7.388 7.388 0 004.066 1.212c4.075 0 7.392-3.289 7.392-7.331 0-4.043-3.316-7.331-7.391-7.331-4.076 0-7.392 3.288-7.392 7.33a7.23 7.23 0 001.408 4.299c.047.065.06.149.034.225l-.797 2.352 2.47-.786a.246.246 0 01.21.03z" } })]), t("span", [e._v(e._s(e._f("mask")(e.number, "## #########")))])]);
}, d = [], p = /* @__PURE__ */ r(
  s,
  c,
  d
);
const f = p.exports;
function o(n) {
  o.installed || (o.installed = !0, n.component("Whatsapp", f));
}
const u = {
  install: o
};
let i = null;
typeof window < "u" ? i = window.Vue : typeof global < "u" && (i = global.Vue);
i && i.use(u);
export {
  f as default
};
