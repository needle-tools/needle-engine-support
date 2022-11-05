[com.needle.engine - v2.39.0-pre](../README.md) / Avatar\_POI

# Class: Avatar\_POI

## Table of contents

### Constructors

- [constructor](Avatar_POI.md#constructor)

### Properties

- [LastChangeTime](Avatar_POI.md#lastchangetime)
- [Pois](Avatar_POI.md#pois)

### Methods

- [Add](Avatar_POI.md#add)
- [Remove](Avatar_POI.md#remove)

## Constructors

### constructor

• **new Avatar_POI**()

## Properties

### LastChangeTime

▪ `Static` **LastChangeTime**: `number` = `0`

___

### Pois

▪ `Static` **Pois**: { `avatar`: ``null`` \| [`AvatarMarker`](AvatarMarker.md) ; `obj`: `Object3D`<`Event`\>  }[] = `[]`

## Methods

### Add

▸ `Static` **Add**(`context`, `obj`, `ignoredBy?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `context` | `Context` | `undefined` |
| `obj` | `Object3D`<`Event`\> | `undefined` |
| `ignoredBy` | ``null`` \| [`AvatarMarker`](AvatarMarker.md) | `null` |

#### Returns

`void`

___

### Remove

▸ `Static` **Remove**(`context`, `obj`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | ``null`` \| `Context` |
| `obj` | ``null`` \| `Object3D`<`Event`\> |

#### Returns

`void`
