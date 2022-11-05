[com.needle.engine - v2.39.0-pre](../README.md) / AssetReference

# Class: AssetReference

## Table of contents

### Constructors

- [constructor](AssetReference.md#constructor)

### Accessors

- [asset](AssetReference.md#asset)
- [rawAsset](AssetReference.md#rawasset)
- [uri](AssetReference.md#uri)

### Methods

- [beginListenDownload](AssetReference.md#beginlistendownload)
- [endListenDownload](AssetReference.md#endlistendownload)
- [instantiate](AssetReference.md#instantiate)
- [instantiateSynced](AssetReference.md#instantiatesynced)
- [isLoaded](AssetReference.md#isloaded)
- [loadAssetAsync](AssetReference.md#loadassetasync)
- [preload](AssetReference.md#preload)
- [unload](AssetReference.md#unload)
- [getOrCreate](AssetReference.md#getorcreate)

## Constructors

### constructor

• **new AssetReference**(`uri`, `hash?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `uri` | `string` |
| `hash?` | `string` |

## Accessors

### asset

• `get` **asset**(): `any`

#### Returns

`any`

• `set` **asset**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `any` |

#### Returns

`void`

___

### rawAsset

• `get` **rawAsset**(): `any`

#### Returns

`any`

___

### uri

• `get` **uri**(): `string`

#### Returns

`string`

## Methods

### beginListenDownload

▸ **beginListenDownload**(`evt`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `evt` | `ProgressCallback` |

#### Returns

`void`

___

### endListenDownload

▸ **endListenDownload**(`evt`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `evt` | `ProgressCallback` |

#### Returns

`void`

___

### instantiate

▸ **instantiate**(`parent?`): `Promise`<``null`` \| `IGameObject`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parent?` | `Object3D`<`Event`\> \| [`InstantiateOptions`](InstantiateOptions.md) |

#### Returns

`Promise`<``null`` \| `IGameObject`\>

___

### instantiateSynced

▸ **instantiateSynced**(`parent?`, `saveOnServer?`): `Promise`<``null`` \| `IGameObject`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `parent?` | `Object3D`<`Event`\> \| [`InstantiateOptions`](InstantiateOptions.md) | `undefined` |
| `saveOnServer` | `boolean` | `true` |

#### Returns

`Promise`<``null`` \| `IGameObject`\>

___

### isLoaded

▸ **isLoaded**(): `boolean` \| `ArrayBuffer`

#### Returns

`boolean` \| `ArrayBuffer`

___

### loadAssetAsync

▸ **loadAssetAsync**(`prog?`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `prog?` | ``null`` \| `ProgressCallback` |

#### Returns

`Promise`<`any`\>

___

### preload

▸ **preload**(): `Promise`<``null`` \| `ArrayBuffer`\>

#### Returns

`Promise`<``null`` \| `ArrayBuffer`\>

___

### unload

▸ **unload**(): `void`

#### Returns

`void`

___

### getOrCreate

▸ `Static` **getOrCreate**(`sourceId`, `uri`, `context`): [`AssetReference`](AssetReference.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `sourceId` | `string` |
| `uri` | `string` |
| `context` | `Context` |

#### Returns

[`AssetReference`](AssetReference.md)
