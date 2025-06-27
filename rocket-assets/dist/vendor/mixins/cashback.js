const d={methods:{getValidCashback(a,t){return!Array.isArray(a)||a.length===0?{}:a.find(n=>t>=n.min_amount&&t<=n.max_amount)||{}}}};export{d as default};
