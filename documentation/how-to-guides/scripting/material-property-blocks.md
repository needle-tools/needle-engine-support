---
title: MaterialPropertyBlocks
description: Override material properties per object without breaking batching and instancing
---

# MaterialPropertyBlocks

MaterialPropertyBlocks let you customize material properties on individual objects while sharing the same base material. This maintains excellent performance through batching and instancing while giving you per-object control.

::: tip Available since 4.14.0
MaterialPropertyBlocks were introduced in Needle Engine 4.14.0.
:::

---

## What are MaterialPropertyBlocks?

In traditional rendering, if you want multiple objects to have different colors but use the same material, you'd need to create separate material instances. This breaks batching and hurts performance.

MaterialPropertyBlocks solve this by allowing **per-object property overrides** that are applied dynamically during rendering, without creating new material instances.

**How they work:**
- Override properties are temporarily applied in `onBeforeRender`
- Original values are restored in `onAfterRender`
- Shader defines are managed automatically for correct shader compilation
- Per-object texture transforms are supported

**Performance benefits:**
- ✅ Objects continue to share the same material
- ✅ Batching and instancing remain intact
- ✅ GPU-friendly rendering with minimal overhead
- ✅ No material duplication in memory

---

## Quick Start

### Basic Usage

```typescript
import { Behaviour, serializable, MaterialPropertyBlock } from "@needle-tools/engine";
import { Color, Object3D } from "three";

export class ColorVariation extends Behaviour {

    @serializable(Object3D)
    targetObject?: Object3D;

    awake() {
        if (!this.targetObject) return;

        // Get or create a MaterialPropertyBlock for the object
        const block = MaterialPropertyBlock.get(this.targetObject);

        // Override the color property
        block.setOverride("color", new Color(1, 0, 0)); // Red color
    }
}
```

**Important:** Always use `MaterialPropertyBlock.get(object)` to obtain a property block. The constructor is protected and should not be called directly.

---

## Core API

### Getting a MaterialPropertyBlock

```typescript
// Get or create a property block for an object
const block = MaterialPropertyBlock.get(myMesh);

// Check if an object has overrides
if (MaterialPropertyBlock.hasOverrides(myMesh)) {
    console.log("This object has property overrides");
}
```

### Setting Property Overrides

```typescript
import { Vector2 } from "three";

const block = MaterialPropertyBlock.get(myMesh);

// Override a number property
block.setOverride("roughness", 0.8);

// Override a color
block.setOverride("color", new Color(0xff0000));

// Override a texture
block.setOverride("map", myTexture);

// Override a texture with UV transform
block.setOverride("lightMap", lightmapTexture, {
    offset: new Vector2(0.5, 0.5),
    repeat: new Vector2(2, 2)
});
```

**Supported property types:**
- `number` - Roughness, metalness, opacity, etc.
- `Color` - Base color, emissive color, etc.
- `Texture` - Albedo maps, normal maps, lightmaps, etc.
- `Vector2`, `Vector3`, `Vector4` - Custom shader parameters
- `boolean` - Flags like `transparent`
- `null` - To clear a property

### Getting Override Values

```typescript
// Get a specific override
const roughness = block.getOverride("roughness")?.value;

// Get all overrides
const allOverrides = block.overrides;
for (const override of allOverrides) {
    console.log(`${override.name} = ${override.value}`);
}
```

### Removing Overrides

```typescript
// Remove a specific property override
block.removeOveride("roughness");

// Clear all overrides
block.clearAllOverrides();

// Dispose the entire property block
block.dispose();
```

---

## Advanced Features

### Shader Defines

Set shader defines that affect shader compilation per object:

```typescript
const block = MaterialPropertyBlock.get(myMesh);

// Enable a shader feature for this object only
block.setDefine("USE_LIGHTMAP", 1);
block.setDefine("QUALITY_LEVEL", 2);

// Remove a define
block.clearDefine("USE_LIGHTMAP");

// Get all defines
const defines = block.getDefines();
```

**Use cases:**
- Enable/disable shader features per object
- Quality level variations
- Custom shader behavior per instance

### Type-Safe Overrides

When using TypeScript with specific material types, you get full type safety:

```typescript
import { MeshStandardMaterial, MeshPhysicalMaterial } from "three";

// Type-safe with MeshStandardMaterial
const block = MaterialPropertyBlock.get<MeshStandardMaterial>(myMesh);

// "roughness" is correctly typed as number
block.setOverride("roughness", 0.5);

// For MeshPhysicalMaterial properties
const physicalBlock = MaterialPropertyBlock.get<MeshPhysicalMaterial>(myMesh);
physicalBlock.setOverride("transmission", 0.8);
physicalBlock.setOverride("thickness", 2.0);
```

