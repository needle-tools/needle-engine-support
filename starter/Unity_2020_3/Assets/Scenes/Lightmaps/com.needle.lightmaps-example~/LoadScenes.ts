import { Behaviour, InstantiateOptions } from "needle.tiny.engine/engine-components/Component";
import { AssetReference } from "needle.tiny.engine/engine/engine_addressables";
import { InstantiateIdProvider } from "needle.tiny.engine/engine/engine_networking_instantiate";
import { serializeable } from "needle.tiny.engine/engine/engine_serialization_decorator";

export class LoadScenes extends Behaviour {
    //@type(UnityEditor.SceneAsset[])
    @serializeable(AssetReference)
    scenes?: AssetReference[];

    async start() {

        if (!this.scenes) return;
        let index = 0;
        for (const scene of this.scenes) { 

            const i = await scene.instantiate(this.gameObject);
            if (i) {
                i.position.x = (index++) * 2;
            }

        }

    }
}