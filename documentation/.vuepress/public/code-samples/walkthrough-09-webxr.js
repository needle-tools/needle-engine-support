import { Behaviour, onStart, WebXR } from '@needle-tools/engine';
import * as THREE from 'three';
import { configureDemoScene } from './walkthrough-base.js';

configureDemoScene({ showGrid: false });

class Spin extends Behaviour {
  update() {
    this.gameObject.rotation.y += 0.4 * this.context.time.deltaTime;
  }
}

onStart(context => {
  const shape = new THREE.Mesh(
    new THREE.TorusKnotGeometry(0.7, 0.25, 128, 24),
    new THREE.MeshStandardMaterial({ color: '#7dd3a0', roughness: 0.8, metalness: 0 })
  );
  context.scene.add(shape);
  shape.addComponent(Spin);

  // That's the whole XR setup. The component adds the buttons, handles the
  // session, and provides controllers and hand tracking in VR.
  context.scene.addComponent(WebXR, {
    createVRButton: true,
    createARButton: true,
    // Movement and teleport in VR, without writing any of it.
    useDefaultControls: true,
    // On a desktop, show a QR code so the page can be opened on a phone.
    createQRCode: true,
    // In AR the scene is placed at real-world scale. This shape is about
    // 2 metres across, so shrink it to something that fits on a table.
    // Higher values make the scene appear smaller.
    arScale: 8,
  });
});
