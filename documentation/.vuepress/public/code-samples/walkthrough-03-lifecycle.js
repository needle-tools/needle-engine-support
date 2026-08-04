import { Behaviour, onStart, destroy } from '@needle-tools/engine';
import * as THREE from 'three';

// Open the browser console to see the order these run in.
class Beacon extends Behaviour {
  awake() {
    console.log('awake — runs once, right after addComponent');
  }

  onEnable() {
    console.log('onEnable — the component switched on');
  }

  onDisable() {
    console.log('onDisable — the component switched off');
  }

  start() {
    console.log('start — runs once, before the first update');
  }

  update() {
    // Only runs while the component is enabled. Disable it and the cone
    // stops turning — nothing else about the object changes.
    this.gameObject.rotation.y += 0.9 * this.context.time.deltaTime;
  }

  onDestroy() {
    console.log('onDestroy — the component is gone');
  }
}

onStart(context => {
  const beacon = new THREE.Mesh(
    new THREE.ConeGeometry(0.8, 1.6, 4),
    new THREE.MeshStandardMaterial({
      color: '#7dd3a0',
      roughness: 0.35,
      flatShading: true,
    })
  );
  context.scene.add(beacon);

  const component = beacon.addComponent(Beacon);

  // The buttons live on the docs page around this scene and send their name in.
  window.addEventListener('message', event => {
    // Switch off this one component. Others on the object keep running.
    if (event.data === 'disable') component.enabled = false;
    if (event.data === 'enable') component.enabled = true;

    // Switch off the whole object — every component on it and on its
    // children stops too, and onDisable fires on each of them.
    if (event.data === 'hide') beacon.visible = false;
    if (event.data === 'show') beacon.visible = true;

    if (event.data === 'destroy') destroy(component);
  });
});
