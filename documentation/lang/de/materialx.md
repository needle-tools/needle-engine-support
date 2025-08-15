---
title: MaterialX
---

## MaterialX in Needle Engine

MaterialX ist ein leistungsstarker Standard zur graphbasierten Beschreibung von Materialien und Shadern, unabhängig von der Rendering-Engine. Er ermöglicht die Definition komplexer Materialien mit mehreren Oberflächenschichten und realistischer Beleuchtung.

Es wird häufig in den Bereichen Film, VFX und E-Commerce eingesetzt und von vielen professionellen Authoring-Tools wie Autodesk Maya und 3ds Max, Houdini, V-Ray und Omniverse unterstützt.

::: tip Weitere Informationen
Weitere Informationen zu MaterialX finden Sie auf der [MaterialX-Website](https://www.materialx.org/).
:::

Materialien, die mit Unitys [**Shader Graph**](https://docs.unity3d.com/Packages/com.unity.shadergraph@17.3/manual/index.html) erstellt wurden, können automatisch über den **Needle MaterialX Exporter**, der Teil unseres Unity-Integrationspakets ist, in MaterialX-Dateien exportiert werden.

Dadurch können Sie in Unity komplexe, beleuchtete Materialien erstellen, die zusammen mit Ihrer Szene automatisch exportiert werden. Der MaterialX-Export erweitert unseren bestehenden Unlit-Shader-Export, der aufgrund der Verwendung von WebGL2-Shadern weniger portabel ist. Mit MaterialX sind Sie bereit für WebGPU und zukünftige Rendering-Technologien und können hochauflösende Materialien in Ihren Webprojekten erzielen.

Die MaterialX-Unterstützung in Needle Engine verwendet die offizielle [MaterialX JavaScript library](https://github.com/materialx/MaterialX), was bedeutet, dass Materialien mit der höchstmöglichen Wiedergabetreue dargestellt werden. Dies ermöglicht die Verwendung jeder MaterialX-Datei.

::: info Shader Graph zu MaterialX erfordert einen **Pro**, **Edu** oder **Enterprise** Plan.
Der MaterialX Exporter ist für Nutzer mit Pro-, Edu- und Enterprise-Plänen verfügbar.
[Siehe Pläne und Preise.](https://needle.tools/pricing)
:::

## Anwendungsfälle

MaterialX ist eine gute Wahl, wenn Sie
- **graphbasierte Materialien** für Ihre Projekte verwenden, um künstlerische Kontrolle und Flexibilität zu erhalten.
- **reiche und komplexe Oberflächenmerkmale** wie prozedurale Texturen, Detailkarten oder geschichtete Materialien benötigen.
- **bestehende MaterialX-Materialien** haben, die Sie in Ihrer gesamten Studiopipeline beibehalten möchten.
- **Konsistenz und Kompatibilität** für Ihre Renderings über verschiedene Rendering-Engines hinweg gewährleisten möchten.

## MaterialX-Unterstützung in Ihrem Projekt aktivieren

Um die MaterialX-Unterstützung in Ihrem Needle Engine-Projekt zu aktivieren, müssen Sie das Paket `@needle-tools/materialx` zu Ihrem Projekt hinzufügen.

::: tabs

@tab Unity

1. Wählen Sie die Needle Engine-Komponente in Ihrer Szene aus.

2. Suchen Sie den Abschnitt "NpmDef Dependencies" im Inspector und fügen Sie eine neue Abhängigkeit hinzu, indem Sie die Zahl "Size" erhöhen (z.B. von 0 auf 1).

3. Klicken Sie auf das Object Picker-Symbol, aktivieren Sie die Paket-Sichtbarkeit mit dem Augensymbol und wählen Sie das Paket `Needle MaterialX` aus der Liste aus.

   ![MaterialX-Paketabhängigkeit in Unity finden und hinzufügen.](/materialx/add-materialx-package-dependency.jpeg)
   _MaterialX-Paketabhängigkeit in Unity finden und hinzufügen._

Sie können MaterialX nun in Ihrem Webprojekt verwenden.

@tab Andere Needle-Integrationen

1. Suchen und öffnen Sie Ihr Webprojekt in einem Code-Editor (z.B. VS Code).
   [Erfahren Sie, wie Sie Ihr Webprojekt öffnen.](./project-structure.html#opening-the-web-project-in-a-code-editor)
2. Installieren Sie das Needle MaterialX-Paket aus dem NPM-Registry in Ihrem Webprojekt.

   ```bash
   npm install @needle-tools/materialx
   ```

   Dies wird das MaterialX-Paket zu Ihrem Projekt hinzufügen.

3. Wenn Sie eine unserer Vite-basierten Vorlagen verwenden, müssen Sie nichts weiter tun. Das MaterialX-Paket wird automatisch in Ihr Projekt integriert.

    ::: tip Wenn Sie sich unsicher sind, verwenden Sie wahrscheinlich eine unserer Vite-basierten Vorlagen!
    :::

4. Wenn Sie die Needle Vite-Plugins nicht verwenden, importieren und registrieren Sie MaterialX in Ihrer Haupt-Einstiegsdatei, z.B. in `main.ts`:

   ```ts
   import { useNeedleMaterialX } from "@needle-tools/materialx";
   useNeedleMaterialX();
   ```

Sie können MaterialX nun in Ihrem Webprojekt verwenden.

@tab three.js

Sie können unser MaterialX-Paket in jedem three.js-Projekt verwenden, auch wenn Sie Needle Engine nicht nutzen.

1. Registrieren Sie unser `MaterialX`-Plugin mit Ihrem `GLTFLoader`:

    ```ts
    import { useNeedleMaterialX } from "@needle-tools/materialx";
    import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

    const gltfLoader = new GLTFLoader();

    // ... register other plugins such as DRACOLoader, KTX2Loader, etc.
    useNeedleMaterialX(gltfLoader);

    // ... load a file that contains MaterialX materials
    gltfLoader.load("https://cloud.needle.tools/-/assets/Z23hmXB2qfHiF-2qfHiF/file", (gltf) => {
        scene.add(gltf.scene);
    });
    ```

2. Laden Sie GLB-Dateien, die die Erweiterung `NEEDLE_materials_mtlx` enthalten. Das Plugin lädt und wendet die MaterialX-Materialien automatisch auf die Objekte an, die sie verwenden.

3. Sie können das Vorladen des MaterialX WebAssembly-Moduls aktivieren, indem Sie `useNeedleMaterialX(gltfLoader, { preload: true })` aufrufen. Dadurch wird das MaterialX WebAssembly-Modul im Voraus geladen, sodass es bereit ist, wenn Sie eine GLB-Datei mit MaterialX-Materialien laden.

Ein vollständiges Beispiel zur Verwendung von MaterialX in einem three.js-Projekt finden Sie auf StackBlitz: [MaterialX in three.js](https://stackblitz.com/edit/needle-materialx-example?file=main.js).

:::
## Materialien mit MaterialX-Unterstützung exportieren

1. Erstellen Sie Materialien mit Unitys Shader Graph.

   ![Beispiel eines komplexen Shader Graph in Unity.](/materialx/shadergraph-example.webp)
   _Beispiel eines komplexen Shader Graph in Unity._

2. Wählen Sie ein Objekt mit einem Shader Graph-basierten Material in Ihrer Szene oder wählen Sie das Shader-Asset in der Projektansicht aus.

3. Suchen Sie in den Materialeigenschaften den Abschnitt "Needle Engine – Custom Shader Settings" und wählen Sie "MaterialX" als Shader Export Type aus.

    ![Aktivieren des MaterialX-Exporttyps in den Shader Graph-Materialeigenschaften.](/materialx/enable-asset-label-from-material.jpeg)
    _Aktivieren des MaterialX-Exporttyps in den Shader Graph-Materialeigenschaften._

3. Wenn Sie Ihre Szene exportieren, werden alle Materialien, die Shader mit dem Exporttyp "MaterialX" verwenden, zusammen mit Ihrem 3D-Inhalt eingebettet und zur Laufzeit geladen.

## Externe MaterialX-Dateien verwenden

Das Needle MaterialX-Paket enthält experimentelle Unterstützung für das direkte Laden von MaterialX-Dateien. Texturen können über eine Callback-Funktion aufgelöst werden, und Materialien werden als three.js `ShaderMaterial` zurückgegeben.

Beispiele für die Arbeit mit dem Needle MaterialX-Paket finden Sie [in unserer MaterialX-Sammlung auf StackBlitz](https://stackblitz.com/@marwie/collections/materialx).

:::: tabs
@tab Aus Code

```ts
import { TextureLoader } from 'three';
import { Experimental_API } from '@needle-tools/materialx';

// Load a MaterialX file and its referenced textures from a URL
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
Die Methode `Experimental_API.createMaterialXMaterial()` unterstützt derzeit nicht das Laden mehrerer Materialien oder MaterialX-Dateien mit zusätzlichen .mtlx-Referenzen.
:::

::::

## Unterstützte Knoten und Funktionen

Needle Engine unterstützt die vollständige MaterialX-Spezifikation, einschließlich OpenPBR-, Standard Surface-, UsdPreviewSurface- und Unlit Surface-Knoten, sowie NPR (nicht-fotorealistisches Rendering)-Knoten wie Fresneleffekte. Verschachtelte Nodegraph-Definitionen und benutzerdefinierte Knoten werden ebenfalls unterstützt.

MaterialX-Materialien in Needle Engine unterstützen die folgenden Funktionen:
- **Image-Based Lighting** (IBL) automatisch aus der Umgebungsmap der Szene
- **Reflection Probes** beeinflussen Objekte, die MaterialX-Materialien verwenden
- **Lichtquellen**: Direktionale, Punkt- und Spotlichter, mit einer aktuellen Begrenzung von 8 Lichtern pro Szene
- **Texturkomprimierung und progressive Texturen**. MaterialX-Materialien unterstützen vollständig die leistungsstarken Texturkomprimierungs- und progressiven Ladefunktionen von Needle Engine, sodass Sie große Texturen verwenden können. Diese werden nur bei Bedarf und nur in der für die aktuelle Ansicht benötigten Auflösung geladen.
- **Animierte Materialeigenschaften** für Farben, Floats, Vektoren. Wie bei anderen Materialien in Needle Engine kann jede numerische Materialeigenschaft animiert werden.
- Alle MaterialX-Oberflächenmodelle, einschließlich **OpenPBR**, **Standard Surface**, **UsdPreviewSurface** und **Unlit Surface**.

Der Needle MaterialX Exporter nutzt die graphbasierte Struktur von Unitys Shader Graph für den Export und konvertiert Shader Graph-Knoten in MaterialX nodedefs und nodegraphs. Er unterstützt die folgenden Funktionen:
- **Materialeigenschaften** wie Farben, Floats, Vektoren, Texturen
- **Operationen** auf Zahlen, Vektoren und Matrizen
- **Blend-Knoten** wie Mix, Add, Multiply und Blend mit verschiedenen Mischmodi
- **Texturen** und Farbräume
- **Untergraphen** mit einer oder mehreren Verschachtelungsebenen
- **Vertex-Farben** werden unterstützt
- **Mehrere UV-Kanäle** werden unterstützt (bis zu 4)
- **Shader Keywords** werden unterstützt und als Switch-Knoten in MaterialX exportiert.

## Unterstützte MaterialX-Version

Needle Engine unterstützt derzeit MaterialX Version 1.39.4. MaterialX-Dokumente mit früheren Versionen werden ebenfalls unterstützt und automatisch auf die neueste Version aktualisiert.

## Einschränkungen des MaterialX Exporters

Nicht alle Funktionen, die Shader Graph unterstützt, werden auch von MaterialX unterstützt. Wenn Sie versuchen, einen nicht unterstützten Knoten zu exportieren, protokolliert der Exporter einen Fehler und stoppt den Exportvorgang. Sie können das Problem dann beheben, indem Sie den nicht unterstützten Knoten, falls möglich, durch einen unterstützten ersetzen.

- **Vertex-Displacement wird noch nicht unterstützt**: MaterialX unterstützt Displacement Mapping, aber Needle Engine unterstützt es derzeit nicht. Das bedeutet, dass alle Displacement-Knoten in Ihren MaterialX-Dateien ignoriert werden.
- **Echtzeit-Schatten**: Lichtquellen in Ihrer Szene beeinflussen MaterialX-Materialien, aber Echtzeit-Schatten werden derzeit nicht unterstützt.
- **Baked Lightmaps**: Baked Lightmaps werden derzeit in MaterialX-Materialien nicht unterstützt.
- **Tangent Space** wird derzeit nicht unterstützt, was bedeutet, dass Shader Graph-Knoten, die "Tangent" als Raum angeben, anders aussehen werden.
- **Code Nodes** werden derzeit nicht unterstützt.

::: tip Das spezielle "MATERIALX" Shader-Schlüsselwort
Wenn Sie komplexe Shader mit nicht unterstützten Knoten haben, können Sie das Schlüsselwort "MATERIALX" verwenden, um deren Export zu verhindern. Der "On"-Pfad von Keyword-Switches wird exportiert, und der "Off"-Pfad wird für den Export ignoriert. Dies können Sie nutzen, um Shader mit benutzerdefinierten Knoten oder nicht unterstützten Funktionen funktionsfähig zu halten, sie aber dennoch nach MaterialX zu exportieren.
:::

::: info Eingebauter MaterialX-Support in three.js
Obwohl three.js eine anfängliche Unterstützung für MaterialX bietet, verwendet es eine benutzerdefinierte Implementierung, die viele Funktionen des Standards nicht unterstützt, was zu einer geringeren Genauigkeit in der Materialdarstellung führt. Needle Engine verwendet die offizielle MaterialX JavaScript library, was bedeutet, dass Materialien mit der höchstmöglichen Wiedergabetreue dargestellt werden.

Needle trägt zur integrierten three.js MaterialX-Unterstützung bei, so dass wir irgendwann beide Optionen anbieten oder zur three.js-Implementierung wechseln können, sobald diese umfassender ist.
:::

Seite automatisch mit KI übersetzt