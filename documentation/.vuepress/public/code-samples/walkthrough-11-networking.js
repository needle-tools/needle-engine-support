import { Behaviour, onStart, SyncedRoom } from '@needle-tools/engine';
import * as THREE from 'three';
import { configureDemoScene } from './walkthrough-base.js';

configureDemoScene({ showGrid: false });

const COLORS = ['#f2c14e', '#7dd3a0', '#6aa9e8', '#e88a8a', '#b7aaf0'];

// Click a cube and everyone in the room sees it change colour.
class SharedColor extends Behaviour {
  index = 0;
  // Identifies which cube a message is about. Both visitors must agree on
  // it, so it is set where the component is added.
  key = '';

  awake() {
    this.material = this.gameObject.material;
  }

  onEnable() {
    // Listen while enabled. autoCleanup unsubscribes when the component
    // is disabled or destroyed.
    this.autoCleanup(
      this.context.connection.beginListen("change-index", data => {
        if(data.guid === this.key)
          this.apply(data.index);
      })
    );
  }

  onPointerClick() {
    const next = (this.index + 1) % COLORS.length;

    // Apply it here ourselves. `send` goes to everyone else in the room,
    // not back to the sender, so without this our own view wouldn't change.
    this.apply(next);

    // Then tell everyone else in the room. Including a `guid` makes the
    // server keep this message in the room state, so whoever joins later
    // still gets it. Without one it only reaches people already here.
    this.context.connection.send("change-index", { index: next, guid: this.key });
  }

  apply(index) {
    this.index = index;
    this.material.color.set(COLORS[index]);
  }
}

onStart(context => {
  // A fixed room, so both views on this page meet in the same one.
  context.scene.addComponent(SyncedRoom, {
    roomName: 'code-walkthrough-networking',
    urlParameterName: undefined,
  });

  for (let i = 0; i < 3; i++) {
    const cube = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshStandardMaterial({ color: COLORS[0], roughness: 0.4 })
    );
    cube.name = `cube-${i}`;
    cube.position.x = (i - 1) * 1.5;
    context.scene.add(cube);

    /*
      The key has to be the same for this cube in every visitor's browser.
      Here the cube's name gives one. In a scene exported from Unity or
      Blender it is common to use the component's own `guid` instead, which
      the export assigns and every client receives.
    */
    cube.addComponent(SharedColor, { key: `color-${cube.name}` });
  }
});
