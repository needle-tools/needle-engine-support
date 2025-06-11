# Aperçu des fonctionnalités

Needle Engine est un moteur 3D complet qui s'exécute dans le navigateur. Il est livré avec toutes les fonctionnalités que vous attendez d'un moteur 3D moderne, et plus encore. Si vous ne l'avez pas encore fait, jetez un coup d'œil à notre [Page d'accueil](https://needle.tools) et à nos [Exemples et vitrine](https://engine.needle.tools/samples).

[[toc]]

## Shaders et Matériaux

Les matériaux PBR et les shaders personnalisés créés avec Shader Graph ou d'autres systèmes peuvent être exportés.

<img src="https://user-images.githubusercontent.com/5083203/186012027-9bbe3944-fa56-41fa-bfbb-c989fa87aebb.png" />

Utilisez le [ShaderGraph](https://unity.com/features/shader-graph) basé sur des nœuds pour créer des shaders pour le web. ShaderGraph permet aux artistes de continuer à créer facilement sans avoir à se soucier de la syntaxe.

En savoir plus sur les [Matériaux PBR](./export.md#physically-based-materials-pbr) • [Shaders personnalisés](./export.md#custom-shaders)

## Multiplateforme : VR, AR, Mobile, Desktop
Needle Engine fonctionne partout où la technologie web est présente : exécutez la même application sur desktop, mobile, AR ou VR. Nous construisons Needle Engine [en pensant à la XR](./xr.md) et considérons cela comme une partie intégrante du web design responsive !

Utilisez les [Everywhere Actions](./everywhere-actions.md) pour l'**AR interactive sur Android et iOS**.

## Lightmaps

![lightmaps](https://user-images.githubusercontent.com/5083203/186163693-093c7ae2-96eb-4d75-b98f-bf19f78032ff.gif)

Les lightmaps peuvent être cuites dans Unity ou Blender pour ajouter facilement de magnifiques lumières statiques à votre contenu 3D. La cuisson des lightmaps pour le web n'a jamais été aussi facile. Marquez simplement les objets que vous souhaitez lightmapper comme static dans Unity, ajoutez une ou plusieurs lumières à votre scène (ou utilisez des matériaux emissive) et cliquez sur bake. Needle Engine exportera vos lightmaps par scène et les chargera et les affichera automatiquement exactement comme vous le voyez dans l'Editor !

> **Note** : Il n'y a aucune limitation technique quant au lightmapper à utiliser, tant qu'ils aboutissent dans les structures de données de lightmapping de Unity. Les lightmappers tiers tels que [Bakery](https://assetstore.unity.com/packages/tools/level-design/bakery-gpu-lightmapper-122218) sont donc également pris en charge.

- En savoir plus sur [l'exportation des Lightmaps](https://fwd.needle.tools/needle-engine/docs/lightmaps)

## Multijoueur et Réseau
Le réseau est intégré au cœur du runtime. Les déploiements Needle Engine sur Glitch sont livrés avec un petit serveur qui vous permet de déployer un environnement 3D multijoueur en quelques secondes. Les composants réseau intégrés facilitent les débuts, et vous pouvez créer vos propres composants synchronisés. La synchronisation des variables et de l'état est super facile !

- En savoir plus sur [le Réseau](https://fwd.needle.tools/needle-engine/docs/networking) • [le Scripting](https://fwd.needle.tools/needle-engine/docs/scripting)

## Animations et Séquencement
Needle Engine apporte des animations puissantes, le contrôle d'état et le séquencement sur le web — de la simple lecture d'une animation unique à l'orchestration et au blending d'animations complexes et de contrôleurs de personnages. L'Exporter peut traduire les composants Unity comme Animator et Timeline dans un format prêt pour le web.
Nous avons même ajouté cette fonctionnalité à notre addon Blender afin que vous puissiez créer des machines d'état d'animation compatibles et exporter des pistes nla en tant que timelines vers le web, même depuis Blender.

- En savoir plus sur les [Composants d'animation](./component-reference.md#animation)

### Animator

<img src="https://user-images.githubusercontent.com/5083203/186011302-176524b3-e8e5-4e6e-9b77-7faf3561bb15.png" />

Les composants [Animator et AnimatorController](https://docs.unity3d.com/Manual/class-AnimatorController.html) dans Unity vous permettent de configurer des animations et de définir des conditions pour quand et comment faire le blending entre elles. Nous prenons en charge l'exportation de state machines, StateMachineBehaviours, transitions et layers. Les StateMachineBehaviours sont également pris en charge avec les événements ``OnStateEnter``, ``OnStateUpdate`` et ``OnStateExit``.

> **Note** : Les sub-states et les Blend Trees ne sont pas pris en charge.

### Timeline

![2022-08-23-013517_Scene](https://user-images.githubusercontent.com/5083203/186037829-ee99340d-b19c-484d-b551-94797519c9d9.png)

Nous traduisons également la configuration et les pistes de [Unity's Timeline](https://unity.com/features/timeline) dans un format prêt pour le web.
Les pistes prises en charge comprennent : AnimationTrack, AudioTrack, ActivationTrack, ControlTrack, SignalTrack.

> **Note** : Les Sub-Timelines ne sont pas prises en charge actuellement.

> **Note** : Il est possible d'[exporter des pistes timeline personnalisées](https://github.com/needle-tools/needle-engine-modules/tree/main/package/TimelineHtml).

- En savoir plus sur les [Composants d'animation](./component-reference.md#animation)

## Physique
Utilisez des Rigidbodies, Mesh Colliders, Box Colliders ou SphereColliders pour ajouter de la physique à votre monde.

- En savoir plus sur les [Composants de physique](./component-reference.md#physics)

<sample src="https://engine.needle.tools/samples-uploads/physics-animation/" />

## UI
La construction d'UI en utilisant le système de canvas UI de Unity est en cours de développement. Les fonctionnalités actuelles incluent l'exportation de Text (y compris les polices), Images, Buttons.

Voir la [référence des composants ui](component-reference.md#ui) pour les composants pris en charge.

<sample src="https://engine.needle.tools/samples-uploads/screenspace-ui" />

## Particules
L'exportation de Unity ParticleSystem (Shuriken) est en cours de développement. Les fonctionnalités actuelles incluent la simulation en espace monde/local, les formes d'émetteurs box et sphere, l'émission over time ainsi que burst emission, velocity- and color over time, emission by velocity, texturesheet animation, basic trails.
Voir un [exemple live](https://engine.needle.tools/samples/particles) des fonctionnalités prises en charge ci-dessous :

<sample src="https://engine.needle.tools/samples-uploads/particles/" />

## PostProcessing

Les effets intégrés incluent Bloom, Screenspace Ambient Occlusion, Depth of Field, Color Correction. Vous pouvez également créer vos propres effets personnalisés. Voir [la référence des composants](./component-reference.md#postprocessing) pour une liste complète.

<sample src="https://engine.needle.tools/samples-uploads/postprocessing/" />

## Intégrations Editor
Needle Engine est livré avec de puissantes intégrations dans le Unity Editor et Blender.
Il vous permet de configurer et d'exporter des scènes complexes de manière visuelle, offrant une collaboration facile et flexible entre artistes et développeurs.

## Scripting
Needle Engine utilise un [workflow basé sur les composants](scripting.md#component-architecture). Créez des scripts personnalisés en typescript ou javascript. Utilisez notre [workflow de package modulaire basé sur npm](https://fwd.needle.tools/needle-engine/docs/npmdef) intégré à Unity. Un [compilateur de composants typescript vers C#](https://fwd.needle.tools/needle-engine/docs/component-compiler) produit des composants Unity comme par magie à la volée.

- En savoir plus sur la [Référence du Scripting](scripting) • [Fichiers de définition Npm](https://fwd.needle.tools/needle-engine/docs/npmdef)

## Et il y a plus

- PostProcessing → Bloom, Screenspace Ambient Occlusion, Depth of Field, Color Correction...
- EditorSync → Synchronisation en direct de l'édition dans Unity avec l'application three.js en cours d'exécution pour le développement local
- AR interactive sur iOS et Android → Utilisez notre ensemble de fonctionnalités [Everywhere Actions](./everywhere-actions.md) ou construisez les vôtres

---
# Où aller ensuite

Consultez notre [Guide de démarrage](getting-started/) pour apprendre comment télécharger et configurer Needle Engine.
Découvrez [notre vision](vision) ou plongez plus profondément dans les [détails techniques et glTF](technical-overview) qui alimentent tout cela.


Page automatiquement traduite à l'aide de l'IA