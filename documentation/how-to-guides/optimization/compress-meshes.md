---
title: "Mesh Compression: Draco & Meshopt"
description: Reduce mesh file size with Draco or Meshopt compression in Needle Engine production builds. Compare formats, configure per-mesh settings, and enable mesh simplification.
---

# Mesh Compression

:::tip Optimization & Compression
This guide is part of [Optimization & Compression](/docs/how-to-guides/optimization/). See also: [Texture Compression](/docs/how-to-guides/optimization/compress-textures), [Progressive Loading & LODs](/docs/how-to-guides/optimization/progressive-loading-and-lods), [Build Settings](/docs/how-to-guides/optimization/production-build-settings).
:::

Production builds compress meshes to reduce file size and improve loading times.

---

## Choosing Between Draco and Meshopt

| Format | Draco | Meshopt |
| --- | --- | --- |
| **GPU Memory Usage** | Medium | Low |
| **File Size** | Lowest | Low |
| **Animation compression** | No | Yes |

**Quick Guide:**
- **Static meshes**: Use Draco for smallest file size
- **Animated meshes**: Use Meshopt (supports animation compression)

By default, production builds use Draco compression. Use the `MeshCompression` component to choose between Draco and Meshopt per exported glTF.

---

## Configuring Mesh Compression

:::details Unity: Mesh compression settings
Use the Compression & LOD Settings component to select compression type:

![Unity Mesh Compression Options](/imgs/unity-mesh-compression-options.jpg)

- **Current scene**: Add component anywhere in your root scene
- **Prefab or NestedGltf**: Add to a `GltfObject` or the prefab referenced by your components
- **Referenced scene**: Add to the referenced scene that is exported
:::

---

## Mesh Simplification

Reduce vertex count automatically in production builds to improve performance.

:::details Unity: Mesh simplification to reduce vertex count
Use the Compression & LOD Settings component to configure mesh simplification for production builds. Append `?wireframe` to your URL to preview meshes in the browser.

![Unity Mesh Compression Options](/imgs/unity-mesh-compression-options.jpg)
:::

---

## Related Documentation

- **[Texture Compression](/docs/how-to-guides/optimization/compress-textures)** — KTX2, ETC1S, UASTC & WebP
- **[Progressive Loading & LODs](/docs/how-to-guides/optimization/progressive-loading-and-lods)** — Automatic mesh LODs and texture LODs
- **[Production Build Settings](/docs/how-to-guides/optimization/production-build-settings)** — Build types and build window
