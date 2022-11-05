[com.needle.engine - v2.39.0-pre](../README.md) / Keyboard

# Class: Keyboard

## Hierarchy

- [`BaseUIComponent`](BaseUIComponent.md)

  ↳ **`Keyboard`**

## Table of contents

### Properties

- [borderRadius](Keyboard.md#borderradius)
- [font](Keyboard.md#font)
- [fontSize](Keyboard.md#fontsize)
- [gameObject](Keyboard.md#gameobject)
- [guid](Keyboard.md#guid)
- [keymap](Keyboard.md#keymap)
- [margin](Keyboard.md#margin)
- [padding](Keyboard.md#padding)
- [shadowComponent](Keyboard.md#shadowcomponent)
- [sourceId](Keyboard.md#sourceid)
- [text](Keyboard.md#text)

### Accessors

- [activeAndEnabled](Keyboard.md#activeandenabled)
- [context](Keyboard.md#context)
- [controlsChildLayout](Keyboard.md#controlschildlayout)
- [destroyed](Keyboard.md#destroyed)
- [enabled](Keyboard.md#enabled)
- [forward](Keyboard.md#forward)
- [hideFlags](Keyboard.md#hideflags)
- [isComponent](Keyboard.md#iscomponent)
- [layer](Keyboard.md#layer)
- [name](Keyboard.md#name)
- [scene](Keyboard.md#scene)
- [static](Keyboard.md#static)
- [tag](Keyboard.md#tag)
- [worldEuler](Keyboard.md#worldeuler)
- [worldPosition](Keyboard.md#worldposition)
- [worldQuaternion](Keyboard.md#worldquaternion)
- [worldRotation](Keyboard.md#worldrotation)

### Methods

- [addEventListener](Keyboard.md#addeventlistener)
- [awake](Keyboard.md#awake)
- [destroy](Keyboard.md#destroy)
- [dispatchEvent](Keyboard.md#dispatchevent)
- [earlyUpdate](Keyboard.md#earlyupdate)
- [isRoot](Keyboard.md#isroot)
- [lateUpdate](Keyboard.md#lateupdate)
- [markDirty](Keyboard.md#markdirty)
- [onAfterRender](Keyboard.md#onafterrender)
- [onBeforeRender](Keyboard.md#onbeforerender)
- [onCollisionEnter](Keyboard.md#oncollisionenter)
- [onCollisionExit](Keyboard.md#oncollisionexit)
- [onCollisionStay](Keyboard.md#oncollisionstay)
- [onDestroy](Keyboard.md#ondestroy)
- [onDisable](Keyboard.md#ondisable)
- [onEnable](Keyboard.md#onenable)
- [onTriggerEnter](Keyboard.md#ontriggerenter)
- [onTriggerExit](Keyboard.md#ontriggerexit)
- [onTriggerStay](Keyboard.md#ontriggerstay)
- [onValidate](Keyboard.md#onvalidate)
- [removeEventListener](Keyboard.md#removeeventlistener)
- [resolveGuids](Keyboard.md#resolveguids)
- [set](Keyboard.md#set)
- [setInteractable](Keyboard.md#setinteractable)
- [setWorldPosition](Keyboard.md#setworldposition)
- [setWorldQuaternion](Keyboard.md#setworldquaternion)
- [setWorldRotation](Keyboard.md#setworldrotation)
- [start](Keyboard.md#start)
- [startCoroutine](Keyboard.md#startcoroutine)
- [stopCoroutine](Keyboard.md#stopcoroutine)
- [update](Keyboard.md#update)

## Properties

### borderRadius

• `Optional` **borderRadius**: `number`

___

### font

• `Optional` **font**: `string`

___

### fontSize

• `Optional` **fontSize**: `number`

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

### keymap

• `Optional` **keymap**: `KeymapOption`

___

### margin

• `Optional` **margin**: `number`

___

### padding

• `Optional` **padding**: `number`

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

___

### text

• `Optional` **text**: [`Text`](Text.md)

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
