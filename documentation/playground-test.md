# Interactive Playground Test

This page tests the interactive code playground component.

## Basic Rotation

Edit the code below and see the results instantly. **Drag the separator** between code and preview to resize panels! Try **CMD+click** on `gameObject` or `context` to navigate to type definitions.

<playground height="450px"></playground>

The playground loads with a default rotating cube component. Try modifying the code!

## Custom Code from File

Load code from an external file using the `file` prop - keeps your markdown clean:

<playground height="400px" file="/docs/playground/examples/bouncer.ts"></playground>

## Focused Editable Region

Use `focusRegion` to show only the editable part of larger examples. Click **Full** to see the complete code:

<playground height="350px" file="/docs/playground/examples/focused-example.ts" focusRegion></playground>

## Custom Code with Slot

You can also use slot content for inline code with proper formatting:

<playground height="400px">
import { Behaviour, serializable } from "@needle-tools/engine";

export class Spinner extends Behaviour {
  @serializable()
  speed: number = 2;

  @serializable()
  axis: "x" | "y" | "z" = "y";

  update() {
    const delta = this.context.time.deltaTime * this.speed;
    if (this.axis === "x") this.gameObject.rotateX(delta);
    else if (this.axis === "y") this.gameObject.rotateY(delta);
    else this.gameObject.rotateZ(delta);
  }
}
</playground>

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

## Tutorial Walkthrough (Multi-Section)

This demonstrates the walkthrough system: multiple code sections on the page linked to a single live preview. Each editor shows a different part of the same file, and edits in any section update the shared 3D output.

### Step 1: Define Properties

First, let's set up our component's configurable properties. Try changing the `speed` or `amplitude` values:

<playground group="intro-tutorial" file="/docs/playground/examples/tutorial-intro.ts" section="properties" hidePreview height="150px"></playground>

### Step 2: Write the Update Loop

Now here's where the magic happens. The `update()` method runs every frame - this is where we animate:

<playground group="intro-tutorial" section="update" hidePreview height="220px"></playground>

Try changing the rotation axis from `rotateY` to `rotateX`, or multiply `amplitude` by 2!

### Live Result

<playground-output group="intro-tutorial" file="/docs/playground/examples/tutorial-intro.ts" height="400px"></playground-output>

---

## Features

- **Draggable separator**: Resize code/preview panels by dragging
- **Custom code from file**: Use `file="/path/to/code.ts"` to load external code
- **Custom code inline**: Use slot content for inline code with formatting
- **Focused editing**: Use `focusRegion` with `// #region editable` markers to show only relevant code
- **Tutorial walkthroughs**: Use `group` + `section` + `hidePreview` with `<playground-output>` for multi-section tutorials
- **Type definitions**: CMD+click to navigate, press Escape or click Back to return
- **Fullscreen**: Click the fullscreen button in the preview panel
- **Theme support**: Automatically follows VuePress light/dark theme
- **Layouts**: Horizontal (default) or vertical with `layout="vertical"`

## How It Works

The playground uses:
- **Monaco Editor** for a VSCode-like editing experience with TypeScript support
- **esbuild-wasm** for near-instant TypeScript transpilation (~5-10ms)
- **Needle Engine** with hot-reloading component system

Changes are compiled and applied in real-time as you type!

## Walkthrough Authoring Guide

To create a tutorial walkthrough:

1. Create a `.ts` file with `// #section name` and `// #endsection` markers around editable sections
2. Use `<playground group="key" file="..." section="name" hidePreview>` for each code section
3. Use `<playground-output group="key" file="..." height="400px">` for the shared preview
4. The `file` prop only needs to be on one component per group (first to mount loads it)
5. Add `pinned` to `<playground-output>` to make it sticky while scrolling
