---
title: Composants principaux de Needle
---

# Composants principaux de Needle

Voici un aperçu de certains des composants que nous fournissons. Beaucoup d'entre eux correspondent à des composants et des fonctionnalités dans Unity, Blender ou d'autres intégrations.

Pour une liste complète, veuillez consulter notre [API docs](https://engine.needle.tools/docs/api/latest).

Vous pouvez toujours ajouter vos propres composants ou ajouter des wrappers pour les composants Unity que nous n'avons pas encore fournis.

Apprenez-en plus dans la section [Scripting](./scripting.md) de notre documentation.

## Audio
| Nom  | Description |
| ------------- | ------------- |
| `AudioListener` |  |
| `AudioSource` | Utiliser pour jouer de l'audio |

## Animation
| Nom  | Description |
| ------------- | ------------- |
| `Animator` avec `AnimatorController` | Exporter avec animation state machine, conditions, transitions  |
| `Animation` | Composant d'animation le plus basique. Seul le premier clip est exporté |
| `PlayableDirector` avec `TimelineAsset` | Exporter des séquences puissantes pour contrôler l'animation, l'audio, l'état et plus encore |

## Rendu
| Nom  | Description |
| ------------- | ------------- |
| `Camera` |  |
| `Light` | DirectionalLight, PointLight, Spotlight. Notez que vous pouvez l'utiliser pour le bake light (par exemple, les formes Rectangular Light) également |
| `XRFlag` | Contrôler la visibilité des objets. Par exemple, activer un objet uniquement en mode AR  |
| `DeviceFlag` | Contrôler sur quel appareil les objets seront visibles  |
| `LODGroup` |  |
| `ParticleSystem` | Expérimental et actuellement pas entièrement supporté |
| `VideoPlayer` | Lecture de vidéos depuis une url ou un fichier vidéo référencé (sera copié dans la sortie lors de l'exportation). Le VideoPlayer prend également en charge le streaming depuis des objets MediaStream ou des url de livestream M3U8 |
| `MeshRenderer` | Utilisé pour gérer le rendu des objets, y compris le lightmapping et l'instancing |
| `SkinnedMeshRenderer` | *Voir MeshRenderer* |
| `SpriteRenderer` | Utilisé pour rendre des Sprites et Spriteanimations |
| `Volume` avec asset `PostProcessing` | Voir le [tableau ci-dessous](#postprocessing) |

### Postprocessing

Les effets de post-traitement utilisent la [bibliothèque postprocessing de pmndrs](https://www.npmjs.com/package/postprocessing) en arrière-plan. Cela signifie que vous pouvez également ajouter facilement vos propres effets personnalisés et obtenir un postprocessing pass automatiquement optimisé.

- **Unity only**: *Notez que les effets de Postprocessing utilisant un Volume dans Unity ne sont supportés qu'avec URP*

| Nom de l'effet | |
| --- | --- |
| Antialiasing | *Unity Component supplémentaire* |
| Bloom | *via Volume asset* |
| Chromatic Aberration | *via Volume asset* |
| Color Adjustments / Color Correction | *via Volume asset* |
| Depth Of Field | *via Volume asset* |
| Vignette | *via Volume asset* |
| ToneMappingEffect | *via Volume asset ou component séparé* |
| Pixelation | |
| Screenspace Ambient Occlusion N8 | |
| Screenspace Ambient Occlusion | |
| Tilt Shift Effect | |
| SharpeningEffect | |
| *Votre effet personnalisé* | [Voir l'exemple sur stackblitz](https://stackblitz.com/edit/needle-engine-custom-postprocessing-effect) |

## Networking
| Nom  | Description |
| ------------- | ------------- |
| `SyncedRoom` | Composant de mise en réseau principal. Placez-le dans votre scène pour activer la mise en réseau |
| `Networking` | Utilisé pour configurer le backend server pour la mise en réseau. |
| `SyncedTransform` | Met automatiquement en réseau la transformation de l'objet |
| `SyncedCamera` | Met automatiquement en réseau la position et la vue de la caméra pour les autres utilisateurs de la salle. Vous pouvez définir la manière dont la caméra est rendue en référençant un objet |
| `WebXRSync` | Met en réseau les avatars WebXR (AR et VR) |
| `Voip` | Active le voice-chat |
| `Screensharing` | Active les capacités de screen-sharing |

## Interaction
| Nom  | Description |
| ------------- | ------------- |
| `EventSystem` | Gère le déclenchement des pointer events et des UI events sur les objets de la scène |
| `ObjectRaycater` | Requis pour DragControls et Duplicatable |
| `GraphicsRaycaster` | Identique à ObjectRaycaster mais pour les UI elements |
| `DragControls` | Permet de glisser des objets dans la scène. Nécessite un raycaster dans la hierarchy parent, par exemple ObjectRaycater |
| `Duplicatable` | Permet de dupliquer les objets assignés par glisser-déposer. Nécessite DragControls |
| `Interactable` | Composant basique pour marquer un objet comme interactable. |
| `OrbitControls` | Ajouter à la caméra pour ajouter une fonctionnalité de contrôle d'orbite de caméra |
| `SmoothFollow` | Permet d'interpoler en douceur vers le transform d'un autre objet |
| `DeleteBox` | Détruira les objets avec le component Deletable lorsqu'ils entreront dans la boîte |
| `Deletable` | Le GameObject auquel ce component est attaché sera supprimé lorsqu'il entrera ou intersectera avec un DeleteBox |
| `DropListener` | Ajouter pour recevoir les file drop events pour le téléchargement |
| `SpatialTrigger` | Utiliser pour déclencher un événement si un objet entre dans un espace ou une zone spécifique. Vous pouvez également utiliser les Physics events |
| `SpatialTriggerReceiver` | Utiliser pour recevoir des événements de SpatialTrigger |

## Physique

La physique est implémentée en utilisant [Rapier](https://rapier.rs/).

| Nom  | Description |
| ------------- | ------------- |
| `Rigidbody` | Ajouter pour qu'un objet réagisse à la gravité (ou soit kinematic et static) |
| `BoxCollider` | Une shape de Box collider avec laquelle les objets peuvent entrer en collision ou déclencher des trigger events lorsqu'elle est définie sur trigger |
| `SphereCollider` | *Voir BoxCollider* |
| `CapsuleCollider` | *Voir BoxCollider* |
| `MeshCollider` | *Voir BoxCollider* |
| Physics Materials | Les Physics materials peuvent être utilisés pour définir par exemple la bouncyness d'un collider |

## XR / WebXR

[Lire la documentation XR](xr.md)

| Nom  | Description |
| ------------- | ------------- |
| `WebXR` | Ajouter à la scène pour le support VR, AR et Passthrough ainsi que le rendu des Avatar models |
| [`USDZExporter`](./everywhere-actions.md) | Ajouter pour activer le support USD et Quicklook |
| `XRFlag` | Contrôler la visibilité des objets, par exemple uniquement en VR ou AR ou uniquement en ThirdPerson |
| `WebARSessionRoot` | Gère le placement et l'échelle de votre scène en mode AR |
| `WebARCameraBackground` | Ajouter pour accéder à l'image de la AR camera et appliquer des effets ou l'utiliser pour le rendu |
| `WebXRImageTracking` | Attribuer des images à suivre et éventuellement instancier un objet à la position de l'image |
| `WebXRPlaneTracking` | Créer des meshes de plan ou des colliders pour les plans suivis |
| `XRControllerModel` | Peut être ajouté pour rendre les device controllers ou les hand models (sera créé par défaut si activé dans le WebXR component) |
| `XRControllerMovement` | Peut être ajouté pour fournir les contrôles de mouvement par défaut et de teleport |
| `XRControllerFollow` | Peut être ajouté à n'importe quel objet de la scène et configuré pour suivre les mains ou les controllers gauches ou droits |

## Débogage
| Nom  | Description |
| ------------- | ------------- |
| `GridHelper` | Dessine une grille |
| `BoxGizmo` | Dessine une boîte |
| `AxesHelper` | Dessine les axes XYZ |
| | Note : Lorsque vous écrivez du code personnalisé, vous pouvez utiliser les static Gizmos methods pour dessiner des lignes et des shapes de débogage | |

## Entrée/Sortie de fichiers à l'exécution
| Nom  | Description |
| ------------- | ------------- |
| `GltfExport` | Expérimental ! Utiliser pour exporter des gltf depuis le web runtime. |
| `DropListener` | Recevoir les file drop events pour le téléchargement et la mise en réseau |

## UI

Les composants d'UI spatiale sont mappés du système UI de Unity (Canvas, pas UI Toolkit) à [three-mesh-ui](https://github.com/felixmariotto/three-mesh-ui). L'UI peut être animée.

| Nom  | Description |
| ------------- | ------------- |
| `Canvas` | Le système d'UI de Unity. Doit être en mode World Space actuellement. |
| `Text (Legacy)` | Rendre le Text en utilisant le component UI Text de Unity. Les polices personnalisées sont supportées, un font atlas sera automatiquement généré à l'exportation. Utilisez les paramètres de police ou le component FontAdditionalCharacters pour contrôler quels caractères sont inclus dans l'atlas.<br/>**Note** : Dans Unity, assurez-vous d'utiliser le component `Legacy/Text` (*TextMeshPro* n'est pas supporté pour le moment) |
| `Button` | Reçoit les click events - utilisez l'onClick event pour y réagir. Il peut également être ajouté aux objets de scène 3D.<br/>**Note** : Assurez-vous d'utiliser le component `Legacy/Text` dans le Button (ou créez le Button via le menu contextuel `UI/Legacy/Button` de Unity car *TextMeshPro* n'est pas supporté pour le moment) |
| `Image` | Rend une sprite image |
| `RawImage` | Rend une texture |
| `InputField` | Permet la text input |

**Note** : Selon votre projet, souvent un mélange d'UI spatiales et 2D a souvent du sens pour les projets multiplateformes où la VR, l'AR, et les écrans sont pris en charge. Généralement, vous construisez les parties 2D avec HTML pour une meilleure accessibilité, et les parties 3D avec des UIs géométriques qui supportent également les depth offsets (par exemple, les button hover states et similaires).

## Autre

| Nom  | Description |
| ------------- | ------------- |
| `SceneSwitcher` | Gère le chargement et le déchargement d'autres scènes ou de prefabs / glTF files. Dispose de fonctionnalités pour le preload, le changement de scènes via le swiping, les keyboard events ou la URL navigation |

## Éditeur Uniquement
| Nom  | Description |
| --- | --- |
| `ExportInfo` | Composant principal pour gérer le(s) web project(s), par exemple pour installer ou démarrer l'application web |
| `EditorSync` | Ajouter pour activer la mise en réseau des material ou des component value changes vers l'application three.js en cours d'exécution directement depuis le Unity Editor sans avoir à recharger |

Page automatiquement traduite à l'aide de l'IA