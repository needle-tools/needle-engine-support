import { Behaviour, ParticleSystem } from "@needle-tools/engine";
import { ParticleSystemBaseBehaviour, QParticle } from "@needle-tools/engine";

// Derive your custom behaviour from the ParticleSystemBaseBehaviour class (or use QParticleBehaviour)
class MyParticlesBehaviour extends ParticleSystemBaseBehaviour {

    // callback invoked per particle
    update(particle: QParticle): void {
        particle.position.y += 5 * this.context.time.deltaTime;
    }
}
export class TestCustomParticleSystemBehaviour extends Behaviour {
    start() {
        // add your custom behaviour to the particle system
        this.gameObject.getComponent(ParticleSystem)!.addBehaviour(new MyParticlesBehaviour())
    }
}
