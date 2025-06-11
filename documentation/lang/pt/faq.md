---
title: Perguntas e Respostas (FAQ) 💡
---


## Como posso ativar a minha Licença do Needle Engine?

### Ativar a licença no Unity

#### Needle Engine 4.x

Vá a Project Settings/Needle e clique no botão de login. Siga os passos e inicie sessão na sua conta Needle.
Depois disso, verá as informações da sua conta na janela de definições do projeto Unity. Selecione a equipa licenciada no dropdown.

#### Needle Engine 3.x

Abra `Edit/Project Settings/Needle` para aceder às definições do plugin Needle Engine. No topo da janela, encontrará campos para inserir as suas informações de licença.
- `Email` - Insira o email com o qual comprou a licença
- `Invoice ID` - Insira um dos IDs de fatura que recebeu por email

Nota: Poderá precisar de reiniciar o servidor web local para aplicar a licença.

![unity license window](/imgs/unity-needle-engine-license.jpg)

### Ativar a licença no Blender
Abra `Addon Preferences/Needle Engine` para aceder às definições do addon Needle Engine
- `Email` - Insira o email com o qual comprou a licença
- `Invoice ID` - Insira um dos IDs de fatura que recebeu por email

Nota: Poderá precisar de reiniciar o servidor web local para aplicar a licença.



## O meu website local mostra um erro SSL, p. ex. 'A sua ligação não é privada'

Pode ver um aviso no seu navegador sobre Segurança SSL, dependendo da sua configuração local.

Isto acontece porque, embora a ligação esteja encriptada, por defeito não há certificado SSL que o navegador possa validar.
Se isso acontecer: clique em `Advanced` e `Proceed to Site`. No Safari, poderá precisar de atualizar a página depois, porque não prossegue automaticamente. Agora deverá ver a sua cena no navegador!

O diálogo só deverá aparecer uma vez para o mesmo servidor local

::: tip
As ligações são seguras, porque estamos a impor HTTPS para garantir que o WebXR e outras APIs web modernas funcionam de imediato. Alguns navegadores ainda reclamarão que a ligação SSL (entre o seu servidor de desenvolvimento local e o website local) não pode ser automaticamente confiável, e que precisa de verificar manualmente que confia nessa página. A Recarga Automática de Página e as ligações Websocket também podem ser afetadas dependendo do navegador e das definições do sistema.

Consulte a [documentação de Testes](./testing.md) para obter informações sobre como configurar um certificado autoassinado para uma experiência de desenvolvimento mais fluida.
:::

![SLL warning on chrome](/videos/ssl-warning.gif)



## O meu website local permanece preto

Se isso acontecer, geralmente há uma exceção no código do motor ou no seu código. Abra as ferramentas de desenvolvimento (<kbd>Ctrl + Shift + I</kbd> ou <kbd>F12</kbd> no Chrome) e verifique a Consola para erros.
Em alguns casos, especialmente quando acabou de atualizar a versão do pacote Needle Engine, isto pode ser corrigido parando e reiniciando o servidor de desenvolvimento local.
Para isso, clique na barra de progresso em execução no canto inferior direito do Editor, e clique no pequeno <kbd>X</kbd> para cancelar a tarefa em execução. Depois, simplesmente carregue novamente em Play.


## Os meus objetos ficam brancos após a exportação
Isto geralmente acontece quando está a usar shaders ou materiais personalizados e as suas propriedades não se traduzem claramente em nomes de propriedades conhecidos para a exportação glTF.
Pode garantir que está a usar materiais e shaders compatíveis com glTF, ou marcar shaders como "custom" para os exportar diretamente.
- Leia mais sobre fluxos de trabalho glTF recomendados: <link>
- Leia mais sobre shaders personalizados: <link>


## Uncaught ReferenceError: NEEDLE_ENGINE_META is not defined / NEEDLE_USE_RAPIER is not defined

Se estiver a usar vite ou next.js, certifique-se de que adiciona os plugins do Needle Engine à sua configuração.
Exemplo para vite:
```js
const { needlePlugins } = await import('@needle-tools/engine/plugins/vite/index.js');
plugins: [needlePlugins(command, needleConfig)]
```
Exemplo para next.js
```js
const { needleNext } = await import("@needle-tools/engine/plugins/next/index.js");
return needleNext({}, { modules: { webpack } });
```
Pode também simplesmente declarar as variáveis em falta no seu `index.html` raiz, por exemplo, numa tag de script, assim:
```html
<script>
  var NEEDLE_ENGINE_META = {}
  var NEEDLE_USE_RAPIER = true;
</script>
```

