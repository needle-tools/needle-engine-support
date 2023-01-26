import { Behaviour, serializable, AssetReference } from "@needle-tools/engine";

export class LoadingScenes extends Behaviour {
    // tell the component compiler that we want to reference an array of SceneAssets
    // @type UnityEditor.SceneAsset[]
    @serializable(AssetReference)
    myScenes?: AssetReference[];

    async start() {
        if (!this.myScenes) {
            return;
        }
        for (const scene of this.myScenes) {
            // load the scene once
            const myScene = await scene.loadAssetAsync();
            // add it to the threejs scene
            this.gameObject.add(myScene);
        }
    }
} 