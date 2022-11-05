[com.needle.engine - v2.39.0-pre](../README.md) / GameObject

# Class: GameObject

## Hierarchy

- `Object3D`

  ↳ **`GameObject`**

## Implements

- `Object3D`
- `IGameObject`

## Table of contents

### Constructors

- [constructor](GameObject.md#constructor)

### Properties

- [guid](GameObject.md#guid)

### Methods

- [addNewComponent](GameObject.md#addnewcomponent)
- [getComponent](GameObject.md#getcomponent)
- [getComponentInChildren](GameObject.md#getcomponentinchildren)
- [getComponentInParent](GameObject.md#getcomponentinparent)
- [getComponents](GameObject.md#getcomponents)
- [getComponentsInChildren](GameObject.md#getcomponentsinchildren)
- [getComponentsInParent](GameObject.md#getcomponentsinparent)
- [getOrAddComponent](GameObject.md#getoraddcomponent)
- [removeComponent](GameObject.md#removecomponent)
- [add](GameObject.md#add)
- [addComponent](GameObject.md#addcomponent)
- [addNewComponent](GameObject.md#addnewcomponent-1)
- [destroy](GameObject.md#destroy)
- [destroySynced](GameObject.md#destroysynced)
- [findByGuid](GameObject.md#findbyguid)
- [findObjectOfType](GameObject.md#findobjectoftype)
- [findObjectsOfType](GameObject.md#findobjectsoftype)
- [foreachComponent](GameObject.md#foreachcomponent)
- [getAllComponents](GameObject.md#getallcomponents)
- [getComponent](GameObject.md#getcomponent-1)
- [getComponentInChildren](GameObject.md#getcomponentinchildren-1)
- [getComponentInParent](GameObject.md#getcomponentinparent-1)
- [getComponents](GameObject.md#getcomponents-1)
- [getComponentsInChildren](GameObject.md#getcomponentsinchildren-1)
- [getComponentsInParent](GameObject.md#getcomponentsinparent-1)
- [getOrAddComponent](GameObject.md#getoraddcomponent-1)
- [instantiate](GameObject.md#instantiate)
- [instantiateSynced](GameObject.md#instantiatesynced)
- [invoke](GameObject.md#invoke)
- [invokeOnChildren](GameObject.md#invokeonchildren)
- [isActiveInHierarchy](GameObject.md#isactiveinhierarchy)
- [isActiveSelf](GameObject.md#isactiveself)
- [isUsingInstancing](GameObject.md#isusinginstancing)
- [iterateComponents](GameObject.md#iteratecomponents)
- [markAsInstancedRendered](GameObject.md#markasinstancedrendered)
- [remove](GameObject.md#remove)
- [removeComponent](GameObject.md#removecomponent-1)
- [setActive](GameObject.md#setactive)

## Constructors

### constructor

• **new GameObject**()

#### Inherited from

THREE.Object3D.constructor

## Properties

### guid

• **guid**: `undefined` \| `string`

#### Implementation of

IGameObject.guid

## Methods

### addNewComponent

▸ `Abstract` **addNewComponent**<`T`\>(`type`): ``null`` \| `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `Constructor`<`T`\> |

#### Returns

``null`` \| `T`

___

### getComponent

▸ `Abstract` **getComponent**<`T`\>(`type`): ``null`` \| `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `Constructor`<`T`\> |

#### Returns

``null`` \| `T`

___

### getComponentInChildren

▸ `Abstract` **getComponentInChildren**<`T`\>(`type`): ``null`` \| `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `Constructor`<`T`\> |

#### Returns

``null`` \| `T`

___

### getComponentInParent

▸ `Abstract` **getComponentInParent**<`T`\>(`type`): ``null`` \| `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `Constructor`<`T`\> |

#### Returns

``null`` \| `T`

___

### getComponents

▸ `Abstract` **getComponents**<`T`\>(`type`, `arr?`): `T`[]

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `Constructor`<`T`\> |
| `arr?` | `T`[] |

#### Returns

`T`[]

___

### getComponentsInChildren

▸ `Abstract` **getComponentsInChildren**<`T`\>(`type`, `arr?`): `T`[]

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `Constructor`<`T`\> |
| `arr?` | `T`[] |

#### Returns

`T`[]

___

### getComponentsInParent

▸ `Abstract` **getComponentsInParent**<`T`\>(`type`, `arr?`): `T`[]

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `Constructor`<`T`\> |
| `arr?` | `T`[] |

#### Returns

`T`[]

___

### getOrAddComponent

▸ `Abstract` **getOrAddComponent**<`T`\>(`go`, `typeName`): `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `go` | [`GameObject`](GameObject.md) \| `Object3D`<`Event`\> |
| `typeName` | ``null`` \| `Constructor`<`T`\> |

#### Returns

`T`

___

### removeComponent

▸ `Abstract` **removeComponent**(`comp`): `Component`

#### Parameters

| Name | Type |
| :------ | :------ |
| `comp` | `Component` |

#### Returns

`Component`

___

### add

▸ `Static` **add**(`instance`, `parent`, `context?`): `void`

Add an object to parent and also ensure all components are being registered

#### Parameters

| Name | Type |
| :------ | :------ |
| `instance` | `undefined` \| ``null`` \| `Object3D`<`Event`\> |
| `parent` | `Object3D`<`Event`\> |
| `context?` | `Context` |

#### Returns

`void`

___

### addComponent

▸ `Static` **addComponent**(`go`, `instance`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `go` | [`GameObject`](GameObject.md) |
| `instance` | `Component` |

#### Returns

`void`

___

### addNewComponent

▸ `Static` **addNewComponent**<`T`\>(`go`, `type`, `callAwake?`): `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `go` | [`GameObject`](GameObject.md) \| `Object3D`<`Event`\> | `undefined` |
| `type` | `ConstructorConcrete`<`T`\> | `undefined` |
| `callAwake` | `boolean` | `true` |

#### Returns

`T`

___

### destroy

▸ `Static` **destroy**(`instance`, `recursive?`, `isRoot?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `instance` | `Object3D`<`Event`\> \| `Component` | `undefined` |
| `recursive` | `boolean` | `true` |
| `isRoot` | `boolean` | `true` |

#### Returns

`void`

___

### destroySynced

▸ `Static` **destroySynced**(`instance`, `context?`, `recursive?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `instance` | `Object3D`<`Event`\> \| `Component` | `undefined` |
| `context?` | `Context` | `undefined` |
| `recursive` | `boolean` | `true` |

#### Returns

`void`

___

### findByGuid

▸ `Static` **findByGuid**(`guid`, `hierarchy`): `undefined` \| ``null`` \| [`GameObject`](GameObject.md) \| `Component`

#### Parameters

| Name | Type |
| :------ | :------ |
| `guid` | `string` |
| `hierarchy` | `Object3D`<`Event`\> |

#### Returns

`undefined` \| ``null`` \| [`GameObject`](GameObject.md) \| `Component`

___

### findObjectOfType

▸ `Static` **findObjectOfType**<`T`\>(`typeName`, `context?`, `includeInactive?`): ``null`` \| `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `typeName` | `Constructor`<`T`\> | `undefined` |
| `context?` | `Object3D`<`Event`\> \| `Context` | `undefined` |
| `includeInactive` | `boolean` | `true` |

#### Returns

``null`` \| `T`

___

### findObjectsOfType

▸ `Static` **findObjectsOfType**<`T`\>(`typeName`, `context?`): `T`[]

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `typeName` | `Constructor`<`T`\> |
| `context?` | `Object3D`<`Event`\> \| `Context` |

#### Returns

`T`[]

___

### foreachComponent

▸ `Static` **foreachComponent**(`instance`, `cb`, `recursive?`): `any`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `instance` | `Object3D`<`Event`\> | `undefined` |
| `cb` | (`comp`: `Component`) => `any` | `undefined` |
| `recursive` | `boolean` | `true` |

#### Returns

`any`

___

### getAllComponents

▸ `Static` **getAllComponents**(`go`): [`Behaviour`](Behaviour.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `go` | [`GameObject`](GameObject.md) \| `Object3D`<`Event`\> |

#### Returns

[`Behaviour`](Behaviour.md)[]

___

### getComponent

▸ `Static` **getComponent**<`T`\>(`go`, `typeName`): ``null`` \| `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `go` | ``null`` \| [`GameObject`](GameObject.md) \| `Object3D`<`Event`\> |
| `typeName` | ``null`` \| `Constructor`<`T`\> |

#### Returns

``null`` \| `T`

___

### getComponentInChildren

▸ `Static` **getComponentInChildren**<`T`\>(`go`, `typeName`): ``null`` \| `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `go` | [`GameObject`](GameObject.md) \| `Object3D`<`Event`\> |
| `typeName` | `Constructor`<`T`\> |

#### Returns

``null`` \| `T`

___

### getComponentInParent

▸ `Static` **getComponentInParent**<`T`\>(`go`, `typeName`): ``null`` \| `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `go` | [`GameObject`](GameObject.md) \| `Object3D`<`Event`\> |
| `typeName` | `Constructor`<`T`\> |

#### Returns

``null`` \| `T`

___

### getComponents

▸ `Static` **getComponents**<`T`\>(`go`, `typeName`, `arr?`): `T`[]

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `go` | ``null`` \| [`GameObject`](GameObject.md) \| `Object3D`<`Event`\> | `undefined` |
| `typeName` | `Constructor`<`T`\> | `undefined` |
| `arr` | ``null`` \| `T`[] | `null` |

#### Returns

`T`[]

___

### getComponentsInChildren

▸ `Static` **getComponentsInChildren**<`T`\>(`go`, `typeName`, `arr?`): `T`[]

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `go` | [`GameObject`](GameObject.md) \| `Object3D`<`Event`\> | `undefined` |
| `typeName` | `Constructor`<`T`\> | `undefined` |
| `arr` | ``null`` \| `T`[] | `null` |

#### Returns

`T`[]

___

### getComponentsInParent

▸ `Static` **getComponentsInParent**<`T`\>(`go`, `typeName`, `arr?`): `T`[]

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `go` | [`GameObject`](GameObject.md) \| `Object3D`<`Event`\> | `undefined` |
| `typeName` | `Constructor`<`T`\> | `undefined` |
| `arr` | ``null`` \| `T`[] | `null` |

#### Returns

`T`[]

___

### getOrAddComponent

▸ `Static` **getOrAddComponent**<`T`\>(`go`, `typeName`): `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `go` | [`GameObject`](GameObject.md) \| `Object3D`<`Event`\> |
| `typeName` | `ConstructorConcrete`<`T`\> |

#### Returns

`T`

___

### instantiate

▸ `Static` **instantiate**(`instance`, `opts?`): ``null`` \| [`GameObject`](GameObject.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `instance` | ``null`` \| [`GameObject`](GameObject.md) \| `Object3D`<`Event`\> | `undefined` |
| `opts` | ``null`` \| [`InstantiateOptions`](InstantiateOptions.md) | `null` |

#### Returns

``null`` \| [`GameObject`](GameObject.md)

___

### instantiateSynced

▸ `Static` **instantiateSynced**(`instance`, `opts`): ``null`` \| [`GameObject`](GameObject.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `instance` | ``null`` \| [`GameObject`](GameObject.md) \| `Object3D`<`Event`\> |
| `opts` | [`InstantiateOptions`](InstantiateOptions.md) |

#### Returns

``null`` \| [`GameObject`](GameObject.md)

___

### invoke

▸ `Static` **invoke**(`go`, `functionName`, `children?`, ...`args`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `go` | `undefined` \| ``null`` \| `Object3D`<`Event`\> | `undefined` |
| `functionName` | `string` | `undefined` |
| `children` | `boolean` | `false` |
| `...args` | `any` | `undefined` |

#### Returns

`void`

___

### invokeOnChildren

▸ `Static` **invokeOnChildren**(`go`, `functionName`, ...`args`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `go` | `undefined` \| ``null`` \| `Object3D`<`Event`\> |
| `functionName` | `string` |
| `...args` | `any` |

#### Returns

`void`

___

### isActiveInHierarchy

▸ `Static` **isActiveInHierarchy**(`go`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `go` | `Object3D`<`Event`\> |

#### Returns

`boolean`

___

### isActiveSelf

▸ `Static` **isActiveSelf**(`go`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `go` | `Object3D`<`Event`\> |

#### Returns

`boolean`

___

### isUsingInstancing

▸ `Static` **isUsingInstancing**(`instance`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `instance` | `Object3D`<`Event`\> |

#### Returns

`boolean`

___

### iterateComponents

▸ `Static` **iterateComponents**(`go`): `Generator`<`any`, `void`, `unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `go` | [`GameObject`](GameObject.md) \| `Object3D`<`Event`\> |

#### Returns

`Generator`<`any`, `void`, `unknown`\>

___

### markAsInstancedRendered

▸ `Static` **markAsInstancedRendered**(`go`, `instanced`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `go` | `Object3D`<`Event`\> |
| `instanced` | `boolean` |

#### Returns

`void`

___

### remove

▸ `Static` **remove**(`instance`): `void`

Removes the object from its parent and deactivates all of its components

#### Parameters

| Name | Type |
| :------ | :------ |
| `instance` | `undefined` \| ``null`` \| `Object3D`<`Event`\> |

#### Returns

`void`

___

### removeComponent

▸ `Static` **removeComponent**(`instance`): `Component`

#### Parameters

| Name | Type |
| :------ | :------ |
| `instance` | `Component` |

#### Returns

`Component`

___

### setActive

▸ `Static` **setActive**(`go`, `active`, `processStart?`, `setVisible?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `go` | `Object3D`<`Event`\> | `undefined` |
| `active` | `boolean` | `undefined` |
| `processStart` | `boolean` | `true` |
| `setVisible` | `boolean` | `true` |

#### Returns

`void`
