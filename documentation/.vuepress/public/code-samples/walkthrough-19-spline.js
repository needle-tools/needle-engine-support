import {
  Behaviour,
  Gizmos,
  Mathf,
  ObjectUtils,
  onStart,
  SplineContainer,
  SplineWalker,
} from '@needle-tools/engine';
import * as THREE from 'three';
import { configureDemoScene } from './walkthrough-base.js';

// This scene lights itself, so the shared contact shadows stay off.
configureDemoScene({ showGrid: false, autoFrame: false });

/** Turns the page's scroll into a position along the camera's spline. */
class ScrollAlongSpline extends Behaviour {
  walker = null;
  /** How much scrolling the camera sits out, so the shapes arrive first. */
  hold = 0.25;

  awake() {
    /** The scroll, 0 to 1. Everything else in the scene reads this. */
    this.progress = 0;
  }

  update() {
    const page = document.documentElement;
    const scrollable = page.scrollHeight - window.innerHeight;
    const target = scrollable > 0 ? page.scrollTop / scrollable : 0;

    // Eased, so a wheel notch glides instead of jumping.
    this.progress += (target - this.progress) * Math.min(1, this.context.time.deltaTime * 5);

    // Holding still is just not changing position01 yet.
    this.walker.position01 = Mathf.clamp01((this.progress - this.hold) / (1 - this.hold));
  }
}

/** Flies one shape along its spline, on its own slice of the same scroll. */
class FlyWithScroll extends Behaviour {
  walker = null;
  scroll = null;
  // Not called `start`: that is a lifecycle method, and a field replaces it.
  beginsAt = 0;
  /** How much scrolling carries it all the way in. */
  span = 0.3;

  update() {
    const travelled = Mathf.clamp01((this.scroll.progress - this.beginsAt) / this.span);
    // Eased, so a shape leaves and arrives gently rather than at one rate.
    this.walker.position01 = Mathf.easeInOutCubic(travelled);
  }
}

/** Draws every spline in the scene, each in its own colour. */
class ShowPath extends Behaviour {
  paths = [];

  awake() {
    this.visible = false;
  }

  toggle() {
    this.visible = !this.visible;
  }

  add(spline, color) {
    this.paths.push({ spline, color });
  }

  update() {
    if (!this.visible) return;

    for (const path of this.paths) {
      // getPointAt samples the curve: 0 is the start, 1 is the end.
      let previous = path.spline.getPointAt(0);
      for (let i = 1; i <= 60; i++) {
        const point = path.spline.getPointAt(i / 60);
        Gizmos.DrawLine(previous, point, path.color, 0, true);
        previous = point;
      }
    }
  }
}

