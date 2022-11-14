import { Material } from "three";
import { Behaviour, GameObject } from "@needle-tools/engine/engine-components/Component";
import { serializable } from "@needle-tools/engine/engine/engine_serialization_decorator";
import { CustomShader } from "@needle-tools/engine/engine/extensions/KHR_techniques_webgl";
import { Renderer } from "@needle-tools/engine/engine-components/Renderer";
import { RaycastOptions } from "@needle-tools/engine/engine/engine_physics";


export class SetHitPoint extends Behaviour {

    // for codegen we can define the unity type like this:
    // @serializable(CustomShader)
    // @type UnityEngine.Material
    material: CustomShader; 

    private _renderers = new Array<Renderer>();
    
    start(){
        this._renderers = GameObject.getComponentsInChildren(this.gameObject, Renderer);
    }

    update() {
        const opts = new RaycastOptions();
        opts.setMask(0xffffff);
        const hits = this.context.physics.raycast(opts);
        if (!hits?.length) return;
        for (const hit of hits) {
            for(const rend of this._renderers){
                const mat = rend.material;
                if(mat && mat["uniforms"]){
                    const uniform = mat["uniforms"]["_HitPoint"];
                    uniform.value = hit.point;
                    mat["uniformsNeedUpdate"] = true;
                }
            }
            break;
        }
    }
}

export class RandomTimeOffset extends Behaviour {
    start() {
        const renderers = GameObject.getComponentsInChildren(this.gameObject, Renderer);
        for (const rend of renderers) {
            if("uniforms" in rend.material){
                // we need to copy the material to set individual values per instance
                const clone = rend.material.clone();
                const uniforms = clone["uniforms"];
                if (!uniforms) continue;
                const uniform = uniforms["_TimeOffset"];
                if (!uniform) continue;
                uniform.value = Math.random();
                clone["uniformsNeedUpdate"] = true;
                rend.material = clone;
            }
        }
    }
}