# Technischer Überblick

## Funktionsweise

Needle Engine besteht grob aus drei Teilen:
- einer Reihe von **Komponenten und Tools**, die es ermöglichen, Szenen für Needle Engine einzurichten, z.B. aus dem Unity Editor.
- einem **Exporter**, der Szenen- und Komponentendaten in glTF umwandelt.
- einer **Web-Laufzeitumgebung (runtime)**, die die erzeugten glTF-Dateien und ihre Erweiterungen lädt und ausführt.

Die Web-Laufzeitumgebung nutzt three.js für das Rendering, fügt ein Komponentensystem über den three.js Scene Graph hinzu und bindet Extension Loader für unsere benutzerdefinierten glTF-Erweiterungen ein.
Effektiv verwandelt dies Tools wie Unity oder Blender in leistungsstarke Werkzeuge für die räumliche Webentwicklung – indem glTF Assets zum typischen HTML, CSS, JavaScript und Bundling Workflow hinzugefügt werden.

## glTF Assets

Modelle, Texturen, Animationen, Lichter, Kameras und mehr werden in Needle Engine als [glTF 2.0 Dateien](https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html) gespeichert.
Benutzerdefinierte Daten werden in [Vendor-Erweiterungen](#vendor-specific-gltf-extensions-needle_) gespeichert. Diese umfassen alles von interaktiven Komponenten über Physik, Sequenzierung bis hin zu Lightmaps.

### Unterstützte glTF-Erweiterungen

Ein typisches Produktions-glTF, das von Needle Engine erstellt wird, verwendet die folgenden Erweiterungen:
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

Weitere unterstützte Erweiterungen:
```
EXT_meshopt_compression
EXT_mesh_gpu_instancing (import and export)
```

Unterstützte Material-Erweiterungen:
```
KHR_materials_clearcoat
KHR_materials_ior
KHR_materials_specular
KHR_materials_transmission
KHR_materials_iridescence
KHR_materials_unlit
KHR_materials_volume
```

Weitere Erweiterungen und benutzerdefinierte Erweiterungen können über die Export-Callbacks von UnityGLTF (noch nicht dokumentiert) und die [glTF Import-Erweiterungen](https://threejs.org/docs/#examples/en/loaders/GLTFLoader) von three.js hinzugefügt werden.

> **Hinweis**: Materialien, die diese Erweiterungen verwenden, können aus Unity über das `PBRGraph`-Material von UnityGLTF exportiert werden.

> **Hinweis**: Audio und Varianten werden in Needle Engine bereits durch `NEEDLE_components` und `NEEDLE_persistent_assets` unterstützt, es gibt jedoch einige Optionen für eine bessere Anpassung an bestehende Vorschläge wie `KHR_audio` und `KHR_materials_variants`.

[Erfahren Sie mehr über das Laden von GLTF in three.js](https://threejs.org/docs/#examples/en/loaders/GLTFLoader)

### Komprimierung

Für die Produktion komprimieren wir glTF Assets mit [`glTF-transform`](https://gltf-transform.donmccurdy.com/). Texturen verwenden je nach Texturtyp entweder `etc1s`, `uastc`, `webp` oder keine Komprimierung. Meshes verwenden standardmäßig `draco`, können aber so konfiguriert werden, dass sie `meshtopt` verwenden (pro glTF-Datei). Benutzerdefinierte Erweiterungen werden in einer undurchsichtigen Weise durchgereicht.

Weitere Informationen finden Sie auf der Seite [Deployment & Komprimierung](./deployment.md#optimization-and-compression-options)

## Vendor-spezifische glTF-Erweiterungen (NEEDLE_*)

Needle Engine speichert benutzerdefinierte Daten in glTF-Dateien über unsere Vendor-Erweiterungen. Diese Erweiterungen sind so konzipiert, dass sie flexibel sind und das Einfügen relativ beliebiger Daten ermöglichen. Insbesondere wird kein Code in diesen Dateien gespeichert. Interaktive Komponenten werden zur Laufzeit aus den Daten wiederhergestellt. Dies weist einige Ähnlichkeiten mit der Funktionsweise von AssetBundles in Unity auf – die empfangende Seite eines Assets muss über den passenden Code für die in der Datei gespeicherten Komponenten verfügen.

> Derzeit stellen wir keine Schemas für diese Erweiterungen zur Verfügung, da sie sich noch in der Entwicklung befinden. Die folgenden JSON-Schnipsel demonstrieren die Verwendung von Erweiterungen anhand von Beispielen und enthalten Hinweise zu Architektur Entscheidungen und dem, was wir in zukünftigen Releases ändern könnten.

> Verweise zwischen Datenteilen werden derzeit durch eine Mischung aus Indizes auf andere Teile der glTF-Datei und JSON Pointern konstruiert. Wir könnten diese Ansätze in einem zukünftigen Release konsolidieren. Wir speichern auch String-basierte GUIDs für Fälle, in denen die Reihenfolge sonst schwer aufzulösen ist (z. B. zwei Komponenten, die sich gegenseitig referenzieren), die wir in Zukunft möglicherweise entfernen werden.

### NEEDLE_components

Diese Erweiterung enthält Komponenten Daten pro Knoten. Die Komponentennamen werden sowohl auf der JavaScript- als auch auf der C#-Seite Typnamen zugeordnet.
Mehrere Komponenten mit demselben Namen können demselben Knoten hinzugefügt werden.
Daten in `NEEDLE_components` können über die derzeit noch nicht ratifizierte [`KHR_animation_pointer`](https://github.com/ux3d/glTF/tree/extensions/KHR_animation_pointer/extensions/2.0/Khronos/KHR_animation_pointer) Erweiterung animiert werden.

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

> **Hinweis**: Das Speichern nur des Komponententypnamens bedeutet, dass die Typnamen derzeit pro Projekt eindeutig sein müssen. Wir planen, in einem zukünftigen Release Paketnamen einzuschließen, um diese Einschränkung auf eindeutige Komponententypnamen pro Paket anstatt global zu lockern.

> **Hinweis**: Derzeit gibt es keine Versionsinformationen in der Erweiterung (zu welchem npm Paket gehört eine Komponente, gegen welche Version dieses Pakets wurde sie exportiert). Wir planen, Versionsinformationen in einem zukünftigen Release aufzunehmen.

> **Hinweis**: Derzeit befinden sich alle Komponenten im `builtin_components` Array. Wir könnten dies in einem zukünftigen Release in `components` umbenennen.

### NEEDLE_gameobject_data

Diese Erweiterung enthält zusätzliche Daten pro Knoten, die sich auf Zustand, Layers und Tags beziehen. Layers werden sowohl für das Rendering als auch für die Physik verwendet, ähnlich wie sie von [three.js](https://threejs.org/docs/#api/en/core/Layers) und [Unity](https://docs.unity3d.com/Manual/Layers.html) behandelt werden.

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

> **Hinweis**: Möglicherweise müssen wir besser erklären, warum dies kein weiterer Eintrag in [`NEEDLE_components`](#needle_components) ist.

### NEEDLE_lighting_settings

Dies ist eine Root-Erweiterung, die Ambient-Lighting-Eigenschaften pro glTF-Datei definiert.

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

> **Hinweis**: Diese Erweiterung muss möglicherweise pro Szene anstatt pro Datei definiert werden.

### NEEDLE_lightmaps

Dies ist eine Root-Erweiterung, die eine Reihe von Lightmaps für die glTF-Datei definiert.

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

> **Hinweis**: Derzeit enthält diese Erweiterung auch Referenzen auf Umgebungstexturen. Wir planen, dies in einem zukünftigen Release zu ändern.

| Texturtyp | Wert |
| -- | -- |
| Lightmap | 0 |
| Environment Map | 1 |
| Reflection Map | 2 |

Wie Lightmaps angewendet werden, ist im `MeshRenderer` Component innerhalb der [`NEEDLE_components`](#needle_components) Erweiterung pro Knoten definiert:

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

> **Hinweis**: Wir könnten dies in einem zukünftigen Release ändern und Lightmap-bezogene Daten in einen `NEEDLE_lightmap`-Erweiterungseintrag pro Knoten verschieben.

### NEEDLE_persistent_assets

Komponenten in `NEEDLE_components` können Daten über JSON Pointer referenzieren. Die Daten in `NEEDLE_persistent_assets` werden oft mehrfach von verschiedenen Komponenten referenziert und sind daher separat in einer Root-Erweiterung gespeichert. Sie sind per Design immer von etwas anderem referenziert (oder haben Referenzen innerhalb sich selbst) und speichern daher keinerlei Typinformationen: Es handelt sich einfach um JSON Daten und die Komponenten, die sie referenzieren, müssen derzeit wissen, was sie erwarten.

Beispiele für hier gespeicherte Assets/Daten sind:
- AnimatorControllers, ihre Layers und States
- PlayableAssets (Timelines), ihre Tracks und eingebetteten Clips
- SignalAssets
- ...

Daten in `persistent_assets` können andere `persistent_assets` über JSON Pointer referenzieren, können aber per Design keine `NEEDLE_components` referenzieren. Dies ähnelt der Trennung zwischen "Scene data" und "AssetDatabase content" in Unity.

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

> **Hinweis**: Wir könnten in Zukunft weitere Typ- und Versionsinformationen aufnehmen.

### NEEDLE_techniques_webgl

Diese Erweiterung baut auf der archivierten [`KHR_techniques_webgl`](https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Archived/KHR_techniques_webgl) Erweiterung auf und erweitert sie an einigen entscheidenden Stellen. Während die ursprüngliche Erweiterung für WebGL 1.0 spezifiziert wurde, verwenden wir sie hier mit WebGL 2.0 und haben eine Reihe von Uniform-Typen hinzugefügt.

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

> **Hinweis**: Derzeit sind Vertex- und Fragment-Shader immer als URI eingebettet; wir planen, diese Daten in Zukunft in vernünftigere bufferViews zu verschieben.

> **Hinweis**: Es gibt hier einige redundante Eigenschaften, die wir bereinigen wollen.

## TypeScript und Datenmapping

> 🏗️ In Arbeit

## Rendering mit three.js

> 🏗️ In Arbeit

## Warum kompiliert ihr nicht nach WebAssembly?

Während Unitys Kompilierungsprozess von C# zu IL zu C++ (über IL2CPP) zu WASM (über emscripten) ausgeklügelt ist, ist er auch relativ langsam. Selbst ein einfaches Projekt nach WASM zu bauen, dauert viele Minuten, und dieser Prozess wiederholt sich im Grunde bei jeder Codeänderung. Ein Teil davon kann durch cleveres Caching vermieden werden und indem sichergestellt wird, dass Dev-Builds nicht so viel Code entfernen, aber es bleibt trotzdem langsam.
> Wir haben einen Prototyp für eine WASM-Übersetzung, aber dieser ist bei weitem nicht vollständig und die Iterationsgeschwindigkeit bleibt langsam, daher verfolgen wir diesen Weg derzeit nicht aktiv.

Beim Betrachten moderner Web-Workflows stellten wir fest, dass die Code-Reload-Zeiten während der Entwicklung vernachlässigbar sind, meist im Sub-Sekunden-Bereich. Dies tauscht natürlich etwas Performance (Interpretation von JavaScript on-the-fly anstatt Compiler-Optimierung zur Build-Zeit) gegen Flexibilität ein, aber Browser sind sehr gut darin geworden, das Maximum aus JavaScript herauszuholen.

Wir glauben, dass es für Iterations- und straffe Test-Workflows vorteilhaft ist, so schnell und so oft wie möglich auf dem Gerät und auf der Zielplattform (in diesem Fall dem Browser) testen zu können – weshalb wir den gesamten Play Mode von Unity überspringen und effektiv immer im Browser laufen.

> **Hinweis**: Ein wirklich schöner Nebeneffekt ist die Vermeidung des gesamten langsamen "Domain Reload"-Schritts, der normalerweise 15-60 Sekunden kostet, jedes Mal, wenn Sie den Play Mode betreten. Sie sind einfach "live" im Browser, sobald Sie auf Play drücken.
Seite automatisch mit KI übersetzt