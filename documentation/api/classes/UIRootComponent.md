[com.needle.engine - v2.39.0-pre](../README.md) / UIRootComponent

# Class: UIRootComponent

## Hierarchy

- [`BaseUIComponent`](BaseUIComponent.md)

  ↳ **`UIRootComponent`**

  ↳↳ [`Canvas`](Canvas.md)

## Table of contents

### Properties

- [gameObject](UIRootComponent.md#gameobject)
- [guid](UIRootComponent.md#guid)
- [shadowComponent](UIRootComponent.md#shadowcomponent)
- [sourceId](UIRootComponent.md#sourceid)

### Accessors

- [activeAndEnabled](UIRootComponent.md#activeandenabled)
- [context](UIRootComponent.md#context)
- [controlsChildLayout](UIRootComponent.md#controlschildlayout)
- [destroyed](UIRootComponent.md#destroyed)
- [enabled](UIRootComponent.md#enabled)
- [forward](UIRootComponent.md#forward)
- [hideFlags](UIRootComponent.md#hideflags)
- [isComponent](UIRootComponent.md#iscomponent)
- [layer](UIRootComponent.md#layer)
- [name](UIRootComponent.md#name)
- [scene](UIRootComponent.md#scene)
- [static](UIRootComponent.md#static)
- [tag](UIRootComponent.md#tag)
- [worldEuler](UIRootComponent.md#worldeuler)
- [worldPosition](UIRootComponent.md#worldposition)
- [worldQuaternion](UIRootComponent.md#worldquaternion)
- [worldRotation](UIRootComponent.md#worldrotation)

### Methods

- [addEventListener](UIRootComponent.md#addeventlistener)
- [awake](UIRootComponent.md#awake)
- [destroy](UIRootComponent.md#destroy)
- [dispatchEvent](UIRootComponent.md#dispatchevent)
- [earlyUpdate](UIRootComponent.md#earlyupdate)
- [isRoot](UIRootComponent.md#isroot)
- [lateUpdate](UIRootComponent.md#lateupdate)
- [markDirty](UIRootComponent.md#markdirty)
- [onAfterRender](UIRootComponent.md#onafterrender)
- [onBeforeRender](UIRootComponent.md#onbeforerender)
- [onCollisionEnter](UIRootComponent.md#oncollisionenter)
- [onCollisionExit](UIRootComponent.md#oncollisionexit)
- [onCollisionStay](UIRootComponent.md#oncollisionstay)
- [onDestroy](UIRootComponent.md#ondestroy)
- [onDisable](UIRootComponent.md#ondisable)
- [onEnable](UIRootComponent.md#onenable)
- [onTriggerEnter](UIRootComponent.md#ontriggerenter)
- [onTriggerExit](UIRootComponent.md#ontriggerexit)
- [onTriggerStay](UIRootComponent.md#ontriggerstay)
- [onValidate](UIRootComponent.md#onvalidate)
- [removeEventListener](UIRootComponent.md#removeeventlistener)
- [resolveGuids](UIRootComponent.md#resolveguids)
- [set](UIRootComponent.md#set)
- [setInteractable](UIRootComponent.md#setinteractable)
- [setWorldPosition](UIRootComponent.md#setworldposition)
- [setWorldQuaternion](UIRootComponent.md#setworldquaternion)
- [setWorldRotation](UIRootComponent.md#setworldrotation)
- [start](UIRootComponent.md#start)
- [startCoroutine](UIRootComponent.md#startcoroutine)
- [stopCoroutine](UIRootComponent.md#stopcoroutine)
- [update](UIRootComponent.md#update)

## Properties

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

### shadowComponent

• **shadowComponent**: ``null`` \| `Block` = `null`

#### Inherited from

[BaseUIComponent](BaseUIComponent.md).[shadowComponent](BaseUIComponent.md#shadowcomponent)

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

#### Inherited from

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

▸ `Optional` **onBeforeRender**(`frame`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `frame` | ``null`` \| `XRFrame` |

#### Returns

`void`

#### Inherited from

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

#### Inherited from

[BaseUIComponent](BaseUIComponent.md).[onDisable](BaseUIComponent.md#ondisable)

___

### onEnable

▸ **onEnable**(): `void`

called every time when the component gets enabled (this is invoked after awake and before start)

#### Returns

`void`

#### Inherited from

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
