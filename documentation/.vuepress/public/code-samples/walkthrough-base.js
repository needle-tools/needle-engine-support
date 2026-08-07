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

/*
  Whether the stage frames the scene itself.

  The engine fits the camera once at startup, against whatever size the
  canvas has at that moment. On the docs page each example is an iframe that
  is mounted while the reader scrolls, so that measurement often happens
  before the frame has its final size — and the scene ends up half out of
  view. Framing it here instead, and again whenever the canvas resizes, gets
  the same result at any size.

  Steps that place their own camera set this to false.
*/
export let autoFrame = true;

/**
 * @param {{ showGrid?: boolean, useContactShadows?: boolean, orbitZoom?: boolean,
 *           minZoom?: number, maxZoom?: number, autoFrame?: boolean }} config
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
  if (config.autoFrame !== undefined) {
    autoFrame = config.autoFrame;
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

/*
  Frame the scene, and frame it again whenever the canvas changes size.

  One fit is not enough: the iframe is mounted as the reader scrolls, so the
  first measurement can be of a box that is still settling. Re-fitting on
  resize also keeps the scene framed when the window changes or the layout
  reflows.

  It stops as soon as the reader moves the camera themselves — after that the
  view is theirs, and re-framing it would undo what they did.
*/
function frameSceneOnResize(context, orbit) {
  // The engine's own startup fit is the one that measures too early.
  orbit.autoFit = false;

  const element = context.domElement;
  let userTookOver = false;

  const fit = () => {
    if (userTookOver) return;
    orbit.fitCamera({
      // Same options the engine's own startup fit uses, so the scenes are
      // framed as before — only measured once the canvas has its real size.
      centerCamera: 'y',
      objects: context.scene.children,
      // immediate, because an animated fit reads the camera's in-flight
      // distance and feeds it back into the next one.
      immediate: true,
    });
  };

  // A pointer or wheel on the scene means the reader is driving now.
  const release = () => { userTookOver = true; };
  element.addEventListener('pointerdown', release, { once: true, passive: true });
  element.addEventListener('wheel', release, { once: true, passive: true });

  // Wait a frame so the scene's own onStart has added its objects.
  delayForFrames(1).then(() => {
    fit();
    if (typeof ResizeObserver !== 'undefined') {
      new ResizeObserver(fit).observe(element);
    }
  });
}

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
    if (autoFrame) frameSceneOnResize(context, orbit);
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
