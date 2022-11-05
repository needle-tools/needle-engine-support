[com.needle.engine - v2.39.0-pre](../README.md) / Animator

# Class: Animator

## Hierarchy

- [`Behaviour`](Behaviour.md)

  ↳ **`Animator`**

## Table of contents

### Properties

- [applyRootMotion](Animator.md#applyrootmotion)
- [gameObject](Animator.md#gameobject)
- [guid](Animator.md#guid)
- [hasRootMotion](Animator.md#hasrootmotion)
- [keepAnimatorControllerStateOnDisable](Animator.md#keepanimatorcontrollerstateondisable)
- [sourceId](Animator.md#sourceid)

### Accessors

- [activeAndEnabled](Animator.md#activeandenabled)
- [context](Animator.md#context)
- [destroyed](Animator.md#destroyed)
- [enabled](Animator.md#enabled)
- [forward](Animator.md#forward)
- [hideFlags](Animator.md#hideflags)
- [isComponent](Animator.md#iscomponent)
- [layer](Animator.md#layer)
- [minMaxOffsetNormalized](Animator.md#minmaxoffsetnormalized)
- [minMaxSpeed](Animator.md#minmaxspeed)
- [name](Animator.md#name)
- [runtimeAnimatorController](Animator.md#runtimeanimatorcontroller)
- [scene](Animator.md#scene)
- [static](Animator.md#static)
- [tag](Animator.md#tag)
- [worldEuler](Animator.md#worldeuler)
- [worldPosition](Animator.md#worldposition)
- [worldQuaternion](Animator.md#worldquaternion)
- [worldRotation](Animator.md#worldrotation)

### Methods

- [GetBool](Animator.md#getbool)
- [GetFloat](Animator.md#getfloat)
- [GetInteger](Animator.md#getinteger)
- [IsInTransition](Animator.md#isintransition)
- [Play](Animator.md#play)
- [Reset](Animator.md#reset)
- [ResetTrigger](Animator.md#resettrigger)
- [SetBool](Animator.md#setbool)
- [SetFloat](Animator.md#setfloat)
- [SetInteger](Animator.md#setinteger)
- [SetSpeed](Animator.md#setspeed)
- [SetTrigger](Animator.md#settrigger)
- [addEventListener](Animator.md#addeventlistener)
- [awake](Animator.md#awake)
- [destroy](Animator.md#destroy)
- [dispatchEvent](Animator.md#dispatchevent)
- [earlyUpdate](Animator.md#earlyupdate)
- [lateUpdate](Animator.md#lateupdate)
- [onAfterRender](Animator.md#onafterrender)
- [onBeforeRender](Animator.md#onbeforerender)
- [onCollisionEnter](Animator.md#oncollisionenter)
- [onCollisionExit](Animator.md#oncollisionexit)
- [onCollisionStay](Animator.md#oncollisionstay)
- [onDestroy](Animator.md#ondestroy)
- [onDisable](Animator.md#ondisable)
- [onEnable](Animator.md#onenable)
- [onTriggerEnter](Animator.md#ontriggerenter)
- [onTriggerExit](Animator.md#ontriggerexit)
- [onTriggerStay](Animator.md#ontriggerstay)
- [onValidate](Animator.md#onvalidate)
- [removeEventListener](Animator.md#removeeventlistener)
- [resolveGuids](Animator.md#resolveguids)
- [setWorldPosition](Animator.md#setworldposition)
- [setWorldQuaternion](Animator.md#setworldquaternion)
- [setWorldRotation](Animator.md#setworldrotation)
- [start](Animator.md#start)
- [startCoroutine](Animator.md#startcoroutine)
- [stopCoroutine](Animator.md#stopcoroutine)
- [update](Animator.md#update)

## Properties

### applyRootMotion

• **applyRootMotion**: `boolean` = `false`

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

### hasRootMotion

• **hasRootMotion**: `boolean` = `false`

___

### keepAnimatorControllerStateOnDisable

• **keepAnimatorControllerStateOnDisable**: `boolean` = `false`

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

### layer

• `get` **layer**(): `number`

#### Returns

`number`

#### Inherited from

Behaviour.layer

___

### minMaxOffsetNormalized

• `set` **minMaxOffsetNormalized**(`minMax`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `minMax` | `Object` |
| `minMax.x` | `number` |
| `minMax.y` | `number` |

#### Returns

`void`

___

### minMaxSpeed

• `set` **minMaxSpeed**(`minMax`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `minMax` | `Object` |
| `minMax.x` | `number` |
| `minMax.y` | `number` |

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

### runtimeAnimatorController

• `get` **runtimeAnimatorController**(): `undefined` \| ``null`` \| [`AnimatorController`](AnimatorController.md)

#### Returns

`undefined` \| ``null`` \| [`AnimatorController`](AnimatorController.md)

• `set` **runtimeAnimatorController**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `undefined` \| ``null`` \| [`AnimatorController`](AnimatorController.md) \| `AnimatorControllerModel` |

#### Returns

`void`

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

▸ **Play**(`name`, `layer?`, `normalizedTime?`, `transitionDurationInSec?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `name` | `string` \| `number` | `undefined` |
| `layer` | `number` | `-1` |
| `normalizedTime` | `number` | `Number.NEGATIVE_INFINITY` |
| `transitionDurationInSec` | `number` | `0` |

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

▸ **onBeforeRender**(): `void`

#### Returns

`void`

#### Overrides

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

#### Overrides

[Behaviour](Behaviour.md).[onDisable](Behaviour.md#ondisable)

___

### onEnable

▸ **onEnable**(): `void`

called every time when the component gets enabled (this is invoked after awake and before start)

#### Returns

`void`

#### Inherited from

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