onStart(context => {
  const stage = buildStage(context);

  // A spline is a list of knots with a smooth curve through them.
  const path = new THREE.Object3D();
  context.scene.add(path);
  const spline = path.addComponent(SplineContainer);

  // A turn around the podium. The sine swoops the camera in and back out.
  const knots = 8;
  for (let i = 0; i < knots; i++) {
    const t = i / knots;
    const swoop = Math.sin(t * Math.PI);
    const angle = Math.PI * 0.3 + t * Math.PI * 2;
    const distance = Mathf.lerp(13, 8, swoop);
    spline.addKnot({
      position: new THREE.Vector3(
        Math.cos(angle) * distance,
        Mathf.lerp(4, 2.4, swoop),
        Math.sin(angle) * distance
      ),
    });
  }

  // Joins the last knot to the first, so the trip ends where it began.
  spline.closed = true;

  // SplineWalker moves an object along a spline. Here it is the camera rig.
  const walker = context.mainCamera.addComponent(SplineWalker, {
    spline,
    // Off, because the scroll drives it rather than the clock.
    autoRun: false,
    clamp: true,
    lookAt: stage.focus,
  });

  const scroll = context.scene.addComponent(ScrollAlongSpline, { walker });
  context.scene.addComponent(ScrollHint, { scroll });

  const pathView = context.scene.addComponent(ShowPath);
  pathView.add(spline, 0x8d9a93);

  /*
    All four shapes are here from the start, waiting at the head of their own
    paths. The starts overlap, so they are all in the air at once.
  */
  [0.02, 0.05, 0.08, 0.11].forEach((beginsAt, index) => {
    const flight = flyInShape(context, index);
    flight.shape.addComponent(FlyWithScroll, { walker: flight.walker, scroll, beginsAt });
    pathView.add(flight.spline, flight.color);
  });

  window.addEventListener('message', event => {
    if (event.data === 'path') pathView.toggle();
    // Every position is read from the scroll, so this resets the scene.
    if (event.data === 'replay') window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

/* ------------------------------------------------------------------------
   The set: shapes, sign and stage. Nothing below is specific to splines.
   ------------------------------------------------------------------------ */

const PODIUM_HEIGHT = 0.6;

// `half` is how far each shape reaches from its middle, which spaces the
// column: resize one and its neighbours move to make room.
const SHAPES = [
  { color: '#6aa9e8', half: 0.35, geometry: () => new THREE.BoxGeometry(0.7, 0.7, 0.7) },
  { color: '#f2c14e', half: 0.42, geometry: () => new THREE.IcosahedronGeometry(0.42, 0) },
  { color: '#e8536d', half: 0.5, geometry: () => new THREE.TorusGeometry(0.36, 0.14, 16, 32) },
  { color: '#7dd3a0', half: 0.35, geometry: () => new THREE.ConeGeometry(0.42, 0.7, 6) },
];

/** Where shape `index` rests, stacked clear of the one below it. */
function restHeight(index) {
  const clear = 0.45;
  let height = PODIUM_HEIGHT + 0.8 + SHAPES[0].half;
  for (let i = 1; i <= index; i++) {
    height += SHAPES[i - 1].half + clear + SHAPES[i].half;
  }
  return height;
}

function flyInShape(context, index) {
  const kind = SHAPES[index];

  const shape = new THREE.Mesh(
    kind.geometry(),
    new THREE.MeshStandardMaterial({ color: kind.color, roughness: 0.4, flatShading: true })
  );
  shape.castShadow = true;
  context.scene.add(shape);

  const path = new THREE.Object3D();
  context.scene.add(path);
  const spline = path.addComponent(SplineContainer);

  // A helix. The four set off a quarter turn apart, so they stay distinct.
  const entry = index * (Math.PI / 2);
  const rest = restHeight(index);
  const rise = 16;
  for (let k = 0; k <= rise; k++) {
    const t = k / rise;
    const angle = entry + t * Math.PI * 3;
    // Closing to 0 lands it on the column's axis.
    const radius = Mathf.lerp(2.4, 0, t);
    spline.addKnot({
      position: new THREE.Vector3(
        Math.cos(angle) * radius,
        Mathf.lerp(3, rest, t),
        Math.sin(angle) * radius
      ),
    });
  }

  const walker = shape.addComponent(SplineWalker, {
    spline,
    autoRun: false,
    clamp: true,
    // Off, so the shape stays upright instead of facing its heading.
    useLookAt: false,
  });

  return { shape, spline, walker, color: kind.color };
}

/** The sign on the podium, which goes once the reader starts scrolling. */
class ScrollHint extends Behaviour {
  scroll = null;

  awake() {
    this.label = ObjectUtils.createText('Scroll', {
      parent: this.gameObject,
      color: '#5d6b63',
      depth: 0.25,
      position: [0, PODIUM_HEIGHT, 0],
      // The font loads in the background, so the size is only known here.
      onGeometry: mesh => {
        mesh.geometry.computeBoundingBox();
        const box = mesh.geometry.boundingBox;
        // Centre the words over the object and stand them on its base.
        mesh.geometry.translate(
          -(box.min.x + box.max.x) / 2,
          -box.min.y,
          -(box.min.z + box.max.z) / 2
        );
      },
    });
    this.label.scale.setScalar(0.35);
    this.label.castShadow = true;
  }

  update() {
    const started = this.scroll.progress > 0.01;
    this.label.visible = !started;
    if (started) return;

    // Turns to the camera around the vertical axis only, so it stays upright.
    const camera = this.context.mainCamera.worldPosition;
    this.label.lookAt(camera.x, this.label.worldPosition.y, camera.z);
  }
}

function buildStage(context) {
  const podium = new THREE.Mesh(
    new THREE.CylinderGeometry(1.5, 1.65, PODIUM_HEIGHT, 44),
    new THREE.MeshStandardMaterial({ color: '#bcc6bf', roughness: 0.75 })
  );
  podium.position.y = PODIUM_HEIGHT / 2;
  podium.receiveShadow = true;
  context.scene.add(podium);

  const floor = new THREE.Mesh(
    new THREE.BoxGeometry(24, 0.5, 24),
    new THREE.MeshStandardMaterial({ color: '#d5dad4', roughness: 0.95 })
  );
  floor.position.y = -0.25;
  floor.receiveShadow = true;
  context.scene.add(floor);

  const sun = new THREE.DirectionalLight('#fff6e8', 0.9);
  sun.position.set(4, 8, 3);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  // The shadow camera has to cover the area the shapes travel through.
  sun.shadow.camera.near = 1;
  sun.shadow.camera.far = 30;
  sun.shadow.camera.left = -9;
  sun.shadow.camera.right = 9;
  sun.shadow.camera.top = 9;
  sun.shadow.camera.bottom = -9;
  sun.shadow.bias = -0.0006;
  context.scene.add(sun);

  // What the camera aims at, level with the middle of the column.
  const focus = new THREE.Object3D();
  focus.position.y = 3.4;
  context.scene.add(focus);

  return { podium, floor, focus };
}
