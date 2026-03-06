import { Behaviour, serializable } from "@needle-tools/engine";

export class TutorialComponent extends Behaviour {
  // #section properties
  @serializable()
  speed: number = 1;

  @serializable()
  amplitude: number = 0.3;
  // #endsection

  private startY: number = 0;

  start() {
    this.startY = this.gameObject.position.y;
  }

  // #section update
  update() {
    const time = this.context.time.time;

    // Bounce up and down
    this.gameObject.position.y = this.startY + Math.sin(time * this.speed) * this.amplitude;

    // Rotate
    this.gameObject.rotateY(this.context.time.deltaTime * this.speed);
  }
  // #endsection
}
