---
title: MaterialX
---

## MaterialX in Needle Engine

MaterialX is a powerful standard for describing materials and shaders in a graph based way, independent of the rendering engine. It allows you to define complex materials, with multiple surface layers and realistic lighting.  

It's widely used across film, VFX and e-commerce, and is supported by many professional authoring tools such as Autodesk Maya and 3ds Max, Houdini, V-Ray, and Omniverse. 

![MaterialX Demo](https://cloud.needle.tools/-/media/Xc99R6zbaD-kpoTw1cMRKA.gif)

::: tip Learn more
You can learn more about MaterialX on the [MaterialX website](https://www.materialx.org/).
:::

Materials made with Unity's [**Shader Graph**](https://docs.unity3d.com/Packages/com.unity.shadergraph@17.3/manual/index.html) can be exported to MaterialX files automatically through the **Needle MaterialX Exporter**, which is part of our Unity integration package.

This allows you to create complex, lit materials in Unity, and they're automatically exported along with your scene. MaterialX export extends our existing Unlit shader export, which is less portable due to the use of WebGL2 shaders. With MaterialX, you're ready for WebGPU and future rendering technologies, and can achieve high fidelity materials in your web projects.

The MaterialX support in Needle Engine uses the official [MaterialX JavaScript library](https://github.com/materialx/MaterialX), which means that materials are represented at the highest fidelity possible. This allows you to use any MaterialX file.

::: info Shader Graph to MaterialX requires a **Pro**, **Edu** or **Enterprise** plan.
The MaterialX Exporter is available for users on the Pro, Edu and Enterprise plans.
[See plans and pricing.](https://needle.tools/pricing)
:::


## Usecases

MaterialX is a great choice if you 
- are using **Graph-based materials** for your projects for artistic control and flexibility.
- need **rich and complex surface features** such as procedural textures, detail maps, or layered materials.
- have **existing MaterialX materials** that you want to keep throughout your studio pipeline.
- want to ensure **consistency and compatibility** for your renderings across different rendering engines.

## Enable MaterialX support in your project

To enable MaterialX support in your Needle Engine project, you need to add the `@needle-tools/materialx` package to your project.

::: tabs

@tab Unity

1. Select the Needle Engine component in your scene.

2. Find the "NpmDef Dependencies" section in the Inspector, and add a new dependency by increasing the "Size" number (e.g. from 0 to 1).

3. Click the Object Picker symbol, enable Package Visibility with the eye symbol, and select the `Needle MaterialX` package from the list.

   ![Find and add the MaterialX package dependency in Unity.](/materialx/add-materialx-package-dependency.jpeg)
   _Find and add the MaterialX package dependency in Unity._

You are now ready to use MaterialX in your web project.

@tab Other Needle integrations

1. Find and open your web project in a code editor (e.g. VS Code).  
   [Learn how to open your web project.](./project-structure.html#opening-the-web-project-in-a-code-editor)
2. Install the Needle MaterialX package from the NPM registry in your web project.

   ```bash
   npm install @needle-tools/materialx
   ```

   This will add the MaterialX package to your project.

3. If you're using any of our Vite-based templates, you don't need to do anything else. The MaterialX package will be automatically included in your project.

    ::: tip If you're unsure, you're probably using one of our Vite-based templates!
    :::

4. If you're not using the Needle Vite plugins, import and register MaterialX in your main entry file, for example in `main.ts`:

   ```ts
   import { useNeedleMaterialX } from "@needle-tools/materialx";
   useNeedleMaterialX();
   ```

You are now ready to use MaterialX in your web project.

@tab three.js

You can use our MaterialX package in any three.js project, even if you're not using Needle Engine.

1. Register our `MaterialX` plugin with your `GLTFLoader`:

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

2. Load GLB files that contain the `NEEDLE_materials_mtlx` extension. The plugin will automatically load and apply the MaterialX materials to the objects that are using them.

3. You can enable preloading of the MaterialX WebAssembly module by calling `useNeedleMaterialX(gltfLoader, { preload: true })`. This will load the MaterialX WebAssembly module in advance, so that it is ready when you load a GLB file with MaterialX materials.

You can find a full example of how to use MaterialX in a three.js project on StackBlitz: [MaterialX in three.js](https://stackblitz.com/edit/needle-materialx-example?file=main.js).

::: 
## Exporting materials with MaterialX support

1. Create materials with Unity's Shader Graph.

   ![Example of a complex Shader Graph in Unity.](/materialx/shadergraph-example.webp)
   _Example of a complex Shader Graph in Unity._

2. Select an object that has a Shader Graph-based material in your scene, or select the shader asset in the Project View.

3. In the Material properties, find the section "Needle Engine – Custom Shader Settings", and select "MaterialX" as the Shader Export Type.

    ![Enabling the MaterialX export type in the Shader Graph material properties.](/materialx/enable-asset-label-from-material.jpeg)
    _Enabling the MaterialX export type in the Shader Graph material properties._

3. When you export your scene, all materials using shaders with the "MaterialX" export type will be embedded alongside your 3D content, and loaded at runtime.

## Using MaterialX files created externally

The Needle MaterialX package contains experimental support for loading MaterialX files directly. Textures can be resolved via a callback function, and materials are returned as three.js `ShaderMaterial`.

You can find examples for working with the Needle MaterialX package [in our MaterialX collection on StackBlitz](
https://stackblitz.com/@marwie/collections/materialx).

:::: tabs
@tab From code

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
        const materialNameOrIndex = 0;
        Experimental_API.createMaterialXMaterial(mtlx, materialNameOrIndex, {
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
The `Experimental_API.createMaterialXMaterial()` method currently doesn't support loading multiple materials, or MaterialX files with additional .mtlx references.
:::

::::

## Supported Nodes and Features

Needle Engine supports the full MaterialX specification, including OpenPBR, Standard Surface, UsdPreviewSurface and Unlit Surface nodes, and including NPR (non-photorealistic rendering) nodes like fresnel effects. Nested nodegraph definitions and custom nodes are also supported.

MaterialX materials in Needle Engine support the following features:
- **Image-Based Lighting** (IBL) automatically coming from the scene's environment map
- **Reflection Probes** affect objects using MaterialX materials
- **Light sources**: Directional, point, and spot lights, with a current limit of 8 lights per scene
- **Texture compression and progressive textures**. MaterialX materials fully support the powerful texture compression and progressive loading features of Needle Engine, allowing you to use large textures. They will be only loaded when needed, and only in the resolution needed for the current view. 
- **Animated material properties** for colors, floats, vectors. Same as other materials in Needle Engine, any numeric material property can be animated.
- All MaterialX surface models, including **OpenPBR**, **Standard Surface**, **UsdPreviewSurface**, and **Unlit Surface**.

The Needle MaterialX Exporter leverages the graph-based structure of Unity's Shader Graph for export, and converts Shader Graph nodes to MaterialX nodedefs and nodegraphs. It has support for the following features:
- **Material properties** like colors, floats, vectors, textures
- **Operations** on numbers, vectors, and matrices
- **Blend nodes** like Mix, Add, Multiply, and Blend with various blend modes
- **Textures** and color spaces
- **Subgraphs** with one or more levels of nesting
- **Vertex colors** are supported
- **Multiple UV channels** are supported (up to 4)
- **Shader Keywords** are supported and will be exported as switch nodes in MaterialX.

## Supported MaterialX Version

Needle Engine currently supports MaterialX version 1.39.4. MaterialX documents with earlier versions are also supported and will be automatically upgraded to the latest version.

## Limitations of the MaterialX Exporter

Not all features that Shader Graph supports are also supported by MaterialX. If you attempt to export an unsupported node, the exporter will log an error and stop the export process. You can then fix the issue by replacing the unsupported node with a supported one, if possible.

- **Vertex displacement is not yet supported**: MaterialX supports displacement mapping, but Needle Engine does not currently support it. This means that any displacement nodes in your MaterialX files will be ignored.
- **Realtime shadows**: Light sources in your scene will affect MaterialX materials, but realtime shadows are currently not supported.
- **Baked Lightmaps**: Baked lightmaps are currently not supported in MaterialX materials.
- **Tangent space** is not supported at the moment, which means that Shader Graph nodes specifying "Tangent" as space will look different.
- **Code Nodes** are not supported at the moment.

::: tip The special "MATERIALX" shader keyword
If you have complex shaders with unsupported nodes, you can use the "MATERIALX" keyword to prevent exporting them. The "On" path of keyword switches will be exported, and the "Off" path will be ignored for export. You can use this to keep shaders with custom nodes or unsupported features functional, but still export them to MaterialX.
:::

::: info Built-in MaterialX support in three.js
While three.js has some initial support for MaterialX, it's using a custom implementation that doesn't support many features of the standard, leading to lower accuracy in material representation. Needle Engine uses the official MaterialX JavaScript library, which means that materials are represented at the highest fidelity possible.

Needle is contributing to the built-in three.js MaterialX support, so that at some point we can offer both options or switch to the three.js implementation once it's more comprehensive.
:::
