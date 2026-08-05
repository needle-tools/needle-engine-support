import { Behaviour, onStart, Gizmos, OrbitControls, ObjectUtils, getBoundingBox } from '@needle-tools/engine';
import * as THREE from 'three';
import { configureDemoScene } from './walkthrough-base.js';

configureDemoScene({ showGrid: true });

// The orbit spans twice this, so the whole scene fits in about 2×2.
const RADIUS = 1;

class Orbit extends Behaviour {
  radius = RADIUS;
  speed = 0.8;

  update() {
    const t = this.context.time.time * this.speed;
    this.gameObject.position.x = Math.cos(t) * this.radius;
    this.gameObject.position.z = Math.sin(t) * this.radius;
  }
}

// Call a Gizmos method and it draws where you tell it to. Each call lasts one
// frame, which is why these run in update.
class ShowWhatItIsDoing extends Behaviour {
  radius = RADIUS;

  _lastPosition = new THREE.Vector3();

  start() {
    this._lastPosition = this.gameObject.worldPosition.clone();
  }

  update() {
    const position = this.gameObject.worldPosition;
    const direction = position.clone().sub(this._lastPosition).normalize();

    // The path being followed.
    Gizmos.DrawCircle(new THREE.Vector3(), new THREE.Vector3(0, 1, 0), this.radius, 0x9aa8a0);

    // Where the object is, and where it is heading.
    Gizmos.DrawWireSphere(position, 0.22, 0xf2c14e);
    Gizmos.DrawLine(new THREE.Vector3(), position, 0x6aa9e8);
    Gizmos.DrawArrow(position, position.clone().addScaledVector(direction, 0.5), 0x0000ff);

    // Values you would otherwise print to the console, shown in place.
    Gizmos.DrawLabel(
      position.clone().add(new THREE.Vector3(0, 0.4, 0)),
      `Time: ${this.context.time.time.toFixed(1)}, x ${position.x.toFixed(1)}  z ${position.z.toFixed(1)}`,
      0.08
    );

    this._lastPosition.copy(position);
  }
}

class SceneBoundsOnClick extends Behaviour {

  onPointerClick() {
    const bounds = getBoundingBox(this.context.scene);
    Gizmos.DrawWireBox3(bounds, 0x55ff00, 1, true);
    this.context.time.timeScale = 5;
    setTimeout(()=> {
      this.context.time.timeScale = 1;
    }, 1000);
  }

}

onStart(async context => {
  const marker = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.18, 0),
    new THREE.MeshStandardMaterial({ color: '#7dd3a0', roughness: 0.4, flatShading: true })
  );
  marker.position.y = 1;
  context.scene.add(marker);

  marker.addComponent(Orbit);
  marker.addComponent(ShowWhatItIsDoing);

  const cylinder = ObjectUtils.createPrimitive("Cylinder", { parent: context.scene, scale: [1, .1, 1] });
  cylinder.addComponent(SceneBoundsOnClick);

  context.mainCamera.position.z = 9;
});
