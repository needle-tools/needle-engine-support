export class HideOnStart extends Behaviour implements UsdzBehaviour {

    start() {
        this.gameObject.visible = false;
    }

    createBehaviours(ext, model, _context) {
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