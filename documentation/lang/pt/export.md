---
title: Exportar Recursos para glTF
---



# Exportar Recursos, Animações, Prefabs, Materiais, Lightmaps...
Adicione um componente ``ExportInfo`` à sua cena Unity para gerar um novo projeto web a partir de um template, ligar a um projeto web existente para o qual quer exportar, configurar dependências para outras bibliotecas e pacotes e implementar o seu projeto.

Por predefinição, a sua cena é exportada ao guardar. Esta configuração pode ser alterada desativando ``Auto Export`` no componente ``ExportInfo``.

## 📦 Exportar ficheiros glTF
Para exportar malhas, materiais, animações, texturas (...) crie um novo GameObject na sua hierarquia e adicione um componente ``GltfObject`` a ele. Este é a raiz de um novo ficheiro glTF. Será exportado sempre que fizer uma alteração na cena e guardar.

Apenas scripts e dados dentro e dentro desses objetos raiz são exportados. Scripts e dados fora deles não são exportados.


Adicione um cubo como filho do seu objeto raiz e guarde a sua cena. Note que a pasta de saída ``assets/`` (veja [estrutura do projeto](#vite-project-structure)) contém agora um novo ficheiro ``.glb`` com o mesmo nome do seu GameObject raiz.

Pode ativar a configuração ``Smart Export`` (via `Edit/Project Settings/Needle`) para exportar apenas quando for detetada uma alteração na hierarquia deste objeto.

:::details Como impedir que objetos específicos sejam exportados
Objetos com a tag `EditorOnly` serão ignorados na exportação, incluindo a sua hierarquia filha.
Esteja ciente de que isto é preferível a desativar objetos, pois os desativados ainda serão exportados caso sejam ligados mais tarde.
:::

### Lazy loading e múltiplos níveis / cenas

Se quiser dividir a sua aplicação em vários níveis ou cenas, pode simplesmente usar o componente `SceneSwitcher`. Pode então estruturar a sua aplicação em várias cenas ou prefabs e adicioná-los ao array SceneSwitcher para serem carregados e descarregados em tempo de execução. Esta é uma ótima maneira de evitar ter que carregar todo o seu conteúdo antecipadamente e manter os tempos de carregamento baixos (por exemplo, foi o que fizemos em [needle.tools](https://needle.tools?utm_source=needle_docs&utm_content=export_scenes) separando cada secção do nosso website na sua própria cena e carregando-as apenas quando necessário)

### Complexidade Recomendada por glTF

- Tamanho máximo de exportação de 50 MB sem compressão (geralmente fica ~10-20 MB comprimido)
- Máx. 500k vértices (menos se também targetar VR móvel)
- Máx. 4x 2k lightmaps

Pode dividir cenas e prefabs em múltiplos ficheiros glTF e depois carregá-los on demand (apenas quando necessário). Isto mantém o desempenho de carregamento rápido e o tamanho do ficheiro pequeno. Veja a secção [AssetReference nos docs de Scripting](scripting.md#assetreference-and-addressables).

A complexidade da cena aqui é recomendada para garantir um bom desempenho numa variedade de dispositivos com capacidade web e larguras de banda. Não há limitação técnica para isto além das capacidades do seu dispositivo.

### Prefabs
Prefabs podem ser exportados como ficheiros glTF individuais e instanciados em tempo de execução. Para exportar um prefab como glTF, basta referenciar um asset prefab (do project browser e não na cena) [de um dos seus scripts](https://fwd.needle.tools/needle-engine/docs/addressables).

Exportar Prefabs também funciona com aninhamento: um componente num Prefab pode referenciar outro Prefab que será então também exportado.
Este mecanismo permite compor cenas para serem o mais leves possível e carregar o conteúdo mais importante primeiro e adiar o carregamento de conteúdo adicional.

### Scene Assets
Similar aos assets Prefab, pode referenciar outros assets Scene.
Para começar, crie um componente na Unity com um campo ``UnityEditor.SceneAsset`` e adicione-o a um dos seus GameObjects dentro de um GltfObject. A cena referenciada será agora exportada como um ficheiro glTF separado e pode ser carregada/deserializada como um ``AssetReference`` de TypeScript.

Pode continuar a trabalhar dentro de uma cena referenciada e ainda assim atualizar a sua cena/website exportador principal. Ao guardar a cena ou mudar o modo de reprodução, detetaremos se a cena atual está a ser usada pelo seu servidor atualmente em execução e, em seguida, acionaremos uma re-exportação apenas para esse glb. (Esta verificação é feita pelo nome - se um glb dentro da sua pasta ``<web_project>/assets/`` existir, é exportado novamente e a cena principal recarrega-o.)

Como exemplo no [nosso website](https://needle.tools?utm_source=needle_docs&utm_content=export_sceneassets), cada secção está configurada como uma cena separada e na exportação é empacotada em múltiplos ficheiros glb que carregamos on demand:

![2022-08-22-172605_Needle_Website_-_Website_-_Windows,_Mac,_Linux_-_U](https://user-images.githubusercontent.com/5083203/185958983-71913c97-5eec-4cfd-99f5-76798582373e.png)

#### Carregar um Prefab ou Cena a partir de um script personalizado
Se quiser referenciar e carregar um prefab de um dos seus scripts, pode declarar um tipo `AssetReference`.
Aqui está um exemplo mínimo:

@[code ts twoslash](@code/component-prefab.ts)

## 🏇 Exportar Animações
Needle Engine suporta um subconjunto considerável e poderoso das funcionalidades de animação da Unity:

- **Timeline** incl. activation tracks, animation tracks, track offsets
- **Animator** incl. top-level state transitions
  - Blend trees não são atualmente suportados.
  - Sub state machines não são atualmente suportados.
- **AnimationClips** incl. modos Loop
- **Procedural Animations** podem ser criadas via scripting

Needle Engine é um dos primeiros a suportar a nova [extensão glTF KHR_ANIMATION_POINTER](https://github.com/ux3d/glTF/tree/extensions/KHR_animation_pointer/extensions/2.0/Khronos/KHR_animation_pointer).
Isto significa que quase todas as propriedades, incluindo variáveis de script, são animáveis.

Uma limitação atual é que os materiais não serão duplicados na exportação - se quiser animar o mesmo material com cores diferentes, por exemplo, precisa atualmente de dividir o material em dois.

## 🌍 Exportar o Skybox
O skybox da Unity e a reflexão personalizada (se houver) são cozidos numa textura na exportação e exportados automaticamente dentro da extensão ``NEEDLE_lightmaps``.

Para alterar a resolução do skybox, pode adicionar um componente ``SkyboxExportSettings`` à sua cena.

![image](https://user-images.githubusercontent.com/5083203/196030839-170a9496-9ed9-4ebc-bc1d-2df6c746f8c8.png)


Se não quiser que o skybox seja exportado de todo num ficheiro glb, pode desmarcar a opção ``Embed Skybox`` no seu componente ``GltfObject``

![image](https://user-images.githubusercontent.com/5083203/196030825-8a05037f-5acc-4795-9128-2bdacedd0d49.png)


## ✨ Exportar Materiais

### Materiais Baseados Fisicamente (PBR)
Por predefinição, os materiais são convertidos em materiais glTF na exportação. glTF suporta um modelo de material baseado fisicamente e tem várias extensões que ajudam a representar materiais complexos.

Para controlo total sobre o que é exportado, é altamente recomendado usar os materiais glTF fornecidos pela UnityGltf:
- PBRGraph
- UnlitGraph

::: tip Em caso de dúvida, use o shader PBRGraph
O material PBRGraph tem muitas funcionalidades, muito mais do que Standard ou URP/Lit. Estas incluem funcionalidades avançadas como refração, iridescência, brilho e mais. Adicionalmente, materiais usando PBRGraph e UnlitGraph são exportados como estão, sem necessidade de conversão.
:::

Materiais que podem ser convertidos out-of-the-box:
- BiRP/Standard
- BiRP/Autodesk Interactive
- BiRP/Unlit
- URP/Lit
- URP/Unlit

Outros materiais são convertidos usando uma heurística de nomes de propriedades. Isso significa que, dependendo dos nomes de propriedades que os seus materiais e shaders usam, pode querer refatorar as propriedades do seu shader personalizado para usar os nomes de propriedades de URP/Lit ou PBRGraph, ou exportar o material como [Custom Shader](#custom-shaders).

### Custom Shaders
Para exportar custom Unlit shaders (por exemplo, feitos com ShaderGraph), adicione um Asset Label ``ExportShader`` ao shader que quer exportar. Asset Labels podem ser vistos na parte inferior da janela Inspector.

![2022-08-22-172029_Needle_Website_-_CustomShaders_-_Windows,_Mac,_Lin](https://user-images.githubusercontent.com/5083203/185957781-9fae18c5-09ff-490f-8958-57e138aa0003.png)

#### Limitações
- Atualmente apenas suportamos custom **Unlit** shaders — a conversão de shaders Lit não é oficialmente suportada.
- Custom Lit Shaders são atualmente experimentais. Nem todos os modos de renderização são suportados.
- O recebimento de sombras em shaders personalizados não é suportado
- Malhas com skinning com shaders personalizados não são suportadas
- Como há várias mudanças de sistema de coordenadas ao passar da Unity para three.js e glTF, podem ser necessárias algumas alterações para que efeitos avançados funcionem. Tentamos converter dados na exportação, mas podemos não detetar todos os casos onde são necessárias conversões.
  - As coordenadas UV na Unity começam no canto inferior esquerdo; em glTF começam no canto superior esquerdo.
  - Os valores do eixo X são invertidos em glTF em comparação com a Unity. Esta é uma variante de uma mudança de sistema de coordenadas de mão esquerda para mão direita. Os dados usados em shaders podem precisar ser invertidos no eixo X para serem exibidos corretamente.

::: note Não faz parte da especificação glTF
Note que **Custom Shaders** não fazem parte oficialmente da especificação glTF. A nossa implementação de shaders personalizados usa uma extensão chamada KHR_techniques_webgl, que armazena o código shader WebGL diretamente no ficheiro glTF. Os assets resultantes funcionarão em visualizadores baseados em Needle Engine, mas podem não ser exibidos corretamente noutros visualizadores.
:::

## 💡 Exportar Lightmaps
![2022-08-22-171650_Needle_-_Google_Chrome](https://user-images.githubusercontent.com/5083203/185957005-d04c9530-07eb-40f5-b305-9822d13b79ab.png)


Para exportar lightmaps, basta [gerar lightmaps](https://docs.unity3d.com/Manual/Lightmapping.html) na Unity. Os lightmaps serão exportados automaticamente.

Ao trabalhar em várias cenas, desative "Auto Generate" e coza explicitamente os lightmaps. Caso contrário, a Unity descartará lightmaps temporários ao mudar de cena.

### Configurações de Lightmap Recomendadas
- Lightmap Encoding: Normal Quality (ajuste em Project Settings > Player)
- Progressive GPU (mais rápido e geralmente preciso o suficiente para cenas pequenas)
- Lightmaps Não Direcionais
- Tamanho Máximo de Lightmap 2k (pode ir mais alto, mas espere ficheiros grandes)
- Máx. 4x 2k lightmaps por cena (pode ir mais alto, mas espere ficheiros grandes)
- Compress Lightmaps OFF (aumenta a qualidade; caso contrário será comprimido novamente na hora da exportação)

![2022-08-22-171356_Needle_Website_-_Lightmaps_-_Windows,_Mac,_Linux_-](https://user-images.githubusercontent.com/5083203/185956392-f4031f45-ad13-4e6d-a14c-c8ec5c1fcfd4.png)

### Misturar Objetos Cozidos e Não Cozidos

Não há um mapeamento de 100% entre como a Unity lida com luzes e ambiente e como three.js lida com isso. Por exemplo, a Unity tem code paths inteiramente separados para objetos com lightmap e sem lightmap (objetos com lightmap não recebem luz ambiente, pois isso já está cozido nos seus mapas), e three.js não distingue dessa forma.

Isto significa que, para obter melhores resultados, atualmente recomendamos configurações específicas se estiver a misturar objetos cozidos e não cozidos numa cena:
```
Environment Lighting: Skybox
Ambient Intensity: 1
Ambient Color: black
```

**2021.3+**
![20220826-175324-SqBL-Unity_pMXa-needle](https://user-images.githubusercontent.com/2693840/186947184-2446672f-420c-47e8-8f7d-970a7d52bf35.png)

**2020.3+**
![20220826-175514-tnGc-Unity_mycs-needle](https://user-images.githubusercontent.com/2693840/186947203-2d7d96c3-f566-44b4-889c-4103fac505d4.png)

Se não tiver objetos cozidos na sua cena, então as seguintes configurações também deverão produzir resultados corretos:
```
Environment Lighting: Color
Ambient Color: any
```


Página traduzida automaticamente usando IA