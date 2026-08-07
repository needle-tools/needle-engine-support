import {
  Behaviour,
  onStart,
  Rigidbody,
  BoxCollider,
  SphereCollider,
  PhysicsMaterialCombine,
} from '@needle-tools/engine';
import * as THREE from 'three';
import { configureDemoScene } from './walkthrough-base.js';

configureDemoScene({ showGrid: false });

// Physics events are component methods too, like awake or update.
class FlashOnHit extends Behaviour {
  awake() {
    this.material = this.gameObject.material;
    this.restColor = this.material.color.clone();
    this.fade = 0;
  }

  // `collision.gameObject` is the other object involved in the hit.
  onCollisionEnter(collision) {
    console.log('hit by', collision.gameObject.name);
    this.fade = 1;
  }

  update() {
    if (this.fade <= 0) return;

    this.fade -= this.context.time.deltaTime * 1.5;
    this.material.color
      .copy(this.restColor)
      .lerp(new THREE.Color('#f2c14e'), Math.max(this.fade, 0));
  }
}

// Click a ball to punt it upwards. An impulse is an instant change in
// velocity, so this is a kick rather than a force applied over time.
class ClickToLaunch extends Behaviour {

  strength = 1;

  awake() {
    this.body = this.gameObject.getComponent(Rigidbody);
  }

  onPointerClick() {
    this.body?.applyImpulse(new THREE.Vector3(0, this.context.time.deltaTime * this.strength, 0));
  }

  onPointerEnter() { this.context.input.setCursor("pointer") }
  onPointerExit() { this.context.input.setCursor("default") }
}

// Bounciness runs from 0 (stops dead) to 1 (keeps all its energy).
// Ordered dullest to bounciest, so they read left to right in the scene.
const kinds = [
  { name: 'clay', color: '#6aa9e8', bounciness: 0 },
  { name: 'plastic', color: '#7dd3a0', bounciness: 0.75 },
  { name: 'rubber', color: '#f2c14e', bounciness: 0.98 },
];

onStart(context => {
  // The floor. A collider without a Rigidbody never moves, so everything
  // else lands on it.
  const floor = new THREE.Mesh(
    new THREE.BoxGeometry(9, 0.5, 9),
    new THREE.MeshStandardMaterial({ color: '#8d9a93', roughness: 0.6 })
  );
  floor.position.y = -1.5;
  context.scene.add(floor);

  // BoxCollider.add() fits the collider to the geometry. Adding the component
  // directly instead gives you the default 1×1×1 box, whatever the mesh size.
  BoxCollider.add(floor);
  floor.addComponent(FlashOnHit);

  const radius = 0.5;
  const geometry = new THREE.SphereGeometry(radius);

  // One ball per material, spaced apart so they only ever hit the floor and
  // never each other — otherwise the bounce heights aren't comparable.
  kinds.forEach((kind, i) => {
    const ball = new THREE.Mesh(
      geometry,
      new THREE.MeshStandardMaterial({ color: kind.color, roughness: 0.35 })
    );
    ball.name = kind.name;
    ball.position.set((i - 1) * 1.8, 3, 0);
    context.scene.add(ball);

    // A Rigidbody makes it move. The collider gives it a shape, and the
    // physics material on that collider decides how it behaves on impact.
    ball.addComponent(Rigidbody);
    ball.addComponent(SphereCollider, {
      radius: radius,
      sharedMaterial: {
        bounciness: kind.bounciness,
        // Maximum: the ball's own value wins, rather than being averaged
        // with the floor's.
        bounceCombine: PhysicsMaterialCombine.Maximum,
      },
    });

    ball.addComponent(ClickToLaunch, {
      strength: radius * 400,
    });
  });
});
