/*
  Shared "stage" for every Scripting Walkthrough example.

  This is the only file that controls how the walkthrough scenes LOOK —
  backdrop, lighting, ground, camera framing. Edit it here and every step
  updates at once. It is deliberately NOT shown in the docs: each step
  prints only its own module, so readers see the concept and not the set
  dressing.
*/
import { ContactShadows, delayForFrames, onInitialized, onStart, onUpdate, OrbitControls } from '@needle-tools/engine';
import * as THREE from 'three';

export let showGrid = true;
export let useContactShadows = false;
export let orbitZoom = true;

/*
  Zoom limits, in metres, mapped onto the camera's min/max distance.

  Set per step, because the scenes differ by two orders of magnitude: the
  audio radio is 30cm across, the loaded world model is tens of metres. A
  single pair of limits either traps the camera far away from the small
  scenes or lets you fly through the large ones.

  fitCamera() is clamped by these too, so a minZoom larger than the scene
  stops it framing anything properly.
*/
export let minZoom = 0.5;
export let maxZoom = 30;

/**
 * @param {{ showGrid?: boolean, useContactShadows?: boolean, orbitZoom?: boolean,
 *           minZoom?: number, maxZoom?: number }} config
 */
export function configureDemoScene(config = {}) {
  if (config.showGrid !== undefined) {
    showGrid = config.showGrid;
  }
  if (config.useContactShadows !== undefined) {
    useContactShadows = config.useContactShadows;
  }
  if (config.orbitZoom !== undefined) {
    orbitZoom = config.orbitZoom;
  }
  if (config.minZoom !== undefined) {
    minZoom = config.minZoom;
  }
  if (config.maxZoom !== undefined) {
    maxZoom = config.maxZoom;
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

/*
  The step files are a separate <script type="module"> from this one, so this
  module evaluates first and registers the callback below before a step has
  had the chance to call configureDemoScene. Each module script is its own
  task, and the engine can initialise between them — so reading the config
  straight away sometimes read the defaults instead, leaving the grid on in a
  step that turned it off.

  Waiting for DOMContentLoaded removes the race: deferred module scripts all
  finish evaluating before it fires, so every configureDemoScene call has
  landed by then.
*/
const allModulesEvaluated = new Promise(resolve => {
  if (document.readyState === 'complete') resolve();
  else document.addEventListener('DOMContentLoaded', resolve, { once: true });
});

onInitialized(async context => {
  await allModulesEvaluated;

  const scene = context.scene;

  const orbit = context.mainCamera.getComponent(OrbitControls);
  if (orbit) {
    orbit.autoRotate = false;
    orbit.minZoom = minZoom;
    orbit.maxZoom = maxZoom;
    if (!orbitZoom) {
      orbit.enableZoom = false;
    }
  }

  if (showGrid) {
    // A faint grid gives the scene a floor without stealing attention.
    const grid = new THREE.GridHelper(20, 20, 0xdddddd, 0xdddddd);
    scene.add(grid);
  }

  if (useContactShadows) {
    delayForFrames(1).then(() => {
      const cs = new THREE.Object3D();
      cs.addComponent(ContactShadows);
      cs.position.y = 0.01;
      cs.scale.set(4, 4, 4);
      scene.add(cs);
    });
  };
});
