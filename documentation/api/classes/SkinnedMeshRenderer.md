[com.needle.engine - v2.39.0-pre](../README.md) / SkinnedMeshRenderer

# Class: SkinnedMeshRenderer

## Hierarchy

- [`MeshRenderer`](MeshRenderer.md)

  ↳ **`SkinnedMeshRenderer`**

## Table of contents

### Properties

- [allowOcclusionWhenDynamic](SkinnedMeshRenderer.md#allowocclusionwhendynamic)
- [enableInstancing](SkinnedMeshRenderer.md#enableinstancing)
- [gameObject](SkinnedMeshRenderer.md#gameobject)
- [guid](SkinnedMeshRenderer.md#guid)
- [lightmapIndex](SkinnedMeshRenderer.md#lightmapindex)
- [lightmapScaleOffset](SkinnedMeshRenderer.md#lightmapscaleoffset)
- [probeAnchor](SkinnedMeshRenderer.md#probeanchor)
- [receiveShadows](SkinnedMeshRenderer.md#receiveshadows)
- [reflectionProbeUsage](SkinnedMeshRenderer.md#reflectionprobeusage)
- [renderOrder](SkinnedMeshRenderer.md#renderorder)
- [shadowCastingMode](SkinnedMeshRenderer.md#shadowcastingmode)
- [sourceId](SkinnedMeshRenderer.md#sourceid)
- [envmap](SkinnedMeshRenderer.md#envmap)

### Accessors

- [activeAndEnabled](SkinnedMeshRenderer.md#activeandenabled)
- [context](SkinnedMeshRenderer.md#context)
- [destroyed](SkinnedMeshRenderer.md#destroyed)
- [enabled](SkinnedMeshRenderer.md#enabled)
- [forward](SkinnedMeshRenderer.md#forward)
- [hasLightmap](SkinnedMeshRenderer.md#haslightmap)
- [hideFlags](SkinnedMeshRenderer.md#hideflags)
- [isComponent](SkinnedMeshRenderer.md#iscomponent)
- [layer](SkinnedMeshRenderer.md#layer)
- [lightmap](SkinnedMeshRenderer.md#lightmap)
- [material](SkinnedMeshRenderer.md#material)
- [name](SkinnedMeshRenderer.md#name)
- [scene](SkinnedMeshRenderer.md#scene)
- [sharedMaterial](SkinnedMeshRenderer.md#sharedmaterial)
- [sharedMaterials](SkinnedMeshRenderer.md#sharedmaterials)
- [sharedMesh](SkinnedMeshRenderer.md#sharedmesh)
- [static](SkinnedMeshRenderer.md#static)
- [tag](SkinnedMeshRenderer.md#tag)
- [worldEuler](SkinnedMeshRenderer.md#worldeuler)
- [worldPosition](SkinnedMeshRenderer.md#worldposition)
- [worldQuaternion](SkinnedMeshRenderer.md#worldquaternion)
- [worldRotation](SkinnedMeshRenderer.md#worldrotation)
- [shouldSuppressInstancing](SkinnedMeshRenderer.md#shouldsuppressinstancing)

### Methods

- [addEventListener](SkinnedMeshRenderer.md#addeventlistener)
- [applyStencil](SkinnedMeshRenderer.md#applystencil)
- [awake](SkinnedMeshRenderer.md#awake)
- [destroy](SkinnedMeshRenderer.md#destroy)
- [dispatchEvent](SkinnedMeshRenderer.md#dispatchevent)
- [earlyUpdate](SkinnedMeshRenderer.md#earlyupdate)
- [lateUpdate](SkinnedMeshRenderer.md#lateupdate)
- [onAfterRender](SkinnedMeshRenderer.md#onafterrender)
- [onBeforeRender](SkinnedMeshRenderer.md#onbeforerender)
- [onBeforeRenderThree](SkinnedMeshRenderer.md#onbeforerenderthree)
- [onCollisionEnter](SkinnedMeshRenderer.md#oncollisionenter)
- [onCollisionExit](SkinnedMeshRenderer.md#oncollisionexit)
- [onCollisionStay](SkinnedMeshRenderer.md#oncollisionstay)
- [onDestroy](SkinnedMeshRenderer.md#ondestroy)
- [onDisable](SkinnedMeshRenderer.md#ondisable)
- [onEnable](SkinnedMeshRenderer.md#onenable)
- [onTriggerEnter](SkinnedMeshRenderer.md#ontriggerenter)
- [onTriggerExit](SkinnedMeshRenderer.md#ontriggerexit)
- [onTriggerStay](SkinnedMeshRenderer.md#ontriggerstay)
- [onValidate](SkinnedMeshRenderer.md#onvalidate)
- [removeEventListener](SkinnedMeshRenderer.md#removeeventlistener)
- [resolveGuids](SkinnedMeshRenderer.md#resolveguids)
- [setInstancingEnabled](SkinnedMeshRenderer.md#setinstancingenabled)
- [setWorldPosition](SkinnedMeshRenderer.md#setworldposition)
- [setWorldQuaternion](SkinnedMeshRenderer.md#setworldquaternion)
- [setWorldRotation](SkinnedMeshRenderer.md#setworldrotation)
- [start](SkinnedMeshRenderer.md#start)
- [startCoroutine](SkinnedMeshRenderer.md#startcoroutine)
- [stopCoroutine](SkinnedMeshRenderer.md#stopcoroutine)
- [update](SkinnedMeshRenderer.md#update)

## Properties

### allowOcclusionWhenDynamic

• **allowOcclusionWhenDynamic**: `boolean` = `true`

#### Inherited from

[MeshRenderer](MeshRenderer.md).[allowOcclusionWhenDynamic](MeshRenderer.md#allowocclusionwhendynamic)

___

### enableInstancing

• **enableInstancing**: `undefined` \| `boolean`[] = `undefined`

#### Inherited from

[MeshRenderer](MeshRenderer.md).[enableInstancing](MeshRenderer.md#enableinstancing)

___

### gameObject

• **gameObject**: [`GameObject`](GameObject.md)

#### Inherited from

[MeshRenderer](MeshRenderer.md).[gameObject](MeshRenderer.md#gameobject)

___

### guid

• **guid**: `string` = `"invalid"`

#### Inherited from

[MeshRenderer](MeshRenderer.md).[guid](MeshRenderer.md#guid)

___

### lightmapIndex

• **lightmapIndex**: `number` = `-1`

#### Inherited from

[MeshRenderer](MeshRenderer.md).[lightmapIndex](MeshRenderer.md#lightmapindex)

___

### lightmapScaleOffset

• **lightmapScaleOffset**: `Vector4`

#### Inherited from

[MeshRenderer](MeshRenderer.md).[lightmapScaleOffset](MeshRenderer.md#lightmapscaleoffset)

___

### probeAnchor

• `Optional` **probeAnchor**: `Object3D`<`Event`\>

#### Inherited from

[MeshRenderer](MeshRenderer.md).[probeAnchor](MeshRenderer.md#probeanchor)

___

### receiveShadows

• **receiveShadows**: `boolean` = `false`

#### Inherited from

[MeshRenderer](MeshRenderer.md).[receiveShadows](MeshRenderer.md#receiveshadows)

___

### reflectionProbeUsage

• **reflectionProbeUsage**: `ReflectionProbeUsage` = `ReflectionProbeUsage.Off`

#### Inherited from

[MeshRenderer](MeshRenderer.md).[reflectionProbeUsage](MeshRenderer.md#reflectionprobeusage)

___

### renderOrder

• **renderOrder**: `undefined` \| `number`[] = `undefined`

#### Inherited from

[MeshRenderer](MeshRenderer.md).[renderOrder](MeshRenderer.md#renderorder)

___

### shadowCastingMode

• **shadowCastingMode**: `ShadowCastingMode` = `ShadowCastingMode.Off`

#### Inherited from

[MeshRenderer](MeshRenderer.md).[shadowCastingMode](MeshRenderer.md#shadowcastingmode)

___

### sourceId

• `Optional` **sourceId**: `string`

#### Inherited from

[MeshRenderer](MeshRenderer.md).[sourceId](MeshRenderer.md#sourceid)

___

### envmap

▪ `Static` **envmap**: ``null`` \| `Texture` = `null`

#### Inherited from

[MeshRenderer](MeshRenderer.md).[envmap](MeshRenderer.md#envmap)

## Accessors

### activeAndEnabled

• `get` **activeAndEnabled**(): `boolean`

#### Returns

`boolean`

#### Inherited from

MeshRenderer.activeAndEnabled

___

### context

• `get` **context**(): `Context`

#### Returns

`Context`

#### Inherited from

MeshRenderer.context

• `set` **context**(`context`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `Context` |

#### Returns

`void`

#### Inherited from

MeshRenderer.context

___

### destroyed

• `get` **destroyed**(): `boolean`

#### Returns

`boolean`

#### Inherited from

MeshRenderer.destroyed

___

### enabled

• `get` **enabled**(): `boolean`

#### Returns

`boolean`

#### Inherited from

MeshRenderer.enabled

• `set` **enabled**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `boolean` |

#### Returns

`void`

#### Inherited from

MeshRenderer.enabled

___

### forward

• `get` **forward**(): `Vector3`

#### Returns

`Vector3`

#### Inherited from

MeshRenderer.forward

___

### hasLightmap

• `get` **hasLightmap**(): `boolean`

#### Returns

`boolean`

#### Inherited from

MeshRenderer.hasLightmap

___

### hideFlags

• `get` **hideFlags**(): [`HideFlags`](../enums/HideFlags.md)

#### Returns

[`HideFlags`](../enums/HideFlags.md)

#### Inherited from

MeshRenderer.hideFlags

___

### isComponent

• `get` **isComponent**(): `boolean`

#### Returns

`boolean`

#### Inherited from

MeshRenderer.isComponent

___

### layer

• `get` **layer**(): `number`

#### Returns

`number`

#### Inherited from

MeshRenderer.layer

___

### lightmap

• `get` **lightmap**(): ``null`` \| `Texture`

#### Returns

``null`` \| `Texture`

#### Inherited from

MeshRenderer.lightmap

• `set` **lightmap**(`tex`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tex` | `undefined` \| ``null`` \| `Texture` |

#### Returns

`void`

#### Inherited from

MeshRenderer.lightmap

___

### material

• `get` **material**(): `Material`

**`Deprecated`**

please use sharedMaterial

#### Returns

`Material`

#### Inherited from

MeshRenderer.material

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

MeshRenderer.material

___

### name

• `get` **name**(): `string`

#### Returns

`string`

#### Inherited from

MeshRenderer.name

• `set` **name**(`str`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`void`

#### Inherited from

MeshRenderer.name

___

### scene

• `get` **scene**(): `Scene`

#### Returns

`Scene`

#### Inherited from

MeshRenderer.scene

___

### sharedMaterial

• `get` **sharedMaterial**(): `Material`

#### Returns

`Material`

#### Inherited from

MeshRenderer.sharedMaterial

• `set` **sharedMaterial**(`mat`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `mat` | `Material` |

#### Returns

`void`

#### Inherited from

MeshRenderer.sharedMaterial

___

### sharedMaterials

• `get` **sharedMaterials**(): `SharedMaterialArray`

#### Returns

`SharedMaterialArray`

#### Inherited from

MeshRenderer.sharedMaterials

___

### sharedMesh

• `get` **sharedMesh**(): `undefined` \| `Mesh`<`BufferGeometry`, `Material` \| `Material`[]\>

#### Returns

`undefined` \| `Mesh`<`BufferGeometry`, `Material` \| `Material`[]\>

#### Inherited from

MeshRenderer.sharedMesh

___

### static

• `get` **static**(): `any`

#### Returns

`any`

#### Inherited from

MeshRenderer.static

___

### tag

• `get` **tag**(): `string`

#### Returns

`string`

#### Inherited from

MeshRenderer.tag

• `set` **tag**(`str`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`void`

#### Inherited from

MeshRenderer.tag

___

### worldEuler

• `get` **worldEuler**(): `Euler`

#### Returns

`Euler`

#### Inherited from

MeshRenderer.worldEuler

• `set` **worldEuler**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `Euler` |

#### Returns

`void`

#### Inherited from

MeshRenderer.worldEuler

___

### worldPosition

• `get` **worldPosition**(): `Vector3`

#### Returns

`Vector3`

#### Inherited from

MeshRenderer.worldPosition

• `set` **worldPosition**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `Vector3` |

#### Returns

`void`

#### Inherited from

MeshRenderer.worldPosition

___

### worldQuaternion

• `get` **worldQuaternion**(): `Quaternion`

#### Returns

`Quaternion`

#### Inherited from

MeshRenderer.worldQuaternion

• `set` **worldQuaternion**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `Quaternion` |

#### Returns

`void`

#### Inherited from

MeshRenderer.worldQuaternion

___

### worldRotation

• `get` **worldRotation**(): `Vector3`

#### Returns

`Vector3`

#### Inherited from

MeshRenderer.worldRotation

• `set` **worldRotation**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `Vector3` |

#### Returns

`void`

#### Inherited from

MeshRenderer.worldRotation

___

### shouldSuppressInstancing

• `Static` `get` **shouldSuppressInstancing**(): `string` \| `boolean`

#### Returns

`string` \| `boolean`

#### Inherited from

MeshRenderer.shouldSuppressInstancing

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

[MeshRenderer](MeshRenderer.md).[addEventListener](MeshRenderer.md#addeventlistener)

___

### applyStencil

▸ **applyStencil**(): `void`

#### Returns

`void`

#### Inherited from

[MeshRenderer](MeshRenderer.md).[applyStencil](MeshRenderer.md#applystencil)

___

### awake

▸ **awake**(): `void`

called once when the component becomes active for the first time

#### Returns

`void`

#### Overrides

[MeshRenderer](MeshRenderer.md).[awake](MeshRenderer.md#awake)

___

### destroy

▸ **destroy**(): `void`

#### Returns

`void`

#### Inherited from

[MeshRenderer](MeshRenderer.md).[destroy](MeshRenderer.md#destroy)

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

[MeshRenderer](MeshRenderer.md).[dispatchEvent](MeshRenderer.md#dispatchevent)

___

### earlyUpdate

▸ `Optional` **earlyUpdate**(): `void`

#### Returns

`void`

#### Inherited from

[MeshRenderer](MeshRenderer.md).[earlyUpdate](MeshRenderer.md#earlyupdate)

___

### lateUpdate

▸ `Optional` **lateUpdate**(): `void`

#### Returns

`void`

#### Inherited from

[MeshRenderer](MeshRenderer.md).[lateUpdate](MeshRenderer.md#lateupdate)

___

### onAfterRender

▸ **onAfterRender**(): `void`

#### Returns

`void`

#### Inherited from

[MeshRenderer](MeshRenderer.md).[onAfterRender](MeshRenderer.md#onafterrender)

___

### onBeforeRender

▸ **onBeforeRender**(): `void`

#### Returns

`void`

#### Inherited from

[MeshRenderer](MeshRenderer.md).[onBeforeRender](MeshRenderer.md#onbeforerender)

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

[MeshRenderer](MeshRenderer.md).[onBeforeRenderThree](MeshRenderer.md#onbeforerenderthree)

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

[MeshRenderer](MeshRenderer.md).[onCollisionEnter](MeshRenderer.md#oncollisionenter)

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

[MeshRenderer](MeshRenderer.md).[onCollisionExit](MeshRenderer.md#oncollisionexit)

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

[MeshRenderer](MeshRenderer.md).[onCollisionStay](MeshRenderer.md#oncollisionstay)

___

### onDestroy

▸ **onDestroy**(): `void`

#### Returns

`void`

#### Inherited from

[MeshRenderer](MeshRenderer.md).[onDestroy](MeshRenderer.md#ondestroy)

___

### onDisable

▸ **onDisable**(): `void`

#### Returns

`void`

#### Inherited from

[MeshRenderer](MeshRenderer.md).[onDisable](MeshRenderer.md#ondisable)

___

### onEnable

▸ **onEnable**(): `void`

called every time when the component gets enabled (this is invoked after awake and before start)

#### Returns

`void`

#### Inherited from

[MeshRenderer](MeshRenderer.md).[onEnable](MeshRenderer.md#onenable)

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

[MeshRenderer](MeshRenderer.md).[onTriggerEnter](MeshRenderer.md#ontriggerenter)

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

[MeshRenderer](MeshRenderer.md).[onTriggerExit](MeshRenderer.md#ontriggerexit)

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

[MeshRenderer](MeshRenderer.md).[onTriggerStay](MeshRenderer.md#ontriggerstay)

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

[MeshRenderer](MeshRenderer.md).[onValidate](MeshRenderer.md#onvalidate)

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

[MeshRenderer](MeshRenderer.md).[removeEventListener](MeshRenderer.md#removeeventlistener)

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

[MeshRenderer](MeshRenderer.md).[resolveGuids](MeshRenderer.md#resolveguids)

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

[MeshRenderer](MeshRenderer.md).[setInstancingEnabled](MeshRenderer.md#setinstancingenabled)

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

[MeshRenderer](MeshRenderer.md).[setWorldPosition](MeshRenderer.md#setworldposition)

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

[MeshRenderer](MeshRenderer.md).[setWorldQuaternion](MeshRenderer.md#setworldquaternion)

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

[MeshRenderer](MeshRenderer.md).[setWorldRotation](MeshRenderer.md#setworldrotation)

___

### start

▸ **start**(): `void`

#### Returns

`void`

#### Inherited from

[MeshRenderer](MeshRenderer.md).[start](MeshRenderer.md#start)

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

[MeshRenderer](MeshRenderer.md).[startCoroutine](MeshRenderer.md#startcoroutine)

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

[MeshRenderer](MeshRenderer.md).[stopCoroutine](MeshRenderer.md#stopcoroutine)

___

### update

▸ `Optional` **update**(): `void`

#### Returns

`void`

#### Inherited from

[MeshRenderer](MeshRenderer.md).[update](MeshRenderer.md#update)
