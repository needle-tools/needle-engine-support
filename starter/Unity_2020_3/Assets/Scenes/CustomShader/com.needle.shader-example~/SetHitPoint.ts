import { Material } from "three";
import { Behaviour } from "needle.tiny.engine/engine-components/Component";
import { serializeable } from "needle.tiny.engine/engine/engine_serialization_decorator";
import { CustomShader } from "needle.tiny.engine/engine/extensions/KHR_techniques_webgl";


export class SetHitPoint extends Behaviour {

    // for codegen we can define the unity type like this:
    // @type(UnityEngine.Material)
    @serializeable(CustomShader)
    material: CustomShader;

    update() {
        const uniforms = this.material?.uniforms;
        if (!uniforms) return;
        const uniform = uniforms["_HitPoint"];
        if (!uniform) return;
        const hits = this.context.physics.raycast();
        if (!hits?.length) return;
        for (const hit of hits) {
            uniform.value = hit.point;
            this.material.uniformsNeedUpdate = true;
            break;
        }
    }
}  