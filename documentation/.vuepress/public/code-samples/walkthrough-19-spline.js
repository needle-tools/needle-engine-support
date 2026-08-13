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

// Contact shadows stay off: this scene lights itself, with a sun that casts
// real ones. See buildStage at the bottom.
configureDemoScene({ showGrid: false, autoFrame: false });

/* ------------------------------------------------------------------------
   The composition.

   These numbers were fitted against each other and against the camera's lens,
   which this sample never changes. Move one and the framing moves with it, so
   they are gathered here rather than buried where they are used.
   ------------------------------------------------------------------------ */

// The podium is centred on half its height, so its top face is at this.
const PODIUM_HEIGHT = 0.6;

// The column of shapes: where the lowest one hangs, and the clear air between
// each pair. Spacing is measured from the shapes themselves, further down, so
// resizing one moves its neighbours rather than letting them overlap.
const HOVER_BASE = PODIUM_HEIGHT + 0.8;
const HOVER_CLEAR = 0.45;

/*
  The camera's loop.

  It runs in along the ring's own axis, straight through the hole, and out the
  far side before curving back round to the start. The straight part matters:
  looking forward is only steady if the way forward is steady, and a path that
  curls into the ring would swing the view round as it arrived.
*/
const CAMERA_FAR = 12;
const CAMERA_HIGH = 2.2;
// How far out the camera lines up with the ring, and the short straight run
// either side of it.
const CAMERA_LINE_UP = 5;
const CAMERA_LEAD = 1.5;
// How wide and how far behind it swings on the way back round.
const CAMERA_SIDE = 11;
const CAMERA_BACK = 9;

// How much scrolling the camera sits out at the start, so the shapes arrive
// with nothing else moving to compete for attention.
const CAMERA_HOLD = 0.25;

/*
  What the camera aims at, and when.

  It starts on the sign standing on the podium and rises to the column as the
  shapes gather. AimCamera eases away from it and back while the camera dives
  through the ring — see there for why.
*/
const FOCUS_START_HEIGHT = 1.9;
const FOCUS_COLUMN_HEIGHT = 3.8;
// How much scroll it takes to move its gaze from the sign up to the column.
const FOCUS_RISE_SPAN = 0.45;
/*
  The stretch of the path where the camera looks the way it is going rather
  than at the scene. It turns forward before the ring and holds that through
  the hole; the turn back afterwards is spread over more of the path, so the
  scene swings into view gently rather than snapping back.
*/
const FORWARD_FROM = 0.1;
const FORWARD_IN = 0.1;
const FORWARD_TO = 0.5;
const FORWARD_OUT = 0.35;

/*
  Where along the scroll each shape sets off, and how much further scrolling
  brings it home. The starts are close together and the spans are long, so all
  four are in the air at once rather than queuing up.
*/
const LAUNCHES = [0.02, 0.05, 0.08, 0.11];
const FLIGHT_SPAN = 0.3;

// Each shape's helix: where it begins, and how far round it travels.
const ENTRY_RADIUS = 2.8;
const ENTRY_HEIGHT = 3.2;
const ENTRY_TURNS = 1.5;

// The camera's own path is drawn in grey, beside the shapes' own colours.
const CAMERA_PATH_COLOR = 0x8d9a93;

/* ------------------------------------------------------------------------
   Helpers.
   ------------------------------------------------------------------------ */

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

/*
  Holds the camera back before it commits to closing in.

  Raising the value to a power bends the trip: the early part covers much less
  ground, so the camera hangs back while the shapes are still arriving and only
  comes close once they have gathered.
*/
function approach(t) {
  return Math.pow(Mathf.clamp01(t), 1.5);
}

/** Which way round the podium the camera is, at 0 to 1 along its path. */
function cameraAngle(at) {
  return Math.PI * 0.3 + at * Math.PI * 2;
}

/* ------------------------------------------------------------------------
   The components this step is about.
   ------------------------------------------------------------------------ */

/*
  Turns the page's scroll position into a position along a spline.

  The scene is pinned and a tall element behind it gives the page something to
  scroll, so scrolling reads as travelling rather than as moving a page.
*/
class ScrollAlongSpline extends Behaviour {
  /** The camera's walker. */
  walker = null;
  /** Higher catches up with the scrollbar sooner. */
  smoothing = 5;

  awake() {
    /** The scroll itself, 0 to 1. Everything else in the scene reads this. */
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
      The camera sits out the first stretch and takes the rest. There is no
      pause on a SplineWalker to reach for — the walker goes wherever
      position01 says, so holding still is just not changing that number yet.
    */
    const own = (this.progress - CAMERA_HOLD) / (1 - CAMERA_HOLD);
    this.walker.position01 = Mathf.clamp01(own);
  }
}

