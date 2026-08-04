import { onStart, CursorFollow, LookAt, Behaviour, Mathf } from '@needle-tools/engine';
import * as THREE from 'three';
import { configureDemoScene } from './walkthrough-base.js';

configureDemoScene({ showGrid: false, orbitZoom: false, useContactShadows: true });

const material = (color, roughness = 0.4) =>
  new THREE.MeshStandardMaterial({ color, roughness });

// An empty object that trails the pointer. Nothing is drawn for it — it
// exists so other objects have something to aim at. `damping` is how far
// behind it lags, in seconds.
function cursorTarget(context, damping) {
  const target = new THREE.Object3D();
  target.worldPosition = context.mainCamera.worldPosition;
  target.worldPosition = target.worldPosition.multiplyScalar(1.1);
  context.scene.add(target);
  target.addComponent(CursorFollow, { damping });
  return target;
}

onStart(context => {
  // Two targets at different speeds: the head swings round slowly, the
  // eyes flick across almost instantly.
  const slow = cursorTarget(context, 0.1);
  const quick = cursorTarget(context, 0.05);

  const head = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 24), material('#7dd3a0'));
  head.position.y = 1.5;
  context.scene.add(head);
  head.addComponent(LookAt, { target: slow, keepUpDirection: false });

  const blink = head.addComponent(Blink);

  // Creating the eyes and pupils in a loop
  for (const side of [-1, 1]) {
    const eye = new THREE.Mesh(
      new THREE.SphereGeometry(0.26, 24, 18),
      material('#ffffff', 0.2)
    );
    eye.position.set(side * 0.34, 0.16, 0.86);
    head.add(eye);

    const pupil = new THREE.Mesh(
      new THREE.SphereGeometry(0.12, 16, 12),
      material('#14201a', 0.3)
    );
    pupil.position.z = 0.19;
    eye.add(pupil);

    // Each eye aims independently of the head. The pupil is a child of the
    // eye, so it comes along without any logic of its own.
    eye.addComponent(LookAt, { target: quick, keepUpDirection: false });
    blink.objects.push(eye); 
  }
});


class Blink extends Behaviour {

  objects = new Array();

  _hidden = false;
  _nextShowTime = 0;

  update() {

    if(this._hidden && this.context.time.time > this._nextShowTime) {
      this.objects.forEach(o => o.visible = true);
      this._hidden = false;
    }
    else if(Math.random() > 0.99) {
      this.objects.forEach(o => o.visible = false);
      this._hidden = true;
      this._nextShowTime = this.context.time.time + Mathf.random(0.1, 0.3); // blink duration
    }
  }
}