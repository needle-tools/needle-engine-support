import{_ as l,c as _,o as c,a as u,f as d,g as f,n as o,s as h}from"./app-B4MxFGS_.js";const a={props:{href:String,secondary:Boolean,same_tab:Boolean,large:Boolean,event_goal:String,event_position:String,next_url:String||void 0},methods:{get_next_url:g}};function g(){if(typeof window>"u")return this.href;if(!this.next_url)return this.href;let e=window.location.origin+window.location.pathname,n=new URL(this.href);return this.next_url&&(console.log(this.next_url,e),e=new URL(this.next_url,e).href,e=encodeURIComponent(e),e+="?t="+Date.now(),n=new URL(n),n.searchParams.append("next",e),n.searchParams.append("t",Date.now().toString())),n.href}const s=()=>{h(e=>({"39aee7ce":e.secondary?"#aaa":"#826bed","4c065a38":e.large?"1em":".8em","26039d62":e.secondary?"#bbb":"#6248be"}))},r=a.setup;a.setup=r?(e,n)=>(s(),r(e,n)):s;const m=["href","target"];function v(e,n,t,b,p,i){return c(),_("a",{href:i.get_next_url(),target:t.same_tab?"_self":"_blank",class:o(["no-external-link-icon",t.event_goal?"plausible-event-name="+t.event_goal+(t.event_position?" plausible-event-position="+t.event_position:""):""])},[u("button",{class:o(t.event_goal?"plausible-event-name="+t.event_goal+(t.event_position?" plausible-event-position="+t.event_position:""):"")},[d(e.$slots,"default",{},void 0,!0),f("",!0)],2)],10,m)}const x=l(a,[["render",v],["__scopeId","data-v-76cb9f9a"]]);export{x as default};
