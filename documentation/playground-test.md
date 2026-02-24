# Interactive Playground Test

This page tests the interactive code playground component.

## Basic Rotation

Edit the code below and see the results instantly. Try **CMD+click** on `gameObject` or `context` to navigate to type definitions!

<playground height="450px"></playground>

The playground loads with a default rotating cube component. Try modifying the code!

## Vertical Layout (Preview on Top)

<playground height="500px" layout="vertical" previewPosition="first"></playground>

## Try These Experiments

1. **Change rotation speed**: Modify `speed = 1` to `speed = 5` or `speed = -2`

2. **Rotate on different axis**: Change `rotateY` to `rotateX` or `rotateZ`

3. **Add wobble effect**: Try this update function:
```ts
update() {
  const wobble = Math.sin(this.context.time.time * 3) * 0.5;
  this.gameObject.rotateY(this.context.time.deltaTime * this.speed);
  this.gameObject.rotateX(wobble * this.context.time.deltaTime);
}
```

4. **Pulse scale**: Make the cube breathe:
```ts
update() {
  const scale = 1 + Math.sin(this.context.time.time * 2) * 0.2;
  this.gameObject.scale.set(scale, scale, scale);
  this.gameObject.rotateY(this.context.time.deltaTime);
}
```

## How It Works

The playground uses:
- **Monaco Editor** for a VSCode-like editing experience with TypeScript support
- **esbuild-wasm** for near-instant TypeScript transpilation (~5-10ms)
- **three.js** scene with hot-reloading component system

Changes are compiled and applied in real-time as you type!
