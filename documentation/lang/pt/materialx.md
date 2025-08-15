---
title: MaterialX
---

## MaterialX no Needle Engine

MaterialX é um padrão poderoso para descrever materiais e shaders de forma baseada em grafos, independente do motor de renderização. Permite definir materiais complexos, com múltiplas camadas de superfície e iluminação realista.

É amplamente utilizado em cinema, VFX e e-commerce, e é suportado por muitas ferramentas de autoria profissionais, como Autodesk Maya e 3ds Max, Houdini, V-Ray e Omniverse.

::: tip Saiba mais
Pode saber mais sobre o MaterialX no [site do MaterialX](https://www.materialx.org/).
:::

Materiais feitos com o [**Shader Graph**](https://docs.unity3d.com/Packages/com.unity.shadergraph@17.3/manual/index.html) do Unity podem ser exportados para ficheiros MaterialX automaticamente através do **Needle MaterialX Exporter**, que faz parte do nosso pacote de integração Unity.

Isto permite criar materiais complexos e iluminados no Unity, e são automaticamente exportados juntamente com a sua cena. A exportação MaterialX estende a nossa exportação de shader Unlit existente, que é menos portátil devido ao uso de shaders WebGL2. Com o MaterialX, está pronto para WebGPU e futuras tecnologias de renderização, e pode alcançar materiais de alta fidelidade nos seus projetos web.

O suporte MaterialX no Needle Engine usa a [biblioteca JavaScript oficial do MaterialX](https://github.com/materialx/MaterialX), o que significa que os materiais são representados com a mais alta fidelidade possível. Isto permite usar qualquer ficheiro MaterialX.

::: info O Shader Graph para MaterialX requer um plano **Pro**, **Edu** ou **Enterprise**.
O MaterialX Exporter está disponível para utilizadores com planos Pro, Edu e Enterprise.
[Ver planos e preços.](https://needle.tools/pricing)
:::

## Casos de Uso

MaterialX é uma ótima escolha se
- estiver a usar **materiais baseados em grafos** para os seus projetos para controlo artístico e flexibilidade.
- precisar de **funcionalidades de superfície ricas e complexas**, como texturas procedurais, mapas de detalhe ou materiais em camadas.
- tiver **materiais MaterialX existentes** que deseja manter ao longo do seu pipeline de estúdio.
- quiser garantir **consistência e compatibilidade** para as suas renderizações em diferentes motores de renderização.

## Ativar o suporte MaterialX no seu projeto

Para ativar o suporte MaterialX no seu projeto Needle Engine, precisa de adicionar o pacote `@needle-tools/materialx` ao seu projeto.

::: tabs

@tab Unity

1.  Selecione o componente Needle Engine na sua cena.

2.  Encontre a secção "NpmDef Dependencies" no Inspetor, e adicione uma nova dependência aumentando o número "Size" (por exemplo, de 0 para 1).

3.  Clique no símbolo do Seletor de Objeto, ative a Visibilidade do Pacote com o símbolo do olho e selecione o pacote `Needle MaterialX` da lista.

    ![Encontrar e adicionar a dependência do pacote MaterialX no Unity.](/materialx/add-materialx-package-dependency.jpeg)
    _Encontrar e adicionar a dependência do pacote MaterialX no Unity._

Está agora pronto para usar MaterialX no seu projeto web.

@tab Outras integrações Needle

1.  Encontre e abra o seu projeto web num editor de código (por exemplo, VS Code).
    [Saiba como abrir o seu projeto web.](./project-structure.html#opening-the-web-project-in-a-code-editor)
2.  Instale o pacote Needle MaterialX do registo NPM no seu projeto web.

    ```bash
    npm install @needle-tools/materialx
    ```

    Isto adicionará o pacote MaterialX ao seu projeto.

3.  Se estiver a usar qualquer um dos nossos modelos baseados em Vite, não precisa de fazer mais nada. O pacote MaterialX será automaticamente incluído no seu projeto.

    ::: tip Se não tiver a certeza, provavelmente está a usar um dos nossos modelos baseados em Vite!
    :::

4.  Se não estiver a usar os plugins Needle Vite, importe e registe o MaterialX no seu ficheiro de entrada principal, por exemplo em `main.ts`:

    ```ts
    import { useNeedleMaterialX } from "@needle-tools/materialx";
    useNeedleMaterialX();
    ```

Está agora pronto para usar MaterialX no seu projeto web.

@tab three.js

Pode usar o nosso pacote MaterialX em qualquer projeto three.js, mesmo que não esteja a usar o Needle Engine.

1.  Registe o nosso plugin `MaterialX` com o seu `GLTFLoader`:

    ```ts
    import { useNeedleMaterialX } from "@needle-tools/materialx";
    import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

    const gltfLoader = new GLTFLoader();

    // ... registar outros plugins como DRACOLoader, KTX2Loader, etc.
    useNeedleMaterialX(gltfLoader);

    // ... carregar um ficheiro que contém materiais MaterialX
    gltfLoader.load("https://cloud.needle.tools/-/assets/Z23hmXB2qfHiF-2qfHiF/file", (gltf) => {
        scene.add(gltf.scene);
    });
    ```

2.  Carregue ficheiros GLB que contêm a extensão `NEEDLE_materials_mtlx`. O plugin irá carregar e aplicar automaticamente os materiais MaterialX aos objetos que os estão a usar.

3.  Pode ativar o pré-carregamento do módulo WebAssembly MaterialX chamando `useNeedleMaterialX(gltfLoader, { preload: true })`. Isto irá carregar o módulo WebAssembly MaterialX com antecedência, para que esteja pronto quando carregar um ficheiro GLB com materiais MaterialX.

Pode encontrar um exemplo completo de como usar MaterialX num projeto three.js no StackBlitz: [MaterialX no three.js](https://stackblitz.com/edit/needle-materialx-example?file=main.js).

:::
## Exportar materiais com suporte MaterialX

1.  Crie materiais com o Shader Graph do Unity.

    ![Exemplo de um Shader Graph complexo no Unity.](/materialx/shadergraph-example.webp)
    _Exemplo de um Shader Graph complexo no Unity._

2.  Selecione um objeto que tenha um material baseado em Shader Graph na sua cena, ou selecione o asset do shader na Vista do Projeto.

3.  Nas propriedades do Material, encontre a secção "Needle Engine – Definições de Shader Personalizadas", e selecione "MaterialX" como o Tipo de Exportação de Shader.

    ![Ativar o tipo de exportação MaterialX nas propriedades do material do Shader Graph.](/materialx/enable-asset-label-from-material.jpeg)
    _Ativar o tipo de exportação MaterialX nas propriedades do material do Shader Graph._

3.  Quando exportar a sua cena, todos os materiais que usam shaders com o tipo de exportação "MaterialX" serão incorporados juntamente com o seu conteúdo 3D e carregados em tempo de execução.

## Usar ficheiros MaterialX criados externamente

O pacote Needle MaterialX contém suporte experimental para carregar ficheiros MaterialX diretamente. As texturas podem ser resolvidas através de uma função de callback, e os materiais são retornados como `ShaderMaterial` do three.js.

Pode encontrar exemplos de como trabalhar com o pacote Needle MaterialX [na nossa coleção MaterialX no StackBlitz](
https://stackblitz.com/@marwie/collections/materialx).

:::: tabs
@tab A partir do código

```ts
import { TextureLoader } from 'three';
import { Experimental_API } from '@needle-tools/materialx';

// Carrega um ficheiro MaterialX e as suas texturas referenciadas a partir de um URL
function load(mtlx_url) {
    const parts = mtlx_url.split('/');
    parts.pop();
    const dir = parts.join('/');

    return fetch(mtlx_url)
    .then((res) => res.text())
    .then((mtlx) => {
        const loader = new TextureLoader();
        Experimental_API.createMaterialXMaterial(mtlx, '', {
            getTexture: async (url) => {
                return await loader.loadAsync(dir + url);
            },
        }).then((mat) => {
            console.log("MaterialX material has been loaded:", mat);
        });
    });
}
```

::: info
O método `Experimental_API.createMaterialXMaterial()` não suporta atualmente o carregamento de múltiplos materiais, ou ficheiros MaterialX com referências .mtlx adicionais.
:::

::::

## Nós e Funcionalidades Suportados

Needle Engine suporta a especificação completa do MaterialX, incluindo os nós OpenPBR, Standard Surface, UsdPreviewSurface e Unlit Surface, e incluindo nós NPR (renderização não-fotorealista) como efeitos fresnel. Definições de nodegraph aninhadas e nós personalizados também são suportados.

Os materiais MaterialX no Needle Engine suportam as seguintes funcionalidades:
-   **Iluminação Baseada em Imagem** (IBL) vinda automaticamente do mapa de ambiente da cena
-   **Probes de Reflexão** afetam objetos que usam materiais MaterialX
-   **Fontes de luz**: Luzes direcionais, pontuais e spot, com um limite atual de 8 luzes por cena
-   **Compressão de texturas e texturas progressivas**. Os materiais MaterialX suportam totalmente as poderosas funcionalidades de compressão de texturas e carregamento progressivo do Needle Engine, permitindo usar texturas grandes. Serão carregadas apenas quando necessário, e apenas na resolução necessária para a vista atual.
-   **Propriedades de material animadas** para cores, floats, vetores. Assim como outros materiais no Needle Engine, qualquer propriedade de material numérica pode ser animada.
-   Todos os modelos de superfície MaterialX, incluindo **OpenPBR**, **Standard Surface**, **UsdPreviewSurface** e **Unlit Surface**.

O Needle MaterialX Exporter aproveita a estrutura baseada em grafos do Shader Graph do Unity para exportação, e converte os nós do Shader Graph em nodedefs e nodegraphs do MaterialX. Suporta as seguintes funcionalidades:
-   **Propriedades do material** como cores, floats, vetores, texturas
-   **Operações** em números, vetores e matrizes
-   **Nós de mistura** como Mix, Add, Multiply e Blend com vários modos de mistura
-   **Texturas** e espaços de cor
-   **Subgrafos** com um ou mais níveis de aninhamento
-   **Cores de vértice** são suportadas
-   **Múltiplos canais UV** são suportados (até 4)
-   **Palavras-chave de Shader** são suportadas e serão exportadas como nós de switch no MaterialX.

## Versão MaterialX Suportada

O Needle Engine atualmente suporta a versão 1.39.4 do MaterialX. Documentos MaterialX com versões anteriores também são suportados e serão automaticamente atualizados para a versão mais recente.

## Limitações do MaterialX Exporter

Nem todas as funcionalidades que o Shader Graph suporta são também suportadas pelo MaterialX. Se tentar exportar um nó não suportado, o exportador registará um erro e interromperá o processo de exportação. Pode então corrigir o problema substituindo o nó não suportado por um suportado, se possível.

-   **Deslocamento de vértice ainda não é suportado**: O MaterialX suporta mapeamento de deslocamento, mas o Needle Engine não o suporta atualmente. Isto significa que quaisquer nós de deslocamento nos seus ficheiros MaterialX serão ignorados.
-   **Sombras em tempo real**: As fontes de luz na sua cena afetarão os materiais MaterialX, mas as sombras em tempo real não são atualmente suportadas.
-   **Lightmaps Cozidos**: Lightmaps cozidos não são atualmente suportados em materiais MaterialX.
-   **Espaço tangente** não é suportado no momento, o que significa que os nós do Shader Graph que especificam "Tangent" como espaço terão um aspeto diferente.
-   **Nós de Código** não são suportados no momento.

::: tip A palavra-chave especial de shader "MATERIALX"
Se tiver shaders complexos com nós não suportados, pode usar a palavra-chave "MATERIALX" para evitar exportá-los. O caminho "On" dos switches de palavra-chave será exportado, e o caminho "Off" será ignorado para exportação. Pode usar isto para manter os shaders com nós personalizados ou funcionalidades não suportadas funcionais, mas ainda assim exportá-los para MaterialX.
:::

::: info Suporte MaterialX integrado no three.js
Embora o three.js tenha algum suporte inicial para MaterialX, usa uma implementação personalizada que não suporta muitas funcionalidades do padrão, levando a uma menor precisão na representação do material. O Needle Engine usa a biblioteca JavaScript oficial do MaterialX, o que significa que os materiais são representados com a mais alta fidelidade possível.

A Needle está a contribuir para o suporte MaterialX integrado do three.js, para que em algum momento possamos oferecer ambas as opções ou mudar para a implementação do three.js assim que esta seja mais abrangente.
:::

Página traduzida automaticamente usando IA