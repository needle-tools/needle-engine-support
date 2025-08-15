---
title: Rastreamento de Imagens WebXR com Needle Engine
---

## O que é Rastreamento de Imagens WebXR
**O rastreamento de imagens WebXR permite que os navegadores detetem e rastreiem imagens específicas no mundo real** através da câmara de um dispositivo, fornecendo dados de posição e orientação em tempo real para ancorar conteúdo virtual precisamente em marcadores físicos como cartazes, embalagens ou obras de arte.

Ao apontar a câmara para uma imagem reconhecida, a API de rastreamento de imagens atualiza continuamente a relação espacial entre os elementos virtuais e físicos, garantindo o alinhamento adequado mesmo quando o dispositivo ou a imagem se movem.

O rastreamento de imagens transforma imagens estáticas em gatilhos de RA interativos—permitindo que pinturas de museus exibam informações sobrepostas, embalagens de produtos revelem animações 3D, ou cartões de visita mostrem detalhes de contacto flutuantes—tudo através de padrões web sem exigir que os utilizadores descarreguem aplicações dedicadas, tornando as experiências de RA instantaneamente acessíveis através de qualquer navegador web compatível.

## Demonstração

Needle Engine suporta **Rastreamento de Imagens WebXR** ([Demonstração ao Vivo](https://engine.needle.tools/samples/image-tracking?utm_source=docs&utm_content=xr)) no Android e **Rastreamento de Imagens QuickLook** no iOS.

Inicie a cena abaixo em RA e aponte a câmara do seu telemóvel para o marcador de imagem num ecrã, ou imprima-o.

:::info Rastreamento de Imagens WebXR no Android
**No Android** por favor ative "WebXR Incubations" nas Chrome Flags. Pode encontrá-las colando [chrome://flags/#webxr-incubations](chrome://flags/#webxr-incubations) na barra de endereço do navegador Chrome do seu telemóvel Android.
:::


<img src="https://engine.needle.tools/samples-uploads/image-tracking/assets/needle-marker.png" alt="Marcador de Imagem" width=300 />

<sample src="https://engine.needle.tools/samples-uploads/image-tracking" />


## Explicador


:::warning O Rastreamento de Imagens WebXR ainda está em fase de "rascunho" e não está geralmente disponível
Até agora, os fornecedores de navegadores não conseguiram chegar a um acordo sobre a API final de rastreamento de imagens para WebXR. Enquanto a especificação estiver em fase de "rascunho" ([Explicador de Rastreamento de Marcadores](https://github.com/immersive-web/marker-tracking/blob/main/explainer.md)),
você e os utilizadores da sua aplicação precisam de seguir estes passos para ativar o Rastreamento de Imagens WebXR em dispositivos Android:
1. Visite ``chrome://flags`` no seu navegador Chrome para Android
2. Encontre e ative a opção `WebXR Incubations`
:::

Sem essa especificação, ainda é possível solicitar acesso à imagem da câmara e executar algoritmos personalizados para determinar a pose do dispositivo. A desvantagem é que os utilizadores terão de aceitar permissões adicionais, como acesso à câmara, e o rastreamento não será tão preciso como com as capacidades nativas do dispositivo.

Aqui estão algumas bibliotecas para adicionar rastreamento de imagens baseado no acesso à câmara e algoritmos de visão computacional local:
   - [Integração experimental AR.js com Needle Engine](https://github.com/FireDragonGameStudio/NeedleAndARjs) por FireDragonGameStudio
   - [AR.js](https://github.com/AR-js-org/AR.js) (código aberto)
   - [Mind AR](https://github.com/hiukim/mind-ar-js) (código aberto)


### Integrações
O Rastreamento de Imagens pode ser configurado tanto no Unity quanto no Blender, adicionando um componente WebXRImageTracking a um objeto. Em seguida, adicione as suas imagens ao array `Tracked Images`.

![unity screenshot](/imgs/webxr-image-tracking-unity-component.jpg)
*Componente de rastreamento de imagens no Unity*

![blender screenshot](/imgs/webxr-image-tracking-blender-component.jpg)
*Componente de rastreamento de imagens no Blender*

## Referências

- [WebXR Marker Tracking Explainer](https://github.com/immersive-web/marker-tracking/blob/main/explainer.md)
- [WebXR Device API](https://www.w3.org/TR/webxr/)
- [caniuse: WebXR](https://caniuse.com/webxr)
- [Apple's Preliminary USD Behaviours](https://developer.apple.com/augmented-reality/quick-look/)


## Leitura adicional
- [Ações em Todo o Lado do Needle](./everywhere-actions.md) *experiências que funcionam em todo o lado*
- [Documentação XR](./xr.md)


---
Página traduzida automaticamente usando IA