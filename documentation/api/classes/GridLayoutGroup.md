[com.needle.engine - v2.39.0-pre](../README.md) / GridLayoutGroup

# Class: GridLayoutGroup

## Hierarchy

- [`LayoutGroup`](LayoutGroup.md)

  ↳ **`GridLayoutGroup`**

## Table of contents

### Properties

- [gameObject](GridLayoutGroup.md#gameobject)
- [guid](GridLayoutGroup.md#guid)
- [reverseArrangement](GridLayoutGroup.md#reversearrangement)
- [sourceId](GridLayoutGroup.md#sourceid)

### Accessors

- [activeAndEnabled](GridLayoutGroup.md#activeandenabled)
- [context](GridLayoutGroup.md#context)
- [destroyed](GridLayoutGroup.md#destroyed)
- [enabled](GridLayoutGroup.md#enabled)
- [forward](GridLayoutGroup.md#forward)
- [hideFlags](GridLayoutGroup.md#hideflags)
- [isComponent](GridLayoutGroup.md#iscomponent)
- [layer](GridLayoutGroup.md#layer)
- [name](GridLayoutGroup.md#name)
- [scene](GridLayoutGroup.md#scene)
- [static](GridLayoutGroup.md#static)
- [tag](GridLayoutGroup.md#tag)
- [worldEuler](GridLayoutGroup.md#worldeuler)
- [worldPosition](GridLayoutGroup.md#worldposition)
- [worldQuaternion](GridLayoutGroup.md#worldquaternion)
- [worldRotation](GridLayoutGroup.md#worldrotation)

### Methods

- [addEventListener](GridLayoutGroup.md#addeventlistener)
- [awake](GridLayoutGroup.md#awake)
- [destroy](GridLayoutGroup.md#destroy)
- [dispatchEvent](GridLayoutGroup.md#dispatchevent)
- [earlyUpdate](GridLayoutGroup.md#earlyupdate)
- [lateUpdate](GridLayoutGroup.md#lateupdate)
- [onAfterRender](GridLayoutGroup.md#onafterrender)
- [onBeforeRender](GridLayoutGroup.md#onbeforerender)
- [onCollisionEnter](GridLayoutGroup.md#oncollisionenter)
- [onCollisionExit](GridLayoutGroup.md#oncollisionexit)
- [onCollisionStay](GridLayoutGroup.md#oncollisionstay)
- [onDestroy](GridLayoutGroup.md#ondestroy)
- [onDisable](GridLayoutGroup.md#ondisable)
- [onEnable](GridLayoutGroup.md#onenable)
- [onTriggerEnter](GridLayoutGroup.md#ontriggerenter)
- [onTriggerExit](GridLayoutGroup.md#ontriggerexit)
- [onTriggerStay](GridLayoutGroup.md#ontriggerstay)
- [onValidate](GridLayoutGroup.md#onvalidate)
- [removeEventListener](GridLayoutGroup.md#removeeventlistener)
- [resolveGuids](GridLayoutGroup.md#resolveguids)
- [setWorldPosition](GridLayoutGroup.md#setworldposition)
- [setWorldQuaternion](GridLayoutGroup.md#setworldquaternion)
- [setWorldRotation](GridLayoutGroup.md#setworldrotation)
- [start](GridLayoutGroup.md#start)
- [startCoroutine](GridLayoutGroup.md#startcoroutine)
- [stopCoroutine](GridLayoutGroup.md#stopcoroutine)
- [update](GridLayoutGroup.md#update)

## Properties

### gameObject

• **gameObject**: [`GameObject`](GameObject.md)

#### Inherited from

[LayoutGroup](LayoutGroup.md).[gameObject](LayoutGroup.md#gameobject)

___

### guid

• **guid**: `string` = `"invalid"`

#### Inherited from

[LayoutGroup](LayoutGroup.md).[guid](LayoutGroup.md#guid)

___

### reverseArrangement

• **reverseArrangement**: `boolean` = `false`

#### Inherited from

[LayoutGroup](LayoutGroup.md).[reverseArrangement](LayoutGroup.md#reversearrangement)

___

### sourceId

• `Optional` **sourceId**: `string`

#### Inherited from

[LayoutGroup](LayoutGroup.md).[sourceId](LayoutGroup.md#sourceid)

## Accessors

### activeAndEnabled

• `get` **activeAndEnabled**(): `boolean`

#### Returns

`boolean`

#### Inherited from

LayoutGroup.activeAndEnabled

___

### context

• `get` **context**(): `Context`

#### Returns

`Context`

#### Inherited from

LayoutGroup.context

• `set` **context**(`context`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `Context` |

#### Returns

`void`

#### Inherited from

LayoutGroup.context

___

### destroyed

• `get` **destroyed**(): `boolean`

#### Returns

`boolean`

#### Inherited from

LayoutGroup.destroyed

___

### enabled

• `get` **enabled**(): `boolean`

#### Returns

`boolean`

#### Inherited from

LayoutGroup.enabled

• `set` **enabled**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `boolean` |

#### Returns

`void`

#### Inherited from

LayoutGroup.enabled

___

### forward

• `get` **forward**(): `Vector3`

#### Returns

`Vector3`

#### Inherited from

LayoutGroup.forward

___

### hideFlags

• `get` **hideFlags**(): [`HideFlags`](../enums/HideFlags.md)

#### Returns

[`HideFlags`](../enums/HideFlags.md)

#### Inherited from

LayoutGroup.hideFlags

___

### isComponent

• `get` **isComponent**(): `boolean`

#### Returns

`boolean`

#### Inherited from

LayoutGroup.isComponent

___

### layer

• `get` **layer**(): `number`

#### Returns

`number`

#### Inherited from

LayoutGroup.layer

___

### name

• `get` **name**(): `string`

#### Returns

`string`

#### Inherited from

LayoutGroup.name

• `set` **name**(`str`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`void`

#### Inherited from

LayoutGroup.name

___

### scene

• `get` **scene**(): `Scene`

#### Returns

`Scene`

#### Inherited from

LayoutGroup.scene

___

### static

• `get` **static**(): `any`

#### Returns

`any`

#### Inherited from

LayoutGroup.static

___

### tag

• `get` **tag**(): `string`

#### Returns

`string`

#### Inherited from

LayoutGroup.tag

• `set` **tag**(`str`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`void`

#### Inherited from

LayoutGroup.tag

___

### worldEuler

• `get` **worldEuler**(): `Euler`

#### Returns

`Euler`

#### Inherited from

LayoutGroup.worldEuler

• `set` **worldEuler**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `Euler` |

#### Returns

`void`

#### Inherited from

LayoutGroup.worldEuler

___

### worldPosition

• `get` **worldPosition**(): `Vector3`

#### Returns

`Vector3`

#### Inherited from

LayoutGroup.worldPosition

• `set` **worldPosition**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `Vector3` |

#### Returns

`void`

#### Inherited from

LayoutGroup.worldPosition

___

### worldQuaternion

• `get` **worldQuaternion**(): `Quaternion`

#### Returns

`Quaternion`

#### Inherited from

LayoutGroup.worldQuaternion

• `set` **worldQuaternion**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `Quaternion` |

#### Returns

`void`

#### Inherited from

LayoutGroup.worldQuaternion

___

### worldRotation

• `get` **worldRotation**(): `Vector3`

#### Returns

`Vector3`

#### Inherited from

LayoutGroup.worldRotation

• `set` **worldRotation**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `Vector3` |

#### Returns

`void`

#### Inherited from

LayoutGroup.worldRotation

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

[LayoutGroup](LayoutGroup.md).[addEventListener](LayoutGroup.md#addeventlistener)

___

### awake

▸ **awake**(): `void`

called once when the component becomes active for the first time

#### Returns

`void`

#### Inherited from

[LayoutGroup](LayoutGroup.md).[awake](LayoutGroup.md#awake)

___

### destroy

▸ **destroy**(): `void`

#### Returns

`void`

#### Inherited from

[LayoutGroup](LayoutGroup.md).[destroy](LayoutGroup.md#destroy)

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

[LayoutGroup](LayoutGroup.md).[dispatchEvent](LayoutGroup.md#dispatchevent)

___

### earlyUpdate

▸ `Optional` **earlyUpdate**(): `void`

#### Returns

`void`

#### Inherited from

[LayoutGroup](LayoutGroup.md).[earlyUpdate](LayoutGroup.md#earlyupdate)

___

### lateUpdate

▸ `Optional` **lateUpdate**(): `void`

#### Returns

`void`

#### Inherited from

[LayoutGroup](LayoutGroup.md).[lateUpdate](LayoutGroup.md#lateupdate)

___

### onAfterRender

▸ `Optional` **onAfterRender**(): `void`

#### Returns

`void`

#### Inherited from

[LayoutGroup](LayoutGroup.md).[onAfterRender](LayoutGroup.md#onafterrender)

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

[LayoutGroup](LayoutGroup.md).[onBeforeRender](LayoutGroup.md#onbeforerender)

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

[LayoutGroup](LayoutGroup.md).[onCollisionEnter](LayoutGroup.md#oncollisionenter)

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

[LayoutGroup](LayoutGroup.md).[onCollisionExit](LayoutGroup.md#oncollisionexit)

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

[LayoutGroup](LayoutGroup.md).[onCollisionStay](LayoutGroup.md#oncollisionstay)

___

### onDestroy

▸ **onDestroy**(): `void`

#### Returns

`void`

#### Inherited from

[LayoutGroup](LayoutGroup.md).[onDestroy](LayoutGroup.md#ondestroy)

___

### onDisable

▸ **onDisable**(): `void`

#### Returns

`void`

#### Inherited from

[LayoutGroup](LayoutGroup.md).[onDisable](LayoutGroup.md#ondisable)

___

### onEnable

▸ **onEnable**(): `void`

called every time when the component gets enabled (this is invoked after awake and before start)

#### Returns

`void`

#### Inherited from

[LayoutGroup](LayoutGroup.md).[onEnable](LayoutGroup.md#onenable)

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

[LayoutGroup](LayoutGroup.md).[onTriggerEnter](LayoutGroup.md#ontriggerenter)

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

[LayoutGroup](LayoutGroup.md).[onTriggerExit](LayoutGroup.md#ontriggerexit)

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

[LayoutGroup](LayoutGroup.md).[onTriggerStay](LayoutGroup.md#ontriggerstay)

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

[LayoutGroup](LayoutGroup.md).[onValidate](LayoutGroup.md#onvalidate)

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

[LayoutGroup](LayoutGroup.md).[removeEventListener](LayoutGroup.md#removeeventlistener)

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

[LayoutGroup](LayoutGroup.md).[resolveGuids](LayoutGroup.md#resolveguids)

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

[LayoutGroup](LayoutGroup.md).[setWorldPosition](LayoutGroup.md#setworldposition)

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

[LayoutGroup](LayoutGroup.md).[setWorldQuaternion](LayoutGroup.md#setworldquaternion)

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

[LayoutGroup](LayoutGroup.md).[setWorldRotation](LayoutGroup.md#setworldrotation)

___

### start

▸ `Optional` **start**(): `void`

#### Returns

`void`

#### Inherited from

[LayoutGroup](LayoutGroup.md).[start](LayoutGroup.md#start)

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

[LayoutGroup](LayoutGroup.md).[startCoroutine](LayoutGroup.md#startcoroutine)

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

[LayoutGroup](LayoutGroup.md).[stopCoroutine](LayoutGroup.md#stopcoroutine)

___

### update

▸ `Optional` **update**(): `void`

#### Returns

`void`

#### Inherited from

[LayoutGroup](LayoutGroup.md).[update](LayoutGroup.md#update)
