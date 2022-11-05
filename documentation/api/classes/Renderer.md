[com.needle.engine - v2.39.0-pre](../README.md) / Renderer

# Class: Renderer

## Hierarchy

- [`Behaviour`](Behaviour.md)

  ↳ **`Renderer`**

  ↳↳ [`MeshRenderer`](MeshRenderer.md)

## Implements

- `IRenderer`

## Table of contents

### Properties

- [allowOcclusionWhenDynamic](Renderer.md#allowocclusionwhendynamic)
- [enableInstancing](Renderer.md#enableinstancing)
- [gameObject](Renderer.md#gameobject)
- [guid](Renderer.md#guid)
- [lightmapIndex](Renderer.md#lightmapindex)
- [lightmapScaleOffset](Renderer.md#lightmapscaleoffset)
- [probeAnchor](Renderer.md#probeanchor)
- [receiveShadows](Renderer.md#receiveshadows)
- [reflectionProbeUsage](Renderer.md#reflectionprobeusage)
- [renderOrder](Renderer.md#renderorder)
- [shadowCastingMode](Renderer.md#shadowcastingmode)
- [sourceId](Renderer.md#sourceid)
- [envmap](Renderer.md#envmap)

### Accessors

- [activeAndEnabled](Renderer.md#activeandenabled)
- [context](Renderer.md#context)
- [destroyed](Renderer.md#destroyed)
- [enabled](Renderer.md#enabled)
- [forward](Renderer.md#forward)
- [hasLightmap](Renderer.md#haslightmap)
- [hideFlags](Renderer.md#hideflags)
- [isComponent](Renderer.md#iscomponent)
- [layer](Renderer.md#layer)
- [lightmap](Renderer.md#lightmap)
- [material](Renderer.md#material)
- [name](Renderer.md#name)
- [scene](Renderer.md#scene)
- [sharedMaterial](Renderer.md#sharedmaterial)
- [sharedMaterials](Renderer.md#sharedmaterials)
- [sharedMesh](Renderer.md#sharedmesh)
- [static](Renderer.md#static)
- [tag](Renderer.md#tag)
- [worldEuler](Renderer.md#worldeuler)
- [worldPosition](Renderer.md#worldposition)
- [worldQuaternion](Renderer.md#worldquaternion)
- [worldRotation](Renderer.md#worldrotation)
- [shouldSuppressInstancing](Renderer.md#shouldsuppressinstancing)

### Methods

- [addEventListener](Renderer.md#addeventlistener)
- [applyStencil](Renderer.md#applystencil)
- [awake](Renderer.md#awake)
- [destroy](Renderer.md#destroy)
- [dispatchEvent](Renderer.md#dispatchevent)
- [earlyUpdate](Renderer.md#earlyupdate)
- [lateUpdate](Renderer.md#lateupdate)
- [onAfterRender](Renderer.md#onafterrender)
- [onBeforeRender](Renderer.md#onbeforerender)
- [onBeforeRenderThree](Renderer.md#onbeforerenderthree)
- [onCollisionEnter](Renderer.md#oncollisionenter)
- [onCollisionExit](Renderer.md#oncollisionexit)
- [onCollisionStay](Renderer.md#oncollisionstay)
- [onDestroy](Renderer.md#ondestroy)
- [onDisable](Renderer.md#ondisable)
- [onEnable](Renderer.md#onenable)
- [onTriggerEnter](Renderer.md#ontriggerenter)
- [onTriggerExit](Renderer.md#ontriggerexit)
- [onTriggerStay](Renderer.md#ontriggerstay)
- [onValidate](Renderer.md#onvalidate)
- [removeEventListener](Renderer.md#removeeventlistener)
- [resolveGuids](Renderer.md#resolveguids)
- [setInstancingEnabled](Renderer.md#setinstancingenabled)
- [setWorldPosition](Renderer.md#setworldposition)
- [setWorldQuaternion](Renderer.md#setworldquaternion)
- [setWorldRotation](Renderer.md#setworldrotation)
- [start](Renderer.md#start)
- [startCoroutine](Renderer.md#startcoroutine)
- [stopCoroutine](Renderer.md#stopcoroutine)
- [update](Renderer.md#update)

## Properties

### allowOcclusionWhenDynamic

• **allowOcclusionWhenDynamic**: `boolean` = `true`

___

### enableInstancing

• **enableInstancing**: `undefined` \| `boolean`[] = `undefined`

___

### gameObject

• **gameObject**: [`GameObject`](GameObject.md)

#### Implementation of

IRenderer.gameObject

#### Inherited from

[Behaviour](Behaviour.md).[gameObject](Behaviour.md#gameobject)

___

### guid

• **guid**: `string` = `"invalid"`

#### Implementation of

IRenderer.guid

#### Inherited from

[Behaviour](Behaviour.md).[guid](Behaviour.md#guid)

___

### lightmapIndex

• **lightmapIndex**: `number` = `-1`

___

### lightmapScaleOffset

• **lightmapScaleOffset**: `Vector4`

___

### probeAnchor

• `Optional` **probeAnchor**: `Object3D`<`Event`\>

___

### receiveShadows

• **receiveShadows**: `boolean` = `false`

___

### reflectionProbeUsage

• **reflectionProbeUsage**: `ReflectionProbeUsage` = `ReflectionProbeUsage.Off`

___

### renderOrder

• **renderOrder**: `undefined` \| `number`[] = `undefined`

___

### shadowCastingMode

• **shadowCastingMode**: `ShadowCastingMode` = `ShadowCastingMode.Off`

___

### sourceId

• `Optional` **sourceId**: `string`

#### Implementation of

IRenderer.sourceId

#### Inherited from

[Behaviour](Behaviour.md).[sourceId](Behaviour.md#sourceid)

___

### envmap

▪ `Static` **envmap**: ``null`` \| `Texture` = `null`

## Accessors

### activeAndEnabled

• `get` **activeAndEnabled**(): `boolean`

#### Returns

`boolean`

#### Implementation of

IRenderer.activeAndEnabled

#### Inherited from

Behaviour.activeAndEnabled

___

### context

• `get` **context**(): `Context`

#### Returns

`Context`

#### Implementation of

IRenderer.context

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

IRenderer.context

#### Inherited from

Behaviour.context

___

### destroyed

• `get` **destroyed**(): `boolean`

#### Returns

`boolean`

#### Implementation of

IRenderer.destroyed

#### Inherited from

Behaviour.destroyed

___

### enabled

• `get` **enabled**(): `boolean`

#### Returns

`boolean`

#### Implementation of

IRenderer.enabled

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

IRenderer.enabled

#### Inherited from

Behaviour.enabled

___

### forward

• `get` **forward**(): `Vector3`

#### Returns

`Vector3`

#### Implementation of

IRenderer.forward

#### Inherited from

Behaviour.forward

___

### hasLightmap

• `get` **hasLightmap**(): `boolean`

#### Returns

`boolean`

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

#### Implementation of

IRenderer.isComponent

#### Inherited from

Behaviour.isComponent

___

### layer

• `get` **layer**(): `number`

#### Returns

`number`

#### Implementation of

IRenderer.layer

#### Inherited from

Behaviour.layer

___

### lightmap

• `get` **lightmap**(): ``null`` \| `Texture`

#### Returns

``null`` \| `Texture`

• `set` **lightmap**(`tex`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tex` | `undefined` \| ``null`` \| `Texture` |

#### Returns

`void`

___

### material

• `get` **material**(): `Material`

**`Deprecated`**

please use sharedMaterial

#### Returns

`Material`

• `set` **material**(`mat`): `void`

**`Deprecated`**

please use sharedMaterial

#### Parameters

| Name | Type |
| :------ | :------ |
| `mat` | `Material` |

#### Returns

`void`

___

### name

• `get` **name**(): `string`

#### Returns

`string`

#### Implementation of

IRenderer.name

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

IRenderer.name

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

### sharedMaterial

• `get` **sharedMaterial**(): `Material`

#### Returns

`Material`

#### Implementation of

IRenderer.sharedMaterial

• `set` **sharedMaterial**(`mat`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `mat` | `Material` |

#### Returns

`void`

#### Implementation of

IRenderer.sharedMaterial

___

### sharedMaterials

• `get` **sharedMaterials**(): `SharedMaterialArray`

#### Returns

`SharedMaterialArray`

#### Implementation of

IRenderer.sharedMaterials

___

### sharedMesh

• `get` **sharedMesh**(): `undefined` \| `Mesh`<`BufferGeometry`, `Material` \| `Material`[]\>

#### Returns

`undefined` \| `Mesh`<`BufferGeometry`, `Material` \| `Material`[]\>

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

IRenderer.tag

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

IRenderer.tag

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

IRenderer.worldPosition

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

IRenderer.worldPosition

#### Inherited from

Behaviour.worldPosition

___

### worldQuaternion

• `get` **worldQuaternion**(): `Quaternion`

#### Returns

`Quaternion`

#### Implementation of

IRenderer.worldQuaternion

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

IRenderer.worldQuaternion

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

### shouldSuppressInstancing

• `Static` `get` **shouldSuppressInstancing**(): `string` \| `boolean`

#### Returns

`string` \| `boolean`

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

### applyStencil

▸ **applyStencil**(): `void`

#### Returns

`void`

___

### awake

▸ **awake**(): `void`

called once when the component becomes active for the first time

#### Returns

`void`

#### Implementation of

IRenderer.awake

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

#### Implementation of

IRenderer.earlyUpdate

#### Inherited from

[Behaviour](Behaviour.md).[earlyUpdate](Behaviour.md#earlyupdate)

___

### lateUpdate

▸ `Optional` **lateUpdate**(): `void`

#### Returns

`void`

#### Implementation of

IRenderer.lateUpdate

#### Inherited from

[Behaviour](Behaviour.md).[lateUpdate](Behaviour.md#lateupdate)

___

### onAfterRender

▸ **onAfterRender**(): `void`

#### Returns

`void`

#### Implementation of

IRenderer.onAfterRender

#### Overrides

[Behaviour](Behaviour.md).[onAfterRender](Behaviour.md#onafterrender)

___

### onBeforeRender

▸ **onBeforeRender**(): `void`

#### Returns

`void`

#### Implementation of

IRenderer.onBeforeRender

#### Overrides

[Behaviour](Behaviour.md).[onBeforeRender](Behaviour.md#onbeforerender)

___

### onBeforeRenderThree

▸ **onBeforeRenderThree**(`_renderer`, `_scene`, `_camera`, `_geometry`, `material`, `_group`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `_renderer` | `any` |
| `_scene` | `any` |
| `_camera` | `any` |
| `_geometry` | `any` |
| `material` | `any` |
| `_group` | `any` |

#### Returns

`void`

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

IRenderer.onCollisionEnter

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

IRenderer.onCollisionExit

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

IRenderer.onCollisionStay

#### Inherited from

[Behaviour](Behaviour.md).[onCollisionStay](Behaviour.md#oncollisionstay)

___

### onDestroy

▸ **onDestroy**(): `void`

#### Returns

`void`

#### Implementation of

IRenderer.onDestroy

#### Overrides

[Behaviour](Behaviour.md).[onDestroy](Behaviour.md#ondestroy)

___

### onDisable

▸ **onDisable**(): `void`

#### Returns

`void`

#### Implementation of

IRenderer.onDisable

#### Overrides

[Behaviour](Behaviour.md).[onDisable](Behaviour.md#ondisable)

___

### onEnable

▸ **onEnable**(): `void`

called every time when the component gets enabled (this is invoked after awake and before start)

#### Returns

`void`

#### Implementation of

IRenderer.onEnable

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

IRenderer.onTriggerEnter

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

IRenderer.onTriggerExit

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

IRenderer.onTriggerStay

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

IRenderer.onValidate

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

IRenderer.resolveGuids

#### Inherited from

[Behaviour](Behaviour.md).[resolveGuids](Behaviour.md#resolveguids)

___

### setInstancingEnabled

▸ **setInstancingEnabled**(`enabled`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `enabled` | `boolean` |

#### Returns

`boolean`

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

#### Implementation of

IRenderer.start

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

#### Implementation of

IRenderer.update

#### Inherited from

[Behaviour](Behaviour.md).[update](Behaviour.md#update)
