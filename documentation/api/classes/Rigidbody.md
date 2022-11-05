[com.needle.engine - v2.39.0-pre](../README.md) / Rigidbody

# Class: Rigidbody

## Hierarchy

- [`Behaviour`](Behaviour.md)

  ↳ **`Rigidbody`**

## Implements

- `IRigidbody`

## Table of contents

### Properties

- [angularDrag](Rigidbody.md#angulardrag)
- [collisionDetectionMode](Rigidbody.md#collisiondetectionmode)
- [constraints](Rigidbody.md#constraints)
- [detectCollisions](Rigidbody.md#detectcollisions)
- [drag](Rigidbody.md#drag)
- [gameObject](Rigidbody.md#gameobject)
- [guid](Rigidbody.md#guid)
- [isKinematic](Rigidbody.md#iskinematic)
- [mass](Rigidbody.md#mass)
- [sleepThreshold](Rigidbody.md#sleepthreshold)
- [sourceId](Rigidbody.md#sourceid)
- [useGravity](Rigidbody.md#usegravity)

### Accessors

- [activeAndEnabled](Rigidbody.md#activeandenabled)
- [context](Rigidbody.md#context)
- [destroyed](Rigidbody.md#destroyed)
- [enabled](Rigidbody.md#enabled)
- [forward](Rigidbody.md#forward)
- [hideFlags](Rigidbody.md#hideflags)
- [isComponent](Rigidbody.md#iscomponent)
- [layer](Rigidbody.md#layer)
- [lockPositionX](Rigidbody.md#lockpositionx)
- [lockPositionY](Rigidbody.md#lockpositiony)
- [lockPositionZ](Rigidbody.md#lockpositionz)
- [lockRotationX](Rigidbody.md#lockrotationx)
- [lockRotationY](Rigidbody.md#lockrotationy)
- [lockRotationZ](Rigidbody.md#lockrotationz)
- [name](Rigidbody.md#name)
- [scene](Rigidbody.md#scene)
- [smoothedVelocity](Rigidbody.md#smoothedvelocity)
- [static](Rigidbody.md#static)
- [tag](Rigidbody.md#tag)
- [worldEuler](Rigidbody.md#worldeuler)
- [worldPosition](Rigidbody.md#worldposition)
- [worldQuaternion](Rigidbody.md#worldquaternion)
- [worldRotation](Rigidbody.md#worldrotation)

### Methods

- [addEventListener](Rigidbody.md#addeventlistener)
- [applyForce](Rigidbody.md#applyforce)
- [applyImpulse](Rigidbody.md#applyimpulse)
- [awake](Rigidbody.md#awake)
- [beforePhysics](Rigidbody.md#beforephysics)
- [destroy](Rigidbody.md#destroy)
- [dispatchEvent](Rigidbody.md#dispatchevent)
- [earlyUpdate](Rigidbody.md#earlyupdate)
- [getVelocity](Rigidbody.md#getvelocity)
- [lateUpdate](Rigidbody.md#lateupdate)
- [onAfterRender](Rigidbody.md#onafterrender)
- [onBeforeRender](Rigidbody.md#onbeforerender)
- [onCollisionEnter](Rigidbody.md#oncollisionenter)
- [onCollisionExit](Rigidbody.md#oncollisionexit)
- [onCollisionStay](Rigidbody.md#oncollisionstay)
- [onDestroy](Rigidbody.md#ondestroy)
- [onDisable](Rigidbody.md#ondisable)
- [onEnable](Rigidbody.md#onenable)
- [onTriggerEnter](Rigidbody.md#ontriggerenter)
- [onTriggerExit](Rigidbody.md#ontriggerexit)
- [onTriggerStay](Rigidbody.md#ontriggerstay)
- [onValidate](Rigidbody.md#onvalidate)
- [removeEventListener](Rigidbody.md#removeeventlistener)
- [resetForces](Rigidbody.md#resetforces)
- [resetForcesAndTorques](Rigidbody.md#resetforcesandtorques)
- [resetTorques](Rigidbody.md#resettorques)
- [resetVelocities](Rigidbody.md#resetvelocities)
- [resolveGuids](Rigidbody.md#resolveguids)
- [setAngularVelocity](Rigidbody.md#setangularvelocity)
- [setBodyFromGameObject](Rigidbody.md#setbodyfromgameobject)
- [setForce](Rigidbody.md#setforce)
- [setTorque](Rigidbody.md#settorque)
- [setVelocity](Rigidbody.md#setvelocity)
- [setWorldPosition](Rigidbody.md#setworldposition)
- [setWorldQuaternion](Rigidbody.md#setworldquaternion)
- [setWorldRotation](Rigidbody.md#setworldrotation)
- [start](Rigidbody.md#start)
- [startCoroutine](Rigidbody.md#startcoroutine)
- [stopCoroutine](Rigidbody.md#stopcoroutine)
- [teleport](Rigidbody.md#teleport)
- [update](Rigidbody.md#update)
- [wakeUp](Rigidbody.md#wakeup)

## Properties

### angularDrag

• **angularDrag**: `number` = `1`

#### Implementation of

IRigidbody.angularDrag

___

### collisionDetectionMode

• **collisionDetectionMode**: `CollisionDetectionMode` = `CollisionDetectionMode.Discrete`

#### Implementation of

IRigidbody.collisionDetectionMode

___

### constraints

• **constraints**: `RigidbodyConstraints` = `RigidbodyConstraints.None`

#### Implementation of

IRigidbody.constraints

___

### detectCollisions

• **detectCollisions**: `boolean` = `true`

___

### drag

• **drag**: `number` = `0`

#### Implementation of

IRigidbody.drag

___

### gameObject

• **gameObject**: [`GameObject`](GameObject.md)

#### Implementation of

IRigidbody.gameObject

#### Inherited from

[Behaviour](Behaviour.md).[gameObject](Behaviour.md#gameobject)

___

### guid

• **guid**: `string` = `"invalid"`

#### Implementation of

IRigidbody.guid

#### Inherited from

[Behaviour](Behaviour.md).[guid](Behaviour.md#guid)

___

### isKinematic

• **isKinematic**: `boolean` = `false`

#### Implementation of

IRigidbody.isKinematic

___

### mass

• **mass**: `number` = `1`

#### Implementation of

IRigidbody.mass

___

### sleepThreshold

• **sleepThreshold**: `number` = `0.01`

___

### sourceId

• `Optional` **sourceId**: `string`

#### Implementation of

IRigidbody.sourceId

#### Inherited from

[Behaviour](Behaviour.md).[sourceId](Behaviour.md#sourceid)

___

### useGravity

• **useGravity**: `boolean` = `true`

#### Implementation of

IRigidbody.useGravity

## Accessors

### activeAndEnabled

• `get` **activeAndEnabled**(): `boolean`

#### Returns

`boolean`

#### Implementation of

IRigidbody.activeAndEnabled

#### Inherited from

Behaviour.activeAndEnabled

___

### context

• `get` **context**(): `Context`

#### Returns

`Context`

#### Implementation of

IRigidbody.context

#### Inherited from

Behaviour.context

• `set` **context**(`context`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `Context` |

#### Returns

`void`

#### Implementation of

IRigidbody.context

#### Inherited from

Behaviour.context

___

### destroyed

• `get` **destroyed**(): `boolean`

#### Returns

`boolean`

#### Implementation of

IRigidbody.destroyed

#### Inherited from

Behaviour.destroyed

___

### enabled

• `get` **enabled**(): `boolean`

#### Returns

`boolean`

#### Implementation of

IRigidbody.enabled

#### Inherited from

Behaviour.enabled

• `set` **enabled**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `boolean` |

#### Returns

`void`

#### Implementation of

IRigidbody.enabled

#### Inherited from

Behaviour.enabled

___

### forward

• `get` **forward**(): `Vector3`

#### Returns

`Vector3`

#### Implementation of

IRigidbody.forward

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

#### Implementation of

IRigidbody.isComponent

#### Inherited from

Behaviour.isComponent

___

### layer

• `get` **layer**(): `number`

#### Returns

`number`

#### Implementation of

IRigidbody.layer

#### Inherited from

Behaviour.layer

___

### lockPositionX

• `get` **lockPositionX**(): `boolean`

#### Returns

`boolean`

#### Implementation of

IRigidbody.lockPositionX

• `set` **lockPositionX**(`v`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `boolean` |

#### Returns

`void`

#### Implementation of

IRigidbody.lockPositionX

___

### lockPositionY

• `get` **lockPositionY**(): `boolean`

#### Returns

`boolean`

#### Implementation of

IRigidbody.lockPositionY

• `set` **lockPositionY**(`v`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `boolean` |

#### Returns

`void`

#### Implementation of

IRigidbody.lockPositionY

___

### lockPositionZ

• `get` **lockPositionZ**(): `boolean`

#### Returns

`boolean`

#### Implementation of

IRigidbody.lockPositionZ

• `set` **lockPositionZ**(`v`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `boolean` |

#### Returns

`void`

#### Implementation of

IRigidbody.lockPositionZ

___

### lockRotationX

• `get` **lockRotationX**(): `boolean`

#### Returns

`boolean`

#### Implementation of

IRigidbody.lockRotationX

• `set` **lockRotationX**(`v`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `boolean` |

#### Returns

`void`

#### Implementation of

IRigidbody.lockRotationX

___

### lockRotationY

• `get` **lockRotationY**(): `boolean`

#### Returns

`boolean`

#### Implementation of

IRigidbody.lockRotationY

• `set` **lockRotationY**(`v`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `boolean` |

#### Returns

`void`

#### Implementation of

IRigidbody.lockRotationY

___

### lockRotationZ

• `get` **lockRotationZ**(): `boolean`

#### Returns

`boolean`

#### Implementation of

IRigidbody.lockRotationZ

• `set` **lockRotationZ**(`v`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `boolean` |

#### Returns

`void`

#### Implementation of

IRigidbody.lockRotationZ

___

### name

• `get` **name**(): `string`

#### Returns

`string`

#### Implementation of

IRigidbody.name

#### Inherited from

Behaviour.name

• `set` **name**(`str`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`void`

#### Implementation of

IRigidbody.name

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

### smoothedVelocity

• `get` **smoothedVelocity**(): `Vector3`

#### Returns

`Vector3`

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

#### Implementation of

IRigidbody.tag

#### Inherited from

Behaviour.tag

• `set` **tag**(`str`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`void`

#### Implementation of

IRigidbody.tag

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

#### Implementation of

IRigidbody.worldPosition

#### Inherited from

Behaviour.worldPosition

• `set` **worldPosition**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `Vector3` |

#### Returns

`void`

#### Implementation of

IRigidbody.worldPosition

#### Inherited from

Behaviour.worldPosition

___

### worldQuaternion

• `get` **worldQuaternion**(): `Quaternion`

#### Returns

`Quaternion`

#### Implementation of

IRigidbody.worldQuaternion

#### Inherited from

Behaviour.worldQuaternion

• `set` **worldQuaternion**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `Quaternion` |

#### Returns

`void`

#### Implementation of

IRigidbody.worldQuaternion

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

### applyForce

▸ **applyForce**(`vec`, `_rel?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `vec` | `Vector3` |
| `_rel?` | `Vector3` |

#### Returns

`void`

___

### applyImpulse

▸ **applyImpulse**(`vec`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `vec` | `Vector3` |

#### Returns

`void`

___

### awake

▸ **awake**(): `void`

called once when the component becomes active for the first time

#### Returns

`void`

#### Implementation of

IRigidbody.awake

#### Overrides

[Behaviour](Behaviour.md).[awake](Behaviour.md#awake)

___

### beforePhysics

▸ **beforePhysics**(): `Generator`<`undefined`, `void`, `unknown`\>

#### Returns

`Generator`<`undefined`, `void`, `unknown`\>

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

#### Implementation of

IRigidbody.earlyUpdate

#### Inherited from

[Behaviour](Behaviour.md).[earlyUpdate](Behaviour.md#earlyupdate)

___

### getVelocity

▸ **getVelocity**(): `Vector3`

#### Returns

`Vector3`

___

### lateUpdate

▸ `Optional` **lateUpdate**(): `void`

#### Returns

`void`

#### Implementation of

IRigidbody.lateUpdate

#### Inherited from

[Behaviour](Behaviour.md).[lateUpdate](Behaviour.md#lateupdate)

___

### onAfterRender

▸ `Optional` **onAfterRender**(): `void`

#### Returns

`void`

#### Implementation of

IRigidbody.onAfterRender

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

#### Implementation of

IRigidbody.onBeforeRender

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

#### Implementation of

IRigidbody.onCollisionEnter

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

#### Implementation of

IRigidbody.onCollisionExit

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

#### Implementation of

IRigidbody.onCollisionStay

#### Inherited from

[Behaviour](Behaviour.md).[onCollisionStay](Behaviour.md#oncollisionstay)

___

### onDestroy

▸ **onDestroy**(): `void`

#### Returns

`void`

#### Implementation of

IRigidbody.onDestroy

#### Overrides

[Behaviour](Behaviour.md).[onDestroy](Behaviour.md#ondestroy)

___

### onDisable

▸ **onDisable**(): `void`

#### Returns

`void`

#### Implementation of

IRigidbody.onDisable

#### Overrides

[Behaviour](Behaviour.md).[onDisable](Behaviour.md#ondisable)

___

### onEnable

▸ **onEnable**(): `void`

called every time when the component gets enabled (this is invoked after awake and before start)

#### Returns

`void`

#### Implementation of

IRigidbody.onEnable

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

#### Implementation of

IRigidbody.onTriggerEnter

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

#### Implementation of

IRigidbody.onTriggerExit

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

#### Implementation of

IRigidbody.onTriggerStay

#### Inherited from

[Behaviour](Behaviour.md).[onTriggerStay](Behaviour.md#ontriggerstay)

___

### onValidate

▸ **onValidate**(): `void`

called when you decorate fields with the @validate() decorator

#### Returns

`void`

#### Implementation of

IRigidbody.onValidate

#### Overrides

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

### resetForces

▸ **resetForces**(): `void`

#### Returns

`void`

___

### resetForcesAndTorques

▸ **resetForcesAndTorques**(): `void`

#### Returns

`void`

___

### resetTorques

▸ **resetTorques**(): `void`

#### Returns

`void`

___

### resetVelocities

▸ **resetVelocities**(): `void`

#### Returns

`void`

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

#### Implementation of

IRigidbody.resolveGuids

#### Inherited from

[Behaviour](Behaviour.md).[resolveGuids](Behaviour.md#resolveguids)

___

### setAngularVelocity

▸ **setAngularVelocity**(`x`, `y?`, `z?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` \| `Vector3` |
| `y?` | `number` |
| `z?` | `number` |

#### Returns

`void`

___

### setBodyFromGameObject

▸ **setBodyFromGameObject**(`_velocity?`): `void`

d

**`Deprecated`**

not used anymore

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `_velocity` | ``null`` \| `Vector3` \| { `x`: `number` ; `y`: `number` ; `z`: `number`  } | `null` |

#### Returns

`void`

___

### setForce

▸ **setForce**(`x`, `y`, `z`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `z` | `number` |

#### Returns

`void`

___

### setTorque

▸ **setTorque**(`x`, `y`, `z`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` \| `Vector3` |
| `y` | `number` |
| `z` | `number` |

#### Returns

`void`

___

### setVelocity

▸ **setVelocity**(`x`, `y?`, `z?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` \| `Vector3` |
| `y?` | `number` |
| `z?` | `number` |

#### Returns

`void`

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

#### Implementation of

IRigidbody.start

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

### teleport

▸ **teleport**(`pt`, `localspace?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `pt` | `Object` | `undefined` |
| `pt.x` | `number` | `undefined` |
| `pt.y` | `number` | `undefined` |
| `pt.z` | `number` | `undefined` |
| `localspace` | `boolean` | `true` |

#### Returns

`void`

___

### update

▸ `Optional` **update**(): `void`

#### Returns

`void`

#### Implementation of

IRigidbody.update

#### Inherited from

[Behaviour](Behaviour.md).[update](Behaviour.md#update)

___

### wakeUp

▸ **wakeUp**(): `void`

#### Returns

`void`
