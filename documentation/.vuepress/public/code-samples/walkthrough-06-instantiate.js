import { Behaviour, onStart, instantiate, destroy, Mathf, OrbitControls, showBalloonMessage } from '@needle-tools/engine';
import * as THREE from 'three';
import { configureDemoScene } from './walkthrough-base.js';

configureDemoScene({ showGrid: false, useContactShadows: true });

/*
  Where each windmill stands.

  Turning by the golden angle every time and pushing out by the square root
  of the index gives the spiral you see in a sunflower. It spreads the copies
  evenly and keeps them apart however many there are, with no random numbers
  and no checking for overlaps.
*/
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
const SPACING = 0.45;

function placementFor(index) {
  const angle = index * GOLDEN_ANGLE;
  // The square root keeps them equally dense as the circle grows.
  const radius = SPACING * Math.sqrt(index);
  return { angle, radius };
}

// Enough that a held-down button can't fill the scene.
const MAX_CLONES = 100;
const START_CLONES = 1;

// Spins whatever it is attached to. Sits on the blades, a child object.
class Spin extends Behaviour {
  speed = 2;

  update() {
    this.gameObject.rotation.z += this.speed * this.context.time.deltaTime;
  }
}

// Rocks the whole windmill. Sits on the root.
class Sway extends Behaviour {
  offset = 0;

  awake() {
    // Each copy reads its own starting angle, so it sways around wherever
    // it was placed.
    this.restZ = this.gameObject.rotation.z;
  }

  update() {
    const t = this.context.time.time + this.offset;
    this.gameObject.rotation.z = this.restZ + Math.sin(t) * 0.06;
  }
}

const material = (color, roughness = 0.5) =>
  new THREE.MeshStandardMaterial({ color, roughness, flatShading: true });

// One windmill: a tower, and blades that turn. Two components, on two
// different objects in the hierarchy.
function buildWindmill(color) {
  const root = new THREE.Group();
  root.addComponent(Sway);

  const tower = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.06, 0.36, 12), material('#e8e4dc'));
  tower.position.y = 0.18;
  root.add(tower);

  const blades = new THREE.Group();
  blades.position.set(0, 0.37, 0.055);
  root.add(blades);
  // The component lives on the child, not the root.
  blades.addComponent(Spin);

  blades.add(new THREE.Mesh(new THREE.SphereGeometry(0.025, 12, 10), material('#5c6b63', 0.3)));

  for (let i = 0; i < 4; i++) {
    const blade = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.17, 0.01), material(color));
    blade.position.y = 0.1;

    // Turning the arm swings the blade around the hub.
    const arm = new THREE.Group();
    arm.rotation.z = (i / 4) * Math.PI * 2;
    arm.add(blade);
    blades.add(arm);
  }

  return root;
}

onStart(context => {
  // The original stands in the middle, at index 0.
  const original = buildWindmill('#7dd3a0');
  context.scene.add(original);

  // Every clone made here, so they can all be removed again.
  const clones = new Array();

  const orbit = context.mainCamera.getComponent(OrbitControls);

  const spawn = () => {
    if (clones.length >= MAX_CLONES) {
      showBalloonMessage(`That's ${MAX_CLONES} clones — enough for one page.`);
      return;
    }

    const index = clones.length + 1;
    const { angle, radius } = placementFor(index);

    /*
      One call copies the object, its children, and the components on all of
      them. `parent` puts the clone straight into the scene — without it the
      clone exists but isn't anywhere yet, and you would add it yourself.
    */
    const clone = instantiate(original, {
      parent: context.scene,
      position: [Math.cos(angle) * radius, 0, Math.sin(angle) * radius],
      rotation: [0, 0, 0],
    });

    /*
      A clone's components are ordinary components — get one and set it like
      any other. Each clone has its own instances, so giving this one a new
      speed leaves the rest turning at theirs.
    */
    const spin = clone.getComponentInChildren(Spin);
    spin.speed = Mathf.random(1.2, 3.2);

    clone.getComponent(Sway).offset = index * 0.8;

    clones.push(clone);
  };

  const clear = () => {
    // destroy removes objects as well as components.
    clones.forEach(clone => destroy(clone));
    clones.length = 0;
  };

  /*
    Pull the camera back to hold the whole field.
  */
  const frameAll = () =>
    orbit?.fitCamera({ objects: context.scene, fitOffset: 1 });

  while (clones.length < START_CLONES) spawn();
  frameAll();

  window.addEventListener('message', event => {
    if (event.data === 'spawn') spawn();
    if (event.data === 'clear') clear();
    // Pull the camera back as the circle grows, so new clones stay in view.
    frameAll();
  });
});
