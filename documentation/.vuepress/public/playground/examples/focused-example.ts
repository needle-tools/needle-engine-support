import { Behaviour, serializable } from "@needle-tools/engine";

// This example shows how to use focusRegion to show only part of the code
export class FocusedExample extends Behaviour {
  @serializable()
  speed: number = 1;

  @serializable()
  amplitude: number = 0.3;

  private startY: number = 0;

  start() {
    this.startY = this.gameObject.position.y;
  }

  // #region editable
  update() {
    // Try changing the animation!
    const time = this.context.time.time;

    // Bounce up and down
    this.gameObject.position.y = this.startY + Math.sin(time * this.speed) * this.amplitude;

    // Rotate
    this.gameObject.rotateY(this.context.time.deltaTime);
  }
  // #endregion

  onDestroy() {
    console.log("Component destroyed");
  }
}
