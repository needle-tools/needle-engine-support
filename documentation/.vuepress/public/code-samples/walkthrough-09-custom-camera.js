import { Behaviour, Camera, MaterialPropertyBlock, Mathf, onStart } from '@needle-tools/engine';
import * as THREE from 'three';
import { configureDemoScene } from './walkthrough-base.js';

configureDemoScene({ showGrid: false, useContactShadows: true });

// Yaw turns around this, so the horizon never tilts.
const WORLD_UP = new THREE.Vector3(0, 1, 0);

// How much lighter a prop gets while the cursor is over it.
const HIGHLIGHT_AMOUNT = 0.25;

// How much of the frame a held object takes up. Higher leaves more room
// around it.
const FRAMING = 1.4;

/*
  A camera rig, in place of the built-in controls.

  The page sets camera-controls="false", so nothing moves the camera but this
  component. Two jobs: travel to whichever viewpoint was asked for, and glance
  towards the cursor once there — but only so far.
*/
class CameraRig extends Behaviour {
  /*
    Tells the engine this object already has camera controls. When a scene is
    exported with camera-controls enabled, the engine checks for a controller
    on the main camera before adding its own — so a component that says yes
    here replaces OrbitControls rather than fighting it.

    That check runs when the context is created. This page adds the rig from
    code afterwards, so it also sets camera-controls="false" in the HTML,
    which is the surer route for a code-only scene.
  */
  get isCameraController() {
    return true;
  }

  /** How far it can turn left and right, in degrees. */
  maxYaw = 18;
  /** How far it can look up and down, in degrees. */
  maxPitch = 9;
  /** Higher follows the cursor more closely; lower drifts after it. */
  responsiveness = 3;
  /** Higher arrives at a new viewpoint sooner. */
  travelSpeed = 1.8;
  /** Field of view at rest, and the tightest it may zoom to. */
  restFov = 50;
  minFov = 14;

  awake() {
    this.targetPosition = this.gameObject.position.clone();
    this.targetLookAt = new THREE.Vector3();
    // Where it is aiming right now, easing towards whatever it should be.
    this.currentLookAt = new THREE.Vector3();
    this.focus = null;
    this.yaw = 0;
    this.pitch = 0;
  }

  /** Head for a viewpoint. The rig eases the rest of the way itself. */
  moveTo({ from, at }) {
    this.targetPosition.set(...from);
    this.targetLookAt.set(...at);
  }

  /** Zoom in and turn towards one object, until it is let go. */
  focusOn(object) {
    this.focus = object;
  }

  releaseFocus() {
    this.focus = null;
  }

  /*
    How narrow the view has to be for one object to fill a comfortable part
    of the frame from where the camera is standing.

    A fixed zoom level can't work: the same angle that frames a distant block
    is far too tight for something an arm's length away. Working back from
    the object's size and distance gives every object the same apparent size,
    near or far.
  */
  fovFor(object) {
    const distance = this.gameObject.position.distanceTo(object.worldPosition);
    object.geometry?.computeBoundingSphere?.();
    const radius = object.geometry?.boundingSphere?.radius ?? 0.3;

    // FRAMING leaves room around it, rather than filling the frame edge to edge.
    const angle = 2 * Math.atan((radius * FRAMING) / Math.max(0.01, distance));
    return Mathf.clamp(angle * Mathf.Rad2Deg, this.minFov, this.restFov);
  }

