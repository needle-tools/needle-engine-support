[com.needle.engine - v2.39.0-pre](../README.md) / WebXRController

# Class: WebXRController

## Hierarchy

- [`Behaviour`](Behaviour.md)

  ↳ **`WebXRController`**

## Table of contents

### Properties

- [controller](WebXRController.md#controller)
- [controllerGrip](WebXRController.md#controllergrip)
- [controllerModel](WebXRController.md#controllermodel)
- [gameObject](WebXRController.md#gameobject)
- [grabbed](WebXRController.md#grabbed)
- [guid](WebXRController.md#guid)
- [hand](WebXRController.md#hand)
- [handPointerModel](WebXRController.md#handpointermodel)
- [index](WebXRController.md#index)
- [input](WebXRController.md#input)
- [rayRotation](WebXRController.md#rayrotation)
- [sourceId](WebXRController.md#sourceid)
- [type](WebXRController.md#type)
- [webXR](WebXRController.md#webxr)
- [Factory](WebXRController.md#factory)

### Accessors

- [activeAndEnabled](WebXRController.md#activeandenabled)
- [context](WebXRController.md#context)
- [destroyed](WebXRController.md#destroyed)
- [enabled](WebXRController.md#enabled)
- [forward](WebXRController.md#forward)
- [hideFlags](WebXRController.md#hideflags)
- [isComponent](WebXRController.md#iscomponent)
- [isUsingHands](WebXRController.md#isusinghands)
- [layer](WebXRController.md#layer)
- [name](WebXRController.md#name)
- [raycastHitPoint](WebXRController.md#raycasthitpoint)
- [scene](WebXRController.md#scene)
- [selectionClick](WebXRController.md#selectionclick)
- [selectionDown](WebXRController.md#selectiondown)
- [selectionPressed](WebXRController.md#selectionpressed)
- [selectionUp](WebXRController.md#selectionup)
- [static](WebXRController.md#static)
- [tag](WebXRController.md#tag)
- [useSmoothing](WebXRController.md#usesmoothing)
- [worldEuler](WebXRController.md#worldeuler)
- [worldPosition](WebXRController.md#worldposition)
- [worldQuaternion](WebXRController.md#worldquaternion)
- [worldRotation](WebXRController.md#worldrotation)
- [wrist](WebXRController.md#wrist)

### Methods

- [addEventListener](WebXRController.md#addeventlistener)
- [awake](WebXRController.md#awake)
- [destroy](WebXRController.md#destroy)
- [dispatchEvent](WebXRController.md#dispatchevent)
- [earlyUpdate](WebXRController.md#earlyupdate)
- [getRay](WebXRController.md#getray)
- [getWristQuaternion](WebXRController.md#getwristquaternion)
- [lateUpdate](WebXRController.md#lateupdate)
- [onAfterRender](WebXRController.md#onafterrender)
- [onBeforeRender](WebXRController.md#onbeforerender)
- [onCollisionEnter](WebXRController.md#oncollisionenter)
- [onCollisionExit](WebXRController.md#oncollisionexit)
- [onCollisionStay](WebXRController.md#oncollisionstay)
- [onDestroy](WebXRController.md#ondestroy)
- [onDisable](WebXRController.md#ondisable)
- [onEnable](WebXRController.md#onenable)
- [onTriggerEnter](WebXRController.md#ontriggerenter)
- [onTriggerExit](WebXRController.md#ontriggerexit)
- [onTriggerStay](WebXRController.md#ontriggerstay)
- [onUpdate](WebXRController.md#onupdate)
- [onValidate](WebXRController.md#onvalidate)
- [overlap](WebXRController.md#overlap)
- [raycast](WebXRController.md#raycast)
- [removeEventListener](WebXRController.md#removeeventlistener)
- [resolveGuids](WebXRController.md#resolveguids)
- [setWorldPosition](WebXRController.md#setworldposition)
- [setWorldQuaternion](WebXRController.md#setworldquaternion)
- [setWorldRotation](WebXRController.md#setworldrotation)
- [start](WebXRController.md#start)
- [startCoroutine](WebXRController.md#startcoroutine)
- [stopCoroutine](WebXRController.md#stopcoroutine)
- [update](WebXRController.md#update)
- [Create](WebXRController.md#create)
- [addEventListener](WebXRController.md#addeventlistener-1)
- [removeEventListener](WebXRController.md#removeeventlistener-1)

## Properties

### controller

• **controller**: `Group`

___

### controllerGrip

• **controllerGrip**: `Group`

___

### controllerModel

• **controllerModel**: `XRControllerModel`

___

### gameObject

• **gameObject**: [`GameObject`](GameObject.md)

#### Inherited from

[Behaviour](Behaviour.md).[gameObject](Behaviour.md#gameobject)

___

### grabbed

• **grabbed**: ``null`` \| [`AttachedObject`](AttachedObject.md) = `null`

___

### guid

• **guid**: `string` = `"invalid"`

#### Inherited from

[Behaviour](Behaviour.md).[guid](Behaviour.md#guid)

___

### hand

• **hand**: `Group`

___

### handPointerModel

• **handPointerModel**: `OculusHandPointerModel`

___

### index

• **index**: `number` = `-1`

___

### input

• **input**: ``null`` \| `XRInputSource` = `null`

___

### rayRotation

• **rayRotation**: `Quaternion`

___

### sourceId

• `Optional` **sourceId**: `string`

#### Inherited from

[Behaviour](Behaviour.md).[sourceId](Behaviour.md#sourceid)

___

### type

• **type**: `ControllerType` = `ControllerType.PhysicalDevice`

___

### webXR

• **webXR**: [`WebXR`](WebXR.md)

___

### Factory

▪ `Static` **Factory**: `XRControllerModelFactory`

## Accessors

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

### isUsingHands

• `get` **isUsingHands**(): `boolean`

#### Returns

`boolean`

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

### raycastHitPoint

• `get` **raycastHitPoint**(): ``null`` \| `Object3D`<`Event`\>

#### Returns

``null`` \| `Object3D`<`Event`\>

___

### scene

• `get` **scene**(): `Scene`

#### Returns

`Scene`

#### Inherited from

Behaviour.scene

___

### selectionClick

• `get` **selectionClick**(): `boolean`

#### Returns

`boolean`

___

### selectionDown

• `get` **selectionDown**(): `boolean`

#### Returns

`boolean`

___

### selectionPressed

• `get` **selectionPressed**(): `boolean`

#### Returns

`boolean`

___

### selectionUp

• `get` **selectionUp**(): `boolean`

#### Returns

`boolean`

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

### useSmoothing

• `get` **useSmoothing**(): `boolean`

#### Returns

`boolean`

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

### wrist

• `get` **wrist**(): ``null`` \| `Object3D`<`Event`\>

#### Returns

``null`` \| `Object3D`<`Event`\>

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

### getRay

▸ **getRay**(): `Ray`

#### Returns

`Ray`

___

### getWristQuaternion

▸ **getWristQuaternion**(): ``null`` \| `Quaternion`

#### Returns

``null`` \| `Quaternion`

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

▸ `Optional` **onBeforeRender**(`frame`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `frame` | ``null`` \| `XRFrame` |

#### Returns

`void`

#### Inherited from

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

#### Overrides

[Behaviour](Behaviour.md).[onDestroy](Behaviour.md#ondestroy)

___

### onDisable

▸ **onDisable**(): `void`

#### Returns

`void`

#### Overrides

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

### onUpdate

▸ **onUpdate**(`session`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `session` | `XRSession` |

#### Returns

`void`

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

### overlap

▸ **overlap**(): `Intersection`<`Object3D`<`Event`\>\>[]

#### Returns

`Intersection`<`Object3D`<`Event`\>\>[]

___

### raycast

▸ **raycast**(): `Intersection`<`Object3D`<`Event`\>\>[]

#### Returns

`Intersection`<`Object3D`<`Event`\>\>[]

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

▸ **update**(): `void`

#### Returns

`void`

#### Overrides

[Behaviour](Behaviour.md).[update](Behaviour.md#update)

___

### Create

▸ `Static` **Create**(`owner`, `index`, `addTo`, `type`): [`WebXRController`](WebXRController.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `owner` | [`WebXR`](WebXR.md) |
| `index` | `number` |
| `addTo` | [`GameObject`](GameObject.md) |
| `type` | `ControllerType` |

#### Returns

[`WebXRController`](WebXRController.md)

___

### addEventListener

▸ `Static` **addEventListener**(`evt`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `evt` | `ControllerEvents` |
| `callback` | (`controller`: [`WebXRController`](WebXRController.md), `args`: `any`) => `void` |

#### Returns

`void`

___

### removeEventListener

▸ `Static` **removeEventListener**(`evt`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `evt` | `ControllerEvents` |
| `callback` | (`controller`: [`WebXRController`](WebXRController.md), `args`: `any`) => `void` |

#### Returns

`void`
