---
next: features-overview
---

# A Nossa Visão 🔮

## O Futuro da Web 3D

Acreditamos que o uso de 3D na web se expandirá consideravelmente nos próximos anos. Enquanto hoje as aplicações nativas são a norma, cada vez mais conteúdo é disponibilizado como uma aplicação web ou [PWA](https://web.dev/progressive-web-apps/). Novos dispositivos VR e AR [expandir-se-ão para a web](https://immersive-web.github.io/webxr-samples/), criando um problema interessante: responsivo de repente não significa apenas "ecrã pequeno" ou "ecrã grande", também estamos a lidar com espaços, 3D, posicionamento espacial e potencialmente óculos e comandos!

Adicione a isso um impulso para mais interatividade e colaboração, e tem uma mistura interessante de desafios.

Na Needle, acreditamos que idealizar e criar neste espaço deve ser fácil. Decidimos acelerar as coisas – criando o nosso próprio runtime para alcançar estes objetivos. É por isso que estamos a incorporar a capacidade de implementação para AR e VR diretamente nos nossos componentes principais e a testar continuamente se as novas ideias funcionam em diferentes plataformas.

## Porquê outra plataforma para 3D na web? Já não existem opções suficientes?

Existem inúmeras opções, é verdade! Descobrimos que os sistemas atuais<sup>1</sup> podem ser grosseiramente classificados em duas categorias: alguns têm excelente gestão de assets, ferramentas e artist-friendly workflows, mas geram algum tipo de binary blob, e outros são mais code-focussed, developer-friendly e permitem uma excelente integração em modern web workflows<sup>2</sup>.

Queremos unir estes mundos e combinar o melhor de dois mundos: artist-friendly workflows e modern web technologies. Combinado com formatos modernos e um fluxo de trabalho ágil, acreditamos que isto permitirá a muitos mais criadores trazerem o seu conteúdo para a web. Também vimos uma oportunidade para acertar na AR, VR e colaboração desde o início.

<sup>1</sup>: _Exemplos incluem Unity, PlayCanvas, three.js, react-three-fiber, Babylon, A-Frame, Godot e muitos outros._
<sup>2</sup>: _Há mais nuances nisso do que cabe num parágrafo introdutório! Todos os engines e frameworks têm os seus pontos fortes e fracos e estão em constante evolução._

## Criar um Fluxo de Trabalho, não um Editor

Pensamos que a próxima onda de aplicações 3D na web virá com melhores _workflows_: todos devem ser capazes de montar uma 3D scene, uma art gallery, apresentar um product ou 3D scan na web ou fazer simple games. Atingir este objetivo exigirá mais do que apenas suportar um sistema particular e exportar para a web a partir daí.

O nosso objetivo é permitir que as pessoas tragam dados para a web a partir _das suas_ creative tools: seja Unity, Blender, Photoshop ou outra coisa. Estamos cientes de que este é um grande objetivo – mas em vez de fazer tudo de uma vez, queremos iterar e aproximarmo-nos dele juntos.

## Open Standards em vez de Containers Proprietários

No centro do Needle Engine está o formato [glTF](https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html) e a sua capacidade de ser estendido com custom extensions. O objetivo é: um único ficheiro `.glb` pode conter os dados completos da sua aplicação.

Vale a pena notar que não é objetivo enviar actual code dentro do glTF; shipping e running code é the job dos modern web runtimes e bundling. Certamente podemos imaginar que abstract representations of logic (por exemplo, graphs, state machines, and so on) podem ser standardized to a certain degree e allow for interoperable worlds, mas we're not there yet.

[Ler mais sobre o nosso uso de glTF e extensions](./technical-overview.md)

# Goals e Non-Goals

## Goals
- Iteration should be rapid e deployment should be fast.
- Working on 3D web projects should be the as easy as working 2D web projects.
- Developers e artists should be able to collaborate directly.
- Responsive web extends beyond screens – AR e VR should be built in, not afterthoughts.
- Queremos contribute back to open-source projects.
- Open discussion regarding 3D e web standards.
- Ability to bring e take your data in open formats.
- Ability to choose what web framework you use, not lock-in to particular frameworks e vendors.
- Common usecases work without or with limited coding experience.

## Non-Goals
- It's not a goal to have 100% coverage of all combinations of Editor versions, feature sets, render pipelines.
- It's not a goal to provide a full no-code environment.
- It's not a goal to match the feature set, capabilities, or runtime performance of other engines.

# Relation to other engines e frameworks

## Needle Engine e Unity WebGL

From working with Unity for many years we've found that while the engine e editor progress at a great pace, WebGL output has somewhat lacked behind. Integration of Unity players into web-based systems is rather hard, "talking" to the surrounding website requires a number of workarounds, e most of all, iteration times are very slow due to the way that Unity packs all code into WebAssembly via IL2CPP. These technologies are awesome, e result in great runtime performance e a lot of flexibility. But they're so much slower e walled off compared to modern web development workflows that we decided to take matters into our own hands.

## Needle Engine e three.js

Needle Engine builds on three.js. All rendering goes through it, glTF files are loaded via three's extension interfaces, e our component system revolves around three's Object3D e scene graph. We're committed to upstreaming some of our changes e improvements, creating pull requests e reporting issues along the way.

---
Página automaticamente traduzida usando IA