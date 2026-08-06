import { Behaviour, onStart, loadAsset, OrbitControls } from '@needle-tools/engine';
import { configureDemoScene } from './walkthrough-base.js';

// A large model, so allow the camera much further out than the default.
configureDemoScene({ showGrid: false, maxZoom: 200 });

const URL = 'https://cloud.needle.tools/-/assets/Z23hmXBZ21QnG-world/file';

onStart(async context => {
  // One line to fetch and parse the file. It is not in the scene yet.
  const asset = await loadAsset(URL);
  
  if(asset) {
    context.scene.add(asset.scene);
  }

  const orbit = context.mainCamera.getComponent(OrbitControls);
  orbit?.fitCamera();
});
