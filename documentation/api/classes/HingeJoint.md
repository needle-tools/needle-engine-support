[com.needle.engine - v2.39.0-pre](../README.md) / HingeJoint

# Class: HingeJoint

## Hierarchy

- `Joint`

  ↳ **`HingeJoint`**

## Table of contents

### Properties

- [anchor](HingeJoint.md#anchor)
- [axis](HingeJoint.md#axis)
- [connectedBody](HingeJoint.md#connectedbody)
- [gameObject](HingeJoint.md#gameobject)
- [guid](HingeJoint.md#guid)
- [sourceId](HingeJoint.md#sourceid)

### Accessors

- [activeAndEnabled](HingeJoint.md#activeandenabled)
- [context](HingeJoint.md#context)
- [destroyed](HingeJoint.md#destroyed)
- [enabled](HingeJoint.md#enabled)
- [forward](HingeJoint.md#forward)
- [hideFlags](HingeJoint.md#hideflags)
- [isComponent](HingeJoint.md#iscomponent)
- [layer](HingeJoint.md#layer)
- [name](HingeJoint.md#name)
- [rigidBody](HingeJoint.md#rigidbody)
- [scene](HingeJoint.md#scene)
- [static](HingeJoint.md#static)
- [tag](HingeJoint.md#tag)
- [worldEuler](HingeJoint.md#worldeuler)
- [worldPosition](HingeJoint.md#worldposition)
- [worldQuaternion](HingeJoint.md#worldquaternion)
- [worldRotation](HingeJoint.md#worldrotation)

### Methods

- [addEventListener](HingeJoint.md#addeventlistener)
- [awake](HingeJoint.md#awake)
- [destroy](HingeJoint.md#destroy)
- [dispatchEvent](HingeJoint.md#dispatchevent)
- [earlyUpdate](HingeJoint.md#earlyupdate)
- [lateUpdate](HingeJoint.md#lateupdate)
- [onAfterRender](HingeJoint.md#onafterrender)
- [onBeforeRender](HingeJoint.md#onbeforerender)
- [onCollisionEnter](HingeJoint.md#oncollisionenter)
- [onCollisionExit](HingeJoint.md#oncollisionexit)
- [onCollisionStay](HingeJoint.md#oncollisionstay)
- [onDestroy](HingeJoint.md#ondestroy)
- [onDisable](HingeJoint.md#ondisable)
- [onEnable](HingeJoint.md#onenable)
- [onTriggerEnter](HingeJoint.md#ontriggerenter)
- [onTriggerExit](HingeJoint.md#ontriggerexit)
- [onTriggerStay](HingeJoint.md#ontriggerstay)
- [onValidate](HingeJoint.md#onvalidate)
- [removeEventListener](HingeJoint.md#removeeventlistener)
- [resolveGuids](HingeJoint.md#resolveguids)
- [setWorldPosition](HingeJoint.md#setworldposition)
- [setWorldQuaternion](HingeJoint.md#setworldquaternion)
- [setWorldRotation](HingeJoint.md#setworldrotation)
- [start](HingeJoint.md#start)
- [startCoroutine](HingeJoint.md#startcoroutine)
- [stopCoroutine](HingeJoint.md#stopcoroutine)
- [update](HingeJoint.md#update)

## Properties

### anchor

• `Optional` **anchor**: `Vector3`

___

### axis

• `Optional` **axis**: `Vector3`

___

### connectedBody

• `Optional` **connectedBody**: [`Rigidbody`](Rigidbody.md)

#### Inherited from

Joint.connectedBody

___

### gameObject

• **gameObject**: [`GameObject`](GameObject.md)

#### Inherited from

Joint.gameObject

___

### guid

• **guid**: `string` = `"invalid"`

#### Inherited from

Joint.guid

___

### sourceId

• `Optional` **sourceId**: `string`

#### Inherited from

Joint.sourceId

## Accessors

### activeAndEnabled

• `get` **activeAndEnabled**(): `boolean`

#### Returns

`boolean`

#### Inherited from

Joint.activeAndEnabled

___

### context

• `get` **context**(): `Context`

#### Returns

`Context`

#### Inherited from

Joint.context

• `set` **context**(`context`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `Context` |

#### Returns

`void`

#### Inherited from

Joint.context

___

### destroyed

• `get` **destroyed**(): `boolean`

#### Returns

`boolean`

#### Inherited from

Joint.destroyed

___

### enabled

• `get` **enabled**(): `boolean`

#### Returns

`boolean`

#### Inherited from

Joint.enabled

• `set` **enabled**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `boolean` |

#### Returns

`void`

#### Inherited from

Joint.enabled

___

### forward

• `get` **forward**(): `Vector3`

#### Returns

`Vector3`

#### Inherited from

Joint.forward

___

### hideFlags

• `get` **hideFlags**(): [`HideFlags`](../enums/HideFlags.md)

#### Returns

[`HideFlags`](../enums/HideFlags.md)

#### Inherited from

Joint.hideFlags

___

### isComponent

• `get` **isComponent**(): `boolean`

#### Returns

`boolean`

#### Inherited from

Joint.isComponent

___

### layer

• `get` **layer**(): `number`

#### Returns

`number`

#### Inherited from

Joint.layer

___

### name

• `get` **name**(): `string`

#### Returns

`string`

#### Inherited from

Joint.name

• `set` **name**(`str`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`void`

#### Inherited from

Joint.name

___

### rigidBody

• `get` **rigidBody**(): ``null`` \| [`Rigidbody`](Rigidbody.md)

#### Returns

``null`` \| [`Rigidbody`](Rigidbody.md)

#### Inherited from

Joint.rigidBody

___

### scene

• `get` **scene**(): `Scene`

#### Returns

`Scene`

#### Inherited from

Joint.scene

___

### static

• `get` **static**(): `any`

#### Returns

`any`

#### Inherited from

Joint.static

___

### tag

• `get` **tag**(): `string`

#### Returns

`string`

#### Inherited from

Joint.tag

• `set` **tag**(`str`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`void`

#### Inherited from

Joint.tag

___

### worldEuler

• `get` **worldEuler**(): `Euler`

#### Returns

`Euler`

#### Inherited from

Joint.worldEuler

• `set` **worldEuler**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `Euler` |

#### Returns

`void`

#### Inherited from

Joint.worldEuler

___

### worldPosition

• `get` **worldPosition**(): `Vector3`

#### Returns

`Vector3`

#### Inherited from

Joint.worldPosition

• `set` **worldPosition**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `Vector3` |

#### Returns

`void`

#### Inherited from

Joint.worldPosition

___

### worldQuaternion

• `get` **worldQuaternion**(): `Quaternion`

#### Returns

`Quaternion`

#### Inherited from

Joint.worldQuaternion

• `set` **worldQuaternion**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `Quaternion` |

#### Returns

`void`

#### Inherited from

Joint.worldQuaternion

___

### worldRotation

• `get` **worldRotation**(): `Vector3`

#### Returns

`Vector3`

#### Inherited from

Joint.worldRotation

• `set` **worldRotation**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `Vector3` |

#### Returns

`void`

#### Inherited from

Joint.worldRotation

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

Joint.addEventListener

___

### awake

▸ **awake**(): `void`

called once when the component becomes active for the first time

#### Returns

`void`

#### Inherited from

Joint.awake

___

### destroy

▸ **destroy**(): `void`

#### Returns

`void`

#### Inherited from

Joint.destroy

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

Joint.dispatchEvent

___

### earlyUpdate

▸ `Optional` **earlyUpdate**(): `void`

#### Returns

`void`

#### Inherited from

Joint.earlyUpdate

___

### lateUpdate

▸ `Optional` **lateUpdate**(): `void`

#### Returns

`void`

#### Inherited from

Joint.lateUpdate

___

### onAfterRender

▸ `Optional` **onAfterRender**(): `void`

#### Returns

`void`

#### Inherited from

Joint.onAfterRender

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

Joint.onBeforeRender

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

Joint.onCollisionEnter

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

Joint.onCollisionExit

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

Joint.onCollisionStay

___

### onDestroy

▸ **onDestroy**(): `void`

#### Returns

`void`

#### Inherited from

Joint.onDestroy

___

### onDisable

▸ **onDisable**(): `void`

#### Returns

`void`

#### Inherited from

Joint.onDisable

___

### onEnable

▸ **onEnable**(): `void`

#### Returns

`void`

#### Inherited from

Joint.onEnable

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

Joint.onTriggerEnter

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

Joint.onTriggerExit

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

Joint.onTriggerStay

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

Joint.onValidate

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

Joint.removeEventListener

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

Joint.resolveGuids

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

Joint.setWorldPosition

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

Joint.setWorldQuaternion

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

Joint.setWorldRotation

___

### start

▸ `Optional` **start**(): `void`

#### Returns

`void`

#### Inherited from

Joint.start

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

Joint.startCoroutine

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

Joint.stopCoroutine

___

### update

▸ `Optional` **update**(): `void`

#### Returns

`void`

#### Inherited from

Joint.update
