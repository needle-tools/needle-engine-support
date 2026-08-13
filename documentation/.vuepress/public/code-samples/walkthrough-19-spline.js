import {
  Behaviour,
  Camera,
  Gizmos,
  Mathf,
  ObjectUtils,
  onStart,
  SplineContainer,
  SplineWalker,
} from '@needle-tools/engine';
import * as THREE from 'three';
import { configureDemoScene } from './walkthrough-base.js';

// Contact shadows stay off: this scene lights itself, with a sun that casts
// real ones. See buildStage at the bottom.
configureDemoScene({ showGrid: false, autoFrame: false });

// The podium, and the height of its top face — where the sign stands and the
// shapes come to rest.
const PODIUM_HEIGHT = 0.6;
const PODIUM_TOP = PODIUM_HEIGHT;

/*
  Where along the camera's path each shape sets off, and how much further
  scrolling brings it home.

  The starts are close together and the span is long, so all four are in the
  air at once rather than queuing up one at a time.
*/
const LAUNCHES = [0.02, 0.05, 0.08, 0.11];
const FLIGHT_SPAN = 0.3;

/*
  How much scrolling the camera sits out at the start.

  The shapes fly in first, with nothing else moving to compete for attention.
  There is no pause on a SplineWalker to reach for — the walker goes where its
  position01 says, so holding still is simply not changing that number yet.
*/
const CAMERA_HOLD = 0.25;

/*
  Eases a 0 to 1 value so motion starts and finishes gently.

  A spline is smooth through space, but something moved along it at a constant
  rate still sets off and stops abruptly. This shapes the timing rather than
  the curve: the value lingers near each end and moves quickest through the
  middle, which is what turns a slide into a glide.
*/
function ease(t) {
  const clamped = Mathf.clamp01(t);
  return clamped * clamped * (3 - 2 * clamped);
}

/** Which way round the podium the camera is looking from, at 0 to 1 of its path. */
function cameraAngle(at) {
  return Math.PI * 0.3 + at * Math.PI * 2;
}

/*
  Holds the camera back before it commits to closing in.

  Raising the value to a power bends the whole trip: the early part of the
  scroll now covers much less of the approach, so the camera hangs back while
  the shapes are still arriving and only comes close once they have gathered.
*/
function approach(t) {
  return Math.pow(Mathf.clamp01(t), 1.5);
}

// The colour the camera's own path is drawn in, next to the shapes' paths.
const CAMERA_PATH_COLOR = 0x8d9a93;

/*
  Turns the page's scroll position into a position along a spline.

  The scene is pinned and a tall element behind it gives the page something to
  scroll, so scrolling reads as travelling rather than as moving a page.
*/
class ScrollAlongSpline extends Behaviour {
  /** The walker to drive. */
  walker = null;
  /** Higher catches up with the scrollbar sooner. */
  smoothing = 5;

  awake() {
    this.progress = 0;
  }

  update() {
    const page = document.documentElement;
    const scrollable = page.scrollHeight - window.innerHeight;
    const target = scrollable > 0 ? page.scrollTop / scrollable : 0;

    /*
      Ease towards the scroll position instead of copying it. A wheel notch
      moves the scrollbar in one jump, and following that exactly makes the
      camera stutter from one place to the next.
    */
    const t = Math.min(1, this.context.time.deltaTime * this.smoothing);
    this.progress += (target - this.progress) * t;

    /*
      The camera sits out the first stretch and takes the rest, so 0 is the
      start of its curve and 1 the end, whatever its length. Everything else
      in the scene reads `progress` above, which is the scroll untouched.
    */
    const own = (this.progress - CAMERA_HOLD) / (1 - CAMERA_HOLD);
    this.walker.position01 = Mathf.clamp01(own);
  }
}

/*
  A sign in the scene telling the reader what to do, which goes away once they
  have done it.

  ObjectUtils.createText builds 3D text from a font. The font is fetched in the
  background, so the mesh comes back before its geometry exists — onGeometry
  runs once it is there, which is the point at which the size is known.
*/
class ScrollHint extends Behaviour {
  scroll = null;

