[com.needle.engine - v2.39.0-pre](../README.md) / RawImage

# Class: RawImage

## Hierarchy

- [`MaskableGraphic`](MaskableGraphic.md)

  ↳ **`RawImage`**

## Table of contents

### Properties

- [gameObject](RawImage.md#gameobject)
- [guid](RawImage.md#guid)
- [mainTexture](RawImage.md#maintexture)
- [raycastTarget](RawImage.md#raycasttarget)
- [shadowComponent](RawImage.md#shadowcomponent)
- [sourceId](RawImage.md#sourceid)

### Accessors

- [activeAndEnabled](RawImage.md#activeandenabled)
- [color](RawImage.md#color)
- [context](RawImage.md#context)
- [controlsChildLayout](RawImage.md#controlschildlayout)
- [destroyed](RawImage.md#destroyed)
- [enabled](RawImage.md#enabled)
- [forward](RawImage.md#forward)
- [hideFlags](RawImage.md#hideflags)
- [isComponent](RawImage.md#iscomponent)
- [isGraphic](RawImage.md#isgraphic)
- [layer](RawImage.md#layer)
- [name](RawImage.md#name)
- [scene](RawImage.md#scene)
- [static](RawImage.md#static)
- [tag](RawImage.md#tag)
- [worldEuler](RawImage.md#worldeuler)
- [worldPosition](RawImage.md#worldposition)
- [worldQuaternion](RawImage.md#worldquaternion)
- [worldRotation](RawImage.md#worldrotation)

### Methods

- [addEventListener](RawImage.md#addeventlistener)
- [awake](RawImage.md#awake)
- [destroy](RawImage.md#destroy)
- [dispatchEvent](RawImage.md#dispatchevent)
- [earlyUpdate](RawImage.md#earlyupdate)
- [isRoot](RawImage.md#isroot)
- [lateUpdate](RawImage.md#lateupdate)
- [markDirty](RawImage.md#markdirty)
- [onAfterRender](RawImage.md#onafterrender)
- [onBeforeRender](RawImage.md#onbeforerender)
- [onCollisionEnter](RawImage.md#oncollisionenter)
- [onCollisionExit](RawImage.md#oncollisionexit)
- [onCollisionStay](RawImage.md#oncollisionstay)
- [onDestroy](RawImage.md#ondestroy)
- [onDisable](RawImage.md#ondisable)
- [onEnable](RawImage.md#onenable)
- [onTriggerEnter](RawImage.md#ontriggerenter)
- [onTriggerExit](RawImage.md#ontriggerexit)
- [onTriggerStay](RawImage.md#ontriggerstay)
- [onValidate](RawImage.md#onvalidate)
- [removeEventListener](RawImage.md#removeeventlistener)
- [resolveGuids](RawImage.md#resolveguids)
- [set](RawImage.md#set)
- [setInteractable](RawImage.md#setinteractable)
- [setOptions](RawImage.md#setoptions)
- [setState](RawImage.md#setstate)
- [setWorldPosition](RawImage.md#setworldposition)
- [setWorldQuaternion](RawImage.md#setworldquaternion)
- [setWorldRotation](RawImage.md#setworldrotation)
- [setupState](RawImage.md#setupstate)
- [start](RawImage.md#start)
- [startCoroutine](RawImage.md#startcoroutine)
- [stopCoroutine](RawImage.md#stopcoroutine)
- [update](RawImage.md#update)

## Properties

### gameObject

• **gameObject**: [`GameObject`](GameObject.md)

#### Inherited from

[MaskableGraphic](MaskableGraphic.md).[gameObject](MaskableGraphic.md#gameobject)

___

### guid

• **guid**: `string` = `"invalid"`

#### Inherited from

[MaskableGraphic](MaskableGraphic.md).[guid](MaskableGraphic.md#guid)

___

### mainTexture

• `Optional` **mainTexture**: `Texture`

___

### raycastTarget

• **raycastTarget**: `boolean` = `true`

#### Inherited from

[MaskableGraphic](MaskableGraphic.md).[raycastTarget](MaskableGraphic.md#raycasttarget)

___

### shadowComponent

• **shadowComponent**: ``null`` \| `Block` = `null`

#### Inherited from

[MaskableGraphic](MaskableGraphic.md).[shadowComponent](MaskableGraphic.md#shadowcomponent)

___

### sourceId

• `Optional` **sourceId**: `string`

#### Inherited from

[MaskableGraphic](MaskableGraphic.md).[sourceId](MaskableGraphic.md#sourceid)

## Accessors

### activeAndEnabled

• `get` **activeAndEnabled**(): `boolean`

#### Returns

`boolean`

#### Inherited from

MaskableGraphic.activeAndEnabled

___

### color

• `get` **color**(): [`RGBAColor`](RGBAColor.md)

#### Returns

[`RGBAColor`](RGBAColor.md)

#### Inherited from

MaskableGraphic.color

• `set` **color**(`col`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `col` | [`RGBAColor`](RGBAColor.md) |

#### Returns

`void`

#### Inherited from

MaskableGraphic.color

___

### context

• `get` **context**(): `Context`

#### Returns

`Context`

#### Inherited from

MaskableGraphic.context

• `set` **context**(`context`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `Context` |

#### Returns

`void`

#### Inherited from

MaskableGraphic.context

___

### controlsChildLayout

• `get` **controlsChildLayout**(): `boolean`

#### Returns

`boolean`

#### Inherited from

MaskableGraphic.controlsChildLayout

• `set` **controlsChildLayout**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `boolean` |

#### Returns

`void`

#### Inherited from

MaskableGraphic.controlsChildLayout

___

### destroyed

• `get` **destroyed**(): `boolean`

#### Returns

`boolean`

#### Inherited from

MaskableGraphic.destroyed

___

### enabled

• `get` **enabled**(): `boolean`

#### Returns

`boolean`

#### Inherited from

MaskableGraphic.enabled

• `set` **enabled**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `boolean` |

#### Returns

`void`

#### Inherited from

MaskableGraphic.enabled

___

### forward

• `get` **forward**(): `Vector3`

#### Returns

`Vector3`

#### Inherited from

MaskableGraphic.forward

___

### hideFlags

• `get` **hideFlags**(): [`HideFlags`](../enums/HideFlags.md)

#### Returns

[`HideFlags`](../enums/HideFlags.md)

#### Inherited from

MaskableGraphic.hideFlags

___

### isComponent

• `get` **isComponent**(): `boolean`

#### Returns

`boolean`

#### Inherited from

MaskableGraphic.isComponent

___

### isGraphic

• `get` **isGraphic**(): `boolean`

#### Returns

`boolean`

#### Inherited from

MaskableGraphic.isGraphic

___

### layer

• `get` **layer**(): `number`

#### Returns

`number`

#### Inherited from

MaskableGraphic.layer

___

### name

• `get` **name**(): `string`

#### Returns

`string`

#### Inherited from

MaskableGraphic.name

• `set` **name**(`str`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`void`

#### Inherited from

MaskableGraphic.name

___

### scene

• `get` **scene**(): `Scene`

#### Returns

`Scene`

#### Inherited from

MaskableGraphic.scene

___

### static

• `get` **static**(): `any`

#### Returns

`any`

#### Inherited from

MaskableGraphic.static

___

### tag

• `get` **tag**(): `string`

#### Returns

`string`

#### Inherited from

MaskableGraphic.tag

• `set` **tag**(`str`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`void`

#### Inherited from

MaskableGraphic.tag

___

### worldEuler

• `get` **worldEuler**(): `Euler`

#### Returns

`Euler`

#### Inherited from

MaskableGraphic.worldEuler

• `set` **worldEuler**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `Euler` |

#### Returns

`void`

#### Inherited from

MaskableGraphic.worldEuler

___

### worldPosition

• `get` **worldPosition**(): `Vector3`

#### Returns

`Vector3`

#### Inherited from

MaskableGraphic.worldPosition

• `set` **worldPosition**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `Vector3` |

#### Returns

`void`

#### Inherited from

MaskableGraphic.worldPosition

___

### worldQuaternion

• `get` **worldQuaternion**(): `Quaternion`

#### Returns

`Quaternion`

#### Inherited from

MaskableGraphic.worldQuaternion

• `set` **worldQuaternion**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `Quaternion` |

#### Returns

`void`

#### Inherited from

MaskableGraphic.worldQuaternion

___

### worldRotation

• `get` **worldRotation**(): `Vector3`

#### Returns

`Vector3`

#### Inherited from

MaskableGraphic.worldRotation

• `set` **worldRotation**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `Vector3` |

#### Returns

`void`

#### Inherited from

MaskableGraphic.worldRotation

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

[MaskableGraphic](MaskableGraphic.md).[addEventListener](MaskableGraphic.md#addeventlistener)

___

### awake

▸ **awake**(): `void`

called once when the component becomes active for the first time

#### Returns

`void`

#### Inherited from

[MaskableGraphic](MaskableGraphic.md).[awake](MaskableGraphic.md#awake)

___

### destroy

▸ **destroy**(): `void`

#### Returns

`void`

#### Inherited from

[MaskableGraphic](MaskableGraphic.md).[destroy](MaskableGraphic.md#destroy)

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

[MaskableGraphic](MaskableGraphic.md).[dispatchEvent](MaskableGraphic.md#dispatchevent)

___

### earlyUpdate

▸ `Optional` **earlyUpdate**(): `void`

#### Returns

`void`

#### Inherited from

[MaskableGraphic](MaskableGraphic.md).[earlyUpdate](MaskableGraphic.md#earlyupdate)

___

### isRoot

▸ **isRoot**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[MaskableGraphic](MaskableGraphic.md).[isRoot](MaskableGraphic.md#isroot)

___

### lateUpdate

▸ `Optional` **lateUpdate**(): `void`

#### Returns

`void`

#### Inherited from

[MaskableGraphic](MaskableGraphic.md).[lateUpdate](MaskableGraphic.md#lateupdate)

___

### markDirty

▸ **markDirty**(): `void`

#### Returns

`void`

#### Inherited from

[MaskableGraphic](MaskableGraphic.md).[markDirty](MaskableGraphic.md#markdirty)

___

### onAfterRender

▸ `Optional` **onAfterRender**(): `void`

#### Returns

`void`

#### Inherited from

[MaskableGraphic](MaskableGraphic.md).[onAfterRender](MaskableGraphic.md#onafterrender)

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

[MaskableGraphic](MaskableGraphic.md).[onBeforeRender](MaskableGraphic.md#onbeforerender)

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

[MaskableGraphic](MaskableGraphic.md).[onCollisionEnter](MaskableGraphic.md#oncollisionenter)

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

[MaskableGraphic](MaskableGraphic.md).[onCollisionExit](MaskableGraphic.md#oncollisionexit)

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

[MaskableGraphic](MaskableGraphic.md).[onCollisionStay](MaskableGraphic.md#oncollisionstay)

___

### onDestroy

▸ **onDestroy**(): `void`

#### Returns

`void`

#### Inherited from

[MaskableGraphic](MaskableGraphic.md).[onDestroy](MaskableGraphic.md#ondestroy)

___

### onDisable

▸ **onDisable**(): `void`

#### Returns

`void`

#### Inherited from

[MaskableGraphic](MaskableGraphic.md).[onDisable](MaskableGraphic.md#ondisable)

___

### onEnable

▸ **onEnable**(): `void`

called every time when the component gets enabled (this is invoked after awake and before start)

#### Returns

`void`

#### Inherited from

[MaskableGraphic](MaskableGraphic.md).[onEnable](MaskableGraphic.md#onenable)

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

[MaskableGraphic](MaskableGraphic.md).[onTriggerEnter](MaskableGraphic.md#ontriggerenter)

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

[MaskableGraphic](MaskableGraphic.md).[onTriggerExit](MaskableGraphic.md#ontriggerexit)

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

[MaskableGraphic](MaskableGraphic.md).[onTriggerStay](MaskableGraphic.md#ontriggerstay)

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

[MaskableGraphic](MaskableGraphic.md).[onValidate](MaskableGraphic.md#onvalidate)

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

[MaskableGraphic](MaskableGraphic.md).[removeEventListener](MaskableGraphic.md#removeeventlistener)

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

[MaskableGraphic](MaskableGraphic.md).[resolveGuids](MaskableGraphic.md#resolveguids)

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

[MaskableGraphic](MaskableGraphic.md).[set](MaskableGraphic.md#set)

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

[MaskableGraphic](MaskableGraphic.md).[setInteractable](MaskableGraphic.md#setinteractable)

___

### setOptions

▸ **setOptions**(`opts`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | `object` |

#### Returns

`void`

#### Inherited from

[MaskableGraphic](MaskableGraphic.md).[setOptions](MaskableGraphic.md#setoptions)

___

### setState

▸ **setState**(`state`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | `string` |

#### Returns

`void`

#### Inherited from

[MaskableGraphic](MaskableGraphic.md).[setState](MaskableGraphic.md#setstate)

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

[MaskableGraphic](MaskableGraphic.md).[setWorldPosition](MaskableGraphic.md#setworldposition)

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

[MaskableGraphic](MaskableGraphic.md).[setWorldQuaternion](MaskableGraphic.md#setworldquaternion)

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

[MaskableGraphic](MaskableGraphic.md).[setWorldRotation](MaskableGraphic.md#setworldrotation)

___

### setupState

▸ **setupState**(`state`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | `object` |

#### Returns

`void`

#### Inherited from

[MaskableGraphic](MaskableGraphic.md).[setupState](MaskableGraphic.md#setupstate)

___

### start

▸ `Optional` **start**(): `void`

#### Returns

`void`

#### Inherited from

[MaskableGraphic](MaskableGraphic.md).[start](MaskableGraphic.md#start)

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

[MaskableGraphic](MaskableGraphic.md).[startCoroutine](MaskableGraphic.md#startcoroutine)

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

[MaskableGraphic](MaskableGraphic.md).[stopCoroutine](MaskableGraphic.md#stopcoroutine)

___

### update

▸ `Optional` **update**(): `void`

#### Returns

`void`

#### Inherited from

[MaskableGraphic](MaskableGraphic.md).[update](MaskableGraphic.md#update)
