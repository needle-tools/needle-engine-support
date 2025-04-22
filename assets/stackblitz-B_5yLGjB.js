import{_ as h,c as f,o as b,a as g,f as w}from"./app-9T6lAodh.js";function x(e){return e.startsWith("@code")?e.replace(/^@code/,"./code-samples/"):e}async function y(e,n,t,o){let s=await(await fetch(n)).text();o&&(s=o(s)),t[e]=s}async function c(e,n,t,o,a){e.push(y(n,t,o,a))}async function j(e,n){const t=[];c(t,"package.json","https://raw.githubusercontent.com/needle-engine/vite-template/main/package.json",e),c(t,"package-lock.json","https://raw.githubusercontent.com/needle-engine/vite-template/main/package-lock.json",e),c(t,"src/styles/style.css","https://raw.githubusercontent.com/needle-engine/vite-template/main/src/styles/style.css",e),c(t,"vite.config.js","https://raw.githubusercontent.com/needle-engine/vite-template/main/vite.config.js",e,o=>o.replace("needlePlugins(command, needleConfig)","needlePlugins(command, needleConfig, { noPoster: true })")),c(t,"tsconfig.json","https://raw.githubusercontent.com/needle-engine/vite-template/main/tsconfig.json",e),c(t,"index.html","https://raw.githubusercontent.com/needle-engine/vite-template/main/index.html",e,o=>o.replace(/\<needle-engine ?\>/,`<needle-engine camera-controls src="${n}">`)),await Promise.all(t)}async function k(e,n){var p,u;let t=`// Generated via ${window.location.href} at ${new Date().toISOString()}
import { NeedleEngine, RemoteSkybox, GameObject, ObjectRaycaster } from '@needle-tools/engine';
import * as THREE from 'three';
`;const o=x(n),a=window.location,s=a.pathname.split("/").slice(0,-1).join("/"),i=`${a.origin}${s}/${o}`,r=await(await fetch(i)).text(),d="src/main.ts",l=r.match(/export class\s+?(?<component_name>.+?)\s+extends Behaviour/),m=(u=(p=l==null?void 0:l.groups)==null?void 0:p.component_name)==null?void 0:u.trim();return console.log(m),t+=`
// SAMPLE SCRIPT START
`+r+`
// SAMPLE SCRIPT END
`,t+=`

NeedleEngine.addContextCreatedCallback((args) => {
  const context = args.context;
  const scene = context.scene;

  const grid = new THREE.GridHelper();
  scene.add(grid);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({ color: 0xdddddd });
  const cube = new THREE.Mesh(geometry, material);
  cube.name = "Cube";
  cube.position.y += 0.5;
  scene.add(cube);
  GameObject.addComponent(cube, new ${m}());
  ${r.includes("IPointerClickHandler")?"GameObject.addNewComponent(cube, ObjectRaycaster)":""}

  const remoteSkybox = new RemoteSkybox();
  remoteSkybox.background = false;
  remoteSkybox.url =
    'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/cyclorama_hard_light_1k.hdr';
  GameObject.addComponent(grid, remoteSkybox);
});
`,e[d]=t,d}const P={props:{file:String},methods:{async openProject(){const e={};await j(e,"https://github.com/needle-engine/vite-template/raw/main/assets/basic.glb");const n=await k(e,this.file),t=n.split("/").pop();StackBlitzSDK.openProject({files:{...e,"index.ts":`import './src/main';
import '${n}';`},template:"node",title:`${t}`,description:"This is a generated project via https://docs.needle.engine. Please note that this feature is experimental(!) and the project might not work as expected."},{newWindow:!0,openFile:n})}}},S={class:"code"};function v(e,n,t,o,a,s){return b(),f("div",null,[g("button",{onClick:n[0]||(n[0]=(...i)=>s.openProject&&s.openProject(...i)),class:"plausible-event-name=Click+Create+Stackblitz+Project"}," Open in StackBlitz "),g("div",S,[w(e.$slots,"default")])])}const R=h(P,[["render",v]]);export{R as default};
