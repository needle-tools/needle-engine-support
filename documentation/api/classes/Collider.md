[com.needle.engine - v2.39.0-pre](../README.md) / Collider

# Class: Collider

## Hierarchy

- [`Behaviour`](Behaviour.md)

  ↳ **`Collider`**

  ↳↳ [`SphereCollider`](SphereCollider.md)

  ↳↳ [`BoxCollider`](BoxCollider.md)

  ↳↳ [`MeshCollider`](MeshCollider.md)

  ↳↳ [`CapsuleCollider`](CapsuleCollider.md)

## Implements

- `ICollider`

## Table of contents

### Properties

- [attachedRigidbody](Collider.md#attachedrigidbody)
- [gameObject](Collider.md#gameobject)
- [guid](Collider.md#guid)
- [isTrigger](Collider.md#istrigger)
- [sourceId](Collider.md#sourceid)

### Accessors

- [activeAndEnabled](Collider.md#activeandenabled)
- [context](Collider.md#context)
- [destroyed](Collider.md#destroyed)
- [enabled](Collider.md#enabled)
- [forward](Collider.md#forward)
- [hideFlags](Collider.md#hideflags)
- [isCollider](Collider.md#iscollider)
- [isComponent](Collider.md#iscomponent)
- [layer](Collider.md#layer)
- [name](Collider.md#name)
- [scene](Collider.md#scene)
- [static](Collider.md#static)
- [tag](Collider.md#tag)
- [worldEuler](Collider.md#worldeuler)
- [worldPosition](Collider.md#worldposition)
- [worldQuaternion](Collider.md#worldquaternion)
- [worldRotation](Collider.md#worldrotation)

### Methods

- [addEventListener](Collider.md#addeventlistener)
- [awake](Collider.md#awake)
- [destroy](Collider.md#destroy)
- [dispatchEvent](Collider.md#dispatchevent)
- [earlyUpdate](Collider.md#earlyupdate)
- [lateUpdate](Collider.md#lateupdate)
- [onAfterRender](Collider.md#onafterrender)
- [onBeforeRender](Collider.md#onbeforerender)
- [onCollisionEnter](Collider.md#oncollisionenter)
- [onCollisionExit](Collider.md#oncollisionexit)
- [onCollisionStay](Collider.md#oncollisionstay)
- [onDestroy](Collider.md#ondestroy)
- [onDisable](Collider.md#ondisable)
- [onEnable](Collider.md#onenable)
- [onTriggerEnter](Collider.md#ontriggerenter)
- [onTriggerExit](Collider.md#ontriggerexit)
- [onTriggerStay](Collider.md#ontriggerstay)
- [onValidate](Collider.md#onvalidate)
- [removeEventListener](Collider.md#removeeventlistener)
- [resolveGuids](Collider.md#resolveguids)
- [setWorldPosition](Collider.md#setworldposition)
- [setWorldQuaternion](Collider.md#setworldquaternion)
- [setWorldRotation](Collider.md#setworldrotation)
- [start](Collider.md#start)
- [startCoroutine](Collider.md#startcoroutine)
- [stopCoroutine](Collider.md#stopcoroutine)
- [update](Collider.md#update)

## Properties

### attachedRigidbody

• **attachedRigidbody**: ``null`` \| [`Rigidbody`](Rigidbody.md) = `null`

#### Implementation of

ICollider.attachedRigidbody

___

### gameObject

• **gameObject**: [`GameObject`](GameObject.md)

#### Implementation of

ICollider.gameObject

#### Inherited from

[Behaviour](Behaviour.md).[gameObject](Behaviour.md#gameobject)

___

### guid

• **guid**: `string` = `"invalid"`

#### Implementation of

ICollider.guid

#### Inherited from

[Behaviour](Behaviour.md).[guid](Behaviour.md#guid)

___

### isTrigger

• **isTrigger**: `boolean` = `false`

#### Implementation of

ICollider.isTrigger

___

### sourceId

• `Optional` **sourceId**: `string`

#### Implementation of

ICollider.sourceId

#### Inherited from

[Behaviour](Behaviour.md).[sourceId](Behaviour.md#sourceid)

## Accessors

### activeAndEnabled

• `get` **activeAndEnabled**(): `boolean`

#### Returns

`boolean`

#### Implementation of

ICollider.activeAndEnabled

#### Inherited from

Behaviour.activeAndEnabled

___

### context

• `get` **context**(): `Context`

#### Returns

`Context`

#### Implementation of

ICollider.context

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

ICollider.context

#### Inherited from

Behaviour.context

___

### destroyed

• `get` **destroyed**(): `boolean`

#### Returns

`boolean`

#### Implementation of

ICollider.destroyed

#### Inherited from

Behaviour.destroyed

___

### enabled

• `get` **enabled**(): `boolean`

#### Returns

`boolean`

#### Implementation of

ICollider.enabled

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

ICollider.enabled

#### Inherited from

Behaviour.enabled

___

### forward

• `get` **forward**(): `Vector3`

#### Returns

`Vector3`

#### Implementation of

ICollider.forward

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

### isCollider

• `get` **isCollider**(): `any`

#### Returns

`any`

#### Implementation of

ICollider.isCollider

___

### isComponent

• `get` **isComponent**(): `boolean`

#### Returns

`boolean`

#### Implementation of

ICollider.isComponent

#### Inherited from

Behaviour.isComponent

___

### layer

• `get` **layer**(): `number`

#### Returns

`number`

#### Implementation of

ICollider.layer

#### Inherited from

Behaviour.layer

___

### name

• `get` **name**(): `string`

#### Returns

`string`

#### Implementation of

ICollider.name

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

ICollider.name

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

#### Implementation of

ICollider.tag

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

ICollider.tag

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

ICollider.worldPosition

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

ICollider.worldPosition

#### Inherited from

Behaviour.worldPosition

___

### worldQuaternion

• `get` **worldQuaternion**(): `Quaternion`

#### Returns

`Quaternion`

#### Implementation of

ICollider.worldQuaternion

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

ICollider.worldQuaternion

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

#### Implementation of

ICollider.awake

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

#### Implementation of

ICollider.earlyUpdate

#### Inherited from

[Behaviour](Behaviour.md).[earlyUpdate](Behaviour.md#earlyupdate)

___

### lateUpdate

▸ `Optional` **lateUpdate**(): `void`

#### Returns

`void`

#### Implementation of

ICollider.lateUpdate

#### Inherited from

[Behaviour](Behaviour.md).[lateUpdate](Behaviour.md#lateupdate)

___

### onAfterRender

▸ `Optional` **onAfterRender**(): `void`

#### Returns

`void`

#### Implementation of

ICollider.onAfterRender

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

ICollider.onBeforeRender

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

ICollider.onCollisionEnter

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

ICollider.onCollisionExit

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

ICollider.onCollisionStay

#### Inherited from

[Behaviour](Behaviour.md).[onCollisionStay](Behaviour.md#oncollisionstay)

___

### onDestroy

▸ **onDestroy**(): `void`

#### Returns

`void`

#### Implementation of

ICollider.onDestroy

#### Inherited from

[Behaviour](Behaviour.md).[onDestroy](Behaviour.md#ondestroy)

___

### onDisable

▸ **onDisable**(): `void`

#### Returns

`void`

#### Implementation of

ICollider.onDisable

#### Overrides

[Behaviour](Behaviour.md).[onDisable](Behaviour.md#ondisable)

___

### onEnable

▸ **onEnable**(): `void`

called every time when the component gets enabled (this is invoked after awake and before start)

#### Returns

`void`

#### Implementation of

ICollider.onEnable

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

ICollider.onTriggerEnter

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

ICollider.onTriggerExit

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

ICollider.onTriggerStay

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

#### Implementation of

ICollider.onValidate

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

#### Implementation of

ICollider.resolveGuids

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

#### Implementation of

ICollider.start

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

▸ `Optional` **update**(): `void`

#### Returns

`void`

#### Implementation of

ICollider.update

#### Inherited from

[Behaviour](Behaviour.md).[update](Behaviour.md#update)
