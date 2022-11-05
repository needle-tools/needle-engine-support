[com.needle.engine - v2.39.0-pre](../README.md) / Canvas

# Class: Canvas

## Hierarchy

- [`UIRootComponent`](UIRootComponent.md)

  ↳ **`Canvas`**

## Table of contents

### Properties

- [gameObject](Canvas.md#gameobject)
- [guid](Canvas.md#guid)
- [shadowComponent](Canvas.md#shadowcomponent)
- [sourceId](Canvas.md#sourceid)

### Accessors

- [activeAndEnabled](Canvas.md#activeandenabled)
- [castShadows](Canvas.md#castshadows)
- [context](Canvas.md#context)
- [controlsChildLayout](Canvas.md#controlschildlayout)
- [depthWrite](Canvas.md#depthwrite)
- [destroyed](Canvas.md#destroyed)
- [doubleSided](Canvas.md#doublesided)
- [enabled](Canvas.md#enabled)
- [forward](Canvas.md#forward)
- [hideFlags](Canvas.md#hideflags)
- [isComponent](Canvas.md#iscomponent)
- [layer](Canvas.md#layer)
- [name](Canvas.md#name)
- [receiveShadows](Canvas.md#receiveshadows)
- [renderMode](Canvas.md#rendermode)
- [renderOnTop](Canvas.md#renderontop)
- [rootCanvas](Canvas.md#rootcanvas)
- [scaleFactor](Canvas.md#scalefactor)
- [scene](Canvas.md#scene)
- [static](Canvas.md#static)
- [tag](Canvas.md#tag)
- [worldEuler](Canvas.md#worldeuler)
- [worldPosition](Canvas.md#worldposition)
- [worldQuaternion](Canvas.md#worldquaternion)
- [worldRotation](Canvas.md#worldrotation)

### Methods

- [addEventListener](Canvas.md#addeventlistener)
- [awake](Canvas.md#awake)
- [destroy](Canvas.md#destroy)
- [dispatchEvent](Canvas.md#dispatchevent)
- [earlyUpdate](Canvas.md#earlyupdate)
- [isRoot](Canvas.md#isroot)
- [lateUpdate](Canvas.md#lateupdate)
- [markDirty](Canvas.md#markdirty)
- [onAfterRender](Canvas.md#onafterrender)
- [onBeforeRender](Canvas.md#onbeforerender)
- [onCollisionEnter](Canvas.md#oncollisionenter)
- [onCollisionExit](Canvas.md#oncollisionexit)
- [onCollisionStay](Canvas.md#oncollisionstay)
- [onDestroy](Canvas.md#ondestroy)
- [onDisable](Canvas.md#ondisable)
- [onEnable](Canvas.md#onenable)
- [onTriggerEnter](Canvas.md#ontriggerenter)
- [onTriggerExit](Canvas.md#ontriggerexit)
- [onTriggerStay](Canvas.md#ontriggerstay)
- [onValidate](Canvas.md#onvalidate)
- [removeEventListener](Canvas.md#removeeventlistener)
- [resolveGuids](Canvas.md#resolveguids)
- [set](Canvas.md#set)
- [setInteractable](Canvas.md#setinteractable)
- [setWorldPosition](Canvas.md#setworldposition)
- [setWorldQuaternion](Canvas.md#setworldquaternion)
- [setWorldRotation](Canvas.md#setworldrotation)
- [start](Canvas.md#start)
- [startCoroutine](Canvas.md#startcoroutine)
- [stopCoroutine](Canvas.md#stopcoroutine)
- [update](Canvas.md#update)

## Properties

### gameObject

• **gameObject**: [`GameObject`](GameObject.md)

#### Inherited from

[UIRootComponent](UIRootComponent.md).[gameObject](UIRootComponent.md#gameobject)

___

### guid

• **guid**: `string` = `"invalid"`

#### Inherited from

[UIRootComponent](UIRootComponent.md).[guid](UIRootComponent.md#guid)

___

### shadowComponent

• **shadowComponent**: ``null`` \| `Block` = `null`

#### Inherited from

[UIRootComponent](UIRootComponent.md).[shadowComponent](UIRootComponent.md#shadowcomponent)

___

### sourceId

• `Optional` **sourceId**: `string`

#### Inherited from

[UIRootComponent](UIRootComponent.md).[sourceId](UIRootComponent.md#sourceid)

## Accessors

### activeAndEnabled

• `get` **activeAndEnabled**(): `boolean`

#### Returns

`boolean`

#### Inherited from

UIRootComponent.activeAndEnabled

___

### castShadows

• `get` **castShadows**(): `boolean`

#### Returns

`boolean`

• `set` **castShadows**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `boolean` |

#### Returns

`void`

___

### context

• `get` **context**(): `Context`

#### Returns

`Context`

#### Inherited from

UIRootComponent.context

• `set` **context**(`context`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `Context` |

#### Returns

`void`

#### Inherited from

UIRootComponent.context

___

### controlsChildLayout

• `get` **controlsChildLayout**(): `boolean`

#### Returns

`boolean`

#### Inherited from

UIRootComponent.controlsChildLayout

• `set` **controlsChildLayout**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `boolean` |

#### Returns

`void`

#### Inherited from

UIRootComponent.controlsChildLayout

___

### depthWrite

• `get` **depthWrite**(): `boolean`

#### Returns

`boolean`

• `set` **depthWrite**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `boolean` |

#### Returns

`void`

___

### destroyed

• `get` **destroyed**(): `boolean`

#### Returns

`boolean`

#### Inherited from

UIRootComponent.destroyed

___

### doubleSided

• `get` **doubleSided**(): `boolean`

#### Returns

`boolean`

• `set` **doubleSided**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `boolean` |

#### Returns

`void`

___

### enabled

• `get` **enabled**(): `boolean`

#### Returns

`boolean`

#### Inherited from

UIRootComponent.enabled

• `set` **enabled**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `boolean` |

#### Returns

`void`

#### Inherited from

UIRootComponent.enabled

___

### forward

• `get` **forward**(): `Vector3`

#### Returns

`Vector3`

#### Inherited from

UIRootComponent.forward

___

### hideFlags

• `get` **hideFlags**(): [`HideFlags`](../enums/HideFlags.md)

#### Returns

[`HideFlags`](../enums/HideFlags.md)

#### Inherited from

UIRootComponent.hideFlags

___

### isComponent

• `get` **isComponent**(): `boolean`

#### Returns

`boolean`

#### Inherited from

UIRootComponent.isComponent

___

### layer

• `get` **layer**(): `number`

#### Returns

`number`

#### Inherited from

UIRootComponent.layer

___

### name

• `get` **name**(): `string`

#### Returns

`string`

#### Inherited from

UIRootComponent.name

• `set` **name**(`str`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`void`

#### Inherited from

UIRootComponent.name

___

### receiveShadows

• `get` **receiveShadows**(): `boolean`

#### Returns

`boolean`

• `set` **receiveShadows**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `boolean` |

#### Returns

`void`

___

### renderMode

• `get` **renderMode**(): `RenderMode`

#### Returns

`RenderMode`

• `set` **renderMode**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `RenderMode` |

#### Returns

`void`

___

### renderOnTop

• `get` **renderOnTop**(): `boolean`

#### Returns

`boolean`

• `set` **renderOnTop**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `boolean` |

#### Returns

`void`

___

### rootCanvas

• `get` **rootCanvas**(): [`Canvas`](Canvas.md)

#### Returns

[`Canvas`](Canvas.md)

• `set` **rootCanvas**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | [`Canvas`](Canvas.md) |

#### Returns

`void`

___

### scaleFactor

• `get` **scaleFactor**(): `number`

#### Returns

`number`

• `set` **scaleFactor**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `number` |

#### Returns

`void`

___

### scene

• `get` **scene**(): `Scene`

#### Returns

`Scene`

#### Inherited from

UIRootComponent.scene

___

### static

• `get` **static**(): `any`

#### Returns

`any`

#### Inherited from

UIRootComponent.static

___

### tag

• `get` **tag**(): `string`

#### Returns

`string`

#### Inherited from

UIRootComponent.tag

• `set` **tag**(`str`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`void`

#### Inherited from

UIRootComponent.tag

___

### worldEuler

• `get` **worldEuler**(): `Euler`

#### Returns

`Euler`

#### Inherited from

UIRootComponent.worldEuler

• `set` **worldEuler**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `Euler` |

#### Returns

`void`

#### Inherited from

UIRootComponent.worldEuler

___

### worldPosition

• `get` **worldPosition**(): `Vector3`

#### Returns

`Vector3`

#### Inherited from

UIRootComponent.worldPosition

• `set` **worldPosition**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `Vector3` |

#### Returns

`void`

#### Inherited from

UIRootComponent.worldPosition

___

### worldQuaternion

• `get` **worldQuaternion**(): `Quaternion`

#### Returns

`Quaternion`

#### Inherited from

UIRootComponent.worldQuaternion

• `set` **worldQuaternion**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `Quaternion` |

#### Returns

`void`

#### Inherited from

UIRootComponent.worldQuaternion

___

### worldRotation

• `get` **worldRotation**(): `Vector3`

#### Returns

`Vector3`

#### Inherited from

UIRootComponent.worldRotation

• `set` **worldRotation**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `Vector3` |

#### Returns

`void`

#### Inherited from

UIRootComponent.worldRotation

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

[UIRootComponent](UIRootComponent.md).[addEventListener](UIRootComponent.md#addeventlistener)

___

### awake

▸ **awake**(): `void`

called once when the component becomes active for the first time

#### Returns

`void`

#### Overrides

[UIRootComponent](UIRootComponent.md).[awake](UIRootComponent.md#awake)

___

### destroy

▸ **destroy**(): `void`

#### Returns

`void`

#### Inherited from

[UIRootComponent](UIRootComponent.md).[destroy](UIRootComponent.md#destroy)

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

[UIRootComponent](UIRootComponent.md).[dispatchEvent](UIRootComponent.md#dispatchevent)

___

### earlyUpdate

▸ `Optional` **earlyUpdate**(): `void`

#### Returns

`void`

#### Inherited from

[UIRootComponent](UIRootComponent.md).[earlyUpdate](UIRootComponent.md#earlyupdate)

___

### isRoot

▸ **isRoot**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[UIRootComponent](UIRootComponent.md).[isRoot](UIRootComponent.md#isroot)

___

### lateUpdate

▸ `Optional` **lateUpdate**(): `void`

#### Returns

`void`

#### Inherited from

[UIRootComponent](UIRootComponent.md).[lateUpdate](UIRootComponent.md#lateupdate)

___

### markDirty

▸ **markDirty**(): `void`

#### Returns

`void`

#### Inherited from

[UIRootComponent](UIRootComponent.md).[markDirty](UIRootComponent.md#markdirty)

___

### onAfterRender

▸ `Optional` **onAfterRender**(): `void`

#### Returns

`void`

#### Inherited from

[UIRootComponent](UIRootComponent.md).[onAfterRender](UIRootComponent.md#onafterrender)

___

### onBeforeRender

▸ **onBeforeRender**(): `void`

#### Returns

`void`

#### Overrides

[UIRootComponent](UIRootComponent.md).[onBeforeRender](UIRootComponent.md#onbeforerender)

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

[UIRootComponent](UIRootComponent.md).[onCollisionEnter](UIRootComponent.md#oncollisionenter)

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

[UIRootComponent](UIRootComponent.md).[onCollisionExit](UIRootComponent.md#oncollisionexit)

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

[UIRootComponent](UIRootComponent.md).[onCollisionStay](UIRootComponent.md#oncollisionstay)

___

### onDestroy

▸ **onDestroy**(): `void`

#### Returns

`void`

#### Inherited from

[UIRootComponent](UIRootComponent.md).[onDestroy](UIRootComponent.md#ondestroy)

___

### onDisable

▸ **onDisable**(): `void`

#### Returns

`void`

#### Inherited from

[UIRootComponent](UIRootComponent.md).[onDisable](UIRootComponent.md#ondisable)

___

### onEnable

▸ **onEnable**(): `void`

called every time when the component gets enabled (this is invoked after awake and before start)

#### Returns

`void`

#### Overrides

[UIRootComponent](UIRootComponent.md).[onEnable](UIRootComponent.md#onenable)

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

[UIRootComponent](UIRootComponent.md).[onTriggerEnter](UIRootComponent.md#ontriggerenter)

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

[UIRootComponent](UIRootComponent.md).[onTriggerExit](UIRootComponent.md#ontriggerexit)

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

[UIRootComponent](UIRootComponent.md).[onTriggerStay](UIRootComponent.md#ontriggerstay)

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

[UIRootComponent](UIRootComponent.md).[onValidate](UIRootComponent.md#onvalidate)

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

[UIRootComponent](UIRootComponent.md).[removeEventListener](UIRootComponent.md#removeeventlistener)

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

[UIRootComponent](UIRootComponent.md).[resolveGuids](UIRootComponent.md#resolveguids)

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

[UIRootComponent](UIRootComponent.md).[set](UIRootComponent.md#set)

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

[UIRootComponent](UIRootComponent.md).[setInteractable](UIRootComponent.md#setinteractable)

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

[UIRootComponent](UIRootComponent.md).[setWorldPosition](UIRootComponent.md#setworldposition)

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

[UIRootComponent](UIRootComponent.md).[setWorldQuaternion](UIRootComponent.md#setworldquaternion)

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

[UIRootComponent](UIRootComponent.md).[setWorldRotation](UIRootComponent.md#setworldrotation)

___

### start

▸ `Optional` **start**(): `void`

#### Returns

`void`

#### Inherited from

[UIRootComponent](UIRootComponent.md).[start](UIRootComponent.md#start)

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

[UIRootComponent](UIRootComponent.md).[startCoroutine](UIRootComponent.md#startcoroutine)

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

[UIRootComponent](UIRootComponent.md).[stopCoroutine](UIRootComponent.md#stopcoroutine)

___

### update

▸ `Optional` **update**(): `void`

#### Returns

`void`

#### Inherited from

[UIRootComponent](UIRootComponent.md).[update](UIRootComponent.md#update)
