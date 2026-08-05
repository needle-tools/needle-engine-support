import {
  Behaviour,
  onStart,
  Gizmos,
  DeviceUtilities,
  XRFlag,
  XRStateFlag,
  WebXR,
} from '@needle-tools/engine';
import * as THREE from 'three';
import { configureDemoScene } from './walkthrough-base.js';

configureDemoScene({ showGrid: false, useContactShadows: true });

const material = (color, roughness = 0.5) =>
  new THREE.MeshStandardMaterial({ color, roughness });


// Draws which branch was taken, so you can see the result of the check.
class ShowDetectedDevice extends Behaviour {
  update() {
    const label = DeviceUtilities.isMobileDevice()
      ? 'Mobile detected'
      : 'Desktop detected — open this on a phone to see the other branch';
    Gizmos.DrawLabel(new THREE.Vector3(0, 0.62, 0), label, 0.03);
  }
}

// A CRT monitor, roughly 40cm across. Sizes are in metres throughout,
// because AR places a scene at real-world scale.
function buildMonitor() {
  const monitor = new THREE.Group();
  const beige = material('#d6cfbc', 0.6);

  // A 4-sided cylinder is a tapered box: wide at the front, narrow at the
  // back, which is what gives a CRT its shape.
  const casing = new THREE.Mesh(
    new THREE.CylinderGeometry(0.28, 0.22, 0.34, 4),
    beige
  );
  casing.rotation.set(Math.PI / 2, Math.PI / 4, 0);
  casing.position.y = 0.26;
  monitor.add(casing);

  const glass = new THREE.Mesh(
    new THREE.BoxGeometry(0.28, 0.22, 0.01),
    material('#1b2b24', 0.25)
  );
  glass.position.set(0, 0.26, 0.171);
  monitor.add(glass);

  const stand = new THREE.Mesh(
    new THREE.CylinderGeometry(0.09, 0.13, 0.09, 20),
    beige
  );
  stand.position.y = 0.045;
  monitor.add(stand);

  return monitor;
}

// A candybar phone, roughly 4.5 x 13cm. Standing up so you can see it.
function buildPhone() {
  const phone = new THREE.Group();

  const shell = material('#3b4a53', 0.45);

  const body = new THREE.Mesh(new THREE.BoxGeometry(0.048, 0.13, 0.018), shell);
  body.position.y = 0.065;
  phone.add(body);

  const screen = new THREE.Mesh(
    new THREE.BoxGeometry(0.034, 0.026, 0.002),
    material('#9fc98a', 0.3)
  );
  screen.position.set(0, 0.035, 0.009);
  body.add(screen);

  // Keypad: three columns, four rows.
  const keyGeometry = new THREE.BoxGeometry(0.011, 0.006, 0.002);
  const keyMaterial = material('#8d9aa3', 0.4);
  for (let row = 0; row < 4; row++) {
    for (let column = 0; column < 3; column++) {
      const key = new THREE.Mesh(keyGeometry, keyMaterial);
      key.position.set((column - 1) * 0.014, -0.005 - row * 0.009, 0.009);
      body.add(key);
    }
  }

  // The stubby aerial every phone had.
  const aerial = new THREE.Mesh(
    new THREE.CylinderGeometry(0.002, 0.003, 0.018, 8),
    shell
  );
  aerial.position.set(0.018, 0.074, -0.004);
  body.add(aerial);

  return phone;
}

onStart(context => {
  context.menu.showQRCodeButton('desktop-only');
  context.scene.addComponent(WebXR);

  // Check the device once, then build for it. A phone and a desktop want
  // different things on screen, not just different detail levels.
  const device = DeviceUtilities.isMobileDevice() ? buildPhone() : buildMonitor();
  device.rotateY(Math.PI / 2 * .3);
  context.scene.add(device);
  device.addComponent(ShowDetectedDevice);

  // XRFlag hides an object outside the modes you list. This one is only
  // visible in AR, so it stays hidden here in the browser.
  const arOnly = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.1), material('#f2c14e'));
  arOnly.position.set(0.4, 0.05, 0);
  context.scene.add(arOnly);
  arOnly.addComponent(XRFlag, { visibleIn: XRStateFlag.AR });

  // Combine modes with `|`. This one shows in AR and in VR, but not here.
  const xrOnly = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.1), material('#6aa9e8'));
  xrOnly.position.set(-0.4, 0.05, 0);
  context.scene.add(xrOnly);
  xrOnly.addComponent(XRFlag, { visibleIn: XRStateFlag.AR | XRStateFlag.VR });
});
