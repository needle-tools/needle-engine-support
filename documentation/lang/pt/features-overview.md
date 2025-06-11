# Visão Geral de Recursos

Needle Engine é um motor 3D completo que corre no navegador. Vem com todos os recursos que esperaria de um motor 3D moderno, e mais. Se ainda não o fez, veja a nossa [Homepage](https://needle.tools) e os nossos [Exemplos e Vitrine](https://engine.needle.tools/samples).

[[toc]]

## Shaders e Materiais

Ambos os Materiais PBR e shaders personalizados criados com Shader Graph ou outros sistemas podem ser exportados.

<img src="https://user-images.githubusercontent.com/5083203/186012027-9bbe3944-fa56-41fa-bfbb-c989fa87aebb.png" />

Use o [ShaderGraph](https://unity.com/features/shader-graph) baseado em nós para criar shaders para a web. O ShaderGraph facilita a criação contínua por parte dos artistas sem terem de se preocupar com a sintaxe.

Leia mais sobre [Materiais PBR](./export.md#physically-based-materials-pbr) • [Shaders Personalizados](./export.md#custom-shaders)

## Multiplataforma: VR, AR, Mobile, Desktop

Needle Engine corre onde a tecnologia web corre: execute a mesma aplicação em desktop, mobile, AR ou VR. Construímos o Needle Engine [com XR em mente](./xr.md) e consideramos isto uma parte integrante do webdesign responsivo!

Use [Everywhere Actions](./everywhere-actions.md) para **AR Interativo tanto no Android como no iOS**.

## Lightmaps

![lightmaps](https://user-images.githubusercontent.com/5083203/186163693-093c7ae2-96eb-4d75-b98f-bf19f78032ff.gif)

Os Lightmaps podem ser "baked" no Unity ou Blender para adicionar facilmente luz estática bonita ao seu conteúdo 3d. O Lightbaking para a web nunca foi tão fácil. Basta marcar os objetos que quer iluminar como estáticos no Unity, adicionar uma ou várias luzes à sua cena (ou usar materiais emissivos) e clicar em bake. O Needle Engine exportará os seus lightmaps por cena e irá carregá-los e mostrá-los automaticamente exatamente como os vê no Editor!

> **Nota**: Não há limitação técnica sobre qual lightmapper usar, desde que acabem nas estruturas de dados de lightmapping do Unity. Lightmappers de terceiros como [Bakery](https://assetstore.unity.com/packages/tools/level-design/bakery-gpu-lightmapper-122218) são, portanto, também suportados.

- Leia mais sobre [Exportar Lightmaps](https://fwd.needle.tools/needle-engine/docs/lightmaps)

## Multiplayer e Networking

O Networking está integrado no runtime principal. As implementações do Needle Engine para o Glitch vêm com um pequeno servidor que lhe permite implementar um ambiente 3D multiplayer em segundos. Os componentes de rede incorporados facilitam o início, e pode criar os seus próprios componentes sincronizados. Sincronizar variáveis e estado é super fácil!

- Leia mais sobre [Networking](https://fwd.needle.tools/needle-engine/docs/networking) • [Scripting](https://fwd.needle.tools/needle-engine/docs/scripting)

## Animações e Sequenciamento

O Needle Engine traz animações poderosas, controlo de estado e sequenciamento para a web — desde apenas reproduzir uma única animação até orquestrar e misturar animações complexas e character controllers. O Exporter pode traduzir componentes do Unity como Animator e Timeline para um formato pronto para a web.
Até adicionámos esta funcionalidade ao nosso addon para Blender para que possa criar state machines de animação compatíveis e exportar nla tracks como timelines para a web, diretamente do Blender também.

- Leia mais sobre [Componentes de Animação](./component-reference.md#animation)

### Animator

<img src="https://user-images.githubusercontent.com/5083203/186011302-176524b3-e8e5-4e6e-9b77-7faf3561bb15.png" />

Os componentes [Animator e AnimatorController](https://docs.unity3d.com/Manual/class-AnimatorController.html) no Unity permitem configurar animações e definir condições para quando e como misturar entre elas. Suportamos a exportação de state machines, StateMachineBehaviours, transições e layers. StateMachineBehaviours também são suportados com eventos ``OnStateEnter``, ``OnStateUpdate`` e ``OnStateExit``.

> **Nota**: Sub-states e Blend Trees não são suportados.

### Timeline

![2022-08-23-013517_Scene](https://user-images.githubusercontent.com/5083203/186037829-ee99340d-b19c-484d-b551-94797519c9d9.png)

Também estamos a traduzir a configuração e as tracks do [Timeline do Unity](https://unity.com/features/timeline) para um formato pronto para a web.
As tracks suportadas incluem: AnimationTrack, AudioTrack, ActivationTrack, ControlTrack, SignalTrack.

> **Nota**: Sub-Timelines não são suportados atualmente.

> **Nota**: É possível [exportar tracks de timeline personalizadas](https://github.com/needle-tools/needle-engine-modules/tree/main/package/TimelineHtml).

- Leia mais sobre [Componentes de Animação](./component-reference.md#animation)

## Física

Use Rigidbodies, Mesh Colliders, Box Colliders ou SphereColliders para adicionar física ao seu mundo.

- Leia mais sobre [Componentes de Física](./component-reference.md#physics)

<sample src="https://engine.needle.tools/samples-uploads/physics-animation/" />

## UI

A construção de UI usando o sistema UI canvas do Unity está em desenvolvimento. Os recursos atuais incluem a exportação de Texto (incluindo fontes), Imagens, Botões.

Veja a [referência do componente ui](component-reference.md#ui) para componentes suportados.

<sample src="https://engine.needle.tools/samples-uploads/screenspace-ui" />

## Partículas

A exportação do Unity ParticleSystem (Shuriken) está em desenvolvimento. Os recursos atuais incluem simulação de espaço mundo/local, formas de emissor de caixa e esfera, emissão ao longo do tempo, bem como emissão de burst, velocidade e cor ao longo do tempo, emissão por velocidade, animação de texturesheet, trilhas básicas.
Veja um [exemplo ao vivo](https://engine.needle.tools/samples/particles) dos recursos suportados abaixo:

<sample src="https://engine.needle.tools/samples-uploads/particles/" />

## Pós-Processamento

Os efeitos incorporados incluem Bloom, Screenspace Ambient Occlusion, Depth of Field, Color Correction. Também pode criar os seus próprios efeitos personalizados. Veja [a referência de componentes](./component-reference.md#postprocessing) para uma lista completa.

<sample src="https://engine.needle.tools/samples-uploads/postprocessing/" />

## Integrações do Editor

O Needle Engine vem com integrações poderosas nos Editores Unity e Blender.
Permite configurar e exportar cenas complexas de forma visual, proporcionando colaboração fácil e flexível entre artistas e desenvolvedores.

## Scripting

O Needle Engine usa um [workflow baseado em componentes](scripting.md#component-architecture). Crie scripts personalizados em typescript ou javascript. Use o nosso [workflow modular de pacotes baseado em npm](https://fwd.needle.tools/needle-engine/docs/npmdef) integrado ao Unity. Um [compilador de typescript para componentes C#](https://fwd.needle.tools/needle-engine/docs/component-compiler) produz componentes do Unity magicamente em tempo real.

- Leia mais sobre [Referência de Scripting](scripting) • [Ficheiros de Definição Npm](https://fwd.needle.tools/needle-engine/docs/npmdef)

## E há mais

- Pós-Processamento → Bloom, Screenspace Ambient Occlusion, Depth of Field, Color Correction...
- EditorSync → Sincronização ao vivo da edição no Unity para a aplicação three.js em execução para desenvolvimento local
- AR Interativo no iOS e Android → Use o nosso conjunto de recursos [Everywhere Actions](./everywhere-actions.md) ou construa o seu próprio

---

# Para onde ir a seguir

Veja o nosso [Guia de Primeiros Passos](getting-started/) para aprender como descarregar e configurar o Needle Engine.
Saiba mais sobre [a nossa visão](vision) ou aprofunde-se nalguns dos [detalhes técnicos e glTF](technical-overview) que impulsionam tudo.


Página traduzida automaticamente usando IA