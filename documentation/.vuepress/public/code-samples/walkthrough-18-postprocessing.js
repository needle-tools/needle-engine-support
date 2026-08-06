import {
  Behaviour,
  onStart,
  BloomEffect,
  Gizmos,
  DepthOfField,
  ScreenSpaceAmbientOcclusionN8,
  OrbitControls,
} from '@needle-tools/engine';
import * as THREE from 'three';
import { configureDemoScene } from './walkthrough-base.js';

configureDemoScene({ showGrid: false });

// The viewpoint the example opens on.
const CAMERA_POSITION = new THREE.Vector3(-1.642094, 0.709587, 4.062127);
const CAMERA_ROTATION = new THREE.Quaternion(-0.053509, -0.188422, -0.010282, 0.980575);

onStart(context => {
  /*
    An effect is a component. Add it to any object in the scene and it
    registers itself — there is no manager or Volume to set up first.
    `context.postprocessing` is the subsystem they register with, if you
    need to reach it directly.
  */
  const bloom = context.scene.addComponent(BloomEffect);
  // Every setting is a VolumeParameter, so values go through `.value`.
  bloom.threshold.value = 1.05;
  bloom.intensity.value = 2;
  bloom.scatter.value = .9;

  const dof = context.scene.addComponent(DepthOfField);
  // focalLength is how wide the sharp band is, in metres. 
  // aperture reads like an f-stop: a bigger number is a smaller opening and less blur.
  dof.focalLength.value = 4;
  dof.aperture.value = 5;
  /*
    Render the blur at full resolution. It defaults to 1 / devicePixelRatio,
    which halves it on a retina screen — cheaper, but the upscale leaves
    coloured fringes along high-contrast edges.
  */
  dof.resolutionScale.value = 1;

  // Ambient occlusion darkens the creases a light can't reach into.
  const ao = context.scene.addComponent(ScreenSpaceAmbientOcclusionN8);
  ao.aoRadius.value = 0.6;
  ao.intensity.value = 4;

  window.addEventListener('message', event => {
    // Effects are components, so switching one off is the same `enabled`
    // flag every other component has.
    if (event.data === 'bloom') bloom.enabled = !bloom.enabled;
    if (event.data === 'dof') dof.enabled = !dof.enabled;
    if (event.data === 'ao') ao.enabled = !ao.enabled;
  });

  // The scene the effects run on. Built at the bottom of this file.
  const props = buildDemoScene(context);

  const orbit = context.mainCamera.getComponent(OrbitControls);
  if (orbit) {
    // Take the shot, rather than letting the camera fit itself to the scene
    // and frame the far blocks along with everything else.
    orbit.autoFit = false;
    orbit.setCameraTargetPosition(CAMERA_POSITION, true);

    /*
      OrbitControls aims the camera at its look target, so the orientation is
      given as a point to look at rather than a rotation. This one sits on the
      view axis, so it sets the framing without changing where the camera
      points; AutoFocus moves it onto the focal point on its first reading.
    */
    const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(CAMERA_ROTATION);
    orbit.setLookTargetPosition(CAMERA_POSITION.clone().addScaledVector(forward, 3), true);

    /*
      Polar angle is measured from straight up, in radians. Stopping at 90°
      keeps the camera level with its target at the lowest, so dragging can't
      swing it under the ground and look up through the floor.
    */
    orbit.minPolarAngle = 0.35;
    orbit.maxPolarAngle = Math.PI / 2;
  }

  // Focus on whatever is in the middle of the view, and keep checking.
  context.scene.addComponent(AutoFocus, { effect: dof, orbit });
});

/*
  Autofocus, the way a camera does it: fire a ray through the middle of the
  view and focus on whatever it hits.

  focusDistance is a distance from the camera in metres, not a point in the
  scene, so it has to be recalculated whenever the view changes. Orbit the
  scene and the focus follows what you point at.
*/
const SCREEN_CENTRE = new THREE.Vector2(0, 0);
// Reused each frame, so the gizmo doesn't allocate a vector per draw.
const FORWARD = new THREE.Vector3();

class AutoFocus extends Behaviour {
  effect = null;
  /** Optional. Its pivot is moved onto the focal point once, at startup. */
  orbit = null;
  /** Seconds between raycasts. Focus doesn't need to be measured per frame. */
  interval = 0.2;
  /** Used when the ray hits nothing, so the focus doesn't jump to zero. */
  fallback = 6;
  /** How quickly focus travels to a new subject. */
  speed = 3;

