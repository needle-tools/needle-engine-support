import { Behaviour, onStart } from '@needle-tools/engine';
import * as THREE from 'three';

// One class, configured per instance. `addComponent` takes an init object,
// so each copy gets its own values without a separate subclass.
class Wave extends Behaviour {
  // Defaults — anything the init object doesn't set keeps these.
  amplitude = 0.6;
  speed = 2;
  offset = 0;

  awake() {
    this.baseY = this.gameObject.position.y;
  }

  update() {
    const t = this.context.time.time;
    this.gameObject.position.y =
      this.baseY + Math.sin(t * this.speed + this.offset) * this.amplitude;
  }
}

onStart(context => {
  const geometry = new THREE.BoxGeometry(0.28, 0.28, 0.28);
  const material = new THREE.MeshStandardMaterial({
    color: '#7dd3a0',
    roughness: 0.35,
    flatShading: true,
  });

  const grid = 12;
  for (let x = 0; x < grid; x++) {
    for (let z = 0; z < grid; z++) {
      const cube = new THREE.Mesh(geometry, material);
      cube.position.set((x - grid / 2) * 0.42, 0, (z - grid / 2) * 0.42);
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
