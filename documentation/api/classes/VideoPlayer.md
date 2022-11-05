[com.needle.engine - v2.39.0-pre](../README.md) / VideoPlayer

# Class: VideoPlayer

## Hierarchy

- [`Behaviour`](Behaviour.md)

  ↳ **`VideoPlayer`**

## Table of contents

### Constructors

- [constructor](VideoPlayer.md#constructor)

### Properties

- [aspectMode](VideoPlayer.md#aspectmode)
- [gameObject](VideoPlayer.md#gameobject)
- [guid](VideoPlayer.md#guid)
- [playOnAwake](VideoPlayer.md#playonawake)
- [playOnEnable](VideoPlayer.md#playonenable)
- [renderer](VideoPlayer.md#renderer)
- [sourceId](VideoPlayer.md#sourceid)

### Accessors

- [activeAndEnabled](VideoPlayer.md#activeandenabled)
- [context](VideoPlayer.md#context)
- [crossOrigin](VideoPlayer.md#crossorigin)
- [currentTime](VideoPlayer.md#currenttime)
- [destroyed](VideoPlayer.md#destroyed)
- [enabled](VideoPlayer.md#enabled)
- [forward](VideoPlayer.md#forward)
- [hideFlags](VideoPlayer.md#hideflags)
- [isComponent](VideoPlayer.md#iscomponent)
- [isLooping](VideoPlayer.md#islooping)
- [isPlaying](VideoPlayer.md#isplaying)
- [layer](VideoPlayer.md#layer)
- [name](VideoPlayer.md#name)
- [playbackSpeed](VideoPlayer.md#playbackspeed)
- [scene](VideoPlayer.md#scene)
- [screenspace](VideoPlayer.md#screenspace)
- [static](VideoPlayer.md#static)
- [tag](VideoPlayer.md#tag)
- [videoTexture](VideoPlayer.md#videotexture)
- [worldEuler](VideoPlayer.md#worldeuler)
- [worldPosition](VideoPlayer.md#worldposition)
- [worldQuaternion](VideoPlayer.md#worldquaternion)
- [worldRotation](VideoPlayer.md#worldrotation)

### Methods

- [addEventListener](VideoPlayer.md#addeventlistener)
- [awake](VideoPlayer.md#awake)
- [create](VideoPlayer.md#create)
- [destroy](VideoPlayer.md#destroy)
- [dispatchEvent](VideoPlayer.md#dispatchevent)
- [earlyUpdate](VideoPlayer.md#earlyupdate)
- [lateUpdate](VideoPlayer.md#lateupdate)
- [onAfterRender](VideoPlayer.md#onafterrender)
- [onBeforeRender](VideoPlayer.md#onbeforerender)
- [onCollisionEnter](VideoPlayer.md#oncollisionenter)
- [onCollisionExit](VideoPlayer.md#oncollisionexit)
- [onCollisionStay](VideoPlayer.md#oncollisionstay)
- [onDestroy](VideoPlayer.md#ondestroy)
- [onDisable](VideoPlayer.md#ondisable)
- [onEnable](VideoPlayer.md#onenable)
- [onTriggerEnter](VideoPlayer.md#ontriggerenter)
- [onTriggerExit](VideoPlayer.md#ontriggerexit)
- [onTriggerStay](VideoPlayer.md#ontriggerstay)
- [onValidate](VideoPlayer.md#onvalidate)
- [pause](VideoPlayer.md#pause)
- [play](VideoPlayer.md#play)
- [removeEventListener](VideoPlayer.md#removeeventlistener)
- [resolveGuids](VideoPlayer.md#resolveguids)
- [setClipURL](VideoPlayer.md#setclipurl)
- [setVideo](VideoPlayer.md#setvideo)
- [setWorldPosition](VideoPlayer.md#setworldposition)
- [setWorldQuaternion](VideoPlayer.md#setworldquaternion)
- [setWorldRotation](VideoPlayer.md#setworldrotation)
- [start](VideoPlayer.md#start)
- [startCoroutine](VideoPlayer.md#startcoroutine)
- [stop](VideoPlayer.md#stop)
- [stopCoroutine](VideoPlayer.md#stopcoroutine)
- [update](VideoPlayer.md#update)
- [updateAspect](VideoPlayer.md#updateaspect)

## Constructors

### constructor

• **new VideoPlayer**()

#### Overrides

Behaviour.constructor

## Properties

### aspectMode

• **aspectMode**: `AspectMode` = `AspectMode.None`

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

### playOnAwake

• **playOnAwake**: `boolean` = `true`

___

### playOnEnable

• `Optional` **playOnEnable**: `boolean`

___

### renderer

• **renderer**: ``null`` \| `Object3D`<`Event`\> = `null`

___

### sourceId

• `Optional` **sourceId**: `string`

#### Inherited from

[Behaviour](Behaviour.md).[sourceId](Behaviour.md#sourceid)

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

### crossOrigin

• `get` **crossOrigin**(): ``null`` \| `string`

#### Returns

``null`` \| `string`

• `set` **crossOrigin**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | ``null`` \| `string` |

#### Returns

`void`

___

### currentTime

• `get` **currentTime**(): `number`

#### Returns

`number`

• `set` **currentTime**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `number` |

#### Returns

`void`

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

### isLooping

• `get` **isLooping**(): `boolean`

#### Returns

`boolean`

• `set` **isLooping**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `boolean` |

#### Returns

`void`

___

### isPlaying

• `get` **isPlaying**(): `boolean`

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

### playbackSpeed

• `get` **playbackSpeed**(): `number`

#### Returns

`number`

• `set` **playbackSpeed**(`val`): `void`

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

Behaviour.scene

___

### screenspace

• `get` **screenspace**(): `boolean`

#### Returns

`boolean`

• `set` **screenspace**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `boolean` |

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

### videoTexture

• `get` **videoTexture**(): ``null`` \| `VideoTexture`

#### Returns

``null`` \| `VideoTexture`

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

### create

▸ **create**(`playAutomatically`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `playAutomatically` | `boolean` |

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

### pause

▸ **pause**(): `void`

#### Returns

`void`

___

### play

▸ **play**(): `void`

#### Returns

`void`

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

### setClipURL

▸ **setClipURL**(`url`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |

#### Returns

`void`

___

### setVideo

▸ **setVideo**(`video`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `video` | `MediaStream` |

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

### stop

▸ **stop**(): `void`

#### Returns

`void`

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

### updateAspect

▸ **updateAspect**(): `void`

#### Returns

`void`
