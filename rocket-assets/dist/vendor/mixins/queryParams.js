import{mapGetters as a,mapActions as r}from"../vuex.js";const m={data:()=>({mainQueryString:""}),computed:{...a("queryParams",["queryParams"]),...a("preview",["isIframe"])},methods:{...r("filters",["addActiveFilter","removeActiveFilter","bootQueryParams"]),...r("queryParams",["setQueryParams","removeQueryParams"]),updateFilterStatus(e,t){this.isIframe||(e.active=t,this.checkFilterStatus(e),this.setQueryParams({[this.mainQueryString]:e.id,page:1}))},parseFilterStatuses(e){e.forEach(t=>this.checkFilterStatus(t,!1))},checkFilterStatus(e,t=!0){if(!e.active&&!t)return;const i=e.active?"addActiveFilter":"removeActiveFilter";this[i]({id:e.id,key:this.mainQueryString,query:{[this.mainQueryString]:e.id},alias:`${this.mainQueryString}-${e.id}`,name:e.name})}}};export{m as default};
