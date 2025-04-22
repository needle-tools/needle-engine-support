---
title: Estrutura do Projeto Web
---

# Estrutura do Projeto Needle Engine

### Ficheiros do Projeto Web

| | |
| --- | --- |
| **Needle Engine** | |
| [`needle.config.json`](./reference/needle-config-json.md) | Configuração para compilações e integrações do Needle Engine |
| **Ecossistema** | |
| `package.json` | Configuração do projeto contendo nome, versão, dependências e scripts |
| `tsconfig.json` | Configuração do compilador Typescript |
| `.gitignore` | Ficheiros e pastas a serem ignorados no git |
| `vite.config.js` | Contém a configuração específica do vite.<br/>Também adiciona os plugins vite do Needle Engine. |


### Estrutura de projeto Vite predefinida

O nosso modelo de projeto principal utiliza o super-rápido [vite](https://vitejs.dev/) bundler. O seguinte mostra a estrutura do modelo Vite que criámos e distribuímos (embora seja possível adaptá-lo às suas próprias necessidades).

| | |
| --- | |
| **Pastas** | |
| `assets/` | A pasta de assets contém assets exportados do Unity. Por exemplo, ficheiros ``gltf`` gerados, ficheiros de áudio ou vídeo. Não é recomendado adicionar ficheiros manualmente a ``assets``, pois estes serão apagados ao compilar a distribuição para o projeto.
| `include/` | (opcional) - Se tiver assets personalizados que precise de referenciar/carregar, adicione-os ao diretório include. Ao compilar, este diretório será copiado para a pasta de saída.
| `src/generated/` | O código javascript gerado. Não edite manualmente!
| `src/scripts/` | Os seus scripts / componentes específicos do projeto
| `src/styles/` | Folhas de estilo
| `*` | Pode adicionar quaisquer novas pastas aqui, conforme desejar. Certifique-se de [copiá-las](./reference/needle-config-json.md) para o diretório de saída ao compilar |
| **Ficheiros** | |
| `index.html` | A página de aterragem ou página inicial do seu website
| `vite.config` | A [configuração do vite](https://vitejs.dev/config/). As configurações para compilar a distribuição e alojar o servidor de desenvolvimento são feitas aqui. Geralmente, não é necessário editar estas configurações.
| `src/main.ts` | Incluído a partir de `index.html` e importando `needle-engine`
| `*` | Pode adicionar quaisquer novos ficheiros aqui, conforme desejar. Certifique-se de [copiá-los](./reference/needle-config-json.md) para o diretório de saída ao compilar (a menos que estejam apenas a ser utilizados durante o desenvolvimento) |

O nosso exportador também pode ser utilizado com outras estruturas de projeto, o vite é apenas a nossa ferramenta de bundling frontend preferida devido à sua velocidade. Sinta-se à vontade para configurar o seu projeto JavaScript como desejar.

[Saiba mais na documentação sobre bundling e utilização com outros frameworks](html.md)



---

#### Continuar a Ler

- [Guia de Typescript para Desenvolvedores Unity](./getting-started/for-unity-developers.md)
- [Essenciais do Typescript](./getting-started/typescript-essentials.md)
- [Escrever scripts personalizados](./scripting.md)
- [Everywhere Actions](./everywhere-actions.md)


Página traduzida automaticamente usando IA