import{g as d}from"../get.js";import{mapGetters as u,mapActions as o}from"../vuex.js";import"../_commonjsHelpers.js";const c={props:{productId:{type:Number,default:0},product:{type:Object,default:()=>({})}},computed:{...u("product",{productStore:"product",products:"products",selectedSku:"selectedSku"}),validProduct(){if(this.product.id)return this.product;if(this.productStore.id)return this.productStore;if(this.productId)return this.products.find(r=>r.id===this.productId)||{id:this.productId}},validSku(){return this.selectedSku||this.firstValidSku||this.firstSku},firstValidSku(){return d(this.validProduct,"skus.data",[]).find(t=>!t.blocked_sale)},firstSku(){return d(this.validProduct,"skus.data",[])}},methods:{...o("product",["setSelectedSku"])}};export{c as default};