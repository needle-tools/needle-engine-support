---
title: Como Depurar
---

## Recursos úteis para trabalhar com glTF

Para inspecionar ficheiros glTF ou glb online:
- [gltf.report](https://gltf.report/) - baseado em three.js
- [modelviewer.dev/editor](https://modelviewer.dev/editor) - baseado em three.js
- [Khronos glTF Sample Viewer](https://github.khronos.org/glTF-Sample-Viewer-Release/)
- [Babylon Sandbox](https://sandbox.babylonjs.com/)
- [glTF Validator](https://github.khronos.org/glTF-Validator/)

Para inspecioná-los localmente:
- use a [glTF Shell Extension para Windows](https://apps.microsoft.com/store/detail/gltf-shell-extensions/9NPGVJ9N57MV?hl=en-us&gl=US) para converter entre glTF e glb
- use a [glTF Tools VS Code Extension](https://marketplace.visualstudio.com/items?itemName=cesium.gltf-vscode) para ver erros de validação e pré-visualizações no motor localmente


## Parâmetros URL integrados

As sinalizações de depuração podem ser anexadas como parâmetros de consulta URL.
Use ``?help`` para obter uma lista de TODOS os parâmetros disponíveis.

Aqui estão alguns dos mais usados:

- ``help`` imprime todos os parâmetros url disponíveis na consola
- ``console`` abre uma consola de desenvolvimento no ecrã, útil para depuração móvel
- ``printGltf`` regista os ficheiros gltf carregados na consola
- ``stats`` mostra o módulo FPS e regista estatísticas do threejs renderer a cada poucos segundos
- ``showcolliders`` visualiza colisores de física
- ``gizmos`` ativa a renderização de gizmos (por exemplo, ao usar componentes BoxCollider ou AxesHelper)
- e muito mais: por favor, use ``help`` para vê-los todos


## Métodos de Depuração

O Needle Engine também tem alguns métodos de depuração muito poderosos e úteis que fazem parte da classe estática `Gizmos`. Veja a [documentação de scripting](./scripting.md#gizmos) para mais informações.


## Testes Locais de compilações de lançamento
- Primeiro, instale http-server: `npm install -g http-server`
- faça uma compilação (desenvolvimento ou produção)
- abra o diretório *dist* com uma ferramenta de linha de comando
- execute `http-server -g` | *`-g` ativa o suporte a gzip*
- opcional: se quiser testar WebXR, gere um [certificado SSL autoassinado](https://stackoverflow.com/a/35231213), depois execute `http-server -g -S` para ativar https (necessário para WebXR).



## VSCode

Pode anexar o VSCode ao servidor local em execução para definir breakpoints e depurar o seu código. Pode ler mais sobre [depuração com VSCode](https://code.visualstudio.com/docs/editor/debugging) aqui.

Crie um ficheiro launch.json em `.vscode/launch.json` no seu projeto web com o seguinte conteúdo:
```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "chrome",
            "request": "launch",
            "name": "Attach Chrome",
            "url": "https://localhost:3000",
            "webRoot": "${workspaceFolder}"
        }
    ]
}
```

Se alterou a porta em que o seu servidor inicia, certifique-se de atualizar o campo `url` correspondentemente.
Pode então iniciar o seu servidor local a partir do VSCode:

![](/debugging/vscode-start-debugging.webp)

## Móvel

### Depuração Android

Para depuração **Android**, pode anexar as Ferramentas de Desenvolvedor Chrome ao seu dispositivo e ver registos diretamente do seu PC. Tem que mudar o seu dispositivo para o modo de desenvolvimento e conectá-lo via USB.

Veja a documentação oficial do chrome [aqui](https://developer.chrome.com/docs/devtools/remote-debugging/)
- Certifique-se de que o [Modo de Desenvolvedor](https://developer.android.com/studio/debug/dev-options) está ativado no seu telemóvel
- Ligue o seu telemóvel ao seu computador via USB
- Abra este URL no seu navegador ``chrome://inspect/#devices``
- No seu dispositivo móvel permita a ligação USB ao seu computador
- No seu computador, no chrome, deverá ver uma lista de separadores abertos após algum tempo (em ``chrome://inspect/#devices``)
- Clique em ``Inspect`` no separador que deseja depurar

### Depuração iOS

Para uma depuração iOS fácil, adicione o parâmetro URL ``?console`` para obter uma consola JavaScript útil no ecrã.

Se tiver um Mac, também pode anexar ao Safari (semelhante ao fluxo de trabalho Android acima).

A utilização e depuração de WebXR no iOS requer o uso de um navegador de terceiros: [Mozilla WebXR Viewer](https://labs.mozilla.org/projects/webxr-viewer/).

### Depuração Quest

O Quest é apenas um dispositivo Android - veja a secção [Depuração Android](#android-debugging) para os passos.


Página traduzida automaticamente usando IA