[com.needle.engine - v2.39.0-pre](../README.md) / WebAR

# Class: WebAR

## Table of contents

### Constructors

- [constructor](WebAR.md#constructor)

### Accessors

- [webxr](WebAR.md#webxr)

### Methods

- [getAROverlayContainer](WebAR.md#getaroverlaycontainer)
- [onBegin](WebAR.md#onbegin)
- [onEnd](WebAR.md#onend)
- [onUpdate](WebAR.md#onupdate)
- [setReticleActive](WebAR.md#setreticleactive)

## Constructors

### constructor

• **new WebAR**(`webxr`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `webxr` | [`WebXR`](WebXR.md) |

## Accessors

### webxr

• `get` **webxr**(): [`WebXR`](WebXR.md)

#### Returns

[`WebXR`](WebXR.md)

## Methods

### getAROverlayContainer

▸ **getAROverlayContainer**(): ``null`` \| `HTMLElement`

#### Returns

``null`` \| `HTMLElement`

___

### onBegin

▸ **onBegin**(`session`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `session` | `XRSession` |

#### Returns

`Promise`<`void`\>

___

### onEnd

▸ **onEnd**(`session`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `session` | `XRSession` |

#### Returns

`void`

___

### onUpdate

▸ **onUpdate**(`session`, `frame`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `session` | `XRSession` |
| `frame` | `XRFrame` |

#### Returns

`void`

___

### setReticleActive

▸ **setReticleActive**(`active`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `active` | `boolean` |

#### Returns

`void`
