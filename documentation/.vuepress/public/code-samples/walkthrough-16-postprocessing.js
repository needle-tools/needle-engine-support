import { Behaviour, onStart, Volume, BloomEffect, DepthOfField, OrbitControls } from '@needle-tools/engine';
import * as THREE from 'three';
import { configureDemoScene } from './walkthrough-base.js';

configureDemoScene({ showGrid: false });

// Orbs marching away from the camera, so there is something near, something
// in focus, and something far.
const ORBS = [
  { color: '#7dd3a0', z: 1.1 },
  { color: '#6aa9e8', z: 0.3 },
  { color: '#f2c14e', z: -0.5 },
  { color: '#e86a9b', z: -1.3 },
  { color: '#9d7dea', z: -2.1 },
];

/*
  Keeps the focus on one object as you orbit.

  focusDistance is a distance from the camera in metres, not a point in the
  scene, so it has to be recalculated whenever the camera moves.
*/
class FocusOn extends Behaviour {
  target = null;
  effect = null;

  update() {
    if (!this.target || !this.effect) return;
    const camera = this.context.mainCamera.worldPosition;
    this.effect.focusDistance.value = camera.distanceTo(this.target.worldPosition);
  }
}

onStart(context => {
  // A dark room, so the glow has something to read against.
  context.scene.background = new THREE.Color('#12151a');

  const orbs = ORBS.map(({ color, z }, i) => {
    const orb = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.16, 3),
      // Bloom picks up whatever is brighter than its threshold. Emissive is
      // what pushes these past it — a plain colour would stay dull.
      new THREE.MeshStandardMaterial({
        color: '#0a0c10',
        emissive: color,
        emissiveIntensity: 1.8,
        roughness: 0.4,
      })
    );
    orb.position.set(-0.45 + i * 0.22, 0.35, z);
    context.scene.add(orb);
    return orb;
  });

  /*
    Effects live on a Volume. Add the Volume anywhere in the scene, then add
    each effect as a component next to it — the Volume collects them and
    hands them to the renderer.
  */
  const volume = context.scene.addComponent(Volume);

  const bloom = context.scene.addComponent(BloomEffect);
  // Every parameter is a VolumeParameter, so values go through `.value`.
  bloom.threshold.value = 0.6;
  bloom.intensity.value = 1.1;
  bloom.scatter.value = 0.7;

  const dof = context.scene.addComponent(DepthOfField);
  // How wide the sharp band is, and how strong the blur gets outside it.
  dof.focalLength.value = 0.9;
  dof.aperture.value = 8;

  // Focus on the middle orb and hold it there while the camera moves.
  context.scene.addComponent(FocusOn, { target: orbs[2], effect: dof });

  // Frame the whole row, so the near orb is not cut off.
  context.mainCamera.getComponent(OrbitControls)?.fitCamera({
    objects: context.scene,
    immediate: true,
  });

  window.addEventListener('message', event => {
    // Effects are components, so switching one off is the same `enabled`
    // flag every other component has.
    if (event.data === 'bloom') bloom.enabled = !bloom.enabled;
    if (event.data === 'dof') dof.enabled = !dof.enabled;
  });
});
