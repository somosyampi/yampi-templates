const s={install(e){const t=require.context("./",!0,/\.vue$/i,"lazy");t.keys().forEach(o=>{const n=o.split("/").pop().split(".")[0];e.component(n,()=>t(o))})}};export{s as default};
