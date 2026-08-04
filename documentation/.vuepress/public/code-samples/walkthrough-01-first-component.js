import { Behaviour, onStart } from '@needle-tools/engine';
import * as THREE from 'three';
import { configureDemoScene } from './walkthrough-base.js';

// A component is a class extending Behaviour.
// Override only the lifecycle methods you need.
class Rotate extends Behaviour {
  speed = 0.6;

  update() {
    const dt = this.context.time.deltaTime;
    this.gameObject.rotation.y += this.speed * dt;
    this.gameObject.rotation.x += this.speed * 0.35 * dt;
  }
}

onStart(context => {
  const radius = 1;
  const shape = new THREE.Mesh(
    new THREE.IcosahedronGeometry(radius, 0),
    new THREE.MeshStandardMaterial({
      color: '#7dd3a0',
      roughness: 0.35,
      metalness: 0.1,
      flatShading: true,
    })
  );
  // Lift it by its radius so it sits on the floor instead of through it.
  shape.position.y = radius;
  context.scene.add(shape);

  // Attach it — the component wires itself into the render loop.
  shape.addComponent(Rotate);
});

configureDemoScene({ 
  useContactShadows: true,
});