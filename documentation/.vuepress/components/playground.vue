<script>
// Store non-reactive references outside Vue's reactivity system
let monacoInstance = null;
let editorInstance = null;
let typesLoaded = false;

export default {
  props: {
    scene: { type: String, default: 'cube' },
    height: { type: String, default: '400px' },
    // Layout options: 'horizontal' (side by side) or 'vertical' (stacked)
    layout: { type: String, default: 'horizontal' },
    // Preview position: 'first' or 'last'
    previewPosition: { type: String, default: 'last' },
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
    this.code = this.getDefaultCode();
    this.init();
    window.addEventListener('message', this.handleMessage);
  },
  beforeUnmount() {
    window.removeEventListener('message', this.handleMessage);
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
    if (editorInstance) {
      editorInstance.dispose();
      editorInstance = null;
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

        // Configure TypeScript compiler options
        monacoInstance.languages.typescript.typescriptDefaults.setCompilerOptions({
          target: monacoInstance.languages.typescript.ScriptTarget.ES2022,
          moduleResolution: monacoInstance.languages.typescript.ModuleResolutionKind.NodeJs,
          module: monacoInstance.languages.typescript.ModuleKind.ESNext,
          experimentalDecorators: true,
          allowNonTsExtensions: true,
          strict: false,
          noEmit: true,
        });

        // Load type definitions (shared across instances)
        if (!typesLoaded) {
          await this.loadTypeDefinitions();
          typesLoaded = true;
        }
        this.typesReady = true;

        // Create the editor
        const container = this.$refs.editorContainer;
        editorInstance = monacoInstance.editor.create(container, {
          value: this.code,
          language: 'typescript',
          theme: 'vs-dark',
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

      // Fetch Three.js types
      try {
        const threeTypesUrl = 'https://esm.sh/@types/three@0.169.0/index.d.ts';
        const threeTypes = await fetch(threeTypesUrl).then(r => r.text());
        ts.addExtraLib(threeTypes, 'file:///node_modules/@types/three/index.d.ts');

        // Create a model so CMD+click can navigate to it
        const threeUri = monacoInstance.Uri.parse('file:///node_modules/@types/three/index.d.ts');
        if (!monacoInstance.editor.getModel(threeUri)) {
          monacoInstance.editor.createModel(threeTypes, 'typescript', threeUri);
        }
        console.log('[playground] Three.js types loaded');
      } catch (e) {
        console.warn('[playground] Failed to load Three.js types:', e);
      }

      // Add Needle Engine types with full definitions
      const needleTypes = `
declare module "@needle-tools/engine" {
  import * as THREE from 'three';

  /**
   * Base class for all Needle Engine components.
   * Extend this class to create custom behaviors that can be attached to GameObjects.
   *
   * @example
   * \`\`\`typescript
   * export class MyComponent extends Behaviour {
   *   start() {
   *     console.log("Component started!");
   *   }
   *   update() {
   *     this.gameObject.rotateY(this.context.time.deltaTime);
   *   }
   * }
   * \`\`\`
   */
  export class Behaviour {
    /** The GameObject this component is attached to */
    gameObject: THREE.Object3D;

    /** The Needle Engine context providing access to scene, time, and other systems */
    context: Context;

    /** Whether this component is enabled. Disabled components don't receive update calls. */
    enabled: boolean;

    /** Called once when the component is first created */
    awake?(): void;

    /** Called when the component becomes enabled */
    onEnable?(): void;

    /** Called when the component becomes disabled */
    onDisable?(): void;

    /** Called once before the first update, after all awake calls */
    start?(): void;

    /** Called every frame before update */
    earlyUpdate?(): void;

    /** Called every frame */
    update?(): void;

    /** Called every frame after update */
    lateUpdate?(): void;

    /** Called when the component is destroyed */
    onDestroy?(): void;

    /** Called before the scene is rendered */
    onBeforeRender?(): void;

    /** Called after the scene is rendered */
    onAfterRender?(): void;
  }

  /**
   * Context provides access to the Needle Engine runtime.
   */
  export interface Context {
    /** Time information for the current frame */
    time: Time;

    /** The Three.js scene */
    scene: THREE.Scene;

    /** The main camera */
    mainCamera: THREE.Camera;

    /** The physics engine (if available) */
    physics?: Physics;

    /** Input system */
    input: Input;
  }

  /**
   * Time information for the current frame.
   */
  export interface Time {
    /** Total elapsed time in seconds since the engine started */
    time: number;

    /** Time in seconds since the last frame */
    deltaTime: number;

    /** Current frame number */
    frameCount: number;

    /** Time scale multiplier (1.0 = normal speed) */
    timeScale: number;
  }

  /**
   * Input system for handling user input.
   */
  export interface Input {
    /** Get the current pointer position */
    getPointerPosition(index?: number): { x: number; y: number } | null;

    /** Check if a pointer is currently pressed */
    getPointerPressed(index?: number): boolean;
  }

  /**
   * Physics system interface.
   */
  export interface Physics {
    /** Perform a raycast */
    raycast(origin: THREE.Vector3, direction: THREE.Vector3, maxDistance?: number): RaycastHit | null;
  }

  export interface RaycastHit {
    point: THREE.Vector3;
    normal: THREE.Vector3;
    distance: number;
    object: THREE.Object3D;
  }

  /**
   * Decorator to mark a property as serializable.
   * Serializable properties can be edited in the Unity/Blender editor
   * and will be saved/loaded with the scene.
   *
   * @param type - Optional type hint for the serializer
   *
   * @example
   * \`\`\`typescript
   * export class MyComponent extends Behaviour {
   *   @serializable()
   *   speed: number = 1;
   *
   *   @serializable(Object3D)
   *   target?: THREE.Object3D;
   * }
   * \`\`\`
   */
  export function serializable(type?: any): PropertyDecorator;
}
`;

      ts.addExtraLib(needleTypes, 'file:///node_modules/@needle-tools/engine/index.d.ts');

      // Create model for navigation
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
    }
  }
}
</script>

<template>
  <div class="playground" :style="{ '--playground-height': height }">
    <div :class="containerClass">
      <div class="editor-panel">
        <div class="panel-header">
          <span class="panel-title">TypeScript</span>
          <span v-if="loading" class="status loading">Loading...</span>
          <span v-else-if="compiling" class="status compiling">Compiling...</span>
          <span v-else-if="error" class="status error">Error</span>
          <span v-else-if="iframeReady" class="status ready">Live</span>
        </div>
        <div ref="editorContainer" class="editor-container"></div>
      </div>
      <div class="preview-panel">
        <div class="panel-header">
          <span class="panel-title">Preview</span>
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
.playground-container {
  display: flex;
  height: var(--playground-height, 400px);
}

/* Vertical layout (stacked) */
.playground-container.layout-vertical {
  flex-direction: column;
}
.playground-container.layout-vertical .editor-panel,
.playground-container.layout-vertical .preview-panel {
  height: calc(var(--playground-height, 400px) / 2);
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
  .playground-container { flex-direction: column !important; height: auto !important; }
  .editor-panel, .preview-panel { width: 100% !important; height: 300px !important; }
  .editor-panel { border-right: none !important; border-left: none !important; border-bottom: 1px solid #333 !important; border-top: none !important; }
}
.editor-panel, .preview-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.editor-panel { border-right: 1px solid #333; }
.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: #252526;
  border-bottom: 1px solid #333;
  font-size: 12px;
  flex-shrink: 0;
}
.panel-title { color: #ccc; font-weight: 500; }
.status { font-size: 11px; padding: 2px 8px; border-radius: 10px; }
.status.loading { background: #1a1a3c; color: #88f; }
.status.compiling { background: #3c3c00; color: #fc0; }
.status.error { background: #3c0000; color: #f66; }
.status.ready { background: #003c00; color: #6f6; }
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
</style>
