[com.needle.engine - v2.39.0-pre](../README.md) / ControlTrackHandler

# Class: ControlTrackHandler

## Hierarchy

- `TrackHandler`

  ↳ **`ControlTrackHandler`**

## Table of contents

### Constructors

- [constructor](ControlTrackHandler.md#constructor)

### Properties

- [director](ControlTrackHandler.md#director)
- [models](ControlTrackHandler.md#models)
- [timelines](ControlTrackHandler.md#timelines)
- [track](ControlTrackHandler.md#track)

### Accessors

- [muted](ControlTrackHandler.md#muted)

### Methods

- [evaluate](ControlTrackHandler.md#evaluate)
- [evaluateWeight](ControlTrackHandler.md#evaluateweight)
- [forEachClip](ControlTrackHandler.md#foreachclip)
- [getClipTime](ControlTrackHandler.md#getcliptime)
- [getClipTimeNormalized](ControlTrackHandler.md#getcliptimenormalized)
- [onDestroy](ControlTrackHandler.md#ondestroy)
- [onDisable](ControlTrackHandler.md#ondisable)
- [onEnable](ControlTrackHandler.md#onenable)
- [onMuteChanged](ControlTrackHandler.md#onmutechanged)
- [resolveSourceObjects](ControlTrackHandler.md#resolvesourceobjects)

## Constructors

### constructor

• **new ControlTrackHandler**()

#### Inherited from

TrackHandler.constructor

## Properties

### director

• **director**: [`PlayableDirector`](PlayableDirector.md)

#### Inherited from

TrackHandler.director

___

### models

• **models**: `ClipModel`[] = `[]`

___

### timelines

• **timelines**: (``null`` \| [`PlayableDirector`](PlayableDirector.md))[] = `[]`

___

### track

• **track**: `TrackModel`

#### Inherited from

TrackHandler.track

## Accessors

### muted

• `get` **muted**(): `boolean`

#### Returns

`boolean`

#### Inherited from

TrackHandler.muted

• `set` **muted**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `boolean` |

#### Returns

`void`

#### Inherited from

TrackHandler.muted

## Methods

### evaluate

▸ **evaluate**(`time`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `time` | `number` |

#### Returns

`void`

#### Overrides

TrackHandler.evaluate

___

### evaluateWeight

▸ **evaluateWeight**(`time`, `index`, `models`, `isActive?`): `number`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `time` | `number` | `undefined` |
| `index` | `number` | `undefined` |
| `models` | `ClipModel`[] | `undefined` |
| `isActive` | `boolean` | `true` |

#### Returns

`number`

#### Inherited from

TrackHandler.evaluateWeight

___

### forEachClip

▸ **forEachClip**(`backwards?`): `IterableIterator`<`ClipModel`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `backwards` | `boolean` | `false` |

#### Returns

`IterableIterator`<`ClipModel`\>

#### Inherited from

TrackHandler.forEachClip

___

### getClipTime

▸ **getClipTime**(`time`, `model`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `time` | `number` |
| `model` | `ClipModel` |

#### Returns

`number`

#### Inherited from

TrackHandler.getClipTime

___

### getClipTimeNormalized

▸ **getClipTimeNormalized**(`time`, `model`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `time` | `number` |
| `model` | `ClipModel` |

#### Returns

`number`

#### Inherited from

TrackHandler.getClipTimeNormalized

___

### onDestroy

▸ `Optional` **onDestroy**(): `any`

#### Returns

`any`

#### Inherited from

TrackHandler.onDestroy

___

### onDisable

▸ `Optional` **onDisable**(): `any`

#### Returns

`any`

#### Inherited from

TrackHandler.onDisable

___

### onEnable

▸ `Optional` **onEnable**(): `any`

#### Returns

`any`

#### Inherited from

TrackHandler.onEnable

___

### onMuteChanged

▸ `Optional` **onMuteChanged**(): `any`

#### Returns

`any`

#### Inherited from

TrackHandler.onMuteChanged

___

### resolveSourceObjects

▸ **resolveSourceObjects**(`context`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `Context` |

#### Returns

`void`
