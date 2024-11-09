import { EffectProviderResult, PostProcessingEffect, registerCustomEffectType, serializable } from "@needle-tools/engine";
import { OutlineEffect } from "postprocessing";
import { Object3D } from "three";

export class OutlinePostEffect extends PostProcessingEffect {

    // the outline effect takes a list of objects to outline
    @serializable(Object3D)
    selection!: Object3D[];

    // this is just an example method that you could call to update the outline effect selection
    updateSelection() {
        if (this._outlineEffect) {
            this._outlineEffect.selection.clear();
            for (const obj of this.selection) {
                this._outlineEffect.selection.add(obj);
            }
        }
    }


    // a unique name is required for custom effects
    get typeName(): string {
        return "Outline";
    }

    private _outlineEffect: void | undefined | OutlineEffect;

    // method that creates the effect once
    onCreateEffect(): EffectProviderResult | undefined {

        const outlineEffect = new OutlineEffect(this.context.scene, this.context.mainCamera!);
        this._outlineEffect = outlineEffect;
        outlineEffect.edgeStrength = 10;
        outlineEffect.visibleEdgeColor.set(0xff0000);
        for (const obj of this.selection) {
            outlineEffect.selection.add(obj);
        }

        return outlineEffect;
    }
}
// You need to register your effect type with the engine
registerCustomEffectType("Outline", OutlinePostEffect);