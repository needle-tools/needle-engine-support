import { Behaviour, Gizmos, Mathf, onStart, OrbitControls } from '@needle-tools/engine';
import * as THREE from 'three';
import { configureDemoScene } from './walkthrough-base.js';

configureDemoScene({ showGrid: false, useContactShadows: true });

// How far the camera may be panned, as a box around the origin.
const PAN_AREA = new THREE.Vector3(2.4, 1.2, 2.4);

onStart(context => {
  // The scene the camera looks at. Built at the bottom of this file.
  const exhibits = buildDemoScene(context);

  const orbit = context.mainCamera.getComponent(OrbitControls);

  /*
    Keep the camera pointed inside a box. targetBounds takes an object, and
    reads its world position as the centre and its world scale as the size —
    so an empty object scaled to the area you want is all it needs. Without
    it, panning can carry the view off the scene entirely.
  */
  const bounds = new THREE.Object3D();
  bounds.scale.copy(PAN_AREA);
  bounds.position.y = PAN_AREA.y / 2;
  context.scene.add(bounds);
  orbit.targetBounds = bounds;

  // Draws the marker and the bounds. See ShowOrbitTarget below.
  context.scene.addComponent(ShowOrbitTarget, { orbit, bounds });

  /*
    Frame everything in the scene. Called with no arguments it fits to the
    whole scene; pass `objects` to fit to a selection instead.
  */
  const frameAll = () => orbit.fitCamera();

  const frameOne = () => orbit.fitCamera({ objects: [exhibits.tower] });

  /*
    Fit from a direction you choose rather than from wherever the camera
    happens to be. The vector points from the scene towards the camera, so
    this ends up looking at the front of the scene from slightly above.
  */
  const frameFromFront = () =>
    orbit.fitCamera({ fitDirection: new THREE.Vector3(0, 0.45, 1) });

  /*
    Move the camera somewhere specific. The second argument is the travel
    time in seconds — pass `true` instead to jump there with no animation.
    Both calls take a point, because the controls aim the camera at a look
    target rather than at a rotation.
  */
  const flyToViewpoint = () => {
    orbit.setCameraTargetPosition(new THREE.Vector3(2.6, 1.5, 2.6), 1.2);
    orbit.setLookTargetPosition(new THREE.Vector3(0, 0.4, 0), 1.2);
  };

  window.addEventListener('message', event => {
    if (event.data === 'frameAll') frameAll();
    if (event.data === 'frameOne') frameOne();
    if (event.data === 'fromFront') frameFromFront();
    if (event.data === 'viewpoint') flyToViewpoint();
  });
});

/*
  A marker on the point the camera orbits around. Normally invisible, which
  makes panning and focusing hard to reason about — drag with the right mouse
  button and watch it slide, and stop at the edge of the bounds.
*/
class ShowOrbitTarget extends Behaviour {
  orbit = null;
  bounds = null;

  awake() {
    this.marker = new THREE.Mesh(
      new THREE.SphereGeometry(0.06, 16, 12),
      new THREE.MeshBasicMaterial({ color: '#e8536d' })
    );
    /*
      Layer 2 is IgnoreRaycast, and raycasts skip it by default. Without this
      the marker sits between the camera and the scene, so double-clicking to
      focus would keep hitting the marker instead of the object behind it.
    */
    this.marker.layers.set(2);
    this.gameObject.add(this.marker);
  }

  update() {
    // `controls` is the three.js OrbitControls underneath, and its target is
    // the point the camera turns around.
    const target = this.orbit?.controls?.target;
    if (target) this.marker.position.copy(target);

    // The box the target is kept inside. Gizmos are drawn per frame and
    // never end up in an export, so they suit showing something that has
    // no geometry of its own.
    if (this.bounds) {
      const t = Math.sin(this.context.time.time);
      const col = new THREE.Color().setHSL(0, 0, Mathf.remap(t, -1, 1, 0.5, 0.8));
      Gizmos.DrawWireBox(
        this.bounds.worldPosition,
        this.bounds.worldScale,
        col,
        0,
        true
      );
    }
  }
}

/* ------------------------------------------------------------------------
   Scenery — three things worth pointing a camera at. Nothing below is
   specific to camera control.
   ------------------------------------------------------------------------ */

function buildDemoScene(context) {
  const material = (color, roughness = 0.5) =>
    new THREE.MeshStandardMaterial({ color, roughness, flatShading: true });

  const tower = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.3, 1.1, 6), material('#7dd3a0'));
  tower.position.set(-1.1, 0.55, 0.2);

  const block = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.6, 0.6), material('#6aa9e8'));
  block.position.set(0.9, 0.3, -0.6);
  block.rotation.y = 0.4;

  const gem = new THREE.Mesh(new THREE.OctahedronGeometry(0.32, 0), material('#f2c14e', 0.25));
  gem.position.set(0.35, 0.32, 0.9);

  [tower, block, gem].forEach(o => context.scene.add(o));
  return { tower, block, gem };
}
