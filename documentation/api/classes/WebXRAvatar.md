[com.needle.engine - v2.39.0-pre](../README.md) / WebXRAvatar

# Class: WebXRAvatar

## Table of contents

### Constructors

- [constructor](WebXRAvatar.md#constructor)

### Properties

- [flags](WebXRAvatar.md#flags)
- [guid](WebXRAvatar.md#guid)
- [handLeft](WebXRAvatar.md#handleft)
- [handRight](WebXRAvatar.md#handright)
- [head](WebXRAvatar.md#head)
- [isLocalAvatar](WebXRAvatar.md#islocalavatar)
- [lastUpdate](WebXRAvatar.md#lastupdate)

### Accessors

- [isWebXRAvatar](WebXRAvatar.md#iswebxravatar)

### Methods

- [destroy](WebXRAvatar.md#destroy)
- [setAvatarOverride](WebXRAvatar.md#setavataroverride)
- [setVisible](WebXRAvatar.md#setvisible)
- [tryUpdate](WebXRAvatar.md#tryupdate)
- [update](WebXRAvatar.md#update)
- [updateFlags](WebXRAvatar.md#updateflags)

## Constructors

### constructor

• **new WebXRAvatar**(`context`, `guid`, `webXR`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `Context` |
| `guid` | `string` |
| `webXR` | [`WebXR`](WebXR.md) |

## Properties

### flags

• **flags**: ``null`` \| [`XRFlag`](XRFlag.md)[] = `null`

___

### guid

• **guid**: `string`

the user id

___

### handLeft

• **handLeft**: ``null`` \| `Object3D`<`Event`\> = `null`

___

### handRight

• **handRight**: ``null`` \| `Object3D`<`Event`\> = `null`

___

### head

• **head**: ``null`` \| `Object3D`<`Event`\> = `null`

___

### isLocalAvatar

• **isLocalAvatar**: `boolean` = `false`

___

### lastUpdate

• **lastUpdate**: `number` = `-1`

## Accessors

### isWebXRAvatar

• `get` **isWebXRAvatar**(): `boolean`

#### Returns

`boolean`

## Methods

### destroy

▸ **destroy**(): `void`

#### Returns

`void`

___

### setAvatarOverride

▸ **setAvatarOverride**(`avatarId`): `Promise`<``null`` \| `boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `avatarId` | ``null`` \| `string` |

#### Returns

`Promise`<``null`` \| `boolean`\>

___

### setVisible

▸ **setVisible**(`visible`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `visible` | `boolean` |

#### Returns

`void`

___

### tryUpdate

▸ **tryUpdate**(`state`, `_timeDiff`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`VRUserState`](VRUserState.md) |
| `_timeDiff` | `number` |

#### Returns

`void`

___

### update

▸ **update**(): `void`

#### Returns

`void`

___

### updateFlags

▸ **updateFlags**(): `void`

#### Returns

`void`
