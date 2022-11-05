[com.needle.engine - v2.39.0-pre](../README.md) / AudioTrackHandler

# Class: AudioTrackHandler

## Hierarchy

- `TrackHandler`

  ↳ **`AudioTrackHandler`**

## Table of contents

### Constructors

- [constructor](AudioTrackHandler.md#constructor)

### Properties

- [audio](AudioTrackHandler.md#audio)
- [audioContextTimeOffset](AudioTrackHandler.md#audiocontexttimeoffset)
- [director](AudioTrackHandler.md#director)
- [lastTime](AudioTrackHandler.md#lasttime)
- [listener](AudioTrackHandler.md#listener)
- [models](AudioTrackHandler.md#models)
- [track](AudioTrackHandler.md#track)

### Accessors

- [muted](AudioTrackHandler.md#muted)

### Methods

- [addModel](AudioTrackHandler.md#addmodel)
- [evaluate](AudioTrackHandler.md#evaluate)
- [evaluateWeight](AudioTrackHandler.md#evaluateweight)
- [forEachClip](AudioTrackHandler.md#foreachclip)
- [getClipTime](AudioTrackHandler.md#getcliptime)
- [getClipTimeNormalized](AudioTrackHandler.md#getcliptimenormalized)
- [onAllowAudioChanged](AudioTrackHandler.md#onallowaudiochanged)
- [onDestroy](AudioTrackHandler.md#ondestroy)
- [onDisable](AudioTrackHandler.md#ondisable)
- [onEnable](AudioTrackHandler.md#onenable)
- [onMuteChanged](AudioTrackHandler.md#onmutechanged)

## Constructors

### constructor

• **new AudioTrackHandler**()

#### Inherited from

TrackHandler.constructor

## Properties

### audio

• **audio**: `Audio`<`GainNode`\>[] = `[]`

___

### audioContextTimeOffset

• **audioContextTimeOffset**: `number`[] = `[]`

___

### director

• **director**: [`PlayableDirector`](PlayableDirector.md)

#### Inherited from

TrackHandler.director

___

### lastTime

• **lastTime**: `number` = `0`

___

### listener

• **listener**: `AudioListener`

___

### models

• **models**: `ClipModel`[] = `[]`

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

### addModel

▸ **addModel**(`model`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `model` | `ClipModel` |

#### Returns

`void`

___

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

### onAllowAudioChanged

▸ **onAllowAudioChanged**(`allow`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `allow` | `boolean` |

#### Returns

`void`

___

### onDestroy

▸ `Optional` **onDestroy**(): `any`

#### Returns

`any`

#### Inherited from

TrackHandler.onDestroy

___

### onDisable

▸ **onDisable**(): `void`

#### Returns

`void`

#### Overrides

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

▸ **onMuteChanged**(): `void`

#### Returns

`void`

#### Overrides

TrackHandler.onMuteChanged
