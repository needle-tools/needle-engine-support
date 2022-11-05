[com.needle.engine - v2.39.0-pre](../README.md) / AnimationTrackHandler

# Class: AnimationTrackHandler

## Hierarchy

- `TrackHandler`

  ↳ **`AnimationTrackHandler`**

## Table of contents

### Constructors

- [constructor](AnimationTrackHandler.md#constructor)

### Properties

- [actions](AnimationTrackHandler.md#actions)
- [clips](AnimationTrackHandler.md#clips)
- [director](AnimationTrackHandler.md#director)
- [mixer](AnimationTrackHandler.md#mixer)
- [models](AnimationTrackHandler.md#models)
- [target](AnimationTrackHandler.md#target)
- [track](AnimationTrackHandler.md#track)
- [trackOffset](AnimationTrackHandler.md#trackoffset)

### Accessors

- [muted](AnimationTrackHandler.md#muted)

### Methods

- [bind](AnimationTrackHandler.md#bind)
- [createHooks](AnimationTrackHandler.md#createhooks)
- [evaluate](AnimationTrackHandler.md#evaluate)
- [evaluateWeight](AnimationTrackHandler.md#evaluateweight)
- [forEachClip](AnimationTrackHandler.md#foreachclip)
- [getClipTime](AnimationTrackHandler.md#getcliptime)
- [getClipTimeNormalized](AnimationTrackHandler.md#getcliptimenormalized)
- [onDestroy](AnimationTrackHandler.md#ondestroy)
- [onDisable](AnimationTrackHandler.md#ondisable)
- [onEnable](AnimationTrackHandler.md#onenable)
- [onMuteChanged](AnimationTrackHandler.md#onmutechanged)

## Constructors

### constructor

• **new AnimationTrackHandler**()

#### Inherited from

TrackHandler.constructor

## Properties

### actions

• **actions**: `AnimationAction`[] = `[]`

___

### clips

• **clips**: `AnimationClip`[] = `[]`

___

### director

• **director**: [`PlayableDirector`](PlayableDirector.md)

#### Inherited from

TrackHandler.director

___

### mixer

• `Optional` **mixer**: `AnimationMixer`

___

### models

• **models**: `ClipModel`[] = `[]`

___

### target

• `Optional` **target**: `Object3D`<`Event`\>

___

### track

• **track**: `TrackModel`

#### Inherited from

TrackHandler.track

___

### trackOffset

• `Optional` **trackOffset**: `TrackOffset`

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

### bind

▸ **bind**(): `void`

#### Returns

`void`

___

### createHooks

▸ **createHooks**(`clipModel`, `clip`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `clipModel` | `AnimationClipModel` |
| `clip` | `any` |

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
