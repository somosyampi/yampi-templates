import{a as mr}from"./_commonjsHelpers.js";var gr=function(){if(typeof Symbol!="function"||typeof Object.getOwnPropertySymbols!="function")return!1;if(typeof Symbol.iterator=="symbol")return!0;var e={},t=Symbol("test"),n=Object(t);if(typeof t=="string"||Object.prototype.toString.call(t)!=="[object Symbol]"||Object.prototype.toString.call(n)!=="[object Symbol]")return!1;var o=42;e[t]=o;for(t in e)return!1;if(typeof Object.keys=="function"&&Object.keys(e).length!==0||typeof Object.getOwnPropertyNames=="function"&&Object.getOwnPropertyNames(e).length!==0)return!1;var a=Object.getOwnPropertySymbols(e);if(a.length!==1||a[0]!==t||!Object.prototype.propertyIsEnumerable.call(e,t))return!1;if(typeof Object.getOwnPropertyDescriptor=="function"){var f=Object.getOwnPropertyDescriptor(e,t);if(f.value!==o||f.enumerable!==!0)return!1}return!0},We=typeof Symbol<"u"&&Symbol,hr=gr,Sr=function(){return typeof We!="function"||typeof Symbol!="function"||typeof We("foo")!="symbol"||typeof Symbol("bar")!="symbol"?!1:hr()},br="Function.prototype.bind called on incompatible ",se=Array.prototype.slice,Or=Object.prototype.toString,Ar="[object Function]",wr=function(e){var t=this;if(typeof t!="function"||Or.call(t)!==Ar)throw new TypeError(br+t);for(var n=se.call(arguments,1),o,a=function(){if(this instanceof o){var c=t.apply(this,n.concat(se.call(arguments)));return Object(c)===c?c:this}else return t.apply(e,n.concat(se.call(arguments)))},f=Math.max(0,t.length-n.length),i=[],l=0;l<f;l++)i.push("$"+l);if(o=Function("binder","return function ("+i.join(",")+"){ return binder.apply(this,arguments); }")(a),t.prototype){var u=function(){};u.prototype=t.prototype,o.prototype=new u,u.prototype=null}return o},Pr=wr,Re=Function.prototype.bind||Pr,Er=Re,xr=Er.call(Function.call,Object.prototype.hasOwnProperty),y,Q=SyntaxError,er=Function,z=TypeError,ve=function(r){try{return er('"use strict"; return ('+r+").constructor;")()}catch{}},fe=Object.getOwnPropertyDescriptor,de=function(){throw new z},$r=fe?function(){try{return arguments.callee,de}catch{try{return fe(arguments,"callee").get}catch{return de}}}():de,G=Sr(),N=Object.getPrototypeOf||function(r){return r.__proto__},k={},Fr=typeof Uint8Array>"u"?y:N(Uint8Array),H={"%AggregateError%":typeof AggregateError>"u"?y:AggregateError,"%Array%":Array,"%ArrayBuffer%":typeof ArrayBuffer>"u"?y:ArrayBuffer,"%ArrayIteratorPrototype%":G?N([][Symbol.iterator]()):y,"%AsyncFromSyncIteratorPrototype%":y,"%AsyncFunction%":k,"%AsyncGenerator%":k,"%AsyncGeneratorFunction%":k,"%AsyncIteratorPrototype%":k,"%Atomics%":typeof Atomics>"u"?y:Atomics,"%BigInt%":typeof BigInt>"u"?y:BigInt,"%Boolean%":Boolean,"%DataView%":typeof DataView>"u"?y:DataView,"%Date%":Date,"%decodeURI%":decodeURI,"%decodeURIComponent%":decodeURIComponent,"%encodeURI%":encodeURI,"%encodeURIComponent%":encodeURIComponent,"%Error%":Error,"%eval%":eval,"%EvalError%":EvalError,"%Float32Array%":typeof Float32Array>"u"?y:Float32Array,"%Float64Array%":typeof Float64Array>"u"?y:Float64Array,"%FinalizationRegistry%":typeof FinalizationRegistry>"u"?y:FinalizationRegistry,"%Function%":er,"%GeneratorFunction%":k,"%Int8Array%":typeof Int8Array>"u"?y:Int8Array,"%Int16Array%":typeof Int16Array>"u"?y:Int16Array,"%Int32Array%":typeof Int32Array>"u"?y:Int32Array,"%isFinite%":isFinite,"%isNaN%":isNaN,"%IteratorPrototype%":G?N(N([][Symbol.iterator]())):y,"%JSON%":typeof JSON=="object"?JSON:y,"%Map%":typeof Map>"u"?y:Map,"%MapIteratorPrototype%":typeof Map>"u"||!G?y:N(new Map()[Symbol.iterator]()),"%Math%":Math,"%Number%":Number,"%Object%":Object,"%parseFloat%":parseFloat,"%parseInt%":parseInt,"%Promise%":typeof Promise>"u"?y:Promise,"%Proxy%":typeof Proxy>"u"?y:Proxy,"%RangeError%":RangeError,"%ReferenceError%":ReferenceError,"%Reflect%":typeof Reflect>"u"?y:Reflect,"%RegExp%":RegExp,"%Set%":typeof Set>"u"?y:Set,"%SetIteratorPrototype%":typeof Set>"u"||!G?y:N(new Set()[Symbol.iterator]()),"%SharedArrayBuffer%":typeof SharedArrayBuffer>"u"?y:SharedArrayBuffer,"%String%":String,"%StringIteratorPrototype%":G?N(""[Symbol.iterator]()):y,"%Symbol%":G?Symbol:y,"%SyntaxError%":Q,"%ThrowTypeError%":$r,"%TypedArray%":Fr,"%TypeError%":z,"%Uint8Array%":typeof Uint8Array>"u"?y:Uint8Array,"%Uint8ClampedArray%":typeof Uint8ClampedArray>"u"?y:Uint8ClampedArray,"%Uint16Array%":typeof Uint16Array>"u"?y:Uint16Array,"%Uint32Array%":typeof Uint32Array>"u"?y:Uint32Array,"%URIError%":URIError,"%WeakMap%":typeof WeakMap>"u"?y:WeakMap,"%WeakRef%":typeof WeakRef>"u"?y:WeakRef,"%WeakSet%":typeof WeakSet>"u"?y:WeakSet},Ir=function r(e){var t;if(e==="%AsyncFunction%")t=ve("async function () {}");else if(e==="%GeneratorFunction%")t=ve("function* () {}");else if(e==="%AsyncGeneratorFunction%")t=ve("async function* () {}");else if(e==="%AsyncGenerator%"){var n=r("%AsyncGeneratorFunction%");n&&(t=n.prototype)}else if(e==="%AsyncIteratorPrototype%"){var o=r("%AsyncGenerator%");o&&(t=N(o.prototype))}return H[e]=t,t},Le={"%ArrayBufferPrototype%":["ArrayBuffer","prototype"],"%ArrayPrototype%":["Array","prototype"],"%ArrayProto_entries%":["Array","prototype","entries"],"%ArrayProto_forEach%":["Array","prototype","forEach"],"%ArrayProto_keys%":["Array","prototype","keys"],"%ArrayProto_values%":["Array","prototype","values"],"%AsyncFunctionPrototype%":["AsyncFunction","prototype"],"%AsyncGenerator%":["AsyncGeneratorFunction","prototype"],"%AsyncGeneratorPrototype%":["AsyncGeneratorFunction","prototype","prototype"],"%BooleanPrototype%":["Boolean","prototype"],"%DataViewPrototype%":["DataView","prototype"],"%DatePrototype%":["Date","prototype"],"%ErrorPrototype%":["Error","prototype"],"%EvalErrorPrototype%":["EvalError","prototype"],"%Float32ArrayPrototype%":["Float32Array","prototype"],"%Float64ArrayPrototype%":["Float64Array","prototype"],"%FunctionPrototype%":["Function","prototype"],"%Generator%":["GeneratorFunction","prototype"],"%GeneratorPrototype%":["GeneratorFunction","prototype","prototype"],"%Int8ArrayPrototype%":["Int8Array","prototype"],"%Int16ArrayPrototype%":["Int16Array","prototype"],"%Int32ArrayPrototype%":["Int32Array","prototype"],"%JSONParse%":["JSON","parse"],"%JSONStringify%":["JSON","stringify"],"%MapPrototype%":["Map","prototype"],"%NumberPrototype%":["Number","prototype"],"%ObjectPrototype%":["Object","prototype"],"%ObjProto_toString%":["Object","prototype","toString"],"%ObjProto_valueOf%":["Object","prototype","valueOf"],"%PromisePrototype%":["Promise","prototype"],"%PromiseProto_then%":["Promise","prototype","then"],"%Promise_all%":["Promise","all"],"%Promise_reject%":["Promise","reject"],"%Promise_resolve%":["Promise","resolve"],"%RangeErrorPrototype%":["RangeError","prototype"],"%ReferenceErrorPrototype%":["ReferenceError","prototype"],"%RegExpPrototype%":["RegExp","prototype"],"%SetPrototype%":["Set","prototype"],"%SharedArrayBufferPrototype%":["SharedArrayBuffer","prototype"],"%StringPrototype%":["String","prototype"],"%SymbolPrototype%":["Symbol","prototype"],"%SyntaxErrorPrototype%":["SyntaxError","prototype"],"%TypedArrayPrototype%":["TypedArray","prototype"],"%TypeErrorPrototype%":["TypeError","prototype"],"%Uint8ArrayPrototype%":["Uint8Array","prototype"],"%Uint8ClampedArrayPrototype%":["Uint8ClampedArray","prototype"],"%Uint16ArrayPrototype%":["Uint16Array","prototype"],"%Uint32ArrayPrototype%":["Uint32Array","prototype"],"%URIErrorPrototype%":["URIError","prototype"],"%WeakMapPrototype%":["WeakMap","prototype"],"%WeakSetPrototype%":["WeakSet","prototype"]},ne=Re,le=xr,Rr=ne.call(Function.call,Array.prototype.concat),Nr=ne.call(Function.apply,Array.prototype.splice),Ge=ne.call(Function.call,String.prototype.replace),ue=ne.call(Function.call,String.prototype.slice),Mr=ne.call(Function.call,RegExp.prototype.exec),Tr=/[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g,Dr=/\\(\\)?/g,Br=function(e){var t=ue(e,0,1),n=ue(e,-1);if(t==="%"&&n!=="%")throw new Q("invalid intrinsic syntax, expected closing `%`");if(n==="%"&&t!=="%")throw new Q("invalid intrinsic syntax, expected opening `%`");var o=[];return Ge(e,Tr,function(a,f,i,l){o[o.length]=i?Ge(l,Dr,"$1"):f||a}),o},Cr=function(e,t){var n=e,o;if(le(Le,n)&&(o=Le[n],n="%"+o[0]+"%"),le(H,n)){var a=H[n];if(a===k&&(a=Ir(n)),typeof a>"u"&&!t)throw new z("intrinsic "+e+" exists, but is not available. Please file an issue!");return{alias:o,name:n,value:a}}throw new Q("intrinsic "+e+" does not exist!")},Ne=function(e,t){if(typeof e!="string"||e.length===0)throw new z("intrinsic name must be a non-empty string");if(arguments.length>1&&typeof t!="boolean")throw new z('"allowMissing" argument must be a boolean');if(Mr(/^%?[^%]*%?$/,e)===null)throw new Q("`%` may not be present anywhere but at the beginning and end of the intrinsic name");var n=Br(e),o=n.length>0?n[0]:"",a=Cr("%"+o+"%",t),f=a.name,i=a.value,l=!1,u=a.alias;u&&(o=u[0],Nr(n,Rr([0,1],u)));for(var c=1,v=!0;c<n.length;c+=1){var p=n[c],m=ue(p,0,1),d=ue(p,-1);if((m==='"'||m==="'"||m==="`"||d==='"'||d==="'"||d==="`")&&m!==d)throw new Q("property names with quotes must have matching quotes");if((p==="constructor"||!v)&&(l=!0),o+="."+p,f="%"+o+"%",le(H,f))i=H[f];else if(i!=null){if(!(p in i)){if(!t)throw new z("base intrinsic for "+e+" exists, but the property is not available.");return}if(fe&&c+1>=n.length){var b=fe(i,p);v=!!b,v&&"get"in b&&!("originalValue"in b.get)?i=b.get:i=i[p]}else v=le(i,p),i=i[p];v&&!l&&(H[f]=i)}}return i},rr={exports:{}};(function(r){var e=Re,t=Ne,n=t("%Function.prototype.apply%"),o=t("%Function.prototype.call%"),a=t("%Reflect.apply%",!0)||e.call(o,n),f=t("%Object.getOwnPropertyDescriptor%",!0),i=t("%Object.defineProperty%",!0),l=t("%Math.max%");if(i)try{i({},"a",{value:1})}catch{i=null}r.exports=function(v){var p=a(e,o,arguments);if(f&&i){var m=f(p,"length");m.configurable&&i(p,"length",{value:1+l(0,v.length-(arguments.length-1))})}return p};var u=function(){return a(e,n,arguments)};i?i(r.exports,"apply",{value:u}):r.exports.apply=u})(rr);var tr=Ne,nr=rr.exports,_r=nr(tr("String.prototype.indexOf")),Ur=function(e,t){var n=tr(e,!!t);return typeof n=="function"&&_r(e,".prototype.")>-1?nr(n):n};const Wr={},Lr=Object.freeze(Object.defineProperty({__proto__:null,default:Wr},Symbol.toStringTag,{value:"Module"})),Gr=mr(Lr);var Me=typeof Map=="function"&&Map.prototype,me=Object.getOwnPropertyDescriptor&&Me?Object.getOwnPropertyDescriptor(Map.prototype,"size"):null,ce=Me&&me&&typeof me.get=="function"?me.get:null,kr=Me&&Map.prototype.forEach,Te=typeof Set=="function"&&Set.prototype,ge=Object.getOwnPropertyDescriptor&&Te?Object.getOwnPropertyDescriptor(Set.prototype,"size"):null,pe=Te&&ge&&typeof ge.get=="function"?ge.get:null,zr=Te&&Set.prototype.forEach,Hr=typeof WeakMap=="function"&&WeakMap.prototype,ee=Hr?WeakMap.prototype.has:null,Qr=typeof WeakSet=="function"&&WeakSet.prototype,re=Qr?WeakSet.prototype.has:null,Vr=typeof WeakRef=="function"&&WeakRef.prototype,ke=Vr?WeakRef.prototype.deref:null,qr=Boolean.prototype.valueOf,Jr=Object.prototype.toString,Kr=Function.prototype.toString,jr=String.prototype.match,De=String.prototype.slice,T=String.prototype.replace,Yr=String.prototype.toUpperCase,ze=String.prototype.toLowerCase,ar=RegExp.prototype.test,He=Array.prototype.concat,w=Array.prototype.join,Xr=Array.prototype.slice,Qe=Math.floor,we=typeof BigInt=="function"?BigInt.prototype.valueOf:null,he=Object.getOwnPropertySymbols,Pe=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?Symbol.prototype.toString:null,V=typeof Symbol=="function"&&typeof Symbol.iterator=="object",S=typeof Symbol=="function"&&Symbol.toStringTag&&(typeof Symbol.toStringTag===V?"object":"symbol")?Symbol.toStringTag:null,or=Object.prototype.propertyIsEnumerable,Ve=(typeof Reflect=="function"?Reflect.getPrototypeOf:Object.getPrototypeOf)||([].__proto__===Array.prototype?function(r){return r.__proto__}:null);function qe(r,e){if(r===1/0||r===-1/0||r!==r||r&&r>-1e3&&r<1e3||ar.call(/e/,e))return e;var t=/[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;if(typeof r=="number"){var n=r<0?-Qe(-r):Qe(r);if(n!==r){var o=String(n),a=De.call(e,o.length+1);return T.call(o,t,"$&_")+"."+T.call(T.call(a,/([0-9]{3})/g,"$&_"),/_$/,"")}}return T.call(e,t,"$&_")}var Ee=Gr,Je=Ee.custom,Ke=fr(Je)?Je:null,Zr=function r(e,t,n,o){var a=t||{};if(M(a,"quoteStyle")&&a.quoteStyle!=="single"&&a.quoteStyle!=="double")throw new TypeError('option "quoteStyle" must be "single" or "double"');if(M(a,"maxStringLength")&&(typeof a.maxStringLength=="number"?a.maxStringLength<0&&a.maxStringLength!==1/0:a.maxStringLength!==null))throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');var f=M(a,"customInspect")?a.customInspect:!0;if(typeof f!="boolean"&&f!=="symbol")throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");if(M(a,"indent")&&a.indent!==null&&a.indent!=="	"&&!(parseInt(a.indent,10)===a.indent&&a.indent>0))throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');if(M(a,"numericSeparator")&&typeof a.numericSeparator!="boolean")throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');var i=a.numericSeparator;if(typeof e>"u")return"undefined";if(e===null)return"null";if(typeof e=="boolean")return e?"true":"false";if(typeof e=="string")return ur(e,a);if(typeof e=="number"){if(e===0)return 1/0/e>0?"0":"-0";var l=String(e);return i?qe(e,l):l}if(typeof e=="bigint"){var u=String(e)+"n";return i?qe(e,u):u}var c=typeof a.depth>"u"?5:a.depth;if(typeof n>"u"&&(n=0),n>=c&&c>0&&typeof e=="object")return xe(e)?"[Array]":"[Object]";var v=gt(a,n);if(typeof o>"u")o=[];else if(lr(o,e)>=0)return"[Circular]";function p(O,R,x){if(R&&(o=Xr.call(o),o.push(R)),x){var X={depth:a.depth};return M(a,"quoteStyle")&&(X.quoteStyle=a.quoteStyle),r(O,X,n+1,o)}return r(O,a,n+1,o)}if(typeof e=="function"&&!je(e)){var m=lt(e),d=ae(e,p);return"[Function"+(m?": "+m:" (anonymous)")+"]"+(d.length>0?" { "+w.call(d,", ")+" }":"")}if(fr(e)){var b=V?T.call(String(e),/^(Symbol\(.*\))_[^)]*$/,"$1"):Pe.call(e);return typeof e=="object"&&!V?Z(b):b}if(vt(e)){for(var P="<"+ze.call(String(e.nodeName)),s=e.attributes||[],E=0;E<s.length;E++)P+=" "+s[E].name+"="+ir(et(s[E].value),"double",a);return P+=">",e.childNodes&&e.childNodes.length&&(P+="..."),P+="</"+ze.call(String(e.nodeName))+">",P}if(xe(e)){if(e.length===0)return"[]";var F=ae(e,p);return v&&!mt(F)?"["+$e(F,v)+"]":"[ "+w.call(F,", ")+" ]"}if(tt(e)){var U=ae(e,p);return!("cause"in Error.prototype)&&"cause"in e&&!or.call(e,"cause")?"{ ["+String(e)+"] "+w.call(He.call("[cause]: "+p(e.cause),U),", ")+" }":U.length===0?"["+String(e)+"]":"{ ["+String(e)+"] "+w.call(U,", ")+" }"}if(typeof e=="object"&&f){if(Ke&&typeof e[Ke]=="function"&&Ee)return Ee(e,{depth:c-n});if(f!=="symbol"&&typeof e.inspect=="function")return e.inspect()}if(ut(e)){var K=[];return kr.call(e,function(O,R){K.push(p(R,e,!0)+" => "+p(O,e))}),Ye("Map",ce.call(e),K,v)}if(yt(e)){var j=[];return zr.call(e,function(O){j.push(p(O,e))}),Ye("Set",pe.call(e),j,v)}if(ct(e))return Se("WeakMap");if(st(e))return Se("WeakSet");if(pt(e))return Se("WeakRef");if(at(e))return Z(p(Number(e)));if(it(e))return Z(p(we.call(e)));if(ot(e))return Z(qr.call(e));if(nt(e))return Z(p(String(e)));if(!rt(e)&&!je(e)){var B=ae(e,p),Y=Ve?Ve(e)===Object.prototype:e instanceof Object||e.constructor===Object,I=e instanceof Object?"":"null prototype",W=!Y&&S&&Object(e)===e&&S in e?De.call(D(e),8,-1):I?"Object":"",C=Y||typeof e.constructor!="function"?"":e.constructor.name?e.constructor.name+" ":"",L=C+(W||I?"["+w.call(He.call([],W||[],I||[]),": ")+"] ":"");return B.length===0?L+"{}":v?L+"{"+$e(B,v)+"}":L+"{ "+w.call(B,", ")+" }"}return String(e)};function ir(r,e,t){var n=(t.quoteStyle||e)==="double"?'"':"'";return n+r+n}function et(r){return T.call(String(r),/"/g,"&quot;")}function xe(r){return D(r)==="[object Array]"&&(!S||!(typeof r=="object"&&S in r))}function rt(r){return D(r)==="[object Date]"&&(!S||!(typeof r=="object"&&S in r))}function je(r){return D(r)==="[object RegExp]"&&(!S||!(typeof r=="object"&&S in r))}function tt(r){return D(r)==="[object Error]"&&(!S||!(typeof r=="object"&&S in r))}function nt(r){return D(r)==="[object String]"&&(!S||!(typeof r=="object"&&S in r))}function at(r){return D(r)==="[object Number]"&&(!S||!(typeof r=="object"&&S in r))}function ot(r){return D(r)==="[object Boolean]"&&(!S||!(typeof r=="object"&&S in r))}function fr(r){if(V)return r&&typeof r=="object"&&r instanceof Symbol;if(typeof r=="symbol")return!0;if(!r||typeof r!="object"||!Pe)return!1;try{return Pe.call(r),!0}catch{}return!1}function it(r){if(!r||typeof r!="object"||!we)return!1;try{return we.call(r),!0}catch{}return!1}var ft=Object.prototype.hasOwnProperty||function(r){return r in this};function M(r,e){return ft.call(r,e)}function D(r){return Jr.call(r)}function lt(r){if(r.name)return r.name;var e=jr.call(Kr.call(r),/^function\s*([\w$]+)/);return e?e[1]:null}function lr(r,e){if(r.indexOf)return r.indexOf(e);for(var t=0,n=r.length;t<n;t++)if(r[t]===e)return t;return-1}function ut(r){if(!ce||!r||typeof r!="object")return!1;try{ce.call(r);try{pe.call(r)}catch{return!0}return r instanceof Map}catch{}return!1}function ct(r){if(!ee||!r||typeof r!="object")return!1;try{ee.call(r,ee);try{re.call(r,re)}catch{return!0}return r instanceof WeakMap}catch{}return!1}function pt(r){if(!ke||!r||typeof r!="object")return!1;try{return ke.call(r),!0}catch{}return!1}function yt(r){if(!pe||!r||typeof r!="object")return!1;try{pe.call(r);try{ce.call(r)}catch{return!0}return r instanceof Set}catch{}return!1}function st(r){if(!re||!r||typeof r!="object")return!1;try{re.call(r,re);try{ee.call(r,ee)}catch{return!0}return r instanceof WeakSet}catch{}return!1}function vt(r){return!r||typeof r!="object"?!1:typeof HTMLElement<"u"&&r instanceof HTMLElement?!0:typeof r.nodeName=="string"&&typeof r.getAttribute=="function"}function ur(r,e){if(r.length>e.maxStringLength){var t=r.length-e.maxStringLength,n="... "+t+" more character"+(t>1?"s":"");return ur(De.call(r,0,e.maxStringLength),e)+n}var o=T.call(T.call(r,/(['\\])/g,"\\$1"),/[\x00-\x1f]/g,dt);return ir(o,"single",e)}function dt(r){var e=r.charCodeAt(0),t={8:"b",9:"t",10:"n",12:"f",13:"r"}[e];return t?"\\"+t:"\\x"+(e<16?"0":"")+Yr.call(e.toString(16))}function Z(r){return"Object("+r+")"}function Se(r){return r+" { ? }"}function Ye(r,e,t,n){var o=n?$e(t,n):w.call(t,", ");return r+" ("+e+") {"+o+"}"}function mt(r){for(var e=0;e<r.length;e++)if(lr(r[e],`
`)>=0)return!1;return!0}function gt(r,e){var t;if(r.indent==="	")t="	";else if(typeof r.indent=="number"&&r.indent>0)t=w.call(Array(r.indent+1)," ");else return null;return{base:t,prev:w.call(Array(e+1),t)}}function $e(r,e){if(r.length===0)return"";var t=`
`+e.prev+e.base;return t+w.call(r,","+t)+`
`+e.prev}function ae(r,e){var t=xe(r),n=[];if(t){n.length=r.length;for(var o=0;o<r.length;o++)n[o]=M(r,o)?e(r[o],r):""}var a=typeof he=="function"?he(r):[],f;if(V){f={};for(var i=0;i<a.length;i++)f["$"+a[i]]=a[i]}for(var l in r)!M(r,l)||t&&String(Number(l))===l&&l<r.length||V&&f["$"+l]instanceof Symbol||(ar.call(/[^\w$]/,l)?n.push(e(l,r)+": "+e(r[l],r)):n.push(l+": "+e(r[l],r)));if(typeof he=="function")for(var u=0;u<a.length;u++)or.call(r,a[u])&&n.push("["+e(a[u])+"]: "+e(r[a[u]],r));return n}var Be=Ne,J=Ur,ht=Zr,St=Be("%TypeError%"),oe=Be("%WeakMap%",!0),ie=Be("%Map%",!0),bt=J("WeakMap.prototype.get",!0),Ot=J("WeakMap.prototype.set",!0),At=J("WeakMap.prototype.has",!0),wt=J("Map.prototype.get",!0),Pt=J("Map.prototype.set",!0),Et=J("Map.prototype.has",!0),Ce=function(r,e){for(var t=r,n;(n=t.next)!==null;t=n)if(n.key===e)return t.next=n.next,n.next=r.next,r.next=n,n},xt=function(r,e){var t=Ce(r,e);return t&&t.value},$t=function(r,e,t){var n=Ce(r,e);n?n.value=t:r.next={key:e,next:r.next,value:t}},Ft=function(r,e){return!!Ce(r,e)},It=function(){var e,t,n,o={assert:function(a){if(!o.has(a))throw new St("Side channel does not contain "+ht(a))},get:function(a){if(oe&&a&&(typeof a=="object"||typeof a=="function")){if(e)return bt(e,a)}else if(ie){if(t)return wt(t,a)}else if(n)return xt(n,a)},has:function(a){if(oe&&a&&(typeof a=="object"||typeof a=="function")){if(e)return At(e,a)}else if(ie){if(t)return Et(t,a)}else if(n)return Ft(n,a);return!1},set:function(a,f){oe&&a&&(typeof a=="object"||typeof a=="function")?(e||(e=new oe),Ot(e,a,f)):ie?(t||(t=new ie),Pt(t,a,f)):(n||(n={key:{},next:null}),$t(n,a,f))}};return o},Rt=String.prototype.replace,Nt=/%20/g,be={RFC1738:"RFC1738",RFC3986:"RFC3986"},_e={default:be.RFC3986,formatters:{RFC1738:function(r){return Rt.call(r,Nt,"+")},RFC3986:function(r){return String(r)}},RFC1738:be.RFC1738,RFC3986:be.RFC3986},Mt=_e,Oe=Object.prototype.hasOwnProperty,_=Array.isArray,A=function(){for(var r=[],e=0;e<256;++e)r.push("%"+((e<16?"0":"")+e.toString(16)).toUpperCase());return r}(),Tt=function(e){for(;e.length>1;){var t=e.pop(),n=t.obj[t.prop];if(_(n)){for(var o=[],a=0;a<n.length;++a)typeof n[a]<"u"&&o.push(n[a]);t.obj[t.prop]=o}}},cr=function(e,t){for(var n=t&&t.plainObjects?Object.create(null):{},o=0;o<e.length;++o)typeof e[o]<"u"&&(n[o]=e[o]);return n},Dt=function r(e,t,n){if(!t)return e;if(typeof t!="object"){if(_(e))e.push(t);else if(e&&typeof e=="object")(n&&(n.plainObjects||n.allowPrototypes)||!Oe.call(Object.prototype,t))&&(e[t]=!0);else return[e,t];return e}if(!e||typeof e!="object")return[e].concat(t);var o=e;return _(e)&&!_(t)&&(o=cr(e,n)),_(e)&&_(t)?(t.forEach(function(a,f){if(Oe.call(e,f)){var i=e[f];i&&typeof i=="object"&&a&&typeof a=="object"?e[f]=r(i,a,n):e.push(a)}else e[f]=a}),e):Object.keys(t).reduce(function(a,f){var i=t[f];return Oe.call(a,f)?a[f]=r(a[f],i,n):a[f]=i,a},o)},Bt=function(e,t){return Object.keys(t).reduce(function(n,o){return n[o]=t[o],n},e)},Ct=function(r,e,t){var n=r.replace(/\+/g," ");if(t==="iso-8859-1")return n.replace(/%[0-9a-f]{2}/gi,unescape);try{return decodeURIComponent(n)}catch{return n}},_t=function(e,t,n,o,a){if(e.length===0)return e;var f=e;if(typeof e=="symbol"?f=Symbol.prototype.toString.call(e):typeof e!="string"&&(f=String(e)),n==="iso-8859-1")return escape(f).replace(/%u[0-9a-f]{4}/gi,function(c){return"%26%23"+parseInt(c.slice(2),16)+"%3B"});for(var i="",l=0;l<f.length;++l){var u=f.charCodeAt(l);if(u===45||u===46||u===95||u===126||u>=48&&u<=57||u>=65&&u<=90||u>=97&&u<=122||a===Mt.RFC1738&&(u===40||u===41)){i+=f.charAt(l);continue}if(u<128){i=i+A[u];continue}if(u<2048){i=i+(A[192|u>>6]+A[128|u&63]);continue}if(u<55296||u>=57344){i=i+(A[224|u>>12]+A[128|u>>6&63]+A[128|u&63]);continue}l+=1,u=65536+((u&1023)<<10|f.charCodeAt(l)&1023),i+=A[240|u>>18]+A[128|u>>12&63]+A[128|u>>6&63]+A[128|u&63]}return i},Ut=function(e){for(var t=[{obj:{o:e},prop:"o"}],n=[],o=0;o<t.length;++o)for(var a=t[o],f=a.obj[a.prop],i=Object.keys(f),l=0;l<i.length;++l){var u=i[l],c=f[u];typeof c=="object"&&c!==null&&n.indexOf(c)===-1&&(t.push({obj:f,prop:u}),n.push(c))}return Tt(t),e},Wt=function(e){return Object.prototype.toString.call(e)==="[object RegExp]"},Lt=function(e){return!e||typeof e!="object"?!1:!!(e.constructor&&e.constructor.isBuffer&&e.constructor.isBuffer(e))},Gt=function(e,t){return[].concat(e,t)},kt=function(e,t){if(_(e)){for(var n=[],o=0;o<e.length;o+=1)n.push(t(e[o]));return n}return t(e)},pr={arrayToObject:cr,assign:Bt,combine:Gt,compact:Ut,decode:Ct,encode:_t,isBuffer:Lt,isRegExp:Wt,maybeMap:kt,merge:Dt},yr=It,Fe=pr,te=_e,zt=Object.prototype.hasOwnProperty,Xe={brackets:function(e){return e+"[]"},comma:"comma",indices:function(e,t){return e+"["+t+"]"},repeat:function(e){return e}},$=Array.isArray,Ht=String.prototype.split,Qt=Array.prototype.push,sr=function(r,e){Qt.apply(r,$(e)?e:[e])},Vt=Date.prototype.toISOString,Ze=te.default,h={addQueryPrefix:!1,allowDots:!1,charset:"utf-8",charsetSentinel:!1,delimiter:"&",encode:!0,encoder:Fe.encode,encodeValuesOnly:!1,format:Ze,formatter:te.formatters[Ze],indices:!1,serializeDate:function(e){return Vt.call(e)},skipNulls:!1,strictNullHandling:!1},qt=function(e){return typeof e=="string"||typeof e=="number"||typeof e=="boolean"||typeof e=="symbol"||typeof e=="bigint"},Ae={},Jt=function r(e,t,n,o,a,f,i,l,u,c,v,p,m,d,b,P){for(var s=e,E=P,F=0,U=!1;(E=E.get(Ae))!==void 0&&!U;){var K=E.get(e);if(F+=1,typeof K<"u"){if(K===F)throw new RangeError("Cyclic object value");U=!0}typeof E.get(Ae)>"u"&&(F=0)}if(typeof l=="function"?s=l(t,s):s instanceof Date?s=v(s):n==="comma"&&$(s)&&(s=Fe.maybeMap(s,function(ye){return ye instanceof Date?v(ye):ye})),s===null){if(a)return i&&!d?i(t,h.encoder,b,"key",p):t;s=""}if(qt(s)||Fe.isBuffer(s)){if(i){var j=d?t:i(t,h.encoder,b,"key",p);if(n==="comma"&&d){for(var B=Ht.call(String(s),","),Y="",I=0;I<B.length;++I)Y+=(I===0?"":",")+m(i(B[I],h.encoder,b,"value",p));return[m(j)+(o&&$(s)&&B.length===1?"[]":"")+"="+Y]}return[m(j)+"="+m(i(s,h.encoder,b,"value",p))]}return[m(t)+"="+m(String(s))]}var W=[];if(typeof s>"u")return W;var C;if(n==="comma"&&$(s))C=[{value:s.length>0?s.join(",")||null:void 0}];else if($(l))C=l;else{var L=Object.keys(s);C=u?L.sort(u):L}for(var O=o&&$(s)&&s.length===1?t+"[]":t,R=0;R<C.length;++R){var x=C[R],X=typeof x=="object"&&typeof x.value<"u"?x.value:s[x];if(!(f&&X===null)){var dr=$(s)?typeof n=="function"?n(O,x):O:O+(c?"."+x:"["+x+"]");P.set(e,F);var Ue=yr();Ue.set(Ae,P),sr(W,r(X,dr,n,o,a,f,i,l,u,c,v,p,m,d,b,Ue))}}return W},Kt=function(e){if(!e)return h;if(e.encoder!==null&&typeof e.encoder<"u"&&typeof e.encoder!="function")throw new TypeError("Encoder has to be a function.");var t=e.charset||h.charset;if(typeof e.charset<"u"&&e.charset!=="utf-8"&&e.charset!=="iso-8859-1")throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");var n=te.default;if(typeof e.format<"u"){if(!zt.call(te.formatters,e.format))throw new TypeError("Unknown format option provided.");n=e.format}var o=te.formatters[n],a=h.filter;return(typeof e.filter=="function"||$(e.filter))&&(a=e.filter),{addQueryPrefix:typeof e.addQueryPrefix=="boolean"?e.addQueryPrefix:h.addQueryPrefix,allowDots:typeof e.allowDots>"u"?h.allowDots:!!e.allowDots,charset:t,charsetSentinel:typeof e.charsetSentinel=="boolean"?e.charsetSentinel:h.charsetSentinel,delimiter:typeof e.delimiter>"u"?h.delimiter:e.delimiter,encode:typeof e.encode=="boolean"?e.encode:h.encode,encoder:typeof e.encoder=="function"?e.encoder:h.encoder,encodeValuesOnly:typeof e.encodeValuesOnly=="boolean"?e.encodeValuesOnly:h.encodeValuesOnly,filter:a,format:n,formatter:o,serializeDate:typeof e.serializeDate=="function"?e.serializeDate:h.serializeDate,skipNulls:typeof e.skipNulls=="boolean"?e.skipNulls:h.skipNulls,sort:typeof e.sort=="function"?e.sort:null,strictNullHandling:typeof e.strictNullHandling=="boolean"?e.strictNullHandling:h.strictNullHandling}},jt=function(r,e){var t=r,n=Kt(e),o,a;typeof n.filter=="function"?(a=n.filter,t=a("",t)):$(n.filter)&&(a=n.filter,o=a);var f=[];if(typeof t!="object"||t===null)return"";var i;e&&e.arrayFormat in Xe?i=e.arrayFormat:e&&"indices"in e?i=e.indices?"indices":"repeat":i="indices";var l=Xe[i];if(e&&"commaRoundTrip"in e&&typeof e.commaRoundTrip!="boolean")throw new TypeError("`commaRoundTrip` must be a boolean, or absent");var u=l==="comma"&&e&&e.commaRoundTrip;o||(o=Object.keys(t)),n.sort&&o.sort(n.sort);for(var c=yr(),v=0;v<o.length;++v){var p=o[v];n.skipNulls&&t[p]===null||sr(f,Jt(t[p],p,l,u,n.strictNullHandling,n.skipNulls,n.encode?n.encoder:null,n.filter,n.sort,n.allowDots,n.serializeDate,n.format,n.formatter,n.encodeValuesOnly,n.charset,c))}var m=f.join(n.delimiter),d=n.addQueryPrefix===!0?"?":"";return n.charsetSentinel&&(n.charset==="iso-8859-1"?d+="utf8=%26%2310003%3B&":d+="utf8=%E2%9C%93&"),m.length>0?d+m:""},q=pr,Ie=Object.prototype.hasOwnProperty,Yt=Array.isArray,g={allowDots:!1,allowPrototypes:!1,allowSparse:!1,arrayLimit:20,charset:"utf-8",charsetSentinel:!1,comma:!1,decoder:q.decode,delimiter:"&",depth:5,ignoreQueryPrefix:!1,interpretNumericEntities:!1,parameterLimit:1e3,parseArrays:!0,plainObjects:!1,strictNullHandling:!1},Xt=function(r){return r.replace(/&#(\d+);/g,function(e,t){return String.fromCharCode(parseInt(t,10))})},vr=function(r,e){return r&&typeof r=="string"&&e.comma&&r.indexOf(",")>-1?r.split(","):r},Zt="utf8=%26%2310003%3B",en="utf8=%E2%9C%93",rn=function(e,t){var n={},o=t.ignoreQueryPrefix?e.replace(/^\?/,""):e,a=t.parameterLimit===1/0?void 0:t.parameterLimit,f=o.split(t.delimiter,a),i=-1,l,u=t.charset;if(t.charsetSentinel)for(l=0;l<f.length;++l)f[l].indexOf("utf8=")===0&&(f[l]===en?u="utf-8":f[l]===Zt&&(u="iso-8859-1"),i=l,l=f.length);for(l=0;l<f.length;++l)if(l!==i){var c=f[l],v=c.indexOf("]="),p=v===-1?c.indexOf("="):v+1,m,d;p===-1?(m=t.decoder(c,g.decoder,u,"key"),d=t.strictNullHandling?null:""):(m=t.decoder(c.slice(0,p),g.decoder,u,"key"),d=q.maybeMap(vr(c.slice(p+1),t),function(b){return t.decoder(b,g.decoder,u,"value")})),d&&t.interpretNumericEntities&&u==="iso-8859-1"&&(d=Xt(d)),c.indexOf("[]=")>-1&&(d=Yt(d)?[d]:d),Ie.call(n,m)?n[m]=q.combine(n[m],d):n[m]=d}return n},tn=function(r,e,t,n){for(var o=n?e:vr(e,t),a=r.length-1;a>=0;--a){var f,i=r[a];if(i==="[]"&&t.parseArrays)f=[].concat(o);else{f=t.plainObjects?Object.create(null):{};var l=i.charAt(0)==="["&&i.charAt(i.length-1)==="]"?i.slice(1,-1):i,u=parseInt(l,10);!t.parseArrays&&l===""?f={0:o}:!isNaN(u)&&i!==l&&String(u)===l&&u>=0&&t.parseArrays&&u<=t.arrayLimit?(f=[],f[u]=o):l!=="__proto__"&&(f[l]=o)}o=f}return o},nn=function(e,t,n,o){if(!!e){var a=n.allowDots?e.replace(/\.([^.[]+)/g,"[$1]"):e,f=/(\[[^[\]]*])/,i=/(\[[^[\]]*])/g,l=n.depth>0&&f.exec(a),u=l?a.slice(0,l.index):a,c=[];if(u){if(!n.plainObjects&&Ie.call(Object.prototype,u)&&!n.allowPrototypes)return;c.push(u)}for(var v=0;n.depth>0&&(l=i.exec(a))!==null&&v<n.depth;){if(v+=1,!n.plainObjects&&Ie.call(Object.prototype,l[1].slice(1,-1))&&!n.allowPrototypes)return;c.push(l[1])}return l&&c.push("["+a.slice(l.index)+"]"),tn(c,t,n,o)}},an=function(e){if(!e)return g;if(e.decoder!==null&&e.decoder!==void 0&&typeof e.decoder!="function")throw new TypeError("Decoder has to be a function.");if(typeof e.charset<"u"&&e.charset!=="utf-8"&&e.charset!=="iso-8859-1")throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");var t=typeof e.charset>"u"?g.charset:e.charset;return{allowDots:typeof e.allowDots>"u"?g.allowDots:!!e.allowDots,allowPrototypes:typeof e.allowPrototypes=="boolean"?e.allowPrototypes:g.allowPrototypes,allowSparse:typeof e.allowSparse=="boolean"?e.allowSparse:g.allowSparse,arrayLimit:typeof e.arrayLimit=="number"?e.arrayLimit:g.arrayLimit,charset:t,charsetSentinel:typeof e.charsetSentinel=="boolean"?e.charsetSentinel:g.charsetSentinel,comma:typeof e.comma=="boolean"?e.comma:g.comma,decoder:typeof e.decoder=="function"?e.decoder:g.decoder,delimiter:typeof e.delimiter=="string"||q.isRegExp(e.delimiter)?e.delimiter:g.delimiter,depth:typeof e.depth=="number"||e.depth===!1?+e.depth:g.depth,ignoreQueryPrefix:e.ignoreQueryPrefix===!0,interpretNumericEntities:typeof e.interpretNumericEntities=="boolean"?e.interpretNumericEntities:g.interpretNumericEntities,parameterLimit:typeof e.parameterLimit=="number"?e.parameterLimit:g.parameterLimit,parseArrays:e.parseArrays!==!1,plainObjects:typeof e.plainObjects=="boolean"?e.plainObjects:g.plainObjects,strictNullHandling:typeof e.strictNullHandling=="boolean"?e.strictNullHandling:g.strictNullHandling}},on=function(r,e){var t=an(e);if(r===""||r===null||typeof r>"u")return t.plainObjects?Object.create(null):{};for(var n=typeof r=="string"?rn(r,t):r,o=t.plainObjects?Object.create(null):{},a=Object.keys(n),f=0;f<a.length;++f){var i=a[f],l=nn(i,n[i],t,typeof r=="string");o=q.merge(o,l,t)}return t.allowSparse===!0?o:q.compact(o)},fn=jt,ln=on,un=_e,pn={formats:un,parse:ln,stringify:fn};export{pn as l};
