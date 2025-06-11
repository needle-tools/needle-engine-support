# Vue d'ensemble technique

## Comment ça marche

Needle Engine se compose en gros de trois parties :
- un certain nombre de **composants et d'outils** qui vous permettent de configurer des scènes pour Needle Engine à partir, par exemple, de l'éditeur Unity.  
- un **exportateur** qui transforme les données de scène et de composant en glTF.
- un **runtime web** qui charge et exécute les fichiers glTF produits et leurs extensions.

Le runtime web utilise three.js pour le rendu, ajoute un système de composants au-dessus du graphe de scène three.js et connecte des chargeurs d'extensions pour nos extensions glTF personnalisées.  

En substance, cela transforme des outils comme Unity ou Blender en puissances de développement web spatial – ajoutant des assets glTF au workflow typique HTML, CSS, JavaScript et de bundling.  


## Assets glTF

Les modèles, les textures, les animations, les lumières, les caméras et bien plus encore sont stockés sous forme de [fichiers glTF 2.0](https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html) dans Needle Engine.  
Les données personnalisées sont stockées dans des [extensions de fournisseur](#vendor-specific-gltf-extensions-needle_). Celles-ci couvrent tout, des composants interactifs à la physique, au séquençage et aux lightmaps.  

### Extensions glTF prises en charge

Un glTF de production typique créé par Needle Engine utilise les extensions suivantes :  
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

Autres extensions prises en charge :
```
EXT_meshopt_compression
EXT_mesh_gpu_instancing (import and export)
```

Extensions de matériaux prises en charge :  

```
KHR_materials_clearcoat
KHR_materials_ior
KHR_materials_specular
KHR_materials_transmission
KHR_materials_iridescence
KHR_materials_unlit
KHR_materials_volume
```

D'autres extensions et extensions personnalisées peuvent être ajoutées en utilisant les callbacks d'exportation de UnityGLTF (pas encore documentées) et les [extensions d'importation glTF](https://threejs.org/docs/#examples/en/loaders/GLTFLoader) de three.js.  

> **Note**: Les matériaux utilisant ces extensions peuvent être exportés depuis Unity via le matériau `PBRGraph` de UnityGLTF.  

> **Note**: L'audio et les variantes sont déjà pris en charge dans Needle Engine via `NEEDLE_components` et `NEEDLE_persistent_assets`, mais il existe des options pour mieux s'aligner sur les propositions existantes telles que `KHR_audio` et `KHR_materials_variants`.

[En savoir plus sur le chargement de GLTF dans three.js](https://threejs.org/docs/#examples/en/loaders/GLTFLoader)

### Compression

Pour la production, nous compressons les assets glTF avec [`glTF-transform`](https://gltf-transform.donmccurdy.com/). Les textures utilisent soit `etc1s`, `uastc`, `webp`, soit aucune compression, en fonction du type de texture. Les maillages utilisent `draco` par défaut mais peuvent être configurés pour utiliser `meshtopt` (par fichier glTF). Les extensions personnalisées sont transmises de manière opaque.  

Consultez la page [deployment & compression](./deployment.md#optimization-and-compression-options) pour plus d'informations


## Extensions glTF spécifiques au fournisseur (NEEDLE_*)

Needle Engine stocke des données personnalisées dans les fichiers glTF via nos extensions de fournisseur. Ces extensions sont conçues pour être flexibles et permettre d'y insérer des données relativement arbitraires. Il est à noter qu'aucun code n'est stocké dans ces fichiers. Les composants interactifs sont restaurés à partir des données au runtime. Cela présente certaines similitudes avec le fonctionnement des AssetBundles dans Unity – la partie réceptrice d'un asset doit avoir le code correspondant aux composants stockés dans le fichier.  

> Nous ne fournissons pas actuellement de schémas pour ces extensions car elles sont encore en développement. Les extraits JSON ci-dessous démontrent l'utilisation des extensions par exemple et incluent des notes sur les choix architecturaux et ce que nous pourrions modifier dans les futures versions.  

> Les références entre les éléments de données sont actuellement construites via un mélange d'indices vers d'autres parties du fichier glTF et de pointeurs JSON. Nous pourrions consolider ces approches dans une future version. Nous stockons également des GUID basés sur des chaînes pour les cas où l'ordonnancement est autrement difficile à résoudre (par exemple, deux composants se référençant mutuellement) que nous pourrions supprimer à l'avenir.  

### NEEDLE_components

Cette extension contient les données des composants par nœud. Les noms des composants correspondent aux noms de type côté JavaScript et côté C#.  
Plusieurs composants ayant le même nom peuvent être ajoutés au même nœud.  

Les données dans `NEEDLE_components` peuvent être animées via l'extension `KHR_animation_pointer` (actuellement non ratifiée) : https://github.com/ux3d/glTF/tree/extensions/KHR_animation_pointer/extensions/2.0/Khronos/KHR_animation_pointer.  

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

> **Note**: Le fait de stocker uniquement le nom du type de composant signifie que les noms de type doivent actuellement être uniques par projet. Nous prévoyons d'inclure les noms de package dans une future version pour assouplir cette contrainte à des noms de type de composant uniques par package plutôt que globalement.  

> **Note**: Actuellement, il n'y a pas d'informations de version dans l'extension (à quel package npm appartient un composant, contre quelle version de ce package a-t-il été exporté). Nous prévoyons d'inclure des informations de version dans une future version.  

> **Note**: Actuellement, tous les composants se trouvent dans le tableau `builtin_components`. Nous pourrions renommer cela simplement en `components` dans une future version.  

### NEEDLE_gameobject_data

Cette extension contient des données supplémentaires par nœud liées à l'état, aux couches (layers) et aux tags. Les couches sont utilisées à la fois pour le rendu et la physique, de manière similaire à la façon dont [three.js](https://threejs.org/docs/#api/en/core/Layers) et [Unity](https://docs.unity3d.com/Manual/Layers.html) les traitent.  

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

> **Note**: Nous devrons peut-être mieux expliquer pourquoi cela n'est pas une autre entrée dans [`NEEDLE_components`](#needle_components). 

### NEEDLE_lighting_settings

Il s'agit d'une extension racine définissant les propriétés d'éclairage ambiant par fichier glTF.   

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

> **Note**: Cette extension devra peut-être être définie par scène plutôt que par fichier.

### NEEDLE_lightmaps

Il s'agit d'une extension racine définissant un ensemble de lightmaps pour le fichier glTF.

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

> **Note**: Actuellement, cette extension contient également des références de textures d'environnement. Nous prévoyons de modifier cela dans une future version. 

| Type de texture | Valeur |
| -- | -- |
| Lightmap | 0 |
| Environment Map  | 1 |
| Reflection Map | 2 |

La façon dont les lightmaps sont appliquées est définie dans le composant `MeshRenderer` à l'intérieur de l'extension [`NEEDLE_components`](#needle_components) par nœud :  

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

> **Note**: Nous pourrions modifier cela dans une future version et déplacer les données liées aux lightmaps vers une entrée d'extension `NEEDLE_lightmap` par nœud. 

### NEEDLE_persistent_assets

Les composants dans `NEEDLE_components` peuvent référencer des données via des JSON Pointers. Les données dans `NEEDLE_persistent_assets` sont souvent référencées plusieurs fois par différents composants et sont donc stockées séparément dans une extension racine. Par conception, elles sont toujours référencées par autre chose (ou ont des références entre elles), et ne stockent donc aucune information de type : ce sont simplement des morceaux de données JSON et les composants qui les référencent doivent actuellement savoir à quoi s'attendre. 

Exemples d'assets/données stockés ici :  
- AnimatorControllers, leurs couches et états
- PlayableAssets (timelines), leurs pistes et clips intégrés
- SignalAssets
- ...

Les données dans `persistent_assets` peuvent référencer d'autres `persistent_assets` via JSON Pointer, but par conception ne peuvent pas référencer `NEEDLE_components`. Cela est similaire à la séparation entre les "données de scène" et le "contenu de la base d'assets" dans Unity. 

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

> **Note**: Nous pourrions inclure plus d'informations de type et de versioning à l'avenir. 

### NEEDLE_techniques_webgl

Cette extension s'appuie sur l'extension archivée [`KHR_techniques_webgl`](https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Archived/KHR_techniques_webgl) et l'étend à quelques endroits cruciaux. Alors que l'extension originale était spécifiée pour WebGL 1.0, nous l'utilisons ici avec WebGL 2.0 et avons ajouté un certain nombre de types d'uniformes.  

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

> **Note**: Actuellement, les shaders de vertex et de fragment sont toujours intégrés en tant qu'URI ; nous prévoyons de déplacer ces données vers des bufferViews plus raisonnables à l'avenir.  

> **Note**: Il y a des propriétés redondantes ici que nous prévoyons de nettoyer.  

## TypeScript et mappage de données

> 🏗️ En construction

## Rendu avec three.js

> 🏗️ En construction

## Pourquoi ne compilez-vous pas vers WebAssembly ?

Bien que le processus de compilation de Unity de C# vers IL vers C++ (via IL2CPP) vers WASM (via emscripten) soit ingénieux, il est également relativement lent. Construire même un projet simple vers WASM prend de nombreuses minutes, et ce processus est pratiquement répété à chaque changement de code. Une partie de cela peut être évitée grâce à une mise en cache intelligente et en s'assurant que les builds de développement n'essaient pas de striper autant de code, mais cela reste lent.  
> Nous avons un prototype pour certaines traductions WASM, but il est loin d'être complet et la vitesse d'itération reste lente, nous n'étudions donc pas activement cette voie pour le moment. 

En examinant les workflows web modernes, nous avons constaté que les temps de rechargement du code pendant le développement sont négligeables, généralement de l'ordre de la sous-seconde. Cela échange bien sûr certaines performances (interprétation de JavaScript à la volée au lieu de l'optimisation par le compilateur au moment de la construction) contre de la flexibilité, mais les navigateurs sont devenus très performants pour tirer le meilleur parti de JavaScript.  

Nous pensons que pour l'itération et les workflows de test serrés, il est bénéfique de pouvoir tester sur l'appareil et sur la plate-forme cible (le navigateur, dans ce cas) aussi rapidement et aussi souvent que possible - c'est pourquoi nous sautons tout le mode de lecture de Unity, fonctionnant effectivement toujours dans le navigateur. 

> **Note**: Un effet secondaire très agréable est d'éviter toute l'étape lente de "rechargement de domaine" qui coûte généralement 15 à 60 secondes à chaque entrée en mode de lecture. Vous êtes simplement "en direct" dans le navigateur dès que vous appuyez sur Lecture.


Page automatiquement traduite à l'aide de l'IA