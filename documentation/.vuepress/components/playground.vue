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

      // Minimal Three.js types for playground (full types are very large)
      const threeTypes = `
export class Object3D {
  position: Vector3;
  rotation: Euler;
  scale: Vector3;
  rotateX(angle: number): this;
  rotateY(angle: number): this;
  rotateZ(angle: number): this;
}
export class Vector3 {
  x: number;
  y: number;
  z: number;
  set(x: number, y: number, z: number): this;
}
export class Euler {
  x: number;
  y: number;
  z: number;
  set(x: number, y: number, z: number, order?: string): this;
}
export class Scene extends Object3D {}
export class Camera extends Object3D {}
export class Mesh extends Object3D {}
`;
      ts.addExtraLib(threeTypes, 'file:///node_modules/three/index.d.ts');
      // Create model for CMD+click navigation
      const threeUri = monacoInstance.Uri.parse('file:///node_modules/three/index.d.ts');
      if (!monacoInstance.editor.getModel(threeUri)) {
        monacoInstance.editor.createModel(threeTypes, 'typescript', threeUri);
      }
      console.log('[playground] Three.js types loaded');

      // Needle Engine types - using regular exports with path mapping for resolution
      const needleTypes = `
import { Object3D, Scene, Camera, Vector3 } from "three";

/**
 * Base class for all Needle Engine components.
 * Extend this class to create custom behaviors that can be attached to GameObjects.
 */
export class Behaviour {
  /** The GameObject this component is attached to */
  gameObject: Object3D;

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

/** Context provides access to the Needle Engine runtime. */
export interface Context {
  /** Time information for the current frame */
  time: Time;
  /** The Three.js scene */
  scene: Scene;
  /** The main camera */
  mainCamera: Camera;
  /** The physics engine (if available) */
  physics?: Physics;
  /** Input system */
  input: Input;
}

/** Time information for the current frame. */
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

/** Input system for handling user input. */
export interface Input {
  getPointerPosition(index?: number): { x: number; y: number } | null;
  getPointerPressed(index?: number): boolean;
}

/** Physics system interface. */
export interface Physics {
  raycast(origin: Vector3, direction: Vector3, maxDistance?: number): RaycastHit | null;
}

export interface RaycastHit {
  point: Vector3;
  normal: Vector3;
  distance: number;
  object: Object3D;
}

/**
 * Decorator to mark a property as serializable.
 * Serializable properties can be edited in the Unity/Blender editor.
 */
export function serializable(type?: any): PropertyDecorator;
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
    }
  }
}
</script>

<template>
  <div ref="playgroundRoot" :class="['playground', { 'is-fullscreen': isFullscreen, 'theme-light': !isDark }]" :style="{ '--playground-height': height }">
    <div :class="containerClass">
      <div class="editor-panel">
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
.editor-panel, .preview-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.editor-panel { border-right: 1px solid #333; }
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
