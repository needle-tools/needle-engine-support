[com.needle.engine - v2.39.0-pre](../README.md) / XRGrabModel

# Class: XRGrabModel

## Implements

- `IModel`

## Table of contents

### Constructors

- [constructor](XRGrabModel.md#constructor)

### Properties

- [dontSave](XRGrabModel.md#dontsave)
- [guid](XRGrabModel.md#guid)
- [point](XRGrabModel.md#point)
- [source](XRGrabModel.md#source)
- [target](XRGrabModel.md#target)
- [userId](XRGrabModel.md#userid)

### Methods

- [update](XRGrabModel.md#update)

## Constructors

### constructor

• **new XRGrabModel**()

## Properties

### dontSave

• **dontSave**: `boolean` = `true`

#### Implementation of

IModel.dontSave

___

### guid

• **guid**: `any`

#### Implementation of

IModel.guid

___

### point

• **point**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `z` | `number` |

___

### source

• **source**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `z` | `number` |

___

### target

• **target**: `undefined` \| `string`

___

### userId

• **userId**: `undefined` \| ``null`` \| `string`

## Methods

### update

▸ **update**(`context`, `point`, `source`, `target?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `context` | `Context` | `undefined` |
| `point` | `Vector3` | `undefined` |
| `source` | `Vector3` | `undefined` |
| `target` | `undefined` \| `string` | `undefined` |

#### Returns

`void`