### Working with Groups

MaterialPropertyBlocks automatically handle Three.js `Group` objects:

```typescript
// Setting overrides on a Group applies to all child meshes
const group = myObject; // a THREE.Group
const block = MaterialPropertyBlock.get(group);
block.setOverride("color", new Color(1, 0, 0));

// All meshes in the group will render with red color
```

---

## Common Use Cases

### 1. Lightmapping

Apply unique lightmap textures to objects sharing the same material:

```typescript
export class LightmapApplier extends Behaviour {

    @serializable(Texture)
    lightmapTexture?: Texture;

    @serializable()
    lightmapIntensity: number = 1.0;

    awake() {
        const block = MaterialPropertyBlock.get(this.gameObject);

        if (this.lightmapTexture) {
            block.setOverride("lightMap", this.lightmapTexture);
            block.setOverride("lightMapIntensity", this.lightmapIntensity);
        }
    }
}
```

### 2. Reflection Probes

Apply different environment maps per object:

```typescript
export class ReflectionProbeApplier extends Behaviour {

    @serializable(Texture)
    envMap?: Texture;

    @serializable()
    envMapIntensity: number = 1.0;

    @serializable()
    envMapRotation: number = 0;

    awake() {
        const block = MaterialPropertyBlock.get(this.gameObject);

        if (this.envMap) {
            block.setOverride("envMap", this.envMap);
            block.setOverride("envMapIntensity", this.envMapIntensity);
            block.setOverride("envMapRotation", this.envMapRotation);
        }
    }
}
```

### 3. See-Through Effect

Create X-ray or see-through effects by dynamically changing transparency:

```typescript
export class SeeThrough extends Behaviour {

    private block?: MaterialPropertyBlock;
    private originalTransparent?: boolean;

    awake() {
        this.block = MaterialPropertyBlock.get(this.gameObject);
    }

    enableSeeThrough() {
        if (!this.block) return;

        // Make the object transparent
        this.block.setOverride("transparent", true);
        this.block.setOverride("opacity", 0.3);
    }

    disableSeeThrough() {
        if (!this.block) return;

        // Restore original state
        this.block.removeOveride("transparent");
        this.block.removeOveride("opacity");
    }
}
```

### 4. Color Variations

Create color variations across instanced objects:

```typescript
export class RandomColorizer extends Behaviour {

    awake() {
        const block = MaterialPropertyBlock.get(this.gameObject);

        // Random color for this instance
        const randomColor = new Color(
            Math.random(),
            Math.random(),
            Math.random()
        );

        block.setOverride("color", randomColor);
    }
}
```

### 5. Dynamic Material Properties

Animate or change material properties at runtime:

```typescript
export class PulsingEmission extends Behaviour {

    @serializable()
    pulseSpeed: number = 1.0;

    private block?: MaterialPropertyBlock;
    private time: number = 0;

    awake() {
        this.block = MaterialPropertyBlock.get(this.gameObject);
    }

    update() {
        if (!this.block) return;

        this.time += this.context.time.deltaTime * this.pulseSpeed;
        const intensity = Math.sin(this.time) * 0.5 + 0.5;

        this.block.setOverride("emissiveIntensity", intensity);
    }
}
```

### 6. Texture Tiling and Offset

Apply different UV transforms per object:

```typescript
export class TextureTransform extends Behaviour {

    @serializable(Vector2)
    offset: Vector2 = new Vector2(0, 0);

    @serializable(Vector2)
    tiling: Vector2 = new Vector2(1, 1);

    awake() {
        const renderer = this.gameObject.getComponent(Renderer);
        if (!renderer?.sharedMaterial) return;

        const block = MaterialPropertyBlock.get(this.gameObject);
        const mainTexture = renderer.sharedMaterial.map;

        if (mainTexture) {
            block.setOverride("map", mainTexture, {
                offset: this.offset,
                repeat: this.tiling
            });
        }
    }
}
```

---

## Transparent and Opaque Rendering

One unique feature of MaterialPropertyBlocks is the ability to render the **same material as both transparent and opaque** on different objects.

```typescript
// Object A - render as opaque
const blockA = MaterialPropertyBlock.get(objectA);
blockA.setOverride("transparent", false);
blockA.setOverride("opacity", 1.0);

// Object B - render as transparent (same material!)
const blockB = MaterialPropertyBlock.get(objectB);
blockB.setOverride("transparent", true);
blockB.setOverride("opacity", 0.5);
```

This is handled automatically by the engine's render list management system.

