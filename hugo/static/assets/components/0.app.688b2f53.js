(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,function(t,e,n){"use strict";var s=n(31),i=(n(5),n(2),n(22)),r=n(4);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
function o(t,e,n,s,i){let r;i&&(r="object"==typeof n&&null!==n)&&(s=t.__dataTemp[e]);let o=s!==n&&(s==s||n==n);return r&&o&&(t.__dataTemp[e]=n),o}const a=Object(r.a)(t=>{return class extends t{_shouldPropertyChange(t,e,n){return o(this,t,e,n,!0)}}}),l=Object(r.a)(t=>{return class extends t{static get properties(){return{mutableData:Boolean}}_shouldPropertyChange(t,e,n){return o(this,t,e,n,this.mutableData)}}});a._mutablePropertyChange=o;var c=n(6);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/let u=null;function d(){return u}d.prototype=Object.create(HTMLTemplateElement.prototype,{constructor:{value:d,writable:!0}});const h=Object(i.a)(d),p=a(h);const _=Object(i.a)(class{});class f extends _{constructor(t){super(),this._configureProperties(t),this.root=this._stampTemplate(this.__dataHost);let e=this.children=[];for(let t=this.root.firstChild;t;t=t.nextSibling)e.push(t),t.__templatizeInstance=this;this.__templatizeOwner&&this.__templatizeOwner.__hideTemplateChildren__&&this._showHideChildren(!0);let n=this.__templatizeOptions;(t&&n.instanceProps||!n.instanceProps)&&this._enableProperties()}_configureProperties(t){if(this.__templatizeOptions.forwardHostProp)for(let t in this.__hostProps)this._setPendingProperty(t,this.__dataHost["_host_"+t]);for(let e in t)this._setPendingProperty(e,t[e])}forwardHostProp(t,e){this._setPendingPropertyOrPath(t,e,!1,!0)&&this.__dataHost._enqueueClient(this)}_addEventListenerToNode(t,e,n){if(this._methodHost&&this.__templatizeOptions.parentModel)this._methodHost._addEventListenerToNode(t,e,t=>{t.model=this,n(t)});else{let s=this.__dataHost.__dataHost;s&&s._addEventListenerToNode(t,e,n)}}_showHideChildren(t){let e=this.children;for(let n=0;n<e.length;n++){let s=e[n];if(Boolean(t)!=Boolean(s.__hideTemplateChildren__))if(s.nodeType===Node.TEXT_NODE)t?(s.__polymerTextContent__=s.textContent,s.textContent=""):s.textContent=s.__polymerTextContent__;else if("slot"===s.localName)if(t)s.__polymerReplaced__=document.createComment("hidden-slot"),s.parentNode.replaceChild(s.__polymerReplaced__,s);else{const t=s.__polymerReplaced__;t&&t.parentNode.replaceChild(s,t)}else s.style&&(t?(s.__polymerDisplay__=s.style.display,s.style.display="none"):s.style.display=s.__polymerDisplay__);s.__hideTemplateChildren__=t,s._showHideChildren&&s._showHideChildren(t)}}_setUnmanagedPropertyToNode(t,e,n){t.__hideTemplateChildren__&&t.nodeType==Node.TEXT_NODE&&"textContent"==e?t.__polymerTextContent__=n:super._setUnmanagedPropertyToNode(t,e,n)}get parentModel(){let t=this.__parentModel;if(!t){let e;t=this;do{t=t.__dataHost.__dataHost}while((e=t.__templatizeOptions)&&!e.parentModel);this.__parentModel=t}return t}dispatchEvent(t){return!0}}f.prototype.__dataHost,f.prototype.__templatizeOptions,f.prototype._methodHost,f.prototype.__templatizeOwner,f.prototype.__hostProps;const m=a(f);function y(t){let e=t.__dataHost;return e&&e._methodHost||e}function b(t,e,n){let s=n.mutableData?m:f,i=class extends s{};return i.prototype.__templatizeOptions=n,i.prototype._bindTemplate(t),function(t,e,n,s){let i=n.hostProps||{};for(let e in s.instanceProps){delete i[e];let n=s.notifyInstanceProp;n&&t.prototype._addPropertyEffect(e,t.prototype.PROPERTY_EFFECT_TYPES.NOTIFY,{fn:P(e,n)})}if(s.forwardHostProp&&e.__dataHost)for(let e in i)t.prototype._addPropertyEffect(e,t.prototype.PROPERTY_EFFECT_TYPES.NOTIFY,{fn:function(t,e,n){t.__dataHost._setPendingPropertyOrPath("_host_"+e,n[e],!0,!0)}})}(i,t,e,n),i}function g(t,e,n){let s=n.forwardHostProp;if(s){let i=e.templatizeTemplateClass;if(!i){let t=n.mutableData?p:h;i=e.templatizeTemplateClass=class extends t{};let r=e.hostProps;for(let t in r)i.prototype._addPropertyEffect("_host_"+t,i.prototype.PROPERTY_EFFECT_TYPES.PROPAGATE,{fn:v(t,s)}),i.prototype._createNotifyingProperty("_host_"+t)}!function(t,e){u=t,Object.setPrototypeOf(t,e.prototype),new e,u=null}(t,i),t.__dataProto&&Object.assign(t.__data,t.__dataProto),t.__dataTemp={},t.__dataPending=null,t.__dataOld=null,t._enableProperties()}}function v(t,e){return function(t,n,s){e.call(t.__templatizeOwner,n.substring("_host_".length),s[n])}}function P(t,e){return function(t,n,s){e.call(t.__templatizeOwner,t,n,s[n])}}function C(t,e,n){if(c.e&&!y(t))throw new Error("strictTemplatePolicy: template owner not trusted");if(n=n||{},t.__templatizeOwner)throw new Error("A <template> can only be templatized once");t.__templatizeOwner=e;let s=(e?e.constructor:f)._parseTemplate(t),i=s.templatizeInstanceClass;i||(i=b(t,s,n),s.templatizeInstanceClass=i),g(t,s,n);let r=class extends i{};return r.prototype._methodHost=y(t),r.prototype.__dataHost=t,r.prototype.__templatizeOwner=e,r.prototype.__hostProps=s.hostProps,r=r}function w(t,e){let n;for(;e;)if(n=e.__templatizeInstance){if(n.__dataHost==t)return n;e=n.__dataHost}else e=e.parentNode;return null}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/var x=n(28);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/const O=Object(x.a)(l(Object(i.a)(HTMLElement)));customElements.define("dom-bind",class extends O{static get observedAttributes(){return["mutable-data"]}constructor(){if(super(),c.e)throw new Error("strictTemplatePolicy: dom-bind not allowed");this.root=null,this.$=null,this.__children=null}attributeChangedCallback(){this.mutableData=!0}connectedCallback(){this.style.display="none",this.render()}disconnectedCallback(){this.__removeChildren()}__insertChildren(){this.parentNode.insertBefore(this.root,this)}__removeChildren(){if(this.__children)for(let t=0;t<this.__children.length;t++)this.root.appendChild(this.__children[t])}render(){let t;if(!this.__children){if(!(t=t||this.querySelector("template"))){let e=new MutationObserver(()=>{if(!(t=this.querySelector("template")))throw new Error("dom-bind requires a <template> child");e.disconnect(),this.render()});return void e.observe(this,{childList:!0})}this.root=this._stampTemplate(t),this.$=this.root.$,this.__children=[];for(let t=this.root.firstChild;t;t=t.nextSibling)this.__children[this.__children.length]=t;this._enableProperties()}this.__insertChildren(),this.dispatchEvent(new CustomEvent("dom-change",{bubbles:!0,composed:!0}))}});var S=n(16),E=n(3);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const T=Object(S.a)(HTMLElement);var N=n(9),A=n(13),I=n(15),k=n(7);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const j=l(T);class M extends j{static get is(){return"dom-repeat"}static get template(){return null}static get properties(){return{items:{type:Array},as:{type:String,value:"item"},indexAs:{type:String,value:"index"},itemsIndexAs:{type:String,value:"itemsIndex"},sort:{type:Function,observer:"__sortChanged"},filter:{type:Function,observer:"__filterChanged"},observe:{type:String,observer:"__observeChanged"},delay:Number,renderedItemCount:{type:Number,notify:!0,readOnly:!0},initialCount:{type:Number,observer:"__initializeChunking"},targetFramerate:{type:Number,value:20},_targetFrameTime:{type:Number,computed:"__computeFrameTime(targetFramerate)"}}}static get observers(){return["__itemsChanged(items.*)"]}constructor(){super(),this.__instances=[],this.__limit=1/0,this.__pool=[],this.__renderDebouncer=null,this.__itemsIdxToInstIdx={},this.__chunkCount=null,this.__lastChunkTime=null,this.__sortFn=null,this.__filterFn=null,this.__observePaths=null,this.__ctor=null,this.__isDetached=!0,this.template=null}disconnectedCallback(){super.disconnectedCallback(),this.__isDetached=!0;for(let t=0;t<this.__instances.length;t++)this.__detachInstance(t)}connectedCallback(){if(super.connectedCallback(),this.style.display="none",this.__isDetached){this.__isDetached=!1;let t=this.parentNode;for(let e=0;e<this.__instances.length;e++)this.__attachInstance(e,t)}}__ensureTemplatized(){if(!this.__ctor){let t=this.template=this.querySelector("template");if(!t){let t=new MutationObserver(()=>{if(!this.querySelector("template"))throw new Error("dom-repeat requires a <template> child");t.disconnect(),this.__render()});return t.observe(this,{childList:!0}),!1}let e={};e[this.as]=!0,e[this.indexAs]=!0,e[this.itemsIndexAs]=!0,this.__ctor=C(t,this,{mutableData:this.mutableData,parentModel:!0,instanceProps:e,forwardHostProp:function(t,e){let n=this.__instances;for(let s,i=0;i<n.length&&(s=n[i]);i++)s.forwardHostProp(t,e)},notifyInstanceProp:function(t,e,n){if(Object(I.e)(this.as,e)){let s=t[this.itemsIndexAs];e==this.as&&(this.items[s]=n);let i=Object(I.i)(this.as,"items."+s,e);this.notifyPath(i,n)}}})}return!0}__getMethodHost(){return this.__dataHost._methodHost||this.__dataHost}__functionFromPropertyValue(t){if("string"==typeof t){let e=t,n=this.__getMethodHost();return function(){return n[e].apply(n,arguments)}}return t}__sortChanged(t){this.__sortFn=this.__functionFromPropertyValue(t),this.items&&this.__debounceRender(this.__render)}__filterChanged(t){this.__filterFn=this.__functionFromPropertyValue(t),this.items&&this.__debounceRender(this.__render)}__computeFrameTime(t){return Math.ceil(1e3/t)}__initializeChunking(){this.initialCount&&(this.__limit=this.initialCount,this.__chunkCount=this.initialCount,this.__lastChunkTime=performance.now())}__tryRenderChunk(){this.items&&this.__limit<this.items.length&&this.__debounceRender(this.__requestRenderChunk)}__requestRenderChunk(){requestAnimationFrame(()=>this.__renderChunk())}__renderChunk(){let t=performance.now(),e=this._targetFrameTime/(t-this.__lastChunkTime);this.__chunkCount=Math.round(this.__chunkCount*e)||1,this.__limit+=this.__chunkCount,this.__lastChunkTime=t,this.__debounceRender(this.__render)}__observeChanged(){this.__observePaths=this.observe&&this.observe.replace(".*",".").split(" ")}__itemsChanged(t){this.items&&!Array.isArray(this.items)&&console.warn("dom-repeat expected array for `items`, found",this.items),this.__handleItemPath(t.path,t.value)||(this.__initializeChunking(),this.__debounceRender(this.__render))}__handleObservedPaths(t){if(this.__sortFn||this.__filterFn)if(t){if(this.__observePaths){let e=this.__observePaths;for(let n=0;n<e.length;n++)0===t.indexOf(e[n])&&this.__debounceRender(this.__render,this.delay)}}else this.__debounceRender(this.__render,this.delay)}__debounceRender(t,e=0){this.__renderDebouncer=N.a.debounce(this.__renderDebouncer,e>0?k.b.after(e):k.a,t.bind(this)),Object(A.a)(this.__renderDebouncer)}render(){this.__debounceRender(this.__render),Object(A.b)()}__render(){this.__ensureTemplatized()&&(this.__applyFullRefresh(),this.__pool.length=0,this._setRenderedItemCount(this.__instances.length),this.dispatchEvent(new CustomEvent("dom-change",{bubbles:!0,composed:!0})),this.__tryRenderChunk())}__applyFullRefresh(){let t=this.items||[],e=new Array(t.length);for(let n=0;n<t.length;n++)e[n]=n;this.__filterFn&&(e=e.filter((e,n,s)=>this.__filterFn(t[e],n,s))),this.__sortFn&&e.sort((e,n)=>this.__sortFn(t[e],t[n]));const n=this.__itemsIdxToInstIdx={};let s=0;const i=Math.min(e.length,this.__limit);for(;s<i;s++){let i=this.__instances[s],r=e[s],o=t[r];n[r]=s,i?(i._setPendingProperty(this.as,o),i._setPendingProperty(this.indexAs,s),i._setPendingProperty(this.itemsIndexAs,r),i._flushProperties()):this.__insertInstance(o,s,r)}for(let t=this.__instances.length-1;t>=s;t--)this.__detachAndRemoveInstance(t)}__detachInstance(t){let e=this.__instances[t];for(let t=0;t<e.children.length;t++){let n=e.children[t];e.root.appendChild(n)}return e}__attachInstance(t,e){let n=this.__instances[t];e.insertBefore(n.root,this)}__detachAndRemoveInstance(t){let e=this.__detachInstance(t);e&&this.__pool.push(e),this.__instances.splice(t,1)}__stampInstance(t,e,n){let s={};return s[this.as]=t,s[this.indexAs]=e,s[this.itemsIndexAs]=n,new this.__ctor(s)}__insertInstance(t,e,n){let s=this.__pool.pop();s?(s._setPendingProperty(this.as,t),s._setPendingProperty(this.indexAs,e),s._setPendingProperty(this.itemsIndexAs,n),s._flushProperties()):s=this.__stampInstance(t,e,n);let i=this.__instances[e+1],r=i?i.children[0]:this;return this.parentNode.insertBefore(s.root,r),this.__instances[e]=s,s}_showHideChildren(t){for(let e=0;e<this.__instances.length;e++)this.__instances[e]._showHideChildren(t)}__handleItemPath(t,e){let n=t.slice(6),s=n.indexOf("."),i=s<0?n:n.substring(0,s);if(i==parseInt(i,10)){let t=s<0?"":n.substring(s+1);this.__handleObservedPaths(t);let r=this.__itemsIdxToInstIdx[i],o=this.__instances[r];if(o){let n=this.as+(t?"."+t:"");o._setPendingPropertyOrPath(n,e,!1,!0),o._flushProperties()}return!0}}itemForElement(t){let e=this.modelForElement(t);return e&&e[this.as]}indexForElement(t){let e=this.modelForElement(t);return e&&e[this.indexAs]}modelForElement(t){return w(this.template,t)}}customElements.define(M.is,M);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
class L extends T{static get is(){return"dom-if"}static get template(){return null}static get properties(){return{if:{type:Boolean,observer:"__debounceRender"},restamp:{type:Boolean,observer:"__debounceRender"}}}constructor(){super(),this.__renderDebouncer=null,this.__invalidProps=null,this.__instance=null,this._lastIf=!1,this.__ctor=null,this.__hideTemplateChildren__=!1}__debounceRender(){this.__renderDebouncer=N.a.debounce(this.__renderDebouncer,k.a,()=>this.__render()),Object(A.a)(this.__renderDebouncer)}disconnectedCallback(){super.disconnectedCallback(),this.parentNode&&(this.parentNode.nodeType!=Node.DOCUMENT_FRAGMENT_NODE||this.parentNode.host)||this.__teardownInstance()}connectedCallback(){super.connectedCallback(),this.style.display="none",this.if&&this.__debounceRender()}render(){Object(A.b)()}__render(){if(this.if){if(!this.__ensureInstance())return;this._showHideChildren()}else this.restamp&&this.__teardownInstance();!this.restamp&&this.__instance&&this._showHideChildren(),this.if!=this._lastIf&&(this.dispatchEvent(new CustomEvent("dom-change",{bubbles:!0,composed:!0})),this._lastIf=this.if)}__ensureInstance(){let t=this.parentNode;if(t){if(!this.__ctor){let t=this.querySelector("template");if(!t){let t=new MutationObserver(()=>{if(!this.querySelector("template"))throw new Error("dom-if requires a <template> child");t.disconnect(),this.__render()});return t.observe(this,{childList:!0}),!1}this.__ctor=C(t,this,{mutableData:!0,forwardHostProp:function(t,e){this.__instance&&(this.if?this.__instance.forwardHostProp(t,e):(this.__invalidProps=this.__invalidProps||Object.create(null),this.__invalidProps[Object(I.g)(t)]=!0))}})}if(this.__instance){this.__syncHostProperties();let e=this.__instance.children;if(e&&e.length){if(this.previousSibling!==e[e.length-1])for(let n,s=0;s<e.length&&(n=e[s]);s++)t.insertBefore(n,this)}}else this.__instance=new this.__ctor,t.insertBefore(this.__instance.root,this)}return!0}__syncHostProperties(){let t=this.__invalidProps;if(t){for(let e in t)this.__instance._setPendingProperty(e,this.__dataHost[e]);this.__invalidProps=null,this.__instance._flushProperties()}}__teardownInstance(){if(this.__instance){let t=this.__instance.children;if(t&&t.length){let e=t[0].parentNode;if(e)for(let n,s=0;s<t.length&&(n=t[s]);s++)e.removeChild(n)}this.__instance=null,this.__invalidProps=null}}_showHideChildren(){let t=this.__hideTemplateChildren__||!this.if;this.__instance&&this.__instance._showHideChildren(t)}}customElements.define(L.is,L);var R=n(30);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/let D=Object(r.a)(t=>{let e=Object(S.a)(t);return class extends e{static get properties(){return{items:{type:Array},multi:{type:Boolean,value:!1},selected:{type:Object,notify:!0},selectedItem:{type:Object,notify:!0},toggle:{type:Boolean,value:!1}}}static get observers(){return["__updateSelection(multi, items.*)"]}constructor(){super(),this.__lastItems=null,this.__lastMulti=null,this.__selectedMap=null}__updateSelection(t,e){let n=e.path;if("items"==n){let n=e.base||[],s=this.__lastItems;if(t!==this.__lastMulti&&this.clearSelection(),s){let t=Object(R.a)(n,s);this.__applySplices(t)}this.__lastItems=n,this.__lastMulti=t}else if("items.splices"==e.path)this.__applySplices(e.value.indexSplices);else{let t=n.slice("items.".length),e=parseInt(t,10);t.indexOf(".")<0&&t==e&&this.__deselectChangedIdx(e)}}__applySplices(t){let e=this.__selectedMap;for(let n=0;n<t.length;n++){let s=t[n];e.forEach((t,n)=>{t<s.index||(t>=s.index+s.removed.length?e.set(n,t+s.addedCount-s.removed.length):e.set(n,-1))});for(let t=0;t<s.addedCount;t++){let n=s.index+t;e.has(this.items[n])&&e.set(this.items[n],n)}}this.__updateLinks();let n=0;e.forEach((t,s)=>{t<0?(this.multi?this.splice("selected",n,1):this.selected=this.selectedItem=null,e.delete(s)):n++})}__updateLinks(){if(this.__dataLinkedPaths={},this.multi){let t=0;this.__selectedMap.forEach(e=>{e>=0&&this.linkPaths("items."+e,"selected."+t++)})}else this.__selectedMap.forEach(t=>{this.linkPaths("selected","items."+t),this.linkPaths("selectedItem","items."+t)})}clearSelection(){this.__dataLinkedPaths={},this.__selectedMap=new Map,this.selected=this.multi?[]:null,this.selectedItem=null}isSelected(t){return this.__selectedMap.has(t)}isIndexSelected(t){return this.isSelected(this.items[t])}__deselectChangedIdx(t){let e=this.__selectedIndexForItemIndex(t);if(e>=0){let t=0;this.__selectedMap.forEach((n,s)=>{e==t++&&this.deselect(s)})}}__selectedIndexForItemIndex(t){let e=this.__dataLinkedPaths["items."+t];if(e)return parseInt(e.slice("selected.".length),10)}deselect(t){let e=this.__selectedMap.get(t);if(e>=0){let n;this.__selectedMap.delete(t),this.multi&&(n=this.__selectedIndexForItemIndex(e)),this.__updateLinks(),this.multi?this.splice("selected",n,1):this.selected=this.selectedItem=null}}deselectIndex(t){this.deselect(this.items[t])}select(t){this.selectIndex(this.items.indexOf(t))}selectIndex(t){let e=this.items[t];this.isSelected(e)?this.toggle&&this.deselectIndex(t):(this.multi||this.__selectedMap.clear(),this.__selectedMap.set(e,t),this.__updateLinks(),this.multi?this.push("selected",e):this.selected=this.selectedItem=e)}}})(T);class F extends D{static get is(){return"array-selector"}}customElements.define(F.is,F);var H=n(32),z=n(19),B=n(17);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const q=new H.a;window.ShadyCSS||(window.ShadyCSS={prepareTemplate(t,e,n){},prepareTemplateDom(t,e){},prepareTemplateStyles(t,e,n){},styleSubtree(t,e){q.processStyles(),Object(z.c)(t,e)},styleElement(t){q.processStyles()},styleDocument(t){q.processStyles(),Object(z.c)(document.body,t)},getComputedStyleValue:(t,e)=>Object(z.b)(t,e),flushCustomStyles(){},nativeCss:B.b,nativeShadow:B.c,cssBuild:B.a}),window.ShadyCSS.CustomStyleInterface=q;var Y=n(23);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/const $="include",V=window.ShadyCSS.CustomStyleInterface;
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
let U;window.customElements.define("custom-style",class extends HTMLElement{constructor(){super(),this._style=null,V.addCustomStyle(this)}getStyle(){if(this._style)return this._style;const t=this.querySelector("style");if(!t)return null;this._style=t;const e=t.getAttribute($);return e&&(t.removeAttribute($),t.textContent=Object(Y.a)(e)+t.textContent),this.ownerDocument!==window.document&&window.document.head.appendChild(this),this._style}}),U=a._mutablePropertyChange;Boolean;n.d(e,"a",function(){return J}),n.d(e,"b",function(){return E.a});
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const J=Object(s.a)(HTMLElement).prototype},function(t,e,n){"use strict";
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/window.JSCompiler_renameProperty=function(t,e){return t}},function(t,e,n){"use strict";n.d(e,"a",function(){return r});n(2);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/class s{constructor(t){this.value=t.toString()}toString(){return this.value}}function i(t){if(t instanceof s)return t.value;throw new Error(`non-literal value passed to Polymer's htmlLiteral function: ${t}`)}const r=function(t,...e){const n=document.createElement("template");return n.innerHTML=e.reduce((e,n,r)=>e+function(t){if(t instanceof HTMLTemplateElement)return t.innerHTML;if(t instanceof s)return i(t);throw new Error(`non-template value passed to Polymer's html function: ${t}`)}(n)+t[r+1],t[0]),n}},function(t,e,n){"use strict";n.d(e,"a",function(){return r});n(2);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/let s=0;function i(){}i.prototype.__mixinApplications,i.prototype.__mixinSet;const r=function(t){let e=t.__mixinApplications;e||(e=new WeakMap,t.__mixinApplications=e);let n=s++;return function(s){let i=s.__mixinSet;if(i&&i[n])return s;let r=e,o=r.get(s);o||(o=t(s),r.set(s,o));let a=Object.create(o.__mixinSet||i||null);return a[n]=!0,o.__mixinSet=a,o}}},function(t,e,n){"use strict";var s=n(31);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/let i={attached:!0,detached:!0,ready:!0,created:!0,beforeRegister:!0,registered:!0,attributeChanged:!0,behaviors:!0};function r(t,e){if(!t)return e=e;e=Object(s.a)(e),Array.isArray(t)||(t=[t]);let n=e.prototype.behaviors;return e=function t(e,n){for(let s=0;s<e.length;s++){let i=e[s];i&&(n=Array.isArray(i)?t(i,n):o(i,n))}return n}(t=function t(e,n,s){n=n||[];for(let i=e.length-1;i>=0;i--){let r=e[i];r?Array.isArray(r)?t(r,n):n.indexOf(r)<0&&(!s||s.indexOf(r)<0)&&n.unshift(r):console.warn("behavior is null, check for missing or 404 import")}return n}(t,null,n),e),n&&(t=n.concat(t)),e.prototype.behaviors=t,e}function o(t,e){class n extends e{static get properties(){return t.properties}static get observers(){return t.observers}created(){super.created(),t.created&&t.created.call(this)}_registered(){super._registered(),t.beforeRegister&&t.beforeRegister.call(Object.getPrototypeOf(this)),t.registered&&t.registered.call(Object.getPrototypeOf(this))}_applyListeners(){if(super._applyListeners(),t.listeners)for(let e in t.listeners)this._addMethodEventListenerToNode(this,e,t.listeners[e])}_ensureAttributes(){if(t.hostAttributes)for(let e in t.hostAttributes)this._ensureAttribute(e,t.hostAttributes[e]);super._ensureAttributes()}ready(){super.ready(),t.ready&&t.ready.call(this)}attached(){super.attached(),t.attached&&t.attached.call(this)}detached(){super.detached(),t.detached&&t.detached.call(this)}attributeChanged(e,n,s){super.attributeChanged(e,n,s),t.attributeChanged&&t.attributeChanged.call(this,e,n,s)}}n.generatedFrom=t;for(let e in t)if(!(e in i)){let s=Object.getOwnPropertyDescriptor(t,e);s&&Object.defineProperty(n.prototype,e,s)}return n}n(2);n.d(e,"a",function(){return a});
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const a=function(t){let e;return e="function"==typeof t?t:a.Class(t),customElements.define(e.is,e),e};a.Class=function(t,e){t||console.warn("Polymer's Class function requires `info` argument");const n=t.behaviors?r(t.behaviors,HTMLElement):Object(s.a)(HTMLElement),i=o(t,e?e(n):n);return i.is=t.is,i}},function(t,e,n){"use strict";n.d(e,"c",function(){return i}),n.d(e,"d",function(){return r}),n.d(e,"b",function(){return o}),n.d(e,"e",function(){return a}),n.d(e,"a",function(){return l});n(2);var s=n(12);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
window.ShadyDOM,Boolean(!window.ShadyCSS||window.ShadyCSS.nativeCss),window.customElements.polyfillWrapFlushCallback;let i=Object(s.a)(document.baseURI||window.location.href);let r=window.Polymer&&window.Polymer.sanitizeDOMValue||void 0;let o=!1;let a=!1;let l=!1},function(t,e,n){"use strict";n.d(e,"b",function(){return l}),n.d(e,"a",function(){return c});n(2);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/let s=0,i=0,r=[],o=0,a=document.createTextNode("");new window.MutationObserver(function(){const t=r.length;for(let e=0;e<t;e++){let t=r[e];if(t)try{t()}catch(t){setTimeout(()=>{throw t})}}r.splice(0,t),i+=t}).observe(a,{characterData:!0});const l={after:t=>({run:e=>window.setTimeout(e,t),cancel(t){window.clearTimeout(t)}}),run:(t,e)=>window.setTimeout(t,e),cancel(t){window.clearTimeout(t)}},c={run:t=>(a.textContent=o++,r.push(t),s++),cancel(t){const e=t-i;if(e>=0){if(!r[e])throw new Error("invalid async handle: "+t);r[e]=null}}}},function(t,e,n){"use strict";n(2),n(6);var s=n(30),i=n(7);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
function r(t){return"slot"===t.localName}class o{static getFlattenedNodes(t){return r(t)?(t=t).assignedNodes({flatten:!0}):Array.from(t.childNodes).map(t=>r(t)?(t=t).assignedNodes({flatten:!0}):[t]).reduce((t,e)=>t.concat(e),[])}constructor(t,e){this._shadyChildrenObserver=null,this._nativeChildrenObserver=null,this._connected=!1,this._target=t,this.callback=e,this._effectiveNodes=[],this._observer=null,this._scheduled=!1,this._boundSchedule=(()=>{this._schedule()}),this.connect(),this._schedule()}connect(){r(this._target)?this._listenSlots([this._target]):this._target.children&&(this._listenSlots(this._target.children),window.ShadyDOM?this._shadyChildrenObserver=ShadyDOM.observeChildren(this._target,t=>{this._processMutations(t)}):(this._nativeChildrenObserver=new MutationObserver(t=>{this._processMutations(t)}),this._nativeChildrenObserver.observe(this._target,{childList:!0}))),this._connected=!0}disconnect(){r(this._target)?this._unlistenSlots([this._target]):this._target.children&&(this._unlistenSlots(this._target.children),window.ShadyDOM&&this._shadyChildrenObserver?(ShadyDOM.unobserveChildren(this._shadyChildrenObserver),this._shadyChildrenObserver=null):this._nativeChildrenObserver&&(this._nativeChildrenObserver.disconnect(),this._nativeChildrenObserver=null)),this._connected=!1}_schedule(){this._scheduled||(this._scheduled=!0,i.a.run(()=>this.flush()))}_processMutations(t){this._processSlotMutations(t),this.flush()}_processSlotMutations(t){if(t)for(let e=0;e<t.length;e++){let n=t[e];n.addedNodes&&this._listenSlots(n.addedNodes),n.removedNodes&&this._unlistenSlots(n.removedNodes)}}flush(){if(!this._connected)return!1;window.ShadyDOM&&ShadyDOM.flush(),this._nativeChildrenObserver?this._processSlotMutations(this._nativeChildrenObserver.takeRecords()):this._shadyChildrenObserver&&this._processSlotMutations(this._shadyChildrenObserver.takeRecords()),this._scheduled=!1;let t={target:this._target,addedNodes:[],removedNodes:[]},e=this.constructor.getFlattenedNodes(this._target),n=Object(s.a)(e,this._effectiveNodes);for(let e,s=0;s<n.length&&(e=n[s]);s++)for(let n,s=0;s<e.removed.length&&(n=e.removed[s]);s++)t.removedNodes.push(n);for(let s,i=0;i<n.length&&(s=n[i]);i++)for(let n=s.index;n<s.index+s.addedCount;n++)t.addedNodes.push(e[n]);this._effectiveNodes=e;let i=!1;return(t.addedNodes.length||t.removedNodes.length)&&(i=!0,this.callback.call(this._target,t)),i}_listenSlots(t){for(let e=0;e<t.length;e++){let n=t[e];r(n)&&n.addEventListener("slotchange",this._boundSchedule)}}_unlistenSlots(t){for(let e=0;e<t.length;e++){let n=t[e];r(n)&&n.removeEventListener("slotchange",this._boundSchedule)}}}n(13),n(9);n.d(e,"b",function(){return c}),n.d(e,"a",function(){return h});
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const a=Element.prototype,l=a.matches||a.matchesSelector||a.mozMatchesSelector||a.msMatchesSelector||a.oMatchesSelector||a.webkitMatchesSelector,c=function(t,e){return l.call(t,e)};class u{constructor(t){this.node=t}observeNodes(t){return new o(this.node,t)}unobserveNodes(t){t.disconnect()}notifyObserver(){}deepContains(t){if(this.node.contains(t))return!0;let e=t,n=t.ownerDocument;for(;e&&e!==n&&e!==this.node;)e=e.parentNode||e.host;return e===this.node}getOwnerRoot(){return this.node.getRootNode()}getDistributedNodes(){return"slot"===this.node.localName?this.node.assignedNodes({flatten:!0}):[]}getDestinationInsertionPoints(){let t=[],e=this.node.assignedSlot;for(;e;)t.push(e),e=e.assignedSlot;return t}importNode(t,e){return(this.node instanceof Document?this.node:this.node.ownerDocument).importNode(t,e)}getEffectiveChildNodes(){return o.getFlattenedNodes(this.node)}queryDistributedElements(t){let e=this.getEffectiveChildNodes(),n=[];for(let s,i=0,r=e.length;i<r&&(s=e[i]);i++)s.nodeType===Node.ELEMENT_NODE&&c(s,t)&&n.push(s);return n}get activeElement(){let t=this.node;return void 0!==t._activeElement?t._activeElement:t.activeElement}}class d{constructor(t){this.event=t}get rootTarget(){return this.event.composedPath()[0]}get localTarget(){return this.event.target}get path(){return this.event.composedPath()}}u.prototype.cloneNode,u.prototype.appendChild,u.prototype.insertBefore,u.prototype.removeChild,u.prototype.replaceChild,u.prototype.setAttribute,u.prototype.removeAttribute,u.prototype.querySelector,u.prototype.querySelectorAll,u.prototype.parentNode,u.prototype.firstChild,u.prototype.lastChild,u.prototype.nextSibling,u.prototype.previousSibling,u.prototype.firstElementChild,u.prototype.lastElementChild,u.prototype.nextElementSibling,u.prototype.previousElementSibling,u.prototype.childNodes,u.prototype.children,u.prototype.classList,u.prototype.textContent,u.prototype.innerHTML,function(t,e){for(let n=0;n<e.length;n++){let s=e[n];t[s]=function(){return this.node[s].apply(this.node,arguments)}}}(u.prototype,["cloneNode","appendChild","insertBefore","removeChild","replaceChild","setAttribute","removeAttribute","querySelector","querySelectorAll"]),function(t,e){for(let n=0;n<e.length;n++){let s=e[n];Object.defineProperty(t,s,{get:function(){return this.node[s]},configurable:!0})}}(u.prototype,["parentNode","firstChild","lastChild","nextSibling","previousSibling","firstElementChild","lastElementChild","nextElementSibling","previousElementSibling","childNodes","children","classList"]),function(t,e){for(let n=0;n<e.length;n++){let s=e[n];Object.defineProperty(t,s,{get:function(){return this.node[s]},set:function(t){this.node[s]=t},configurable:!0})}}(u.prototype,["textContent","innerHTML"]);const h=function(t){if(!(t=t||document).__domApi){let e;e=t instanceof Event?new d(t):new u(t),t.__domApi=e}return t.__domApi}},function(t,e,n){"use strict";n.d(e,"a",function(){return s});n(2),n(4),n(7);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
class s{constructor(){this._asyncModule=null,this._callback=null,this._timer=null}setConfig(t,e){this._asyncModule=t,this._callback=e,this._timer=this._asyncModule.run(()=>{this._timer=null,this._callback()})}cancel(){this.isActive()&&(this._asyncModule.cancel(this._timer),this._timer=null)}flush(){this.isActive()&&(this.cancel(),this._callback())}isActive(){return null!=this._timer}static debounce(t,e,n){return t instanceof s?t.cancel():t=new s,t.setConfig(e,n),t}}},,function(t,e,n){"use strict";n(1);
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const s=n(3).a`
<custom-style>
  <style is="custom-style">
    [hidden] {
      display: none !important;
    }
  </style>
</custom-style>
<custom-style>
  <style is="custom-style">
    html {

      --layout: {
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
      };

      --layout-inline: {
        display: -ms-inline-flexbox;
        display: -webkit-inline-flex;
        display: inline-flex;
      };

      --layout-horizontal: {
        @apply --layout;

        -ms-flex-direction: row;
        -webkit-flex-direction: row;
        flex-direction: row;
      };

      --layout-horizontal-reverse: {
        @apply --layout;

        -ms-flex-direction: row-reverse;
        -webkit-flex-direction: row-reverse;
        flex-direction: row-reverse;
      };

      --layout-vertical: {
        @apply --layout;

        -ms-flex-direction: column;
        -webkit-flex-direction: column;
        flex-direction: column;
      };

      --layout-vertical-reverse: {
        @apply --layout;

        -ms-flex-direction: column-reverse;
        -webkit-flex-direction: column-reverse;
        flex-direction: column-reverse;
      };

      --layout-wrap: {
        -ms-flex-wrap: wrap;
        -webkit-flex-wrap: wrap;
        flex-wrap: wrap;
      };

      --layout-wrap-reverse: {
        -ms-flex-wrap: wrap-reverse;
        -webkit-flex-wrap: wrap-reverse;
        flex-wrap: wrap-reverse;
      };

      --layout-flex-auto: {
        -ms-flex: 1 1 auto;
        -webkit-flex: 1 1 auto;
        flex: 1 1 auto;
      };

      --layout-flex-none: {
        -ms-flex: none;
        -webkit-flex: none;
        flex: none;
      };

      --layout-flex: {
        -ms-flex: 1 1 0.000000001px;
        -webkit-flex: 1;
        flex: 1;
        -webkit-flex-basis: 0.000000001px;
        flex-basis: 0.000000001px;
      };

      --layout-flex-2: {
        -ms-flex: 2;
        -webkit-flex: 2;
        flex: 2;
      };

      --layout-flex-3: {
        -ms-flex: 3;
        -webkit-flex: 3;
        flex: 3;
      };

      --layout-flex-4: {
        -ms-flex: 4;
        -webkit-flex: 4;
        flex: 4;
      };

      --layout-flex-5: {
        -ms-flex: 5;
        -webkit-flex: 5;
        flex: 5;
      };

      --layout-flex-6: {
        -ms-flex: 6;
        -webkit-flex: 6;
        flex: 6;
      };

      --layout-flex-7: {
        -ms-flex: 7;
        -webkit-flex: 7;
        flex: 7;
      };

      --layout-flex-8: {
        -ms-flex: 8;
        -webkit-flex: 8;
        flex: 8;
      };

      --layout-flex-9: {
        -ms-flex: 9;
        -webkit-flex: 9;
        flex: 9;
      };

      --layout-flex-10: {
        -ms-flex: 10;
        -webkit-flex: 10;
        flex: 10;
      };

      --layout-flex-11: {
        -ms-flex: 11;
        -webkit-flex: 11;
        flex: 11;
      };

      --layout-flex-12: {
        -ms-flex: 12;
        -webkit-flex: 12;
        flex: 12;
      };

      /* alignment in cross axis */

      --layout-start: {
        -ms-flex-align: start;
        -webkit-align-items: flex-start;
        align-items: flex-start;
      };

      --layout-center: {
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
      };

      --layout-end: {
        -ms-flex-align: end;
        -webkit-align-items: flex-end;
        align-items: flex-end;
      };

      --layout-baseline: {
        -ms-flex-align: baseline;
        -webkit-align-items: baseline;
        align-items: baseline;
      };

      /* alignment in main axis */

      --layout-start-justified: {
        -ms-flex-pack: start;
        -webkit-justify-content: flex-start;
        justify-content: flex-start;
      };

      --layout-center-justified: {
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
      };

      --layout-end-justified: {
        -ms-flex-pack: end;
        -webkit-justify-content: flex-end;
        justify-content: flex-end;
      };

      --layout-around-justified: {
        -ms-flex-pack: distribute;
        -webkit-justify-content: space-around;
        justify-content: space-around;
      };

      --layout-justified: {
        -ms-flex-pack: justify;
        -webkit-justify-content: space-between;
        justify-content: space-between;
      };

      --layout-center-center: {
        @apply --layout-center;
        @apply --layout-center-justified;
      };

      /* self alignment */

      --layout-self-start: {
        -ms-align-self: flex-start;
        -webkit-align-self: flex-start;
        align-self: flex-start;
      };

      --layout-self-center: {
        -ms-align-self: center;
        -webkit-align-self: center;
        align-self: center;
      };

      --layout-self-end: {
        -ms-align-self: flex-end;
        -webkit-align-self: flex-end;
        align-self: flex-end;
      };

      --layout-self-stretch: {
        -ms-align-self: stretch;
        -webkit-align-self: stretch;
        align-self: stretch;
      };

      --layout-self-baseline: {
        -ms-align-self: baseline;
        -webkit-align-self: baseline;
        align-self: baseline;
      };

      /* multi-line alignment in main axis */

      --layout-start-aligned: {
        -ms-flex-line-pack: start;  /* IE10 */
        -ms-align-content: flex-start;
        -webkit-align-content: flex-start;
        align-content: flex-start;
      };

      --layout-end-aligned: {
        -ms-flex-line-pack: end;  /* IE10 */
        -ms-align-content: flex-end;
        -webkit-align-content: flex-end;
        align-content: flex-end;
      };

      --layout-center-aligned: {
        -ms-flex-line-pack: center;  /* IE10 */
        -ms-align-content: center;
        -webkit-align-content: center;
        align-content: center;
      };

      --layout-between-aligned: {
        -ms-flex-line-pack: justify;  /* IE10 */
        -ms-align-content: space-between;
        -webkit-align-content: space-between;
        align-content: space-between;
      };

      --layout-around-aligned: {
        -ms-flex-line-pack: distribute;  /* IE10 */
        -ms-align-content: space-around;
        -webkit-align-content: space-around;
        align-content: space-around;
      };

      /*******************************
                Other Layout
      *******************************/

      --layout-block: {
        display: block;
      };

      --layout-invisible: {
        visibility: hidden !important;
      };

      --layout-relative: {
        position: relative;
      };

      --layout-fit: {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
      };

      --layout-scroll: {
        -webkit-overflow-scrolling: touch;
        overflow: auto;
      };

      --layout-fullbleed: {
        margin: 0;
        height: 100vh;
      };

      /* fixed position */

      --layout-fixed-top: {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
      };

      --layout-fixed-right: {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
      };

      --layout-fixed-bottom: {
        position: fixed;
        right: 0;
        bottom: 0;
        left: 0;
      };

      --layout-fixed-left: {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
      };

    }
  </style>
</custom-style>`;s.setAttribute("style","display: none;"),document.head.appendChild(s.content);var i=document.createElement("style");i.textContent="[hidden] { display: none !important; }",document.head.appendChild(i)},function(t,e,n){"use strict";n.d(e,"c",function(){return a}),n.d(e,"b",function(){return l}),n.d(e,"a",function(){return c});n(2);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/let s,i,r=/(url\()([^)]*)(\))/g,o=/(^\/)|(^#)|(^[\w-\d]*:)/;function a(t,e){if(t&&o.test(t))return t;if(void 0===s){s=!1;try{const t=new URL("b","http://a");t.pathname="c%20d",s="http://a/c%20d"===t.href}catch(t){}}return e||(e=document.baseURI||window.location.href),s?new URL(t,e).href:(i||((i=document.implementation.createHTMLDocument("temp")).base=i.createElement("base"),i.head.appendChild(i.base),i.anchor=i.createElement("a"),i.body.appendChild(i.anchor)),i.base.href=e,i.anchor.href=t,i.anchor.href||t)}function l(t,e){return t.replace(r,function(t,n,s,i){return n+"'"+a(s.replace(/["']/g,""),e)+"'"+i})}function c(t){return t.substring(0,t.lastIndexOf("/")+1)}},function(t,e,n){"use strict";n.d(e,"a",function(){return i}),n.d(e,"b",function(){return o});n(2),n(9);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
let s=[];const i=function(t){s.push(t)};function r(){const t=Boolean(s.length);for(;s.length;)try{s.shift().flush()}catch(t){setTimeout(()=>{throw t})}return t}const o=function(){let t,e;do{t=window.ShadyDOM&&ShadyDOM.flush(),window.ShadyCSS&&window.ShadyCSS.ScopingShim&&window.ShadyCSS.ScopingShim.flush(),e=r()}while(t||e)}},,function(t,e,n){"use strict";n.d(e,"d",function(){return s}),n.d(e,"g",function(){return i}),n.d(e,"b",function(){return r}),n.d(e,"c",function(){return o}),n.d(e,"i",function(){return a}),n.d(e,"e",function(){return l}),n.d(e,"f",function(){return c}),n.d(e,"a",function(){return d}),n.d(e,"h",function(){return h});n(2);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/function s(t){return t.indexOf(".")>=0}function i(t){let e=t.indexOf(".");return-1===e?t:t.slice(0,e)}function r(t,e){return 0===t.indexOf(e+".")}function o(t,e){return 0===e.indexOf(t+".")}function a(t,e,n){return e+n.slice(t.length)}function l(t,e){return t===e||r(t,e)||o(t,e)}function c(t){if(Array.isArray(t)){let e=[];for(let n=0;n<t.length;n++){let s=t[n].toString().split(".");for(let t=0;t<s.length;t++)e.push(s[t])}return e.join(".")}return t}function u(t){return Array.isArray(t)?c(t).split("."):t.toString().split(".")}function d(t,e,n){let s=t,i=u(e);for(let t=0;t<i.length;t++){if(!s)return;s=s[i[t]]}return n&&(n.path=i.join(".")),s}function h(t,e,n){let s=t,i=u(e),r=i[i.length-1];if(i.length>1){for(let t=0;t<i.length-1;t++){if(!(s=s[i[t]]))return}s[r]=n}else s[e]=n;return i.join(".")}},function(t,e,n){"use strict";n(2);var s=n(6),i=n(4),r=n(23),o=n(12),a=n(24),l=n(22),c=n(27);const u=Object(i.a)(t=>{const e=Object(c.a)(t);function n(t){const e=Object.getPrototypeOf(t);return e.prototype instanceof i?e:null}function s(t){if(!t.hasOwnProperty(JSCompiler_renameProperty("__ownProperties",t))){let e=null;if(t.hasOwnProperty(JSCompiler_renameProperty("properties",t))){const n=t.properties;n&&(e=
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
function(t){const e={};for(let n in t){const s=t[n];e[n]="function"==typeof s?{type:s}:s}return e}(n))}t.__ownProperties=e}return t.__ownProperties}class i extends e{static get observedAttributes(){const t=this._properties;return t?Object.keys(t).map(t=>this.attributeNameForProperty(t)):[]}static finalize(){if(!this.hasOwnProperty(JSCompiler_renameProperty("__finalized",this))){const t=n(this);t&&t.finalize(),this.__finalized=!0,this._finalizeClass()}}static _finalizeClass(){const t=s(this);t&&this.createProperties(t)}static get _properties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("__properties",this))){const t=n(this);this.__properties=Object.assign({},t&&t._properties,s(this))}return this.__properties}static typeForProperty(t){const e=this._properties[t];return e&&e.type}_initializeProperties(){this.constructor.finalize(),super._initializeProperties()}connectedCallback(){super.connectedCallback&&super.connectedCallback(),this._enableProperties()}disconnectedCallback(){super.disconnectedCallback&&super.disconnectedCallback()}}return i});n.d(e,"a",function(){return h});
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const d="3.0.5",h=Object(i.a)(t=>{const e=u(Object(l.a)(t));return class extends e{static get polymerElementVersion(){return d}static _finalizeClass(){var t;super._finalizeClass(),this.hasOwnProperty(JSCompiler_renameProperty("is",this))&&this.is&&(t=this.prototype,p.push(t));const e=((n=this).hasOwnProperty(JSCompiler_renameProperty("__ownObservers",n))||(n.__ownObservers=n.hasOwnProperty(JSCompiler_renameProperty("observers",n))?n.observers:null),n.__ownObservers);var n;e&&this.createObservers(e,this._properties);let s=this.template;s&&("string"==typeof s?(console.error("template getter must return HTMLTemplateElement"),s=null):s=s.cloneNode(!0)),this.prototype._template=s}static createProperties(t){for(let r in t)e=this.prototype,n=r,s=t[r],i=t,s.computed&&(s.readOnly=!0),s.computed&&!e._hasReadOnlyEffect(n)&&e._createComputedProperty(n,s.computed,i),s.readOnly&&!e._hasReadOnlyEffect(n)&&e._createReadOnlyProperty(n,!s.computed),s.reflectToAttribute&&!e._hasReflectEffect(n)&&e._createReflectedProperty(n),s.notify&&!e._hasNotifyEffect(n)&&e._createNotifyingProperty(n),s.observer&&e._createPropertyObserver(n,s.observer,i[s.observer]),e._addPropertyToAttributeMap(n);var e,n,s,i}static createObservers(t,e){const n=this.prototype;for(let s=0;s<t.length;s++)n._createMethodObserver(t[s],e)}static get template(){return this.hasOwnProperty(JSCompiler_renameProperty("_template",this))||(this._template=this.prototype.hasOwnProperty(JSCompiler_renameProperty("_template",this.prototype))?this.prototype._template:function(t){let e=null;if(t&&(!s.e||s.a)&&(e=a.a.import(t,"template"),s.e&&!e))throw new Error(`strictTemplatePolicy: expecting dom-module or null template for ${t}`);return e}(this.is)||Object.getPrototypeOf(this.prototype).constructor.template),this._template}static set template(t){this._template=t}static get importPath(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_importPath",this))){const t=this.importMeta;if(t)this._importPath=Object(o.a)(t.url);else{const t=a.a.import(this.is);this._importPath=t&&t.assetpath||Object.getPrototypeOf(this.prototype).constructor.importPath}}return this._importPath}constructor(){super(),this._template,this._importPath,this.rootPath,this.importPath,this.root,this.$}_initializeProperties(){0,this.constructor.finalize(),this.constructor._finalizeTemplate(this.localName),super._initializeProperties(),this.rootPath=s.c,this.importPath=this.constructor.importPath;let t=function(t){if(!t.hasOwnProperty(JSCompiler_renameProperty("__propertyDefaults",t))){t.__propertyDefaults=null;let e=t._properties;for(let n in e){let s=e[n];"value"in s&&(t.__propertyDefaults=t.__propertyDefaults||{},t.__propertyDefaults[n]=s)}}return t.__propertyDefaults}(this.constructor);if(t)for(let e in t){let n=t[e];if(!this.hasOwnProperty(e)){let t="function"==typeof n.value?n.value.call(this):n.value;this._hasAccessor(e)?this._setPendingProperty(e,t,!0):this[e]=t}}}static _processStyleText(t,e){return Object(o.b)(t,e)}static _finalizeTemplate(t){const e=this.prototype._template;if(e&&!e.__polymerFinalized){e.__polymerFinalized=!0;const n=this.importPath;!function(t,e,n,s){const i=e.content.querySelectorAll("style"),o=Object(r.c)(e),a=Object(r.b)(n),l=e.content.firstElementChild;for(let n=0;n<a.length;n++){let i=a[n];i.textContent=t._processStyleText(i.textContent,s),e.content.insertBefore(i,l)}let c=0;for(let e=0;e<o.length;e++){let n=o[e],r=i[c];r!==n?(n=n.cloneNode(!0),r.parentNode.insertBefore(n,r)):c++,n.textContent=t._processStyleText(n.textContent,s)}window.ShadyCSS&&window.ShadyCSS.prepareTemplate(e,n)}(this,e,t,n?Object(o.c)(n):""),this.prototype._bindTemplate(e)}}connectedCallback(){window.ShadyCSS&&this._template&&window.ShadyCSS.styleElement(this),super.connectedCallback()}ready(){this._template&&(this.root=this._stampTemplate(this._template),this.$=this.root.$),super.ready()}_readyClients(){this._template&&(this.root=this._attachDom(this.root)),super._readyClients()}_attachDom(t){if(this.attachShadow)return t?(this.shadowRoot||this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(t),this.shadowRoot):null;throw new Error("ShadowDOM not available. PolymerElement can create dom as children instead of in ShadowDOM by setting `this.root = this;` before `ready`.")}updateStyles(t){window.ShadyCSS&&window.ShadyCSS.styleSubtree(this,t)}resolveUrl(t,e){return!e&&this.importPath&&(e=Object(o.c)(this.importPath)),Object(o.c)(t,e)}static _parseTemplateContent(t,e,n){return e.dynamicFns=e.dynamicFns||this._properties,super._parseTemplateContent(t,e,n)}}});const p=[]},function(t,e,n){"use strict";n.d(e,"c",function(){return s}),n.d(e,"a",function(){return r}),n.d(e,"b",function(){return a});
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const s=!(window.ShadyDOM&&window.ShadyDOM.inUse);let i,r;function o(t){i=(!t||!t.shimcssproperties)&&(s||Boolean(!navigator.userAgent.match(/AppleWebKit\/601|Edge\/15/)&&window.CSS&&CSS.supports&&CSS.supports("box-shadow","0 0 0 var(--foo)")))}window.ShadyCSS&&void 0!==window.ShadyCSS.cssBuild&&(r=window.ShadyCSS.cssBuild),window.ShadyCSS&&void 0!==window.ShadyCSS.nativeCss?i=window.ShadyCSS.nativeCss:window.ShadyCSS?(o(window.ShadyCSS),window.ShadyCSS=void 0):o(window.WebComponents&&window.WebComponents.flags);const a=i},function(t,e,n){"use strict";n.d(e,"c",function(){return s}),n.d(e,"b",function(){return i}),n.d(e,"a",function(){return r});
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const s=/(?:^|[;\s{]\s*)(--[\w-]*?)\s*:\s*(?:((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};{])+)|\{([^}]*)\}(?:(?=[;\s}])|$))/gi,i=/(?:^|\W+)@apply\s*\(?([^);\n]*)\)?/gi,r=/@media\s(.*)/},function(t,e,n){"use strict";n.d(e,"c",function(){return i}),n.d(e,"b",function(){return r}),n.d(e,"a",function(){return o});var s=n(18);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/function i(t,e){for(let n in e)null===n?t.style.removeProperty(n):t.style.setProperty(n,e[n])}function r(t,e){const n=window.getComputedStyle(t).getPropertyValue(e);return n?n.trim():""}function o(t){const e=s.b.test(t)||s.c.test(t);return s.b.lastIndex=0,s.c.lastIndex=0,e}},,,function(t,e,n){"use strict";n(2);var s=n(4),i=n(15),r=n(25),o=n(26);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const a={"dom-if":!0,"dom-repeat":!0};function l(t){let e=t.getAttribute("is");if(e&&a[e]){let n=t;for(n.removeAttribute("is"),t=n.ownerDocument.createElement(e),n.parentNode.replaceChild(t,n),t.appendChild(n);n.attributes.length;)t.setAttribute(n.attributes[0].name,n.attributes[0].value),n.removeAttribute(n.attributes[0].name)}return t}function c(t,e){let n=e.parentInfo&&c(t,e.parentInfo);if(!n)return t;for(let t=n.firstChild,s=0;t;t=t.nextSibling)if(e.parentIndex===s++)return t}function u(t,e,n,s){s.id&&(e[s.id]=n)}function d(t,e,n){if(n.events&&n.events.length)for(let s,i=0,r=n.events;i<r.length&&(s=r[i]);i++)t._addMethodEventListenerToNode(e,s.name,s.value,t)}function h(t,e,n){n.templateInfo&&(e._templateInfo=n.templateInfo)}const p=Object(s.a)(t=>{return class extends t{static _parseTemplate(t,e){if(!t._templateInfo){let n=t._templateInfo={};n.nodeInfoList=[],n.stripWhiteSpace=e&&e.stripWhiteSpace||t.hasAttribute("strip-whitespace"),this._parseTemplateContent(t,n,{parent:null})}return t._templateInfo}static _parseTemplateContent(t,e,n){return this._parseTemplateNode(t.content,e,n)}static _parseTemplateNode(t,e,n){let s,i=t;return"template"!=i.localName||i.hasAttribute("preserve-content")?"slot"===i.localName&&(e.hasInsertionPoint=!0):s=this._parseTemplateNestedTemplate(i,e,n)||s,i.firstChild&&(s=this._parseTemplateChildNodes(i,e,n)||s),i.hasAttributes&&i.hasAttributes()&&(s=this._parseTemplateNodeAttributes(i,e,n)||s),s}static _parseTemplateChildNodes(t,e,n){if("script"!==t.localName&&"style"!==t.localName)for(let s,i=t.firstChild,r=0;i;i=s){if("template"==i.localName&&(i=l(i)),s=i.nextSibling,i.nodeType===Node.TEXT_NODE){let n=s;for(;n&&n.nodeType===Node.TEXT_NODE;)i.textContent+=n.textContent,s=n.nextSibling,t.removeChild(n),n=s;if(e.stripWhiteSpace&&!i.textContent.trim()){t.removeChild(i);continue}}let o={parentIndex:r,parentInfo:n};this._parseTemplateNode(i,e,o)&&(o.infoIndex=e.nodeInfoList.push(o)-1),i.parentNode&&r++}}static _parseTemplateNestedTemplate(t,e,n){let s=this._parseTemplate(t,e);return(s.content=t.content.ownerDocument.createDocumentFragment()).appendChild(t.content),n.templateInfo=s,!0}static _parseTemplateNodeAttributes(t,e,n){let s=!1,i=Array.from(t.attributes);for(let r,o=i.length-1;r=i[o];o--)s=this._parseTemplateNodeAttribute(t,e,n,r.name,r.value)||s;return s}static _parseTemplateNodeAttribute(t,e,n,s,i){return"on-"===s.slice(0,3)?(t.removeAttribute(s),n.events=n.events||[],n.events.push({name:s.slice(3),value:i}),!0):"id"===s&&(n.id=i,!0)}static _contentForTemplate(t){let e=t._templateInfo;return e&&e.content||t.content}_stampTemplate(t){t&&!t.content&&window.HTMLTemplateElement&&HTMLTemplateElement.decorate&&HTMLTemplateElement.decorate(t);let e=this.constructor._parseTemplate(t),n=e.nodeInfoList,s=e.content||t.content,i=document.importNode(s,!0);i.__noInsertionPoint=!e.hasInsertionPoint;let r=i.nodeList=new Array(n.length);i.$={};for(let t,e=0,s=n.length;e<s&&(t=n[e]);e++){let n=r[e]=c(i,t);u(0,i.$,n,t),h(0,n,t),d(this,n,t)}return i=i}_addMethodEventListenerToNode(t,e,n,s){let i=function(t,e,n){return t=t._methodHost||t,function(e){t[n]?t[n](e,e.detail):console.warn("listener method `"+n+"` not defined")}}(s=s||t,0,n);return this._addEventListenerToNode(t,e,i),i}_addEventListenerToNode(t,e,n){t.addEventListener(e,n)}_removeEventListenerFromNode(t,e,n){t.removeEventListener(e,n)}}});var _=n(6);n.d(e,"a",function(){return Y});
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
let f=0;const m={COMPUTE:"__computeEffects",REFLECT:"__reflectEffects",NOTIFY:"__notifyEffects",PROPAGATE:"__propagateEffects",OBSERVE:"__observeEffects",READ_ONLY:"__readOnly"},y=/[A-Z]/;let b;function g(t,e){let n=t[e];if(n){if(!t.hasOwnProperty(e)){n=t[e]=Object.create(t[e]);for(let t in n){let e=n[t],s=n[t]=Array(e.length);for(let t=0;t<e.length;t++)s[t]=e[t]}}}else n=t[e]={};return n}function v(t,e,n,s,i,r){if(e){let o=!1,a=f++;for(let l in n)P(t,e,a,l,n,s,i,r)&&(o=!0);return o}return!1}function P(t,e,n,s,r,o,a,l){let c=!1,u=e[a?Object(i.g)(s):s];if(u)for(let e,i=0,d=u.length;i<d&&(e=u[i]);i++)e.info&&e.info.lastRun===n||a&&!C(s,e.trigger)||(e.info&&(e.info.lastRun=n),e.fn(t,s,r,o,e.info,a,l),c=!0);return c}function C(t,e){if(e){let n=e.name;return n==t||e.structured&&Object(i.b)(n,t)||e.wildcard&&Object(i.c)(n,t)}return!0}function w(t,e,n,s,i){let r="string"==typeof i.method?t[i.method]:i.method,o=i.property;r?r.call(t,t.__data[o],s[o]):i.dynamicFn||console.warn("observer method `"+i.method+"` not defined")}function x(t,e,n){let s=Object(i.g)(e);if(s!==e){return O(t,Object(r.a)(s)+"-changed",n[e],e),!0}return!1}function O(t,e,n,s){let i={value:n,queueProperty:!0};s&&(i.path=s),t.dispatchEvent(new CustomEvent(e,{detail:i}))}function S(t,e,n,s,r,o){let a=(o?Object(i.g)(e):e)!=e?e:null,l=a?Object(i.a)(t,a):t.__data[e];a&&void 0===l&&(l=n[e]),O(t,r.eventName,l,a)}function E(t,e,n,s,i){let r=t.__data[e];_.d&&(r=Object(_.d)(r,i.attrName,"attribute",t)),t._propertyToAttribute(e,i.attrName,r)}function T(t,e,n,s,i){let r=L(t,e,n,s,i),o=i.methodInfo;t.__dataHasAccessor&&t.__dataHasAccessor[o]?t._setPendingProperty(o,r,!0):t[o]=r}function N(t,e,n,s,i,o,a){n.bindings=n.bindings||[];let l={kind:s,target:i,parts:o,literal:a,isCompound:1!==o.length};if(n.bindings.push(l),function(t){return Boolean(t.target)&&"attribute"!=t.kind&&"text"!=t.kind&&!t.isCompound&&"{"===t.parts[0].mode}(l)){let{event:t,negate:e}=l.parts[0];l.listenerEvent=t||Object(r.a)(i)+"-changed",l.listenerNegate=e}let c=e.nodeInfoList.length;for(let n=0;n<l.parts.length;n++){let s=l.parts[n];s.compoundIndex=n,A(t,e,l,s,c)}}function A(t,e,n,s,i){if(!s.literal)if("attribute"===n.kind&&"-"===n.target[0])console.warn("Cannot set attribute "+n.target+' because "-" is not a valid attribute starting character');else{let r=s.dependencies,o={index:i,binding:n,part:s,evaluator:t};for(let n=0;n<r.length;n++){let s=r[n];"string"==typeof s&&((s=z(s)).wildcard=!0),t._addTemplatePropertyEffect(e,s.rootProperty,{fn:I,info:o,trigger:s})}}}function I(t,e,n,s,r,o,a){let l=a[r.index],c=r.binding,u=r.part;if(o&&u.source&&e.length>u.source.length&&"property"==c.kind&&!c.isCompound&&l.__isPropertyEffectsClient&&l.__dataHasAccessor&&l.__dataHasAccessor[c.target]){let s=n[e];e=Object(i.i)(u.source,c.target,e),l._setPendingPropertyOrPath(e,s,!1,!0)&&t._enqueueClient(l)}else{!function(t,e,n,s,i){i=function(t,e,n,s){if(n.isCompound){let i=t.__dataCompoundStorage[n.target];i[s.compoundIndex]=e,e=i.join("")}return"attribute"!==n.kind&&("textContent"!==n.target&&("value"!==n.target||"input"!==t.localName&&"textarea"!==t.localName)||(e=null==e?"":e)),e}(e,i,n,s),_.d&&(i=Object(_.d)(i,n.target,n.kind,e));if("attribute"==n.kind)t._valueToNodeAttribute(e,i,n.target);else{let s=n.target;e.__isPropertyEffectsClient&&e.__dataHasAccessor&&e.__dataHasAccessor[s]?e[m.READ_ONLY]&&e[m.READ_ONLY][s]||e._setPendingProperty(s,i)&&t._enqueueClient(e):t._setUnmanagedPropertyToNode(e,s,i)}}(t,l,c,u,r.evaluator._evaluateBinding(t,u,e,n,s,o))}}function k(t,e){if(e.isCompound){let n=t.__dataCompoundStorage||(t.__dataCompoundStorage={}),s=e.parts,i=new Array(s.length);for(let t=0;t<s.length;t++)i[t]=s[t].literal;let r=e.target;n[r]=i,e.literal&&"property"==e.kind&&(t[r]=e.literal)}}function j(t,e,n){if(n.listenerEvent){let s=n.parts[0];t.addEventListener(n.listenerEvent,function(t){!function(t,e,n,s,r){let o,a=t.detail,l=a&&a.path;l?(s=Object(i.i)(n,s,l),o=a&&a.value):o=t.currentTarget[n],o=r?!o:o,e[m.READ_ONLY]&&e[m.READ_ONLY][s]||!e._setPendingPropertyOrPath(s,o,!0,Boolean(l))||a&&a.queueProperty||e._invalidateProperties()}(t,e,n.target,s.source,s.negate)})}}function M(t,e,n,s,i,r){r=e.static||r&&("object"!=typeof r||r[e.methodName]);let o={methodName:e.methodName,args:e.args,methodInfo:i,dynamicFn:r};for(let i,r=0;r<e.args.length&&(i=e.args[r]);r++)i.literal||t._addPropertyEffect(i.rootProperty,n,{fn:s,info:o,trigger:i});r&&t._addPropertyEffect(e.methodName,n,{fn:s,info:o})}function L(t,e,n,s,i){let r=t._methodHost||t,o=r[i.methodName];if(o){let s=t._marshalArgs(i.args,e,n);return o.apply(r,s)}i.dynamicFn||console.warn("method `"+i.methodName+"` not defined")}const R=[],D=new RegExp("(\\[\\[|{{)\\s*(?:(!)\\s*)?((?:[a-zA-Z_$][\\w.:$\\-*]*)\\s*(?:\\(\\s*(?:(?:(?:((?:[a-zA-Z_$][\\w.:$\\-*]*)|(?:[-+]?[0-9]*\\.?[0-9]+(?:[eE][-+]?[0-9]+)?)|(?:(?:'(?:[^'\\\\]|\\\\.)*')|(?:\"(?:[^\"\\\\]|\\\\.)*\")))\\s*)(?:,\\s*(?:((?:[a-zA-Z_$][\\w.:$\\-*]*)|(?:[-+]?[0-9]*\\.?[0-9]+(?:[eE][-+]?[0-9]+)?)|(?:(?:'(?:[^'\\\\]|\\\\.)*')|(?:\"(?:[^\"\\\\]|\\\\.)*\")))\\s*))*)?)\\)\\s*)?)(?:]]|}})","g");function F(t){let e="";for(let n=0;n<t.length;n++){e+=t[n].literal||""}return e}function H(t){let e=t.match(/([^\s]+?)\(([\s\S]*)\)/);if(e){let t={methodName:e[1],static:!0,args:R};if(e[2].trim()){return function(t,e){return e.args=t.map(function(t){let n=z(t);return n.literal||(e.static=!1),n},this),e}(e[2].replace(/\\,/g,"&comma;").split(","),t)}return t}return null}function z(t){let e=t.trim().replace(/&comma;/g,",").replace(/\\(.)/g,"$1"),n={name:e,value:"",literal:!1},s=e[0];switch("-"===s&&(s=e[1]),s>="0"&&s<="9"&&(s="#"),s){case"'":case'"':n.value=e.slice(1,-1),n.literal=!0;break;case"#":n.value=Number(e),n.literal=!0}return n.literal||(n.rootProperty=Object(i.g)(e),n.structured=Object(i.d)(e),n.structured&&(n.wildcard=".*"==e.slice(-2),n.wildcard&&(n.name=e.slice(0,-2)))),n}function B(t,e,n,s){let i=n+".splices";t.notifyPath(i,{indexSplices:s}),t.notifyPath(n+".length",e.length),t.__data[i]={indexSplices:null}}function q(t,e,n,s,i,r){B(t,e,n,[{index:s,addedCount:i,removed:r,object:e,type:"splice"}])}const Y=Object(s.a)(t=>{const e=p(Object(o.a)(t));class n extends e{constructor(){super(),this.__isPropertyEffectsClient=!0,this.__dataCounter=0,this.__dataClientsReady,this.__dataPendingClients,this.__dataToNotify,this.__dataLinkedPaths,this.__dataHasPaths,this.__dataCompoundStorage,this.__dataHost,this.__dataTemp,this.__dataClientsInitialized,this.__data,this.__dataPending,this.__dataOld,this.__computeEffects,this.__reflectEffects,this.__notifyEffects,this.__propagateEffects,this.__observeEffects,this.__readOnly,this.__templateInfo}get PROPERTY_EFFECT_TYPES(){return m}_initializeProperties(){super._initializeProperties(),$.registerHost(this),this.__dataClientsReady=!1,this.__dataPendingClients=null,this.__dataToNotify=null,this.__dataLinkedPaths=null,this.__dataHasPaths=!1,this.__dataCompoundStorage=this.__dataCompoundStorage||null,this.__dataHost=this.__dataHost||null,this.__dataTemp={},this.__dataClientsInitialized=!1}_initializeProtoProperties(t){this.__data=Object.create(t),this.__dataPending=Object.create(t),this.__dataOld={}}_initializeInstanceProperties(t){let e=this[m.READ_ONLY];for(let n in t)e&&e[n]||(this.__dataPending=this.__dataPending||{},this.__dataOld=this.__dataOld||{},this.__data[n]=this.__dataPending[n]=t[n])}_addPropertyEffect(t,e,n){this._createPropertyAccessor(t,e==m.READ_ONLY);let s=g(this,e)[t];s||(s=this[e][t]=[]),s.push(n)}_removePropertyEffect(t,e,n){let s=g(this,e)[t],i=s.indexOf(n);i>=0&&s.splice(i,1)}_hasPropertyEffect(t,e){let n=this[e];return Boolean(n&&n[t])}_hasReadOnlyEffect(t){return this._hasPropertyEffect(t,m.READ_ONLY)}_hasNotifyEffect(t){return this._hasPropertyEffect(t,m.NOTIFY)}_hasReflectEffect(t){return this._hasPropertyEffect(t,m.REFLECT)}_hasComputedEffect(t){return this._hasPropertyEffect(t,m.COMPUTE)}_setPendingPropertyOrPath(t,e,n,s){if(s||Object(i.g)(Array.isArray(t)?t[0]:t)!==t){if(!s){let n=Object(i.a)(this,t);if(!(t=Object(i.h)(this,t,e))||!super._shouldPropertyChange(t,e,n))return!1}if(this.__dataHasPaths=!0,this._setPendingProperty(t,e,n))return function(t,e,n){let s=t.__dataLinkedPaths;if(s){let r;for(let o in s){let a=s[o];Object(i.c)(o,e)?(r=Object(i.i)(o,a,e),t._setPendingPropertyOrPath(r,n,!0,!0)):Object(i.c)(a,e)&&(r=Object(i.i)(a,o,e),t._setPendingPropertyOrPath(r,n,!0,!0))}}}(this,t,e),!0}else{if(this.__dataHasAccessor&&this.__dataHasAccessor[t])return this._setPendingProperty(t,e,n);this[t]=e}return!1}_setUnmanagedPropertyToNode(t,e,n){n===t[e]&&"object"!=typeof n||(t[e]=n)}_setPendingProperty(t,e,n){let s=this.__dataHasPaths&&Object(i.d)(t),r=s?this.__dataTemp:this.__data;return!!this._shouldPropertyChange(t,e,r[t])&&(this.__dataPending||(this.__dataPending={},this.__dataOld={}),t in this.__dataOld||(this.__dataOld[t]=this.__data[t]),s?this.__dataTemp[t]=e:this.__data[t]=e,this.__dataPending[t]=e,(s||this[m.NOTIFY]&&this[m.NOTIFY][t])&&(this.__dataToNotify=this.__dataToNotify||{},this.__dataToNotify[t]=n),!0)}_setProperty(t,e){this._setPendingProperty(t,e,!0)&&this._invalidateProperties()}_invalidateProperties(){this.__dataReady&&this._flushProperties()}_enqueueClient(t){this.__dataPendingClients=this.__dataPendingClients||[],t!==this&&this.__dataPendingClients.push(t)}_flushProperties(){this.__dataCounter++,super._flushProperties(),this.__dataCounter--}_flushClients(){this.__dataClientsReady?this.__enableOrFlushClients():(this.__dataClientsReady=!0,this._readyClients(),this.__dataReady=!0)}__enableOrFlushClients(){let t=this.__dataPendingClients;if(t){this.__dataPendingClients=null;for(let e=0;e<t.length;e++){let n=t[e];n.__dataEnabled?n.__dataPending&&n._flushProperties():n._enableProperties()}}}_readyClients(){this.__enableOrFlushClients()}setProperties(t,e){for(let n in t)!e&&this[m.READ_ONLY]&&this[m.READ_ONLY][n]||this._setPendingPropertyOrPath(n,t[n],!0);this._invalidateProperties()}ready(){this._flushProperties(),this.__dataClientsReady||this._flushClients(),this.__dataPending&&this._flushProperties()}_propertiesChanged(t,e,n){let s=this.__dataHasPaths;this.__dataHasPaths=!1,function(t,e,n,s){let i=t[m.COMPUTE];if(i){let r=e;for(;v(t,i,r,n,s);)Object.assign(n,t.__dataOld),Object.assign(e,t.__dataPending),r=t.__dataPending,t.__dataPending=null}}(this,e,n,s);let i=this.__dataToNotify;this.__dataToNotify=null,this._propagatePropertyChanges(e,n,s),this._flushClients(),v(this,this[m.REFLECT],e,n,s),v(this,this[m.OBSERVE],e,n,s),i&&function(t,e,n,s,i){let r,o,a=t[m.NOTIFY],l=f++;for(let o in e)e[o]&&(a&&P(t,a,l,o,n,s,i)?r=!0:i&&x(t,o,n)&&(r=!0));r&&(o=t.__dataHost)&&o._invalidateProperties&&o._invalidateProperties()}(this,i,e,n,s),1==this.__dataCounter&&(this.__dataTemp={})}_propagatePropertyChanges(t,e,n){this[m.PROPAGATE]&&v(this,this[m.PROPAGATE],t,e,n);let s=this.__templateInfo;for(;s;)v(this,s.propertyEffects,t,e,n,s.nodeList),s=s.nextTemplateInfo}linkPaths(t,e){t=Object(i.f)(t),e=Object(i.f)(e),this.__dataLinkedPaths=this.__dataLinkedPaths||{},this.__dataLinkedPaths[t]=e}unlinkPaths(t){t=Object(i.f)(t),this.__dataLinkedPaths&&delete this.__dataLinkedPaths[t]}notifySplices(t,e){let n={path:""};B(this,Object(i.a)(this,t,n),n.path,e)}get(t,e){return Object(i.a)(e||this,t)}set(t,e,n){n?Object(i.h)(n,t,e):this[m.READ_ONLY]&&this[m.READ_ONLY][t]||this._setPendingPropertyOrPath(t,e,!0)&&this._invalidateProperties()}push(t,...e){let n={path:""},s=Object(i.a)(this,t,n),r=s.length,o=s.push(...e);return e.length&&q(this,s,n.path,r,e.length,[]),o}pop(t){let e={path:""},n=Object(i.a)(this,t,e),s=Boolean(n.length),r=n.pop();return s&&q(this,n,e.path,n.length,0,[r]),r}splice(t,e,n,...s){let r,o={path:""},a=Object(i.a)(this,t,o);return e<0?e=a.length-Math.floor(-e):e&&(e=Math.floor(e)),r=2===arguments.length?a.splice(e):a.splice(e,n,...s),(s.length||r.length)&&q(this,a,o.path,e,s.length,r),r}shift(t){let e={path:""},n=Object(i.a)(this,t,e),s=Boolean(n.length),r=n.shift();return s&&q(this,n,e.path,0,0,[r]),r}unshift(t,...e){let n={path:""},s=Object(i.a)(this,t,n),r=s.unshift(...e);return e.length&&q(this,s,n.path,0,e.length,[]),r}notifyPath(t,e){let n;if(1==arguments.length){let s={path:""};e=Object(i.a)(this,t,s),n=s.path}else n=Array.isArray(t)?Object(i.f)(t):t;this._setPendingPropertyOrPath(n,e,!0,!0)&&this._invalidateProperties()}_createReadOnlyProperty(t,e){var n;this._addPropertyEffect(t,m.READ_ONLY),e&&(this["_set"+(n=t,n[0].toUpperCase()+n.substring(1))]=function(e){this._setProperty(t,e)})}_createPropertyObserver(t,e,n){let s={property:t,method:e,dynamicFn:Boolean(n)};this._addPropertyEffect(t,m.OBSERVE,{fn:w,info:s,trigger:{name:t}}),n&&this._addPropertyEffect(e,m.OBSERVE,{fn:w,info:s,trigger:{name:e}})}_createMethodObserver(t,e){let n=H(t);if(!n)throw new Error("Malformed observer expression '"+t+"'");M(this,n,m.OBSERVE,L,null,e)}_createNotifyingProperty(t){this._addPropertyEffect(t,m.NOTIFY,{fn:S,info:{eventName:Object(r.a)(t)+"-changed",property:t}})}_createReflectedProperty(t){let e=this.constructor.attributeNameForProperty(t);"-"===e[0]?console.warn("Property "+t+" cannot be reflected to attribute "+e+' because "-" is not a valid starting attribute name. Use a lowercase first letter for the property instead.'):this._addPropertyEffect(t,m.REFLECT,{fn:E,info:{attrName:e}})}_createComputedProperty(t,e,n){let s=H(e);if(!s)throw new Error("Malformed computed expression '"+e+"'");M(this,s,m.COMPUTE,T,t,n)}_marshalArgs(t,e,n){const s=this.__data;let r=[];for(let o=0,a=t.length;o<a;o++){let a,l=t[o],c=l.name;if(l.literal?a=l.value:l.structured?void 0===(a=Object(i.a)(s,c))&&(a=n[c]):a=s[c],l.wildcard){let t=0===c.indexOf(e+"."),s=0===e.indexOf(c)&&!t;r[o]={path:s?e:c,value:s?n[e]:a,base:a}}else r[o]=a}return r}static addPropertyEffect(t,e,n){this.prototype._addPropertyEffect(t,e,n)}static createPropertyObserver(t,e,n){this.prototype._createPropertyObserver(t,e,n)}static createMethodObserver(t,e){this.prototype._createMethodObserver(t,e)}static createNotifyingProperty(t){this.prototype._createNotifyingProperty(t)}static createReadOnlyProperty(t,e){this.prototype._createReadOnlyProperty(t,e)}static createReflectedProperty(t){this.prototype._createReflectedProperty(t)}static createComputedProperty(t,e,n){this.prototype._createComputedProperty(t,e,n)}static bindTemplate(t){return this.prototype._bindTemplate(t)}_bindTemplate(t,e){let n=this.constructor._parseTemplate(t),s=this.__templateInfo==n;if(!s)for(let t in n.propertyEffects)this._createPropertyAccessor(t);if(e&&((n=Object.create(n)).wasPreBound=s,!s&&this.__templateInfo)){let t=this.__templateInfoLast||this.__templateInfo;return this.__templateInfoLast=t.nextTemplateInfo=n,n.previousTemplateInfo=t,n}return this.__templateInfo=n}static _addTemplatePropertyEffect(t,e,n){(t.hostProps=t.hostProps||{})[e]=!0;let s=t.propertyEffects=t.propertyEffects||{};(s[e]=s[e]||[]).push(n)}_stampTemplate(t){$.beginHosting(this);let e=super._stampTemplate(t);$.endHosting(this);let n=this._bindTemplate(t,!0);if(n.nodeList=e.nodeList,!n.wasPreBound){let t=n.childNodes=[];for(let n=e.firstChild;n;n=n.nextSibling)t.push(n)}return e.templateInfo=n,function(t,e){let{nodeList:n,nodeInfoList:s}=e;if(s.length)for(let e=0;e<s.length;e++){let i=s[e],r=n[e],o=i.bindings;if(o)for(let e=0;e<o.length;e++){let n=o[e];k(r,n),j(r,t,n)}r.__dataHost=t}}(this,n),this.__dataReady&&v(this,n.propertyEffects,this.__data,null,!1,n.nodeList),e}_removeBoundDom(t){let e=t.templateInfo;e.previousTemplateInfo&&(e.previousTemplateInfo.nextTemplateInfo=e.nextTemplateInfo),e.nextTemplateInfo&&(e.nextTemplateInfo.previousTemplateInfo=e.previousTemplateInfo),this.__templateInfoLast==e&&(this.__templateInfoLast=e.previousTemplateInfo),e.previousTemplateInfo=e.nextTemplateInfo=null;let n=e.childNodes;for(let t=0;t<n.length;t++){let e=n[t];e.parentNode.removeChild(e)}}static _parseTemplateNode(t,e,n){let s=super._parseTemplateNode(t,e,n);if(t.nodeType===Node.TEXT_NODE){let i=this._parseBindings(t.textContent,e);i&&(t.textContent=F(i)||" ",N(this,e,n,"text","textContent",i),s=!0)}return s}static _parseTemplateNodeAttribute(t,e,n,s,i){let o=this._parseBindings(i,e);if(o){let i=s,a="property";y.test(s)?a="attribute":"$"==s[s.length-1]&&(s=s.slice(0,-1),a="attribute");let l=F(o);return l&&"attribute"==a&&t.setAttribute(s,l),"input"===t.localName&&"value"===i&&t.setAttribute(i,""),t.removeAttribute(i),"property"===a&&(s=Object(r.b)(s)),N(this,e,n,a,s,o,l),!0}return super._parseTemplateNodeAttribute(t,e,n,s,i)}static _parseTemplateNestedTemplate(t,e,n){let s=super._parseTemplateNestedTemplate(t,e,n),i=n.templateInfo.hostProps;for(let t in i){N(this,e,n,"property","_host_"+t,[{mode:"{",source:t,dependencies:[t]}])}return s}static _parseBindings(t,e){let n,s=[],i=0;for(;null!==(n=D.exec(t));){n.index>i&&s.push({literal:t.slice(i,n.index)});let r=n[1][0],o=Boolean(n[2]),a=n[3].trim(),l=!1,c="",u=-1;"{"==r&&(u=a.indexOf("::"))>0&&(c=a.substring(u+2),a=a.substring(0,u),l=!0);let d=H(a),h=[];if(d){let{args:t,methodName:n}=d;for(let e=0;e<t.length;e++){let n=t[e];n.literal||h.push(n)}let s=e.dynamicFns;(s&&s[n]||d.static)&&(h.push(n),d.dynamicFn=!0)}else h.push(a);s.push({source:a,mode:r,negate:o,customEvent:l,signature:d,dependencies:h,event:c}),i=D.lastIndex}if(i&&i<t.length){let e=t.substring(i);e&&s.push({literal:e})}return s.length?s:null}static _evaluateBinding(t,e,n,s,r,o){let a;return a=e.signature?L(t,n,s,0,e.signature):n!=e.source?Object(i.a)(t,e.source):o&&Object(i.d)(n)?Object(i.a)(t,n):t.__data[n],e.negate&&(a=!a),a}}return b=n,n});const $=new class{constructor(){this.stack=[]}registerHost(t){this.stack.length&&this.stack[this.stack.length-1]._enqueueClient(t)}beginHosting(t){this.stack.push(t)}endHosting(t){let e=this.stack.length;e&&this.stack[e-1]==t&&this.stack.pop()}}},function(t,e,n){"use strict";n.d(e,"c",function(){return h}),n.d(e,"b",function(){return p}),n.d(e,"a",function(){return f});var s=n(24),i=n(12);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const r="link[rel=import][type~=css]",o="include",a="shady-unscoped";function l(t){return s.a.import(t)}function c(t){let e=t.body?t.body:t;const n=Object(i.b)(e.textContent,t.baseURI),s=document.createElement("style");return s.textContent=n,s}function u(t){const e=t.trim().split(/\s+/),n=[];for(let t=0;t<e.length;t++)n.push(...d(e[t]));return n}function d(t){const e=l(t);if(!e)return console.warn("Could not find style data in module named",t),[];if(void 0===e._styles){const t=[];t.push(..._(e));const n=e.querySelector("template");n&&t.push(...h(n,e.assetpath)),e._styles=t}return e._styles}function h(t,e){if(!t._styles){const n=[],s=t.content.querySelectorAll("style");for(let t=0;t<s.length;t++){let r=s[t],a=r.getAttribute(o);a&&n.push(...u(a).filter(function(t,e,n){return n.indexOf(t)===e})),e&&(r.textContent=Object(i.b)(r.textContent,e)),n.push(r)}t._styles=n}return t._styles}function p(t){let e=l(t);return e?_(e):[]}function _(t){const e=[],n=t.querySelectorAll(r);for(let t=0;t<n.length;t++){let s=n[t];if(s.import){const t=s.import,n=s.hasAttribute(a);if(n&&!t._unscopedStyle){const e=c(t);e.setAttribute(a,""),t._unscopedStyle=e}else t._style||(t._style=c(t));e.push(n?t._unscopedStyle:t._style)}}return e}function f(t){let e=t.trim().split(/\s+/),n="";for(let t=0;t<e.length;t++)n+=m(e[t]);return n}function m(t){let e=l(t);if(e&&void 0===e._cssText){let t=y(e),n=e.querySelector("template");n&&(t+=function(t,e){let n="";const s=h(t,e);for(let t=0;t<s.length;t++){let e=s[t];e.parentNode&&e.parentNode.removeChild(e),n+=e.textContent}return n}(n,e.assetpath)),e._cssText=t||null}return e||console.warn("Could not find style data in module named",t),e&&e._cssText||""}function y(t){let e="",n=_(t);for(let t=0;t<n.length;t++)e+=n[t].textContent;return e}},function(t,e,n){"use strict";n.d(e,"a",function(){return c});n(2);var s=n(12),i=n(6);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
let r={},o={};function a(t,e){r[t]=o[t.toLowerCase()]=e}function l(t){return r[t]||o[t.toLowerCase()]}class c extends HTMLElement{static get observedAttributes(){return["id"]}static import(t,e){if(t){let n=l(t);return n&&e?n.querySelector(e):n}return null}attributeChangedCallback(t,e,n,s){e!==n&&this.register()}get assetpath(){if(!this.__assetpath){const t=window.HTMLImports&&HTMLImports.importForElement?HTMLImports.importForElement(this)||document:this.ownerDocument,e=Object(s.c)(this.getAttribute("assetpath")||"",t.baseURI);this.__assetpath=Object(s.a)(e)}return this.__assetpath}register(t){if(t=t||this.id){if(i.e&&void 0!==l(t))throw a(t,null),new Error(`strictTemplatePolicy: dom-module ${t} re-registered`);this.id=t,a(t,this),(e=this).querySelector("style")&&console.warn("dom-module %s has style outside template",e.id)}var e}}c.prototype.modules=r,customElements.define("dom-module",c)},function(t,e,n){"use strict";n.d(e,"b",function(){return o}),n.d(e,"a",function(){return a});n(2);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/const s={},i=/-[a-z]/g,r=/([A-Z])/g;function o(t){return s[t]||(s[t]=t.indexOf("-")<0?t:t.replace(i,t=>t[1].toUpperCase()))}function a(t){return s[t]||(s[t]=t.replace(r,"-$1").toLowerCase())}},function(t,e,n){"use strict";n.d(e,"a",function(){return l});n(2);var s=n(4),i=n(25),r=n(27);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const o={};let a=HTMLElement.prototype;for(;a;){let t=Object.getOwnPropertyNames(a);for(let e=0;e<t.length;e++)o[t[e]]=!0;a=Object.getPrototypeOf(a)}const l=Object(s.a)(t=>{const e=Object(r.a)(t);return class extends e{static createPropertiesForAttributes(){let t=this.observedAttributes;for(let e=0;e<t.length;e++)this.prototype._createPropertyAccessor(Object(i.b)(t[e]))}static attributeNameForProperty(t){return Object(i.a)(t)}_initializeProperties(){this.__dataProto&&(this._initializeProtoProperties(this.__dataProto),this.__dataProto=null),super._initializeProperties()}_initializeProtoProperties(t){for(let e in t)this._setProperty(e,t[e])}_ensureAttribute(t,e){const n=this;n.hasAttribute(t)||this._valueToNodeAttribute(n,e,t)}_serializeValue(t){switch(typeof t){case"object":if(t instanceof Date)return t.toString();if(t)try{return JSON.stringify(t)}catch(t){return""}default:return super._serializeValue(t)}}_deserializeValue(t,e){let n;switch(e){case Object:try{n=JSON.parse(t)}catch(e){n=t}break;case Array:try{n=JSON.parse(t)}catch(e){n=null,console.warn(`Polymer::Attributes: couldn't decode Array as JSON: ${t}`)}break;case Date:n=isNaN(t)?String(t):Number(t),n=new Date(n);break;default:n=super._deserializeValue(t,e)}return n}_definePropertyAccessor(t,e){!function(t,e){if(!o[e]){let n=t[e];void 0!==n&&(t.__data?t._setPendingProperty(e,n):(t.__dataProto?t.hasOwnProperty(JSCompiler_renameProperty("__dataProto",t))||(t.__dataProto=Object.create(t.__dataProto)):t.__dataProto={},t.__dataProto[e]=n))}}(this,t),super._definePropertyAccessor(t,e)}_hasAccessor(t){return this.__dataHasAccessor&&this.__dataHasAccessor[t]}_isPropertyPending(t){return Boolean(this.__dataPending&&t in this.__dataPending)}}})},function(t,e,n){"use strict";n.d(e,"a",function(){return r});n(2);var s=n(4);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const i=n(7).a,r=Object(s.a)(t=>{return class extends t{static createProperties(t){const e=this.prototype;for(let n in t)n in e||e._createPropertyAccessor(n)}static attributeNameForProperty(t){return t.toLowerCase()}static typeForProperty(t){}_createPropertyAccessor(t,e){this._addPropertyToAttributeMap(t),this.hasOwnProperty("__dataHasAccessor")||(this.__dataHasAccessor=Object.assign({},this.__dataHasAccessor)),this.__dataHasAccessor[t]||(this.__dataHasAccessor[t]=!0,this._definePropertyAccessor(t,e))}_addPropertyToAttributeMap(t){if(this.hasOwnProperty("__dataAttributes")||(this.__dataAttributes=Object.assign({},this.__dataAttributes)),!this.__dataAttributes[t]){const e=this.constructor.attributeNameForProperty(t);this.__dataAttributes[e]=t}}_definePropertyAccessor(t,e){Object.defineProperty(this,t,{get(){return this._getProperty(t)},set:e?function(){}:function(e){this._setProperty(t,e)}})}constructor(){super(),this.__dataEnabled=!1,this.__dataReady=!1,this.__dataInvalid=!1,this.__data={},this.__dataPending=null,this.__dataOld=null,this.__dataInstanceProps=null,this.__serializing=!1,this._initializeProperties()}ready(){this.__dataReady=!0,this._flushProperties()}_initializeProperties(){for(let t in this.__dataHasAccessor)this.hasOwnProperty(t)&&(this.__dataInstanceProps=this.__dataInstanceProps||{},this.__dataInstanceProps[t]=this[t],delete this[t])}_initializeInstanceProperties(t){Object.assign(this,t)}_setProperty(t,e){this._setPendingProperty(t,e)&&this._invalidateProperties()}_getProperty(t){return this.__data[t]}_setPendingProperty(t,e,n){let s=this.__data[t],i=this._shouldPropertyChange(t,e,s);return i&&(this.__dataPending||(this.__dataPending={},this.__dataOld={}),!this.__dataOld||t in this.__dataOld||(this.__dataOld[t]=s),this.__data[t]=e,this.__dataPending[t]=e),i}_invalidateProperties(){!this.__dataInvalid&&this.__dataReady&&(this.__dataInvalid=!0,i.run(()=>{this.__dataInvalid&&(this.__dataInvalid=!1,this._flushProperties())}))}_enableProperties(){this.__dataEnabled||(this.__dataEnabled=!0,this.__dataInstanceProps&&(this._initializeInstanceProperties(this.__dataInstanceProps),this.__dataInstanceProps=null),this.ready())}_flushProperties(){const t=this.__data,e=this.__dataPending,n=this.__dataOld;this._shouldPropertiesChange(t,e,n)&&(this.__dataPending=null,this.__dataOld=null,this._propertiesChanged(t,e,n))}_shouldPropertiesChange(t,e,n){return Boolean(e)}_propertiesChanged(t,e,n){}_shouldPropertyChange(t,e,n){return n!==e&&(n==n||e==e)}attributeChangedCallback(t,e,n,s){e!==n&&this._attributeToProperty(t,n),super.attributeChangedCallback&&super.attributeChangedCallback(t,e,n,s)}_attributeToProperty(t,e,n){if(!this.__serializing){const s=this.__dataAttributes,i=s&&s[t]||t;this[i]=this._deserializeValue(e,n||this.constructor.typeForProperty(i))}}_propertyToAttribute(t,e,n){this.__serializing=!0,n=arguments.length<3?this[t]:n,this._valueToNodeAttribute(this,n,e||this.constructor.attributeNameForProperty(t)),this.__serializing=!1}_valueToNodeAttribute(t,e,n){const s=this._serializeValue(e);void 0===s?t.removeAttribute(n):t.setAttribute(n,s)}_serializeValue(t){switch(typeof t){case"boolean":return t?"":void 0;default:return null!=t?t.toString():void 0}}_deserializeValue(t,e){switch(e){case Boolean:return null!==t;case Number:return Number(t);default:return t}}}})},function(t,e,n){"use strict";n.d(e,"a",function(){return r});n(2);var s=n(4),i=n(29);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const r=Object(s.a)(t=>{return class extends t{_addEventListenerToNode(t,e,n){Object(i.a)(t,e,n)||super._addEventListenerToNode(t,e,n)}_removeEventListenerFromNode(t,e,n){Object(i.b)(t,e,n)||super._removeEventListenerFromNode(t,e,n)}}})},function(t,e,n){"use strict";n.d(e,"a",function(){return M}),n.d(e,"b",function(){return L}),n.d(e,"c",function(){return D});n(2);var s=n(7),i=n(9),r=n(6);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
let o="string"==typeof document.head.style.touchAction,a="__polymerGestures",l="__polymerGesturesHandled",c="__polymerGesturesTouchAction",u=25,d=5,h=2500,p=["mousedown","mousemove","mouseup","click"],_=[0,1,4,2],f=function(){try{return 1===new MouseEvent("test",{buttons:1}).buttons}catch(t){return!1}}();function m(t){return p.indexOf(t)>-1}let y=!1;function b(t){if(!m(t)&&"touchend"!==t)return o&&y&&r.b?{passive:!0}:void 0}!function(){try{let t=Object.defineProperty({},"passive",{get(){y=!0}});window.addEventListener("test",null,t),window.removeEventListener("test",null,t)}catch(t){}}();let g=navigator.userAgent.match(/iP(?:[oa]d|hone)|Android/);const v=[],P={button:!0,input:!0,keygen:!0,meter:!0,output:!0,textarea:!0,progress:!0,select:!0},C={button:!0,command:!0,fieldset:!0,input:!0,keygen:!0,optgroup:!0,option:!0,select:!0,textarea:!0};function w(t){let e=Array.prototype.slice.call(t.labels||[]);if(!e.length){e=[];let n=t.getRootNode();if(t.id){let s=n.querySelectorAll(`label[for = ${t.id}]`);for(let t=0;t<s.length;t++)e.push(s[t])}}return e}let x=function(t){let e=t.sourceCapabilities;var n;if((!e||e.firesTouchEvents)&&(t[l]={skip:!0},"click"===t.type)){let e=!1,s=t.composedPath&&t.composedPath();if(s)for(let t=0;t<s.length;t++){if(s[t].nodeType===Node.ELEMENT_NODE)if("label"===s[t].localName)v.push(s[t]);else if(n=s[t],P[n.localName]){let n=w(s[t]);for(let t=0;t<n.length;t++)e=e||v.indexOf(n[t])>-1}if(s[t]===E.mouse.target)return}if(e)return;t.preventDefault(),t.stopPropagation()}};function O(t){let e=g?["click"]:p;for(let n,s=0;s<e.length;s++)n=e[s],t?(v.length=0,document.addEventListener(n,x,!0)):document.removeEventListener(n,x,!0)}function S(t){let e=t.type;if(!m(e))return!1;if("mousemove"===e){let e=void 0===t.buttons?1:t.buttons;return t instanceof window.MouseEvent&&!f&&(e=_[t.which]||0),Boolean(1&e)}return 0===(void 0===t.button?0:t.button)}let E={mouse:{target:null,mouseIgnoreJob:null},touch:{x:0,y:0,id:-1,scrollDecided:!1}};function T(t,e,n){t.movefn=e,t.upfn=n,document.addEventListener("mousemove",e),document.addEventListener("mouseup",n)}function N(t){document.removeEventListener("mousemove",t.movefn),document.removeEventListener("mouseup",t.upfn),t.movefn=null,t.upfn=null}document.addEventListener("touchend",function(t){E.mouse.mouseIgnoreJob||O(!0),E.mouse.target=t.composedPath()[0],E.mouse.mouseIgnoreJob=i.a.debounce(E.mouse.mouseIgnoreJob,s.b.after(h),function(){O(),E.mouse.target=null,E.mouse.mouseIgnoreJob=null})},!!y&&{passive:!0});const A={},I=[];function k(t){if(t.composedPath){const e=t.composedPath();return e.length>0?e[0]:t.target}return t.target}function j(t){let e,n=t.type,s=t.currentTarget[a];if(!s)return;let i=s[n];if(i){if(!t[l]&&(t[l]={},"touch"===n.slice(0,5))){let e=(t=t).changedTouches[0];if("touchstart"===n&&1===t.touches.length&&(E.touch.id=e.identifier),E.touch.id!==e.identifier)return;o||"touchstart"!==n&&"touchmove"!==n||function(t){let e=t.changedTouches[0],n=t.type;if("touchstart"===n)E.touch.x=e.clientX,E.touch.y=e.clientY,E.touch.scrollDecided=!1;else if("touchmove"===n){if(E.touch.scrollDecided)return;E.touch.scrollDecided=!0;let n=function(t){let e="auto",n=t.composedPath&&t.composedPath();if(n)for(let t,s=0;s<n.length;s++)if((t=n[s])[c]){e=t[c];break}return e}(t),s=!1,i=Math.abs(E.touch.x-e.clientX),r=Math.abs(E.touch.y-e.clientY);t.cancelable&&("none"===n?s=!0:"pan-x"===n?s=r>i:"pan-y"===n&&(s=i>r)),s?t.preventDefault():H("track")}}(t)}if(!(e=t[l]).skip){for(let n,s=0;s<I.length;s++)i[(n=I[s]).name]&&!e[n.name]&&n.flow&&n.flow.start.indexOf(t.type)>-1&&n.reset&&n.reset();for(let s,r=0;r<I.length;r++)i[(s=I[r]).name]&&!e[s.name]&&(e[s.name]=!0,s[n](t))}}}function M(t,e,n){return!!A[e]&&(function(t,e,n){let s=A[e],i=s.deps,r=s.name,o=t[a];o||(t[a]=o={});for(let e,n,s=0;s<i.length;s++)e=i[s],g&&m(e)&&"click"!==e||((n=o[e])||(o[e]=n={_count:0}),0===n._count&&t.addEventListener(e,j,b(e)),n[r]=(n[r]||0)+1,n._count=(n._count||0)+1);t.addEventListener(e,n),s.touchAction&&D(t,s.touchAction)}(t,e,n),!0)}function L(t,e,n){return!!A[e]&&(function(t,e,n){let s=A[e],i=s.deps,r=s.name,o=t[a];if(o)for(let e,n,s=0;s<i.length;s++)e=i[s],(n=o[e])&&n[r]&&(n[r]=(n[r]||1)-1,n._count=(n._count||1)-1,0===n._count&&t.removeEventListener(e,j,b(e)));t.removeEventListener(e,n)}(t,e,n),!0)}function R(t){I.push(t);for(let e=0;e<t.emits.length;e++)A[t.emits[e]]=t}function D(t,e){o&&t instanceof HTMLElement&&s.a.run(()=>{t.style.touchAction=e}),t[c]=e}function F(t,e,n){let s=new Event(e,{bubbles:!0,cancelable:!0,composed:!0});if(s.detail=n,t.dispatchEvent(s),s.defaultPrevented){let t=n.preventer||n.sourceEvent;t&&t.preventDefault&&t.preventDefault()}}function H(t){let e=function(t){for(let e,n=0;n<I.length;n++){e=I[n];for(let n,s=0;s<e.emits.length;s++)if((n=e.emits[s])===t)return e}return null}(t);e.info&&(e.info.prevent=!0)}function z(t,e,n,s){e&&F(e,t,{x:n.clientX,y:n.clientY,sourceEvent:n,preventer:s,prevent:function(t){return H(t)}})}function B(t,e,n){if(t.prevent)return!1;if(t.started)return!0;let s=Math.abs(t.x-e),i=Math.abs(t.y-n);return s>=d||i>=d}function q(t,e,n){if(!e)return;let s,i=t.moves[t.moves.length-2],r=t.moves[t.moves.length-1],o=r.x-t.x,a=r.y-t.y,l=0;i&&(s=r.x-i.x,l=r.y-i.y),F(e,"track",{state:t.state,x:n.clientX,y:n.clientY,dx:o,dy:a,ddx:s,ddy:l,sourceEvent:n,hover:function(){return function(t,e){let n=document.elementFromPoint(t,e),s=n;for(;s&&s.shadowRoot&&!window.ShadyDOM&&s!==(s=s.shadowRoot.elementFromPoint(t,e));)s&&(n=s);return n}(n.clientX,n.clientY)}})}function Y(t,e,n){let s=Math.abs(e.clientX-t.x),i=Math.abs(e.clientY-t.y),r=k(n||e);!r||C[r.localName]&&r.hasAttribute("disabled")||(isNaN(s)||isNaN(i)||s<=u&&i<=u||function(t){if("click"===t.type){if(0===t.detail)return!0;let e=k(t);if(!e.nodeType||e.nodeType!==Node.ELEMENT_NODE)return!0;let n=e.getBoundingClientRect(),s=t.pageX,i=t.pageY;return!(s>=n.left&&s<=n.right&&i>=n.top&&i<=n.bottom)}return!1}(e))&&(t.prevent||F(r,"tap",{x:e.clientX,y:e.clientY,sourceEvent:e,preventer:n}))}R({name:"downup",deps:["mousedown","touchstart","touchend"],flow:{start:["mousedown","touchstart"],end:["mouseup","touchend"]},emits:["down","up"],info:{movefn:null,upfn:null},reset:function(){N(this.info)},mousedown:function(t){if(!S(t))return;let e=k(t),n=this;T(this.info,function(t){S(t)||(z("up",e,t),N(n.info))},function(t){S(t)&&z("up",e,t),N(n.info)}),z("down",e,t)},touchstart:function(t){z("down",k(t),t.changedTouches[0],t)},touchend:function(t){z("up",k(t),t.changedTouches[0],t)}}),R({name:"track",touchAction:"none",deps:["mousedown","touchstart","touchmove","touchend"],flow:{start:["mousedown","touchstart"],end:["mouseup","touchend"]},emits:["track"],info:{x:0,y:0,state:"start",started:!1,moves:[],addMove:function(t){this.moves.length>2&&this.moves.shift(),this.moves.push(t)},movefn:null,upfn:null,prevent:!1},reset:function(){this.info.state="start",this.info.started=!1,this.info.moves=[],this.info.x=0,this.info.y=0,this.info.prevent=!1,N(this.info)},mousedown:function(t){if(!S(t))return;let e=k(t),n=this,s=function(t){let s=t.clientX,i=t.clientY;B(n.info,s,i)&&(n.info.state=n.info.started?"mouseup"===t.type?"end":"track":"start","start"===n.info.state&&H("tap"),n.info.addMove({x:s,y:i}),S(t)||(n.info.state="end",N(n.info)),e&&q(n.info,e,t),n.info.started=!0)};T(this.info,s,function(t){n.info.started&&s(t),N(n.info)}),this.info.x=t.clientX,this.info.y=t.clientY},touchstart:function(t){let e=t.changedTouches[0];this.info.x=e.clientX,this.info.y=e.clientY},touchmove:function(t){let e=k(t),n=t.changedTouches[0],s=n.clientX,i=n.clientY;B(this.info,s,i)&&("start"===this.info.state&&H("tap"),this.info.addMove({x:s,y:i}),q(this.info,e,n),this.info.state="track",this.info.started=!0)},touchend:function(t){let e=k(t),n=t.changedTouches[0];this.info.started&&(this.info.state="end",this.info.addMove({x:n.clientX,y:n.clientY}),q(this.info,e,n))}}),R({name:"tap",deps:["mousedown","click","touchstart","touchend"],flow:{start:["mousedown","touchstart"],end:["click","touchend"]},emits:["tap"],info:{x:NaN,y:NaN,prevent:!1},reset:function(){this.info.x=NaN,this.info.y=NaN,this.info.prevent=!1},mousedown:function(t){S(t)&&(this.info.x=t.clientX,this.info.y=t.clientY)},click:function(t){S(t)&&Y(this.info,t)},touchstart:function(t){const e=t.changedTouches[0];this.info.x=e.clientX,this.info.y=e.clientY},touchend:function(t){Y(this.info,t.changedTouches[0],t)}})},function(t,e,n){"use strict";n.d(e,"a",function(){return c});n(2);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/function s(t,e,n){return{index:t,removed:e,addedCount:n}}const i=0,r=1,o=2,a=3;function l(t,e,n,l,c,d){let h,p=0,_=0,f=Math.min(n-e,d-c);if(0==e&&0==c&&(p=function(t,e,n){for(let s=0;s<n;s++)if(!u(t[s],e[s]))return s;return n}(t,l,f)),n==t.length&&d==l.length&&(_=function(t,e,n){let s=t.length,i=e.length,r=0;for(;r<n&&u(t[--s],e[--i]);)r++;return r}(t,l,f-p)),c+=p,d-=_,(n-=_)-(e+=p)==0&&d-c==0)return[];if(e==n){for(h=s(e,[],0);c<d;)h.removed.push(l[c++]);return[h]}if(c==d)return[s(e,[],n-e)];let m=function(t){let e=t.length-1,n=t[0].length-1,s=t[e][n],l=[];for(;e>0||n>0;){if(0==e){l.push(o),n--;continue}if(0==n){l.push(a),e--;continue}let c,u=t[e-1][n-1],d=t[e-1][n],h=t[e][n-1];(c=d<h?d<u?d:u:h<u?h:u)==u?(u==s?l.push(i):(l.push(r),s=u),e--,n--):c==d?(l.push(a),e--,s=d):(l.push(o),n--,s=h)}return l.reverse(),l}(function(t,e,n,s,i,r){let o=r-i+1,a=n-e+1,l=new Array(o);for(let t=0;t<o;t++)l[t]=new Array(a),l[t][0]=t;for(let t=0;t<a;t++)l[0][t]=t;for(let n=1;n<o;n++)for(let r=1;r<a;r++)if(u(t[e+r-1],s[i+n-1]))l[n][r]=l[n-1][r-1];else{let t=l[n-1][r]+1,e=l[n][r-1]+1;l[n][r]=t<e?t:e}return l}(t,e,n,l,c,d));h=void 0;let y=[],b=e,g=c;for(let t=0;t<m.length;t++)switch(m[t]){case i:h&&(y.push(h),h=void 0),b++,g++;break;case r:h||(h=s(b,[],0)),h.addedCount++,b++,h.removed.push(l[g]),g++;break;case o:h||(h=s(b,[],0)),h.addedCount++,b++;break;case a:h||(h=s(b,[],0)),h.removed.push(l[g]),g++}return h&&y.push(h),y}function c(t,e){return l(t,0,t.length,e,0,e.length)}function u(t,e){return t===e}},function(t,e,n){"use strict";var s=n(17);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/class i{constructor(){this.start=0,this.end=0,this.previous=null,this.parent=null,this.rules=null,this.parsedCssText="",this.cssText="",this.atRule=!1,this.type=0,this.keyframesName="",this.selector="",this.parsedSelector=""}}function r(t){return function t(e,n){let s=n.substring(e.start,e.end-1);e.parsedCssText=e.cssText=s.trim();if(e.parent){let t=e.previous?e.previous.end:e.parent.start;s=(s=(s=function(t){return t.replace(/\\([0-9a-f]{1,6})\s/gi,function(){let t=arguments[1],e=6-t.length;for(;e--;)t="0"+t;return"\\"+t})}(s=n.substring(t,e.start-1))).replace(u.multipleSpaces," ")).substring(s.lastIndexOf(";")+1);let i=e.parsedSelector=e.selector=s.trim();e.atRule=0===i.indexOf(p),e.atRule?0===i.indexOf(h)?e.type=a.MEDIA_RULE:i.match(u.keyframesRule)&&(e.type=a.KEYFRAMES_RULE,e.keyframesName=e.selector.split(u.multipleSpaces).pop()):0===i.indexOf(d)?e.type=a.MIXIN_RULE:e.type=a.STYLE_RULE}let i=e.rules;if(i)for(let e,s=0,r=i.length;s<r&&(e=i[s]);s++)t(e,n);return e}(function(t){let e=new i;e.start=0,e.end=t.length;let n=e;for(let s=0,r=t.length;s<r;s++)if(t[s]===l){n.rules||(n.rules=[]);let t=n,e=t.rules[t.rules.length-1]||null;(n=new i).start=s+1,n.parent=t,n.previous=e,t.rules.push(n)}else t[s]===c&&(n.end=s+1,n=n.parent||e);return e}(t=t.replace(u.comments,"").replace(u.port,"")),t)}function o(t,e,n=""){let s="";if(t.cssText||t.rules){let n=t.rules;if(n&&!function(t){let e=t[0];return Boolean(e)&&Boolean(e.selector)&&0===e.selector.indexOf(d)}(n))for(let t,i=0,r=n.length;i<r&&(t=n[i]);i++)s=o(t,e,s);else(s=(s=e?t.cssText:function(t){return function(t){return t.replace(u.mixinApply,"").replace(u.varApply,"")}(t=function(t){return t.replace(u.customProp,"").replace(u.mixinProp,"")}(t))}(t.cssText)).trim())&&(s="  "+s+"\n")}return s&&(t.selector&&(n+=t.selector+" "+l+"\n"),n+=s,t.selector&&(n+=c+"\n\n")),n}const a={STYLE_RULE:1,KEYFRAMES_RULE:7,MEDIA_RULE:4,MIXIN_RULE:1e3},l="{",c="}",u={comments:/\/\*[^*]*\*+([^\/*][^*]*\*+)*\//gim,port:/@import[^;]*;/gim,customProp:/(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?(?:[;\n]|$)/gim,mixinProp:/(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?{[^}]*?}(?:[;\n]|$)?/gim,mixinApply:/@apply\s*\(?[^);]*\)?\s*(?:[;\n]|$)?/gim,varApply:/[^;:]*?:[^;]*?var\([^;]*\)(?:[;\n]|$)?/gim,keyframesRule:/^@[^\s]*keyframes/,multipleSpaces:/\s+/g},d="--",h="@media",p="@";var _=n(18);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/const f=new Set,m="shady-unscoped";function y(t){const e=t.textContent;if(!f.has(e)){f.add(e);const n=t.cloneNode(!0);document.head.appendChild(n)}}function b(t){return t.hasAttribute(m)}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/function g(t,e){return t?("string"==typeof t&&(t=r(t)),e&&P(t,e),o(t,s.b)):""}function v(t){return!t.__cssRules&&t.textContent&&(t.__cssRules=r(t.textContent)),t.__cssRules||null}function P(t,e,n,s){if(!t)return;let i=!1,r=t.type;if(s&&r===a.MEDIA_RULE){let e=t.selector.match(_.a);e&&(window.matchMedia(e[1]).matches||(i=!0))}r===a.STYLE_RULE?e(t):n&&r===a.KEYFRAMES_RULE?n(t):r===a.MIXIN_RULE&&(i=!0);let o=t.rules;if(o&&!i)for(let t,i=0,r=o.length;i<r&&(t=o[i]);i++)P(t,e,n,s)}function C(t,e){let n=0;for(let s=e,i=t.length;s<i;s++)if("("===t[s])n++;else if(")"===t[s]&&0==--n)return s;return-1}window.ShadyDOM&&window.ShadyDOM.wrap;const w="css-build";function x(t){if(void 0!==s.a)return s.a;if(void 0===t.__cssBuild){const e=t.getAttribute(w);if(e)t.__cssBuild=e;else{const e=function(t){const e="template"===t.localName?t.content.firstChild:t.firstChild;if(e instanceof Comment){const t=e.textContent.trim().split(":");if(t[0]===w)return t[1]}return""}(t);""!==e&&function(t){const e="template"===t.localName?t.content.firstChild:t.firstChild;e.parentNode.removeChild(e)}(t),t.__cssBuild=e}}return t.__cssBuild||""}function O(t){return""!==x(t)}var S=n(19);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/const E=/;\s*/m,T=/^\s*(initial)|(inherit)\s*$/,N=/\s*!important/,A="_-_";class I{constructor(){this._map={}}set(t,e){t=t.trim(),this._map[t]={properties:e,dependants:{}}}get(t){return t=t.trim(),this._map[t]||null}}let k=null;class j{constructor(){this._currentElement=null,this._measureElement=null,this._map=new I}detectMixin(t){return Object(S.a)(t)}gatherStyles(t){const e=function(t){const e=[],n=t.querySelectorAll("style");for(let t=0;t<n.length;t++){const i=n[t];b(i)?s.c||(y(i),i.parentNode.removeChild(i)):(e.push(i.textContent),i.parentNode.removeChild(i))}return e.join("").trim()}(t.content);if(e){const n=document.createElement("style");return n.textContent=e,t.content.insertBefore(n,t.content.firstChild),n}return null}transformTemplate(t,e){void 0===t._gatheredStyle&&(t._gatheredStyle=this.gatherStyles(t));const n=t._gatheredStyle;return n?this.transformStyle(n,e):null}transformStyle(t,e=""){let n=v(t);return this.transformRules(n,e),t.textContent=g(n),n}transformCustomStyle(t){let e=v(t);return P(e,t=>{":root"===t.selector&&(t.selector="html"),this.transformRule(t)}),t.textContent=g(e),e}transformRules(t,e){this._currentElement=e,P(t,t=>{this.transformRule(t)}),this._currentElement=null}transformRule(t){t.cssText=this.transformCssText(t.parsedCssText,t),":root"===t.selector&&(t.selector=":host > *")}transformCssText(t,e){return t=t.replace(_.c,(t,n,s,i)=>this._produceCssProperties(t,n,s,i,e)),this._consumeCssProperties(t,e)}_getInitialValueForProperty(t){return this._measureElement||(this._measureElement=document.createElement("meta"),this._measureElement.setAttribute("apply-shim-measure",""),this._measureElement.style.all="initial",document.head.appendChild(this._measureElement)),window.getComputedStyle(this._measureElement).getPropertyValue(t)}_fallbacksFromPreviousRules(t){let e=t;for(;e.parent;)e=e.parent;const n={};let s=!1;return P(e,e=>{(s=s||e===t)||e.selector===t.selector&&Object.assign(n,this._cssTextToMap(e.parsedCssText))}),n}_consumeCssProperties(t,e){let n=null;for(;n=_.b.exec(t);){let s=n[0],i=n[1],r=n.index,o=r+s.indexOf("@apply"),a=r+s.length,l=t.slice(0,o),c=t.slice(a),u=e?this._fallbacksFromPreviousRules(e):{};Object.assign(u,this._cssTextToMap(l));let d=this._atApplyToCssProperties(i,u);t=`${l}${d}${c}`,_.b.lastIndex=r+d.length}return t}_atApplyToCssProperties(t,e){t=t.replace(E,"");let n=[],s=this._map.get(t);if(s||(this._map.set(t,{}),s=this._map.get(t)),s){let i,r,o;this._currentElement&&(s.dependants[this._currentElement]=!0);const a=s.properties;for(i in a)o=e&&e[i],r=[i,": var(",t,A,i],o&&r.push(",",o.replace(N,"")),r.push(")"),N.test(a[i])&&r.push(" !important"),n.push(r.join(""))}return n.join("; ")}_replaceInitialOrInherit(t,e){let n=T.exec(e);return n&&(e=n[1]?this._getInitialValueForProperty(t):"apply-shim-inherit"),e}_cssTextToMap(t,e=!1){let n,s,i=t.split(";"),r={};for(let t,o,a=0;a<i.length;a++)(t=i[a])&&(o=t.split(":")).length>1&&(n=o[0].trim(),s=o.slice(1).join(":"),e&&(s=this._replaceInitialOrInherit(n,s)),r[n]=s);return r}_invalidateMixinEntry(t){if(k)for(let e in t.dependants)e!==this._currentElement&&k(e)}_produceCssProperties(t,e,n,s,i){if(n&&function t(e,n){let s=e.indexOf("var(");if(-1===s)return n(e,"","","");let i=C(e,s+3),r=e.substring(s+4,i),o=e.substring(0,s),a=t(e.substring(i+1),n),l=r.indexOf(",");return-1===l?n(o,r.trim(),"",a):n(o,r.substring(0,l).trim(),r.substring(l+1).trim(),a)}(n,(t,e)=>{e&&this._map.get(e)&&(s=`@apply ${e};`)}),!s)return t;let r=this._consumeCssProperties(""+s,i),o=t.slice(0,t.indexOf("--")),a=this._cssTextToMap(r,!0),l=a,c=this._map.get(e),u=c&&c.properties;u?l=Object.assign(Object.create(u),a):this._map.set(e,l);let d,h,p=[],_=!1;for(d in l)void 0===(h=a[d])&&(h="initial"),!u||d in u||(_=!0),p.push(`${e}${A}${d}: ${h}`);return _&&this._invalidateMixinEntry(c),c&&(c.properties=l),n&&(o=`${t};${o}`),`${o}${p.join("; ")};`}}j.prototype.detectMixin=j.prototype.detectMixin,j.prototype.transformStyle=j.prototype.transformStyle,j.prototype.transformCustomStyle=j.prototype.transformCustomStyle,j.prototype.transformRules=j.prototype.transformRules,j.prototype.transformRule=j.prototype.transformRule,j.prototype.transformTemplate=j.prototype.transformTemplate,j.prototype._separator=A,Object.defineProperty(j.prototype,"invalidCallback",{get:()=>k,set(t){k=t}});var M=j;
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/var L={};
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/const R="_applyShimCurrentVersion",D="_applyShimNextVersion",F="_applyShimValidatingVersion",H=Promise.resolve();function z(t){let e=L[t];e&&function(t){t[R]=t[R]||0,t[F]=t[F]||0,t[D]=(t[D]||0)+1}(e)}function B(t){return t[R]===t[D]}function q(t){return!B(t)&&t[F]===t[D]}function Y(t){t[F]=t[D],t._validating||(t._validating=!0,H.then(function(){t[R]=t[D],t._validating=!1}))}n(32);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/const $=new M;class V{constructor(){this.customStyleInterface=null,$.invalidCallback=z}ensure(){this.customStyleInterface||window.ShadyCSS.CustomStyleInterface&&(this.customStyleInterface=window.ShadyCSS.CustomStyleInterface,this.customStyleInterface.transformCallback=(t=>{$.transformCustomStyle(t)}),this.customStyleInterface.validateCallback=(()=>{requestAnimationFrame(()=>{this.customStyleInterface.enqueued&&this.flushCustomStyles()})}))}prepareTemplate(t,e){if(this.ensure(),O(t))return;L[e]=t;let n=$.transformTemplate(t,e);t._styleAst=n}flushCustomStyles(){if(this.ensure(),!this.customStyleInterface)return;let t=this.customStyleInterface.processStyles();if(this.customStyleInterface.enqueued){for(let e=0;e<t.length;e++){let n=t[e],s=this.customStyleInterface.getStyleForCustomStyle(n);s&&$.transformCustomStyle(s)}this.customStyleInterface.enqueued=!1}}styleSubtree(t,e){if(this.ensure(),e&&Object(S.c)(t,e),t.shadowRoot){this.styleElement(t);let e=t.shadowRoot.children||t.shadowRoot.childNodes;for(let t=0;t<e.length;t++)this.styleSubtree(e[t])}else{let e=t.children||t.childNodes;for(let t=0;t<e.length;t++)this.styleSubtree(e[t])}}styleElement(t){this.ensure();let{is:e}=function(t){let e=t.localName,n="",s="";return e?e.indexOf("-")>-1?n=e:(s=e,n=t.getAttribute&&t.getAttribute("is")||""):(n=t.is,s=t.extends),{is:n,typeExtension:s}}(t),n=L[e];if((!n||!O(n))&&n&&!B(n)){q(n)||(this.prepareTemplate(n,e),Y(n));let s=t.shadowRoot;if(s){let t=s.querySelector("style");t&&(t.__cssRules=n._styleAst,t.textContent=g(n._styleAst))}}}styleDocument(t){this.ensure(),this.styleSubtree(document.body,t)}}if(!window.ShadyCSS||!window.ShadyCSS.ScopingShim){const t=new V;let e=window.ShadyCSS&&window.ShadyCSS.CustomStyleInterface;window.ShadyCSS={prepareTemplate(e,n,s){t.flushCustomStyles(),t.prepareTemplate(e,n)},prepareTemplateStyles(t,e,n){window.ShadyCSS.prepareTemplate(t,e,n)},prepareTemplateDom(t,e){},styleSubtree(e,n){t.flushCustomStyles(),t.styleSubtree(e,n)},styleElement(e){t.flushCustomStyles(),t.styleElement(e)},styleDocument(e){t.flushCustomStyles(),t.styleDocument(e)},getComputedStyleValue:(t,e)=>Object(S.b)(t,e),flushCustomStyles(){t.flushCustomStyles()},nativeCss:s.b,nativeShadow:s.c,cssBuild:s.a},e&&(window.ShadyCSS.CustomStyleInterface=e)}window.ShadyCSS.ApplyShim=$;var U=n(16),J=n(28),X=n(26),W=n(4);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const G=/:host\(:dir\((ltr|rtl)\)\)/g,Z=':host([dir="$1"])',K=/([\s\w-#\.\[\]\*]*):dir\((ltr|rtl)\)/g,Q=':host([dir="$2"]) $1',tt=[];let et=null,nt="";function st(){nt=document.documentElement.getAttribute("dir")}function it(t){if(!t.__autoDirOptOut){t.setAttribute("dir",nt)}}function rt(){st(),nt=document.documentElement.getAttribute("dir");for(let t=0;t<tt.length;t++)it(tt[t])}const ot=Object(W.a)(t=>{et||(st(),(et=new MutationObserver(rt)).observe(document.documentElement,{attributes:!0,attributeFilter:["dir"]}));const e=Object(X.a)(t);class n extends e{static _processStyleText(t,e){return t=super._processStyleText(t,e),t=this._replaceDirInCssText(t)}static _replaceDirInCssText(t){let e=t;return t!==(e=(e=e.replace(G,Z)).replace(K,Q))&&(this.__activateDir=!0),e}constructor(){super(),this.__autoDirOptOut=!1}ready(){super.ready(),this.__autoDirOptOut=this.hasAttribute("dir")}connectedCallback(){e.prototype.connectedCallback&&super.connectedCallback(),this.constructor.__activateDir&&(et&&et.takeRecords().length&&rt(),tt.push(this),it(this))}disconnectedCallback(){if(e.prototype.disconnectedCallback&&super.disconnectedCallback(),this.constructor.__activateDir){const t=tt.indexOf(this);t>-1&&tt.splice(t,1)}}}return n.__activateDir=!1,n});n(2);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
function at(){document.body.removeAttribute("unresolved")}"interactive"===document.readyState||"complete"===document.readyState?at():window.addEventListener("DOMContentLoaded",at);var lt=n(8),ct=n(29),ut=n(9),dt=n(7),ht=n(15);n.d(e,"a",function(){return _t});
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
let pt=window.ShadyCSS;const _t=Object(W.a)(t=>{const e=ot(Object(J.a)(Object(U.a)(t))),n={x:"pan-x",y:"pan-y",none:"none",all:"auto"};class s extends e{constructor(){super(),this.isAttached,this.__boundListeners,this._debouncers,this._applyListeners()}static get importMeta(){return this.prototype.importMeta}created(){}connectedCallback(){super.connectedCallback(),this.isAttached=!0,this.attached()}attached(){}disconnectedCallback(){super.disconnectedCallback(),this.isAttached=!1,this.detached()}detached(){}attributeChangedCallback(t,e,n,s){e!==n&&(super.attributeChangedCallback(t,e,n,s),this.attributeChanged(t,e,n))}attributeChanged(t,e,n){}_initializeProperties(){let t=Object.getPrototypeOf(this);t.hasOwnProperty("__hasRegisterFinished")||(t.__hasRegisterFinished=!0,this._registered()),super._initializeProperties(),this.root=this,this.created()}_registered(){}ready(){this._ensureAttributes(),super.ready()}_ensureAttributes(){}_applyListeners(){}serialize(t){return this._serializeValue(t)}deserialize(t,e){return this._deserializeValue(t,e)}reflectPropertyToAttribute(t,e,n){this._propertyToAttribute(t,e,n)}serializeValueToAttribute(t,e,n){this._valueToNodeAttribute(n||this,t,e)}extend(t,e){if(!t||!e)return t||e;let n=Object.getOwnPropertyNames(e);for(let s,i=0;i<n.length&&(s=n[i]);i++){let n=Object.getOwnPropertyDescriptor(e,s);n&&Object.defineProperty(t,s,n)}return t}mixin(t,e){for(let n in e)t[n]=e[n];return t}chainObject(t,e){return t&&e&&t!==e&&(t.__proto__=e),t}instanceTemplate(t){let e=this.constructor._contentForTemplate(t);return document.importNode(e,!0)}fire(t,e,n){n=n||{},e=null==e?{}:e;let s=new Event(t,{bubbles:void 0===n.bubbles||n.bubbles,cancelable:Boolean(n.cancelable),composed:void 0===n.composed||n.composed});return s.detail=e,(n.node||this).dispatchEvent(s),s}listen(t,e,n){t=t||this;let s=this.__boundListeners||(this.__boundListeners=new WeakMap),i=s.get(t);i||(i={},s.set(t,i));let r=e+n;i[r]||(i[r]=this._addMethodEventListenerToNode(t,e,n,this))}unlisten(t,e,n){t=t||this;let s=this.__boundListeners&&this.__boundListeners.get(t),i=e+n,r=s&&s[i];r&&(this._removeEventListenerFromNode(t,e,r),s[i]=null)}setScrollDirection(t,e){Object(ct.c)(e||this,n[t]||"auto")}$$(t){return this.root.querySelector(t)}get domHost(){let t=this.getRootNode();return t instanceof DocumentFragment?t.host:t}distributeContent(){window.ShadyDOM&&this.shadowRoot&&ShadyDOM.flush()}getEffectiveChildNodes(){return Object(lt.a)(this).getEffectiveChildNodes()}queryDistributedElements(t){return Object(lt.a)(this).queryDistributedElements(t)}getEffectiveChildren(){return this.getEffectiveChildNodes().filter(function(t){return t.nodeType===Node.ELEMENT_NODE})}getEffectiveTextContent(){let t=this.getEffectiveChildNodes(),e=[];for(let n,s=0;n=t[s];s++)n.nodeType!==Node.COMMENT_NODE&&e.push(n.textContent);return e.join("")}queryEffectiveChildren(t){let e=this.queryDistributedElements(t);return e&&e[0]}queryAllEffectiveChildren(t){return this.queryDistributedElements(t)}getContentChildNodes(t){let e=this.root.querySelector(t||"slot");return e?Object(lt.a)(e).getDistributedNodes():[]}getContentChildren(t){return this.getContentChildNodes(t).filter(function(t){return t.nodeType===Node.ELEMENT_NODE})}isLightDescendant(t){return this!==t&&this.contains(t)&&this.getRootNode()===t.getRootNode()}isLocalDescendant(t){return this.root===t.getRootNode()}scopeSubtree(t,e){}getComputedStyleValue(t){return pt.getComputedStyleValue(this,t)}debounce(t,e,n){return this._debouncers=this._debouncers||{},this._debouncers[t]=ut.a.debounce(this._debouncers[t],n>0?dt.b.after(n):dt.a,e.bind(this))}isDebouncerActive(t){this._debouncers=this._debouncers||{};let e=this._debouncers[t];return!(!e||!e.isActive())}flushDebouncer(t){this._debouncers=this._debouncers||{};let e=this._debouncers[t];e&&e.flush()}cancelDebouncer(t){this._debouncers=this._debouncers||{};let e=this._debouncers[t];e&&e.cancel()}async(t,e){return e>0?dt.b.run(t.bind(this),e):~dt.a.run(t.bind(this))}cancelAsync(t){t<0?dt.a.cancel(~t):dt.b.cancel(t)}create(t,e){let n=document.createElement(t);if(e)if(n.setProperties)n.setProperties(e);else for(let t in e)n[t]=e[t];return n}elementMatches(t,e){return Object(lt.b)(e||this,t)}toggleAttribute(t,e){let n=this;return 3===arguments.length&&(n=arguments[2]),1==arguments.length&&(e=!n.hasAttribute(t)),e?(n.setAttribute(t,""),!0):(n.removeAttribute(t),!1)}toggleClass(t,e,n){n=n||this,1==arguments.length&&(e=!n.classList.contains(t)),e?n.classList.add(t):n.classList.remove(t)}transform(t,e){(e=e||this).style.webkitTransform=t,e.style.transform=t}translate3d(t,e,n,s){s=s||this,this.transform("translate3d("+t+","+e+","+n+")",s)}arrayDelete(t,e){let n;if(Array.isArray(t)){if((n=t.indexOf(e))>=0)return t.splice(n,1)}else{if((n=Object(ht.a)(this,t).indexOf(e))>=0)return this.splice(t,n,1)}return null}_logger(t,e){switch(Array.isArray(e)&&1===e.length&&Array.isArray(e[0])&&(e=e[0]),t){case"log":case"warn":case"error":console[t](...e)}}_log(...t){this._logger("log",t)}_warn(...t){this._logger("warn",t)}_error(...t){this._logger("error",t)}_logf(t,...e){return["[%s::%s]",this.is,t,...e]}}return s.prototype.is="",s})},function(t,e,n){"use strict";
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/let s,i=null,r=window.HTMLImports&&window.HTMLImports.whenReady||null;function o(t){requestAnimationFrame(function(){r?r(t):(i||(i=new Promise(t=>{s=t}),"complete"===document.readyState?s():document.addEventListener("readystatechange",()=>{"complete"===document.readyState&&s()})),i.then(function(){t&&t()}))})}n.d(e,"a",function(){return d});const a="__seenByShadyCSS",l="__shadyCSSCachedStyle";let c=null,u=null;class d{constructor(){this.customStyles=[],this.enqueued=!1,o(()=>{window.ShadyCSS.flushCustomStyles&&window.ShadyCSS.flushCustomStyles()})}enqueueDocumentValidation(){!this.enqueued&&u&&(this.enqueued=!0,o(u))}addCustomStyle(t){t[a]||(t[a]=!0,this.customStyles.push(t),this.enqueueDocumentValidation())}getStyleForCustomStyle(t){if(t[l])return t[l];let e;return e=t.getStyle?t.getStyle():t}processStyles(){const t=this.customStyles;for(let e=0;e<t.length;e++){const n=t[e];if(n[l])continue;const s=this.getStyleForCustomStyle(n);if(s){const t=s.__appliedElement||s;c&&c(t),n[l]=t}}return t}}d.prototype.addCustomStyle=d.prototype.addCustomStyle,d.prototype.getStyleForCustomStyle=d.prototype.getStyleForCustomStyle,d.prototype.processStyles=d.prototype.processStyles,Object.defineProperties(d.prototype,{transformCallback:{get:()=>c,set(t){c=t}},validateCallback:{get:()=>u,set(t){let e=!1;u||(e=!0),u=t,e&&this.enqueueDocumentValidation()}}})}]]);