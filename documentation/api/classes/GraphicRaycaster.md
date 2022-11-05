[com.needle.engine - v2.39.0-pre](../README.md) / GraphicRaycaster

# Class: GraphicRaycaster

## Hierarchy

- [`ObjectRaycaster`](ObjectRaycaster.md)

  ↳ **`GraphicRaycaster`**

## Table of contents

### Properties

- [eventCamera](GraphicRaycaster.md#eventcamera)
- [gameObject](GraphicRaycaster.md#gameobject)
- [guid](GraphicRaycaster.md#guid)
- [ignoreReversedGraphics](GraphicRaycaster.md#ignorereversedgraphics)
- [rootRaycaster](GraphicRaycaster.md#rootraycaster)
- [sourceId](GraphicRaycaster.md#sourceid)

### Accessors

- [activeAndEnabled](GraphicRaycaster.md#activeandenabled)
- [context](GraphicRaycaster.md#context)
- [destroyed](GraphicRaycaster.md#destroyed)
- [enabled](GraphicRaycaster.md#enabled)
- [forward](GraphicRaycaster.md#forward)
- [hideFlags](GraphicRaycaster.md#hideflags)
- [isComponent](GraphicRaycaster.md#iscomponent)
- [layer](GraphicRaycaster.md#layer)
- [name](GraphicRaycaster.md#name)
- [scene](GraphicRaycaster.md#scene)
- [static](GraphicRaycaster.md#static)
- [tag](GraphicRaycaster.md#tag)
- [worldEuler](GraphicRaycaster.md#worldeuler)
- [worldPosition](GraphicRaycaster.md#worldposition)
- [worldQuaternion](GraphicRaycaster.md#worldquaternion)
- [worldRotation](GraphicRaycaster.md#worldrotation)

### Methods

- [addEventListener](GraphicRaycaster.md#addeventlistener)
- [awake](GraphicRaycaster.md#awake)
- [destroy](GraphicRaycaster.md#destroy)
- [dispatchEvent](GraphicRaycaster.md#dispatchevent)
- [earlyUpdate](GraphicRaycaster.md#earlyupdate)
- [lateUpdate](GraphicRaycaster.md#lateupdate)
- [onAfterRender](GraphicRaycaster.md#onafterrender)
- [onBeforeRender](GraphicRaycaster.md#onbeforerender)
- [onCollisionEnter](GraphicRaycaster.md#oncollisionenter)
- [onCollisionExit](GraphicRaycaster.md#oncollisionexit)
- [onCollisionStay](GraphicRaycaster.md#oncollisionstay)
- [onDestroy](GraphicRaycaster.md#ondestroy)
- [onDisable](GraphicRaycaster.md#ondisable)
- [onEnable](GraphicRaycaster.md#onenable)
- [onTriggerEnter](GraphicRaycaster.md#ontriggerenter)
- [onTriggerExit](GraphicRaycaster.md#ontriggerexit)
- [onTriggerStay](GraphicRaycaster.md#ontriggerstay)
- [onValidate](GraphicRaycaster.md#onvalidate)
- [performRaycast](GraphicRaycaster.md#performraycast)
- [removeEventListener](GraphicRaycaster.md#removeeventlistener)
- [resolveGuids](GraphicRaycaster.md#resolveguids)
- [setWorldPosition](GraphicRaycaster.md#setworldposition)
- [setWorldQuaternion](GraphicRaycaster.md#setworldquaternion)
- [setWorldRotation](GraphicRaycaster.md#setworldrotation)
- [start](GraphicRaycaster.md#start)
- [startCoroutine](GraphicRaycaster.md#startcoroutine)
- [stopCoroutine](GraphicRaycaster.md#stopcoroutine)
- [update](GraphicRaycaster.md#update)

## Properties

### eventCamera

• **eventCamera**: ``null`` \| `Camera` = `null`

___

### gameObject

• **gameObject**: [`GameObject`](GameObject.md)

#### Inherited from

[ObjectRaycaster](ObjectRaycaster.md).[gameObject](ObjectRaycaster.md#gameobject)

___

### guid

• **guid**: `string` = `"invalid"`

#### Inherited from

[ObjectRaycaster](ObjectRaycaster.md).[guid](ObjectRaycaster.md#guid)

___

### ignoreReversedGraphics

• **ignoreReversedGraphics**: `boolean` = `false`

___

### rootRaycaster

• **rootRaycaster**: ``null`` \| [`GraphicRaycaster`](GraphicRaycaster.md) = `null`

___

### sourceId

• `Optional` **sourceId**: `string`

#### Inherited from

[ObjectRaycaster](ObjectRaycaster.md).[sourceId](ObjectRaycaster.md#sourceid)

## Accessors

### activeAndEnabled

• `get` **activeAndEnabled**(): `boolean`

#### Returns

`boolean`

#### Inherited from

ObjectRaycaster.activeAndEnabled

___

### context

• `get` **context**(): `Context`

#### Returns

`Context`

#### Inherited from

ObjectRaycaster.context

• `set` **context**(`context`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `Context` |

#### Returns

`void`

#### Inherited from

ObjectRaycaster.context

___

### destroyed

• `get` **destroyed**(): `boolean`

#### Returns

`boolean`

#### Inherited from

ObjectRaycaster.destroyed

___

### enabled

• `get` **enabled**(): `boolean`

#### Returns

`boolean`

#### Inherited from

ObjectRaycaster.enabled

• `set` **enabled**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `boolean` |

#### Returns

`void`

#### Inherited from

ObjectRaycaster.enabled

___

### forward

• `get` **forward**(): `Vector3`

#### Returns

`Vector3`

#### Inherited from

ObjectRaycaster.forward

___

### hideFlags

• `get` **hideFlags**(): [`HideFlags`](../enums/HideFlags.md)

#### Returns

[`HideFlags`](../enums/HideFlags.md)

#### Inherited from

ObjectRaycaster.hideFlags

___

### isComponent

• `get` **isComponent**(): `boolean`

#### Returns

`boolean`

#### Inherited from

ObjectRaycaster.isComponent

___

### layer

• `get` **layer**(): `number`

#### Returns

`number`

#### Inherited from

ObjectRaycaster.layer

___

### name

• `get` **name**(): `string`

#### Returns

`string`

#### Inherited from

ObjectRaycaster.name

• `set` **name**(`str`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`void`

#### Inherited from

ObjectRaycaster.name

___

### scene

• `get` **scene**(): `Scene`

#### Returns

`Scene`

#### Inherited from

ObjectRaycaster.scene

___

### static

• `get` **static**(): `any`

#### Returns

`any`

#### Inherited from

ObjectRaycaster.static

___

### tag

• `get` **tag**(): `string`

#### Returns

`string`

#### Inherited from

ObjectRaycaster.tag

• `set` **tag**(`str`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`void`

#### Inherited from

ObjectRaycaster.tag

___

### worldEuler

• `get` **worldEuler**(): `Euler`

#### Returns

`Euler`

#### Inherited from

ObjectRaycaster.worldEuler

• `set` **worldEuler**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `Euler` |

#### Returns

`void`

#### Inherited from

ObjectRaycaster.worldEuler

___

### worldPosition

• `get` **worldPosition**(): `Vector3`

#### Returns

`Vector3`

#### Inherited from

ObjectRaycaster.worldPosition

• `set` **worldPosition**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `Vector3` |

#### Returns

`void`

#### Inherited from

ObjectRaycaster.worldPosition

___

### worldQuaternion

• `get` **worldQuaternion**(): `Quaternion`

#### Returns

`Quaternion`

#### Inherited from

ObjectRaycaster.worldQuaternion

• `set` **worldQuaternion**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `Quaternion` |

#### Returns

`void`

#### Inherited from

ObjectRaycaster.worldQuaternion

___

### worldRotation

• `get` **worldRotation**(): `Vector3`

#### Returns

`Vector3`

#### Inherited from

ObjectRaycaster.worldRotation

• `set` **worldRotation**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `Vector3` |

#### Returns

`void`

#### Inherited from

ObjectRaycaster.worldRotation

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

[ObjectRaycaster](ObjectRaycaster.md).[addEventListener](ObjectRaycaster.md#addeventlistener)

___

### awake

▸ **awake**(): `void`

called once when the component becomes active for the first time

#### Returns

`void`

#### Inherited from

[ObjectRaycaster](ObjectRaycaster.md).[awake](ObjectRaycaster.md#awake)

___

### destroy

▸ **destroy**(): `void`

#### Returns

`void`

#### Inherited from

[ObjectRaycaster](ObjectRaycaster.md).[destroy](ObjectRaycaster.md#destroy)

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

[ObjectRaycaster](ObjectRaycaster.md).[dispatchEvent](ObjectRaycaster.md#dispatchevent)

___

### earlyUpdate

▸ `Optional` **earlyUpdate**(): `void`

#### Returns

`void`

#### Inherited from

[ObjectRaycaster](ObjectRaycaster.md).[earlyUpdate](ObjectRaycaster.md#earlyupdate)

___

### lateUpdate

▸ `Optional` **lateUpdate**(): `void`

#### Returns

`void`

#### Inherited from

[ObjectRaycaster](ObjectRaycaster.md).[lateUpdate](ObjectRaycaster.md#lateupdate)

___

### onAfterRender

▸ `Optional` **onAfterRender**(): `void`

#### Returns

`void`

#### Inherited from

[ObjectRaycaster](ObjectRaycaster.md).[onAfterRender](ObjectRaycaster.md#onafterrender)

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

[ObjectRaycaster](ObjectRaycaster.md).[onBeforeRender](ObjectRaycaster.md#onbeforerender)

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

[ObjectRaycaster](ObjectRaycaster.md).[onCollisionEnter](ObjectRaycaster.md#oncollisionenter)

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

[ObjectRaycaster](ObjectRaycaster.md).[onCollisionExit](ObjectRaycaster.md#oncollisionexit)

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

[ObjectRaycaster](ObjectRaycaster.md).[onCollisionStay](ObjectRaycaster.md#oncollisionstay)

___

### onDestroy

▸ **onDestroy**(): `void`

#### Returns

`void`

#### Inherited from

[ObjectRaycaster](ObjectRaycaster.md).[onDestroy](ObjectRaycaster.md#ondestroy)

___

### onDisable

▸ **onDisable**(): `void`

#### Returns

`void`

#### Inherited from

[ObjectRaycaster](ObjectRaycaster.md).[onDisable](ObjectRaycaster.md#ondisable)

___

### onEnable

▸ **onEnable**(): `void`

called every time when the component gets enabled (this is invoked after awake and before start)

#### Returns

`void`

#### Inherited from

[ObjectRaycaster](ObjectRaycaster.md).[onEnable](ObjectRaycaster.md#onenable)

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

[ObjectRaycaster](ObjectRaycaster.md).[onTriggerEnter](ObjectRaycaster.md#ontriggerenter)

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

[ObjectRaycaster](ObjectRaycaster.md).[onTriggerExit](ObjectRaycaster.md#ontriggerexit)

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

[ObjectRaycaster](ObjectRaycaster.md).[onTriggerStay](ObjectRaycaster.md#ontriggerstay)

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

[ObjectRaycaster](ObjectRaycaster.md).[onValidate](ObjectRaycaster.md#onvalidate)

___

### performRaycast

▸ **performRaycast**(`opts?`): ``null`` \| `Intersection`<`Object3D`<`Event`\>\>[]

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `opts` | ``null`` \| `RaycastOptions` | `null` |

#### Returns

``null`` \| `Intersection`<`Object3D`<`Event`\>\>[]

#### Inherited from

[ObjectRaycaster](ObjectRaycaster.md).[performRaycast](ObjectRaycaster.md#performraycast)

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

[ObjectRaycaster](ObjectRaycaster.md).[removeEventListener](ObjectRaycaster.md#removeeventlistener)

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

[ObjectRaycaster](ObjectRaycaster.md).[resolveGuids](ObjectRaycaster.md#resolveguids)

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

[ObjectRaycaster](ObjectRaycaster.md).[setWorldPosition](ObjectRaycaster.md#setworldposition)

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

[ObjectRaycaster](ObjectRaycaster.md).[setWorldQuaternion](ObjectRaycaster.md#setworldquaternion)

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

[ObjectRaycaster](ObjectRaycaster.md).[setWorldRotation](ObjectRaycaster.md#setworldrotation)

___

### start

▸ **start**(): `void`

#### Returns

`void`

#### Inherited from

[ObjectRaycaster](ObjectRaycaster.md).[start](ObjectRaycaster.md#start)

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

[ObjectRaycaster](ObjectRaycaster.md).[startCoroutine](ObjectRaycaster.md#startcoroutine)

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

[ObjectRaycaster](ObjectRaycaster.md).[stopCoroutine](ObjectRaycaster.md#stopcoroutine)

___

### update

▸ `Optional` **update**(): `void`

#### Returns

`void`

#### Inherited from

[ObjectRaycaster](ObjectRaycaster.md).[update](ObjectRaycaster.md#update)
