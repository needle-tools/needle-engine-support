---
title: Frameworks, Bundlers, HTML
---

## Bundling e frontends web

O Needle Engine é construído como um web component.
Isso significa que basta instalar o `@needle-tools/engine` no seu projeto e incluir `<needle-engine src="path/to/your.glb">` em qualquer lugar no seu projeto web.

- Instalar usando npm:
  `npm i @needle-tools/engine`

Com o nosso modelo de projeto padrão baseado em Vite, o Needle Engine é agrupado (bundled) numa aplicação web no momento do deploy. Isso garante ficheiros mais pequenos, tree-shaking (semelhante à remoção de código no Unity) e otimiza os tempos de carregamento. Em vez de descarregar inúmeros scripts e componentes pequenos, apenas um ou poucos são descarregados contendo o código mínimo necessário.

O Vite (o nosso bundler padrão) tem uma boa explicação sobre por que as aplicações web devem ser agrupadas: [Porquê Agrupar (Bundle) para Produção](https://vitejs.dev/guide/why.html)

### Vite, Vue, React, Svelte, React Three Fiber...

O Needle Engine não tem opinião sobre a escolha do framework. O nosso modelo padrão usa o popular [vite](https://vitejs.dev) como bundler. A partir daí, pode adicionar vue, svelte, nuxt, react, react-three-fiber ou outros frameworks, e temos exemplos para muitos deles. Também pode integrar outros bundlers, ou não usar nenhum – apenas HTML e Javascript puros.

Aqui estão alguns exemplos de stacks tecnológicas que são possíveis e com as quais usamos o Needle Engine:

- **Vite + HTML** — É isso que o nosso modelo padrão usa!

- **Vite + Vue** — É isso que o site [Needle Tools](https://needle.tools) usa! Encontre um exemplo para descarregar [aqui](https://github.com/needle-tools/needle-engine-samples).
- **Vite + Svelte**
- **Vite + SvelteKit**
- **Vite + React** — Há um modelo experimental incluído na integração com Unity para isto que pode escolher ao gerar um projeto!
- **react-three-fiber** — Há um modelo experimental incluído na integração com Unity para isto que pode escolher ao gerar um projeto!
- **Vercel & Nextjs** — Encontre um [exemplo de projeto nextjs aqui](https://github.com/needle-engine/nextjs-sample)
- **CDN sem nenhum bundler** — Encontre um exemplo de código [aqui](./vanilla-js.md)

Em resumo: atualmente estamos a fornecer um modelo vite mínimo, mas pode estendê-lo ou mudar para outros frameworks –
Diga-nos o que e como está a construir, e como podemos melhorar a experiência para o seu caso de uso ou fornecer um exemplo!

:::tip
Alguns frameworks exigem configurações personalizadas em `needle.config.json`. Saiba mais [aqui](./reference/needle-config-json.md). Tipicamente, o `baseUrl` precisa de ser definido.
:::

:::details Como crio um modelo de projeto personalizado no Unity?

Pode criar e partilhar os seus próprios modelos de projeto web para usar outros bundlers, sistemas de build, ou nenhum.

**Criar um novo Modelo**
1. Selecione `Create/Needle Engine/Project Template` para adicionar um ProjectTemplate à pasta que pretende usar como modelo.
2. Feito! É assim simples.

As dependências vêm do unity quando existe um NpmDef no projeto (portanto, quando o seu projeto usa referências locais).
Também pode publicar os seus pacotes para npm e referenciá-los via número de versão.
:::

### Tree-shaking para reduzir o tamanho do bundle

Tree shaking refere-se a uma prática comum quando se trata de agrupar (bundling) aplicações web ([ver docs da MSDN](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking)). Significa que caminhos de código e funcionalidades que não são usados no seu código serão removidos dos ficheiros javascript agrupados finais para reduzir o tamanho do ficheiro. Veja abaixo as funcionalidades que o Needle Engine inclui e como removê-las:

:::details Como remover o motor de física Rapier? (Reduzir o tamanho total do bundle removendo ~2MB (~600KB ao compactar com gzipping))

- **Opção 1**: via configuração needlePlugins:
  Defina `useRapier` para `false` no seu vite.config: `needlePlugins(command, needleConfig, { useRapier: false }),`

- **Opção 2**: via configuração vite.define:
  Declare a definição `NEEDLE_USE_RAPIER` com `false`
  ```js
  define: {
    NEEDLE_USE_RAPIER: false
  },
  ```

- **Opção 3**: via .env
  Crie um ficheiro `.env` no seu projeto web e adicione `VITE_NEEDLE_USE_RAPIER=false`

- **Opção 4**: via componente Unity
  Adicione o componente `Needle Engine Modules` à sua cena e defina `Physics Engine` para `None`
  ![Definições de Física dos Módulos do Unity Needle Engine](/imgs/unity-needle-engine-modules-physics.jpg)

:::

## Criar uma PWA

Apoiamos a criação fácil de uma Progressive Web App (PWA) diretamente do nosso modelo vite.
As PWAs são aplicações web que carregam como páginas ou sites web regulares, mas podem oferecer funcionalidades ao utilizador como trabalhar offline, notificações push e acesso a hardware de dispositivos tradicionalmente disponível apenas para aplicações móveis nativas.

Por padrão, as PWAs criadas com Needle têm suporte offline e podem opcionalmente atualizar automaticamente quando publica uma nova versão da sua aplicação.

1) Instale o [plugin Vite PWA](https://vite-pwa-org.netlify.app/) no seu projeto web: `npm install vite-plugin-pwa --save-dev`
2) Modifique `vite.config.js` conforme visto abaixo. Certifique-se de passar o mesmo objeto `pwaOptions` tanto para `needlePlugins` quanto para `VitePWA`.

```js
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(async ({ command }) => {

    // Crie o objeto pwaOptions.
    // Pode editar ou inserir definições de PWA aqui (por exemplo, alterar o nome da PWA ou adicionar ícones).
    /** @type {import("vite-plugin-pwa").VitePWAOptions} */
    const pwaOptions = {};

    const { needlePlugins } = await import("@needle-tools/engine/plugins/vite/index.js");

    return {
        plugins: [
            // passe o objeto pwaOptions para as funções needlePlugins e VitePWA
            needlePlugins(command, needleConfig, { pwa: pwaOptions }),
            VitePWA(pwaOptions),
        ],
        // o resto da sua configuração vite...
```

:::tip Todos os assets são colocados em cache por padrão
Note que, por padrão, todos os assets na sua pasta de build são adicionados ao precache da PWA – para aplicações grandes com muitos assets dinâmicos, isso pode não ser o que pretende (imagine a PWA do YouTube a colocar todos os vídeos em cache assim que um utilizador abre a aplicação!). Veja [Mais Opções de PWA](#more-pwa-options) para como personalizar este comportamento.
:::

### Testar PWAs

Para testar a sua PWA, faça o deploy da página, por exemplo usando o componente `DeployToFTP`.
Depois, abra a página implementada num navegador e verifique se as funcionalidades da PWA funcionam como esperado:
- a aplicação aparece como instalável
- a aplicação funciona offline
- a aplicação é detetada como PWA capaz de funcionar offline por [pwabuilder.com](https://pwabuilder.com/)

As PWAs usam Service Workers para colocar recursos em cache e fornecer suporte offline. Os Service Workers são um pouco mais difíceis de usar durante o desenvolvimento e, tipicamente, só são ativados para builds (por exemplo, quando usa um componente `DeployTo...`).

Pode ativar o suporte a PWA para desenvolvimento adicionando o seguinte ao objeto options no seu `vite.config.js`.

```js
const pwaOptions = {
  // Nota: As PWAs comportam-se de forma diferente no modo de desenvolvimento.
  // Certifique-se de verificar o comportamento nas builds de produção!
  devOptions: {
    enabled: true,
  }
};
```

Por favor, note que as PWAs no modo de desenvolvimento não suportam uso offline – tentar isso pode resultar em comportamento inesperado.

### Atualizar automaticamente aplicações em execução

Os sites web tipicamente mostram conteúdo novo ou atualizado ao atualizar a página.

Em algumas situações, pode querer que a página se atualize e recarregue automaticamente quando uma nova versão foi publicada –
como num museu, feira comercial, exposição pública, ou outros cenários de longa duração.

Para ativar atualizações automáticas, defina a propriedade `updateInterval` no objeto pwaOptions para uma duração (em milissegundos) em que a aplicação deve verificar atualizações. Se for detetada uma atualização, a página irá recarregar automaticamente.

```js
const pwaOptions = {
  updateInterval: 15 * 60 * 1000, // 15 minutos, em milissegundos
};
```

:::tip Recarregamentos Periódicos e Dados do Utilizador
Não é recomendado usar recarregamentos automáticos em aplicações onde os utilizadores estão a interagir com formulários ou outros dados que poderiam ser perdidos num recarregamento. Para estas aplicações, é recomendado mostrar um prompt de recarregamento.
Consulte a [documentação do plugin Vite PWA](https://vite-pwa-org.netlify.app/guide/prompt-for-update.html) para mais informações sobre como implementar um prompt de recarregamento em vez de recarregamento automático.
:::

### Mais opções de PWA

Uma vez que o Needle usa o [plugin Vite PWA](https://vite-pwa-org.netlify.app/) por baixo, pode usar todas as opções e hooks fornecidos por ele.
Por exemplo, pode fornecer um manifesto parcial com um título de aplicação personalizado ou cor de tema:

```js
const pwaOptions = {
  // as opções de manifesto fornecidas aqui substituirão os padrões
  manifest: {
    name: "A Minha App",
    short_name: "A Minha App",
    theme_color: "#B2D464",
  }
};
```

Para requisitos complexos como cache parcial, service workers personalizados ou diferentes estratégias de atualização, pode remover a opção `{ pwa: pwaOptions }` de `needlePlugins` e adicionar a funcionalidade PWA diretamente através do plugin Vite PWA.

## Aceder ao Needle Engine e Componentes a partir de javascript externo

O código que expõe pode ser acedido a partir de JavaScript após o agrupamento (bundling). Isto permite construir visualizadores e outras aplicações onde há uma divisão entre dados conhecidos em tempo de edição e dados apenas conhecidos em tempo de execução (por exemplo, ficheiros carregados dinamicamente, conteúdo gerado pelo utilizador).
Para aceder a componentes a partir de javascript regular fora do motor, por favor, consulte a secção [interop com javascript regular](./scripting.md#accessing-needle-engine-and-components-from-anywhere).

## Personalizar a aparência do carregamento

Consulte a secção *Loading Display* na [referência de componentes do needle engine](./reference/needle-engine-attributes.md).

### Estilos incorporados

A aparência de carregamento do needle-engine pode usar um skin claro ou escuro.
Para alterar a aparência, use o atributo `loading-style` no web component `<needle-engine>`.
As opções são `light` e `dark` (padrão):

``<needle-engine loading-style="light"></needle-engine>``

### Estilo de Carregamento Personalizado — *Funcionalidade PRO* #

Por favor, consulte a secção *Loading Display* na [referência de componentes do needle engine](./reference/needle-engine-attributes.md).

![Pré-visualização de estilo de carregamento personalizado](/imgs/custom-loading-style.webp)


Página traduzida automaticamente usando IA