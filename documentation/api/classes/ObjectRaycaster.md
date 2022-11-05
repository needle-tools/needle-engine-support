[com.needle.engine - v2.39.0-pre](../README.md) / ObjectRaycaster

# Class: ObjectRaycaster

## Hierarchy

- [`Raycaster`](Raycaster.md)

  ↳ **`ObjectRaycaster`**

  ↳↳ [`GraphicRaycaster`](GraphicRaycaster.md)

## Table of contents

### Properties

- [gameObject](ObjectRaycaster.md#gameobject)
- [guid](ObjectRaycaster.md#guid)
- [sourceId](ObjectRaycaster.md#sourceid)

### Accessors

- [activeAndEnabled](ObjectRaycaster.md#activeandenabled)
- [context](ObjectRaycaster.md#context)
- [destroyed](ObjectRaycaster.md#destroyed)
- [enabled](ObjectRaycaster.md#enabled)
- [forward](ObjectRaycaster.md#forward)
- [hideFlags](ObjectRaycaster.md#hideflags)
- [isComponent](ObjectRaycaster.md#iscomponent)
- [layer](ObjectRaycaster.md#layer)
- [name](ObjectRaycaster.md#name)
- [scene](ObjectRaycaster.md#scene)
- [static](ObjectRaycaster.md#static)
- [tag](ObjectRaycaster.md#tag)
- [worldEuler](ObjectRaycaster.md#worldeuler)
- [worldPosition](ObjectRaycaster.md#worldposition)
- [worldQuaternion](ObjectRaycaster.md#worldquaternion)
- [worldRotation](ObjectRaycaster.md#worldrotation)

### Methods

- [addEventListener](ObjectRaycaster.md#addeventlistener)
- [awake](ObjectRaycaster.md#awake)
- [destroy](ObjectRaycaster.md#destroy)
- [dispatchEvent](ObjectRaycaster.md#dispatchevent)
- [earlyUpdate](ObjectRaycaster.md#earlyupdate)
- [lateUpdate](ObjectRaycaster.md#lateupdate)
- [onAfterRender](ObjectRaycaster.md#onafterrender)
- [onBeforeRender](ObjectRaycaster.md#onbeforerender)
- [onCollisionEnter](ObjectRaycaster.md#oncollisionenter)
- [onCollisionExit](ObjectRaycaster.md#oncollisionexit)
- [onCollisionStay](ObjectRaycaster.md#oncollisionstay)
- [onDestroy](ObjectRaycaster.md#ondestroy)
- [onDisable](ObjectRaycaster.md#ondisable)
- [onEnable](ObjectRaycaster.md#onenable)
- [onTriggerEnter](ObjectRaycaster.md#ontriggerenter)
- [onTriggerExit](ObjectRaycaster.md#ontriggerexit)
- [onTriggerStay](ObjectRaycaster.md#ontriggerstay)
- [onValidate](ObjectRaycaster.md#onvalidate)
- [performRaycast](ObjectRaycaster.md#performraycast)
- [removeEventListener](ObjectRaycaster.md#removeeventlistener)
- [resolveGuids](ObjectRaycaster.md#resolveguids)
- [setWorldPosition](ObjectRaycaster.md#setworldposition)
- [setWorldQuaternion](ObjectRaycaster.md#setworldquaternion)
- [setWorldRotation](ObjectRaycaster.md#setworldrotation)
- [start](ObjectRaycaster.md#start)
- [startCoroutine](ObjectRaycaster.md#startcoroutine)
- [stopCoroutine](ObjectRaycaster.md#stopcoroutine)
- [update](ObjectRaycaster.md#update)

## Properties

### gameObject

• **gameObject**: [`GameObject`](GameObject.md)

#### Inherited from

[Raycaster](Raycaster.md).[gameObject](Raycaster.md#gameobject)

___

### guid

• **guid**: `string` = `"invalid"`

#### Inherited from

[Raycaster](Raycaster.md).[guid](Raycaster.md#guid)

___

### sourceId

• `Optional` **sourceId**: `string`

#### Inherited from

[Raycaster](Raycaster.md).[sourceId](Raycaster.md#sourceid)

## Accessors

### activeAndEnabled

• `get` **activeAndEnabled**(): `boolean`

#### Returns

`boolean`

#### Inherited from

Raycaster.activeAndEnabled

___

### context

• `get` **context**(): `Context`

#### Returns

`Context`

#### Inherited from

Raycaster.context

• `set` **context**(`context`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `Context` |

#### Returns

`void`

#### Inherited from

Raycaster.context

___

### destroyed

• `get` **destroyed**(): `boolean`

#### Returns

`boolean`

#### Inherited from

Raycaster.destroyed

___

### enabled

• `get` **enabled**(): `boolean`

#### Returns

`boolean`

#### Inherited from

Raycaster.enabled

• `set` **enabled**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `boolean` |

#### Returns

`void`

#### Inherited from

Raycaster.enabled

___

### forward

• `get` **forward**(): `Vector3`

#### Returns

`Vector3`

#### Inherited from

Raycaster.forward

___

### hideFlags

• `get` **hideFlags**(): [`HideFlags`](../enums/HideFlags.md)

#### Returns

[`HideFlags`](../enums/HideFlags.md)

#### Inherited from

Raycaster.hideFlags

___

### isComponent

• `get` **isComponent**(): `boolean`

#### Returns

`boolean`

#### Inherited from

Raycaster.isComponent

___

### layer

• `get` **layer**(): `number`

#### Returns

`number`

#### Inherited from

Raycaster.layer

___

### name

• `get` **name**(): `string`

#### Returns

`string`

#### Inherited from

Raycaster.name

• `set` **name**(`str`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`void`

#### Inherited from

Raycaster.name

___

### scene

• `get` **scene**(): `Scene`

#### Returns

`Scene`

#### Inherited from

Raycaster.scene

___

### static

• `get` **static**(): `any`

#### Returns

`any`

#### Inherited from

Raycaster.static

___

### tag

• `get` **tag**(): `string`

#### Returns

`string`

#### Inherited from

Raycaster.tag

• `set` **tag**(`str`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`void`

#### Inherited from

Raycaster.tag

___

### worldEuler

• `get` **worldEuler**(): `Euler`

#### Returns

`Euler`

#### Inherited from

Raycaster.worldEuler

• `set` **worldEuler**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `Euler` |

#### Returns

`void`

#### Inherited from

Raycaster.worldEuler

___

### worldPosition

• `get` **worldPosition**(): `Vector3`

#### Returns

`Vector3`

#### Inherited from

Raycaster.worldPosition

• `set` **worldPosition**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `Vector3` |

#### Returns

`void`

#### Inherited from

Raycaster.worldPosition

___

### worldQuaternion

• `get` **worldQuaternion**(): `Quaternion`

#### Returns

`Quaternion`

#### Inherited from

Raycaster.worldQuaternion

• `set` **worldQuaternion**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `Quaternion` |

#### Returns

`void`

#### Inherited from

Raycaster.worldQuaternion

___

### worldRotation

• `get` **worldRotation**(): `Vector3`

#### Returns

`Vector3`

#### Inherited from

Raycaster.worldRotation

• `set` **worldRotation**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `Vector3` |

#### Returns

`void`

#### Inherited from

Raycaster.worldRotation

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

[Raycaster](Raycaster.md).[addEventListener](Raycaster.md#addeventlistener)

___

### awake

▸ **awake**(): `void`

called once when the component becomes active for the first time

#### Returns

`void`

#### Inherited from

[Raycaster](Raycaster.md).[awake](Raycaster.md#awake)

___

### destroy

▸ **destroy**(): `void`

#### Returns

`void`

#### Inherited from

[Raycaster](Raycaster.md).[destroy](Raycaster.md#destroy)

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

[Raycaster](Raycaster.md).[dispatchEvent](Raycaster.md#dispatchevent)

___

### earlyUpdate

▸ `Optional` **earlyUpdate**(): `void`

#### Returns

`void`

#### Inherited from

[Raycaster](Raycaster.md).[earlyUpdate](Raycaster.md#earlyupdate)

___

### lateUpdate

▸ `Optional` **lateUpdate**(): `void`

#### Returns

`void`

#### Inherited from

[Raycaster](Raycaster.md).[lateUpdate](Raycaster.md#lateupdate)

___

### onAfterRender

▸ `Optional` **onAfterRender**(): `void`

#### Returns

`void`

#### Inherited from

[Raycaster](Raycaster.md).[onAfterRender](Raycaster.md#onafterrender)

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

[Raycaster](Raycaster.md).[onBeforeRender](Raycaster.md#onbeforerender)

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

[Raycaster](Raycaster.md).[onCollisionEnter](Raycaster.md#oncollisionenter)

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

[Raycaster](Raycaster.md).[onCollisionExit](Raycaster.md#oncollisionexit)

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

[Raycaster](Raycaster.md).[onCollisionStay](Raycaster.md#oncollisionstay)

___

### onDestroy

▸ **onDestroy**(): `void`

#### Returns

`void`

#### Inherited from

[Raycaster](Raycaster.md).[onDestroy](Raycaster.md#ondestroy)

___

### onDisable

▸ **onDisable**(): `void`

#### Returns

`void`

#### Inherited from

[Raycaster](Raycaster.md).[onDisable](Raycaster.md#ondisable)

___

### onEnable

▸ **onEnable**(): `void`

called every time when the component gets enabled (this is invoked after awake and before start)

#### Returns

`void`

#### Inherited from

[Raycaster](Raycaster.md).[onEnable](Raycaster.md#onenable)

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

[Raycaster](Raycaster.md).[onTriggerEnter](Raycaster.md#ontriggerenter)

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

[Raycaster](Raycaster.md).[onTriggerExit](Raycaster.md#ontriggerexit)

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

[Raycaster](Raycaster.md).[onTriggerStay](Raycaster.md#ontriggerstay)

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

[Raycaster](Raycaster.md).[onValidate](Raycaster.md#onvalidate)

___

### performRaycast

▸ **performRaycast**(`opts?`): ``null`` \| `Intersection`<`Object3D`<`Event`\>\>[]

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `opts` | ``null`` \| `RaycastOptions` | `null` |

#### Returns

``null`` \| `Intersection`<`Object3D`<`Event`\>\>[]

#### Overrides

[Raycaster](Raycaster.md).[performRaycast](Raycaster.md#performraycast)

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

[Raycaster](Raycaster.md).[removeEventListener](Raycaster.md#removeeventlistener)

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

[Raycaster](Raycaster.md).[resolveGuids](Raycaster.md#resolveguids)

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

[Raycaster](Raycaster.md).[setWorldPosition](Raycaster.md#setworldposition)

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

[Raycaster](Raycaster.md).[setWorldQuaternion](Raycaster.md#setworldquaternion)

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

[Raycaster](Raycaster.md).[setWorldRotation](Raycaster.md#setworldrotation)

___

### start

▸ **start**(): `void`

#### Returns

`void`

#### Overrides

[Raycaster](Raycaster.md).[start](Raycaster.md#start)

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

[Raycaster](Raycaster.md).[startCoroutine](Raycaster.md#startcoroutine)

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

[Raycaster](Raycaster.md).[stopCoroutine](Raycaster.md#stopcoroutine)

___

### update

▸ `Optional` **update**(): `void`

#### Returns

`void`

#### Inherited from

[Raycaster](Raycaster.md).[update](Raycaster.md#update)
