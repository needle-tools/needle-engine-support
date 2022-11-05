[com.needle.engine - v2.39.0-pre](../README.md) / Animation

# Class: Animation

## Hierarchy

- [`Behaviour`](Behaviour.md)

  ↳ **`Animation`**

## Table of contents

### Properties

- [gameObject](Animation.md#gameobject)
- [guid](Animation.md#guid)
- [minMaxOffsetNormalized](Animation.md#minmaxoffsetnormalized)
- [minMaxSpeed](Animation.md#minmaxspeed)
- [playAutomatically](Animation.md#playautomatically)
- [randomStartTime](Animation.md#randomstarttime)
- [sourceId](Animation.md#sourceid)

### Accessors

- [actions](Animation.md#actions)
- [activeAndEnabled](Animation.md#activeandenabled)
- [animations](Animation.md#animations)
- [clip](Animation.md#clip)
- [context](Animation.md#context)
- [currentAction](Animation.md#currentaction)
- [currentActions](Animation.md#currentactions)
- [destroyed](Animation.md#destroyed)
- [enabled](Animation.md#enabled)
- [forward](Animation.md#forward)
- [hideFlags](Animation.md#hideflags)
- [isComponent](Animation.md#iscomponent)
- [isPlaying](Animation.md#isplaying)
- [layer](Animation.md#layer)
- [name](Animation.md#name)
- [scene](Animation.md#scene)
- [static](Animation.md#static)
- [tag](Animation.md#tag)
- [worldEuler](Animation.md#worldeuler)
- [worldPosition](Animation.md#worldposition)
- [worldQuaternion](Animation.md#worldquaternion)
- [worldRotation](Animation.md#worldrotation)

### Methods

- [addEventListener](Animation.md#addeventlistener)
- [awake](Animation.md#awake)
- [destroy](Animation.md#destroy)
- [dispatchEvent](Animation.md#dispatchevent)
- [earlyUpdate](Animation.md#earlyupdate)
- [getAction](Animation.md#getaction)
- [init](Animation.md#init)
- [internalOnPlay](Animation.md#internalonplay)
- [lateUpdate](Animation.md#lateupdate)
- [onAfterRender](Animation.md#onafterrender)
- [onBeforeRender](Animation.md#onbeforerender)
- [onCollisionEnter](Animation.md#oncollisionenter)
- [onCollisionExit](Animation.md#oncollisionexit)
- [onCollisionStay](Animation.md#oncollisionstay)
- [onDestroy](Animation.md#ondestroy)
- [onDisable](Animation.md#ondisable)
- [onEnable](Animation.md#onenable)
- [onTriggerEnter](Animation.md#ontriggerenter)
- [onTriggerExit](Animation.md#ontriggerexit)
- [onTriggerStay](Animation.md#ontriggerstay)
- [onValidate](Animation.md#onvalidate)
- [play](Animation.md#play)
- [removeEventListener](Animation.md#removeeventlistener)
- [resolveGuids](Animation.md#resolveguids)
- [setWorldPosition](Animation.md#setworldposition)
- [setWorldQuaternion](Animation.md#setworldquaternion)
- [setWorldRotation](Animation.md#setworldrotation)
- [start](Animation.md#start)
- [startCoroutine](Animation.md#startcoroutine)
- [stopCoroutine](Animation.md#stopcoroutine)
- [update](Animation.md#update)

## Properties

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

### minMaxOffsetNormalized

• `Optional` **minMaxOffsetNormalized**: `Vec2`

___

### minMaxSpeed

• `Optional` **minMaxSpeed**: `Vec2`

___

### playAutomatically

• **playAutomatically**: `boolean` = `true`

___

### randomStartTime

• **randomStartTime**: `boolean` = `true`

___

### sourceId

• `Optional` **sourceId**: `string`

#### Inherited from

[Behaviour](Behaviour.md).[sourceId](Behaviour.md#sourceid)

## Accessors

### actions

• `get` **actions**(): `AnimationAction`[]

#### Returns

`AnimationAction`[]

• `set` **actions**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `AnimationAction`[] |

#### Returns

`void`

___

### activeAndEnabled

• `get` **activeAndEnabled**(): `boolean`

#### Returns

`boolean`

#### Inherited from

Behaviour.activeAndEnabled

___

### animations

• `get` **animations**(): `AnimationClip`[]

#### Returns

`AnimationClip`[]

• `set` **animations**(`animations`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `animations` | `AnimationClip`[] |

#### Returns

`void`

___

### clip

• `get` **clip**(): ``null`` \| `AnimationClip`

#### Returns

``null`` \| `AnimationClip`

• `set` **clip**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | ``null`` \| `AnimationClip` |

#### Returns

`void`

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

### currentAction

• `get` **currentAction**(): ``null`` \| `AnimationAction`

**`Deprecated`**

Currently unsupported

#### Returns

``null`` \| `AnimationAction`

___

### currentActions

• `get` **currentActions**(): `AnimationAction`[]

**`Deprecated`**

Currently unsupported

#### Returns

`AnimationAction`[]

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

### getAction

▸ **getAction**(`name`): `undefined` \| ``null`` \| `AnimationAction`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`undefined` \| ``null`` \| `AnimationAction`

___

### init

▸ **init**(): `void`

#### Returns

`void`

___

### internalOnPlay

▸ **internalOnPlay**(`action`, `options?`): `Promise`<`AnimationAction`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | `AnimationAction` |
| `options?` | `PlayOptions` |

#### Returns

`Promise`<`AnimationAction`\>

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

#### Inherited from

[Behaviour](Behaviour.md).[onDestroy](Behaviour.md#ondestroy)

___

### onDisable

▸ **onDisable**(): `void`

#### Returns

`void`

#### Inherited from

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

### play

▸ **play**(`clipOrNumber`, `options?`): `void` \| `Promise`<`AnimationAction`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `clipOrNumber` | `string` \| `number` \| `AnimationClip` |
| `options?` | `PlayOptions` |

#### Returns

`void` \| `Promise`<`AnimationAction`\>

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

▸ **start**(): `void`

#### Returns

`void`

#### Overrides

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
