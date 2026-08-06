import { Behaviour, onStart, AudioSource, getOrAddComponent } from '@needle-tools/engine';
import * as THREE from 'three';
import { configureDemoScene } from './walkthrough-base.js';

// The radio is only 30cm across, so it needs closer limits than the default.
configureDemoScene({ showGrid: false, useContactShadows: true, minZoom: 0.2, maxZoom: 5 });

// Real-world sizes, in metres — a portable radio is about 30cm across.
// Worth getting right: in AR the scene is placed at life size.
const RADIO = { width: 0.3, height: 0.18, depth: 0.09, radius: 0.02 };
const SCREEN = { width: 0.14, height: 0.07, padding: 0.008 };

// The front face of the case, where the screen and buttons sit.
const FRONT = RADIO.depth / 2;

const BAR_COUNT = 9;
const BAR_MIN = 0.004;
const BAR_MAX = SCREEN.height - SCREEN.padding * 2;
// Bars stand on the bottom edge of the screen, inside the padding.
const BAR_FLOOR = -SCREEN.height / 2 + SCREEN.padding;

// One AudioSource, however many clips you give it.
class Radio extends Behaviour {
  // A plain field, so it can be overridden per instance through
  // addComponent — but a default here means it works without that.
  tracks = [
    './audio/marcel-elzach.ogg',
    './audio/tribal.ogg',
    './audio/beach.ogg',
    './audio/disney.ogg',
  ];
  _currentTrack = 0;

  awake() {
    // The radio brings its own AudioSource, so adding Radio is enough.
    // getOrAddComponent reuses one if the object already has it, which
    // keeps this safe if somebody adds their own.
    this.audio = getOrAddComponent(this.gameObject, AudioSource, {
      playOnAwake: false,
      preload: true,
      loop: true,
      // 1 is positional: the sound comes from the radio and fades with distance.
      spatialBlend: 1,
      minDistance: 1, 
      maxDistance: 10,
    });
  }

  // play() takes a clip, so switching track is a single call.
  play() {
    this.audio.play(this.tracks[this._currentTrack]);
  }

  // One button for both, the way a real play button behaves.
  toggle() {
    if (this.audio.isPlaying) this.audio.pause();
    else this.play();
  }

  next() {
    this._currentTrack = (this._currentTrack + 1) % this.tracks.length;
    this.play();
  }

  previous() {
    this._currentTrack = (this._currentTrack + this.tracks.length - 1) % this.tracks.length;
    this.play();
  }
}

// A button in the scene. Clicking calls the named method on the radio.
class Button extends Behaviour {
  action = 'toggle';

  awake() {
    this.radio = this.gameObject.parent.getComponent(Radio);
    this.restZ = this.gameObject.position.z;
  }

  onPointerEnter() {
    this.context.input.setCursor('pointer');
  }

  onPointerExit() {
    this.context.input.unsetCursor('pointer');
    // Release it if the pointer leaves while still held.
    this.gameObject.position.z = this.restZ;
  }

  onPointerDown() {
    // The buttons sit on the front face, so pressing pushes along -Z,
    // into the case rather than down across it.
    this.gameObject.position.z = this.restZ - 0.004;
  }

  onPointerUp() {
    this.gameObject.position.z = this.restZ;
  }

  onPointerClick() {
    this.radio[this.action]();
  }
}

// Bars driven by the audio itself, read through the Web Audio API.
class Visualiser extends Behaviour {
  bars = [];

  start() {
    // start() runs after every awake, so the Radio has added its
    // AudioSource by now.
    this.audio = this.gameObject.getComponent(AudioSource);
  }

  // The analyser can only be built once the audio exists, which happens on
  // the first play. Returns null until then.
  getFrequencies() {
    if (!this.analyser) {
      const sound = this.audio.Sound;
      const context = this.audio.audioContext;
      if (!sound || !context) return null;

      this.analyser = context.createAnalyser();
      // 32 bins is plenty for nine bars, and cheap.
      this.analyser.fftSize = 64;
      sound.getOutput().connect(this.analyser);
      this.frequencies = new Uint8Array(this.analyser.frequencyBinCount);
    }

    this.analyser.getByteFrequencyData(this.frequencies);
    return this.frequencies;
  }

