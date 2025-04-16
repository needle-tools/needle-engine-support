import{_ as n,c as r,b as h,w as a,r as l,o as p,a as i,d as s}from"./app-B4MxFGS_.js";const d={};function o(g,t){const k=l("contribution-preview"),e=l("contributions-author");return p(),r("div",null,[h(e,{overviewLink:"/docs/community/contributions",name:"ericcraft-mh",url:"https://github.com/ericcraft-mh",profileImage:"https://avatars.githubusercontent.com/u/99364056?s=100&v=4",githubUrl:"https://github.com/ericcraft-mh"},{default:a(()=>[h(k,{title:"QuickLook Vertical Image Tracker",pageUrl:"/docs/community/contributions/ericcraft-mh/quicklook-vertical-image-tracker/"},{default:a(()=>t[0]||(t[0]=[i("p",null,[s("In cases in which you are using QuickLook Image Tracker and Vertical Imagery you will need to correct the orientation of the model. As noted on the "),i("a",{href:"https://developer.apple.com/documentation/arkit/arkit_in_ios/content_anchors/detecting_images_in_an_ar_experience",target:"_blank",rel:"noopener noreferrer"},"Detecting Images in an AR Experience"),s(" page:")],-1),i("blockquote",null,[i("p",null,[i("code",null,"SCNPlane"),s(" is vertically oriented in its local coordinate space, but "),i("code",null,"ARImageAnchor"),s(" assumes the image is horizontal in its local space, so rotate the plane to match.")])],-1),i("div",{class:"language-ts","data-highlighter":"shiki","data-ext":"ts",style:{"--shiki-light":"#4c4f69","--shiki-dark":"#c6d0f5","--shiki-light-bg":"#eff1f5","--shiki-dark-bg":"#303446"}},[i("pre",{class:"shiki shiki-themes catppuccin-latte catppuccin-frappe vp-code"},[i("code",null,[i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#8839EF","--shiki-dark":"#CA9EE6"}},"import"),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}}," {"),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}}," Behaviour"),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},","),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}}," GameObject"),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},","),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}}," serializable"),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},","),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}}," USDZExporter "),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},"}"),i("span",{style:{"--shiki-light":"#8839EF","--shiki-dark":"#CA9EE6"}}," from"),i("span",{style:{"--shiki-light":"#40A02B","--shiki-dark":"#A6D189"}},' "@needle-tools/engine"'),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},";")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#8839EF","--shiki-dark":"#CA9EE6"}},"import"),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}}," {"),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}}," Object3D"),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},","),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}}," Euler "),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},"}"),i("span",{style:{"--shiki-light":"#8839EF","--shiki-dark":"#CA9EE6"}}," from"),i("span",{style:{"--shiki-light":"#40A02B","--shiki-dark":"#A6D189"}},' "three"'),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},";")]),s(`
`),i("span",{class:"line"}),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#8839EF","--shiki-dark":"#CA9EE6"}},"export"),i("span",{style:{"--shiki-light":"#8839EF","--shiki-dark":"#CA9EE6"}}," class"),i("span",{style:{"--shiki-light":"#DF8E1D","--shiki-light-font-style":"italic","--shiki-dark":"#E5C890","--shiki-dark-font-style":"italic"}}," QuickLookObjectsToFix"),i("span",{style:{"--shiki-light":"#8839EF","--shiki-dark":"#CA9EE6"}}," extends"),i("span",{style:{"--shiki-light":"#DF8E1D","--shiki-light-font-style":"italic","--shiki-dark":"#E5C890","--shiki-dark-font-style":"italic"}}," Behaviour"),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}}," {")]),s(`
`),i("span",{class:"line"}),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#1E66F5","--shiki-light-font-style":"italic","--shiki-dark":"#8CAAEE","--shiki-dark-font-style":"italic"}},"    @serializable"),i("span",{style:{"--shiki-light":"#FE640B","--shiki-dark":"#EF9F76"}},"("),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"Object3D"),i("span",{style:{"--shiki-light":"#FE640B","--shiki-dark":"#EF9F76"}},")")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"    objectToFix"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"!:"),i("span",{style:{"--shiki-light":"#DF8E1D","--shiki-light-font-style":"italic","--shiki-dark":"#E5C890","--shiki-dark-font-style":"italic"}}," Object3D"),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},";")]),s(`
`),i("span",{class:"line"}),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#8839EF","--shiki-dark":"#CA9EE6"}},"    private"),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}}," usdzExporter"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"!:"),i("span",{style:{"--shiki-light":"#DF8E1D","--shiki-light-font-style":"italic","--shiki-dark":"#E5C890","--shiki-dark-font-style":"italic"}}," USDZExporter"),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},";")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#8839EF","--shiki-dark":"#CA9EE6"}},"    private"),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}}," startRot"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},":"),i("span",{style:{"--shiki-light":"#DF8E1D","--shiki-light-font-style":"italic","--shiki-dark":"#E5C890","--shiki-dark-font-style":"italic"}}," Euler "),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"="),i("span",{style:{"--shiki-light":"#8839EF","--shiki-light-font-weight":"bold","--shiki-dark":"#CA9EE6","--shiki-dark-font-weight":"bold"}}," new"),i("span",{style:{"--shiki-light":"#1E66F5","--shiki-light-font-style":"italic","--shiki-dark":"#8CAAEE","--shiki-dark-font-style":"italic"}}," Euler"),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"()"),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},";")]),s(`
`),i("span",{class:"line"}),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#1E66F5","--shiki-light-font-style":"italic","--shiki-dark":"#8CAAEE","--shiki-dark-font-style":"italic"}},"    onEnable"),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},"()"),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}}," {")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#D20F39","--shiki-dark":"#E78284"}},"        this"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"."),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"usdzExporter "),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"="),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}}," GameObject"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"."),i("span",{style:{"--shiki-light":"#1E66F5","--shiki-light-font-style":"italic","--shiki-dark":"#8CAAEE","--shiki-dark-font-style":"italic"}},"findObjectOfType"),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"(USDZExporter)"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"!"),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},";")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#D20F39","--shiki-dark":"#E78284"}},"        this"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"."),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"startRot "),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"="),i("span",{style:{"--shiki-light":"#D20F39","--shiki-dark":"#E78284"}}," this"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"."),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"objectToFix"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"."),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"rotation"),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},";")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#D20F39","--shiki-dark":"#E78284"}},"        this"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"."),i("span",{style:{"--shiki-light":"#1E66F5","--shiki-light-font-style":"italic","--shiki-dark":"#8CAAEE","--shiki-dark-font-style":"italic"}},"subscribeToBeforeExportEvent"),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"()"),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},";")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},"    }")]),s(`
`),i("span",{class:"line"}),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#1E66F5","--shiki-light-font-style":"italic","--shiki-dark":"#8CAAEE","--shiki-dark-font-style":"italic"}},"    onDisable"),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},"()"),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}}," {")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#D20F39","--shiki-dark":"#E78284"}},"        this"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"."),i("span",{style:{"--shiki-light":"#1E66F5","--shiki-light-font-style":"italic","--shiki-dark":"#8CAAEE","--shiki-dark-font-style":"italic"}},"unsubscribeFromBeforeExportEvent"),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"()"),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},";")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},"    }")]),s(`
`),i("span",{class:"line"}),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#8839EF","--shiki-dark":"#CA9EE6"}},"    private"),i("span",{style:{"--shiki-light":"#1E66F5","--shiki-light-font-style":"italic","--shiki-dark":"#8CAAEE","--shiki-dark-font-style":"italic"}}," subscribeToBeforeExportEvent"),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},"()"),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}}," {")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#D20F39","--shiki-dark":"#E78284"}},"        this"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"."),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"usdzExporter"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"."),i("span",{style:{"--shiki-light":"#1E66F5","--shiki-light-font-style":"italic","--shiki-dark":"#8CAAEE","--shiki-dark-font-style":"italic"}},"addEventListener"),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"("),i("span",{style:{"--shiki-light":"#40A02B","--shiki-dark":"#A6D189"}},'"before-export"'),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},","),i("span",{style:{"--shiki-light":"#D20F39","--shiki-dark":"#E78284"}}," this"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"."),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"onBeforeExport)"),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},";")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#D20F39","--shiki-dark":"#E78284"}},"        this"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"."),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"usdzExporter"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"."),i("span",{style:{"--shiki-light":"#1E66F5","--shiki-light-font-style":"italic","--shiki-dark":"#8CAAEE","--shiki-dark-font-style":"italic"}},"addEventListener"),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"("),i("span",{style:{"--shiki-light":"#40A02B","--shiki-dark":"#A6D189"}},'"after-export"'),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},","),i("span",{style:{"--shiki-light":"#D20F39","--shiki-dark":"#E78284"}}," this"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"."),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"onAfterExport)"),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},";")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},"    }")]),s(`
`),i("span",{class:"line"}),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#8839EF","--shiki-dark":"#CA9EE6"}},"    private"),i("span",{style:{"--shiki-light":"#1E66F5","--shiki-light-font-style":"italic","--shiki-dark":"#8CAAEE","--shiki-dark-font-style":"italic"}}," unsubscribeFromBeforeExportEvent"),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},"()"),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}}," {")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#D20F39","--shiki-dark":"#E78284"}},"        this"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"."),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"usdzExporter"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"."),i("span",{style:{"--shiki-light":"#1E66F5","--shiki-light-font-style":"italic","--shiki-dark":"#8CAAEE","--shiki-dark-font-style":"italic"}},"removeEventListener"),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"("),i("span",{style:{"--shiki-light":"#40A02B","--shiki-dark":"#A6D189"}},'"before-export"'),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},","),i("span",{style:{"--shiki-light":"#D20F39","--shiki-dark":"#E78284"}}," this"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"."),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"onBeforeExport)"),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},";")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#D20F39","--shiki-dark":"#E78284"}},"        this"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"."),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"usdzExporter"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"."),i("span",{style:{"--shiki-light":"#1E66F5","--shiki-light-font-style":"italic","--shiki-dark":"#8CAAEE","--shiki-dark-font-style":"italic"}},"removeEventListener"),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"("),i("span",{style:{"--shiki-light":"#40A02B","--shiki-dark":"#A6D189"}},'"after-export"'),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},","),i("span",{style:{"--shiki-light":"#D20F39","--shiki-dark":"#E78284"}}," this"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"."),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"onAfterExport)"),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},";")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},"    }")]),s(`
`),i("span",{class:"line"}),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#8839EF","--shiki-dark":"#CA9EE6"}},"    private"),i("span",{style:{"--shiki-light":"#1E66F5","--shiki-light-font-style":"italic","--shiki-dark":"#8CAAEE","--shiki-dark-font-style":"italic"}}," onBeforeExport"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}}," ="),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}}," ()"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}}," =>"),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}}," {")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#D20F39","--shiki-dark":"#E78284"}},"        this"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"."),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"objectToFix"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"."),i("span",{style:{"--shiki-light":"#1E66F5","--shiki-light-font-style":"italic","--shiki-dark":"#8CAAEE","--shiki-dark-font-style":"italic"}},"updateMatrixWorld"),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"()"),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},";")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#D20F39","--shiki-dark":"#E78284"}},"        this"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"."),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"objectToFix"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"."),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"rotation"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"."),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"x "),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"="),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}}," -"),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"Math"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"."),i("span",{style:{"--shiki-light":"#FE640B","--shiki-dark":"#EF9F76"}},"PI"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}}," /"),i("span",{style:{"--shiki-light":"#FE640B","--shiki-dark":"#EF9F76"}}," 2"),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},";")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#D20F39","--shiki-dark":"#E78284"}},"        this"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"."),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"objectToFix"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"."),i("span",{style:{"--shiki-light":"#1E66F5","--shiki-light-font-style":"italic","--shiki-dark":"#8CAAEE","--shiki-dark-font-style":"italic"}},"updateMatrixWorld"),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"()"),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},";")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},"    }")]),s(`
`),i("span",{class:"line"}),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#8839EF","--shiki-dark":"#CA9EE6"}},"    private"),i("span",{style:{"--shiki-light":"#1E66F5","--shiki-light-font-style":"italic","--shiki-dark":"#8CAAEE","--shiki-dark-font-style":"italic"}}," onAfterExport"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}}," ="),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}}," ()"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}}," =>"),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}}," {")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#D20F39","--shiki-dark":"#E78284"}},"        this"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"."),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"objectToFix"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"."),i("span",{style:{"--shiki-light":"#1E66F5","--shiki-light-font-style":"italic","--shiki-dark":"#8CAAEE","--shiki-dark-font-style":"italic"}},"updateMatrixWorld"),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"()"),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},";")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#D20F39","--shiki-dark":"#E78284"}},"        this"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"."),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"objectToFix"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"."),i("span",{style:{"--shiki-light":"#1E66F5","--shiki-light-font-style":"italic","--shiki-dark":"#8CAAEE","--shiki-dark-font-style":"italic"}},"setRotationFromEuler"),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"("),i("span",{style:{"--shiki-light":"#D20F39","--shiki-dark":"#E78284"}},"this"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"."),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"startRot)"),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},";")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#D20F39","--shiki-dark":"#E78284"}},"        this"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"."),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"objectToFix"),i("span",{style:{"--shiki-light":"#179299","--shiki-dark":"#81C8BE"}},"."),i("span",{style:{"--shiki-light":"#1E66F5","--shiki-light-font-style":"italic","--shiki-dark":"#8CAAEE","--shiki-dark-font-style":"italic"}},"updateMatrixWorld"),i("span",{style:{"--shiki-light":"#4C4F69","--shiki-dark":"#C6D0F5"}},"()"),i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},";")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},"    }")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#7C7F93","--shiki-dark":"#949CBB"}},"}")])])])],-1),i("p",null,[s("Thanks to "),i("a",{href:"https://github.com/llllkatjallll",target:"_blank",rel:"noopener noreferrer"},"llllkatjallll"),s(" as their "),i("a",{href:"https://github.com/needle-tools/needle-engine-support/discussions/184",target:"_blank",rel:"noopener noreferrer"},"Set fallback material for USDZ exporter"),s(" solution helped me come up with a working solution for this.")],-1),i("p",null,"EDIT: Code cleanup and fixes.",-1)])),_:1})]),_:1})])}const C=n(d,[["render",o]]),E=JSON.parse('{"path":"/community/contributions/ericcraft-mh/","title":"","lang":"en-US","frontmatter":{"head":[["meta",{"name":"og:image","content":"https://engine.needle.tools/docs/.preview/contributions: ericcraft mh.png"}],["meta",{"name":"og:description","content":"Needle Engine is a web-based runtime for 3D apps. It runs on your machine for development, and can be deployed anywhere. It is flexible, extensible, and collaboration and XR come naturally. Needle Exporter for Unity bridges the Unity Editor and the web runtime. It helps you to export your assets, animations, lightmaps and so on to the web. It is built around the glTF standard for 3D assets."}]],"description":"Needle Engine is a web-based runtime for 3D apps. It runs on your machine for development, and can be deployed anywhere. It is flexible, extensible, and collaboration and XR come naturally. Needle Exporter for Unity bridges the Unity Editor and the web runtime. It helps you to export your assets, animations, lightmaps and so on to the web. It is built around the glTF standard for 3D assets."},"headers":[],"git":{},"filePathRelative":null}');export{C as comp,E as data};
