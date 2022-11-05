[com.needle.engine - v2.39.0-pre](../README.md) / DeleteBox

# Class: DeleteBox

## Hierarchy

- [`BoxHelperComponent`](BoxHelperComponent.md)

  ↳ **`DeleteBox`**

## Table of contents

### Properties

- [gameObject](DeleteBox.md#gameobject)
- [guid](DeleteBox.md#guid)
- [sourceId](DeleteBox.md#sourceid)

### Accessors

- [activeAndEnabled](DeleteBox.md#activeandenabled)
- [context](DeleteBox.md#context)
- [destroyed](DeleteBox.md#destroyed)
- [enabled](DeleteBox.md#enabled)
- [forward](DeleteBox.md#forward)
- [hideFlags](DeleteBox.md#hideflags)
- [isComponent](DeleteBox.md#iscomponent)
- [layer](DeleteBox.md#layer)
- [name](DeleteBox.md#name)
- [scene](DeleteBox.md#scene)
- [static](DeleteBox.md#static)
- [tag](DeleteBox.md#tag)
- [worldEuler](DeleteBox.md#worldeuler)
- [worldPosition](DeleteBox.md#worldposition)
- [worldQuaternion](DeleteBox.md#worldquaternion)
- [worldRotation](DeleteBox.md#worldrotation)

### Methods

- [addEventListener](DeleteBox.md#addeventlistener)
- [awake](DeleteBox.md#awake)
- [destroy](DeleteBox.md#destroy)
- [dispatchEvent](DeleteBox.md#dispatchevent)
- [earlyUpdate](DeleteBox.md#earlyupdate)
- [intersects](DeleteBox.md#intersects)
- [isInBox](DeleteBox.md#isinbox)
- [lateUpdate](DeleteBox.md#lateupdate)
- [onAfterRender](DeleteBox.md#onafterrender)
- [onBeforeRender](DeleteBox.md#onbeforerender)
- [onCollisionEnter](DeleteBox.md#oncollisionenter)
- [onCollisionExit](DeleteBox.md#oncollisionexit)
- [onCollisionStay](DeleteBox.md#oncollisionstay)
- [onDestroy](DeleteBox.md#ondestroy)
- [onDisable](DeleteBox.md#ondisable)
- [onEnable](DeleteBox.md#onenable)
- [onTriggerEnter](DeleteBox.md#ontriggerenter)
- [onTriggerExit](DeleteBox.md#ontriggerexit)
- [onTriggerStay](DeleteBox.md#ontriggerstay)
- [onValidate](DeleteBox.md#onvalidate)
- [removeEventListener](DeleteBox.md#removeeventlistener)
- [resolveGuids](DeleteBox.md#resolveguids)
- [setWorldPosition](DeleteBox.md#setworldposition)
- [setWorldQuaternion](DeleteBox.md#setworldquaternion)
- [setWorldRotation](DeleteBox.md#setworldrotation)
- [showHelper](DeleteBox.md#showhelper)
- [start](DeleteBox.md#start)
- [startCoroutine](DeleteBox.md#startcoroutine)
- [stopCoroutine](DeleteBox.md#stopcoroutine)
- [update](DeleteBox.md#update)
- [updateBox](DeleteBox.md#updatebox)

## Properties

### gameObject

• **gameObject**: [`GameObject`](GameObject.md)

#### Inherited from

[BoxHelperComponent](BoxHelperComponent.md).[gameObject](BoxHelperComponent.md#gameobject)

___

### guid

• **guid**: `string` = `"invalid"`

#### Inherited from

[BoxHelperComponent](BoxHelperComponent.md).[guid](BoxHelperComponent.md#guid)

___

### sourceId

• `Optional` **sourceId**: `string`

#### Inherited from

[BoxHelperComponent](BoxHelperComponent.md).[sourceId](BoxHelperComponent.md#sourceid)

## Accessors

### activeAndEnabled

• `get` **activeAndEnabled**(): `boolean`

#### Returns

`boolean`

#### Inherited from

BoxHelperComponent.activeAndEnabled

___

### context

• `get` **context**(): `Context`

#### Returns

`Context`

#### Inherited from

BoxHelperComponent.context

• `set` **context**(`context`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `Context` |

#### Returns

`void`

#### Inherited from

BoxHelperComponent.context

___

### destroyed

• `get` **destroyed**(): `boolean`

#### Returns

`boolean`

#### Inherited from

BoxHelperComponent.destroyed

___

### enabled

• `get` **enabled**(): `boolean`

#### Returns

`boolean`

#### Inherited from

BoxHelperComponent.enabled

• `set` **enabled**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `boolean` |

#### Returns

`void`

#### Inherited from

BoxHelperComponent.enabled

___

### forward

• `get` **forward**(): `Vector3`

#### Returns

`Vector3`

#### Inherited from

BoxHelperComponent.forward

___

### hideFlags

• `get` **hideFlags**(): [`HideFlags`](../enums/HideFlags.md)

#### Returns

[`HideFlags`](../enums/HideFlags.md)

#### Inherited from

BoxHelperComponent.hideFlags

___

### isComponent

• `get` **isComponent**(): `boolean`

#### Returns

`boolean`

#### Inherited from

BoxHelperComponent.isComponent

___

### layer

• `get` **layer**(): `number`

#### Returns

`number`

#### Inherited from

BoxHelperComponent.layer

___

### name

• `get` **name**(): `string`

#### Returns

`string`

#### Inherited from

BoxHelperComponent.name

• `set` **name**(`str`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`void`

#### Inherited from

BoxHelperComponent.name

___

### scene

• `get` **scene**(): `Scene`

#### Returns

`Scene`

#### Inherited from

BoxHelperComponent.scene

___

### static

• `get` **static**(): `any`

#### Returns

`any`

#### Inherited from

BoxHelperComponent.static

___

### tag

• `get` **tag**(): `string`

#### Returns

`string`

#### Inherited from

BoxHelperComponent.tag

• `set` **tag**(`str`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`void`

#### Inherited from

BoxHelperComponent.tag

___

### worldEuler

• `get` **worldEuler**(): `Euler`

#### Returns

`Euler`

#### Inherited from

BoxHelperComponent.worldEuler

• `set` **worldEuler**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `Euler` |

#### Returns

`void`

#### Inherited from

BoxHelperComponent.worldEuler

___

### worldPosition

• `get` **worldPosition**(): `Vector3`

#### Returns

`Vector3`

#### Inherited from

BoxHelperComponent.worldPosition

• `set` **worldPosition**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `Vector3` |

#### Returns

`void`

#### Inherited from

BoxHelperComponent.worldPosition

___

### worldQuaternion

• `get` **worldQuaternion**(): `Quaternion`

#### Returns

`Quaternion`

#### Inherited from

BoxHelperComponent.worldQuaternion

• `set` **worldQuaternion**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `Quaternion` |

#### Returns

`void`

#### Inherited from

BoxHelperComponent.worldQuaternion

___

### worldRotation

• `get` **worldRotation**(): `Vector3`

#### Returns

`Vector3`

#### Inherited from

BoxHelperComponent.worldRotation

• `set` **worldRotation**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `Vector3` |

#### Returns

`void`

#### Inherited from

BoxHelperComponent.worldRotation

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

[BoxHelperComponent](BoxHelperComponent.md).[addEventListener](BoxHelperComponent.md#addeventlistener)

___

### awake

▸ **awake**(): `void`

called once when the component becomes active for the first time

#### Returns

`void`

#### Inherited from

[BoxHelperComponent](BoxHelperComponent.md).[awake](BoxHelperComponent.md#awake)

___

### destroy

▸ **destroy**(): `void`

#### Returns

`void`

#### Inherited from

[BoxHelperComponent](BoxHelperComponent.md).[destroy](BoxHelperComponent.md#destroy)

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

[BoxHelperComponent](BoxHelperComponent.md).[dispatchEvent](BoxHelperComponent.md#dispatchevent)

___

### earlyUpdate

▸ `Optional` **earlyUpdate**(): `void`

#### Returns

`void`

#### Inherited from

[BoxHelperComponent](BoxHelperComponent.md).[earlyUpdate](BoxHelperComponent.md#earlyupdate)

___

### intersects

▸ **intersects**(`box`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `box` | `Box3` |

#### Returns

`boolean`

#### Inherited from

[BoxHelperComponent](BoxHelperComponent.md).[intersects](BoxHelperComponent.md#intersects)

___

### isInBox

▸ **isInBox**(`obj`, `scaleFactor?`): `undefined` \| `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `Object3D`<`Event`\> |
| `scaleFactor?` | `number` |

#### Returns

`undefined` \| `boolean`

#### Inherited from

[BoxHelperComponent](BoxHelperComponent.md).[isInBox](BoxHelperComponent.md#isinbox)

___

### lateUpdate

▸ `Optional` **lateUpdate**(): `void`

#### Returns

`void`

#### Inherited from

[BoxHelperComponent](BoxHelperComponent.md).[lateUpdate](BoxHelperComponent.md#lateupdate)

___

### onAfterRender

▸ `Optional` **onAfterRender**(): `void`

#### Returns

`void`

#### Inherited from

[BoxHelperComponent](BoxHelperComponent.md).[onAfterRender](BoxHelperComponent.md#onafterrender)

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

[BoxHelperComponent](BoxHelperComponent.md).[onBeforeRender](BoxHelperComponent.md#onbeforerender)

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

[BoxHelperComponent](BoxHelperComponent.md).[onCollisionEnter](BoxHelperComponent.md#oncollisionenter)

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

[BoxHelperComponent](BoxHelperComponent.md).[onCollisionExit](BoxHelperComponent.md#oncollisionexit)

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

[BoxHelperComponent](BoxHelperComponent.md).[onCollisionStay](BoxHelperComponent.md#oncollisionstay)

___

### onDestroy

▸ **onDestroy**(): `void`

#### Returns

`void`

#### Inherited from

[BoxHelperComponent](BoxHelperComponent.md).[onDestroy](BoxHelperComponent.md#ondestroy)

___

### onDisable

▸ **onDisable**(): `void`

#### Returns

`void`

#### Inherited from

[BoxHelperComponent](BoxHelperComponent.md).[onDisable](BoxHelperComponent.md#ondisable)

___

### onEnable

▸ **onEnable**(): `void`

called every time when the component gets enabled (this is invoked after awake and before start)

#### Returns

`void`

#### Inherited from

[BoxHelperComponent](BoxHelperComponent.md).[onEnable](BoxHelperComponent.md#onenable)

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

[BoxHelperComponent](BoxHelperComponent.md).[onTriggerEnter](BoxHelperComponent.md#ontriggerenter)

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

[BoxHelperComponent](BoxHelperComponent.md).[onTriggerExit](BoxHelperComponent.md#ontriggerexit)

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

[BoxHelperComponent](BoxHelperComponent.md).[onTriggerStay](BoxHelperComponent.md#ontriggerstay)

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

[BoxHelperComponent](BoxHelperComponent.md).[onValidate](BoxHelperComponent.md#onvalidate)

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

[BoxHelperComponent](BoxHelperComponent.md).[removeEventListener](BoxHelperComponent.md#removeeventlistener)

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

[BoxHelperComponent](BoxHelperComponent.md).[resolveGuids](BoxHelperComponent.md#resolveguids)

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

[BoxHelperComponent](BoxHelperComponent.md).[setWorldPosition](BoxHelperComponent.md#setworldposition)

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

[BoxHelperComponent](BoxHelperComponent.md).[setWorldQuaternion](BoxHelperComponent.md#setworldquaternion)

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

[BoxHelperComponent](BoxHelperComponent.md).[setWorldRotation](BoxHelperComponent.md#setworldrotation)

___

### showHelper

▸ **showHelper**(`col?`, `force?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `col` | ``null`` \| `ColorRepresentation` | `null` |
| `force` | `boolean` | `false` |

#### Returns

`void`

#### Inherited from

[BoxHelperComponent](BoxHelperComponent.md).[showHelper](BoxHelperComponent.md#showhelper)

___

### start

▸ `Optional` **start**(): `void`

#### Returns

`void`

#### Inherited from

[BoxHelperComponent](BoxHelperComponent.md).[start](BoxHelperComponent.md#start)

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

[BoxHelperComponent](BoxHelperComponent.md).[startCoroutine](BoxHelperComponent.md#startcoroutine)

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

[BoxHelperComponent](BoxHelperComponent.md).[stopCoroutine](BoxHelperComponent.md#stopcoroutine)

___

### update

▸ `Optional` **update**(): `void`

#### Returns

`void`

#### Inherited from

[BoxHelperComponent](BoxHelperComponent.md).[update](BoxHelperComponent.md#update)

___

### updateBox

▸ **updateBox**(`force?`): `Box3`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `force` | `boolean` | `false` |

#### Returns

`Box3`

#### Inherited from

[BoxHelperComponent](BoxHelperComponent.md).[updateBox](BoxHelperComponent.md#updatebox)
