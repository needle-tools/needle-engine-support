# Networking Concepts

Understanding the core concepts of multiplayer networking in Needle Engine.

---

## Rooms and State

At the heart of networking in Needle Engine is the concept of synchronized rooms. Each room has an ID, and users connect to a room by providing this ID. Rooms are stored on a server, and users can join and leave rooms at any time.

When a user joins a room, they receive the current state of the room, apply that current state to their scene, and then listen for changes to the room state.
When a user leaves a room, they stop listening for changes to the room state.

Room state is stored as JSON data on the server, so all changes are persistent. This means that room state is not only useful for networking, but also for persisting actions of a single user.

Needle can provide _view-only IDs_ for rooms. When accessing a room with a view-only ID, the user will not be able to interact with the room, but will be able to see the current state and get live updates. This is useful for presentations or demonstrations.

---

## Ownership

Objects in a room can be _owned_ by a user. This means that only the owner of an object can change its state.

By default, objects have no owner.

Components like `DragControls` will request ownership of an object before actually moving it.

In custom components, you can control how ownership is handled.
There may be no ownership required, ownership may be allowed to be transferred to another user automatically, or ownership may be transferred only by a specific action.

When a user leaves a room, objects owned by that user will either be deleted or have ownership reset, depending on how the object was created.

---

## Related

- [Networking Overview](./index) - Getting started with networking
- [Sync Component State](./sync-state) - Use @syncField for automatic syncing
- [Manual Networking](./manual-networking) - Low-level networking API
