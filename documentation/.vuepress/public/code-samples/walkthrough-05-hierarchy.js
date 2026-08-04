import { Behaviour, onStart } from '@needle-tools/engine';
import * as THREE from 'three';
import { configureDemoScene } from './walkthrough-base.js';

configureDemoScene({ showGrid: false });

// Turns whatever it is attached to. That's all it does.
class Orbit extends Behaviour {
  speed = 1;

  update() {
    this.gameObject.rotation.y += this.speed * this.context.time.deltaTime;
  }
}

const ball = (radius, color) =>
  new THREE.Mesh(
    new THREE.IcosahedronGeometry(radius, 1),
    new THREE.MeshStandardMaterial({ color, roughness: 0.4, flatShading: true })
  );

// A pivot that turns, with `child` parked `radius` out to one side.
// Turning the pivot carries the child around it — the child has no logic.
const orbitAround = (parent, radius, speed, child) => {
  const pivot = new THREE.Group();
  parent.add(pivot);
  pivot.addComponent(Orbit, { speed });

  child.position.x = radius;
  pivot.add(child);
  return pivot;
};

onStart(context => {
  const sun = ball(0.7, '#e8d16a');
  context.scene.add(sun);
  sun.addComponent(Orbit, { speed: 0.3 });

  const planet = ball(0.35, '#7dd3a0');
  orbitAround(context.scene, 2.4, 0.6, planet);

  // The moon's pivot is a child of the planet, so it inherits the planet's
  // orbit and adds its own on top.
  orbitAround(planet, 0.75, 2.4, ball(0.14, '#c9d1cc'));

  // A second planet further out. Tilting its pivot tilts the whole orbit,
  // because everything under the pivot moves with it.
  const outerOrbit = orbitAround(context.scene, 4.1, 0.28, ball(0.26, '#6aa9e8'));
  outerOrbit.rotation.z = 0.38;

  context.scene.background = new THREE.Color('#1a1d1b');
  context.domElement.setAttribute("background-image", "https://cloud.needle.tools/-/assets/ZUBcksfeyof-feyof-hdri-pmrem/file.pmrem.ktx2");
  context.domElement.setAttribute("background-intensity", "0.01");
  context.domElement.setAttribute("background-blurriness", "0.2");
});
