[com.needle.engine - v2.39.0-pre](../README.md) / WebXR

# Class: WebXR

## Hierarchy

- [`Behaviour`](Behaviour.md)

  ↳ **`WebXR`**

## Table of contents

### Properties

- [createARButton](WebXR.md#createarbutton)
- [createVRButton](WebXR.md#createvrbutton)
- [defaultAvatar](WebXR.md#defaultavatar)
- [enableAR](WebXR.md#enablear)
- [enableVR](WebXR.md#enablevr)
- [gameObject](WebXR.md#gameobject)
- [guid](WebXR.md#guid)
- [handModelPath](WebXR.md#handmodelpath)
- [sourceId](WebXR.md#sourceid)

### Accessors

- [ARButton](WebXR.md#arbutton)
- [Controllers](WebXR.md#controllers)
- [HeadPose](WebXR.md#headpose)
- [IsInAR](WebXR.md#isinar)
- [IsInVR](WebXR.md#isinvr)
- [LeftController](WebXR.md#leftcontroller)
- [Rig](WebXR.md#rig)
- [RightController](WebXR.md#rightcontroller)
- [TransformOrientation](WebXR.md#transformorientation)
- [VRButton](WebXR.md#vrbutton)
- [activeAndEnabled](WebXR.md#activeandenabled)
- [context](WebXR.md#context)
- [destroyed](WebXR.md#destroyed)
- [enabled](WebXR.md#enabled)
- [forward](WebXR.md#forward)
- [hideFlags](WebXR.md#hideflags)
- [isComponent](WebXR.md#iscomponent)
- [layer](WebXR.md#layer)
- [name](WebXR.md#name)
- [scene](WebXR.md#scene)
- [static](WebXR.md#static)
- [tag](WebXR.md#tag)
- [worldEuler](WebXR.md#worldeuler)
- [worldPosition](WebXR.md#worldposition)
- [worldQuaternion](WebXR.md#worldquaternion)
- [worldRotation](WebXR.md#worldrotation)
- [IsARSupported](WebXR.md#isarsupported)
- [IsInWebXR](WebXR.md#isinwebxr)
- [IsVRSupported](WebXR.md#isvrsupported)
- [XRSupported](WebXR.md#xrsupported)

### Methods

- [addEventListener](WebXR.md#addeventlistener)
- [awake](WebXR.md#awake)
- [destroy](WebXR.md#destroy)
- [dispatchEvent](WebXR.md#dispatchevent)
- [earlyUpdate](WebXR.md#earlyupdate)
- [endSession](WebXR.md#endsession)
- [lateUpdate](WebXR.md#lateupdate)
- [onAfterRender](WebXR.md#onafterrender)
- [onBeforeRender](WebXR.md#onbeforerender)
- [onCollisionEnter](WebXR.md#oncollisionenter)
- [onCollisionExit](WebXR.md#oncollisionexit)
- [onCollisionStay](WebXR.md#oncollisionstay)
- [onDestroy](WebXR.md#ondestroy)
- [onDisable](WebXR.md#ondisable)
- [onEnable](WebXR.md#onenable)
- [onTriggerEnter](WebXR.md#ontriggerenter)
- [onTriggerExit](WebXR.md#ontriggerexit)
- [onTriggerStay](WebXR.md#ontriggerstay)
- [onValidate](WebXR.md#onvalidate)
- [removeEventListener](WebXR.md#removeeventlistener)
- [resolveGuids](WebXR.md#resolveguids)
- [setWorldPosition](WebXR.md#setworldposition)
- [setWorldQuaternion](WebXR.md#setworldquaternion)
- [setWorldRotation](WebXR.md#setworldrotation)
- [start](WebXR.md#start)
- [startCoroutine](WebXR.md#startcoroutine)
- [stopCoroutine](WebXR.md#stopcoroutine)
- [update](WebXR.md#update)
- [addEventListener](WebXR.md#addeventlistener-1)
- [createARButton](WebXR.md#createarbutton-1)
- [createVRButton](WebXR.md#createvrbutton-1)
- [removeEventListener](WebXR.md#removeeventlistener-1)
- [resetButtonStyles](WebXR.md#resetbuttonstyles)

## Properties

### createARButton

• **createARButton**: `boolean` = `true`

___

### createVRButton

• **createVRButton**: `boolean` = `true`

___

### defaultAvatar

• `Optional` **defaultAvatar**: [`AssetReference`](AssetReference.md)

___

### enableAR

• **enableAR**: `boolean` = `true`

___

### enableVR

• **enableVR**: `boolean` = `true`

___

### gameObject

• **gameObject**: [`GameObject`](GameObject.md)

#### Inherited from

[Behaviour](Behaviour.md).[gameObject](Behaviour.md#gameobject)

___

### guid

• **guid**: `string` = `"invalid"`

#### Inherited from

[Behaviour](Behaviour.md).[guid](Behaviour.md#guid)

___

### handModelPath

• **handModelPath**: `string` = `""`

___

### sourceId

• `Optional` **sourceId**: `string`

#### Inherited from

[Behaviour](Behaviour.md).[sourceId](Behaviour.md#sourceid)

## Accessors

### ARButton

• `get` **ARButton**(): `undefined` \| `HTMLButtonElement`

#### Returns

`undefined` \| `HTMLButtonElement`

___

### Controllers

• `get` **Controllers**(): [`WebXRController`](WebXRController.md)[]

#### Returns

[`WebXRController`](WebXRController.md)[]

___

### HeadPose

• `get` **HeadPose**(): ``null`` \| `XRViewerPose`

#### Returns

``null`` \| `XRViewerPose`

___

### IsInAR

• `get` **IsInAR**(): `boolean`

#### Returns

`boolean`

___

### IsInVR

• `get` **IsInVR**(): `boolean`

#### Returns

`boolean`

___

### LeftController

• `get` **LeftController**(): ``null`` \| [`WebXRController`](WebXRController.md)

#### Returns

``null`` \| [`WebXRController`](WebXRController.md)

___

### Rig

• `get` **Rig**(): `Object3D`<`Event`\>

#### Returns

`Object3D`<`Event`\>

___

### RightController

• `get` **RightController**(): ``null`` \| [`WebXRController`](WebXRController.md)

#### Returns

``null`` \| [`WebXRController`](WebXRController.md)

___

### TransformOrientation

• `get` **TransformOrientation**(): `Quaternion`

#### Returns

`Quaternion`

___

### VRButton

• `get` **VRButton**(): `undefined` \| `HTMLButtonElement`

#### Returns

`undefined` \| `HTMLButtonElement`

___

### activeAndEnabled

• `get` **activeAndEnabled**(): `boolean`

#### Returns

`boolean`

#### Inherited from

Behaviour.activeAndEnabled

___

### context

• `get` **context**(): `Context`

#### Returns

`Context`

#### Inherited from

Behaviour.context

• `set` **context**(`context`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `Context` |

#### Returns

`void`

#### Inherited from

Behaviour.context

___

### destroyed

• `get` **destroyed**(): `boolean`

#### Returns

`boolean`

#### Inherited from

Behaviour.destroyed

___

### enabled

• `get` **enabled**(): `boolean`

#### Returns

`boolean`

#### Inherited from

Behaviour.enabled

• `set` **enabled**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `boolean` |

#### Returns

`void`

#### Inherited from

Behaviour.enabled

___

### forward

• `get` **forward**(): `Vector3`

#### Returns

`Vector3`

#### Inherited from

Behaviour.forward

___

### hideFlags

• `get` **hideFlags**(): [`HideFlags`](../enums/HideFlags.md)

#### Returns

[`HideFlags`](../enums/HideFlags.md)

#### Inherited from

Behaviour.hideFlags

___

### isComponent

• `get` **isComponent**(): `boolean`

#### Returns

`boolean`

#### Inherited from

Behaviour.isComponent

___

### layer

• `get` **layer**(): `number`

#### Returns

`number`

#### Inherited from

Behaviour.layer

___

### name

• `get` **name**(): `string`

#### Returns

`string`

#### Inherited from

Behaviour.name

• `set` **name**(`str`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`void`

#### Inherited from

Behaviour.name

___

### scene

• `get` **scene**(): `Scene`

#### Returns

`Scene`

#### Inherited from

Behaviour.scene

___

### static

• `get` **static**(): `any`

#### Returns

`any`

#### Inherited from

Behaviour.static

___

### tag

• `get` **tag**(): `string`

#### Returns

`string`

#### Inherited from

Behaviour.tag

• `set` **tag**(`str`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`void`

#### Inherited from

Behaviour.tag

___

### worldEuler

• `get` **worldEuler**(): `Euler`

#### Returns

`Euler`

#### Inherited from

Behaviour.worldEuler

• `set` **worldEuler**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `Euler` |

#### Returns

`void`

#### Inherited from

Behaviour.worldEuler

___

### worldPosition

• `get` **worldPosition**(): `Vector3`

#### Returns

`Vector3`

#### Inherited from

Behaviour.worldPosition

• `set` **worldPosition**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `Vector3` |

#### Returns

`void`

#### Inherited from

Behaviour.worldPosition

___

### worldQuaternion

• `get` **worldQuaternion**(): `Quaternion`

#### Returns

`Quaternion`

#### Inherited from

Behaviour.worldQuaternion

• `set` **worldQuaternion**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `Quaternion` |

#### Returns

`void`

#### Inherited from

Behaviour.worldQuaternion

___

### worldRotation

• `get` **worldRotation**(): `Vector3`

#### Returns

`Vector3`

#### Inherited from

Behaviour.worldRotation

• `set` **worldRotation**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `Vector3` |

#### Returns

`void`

#### Inherited from

Behaviour.worldRotation

___

### IsARSupported

• `Static` `get` **IsARSupported**(): `boolean`

#### Returns

`boolean`

___

### IsInWebXR

• `Static` `get` **IsInWebXR**(): `boolean`

#### Returns

`boolean`

___

### IsVRSupported

• `Static` `get` **IsVRSupported**(): `boolean`

#### Returns

`boolean`

___

### XRSupported

• `Static` `get` **XRSupported**(): `boolean`

#### Returns

`boolean`

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

[Behaviour](Behaviour.md).[addEventListener](Behaviour.md#addeventlistener)

___

### awake

▸ **awake**(): `void`

called once when the component becomes active for the first time

#### Returns

`void`

#### Overrides

[Behaviour](Behaviour.md).[awake](Behaviour.md#awake)

___

### destroy

▸ **destroy**(): `void`

#### Returns

`void`

#### Inherited from

[Behaviour](Behaviour.md).[destroy](Behaviour.md#destroy)

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

[Behaviour](Behaviour.md).[dispatchEvent](Behaviour.md#dispatchevent)

___

### earlyUpdate

▸ `Optional` **earlyUpdate**(): `void`

#### Returns

`void`

#### Inherited from

[Behaviour](Behaviour.md).[earlyUpdate](Behaviour.md#earlyupdate)

___

### endSession

▸ **endSession**(): `void`

#### Returns

`void`

___

### lateUpdate

▸ `Optional` **lateUpdate**(): `void`

#### Returns

`void`

#### Inherited from

[Behaviour](Behaviour.md).[lateUpdate](Behaviour.md#lateupdate)

___

### onAfterRender

▸ `Optional` **onAfterRender**(): `void`

#### Returns

`void`

#### Inherited from

[Behaviour](Behaviour.md).[onAfterRender](Behaviour.md#onafterrender)

___

### onBeforeRender

▸ **onBeforeRender**(`frame`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `frame` | `any` |

#### Returns

`void`

#### Overrides

[Behaviour](Behaviour.md).[onBeforeRender](Behaviour.md#onbeforerender)

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

[Behaviour](Behaviour.md).[onCollisionEnter](Behaviour.md#oncollisionenter)

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

[Behaviour](Behaviour.md).[onCollisionExit](Behaviour.md#oncollisionexit)

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

[Behaviour](Behaviour.md).[onCollisionStay](Behaviour.md#oncollisionstay)

___

### onDestroy

▸ **onDestroy**(): `void`

#### Returns

`void`

#### Inherited from

[Behaviour](Behaviour.md).[onDestroy](Behaviour.md#ondestroy)

___

### onDisable

▸ **onDisable**(): `void`

#### Returns

`void`

#### Inherited from

[Behaviour](Behaviour.md).[onDisable](Behaviour.md#ondisable)

___

### onEnable

▸ **onEnable**(): `void`

called every time when the component gets enabled (this is invoked after awake and before start)

#### Returns

`void`

#### Overrides

[Behaviour](Behaviour.md).[onEnable](Behaviour.md#onenable)

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

[Behaviour](Behaviour.md).[onTriggerEnter](Behaviour.md#ontriggerenter)

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

[Behaviour](Behaviour.md).[onTriggerExit](Behaviour.md#ontriggerexit)

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

[Behaviour](Behaviour.md).[onTriggerStay](Behaviour.md#ontriggerstay)

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

[Behaviour](Behaviour.md).[onValidate](Behaviour.md#onvalidate)

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

[Behaviour](Behaviour.md).[removeEventListener](Behaviour.md#removeeventlistener)

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

[Behaviour](Behaviour.md).[resolveGuids](Behaviour.md#resolveguids)

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

[Behaviour](Behaviour.md).[setWorldPosition](Behaviour.md#setworldposition)

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

[Behaviour](Behaviour.md).[setWorldQuaternion](Behaviour.md#setworldquaternion)

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

[Behaviour](Behaviour.md).[setWorldRotation](Behaviour.md#setworldrotation)

___

### start

▸ `Optional` **start**(): `void`

#### Returns

`void`

#### Inherited from

[Behaviour](Behaviour.md).[start](Behaviour.md#start)

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

[Behaviour](Behaviour.md).[startCoroutine](Behaviour.md#startcoroutine)

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

[Behaviour](Behaviour.md).[stopCoroutine](Behaviour.md#stopcoroutine)

___

### update

▸ `Optional` **update**(): `void`

#### Returns

`void`

#### Inherited from

[Behaviour](Behaviour.md).[update](Behaviour.md#update)

___

### addEventListener

▸ `Static` **addEventListener**(`type`, `listener`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |
| `listener` | `any` |

#### Returns

`any`

___

### createARButton

▸ `Static` **createARButton**(`webXR`, `opts?`): `HTMLButtonElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `webXR` | [`WebXR`](WebXR.md) |
| `opts?` | `CreateButtonOptions` |

#### Returns

`HTMLButtonElement`

___

### createVRButton

▸ `Static` **createVRButton**(`webXR`, `opts?`): `HTMLButtonElement`

#### Parameters

| Name | Type |
| :------ | :------ |
| `webXR` | [`WebXR`](WebXR.md) |
| `opts?` | `CreateButtonOptions` |

#### Returns

`HTMLButtonElement`

___

### removeEventListener

▸ `Static` **removeEventListener**(`type`, `listener`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |
| `listener` | `any` |

#### Returns

`any`

___

### resetButtonStyles

▸ `Static` **resetButtonStyles**(`button`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `button` | `any` |

#### Returns

`void`
