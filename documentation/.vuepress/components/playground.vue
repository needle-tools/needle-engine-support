<script>
// Store non-reactive references outside Vue's reactivity system
let monacoInstance = null;
let editorInstance = null;

export default {
  props: {
    scene: { type: String, default: 'cube' },
    height: { type: String, default: '400px' }
  },
  data() {
    return {
      code: '',
      error: null,
      iframeReady: false,
      debounceTimer: null,
      loading: true,
      compiling: false,
    }
  },
  computed: {
    playgroundUrl() {
      return `/docs/playground/${this.scene}/index.html`;
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

        // Add Needle Engine type definitions
        monacoInstance.languages.typescript.typescriptDefaults.addExtraLib(`
declare module "@needle-tools/engine" {
  import * as THREE from 'three';

  export class Behaviour {
    gameObject: THREE.Object3D;
    context: {
      time: {
        time: number;
        deltaTime: number;
        frameCount: number;
      };
      scene: THREE.Scene;
      mainCamera: THREE.Camera;
    };
    enabled: boolean;

    awake?(): void;
    onEnable?(): void;
    onDisable?(): void;
    start?(): void;
    earlyUpdate?(): void;
    update?(): void;
    lateUpdate?(): void;
    onDestroy?(): void;

    onBeforeRender?(): void;
    onAfterRender?(): void;
  }

  export function serializable(type?: any): PropertyDecorator;
}

declare module 'three' {
  export class Object3D {
    position: Vector3;
    rotation: Euler;
    scale: Vector3;
    rotateX(angle: number): this;
    rotateY(angle: number): this;
    rotateZ(angle: number): this;
    add(...object: Object3D[]): this;
    remove(...object: Object3D[]): this;
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
}
`, 'file:///node_modules/@needle-tools/engine/index.d.ts');

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

        // Load esbuild for transpilation
        console.log('[playground] Loading esbuild-wasm...');
        await this.loadScript('https://cdn.jsdelivr.net/npm/esbuild-wasm@0.20.0/lib/browser.min.js');

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
    <div class="playground-container">
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
          allow="xr; xr-spatial-tracking; fullscreen"
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
@media (max-width: 768px) {
  .playground-container { flex-direction: column; height: auto; }
  .editor-panel, .preview-panel { width: 100% !important; height: 300px; }
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
