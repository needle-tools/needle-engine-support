import { Behaviour, onStart } from '@needle-tools/engine';
import * as THREE from 'three';

// Each component does one small thing, and knows nothing about the others.
class Rotate extends Behaviour {
  speed = 0.6;

  update() {
    this.gameObject.rotation.y += this.speed * this.context.time.deltaTime;
  }
}

class Bob extends Behaviour {
  amplitude = 0.25;
  frequency = 0.5;

  awake() {
    // Remember where we started, so the motion is relative to it.
    this.baseY = this.gameObject.position.y;
  }

  update() {
    const t = this.context.time.time;
    this.gameObject.position.y =
      this.baseY + Math.sin(t * this.frequency * Math.PI * 2) * this.amplitude;
  }
}

class Breathe extends Behaviour {
  amount = 0.08;

  update() {
    const t = this.context.time.time;
    const s = 1 + Math.sin(t * 1.5) * this.amount;
    this.gameObject.scale.set(s, s, s);
  }
}

onStart(context => {
  const shape = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1, 0),
    new THREE.MeshStandardMaterial({
      color: '#7dd3a0',
      roughness: 0.35,
      metalness: 0.1,
      flatShading: true,
    })
  );
  context.scene.add(shape);

  // Three components, one object. Stack them in any order.
  shape.addComponent(Rotate);
  shape.addComponent(Bob);
  shape.addComponent(Breathe);
});
