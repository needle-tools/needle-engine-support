[com.needle.engine - v2.39.0-pre](../README.md) / PlayableDirector

# Class: PlayableDirector

## Hierarchy

- [`Behaviour`](Behaviour.md)

  ↳ **`PlayableDirector`**

## Table of contents

### Properties

- [extrapolationMode](PlayableDirector.md#extrapolationmode)
- [gameObject](PlayableDirector.md#gameobject)
- [guid](PlayableDirector.md#guid)
- [playOnAwake](PlayableDirector.md#playonawake)
- [playableAsset](PlayableDirector.md#playableasset)
- [sourceId](PlayableDirector.md#sourceid)

### Accessors

- [activeAndEnabled](PlayableDirector.md#activeandenabled)
- [audioTracks](PlayableDirector.md#audiotracks)
- [context](PlayableDirector.md#context)
- [destroyed](PlayableDirector.md#destroyed)
- [duration](PlayableDirector.md#duration)
- [enabled](PlayableDirector.md#enabled)
- [forward](PlayableDirector.md#forward)
- [hideFlags](PlayableDirector.md#hideflags)
- [isComponent](PlayableDirector.md#iscomponent)
- [isPaused](PlayableDirector.md#ispaused)
- [isPlaying](PlayableDirector.md#isplaying)
- [layer](PlayableDirector.md#layer)
- [name](PlayableDirector.md#name)
- [scene](PlayableDirector.md#scene)
- [static](PlayableDirector.md#static)
- [tag](PlayableDirector.md#tag)
- [time](PlayableDirector.md#time)
- [weight](PlayableDirector.md#weight)
- [worldEuler](PlayableDirector.md#worldeuler)
- [worldPosition](PlayableDirector.md#worldposition)
- [worldQuaternion](PlayableDirector.md#worldquaternion)
- [worldRotation](PlayableDirector.md#worldrotation)

### Methods

- [addEventListener](PlayableDirector.md#addeventlistener)
- [awake](PlayableDirector.md#awake)
- [destroy](PlayableDirector.md#destroy)
- [dispatchEvent](PlayableDirector.md#dispatchevent)
- [earlyUpdate](PlayableDirector.md#earlyupdate)
- [evaluate](PlayableDirector.md#evaluate)
- [forEachTrack](PlayableDirector.md#foreachtrack)
- [isValid](PlayableDirector.md#isvalid)
- [lateUpdate](PlayableDirector.md#lateupdate)
- [onAfterRender](PlayableDirector.md#onafterrender)
- [onBeforeRender](PlayableDirector.md#onbeforerender)
- [onCollisionEnter](PlayableDirector.md#oncollisionenter)
- [onCollisionExit](PlayableDirector.md#oncollisionexit)
- [onCollisionStay](PlayableDirector.md#oncollisionstay)
- [onDestroy](PlayableDirector.md#ondestroy)
- [onDisable](PlayableDirector.md#ondisable)
- [onEnable](PlayableDirector.md#onenable)
- [onTriggerEnter](PlayableDirector.md#ontriggerenter)
- [onTriggerExit](PlayableDirector.md#ontriggerexit)
- [onTriggerStay](PlayableDirector.md#ontriggerstay)
- [onValidate](PlayableDirector.md#onvalidate)
- [pause](PlayableDirector.md#pause)
- [play](PlayableDirector.md#play)
- [rebuildGraph](PlayableDirector.md#rebuildgraph)
- [removeEventListener](PlayableDirector.md#removeeventlistener)
- [resolveGuids](PlayableDirector.md#resolveguids)
- [setWorldPosition](PlayableDirector.md#setworldposition)
- [setWorldQuaternion](PlayableDirector.md#setworldquaternion)
- [setWorldRotation](PlayableDirector.md#setworldrotation)
- [start](PlayableDirector.md#start)
- [startCoroutine](PlayableDirector.md#startcoroutine)
- [stop](PlayableDirector.md#stop)
- [stopCoroutine](PlayableDirector.md#stopcoroutine)
- [update](PlayableDirector.md#update)
- [registerCreateTrack](PlayableDirector.md#registercreatetrack)

## Properties

### extrapolationMode

• **extrapolationMode**: `DirectorWrapMode` = `DirectorWrapMode.Loop`

___

### gameObject

• **gameObject**: [`GameObject`](GameObject.md)

#### Inherited from

[Behaviour](Behaviour.md).[gameObject](Behaviour.md#gameobject)

___

### guid

• **guid**: `string` = `"invalid"`

#### Inherited from

[Behaviour](Behaviour.md).[guid](Behaviour.md#guid)

___

### playOnAwake

• `Optional` **playOnAwake**: `boolean`

___

### playableAsset

• `Optional` **playableAsset**: `TimelineAssetModel`

___

### sourceId

• `Optional` **sourceId**: `string`

#### Inherited from

[Behaviour](Behaviour.md).[sourceId](Behaviour.md#sourceid)

## Accessors

### activeAndEnabled

• `get` **activeAndEnabled**(): `boolean`

#### Returns

`boolean`

#### Inherited from

Behaviour.activeAndEnabled

___

### audioTracks

• `get` **audioTracks**(): [`AudioTrackHandler`](AudioTrackHandler.md)[]

#### Returns

[`AudioTrackHandler`](AudioTrackHandler.md)[]

___

### context

• `get` **context**(): `Context`

#### Returns

`Context`

#### Inherited from

Behaviour.context

• `set` **context**(`context`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `Context` |

#### Returns

`void`

#### Inherited from

Behaviour.context

___

### destroyed

• `get` **destroyed**(): `boolean`

#### Returns

`boolean`

#### Inherited from

Behaviour.destroyed

___

### duration

• `get` **duration**(): `number`

#### Returns

`number`

• `set` **duration**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

___

### enabled

• `get` **enabled**(): `boolean`

#### Returns

`boolean`

#### Inherited from

Behaviour.enabled

• `set` **enabled**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `boolean` |

#### Returns

`void`

#### Inherited from

Behaviour.enabled

___

### forward

• `get` **forward**(): `Vector3`

#### Returns

`Vector3`

#### Inherited from

Behaviour.forward

___

### hideFlags

• `get` **hideFlags**(): [`HideFlags`](../enums/HideFlags.md)

#### Returns

[`HideFlags`](../enums/HideFlags.md)

#### Inherited from

Behaviour.hideFlags

___

### isComponent

• `get` **isComponent**(): `boolean`

#### Returns

`boolean`

#### Inherited from

Behaviour.isComponent

___

### isPaused

• `get` **isPaused**(): `boolean`

#### Returns

`boolean`

___

### isPlaying

• `get` **isPlaying**(): `boolean`

#### Returns

`boolean`

___

### layer

• `get` **layer**(): `number`

#### Returns

`number`

#### Inherited from

Behaviour.layer

___

### name

• `get` **name**(): `string`

#### Returns

`string`

#### Inherited from

Behaviour.name

• `set` **name**(`str`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`void`

#### Inherited from

Behaviour.name

___

### scene

• `get` **scene**(): `Scene`

#### Returns

`Scene`

#### Inherited from

Behaviour.scene

___

### static

• `get` **static**(): `any`

#### Returns

`any`

#### Inherited from

Behaviour.static

___

### tag

• `get` **tag**(): `string`

#### Returns

`string`

#### Inherited from

Behaviour.tag

• `set` **tag**(`str`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`void`

#### Inherited from

Behaviour.tag

___

### time

• `get` **time**(): `number`

#### Returns

`number`

• `set` **time**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

___

### weight

• `get` **weight**(): `number`

#### Returns

`number`

• `set` **weight**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

___

### worldEuler

• `get` **worldEuler**(): `Euler`

#### Returns

`Euler`

#### Inherited from

Behaviour.worldEuler

• `set` **worldEuler**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `Euler` |

#### Returns

`void`

#### Inherited from

Behaviour.worldEuler

___

### worldPosition

• `get` **worldPosition**(): `Vector3`

#### Returns

`Vector3`

#### Inherited from

Behaviour.worldPosition

• `set` **worldPosition**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `Vector3` |

#### Returns

`void`

#### Inherited from

Behaviour.worldPosition

___

### worldQuaternion

• `get` **worldQuaternion**(): `Quaternion`

#### Returns

`Quaternion`

#### Inherited from

Behaviour.worldQuaternion

• `set` **worldQuaternion**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `Quaternion` |

#### Returns

`void`

#### Inherited from

Behaviour.worldQuaternion

___

### worldRotation

• `get` **worldRotation**(): `Vector3`

#### Returns

`Vector3`

#### Inherited from

Behaviour.worldRotation

• `set` **worldRotation**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `Vector3` |

#### Returns

`void`

#### Inherited from

Behaviour.worldRotation

## Methods

### addEventListener

▸ **addEventListener**(`type`, `listener`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |
| `listener` | `EventListener` |

#### Returns

`void`

#### Inherited from

[Behaviour](Behaviour.md).[addEventListener](Behaviour.md#addeventlistener)

___

### awake

▸ **awake**(): `void`

called once when the component becomes active for the first time

#### Returns

`void`

#### Overrides

[Behaviour](Behaviour.md).[awake](Behaviour.md#awake)

___

### destroy

▸ **destroy**(): `void`

#### Returns

`void`

#### Inherited from

[Behaviour](Behaviour.md).[destroy](Behaviour.md#destroy)

___

### dispatchEvent

▸ **dispatchEvent**(`evt`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `evt` | `Event` |

#### Returns

`boolean`

#### Inherited from

[Behaviour](Behaviour.md).[dispatchEvent](Behaviour.md#dispatchevent)

___

### earlyUpdate

▸ `Optional` **earlyUpdate**(): `void`

#### Returns

`void`

#### Inherited from

[Behaviour](Behaviour.md).[earlyUpdate](Behaviour.md#earlyupdate)

___

### evaluate

▸ **evaluate**(): `void`

#### Returns

`void`

___

### forEachTrack

▸ **forEachTrack**(): `Generator`<`TrackHandler`, `void`, `unknown`\>

#### Returns

`Generator`<`TrackHandler`, `void`, `unknown`\>

___

### isValid

▸ **isValid**(): `undefined` \| `boolean`

#### Returns

`undefined` \| `boolean`

___

### lateUpdate

▸ `Optional` **lateUpdate**(): `void`

#### Returns

`void`

#### Inherited from

[Behaviour](Behaviour.md).[lateUpdate](Behaviour.md#lateupdate)

___

### onAfterRender

▸ `Optional` **onAfterRender**(): `void`

#### Returns

`void`

#### Inherited from

[Behaviour](Behaviour.md).[onAfterRender](Behaviour.md#onafterrender)

___

### onBeforeRender

▸ `Optional` **onBeforeRender**(`frame`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `frame` | ``null`` \| `XRFrame` |

#### Returns

`void`

#### Inherited from

[Behaviour](Behaviour.md).[onBeforeRender](Behaviour.md#onbeforerender)

___

### onCollisionEnter

▸ `Optional` **onCollisionEnter**(`col`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `col` | [`Collision`](Collision.md) |

#### Returns

`any`

#### Inherited from

[Behaviour](Behaviour.md).[onCollisionEnter](Behaviour.md#oncollisionenter)

___

### onCollisionExit

▸ `Optional` **onCollisionExit**(`col`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `col` | [`Collision`](Collision.md) |

#### Returns

`any`

#### Inherited from

[Behaviour](Behaviour.md).[onCollisionExit](Behaviour.md#oncollisionexit)

___

### onCollisionStay

▸ `Optional` **onCollisionStay**(`col`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `col` | [`Collision`](Collision.md) |

#### Returns

`any`

#### Inherited from

[Behaviour](Behaviour.md).[onCollisionStay](Behaviour.md#oncollisionstay)

___

### onDestroy

▸ **onDestroy**(): `void`

#### Returns

`void`

#### Overrides

[Behaviour](Behaviour.md).[onDestroy](Behaviour.md#ondestroy)

___

### onDisable

▸ **onDisable**(): `void`

#### Returns

`void`

#### Overrides

[Behaviour](Behaviour.md).[onDisable](Behaviour.md#ondisable)

___

### onEnable

▸ **onEnable**(): `void`

called every time when the component gets enabled (this is invoked after awake and before start)

#### Returns

`void`

#### Overrides

[Behaviour](Behaviour.md).[onEnable](Behaviour.md#onenable)

___

### onTriggerEnter

▸ `Optional` **onTriggerEnter**(`col`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `col` | `ICollider` |

#### Returns

`any`

#### Inherited from

[Behaviour](Behaviour.md).[onTriggerEnter](Behaviour.md#ontriggerenter)

___

### onTriggerExit

▸ `Optional` **onTriggerExit**(`col`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `col` | `ICollider` |

#### Returns

`any`

#### Inherited from

[Behaviour](Behaviour.md).[onTriggerExit](Behaviour.md#ontriggerexit)

___

### onTriggerStay

▸ `Optional` **onTriggerStay**(`col`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `col` | `ICollider` |

#### Returns

`any`

#### Inherited from

[Behaviour](Behaviour.md).[onTriggerStay](Behaviour.md#ontriggerstay)

___

### onValidate

▸ `Optional` **onValidate**(`prop?`): `void`

called when you decorate fields with the @validate() decorator

#### Parameters

| Name | Type |
| :------ | :------ |
| `prop?` | `string` |

#### Returns

`void`

#### Inherited from

[Behaviour](Behaviour.md).[onValidate](Behaviour.md#onvalidate)

___

### pause

▸ **pause**(): `void`

#### Returns

`void`

___

### play

▸ **play**(): `void`

#### Returns

`void`

___

### rebuildGraph

▸ **rebuildGraph**(): `void`

#### Returns

`void`

___

### removeEventListener

▸ **removeEventListener**(`type`, `listener`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |
| `listener` | `EventListener` |

#### Returns

`void`

#### Inherited from

[Behaviour](Behaviour.md).[removeEventListener](Behaviour.md#removeeventlistener)

___

### resolveGuids

▸ **resolveGuids**(`map`): `void`

called on a component with a map of old to new guids (e.g. when instantiate generated new guids and e.g. timeline track bindings needs to remape them)

#### Parameters

| Name | Type |
| :------ | :------ |
| `map` | `GuidsMap` |

#### Returns

`void`

#### Overrides

[Behaviour](Behaviour.md).[resolveGuids](Behaviour.md#resolveguids)

___

### setWorldPosition

▸ **setWorldPosition**(`x`, `y`, `z`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `z` | `number` |

#### Returns

`void`

#### Inherited from

[Behaviour](Behaviour.md).[setWorldPosition](Behaviour.md#setworldposition)

___

### setWorldQuaternion

▸ **setWorldQuaternion**(`x`, `y`, `z`, `w`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `z` | `number` |
| `w` | `number` |

#### Returns

`void`

#### Inherited from

[Behaviour](Behaviour.md).[setWorldQuaternion](Behaviour.md#setworldquaternion)

___

### setWorldRotation

▸ **setWorldRotation**(`x`, `y`, `z`, `degrees?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `x` | `number` | `undefined` |
| `y` | `number` | `undefined` |
| `z` | `number` | `undefined` |
| `degrees` | `boolean` | `true` |

#### Returns

`void`

#### Inherited from

[Behaviour](Behaviour.md).[setWorldRotation](Behaviour.md#setworldrotation)

___

### start

▸ `Optional` **start**(): `void`

#### Returns

`void`

#### Inherited from

[Behaviour](Behaviour.md).[start](Behaviour.md#start)

___

### startCoroutine

▸ **startCoroutine**(`routine`, `evt?`): `Generator`<`unknown`, `any`, `unknown`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `routine` | `Generator`<`unknown`, `any`, `unknown`\> | `undefined` |
| `evt` | [`FrameEvent`](../enums/FrameEvent.md) | `FrameEvent.Update` |

#### Returns

`Generator`<`unknown`, `any`, `unknown`\>

#### Inherited from

[Behaviour](Behaviour.md).[startCoroutine](Behaviour.md#startcoroutine)

___

### stop

▸ **stop**(): `void`

#### Returns

`void`

___

### stopCoroutine

▸ **stopCoroutine**(`routine`, `evt?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `routine` | `Generator`<`unknown`, `any`, `unknown`\> | `undefined` |
| `evt` | [`FrameEvent`](../enums/FrameEvent.md) | `FrameEvent.Update` |

#### Returns

`void`

#### Inherited from

[Behaviour](Behaviour.md).[stopCoroutine](Behaviour.md#stopcoroutine)

___

### update

▸ `Optional` **update**(): `void`

#### Returns

`void`

#### Inherited from

[Behaviour](Behaviour.md).[update](Behaviour.md#update)

___

### registerCreateTrack

▸ `Static` **registerCreateTrack**(`type`, `fn`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |
| `fn` | `CreateTrackFunction` |

#### Returns

`void`
