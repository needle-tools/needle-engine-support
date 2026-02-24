<script>
// Store non-reactive references outside Vue's reactivity system
let monacoInstance = null;
let editorInstance = null;
let typesLoaded = false;
let mainModelUri = null; // Track the main code model URI

export default {
  props: {
    scene: { type: String, default: 'cube' },
    height: { type: String, default: '400px' },
    // Layout options: 'horizontal' (side by side) or 'vertical' (stacked)
    layout: { type: String, default: 'horizontal' },
    // Preview position: 'first' or 'last'
    previewPosition: { type: String, default: 'last' },
    // Initial code - can be passed as prop or via default slot
    src: { type: String, default: '' },
  },
  data() {
    return {
      code: '',
      error: null,
      iframeReady: false,
      debounceTimer: null,
      loading: true,
      compiling: false,
      typesReady: false,
      isFullscreen: false,
      isDark: true,
      viewingDefinition: false, // True when viewing a type definition file
      editorWidth: 50, // Percentage width of editor panel
      isResizing: false,
    }
  },
  computed: {
    playgroundUrl() {
      return `/docs/playground/${this.scene}/index.html`;
    },
    containerClass() {
      return {
        'playground-container': true,
        'layout-vertical': this.layout === 'vertical',
        'preview-first': this.previewPosition === 'first',
      };
    }
  },
  mounted() {
    // Use src prop, slot content, or default code
    if (this.src) {
      this.code = this.src;
    } else if (this.$slots.default) {
      // Get text content from slot
      const slotContent = this.$slots.default();
      if (slotContent?.[0]?.children) {
        this.code = typeof slotContent[0].children === 'string'
          ? slotContent[0].children
          : this.getDefaultCode();
      } else {
        this.code = this.getDefaultCode();
      }
    } else {
      this.code = this.getDefaultCode();
    }
    this.detectTheme();
    this.init();
    window.addEventListener('message', this.handleMessage);
    window.addEventListener('keydown', this.handleKeyDown);
    // Listen for VuePress theme changes
    this.themeObserver = new MutationObserver(() => this.detectTheme());
    this.themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme'] });
  },
  beforeUnmount() {
    window.removeEventListener('message', this.handleMessage);
    window.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('mousemove', this.doResize);
    document.removeEventListener('mouseup', this.stopResize);
    if (this.themeObserver) this.themeObserver.disconnect();
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
    if (editorInstance) {
      editorInstance.dispose();
      editorInstance = null;
    }
    if (this.isFullscreen) {
      document.exitFullscreen?.();
    }
  },
  methods: {
    getDefaultCode() {
      return `import { Behaviour, serializable } from "@needle-tools/engine";

export class Rotator extends Behaviour {
  @serializable()
  speed: number = 1;

  update() {
    this.gameObject.rotateY(this.context.time.deltaTime * this.speed);
  }
}`;
    },

    async init() {
      if (typeof window === 'undefined') return;

      try {
        // Load Monaco using the official loader
        console.log('[playground] Loading Monaco loader...');
        const loader = await import('https://esm.sh/@monaco-editor/loader@1.4.0');

        // Configure Monaco to load from CDN
        loader.default.config({
          paths: {
            vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs'
          }
        });

        console.log('[playground] Initializing Monaco...');
        monacoInstance = await loader.default.init();
        console.log('[playground] Monaco initialized');

        // Configure TypeScript compiler options with path mappings for module resolution
        monacoInstance.languages.typescript.typescriptDefaults.setCompilerOptions({
          target: monacoInstance.languages.typescript.ScriptTarget.ES2022,
          moduleResolution: monacoInstance.languages.typescript.ModuleResolutionKind.NodeJs,
          module: monacoInstance.languages.typescript.ModuleKind.ESNext,
          experimentalDecorators: true,
          allowNonTsExtensions: true,
          strict: false,
          noEmit: true,
          baseUrl: 'file:///',
          paths: {
            '@needle-tools/engine': ['node_modules/@needle-tools/engine/index.d.ts'],
            'three': ['node_modules/three/index.d.ts'],
          },
        });

        // Load type definitions (shared across instances)
        if (!typesLoaded) {
          await this.loadTypeDefinitions();
          typesLoaded = true;
        }
        this.typesReady = true;

        // Create the editor with a file:// URI model for proper go-to-definition
        const container = this.$refs.editorContainer;
        mainModelUri = monacoInstance.Uri.parse('file:///src/main.ts');
        let model = monacoInstance.editor.getModel(mainModelUri);
        if (!model) {
          model = monacoInstance.editor.createModel(this.code, 'typescript', mainModelUri);
        } else {
          model.setValue(this.code);
        }
        editorInstance = monacoInstance.editor.create(container, {
          model,
          theme: this.isDark ? 'vs-dark' : 'vs',
          minimap: { enabled: false },
          fontSize: 13,
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          wordWrap: 'off',
          padding: { top: 12 },
          scrollbar: {
            alwaysConsumeMouseWheel: false
          }
        });

        // Listen for content changes
        editorInstance.onDidChangeModelContent(() => {
          this.code = editorInstance.getValue();
          this.scheduleCompile();
        });

        // Handle go-to-definition by opening the target model in the same editor
        // Try modern API first
        const vueThis = this;
        if (monacoInstance.editor.registerEditorOpener) {
          monacoInstance.editor.registerEditorOpener({
            openCodeEditor: (source, resource, selectionOrPosition) => {
              console.log('[playground] Opening definition:', resource.toString());
              const targetModel = monacoInstance.editor.getModel(resource);
              if (targetModel && targetModel !== editorInstance.getModel()) {
                editorInstance.setModel(targetModel);
                // Track if we're viewing a definition (not the main code)
                vueThis.viewingDefinition = resource.toString() !== mainModelUri.toString();
                if (selectionOrPosition) {
                  if ('startLineNumber' in selectionOrPosition) {
                    editorInstance.setSelection(selectionOrPosition);
                    editorInstance.revealLineInCenter(selectionOrPosition.startLineNumber);
                  } else {
                    editorInstance.setPosition(selectionOrPosition);
                    editorInstance.revealLineInCenter(selectionOrPosition.lineNumber);
                  }
                }
                return true; // handled
              }
              return false; // let default handle it
            }
          });
        }
        // Fallback for older Monaco versions
        const editorService = editorInstance._codeEditorService;
        if (editorService) {
          const originalOpen = editorService.openCodeEditor?.bind(editorService);
          editorService.openCodeEditor = async (input, source, sideBySide) => {
            console.log('[playground] editorService.openCodeEditor:', input?.resource?.toString());
            const targetModel = monacoInstance.editor.getModel(input?.resource);
            if (targetModel) {
              editorInstance.setModel(targetModel);
              // Track if we're viewing a definition (not the main code)
              vueThis.viewingDefinition = input?.resource?.toString() !== mainModelUri.toString();
              if (input?.options?.selection) {
                editorInstance.setSelection(input.options.selection);
                editorInstance.revealLineInCenter(input.options.selection.startLineNumber);
              }
              return editorInstance;
            }
            return originalOpen?.(input, source, sideBySide);
          };
        }

        console.log('[playground] Editor created');

        // Load esbuild for transpilation (shared across all playground instances)
        console.log('[playground] Loading esbuild-wasm...');
        if (!window.__esbuildLoadPromise) {
          window.__esbuildLoadPromise = this.loadScript('https://cdn.jsdelivr.net/npm/esbuild-wasm@0.20.0/lib/browser.min.js');
        }
        await window.__esbuildLoadPromise;

        if (!window.__esbuildInitPromise) {
          window.__esbuildInitPromise = window.esbuild.initialize({
            wasmURL: 'https://cdn.jsdelivr.net/npm/esbuild-wasm@0.20.0/esbuild.wasm'
          }).then(() => {
            console.log('[playground] esbuild initialized successfully');
            window.__esbuildReady = true;
          }).catch(e => {
            if (e.message?.includes('already') || e.message?.includes('initialize')) {
              console.log('[playground] esbuild was already initialized');
              window.__esbuildReady = true;
            } else {
              throw e;
            }
          });
        }
        await window.__esbuildInitPromise;

        this.loading = false;
        console.log('[playground] Ready!');

        if (this.iframeReady) {
          this.compile();
        }

      } catch (e) {
        console.error('[playground] Init failed:', e);
        this.error = 'Failed to load: ' + e.message;
        this.loading = false;
      }
    },

    async loadTypeDefinitions() {
      console.log('[playground] Loading type definitions...');
      const ts = monacoInstance.languages.typescript.typescriptDefaults;

      // Try to fetch Three.js types from esm.sh (simplified subset)
      let threeTypes;
      try {
        const threeResp = await fetch('https://esm.sh/v135/@types/three@0.169.0/index.d.ts');
        if (threeResp.ok) {
          threeTypes = await threeResp.text();
          console.log('[playground] Fetched Three.js types from CDN');
        }
      } catch (e) {
        console.warn('[playground] Failed to fetch Three.js types, using minimal fallback');
      }

      // Fallback minimal Three.js types
      if (!threeTypes) {
        threeTypes = `
export class Object3D {
  position: Vector3;
  rotation: Euler;
  scale: Vector3;
  parent: Object3D | null;
  children: Object3D[];
  name: string;
  visible: boolean;
  rotateX(angle: number): this;
  rotateY(angle: number): this;
  rotateZ(angle: number): this;
  add(...object: Object3D[]): this;
  remove(...object: Object3D[]): this;
  lookAt(vector: Vector3): void;
  traverse(callback: (object: Object3D) => void): void;
}
export class Vector3 {
  x: number;
  y: number;
  z: number;
  constructor(x?: number, y?: number, z?: number);
  set(x: number, y: number, z: number): this;
  copy(v: Vector3): this;
  add(v: Vector3): this;
  sub(v: Vector3): this;
  multiplyScalar(s: number): this;
  normalize(): this;
  length(): number;
  distanceTo(v: Vector3): number;
  clone(): Vector3;
}
export class Euler {
  x: number;
  y: number;
  z: number;
  order: string;
  set(x: number, y: number, z: number, order?: string): this;
}
export class Quaternion {
  x: number;
  y: number;
  z: number;
  w: number;
  setFromEuler(euler: Euler): this;
}
export class Matrix4 {
  elements: number[];
  identity(): this;
  multiply(m: Matrix4): this;
}
export class Color {
  r: number;
  g: number;
  b: number;
  constructor(color?: number | string);
  set(color: number | string): this;
  setHex(hex: number): this;
}
export class Scene extends Object3D {
  background: Color | null;
  fog: any;
}
export class Camera extends Object3D {}
export class PerspectiveCamera extends Camera {
  fov: number;
  aspect: number;
  near: number;
  far: number;
  updateProjectionMatrix(): void;
}
export class Mesh extends Object3D {
  geometry: BufferGeometry;
  material: Material | Material[];
}
export class BufferGeometry {
  attributes: any;
  dispose(): void;
}
export class Material {
  visible: boolean;
  transparent: boolean;
  opacity: number;
  dispose(): void;
}
export class MeshStandardMaterial extends Material {
  color: Color;
  roughness: number;
  metalness: number;
  map: Texture | null;
}
export class Texture {
  image: any;
  needsUpdate: boolean;
  dispose(): void;
}
export class BoxGeometry extends BufferGeometry {
  constructor(width?: number, height?: number, depth?: number);
}
export class SphereGeometry extends BufferGeometry {
  constructor(radius?: number, widthSegments?: number, heightSegments?: number);
}
export class PlaneGeometry extends BufferGeometry {
  constructor(width?: number, height?: number);
}
export class Raycaster {
  ray: { origin: Vector3; direction: Vector3 };
  setFromCamera(coords: { x: number; y: number }, camera: Camera): void;
  intersectObjects(objects: Object3D[], recursive?: boolean): any[];
}
export class Clock {
  elapsedTime: number;
  getDelta(): number;
  getElapsedTime(): number;
}
`;
      }
      ts.addExtraLib(threeTypes, 'file:///node_modules/three/index.d.ts');
      // Create model for CMD+click navigation
      const threeUri = monacoInstance.Uri.parse('file:///node_modules/three/index.d.ts');
      if (!monacoInstance.editor.getModel(threeUri)) {
        monacoInstance.editor.createModel(threeTypes, 'typescript', threeUri);
      }
      console.log('[playground] Three.js types loaded');

      // Needle Engine types - comprehensive API for playground
      const needleTypes = `
import { Object3D, Scene, Camera, Vector3, Quaternion, Color, Mesh, Material, Texture, Raycaster } from "three";

/**
 * Base class for all Needle Engine components.
 * Extend this class to create custom behaviors that can be attached to GameObjects.
 *
 * @example
 * \`\`\`typescript
 * export class MyComponent extends Behaviour {
 *   @serializable()
 *   speed: number = 1;
 *
 *   update() {
 *     this.gameObject.rotateY(this.context.time.deltaTime * this.speed);
 *   }
 * }
 * \`\`\`
 */
export class Behaviour {
  /** The GameObject (Three.js Object3D) this component is attached to */
  gameObject: Object3D;

  /** The Needle Engine context providing access to scene, time, input, and other systems */
  context: Context;

  /** Whether this component is enabled. Disabled components don't receive lifecycle callbacks. */
  enabled: boolean;

  /** Unique identifier for this component instance */
  guid: string;

  /** The name of this component (typically the class name) */
  name: string;

  /** Parent GameObject in the hierarchy */
  get parent(): Object3D | null;

  /** Called once when the component is first initialized (before start) */
  awake?(): void;

  /** Called when the component becomes enabled */
  onEnable?(): void;

  /** Called when the component becomes disabled */
  onDisable?(): void;

  /** Called once before the first update, after all awake calls have completed */
  start?(): void;

  /** Called every frame before update - use for input processing */
  earlyUpdate?(): void;

  /** Called every frame - main update logic goes here */
  update?(): void;

  /** Called every frame after all update calls - use for camera follow, etc. */
  lateUpdate?(): void;

  /** Called when the component is destroyed */
  onDestroy?(): void;

  /** Called before the scene is rendered each frame */
  onBeforeRender?(): void;

  /** Called after the scene is rendered each frame */
  onAfterRender?(): void;

  /** Called when a collision starts (requires physics) */
  onCollisionEnter?(collision: Collision): void;

  /** Called while colliding (requires physics) */
  onCollisionStay?(collision: Collision): void;

  /** Called when a collision ends (requires physics) */
  onCollisionExit?(collision: Collision): void;

  /** Called when a trigger is entered (requires physics) */
  onTriggerEnter?(other: Object3D): void;

  /** Called when a trigger is exited (requires physics) */
  onTriggerExit?(other: Object3D): void;

  /** Called when pointer enters this object */
  onPointerEnter?(event: PointerEventData): void;

  /** Called when pointer exits this object */
  onPointerExit?(event: PointerEventData): void;

  /** Called when pointer is pressed on this object */
  onPointerDown?(event: PointerEventData): void;

  /** Called when pointer is released on this object */
  onPointerUp?(event: PointerEventData): void;

  /** Called when this object is clicked */
  onPointerClick?(event: PointerEventData): void;

  /** Destroy this component */
  destroy(): void;

  /** Get a component of the specified type from this GameObject */
  getComponent<T extends Behaviour>(type: new () => T): T | null;

  /** Get all components of the specified type from this GameObject */
  getComponents<T extends Behaviour>(type: new () => T): T[];

  /** Get a component in parent hierarchy */
  getComponentInParent<T extends Behaviour>(type: new () => T): T | null;

  /** Get a component in children hierarchy */
  getComponentInChildren<T extends Behaviour>(type: new () => T): T | null;

  /** Get all components in children hierarchy */
  getComponentsInChildren<T extends Behaviour>(type: new () => T): T[];
}

/** Context provides access to the Needle Engine runtime systems. */
export interface Context {
  /** Time information for the current frame */
  time: Time;
  /** The Three.js scene root */
  scene: Scene;
  /** The main camera (can be null if no camera exists) */
  mainCamera: Camera | null;
  /** Physics engine interface */
  physics: Physics;
  /** Input system for pointer, keyboard, and touch input */
  input: Input;
  /** The HTML canvas element */
  domElement: HTMLCanvasElement;
  /** Screen/viewport dimensions */
  xr: XRContext | null;
  /** Addressables for loading assets */
  addressables: Addressables;
}

/** Time information for the current frame. */
export interface Time {
  /** Total elapsed time in seconds since engine started */
  time: number;
  /** Time in seconds since the last frame (affected by timeScale) */
  deltaTime: number;
  /** Unscaled delta time (not affected by timeScale) */
  unscaledDeltaTime: number;
  /** Current frame number */
  frameCount: number;
  /** Time scale multiplier (1.0 = normal, 0.5 = half speed, 2.0 = double speed) */
  timeScale: number;
  /** Real time since startup (not affected by timeScale) */
  realtimeSinceStartup: number;
}

/** Input system for handling user input. */
export interface Input {
  /** Get the current pointer position in normalized device coordinates (-1 to 1) */
  getPointerPosition(index?: number): Vector2 | null;
  /** Check if a pointer button is currently pressed */
  getPointerPressed(index?: number): boolean;
  /** Check if a pointer button was pressed this frame */
  getPointerDown(index?: number): boolean;
  /** Check if a pointer button was released this frame */
  getPointerUp(index?: number): boolean;
  /** Get pointer position in screen pixels */
  getPointerPositionScreenSpace(index?: number): Vector2 | null;
  /** Check if a keyboard key is currently pressed */
  getKeyPressed(key: string): boolean;
  /** Check if a keyboard key was pressed this frame */
  getKeyDown(key: string): boolean;
  /** Check if a keyboard key was released this frame */
  getKeyUp(key: string): boolean;
  /** Mouse scroll delta */
  mouseScrollDelta: Vector2;
}

/** 2D Vector for screen coordinates and input */
export interface Vector2 {
  x: number;
  y: number;
}

/** Physics system interface. */
export interface Physics {
  /** Whether physics is enabled */
  enabled: boolean;
  /** Cast a ray and return the first hit */
  raycast(origin: Vector3, direction: Vector3, maxDistance?: number): RaycastHit | null;
  /** Cast a ray and return all hits */
  raycastAll(origin: Vector3, direction: Vector3, maxDistance?: number): RaycastHit[];
  /** Perform a spherecast */
  spherecast(origin: Vector3, radius: number, direction: Vector3, maxDistance?: number): RaycastHit | null;
}

/** Result of a raycast hit */
export interface RaycastHit {
  /** World position of the hit point */
  point: Vector3;
  /** Surface normal at the hit point */
  normal: Vector3;
  /** Distance from ray origin to hit point */
  distance: number;
  /** The object that was hit */
  object: Object3D;
  /** The collider that was hit (if using physics) */
  collider?: any;
}

/** Collision information */
export interface Collision {
  /** The other object involved in the collision */
  other: Object3D;
  /** Contact points */
  contacts: ContactPoint[];
}

/** A contact point in a collision */
export interface ContactPoint {
  /** Contact position in world space */
  point: Vector3;
  /** Contact normal */
  normal: Vector3;
}

/** Pointer event data passed to pointer callbacks */
export interface PointerEventData {
  /** Pointer ID */
  pointerId: number;
  /** Screen position */
  screenPosition: Vector2;
  /** The object being pointed at */
  object: Object3D;
  /** World position of the pointer intersection */
  point?: Vector3;
  /** Surface normal at intersection */
  normal?: Vector3;
}

/** XR (WebXR) context for VR/AR */
export interface XRContext {
  /** Whether currently in an XR session */
  isInXR: boolean;
  /** Whether AR is available */
  isARSupported: boolean;
  /** Whether VR is available */
  isVRSupported: boolean;
}

/** Addressables system for loading assets */
export interface Addressables {
  /** Load a GLB/GLTF file and return the root object */
  load(url: string): Promise<Object3D>;
}

/**
 * Decorator to mark a property as serializable.
 * Serializable properties are synchronized between editor and runtime.
 *
 * @param type Optional type hint for complex types (e.g., Object3D, Texture)
 *
 * @example
 * \`\`\`typescript
 * export class MyComponent extends Behaviour {
 *   @serializable()
 *   speed: number = 1;
 *
 *   @serializable(Object3D)
 *   target: Object3D | null = null;
 *
 *   @serializable(Material)
 *   material: Material | null = null;
 * }
 * \`\`\`
 */
export function serializable(type?: any): PropertyDecorator;

/**
 * Decorator to mark a method as a syncable RPC (Remote Procedure Call).
 * Used for networking/multiplayer functionality.
 */
export function syncField(): PropertyDecorator;

// Utility functions that can be imported
/** Instantiate (clone) a prefab/object */
export function instantiate(original: Object3D, options?: { parent?: Object3D; position?: Vector3; rotation?: Quaternion }): Object3D;

/** Find an object by name in the scene */
export function findObjectOfType<T extends Behaviour>(type: new () => T, context: Context): T | null;

/** Get or add a component to an object */
export function getOrAddComponent<T extends Behaviour>(obj: Object3D, type: new () => T): T;

/** Destroy an object or component */
export function destroy(obj: Object3D | Behaviour): void;
`;
      ts.addExtraLib(needleTypes, 'file:///node_modules/@needle-tools/engine/index.d.ts');
      // Create model for CMD+click navigation
      const needleUri = monacoInstance.Uri.parse('file:///node_modules/@needle-tools/engine/index.d.ts');
      if (!monacoInstance.editor.getModel(needleUri)) {
        monacoInstance.editor.createModel(needleTypes, 'typescript', needleUri);
      }
      console.log('[playground] Needle Engine types loaded');
    },

    loadScript(src) {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve();
          return;
        }
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = () => reject(new Error('Failed to load script'));
        document.head.appendChild(script);
      });
    },

    scheduleCompile() {
      if (this.debounceTimer) clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => this.compile(), 500);
    },

    async compile() {
      if (!this.iframeReady || this.compiling) return;
      if (!window.esbuild || !window.__esbuildReady) {
        console.log('[playground] esbuild not ready');
        return;
      }

      this.compiling = true;
      this.error = null;

      try {
        const result = await window.esbuild.transform(this.code, {
          loader: 'ts',
          format: 'esm',
          target: 'es2022',
          tsconfigRaw: {
            compilerOptions: {
              experimentalDecorators: true,
              useDefineForClassFields: false
            }
          }
        });

        this.$refs.previewFrame?.contentWindow?.postMessage({
          type: 'needle-playground-code',
          code: result.code
        }, '*');

      } catch (e) {
        const msg = e.errors?.[0]?.text || e.message || 'Compile error';
        const line = e.errors?.[0]?.location?.line;
        this.error = line ? `Line ${line}: ${msg}` : msg;
      } finally {
        this.compiling = false;
      }
    },

    handleMessage(event) {
      if (event.data?.type === 'needle-playground-ready') {
        this.iframeReady = true;
        this.compile();
      } else if (event.data?.type === 'needle-playground-error') {
        this.error = event.data.error;
      }
    },

    handleKeyDown(event) {
      // Escape key returns to code when viewing a type definition
      if (event.key === 'Escape' && this.viewingDefinition) {
        this.goBackToCode();
      }
    },

    detectTheme() {
      const html = document.documentElement;
      // VuePress uses data-theme or class for theming
      const isDark = html.classList.contains('dark') ||
                     html.getAttribute('data-theme') === 'dark' ||
                     html.getAttribute('color-scheme') === 'dark';
      this.isDark = isDark;
      this.updateEditorTheme();
    },

    updateEditorTheme() {
      if (editorInstance && monacoInstance) {
        monacoInstance.editor.setTheme(this.isDark ? 'vs-dark' : 'vs');
      }
    },

    toggleFullscreen() {
      const el = this.$refs.playgroundRoot;
      if (!this.isFullscreen) {
        el?.requestFullscreen?.();
        this.isFullscreen = true;
      } else {
        document.exitFullscreen?.();
        this.isFullscreen = false;
      }
    },

    goBackToCode() {
      if (!editorInstance || !monacoInstance || !mainModelUri) return;
      const mainModel = monacoInstance.editor.getModel(mainModelUri);
      if (mainModel) {
        editorInstance.setModel(mainModel);
        this.viewingDefinition = false;
      }
    },

    startResize(e) {
      this.isResizing = true;
      document.addEventListener('mousemove', this.doResize);
      document.addEventListener('mouseup', this.stopResize);
      e.preventDefault();
    },

    doResize(e) {
      if (!this.isResizing) return;
      const container = this.$refs.playgroundRoot?.querySelector('.playground-container');
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const isVertical = this.layout === 'vertical';

      let percentage;
      if (isVertical) {
        percentage = ((e.clientY - rect.top) / rect.height) * 100;
      } else {
        percentage = ((e.clientX - rect.left) / rect.width) * 100;
      }

      // Clamp between 20% and 80%
      this.editorWidth = Math.min(80, Math.max(20, percentage));
    },

    stopResize() {
      this.isResizing = false;
      document.removeEventListener('mousemove', this.doResize);
      document.removeEventListener('mouseup', this.stopResize);
    }
  }
}
</script>

