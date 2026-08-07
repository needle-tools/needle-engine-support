import { Behaviour, onStart } from '@needle-tools/engine';
import * as THREE from 'three';
import { configureDemoScene } from './walkthrough-base.js';

// Each component does one small thing, and knows nothing about the others.
class Rotate extends Behaviour {
  speed = 0.6;

  update() {
    this.gameObject.rotation.y += this.speed * this.context.time.deltaTime;
  }
}

class MoveUpDown extends Behaviour {
  amplitude = 0.5;
  frequency = 0.5;

  awake() {
    // Remember where we started, so the motion is relative to it.
    this.baseY = this.gameObject.position.y;
  }

  update() {
    const t = this.context.time.time;
    const wave = Math.sin(t * this.frequency * Math.PI * 2);
    // Map the wave to 0..1 so the object only ever rises from where it
    // started, instead of sinking below the ground on the way down.
    this.gameObject.position.y = this.baseY + (wave + 1) * 0.5 * this.amplitude;
  }
}

class Breathe extends Behaviour {
  amount = 0.3;
  frequency = 1.5;

  update() {
    const t = this.context.time.time;
    const s = 1 + Math.sin(t * this.frequency) * this.amount;
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
  // The shape has a radius of 1 and Breathe scales it up to 1.3, so start it
  // 1.3 above the floor. Its lowest point then just touches y = 0.
  shape.position.y = 1.3;
  context.scene.add(shape);

  // Three components, one object. Stack them in any order.
  shape.addComponent(Rotate);
  shape.addComponent(MoveUpDown);
  shape.addComponent(Breathe);
});

configureDemoScene({ 
  useContactShadows: true,
});