## THREE.EXRLoader: o ficheiro fornecido não parece estar no formato OpenEXR

Por favor, certifique-se de que definiu Lightmap Encoding para **Normal Quality**.
Vá a *Edit/Project Settings/Player* para mudar a definição.

![](/faq/lightmap_encoding.jpg)

## O meu website fica demasiado grande / está a carregar lentamente (demasiados MB)

Isto pode ter muitas razões, mas algumas comuns são:
- demasiadas texturas ou texturas são demasiado grandes
- meshes têm demasiados vértices
- meshes têm atributos de vértice de que não precisa realmente (p. ex., têm normais e tangentes, mas não as está a usar)
- objetos estão desativados e não são ignorados – objetos desativados também são exportados caso queira ligá-los em tempo de execução! Defina a sua Tag como `EditorOnly` para os ignorar completamente na exportação.
- tem vários componentes ``GltfObject`` na sua cena e todos têm ``EmbedSkybox`` ativado (precisa de ter o skybox apenas uma vez por cena que exporta)

Se o tempo de carregamento em si for um problema, pode **tentar dividir o seu conteúdo em vários ficheiros glb** e carregá-los a pedido (é isto que fazemos no nosso website). Para que funcione, pode colocar o seu conteúdo em Prefabs ou Cenas e referenciá-los a partir de qualquer um dos seus scripts. Por favor, consulte [Scripting/Addressables na documentação](./scripting.md#assetreference-and-addressables).

## A minha UI não está a renderizar Texto

- Para Unity: Certifique-se de que usa o componente `UI/Legacy/Text` e **não** o componente `TextMeshPro - Text`.

## Os meus scripts não funcionam após a exportação

- O seu código C# existente **não** será exportado como está, tem de escrever typescript / javascript correspondente para ele.
- Needle usa typescript / javascript para componentes e gera stubs C# para eles.
- Componentes que já têm JS correspondente mostrarão isso no Inspector.

## Os meus lightmaps parecem diferentes / demasiado brilhantes

Certifique-se de que está a seguir as [melhores práticas para lightmaps](https://docs.needle.tools/lightmaps?utm_source=needle_docs) e leia sobre a [mistura de objetos baked e non-baked](https://github.com/needle-tools/needle-engine-support/blob/main/documentation/export.md#mixing-baked-and-non-baked-objects).

## A minha cena está demasiado brilhante / a iluminação parece diferente do que no Unity
Certifique-se de que as suas luzes estão definidas como "Baked" ou "Realtime". "Mixed" não é atualmente suportado.

- Luzes definidas como "mixed" (com lightmapping) afetam objetos duas vezes no three.js, uma vez que atualmente não há forma de excluir objetos lightmapped da iluminação.
- O fator ``Intensity Multiplier`` para Skybox em ``Lighting/Environment`` não é atualmente suportado e não tem efeito no Needle Engine.
![image](https://user-images.githubusercontent.com/5083203/185429006-2a5cd6a1-8ea2-4a8e-87f8-33e3afd080ec.png)
- A intensidade da sombra das luzes não pode ser alterada atualmente devido a uma limitação do three.js.

Consulte também a documentação sobre a [mistura de objetos baked e non-baked](https://github.com/needle-tools/needle-engine-support/blob/main/documentation/export.md#mixing-baked-and-non-baked-objects).


## A resolução do meu skybox está baixa? Como mudar a resolução do meu skybox

- **Se usar um cubemap personalizado**: Pode sobrepor as definições de importação de textura da textura do skybox (atribuída ao seu cubemap).

![image](https://user-images.githubusercontent.com/5083203/188179104-1e078cda-3397-4ebe-aaf9-7faa23ee4904.png)


- **Se usar o skybox predefinido**: Adicione um componente ``SkyboxExportSettings`` em qualquer lugar na sua cena para sobrepor a resolução predefinida.

![image](https://github.com/needle-tools/needle-engine-docs/assets/5083203/578380ab-2036-4d70-a8a7-f8cd9da9f603)



## As minhas Sombras não são visíveis ou estão cortadas

Por favor, verifique os seguintes pontos:

- A sua luz tem sombras ativadas (Soft Shadow ou Hard Shadow).
- Os seus objetos estão definidos para "Cast Shadows: On" (ver componente MeshRenderer).
- Para luzes direcionais, a posição da luz é atualmente importante, pois a câmara de sombra será colocada onde a luz está localizada na cena.



## As minhas cores parecem erradas

Certifique-se de que o seu projeto está definido para o colorspace Linear.

![image](https://github.com/needle-tools/needle-engine-docs/assets/5083203/66e9feb1-0551-4549-85d3-3e5b8021f162)



## Estou a usar networking e Glitch e não funciona se mais de 30 pessoas visitarem a página do Glitch ao mesmo tempo

- Deploying no Glitch é uma forma rápida de prototipar e poderá até funcionar para algumas pequenas produções. O pequeno servidor não tem a potência e a largura de banda para hospedar muitas pessoas numa sessão persistente.
- Estamos a trabalhar noutras ideias de networking, mas entretanto, pode hospedar o website noutro local (com suporte para node.js) ou simplesmente remisturá-lo para distribuir a carga entre vários servidores. Pode também hospedar o próprio [pacote de backend de networking](https://www.npmjs.com/package/@needle-tools/needle-tiny-networking-ws) noutro local onde possa escalar, p. ex., Google Cloud.



## O meu website não tem botões AR/VR

- Certifique-se de que adiciona o componente `WebXR` em algum lugar dentro do seu `GltfObject` raiz.
- Opcionalmente, adicione um componente `AR Session Root` no seu `GltfObject` raiz ou dentro da hierarquia dos filhos para especificar o posicionamento, escala e orientação para WebXR.
- Opcionalmente, adicione um componente `XR Rig` para controlar onde os utilizadores começam em VR.


## Criei um novo script numa sub-cena, mas não funciona

Ao criar novos scripts em npmdefs em sub-cenas (ou seja, uma cena que é exportada como referência a partir de um script na sua cena de exportação raiz), atualmente tem de re-exportar a cena raiz novamente. Isto acontece porque o code-gen responsável por registar novos scripts só é executado atualmente para cenas com um componente ``ExportInfo``. Isto será corrigido no futuro.


## O meu servidor local não inicia / Não vejo um website

A razão mais provável é uma instalação incorreta.
Verifique a consola e o componente `ExportInfo` para erros ou avisos.

Se estes avisos/erros não ajudaram, tente os seguintes passos por ordem. Dê-lhes algum tempo para completar. Pare quando o seu problema for resolvido. Verifique a consola para avisos e erros.

- Certifique-se de que segue os [Pré-requisitos](./getting-started/#prerequisites).
- Instale o seu projeto selecionando o seu componente `ExportInfo` e clicando em `Install`.
- Execute uma instalação limpa selecionando o seu componente `ExportInfo`, mantendo Alt pressionado e clicando em `Clean Install`.
- Tente abrir o diretório do seu projeto web numa ferramenta de linha de comandos e siga estes passos:
  - execute ``npm install`` e depois ``npm run dev-host``
  - Certifique-se de que tanto o pacote de runtime local (``node_modules/@needle-tools/engine``) quanto o three.js (``node_modules/three``) foram instalados.
  - Pode executar ``npm install`` em ambos estes diretórios também.


## A geração de componentes C# funciona também apenas com javascript?

Embora a geração de componentes C# tecnicamente funcione também com javascript vanilla, não a recomendamos nem a suportamos totalmente, uma vez que é mais uma questão de adivinhação ou simplesmente impossível para o gerador saber qual tipo C# criar para a sua classe javascript. Abaixo encontra um exemplo mínimo de como gerar um Componente Unity a partir de javascript, se realmente quiser.

```js
import { Behaviour } from "@needle-tools/engine";

export class MyScript extends Behaviour
{
    //@type float
    myField = 5;
}
```


## Não tenho botões como "Generate Project" nos meus componentes/inspector

Por favor, verifique se não está acidentalmente no modo `Debug` do Inspector – volte para `Normal`:
![20220824-025011-S2GQ-Unity_lKlT-needle](https://user-images.githubusercontent.com/2693840/186291615-56e7ebdb-1221-4326-813d-f88526fa126c.png)


## Toktx não pode ser encontrado / toktx não está instalado

- Certifique-se de que [descarrega e instala o toktx](http://localhost:8080/docs/getting-started/.html#install-these-tools-for-production-builds).

- No Windows: Certifique-se de que adicionou o toktx às suas variáveis de ambiente do sistema. Poderá precisar de reiniciar o seu computador após adicioná-lo para atualizar as variáveis de ambiente. A localização de instalação predefinida é ``C:\Program Files\KTX-Software\bin``.

![image](/imgs/ktx-env-variable.webp)


## Instalar o projeto web demora uma eternidade / nunca termina / EONET: no such file or directory
- **Certifique-se de que não cria um projeto numa drive formatada como exFAT**, porque o exFAT não suporta symlinks, o que é necessário para o Needle Engine para Unity antes da versão 3.x.
Pode verificar a formatação das suas drives usando os seguintes passos:
1. Abrir "Informações do Sistema" (ou tecla Windows e digite isso, ou insira "msinfo32" no cmd)
2. Selecione Componentes > Armazenamento > Drives
3. Selecione tudo (Ctrl + A) no lado direito do ecrã e copie (Ctrl + C) e cole aqui (Ctrl + V).

## A instalação do NPM falha e há erros sobre disco rígido / IO
Certifique-se de que o seu projeto está num disco que se sabe funcionar com node.js. A principal razão para falhas é que o disco não suporta symlinks (symbolic links / softlinks), o que é um requisito para o funcionamento adequado do node.js.
A formatação <kbd>NTFS</kbd> deve sempre funcionar. Formatações de sistema de ficheiros problemáticas conhecidas são <kbd>exFAT</kbd> e <kbd>FAT32</kbd>.

Para verificar o formato das suas drives, pode:
1. Abrir "Informações do Sistema" (ou <kbd>tecla Windows</kbd> e digite "Informações do Sistema", ou insira `msinfo32` no cmd (<kbd>Windows + R</kbd>))
2. Selecione "Componentes > Armazenamento > Drives"
3. Aí, pode ver todas as drives e a sua formatação listada. Coloque os seus projetos numa drive formatada em NTFS.


## Estou a receber erros com "Unexpected token `@`. Expected identifier, string literal, numeric literal or ..."

O Needle Engine usa typescript decorators para serialização.
Para corrigir este erro, certifique-se de que ativa `experimentalDecorators` no seu tsconfig.json.

## Estou a receber um erro 'failed to load config ... vite.config.js' ao executar comandos npm no Mac OS

É provável que esteja a usar uma versão x86_64 do Unity num processador (ARM) Apple Silicon. O Unity 2020.3 só está disponível para x86_64, versões posteriores também têm versões para Apple Silicon.
A nossa integração com o Unity, ao chamar o npm, fá-lo-á assim a partir de um processo x86_64, resultando na utilização da versão x86_64 do node e do vite/esbuild. Quando depois tentar executar comandos npm no mesmo projeto a partir de uma aplicação Apple Silicon (p. ex., VS Code), o npm reclamará sobre arquiteturas incompatíveis com uma longa mensagem de erro.

Para corrigir isto, use uma versão Apple Silicon do Unity (2021.1 ou posterior).

Pode também corrigi-lo temporariamente no 2020.3 eliminando a pasta `node_modules` e executando `npm install` novamente a partir do VS Code. Terá de eliminar `node_modules` novamente quando voltar para o Unity.

## Erro de referência circular

Isto pode acontecer quando tem, p. ex., um `SceneSwitcher` (ou qualquer outro componente que carrega uma cena ou asset) e o Asset referenciado no Unity contém um `GltfObject` que tem o mesmo nome que a sua cena original com o `SceneSwitcher`. Pode verificar isto no Unity se receber um erro que diga algo como:

```
Failed to export ↑ YourSceneName.glb
you seem to have objects with the same name referencing each other.
```

Para corrigir isto, pode:
- Remover o `GltfObject` no Prefab ou Cena referenciada.
- Renomear o GameObject com o componente que carrega as cenas referenciadas.

Se isto não resolver o problema, por favor, pergunte [no nosso fórum](https://forum.needle.tools/?utm_source=needle_docs&utm_content=content).

## A minha cena não está a carregar e a consola contém um aviso com 'circular references' ou 'failed to update active state'
Por favor, consulte a secção de [erro de referência circular](#circular-reference-error).

## A minha máquina suporta WebGL 2?

Use um detetor [como este](https://get.webgl.org/webgl2/) para determinar se o seu dispositivo suporta WebGL 2, também sugere qual pode ser a causa do seu problema, mas geralmente certifique-se de que atualizou o seu navegador e drivers. O WebGL 1 não é suportado.

#### Dispositivos conhecidos por causar problemas:
- Lenovo Thinkpad - T495

## Quero usar o Needle AI com o meu modelo de IA local

Se quiser (ou tiver de) executar a sua IA localmente, pode usar os ficheiros llms.txt do Needle como contexto para a sua IA local (p. ex., Ollama):

- [llms.txt](https://cloud.needle.tools/llms.txt)
- [llms-full.txt](https://cloud.needle.tools/llms-full.txt)


## Ainda tem perguntas?
[Pergunte no nosso fórum](https://forum.needle.tools/?utm_source=needle_docs&utm_content=content)

<a href="https://discord.needle.tools" target="_blank"><img height=20 src="https://img.shields.io/discord/717429793926283276?color=5562ea&label=Discord" /></a>


Página traduzida automaticamente usando IA