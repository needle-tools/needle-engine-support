[com.needle.engine - v2.39.0-pre](../README.md) / SignalTrackHandler

# Class: SignalTrackHandler

## Hierarchy

- `TrackHandler`

  ↳ **`SignalTrackHandler`**

## Table of contents

### Constructors

- [constructor](SignalTrackHandler.md#constructor)

### Properties

- [didTrigger](SignalTrackHandler.md#didtrigger)
- [director](SignalTrackHandler.md#director)
- [models](SignalTrackHandler.md#models)
- [receivers](SignalTrackHandler.md#receivers)
- [track](SignalTrackHandler.md#track)

### Accessors

- [muted](SignalTrackHandler.md#muted)

### Methods

- [evaluate](SignalTrackHandler.md#evaluate)
- [evaluateWeight](SignalTrackHandler.md#evaluateweight)
- [forEachClip](SignalTrackHandler.md#foreachclip)
- [getClipTime](SignalTrackHandler.md#getcliptime)
- [getClipTimeNormalized](SignalTrackHandler.md#getcliptimenormalized)
- [onDestroy](SignalTrackHandler.md#ondestroy)
- [onDisable](SignalTrackHandler.md#ondisable)
- [onEnable](SignalTrackHandler.md#onenable)
- [onMuteChanged](SignalTrackHandler.md#onmutechanged)

## Constructors

### constructor

• **new SignalTrackHandler**()

#### Inherited from

TrackHandler.constructor

## Properties

### didTrigger

• **didTrigger**: `boolean`[] = `[]`

___

### director

• **director**: [`PlayableDirector`](PlayableDirector.md)

#### Inherited from

TrackHandler.director

___

### models

• **models**: `SignalMarkerModel`[] = `[]`

___

### receivers

• **receivers**: (``null`` \| [`SignalReceiver`](SignalReceiver.md))[] = `[]`

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
