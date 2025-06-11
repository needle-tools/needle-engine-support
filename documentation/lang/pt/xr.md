---
title: VR & AR (WebXR)
---

## Dispositivos Suportados

O Needle Engine suporta a especificação completa do [WebXR](https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API), incluindo AR e VR. O WebXR é um padrão web oficial que traz experiências imersivas para a web, com todos os benefícios da web: sem instalação, sem loja de apps, sem SDKs necessários.

Todos os dispositivos com um navegador podem executar aplicações feitas com o Needle. Se o navegador suportar WebXR, as suas aplicações funcionarão automaticamente em XR também, usando os nossos componentes integrados. Isto inclui navegadores de desktop, navegadores móveis, muitos navegadores em headsets AR/VR, mas também outras tecnologias emergentes como ecrãs Looking Glass, óculos inteligentes e muito mais.

:::tip Suporte AR em iOS sem app via USDZ/QuickLook
Embora os dispositivos iOS ainda não tenham suporte oficial para WebXR, o Needle suporta a criação de experiências AR em iOS usando [Everywhere Actions](everywhere-actions.md). Veja a [secção iOS](#augmented-reality-and-webxr-on-ios) para mais detalhes. Pode criar experiências ricas e interativas que funcionam perfeitamente em AR em dispositivos iOS, mesmo com as limitações impostas pela Apple.

Quando entra no modo AR no iOS, o Needle converte automaticamente a sua cena para um ficheiro USDZ, que é depois exibido em AR usando o QuickLook da Apple. Objetos, materiais, áudio, animação e Everywhere Actions serão preservados.
:::

A tabela seguinte lista alguns dos dispositivos que verificámos que funcionam com o Needle Engine.
Quando um novo dispositivo que suporta WebXR for lançado, funcionará com as suas aplicações de imediato. Esta é uma das grandes vantagens de construir com o navegador como plataforma – a compatibilidade não está limitada a um conjunto específico de dispositivos ou SDKs.

| Dispositivo Headset | Navegador | Notas |
| -- | -- | -- |
| Apple Vision Pro | ✔️ Safari | rastreamento de mãos, suporte para transient pointer |
| Meta Quest 3 | ✔️ Meta Browser | rastreamento de mãos, suporte para sessiongranted<sup>1</sup>, passthrough, deteção de profundidade, rastreamento de malhas |
| Meta Quest 3S | ✔️ Meta Browser | rastreamento de mãos, suporte para sessiongranted<sup>1</sup>, passthrough, deteção de profundidade, rastreamento de malhas |
| Meta Quest 2 | ✔️ Meta Browser | rastreamento de mãos, suporte para sessiongranted<sup>1</sup>, passthrough (preto e branco) |
| Meta Quest 1 | ✔️ Meta Browser | rastreamento de mãos, suporte para sessiongranted<sup>1</sup> |
| Meta Quest Pro | ✔️ Meta Browser | rastreamento de mãos, suporte para sessiongranted<sup>1</sup>, passthrough |
| Pico Neo 4 | ✔️ Pico Browser | passthrough, rastreamento de mãos<sup>2</sup> |
| Pico Neo 3 | ✔️ Pico Browser | sem rastreamento de mãos, thumbsticks do controlador invertidos |
| Oculus Rift 1/2 | ✔️ Chrome |  |
| Valve Index | ✔️ Chrome |  |
| HTC Vive | ✔️ Chrome |  |
| Hololens 2 | ✔️ Edge | rastreamento de mãos, suporte para AR e VR (no modo VR, o fundo também é renderizado) |

| Dispositivo Móvel | Navegador | Notas |
| -- | -- | -- |
| Android 10+ | ✔️ Chrome | |
| Android 10+ | ✔️ Firefox | |
| iOS 15+ | (✔️)<sup>3</sup> Safari<br/>(✔️)<sup>3</sup> Chrome | Sem suporte completo de código, mas o Needle [Everywhere Actions](everywhere-actions.md) é suportado para criar ficheiros USDZ dinâmicos e interativos. |
| iOS 15+ | ✔️ WebXR Viewer | o navegador já está um pouco desatualizado |
| Hololens 2 | ✔️ Edge | |
| Hololens 1 | ❌ | sem suporte WebXR |
| Magic Leap 2 | ✔️ | |
| Magic Leap 1 | ✔️ | dispositivo obsoleto |

| Outros Dispositivos | Navegador | Notas |
| -- | -- | -- |
| Looking Glass Holographic Display | ✔️ Chrome | requer Looking Glass bridge e algum código personalizado, [ver o nosso exemplo](https://engine.needle.tools/samples/looking-glass/) |
| Logitech MX Ink | ✔️ Meta Browser | oficialmente suportado, ver [docs](https://logitech.github.io/mxink/WebXR/WebXrIntegration.html#using-needle-tools) |

<sup>1</sup>: Requer a ativação de uma flag do navegador: `chrome://flags/#webxr-navigation-permission`
<sup>2</sup>: Requer a ativação de um interruptor nas definições de programador
<sup>3</sup>: Usa [Everywhere Actions](everywhere-actions.md) ou [outras abordagens](#augmented-reality-and-webxr-on-ios)

## Exemplos de VR, AR e QuickLook

Visite os nossos [Exemplos Needle Engine](https://engine.needle.tools/samples/?overlay=samples&tag=xr) para experimentar muitos exemplos interativos agora mesmo. Ou, experimente ao vivo no seu dispositivo clicando nos botões <kbd>QR Code</kbd> (para telemóveis) ou <kbd>Abrir no Quest</kbd> (para headsets Meta Quest) abaixo.

<sample src="https://engine.needle.tools/samples/collaborative-sandbox/"/>

## Adicionar capacidades VR e AR a uma cena

As capacidades de AR, VR e rede no Needle Engine foram concebidas para serem modulares. Pode optar por não suportar nenhuma delas, ou adicionar apenas funcionalidades específicas.

### Capacidades Básicas

1. **Ativar AR e VR**
  Adicione um componente `WebXR`.
  *Opcional:* pode definir um avatar personalizado referenciando um [Prefab de Avatar](#avatars).
  Por predefinição, um `DefaultAvatar` básico é atribuído.

2. **Ativar Teletransporte**
  Adicione um componente `TeleportTarget` a hierarquias de objetos para onde se pode teletransportar.
  Para excluir objetos específicos, defina a sua camada para `IgnoreRaycasting`.

### Multijogador

1. **Ativar Rede**
  Adicione um componente `SyncedRoom`.

2. **Ativar Sincronização do Visualizador de Desktop**
  Adicione um componente `SyncedCamera`.

3. **Ativar Chat de Voz**
  Adicione um componente `VoIP`.

:::tip Estrutura da Cena
Estes componentes podem estar em qualquer lugar dentro da sua hierarquia. Também podem estar todos no mesmo GameObject, que é um padrão comum.
:::

 > **[Castle Builder](https://castle.needle.tools/)** usa tudo o acima para uma experiência sandbox multijogador multiplataforma.
 > — #madebyneedle 💚

### Componentes AR Especiais

1. **Definir a raiz e escala da sessão AR**
  Adicione um componente `WebARSessionRoot` ao seu objeto raiz. Para experiências AR, muitas vezes quer dimensionar a cena para se ajustar ao mundo real.
2. Defina a **escala do utilizador** para diminuir (< 1) ou aumentar (> 1) o utilizador em relação à cena ao entrar em AR.

### Controlar a exibição de objetos para XR

1. **Definir se um objeto está visível no Navegador, AR, VR, Primeira Pessoa, Terceira Pessoa**
  Adicione um componente `XR Flag` ao objeto que pretende controlar.

2. **Altere as opções no dropdown** conforme necessário.
    Usos comuns são
    - ocultar pisos ao entrar em AR
    - ocultar partes do Avatar em visualizações de Primeira ou Terceira Pessoa. Por exemplo, na visualização em primeira pessoa, uma pessoa não deve ser capaz de ver o modelo da sua própria cabeça.

### Viajar entre mundos VR

O Needle Engine suporta o estado [`sessiongranted`](https://github.com/immersive-web/navigation). Isto permite que os utilizadores atravessem perfeitamente entre aplicações WebXR sem sair de uma sessão imersiva – permanecem em VR ou AR.

Atualmente, isto só é suportado no Oculus Quest 1, 2 e 3 no Oculus Browser. Noutras plataformas, os utilizadores serão expulsos da sua sessão imersiva atual e terão de entrar em VR novamente na nova página.
Requer a ativação de uma flag do navegador: `chrome://flags/#webxr-navigation-permission`

- **Clicar em objetos para abrir links**
  Adicione o componente `OpenURL` que facilita muito a construção de mundos conectados.

## Scripting
Leia mais sobre scripting para XR na [documentação de scripting XR](./scripting.md#xr-event-methods)

## Avatares

Embora atualmente não forneçamos uma integração pronta para sistemas de avatar externos, pode criar avatares específicos para aplicações ou sistemas personalizados.

- **Criar um Avatar personalizado**
  - Crie um GameObject vazio como raiz do avatar
  - Adicione um objeto chamado `Head` e adicione um `XRFlag` definido para Terceira Pessoa
  - Adicione objetos chamados `HandLeft` e `HandRight`
  - Adicione os seus gráficos abaixo destes objetos.

### Componentes Experimentais de Avatar

Existem vários componentes experimentais para construir Avatares mais expressivos. Neste momento, recomendamos duplicá-los para criar as suas próprias variantes, pois podem ser alterados ou removidos posteriormente.

![20220817-230858-87dG-Unity_PLjQ](https://user-images.githubusercontent.com/2693840/185243523-57c4b2a9-0ec7-4f88-b53b-585e879d504d.gif)
*Exemplo de Avatar Rig com modelo básico de pescoço e restrições de membros*

- **Cores Aleatórias de Jogador**
  Como exemplo de personalização de avatar, pode adicionar um componente `PlayerColor` aos seus renderers.
  Esta cor aleatória é sincronizada entre os jogadores.

- **Rotação de Olhos**
  `AvatarEyeLook_Rotation` roda GameObjects (olhos) para seguir outros avatares e um alvo aleatório. Este componente é sincronizado entre os jogadores.

- **Piscar de Olhos**
  `AvatarBlink_Simple` oculta aleatoriamente GameObjects (olhos) a cada poucos segundos, emulando um piscar de olhos.

![image](https://user-images.githubusercontent.com/2693840/185233753-e6de49f0-31c3-4851-9919-551309303ebd.png)
*Exemplo de hierarquia de Prefab de Avatar*

- **Offset Constraint**
  `OffsetConstraint` permite deslocar um objeto em relação a outro no espaço do Avatar. Isto permite, por exemplo, que um Corpo siga a Cabeça, mas mantenha a rotação nivelada. Também permite construir modelos simples de pescoço.

- **Limb Constraint**
  `BasicIKConstraint` é uma restrição muito minimalista que utiliza duas transformações e uma dica. Isto é útil para construir cadeias simples de braços ou pernas. Como a rotação não está atualmente implementada corretamente, braços e pernas podem precisar de ser rotacionalmente simétricos para "parecerem bem". É chamado "Basic" por uma razão!

## Sobreposições de Conteúdo HTML em AR

Se quiser exibir conteúdo html diferente consoante o cliente estiver a usar um navegador normal ou AR ou VR, pode simplesmente usar um conjunto de classes html.
Isto é controlado através de classes de elementos HTML. Por exemplo, para fazer com que o conteúdo apareça no desktop e em AR, adicione um ``<div class="desktop ar"> ... </div>`` dentro da tag `<needle-engine>`:

```html
<needle-engine>
    <div class="desktop ar" style="pointer-events:none;">
        <div class="positioning-container">
          <p>seu conteúdo para AR e desktop vai aqui</p>
          <p class="only-in-ar">Isto só estará visível em AR</p>
        <div>
    </div>
</needle-engine>
```

As Sobreposições de Conteúdo são implementadas usando a funcionalidade opcional `dom-overlay`, que geralmente é suportada em dispositivos AR baseados em ecrã (telefones, tablets).

Use a classe `.ar-session-active` para mostrar/ocultar conteúdo específico enquanto estiver em AR. A pseudo-classe [`:xr-overlay`](https://www.w3.org/TR/webxr-dom-overlays-1/#css-pseudo-class) não deve ser usada neste momento porque o seu uso quebra o WebXR Viewer da Mozilla.

```css
.only-in-ar {
  display: none;
}

.ar-session-active .only-in-ar {
  display:initial;
}
```

É importante notar que o elemento de sobreposição [será sempre exibido em ecrã inteiro enquanto estiver em XR](https://www.w3.org/TR/webxr-dom-overlays-1/#ua-style-sheet-defaults), independentemente do estilo que tenha sido aplicado. Se quiser alinhar itens de forma diferente, deve criar um container _dentro_ do elemento `class="ar"`.

<sample src="https://engine.needle.tools/samples-uploads/ar-overlay/"/>

## Realidade Aumentada e WebXR em iOS

As experiências de Realidade Aumentada em iOS são algo limitadas, devido à Apple atualmente não suportar WebXR em dispositivos iOS.

As [Everywhere Actions](everywhere-actions.md) do Needle Engine foram concebidas para preencher essa lacuna, trazendo capacidades interativas automáticas para dispositivos iOS em cenas compostas por componentes específicos. Elas suportam um subconjunto da funcionalidade que está disponível em WebXR, por exemplo, áudio espacial, rastreamento de imagem, animações e muito mais. Veja [a documentação](everywhere-actions.md) para mais informações.

:::tip Suporte limitado a código personalizado no QuickLook
A Apple impõe fortes limitações quanto ao tipo de conteúdo que pode ser usado no QuickLook. Assim, componentes de script personalizados não podem ser convertidos automaticamente para uso em AR no iOS. Pode adicionar suporte para alguns tipos de código personalizado usando a nossa API Everywhere Actions.
:::

### Instrumento Musical – Suporte WebXR e QuickLook

Aqui está um exemplo de um instrumento musical que usa Everywhere Actions e, portanto, funciona em navegadores e em AR em dispositivos iOS.
Utiliza áudio espacial, animação e interações de toque.
<sample src="https://engine.needle.tools/samples-uploads/musical-instrument" />

### Everywhere Actions e outras opções para AR em iOS

Existem também outras opções para guiar utilizadores de iOS para experiências AR interativas ainda mais capazes:

3. **Exportar conteúdo em tempo real como ficheiros USDZ.**
   Estes ficheiros podem ser exibidos em dispositivos iOS em AR. Quando exportados de cenas com Everywhere Actions, a interatividade é a mesma, mais do que suficiente para configuradores de produtos, experiências narrativas e semelhantes.
   Um exemplo é o [Castle Builder](https://castle.needle.tools), onde as criações (não a sessão ao vivo) podem ser vistas em AR.

 > **[Encryption in Space](https://accurate-tree-observation.glitch.me/)** utiliza esta abordagem. Os jogadores podem colaborar para colocar texto na cena nos seus ecrãs e depois ver os resultados em AR no iOS. No Android, também podem interagir diretamente em WebXR.
 > — #madewithneedle por Katja Rempel 💚

1. **Guiar utilizadores para navegadores compatíveis com WebXR no iOS.**
   Dependendo do seu público-alvo, pode guiar utilizadores em iOS para, por exemplo, o [WebXR Viewer](https://apps.apple.com/de/app/webxr-viewer/id1295998056) da Mozilla para experimentar AR no iOS.

2. **Usar acesso à câmara e algoritmos personalizados em dispositivos iOS.**
   Pode solicitar acesso à imagem da câmara e executar algoritmos personalizados para determinar a pose do dispositivo.
   Embora atualmente não forneçamos componentes integrados para isto, aqui estão algumas referências a bibliotecas e frameworks que queremos experimentar no futuro:
   - [AR.js](https://github.com/AR-js-org/AR.js) (código aberto)
     - [Integração experimental AR.js](https://github.com/FireDragonGameStudio/NeedleAndARjs) por FireDragonGameStudio
   - [Mind AR](https://github.com/hiukim/mind-ar-js) (código aberto)
   - [8th Wall](https://www.8thwall.com/) (comercial)

## Rastreamento de Imagem

O Needle Engine suporta **WebXR Image Tracking** ([Demo ao Vivo](https://engine.needle.tools/samples/image-tracking?utm_source=docs&utm_content=xr)) no Android e **QuickLook Image Tracking** no iOS.

Pode encontrar documentação adicional na secção [Everywhere Actions](everywhere-actions.md#image-tracking).

:::warning O WebXR Image Tracking ainda está na fase de "draft" e não está geralmente disponível
Até agora, os fornecedores de navegadores não conseguiram concordar na API final para o rastreamento de imagem no WebXR. Enquanto a especificação estiver na fase de "draft" ([Marker Tracking Explainer](https://github.com/immersive-web/marker-tracking/blob/main/explainer.md)),
você e os utilizadores da sua aplicação precisam de seguir estes passos para ativar o WebXR ImageTracking em dispositivos Android:
1. Visite ``chrome://flags`` no seu navegador Chrome Android
2. Encontre e ative a opção `WebXR Incubations`
:::

Sem essa especificação, ainda é possível solicitar acesso à imagem da câmara e executar algoritmos personalizados para determinar a pose do dispositivo. A desvantagem é que os utilizadores terão de aceitar permissões adicionais como o acesso à câmara, e o rastreamento não será tão preciso quanto com as capacidades nativas do dispositivo.

Aqui estão algumas bibliotecas para adicionar rastreamento de imagem baseado no acesso à câmara e algoritmos de visão computacional local:
   - [Integração experimental AR.js com Needle Engine](https://github.com/FireDragonGameStudio/NeedleAndARjs) por FireDragonGameStudio
   - [AR.js](https://github.com/AR-js-org/AR.js) (código aberto)
   - [Mind AR](https://github.com/hiukim/mind-ar-js) (código aberto)


## Referências

[WebXR Device API](https://www.w3.org/TR/webxr/)
[caniuse: WebXR](https://caniuse.com/webxr)
[Apple's Preliminary USD Behaviours](https://developer.apple.com/augmented-reality/quick-look/)


Página traduzida automaticamente usando IA