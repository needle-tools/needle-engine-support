[com.needle.engine - v2.39.0-pre](../README.md) / Camera

# Class: Camera

## Hierarchy

- [`Behaviour`](Behaviour.md)

  ↳ **`Camera`**

## Implements

- `ICamera`

## Table of contents

### Properties

- [ARBackgroundAlpha](Camera.md#arbackgroundalpha)
- [gameObject](Camera.md#gameobject)
- [guid](Camera.md#guid)
- [orthographic](Camera.md#orthographic)
- [orthographicSize](Camera.md#orthographicsize)
- [sourceId](Camera.md#sourceid)

### Accessors

- [activeAndEnabled](Camera.md#activeandenabled)
- [aspect](Camera.md#aspect)
- [backgroundColor](Camera.md#backgroundcolor)
- [cam](Camera.md#cam)
- [clearFlags](Camera.md#clearflags)
- [context](Camera.md#context)
- [destroyed](Camera.md#destroyed)
- [enabled](Camera.md#enabled)
- [farClipPlane](Camera.md#farclipplane)
- [fieldOfView](Camera.md#fieldofview)
- [forward](Camera.md#forward)
- [hideFlags](Camera.md#hideflags)
- [isCamera](Camera.md#iscamera)
- [isComponent](Camera.md#iscomponent)
- [layer](Camera.md#layer)
- [name](Camera.md#name)
- [nearClipPlane](Camera.md#nearclipplane)
- [scene](Camera.md#scene)
- [static](Camera.md#static)
- [tag](Camera.md#tag)
- [worldEuler](Camera.md#worldeuler)
- [worldPosition](Camera.md#worldposition)
- [worldQuaternion](Camera.md#worldquaternion)
- [worldRotation](Camera.md#worldrotation)

### Methods

- [addEventListener](Camera.md#addeventlistener)
- [applyClearFlagsIfIsActiveCamera](Camera.md#applyclearflagsifisactivecamera)
- [awake](Camera.md#awake)
- [buildCamera](Camera.md#buildcamera)
- [destroy](Camera.md#destroy)
- [dispatchEvent](Camera.md#dispatchevent)
- [earlyUpdate](Camera.md#earlyupdate)
- [lateUpdate](Camera.md#lateupdate)
- [onAfterRender](Camera.md#onafterrender)
- [onBeforeRender](Camera.md#onbeforerender)
- [onCollisionEnter](Camera.md#oncollisionenter)
- [onCollisionExit](Camera.md#oncollisionexit)
- [onCollisionStay](Camera.md#oncollisionstay)
- [onDestroy](Camera.md#ondestroy)
- [onDisable](Camera.md#ondisable)
- [onEnable](Camera.md#onenable)
- [onTriggerEnter](Camera.md#ontriggerenter)
- [onTriggerExit](Camera.md#ontriggerexit)
- [onTriggerStay](Camera.md#ontriggerstay)
- [onValidate](Camera.md#onvalidate)
- [removeEventListener](Camera.md#removeeventlistener)
- [resolveGuids](Camera.md#resolveguids)
- [setWorldPosition](Camera.md#setworldposition)
- [setWorldQuaternion](Camera.md#setworldquaternion)
- [setWorldRotation](Camera.md#setworldrotation)
- [start](Camera.md#start)
- [startCoroutine](Camera.md#startcoroutine)
- [stopCoroutine](Camera.md#stopcoroutine)
- [update](Camera.md#update)

## Properties

### ARBackgroundAlpha

• **ARBackgroundAlpha**: `number` = `0`

___

### gameObject

• **gameObject**: [`GameObject`](GameObject.md)

#### Implementation of

ICamera.gameObject

#### Inherited from

[Behaviour](Behaviour.md).[gameObject](Behaviour.md#gameobject)

___

### guid

• **guid**: `string` = `"invalid"`

#### Implementation of

ICamera.guid

#### Inherited from

[Behaviour](Behaviour.md).[guid](Behaviour.md#guid)

___

### orthographic

• **orthographic**: `boolean` = `false`

___

### orthographicSize

• **orthographicSize**: `number` = `5`

___

### sourceId

• `Optional` **sourceId**: `string`

#### Implementation of

ICamera.sourceId

#### Inherited from

[Behaviour](Behaviour.md).[sourceId](Behaviour.md#sourceid)

## Accessors

### activeAndEnabled

• `get` **activeAndEnabled**(): `boolean`

#### Returns

`boolean`

#### Implementation of

ICamera.activeAndEnabled

#### Inherited from

Behaviour.activeAndEnabled

___

### aspect

• `get` **aspect**(): `number`

#### Returns

`number`

#### Implementation of

ICamera.aspect

___

### backgroundColor

• `get` **backgroundColor**(): ``null`` \| [`RGBAColor`](RGBAColor.md)

#### Returns

``null`` \| [`RGBAColor`](RGBAColor.md)

#### Implementation of

ICamera.backgroundColor

• `set` **backgroundColor**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | ``null`` \| [`RGBAColor`](RGBAColor.md) |

#### Returns

`void`

#### Implementation of

ICamera.backgroundColor

___

### cam

• `get` **cam**(): `PerspectiveCamera` \| `OrthographicCamera`

#### Returns

`PerspectiveCamera` \| `OrthographicCamera`

#### Implementation of

ICamera.cam

___

### clearFlags

• `get` **clearFlags**(): `ClearFlags`

#### Returns

`ClearFlags`

#### Implementation of

ICamera.clearFlags

• `set` **clearFlags**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `ClearFlags` |

#### Returns

`void`

#### Implementation of

ICamera.clearFlags

___

### context

• `get` **context**(): `Context`

#### Returns

`Context`

#### Implementation of

ICamera.context

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

ICamera.context

#### Inherited from

Behaviour.context

___

### destroyed

• `get` **destroyed**(): `boolean`

#### Returns

`boolean`

#### Implementation of

ICamera.destroyed

#### Inherited from

Behaviour.destroyed

___

### enabled

• `get` **enabled**(): `boolean`

#### Returns

`boolean`

#### Implementation of

ICamera.enabled

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

ICamera.enabled

#### Inherited from

Behaviour.enabled

___

### farClipPlane

• `get` **farClipPlane**(): `number`

#### Returns

`number`

#### Implementation of

ICamera.farClipPlane

• `set` **farClipPlane**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `number` |

#### Returns

`void`

#### Implementation of

ICamera.farClipPlane

___

### fieldOfView

• `get` **fieldOfView**(): `number`

#### Returns

`number`

#### Implementation of

ICamera.fieldOfView

• `set` **fieldOfView**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `number` |

#### Returns

`void`

#### Implementation of

ICamera.fieldOfView

___

### forward

• `get` **forward**(): `Vector3`

#### Returns

`Vector3`

#### Implementation of

ICamera.forward

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

### isCamera

• `get` **isCamera**(): `boolean`

#### Returns

`boolean`

#### Implementation of

ICamera.isCamera

___

### isComponent

• `get` **isComponent**(): `boolean`

#### Returns

`boolean`

#### Implementation of

ICamera.isComponent

#### Inherited from

Behaviour.isComponent

___

### layer

• `get` **layer**(): `number`

#### Returns

`number`

#### Implementation of

ICamera.layer

#### Inherited from

Behaviour.layer

___

### name

• `get` **name**(): `string`

#### Returns

`string`

#### Implementation of

ICamera.name

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

ICamera.name

#### Inherited from

Behaviour.name

___

### nearClipPlane

• `get` **nearClipPlane**(): `number`

#### Returns

`number`

#### Implementation of

ICamera.nearClipPlane

• `set` **nearClipPlane**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `number` |

#### Returns

`void`

#### Implementation of

ICamera.nearClipPlane

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

ICamera.tag

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

ICamera.tag

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

ICamera.worldPosition

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

ICamera.worldPosition

#### Inherited from

Behaviour.worldPosition

___

### worldQuaternion

• `get` **worldQuaternion**(): `Quaternion`

#### Returns

`Quaternion`

#### Implementation of

ICamera.worldQuaternion

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

ICamera.worldQuaternion

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

### applyClearFlagsIfIsActiveCamera

▸ **applyClearFlagsIfIsActiveCamera**(): `void`

#### Returns

`void`

#### Implementation of

ICamera.applyClearFlagsIfIsActiveCamera

___

### awake

▸ **awake**(): `void`

called once when the component becomes active for the first time

#### Returns

`void`

#### Implementation of

ICamera.awake

#### Overrides

[Behaviour](Behaviour.md).[awake](Behaviour.md#awake)

___

### buildCamera

▸ **buildCamera**(): `void`

#### Returns

`void`

#### Implementation of

ICamera.buildCamera

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

ICamera.earlyUpdate

#### Inherited from

[Behaviour](Behaviour.md).[earlyUpdate](Behaviour.md#earlyupdate)

___

### lateUpdate

▸ `Optional` **lateUpdate**(): `void`

#### Returns

`void`

#### Implementation of

ICamera.lateUpdate

#### Inherited from

[Behaviour](Behaviour.md).[lateUpdate](Behaviour.md#lateupdate)

___

### onAfterRender

▸ `Optional` **onAfterRender**(): `void`

#### Returns

`void`

#### Implementation of

ICamera.onAfterRender

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

ICamera.onBeforeRender

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

ICamera.onCollisionEnter

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

ICamera.onCollisionExit

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

ICamera.onCollisionStay

#### Inherited from

[Behaviour](Behaviour.md).[onCollisionStay](Behaviour.md#oncollisionstay)

___

### onDestroy

▸ **onDestroy**(): `void`

#### Returns

`void`

#### Implementation of

ICamera.onDestroy

#### Inherited from

[Behaviour](Behaviour.md).[onDestroy](Behaviour.md#ondestroy)

___

### onDisable

▸ **onDisable**(): `void`

#### Returns

`void`

#### Implementation of

ICamera.onDisable

#### Overrides

[Behaviour](Behaviour.md).[onDisable](Behaviour.md#ondisable)

___

### onEnable

▸ **onEnable**(): `void`

called every time when the component gets enabled (this is invoked after awake and before start)

#### Returns

`void`

#### Implementation of

ICamera.onEnable

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

ICamera.onTriggerEnter

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

ICamera.onTriggerExit

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

ICamera.onTriggerStay

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

ICamera.onValidate

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

ICamera.resolveGuids

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

#### Implementation of

ICamera.start

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

#### Implementation of

ICamera.update

#### Inherited from

[Behaviour](Behaviour.md).[update](Behaviour.md#update)
