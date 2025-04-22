<br/>
<div class="centered" style="display: flex;
    align-items: center;
    gap: 20px;
    font-size: 2em;
    font-weight: 100;">
    <img src="/logo.png" style="max-height:70px;" title="Logótipo Needle" alt="Logótipo Needle"/> +
    <span style="font-size: 50px;">✨</span>
</div>

# Integrar com outras ferramentas

O Needle Engine foi concebido para ser flexível e extensível. Pode ser integrado com outras ferramentas e serviços para melhorar o seu fluxo de trabalho e levar 3D rico e interativo para a web a partir de qualquer software.

No centro de uma integração personalizada com o Needle Engine está o formato 3D glTF. Este é o formato mais amplamente suportado para 3D na web, e o mais versátil. Este formato leve pode armazenar modelos 3D, animações, texturas e todos os tipos de dados extra. O glTF é extensível, e é exatamente por isso que o escolhemos como base para o Needle Engine. Permite-nos adicionar funcionalidades ricas e capacidades interativas a ficheiros 3D, incluindo melhor renderização, física, interações, XR, redes e muito mais.

Como resultado da utilização do formato glTF padronizado para intercâmbio, criar uma integração básica em qualquer software é fácil – basta exportar os seus assets 3D como ficheiros glTF e importá-los para o Needle Engine. A partir daí, pode adicionar mais funcionalidades à sua integração, para suportar as nossas extensões de scripting. Normalmente, isto é feito através de um plugin, extensão ou hook de exportação no seu software 3D.

## Estrutura de uma integração personalizada
A estrutura de uma integração personalizada é a seguinte:

1. Exporte os seus assets 3D como ficheiros glTF. Nesta fase, a sua integração é provavelmente tão simples quanto clicar no botão de exportação no seu software 3D.
2. Utilize o ficheiro glTF num projeto web usando o Needle Engine.
   - Este pode ser um projeto web criado com outra integração, descarregado de um exemplo, ou um novo projeto web feito com `npx needle-create`.
   - Exporte o ficheiro glTF para a pasta `assets`. A sua aplicação web deverá refrescar-se automaticamente sempre que re-exportar o ficheiro glTF.
3. Nesta fase, tem uma integração funcional básica, e já poderia adicionar funcionalidades personalizadas via TypeScript no projeto web.
4. O próximo passo é adicionar uma forma de criar e ajustar componentes no seu software. Dependendo do software, isto pode ser feito através de uma UI personalizada, um script ou um plugin.
   - Para começar, experimente com um componente como `DragControls`. Tem algumas opções, mas os valores predefinidos são suficientes para começar.
   - Depois, avance para componentes que requerem configuração. Um bom ponto de partida são as nossas `Everywhere Actions`, porque permitem aos criadores construir uma vasta gama de experiências interativas sem precisar de escrever código.
5. Exporte esses componentes como parte da extensão glTF `NEEDLE_components` para cada nó. Normalmente, isto é feito adicionando uma extensão glTF personalizada ou hook ao exportador glTF existente no seu software.
6. Integre com um projeto web para que a UI possa ser gerada para componentes personalizados. Para Unity e Blender, chamamos a isto `Component Compiler` – ele cria automaticamente uma UI para os componentes no seu projeto, e serve como uma ponte entre componentes TypeScript e o seu software 3D.

## Integrar o fluxo de trabalho do projeto web

Uma integração completa pode também gerir mais do fluxo de trabalho do projeto web. Todas estas operações podem ser feitas a partir da linha de comando, mas para facilidade de uso, podem ser bem encapsuladas numa GUI ou num menu personalizado no seu software 3D. Isto inclui:

1. Criar um novo projeto ou alterar a localização do projeto web
2. Executar o projeto web a partir do seu software 3D
   - A nossa integração [Unity](./../unity/) substitui o botão "Play" para executar o projeto web.
   - A integração [Blender](./../blender/) tem um botão "Play" personalizado que executa o projeto web.
3. Construir o projeto web para uma pasta
4. Carregar o projeto construído para o Needle Cloud ou outra plataforma, e memorizar o Project ID e o Team ID
   - A nossa integração Unity mostra adicionalmente os últimos uploads para a sua equipa, e permite saltar para o último deployment de um projeto.
5. Carregar/descarregar assets individuais para o Needle Cloud ou outra plataforma

:::tip Entre em contacto se estiver a planear construir uma integração personalizada!
Por favor, entre em contacto connosco se estiver interessado em construir uma integração personalizada. Teremos todo o gosto em ajudá-lo com o processo e explicar mais detalhes. Para clientes Enterprise, também fornecemos integrações personalizadas como um serviço.
:::


Página traduzida automaticamente usando IA