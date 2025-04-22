import { Behaviour, UsdzBehaviour, BehaviorModel, TriggerBuilder, ActionBuilder, BehaviorExtension, USDObject, USDZExporterContext } from "@needle-tools/engine";

export class HideOnStart extends Behaviour implements UsdzBehaviour {

    start() {
        this.gameObject.visible = false;
    }

    createBehaviours(ext: BehaviorExtension, model: USDObject, _context: USDZExporterContext) {
        if (model.uuid === this.gameObject.uuid)
            ext.addBehavior(new BehaviorModel("HideOnStart_" + this.gameObject.name,
                TriggerBuilder.sceneStartTrigger(),
                ActionBuilder.fadeAction(model, 0, false)
            ));
    }

    beforeCreateDocument() {
        this.gameObject.visible = true;
    }

    afterCreateDocument() {
        this.gameObject.visible = false;
    }
}