  update() {
    const frequencies = this.audio.isPlaying ? this.getFrequencies() : null;

    this.bars.forEach((bar, i) => {
      // Skip the lowest bins: they hold most of the energy and would leave
      // the other bars barely moving.
      const level = frequencies ? frequencies[i + 2] / 255 : 0;
      const target = BAR_MIN + level * (BAR_MAX - BAR_MIN);

      // Ease towards the target so the bars settle instead of snapping.
      bar.scale.y += (target - bar.scale.y) * this.context.time.deltaTime * 12;
      // The bar is 1 unit tall, so scale.y is its height. Offset by half of
      // that to keep its base on the floor as it grows.
      bar.position.y = BAR_FLOOR + bar.scale.y / 2;
    });
  }
}

// A rounded box, built by extruding a rounded rectangle.
function roundedBox(width, height, depth, radius, material) {
  const shape = new THREE.Shape();
  const w = width / 2 - radius;
  const h = height / 2 - radius;
  shape.absarc(-w, -h, radius, Math.PI, Math.PI * 1.5);
  shape.absarc(w, -h, radius, Math.PI * 1.5, 0);
  shape.absarc(w, h, radius, 0, Math.PI * 0.5);
  shape.absarc(-w, h, radius, Math.PI * 0.5, Math.PI);

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: depth - radius * 2,
    bevelEnabled: true,
    bevelSize: radius,
    bevelThickness: radius,
    bevelSegments: 6,
    curveSegments: 12,
  });
  geometry.center();
  return new THREE.Mesh(geometry, material);
}

onStart(context => {
  const body = roundedBox(
    RADIO.width, RADIO.height, RADIO.depth, RADIO.radius,
    new THREE.MeshStandardMaterial({ color: '#7dd3a0', roughness: 0.45 })
  );
  // Half its height, so the case stands on the ground instead of through it.
  body.position.y = RADIO.height / 2;
  context.scene.add(body);
  body.addComponent(Radio);

  // Antenna: a thin rod leaning off the top corner, with a tip on the end.
  const antenna = new THREE.Mesh(
    new THREE.CylinderGeometry(0.002, 0.003, 0.16, 10),
    new THREE.MeshStandardMaterial({ color: '#5c6b63', roughness: 0.3, metalness: 0.7 })
  );
  antenna.position.set(RADIO.width / 2 - 0.02, RADIO.height / 2 + 0.06, -0.015);
  antenna.rotation.z = -0.28;
  body.add(antenna);

  const tip = new THREE.Mesh(
    new THREE.SphereGeometry(0.006, 16, 12),
    new THREE.MeshStandardMaterial({ color: '#f2c14e', roughness: 0.3, metalness: 0.5 })
  );
  tip.position.y = 0.085;
  antenna.add(tip);

  // Screen, with bars standing on it.
  const screen = roundedBox(
    SCREEN.width, SCREEN.height, 0.012, 0.007,
    new THREE.MeshStandardMaterial({ color: '#1b2b24', roughness: 0.9 })
  );
  screen.position.set(-0.065, 0.035, FRONT);
  body.add(screen);

  const visualiser = body.addComponent(Visualiser);
  // 1 unit tall, so scale.y is the bar's height in world units.
  const barGeometry = new THREE.BoxGeometry(0.008, 1, 0.006);
  const barStep = (SCREEN.width - SCREEN.padding * 2) / (BAR_COUNT - 1);
  const barMaterial = new THREE.MeshStandardMaterial({
    color: '#7dd3a0',
    emissive: '#2f6b52',
  });

  for (let i = 0; i < BAR_COUNT; i++) {
    const bar = new THREE.Mesh(barGeometry, barMaterial);
    bar.position.set((i - (BAR_COUNT - 1) / 2) * barStep, BAR_FLOOR, 0.007);
    bar.scale.y = BAR_MIN;
    screen.add(bar);
    visualiser.bars.push(bar);
  }

  // Three buttons along the front of the case. Play doubles as pause.
  const buttons = [
    { action: 'previous', color: '#8d9a93' },
    { action: 'toggle', color: '#f2c14e' },
    { action: 'next', color: '#8d9a93' },
  ];

  buttons.forEach((entry, i) => {
    const button = roundedBox(
      0.032, 0.02, 0.014, 0.006,
      new THREE.MeshStandardMaterial({ color: entry.color, roughness: 0.35 })
    );
    // Centre the row: 32mm wide with a 13mm gap between them.
    button.position.set((i - (buttons.length - 1) / 2) * 0.045, -0.055, FRONT);
    body.add(button);

    button.addComponent(Button, { action: entry.action });
  });
});