/*
  Flies a shape along its own spline, driven by the same scroll as the camera.

  The shape's walker has `autoRun` off, exactly like the camera's. What differs
  is the mapping: each shape takes only the slice of scroll between where it
  sets off and where it arrives, and those slices begin before the camera has
  moved at all. Scroll back up and a shape flies out again, because nothing
  here is a one-way animation — it is a position being read.
*/
class FlyWithScroll extends Behaviour {
  /** The shape's own walker. */
  walker = null;
  /** The ScrollAlongSpline component, which holds the scroll itself. */
  scroll = null;
  /*
    Where in the scroll this flight begins.

    Not called `start`: that is one of the lifecycle methods the engine calls
    on every component, and a field of the same name replaces the method.
  */
  beginsAt = 0;
  /** How much further scrolling completes it. */
  span = FLIGHT_SPAN;

  update() {
    const travelled = (this.scroll.progress - this.beginsAt) / this.span;
    // Eased, so the shape leaves and arrives softly rather than at one rate.
    this.walker.position01 = ease(travelled);
  }
}

/*
  Points the camera. Moving and looking are separate: the walker carries the
  camera along the path, and this decides where it faces.

  Two directions matter. One is towards the scene, which is what you want at
  either end of the trip. The other is straight along the path, which is what
  you want going through the ring — looking at a fixed point instead would
  swing the view round as the camera arrived on top of it.

  It eases from the first to the second before the ring, holds it through the
  hole, and takes far longer to ease back afterwards, so the scene swings
  into view rather than snapping to it.
*/
class AimCamera extends Behaviour {
  /** The camera's walker, for where it is along the path. */
  walker = null;
  /** The camera's spline, for which way the path is heading. */
  spline = null;
  /** The ScrollAlongSpline component, which holds the scroll itself. */
  scroll = null;

  awake() {
    this.pathAhead = new THREE.Vector3();
    this.toScene = new THREE.Vector3();
    this.aim = new THREE.Vector3();
  }