  update() {
    const dt = this.context.time.deltaTime;

    /*
      Ease the field of view rather than setting it outright. A narrower
      angle magnifies what is in front of the camera without moving it, so
      holding an object reads as leaning in for a closer look.
    */
    const camera = this.gameObject.getComponent(Camera);
    if (camera) {
      const wanted = this.focus ? this.fovFor(this.focus) : this.restFov;
      const current = camera.fieldOfView ?? this.restFov;
      camera.fieldOfView = current + (wanted - current) * Math.min(1, dt * 5);
    }

    // Ease towards the chosen viewpoint. Interrupting mid-flight just changes
    // where it is heading — there is no transition to cancel.
    this.gameObject.position.lerp(this.targetPosition, Math.min(1, dt * this.travelSpeed));

    /*
      getPointerPositionRC gives the cursor in screen coordinates from -1 to
      1, with 0 in the middle — already the shape needed for "how far from the
      centre", whatever the size of the canvas.
    */
    const pointer = this.context.input.getPointerPositionRC(0);
    if (pointer) {
      // Clamp first, so a cursor leaving the canvas can't push it further.
      let targetYaw = Mathf.clamp(-pointer.x, -1, 1) * this.maxYaw * Mathf.Deg2Rad;
      let targetPitch = Mathf.clamp(pointer.y, -1, 1) * this.maxPitch * Mathf.Deg2Rad;

      /*
        Drop the glance while an object is held. Otherwise the cursor offset
        pulls the camera off the very thing it is zooming in on — and the
        cursor is sitting on that object, so the two work against each other.
      */
      if (this.focus) {
        targetYaw = 0;
        targetPitch = 0;
      }

      // Ease towards the angle rather than snapping to it, so the camera has
      // some weight instead of tracking the cursor exactly.
      const t = Math.min(1, dt * this.responsiveness);
      this.yaw += (targetYaw - this.yaw) * t;
      this.pitch += (targetPitch - this.pitch) * t;
    }

    /*
      Aim at the held object if there is one, otherwise at the viewpoint's own
      centre, easing between them so letting go swings back rather than
      snapping.

      Working from that point each frame — rather than turning the camera a
      little more each time — is what keeps the limits meaningful; accumulating
      would drift. Yaw then turns around world up and pitch around the camera's
      own right, so the horizon stays level. Rotating in the camera's local
      space instead would roll it, slightly but visibly.
    */
    const wantedLookAt = this.focus ? this.focus.worldPosition : this.targetLookAt;
    this.currentLookAt.lerp(wantedLookAt, Math.min(1, dt * 4));

    const direction = this.currentLookAt.clone().sub(this.gameObject.position).normalize();
    direction.applyAxisAngle(WORLD_UP, this.yaw);
    const right = new THREE.Vector3().crossVectors(direction, WORLD_UP).normalize();
    direction.applyAxisAngle(right, this.pitch);

    // lookAt orients against the object's own up, which is world up here —
    // so there is nowhere for roll to come from.
    this.gameObject.lookAt(this.gameObject.position.clone().add(direction));
  }
}

/*
  Shakes an object for a moment when asked.

  It stores where the object belongs and always offsets from that, rather than
  nudging the current position. Adding to the current position accumulates
  error and leaves the object somewhere slightly wrong when the shake ends.
*/
class Shake extends Behaviour {
  /** How far it moves at the start of a shake, in metres. */
  strength = 0.035;
  /** How long one shake lasts, in seconds. */
  duration = 0.4;

  awake() {
    this.restPosition = this.gameObject.position.clone();
    // Start finished, so nothing happens until something asks.
    this.elapsed = this.duration;
  }

  shake() {
    this.elapsed = 0;
  }

  update() {
    if (this.elapsed >= this.duration) return;

    this.elapsed += this.context.time.deltaTime;

    // Fades out over the shake, so it settles instead of stopping dead.
    const remaining = Math.max(0, 1 - this.elapsed / this.duration);
    const t = this.context.time.time;

    // Three different frequencies, so the motion doesn't read as a wobble
    // along one axis.
    this.gameObject.position.set(
      this.restPosition.x + Math.sin(t * 47) * this.strength * remaining,
      this.restPosition.y + Math.sin(t * 61) * this.strength * remaining * 0.6,
      this.restPosition.z + Math.sin(t * 53) * this.strength * remaining
    );

    if (this.elapsed >= this.duration) {
      // Put it back exactly, rather than wherever the last frame left it.
      this.gameObject.position.copy(this.restPosition);
    }
  }
}

/*
  Makes a prop worth pointing at. The cursor changes over it, and holding it
  down asks the rig to zoom.
*/
class Inspectable extends Behaviour {
  rig = null;
  /** Seconds between shakes while this object is being looked at. */
  shakeInterval = 1.2;

  awake() {
    this.shaker = this.gameObject.getComponent(Shake);
    this.sinceShake = 0;
    this.block = MaterialPropertyBlock.get(this.gameObject);
    // Its own colour, lifted — so each prop stays recognisable rather than
    // every one of them turning the same shade.
    this.highlight = this.gameObject.material.color
      .clone()
      .lerp(new THREE.Color(1, 1, 1), HIGHLIGHT_AMOUNT);
  }

