import { Behaviour, onStart, MaterialPropertyBlock } from '@needle-tools/engine';
import * as THREE from 'three';
import { configureDemoScene } from './walkthrough-base.js';

configureDemoScene({ showGrid: false });

// Pointer methods are part of a component, like awake or update. Needle
// raycasts for you and calls them on whatever is under the pointer.
class Pressable extends Behaviour {
  spinning = false;

  awake() {
    // Overrides this object's material properties without cloning the
    // material, so all five boxes keep sharing the same one.
    this.block = MaterialPropertyBlock.get(this.gameObject);
  }

  onPointerEnter() {
    this.block.setOverride('color', new THREE.Color('#f2c14e'));
    // Use the input system rather than setting style.cursor yourself: it
    // counts how many objects asked for a cursor, so moving between two
    // hovered objects doesn't reset it back to the default.
    this.context.input.setCursor('pointer');
  }

  onPointerExit() {
    // Remove the one property this component set, rather than clearing
    // every override on the object. Anything else using the block keeps its own.
    this.block.removeOveride('color');
    this.context.input.unsetCursor('pointer');
  }

  onPointerClick() {
    this.spinning = !this.spinning;
  }

  update() {
    if (!this.spinning) return;
    this.gameObject.rotation.y += 1.6 * this.context.time.deltaTime;
  }
}

onStart(context => {
  // One material for every box. Without the property block above, hovering
  // one box would recolour all of them.
  const shared = new THREE.MeshStandardMaterial({
    color: '#7dd3a0',
    roughness: 0.4,
    flatShading: true,
  });

  for (let i = 0; i < 5; i++) {
    const box = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.8, 0.8), shared);
    box.position.x = (i - 2) * 1.1;
    context.scene.add(box);

    box.addComponent(Pressable);
  }
});
