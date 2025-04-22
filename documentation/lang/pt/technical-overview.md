# Visão Geral Técnica

## Como funciona

O Needle Engine consiste grosso modo em três partes:
- um número de **components e ferramentas** que lhe permitem configurar cenas para o Needle Engine a partir, por exemplo, do Unity Editor.  
- um **exporter** que transforma dados de cena e component em glTF.
- um **runtime web** que carrega e executa os ficheiros glTF produzidos e as suas extensions.

O runtime web usa three.js para rendering, adiciona um sistema de component sobre o scene graph do three e liga loaders de extension para as nossas glTF extensions personalizadas.  

Efetivamente, isto transforma ferramentas como o Unity ou Blender em centros de excelência para desenvolvimento web espacial – adicionando glTF assets ao fluxo de trabalho típico de HTML, CSS, JavaScript e bundling.  


## glTF Assets

Modelos, textures, animations, lights, cameras e mais são armazenados como [ficheiros glTF 2.0](https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html) no Needle Engine.  
Dados personalizados são armazenados em [vendor extensions](#vendor-specific-gltf-extensions-needle_). Estas abrangem tudo, desde interactive components a physics, sequencing e lightmaps.  

### glTF extensions suportadas

Um glTF de produção típico criado pelo Needle Engine usa as seguintes extensions:  
```
KHR_lights_punctual
KHR_materials_unlit
KHR_texture_transform
KHR_animation_pointer
NEEDLE_techniques_webgl
NEEDLE_gameobject_data
NEEDLE_components
NEEDLE_persistent_assets
NEEDLE_lightmaps
NEEDLE_lighting_settings
KHR_texture_basisu
KHR_draco_mesh_compression
```

Outras extensions suportadas:
```
EXT_meshopt_compression
EXT_mesh_gpu_instancing (import and export)
```

Material extensions suportadas:  

```
KHR_materials_clearcoat
KHR_materials_ior
KHR_materials_specular
KHR_materials_transmission
KHR_materials_iridescence
KHR_materials_unlit
KHR_materials_volume
```

Mais extensions e extensions personalizadas podem ser adicionadas usando os export callbacks do UnityGLTF (ainda não documentado) e as [glTF import extensions](https://threejs.org/docs/#examples/en/loaders/GLTFLoader) do three.js.  

> **Nota**: Materials que usam estas extensions podem ser exportados do Unity via o material `PBRGraph` do UnityGLTF.  

> **Nota**: Audio e variants já são suportados no Needle Engine através de `NEEDLE_components` e `NEEDLE_persistent_assets`, mas existem algumas opções para um maior alinhamento com propostas existentes como `KHR_audio` e `KHR_materials_variants`.

[Saiba mais sobre GLTF loading em three.js](https://threejs.org/docs/#examples/en/loaders/GLTFLoader)

### Compression

Para produção, comprimimos glTF assets com [`glTF-transform`](https://gltf-transform.donmccurdy.com/). Textures usam `etc1s`, `uastc`, `webp` ou nenhuma compression, dependendo do tipo de texture. Meshes usam `draco` por defeito, mas podem ser configurados para usar `meshtopt` (per ficheiro glTF). Custom extensions são passadas de forma opaca.  

Veja a página [deployment & compression](./deployment.md#optimization-and-compression-options) para mais informações


## glTF Extensions Específicas do Vendor (NEEDLE_*)

O Needle Engine armazena dados personalizados em ficheiros glTF através das nossas vendor extensions. Estas extensions foram concebidas para serem flexíveis e permitir que dados relativamente arbitrários sejam colocados nelas. De notar, nenhum código é armazenado nestes ficheiros. Interactive components são restaurados a partir dos dados no runtime. Isto tem algumas semelhanças com a forma como os AssetBundles funcionam no Unity – o lado recetor de um asset precisa de ter código correspondente para components armazenados no ficheiro.  

> Atualmente, não estamos a fornecer schemas para estas extensions, pois ainda estão em desenvolvimento. Os snippets JSON abaixo demonstram o uso de extensions por exemplo e incluem notas sobre escolhas arquitetónicas e o que podemos mudar em futuras versões.  

> As referências entre partes de dados são atualmente construídas através de uma mistura de índices para outras partes do ficheiro glTF e JSON pointers. Podemos consolidar estas abordagens numa futura versão. Também estamos a armazenar GUIDs baseados em string para casos em que a ordenação é difícil de resolver (por exemplo, dois components referenciando-se mutuamente) que podemos remover no futuro.  

### NEEDLE_components

Esta extension contém dados de component por node. Os nomes dos component mapeiam para nomes de tipo tanto no lado JavaScript como no lado C#. Múltiplos components com o mesmo nome podem ser adicionados ao mesmo node.  

Os dados em `NEEDLE_components` podem ser animados via a extension [`KHR_animation_pointer`](https://github.com/ux3d/glTF/tree/extensions/KHR_animation_pointer/extensions/2.0/Khronos/KHR_animation_pointer), atualmente não ratificada.  

```json
"NEEDLE_components": {
  "builtin_components": [
    {
      "name": "WebARSessionRoot",
      "guid": "1516450550",
      "arScale": 50,
      "invertForward": true,
      "enabled": true,
      "gameObject": {
        "node": 0
      }
    },
    {
      "name": "SyncedRoom",
      "guid": "1516450552",
      "roomName": "network-room",
      "urlParameterName": "room",
      "joinRandomRoom": true,
      "requireRoomParameter": false,
      "autoRejoin": true,
      "enabled": true,
      "gameObject": {
        "node": 0
      }
    },
    {
      "name": "PlayableDirector",
      "guid": "2243275882009986562_1668529989451832962",
      "state": 0,
      "extrapolationMode": 1,
      "playableAsset": "extensions/NEEDLE_persistent_assets/4",
      "playableGraph": {},
      "playOnAwake": true,
      "timeUpdateMode": 0,
      "time": 0,
      "initialTime": 0,
      "duration": 135.383333333332,
      "enabled": true,
      "gameObject": {
        "node": 0
      }
    }
  ]
}
```

> **Nota**: Armazenar apenas o nome do tipo de component significa que os nomes de tipo precisam atualmente de ser únicos por projeto. Estamos a planear incluir nomes de pacote numa futura versão para aliviar esta restrição para nomes de tipo de component únicos por pacote, em vez de globalmente.  

> **Nota**: Atualmente não existe informação de versioning na extension (a qual pacote npm pertence um component, contra qual versão desse pacote foi exportado). Estamos a planear incluir informação de versioning numa futura versão.  

> **Nota**: Atualmente todos os components estão no array `builtin_components`. Poderemos renomear isto para apenas `components` numa futura versão.  

### NEEDLE_gameobject_data

Esta extension contém dados adicionais por node relacionados com estado, layers e tags. Layers são usadas tanto para rendering como para physics, de forma semelhante à forma como [three.js](https://threejs.org/docs/#api/en/core/Layers) e [Unity](https://docs.unity3d.com/Manual/Layers.html) as tratam.  

```json
"NEEDLE_gameobject_data": {
  "layers": 0,
  "tag": "Untagged",
  "hideFlags": 0,
  "static": false,
  "activeSelf": true,
  "guid": "1516450549"
}
```

> **Nota**: Poderemos ter de explicar melhor por que razão esta não é outra entrada em [`NEEDLE_components`](#needle_components). 

### NEEDLE_lighting_settings

Esta é uma root extension que define propriedades de iluminação ambiente per ficheiro glTF.   

```json
"NEEDLE_lighting_settings": {
  "ambientMode": 0,
  "ambientLight": [
    0.212,
    0.227,
    0.259,
    1
  ],
  "ambientIntensity": 1,
  "defaultReflectionMode": 0
}
```

> **Nota**: Esta extension pode ter de ser definida por scene em vez de por ficheiro.

### NEEDLE_lightmaps

Esta é uma root extension que define um conjunto de lightmaps para o ficheiro glTF.

```json
"NEEDLE_lightmaps": {
  "textures": [
    {
      "pointer": "textures/20",
      "type": 1,
      "index": 0
    }
  ]
}
```

> **Nota**: De momento, esta extension também contém referências a environment texture. Estamos a planear mudar isso numa futura versão. 

| Tipo de Texture | Valor |
| -- | -- |
| Lightmap | 0 |
| Environment Map  | 1 |
| Reflection Map | 2 |

A forma como os lightmaps são aplicados é definida no component `MeshRenderer` dentro da extension [`NEEDLE_components`](#needle_components) por node:  

```json
"NEEDLE_components": {
  "builtin_components": [
    {
      "name": "MeshRenderer",
      ...
      "lightmapIndex": 0,
      "lightmapScaleOffset": {
        "x": 1.00579774,
        "y": 1.00579774,
        "z": -0.00392889744,
        "w": -0.00392889744
      },
      ...
    }
  ]
}
```

> **Nota**: Poderemos mudar isso numa futura versão e mover dados relacionados com lightmap para uma entrada de extension `NEEDLE_lightmap` por node. 

### NEEDLE_persistent_assets

Components em `NEEDLE_components` podem referenciar dados via JSON Pointers. Os dados em `NEEDLE_persistent_assets` são frequentemente referenciados múltiplas vezes por diferentes components e são assim armazenados separadamente numa root extension. Por design, são sempre referenciados por outra coisa (ou têm referências entre si), e portanto não armazenam informação de tipo de todo: são simplesmente peças de dados JSON e os components que os referenciam precisam atualmente de saber o que esperam. 

Exemplos de assets/dados armazenados aqui são:  
- AnimatorControllers, as suas layers e estados
- PlayableAssets (timelines), as suas tracks e embedded clips
- SignalAssets
- ...

Dados em `persistent_assets` podem referenciar outros `persistent_assets` via JSON Pointer, mas por design não podem referenciar `NEEDLE_components`. Isto é semelhante à separação entre "Scene data" e "AssetDatabase content" no Unity. 

```json
{
  "name": "LampionController",
  "guid": "9100000_ecab75bc7ab51a747a4c5c14236a43cd",
  "parameters": [],
  "layers": [
    {
      "name": "Base Layer",
      "stateMachine": {
        "name": "Base Layer",
        "defaultState": 0,
        "states": [
          {
            "name": "LampionFlying",
            "hash": 677739540,
            "motion": {
              "name": "LampionFlying",
              "isLooping": false,
              "guid": "7400000_c296c4d76e956b34f8b5833ba90653c1",
              "clips": [
                {
                  "node": "nodes/4",
                  "clip": "animations/0"
                },
                {
                  "node": "nodes/9",
                  "clip": "animations/6"
                },
                {
                  "node": "nodes/14",
                  "clip": "animations/12"
                }
              ]
            },
            "transitions": [
              {
                "isExit": false,
                "exitTime": 1,
                "hasFixedDuration": true,
                "offset": 0,
                "duration": 0,
                "hasExitTime": true,
                "destinationState": 0,
                "conditions": []
              }
            ]
          }
        ],
        "entryTransitions": []
      }
    }
  ]
},
{
  "name": "TrongCom Website",
  "guid": "11400000_93a8f856fe26af8498d94efe4835af36",
  "tracks": [
    {
      "name": "Markers",
      "type": "MarkerTrack",
      "muted": false,
      "outputs": [
        null
      ],
      "clips": [],
      "markers": [],
      "trackOffset": null
    },
    {
      "name": "Animation Track",
      "type": "AnimationTrack",
      "muted": false,
      "outputs": [
        "5017454109690854928_1668529989451832962"
      ],
      "clips": [
        {
          "start": 0,
          "end": 0.9833333333333333,
          "duration": 0.9833333333333333,
          "timeScale": 1,
          "asset": {
            "clip": "animations/78",
            "loop": false,
            "duration": 8,
            "position": {
              "x": 0,
              "y": 0,
              "z": 0
            },
            "rotation": {
              "x": 0,
              "y": 0,
              "z": 0,
              "w": 1
            },
            "removeStartOffset": true
          },
          "clipIn": 0,
          "easeInDuration": 0,
          "easeOutDuration": 0.41666666666666663,
          "preExtrapolationMode": 1,
          "postExtrapolationMode": 1
        },
        ... 
      ]
    }
  ]
}
```

> **Nota**: Poderemos incluir mais informação de tipo e versioning no futuro. 

### NEEDLE_techniques_webgl

Esta extension baseia-se na extension arquivada [`KHR_techniques_webgl`](https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Archived/KHR_techniques_webgl) e estende-a em alguns pontos cruciais. Enquanto a extension original foi especificada para WebGL 1.0, estamos a usá-la com WebGL 2.0 aqui e adicionámos um número de uniform types.  

```json
"KHR_techniques_webgl": {
  "programs": [
    {
      "vertexShader": 1,
      "fragmentShader": 0,
      "id": 0
    }
  ],
  "shaders": [
    {
      "name": "Pass-FRAGMENT",
      "type": 35632,
      "uri": "<embedded WebGL fragment shader code ...>",
      "id": 1
    },
    {
      "name": "Pass-VERTEX",
      "type": 35633,
      "uri": "<embedded WebGL vertex shader code ...>",
      "id": 0
    }
  ],
  "techniques": [
    {
      "program": 0,
      "attributes": {},
      "uniforms": {
        "_TimeParameters": {
          "name": "_TimeParameters",
          "type": 35666,
          "semantic": null,
          "count": 1,
          "node": 0
        },
        "hlslcc_mtx4x4unity_MatrixVP": {
          "name": "hlslcc_mtx4x4unity_MatrixVP",
          "type": 35666,
          "semantic": "_VIEWPROJECTION",
          "count": 4,
          "node": 0
        }
      },
      "defines": []
    }
  ]
}     
```

> **Nota**: Atualmente, vertex e fragment shaders estão sempre embutidos como URI; planeamos mover esses dados para bufferViews mais razoáveis no futuro.  

> **Nota**: Existem algumas propriedades redundantes aqui que planeamos limpar.  

## TypeScript e Data Mapping

> 🏗️ Em Construção

## Rendering com three.js

> 🏗️ Em Construção

## Porquê não estão a compilar para WebAssembly?

Embora o processo de compilação do Unity de C# para IL para C++ (via IL2CPP) para WASM (via emscripten) seja engenhoso, também é relativamente lento. Construir até um projeto simples para WASM leva muitos minutos, e esse processo é praticamente repetido a cada alteração de código. Parte disso pode ser evitada através de caching inteligente e garantindo que as dev builds não tentem retirar tanto código, mas ainda assim continua lento.  
> Temos um protótipo para alguma tradução WASM, mas está longe de estar completo e a velocidade de iteração continua lenta, pelo que não estamos a investigar ativamente este caminho neste momento. 

Ao analisar workflows web modernos, descobrimos que os tempos de reload de código durante o desenvolvimento são desprezáveis, geralmente na ordem dos sub-segundos. Isto, claro, troca alguma performance (interpretação de JavaScript on the fly em vez de otimização do compilador em tempo de build) por flexibilidade, mas os browsers tornaram-se muito bons a tirar o máximo partido de JavaScript.  

Acreditamos que, para iteração e workflows de teste rigorosos, é benéfico poder testar no dispositivo e na plataforma alvo (o browser, neste caso) o mais rápido e frequentemente possível - razão pela qual estamos a saltar todo o play mode do Unity, correndo efetivamente sempre no browser. 

> **Nota**: Um efeito secundário muito positivo é evitar todo o passo lento de "domain reload" que geralmente custa 15-60 segundos cada vez que entra no Play Mode. Está simplesmente "ao vivo" no browser no momento em que carrega em Play.


Página traduzida automaticamente usando IA