  awake() {
    this.label = ObjectUtils.createText('Scroll', {
      parent: this.gameObject,
      color: '#5d6b63',
      // Extruded far enough to read as a solid object rather than a decal.
      depth: 0.25,
      // Standing on top of the podium. See onGeometry for what makes the
      // position mean "where it stands" rather than "its middle".
      position: [0, PODIUM_TOP, 0],
      onGeometry: mesh => {
        /*
          Text is built rightwards from its baseline, so an untouched geometry
          hangs off to one side of its object. Shifting it puts the middle of
          the words over the object and their base on it.
        */
        mesh.geometry.computeBoundingBox();
        const box = mesh.geometry.boundingBox;
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
    // Its job is done the moment the reader starts scrolling.
    const started = this.scroll.progress > 0.01;
    this.label.visible = !started;
    if (started) return;

    /*
      Turns to face the camera, but only around the vertical axis. Aiming it
      at the camera outright would tip it back, because the camera looks down
      on the podium from above.
    */
    const camera = this.context.mainCamera.worldPosition;
    this.label.lookAt(camera.x, this.label.worldPosition.y, camera.z);
  }
}

/*
  Draws every path in the scene, which are otherwise invisible.

  getPointAt samples a curve: 0 is the start, 1 is the end, and anything
  between is a point along the way. Walking that range in small steps and
  joining the results gives the whole shape of a path.
*/
class ShowPath extends Behaviour {
  /** `[{ spline, color }]` — each drawn in its own colour. */
  paths = [];
  /** More segments give a smoother line and cost a little more per frame. */
  segments = 60;

  awake() {
    this.visible = false;
  }

  toggle() {
    this.visible = !this.visible;
  }

  add(spline, color) {
    this.paths.push({ spline, color });
  }

  remove(spline) {
    this.paths = this.paths.filter(path => path.spline !== spline);
  }

  update() {
    if (!this.visible) return;

    for (const path of this.paths) {
      let previous = path.spline.getPointAt(0);
      for (let i = 1; i <= this.segments; i++) {
        const point = path.spline.getPointAt(i / this.segments);
        // Gizmos are drawn per frame and never end up in an export, which is
        // what makes them right for showing something that has no geometry.
        Gizmos.DrawLine(previous, point, path.color, 0, true);
        previous = point;
      }
    }
  }
}

/*
  Flies a shape along its own spline, driven by the same scroll as the camera.

  The shape's walker has `autoRun` off, exactly like the camera's. What differs
  is the mapping: each shape takes only the slice of scroll between where it
  sets off and where it arrives, and those slices start before the camera has
  begun to move at all. Scroll back up and a shape flies out again, because
  nothing here is a one-way animation — it is a position being read.
*/
class FlyWithScroll extends Behaviour {
  /** The shape's own walker. */
  walker = null;
  /** The ScrollAlongSpline component, which holds the scroll itself. */
  scroll = null;
  /** Where in the scroll this flight begins. */
  start = 0;
  /** How much further scrolling completes it. */
  span = FLIGHT_SPAN;

  update() {
    const travelled = (this.scroll.progress - this.start) / this.span;
    // Eased, so the shape leaves and arrives softly rather than at one rate.
    this.walker.position01 = ease(travelled);
  }
}

/*
  Opens the lens wide at the start and closes in towards the end.

  It costs one line of maths and does two things at once: the wide angle takes
  in the whole stage while the camera is far out, and closing in as it arrives
  makes the last stretch feel like attention settling on the column.
*/
class ZoomWithScroll extends Behaviour {
  /** The camera's walker, whose position01 is the scroll. */
  walker = null;
  /** Field of view at the start of the trip, in degrees. */
  wide = 75;
  /** And at the end. */
  close = 45;

  update() {
    const camera = this.gameObject.getComponent(Camera);
    if (!camera) return;
    camera.fieldOfView = Mathf.lerp(this.wide, this.close, ease(approach(this.walker.position01)));
  }
}

onStart(context => {
  const stage = buildStage(context);

  /*
    A spline is a list of knots with a smooth curve through them. Knot
    positions are local to the object the SplineContainer sits on.
  */
  const path = new THREE.Object3D();
  context.scene.add(path);
  const spline = path.addComponent(SplineContainer);

  /*
    A full turn around the podium that swoops in and back out again. The sine
    is what does that: it is 0 at both ends of the trip and 1 in the middle, so
    the camera is far and high to begin with, close and low halfway round, and
    back where it started at the end.

    Circling at a fixed distance would keep the podium the same size on screen
    the whole way, and the travel would barely read — coming closer is what
    makes it feel like an approach.
  */
  const KNOTS = 8;
  for (let i = 0; i < KNOTS; i++) {
    const t = i / KNOTS;
    const angle = cameraAngle(t);
    const swoop = Math.sin(approach(t) * Math.PI);
    const distance = 8 - swoop * 3.8;
    spline.addKnot({
      position: new THREE.Vector3(
        Math.cos(angle) * distance,
        4.5 - swoop * 2.7,
        Math.sin(angle) * distance
      ),
    });
  }

  /*
    Joins the last knot back to the first, so the curve is one continuous loop
    rather than a line with two ends. That is what lets the trip finish where
    it began — no closing knot to place on top of the opening one.
  */
  spline.closed = true;

  /*
    SplineWalker moves an object along a spline. On the camera, it becomes the
    camera rig — the page sets camera-controls="false", so nothing else is
    competing for the camera.
  */
  const walker = context.mainCamera.addComponent(SplineWalker, {
    spline,
    // Off, because the scroll position drives it rather than the clock.
    autoRun: false,
    // Stops at both ends instead of wrapping around to the start.
    clamp: true,
    // Keeps the display in frame the whole way round. Without it the camera
    // faces along the curve, which suits a fly-through more than a display.
    lookAt: stage.focus,
  });

  const scroll = context.scene.addComponent(ScrollAlongSpline, { walker });
  context.scene.addComponent(ScrollHint, { scroll });
  context.mainCamera.addComponent(ZoomWithScroll, { walker });

  const pathView = context.scene.addComponent(ShowPath);
  pathView.add(spline, CAMERA_PATH_COLOR);

  /*
    Every shape is here from the start, waiting at the head of its own path.
    Each one flies in along a spline driven by the same scroll — so the whole
    scene, camera and cargo alike, is one position read from the scrollbar.

    Nothing is spawned along the way. A shape that appears out of nothing has
    to be explained; four already in the air explain themselves, and the
    reader can see where each of them is headed before moving at all.
  */
  LAUNCHES.forEach((at, i) => {
    const flight = flyInShape(context, i);
    flight.shape.addComponent(FlyWithScroll, {
      walker: flight.walker,
      scroll,
      start: at,
    });
    pathView.add(flight.spline, flight.color);
  });

  // Buttons under the scene. See the walkthrough page.
  window.addEventListener('message', event => {
    if (event.data === 'path') pathView.toggle();
    /*
      Nothing to tear down: every position is read from the scroll, so putting
      the scrollbar back at the top puts the whole scene back with it.
    */
    if (event.data === 'replay') window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

/* ------------------------------------------------------------------------
   The shapes that fly in, and the stage they land on.
   ------------------------------------------------------------------------ */

/*
  Each shape, where it comes in from, and where it settles.

  Where each one comes in from, and where it settles, are both worked out
  rather than written down — see flyInShape.
*/
const SHAPES = [
  { color: '#6aa9e8', geometry: () => new THREE.BoxGeometry(0.7, 0.7, 0.7) },
  { color: '#f2c14e', geometry: () => new THREE.IcosahedronGeometry(0.42, 0) },
  { color: '#e8536d', geometry: () => new THREE.TorusGeometry(0.34, 0.16, 12, 24) },
  { color: '#7dd3a0', geometry: () => new THREE.ConeGeometry(0.42, 0.7, 6) },
];

// Where the shapes come to rest: a column hanging above the podium.
const HOVER_BASE = PODIUM_TOP + 0.8;
const HOVER_GAP = 1;

/** The spot in the column that belongs to shape `index`. */
function hoverSpot(index) {
  return new THREE.Vector3(0, HOVER_BASE + index * HOVER_GAP, 0);
}

function flyInShape(context, index) {
  const kind = SHAPES[index % SHAPES.length];

  const shape = new THREE.Mesh(
    kind.geometry(),
    new THREE.MeshStandardMaterial({ color: kind.color, roughness: 0.4, flatShading: true })
  );
  shape.castShadow = true;
  context.scene.add(shape);

  const path = new THREE.Object3D();
  context.scene.add(path);
  const spline = path.addComponent(SplineContainer);

  /*
    The four set off from four directions, a quarter turn apart, high above
    and outside the camera's loop. They begin off the edge of the frame and
    sweep through it, which is what makes them read as arriving rather than
    appearing on the spot.

    Starting above the camera's own band is the part that matters. A path that
    brushes past the lens puts a shape a metre from the camera, where it fills
    the screen for a moment and reads as a glitch.
  */
  const entry = cameraAngle(LAUNCHES[1]) + Math.PI + index * (Math.PI / 2);
  const to = hoverSpot(index);

  /*
    A helix: one and a half turns around the podium while the radius closes to
    nothing and the shape descends into its place in the column.

    Knots are what makes this possible. Rather than describing the curve, you
    place points along it and let the spline smooth them out — so a shape of
    motion that would be awkward to animate by hand is a short loop here.
  */
  const TURNS = 1.5;
  const RISE = 16;
  const startRadius = 3.5;
  for (let k = 0; k <= RISE; k++) {
    const t = k / RISE;
    const angle = entry + t * Math.PI * 2 * TURNS;
    // Closes to 0 at the end, which is what lands it on the column's axis
    // whatever angle it happens to finish on.
    const radius = Mathf.lerp(startRadius, 0, t);
    spline.addKnot({
      position: new THREE.Vector3(
        Math.cos(angle) * radius,
        Mathf.lerp(4, to.y, t),
        Math.sin(angle) * radius
      ),
    });
  }

  const walker = shape.addComponent(SplineWalker, {
    spline,
    // Off, the same as the camera's: the scroll drives this one too.
    // FlyWithScroll below is what feeds it.
    autoRun: false,
    // Stops at the ends rather than looping back to the start.
    clamp: true,
    // Off, so the shape keeps its upright orientation instead of tipping to
    // face the way it is going.
    useLookAt: false,
  });

  return { shape, path, spline, walker, color: kind.color };
}

function buildStage(context) {
  const podium = new THREE.Mesh(
    new THREE.CylinderGeometry(1.5, 1.65, PODIUM_HEIGHT, 44),
    new THREE.MeshStandardMaterial({ color: '#bcc6bf', roughness: 0.75 })
  );
  podium.position.y = PODIUM_HEIGHT / 2;
  podium.castShadow = true;
  podium.receiveShadow = true;
  context.scene.add(podium);

  const floor = new THREE.Mesh(
    new THREE.BoxGeometry(24, 0.5, 24),
    new THREE.MeshStandardMaterial({ color: '#d5dad4', roughness: 0.95 })
  );
  floor.position.y = -0.25;
  floor.receiveShadow = true;
  context.scene.add(floor);

  /*
    A sun, so the shapes read as sitting on the podium rather than floating
    above it. Its shadow camera has to cover the area they travel through, or
    their shadows are clipped where it ends.
  */
  const sun = new THREE.DirectionalLight('#fff6e8', 0.9);
  sun.position.set(4, 8, 3);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.near = 1;
  sun.shadow.camera.far = 25;
  sun.shadow.camera.left = -8;
  sun.shadow.camera.right = 8;
  sun.shadow.camera.top = 8;
  sun.shadow.camera.bottom = -8;
  sun.shadow.bias = -0.0006;
  context.scene.add(sun);

  /*
    What the camera aims at. It sits partway up the column the shapes gather
    in, so the podium stays in shot underneath and the stack has room above.
  */
  const focus = new THREE.Object3D();
  focus.position.y = 3;
  context.scene.add(focus);

  return { podium, floor, focus };
}
