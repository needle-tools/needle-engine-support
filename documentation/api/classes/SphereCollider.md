[com.needle.engine - v2.39.0-pre](../README.md) / SphereCollider

# Class: SphereCollider

## Hierarchy

- [`Collider`](Collider.md)

  ↳ **`SphereCollider`**

## Table of contents

### Properties

- [attachedRigidbody](SphereCollider.md#attachedrigidbody)
- [center](SphereCollider.md#center)
- [gameObject](SphereCollider.md#gameobject)
- [guid](SphereCollider.md#guid)
- [isTrigger](SphereCollider.md#istrigger)
- [radius](SphereCollider.md#radius)
- [sourceId](SphereCollider.md#sourceid)

### Accessors

- [activeAndEnabled](SphereCollider.md#activeandenabled)
- [context](SphereCollider.md#context)
- [destroyed](SphereCollider.md#destroyed)
- [enabled](SphereCollider.md#enabled)
- [forward](SphereCollider.md#forward)
- [hideFlags](SphereCollider.md#hideflags)
- [isCollider](SphereCollider.md#iscollider)
- [isComponent](SphereCollider.md#iscomponent)
- [layer](SphereCollider.md#layer)
- [name](SphereCollider.md#name)
- [scene](SphereCollider.md#scene)
- [static](SphereCollider.md#static)
- [tag](SphereCollider.md#tag)
- [worldEuler](SphereCollider.md#worldeuler)
- [worldPosition](SphereCollider.md#worldposition)
- [worldQuaternion](SphereCollider.md#worldquaternion)
- [worldRotation](SphereCollider.md#worldrotation)

### Methods

- [addEventListener](SphereCollider.md#addeventlistener)
- [awake](SphereCollider.md#awake)
- [destroy](SphereCollider.md#destroy)
- [dispatchEvent](SphereCollider.md#dispatchevent)
- [earlyUpdate](SphereCollider.md#earlyupdate)
- [lateUpdate](SphereCollider.md#lateupdate)
- [onAfterRender](SphereCollider.md#onafterrender)
- [onBeforeRender](SphereCollider.md#onbeforerender)
- [onCollisionEnter](SphereCollider.md#oncollisionenter)
- [onCollisionExit](SphereCollider.md#oncollisionexit)
- [onCollisionStay](SphereCollider.md#oncollisionstay)
- [onDestroy](SphereCollider.md#ondestroy)
- [onDisable](SphereCollider.md#ondisable)
- [onEnable](SphereCollider.md#onenable)
- [onTriggerEnter](SphereCollider.md#ontriggerenter)
- [onTriggerExit](SphereCollider.md#ontriggerexit)
- [onTriggerStay](SphereCollider.md#ontriggerstay)
- [onValidate](SphereCollider.md#onvalidate)
- [removeEventListener](SphereCollider.md#removeeventlistener)
- [resolveGuids](SphereCollider.md#resolveguids)
- [setWorldPosition](SphereCollider.md#setworldposition)
- [setWorldQuaternion](SphereCollider.md#setworldquaternion)
- [setWorldRotation](SphereCollider.md#setworldrotation)
- [start](SphereCollider.md#start)
- [startCoroutine](SphereCollider.md#startcoroutine)
- [stopCoroutine](SphereCollider.md#stopcoroutine)
- [update](SphereCollider.md#update)

## Properties

### attachedRigidbody

• **attachedRigidbody**: ``null`` \| [`Rigidbody`](Rigidbody.md) = `null`

#### Inherited from

[Collider](Collider.md).[attachedRigidbody](Collider.md#attachedrigidbody)

___

### center

• **center**: `Vector3`

___

### gameObject

• **gameObject**: [`GameObject`](GameObject.md)

#### Inherited from

[Collider](Collider.md).[gameObject](Collider.md#gameobject)

___

### guid

• **guid**: `string` = `"invalid"`

#### Inherited from

[Collider](Collider.md).[guid](Collider.md#guid)

___

### isTrigger

• **isTrigger**: `boolean` = `false`

#### Inherited from

[Collider](Collider.md).[isTrigger](Collider.md#istrigger)

___

### radius

• **radius**: `number` = `.5`

___

### sourceId

• `Optional` **sourceId**: `string`

#### Inherited from

[Collider](Collider.md).[sourceId](Collider.md#sourceid)

## Accessors

### activeAndEnabled

• `get` **activeAndEnabled**(): `boolean`

#### Returns

`boolean`

#### Inherited from

Collider.activeAndEnabled

___

### context

• `get` **context**(): `Context`

#### Returns

`Context`

#### Inherited from

Collider.context

• `set` **context**(`context`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `Context` |

#### Returns

`void`

#### Inherited from

Collider.context

___

### destroyed

• `get` **destroyed**(): `boolean`

#### Returns

`boolean`

#### Inherited from

Collider.destroyed

___

### enabled

• `get` **enabled**(): `boolean`

#### Returns

`boolean`

#### Inherited from

Collider.enabled

• `set` **enabled**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `boolean` |

#### Returns

`void`

#### Inherited from

Collider.enabled

___

### forward

• `get` **forward**(): `Vector3`

#### Returns

`Vector3`

#### Inherited from

Collider.forward

___

### hideFlags

• `get` **hideFlags**(): [`HideFlags`](../enums/HideFlags.md)

#### Returns

[`HideFlags`](../enums/HideFlags.md)

#### Inherited from

Collider.hideFlags

___

### isCollider

• `get` **isCollider**(): `any`

#### Returns

`any`

#### Inherited from

Collider.isCollider

___

### isComponent

• `get` **isComponent**(): `boolean`

#### Returns

`boolean`

#### Inherited from

Collider.isComponent

___

### layer

• `get` **layer**(): `number`

#### Returns

`number`

#### Inherited from

Collider.layer

___

### name

• `get` **name**(): `string`

#### Returns

`string`

#### Inherited from

Collider.name

• `set` **name**(`str`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`void`

#### Inherited from

Collider.name

___

### scene

• `get` **scene**(): `Scene`

#### Returns

`Scene`

#### Inherited from

Collider.scene

___

### static

• `get` **static**(): `any`

#### Returns

`any`

#### Inherited from

Collider.static

___

### tag

• `get` **tag**(): `string`

#### Returns

`string`

#### Inherited from

Collider.tag

• `set` **tag**(`str`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`void`

#### Inherited from

Collider.tag

___

### worldEuler

• `get` **worldEuler**(): `Euler`

#### Returns

`Euler`

#### Inherited from

Collider.worldEuler

• `set` **worldEuler**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `Euler` |

#### Returns

`void`

#### Inherited from

Collider.worldEuler

___

### worldPosition

• `get` **worldPosition**(): `Vector3`

#### Returns

`Vector3`

#### Inherited from

Collider.worldPosition

• `set` **worldPosition**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `Vector3` |

#### Returns

`void`

#### Inherited from

Collider.worldPosition

___

### worldQuaternion

• `get` **worldQuaternion**(): `Quaternion`

#### Returns

`Quaternion`

#### Inherited from

Collider.worldQuaternion

• `set` **worldQuaternion**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `Quaternion` |

#### Returns

`void`

#### Inherited from

Collider.worldQuaternion

___

### worldRotation

• `get` **worldRotation**(): `Vector3`

#### Returns

`Vector3`

#### Inherited from

Collider.worldRotation

• `set` **worldRotation**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `Vector3` |

#### Returns

`void`

#### Inherited from

Collider.worldRotation

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

[Collider](Collider.md).[addEventListener](Collider.md#addeventlistener)

___

### awake

▸ **awake**(): `void`

called once when the component becomes active for the first time

#### Returns

`void`

#### Inherited from

[Collider](Collider.md).[awake](Collider.md#awake)

___

### destroy

▸ **destroy**(): `void`

#### Returns

`void`

#### Inherited from

[Collider](Collider.md).[destroy](Collider.md#destroy)

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

[Collider](Collider.md).[dispatchEvent](Collider.md#dispatchevent)

___

### earlyUpdate

▸ `Optional` **earlyUpdate**(): `void`

#### Returns

`void`

#### Inherited from

[Collider](Collider.md).[earlyUpdate](Collider.md#earlyupdate)

___

### lateUpdate

▸ `Optional` **lateUpdate**(): `void`

#### Returns

`void`

#### Inherited from

[Collider](Collider.md).[lateUpdate](Collider.md#lateupdate)

___

### onAfterRender

▸ `Optional` **onAfterRender**(): `void`

#### Returns

`void`

#### Inherited from

[Collider](Collider.md).[onAfterRender](Collider.md#onafterrender)

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

[Collider](Collider.md).[onBeforeRender](Collider.md#onbeforerender)

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

[Collider](Collider.md).[onCollisionEnter](Collider.md#oncollisionenter)

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

[Collider](Collider.md).[onCollisionExit](Collider.md#oncollisionexit)

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

[Collider](Collider.md).[onCollisionStay](Collider.md#oncollisionstay)

___

### onDestroy

▸ **onDestroy**(): `void`

#### Returns

`void`

#### Inherited from

[Collider](Collider.md).[onDestroy](Collider.md#ondestroy)

___

### onDisable

▸ **onDisable**(): `void`

#### Returns

`void`

#### Inherited from

[Collider](Collider.md).[onDisable](Collider.md#ondisable)

___

### onEnable

▸ **onEnable**(): `void`

called every time when the component gets enabled (this is invoked after awake and before start)

#### Returns

`void`

#### Overrides

[Collider](Collider.md).[onEnable](Collider.md#onenable)

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

[Collider](Collider.md).[onTriggerEnter](Collider.md#ontriggerenter)

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

[Collider](Collider.md).[onTriggerExit](Collider.md#ontriggerexit)

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

[Collider](Collider.md).[onTriggerStay](Collider.md#ontriggerstay)

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

[Collider](Collider.md).[onValidate](Collider.md#onvalidate)

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

[Collider](Collider.md).[removeEventListener](Collider.md#removeeventlistener)

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

[Collider](Collider.md).[resolveGuids](Collider.md#resolveguids)

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

[Collider](Collider.md).[setWorldPosition](Collider.md#setworldposition)

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

[Collider](Collider.md).[setWorldQuaternion](Collider.md#setworldquaternion)

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

[Collider](Collider.md).[setWorldRotation](Collider.md#setworldrotation)

___

### start

▸ **start**(): `void`

#### Returns

`void`

#### Inherited from

[Collider](Collider.md).[start](Collider.md#start)

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

[Collider](Collider.md).[startCoroutine](Collider.md#startcoroutine)

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

[Collider](Collider.md).[stopCoroutine](Collider.md#stopcoroutine)

___

### update

▸ `Optional` **update**(): `void`

#### Returns

`void`

#### Inherited from

[Collider](Collider.md).[update](Collider.md#update)
