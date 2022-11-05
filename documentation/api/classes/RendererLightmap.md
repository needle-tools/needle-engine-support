[com.needle.engine - v2.39.0-pre](../README.md) / RendererLightmap

# Class: RendererLightmap

## Table of contents

### Constructors

- [constructor](RendererLightmap.md#constructor)

### Properties

- [lightmapIndex](RendererLightmap.md#lightmapindex)
- [lightmapScaleOffset](RendererLightmap.md#lightmapscaleoffset)

### Accessors

- [lightmap](RendererLightmap.md#lightmap)

### Methods

- [bindOnBeforeRender](RendererLightmap.md#bindonbeforerender)
- [init](RendererLightmap.md#init)
- [onBeforeRenderThree](RendererLightmap.md#onbeforerenderthree)

## Constructors

### constructor

• **new RendererLightmap**(`gameObject`, `context`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `gameObject` | [`GameObject`](GameObject.md) |
| `context` | `Context` |

## Properties

### lightmapIndex

• **lightmapIndex**: `number` = `-1`

___

### lightmapScaleOffset

• **lightmapScaleOffset**: `Vector4`

## Accessors

### lightmap

• `get` **lightmap**(): ``null`` \| `Texture`

#### Returns

``null`` \| `Texture`

• `set` **lightmap**(`tex`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tex` | ``null`` \| `Texture` |

#### Returns

`void`

## Methods

### bindOnBeforeRender

▸ **bindOnBeforeRender**(): `void`

#### Returns

`void`

___

### init

▸ **init**(`lightmapIndex`, `lightmapScaleOffset`, `lightmapTexture`, `debug?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `lightmapIndex` | `number` | `undefined` |
| `lightmapScaleOffset` | `Vector4` | `undefined` |
| `lightmapTexture` | `Texture` | `undefined` |
| `debug` | `boolean` | `false` |

#### Returns

`void`

___

### onBeforeRenderThree

▸ **onBeforeRenderThree**(`material`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `material` | `Material` |

#### Returns

`void`
