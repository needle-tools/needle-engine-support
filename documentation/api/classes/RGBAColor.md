[com.needle.engine - v2.39.0-pre](../README.md) / RGBAColor

# Class: RGBAColor

## Hierarchy

- `Color`

  ↳ **`RGBAColor`**

## Table of contents

### Constructors

- [constructor](RGBAColor.md#constructor)

### Properties

- [alpha](RGBAColor.md#alpha)

### Accessors

- [isRGBAColor](RGBAColor.md#isrgbacolor)

### Methods

- [clone](RGBAColor.md#clone)
- [copy](RGBAColor.md#copy)
- [lerp](RGBAColor.md#lerp)
- [multiply](RGBAColor.md#multiply)

## Constructors

### constructor

• **new RGBAColor**(`r`, `g`, `b`, `a`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `r` | `number` |
| `g` | `number` |
| `b` | `number` |
| `a` | `number` |

#### Overrides

Color.constructor

## Properties

### alpha

• **alpha**: `number` = `1`

## Accessors

### isRGBAColor

• `get` **isRGBAColor**(): `boolean`

#### Returns

`boolean`

## Methods

### clone

▸ **clone**(): [`RGBAColor`](RGBAColor.md)

#### Returns

[`RGBAColor`](RGBAColor.md)

#### Overrides

Color.clone

___

### copy

▸ **copy**(`col`): [`RGBAColor`](RGBAColor.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `col` | `Color` \| [`RGBAColor`](RGBAColor.md) |

#### Returns

[`RGBAColor`](RGBAColor.md)

#### Overrides

Color.copy

___

### lerp

▸ **lerp**(`color`, `alpha`): [`RGBAColor`](RGBAColor.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `color` | `Color` |
| `alpha` | `number` |

#### Returns

[`RGBAColor`](RGBAColor.md)

#### Overrides

Color.lerp

___

### multiply

▸ **multiply**(`color`): [`RGBAColor`](RGBAColor.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `color` | `Color` |

#### Returns

[`RGBAColor`](RGBAColor.md)

#### Overrides

Color.multiply
