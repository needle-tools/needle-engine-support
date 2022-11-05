[com.needle.engine - v2.39.0-pre](../README.md) / Light

# Class: Light

## Hierarchy

- [`Behaviour`](Behaviour.md)

  ↳ **`Light`**

## Implements

- `ILight`

## Table of contents

### Properties

- [color](Light.md#color)
- [gameObject](Light.md#gameobject)
- [guid](Light.md#guid)
- [innerSpotAngle](Light.md#innerspotangle)
- [range](Light.md#range)
- [sourceId](Light.md#sourceid)
- [spotAngle](Light.md#spotangle)

### Accessors

- [activeAndEnabled](Light.md#activeandenabled)
- [context](Light.md#context)
- [destroyed](Light.md#destroyed)
- [enabled](Light.md#enabled)
- [forward](Light.md#forward)
- [hideFlags](Light.md#hideflags)
- [intensity](Light.md#intensity)
- [isBaked](Light.md#isbaked)
- [isComponent](Light.md#iscomponent)
- [layer](Light.md#layer)
- [name](Light.md#name)
- [scene](Light.md#scene)
- [shadowBias](Light.md#shadowbias)
- [shadowDistance](Light.md#shadowdistance)
- [shadowNearPlane](Light.md#shadownearplane)
- [shadowNormalBias](Light.md#shadownormalbias)
- [shadowResolution](Light.md#shadowresolution)
- [shadows](Light.md#shadows)
- [static](Light.md#static)
- [tag](Light.md#tag)
- [worldEuler](Light.md#worldeuler)
- [worldPosition](Light.md#worldposition)
- [worldQuaternion](Light.md#worldquaternion)
- [worldRotation](Light.md#worldrotation)

### Methods

- [addEventListener](Light.md#addeventlistener)
- [awake](Light.md#awake)
- [createLight](Light.md#createlight)
- [destroy](Light.md#destroy)
- [dispatchEvent](Light.md#dispatchevent)
- [earlyUpdate](Light.md#earlyupdate)
- [getWorldPosition](Light.md#getworldposition)
- [lateUpdate](Light.md#lateupdate)
- [onAfterRender](Light.md#onafterrender)
- [onBeforeRender](Light.md#onbeforerender)
- [onCollisionEnter](Light.md#oncollisionenter)
- [onCollisionExit](Light.md#oncollisionexit)
- [onCollisionStay](Light.md#oncollisionstay)
- [onDestroy](Light.md#ondestroy)
- [onDisable](Light.md#ondisable)
- [onEnable](Light.md#onenable)
- [onTriggerEnter](Light.md#ontriggerenter)
- [onTriggerExit](Light.md#ontriggerexit)
- [onTriggerStay](Light.md#ontriggerstay)
- [onValidate](Light.md#onvalidate)
- [removeEventListener](Light.md#removeeventlistener)
- [resolveGuids](Light.md#resolveguids)
- [setWorldPosition](Light.md#setworldposition)
- [setWorldQuaternion](Light.md#setworldquaternion)
- [setWorldRotation](Light.md#setworldrotation)
- [start](Light.md#start)
- [startCoroutine](Light.md#startcoroutine)
- [stopCoroutine](Light.md#stopcoroutine)
- [update](Light.md#update)
- [updateIntensity](Light.md#updateintensity)
- [updateMainLightRoutine](Light.md#updatemainlightroutine)

## Properties

### color

• **color**: `Color`

#### Implementation of

ILight.color

___

### gameObject

• **gameObject**: [`GameObject`](GameObject.md)

#### Implementation of

ILight.gameObject

#### Inherited from

[Behaviour](Behaviour.md).[gameObject](Behaviour.md#gameobject)

___

### guid

• **guid**: `string` = `"invalid"`

#### Implementation of

ILight.guid

#### Inherited from

[Behaviour](Behaviour.md).[guid](Behaviour.md#guid)

___

### innerSpotAngle

• **innerSpotAngle**: `number` = `1`

___

### range

• **range**: `number` = `1`

___

### sourceId

• `Optional` **sourceId**: `string`

#### Implementation of

ILight.sourceId

#### Inherited from

[Behaviour](Behaviour.md).[sourceId](Behaviour.md#sourceid)

___

### spotAngle

• **spotAngle**: `number` = `1`

## Accessors

### activeAndEnabled

• `get` **activeAndEnabled**(): `boolean`

#### Returns

`boolean`

#### Implementation of

ILight.activeAndEnabled

#### Inherited from

Behaviour.activeAndEnabled

___

### context

• `get` **context**(): `Context`

#### Returns

`Context`

#### Implementation of

ILight.context

#### Inherited from

Behaviour.context

• `set` **context**(`context`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `Context` |

#### Returns

`void`

#### Implementation of

ILight.context

#### Inherited from

Behaviour.context

___

### destroyed

• `get` **destroyed**(): `boolean`

#### Returns

`boolean`

#### Implementation of

ILight.destroyed

#### Inherited from

Behaviour.destroyed

___

### enabled

• `get` **enabled**(): `boolean`

#### Returns

`boolean`

#### Implementation of

ILight.enabled

#### Inherited from

Behaviour.enabled

• `set` **enabled**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `boolean` |

#### Returns

`void`

#### Implementation of

ILight.enabled

#### Inherited from

Behaviour.enabled

___

### forward

• `get` **forward**(): `Vector3`

#### Returns

`Vector3`

#### Implementation of

ILight.forward

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

### intensity

• `get` **intensity**(): `number`

#### Returns

`number`

#### Implementation of

ILight.intensity

• `set` **intensity**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `number` |

#### Returns

`void`

#### Implementation of

ILight.intensity

___

### isBaked

• `get` **isBaked**(): `boolean`

#### Returns

`boolean`

___

### isComponent

• `get` **isComponent**(): `boolean`

#### Returns

`boolean`

#### Implementation of

ILight.isComponent

#### Inherited from

Behaviour.isComponent

___

### layer

• `get` **layer**(): `number`

#### Returns

`number`

#### Implementation of

ILight.layer

#### Inherited from

Behaviour.layer

___

### name

• `get` **name**(): `string`

#### Returns

`string`

#### Implementation of

ILight.name

#### Inherited from

Behaviour.name

• `set` **name**(`str`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`void`

#### Implementation of

ILight.name

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

### shadowBias

• `get` **shadowBias**(): `number`

#### Returns

`number`

• `set` **shadowBias**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `number` |

#### Returns

`void`

___

### shadowDistance

• `get` **shadowDistance**(): `number`

#### Returns

`number`

• `set` **shadowDistance**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `number` |

#### Returns

`void`

___

### shadowNearPlane

• `get` **shadowNearPlane**(): `number`

#### Returns

`number`

• `set` **shadowNearPlane**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `number` |

#### Returns

`void`

___

### shadowNormalBias

• `get` **shadowNormalBias**(): `number`

#### Returns

`number`

• `set` **shadowNormalBias**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `number` |

#### Returns

`void`

___

### shadowResolution

• `get` **shadowResolution**(): `number`

#### Returns

`number`

• `set` **shadowResolution**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `number` |

#### Returns

`void`

___

### shadows

• `get` **shadows**(): `LightShadows`

#### Returns

`LightShadows`

• `set` **shadows**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `LightShadows` |

#### Returns

`void`

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

#### Implementation of

ILight.tag

#### Inherited from

Behaviour.tag

• `set` **tag**(`str`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`void`

#### Implementation of

ILight.tag

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

#### Implementation of

ILight.worldPosition

#### Inherited from

Behaviour.worldPosition

• `set` **worldPosition**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `Vector3` |

#### Returns

`void`

#### Implementation of

ILight.worldPosition

#### Inherited from

Behaviour.worldPosition

___

### worldQuaternion

• `get` **worldQuaternion**(): `Quaternion`

#### Returns

`Quaternion`

#### Implementation of

ILight.worldQuaternion

#### Inherited from

Behaviour.worldQuaternion

• `set` **worldQuaternion**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `Quaternion` |

#### Returns

`void`

#### Implementation of

ILight.worldQuaternion

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

#### Implementation of

ILight.awake

#### Overrides

[Behaviour](Behaviour.md).[awake](Behaviour.md#awake)

___

### createLight

▸ **createLight**(): `void`

#### Returns

`void`

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

#### Implementation of

ILight.earlyUpdate

#### Inherited from

[Behaviour](Behaviour.md).[earlyUpdate](Behaviour.md#earlyupdate)

___

### getWorldPosition

▸ **getWorldPosition**(`vec`): `Vector3`

#### Parameters

| Name | Type |
| :------ | :------ |
| `vec` | `Vector3` |

#### Returns

`Vector3`

___

### lateUpdate

▸ `Optional` **lateUpdate**(): `void`

#### Returns

`void`

#### Implementation of

ILight.lateUpdate

#### Inherited from

[Behaviour](Behaviour.md).[lateUpdate](Behaviour.md#lateupdate)

___

### onAfterRender

▸ `Optional` **onAfterRender**(): `void`

#### Returns

`void`

#### Implementation of

ILight.onAfterRender

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

#### Implementation of

ILight.onBeforeRender

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

#### Implementation of

ILight.onCollisionEnter

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

#### Implementation of

ILight.onCollisionExit

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

#### Implementation of

ILight.onCollisionStay

#### Inherited from

[Behaviour](Behaviour.md).[onCollisionStay](Behaviour.md#oncollisionstay)

___

### onDestroy

▸ **onDestroy**(): `void`

#### Returns

`void`

#### Implementation of

ILight.onDestroy

#### Inherited from

[Behaviour](Behaviour.md).[onDestroy](Behaviour.md#ondestroy)

___

### onDisable

▸ **onDisable**(): `void`

#### Returns

`void`

#### Implementation of

ILight.onDisable

#### Overrides

[Behaviour](Behaviour.md).[onDisable](Behaviour.md#ondisable)

___

### onEnable

▸ **onEnable**(): `void`

called every time when the component gets enabled (this is invoked after awake and before start)

#### Returns

`void`

#### Implementation of

ILight.onEnable

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

#### Implementation of

ILight.onTriggerEnter

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

#### Implementation of

ILight.onTriggerExit

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

#### Implementation of

ILight.onTriggerStay

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

#### Implementation of

ILight.onValidate

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

#### Implementation of

ILight.resolveGuids

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

#### Implementation of

ILight.start

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

#### Implementation of

ILight.update

#### Inherited from

[Behaviour](Behaviour.md).[update](Behaviour.md#update)

___

### updateIntensity

▸ **updateIntensity**(): `void`

#### Returns

`void`

___

### updateMainLightRoutine

▸ **updateMainLightRoutine**(): `Generator`<`undefined`, `void`, `unknown`\>

#### Returns

`Generator`<`undefined`, `void`, `unknown`\>
