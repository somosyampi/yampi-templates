(function(){"use strict";try{if(typeof document<"u"){var r=document.createElement("style");r.appendChild(document.createTextNode(".search-container[data-v-9cd562a5]{position:relative;width:100%}.search-bar input[data-v-9cd562a5]{border:1px solid var(--black-lightest);transition:border-color .2s}.search-bar input.input-focused[data-v-9cd562a5]{border-radius:var(--theme-border-radius);border:2px solid var(--black-dark-color-contrast);outline:none}.search-bar input.suggestions-border-active[data-v-9cd562a5]{border-radius:var(--theme-border-radius) var(--theme-border-radius) 0 0;border:2px solid var(--black-dark-color-contrast);border-bottom:1px solid #E5E5E5}.search-bar input[data-v-9cd562a5]:hover{border-color:#b5b5b5}.suggestions-box[data-v-9cd562a5]{position:absolute;top:100%;left:0;right:0;background:var(--white);border-radius:0 0 var(--theme-border-radius) var(--theme-border-radius);margin-top:-1px;max-height:none;border:2px solid var(--black-dark-color-contrast);padding:3px;border-top:1.5px solid #E5E5E5}.suggestions-box ul[data-v-9cd562a5]{list-style:none;padding:0;margin:0}.suggestions-box li[data-v-9cd562a5]{padding:10px 16px;cursor:pointer;display:flex;align-items:center;font-size:14px;background:white;color:rgb(var(--black-dark-rgb));transition:background .15s,color .15s;border-radius:var(--theme-border-radius)}.suggestions-box li.active[data-v-9cd562a5],.suggestions-box li[data-v-9cd562a5]:hover{background-color:var(--white-smoke);color:#666}.suggestions-box li b[data-v-9cd562a5]{font-weight:var(--font-black);color:inherit}")),document.head.appendChild(r)}}catch(a){console.error("vite-plugin-css-injected-by-js",a)}})();
import { mapGetters as p } from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/vuex.js";
import { debounce as S } from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/mixins/helpers.js";
import f from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/modules/axios/search.js";
import y from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/mixins/tracking/api.js";
import b from "https://codigo-aberto-sandbox-assets.yampi.io/yampi-templates-sandbox/rocket-assets/dist/vendor/mixins/cache.js";
function v(s, e, n, t, o, u, l, m) {
  var r = typeof s == "function" ? s.options : s;
  e && (r.render = e, r.staticRenderFns = n, r._compiled = !0), t && (r.functional = !0), u && (r._scopeId = "data-v-" + u);
  var a;
  if (l ? (a = function(i) {
    i = i || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !i && typeof __VUE_SSR_CONTEXT__ < "u" && (i = __VUE_SSR_CONTEXT__), o && o.call(this, i), i && i._registeredComponents && i._registeredComponents.add(l);
  }, r._ssrRegister = a) : o && (a = m ? function() {
    o.call(
      this,
      (r.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : o), a)
    if (r.functional) {
      r._injectStyles = a;
      var _ = r.render;
      r.render = function(w, g) {
        return a.call(g), _(w, g);
      };
    } else {
      var d = r.beforeCreate;
      r.beforeCreate = d ? [].concat(d, a) : [a];
    }
  return {
    exports: s,
    options: r
  };
}
const C = {
  name: "SearchBar",
  mixins: [y, b],
  data: () => {
    var s;
    return {
      productName: "",
      suggestions: [],
      topSuggestions: [],
      showSuggestions: !1,
      currentIndex: -1,
      debounceTimer: null,
      isInputFocused: !1,
      debouncedGetSuggestions: () => {
      },
      minScore: (s = localStorage.getItem("ROCKET_SEARCH_MIN_SCORE")) != null ? s : window.Yampi.search_min_score
    };
  },
  computed: {
    ...p("header", [
      "showSearchBar"
    ]),
    ...p("merchant", [
      "merchant"
    ])
  },
  mounted() {
    this.parseQueryString(), this.debouncedGetSuggestions = S(this.getSuggestions, 300);
    const s = this.merchant.id;
    f.get("/v1/search/public/products/suggestions", {
      params: {
        min_score: this.minScore,
        store_id: s
      }
    }).then((e) => {
      var n, t;
      this.topSuggestions = Array.isArray((n = e.data) == null ? void 0 : n.data) ? (t = e.data) == null ? void 0 : t.data.slice(0, 9) : [];
    }).catch((e) => {
      console.log("Erro ao buscar sugest\xF5es:", e), this.topSuggestions = [];
    });
  },
  methods: {
    search(s = null) {
      !this.productName.length || (this.handleTrackApi("store-search-clicked", { location: s }), this.setLocalStorageCache({
        itemId: this.productName,
        data: { q: this.productName },
        itemAlias: "search_query"
      }), this.$redirectTo(this.$applyQueriesToUrl(
        `${this.$baseUrl}/busca`,
        { q: this.productName }
      )));
    },
    parseQueryString() {
      this.productName = new URLSearchParams(window.location.search).get("q") || "";
    },
    onInput() {
      this.currentIndex = -1, this.productName.length > 1 ? this.debouncedGetSuggestions() : (this.suggestions = [], this.showSuggestions = !1);
    },
    async getSuggestions() {
      var e;
      if (!this.productName)
        return;
      const s = this.merchant.id;
      try {
        const t = ((e = (await f.get("/v1/search/public/products/suggestions", {
          params: {
            q: this.productName,
            min_score: this.minScore,
            store_id: s
          }
        })).data) == null ? void 0 : e.data) || [];
        Array.isArray(t) && t.length > 0 ? (this.suggestions = t.slice(0, 9), this.showSuggestions = !0) : (this.suggestions = [], this.showSuggestions = !1);
      } catch (n) {
        console.error("Erro ao buscar sugest\xF5es:", n), this.suggestions = [], this.showSuggestions = !1;
      }
    },
    onArrowDown() {
      this.suggestions.length !== 0 && (this.currentIndex < this.suggestions.length - 1 ? this.currentIndex++ : this.currentIndex = 0);
    },
    onArrowUp() {
      this.suggestions.length !== 0 && (this.currentIndex > 0 ? this.currentIndex-- : this.currentIndex = this.suggestions.length - 1);
    },
    onEnter() {
      this.currentIndex >= 0 && this.currentIndex < this.suggestions.length ? this.selectSuggestion(this.suggestions[this.currentIndex]) : this.search("search_icon");
    },
    selectSuggestion(s) {
      this.productName = s, this.showSuggestions = !1, this.search("dropdown");
    },
    onBlur() {
      setTimeout(() => {
        this.showSuggestions = !1, this.isInputFocused = !1;
      }, 200);
    },
    onFocus() {
      if (this.isInputFocused = !0, this.productName.length <= 1 && this.topSuggestions.length > 0) {
        this.suggestions = this.topSuggestions, this.showSuggestions = !0;
        return;
      }
      this.productName.length > 1 && this.suggestions.length > 0 && (this.showSuggestions = !0);
    },
    highlightMatch(s) {
      if (!this.productName)
        return s;
      const e = this.productName;
      if (!s.toLowerCase().startsWith(e.toLowerCase()))
        return s.replace(
          new RegExp(`(${e.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")})`, "i"),
          "<span>$1</span>"
        );
      const n = s.substr(0, e.length), t = s.substr(e.length);
      return `${n}<b>${t}</b>`;
    }
  }
};
var I = function() {
  var e = this, n = e._self._c;
  return n("Transition", { attrs: { name: "fadeHeight" } }, [e.showSearchBar ? n("div", { staticClass: "search-container" }, [n("form", { staticClass: "search-bar", attrs: { id: "product-search", role: "search", action: "/busca" }, on: { submit: function(t) {
    return t.preventDefault(), e.search.apply(null, arguments);
  } } }, [n("label", { staticClass: "-hide", attrs: { for: "product-name" } }, [e._v("Busca")]), n("input", { directives: [{ name: "model", rawName: "v-model", value: e.productName, expression: "productName" }], class: {
    "input-focused": e.isInputFocused,
    "suggestions-border-active": e.showSuggestions && e.suggestions.length > 0
  }, attrs: { id: "product-name", type: "text", name: "product-name", placeholder: "Buscar produto", autocomplete: "off" }, domProps: { value: e.productName }, on: { input: [function(t) {
    t.target.composing || (e.productName = t.target.value);
  }, e.onInput], keydown: [function(t) {
    return !t.type.indexOf("key") && e._k(t.keyCode, "down", 40, t.key, ["Down", "ArrowDown"]) ? null : (t.preventDefault(), e.onArrowDown.apply(null, arguments));
  }, function(t) {
    return !t.type.indexOf("key") && e._k(t.keyCode, "up", 38, t.key, ["Up", "ArrowUp"]) ? null : (t.preventDefault(), e.onArrowUp.apply(null, arguments));
  }, function(t) {
    return !t.type.indexOf("key") && e._k(t.keyCode, "enter", 13, t.key, "Enter") ? null : (t.preventDefault(), e.onEnter.apply(null, arguments));
  }], blur: e.onBlur, focus: e.onFocus, mousedown: function(t) {
    e.isInputFocused = !0;
  }, click: function(t) {
    return e.handleTrackApi("store-search-intended");
  } } }), n("span", { staticClass: "search-btn", on: { click: function(t) {
    return e.search("search_icon");
  } } }, [n("i", { staticClass: "icon icon-search" })])]), e.showSuggestions && e.suggestions.length > 0 ? n("div", { staticClass: "suggestions-box" }, [n("ul", e._l(e.suggestions, function(t, o) {
    return n("li", { key: o, class: { active: e.currentIndex === o }, on: { mousedown: function(u) {
      return u.preventDefault(), e.selectSuggestion(t);
    }, mouseover: function(u) {
      e.currentIndex = o;
    } } }, [n("span", { staticClass: "ellipsis", domProps: { innerHTML: e._s(e.highlightMatch(t)) } })]);
  }), 0)]) : e._e()]) : e._e()]);
}, k = [], N = /* @__PURE__ */ v(
  C,
  I,
  k,
  !1,
  null,
  "9cd562a5",
  null,
  null
);
const A = N.exports;
function h(s) {
  h.installed || (h.installed = !0, s.component("SearchBar", A));
}
const x = {
  install: h
};
let c = null;
typeof window < "u" ? c = window.Vue : typeof global < "u" && (c = global.Vue);
c && c.use(x);
export {
  A as default
};
