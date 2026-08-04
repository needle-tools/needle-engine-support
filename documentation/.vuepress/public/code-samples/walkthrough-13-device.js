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

configureDemoScene({ showGrid: false });

class Spin extends Behaviour {
  update() {
    this.gameObject.rotation.y += 0.5 * this.context.time.deltaTime;
  }
}

// Draws which branch was taken, so you can see the result of the check.
class ShowDetectedDevice extends Behaviour {
  update() {
    if(DeviceUtilities.isMobileDevice()) {
      Gizmos.DrawLabel(new THREE.Vector3(0, 1.4, 0), 'Mobile device detected', 0.09);
    }
    else {
      Gizmos.DrawLabel(new THREE.Vector3(0, 1.4, 0), 'Desktop device detected. Open on a phone to see the other branch.', 0.09);
    }
  }
}

onStart(context => {

  context.menu.showQRCodeButton("desktop-only");
  context.scene.addComponent(WebXR);

  // Check the device once and build accordingly. Phones have less to spend
  // on geometry than a desktop, so the sphere gets fewer segments.
  const segments = DeviceUtilities.isMobileDevice() ? 12 : 24;

  const shape = new THREE.Mesh(
    new THREE.SphereGeometry(0.8, segments, segments),
    new THREE.MeshStandardMaterial({ color: DeviceUtilities.isMobileDevice() ? '#7dd3a0' : '#6aa9e8', roughness: 0.4, flatShading: true })
  );
  context.scene.add(shape);
  shape.addComponent(Spin);
  shape.addComponent(ShowDetectedDevice);

  // XRFlag hides an object outside the modes you list. This one is only
  // visible in AR, so it stays hidden here in the browser.
  const arOnly = new THREE.Mesh(
    new THREE.BoxGeometry(0.4, 0.4, 0.4),
    new THREE.MeshStandardMaterial({ color: '#f2c14e' })
  );
  arOnly.position.set(1.4, 0, 0);
  context.scene.add(arOnly);
  arOnly.addComponent(XRFlag, { visibleIn: XRStateFlag.AR });

  // Combine modes with `|`. This one shows in AR and in VR, but not here.
  const xrOnly = new THREE.Mesh(
    new THREE.BoxGeometry(0.4, 0.4, 0.4),
    new THREE.MeshStandardMaterial({ color: '#6aa9e8' })
  );
  xrOnly.position.set(-1.4, 0, 0);
  context.scene.add(xrOnly);
  xrOnly.addComponent(XRFlag, { visibleIn: XRStateFlag.AR | XRStateFlag.VR });
});
