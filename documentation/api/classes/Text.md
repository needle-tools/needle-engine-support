[com.needle.engine - v2.39.0-pre](../README.md) / Text

# Class: Text

## Hierarchy

- [`Graphic`](Graphic.md)

  ↳ **`Text`**

## Table of contents

### Properties

- [alignment](Text.md#alignment)
- [canvas](Text.md#canvas)
- [font](Text.md#font)
- [fontStyle](Text.md#fontstyle)
- [gameObject](Text.md#gameobject)
- [guid](Text.md#guid)
- [horizontalOverflow](Text.md#horizontaloverflow)
- [lineSpacing](Text.md#linespacing)
- [raycastTarget](Text.md#raycasttarget)
- [shadowComponent](Text.md#shadowcomponent)
- [sourceId](Text.md#sourceid)
- [supportRichText](Text.md#supportrichtext)
- [verticalOverflow](Text.md#verticaloverflow)

### Accessors

- [activeAndEnabled](Text.md#activeandenabled)
- [color](Text.md#color)
- [context](Text.md#context)
- [controlsChildLayout](Text.md#controlschildlayout)
- [destroyed](Text.md#destroyed)
- [enabled](Text.md#enabled)
- [fontSize](Text.md#fontsize)
- [forward](Text.md#forward)
- [hideFlags](Text.md#hideflags)
- [isComponent](Text.md#iscomponent)
- [isGraphic](Text.md#isgraphic)
- [layer](Text.md#layer)
- [name](Text.md#name)
- [scene](Text.md#scene)
- [static](Text.md#static)
- [tag](Text.md#tag)
- [text](Text.md#text)
- [worldEuler](Text.md#worldeuler)
- [worldPosition](Text.md#worldposition)
- [worldQuaternion](Text.md#worldquaternion)
- [worldRotation](Text.md#worldrotation)

### Methods

- [addEventListener](Text.md#addeventlistener)
- [awake](Text.md#awake)
- [destroy](Text.md#destroy)
- [dispatchEvent](Text.md#dispatchevent)
- [earlyUpdate](Text.md#earlyupdate)
- [isRoot](Text.md#isroot)
- [lateUpdate](Text.md#lateupdate)
- [markDirty](Text.md#markdirty)
- [onAfterAddedToScene](Text.md#onafteraddedtoscene)
- [onAfterRender](Text.md#onafterrender)
- [onBeforeRender](Text.md#onbeforerender)
- [onCollisionEnter](Text.md#oncollisionenter)
- [onCollisionExit](Text.md#oncollisionexit)
- [onCollisionStay](Text.md#oncollisionstay)
- [onDestroy](Text.md#ondestroy)
- [onDisable](Text.md#ondisable)
- [onEnable](Text.md#onenable)
- [onTriggerEnter](Text.md#ontriggerenter)
- [onTriggerExit](Text.md#ontriggerexit)
- [onTriggerStay](Text.md#ontriggerstay)
- [onValidate](Text.md#onvalidate)
- [removeEventListener](Text.md#removeeventlistener)
- [resolveGuids](Text.md#resolveguids)
- [set](Text.md#set)
- [setInteractable](Text.md#setinteractable)
- [setOptions](Text.md#setoptions)
- [setState](Text.md#setstate)
- [setWorldPosition](Text.md#setworldposition)
- [setWorldQuaternion](Text.md#setworldquaternion)
- [setWorldRotation](Text.md#setworldrotation)
- [setupState](Text.md#setupstate)
- [start](Text.md#start)
- [startCoroutine](Text.md#startcoroutine)
- [stopCoroutine](Text.md#stopcoroutine)
- [update](Text.md#update)

## Properties

### alignment

• **alignment**: `TextAnchor` = `TextAnchor.UpperLeft`

___

### canvas

• `Optional` **canvas**: [`Canvas`](Canvas.md)

___

### font

• `Optional` **font**: `string`

___

### fontStyle

• **fontStyle**: `FontStyle` = `FontStyle.Normal`

___

### gameObject

• **gameObject**: [`GameObject`](GameObject.md)

#### Inherited from

[Graphic](Graphic.md).[gameObject](Graphic.md#gameobject)

___

### guid

• **guid**: `string` = `"invalid"`

#### Inherited from

[Graphic](Graphic.md).[guid](Graphic.md#guid)

___

### horizontalOverflow

• **horizontalOverflow**: `HorizontalWrapMode` = `HorizontalWrapMode.Wrap`

___

### lineSpacing

• **lineSpacing**: `number` = `1`

___

### raycastTarget

• **raycastTarget**: `boolean` = `true`

#### Inherited from

[Graphic](Graphic.md).[raycastTarget](Graphic.md#raycasttarget)

___

### shadowComponent

• **shadowComponent**: ``null`` \| `Block` = `null`

#### Inherited from

[Graphic](Graphic.md).[shadowComponent](Graphic.md#shadowcomponent)

___

### sourceId

• `Optional` **sourceId**: `string`

#### Inherited from

[Graphic](Graphic.md).[sourceId](Graphic.md#sourceid)

___

### supportRichText

• **supportRichText**: `boolean` = `false`

___

### verticalOverflow

• **verticalOverflow**: `VerticalWrapMode` = `VerticalWrapMode.Truncate`

## Accessors

### activeAndEnabled

• `get` **activeAndEnabled**(): `boolean`

#### Returns

`boolean`

#### Inherited from

Graphic.activeAndEnabled

___

### color

• `get` **color**(): [`RGBAColor`](RGBAColor.md)

#### Returns

[`RGBAColor`](RGBAColor.md)

#### Inherited from

Graphic.color

• `set` **color**(`col`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `col` | [`RGBAColor`](RGBAColor.md) |

#### Returns

`void`

#### Inherited from

Graphic.color

___

### context

• `get` **context**(): `Context`

#### Returns

`Context`

#### Inherited from

Graphic.context

• `set` **context**(`context`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `Context` |

#### Returns

`void`

#### Inherited from

Graphic.context

___

### controlsChildLayout

• `get` **controlsChildLayout**(): `boolean`

#### Returns

`boolean`

#### Inherited from

Graphic.controlsChildLayout

• `set` **controlsChildLayout**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `boolean` |

#### Returns

`void`

#### Inherited from

Graphic.controlsChildLayout

___

### destroyed

• `get` **destroyed**(): `boolean`

#### Returns

`boolean`

#### Inherited from

Graphic.destroyed

___

### enabled

• `get` **enabled**(): `boolean`

#### Returns

`boolean`

#### Inherited from

Graphic.enabled

• `set` **enabled**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `boolean` |

#### Returns

`void`

#### Inherited from

Graphic.enabled

___

### fontSize

• `get` **fontSize**(): `number`

#### Returns

`number`

• `set` **fontSize**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `number` |

#### Returns

`void`

___

### forward

• `get` **forward**(): `Vector3`

#### Returns

`Vector3`

#### Inherited from

Graphic.forward

___

### hideFlags

• `get` **hideFlags**(): [`HideFlags`](../enums/HideFlags.md)

#### Returns

[`HideFlags`](../enums/HideFlags.md)

#### Inherited from

Graphic.hideFlags

___

### isComponent

• `get` **isComponent**(): `boolean`

#### Returns

`boolean`

#### Inherited from

Graphic.isComponent

___

### isGraphic

• `get` **isGraphic**(): `boolean`

#### Returns

`boolean`

#### Inherited from

Graphic.isGraphic

___

### layer

• `get` **layer**(): `number`

#### Returns

`number`

#### Inherited from

Graphic.layer

___

### name

• `get` **name**(): `string`

#### Returns

`string`

#### Inherited from

Graphic.name

• `set` **name**(`str`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`void`

#### Inherited from

Graphic.name

___

### scene

• `get` **scene**(): `Scene`

#### Returns

`Scene`

#### Inherited from

Graphic.scene

___

### static

• `get` **static**(): `any`

#### Returns

`any`

#### Inherited from

Graphic.static

___

### tag

• `get` **tag**(): `string`

#### Returns

`string`

#### Inherited from

Graphic.tag

• `set` **tag**(`str`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`void`

#### Inherited from

Graphic.tag

___

### text

• `get` **text**(): `string`

#### Returns

`string`

• `set` **text**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` |

#### Returns

`void`

___

### worldEuler

• `get` **worldEuler**(): `Euler`

#### Returns

`Euler`

#### Inherited from

Graphic.worldEuler

• `set` **worldEuler**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `Euler` |

#### Returns

`void`

#### Inherited from

Graphic.worldEuler

___

### worldPosition

• `get` **worldPosition**(): `Vector3`

#### Returns

`Vector3`

#### Inherited from

Graphic.worldPosition

• `set` **worldPosition**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `Vector3` |

#### Returns

`void`

#### Inherited from

Graphic.worldPosition

___

### worldQuaternion

• `get` **worldQuaternion**(): `Quaternion`

#### Returns

`Quaternion`

#### Inherited from

Graphic.worldQuaternion

• `set` **worldQuaternion**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `Quaternion` |

#### Returns

`void`

#### Inherited from

Graphic.worldQuaternion

___

### worldRotation

• `get` **worldRotation**(): `Vector3`

#### Returns

`Vector3`

#### Inherited from

Graphic.worldRotation

• `set` **worldRotation**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `Vector3` |

#### Returns

`void`

#### Inherited from

Graphic.worldRotation

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

[Graphic](Graphic.md).[addEventListener](Graphic.md#addeventlistener)

___

### awake

▸ **awake**(): `void`

called once when the component becomes active for the first time

#### Returns

`void`

#### Inherited from

[Graphic](Graphic.md).[awake](Graphic.md#awake)

___

### destroy

▸ **destroy**(): `void`

#### Returns

`void`

#### Inherited from

[Graphic](Graphic.md).[destroy](Graphic.md#destroy)

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

[Graphic](Graphic.md).[dispatchEvent](Graphic.md#dispatchevent)

___

### earlyUpdate

▸ `Optional` **earlyUpdate**(): `void`

#### Returns

`void`

#### Inherited from

[Graphic](Graphic.md).[earlyUpdate](Graphic.md#earlyupdate)

___

### isRoot

▸ **isRoot**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[Graphic](Graphic.md).[isRoot](Graphic.md#isroot)

___

### lateUpdate

▸ `Optional` **lateUpdate**(): `void`

#### Returns

`void`

#### Inherited from

[Graphic](Graphic.md).[lateUpdate](Graphic.md#lateupdate)

___

### markDirty

▸ **markDirty**(): `void`

#### Returns

`void`

#### Inherited from

[Graphic](Graphic.md).[markDirty](Graphic.md#markdirty)

___

### onAfterAddedToScene

▸ **onAfterAddedToScene**(): `void`

#### Returns

`void`

#### Overrides

Graphic.onAfterAddedToScene

___

### onAfterRender

▸ `Optional` **onAfterRender**(): `void`

#### Returns

`void`

#### Inherited from

[Graphic](Graphic.md).[onAfterRender](Graphic.md#onafterrender)

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

[Graphic](Graphic.md).[onBeforeRender](Graphic.md#onbeforerender)

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

[Graphic](Graphic.md).[onCollisionEnter](Graphic.md#oncollisionenter)

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

[Graphic](Graphic.md).[onCollisionExit](Graphic.md#oncollisionexit)

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

[Graphic](Graphic.md).[onCollisionStay](Graphic.md#oncollisionstay)

___

### onDestroy

▸ **onDestroy**(): `void`

#### Returns

`void`

#### Inherited from

[Graphic](Graphic.md).[onDestroy](Graphic.md#ondestroy)

___

### onDisable

▸ **onDisable**(): `void`

#### Returns

`void`

#### Inherited from

[Graphic](Graphic.md).[onDisable](Graphic.md#ondisable)

___

### onEnable

▸ **onEnable**(): `void`

called every time when the component gets enabled (this is invoked after awake and before start)

#### Returns

`void`

#### Overrides

[Graphic](Graphic.md).[onEnable](Graphic.md#onenable)

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

[Graphic](Graphic.md).[onTriggerEnter](Graphic.md#ontriggerenter)

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

[Graphic](Graphic.md).[onTriggerExit](Graphic.md#ontriggerexit)

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

[Graphic](Graphic.md).[onTriggerStay](Graphic.md#ontriggerstay)

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

[Graphic](Graphic.md).[onValidate](Graphic.md#onvalidate)

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

[Graphic](Graphic.md).[removeEventListener](Graphic.md#removeeventlistener)

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

[Graphic](Graphic.md).[resolveGuids](Graphic.md#resolveguids)

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

[Graphic](Graphic.md).[set](Graphic.md#set)

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

[Graphic](Graphic.md).[setInteractable](Graphic.md#setinteractable)

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

[Graphic](Graphic.md).[setOptions](Graphic.md#setoptions)

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

[Graphic](Graphic.md).[setState](Graphic.md#setstate)

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

[Graphic](Graphic.md).[setWorldPosition](Graphic.md#setworldposition)

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

[Graphic](Graphic.md).[setWorldQuaternion](Graphic.md#setworldquaternion)

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

[Graphic](Graphic.md).[setWorldRotation](Graphic.md#setworldrotation)

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

[Graphic](Graphic.md).[setupState](Graphic.md#setupstate)

___

### start

▸ `Optional` **start**(): `void`

#### Returns

`void`

#### Inherited from

[Graphic](Graphic.md).[start](Graphic.md#start)

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

[Graphic](Graphic.md).[startCoroutine](Graphic.md#startcoroutine)

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

[Graphic](Graphic.md).[stopCoroutine](Graphic.md#stopcoroutine)

___

### update

▸ `Optional` **update**(): `void`

#### Returns

`void`

#### Inherited from

[Graphic](Graphic.md).[update](Graphic.md#update)
