import{_ as n,r as k,o as r,c as p,b as l,w as h,a as i,d as s}from"./app-DzhQqn-2.js";const d={};function C(y,t){const a=k("contribution-preview"),e=k("contributions-author");return r(),p("div",null,[l(e,{overviewLink:"/docs/community/contributions",name:"llllkatjallll",url:"https://github.com/llllkatjallll",profileImage:"https://avatars.githubusercontent.com/u/38395689?s=100&u=7ce0fef973c4819c4f07823568d6f6061abfe410&v=4",githubUrl:"https://github.com/llllkatjallll"},{default:h(()=>[l(a,{title:"Custom VR Button, that appears only on headsets and not on mobile phones",pageUrl:"/docs/community/contributions/llllkatjallll/custom-vr-button-that-appears-only-on-headsets-and-not-on-mobile-phones"},{default:h(()=>t[0]||(t[0]=[i("p",null,"I combined two checks - Needle's check to see if it's a mobile device (this way, you can exclude desktops), and then a second check that uses user agent info to see if it's one of the most common mobile systems. Result: the button does not appear on mobile phones, but it is visible on Quest and Pico 🙂",-1),i("p",null,"P.S: I am using Svelte for 2D UI handling.",-1),i("div",{class:"language-ts","data-highlighter":"shiki","data-ext":"ts","data-title":"ts",style:{"--shiki-light":"#4c4f69","--shiki-dark":"#c6d0f5","--shiki-light-bg":"#eff1f5","--shiki-dark-bg":"#303446"}},[i("pre",{class:"shiki shiki-themes catppuccin-latte catppuccin-frappe vp-code"},[i("code",null,[i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#8839EF","--shiki-dark":"#CA9EE6"}},"import"),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}}," {"),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}}," isMobileDevice"),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},","),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}}," NeedleXRSession "),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},"}"),i("span",{style:{"--shiki-light":"#8839EF","--shiki-dark":"#CA9EE6"}}," from"),i("span",{style:{"--shiki-light":"#40A02B","--shiki-dark":"#A6D189"}},' "@needle-tools/engine"'),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},";")]),s(`
`),i("span",{class:"line"}),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"...")]),s(`
`),i("span",{class:"line"}),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#9CA0B0","--shiki-dark":"#737994","--shiki-light-font-style":"italic","--shiki-dark-font-style":"italic"}},"// check if this is a mobile phone")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#8839EF","--shiki-dark":"#CA9EE6"}},"function"),i("span",{style:{"--shiki-light":"#1E66F5","--shiki-dark":"#8CAAEE","--shiki-light-font-style":"italic","--shiki-dark-font-style":"italic"}}," isMobilePhone"),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},"()"),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}}," {")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#8839EF","--shiki-dark":"#CA9EE6"}},"    return"),i("span",{style:{"--shiki-light":"#EA76CB","--shiki-dark":"#F4B8E4"}}," /"),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"Mobi"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"|"),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"Android"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"|"),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"iPhone"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"|"),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"iPad"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"|"),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"iPod"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"|"),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"BlackBerry"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"|"),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"IEMobile"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"|"),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"Opera Mini"),i("span",{style:{"--shiki-light":"#EA76CB","--shiki-dark":"#F4B8E4"}},"/"),i("span",{style:{"--shiki-light":"#8839EF","--shiki-dark":"#CA9EE6"}},"i"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"."),i("span",{style:{"--shiki-light":"#1E66F5","--shiki-dark":"#8CAAEE","--shiki-light-font-style":"italic","--shiki-dark-font-style":"italic"}},"test"),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"(navigator"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"."),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"userAgent)"),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},";")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},"}")]),s(`
`),i("span",{class:"line"}),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"...")]),s(`
`),i("span",{class:"line"}),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#9CA0B0","--shiki-dark":"#737994","--shiki-light-font-style":"italic","--shiki-dark-font-style":"italic"}},"// show the button, if the device is not a mobile phone and VR is supported")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},"{"),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"#"),i("span",{style:{"--shiki-light":"#8839EF","--shiki-dark":"#CA9EE6"}},"if"),i("span",{style:{"--shiki-light":"#1E66F5","--shiki-dark":"#8CAAEE","--shiki-light-font-style":"italic","--shiki-dark-font-style":"italic"}},"  isMobileDevice"),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"() "),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"&&"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}}," !"),i("span",{style:{"--shiki-light":"#1E66F5","--shiki-dark":"#8CAAEE","--shiki-light-font-style":"italic","--shiki-dark-font-style":"italic"}},"isMobilePhone"),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"() "),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"&&"),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}}," $haveVR "),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},"}")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"    <"),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"VrButton buttonFunction"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"="),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},"{"),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"() => "),i("span",{style:{"--shiki-light":"#1E66F5","--shiki-dark":"#8CAAEE","--shiki-light-font-style":"italic","--shiki-dark-font-style":"italic"}},"StartVR"),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},"()}"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}}," />")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},"{"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"/"),i("span",{style:{"--shiki-light":"#8839EF","--shiki-dark":"#CA9EE6"}},"if"),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},"}")])])])],-1)])),_:1}),l(a,{title:"Set fallback material for USDZ exporter",pageUrl:"/docs/community/contributions/llllkatjallll/set-fallback-material-for-usdz-exporter"},{default:h(()=>t[1]||(t[1]=[i("p",null,"If you want to set a fallback material for an object that will be exported as USDZ (for AR-mode on iOS), you can add this script to the object, which material should be replaced.",-1),i("p",null,"This is especially useful if you use custom shaders in your scene (they are visible on Desktop+WebXR, but not in AR on iOS).",-1),i("div",{class:"language-ts","data-highlighter":"shiki","data-ext":"ts","data-title":"ts",style:{"--shiki-light":"#4c4f69","--shiki-dark":"#c6d0f5","--shiki-light-bg":"#eff1f5","--shiki-dark-bg":"#303446"}},[i("pre",{class:"shiki shiki-themes catppuccin-latte catppuccin-frappe vp-code"},[i("code",null,[i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#8839EF","--shiki-dark":"#CA9EE6"}},"import"),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}}," {"),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}}," Behaviour"),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},","),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}}," GameObject"),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},","),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}}," Renderer"),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},","),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}}," USDZExporter"),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},","),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}}," serializable "),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},"}"),i("span",{style:{"--shiki-light":"#8839EF","--shiki-dark":"#CA9EE6"}}," from"),i("span",{style:{"--shiki-light":"#40A02B","--shiki-dark":"#A6D189"}},' "@needle-tools/engine"'),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},";")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#8839EF","--shiki-dark":"#CA9EE6"}},"import"),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}}," {"),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}}," Material"),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},","),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}}," Object3D "),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},"}"),i("span",{style:{"--shiki-light":"#8839EF","--shiki-dark":"#CA9EE6"}}," from"),i("span",{style:{"--shiki-light":"#40A02B","--shiki-dark":"#A6D189"}},' "three"'),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},";")]),s(`
`),i("span",{class:"line"}),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#8839EF","--shiki-dark":"#CA9EE6"}},"export"),i("span",{style:{"--shiki-light":"#8839EF","--shiki-dark":"#CA9EE6"}}," class"),i("span",{style:{"--shiki-light":"#DF8E1D","--shiki-dark":"#E5C890","--shiki-light-font-style":"italic","--shiki-dark-font-style":"italic"}}," FallbackMaterial"),i("span",{style:{"--shiki-light":"#8839EF","--shiki-dark":"#CA9EE6"}}," extends"),i("span",{style:{"--shiki-light":"#DF8E1D","--shiki-dark":"#E5C890","--shiki-light-font-style":"italic","--shiki-dark-font-style":"italic"}}," Behaviour"),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}}," {")]),s(`
`),i("span",{class:"line"}),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#1E66F5","--shiki-dark":"#8CAAEE","--shiki-light-font-style":"italic","--shiki-dark-font-style":"italic"}},"    @serializable"),i("span",{style:{"--shiki-light":"#FE640B","--shiki-dark":"#EF9F76"}},"("),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"Material"),i("span",{style:{"--shiki-light":"#FE640B","--shiki-dark":"#EF9F76"}},")")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"    fallbackMaterial"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"!:"),i("span",{style:{"--shiki-light":"#DF8E1D","--shiki-dark":"#E5C890","--shiki-light-font-style":"italic","--shiki-dark-font-style":"italic"}}," Material"),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},";")]),s(`
`),i("span",{class:"line"}),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#8839EF","--shiki-dark":"#CA9EE6"}},"    private"),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}}," originalMaterial"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"?:"),i("span",{style:{"--shiki-light":"#DF8E1D","--shiki-dark":"#E5C890","--shiki-light-font-style":"italic","--shiki-dark-font-style":"italic"}}," Material"),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},";")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#8839EF","--shiki-dark":"#CA9EE6"}},"    private"),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}}," usdzExporter"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"!:"),i("span",{style:{"--shiki-light":"#DF8E1D","--shiki-dark":"#E5C890","--shiki-light-font-style":"italic","--shiki-dark-font-style":"italic"}}," USDZExporter"),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},";")]),s(`
`),i("span",{class:"line"}),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#1E66F5","--shiki-dark":"#8CAAEE","--shiki-light-font-style":"italic","--shiki-dark-font-style":"italic"}},"    onEnable"),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},"()"),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}}," {")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#D20F39","--shiki-dark":"#E78284"}},"        this"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"."),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"usdzExporter "),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"="),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}}," GameObject"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"."),i("span",{style:{"--shiki-light":"#1E66F5","--shiki-dark":"#8CAAEE","--shiki-light-font-style":"italic","--shiki-dark-font-style":"italic"}},"findObjectOfType"),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"(USDZExporter)"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"!"),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},";")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#D20F39","--shiki-dark":"#E78284"}},"        this"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"."),i("span",{style:{"--shiki-light":"#1E66F5","--shiki-dark":"#8CAAEE","--shiki-light-font-style":"italic","--shiki-dark-font-style":"italic"}},"subscribeToBeforeExportEvent"),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"()"),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},";")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},"    }")]),s(`
`),i("span",{class:"line"}),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#1E66F5","--shiki-dark":"#8CAAEE","--shiki-light-font-style":"italic","--shiki-dark-font-style":"italic"}},"    onDisable"),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},"()"),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}}," {")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#D20F39","--shiki-dark":"#E78284"}},"        this"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"."),i("span",{style:{"--shiki-light":"#1E66F5","--shiki-dark":"#8CAAEE","--shiki-light-font-style":"italic","--shiki-dark-font-style":"italic"}},"unsubscribeFromBeforeExportEvent"),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"()"),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},";")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},"    }")]),s(`
`),i("span",{class:"line"}),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#8839EF","--shiki-dark":"#CA9EE6"}},"    private"),i("span",{style:{"--shiki-light":"#1E66F5","--shiki-dark":"#8CAAEE","--shiki-light-font-style":"italic","--shiki-dark-font-style":"italic"}}," subscribeToBeforeExportEvent"),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},"()"),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}}," {")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#D20F39","--shiki-dark":"#E78284"}},"        this"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"."),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"usdzExporter"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"."),i("span",{style:{"--shiki-light":"#1E66F5","--shiki-dark":"#8CAAEE","--shiki-light-font-style":"italic","--shiki-dark-font-style":"italic"}},"addEventListener"),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"("),i("span",{style:{"--shiki-light":"#40A02B","--shiki-dark":"#A6D189"}},'"before-export"'),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},","),i("span",{style:{"--shiki-light":"#D20F39","--shiki-dark":"#E78284"}}," this"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"."),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"onBeforeExport)"),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},";")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#D20F39","--shiki-dark":"#E78284"}},"        this"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"."),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"usdzExporter"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"."),i("span",{style:{"--shiki-light":"#1E66F5","--shiki-dark":"#8CAAEE","--shiki-light-font-style":"italic","--shiki-dark-font-style":"italic"}},"addEventListener"),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"("),i("span",{style:{"--shiki-light":"#40A02B","--shiki-dark":"#A6D189"}},'"after-export"'),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},","),i("span",{style:{"--shiki-light":"#D20F39","--shiki-dark":"#E78284"}}," this"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"."),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"onAfterExport)"),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},";")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},"    }")]),s(`
`),i("span",{class:"line"}),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#8839EF","--shiki-dark":"#CA9EE6"}},"    private"),i("span",{style:{"--shiki-light":"#1E66F5","--shiki-dark":"#8CAAEE","--shiki-light-font-style":"italic","--shiki-dark-font-style":"italic"}}," unsubscribeFromBeforeExportEvent"),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},"()"),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}}," {")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#D20F39","--shiki-dark":"#E78284"}},"        this"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"."),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"usdzExporter"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"."),i("span",{style:{"--shiki-light":"#1E66F5","--shiki-dark":"#8CAAEE","--shiki-light-font-style":"italic","--shiki-dark-font-style":"italic"}},"removeEventListener"),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"("),i("span",{style:{"--shiki-light":"#40A02B","--shiki-dark":"#A6D189"}},'"before-export"'),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},","),i("span",{style:{"--shiki-light":"#D20F39","--shiki-dark":"#E78284"}}," this"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"."),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"onBeforeExport)"),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},";")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#D20F39","--shiki-dark":"#E78284"}},"        this"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"."),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"usdzExporter"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"."),i("span",{style:{"--shiki-light":"#1E66F5","--shiki-dark":"#8CAAEE","--shiki-light-font-style":"italic","--shiki-dark-font-style":"italic"}},"removeEventListener"),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"("),i("span",{style:{"--shiki-light":"#40A02B","--shiki-dark":"#A6D189"}},'"after-export"'),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},","),i("span",{style:{"--shiki-light":"#D20F39","--shiki-dark":"#E78284"}}," this"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"."),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"onAfterExport)"),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},";")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},"    }")]),s(`
`),i("span",{class:"line"}),s(`
`),i("span",{class:"line"}),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#1E66F5","--shiki-dark":"#8CAAEE","--shiki-light-font-style":"italic","--shiki-dark-font-style":"italic"}},"    onBeforeExport"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}}," ="),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}}," ()"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}}," =>"),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}}," {")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"        console"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"."),i("span",{style:{"--shiki-light":"#1E66F5","--shiki-dark":"#8CAAEE","--shiki-light-font-style":"italic","--shiki-dark-font-style":"italic"}},"log"),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"("),i("span",{style:{"--shiki-light":"#40A02B","--shiki-dark":"#A6D189"}},'"onBeforeExport"'),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},")"),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},";")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#8839EF","--shiki-dark":"#CA9EE6"}},"        const"),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}}," renderer "),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"="),i("span",{style:{"--shiki-light":"#D20F39","--shiki-dark":"#E78284"}}," this"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"."),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"gameObject"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"."),i("span",{style:{"--shiki-light":"#1E66F5","--shiki-dark":"#8CAAEE","--shiki-light-font-style":"italic","--shiki-dark-font-style":"italic"}},"getComponent"),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"(Renderer)"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"!"),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},";")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#D20F39","--shiki-dark":"#E78284"}},"        this"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"."),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"originalMaterial "),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"="),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}}," renderer"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"."),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"sharedMaterial"),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},";")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"        renderer"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"."),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"sharedMaterial "),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"="),i("span",{style:{"--shiki-light":"#D20F39","--shiki-dark":"#E78284"}}," this"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"."),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"fallbackMaterial"),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},";")]),s(`
`),i("span",{class:"line"}),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},"    }")]),s(`
`),i("span",{class:"line"}),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#1E66F5","--shiki-dark":"#8CAAEE","--shiki-light-font-style":"italic","--shiki-dark-font-style":"italic"}},"    onAfterExport"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}}," ="),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}}," ()"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}}," =>"),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}}," {")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"        console"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"."),i("span",{style:{"--shiki-light":"#1E66F5","--shiki-dark":"#8CAAEE","--shiki-light-font-style":"italic","--shiki-dark-font-style":"italic"}},"log"),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"("),i("span",{style:{"--shiki-light":"#40A02B","--shiki-dark":"#A6D189"}},'"onAfterExport"'),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},")"),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},";")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#8839EF","--shiki-dark":"#CA9EE6"}},"        const"),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}}," renderer "),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"="),i("span",{style:{"--shiki-light":"#D20F39","--shiki-dark":"#E78284"}}," this"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"."),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"gameObject"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"."),i("span",{style:{"--shiki-light":"#1E66F5","--shiki-dark":"#8CAAEE","--shiki-light-font-style":"italic","--shiki-dark-font-style":"italic"}},"getComponent"),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"(Renderer)"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"!"),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},";")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"        renderer"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"."),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"sharedMaterial "),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"="),i("span",{style:{"--shiki-light":"#D20F39","--shiki-dark":"#E78284"}}," this"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"."),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"originalMaterial"),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},";")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},"    }")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},"}")])])])],-1)])),_:1})]),_:1})])}const o=n(d,[["render",C],["__file","llllkatjallll.html.vue"]]),F=JSON.parse('{"path":"/community/contributions/llllkatjallll","title":"","lang":"en-US","frontmatter":{"head":[["meta",{"name":"og:image","content":"https://engine.needle.tools/docs/.preview/contributions: llllkatjallll.png"}],["meta",{"name":"og:description","content":"Needle Engine is a web-based runtime for 3D apps. It runs on your machine for development, and can be deployed anywhere. It is flexible, extensible, and collaboration and XR come naturally. Needle Exporter for Unity bridges the Unity Editor and the web runtime. It helps you to export your assets, animations, lightmaps and so on to the web. It is built around the glTF standard for 3D assets."}]],"description":"Needle Engine is a web-based runtime for 3D apps. It runs on your machine for development, and can be deployed anywhere. It is flexible, extensible, and collaboration and XR come naturally. Needle Exporter for Unity bridges the Unity Editor and the web runtime. It helps you to export your assets, animations, lightmaps and so on to the web. It is built around the glTF standard for 3D assets."},"headers":[],"git":{},"filePathRelative":null}');export{o as comp,F as data};