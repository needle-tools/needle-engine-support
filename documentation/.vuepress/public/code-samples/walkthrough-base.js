/*
  Shared "stage" for every Scripting Walkthrough example.

  This is the only file that controls how the walkthrough scenes LOOK —
  backdrop, lighting, ground, camera framing. Edit it here and every step
  updates at once. It is deliberately NOT shown in the docs: each step
  prints only its own module, so readers see the concept and not the set
  dressing.
*/
import { onStart, onUpdate, OrbitControls } from '@needle-tools/engine';
import * as THREE from 'three';

export let showGrid = true;

/**
 * @param {{ showGrid?: boolean }} config
 */
export function configureDemoScene(config = {}) {
  if (config.showGrid !== undefined) {
    showGrid = config.showGrid;
  }
}

/** Material every walkthrough shape uses, so the series looks consistent. */
export function stageMaterial(color = '#7dd3a0') {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: 0.35,
    metalness: 0.1,
    flatShading: true,
  });
}

onStart(context => {
  const scene = context.scene;

  const orbit = context.mainCamera.getComponent(OrbitControls);
  if (orbit) {
    orbit.minZoom = 2;
    orbit.maxZoom = 16;
    orbit.autoRotate = false;
  }


  if (showGrid) {
    // A faint grid gives the scene a floor without stealing attention.
    const grid = new THREE.GridHelper(20, 20, 0xdddddd, 0xdddddd);
    grid.position.y = -1.6;
    scene.add(grid);
  }
});