  awake() {
    this._timer = 0;
    this._distance = this.fallback;
  }

  update() {
    if (!this.effect) return;

    this._timer -= this.context.time.deltaTime;
    if (this._timer <= 0) {
      this._timer = this.interval;

      /*
        screenPoint is in normalized device coordinates, so (0, 0) is the
        centre of the view. Hits come back sorted, nearest first.
      */
      const hits = this.context.physics.raycast({ screenPoint: SCREEN_CENTRE });
      this._distance = hits.length > 0 ? hits[0].distance : this.fallback;

      /*
        Put the orbit pivot on the first thing focused, so dragging turns
        around what the ring is sitting on. The point is on the view axis, so
        moving the pivot there reframes without turning the camera.
      */
      if (this.orbit && !this._pivotSet && hits.length > 0) {
        this._pivotSet = true;
        this.orbit.setLookTargetPosition(this.focalPoint(this._distance), true);
      }
    }

    // Ease towards it, so changing subject racks focus instead of snapping.
    const current = this.effect.focusDistance.value;
    const t = Math.min(1, this.context.time.deltaTime * this.speed);
    const focus = current + (this._distance - current) * t;
    this.effect.focusDistance.value = focus;

    this.drawFocusRing(focus);
  }

  /*
    A reticle on the focal plane, so you can see where the focus actually
    landed. Gizmos are drawn per frame and never end up in an export, which
    makes them a good fit for showing what a component is doing.
  */
  drawFocusRing(distance) {
    const forward = this.viewDirection();
    Gizmos.DrawCircle(this.focalPoint(distance), forward, 0.06, 0xff3366, 0, false);
  }

  /** Where the camera is pointing, from its rotation. */
  viewDirection() {
    return FORWARD.set(0, 0, -1).applyQuaternion(this.context.mainCamera.worldQuaternion);
  }

  /** The point on the focal plane, straight ahead of the camera. */
  focalPoint(distance) {
    return this.context.mainCamera.worldPosition
      .clone()
      .addScaledVector(this.viewDirection(), distance);
  }
}

/* ------------------------------------------------------------------------
   Everything below is scenery — a ground, a sun and props for the effects
   to act on. None of it is specific to post-processing.

   The one part worth knowing: depth of field needs a scene with depth, so
   the props run from near the camera far into the background rather than
   sitting in a line across the view. `glow` marks the ones bright enough
   for bloom to catch, and `h` makes a block taller than it is wide.
   ------------------------------------------------------------------------ */

const GREY = '#98a49c';
const PALE = '#e8e4dc';

const PROPS = [
  // Foreground, closest to the camera.
  { shape: 'cone',  pos: [-0.95, 1.5],  size: 0.34, color: '#6aa9e8' },
  { shape: 'box',   pos: [1.15, 1.35],  size: 0.32, color: PALE },
  { shape: 'lamp',  pos: [0.35, 1.0],   size: 0.10, color: '#f2c14e', glow: true },
  { shape: 'box',   pos: [-1.75, 0.9],  size: 0.4,  color: GREY, h: 1.8 },

  // Middle ground. The cylinder stands centre stage, where the focus lands.
  { shape: 'cyl',   pos: [-0.2, 0.45],  size: 0.34, color: '#e86a9b', h: 1.3 },
  { shape: 'box',   pos: [1.5, 0.2],    size: 0.44, color: GREY, h: 1.2 },
  { shape: 'ico',   pos: [0.55, -0.25], size: 0.32, color: '#7dd3a0' },
  { shape: 'lamp',  pos: [-1.0, -0.4],  size: 0.09, color: '#e86a9b', glow: true },
  { shape: 'cyl',   pos: [-2.1, -0.6],  size: 0.5,  color: PALE },
  { shape: 'box',   pos: [0.05, -1.05], size: 0.5,  color: GREY, h: 2.4 },
  { shape: 'oct',   pos: [1.95, -1.2],  size: 0.34, color: '#6aa9e8' },

  // Background — taller and sparser, so the far blur has something to sit on.
  { shape: 'box',   pos: [-1.5, -1.9],  size: 0.55, color: GREY, h: 3.2 },
  { shape: 'lamp',  pos: [0.9, -2.0],   size: 0.10, color: '#7dd3a0', glow: true },
  // The ring sits well back, where the blur has something to bite on.
  { shape: 'torus', pos: [-0.35, -2.6], size: 0.55, color: '#e86a9b' },
  { shape: 'box',   pos: [2.6, -2.4],   size: 0.6,  color: GREY, h: 2.0 },
  { shape: 'cone',  pos: [-2.7, -2.7],  size: 0.7,  color: '#e86a9b' },
  { shape: 'box',   pos: [0.4, -3.3],   size: 0.7,  color: GREY, h: 2.8 },
  { shape: 'cyl',   pos: [-0.9, -3.8],  size: 0.8,  color: PALE, h: 2.2 },
  { shape: 'box',   pos: [2.2, -4.2],   size: 0.75, color: GREY, h: 2.8 },
  { shape: 'lamp',  pos: [-2.2, -4.6],  size: 0.12, color: '#9d7dea', glow: true },
  { shape: 'box',   pos: [0.8, -5.4],   size: 0.9,  color: GREY, h: 2.6 },
  { shape: 'box',   pos: [-1.9, -6.2],  size: 1.0,  color: GREY, h: 2.4 },
  { shape: 'box',   pos: [3.1, -6.6],   size: 0.85, color: GREY, h: 3.0 },
];