---

## Performance Considerations

### Best Practices

**✅ Do:**
- Use MaterialPropertyBlocks for per-object variations
- Share base materials across many objects
- Use for dynamic property changes
- Leverage for lightmaps and environment maps

**❌ Don't:**
- Use MaterialPropertyBlocks if all objects sharing a material should have the same property value (just modify the shared material directly instead)

### Memory and Performance

MaterialPropertyBlocks are designed to be lightweight:
- Use WeakMaps for automatic garbage collection
- Minimal overhead per object
- Efficient shader compilation caching
- No material duplication

---

## Internal Usage in Needle Engine

MaterialPropertyBlocks are used internally by several Needle Engine features:

1. **Lightmaps** - Apply unique lightmap textures to objects ([Sample](https://engine.needle.tools/samples/multiple-lightmaps/))
2. **Reflection Probes** - Per-object environment maps ([Sample](https://engine.needle.tools/samples/reflection-probes/))
3. **See-Through Component** - Dynamic transparency effects ([Sample](https://engine.needle.tools/samples/see-through/))

You can examine these components for real-world examples:
- [`NEEDLE_lightmaps`](https://engine.needle.tools/docs/api/classes/src_engine_extensions_NEEDLE_lightmaps.NEEDLE_lightmaps) extension • [Sample](https://engine.needle.tools/samples/multiple-lightmaps/)
- [`ReflectionProbe`](https://engine.needle.tools/docs/api/ReflectionProbe) component • [Sample](https://engine.needle.tools/samples/reflection-probes/)
- [`SeeThrough`](https://engine.needle.tools/docs/api/SeeThrough) component • [Sample](https://engine.needle.tools/samples/see-through/)

---

## Troubleshooting

### Properties not updating

**Problem:** Override values not visible in rendered output.

**Solutions:**
- Ensure you're calling `MaterialPropertyBlock.get()` (not creating instances manually)
- Verify the property name matches the material's property
- Check that the object has a material assigned
- Confirm the object is actually rendering

### Shader compilation issues

**Problem:** Shaders not compiling correctly with defines.

**Solutions:**
- Ensure defines are set before rendering
- Check that define values are correct types
- Clear the shader cache if needed

### Performance degradation

**Problem:** Frame rate drops when using property blocks.

**Solutions:**
- Avoid setting overrides every frame unless necessary
- Use fewer property blocks if possible
- Profile to identify bottlenecks
- Consider static material variations for unchanging properties

---

## TypeScript API Reference

For complete API documentation including all methods, properties, and type definitions, see:

**[MaterialPropertyBlock API Documentation](https://engine.needle.tools/docs/api/MaterialPropertyBlock)**

---

## Examples

### Complete Example: Object Highlighter

```typescript
import { Behaviour, serializable, MaterialPropertyBlock } from "@needle-tools/engine";
import { Color } from "three";

export class ObjectHighlighter extends Behaviour {

    @serializable(Color)
    highlightColor: Color = new Color(1, 1, 0); // Yellow

    @serializable()
    emissiveIntensity: number = 2.0;

    private block?: MaterialPropertyBlock;
    private isHighlighted: boolean = false;

    awake() {
        this.block = MaterialPropertyBlock.get(this.gameObject);
    }

    onPointerEnter() {
        this.highlight(true);
    }

    onPointerExit() {
        this.highlight(false);
    }

    private highlight(enable: boolean) {
        if (!this.block) return;

        if (enable) {
            // Apply highlight
            this.block.setOverride("emissive", this.highlightColor);
            this.block.setOverride("emissiveIntensity", this.emissiveIntensity);
        } else {
            // Remove highlight
            this.block.removeOveride("emissive");
            this.block.removeOveride("emissiveIntensity");
        }

        this.isHighlighted = enable;
    }
}
```

---

## Related Documentation

- [Lightmapping in Blender](/docs/blender/lightmapping) - Baking lightmaps
- [Unity Lightmapping](/docs/tutorials/fundamentals/unity-integration#lightmaps) - Unity lightmap workflow
- [See-Through Component](/docs/reference/components#see-through) - X-ray effect component
- [Custom Shaders](/docs/how-to-guides/export/#custom-shaders) - Creating custom materials
- [Scripting Guide](/docs/how-to-guides/scripting/create-components) - Creating components

---

## Need Help?

- [Discord Community](https://discord.needle.tools) - Ask questions about MaterialPropertyBlocks
- [Forum](https://forum.needle.tools) - Share your use cases and examples
- [GitHub Issues](https://github.com/needle-tools/needle-engine-support/issues) - Report bugs or request features
