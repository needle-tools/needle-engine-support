---
title: Componentes Principais do Needle
---

# Componentes Principais do Needle

Aqui está uma visão geral de alguns dos componentes que fornecemos. Muitos deles mapeiam para componentes e funcionalidades em Unity, Blender ou outras integrações.

Para uma lista completa, consulte a nossa [documentação da API](https://engine.needle.tools/docs/api/latest).

Pode sempre adicionar os seus próprios componentes ou adicionar wrappers para componentes Unity que ainda não fornecemos.

Saiba mais na secção [Scripting](./scripting.md) da nossa documentação.

## Audio
| Name  | Description |
| ------------- | ------------- |
| `AudioListener` |  |
| `AudioSource` | Usar para reproduzir áudio |

## Animation
| Name  | Description |
| ------------- | ------------- |
| `Animator` com `AnimatorController` | Exporta com máquina de estado de animação, condições, transições  |
| `Animation` | Componente de animação mais básico. Apenas o primeiro clip é exportado |
| `PlayableDirector` com `TimelineAsset` | Exporta sequências poderosas para controlar animação, áudio, estado e mais |

## Rendering
| Name  | Description |
| ------------- | ------------- |
| `Camera` |  |
| `Light` | DirectionalLight, PointLight, Spotlight. Note que pode usá-lo para fazer bake de luz (e.g. formas Rectangular Light) também |
| `XRFlag` | Controla quando os objetos serão visíveis. E.g. habilitar objeto apenas em AR  |
| `DeviceFlag` | Controla em que dispositivo os objetos serão visíveis  |
| `LODGroup` |  |
| `ParticleSystem` | Experimental e atualmente não totalmente suportado |
| `VideoPlayer` | Reproduz vídeos de url ou ficheiro de vídeo referenciado (será copiado para o output na exportação). O VideoPlayer também suporta streaming de objetos MediaStream ou URLs de livestream `M3U8` |
| `MeshRenderer` | Usado para lidar com o rendering de objetos incluindo lightmapping e instancing |
| `SkinnedMeshRenderer` | *Ver MeshRenderer* |
| `SpriteRenderer` | Usado para renderizar Sprites e Spriteanimations |
| `Volume` com asset `PostProcessing` | Ver [tabela abaixo](#postprocessing) |

### Postprocessing

Os efeitos de postprocessing usam a [biblioteca pmndrs postprocessing](https://www.npmjs.com/package/postprocessing) por baixo. Isso significa que também pode adicionar facilmente os seus próprios efeitos personalizados e obter um passo de postprocessing otimizado automaticamente.

- **Unity only**: *Note que efeitos de Postprocessing usando um Volume em Unity só são suportados com URP*

| Effect Name | |
| --- | --- |
| Antialiasing | *componente Unity extra* |
| Bloom | *via asset Volume* |
| Chromatic Aberration | *via asset Volume* |
| Color Adjustments / Color Correction | *via asset Volume* |
| Depth Of Field | *via asset Volume* |
| Vignette | *via asset Volume* |
| ToneMappingEffect | *via asset Volume ou componente separado* |
| Pixelation | |
| Screenspace Ambient Occlusion N8 | |
| Screenspace Ambient Occlusion | |
| Tilt Shift Effect | |
| SharpeningEffect | |
| *O seu efeito personalizado* | [Ver exemplo no stackblitz](https://stackblitz.com/edit/needle-engine-custom-postprocessing-effect) |

## Networking
| Name  | Description |
| ------------- | ------------- |
| `SyncedRoom` | Componente principal de networking. Coloque na sua cena para habilitar networking |
| `Networking` | Usado para configurar o servidor backend para networking. |
| `SyncedTransform` | Rede automaticamente a transformação de objetos |
| `SyncedCamera` | Rede automaticamente a posição da câmara e a vista para outros utilizadores na sala. Pode definir como a câmara está a ser renderizada referenciando um objeto |
| `WebXRSync` | Rede avatares WebXR (AR e VR) |
| `Voip` | Habilita chat de voz |
| `Screensharing` | Habilita capacidades de partilha de ecrã |

## Interaction
| Name  | Description |
| ------------- | ------------- |
| `EventSystem` | Lida com a emissão de eventos de ponteiro e eventos de UI em objetos na cena |
| `ObjectRaycater` | Necessário para DragControls e Duplicatable |
| `GraphicsRaycaster` | O mesmo que ObjectRaycaster mas para elementos de UI |
| `DragControls` | Permite que objetos sejam arrastados na cena. Requer raycaster na hierarquia pai, e.g. ObjectRaycater |
| `Duplicatable` | Pode duplicar objetos atribuídos por arrasto. Requer DragControls |
| `Interactable` | Componente básico para marcar um objeto como interativo. |
| `OrbitControls` | Adicione à câmara para adicionar funcionalidade de controlo de órbita da câmara |
| `SmoothFollow` | Permite interpolar suavemente para a transformação de outro objeto |
| `DeleteBox` | Destruirá objetos com o componente `Deletable` ao entrar na caixa |
| `Deletable` | O GameObject ao qual este componente está anexado será eliminado quando entrar ou intersetar com um `DeleteBox` |
| `DropListener` | Adicione para receber eventos de arrasto de ficheiros para upload |
| `SpatialTrigger` | Use para emitir um evento se um objeto entrar num espaço ou área específica. Pode também usar eventos de Physics |
| `SpatialTriggerReceiver` | Use para receber eventos de SpatialTrigger |

## Physics

Physics é implementado usando [Rapier](https://rapier.rs/).

| Name  | Description |
| ------------- | ------------- |
| `Rigidbody` | Adicione para fazer um objeto reagir à gravidade (ou ser cinemático e estático) |
| `BoxCollider` | Uma forma de colisor Box com a qual os objetos podem colidir ou emitir eventos de gatilho quando definido como `trigger` |
| `SphereCollider` | *Ver BoxCollider* |
| `CapsuleCollider` | *Ver BoxCollider* |
| `MeshCollider` | *Ver BoxCollider* |
| Physics Materials | Physics materials podem ser usados para definir e.g. a elasticidade de um colisor |

## XR / WebXR

[Leia a documentação XR](xr.md)

| Name  | Description |
| ------------- | ------------- |
| `WebXR` | Adicione à cena para suporte VR, AR e Passthrough, bem como para renderizar modelos de Avatar |
| [`USDZExporter`](./everywhere-actions.md) | Adicione para habilitar suporte USD e Quicklook
| `XRFlag` | Controla quando os objetos são visíveis, e.g. apenas em VR ou AR ou apenas em ThirdPerson |
| `WebARSessionRoot` | Lida com a colocação e escala da sua cena no modo AR |
| `WebARCameraBackground` | Adicione para aceder à imagem da câmara AR e aplicar efeitos ou usá-la para rendering |
| `WebXRImageTracking` | Atribua imagens a serem rastreadas e opcionalmente instancie um objeto na posição da imagem |
| `WebXRPlaneTracking` | Crie meshes de plano ou colisores para planos rastreados |
| `XRControllerModel` | Pode ser adicionado para renderizar controladores de dispositivo ou modelos de mão (serão criados por padrão quando habilitado no componente WebXR) |
| `XRControllerMovement` | Pode ser adicionado para fornecer controlos padrão de movimento e teletransporte |
| `XRControllerFollow` | Pode ser adicionado a qualquer objeto na cena e configurado para seguir a mão ou controlador esquerdo ou direito |


## Debugging
| Name  | Description |
| ------------- | ------------- |
| `GridHelper` | Desenha uma grelha |
| `BoxGizmo` | Desenha uma caixa |
| `AxesHelper` | Desenha eixos XYZ |
| | Nota: Quando estiver a escrever código personalizado, pode usar os métodos estáticos `Gizmos` para desenhar linhas e formas de depuração | |

## Runtime File Input/Output
| Name  | Description |
| ------------- | ------------- |
| `GltfExport` | Experimental! Use para exportar gltf do runtime web. |
| `DropListener` | Receber eventos de arrasto de ficheiros para upload e networking |

## UI

Os componentes Spatial UI são mapeados de Unity UI (Canvas, não UI Toolkit) para [three-mesh-ui](https://github.com/felixmariotto/three-mesh-ui).
A UI pode ser animada.

| Name  | Description |
| ------------- | ------------- |
| `Canvas` | Sistema de UI do Unity. Necessita de estar no modo World Space neste momento. |
| `Text (Legacy)` | Renderiza Texto usando o componente UI Text do Unity. Fontes personalizadas são suportadas, um atlas de fontes será gerado automaticamente na exportação. Use as configurações de fonte ou o componente `FontAdditionalCharacters` para controlar quais caracteres estão incluídos no atlas.<br/>**Nota**: No Unity, certifique-se de usar o componente `Legacy/Text` (*TextMeshPro* não é suportado no momento) |
| `Button` | Recebe eventos de clique - use o evento onClick para reagir a ele. Pode ser adicionado a objetos de cena 3D também.<br/>**Nota**: Certifique-se de usar o componente `Legacy/Text` no Botão (ou crie o Botão através do menu de contexto `UI/Legacy/Button` do Unity, uma vez que *TextMeshPro* não é suportado no momento) |
| `Image` | Renderiza uma imagem sprite |
| `RawImage` | Renderiza uma textura |
| `InputField` | Permite input de texto |

**Nota**: Dependendo do seu projeto, muitas vezes faz sentido uma mistura de UI espacial e 2D para projetos cross-platform onde VR, AR, e ecrãs são suportados. Tipicamente, construiria as partes 2D com HTML para melhor acessibilidade, e as partes 3D com UIs geométricas que também suportam offsets de profundidade (e.g. estados de hover de botão e similares).

## Other

| Name  | Description |
| ------------- | ------------- |
| `SceneSwitcher` | Lida com o carregamento e descarregamento de outras cenas ou prefabs / ficheiros glTF. Tem funcionalidades para precarregar, mudar de cena via swipe, eventos de teclado ou navegação por URL |

## Editor Only
| Name  | Description |
| --- | --- |
| `ExportInfo` | Componente principal para gerir o(s) projeto(s) web, e.g. para instalar ou iniciar a aplicação web
| `EditorSync` | Adicione para habilitar a rede de alterações de valor de material ou componente para a aplicação three.js em execução diretamente do Unity Editor sem ter que recarregar |

---
Página traduzida automaticamente usando IA