// Each prop stands on the ground, so every shape is raised by half its height.
function buildProp({ shape, size, color, glow, h = 1 }) {
  const material = glow
    // Bloom only picks up what is brighter than its threshold. Emissive is
    // what pushes these past it — a plain colour would stay below it.
    ? new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 2.5 })
    : new THREE.MeshStandardMaterial({ color, roughness: 0.6 });

  switch (shape) {
    case 'box':
      return raise(new THREE.Mesh(new THREE.BoxGeometry(size, size * h, size), material), size * h / 2);
    case 'cyl':
      return raise(new THREE.Mesh(new THREE.CylinderGeometry(size / 2.8, size / 2.8, size * h, 24), material), size * h / 2);
    case 'cone':
      return raise(new THREE.Mesh(new THREE.ConeGeometry(size / 2, size * h, 24), material), size * h / 2);
    case 'ico':
      return raise(new THREE.Mesh(new THREE.IcosahedronGeometry(size / 2, 0), material), size / 2);
    case 'oct':
      return raise(new THREE.Mesh(new THREE.OctahedronGeometry(size / 2, 0), material), size / 2);
    case 'torus':
      return raise(new THREE.Mesh(new THREE.TorusGeometry(size / 2, size / 6, 18, 44), material), size / 2 + size / 6);
    // A glowing ball on a thin post, so the light sits above the ground.
    default: {
      const post = raise(
        new THREE.Mesh(
          new THREE.CylinderGeometry(0.014, 0.02, 0.55, 10),
          new THREE.MeshStandardMaterial({ color: '#7b837e', roughness: 0.5 })
        ),
        0.275
      );
      const bulb = new THREE.Mesh(new THREE.IcosahedronGeometry(size, 3), material);
      bulb.position.y = 0.275 + size * 0.8;
      post.add(bulb);
      return post;
    }
  }
}

function raise(mesh, y) {
  mesh.position.y = y;
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function buildDemoScene(context) {
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(60, 60),
    new THREE.MeshStandardMaterial({ color: '#d9d9d4', roughness: 1 })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  context.scene.add(ground);

  const sun = new THREE.DirectionalLight('#fff6e8', 1.6);
  sun.position.set(4, 7, 5);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  // The shadow camera has to cover the props, or their shadows are clipped.
  sun.shadow.camera.near = 1;
  sun.shadow.camera.far = 30;
  sun.shadow.camera.left = -8;
  sun.shadow.camera.right = 8;
  sun.shadow.camera.top = 8;
  sun.shadow.camera.bottom = -8;
  sun.shadow.bias = -0.0006;
  context.scene.add(sun);

  return PROPS.map(prop => {
    const object = buildProp(prop);
    object.position.x = prop.pos[0];
    object.position.z = prop.pos[1];
    // Turn each one a little, so repeated shapes don't line up.
    object.rotation.y = prop.pos[0] + prop.pos[1];
    context.scene.add(object);
    return object;
  });
}
