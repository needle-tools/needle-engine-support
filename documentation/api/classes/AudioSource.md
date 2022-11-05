[com.needle.engine - v2.39.0-pre](../README.md) / AudioSource

# Class: AudioSource

## Hierarchy

- [`Behaviour`](Behaviour.md)

  ↳ **`AudioSource`**

## Table of contents

### Properties

- [clip](AudioSource.md#clip)
- [gameObject](AudioSource.md#gameobject)
- [guid](AudioSource.md#guid)
- [playOnAwake](AudioSource.md#playonawake)
- [rollOffMode](AudioSource.md#rolloffmode)
- [sourceId](AudioSource.md#sourceid)

### Accessors

- [ShouldPlay](AudioSource.md#shouldplay)
- [Sound](AudioSource.md#sound)
- [activeAndEnabled](AudioSource.md#activeandenabled)
- [context](AudioSource.md#context)
- [destroyed](AudioSource.md#destroyed)
- [enabled](AudioSource.md#enabled)
- [forward](AudioSource.md#forward)
- [hideFlags](AudioSource.md#hideflags)
- [isComponent](AudioSource.md#iscomponent)
- [isPlaying](AudioSource.md#isplaying)
- [layer](AudioSource.md#layer)
- [loop](AudioSource.md#loop)
- [maxDistance](AudioSource.md#maxdistance)
- [minDistance](AudioSource.md#mindistance)
- [name](AudioSource.md#name)
- [scene](AudioSource.md#scene)
- [spatialBlend](AudioSource.md#spatialblend)
- [static](AudioSource.md#static)
- [tag](AudioSource.md#tag)
- [time](AudioSource.md#time)
- [volume](AudioSource.md#volume)
- [worldEuler](AudioSource.md#worldeuler)
- [worldPosition](AudioSource.md#worldposition)
- [worldQuaternion](AudioSource.md#worldquaternion)
- [worldRotation](AudioSource.md#worldrotation)
- [userInteractionRegistered](AudioSource.md#userinteractionregistered)

### Methods

- [addEventListener](AudioSource.md#addeventlistener)
- [awake](AudioSource.md#awake)
- [destroy](AudioSource.md#destroy)
- [dispatchEvent](AudioSource.md#dispatchevent)
- [earlyUpdate](AudioSource.md#earlyupdate)
- [lateUpdate](AudioSource.md#lateupdate)
- [onAfterRender](AudioSource.md#onafterrender)
- [onBeforeRender](AudioSource.md#onbeforerender)
- [onCollisionEnter](AudioSource.md#oncollisionenter)
- [onCollisionExit](AudioSource.md#oncollisionexit)
- [onCollisionStay](AudioSource.md#oncollisionstay)
- [onDestroy](AudioSource.md#ondestroy)
- [onDisable](AudioSource.md#ondisable)
- [onEnable](AudioSource.md#onenable)
- [onTriggerEnter](AudioSource.md#ontriggerenter)
- [onTriggerExit](AudioSource.md#ontriggerexit)
- [onTriggerStay](AudioSource.md#ontriggerstay)
- [onValidate](AudioSource.md#onvalidate)
- [pause](AudioSource.md#pause)
- [play](AudioSource.md#play)
- [removeEventListener](AudioSource.md#removeeventlistener)
- [resolveGuids](AudioSource.md#resolveguids)
- [setWorldPosition](AudioSource.md#setworldposition)
- [setWorldQuaternion](AudioSource.md#setworldquaternion)
- [setWorldRotation](AudioSource.md#setworldrotation)
- [start](AudioSource.md#start)
- [startCoroutine](AudioSource.md#startcoroutine)
- [stop](AudioSource.md#stop)
- [stopCoroutine](AudioSource.md#stopcoroutine)
- [update](AudioSource.md#update)
- [registerWaitForAllowAudio](AudioSource.md#registerwaitforallowaudio)

## Properties

### clip

• **clip**: `string` = `""`

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

• **playOnAwake**: `boolean` = `false`

___

### rollOffMode

• **rollOffMode**: `AudioRolloffMode` = `0`

___

### sourceId

• `Optional` **sourceId**: `string`

#### Inherited from

[Behaviour](Behaviour.md).[sourceId](Behaviour.md#sourceid)

## Accessors

### ShouldPlay

• `get` **ShouldPlay**(): `boolean`

#### Returns

`boolean`

___

### Sound

• `get` **Sound**(): ``null`` \| `PositionalAudio`

#### Returns

``null`` \| `PositionalAudio`

___

### activeAndEnabled

• `get` **activeAndEnabled**(): `boolean`

#### Returns

`boolean`

#### Inherited from

Behaviour.activeAndEnabled

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

### isPlaying

• `get` **isPlaying**(): `boolean`

#### Returns

`boolean`

• `set` **isPlaying**(`_`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `_` | `boolean` |

#### Returns

`void`

___

### layer

• `get` **layer**(): `number`

#### Returns

`number`

#### Inherited from

Behaviour.layer

___

### loop

• `get` **loop**(): `boolean`

#### Returns

`boolean`

• `set` **loop**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `boolean` |

#### Returns

`void`

___

### maxDistance

• `get` **maxDistance**(): `number`

#### Returns

`number`

• `set` **maxDistance**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `number` |

#### Returns

`void`

___

### minDistance

• `get` **minDistance**(): `number`

#### Returns

`number`

• `set` **minDistance**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `number` |

#### Returns

`void`

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

### spatialBlend

• `get` **spatialBlend**(): `number`

#### Returns

`number`

• `set` **spatialBlend**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `number` |

#### Returns

`void`

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

• `set` **time**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `number` |

#### Returns

`void`

___

### volume

• `get` **volume**(): `number`

#### Returns

`number`

• `set` **volume**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `number` |

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

___

### userInteractionRegistered

• `Static` `get` **userInteractionRegistered**(): `boolean`

#### Returns

`boolean`

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

▸ **play**(`clip?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `clip` | `undefined` \| `string` | `undefined` |

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

▸ `Optional` **resolveGuids**(`guidsMap`): `void`

called on a component with a map of old to new guids (e.g. when instantiate generated new guids and e.g. timeline track bindings needs to remape them)

#### Parameters

| Name | Type |
| :------ | :------ |
| `guidsMap` | `GuidsMap` |

#### Returns

`void`

#### Inherited from

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

▸ **update**(): `void`

#### Returns

`void`

#### Overrides

[Behaviour](Behaviour.md).[update](Behaviour.md#update)

___

### registerWaitForAllowAudio

▸ `Static` **registerWaitForAllowAudio**(`cb`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `cb` | `Function` |

#### Returns

`void`
