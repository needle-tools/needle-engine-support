[com.needle.engine - v2.39.0-pre](../README.md) / OrbitControls

# Class: OrbitControls

## Hierarchy

- [`Behaviour`](Behaviour.md)

  ↳ **`OrbitControls`**

## Table of contents

### Properties

- [autoRotate](OrbitControls.md#autorotate)
- [autoRotateSpeed](OrbitControls.md#autorotatespeed)
- [dampingFactor](OrbitControls.md#dampingfactor)
- [debugLog](OrbitControls.md#debuglog)
- [doubleClickToFocus](OrbitControls.md#doubleclicktofocus)
- [enableDamping](OrbitControls.md#enabledamping)
- [enableKeys](OrbitControls.md#enablekeys)
- [enablePan](OrbitControls.md#enablepan)
- [enableZoom](OrbitControls.md#enablezoom)
- [gameObject](OrbitControls.md#gameobject)
- [guid](OrbitControls.md#guid)
- [lookAtConstraint](OrbitControls.md#lookatconstraint)
- [lookAtConstraint01](OrbitControls.md#lookatconstraint01)
- [maxZoom](OrbitControls.md#maxzoom)
- [middleClickToFocus](OrbitControls.md#middleclicktofocus)
- [minZoom](OrbitControls.md#minzoom)
- [sourceId](OrbitControls.md#sourceid)
- [targetLerpSpeed](OrbitControls.md#targetlerpspeed)
- [useSlerp](OrbitControls.md#useslerp)

### Accessors

- [activeAndEnabled](OrbitControls.md#activeandenabled)
- [context](OrbitControls.md#context)
- [controllerObject](OrbitControls.md#controllerobject)
- [controls](OrbitControls.md#controls)
- [destroyed](OrbitControls.md#destroyed)
- [enabled](OrbitControls.md#enabled)
- [forward](OrbitControls.md#forward)
- [hideFlags](OrbitControls.md#hideflags)
- [isComponent](OrbitControls.md#iscomponent)
- [layer](OrbitControls.md#layer)
- [name](OrbitControls.md#name)
- [scene](OrbitControls.md#scene)
- [static](OrbitControls.md#static)
- [tag](OrbitControls.md#tag)
- [worldEuler](OrbitControls.md#worldeuler)
- [worldPosition](OrbitControls.md#worldposition)
- [worldQuaternion](OrbitControls.md#worldquaternion)
- [worldRotation](OrbitControls.md#worldrotation)

### Methods

- [addEventListener](OrbitControls.md#addeventlistener)
- [awake](OrbitControls.md#awake)
- [destroy](OrbitControls.md#destroy)
- [dispatchEvent](OrbitControls.md#dispatchevent)
- [distanceToTarget](OrbitControls.md#distancetotarget)
- [earlyUpdate](OrbitControls.md#earlyupdate)
- [lateUpdate](OrbitControls.md#lateupdate)
- [lerpTarget](OrbitControls.md#lerptarget)
- [onAfterRender](OrbitControls.md#onafterrender)
- [onBeforeRender](OrbitControls.md#onbeforerender)
- [onCollisionEnter](OrbitControls.md#oncollisionenter)
- [onCollisionExit](OrbitControls.md#oncollisionexit)
- [onCollisionStay](OrbitControls.md#oncollisionstay)
- [onDestroy](OrbitControls.md#ondestroy)
- [onDisable](OrbitControls.md#ondisable)
- [onEnable](OrbitControls.md#onenable)
- [onStartInteraction](OrbitControls.md#onstartinteraction)
- [onTriggerEnter](OrbitControls.md#ontriggerenter)
- [onTriggerExit](OrbitControls.md#ontriggerexit)
- [onTriggerStay](OrbitControls.md#ontriggerstay)
- [onValidate](OrbitControls.md#onvalidate)
- [removeEventListener](OrbitControls.md#removeeventlistener)
- [resolveGuids](OrbitControls.md#resolveguids)
- [setCameraTarget](OrbitControls.md#setcameratarget)
- [setFromTargetPosition](OrbitControls.md#setfromtargetposition)
- [setTarget](OrbitControls.md#settarget)
- [setWorldPosition](OrbitControls.md#setworldposition)
- [setWorldQuaternion](OrbitControls.md#setworldquaternion)
- [setWorldRotation](OrbitControls.md#setworldrotation)
- [start](OrbitControls.md#start)
- [startCoroutine](OrbitControls.md#startcoroutine)
- [stopCoroutine](OrbitControls.md#stopcoroutine)
- [update](OrbitControls.md#update)

## Properties

### autoRotate

• **autoRotate**: `boolean` = `false`

___

### autoRotateSpeed

• **autoRotateSpeed**: `number` = `1.0`

___

### dampingFactor

• **dampingFactor**: `number` = `0.1`

___

### debugLog

• **debugLog**: `boolean` = `false`

___

### doubleClickToFocus

• **doubleClickToFocus**: `boolean` = `true`

___

### enableDamping

• **enableDamping**: `boolean` = `true`

___

### enableKeys

• **enableKeys**: `boolean` = `true`

___

### enablePan

• **enablePan**: `boolean` = `true`

___

### enableZoom

• **enableZoom**: `boolean` = `true`

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

### lookAtConstraint

• **lookAtConstraint**: ``null`` \| [`LookAtConstraint`](LookAtConstraint.md) = `null`

___

### lookAtConstraint01

• **lookAtConstraint01**: `number` = `1`

___

### maxZoom

• **maxZoom**: `number` = `Infinity`

___

### middleClickToFocus

• **middleClickToFocus**: `boolean` = `true`

___

### minZoom

• **minZoom**: `number` = `0`

___

### sourceId

• `Optional` **sourceId**: `string`

#### Inherited from

[Behaviour](Behaviour.md).[sourceId](Behaviour.md#sourceid)

___

### targetLerpSpeed

• **targetLerpSpeed**: `number` = `5`

___

### useSlerp

• **useSlerp**: `boolean` = `false`

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

### controllerObject

• `get` **controllerObject**(): ``null`` \| `Object3D`<`Event`\>

#### Returns

``null`` \| `Object3D`<`Event`\>

___

### controls

• `get` **controls**(): ``null`` \| `OrbitControls`

#### Returns

``null`` \| `OrbitControls`

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

### distanceToTarget

▸ **distanceToTarget**(`position`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `position` | `Vector3` |

#### Returns

`number`

___

### earlyUpdate

▸ `Optional` **earlyUpdate**(): `void`

#### Returns

`void`

#### Inherited from

[Behaviour](Behaviour.md).[earlyUpdate](Behaviour.md#earlyupdate)

___

### lateUpdate

▸ `Optional` **lateUpdate**(): `void`

#### Returns

`void`

#### Inherited from

[Behaviour](Behaviour.md).[lateUpdate](Behaviour.md#lateupdate)

___

### lerpTarget

▸ **lerpTarget**(`position`, `delta`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `position` | `Vector3` |
| `delta` | `number` |

#### Returns

`void`

___

### onAfterRender

▸ `Optional` **onAfterRender**(): `void`

#### Returns

`void`

#### Inherited from

[Behaviour](Behaviour.md).[onAfterRender](Behaviour.md#onafterrender)

___

### onBeforeRender

▸ **onBeforeRender**(): `void`

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

### onStartInteraction

▸ **onStartInteraction**(`func`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `func` | `Function` |

#### Returns

`void`

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

### setCameraTarget

▸ **setCameraTarget**(`position?`, `immediate?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `position?` | ``null`` \| `Vector3` | `undefined` |
| `immediate` | `boolean` | `false` |

#### Returns

`void`

___

### setFromTargetPosition

▸ **setFromTargetPosition**(`index?`, `t?`): `boolean`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `index` | `number` | `0` |
| `t` | `number` | `1` |

#### Returns

`boolean`

___

### setTarget

▸ **setTarget**(`position?`, `immediate?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `position` | ``null`` \| `Vector3` | `null` |
| `immediate` | `boolean` | `false` |

#### Returns

`void`

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

▸ **start**(): `void`

#### Returns

`void`

#### Overrides

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
