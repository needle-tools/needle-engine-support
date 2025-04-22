---
next: features-overview
---

# A Nossa Visão 🔮

## O Futuro da Web 3D

Acreditamos que o uso de 3D na web se expandirá consideravelmente nos próximos anos. Embora hoje as aplicações nativas sejam a norma, cada vez mais conteúdo é disponibilizado como uma aplicação web ou [PWA](https://web.dev/progressive-web-apps/). Novos dispositivos VR e AR [expandir-se-ão para a web](https://immersive-web.github.io/webxr-samples/), criando um problema interessante: responsivo de repente não significa apenas "ecrã pequeno" ou "ecrã grande", também estamos a lidar com espaços, 3D, posicionamento espacial e potencialmente óculos e comandos!

Adicione a isso um impulso para mais interatividade e colaboração, e tem uma mistura interessante de desafios.

Na Needle, acreditamos que idealizar e criar neste espaço deve ser fácil. Decidimos acelerar as coisas – criando o nosso próprio runtime para alcançar estes objetivos. É por isso que estamos a incorporar a capacidade de implementação para AR e VR diretamente nos nossos componentes principais e a testar continuamente se as novas ideias funcionam em diferentes plataformas.

## Porquê outra plataforma para 3D na web? Já não existem opções suficientes?

Existem inúmeras opções, é verdade! Descobrimos que os sistemas atuais<sup>1</sup> podem ser grosseiramente classificados em duas categorias: alguns têm excelente gestão de assets, ferramentas e fluxos de trabalho amigáveis para artistas, mas geram algum tipo de binary blob, e outros são mais focados em código, amigáveis para programadores e permitem uma excelente integração em fluxos de trabalho web modernos<sup>2</sup>.

Queremos unir estes mundos e combinar o melhor de dois mundos: fluxos de trabalho amigáveis para artistas e tecnologias web modernas. Combinado com formatos modernos e um fluxo de trabalho ágil, acreditamos que isto permitirá a muitos mais criadores trazerem o seu conteúdo para a web. Também vimos uma oportunidade para acertar na AR, VR e colaboração desde o início.

<sup>1</sup>: _Exemplos incluem Unity, PlayCanvas, three.js, react-three-fiber, Babylon, A-Frame, Godot e muitos outros._
<sup>2</sup>: _Há mais nuances nisso do que cabe num parágrafo introdutório! Todos os engines e frameworks têm os seus pontos fortes e fracos e estão em constante evolução._

## Criar um Fluxo de Trabalho, não um Editor

Pensamos que a próxima onda de aplicações 3D na web virá com melhores _fluxos de trabalho_: todos devem ser capazes de montar uma cena 3D, uma galeria de arte, apresentar um produto ou scan 3D na web ou fazer jogos simples. Atingir este objetivo exigirá mais do que apenas suportar um sistema particular e exportar para a web a partir daí.

O nosso objetivo é permitir que as pessoas tragam dados para a web a partir _das suas_ ferramentas criativas: seja Unity, Blender, Photoshop ou outra coisa. Estamos cientes de que este é um grande objetivo – mas em vez de fazer tudo de uma vez, queremos iterar e aproximarmo-nos dele juntos.

## Padrões Abertos em vez de Containers Proprietários

No centro do Needle Engine está o formato [glTF](https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html) e a sua capacidade de ser estendido com extensões personalizadas. O objetivo é: um único ficheiro `.glb` pode conter os dados completos da sua aplicação.

Vale a pena notar que não é objetivo enviar código real dentro do glTF; enviar e executar código é a função dos runtimes web modernos e do bundling. Certamente podemos imaginar que representações abstratas de lógica (por exemplo, grafos, máquinas de estado, etc.) podem ser padronizadas até certo ponto e permitir mundos interoperáveis, mas ainda não chegámos lá.

[Ler mais sobre o nosso uso de glTF e extensões](./technical-overview.md)

# Objetivos e Não Objetivos

## Objetivos
- A iteração deve ser rápida e a implementação (deployment) deve ser veloz.
- Trabalhar em projetos web 3D deve ser tão fácil quanto trabalhar em projetos web 2D.
- Programadores e artistas devem ser capazes de colaborar diretamente.
- A web responsiva estende-se para além dos ecrãs – AR e VR devem ser integrados, não algo pensado depois.
- Queremos contribuir de volta para projetos open-source.
- Discussão aberta sobre padrões 3D e web.
- Capacidade de trazer e levar os seus dados em formatos abertos.
- Capacidade de escolher que web framework usar, sem ficar preso a frameworks e fornecedores particulares.
- Casos de uso comuns funcionam sem ou com experiência de programação limitada.

## Não Objetivos
- Não é objetivo ter cobertura de 100% de todas as combinações de versões do Editor, conjuntos de funcionalidades, pipelines de renderização.
- Não é objetivo fornecer um ambiente full no-code.
- Não é objetivo igualar o conjunto de funcionalidades, capacidades ou desempenho em runtime de outros engines.

# Relação com outros engines e frameworks

## Needle Engine e Unity WebGL

Ao trabalhar com Unity durante muitos anos, descobrimos que, embora o engine e o editor progridam a um grande ritmo, o output WebGL ficou um pouco para trás. A integração de players Unity em sistemas baseados na web é bastante difícil, "falar" com o website envolvente requer uma série de soluções alternativas, e acima de tudo, os tempos de iteração são muito lentos devido à forma como o Unity empacota todo o código em WebAssembly via IL2CPP. Estas tecnologias são fantásticas e resultam num ótimo desempenho em runtime e muita flexibilidade. Mas são muito mais lentas e isoladas comparadas com os fluxos de trabalho de desenvolvimento web modernos, pelo que decidimos tomar as rédeas.

## Needle Engine e three.js

O Needle Engine baseia-se em three.js. Toda a renderização passa por ele, os ficheiros glTF são carregados através das interfaces de extensão do three, e o nosso sistema de componentes gira em torno do Object3D e do scene graph do three. Estamos comprometidos em contribuir para o upstream com algumas das nossas alterações e melhorias, criando pull requests e reportando problemas ao longo do caminho.

---
Página automaticamente traduzida usando IA