<script>
export default {
  props: {
    scene: { type: String, default: 'cube' },
    height: { type: String, default: '400px' }
  },
  data() {
    return {
      code: '',
      editor: null,
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
    if (this.editor) {
      this.editor.dispose();
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
        // Load Monaco Editor
        await this.loadMonaco();

        // Load esbuild
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

    async loadMonaco() {
      // Load Monaco via AMD loader
      if (window.monaco) {
        this.createEditor();
        return;
      }

      await this.loadScript('https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs/loader.js');

      return new Promise((resolve, reject) => {
        window.require.config({
          paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs' }
        });

        // Configure workers to use CDN
        window.MonacoEnvironment = {
          getWorkerUrl: function(workerId, label) {
            return `data:text/javascript;charset=utf-8,${encodeURIComponent(`
              self.MonacoEnvironment = { baseUrl: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/' };
              importScripts('https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs/base/worker/workerMain.js');
            `)}`;
          }
        };

        window.require(['vs/editor/editor.main'], () => {
          this.createEditor();
          resolve();
        });
      });
    },

    createEditor() {
      const container = this.$refs.editorContainer;
      if (!container || this.editor) return;

      // Configure TypeScript
      window.monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
        target: window.monaco.languages.typescript.ScriptTarget.ESNext,
        moduleResolution: window.monaco.languages.typescript.ModuleResolutionKind.NodeJs,
        module: window.monaco.languages.typescript.ModuleKind.ESNext,
        experimentalDecorators: true,
        allowNonTsExtensions: true,
        strict: false
      });

      // Add Needle Engine type definitions
      window.monaco.languages.typescript.typescriptDefaults.addExtraLib(`
        declare module "@needle-tools/engine" {
          export class Behaviour {
            gameObject: any;
            context: { time: { time: number; deltaTime: number } };
            enabled: boolean;
            start?(): void;
            update?(): void;
            onEnable?(): void;
            onDisable?(): void;
          }
          export function serializable(): PropertyDecorator;
        }
      `, 'file:///node_modules/@needle-tools/engine/index.d.ts');

      this.editor = window.monaco.editor.create(container, {
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
        padding: { top: 12 }
      });

      this.editor.onDidChangeModelContent(() => {
        this.code = this.editor.getValue();
        this.scheduleCompile();
      });
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
