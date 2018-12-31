/*! Built with http://stenciljs.com */
SimpleButton.loadBundle("wkd3xmkf",["exports"],function(e){var t=window.SimpleButton.h,n=function(){function e(){var e=this;this.type="basic",this.color="plain",this.ripples=[],this.handleClick=function(n){var o,r=e.buttonEl,i=r.offsetWidth,l=r.offsetHeight;e.ripples=e.ripples.concat([t("span",{class:"ripple",style:{width:(o=i>l?i:l)+"px",height:o+"px",top:n.pageY-r.offsetTop-o/2+"px",left:n.pageX-r.offsetLeft-o/2+"px"}})])}}return e.prototype.render=function(){return t("button",{class:this.type+" "+this.color,onMouseDown:this.handleClick},this.ripples,t("slot",null))},Object.defineProperty(e,"is",{get:function(){return"simple-button"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{buttonEl:{elementRef:!0},color:{type:String,attr:"color"},ripples:{state:!0},type:{type:String,attr:"type"}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return"button.sc-simple-button{border:none;cursor:pointer;border-radius:2px;padding:8px;width:88px;outline:0;font-weight:500;font-family:Roboto,sans-serif;font-size:14px;position:relative;overflow:hidden}.basic.sc-simple-button{background-color:transparent;-webkit-transition:background-color .1s ease-in-out;transition:background-color .1s ease-in-out}.basic.sc-simple-button:hover{background-color:#dfdfdf}.basic.plain.sc-simple-button{color:#1a1a1a}.basic.primary.sc-simple-button{color:var(--app-primary-color,#448aff)}.basic.secondary.sc-simple-button{color:var(--app-secondary-color,#ffb944)}.basic.danger.sc-simple-button{color:var(--app-danger-color,#f54e71)}.raised.sc-simple-button{-webkit-box-shadow:0 2px 2px rgba(0,0,0,.3);box-shadow:0 2px 2px rgba(0,0,0,.3)}.flat.primary.sc-simple-button, .raised.primary.sc-simple-button{background-color:var(--app-primary-color,#448aff);color:var(--app-primary-text-color,#fff)}.flat.secondary.sc-simple-button, .raised.secondary.sc-simple-button{background-color:var(--app-secondary-color,#ffb944);color:var(--app-secondary-text-color,#1a1a1a)}.flat.danger.sc-simple-button, .raised.danger.sc-simple-button{background-color:var(--app-danger-color,#f54e71);color:var(--app-danger-text-color,#fff)}.flat.sc-simple-button   .ripple.sc-simple-button, .raised.sc-simple-button   .ripple.sc-simple-button{background:rgba(255,255,255,.4)}.outline.sc-simple-button{background-color:transparent;border:1px solid;-webkit-transition:background-color .1s ease-in-out;transition:background-color .1s ease-in-out}.outline.sc-simple-button:hover{background-color:#e0e0e0}.outline.primary.sc-simple-button{border-color:var(--app-primary-color,#448aff);color:var(--app-primary-color,#448aff)}.outline.secondary.sc-simple-button{border-color:var(--app-secondary-color,#ffb944);color:var(--app-secondary-color,#ffb944)}.outline.danger.sc-simple-button{border-color:var(--app-danger-color,#f54e71);color:var(--app-danger-color,#f54e71)}.ripple.sc-simple-button{border-radius:50%;background:rgba(0,0,0,.2);-webkit-transform:scale(0);transform:scale(0);position:absolute;opacity:1;-webkit-animation:.4s linear rippleDrop;animation:.4s linear rippleDrop}\@-webkit-keyframes rippleDrop{100%{-webkit-transform:scale(2);transform:scale(2);opacity:0}}\@keyframes rippleDrop{100%{-webkit-transform:scale(2);transform:scale(2);opacity:0}}"},enumerable:!0,configurable:!0}),e}();e.SimpleButton=n,Object.defineProperty(e,"__esModule",{value:!0})});