  update() {
    const at = this.walker.position01;
    const position = this.gameObject.worldPosition;

    // Towards the scene: its middle at first, the column once the shapes
    // have gathered there.
    const risen = ease(this.scroll.progress / FOCUS_RISE_SPAN);
    const height = Mathf.lerp(FOCUS_START_HEIGHT, FOCUS_COLUMN_HEIGHT, risen);
    this.toScene.set(0, height, 0).sub(position).normalize();

    /*
      And the way the path is heading. Not held in a field called `forward`:
      a component already has one of those. `right`, `up`, `name` and `scene`
      are taken as well, and a field quietly replaces the one it shadows.
    */
    this.spline.getTangentAt(at, this.pathAhead);
    this.pathAhead.normalize();

    // Forward well before the ring, still forward through it, and only then
    // easing back — over twice the distance it took to turn away.
    const turningForward = ease((at - FORWARD_FROM) / FORWARD_IN);
    const turningBack = ease((FORWARD_TO + FORWARD_OUT - at) / FORWARD_OUT);
    const lookAhead = Math.min(turningForward, turningBack);

    this.aim.copy(this.toScene).lerp(this.pathAhead, lookAhead).normalize();
    this.gameObject.lookAt(this.aim.add(position));
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

onStart(context => {
  buildStage(context);

  /*
    A spline is a list of knots with a smooth curve through them. Knot
    positions are local to the object the SplineContainer sits on.
  */
  const path = new THREE.Object3D();
  context.scene.add(path);
  const spline = path.addComponent(SplineContainer);

  /*
    In along the ring's axis, through the hole, out the far side, then a wide
    curve back to where it began.

    The four middle knots share an x and a y, which is what makes that stretch
    a straight line: a curve is only as straight as the points it is drawn
    through. It matters because the camera looks the way it is going here, and
    a path that curled into the ring would swing the view round as it arrived.
  */
  const gate = restHeight(RING_INDEX);
  const knots = [
    [0, CAMERA_HIGH, CAMERA_FAR],
    [0, gate, CAMERA_LINE_UP],
    [0, gate, CAMERA_LEAD],
    [0, gate, -CAMERA_LEAD],
    [0, gate, -CAMERA_LINE_UP],
    [-CAMERA_SIDE, gate - 0.6, -CAMERA_BACK],
    [-CAMERA_SIDE * 1.1, CAMERA_HIGH + 1, CAMERA_BACK * 0.35],
  ];
  knots.forEach(([x, y, z]) => spline.addKnot({ position: new THREE.Vector3(x, y, z) }));

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
    /*
      Off. Moving and looking are separate here: the walker carries the camera
      along the path, and AimCamera below decides where it faces. Leaving this
      on would have both of them setting the rotation every frame, and the
      camera would jitter between the two.
    */
    useLookAt: false,
  });

  const scroll = context.scene.addComponent(ScrollAlongSpline, { walker });
  context.scene.addComponent(ScrollHint, { scroll });
  context.mainCamera.addComponent(AimCamera, { walker, spline, scroll });

  const pathView = context.scene.addComponent(ShowPath);
  pathView.add(spline, CAMERA_PATH_COLOR);

  /*
    Every shape is here from the start, waiting at the head of its own path.
    Each flies in along a spline driven by the same scroll — so the whole
    scene, camera and cargo alike, is one position read from the scrollbar.

    Nothing is spawned along the way. A shape that appears out of nothing has
    to be explained; four already in the air explain themselves, and the reader
    can see where each of them is headed before moving at all.
  */
  LAUNCHES.forEach((at, index) => {
    const flight = flyInShape(context, index);
    flight.shape.addComponent(FlyWithScroll, {
      walker: flight.walker,
      scroll,
      beginsAt: at,
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
   Below here is the set: the shapes, the sign, and the stage they hang over.
   Nothing below is specific to splines.
   ------------------------------------------------------------------------ */

/*
  The four shapes, in the order they stack up.

  `half` is how far each reaches from its middle, which is what spaces the
  column: give one a different size and its neighbours move to make room.

  The ring is third because that is the height the camera passes through, and
  a TorusGeometry lies in the XY plane — so its hole already faces along Z,
  square to the camera coming in.
*/
const SHAPES = [
  { color: '#6aa9e8', half: 0.35, geometry: () => new THREE.BoxGeometry(0.7, 0.7, 0.7) },
  { color: '#f2c14e', half: 0.42, geometry: () => new THREE.IcosahedronGeometry(0.42, 0) },
  { color: '#e8536d', half: 0.76, geometry: () => new THREE.TorusGeometry(0.62, 0.14, 16, 40) },
  { color: '#7dd3a0', half: 0.35, geometry: () => new THREE.ConeGeometry(0.42, 0.7, 6) },
];

/** Which shape the camera flies through. */
const RING_INDEX = 2;

/** Where shape `index` comes to rest, stacked clear of the one below it. */
function restHeight(index) {
  let height = HOVER_BASE + SHAPES[0].half;
  for (let i = 1; i <= index; i++) {
    height += SHAPES[i - 1].half + HOVER_CLEAR + SHAPES[i].half;
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

  /*
    The four set off from four directions, a quarter turn apart, so their paths
    stay clear of one another and the group reads as four things rather than
    one clump.
  */
  const entry = cameraAngle(LAUNCHES[1]) + Math.PI + index * (Math.PI / 2);

  /*
    A helix: one and a half turns around the podium while the radius closes to
    nothing and the shape climbs into its place in the column.

    Knots are what makes this possible. Rather than describing the curve, you
    place points along it and let the spline smooth them out — so a shape of
    motion that would be awkward to animate by hand is a short loop here.
  */
  const RISE = 16;
  const rest = restHeight(index);
  for (let k = 0; k <= RISE; k++) {
    const t = k / RISE;
    const angle = entry + t * Math.PI * 2 * ENTRY_TURNS;
    // Closing to 0 lands it on the column's axis, whatever angle it ends on.
    const radius = Mathf.lerp(ENTRY_RADIUS, 0, t);
    spline.addKnot({
      position: new THREE.Vector3(
        Math.cos(angle) * radius,
        Mathf.lerp(ENTRY_HEIGHT, rest, t),
        Math.sin(angle) * radius
      ),
    });
  }

  const walker = shape.addComponent(SplineWalker, {
    spline,
    // Off, the same as the camera's: the scroll drives this one too, through
    // the FlyWithScroll component the caller adds.
    autoRun: false,
    // Stops at the ends rather than looping back to the start.
    clamp: true,
    /*
      Off, so a shape keeps its upright orientation instead of tipping to face
      the way it is going. It matters most for the ring: turned edge-on there
      would be no hole left to fly through.
    */
    useLookAt: false,
  });

  return { shape, spline, walker, color: kind.color };
}

/*
  A sign in the scene telling the reader what to do, which goes away once they
  have done it.

  ObjectUtils.createText builds 3D text from a font. The font is fetched in the
  background, so the mesh comes back before its geometry exists — onGeometry
  runs once it is there, which is the point at which the size is known.
*/
class ScrollHint extends Behaviour {
  /** The ScrollAlongSpline component, so the sign knows when to go. */
  scroll = null;

  awake() {
    this.label = ObjectUtils.createText('Scroll', {
      parent: this.gameObject,
      color: '#5d6b63',
      // Extruded far enough to read as a solid object rather than a decal.
      depth: 0.25,
      // Standing on top of the podium. See onGeometry for what makes the
      // position mean "where it stands" rather than "its middle".
      position: [0, PODIUM_HEIGHT, 0],
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
    A sun, so the shapes read as hanging over the podium rather than pasted on
    the background. Its shadow camera has to cover the area they travel
    through, or their shadows are clipped where it ends.
  */
  const sun = new THREE.DirectionalLight('#fff6e8', 0.9);
  sun.position.set(4, 8, 3);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.near = 1;
  sun.shadow.camera.far = 30;
  sun.shadow.camera.left = -9;
  sun.shadow.camera.right = 9;
  sun.shadow.camera.top = 9;
  sun.shadow.camera.bottom = -9;
  sun.shadow.bias = -0.0006;
  context.scene.add(sun);

  return { podium, floor };
}
