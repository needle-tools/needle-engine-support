[com.needle.engine - v2.39.0-pre](../README.md) / AnimatorController

# Class: AnimatorController

## Table of contents

### Constructors

- [constructor](AnimatorController.md#constructor)

### Properties

- [animator](AnimatorController.md#animator)
- [model](AnimatorController.md#model)
- [normalizedStartOffset](AnimatorController.md#normalizedstartoffset)

### Accessors

- [context](AnimatorController.md#context)

### Methods

- [FindState](AnimatorController.md#findstate)
- [GetBool](AnimatorController.md#getbool)
- [GetFloat](AnimatorController.md#getfloat)
- [GetInteger](AnimatorController.md#getinteger)
- [IsInTransition](AnimatorController.md#isintransition)
- [Play](AnimatorController.md#play)
- [Reset](AnimatorController.md#reset)
- [ResetTrigger](AnimatorController.md#resettrigger)
- [SetBool](AnimatorController.md#setbool)
- [SetFloat](AnimatorController.md#setfloat)
- [SetInteger](AnimatorController.md#setinteger)
- [SetSpeed](AnimatorController.md#setspeed)
- [SetTrigger](AnimatorController.md#settrigger)
- [bind](AnimatorController.md#bind)
- [clone](AnimatorController.md#clone)
- [update](AnimatorController.md#update)

## Constructors

### constructor

• **new AnimatorController**(`model`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `model` | `AnimatorControllerModel` |

## Properties

### animator

• `Optional` **animator**: [`Animator`](Animator.md)

___

### model

• **model**: `AnimatorControllerModel`

___

### normalizedStartOffset

• **normalizedStartOffset**: `number` = `0`

## Accessors

### context

• `get` **context**(): `undefined` \| ``null`` \| `Context`

#### Returns

`undefined` \| ``null`` \| `Context`

## Methods

### FindState

▸ **FindState**(`name`): ``null`` \| `State`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `undefined` \| ``null`` \| `string` |

#### Returns

``null`` \| `State`

___

### GetBool

▸ **GetBool**(`name`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` \| `number` |

#### Returns

`boolean`

___

### GetFloat

▸ **GetFloat**(`name`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` \| `number` |

#### Returns

`number`

___

### GetInteger

▸ **GetInteger**(`name`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` \| `number` |

#### Returns

`number`

___

### IsInTransition

▸ **IsInTransition**(): `boolean`

#### Returns

`boolean`

___

### Play

▸ **Play**(`name`, `layerIndex?`, `normalizedTime?`, `durationInSec?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `name` | `string` \| `number` | `undefined` |
| `layerIndex` | `number` | `-1` |
| `normalizedTime` | `number` | `Number.NEGATIVE_INFINITY` |
| `durationInSec` | `number` | `0` |

#### Returns

`void`

___

### Reset

▸ **Reset**(): `void`

#### Returns

`void`

___

### ResetTrigger

▸ **ResetTrigger**(`name`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` \| `number` |

#### Returns

`void`

___

### SetBool

▸ **SetBool**(`name`, `value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` \| `number` |
| `value` | `boolean` |

#### Returns

`void`

___

### SetFloat

▸ **SetFloat**(`name`, `val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` \| `number` |
| `val` | `number` |

#### Returns

`void`

___

### SetInteger

▸ **SetInteger**(`name`, `val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` \| `number` |
| `val` | `number` |

#### Returns

`void`

___

### SetSpeed

▸ **SetSpeed**(`speed`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `speed` | `number` |

#### Returns

`void`

___

### SetTrigger

▸ **SetTrigger**(`name`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` \| `number` |

#### Returns

`void`

___

### bind

▸ **bind**(`animator`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `animator` | [`Animator`](Animator.md) |

#### Returns

`void`

___

### clone

▸ **clone**(): [`AnimatorController`](AnimatorController.md)

#### Returns

[`AnimatorController`](AnimatorController.md)

___

### update

▸ **update**(): `void`

#### Returns

`void`