<template>
  <div ref="playgroundRoot" :class="['playground', { 'is-fullscreen': isFullscreen, 'theme-light': !isDark, 'is-resizing': isResizing }]" :style="{ '--playground-height': height, '--editor-width': editorWidth + '%' }">
    <div :class="containerClass">
      <div class="editor-panel" :style="{ flex: 'none', [layout === 'vertical' ? 'height' : 'width']: editorWidth + '%' }">
        <div class="panel-header">
          <div class="panel-header-left">
            <button v-if="viewingDefinition" class="back-btn" @click="goBackToCode" title="Back to your code (Escape)">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Back
            </button>
            <span class="panel-title">{{ viewingDefinition ? 'Type Definition' : 'TypeScript' }}</span>
          </div>
          <span v-if="loading" class="status loading">Loading...</span>
          <span v-else-if="compiling" class="status compiling">Compiling...</span>
          <span v-else-if="error" class="status error">Error</span>
          <span v-else-if="iframeReady" class="status ready">Live</span>
        </div>
        <div ref="editorContainer" class="editor-container"></div>
      </div>
      <div class="resize-handle" :class="{ 'resize-handle-vertical': layout === 'vertical' }" @mousedown="startResize"></div>
      <div class="preview-panel">
        <div class="panel-header">
          <span class="panel-title">Preview</span>
          <button class="fullscreen-btn" @click="toggleFullscreen" :title="isFullscreen ? 'Exit fullscreen' : 'Fullscreen'">
            <svg v-if="!isFullscreen" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
            </svg>
            <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/>
            </svg>
          </button>
        </div>
        <iframe
          ref="previewFrame"
          :src="playgroundUrl"
          class="preview-frame"
          allow="xr-spatial-tracking; fullscreen"
        ></iframe>
      </div>
    </div>
    <div v-if="error" class="error-bar">{{ error }}</div>
  </div>
