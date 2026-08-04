import { Behaviour, onStart } from '@needle-tools/engine';
import * as THREE from 'three';
import { configureDemoScene } from './walkthrough-base.js';

configureDemoScene({ useContactShadows: true });

// One class, configured per instance. `addComponent` takes an init object,
// so each copy gets its own values without a separate subclass.
class Wave extends Behaviour {
  // Defaults — anything the init object doesn't set keeps these.
  amplitude = 0.4;
  speed = 2;
  offset = 0;

  awake() {
    this.baseY = this.gameObject.position.y;
  }

  update() {
    const t = this.context.time.time;
    const wave = Math.sin(t * this.speed + this.offset);
    // Map the wave to 0..1 so cubes only rise from where they started,
    // instead of sinking through the floor on the way down.
    this.gameObject.position.y = this.baseY + (wave + 1) * 0.5 * this.amplitude;
  }
}

onStart(context => {
  const size = 0.1;
  const geometry = new THREE.BoxGeometry(size, size, size);
  const material = new THREE.MeshStandardMaterial({
    color: '#7dd3a0',
    roughness: 0.35,
    flatShading: true,
  });

  const grid = 10;
  const gap = 0.2;
  for (let x = 0; x < grid; x++) {
    for (let z = 0; z < grid; z++) {
      const cube = new THREE.Mesh(geometry, material);
      // Half the cube's height, so it rests on the floor rather than
      // straddling it.
      cube.position.set(
        (x - grid / 2) * gap, 
        size / 2 + .1, 
        (z - grid / 2) * gap
      );
      context.scene.add(cube);

      // 144 instances of the same component, each phase-shifted by distance
      // from the centre so the grid reads as one wave.
      cube.addComponent(Wave, {
        offset: Math.hypot(x - grid / 2, z - grid / 2) * 0.6,
        amplitude: 0.45,
        speed: 2.2,
      });
    }
  }
});
