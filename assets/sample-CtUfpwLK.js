import{_ as c,c as r,o,a as l,g as i}from"./app-B4MxFGS_.js";const d={props:{src:String,split:{type:Boolean,default:!1},noRoom:{type:Boolean,default:!1}},data(){return{sanitizedUrl:""}},watch:{src:{immediate:!0,handler(n){const e=new URL(n),t=Math.random().toString(36).substring(2,6);e.searchParams.delete("room"),this.noRoom||e.searchParams.append("room",`needle_docs_${t}`),typeof window<"u"&&new URL(window.location.href),e.searchParams.append("hideClose",""),e.searchParams.append("utm_source","needle_docs"),e.searchParams.append("utm_content","sample_embed"),this.sanitizedUrl=e.toString()}}},mounted(){const n=e=>{if(!e||!e.contentWindow)return;const t=e.contentWindow.document.getElementsByTagName("iframe")[0];if(t){const a=t.contentWindow.document.querySelector("needle-engine");a&&(a.style.touchAction="pan-y")}};n(this.$refs.frame1),n(this.$refs.frame2)}},m=["src"],p=["src"];function u(n,e,t,s,a,f){return o(),r("div",null,[l("iframe",{src:a.sanitizedUrl,ref:"frame1",allow:"xr; xr-spatial-tracking; camera; microphone; fullscreen; display-capture"},null,8,m),t.split===!0?(o(),r("iframe",{key:0,src:a.sanitizedUrl,ref:"frame2",allow:"xr; xr-spatial-tracking; camera; microphone; fullscreen; display-capture"},null,8,p)):i("",!0)])}const _=c(d,[["render",u],["__scopeId","data-v-f9dc60b3"]]);export{_ as default};
