[com.needle.engine - v2.39.0-pre](../README.md) / PointerEventData

# Class: PointerEventData

## Implements

- `IInputEventArgs`

## Table of contents

### Constructors

- [constructor](PointerEventData.md#constructor)

### Properties

- [inputSource](PointerEventData.md#inputsource)
- [isClicked](PointerEventData.md#isclicked)
- [isDown](PointerEventData.md#isdown)
- [isPressed](PointerEventData.md#ispressed)
- [isUp](PointerEventData.md#isup)
- [object](PointerEventData.md#object)
- [used](PointerEventData.md#used)

### Methods

- [StopPropagation](PointerEventData.md#stoppropagation)
- [Use](PointerEventData.md#use)

## Constructors

### constructor

• **new PointerEventData**(`events?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `events?` | `Event` |

## Properties

### inputSource

• **inputSource**: `any`

___

### isClicked

• **isClicked**: `undefined` \| `boolean`

___

### isDown

• **isDown**: `undefined` \| `boolean`

___

### isPressed

• **isPressed**: `undefined` \| `boolean`

___

### isUp

• **isUp**: `undefined` \| `boolean`

___

### object

• **object**: `Object3D`<`Event`\>

___

### used

• **used**: `boolean` = `false`

#### Implementation of

IInputEventArgs.used

## Methods

### StopPropagation

▸ **StopPropagation**(): `void`

#### Returns

`void`

#### Implementation of

IInputEventArgs.StopPropagation

___

### Use

▸ **Use**(): `void`

#### Returns

`void`

#### Implementation of

IInputEventArgs.Use
