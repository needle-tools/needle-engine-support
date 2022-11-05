[com.needle.engine - v2.39.0-pre](../README.md) / Collision

# Class: Collision

## Table of contents

### Constructors

- [constructor](Collision.md#constructor)

### Properties

- [contacts](Collision.md#contacts)
- [me](Collision.md#me)

### Accessors

- [collider](Collision.md#collider)
- [gameObject](Collision.md#gameobject)
- [rigidBody](Collision.md#rigidbody)

## Constructors

### constructor

• **new Collision**(`obj`, `otherCollider`, `contacts`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `Object3D`<`Event`\> |
| `otherCollider` | `ICollider` |
| `contacts` | `ContactPoint`[] |

## Properties

### contacts

• `Readonly` **contacts**: `ContactPoint`[]

___

### me

• `Readonly` **me**: `Object3D`<`Event`\>

## Accessors

### collider

• `get` **collider**(): `ICollider`

the collider the collision happened with

#### Returns

`ICollider`

___

### gameObject

• `get` **gameObject**(): `Object3D`<`Event`\>

#### Returns

`Object3D`<`Event`\>

___

### rigidBody

• `get` **rigidBody**(): ``null`` \| `IRigidbody`

the rigidbody we hit, null if none attached

#### Returns

``null`` \| `IRigidbody`
