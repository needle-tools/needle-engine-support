import { Behaviour, serializable } from "@needle-tools/engine";

export class Bouncer extends Behaviour {
  @serializable()
  bounceHeight: number = 0.5;

  @serializable()
  bounceSpeed: number = 3;

  private startY: number = 0;

  start() {
    this.startY = this.gameObject.position.y;
  }

  update() {
    const bounce = Math.abs(Math.sin(this.context.time.time * this.bounceSpeed));
    this.gameObject.position.y = this.startY + bounce * this.bounceHeight;
    this.gameObject.rotateY(this.context.time.deltaTime * 2);
  }
}
