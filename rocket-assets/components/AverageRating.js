import { mapGetters as w } from "../vendor/vuex.js";
import { uuidv4 as T, smoothScroll as u } from "../vendor/mixins/helpers.js";
import j from "../components/icons/FilledStar.js";
var c = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function S(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
function $(t, e) {
  for (var r = -1, n = Array(t); ++r < t; )
    n[r] = e(r);
  return n;
}
var O = $;
function I(t) {
  return t;
}
var R = I, A = R;
function G(t) {
  return typeof t == "function" ? t : A;
}
var P = G, F = /\s/;
function N(t) {
  for (var e = t.length; e-- && F.test(t.charAt(e)); )
    ;
  return e;
}
var E = N, B = E, C = /^\s+/;
function M(t) {
  return t && t.slice(0, B(t) + 1).replace(C, "");
}
var V = M;
function k(t) {
  var e = typeof t;
  return t != null && (e == "object" || e == "function");
}
var x = k, L = typeof c == "object" && c && c.Object === Object && c, W = L, z = W, X = typeof self == "object" && self && self.Object === Object && self, Y = z || X || Function("return this")(), D = Y, H = D, q = H.Symbol, h = q, m = h, _ = Object.prototype, U = _.hasOwnProperty, J = _.toString, a = m ? m.toStringTag : void 0;
function K(t) {
  var e = U.call(t, a), r = t[a];
  try {
    t[a] = void 0;
    var n = !0;
  } catch {
  }
  var i = J.call(t);
  return n && (e ? t[a] = r : delete t[a]), i;
}
var Q = K, Z = Object.prototype, tt = Z.toString;
function et(t) {
  return tt.call(t);
}
var rt = et, p = h, nt = Q, it = rt, ot = "[object Null]", at = "[object Undefined]", g = p ? p.toStringTag : void 0;
function st(t) {
  return t == null ? t === void 0 ? at : ot : g && g in Object(t) ? nt(t) : it(t);
}
var ct = st;
function dt(t) {
  return t != null && typeof t == "object";
}
var ft = dt, lt = ct, ut = ft, mt = "[object Symbol]";
function pt(t) {
  return typeof t == "symbol" || ut(t) && lt(t) == mt;
}
var gt = pt, bt = V, b = x, vt = gt, v = NaN, yt = /^[-+]0x[0-9a-f]+$/i, ht = /^0b[01]+$/i, _t = /^0o[0-7]+$/i, wt = parseInt;
function Tt(t) {
  if (typeof t == "number")
    return t;
  if (vt(t))
    return v;
  if (b(t)) {
    var e = typeof t.valueOf == "function" ? t.valueOf() : t;
    t = b(e) ? e + "" : e;
  }
  if (typeof t != "string")
    return t === 0 ? t : +t;
  t = bt(t);
  var r = ht.test(t);
  return r || _t.test(t) ? wt(t.slice(2), r ? 2 : 8) : yt.test(t) ? v : +t;
}
var jt = Tt, St = jt, y = 1 / 0, $t = 17976931348623157e292;
function Ot(t) {
  if (!t)
    return t === 0 ? t : 0;
  if (t = St(t), t === y || t === -y) {
    var e = t < 0 ? -1 : 1;
    return e * $t;
  }
  return t === t ? t : 0;
}
var It = Ot, Rt = It;
function At(t) {
  var e = Rt(t), r = e % 1;
  return e === e ? r ? e - r : e : 0;
}
var Gt = At, Pt = O, Ft = P, Nt = Gt, Et = 9007199254740991, f = 4294967295, Bt = Math.min;
function Ct(t, e) {
  if (t = Nt(t), t < 1 || t > Et)
    return [];
  var r = f, n = Bt(t, f);
  e = Ft(e), t -= f;
  for (var i = Pt(n, e); ++r < t; )
    e(r);
  return i;
}
var Mt = Ct;
const Vt = /* @__PURE__ */ S(Mt);
function kt(t, e, r, n, i, o, Dt, Ht) {
  var s = typeof t == "function" ? t.options : t;
  return e && (s.render = e, s.staticRenderFns = r, s._compiled = !0), {
    exports: t,
    options: s
  };
}
const xt = {
  name: "AverageRating",
  components: {
    FilledStar: j
  },
  props: {
    isGrid: {
      type: Boolean,
      default: !1
    },
    product: {
      type: Object,
      required: !0
    }
  },
  data() {
    return {
      elementPosition: 0
    };
  },
  computed: {
    ...w("images", ["lazyloadImages"]),
    ratingValue() {
      var t;
      return ((t = this.product.data) == null ? void 0 : t.rating) ?? this.product.rating;
    },
    totalReviews() {
      var t;
      return ((t = this.product.data) == null ? void 0 : t.total_approved_reviews) ?? this.product.total_approved_reviews;
    },
    gridReviewsAmount() {
      return this.totalReviews > 0 ? `(${this.totalReviews})` : "";
    },
    productReviewsAmount() {
      return `(${this.$tc("common.reviews", this.totalReviews)})`;
    },
    ratingAmountText() {
      return this.isGrid ? this.gridReviewsAmount : this.productReviewsAmount;
    }
  },
  mounted() {
    this.isGrid || window.addEventListener("scroll", () => {
      const t = document.getElementsByClassName("product-reviews")[0];
      this.elementPosition !== t.offsetTop && (this.elementPosition = t.offsetTop);
    });
  },
  methods: {
    uuidv4: T,
    _times: Vt,
    async handleScroll() {
      if (this.isGrid) return;
      const t = document.getElementsByClassName("product-reviews")[0], e = document.getElementsByClassName("product-specifications")[0];
      if (this.elementPosition = t.offsetTop, !!t) {
        if (this.elementPosition > e.offsetTop) {
          const r = this.lazyloadImages.reduce((i, o) => o.y > 700 && window.innerWidth > 700 ? i + 700 : window.innerWidth < 700 && o.y > window.innerWidth ? window.innerWidth * 0.75 + i : o.y * 0.9 + i, 0), n = r ? this.elementPosition + r : this.elementPosition;
          await u(document.body, 0, n);
          return;
        }
        await u(document.body, 0, this.elementPosition);
      }
    },
    getStarPercentage(t) {
      if (t + 1 <= this.ratingValue)
        return "100%";
      const e = (this.ratingValue % 1).toFixed(1) * 100;
      let r = "0%";
      return e > 0 && e <= 40 && (r = "30%"), e > 40 && e <= 60 && (r = "50%"), e > 60 && e <= 75 && (r = "55%"), e > 75 && (r = "65%"), t > this.ratingValue ? "0%" : r;
    }
  }
};
var Lt = function() {
  var e = this, r = e._self._c;
  return r("div", { staticClass: "average-rating-container", class: { "is-grid": e.isGrid }, on: { click: e.handleScroll } }, [e._l(e._times(5), function(n) {
    return r("FilledStar", { key: n + e.uuidv4(), attrs: { width: "14", height: "15", "fill-id": n + e.uuidv4(), "filled-percentage": e.getStarPercentage(n) } });
  }), r("div", { staticClass: "average-rating-amount" }, [e._v(" " + e._s(e.ratingAmountText) + " ")])], 2);
}, Wt = [], zt = /* @__PURE__ */ kt(
  xt,
  Lt,
  Wt
);
const Xt = zt.exports;
function l(t) {
  l.installed || (l.installed = !0, t.component("AverageRating", Xt));
}
const Yt = {
  install: l
};
let d = null;
typeof window < "u" ? d = window.Vue : typeof global < "u" && (d = global.Vue);
d && d.use(Yt);
export {
  Xt as default
};