  onPointerEnter() {
    // A per-object cursor, so it reads as something you can interact with.
    this.context.input.setCursor('zoom-in');

    /*
      Lift the colour a little. MaterialPropertyBlock overrides the value on
      this one object, so a shared material would still be safe — setting
      material.color would tint every object using it.
    */
    this.block.setOverride('color', this.highlight);
  }

  onPointerExit() {
    this.context.input.unsetCursor('zoom-in');
    // Back to whatever the shared material says, with nothing to remember.
    this.block.clearAllOverrides();
    // this.release(); // we could release here on pointer exit as well
  }

  onPointerDown() {
    // Zoom in, and aim at this object rather than the viewpoint centre.
    this.rig?.focusOn(this.gameObject);
    // Not straight away: the camera is still moving in, and a shake during
    // the zoom reads as a glitch rather than as the object reacting.
    this.sinceShake = 0;
  }

  onPointerUp() {
    this.release();
  }

  update() {
    // Only the object currently being looked at keeps twitching, and only
    // every so often — a constant shake would just read as broken.
    if (this.rig?.focus !== this.gameObject) return;

    this.sinceShake += this.context.time.deltaTime;
    if (this.sinceShake >= this.shakeInterval) {
      this.sinceShake = 0;
      this.shaker?.shake();
    }
  }

  // Also called on exit, so dragging off an object can't leave it stuck.
  release() {
    this.rig?.releaseFocus();
  }
}

// Two places to stand. The camera starts at neither, so the first button
// press always travels somewhere.
const VIEWPOINTS = {
  front: { from: [-0.2, 0.5, 4], at: [-.1, 0.3, -1] },
  side:  { from: [-4.0, 1.5, 2.0], at: [-0.4, 0.5, -0.9] },
};

onStart(context => {
  const props = buildDemoScene(context);

  // Opens low and a little to the right, so the props overlap and the scene
  // reads as having depth rather than as shapes side by side.
  context.mainCamera.position.set(.5, 1.75, 4.3);

  const rig = context.mainCamera.addComponent(CameraRig);
  rig.targetPosition.copy(context.mainCamera.position);
  rig.targetLookAt.set(-0.2, 0.3, -0.7);
  // Start aiming there rather than easing over from the origin.
  rig.currentLookAt.copy(rig.targetLookAt);

  // Every prop can be held to zoom in on it.
  props.forEach(prop => {
    prop.addComponent(Shake);
    prop.addComponent(Inspectable, { rig });
  });

  window.addEventListener('message', event => {
    const view = VIEWPOINTS[event.data];
    if (view) rig.moveTo(view);
  });
});

/* ------------------------------------------------------------------------
   Scenery — something with depth, so turning the camera reads clearly.
   ------------------------------------------------------------------------ */

function buildDemoScene(context) {
  const material = (color, roughness = 0.55) =>
    new THREE.MeshStandardMaterial({ color, roughness, flatShading: true });

  const props = [
    { geo: new THREE.CylinderGeometry(0.22, 0.3, 1.1, 6), color: '#7dd3a0', pos: [-1.5, 0.55, -0.4] },
    { geo: new THREE.BoxGeometry(0.55, 0.55, 0.55), color: '#6aa9e8', pos: [1.4, 0.28, -0.2] },
    { geo: new THREE.OctahedronGeometry(0.3, 0), color: '#f2c14e', pos: [0.1, 0.3, 0.9] },
    { geo: new THREE.BoxGeometry(0.4, 1.6, 0.4), color: '#98a49c', pos: [-0.9, 0.8, -2.2] },
    { geo: new THREE.BoxGeometry(0.5, 2.2, 0.5), color: '#98a49c', pos: [1, 1.1, -5.8] },
    { geo: new THREE.BoxGeometry(0.55, 0.55, 0.55), color: '#6aa9e8', pos: [0, 0.28, -3.2] },
    { geo: new THREE.ConeGeometry(0.35, 0.9, 20), color: '#e86a9b', pos: [-2.4, 0.45, -1.4] },
  ];

  return props.map(({ geo, color, pos }) => {
    const mesh = new THREE.Mesh(geo, material(color));
    mesh.position.set(...pos);
    context.scene.add(mesh);
    return mesh;
  });
}
