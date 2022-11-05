[com.needle.engine - v2.39.0-pre](../README.md) / EventList

# Class: EventList

## Table of contents

### Constructors

- [constructor](EventList.md#constructor)

### Methods

- [addEventListener](EventList.md#addeventlistener)
- [invoke](EventList.md#invoke)
- [removeAllEventListeners](EventList.md#removealleventlisteners)
- [removeEventListener](EventList.md#removeeventlistener)
- [setEventTarget](EventList.md#seteventtarget)

## Constructors

### constructor

• **new EventList**(`evts?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `evts?` | [`CallInfo`](CallInfo.md)[] |

## Methods

### addEventListener

▸ **addEventListener**(`cb`): `Function`

#### Parameters

| Name | Type |
| :------ | :------ |
| `cb` | `Function` |

#### Returns

`Function`

___

### invoke

▸ **invoke**(...`args`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any` |

#### Returns

`void`

___

### removeAllEventListeners

▸ **removeAllEventListeners**(): `void`

#### Returns

`void`

___

### removeEventListener

▸ **removeEventListener**(`cb`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `cb` | `undefined` \| ``null`` \| `Function` |

#### Returns

`void`

___

### setEventTarget

▸ **setEventTarget**(`key`, `target`): `void`

set an event target to try invoke the EventTarget dispatchEvent when this EventList is invoked

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `target` | `object` |

#### Returns

`void`
