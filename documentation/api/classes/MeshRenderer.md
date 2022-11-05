[com.needle.engine - v2.39.0-pre](../README.md) / MeshRenderer

# Class: MeshRenderer

## Hierarchy

- [`Renderer`](Renderer.md)

  ↳ **`MeshRenderer`**

  ↳↳ [`SkinnedMeshRenderer`](SkinnedMeshRenderer.md)

## Table of contents

### Properties

- [allowOcclusionWhenDynamic](MeshRenderer.md#allowocclusionwhendynamic)
- [enableInstancing](MeshRenderer.md#enableinstancing)
- [gameObject](MeshRenderer.md#gameobject)
- [guid](MeshRenderer.md#guid)
- [lightmapIndex](MeshRenderer.md#lightmapindex)
- [lightmapScaleOffset](MeshRenderer.md#lightmapscaleoffset)
- [probeAnchor](MeshRenderer.md#probeanchor)
- [receiveShadows](MeshRenderer.md#receiveshadows)
- [reflectionProbeUsage](MeshRenderer.md#reflectionprobeusage)
- [renderOrder](MeshRenderer.md#renderorder)
- [shadowCastingMode](MeshRenderer.md#shadowcastingmode)
- [sourceId](MeshRenderer.md#sourceid)
- [envmap](MeshRenderer.md#envmap)

### Accessors

- [activeAndEnabled](MeshRenderer.md#activeandenabled)
- [context](MeshRenderer.md#context)
- [destroyed](MeshRenderer.md#destroyed)
- [enabled](MeshRenderer.md#enabled)
- [forward](MeshRenderer.md#forward)
- [hasLightmap](MeshRenderer.md#haslightmap)
- [hideFlags](MeshRenderer.md#hideflags)
- [isComponent](MeshRenderer.md#iscomponent)
- [layer](MeshRenderer.md#layer)
- [lightmap](MeshRenderer.md#lightmap)
- [material](MeshRenderer.md#material)
- [name](MeshRenderer.md#name)
- [scene](MeshRenderer.md#scene)
- [sharedMaterial](MeshRenderer.md#sharedmaterial)
- [sharedMaterials](MeshRenderer.md#sharedmaterials)
- [sharedMesh](MeshRenderer.md#sharedmesh)
- [static](MeshRenderer.md#static)
- [tag](MeshRenderer.md#tag)
- [worldEuler](MeshRenderer.md#worldeuler)
- [worldPosition](MeshRenderer.md#worldposition)
- [worldQuaternion](MeshRenderer.md#worldquaternion)
- [worldRotation](MeshRenderer.md#worldrotation)
- [shouldSuppressInstancing](MeshRenderer.md#shouldsuppressinstancing)

### Methods

- [addEventListener](MeshRenderer.md#addeventlistener)
- [applyStencil](MeshRenderer.md#applystencil)
- [awake](MeshRenderer.md#awake)
- [destroy](MeshRenderer.md#destroy)
- [dispatchEvent](MeshRenderer.md#dispatchevent)
- [earlyUpdate](MeshRenderer.md#earlyupdate)
- [lateUpdate](MeshRenderer.md#lateupdate)
- [onAfterRender](MeshRenderer.md#onafterrender)
- [onBeforeRender](MeshRenderer.md#onbeforerender)
- [onBeforeRenderThree](MeshRenderer.md#onbeforerenderthree)
- [onCollisionEnter](MeshRenderer.md#oncollisionenter)
- [onCollisionExit](MeshRenderer.md#oncollisionexit)
- [onCollisionStay](MeshRenderer.md#oncollisionstay)
- [onDestroy](MeshRenderer.md#ondestroy)
- [onDisable](MeshRenderer.md#ondisable)
- [onEnable](MeshRenderer.md#onenable)
- [onTriggerEnter](MeshRenderer.md#ontriggerenter)
- [onTriggerExit](MeshRenderer.md#ontriggerexit)
- [onTriggerStay](MeshRenderer.md#ontriggerstay)
- [onValidate](MeshRenderer.md#onvalidate)
- [removeEventListener](MeshRenderer.md#removeeventlistener)
- [resolveGuids](MeshRenderer.md#resolveguids)
- [setInstancingEnabled](MeshRenderer.md#setinstancingenabled)
- [setWorldPosition](MeshRenderer.md#setworldposition)
- [setWorldQuaternion](MeshRenderer.md#setworldquaternion)
- [setWorldRotation](MeshRenderer.md#setworldrotation)
- [start](MeshRenderer.md#start)
- [startCoroutine](MeshRenderer.md#startcoroutine)
- [stopCoroutine](MeshRenderer.md#stopcoroutine)
- [update](MeshRenderer.md#update)

## Properties

### allowOcclusionWhenDynamic

• **allowOcclusionWhenDynamic**: `boolean` = `true`

#### Inherited from

[Renderer](Renderer.md).[allowOcclusionWhenDynamic](Renderer.md#allowocclusionwhendynamic)

___

### enableInstancing

• **enableInstancing**: `undefined` \| `boolean`[] = `undefined`

#### Inherited from

[Renderer](Renderer.md).[enableInstancing](Renderer.md#enableinstancing)

___

### gameObject

• **gameObject**: [`GameObject`](GameObject.md)

#### Inherited from

[Renderer](Renderer.md).[gameObject](Renderer.md#gameobject)

___

### guid

• **guid**: `string` = `"invalid"`

#### Inherited from

[Renderer](Renderer.md).[guid](Renderer.md#guid)

___

### lightmapIndex

• **lightmapIndex**: `number` = `-1`

#### Inherited from

[Renderer](Renderer.md).[lightmapIndex](Renderer.md#lightmapindex)

___

### lightmapScaleOffset

• **lightmapScaleOffset**: `Vector4`

#### Inherited from

[Renderer](Renderer.md).[lightmapScaleOffset](Renderer.md#lightmapscaleoffset)

___

### probeAnchor

• `Optional` **probeAnchor**: `Object3D`<`Event`\>

#### Inherited from

[Renderer](Renderer.md).[probeAnchor](Renderer.md#probeanchor)

___

### receiveShadows

• **receiveShadows**: `boolean` = `false`

#### Inherited from

[Renderer](Renderer.md).[receiveShadows](Renderer.md#receiveshadows)

___

### reflectionProbeUsage

• **reflectionProbeUsage**: `ReflectionProbeUsage` = `ReflectionProbeUsage.Off`

#### Inherited from

[Renderer](Renderer.md).[reflectionProbeUsage](Renderer.md#reflectionprobeusage)

___

### renderOrder

• **renderOrder**: `undefined` \| `number`[] = `undefined`

#### Inherited from

[Renderer](Renderer.md).[renderOrder](Renderer.md#renderorder)

___

### shadowCastingMode

• **shadowCastingMode**: `ShadowCastingMode` = `ShadowCastingMode.Off`

#### Inherited from

[Renderer](Renderer.md).[shadowCastingMode](Renderer.md#shadowcastingmode)

___

### sourceId

• `Optional` **sourceId**: `string`

#### Inherited from

[Renderer](Renderer.md).[sourceId](Renderer.md#sourceid)

___

### envmap

▪ `Static` **envmap**: ``null`` \| `Texture` = `null`

#### Inherited from

[Renderer](Renderer.md).[envmap](Renderer.md#envmap)

## Accessors

### activeAndEnabled

• `get` **activeAndEnabled**(): `boolean`

#### Returns

`boolean`

#### Inherited from

Renderer.activeAndEnabled

___

### context

• `get` **context**(): `Context`

#### Returns

`Context`

#### Inherited from

Renderer.context

• `set` **context**(`context`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `Context` |

#### Returns

`void`

#### Inherited from

Renderer.context

___

### destroyed

• `get` **destroyed**(): `boolean`

#### Returns

`boolean`

#### Inherited from

Renderer.destroyed

___

### enabled

• `get` **enabled**(): `boolean`

#### Returns

`boolean`

#### Inherited from

Renderer.enabled

• `set` **enabled**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `boolean` |

#### Returns

`void`

#### Inherited from

Renderer.enabled

___

### forward

• `get` **forward**(): `Vector3`

#### Returns

`Vector3`

#### Inherited from

Renderer.forward

___

### hasLightmap

• `get` **hasLightmap**(): `boolean`

#### Returns

`boolean`

#### Inherited from

Renderer.hasLightmap

___

### hideFlags

• `get` **hideFlags**(): [`HideFlags`](../enums/HideFlags.md)

#### Returns

[`HideFlags`](../enums/HideFlags.md)

#### Inherited from

Renderer.hideFlags

___

### isComponent

• `get` **isComponent**(): `boolean`

#### Returns

`boolean`

#### Inherited from

Renderer.isComponent

___

### layer

• `get` **layer**(): `number`

#### Returns

`number`

#### Inherited from

Renderer.layer

___

### lightmap

• `get` **lightmap**(): ``null`` \| `Texture`

#### Returns

``null`` \| `Texture`

#### Inherited from

Renderer.lightmap

• `set` **lightmap**(`tex`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tex` | `undefined` \| ``null`` \| `Texture` |

#### Returns

`void`

#### Inherited from

Renderer.lightmap

___

### material

• `get` **material**(): `Material`

**`Deprecated`**

please use sharedMaterial

#### Returns

`Material`

#### Inherited from

Renderer.material

• `set` **material**(`mat`): `void`

**`Deprecated`**

please use sharedMaterial

#### Parameters

| Name | Type |
| :------ | :------ |
| `mat` | `Material` |

#### Returns

`void`

#### Inherited from

Renderer.material

___

### name

• `get` **name**(): `string`

#### Returns

`string`

#### Inherited from

Renderer.name

• `set` **name**(`str`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`void`

#### Inherited from

Renderer.name

___

### scene

• `get` **scene**(): `Scene`

#### Returns

`Scene`

#### Inherited from

Renderer.scene

___

### sharedMaterial

• `get` **sharedMaterial**(): `Material`

#### Returns

`Material`

#### Inherited from

Renderer.sharedMaterial

• `set` **sharedMaterial**(`mat`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `mat` | `Material` |

#### Returns

`void`

#### Inherited from

Renderer.sharedMaterial

___

### sharedMaterials

• `get` **sharedMaterials**(): `SharedMaterialArray`

#### Returns

`SharedMaterialArray`

#### Inherited from

Renderer.sharedMaterials

___

### sharedMesh

• `get` **sharedMesh**(): `undefined` \| `Mesh`<`BufferGeometry`, `Material` \| `Material`[]\>

#### Returns

`undefined` \| `Mesh`<`BufferGeometry`, `Material` \| `Material`[]\>

#### Inherited from

Renderer.sharedMesh

___

### static

• `get` **static**(): `any`

#### Returns

`any`

#### Inherited from

Renderer.static

___

### tag

• `get` **tag**(): `string`

#### Returns

`string`

#### Inherited from

Renderer.tag

• `set` **tag**(`str`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`void`

#### Inherited from

Renderer.tag

___

### worldEuler

• `get` **worldEuler**(): `Euler`

#### Returns

`Euler`

#### Inherited from

Renderer.worldEuler

• `set` **worldEuler**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `Euler` |

#### Returns

`void`

#### Inherited from

Renderer.worldEuler

___

### worldPosition

• `get` **worldPosition**(): `Vector3`

#### Returns

`Vector3`

#### Inherited from

Renderer.worldPosition

• `set` **worldPosition**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `Vector3` |

#### Returns

`void`

#### Inherited from

Renderer.worldPosition

___

### worldQuaternion

• `get` **worldQuaternion**(): `Quaternion`

#### Returns

`Quaternion`

#### Inherited from

Renderer.worldQuaternion

• `set` **worldQuaternion**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `Quaternion` |

#### Returns

`void`

#### Inherited from

Renderer.worldQuaternion

___

### worldRotation

• `get` **worldRotation**(): `Vector3`

#### Returns

`Vector3`

#### Inherited from

Renderer.worldRotation

• `set` **worldRotation**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `Vector3` |

#### Returns

`void`

#### Inherited from

Renderer.worldRotation

___

### shouldSuppressInstancing

• `Static` `get` **shouldSuppressInstancing**(): `string` \| `boolean`

#### Returns

`string` \| `boolean`

#### Inherited from

Renderer.shouldSuppressInstancing

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

[Renderer](Renderer.md).[addEventListener](Renderer.md#addeventlistener)

___

### applyStencil

▸ **applyStencil**(): `void`

#### Returns

`void`

#### Inherited from

[Renderer](Renderer.md).[applyStencil](Renderer.md#applystencil)

___

### awake

▸ **awake**(): `void`

called once when the component becomes active for the first time

#### Returns

`void`

#### Inherited from

[Renderer](Renderer.md).[awake](Renderer.md#awake)

___

### destroy

▸ **destroy**(): `void`

#### Returns

`void`

#### Inherited from

[Renderer](Renderer.md).[destroy](Renderer.md#destroy)

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

[Renderer](Renderer.md).[dispatchEvent](Renderer.md#dispatchevent)

___

### earlyUpdate

▸ `Optional` **earlyUpdate**(): `void`

#### Returns

`void`

#### Inherited from

[Renderer](Renderer.md).[earlyUpdate](Renderer.md#earlyupdate)

___

### lateUpdate

▸ `Optional` **lateUpdate**(): `void`

#### Returns

`void`

#### Inherited from

[Renderer](Renderer.md).[lateUpdate](Renderer.md#lateupdate)

___

### onAfterRender

▸ **onAfterRender**(): `void`

#### Returns

`void`

#### Inherited from

[Renderer](Renderer.md).[onAfterRender](Renderer.md#onafterrender)

___

### onBeforeRender

▸ **onBeforeRender**(): `void`

#### Returns

`void`

#### Inherited from

[Renderer](Renderer.md).[onBeforeRender](Renderer.md#onbeforerender)

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

#### Inherited from

[Renderer](Renderer.md).[onBeforeRenderThree](Renderer.md#onbeforerenderthree)

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

[Renderer](Renderer.md).[onCollisionEnter](Renderer.md#oncollisionenter)

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

[Renderer](Renderer.md).[onCollisionExit](Renderer.md#oncollisionexit)

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

[Renderer](Renderer.md).[onCollisionStay](Renderer.md#oncollisionstay)

___

### onDestroy

▸ **onDestroy**(): `void`

#### Returns

`void`

#### Inherited from

[Renderer](Renderer.md).[onDestroy](Renderer.md#ondestroy)

___

### onDisable

▸ **onDisable**(): `void`

#### Returns

`void`

#### Inherited from

[Renderer](Renderer.md).[onDisable](Renderer.md#ondisable)

___

### onEnable

▸ **onEnable**(): `void`

called every time when the component gets enabled (this is invoked after awake and before start)

#### Returns

`void`

#### Inherited from

[Renderer](Renderer.md).[onEnable](Renderer.md#onenable)

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

[Renderer](Renderer.md).[onTriggerEnter](Renderer.md#ontriggerenter)

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

[Renderer](Renderer.md).[onTriggerExit](Renderer.md#ontriggerexit)

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

[Renderer](Renderer.md).[onTriggerStay](Renderer.md#ontriggerstay)

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

[Renderer](Renderer.md).[onValidate](Renderer.md#onvalidate)

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

[Renderer](Renderer.md).[removeEventListener](Renderer.md#removeeventlistener)

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

[Renderer](Renderer.md).[resolveGuids](Renderer.md#resolveguids)

___

### setInstancingEnabled

▸ **setInstancingEnabled**(`enabled`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `enabled` | `boolean` |

#### Returns

`boolean`

#### Inherited from

[Renderer](Renderer.md).[setInstancingEnabled](Renderer.md#setinstancingenabled)

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

[Renderer](Renderer.md).[setWorldPosition](Renderer.md#setworldposition)

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

[Renderer](Renderer.md).[setWorldQuaternion](Renderer.md#setworldquaternion)

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

[Renderer](Renderer.md).[setWorldRotation](Renderer.md#setworldrotation)

___

### start

▸ **start**(): `void`

#### Returns

`void`

#### Inherited from

[Renderer](Renderer.md).[start](Renderer.md#start)

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

[Renderer](Renderer.md).[startCoroutine](Renderer.md#startcoroutine)

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

[Renderer](Renderer.md).[stopCoroutine](Renderer.md#stopcoroutine)

___

### update

▸ `Optional` **update**(): `void`

#### Returns

`void`

#### Inherited from

[Renderer](Renderer.md).[update](Renderer.md#update)
