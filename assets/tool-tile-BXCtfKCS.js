import{_ as n,o as l,c as a,a as o,n as r,f as s,g as d}from"./app-DzhQqn-2.js";const c={props:{image:String,docs_url:String},methods:{getClass:u}};function u(){return this.$slots["video-tutorial"]?"":"small"}const _=["src"],m={class:"description"},f=["href"];function g(e,h,t,v,p,i){return l(),a("div",{class:r(["tile",i.getClass()])},[o("img",{src:t.image,alt:"Tool Image",class:r(t.image?"":"hidden")},null,10,_),o("h3",null,[s(e.$slots,"tool-name",{},void 0,!0)]),o("p",m,[s(e.$slots,"tool-description",{},void 0,!0)]),s(e.$slots,"download-button",{},void 0,!0),o("p",null,[s(e.$slots,"video-tutorial",{},void 0,!0)]),t.docs_url?(l(),a("a",{key:0,href:t.docs_url},"Next Steps",8,f)):d("",!0)],2)}const S=n(c,[["render",g],["__scopeId","data-v-d2d15ff8"],["__file","tool-tile.vue"]]);export{S as default};