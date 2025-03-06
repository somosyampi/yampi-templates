import{commonjsGlobal as F,getDefaultExportFromCjs as G}from"./_commonjsHelpers.js";var h={exports:{}};(function(U,k){(function(y,p){p(k)})(F,function(y){function p(r,n,t){return n in r?Object.defineProperty(r,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[n]=t,r}function j(r,n){return function(t){if(Array.isArray(t))return t}(r)||function(t,o){if(!(typeof Symbol>"u"||!(Symbol.iterator in Object(t)))){var e=[],a=!0,u=!1,m=void 0;try{for(var c,l=t[Symbol.iterator]();!(a=(c=l.next()).done)&&(e.push(c.value),!o||e.length!==o);a=!0);}catch(f){u=!0,m=f}finally{try{a||l.return==null||l.return()}finally{if(u)throw m}}return e}}(r,n)||function(t,o){if(!!t){if(typeof t=="string")return A(t,o);var e=Object.prototype.toString.call(t).slice(8,-1);if(e==="Object"&&t.constructor&&(e=t.constructor.name),e==="Map"||e==="Set")return Array.from(t);if(e==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return A(t,o)}}(r,n)||function(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}()}function A(r,n){(n==null||n>r.length)&&(n=r.length);for(var t=0,o=new Array(n);t<n;t++)o[t]=r[t];return o}function O(r,n){var t,o,e,a,u=null,m=typeof n=="number"?n:(t=j(String(n).split(/(ms|s)/i),2),o=t[0],e=t[1],a=e===void 0?"ms":e,Number(o)*{ms:1,s:1e3}[a]),c=function(){for(var l=this,f=arguments.length,v=new Array(f),s=0;s<f;s++)v[s]=arguments[s];var d=function(){u=null,r.apply(l,v)};clearTimeout(u),(u=setTimeout(d,m))||r.apply(this,v)};return c.cancel=function(){clearTimeout(u),u=null},c}function x(r){return r.map(function(n){return n.toLowerCase()})}function T(r,n){var t=(r.getNamedItem("debounce-events")||{}).value,o=t!==void 0&&t;return x(o?o.split(","):function(e){return Array.isArray(e)?e:e==null?[]:[e]}(n))}function w(r){return r===""}function I(r,n){return w(r)&&n.cancelonempty}function _(r,n){return r==="Enter"&&(!n.lock||n.unlock)}function C(r,n){return w(r)&&n.fireonempty}function D(r){var n=j(r.split("."),1)[0];return Number(n)>=3?"mounted":"bind"}var N={install:function(r){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},t=n.lock,o=t!==void 0&&t,e=n.listenTo,a=e===void 0?"keyup":e,u=n.defaultTime,m=u===void 0?"300ms":u,c=n.fireOnEmpty,l=c!==void 0&&c,f=n.cancelOnEmpty,v=f!==void 0&&f;r.directive("debounce",p({},D(r.version),function(s,d){var E=d.value,S=d.arg,L=S===void 0?m:S,M=d.modifiers,b=Object.assign({fireonempty:l,cancelonempty:v,lock:o},M),P=T(s.attributes,a),g=O(function(i){E(i.target.value,i)},L);function $(i){I(i.target.value,b)?g.cancel():_(i.key,b)||C(i.target.value,b)?(g.cancel(),E(i.target.value,i)):g(i)}P.forEach(function(i){s.addEventListener(i,$)})}))}};y.debounce=O,y.default=N,Object.defineProperty(y,"__esModule",{value:!0})})})(h,h.exports);const z=G(h.exports);export{z as default};
