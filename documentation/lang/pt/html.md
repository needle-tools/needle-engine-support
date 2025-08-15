---
title: Frameworks, Bundlers, HTML
---

## Empacotamento e web frontends

Needle Engine é construído como um componente web.   
Isto significa que pode simplesmente instalar `@needle-tools/engine` no seu projeto:

```bash
npm i @needle-tools/engine
```

e depois usá-lo a partir de HTML assim:

```html
<script type="module">
  import '@needle-tools/engine';
</script>
<needle-engine src="path/to/your.glb"></needle-engine>
```

Com o nosso modelo de projeto padrão baseado em Vite, o Needle Engine é empacotado na sua aplicação web no momento da implementação. Isto garante ficheiros mais pequenos e otimiza os tempos de carregamento.

::: tip Empacotamento e tree shaking

**Empacotamento** significa que todos os ficheiros css, js e outros que compõem o seu projeto são combinados em menos ficheiros, e mais pequenos, no momento da construção. Isto garante que, em vez de descarregar inúmeros scripts e componentes pequenos, apenas um ou poucos são descarregados, contendo o código mínimo necessário. A documentação do Vite contém uma ótima explicação sobre por que as aplicações web devem ser empacotadas: [Why Bundle for Production](https://vitejs.dev/guide/why.html)

**Tree shaking** é uma prática comum no desenvolvimento web onde o código não utilizado é removido do bundle final para reduzir o tamanho do ficheiro. Isto é semelhante a "code stripping" no Unity. A [documentação do MSDN](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking) tem uma boa explicação sobre tree shaking.
:::

### Vite, Vue, React, Svelte, React Three Fiber...

Needle Engine não tem opinião sobre a escolha de framework. O nosso modelo padrão usa o popular [vite](https://vitejs.dev) como bundler. A partir daí, pode adicionar vue, svelte, nuxt, react, react-three-fiber ou outros frameworks, e temos exemplos para muitos deles. Pode também integrar outros bundlers, ou não usar nenhum – apenas HTML e Javascript simples.  

Aqui estão alguns exemplos de stacks tecnológicas que são possíveis e que usamos com o Needle Engine:  

- **Vite + HTML** — É isto que o nosso modelo padrão usa!
    
- **Vite + Vue** — É isto que o website [Needle Tools](https://needle.tools) usa! Encontre um exemplo para descarregar [aqui](https://github.com/needle-tools/needle-engine-samples). 
- **Vite + Svelte** 
- **Vite + SvelteKit**
- **Vite + React** — Existe um modelo experimental incluído na integração com o Unity para isto que pode escolher ao gerar um projeto!
- **react-three-fiber** — Existe um modelo experimental incluído na integração com o Unity para isto que pode escolher ao gerar um projeto!
- **Vercel & Nextjs** — Encontre um [exemplo de projeto nextjs aqui](https://github.com/needle-engine/nextjs-sample)
- **CDN without any bundler** — Encontre um exemplo de código [aqui](./vanilla-js.md)

Em suma: estamos atualmente a fornecer um modelo Vite mínimo, mas pode estendê-lo ou mudar para outros frameworks –  
Informe-nos sobre o que e como constrói, e como podemos melhorar a experiência para o seu caso de uso ou fornecer um exemplo!

:::tip
Alguns frameworks requerem configurações personalizadas em `needle.config.json`. Saiba mais [aqui](./reference/needle-config-json.md). Tipicamente, o `baseUrl` precisa de ser definido. 
:::

:::details Como crio um modelo de projeto personalizado no Unity?

Pode criar e partilhar os seus próprios modelos de projeto web para usar outros bundlers, sistemas de build, ou nenhum.  

**Criar um novo Template**  
1. Selecione `Create/Needle Engine/Project Template` para adicionar um ProjectTemplate à pasta que pretende usar como modelo 
2. Feito! É assim tão simples.

As dependências vêm do Unity quando há um NpmDef no projeto (ou seja, quando o seu projeto usa referências locais).  
Pode também publicar os seus pacotes para npm e referenciá-los através do número da versão.  
:::

## Criar uma PWA

Apoiamos a criação fácil de uma Progressive Web App (PWA) diretamente a partir do nosso modelo Vite.  
As PWAs são aplicações web que carregam como páginas ou websites regulares, mas podem oferecer funcionalidades ao utilizador, como trabalhar offline, notificações push e acesso a hardware de dispositivos, tradicionalmente disponíveis apenas para aplicações móveis nativas.   

Por padrão, as PWAs criadas com Needle têm suporte offline, e podem opcionalmente ser atualizadas automaticamente quando publica uma nova versão da sua aplicação. 

1) Instale o [plugin Vite PWA](https://vite-pwa-org.netlify.app/) no seu projeto web: `npm install vite-plugin-pwa --save-dev`
2) Modifique `vite.config.js` conforme visto abaixo. Certifique-se de passar o mesmo objeto `pwaOptions` tanto para `needlePlugins` quanto para `VitePWA`.

```js
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(async ({ command }) => {

    // Crie o objeto pwaOptions. 
    // Pode editar ou inserir as configurações da PWA aqui (por exemplo, mudar o nome da PWA ou adicionar ícones).
    /** @type {import("vite-plugin-pwa").VitePWAOptions} */
    const pwaOptions = {};
  
    const { needlePlugins } = await import("@needle-tools/engine/plugins/vite/index.js");

    return {
        plugins: [
            // passe o objeto pwaOptions para os needlePlugins e a função VitePWA
            needlePlugins(command, needleConfig, { pwa: pwaOptions }),
            VitePWA(pwaOptions),
        ],
        // o resto da sua configuração Vite...
```

:::tip Todos os assets são colocados em cache por padrão
Note que, por padrão, todos os assets na sua pasta de build são adicionados ao precache da PWA – para aplicações grandes com muitos assets dinâmicos, isto pode não ser o que pretende (imagine a PWA do YouTube a colocar todos os vídeos em cache assim que um utilizador abre a aplicação!). Consulte [Mais Opções de PWA](#more-pwa-options) para saber como personalizar este comportamento.  
:::

### Testar PWAs

Para testar a sua PWA, implemente a página, por exemplo, usando o componente `DeployToFTP`.  
Depois, abra a página implementada num navegador e verifique se as funcionalidades da PWA funcionam como esperado:
- a aplicação aparece como instalável
- a aplicação funciona offline
- a aplicação é detetada como PWA capaz de funcionar offline por [pwabuilder.com](https://pwabuilder.com/)

As PWAs usam Service Workers para colocar recursos em cache e fornecer suporte offline. Service Workers são um pouco mais difíceis de usar durante o desenvolvimento, e tipicamente só são ativados para builds (por exemplo, quando usa um componente `DeployTo...`). 

Pode ativar o suporte a PWA para desenvolvimento adicionando o seguinte ao objeto de opções no seu `vite.config.js`. 

```js
const pwaOptions = {
  // Nota: As PWAs comportam-se de forma diferente no modo de desenvolvimento. 
  // Certifique-se de verificar o comportamento em builds de produção!
  devOptions: {
    enabled: true,
  }
};
```

Por favor, note que as PWAs no modo de desenvolvimento não suportam uso offline – tentar isso pode resultar em comportamento inesperado.  

### Atualizar automaticamente aplicações em execução

Os websites tipicamente mostram conteúdo novo ou atualizado ao atualizar a página. 

Em algumas situações, pode querer que a página se atualize e recarregue automaticamente quando uma nova versão tiver sido publicada – 
como num museu, feira comercial, exposição pública, ou outros cenários de longa duração.  

Para ativar as atualizações automáticas, defina a propriedade `updateInterval` no objeto pwaOptions para uma duração (em milissegundos) em que a aplicação deve verificar se há atualizações. Se for detetada uma atualização, a página irá recarregar automaticamente.

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
Por exemplo, pode fornecer um manifesto parcial com um título de aplicação personalizado ou cor do tema:

```js
const pwaOptions = {
  // as opções de manifesto fornecidas aqui irão substituir os padrões 
  manifest: {
    name: "A Minha Aplicação",
    short_name: "A Minha Aplicação",
    theme_color: "#B2D464",
  }
};
```

Para requisitos complexos como cache parcial, service workers personalizados ou diferentes estratégias de atualização, pode remover a opção `{ pwa: pwaOptions }` de `needlePlugins` e adicionar a funcionalidade PWA diretamente através do plugin Vite PWA.

## Aceder ao Needle Engine e Componentes a partir de javascript externo
    
O código que expõe pode ser acedido a partir de JavaScript após o empacotamento. Isto permite construir visualizadores e outras aplicações onde há uma divisão entre dados conhecidos em tempo de edição e dados apenas conhecidos em tempo de execução (por exemplo, ficheiros carregados dinamicamente, conteúdo gerado pelo utilizador).  
Para aceder a componentes a partir de javascript regular fora do motor, por favor, consulte a secção [interop com javascript regular](./scripting.md#accessing-needle-engine-and-components-from-anywhere)

## Personalizar a aparência do carregamento

Consulte a secção *Loading Display* na [referência de componentes do needle engine](./reference/needle-engine-attributes.md)

### Estilos incorporados

A aparência de carregamento do needle-engine pode usar um tema claro ou escuro.  
Para alterar a aparência, use o atributo `loading-style` no componente web `<needle-engine>`.  
As opções são `light` e `dark` (padrão):

``<needle-engine loading-style="light"></needle-engine>``

### Estilo de Carregamento Personalizado — *Funcionalidade PRO*  #

Por favor, consulte a secção *Loading Display* na [referência de componentes do needle engine](./reference/needle-engine-attributes.md)

![carregamento personalizado](/imgs/custom-loading-style.webp)


Página traduzida automaticamente usando IA