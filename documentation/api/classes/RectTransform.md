[com.needle.engine - v2.39.0-pre](../README.md) / RectTransform

# Class: RectTransform

## Hierarchy

- [`BaseUIComponent`](BaseUIComponent.md)

  ↳ **`RectTransform`**

## Table of contents

### Properties

- [anchoredPosition3D](RectTransform.md#anchoredposition3d)
- [gameObject](RectTransform.md#gameobject)
- [guid](RectTransform.md#guid)
- [offset](RectTransform.md#offset)
- [pivot](RectTransform.md#pivot)
- [rect](RectTransform.md#rect)
- [shadowComponent](RectTransform.md#shadowcomponent)
- [sizeDelta](RectTransform.md#sizedelta)
- [sourceId](RectTransform.md#sourceid)

### Accessors

- [activeAndEnabled](RectTransform.md#activeandenabled)
- [context](RectTransform.md#context)
- [controlsChildLayout](RectTransform.md#controlschildlayout)
- [destroyed](RectTransform.md#destroyed)
- [enabled](RectTransform.md#enabled)
- [forward](RectTransform.md#forward)
- [hideFlags](RectTransform.md#hideflags)
- [isComponent](RectTransform.md#iscomponent)
- [layer](RectTransform.md#layer)
- [name](RectTransform.md#name)
- [rotation](RectTransform.md#rotation)
- [scale](RectTransform.md#scale)
- [scene](RectTransform.md#scene)
- [static](RectTransform.md#static)
- [tag](RectTransform.md#tag)
- [translation](RectTransform.md#translation)
- [worldEuler](RectTransform.md#worldeuler)
- [worldPosition](RectTransform.md#worldposition)
- [worldQuaternion](RectTransform.md#worldquaternion)
- [worldRotation](RectTransform.md#worldrotation)

### Methods

- [addEventListener](RectTransform.md#addeventlistener)
- [awake](RectTransform.md#awake)
- [createNewBlock](RectTransform.md#createnewblock)
- [destroy](RectTransform.md#destroy)
- [dispatchEvent](RectTransform.md#dispatchevent)
- [earlyUpdate](RectTransform.md#earlyupdate)
- [getBasicOptions](RectTransform.md#getbasicoptions)
- [isRoot](RectTransform.md#isroot)
- [lateUpdate](RectTransform.md#lateupdate)
- [markDirty](RectTransform.md#markdirty)
- [onAfterRender](RectTransform.md#onafterrender)
- [onBeforeRender](RectTransform.md#onbeforerender)
- [onCollisionEnter](RectTransform.md#oncollisionenter)
- [onCollisionExit](RectTransform.md#oncollisionexit)
- [onCollisionStay](RectTransform.md#oncollisionstay)
- [onDestroy](RectTransform.md#ondestroy)
- [onDisable](RectTransform.md#ondisable)
- [onEnable](RectTransform.md#onenable)
- [onTriggerEnter](RectTransform.md#ontriggerenter)
- [onTriggerExit](RectTransform.md#ontriggerexit)
- [onTriggerStay](RectTransform.md#ontriggerstay)
- [onValidate](RectTransform.md#onvalidate)
- [removeEventListener](RectTransform.md#removeeventlistener)
- [resolveGuids](RectTransform.md#resolveguids)
- [set](RectTransform.md#set)
- [setInteractable](RectTransform.md#setinteractable)
- [setWorldPosition](RectTransform.md#setworldposition)
- [setWorldQuaternion](RectTransform.md#setworldquaternion)
- [setWorldRotation](RectTransform.md#setworldrotation)
- [start](RectTransform.md#start)
- [startCoroutine](RectTransform.md#startcoroutine)
- [stopCoroutine](RectTransform.md#stopcoroutine)
- [update](RectTransform.md#update)

## Properties

### anchoredPosition3D

• `Optional` **anchoredPosition3D**: `Vector3`

___

### gameObject

• **gameObject**: [`GameObject`](GameObject.md)

#### Inherited from

[BaseUIComponent](BaseUIComponent.md).[gameObject](BaseUIComponent.md#gameobject)

___

### guid

• **guid**: `string` = `"invalid"`

#### Inherited from

[BaseUIComponent](BaseUIComponent.md).[guid](BaseUIComponent.md#guid)

___

### offset

• **offset**: `number` = `0.01`

___

### pivot

• `Optional` **pivot**: `Vector2`

___

### rect

• `Optional` **rect**: [`Rect`](Rect.md)

___

### shadowComponent

• **shadowComponent**: ``null`` \| `Block` = `null`

#### Inherited from

[BaseUIComponent](BaseUIComponent.md).[shadowComponent](BaseUIComponent.md#shadowcomponent)

___

### sizeDelta

• **sizeDelta**: `Vector2`

___

### sourceId

• `Optional` **sourceId**: `string`

#### Inherited from

[BaseUIComponent](BaseUIComponent.md).[sourceId](BaseUIComponent.md#sourceid)

## Accessors

### activeAndEnabled

• `get` **activeAndEnabled**(): `boolean`

#### Returns

`boolean`

#### Inherited from

BaseUIComponent.activeAndEnabled

___

### context

• `get` **context**(): `Context`

#### Returns

`Context`

#### Inherited from

BaseUIComponent.context

• `set` **context**(`context`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `Context` |

#### Returns

`void`

#### Inherited from

BaseUIComponent.context

___

### controlsChildLayout

• `get` **controlsChildLayout**(): `boolean`

#### Returns

`boolean`

#### Inherited from

BaseUIComponent.controlsChildLayout

• `set` **controlsChildLayout**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `boolean` |

#### Returns

`void`

#### Inherited from

BaseUIComponent.controlsChildLayout

___

### destroyed

• `get` **destroyed**(): `boolean`

#### Returns

`boolean`

#### Inherited from

BaseUIComponent.destroyed

___

### enabled

• `get` **enabled**(): `boolean`

#### Returns

`boolean`

#### Inherited from

BaseUIComponent.enabled

• `set` **enabled**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `boolean` |

#### Returns

`void`

#### Inherited from

BaseUIComponent.enabled

___

### forward

• `get` **forward**(): `Vector3`

#### Returns

`Vector3`

#### Inherited from

BaseUIComponent.forward

___

### hideFlags

• `get` **hideFlags**(): [`HideFlags`](../enums/HideFlags.md)

#### Returns

[`HideFlags`](../enums/HideFlags.md)

#### Inherited from

BaseUIComponent.hideFlags

___

### isComponent

• `get` **isComponent**(): `boolean`

#### Returns

`boolean`

#### Inherited from

BaseUIComponent.isComponent

___

### layer

• `get` **layer**(): `number`

#### Returns

`number`

#### Inherited from

BaseUIComponent.layer

___

### name

• `get` **name**(): `string`

#### Returns

`string`

#### Inherited from

BaseUIComponent.name

• `set` **name**(`str`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`void`

#### Inherited from

BaseUIComponent.name

___

### rotation

• `get` **rotation**(): `Quaternion`

#### Returns

`Quaternion`

___

### scale

• `get` **scale**(): `Vector3`

#### Returns

`Vector3`

___

### scene

• `get` **scene**(): `Scene`

#### Returns

`Scene`

#### Inherited from

BaseUIComponent.scene

___

### static

• `get` **static**(): `any`

#### Returns

`any`

#### Inherited from

BaseUIComponent.static

___

### tag

• `get` **tag**(): `string`

#### Returns

`string`

#### Inherited from

BaseUIComponent.tag

• `set` **tag**(`str`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`void`

#### Inherited from

BaseUIComponent.tag

___

### translation

• `get` **translation**(): `Vector3`

#### Returns

`Vector3`

___

### worldEuler

• `get` **worldEuler**(): `Euler`

#### Returns

`Euler`

#### Inherited from

BaseUIComponent.worldEuler

• `set` **worldEuler**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `Euler` |

#### Returns

`void`

#### Inherited from

BaseUIComponent.worldEuler

___

### worldPosition

• `get` **worldPosition**(): `Vector3`

#### Returns

`Vector3`

#### Inherited from

BaseUIComponent.worldPosition

• `set` **worldPosition**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `Vector3` |

#### Returns

`void`

#### Inherited from

BaseUIComponent.worldPosition

___

### worldQuaternion

• `get` **worldQuaternion**(): `Quaternion`

#### Returns

`Quaternion`

#### Inherited from

BaseUIComponent.worldQuaternion

• `set` **worldQuaternion**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `Quaternion` |

#### Returns

`void`

#### Inherited from

BaseUIComponent.worldQuaternion

___

### worldRotation

• `get` **worldRotation**(): `Vector3`

#### Returns

`Vector3`

#### Inherited from

BaseUIComponent.worldRotation

• `set` **worldRotation**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `Vector3` |

#### Returns

`void`

#### Inherited from

BaseUIComponent.worldRotation

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

[BaseUIComponent](BaseUIComponent.md).[addEventListener](BaseUIComponent.md#addeventlistener)

___

### awake

▸ **awake**(): `void`

called once when the component becomes active for the first time

#### Returns

`void`

#### Overrides

[BaseUIComponent](BaseUIComponent.md).[awake](BaseUIComponent.md#awake)

___

### createNewBlock

▸ **createNewBlock**(`opts?`): `Block`

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts?` | `object` \| `BlockOptions` |

#### Returns

`Block`

___

### destroy

▸ **destroy**(): `void`

#### Returns

`void`

#### Inherited from

[BaseUIComponent](BaseUIComponent.md).[destroy](BaseUIComponent.md#destroy)

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

[BaseUIComponent](BaseUIComponent.md).[dispatchEvent](BaseUIComponent.md#dispatchevent)

___

### earlyUpdate

▸ `Optional` **earlyUpdate**(): `void`

#### Returns

`void`

#### Inherited from

[BaseUIComponent](BaseUIComponent.md).[earlyUpdate](BaseUIComponent.md#earlyupdate)

___

### getBasicOptions

▸ **getBasicOptions**(): `BlockOptions`

#### Returns

`BlockOptions`

___

### isRoot

▸ **isRoot**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[BaseUIComponent](BaseUIComponent.md).[isRoot](BaseUIComponent.md#isroot)

___

### lateUpdate

▸ `Optional` **lateUpdate**(): `void`

#### Returns

`void`

#### Inherited from

[BaseUIComponent](BaseUIComponent.md).[lateUpdate](BaseUIComponent.md#lateupdate)

___

### markDirty

▸ **markDirty**(): `void`

#### Returns

`void`

#### Overrides

[BaseUIComponent](BaseUIComponent.md).[markDirty](BaseUIComponent.md#markdirty)

___

### onAfterRender

▸ `Optional` **onAfterRender**(): `void`

#### Returns

`void`

#### Inherited from

[BaseUIComponent](BaseUIComponent.md).[onAfterRender](BaseUIComponent.md#onafterrender)

___

### onBeforeRender

▸ **onBeforeRender**(): `void`

#### Returns

`void`

#### Overrides

[BaseUIComponent](BaseUIComponent.md).[onBeforeRender](BaseUIComponent.md#onbeforerender)

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

[BaseUIComponent](BaseUIComponent.md).[onCollisionEnter](BaseUIComponent.md#oncollisionenter)

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

[BaseUIComponent](BaseUIComponent.md).[onCollisionExit](BaseUIComponent.md#oncollisionexit)

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

[BaseUIComponent](BaseUIComponent.md).[onCollisionStay](BaseUIComponent.md#oncollisionstay)

___

### onDestroy

▸ **onDestroy**(): `void`

#### Returns

`void`

#### Inherited from

[BaseUIComponent](BaseUIComponent.md).[onDestroy](BaseUIComponent.md#ondestroy)

___

### onDisable

▸ **onDisable**(): `void`

#### Returns

`void`

#### Overrides

[BaseUIComponent](BaseUIComponent.md).[onDisable](BaseUIComponent.md#ondisable)

___

### onEnable

▸ **onEnable**(): `void`

called every time when the component gets enabled (this is invoked after awake and before start)

#### Returns

`void`

#### Overrides

[BaseUIComponent](BaseUIComponent.md).[onEnable](BaseUIComponent.md#onenable)

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

[BaseUIComponent](BaseUIComponent.md).[onTriggerEnter](BaseUIComponent.md#ontriggerenter)

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

[BaseUIComponent](BaseUIComponent.md).[onTriggerExit](BaseUIComponent.md#ontriggerexit)

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

[BaseUIComponent](BaseUIComponent.md).[onTriggerStay](BaseUIComponent.md#ontriggerstay)

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

[BaseUIComponent](BaseUIComponent.md).[onValidate](BaseUIComponent.md#onvalidate)

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

[BaseUIComponent](BaseUIComponent.md).[removeEventListener](BaseUIComponent.md#removeeventlistener)

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

[BaseUIComponent](BaseUIComponent.md).[resolveGuids](BaseUIComponent.md#resolveguids)

___

### set

▸ **set**(`_state`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `_state` | `object` |

#### Returns

`void`

#### Inherited from

[BaseUIComponent](BaseUIComponent.md).[set](BaseUIComponent.md#set)

___

### setInteractable

▸ **setInteractable**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `boolean` |

#### Returns

`void`

#### Inherited from

[BaseUIComponent](BaseUIComponent.md).[setInteractable](BaseUIComponent.md#setinteractable)

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

[BaseUIComponent](BaseUIComponent.md).[setWorldPosition](BaseUIComponent.md#setworldposition)

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

[BaseUIComponent](BaseUIComponent.md).[setWorldQuaternion](BaseUIComponent.md#setworldquaternion)

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

[BaseUIComponent](BaseUIComponent.md).[setWorldRotation](BaseUIComponent.md#setworldrotation)

___

### start

▸ `Optional` **start**(): `void`

#### Returns

`void`

#### Inherited from

[BaseUIComponent](BaseUIComponent.md).[start](BaseUIComponent.md#start)

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

[BaseUIComponent](BaseUIComponent.md).[startCoroutine](BaseUIComponent.md#startcoroutine)

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

[BaseUIComponent](BaseUIComponent.md).[stopCoroutine](BaseUIComponent.md#stopcoroutine)

___

### update

▸ `Optional` **update**(): `void`

#### Returns

`void`

#### Inherited from

[BaseUIComponent](BaseUIComponent.md).[update](BaseUIComponent.md#update)
