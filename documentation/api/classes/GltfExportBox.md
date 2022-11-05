[com.needle.engine - v2.39.0-pre](../README.md) / GltfExportBox

# Class: GltfExportBox

## Hierarchy

- [`BoxHelperComponent`](BoxHelperComponent.md)

  ↳ **`GltfExportBox`**

## Table of contents

### Properties

- [gameObject](GltfExportBox.md#gameobject)
- [guid](GltfExportBox.md#guid)
- [sceneRoot](GltfExportBox.md#sceneroot)
- [sourceId](GltfExportBox.md#sourceid)

### Accessors

- [activeAndEnabled](GltfExportBox.md#activeandenabled)
- [context](GltfExportBox.md#context)
- [destroyed](GltfExportBox.md#destroyed)
- [enabled](GltfExportBox.md#enabled)
- [forward](GltfExportBox.md#forward)
- [hideFlags](GltfExportBox.md#hideflags)
- [isComponent](GltfExportBox.md#iscomponent)
- [layer](GltfExportBox.md#layer)
- [name](GltfExportBox.md#name)
- [scene](GltfExportBox.md#scene)
- [static](GltfExportBox.md#static)
- [tag](GltfExportBox.md#tag)
- [worldEuler](GltfExportBox.md#worldeuler)
- [worldPosition](GltfExportBox.md#worldposition)
- [worldQuaternion](GltfExportBox.md#worldquaternion)
- [worldRotation](GltfExportBox.md#worldrotation)

### Methods

- [addEventListener](GltfExportBox.md#addeventlistener)
- [awake](GltfExportBox.md#awake)
- [destroy](GltfExportBox.md#destroy)
- [dispatchEvent](GltfExportBox.md#dispatchevent)
- [earlyUpdate](GltfExportBox.md#earlyupdate)
- [intersects](GltfExportBox.md#intersects)
- [isInBox](GltfExportBox.md#isinbox)
- [lateUpdate](GltfExportBox.md#lateupdate)
- [onAfterRender](GltfExportBox.md#onafterrender)
- [onBeforeRender](GltfExportBox.md#onbeforerender)
- [onCollisionEnter](GltfExportBox.md#oncollisionenter)
- [onCollisionExit](GltfExportBox.md#oncollisionexit)
- [onCollisionStay](GltfExportBox.md#oncollisionstay)
- [onDestroy](GltfExportBox.md#ondestroy)
- [onDisable](GltfExportBox.md#ondisable)
- [onEnable](GltfExportBox.md#onenable)
- [onTriggerEnter](GltfExportBox.md#ontriggerenter)
- [onTriggerExit](GltfExportBox.md#ontriggerexit)
- [onTriggerStay](GltfExportBox.md#ontriggerstay)
- [onValidate](GltfExportBox.md#onvalidate)
- [removeEventListener](GltfExportBox.md#removeeventlistener)
- [resolveGuids](GltfExportBox.md#resolveguids)
- [setWorldPosition](GltfExportBox.md#setworldposition)
- [setWorldQuaternion](GltfExportBox.md#setworldquaternion)
- [setWorldRotation](GltfExportBox.md#setworldrotation)
- [showHelper](GltfExportBox.md#showhelper)
- [start](GltfExportBox.md#start)
- [startCoroutine](GltfExportBox.md#startcoroutine)
- [stopCoroutine](GltfExportBox.md#stopcoroutine)
- [update](GltfExportBox.md#update)
- [updateBox](GltfExportBox.md#updatebox)
- [updateGltfBox](GltfExportBox.md#updategltfbox)

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

### sceneRoot

• `Optional` **sceneRoot**: `Object3D`<`Event`\>

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

▸ **start**(): `void`

#### Returns

`void`

#### Overrides

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

___

### updateGltfBox

▸ **updateGltfBox**(): `Generator`<`undefined`, `void`, `unknown`\>

#### Returns

`Generator`<`undefined`, `void`, `unknown`\>
