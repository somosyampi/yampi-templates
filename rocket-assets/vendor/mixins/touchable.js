const h={props:{useCaptureByEvent:{type:Array,default:()=>[{touchstart:!1},{touchend:!1},{touchcancel:!1},{touchleave:!1},{touchmove:!1}]}},data(){return{touchEvents:[{name:"touchstart",handler:this.handleTouchStart},{name:"touchend",handler:this.handleTouchEnd},{name:"touchcancel",handler:this.handleTouchCancel},{name:"touchleave",handler:this.handleTouchLeave},{name:"touchmove",handler:this.handleTouchMove}],touchStartLength:0,initialClientX:0,finalClientX:0,touchDelta:0}},methods:{bootTouchable(){this.touchEvents.forEach(t=>{this.$el.addEventListener(t.name,t.handler,this.useCaptureByEvent[t.name])})},handleTouchStart(t){const{changedTouches:e}=t;this.initialClientX=e[0].clientX,this.touchStartLength=t.touches.length,this.$emit("touchstart",t)},handleTouchEnd(t){const{changedTouches:e}=t;this.finalClientX=e[0].clientX,this.touchDelta=this.initialClientX-this.finalClientX,this.$emit("touchend",t)},handleTouchCancel(t){this.$emit("touchcancel",t)},handleTouchLeave(t){this.$emit("touchleave",t)},handleTouchMove(t){this.$emit("touchmove",t)}}};export{h as default};