</template>

<style scoped>
.playground {
  margin: 1em 0;
  border-radius: 12px;
  overflow: hidden;
  background: #1e1e1e;
  border: 1px solid #333;
}

/* Light theme */
.playground.theme-light {
  background: #fff;
  border-color: #e0e0e0;
}

/* Expand beyond content width - RIGHT SIDE ONLY */
@media screen and (min-width: 1200px) {
  .playground {
    width: calc(100% + 100px);
  }
}
@media screen and (min-width: 1500px) {
  .playground {
    width: calc(100% + 200px);
  }
}

/* Fullscreen mode */
.playground.is-fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw !important;
  height: 100vh !important;
  margin: 0 !important;
  border-radius: 0;
  z-index: 9999;
}
.playground.is-fullscreen .playground-container {
  height: 100% !important;
}

.playground-container {
  display: flex;
  height: var(--playground-height, 400px);
}

/* Vertical layout (stacked) - taller for more 1:1 aspect */
.playground-container.layout-vertical {
  flex-direction: column;
  height: calc(var(--playground-height, 400px) * 1.5);
}
.playground-container.layout-vertical .editor-panel,
.playground-container.layout-vertical .preview-panel {
  height: 50%;
  flex: none;
}
.playground-container.layout-vertical .editor-panel {
  border-right: none;
  border-bottom: 1px solid #333;
}

