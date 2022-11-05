[com.needle.engine - v2.39.0-pre](../README.md) / VRUserState

# Class: VRUserState

## Table of contents

### Constructors

- [constructor](VRUserState.md#constructor)

### Properties

- [avatarId](VRUserState.md#avatarid)
- [guid](VRUserState.md#guid)
- [posLeftHand](VRUserState.md#poslefthand)
- [posRightHand](VRUserState.md#posrighthand)
- [position](VRUserState.md#position)
- [rotLeftHand](VRUserState.md#rotlefthand)
- [rotRightHand](VRUserState.md#rotrighthand)
- [rotation](VRUserState.md#rotation)
- [scale](VRUserState.md#scale)
- [time](VRUserState.md#time)

### Methods

- [sendAsBuffer](VRUserState.md#sendasbuffer)
- [setFromBuffer](VRUserState.md#setfrombuffer)
- [update](VRUserState.md#update)

## Constructors

### constructor

• **new VRUserState**(`guid`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `guid` | `string` |

## Properties

### avatarId

• **avatarId**: `string`

___

### guid

• **guid**: `string`

___

### posLeftHand

• **posLeftHand**: `Vector3`

___

### posRightHand

• **posRightHand**: `Vector3`

___

### position

• **position**: `Vector3`

___

### rotLeftHand

• **rotLeftHand**: `Quaternion`

___

### rotRightHand

• **rotRightHand**: `Quaternion`

___

### rotation

• **rotation**: `Vector4`

___

### scale

• **scale**: `number` = `1`

___

### time

• **time**: `number`

## Methods

### sendAsBuffer

▸ **sendAsBuffer**(`builder`, `net`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `builder` | `Builder` |
| `net` | `NetworkConnection` |

#### Returns

`void`

___

### setFromBuffer

▸ **setFromBuffer**(`guid`, `state`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `guid` | `string` |
| `state` | `VrUserStateBuffer` |

#### Returns

`void`

___

### update

▸ **update**(`rig`, `pos`, `rot`, `webXR`, `avatarId`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `rig` | `Group` |
| `pos` | `DOMPointReadOnly` |
| `rot` | `DOMPointReadOnly` |
| `webXR` | [`WebXR`](WebXR.md) |
| `avatarId` | `string` |

#### Returns

`void`
