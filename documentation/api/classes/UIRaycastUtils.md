[com.needle.engine - v2.39.0-pre](../README.md) / UIRaycastUtils

# Class: UIRaycastUtils

## Table of contents

### Constructors

- [constructor](UIRaycastUtils.md#constructor)

### Methods

- [getObject](UIRaycastUtils.md#getobject)
- [isInteractable](UIRaycastUtils.md#isinteractable)

## Constructors

### constructor

• **new UIRaycastUtils**()

## Methods

### getObject

▸ `Static` **getObject**(`obj`): `Object3D`<`Event`\>

returns the real object when dealing with shadow UI

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `Object3D`<`Event`\> |

#### Returns

`Object3D`<`Event`\>

___

### isInteractable

▸ `Static` **isInteractable**(`obj`, `out?`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `Object3D`<`Event`\> |
| `out?` | `Object` |
| `out.canvasGroup?` | `ICanvasGroup` |
| `out.graphic?` | `IGraphic` |

#### Returns

`boolean`
