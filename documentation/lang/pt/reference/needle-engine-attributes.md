---
título: Configuração de <needle-engine>
---

O componente web `<needle-engine>` vem com uma boa coleção de atributos incorporados que podem ser usados para modificar a aparência da cena carregada sem a necessidade de adicionar ou editar a cena three.js diretamente. A tabela abaixo mostra uma lista dos mais importantes:

| Atributo | Descrição |
| --- | --- |
| **Carregamento** | |
| `src` | Caminho para um ou vários ficheiros glTF ou glb.<br/>Os tipos suportados são `string`, `string[]` ou um array em string (separados por `,`) |
| `dracoDecoderPath` | URL para o descodificador draco, por exemplo, `./include/draco/` para usar o descodificador Draco local |
| `dracoDecoderType` | Tipo de descodificador draco. As opções são `wasm` ou `js`. Consulte a [documentação three.js](https://threejs.org/docs/#examples/en/loaders/DRACOLoader.setDecoderConfig) |
| `ktx2DecoderPath` | URL para o descodificador KTX2, por exemplo, `./include/ktx2/` para usar o descodificador KTX2 local |
| **Renderização** | |
| `background-color` | opcional, cor hexadecimal a ser usada como cor de fundo. Exemplos: `rgb(255, 200, 100)`, `#dddd00` |
| `background-image` | opcional, URL para uma imagem skybox (imagem de fundo) ou uma string predefinida: `studio`, `blurred-skybox`, `quicklook`, `quicklook-ar` |
| `background-blurriness` | opcional, valor de desfocagem entre 0 (sem desfocagem) e 1 (desfocagem máxima) para a `background-image`. Exemplo: `background-blurriness="0.5"` |
| `environment-image` | opcional, URL para uma imagem de ambiente (luz de ambiente) ou uma string predefinida: `studio`, `blurred-skybox`, `quicklook`, `quicklook-ar` |
| `contactshadows` | opcional, renderizar sombras de contacto |
| `tone-mapping` | opcional, os valores suportados são `none`, `linear`, `neutral`, `agx` |
| `tone-mapping-exposure` | número opcional, por exemplo, aumentar a exposição com `tone-mapping-exposure="1.5"`, requer que `tone-mapping` esteja definido |
| **Interação** | |
| `autoplay` | adicionar ou definir como `true` para reproduzir automaticamente animações, por exemplo, `<needle-engine autoplay` |
| `camera-controls` | adicionar ou definir como `true` para adicionar automaticamente OrbitControls se não forem encontrados controlos de câmara na cena |
| `auto-rotate` | adicionar para ativar a rotação automática (apenas usado com `camera-controls`) |
| **Eventos** | |
| `loadstart` | Nome da função a chamar quando o carregamento começa. Note que os argumentos são `(ctx:Context, evt:Event)`. Pode chamar `evt.preventDefault()` para ocultar a sobreposição de carregamento padrão |
| `progress` | Nome da função a chamar quando o carregamento atualiza. `onProgress(ctx:Context, evt: {detail: {context:Context, name:string, index:number, count:number, totalProgress01:number}) { ... }` |
| `loadfinished` | Nome da função a chamar quando o carregamento termina |
| **Visualização de Carregamento** | *Opções disponíveis para alterar a aparência da visualização de carregamento do Needle Engine. Use `?debugloadingrendering` para facilitar a edição* |
| `loading-background` | **PRO** — Predefinição: `transparent`. Altere a cor de fundo de carregamento (por exemplo, `#dd5500`) |
| `loading-logo-src` | **PRO** — Altere a imagem do logótipo de carregamento (por exemplo, `https://yourdomain.com/logo.png` ou `/logo.png`) |
| `hide-loading-overlay` | **PRO** — Não mostrar a sobreposição de carregamento |
| **Interno** | |
| `hash` | Usado internamente, é anexado aos ficheiros que estão a ser carregados para forçar uma atualização (por exemplo, quando o navegador cacheou um ficheiro glb). Não deve ser editado manualmente. |

**Aviso de atualização**:
- Atributos removidos no Needle Engine 4.5.0 `loading-style`, `loading-background-color`, `loading-text-color`, `primary-color`, `secondary-color`

# Exemplos

```html
<!-- Setting the path to a custom glb to be loaded -->
<needle-engine src="path/to/your.glb"></needle-engine>
```

```html
<!-- Overriding where the draco decoder is located -->
<needle-engine src="path/to/your.glb" dracoDecoderPath="./include/draco/"></needle-engine>
```

Definir imagens de ambiente, reproduzir animação e controlos de câmara automáticos. [Veja ao vivo no stackblitz](https://stackblitz.com/edit/needle-engine-cycle-src?file=index.html)
```html
<needle-engine
      camera-controls
      auto-rotate
      autoplay
      skybox-image="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/industrial_sunset_puresky_1k.hdr"
      environment-image="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/industrial_sunset_puresky_1k.hdr"
      src="https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DamagedHelmet/glTF-Embedded/DamagedHelmet.gltf"
      >
      </needle-engine>
```

Receber um evento quando o contexto needle-engine terminar de carregar:
```html
<needle-engine loadfinished="onLoadFinished"> </needle-engine>
<script>
    function onLoadFinished() {
        console.log("Needle Engine has finished loading");
    }
</script>
```

### Estilo de Carregamento Personalizado (PRO)

Pode facilmente modificar a aparência do Needle Engine definindo os atributos apropriados no componente web `<needle-engine>`. Consulte a tabela acima para detalhes.

![estilo de carregamento personalizado](/imgs/custom-loading-style.webp)
[Veja o código no github](https://github.com/needle-engine/vite-template/blob/loading-style/custom/index.html)

Página traduzida automaticamente por IA