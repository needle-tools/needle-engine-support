<br/>

<div class="centered" style="display: flex;
    align-items: center;
    gap: 20px;
    font-size: 2em;
    font-weight: 100;">
    <img src="/logo.png" style="max-height:70px;" title="Logótipo Needle" alt="Logótipo Needle"/> +
    <img src="/imgs/logo-webcomponents.png" style="max-height:70px;" title="Logótipo Web Components" alt="Logótipo Web Components"/> +
    <img src="/imgs/threejs-logo.webp" style="max-height:70px;" title="Logótipo three.js" alt="Logótipo three.js"/>
</div>

# Needle Engine como Web Component

O Needle Engine fornece um web component fácil de usar que pode ser utilizado para exibir cenas 3D ricas e interativas diretamente em HTML com apenas algumas linhas de código. É o mesmo web component que suporta as nossas integrações.

Assim que ultrapassar as opções de configuração do web component, pode estendê-lo com scripts e componentes personalizados, e acesso programático completo ao grafo de cena.

:::tip Use as integrações!
Para cenas 3D complexas e iteração rápida, recomendamos usar o Needle Engine com uma das nossas integrações. Elas fornecem um fluxo de trabalho de criação poderoso, incluindo pré-visualização ao vivo, hot reloading e um pipeline de construção avançado com otimizações 3D.
:::

### Início Rápido
::: code-tabs
@tab index.html
@[code html](@code/basic-webcomponent.html)

@tab Resultado
```html
<iframe src="/docs/code-samples/basic-webcomponent.html" style="
    width: 100%; 
    aspect-ratio: 16/9; 
    outline: none; 
    border: none;
    "
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; xr-spatial-tracking"
    allowfullscreen
    ></iframe>
```
:::
[Abrir este exemplo no Stackblitz](https://stackblitz.com/edit/needle-engine-prebundled?file=index.html)



## Instalar do npm

Pode trabalhar diretamente com o Needle Engine sem usar qualquer Integração. O Needle Engine usa [three.js](https://threejs.org/) como grafo de cena e biblioteca de renderização, portanto, toda a funcionalidade do three.js também está disponível no Needle.

Pode instalar o Needle Engine do [`npm`](https://www.npmjs.com/package/@needle-tools/engine) executando:
<br/>
`npm i @needle-tools/engine`

## Instalar needle-engine de um CDN

Embora o nosso modelo padrão use [vite](https://vitejs.dev), o Needle Engine também pode ser usado diretamente com Javascript vanilla – sem usar qualquer bundler.

Pode adicionar uma versão completa e pré-empacotada do Needle Engine ao seu website com apenas uma linha de código.
Isto inclui os nossos componentes principais, física, partículas, networking, XR, e mais. Use isto se não tiver a certeza!

```js
<script type="module"
    src="https://cdn.jsdelivr.net/npm/@needle-tools/engine@4/dist/needle-engine.min.js">
</script>
```


Muitos exemplos podem ser encontrados no [StackBlitz](https://stackblitz.com/@marwie/collections/needle-engine).

## Prototipagem Rápida no StackBlitz

Para experiências rápidas, fornecemos um link conveniente para criar um novo projeto pronto para começar: [engine.needle.tools/new](https://engine.needle.tools/new)
Uma grande coleção de exemplos também está disponível na nossa [Coleção Stackblitz do Needle Engine](https://stackblitz.com/@marwie/collections/needle-engine)

## Desenvolvimento Local com VS Code

Se quer trabalhar com o Needle Engine sem qualquer integração, então provavelmente vai querer executar um servidor local para o seu website. Veja como pode fazer isso com o Visual Studio Code:

1. Abra a pasta com o seu ficheiro HTML no Visual Studio Code.
2. Instale a [extensão LiveServer](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).
3. Ative o live-server (há um botão "Go Live" no rodapé do VSCode).
4. Abra ``http://localhost:5500/index.html`` no seu navegador web, se não abrir automaticamente.


## three.js e Needle Engine

Como o Needle Engine usa [three.js](https://threejs.org/) como grafo de cena e biblioteca de renderização, toda a funcionalidade do three.js também está disponível no Needle e pode ser usada a partir de scripts de componentes. Estamos a usar um fork do three.js que inclui funcionalidades e melhorias adicionais, especialmente em relação a WebXR, Animação e exportação USDZ.


::: tip
Certifique-se de atualizar o caminho ``<needle-engine src="myScene.glb">`` para um ficheiro glb existente
ou [descarregue este glb de exemplo](https://github.com/needle-tools/needle-engine-samples/raw/main/vanilla/myScene.glb) e coloque-o na mesma pasta que o index.html, chame-o ``myScene.glb`` ou atualize o caminho src.
:::

@[code](@code/basic-html.html)


[Ver no github](https://github.com/needle-tools/needle-engine-samples/tree/main/vanilla)

---
Página traduzida automaticamente usando IA