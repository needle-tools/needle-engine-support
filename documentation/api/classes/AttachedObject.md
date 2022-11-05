[com.needle.engine - v2.39.0-pre](../README.md) / AttachedObject

# Class: AttachedObject

## Table of contents

### Constructors

- [constructor](AttachedObject.md#constructor)

### Properties

- [controller](AttachedObject.md#controller)
- [grabPoint](AttachedObject.md#grabpoint)
- [grabTime](AttachedObject.md#grabtime)
- [grabUUID](AttachedObject.md#grabuuid)
- [isCloseGrab](AttachedObject.md#isclosegrab)
- [selected](AttachedObject.md#selected)
- [selectedMesh](AttachedObject.md#selectedmesh)
- [selectedParent](AttachedObject.md#selectedparent)
- [sync](AttachedObject.md#sync)
- [Current](AttachedObject.md#current)
- [Events](AttachedObject.md#events)

### Methods

- [free](AttachedObject.md#free)
- [update](AttachedObject.md#update)
- [AddEventListener](AttachedObject.md#addeventlistener)
- [RemoveEventListener](AttachedObject.md#removeeventlistener)
- [TryTake](AttachedObject.md#trytake)

## Constructors

### constructor

• **new AttachedObject**()

## Properties

### controller

• **controller**: ``null`` \| [`WebXRController`](WebXRController.md) = `null`

___

### grabPoint

• **grabPoint**: `Vector3`

___

### grabTime

• **grabTime**: `number` = `0`

___

### grabUUID

• **grabUUID**: `string` = `""`

___

### isCloseGrab

• **isCloseGrab**: `boolean` = `false`

___

### selected

• **selected**: ``null`` \| `Object3D`<`Event`\> = `null`

___

### selectedMesh

• **selectedMesh**: ``null`` \| `Mesh`<`BufferGeometry`, `Material` \| `Material`[]\> = `null`

___

### selectedParent

• **selectedParent**: ``null`` \| `Object3D`<`Event`\> = `null`

___

### sync

• **sync**: ``null`` \| [`SyncedTransform`](SyncedTransform.md) = `null`

___

### Current

▪ `Static` **Current**: [`AttachedObject`](AttachedObject.md)[] = `[]`

___

### Events

▪ `Static` **Events**: `Object` = `{}`

#### Index signature

▪ [key: `string`]: `Function`[]

## Methods

### free

▸ **free**(): `void`

#### Returns

`void`

___

### update

▸ **update**(): `void`

#### Returns

`void`

___

### AddEventListener

▸ `Static` **AddEventListener**(`event`, `callback`): `Function`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `AttachedObjectEvents` |
| `callback` | `Function` |

#### Returns

`Function`

___

### RemoveEventListener

▸ `Static` **RemoveEventListener**(`event`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `AttachedObjectEvents` |
| `callback` | ``null`` \| `Function` |

#### Returns

`void`

___

### TryTake

▸ `Static` **TryTake**(`controller`, `candidate`, `intersection`, `closeGrab`): ``null`` \| [`AttachedObject`](AttachedObject.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `controller` | [`WebXRController`](WebXRController.md) |
| `candidate` | `Object3D`<`Event`\> |
| `intersection` | `Intersection`<`Object3D`<`Event`\>\> |
| `closeGrab` | `boolean` |

#### Returns

``null`` \| [`AttachedObject`](AttachedObject.md)