/* Preview first (swap order) */
.playground-container.preview-first {
  flex-direction: row-reverse;
}
.playground-container.preview-first .editor-panel {
  border-right: none;
  border-left: 1px solid #333;
}
.playground-container.layout-vertical.preview-first {
  flex-direction: column-reverse;
}
.playground-container.layout-vertical.preview-first .editor-panel {
  border-left: none;
  border-bottom: none;
  border-top: 1px solid #333;
}

@media (max-width: 768px) {
  .playground { min-width: auto !important; margin-left: 0 !important; margin-right: 0 !important; }
  .playground-container { flex-direction: column !important; height: auto !important; }
  .editor-panel, .preview-panel { width: 100% !important; height: 300px !important; flex: none !important; }
  .editor-panel { border-right: none !important; border-left: none !important; border-bottom: 1px solid #333 !important; border-top: none !important; }
}
/* Disable text selection during resize */
.playground.is-resizing {
  user-select: none;
}
.playground.is-resizing iframe {
  pointer-events: none;
}

.editor-panel, .preview-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
}
.editor-panel { border-right: none; }

/* Resize handle */
.resize-handle {
  flex-shrink: 0;
  width: 6px;
  background: #333;
  cursor: col-resize;
  transition: background 0.15s;
  position: relative;
}
.resize-handle:hover,
.playground.is-resizing .resize-handle {
  background: #0066cc;
}
.resize-handle::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 2px;
  height: 30px;
  background: rgba(255,255,255,0.3);
  border-radius: 1px;
}
.resize-handle-vertical {
  width: 100%;
  height: 6px;
  cursor: row-resize;
}
.resize-handle-vertical::after {
  width: 30px;
  height: 2px;
}
.theme-light .resize-handle {
  background: #e0e0e0;
}
.theme-light .resize-handle:hover,
.theme-light.is-resizing .resize-handle {
  background: #0066cc;
}
.theme-light .resize-handle::after {
  background: rgba(0,0,0,0.2);
}
.theme-light .editor-panel { border-right-color: #e0e0e0; }
.theme-light.layout-vertical .editor-panel { border-bottom-color: #e0e0e0; }
.theme-light .playground-container.preview-first .editor-panel { border-left-color: #e0e0e0; }
.theme-light .playground-container.layout-vertical.preview-first .editor-panel { border-top-color: #e0e0e0; }
.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: #252526;
  border-bottom: 1px solid #333;
  font-size: 12px;
  flex-shrink: 0;
  gap: 8px;
}
.theme-light .panel-header {
  background: #f3f3f3;
  border-bottom-color: #e0e0e0;
}
.panel-header-left {
  display: flex;
  align-items: center;
  gap: 8px;
}
.panel-title { color: #ccc; font-weight: 500; }
.theme-light .panel-title { color: #333; }
.back-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  border: none;
  background: #0066cc;
  color: #fff;
  font-size: 11px;
  font-weight: 500;
  cursor: pointer;
  border-radius: 4px;
  transition: background 0.15s;
}
.back-btn:hover {
  background: #0077ee;
}
.theme-light .back-btn {
  background: #0066cc;
  color: #fff;
}
.theme-light .back-btn:hover {
  background: #0055aa;
}
.status { font-size: 11px; padding: 2px 8px; border-radius: 10px; }
.status.loading { background: #1a1a3c; color: #88f; }
.status.compiling { background: #3c3c00; color: #fc0; }
.status.error { background: #3c0000; color: #f66; }
.status.ready { background: #003c00; color: #6f6; }
.theme-light .status.loading { background: #e8e8ff; color: #44f; }
.theme-light .status.compiling { background: #fff8e0; color: #b80; }
.theme-light .status.error { background: #ffe8e8; color: #c00; }
.theme-light .status.ready { background: #e8ffe8; color: #080; }
.editor-container {
  flex: 1;
  min-height: 0;
}
.preview-frame { flex: 1; width: 100%; border: none; background: #000; }
.error-bar {
  padding: 8px 12px;
  background: #3c0000;
  color: #f66;
  font-size: 12px;
  font-family: monospace;
  white-space: pre-wrap;
}
.theme-light .error-bar {
  background: #ffe8e8;
  color: #c00;
}

/* Fullscreen button */
.fullscreen-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0;
  border: none;
  background: transparent;
  color: #888;
  cursor: pointer;
  border-radius: 4px;
  transition: background 0.15s, color 0.15s;
}
.fullscreen-btn:hover {
  background: rgba(255,255,255,0.1);
  color: #fff;
}
.theme-light .fullscreen-btn {
  color: #666;
}
.theme-light .fullscreen-btn:hover {
  background: rgba(0,0,0,0.1);
  color: #000;
}
</style>
