import { Behaviour, serializable, AssetReference } from "@needle-tools/engine";

export class LoadingScenes extends Behaviour {
    // tell the component compiler that we want to reference an array of SceneAssets
    // @type UnityEditor.SceneAsset[]
    @serializable(AssetReference)
    myScenes?: AssetReference[];

    async awake() {
        if (!this.myScenes) {
            return;
        }
        for (const scene of this.myScenes) {
            // check if it is assigned in unity
            if(!scene) continue;
            // load the scene once
            const myScene = await scene.loadAssetAsync();
            // add it to the threejs scene
            this.gameObject.add(myScene);
            
            // of course you can always just load one at a time
            // and remove it from the scene when you want
            // myScene.removeFromParent();
            // this is the same as scene.asset.removeFromParent()
        }
    }

    onDestroy(): void {
        if (!this.myScenes) return;
        for (const scene of this.myScenes) {
            scene?.unload();
        }
    }
} 