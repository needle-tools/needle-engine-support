<script>
// Monaco is a singleton, but editor instances are per-component
let monacoInstance = null;
let typesLoaded = false;

export default {
  props: {
    scene: { type: String, default: 'cube' },
    height: { type: String, default: '400px' },
    // Layout options: 'horizontal' (side by side) or 'vertical' (stacked)
    layout: { type: String, default: 'horizontal' },
    // Preview position: 'first' or 'last'
    previewPosition: { type: String, default: 'last' },
    // Initial code - can be passed as prop, file URL, or via default slot
    src: { type: String, default: '' },
    // File URL to load code from (e.g., /docs/playground/examples/bouncer.ts)
    file: { type: String, default: '' },
    // Show only editable region initially (use // #region editable / // #endregion markers)
    focusRegion: { type: Boolean, default: false },
  },
  data() {
    return {
      code: '',
      fullCode: '', // Complete code including hidden parts
      editableRegion: null, // { start, end } line numbers of editable region
      showFullCode: false, // Toggle to show full code
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
  async mounted() {
    // Initialize code from various sources (must complete before init)
    await this.loadInitialCode();
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
    if (this._editorInstance) {
      this._editorInstance.dispose();
      this._editorInstance = null;
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

    async loadInitialCode() {
      let rawCode = '';

      // Priority: file URL > src prop > slot content > default
      if (this.file) {
        try {
          const response = await fetch(this.file);
          if (response.ok) {
            rawCode = await response.text();
          }
        } catch (e) {
          console.warn('[playground] Failed to load file:', this.file, e);
        }
      }

      if (!rawCode && this.src) {
        rawCode = this.src;
      }

      // Try to extract text from slot content
      if (!rawCode && this.$slots.default) {
        const slotContent = this.$slots.default();
        rawCode = this.extractTextFromSlot(slotContent);
      }

      if (!rawCode) {
        rawCode = this.getDefaultCode();
      }

      // Store full code and extract editable region if focusRegion is enabled
      this.fullCode = rawCode;

      if (this.focusRegion) {
        const { editableCode, region } = this.extractEditableRegion(rawCode);
        if (region) {
          this.code = editableCode;
          this.editableRegion = region;
        } else {
          this.code = rawCode;
        }
      } else {
        this.code = rawCode;
      }
    },

    extractEditableRegion(code) {
      // Look for // #region editable and // #endregion markers
      const lines = code.split('\n');
      let startLine = -1;
      let endLine = -1;

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line.match(/^\/\/\s*#region\s+editable/i)) {
          startLine = i;
        } else if (startLine >= 0 && line.match(/^\/\/\s*#endregion/i)) {
          endLine = i;
          break;
        }
      }

      if (startLine >= 0 && endLine > startLine) {
        // Extract just the editable region (excluding markers)
        const editableLines = lines.slice(startLine + 1, endLine);
        // Find minimum indentation and remove it
        const nonEmptyLines = editableLines.filter(l => l.trim());
        const minIndent = nonEmptyLines.length > 0
          ? Math.min(...nonEmptyLines.map(l => l.match(/^\s*/)[0].length))
          : 0;
        const dedentedLines = editableLines.map(l => l.slice(minIndent));

        return {
          editableCode: dedentedLines.join('\n'),
          region: { start: startLine, end: endLine }
        };
      }

      return { editableCode: code, region: null };
    },

    getFullCodeWithEdits() {
      // Rebuild full code with current edits inserted into the editable region
      if (!this.editableRegion || !this.fullCode) {
        return this.code;
      }

      const fullLines = this.fullCode.split('\n');
      const { start, end } = this.editableRegion;

      // Get the indentation from the original editable region
      const originalEditableLines = fullLines.slice(start + 1, end);
      const nonEmptyLines = originalEditableLines.filter(l => l.trim());
      const minIndent = nonEmptyLines.length > 0
        ? Math.min(...nonEmptyLines.map(l => l.match(/^\s*/)[0].length))
        : 0;
      const indentStr = ' '.repeat(minIndent);

      // Re-indent the edited code
      const editedLines = this.code.split('\n').map(l => l ? indentStr + l : l);

      // Rebuild: before + edited + after
      const before = fullLines.slice(0, start + 1);
      const after = fullLines.slice(end);

      return [...before, ...editedLines, ...after].join('\n');
    },

    extractTextFromSlot(nodes) {
      if (!nodes) return '';
      let text = '';
      for (const node of nodes) {
        if (typeof node === 'string') {
          text += node;
        } else if (typeof node.children === 'string') {
          text += node.children;
        } else if (Array.isArray(node.children)) {
          text += this.extractTextFromSlot(node.children);
        } else if (node.type === Symbol.for('v-txt')) {
          text += node.children || '';
        }
      }
      // Trim leading/trailing whitespace but preserve internal indentation
      return text.replace(/^\s*\n/, '').replace(/\n\s*$/, '');
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
        this._mainModelUri = monacoInstance.Uri.parse('file:///src/main.ts');
        let model = monacoInstance.editor.getModel(this._mainModelUri);
        if (!model) {
          model = monacoInstance.editor.createModel(this.code, 'typescript', this._mainModelUri);
        } else {
          model.setValue(this.code);
        }
        this._editorInstance = monacoInstance.editor.create(container, {
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
        this._editorInstance.onDidChangeModelContent(() => {
          this.code = this._editorInstance.getValue();
          this.scheduleCompile();
        });

        // Handle go-to-definition by opening the target model in the same editor
        // Store reference for use in closures
        const vueThis = this;
        const thisEditor = this._editorInstance;
        const thisMainUri = this._mainModelUri;

        // Use the editor's internal service to handle navigation within this editor only
        const editorService = thisEditor._codeEditorService;
        if (editorService) {
          const originalOpen = editorService.openCodeEditor?.bind(editorService);
          editorService.openCodeEditor = async (input, source, sideBySide) => {
            // Only handle if the source is this editor
            if (source !== thisEditor) {
              return originalOpen?.(input, source, sideBySide);
            }
            console.log('[playground] Opening definition:', input?.resource?.toString());
            const targetModel = monacoInstance.editor.getModel(input?.resource);
            if (targetModel) {
              thisEditor.setModel(targetModel);
              vueThis.viewingDefinition = input?.resource?.toString() !== thisMainUri.toString();
              if (input?.options?.selection) {
                thisEditor.setSelection(input.options.selection);
                thisEditor.revealLineInCenter(input.options.selection.startLineNumber);
              }
              return thisEditor;
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

      // Minimal Three.js types (self-contained, no external deps)
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

      // Needle Engine types
      const needleTypes = `
import { Object3D, Scene, Camera, Vector3 } from "three";

/** Base class for all Needle Engine components. */
export class Behaviour {
  /** The GameObject this component is attached to */
  gameObject: Object3D;
  /** The Needle Engine context */
  context: Context;
  /** Whether this component is enabled */
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

/** Context provides access to the Needle Engine runtime. */
export interface Context {
  time: Time;
  scene: Scene;
  mainCamera: Camera;
  physics?: Physics;
  input: Input;
}

/** Time information for the current frame. */
export interface Time {
  time: number;
  deltaTime: number;
  frameCount: number;
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

/** Decorator to mark a property as serializable. */
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
        // Use full code with edits if we're in focus mode
        const codeToCompile = this.editableRegion && !this.showFullCode
          ? this.getFullCodeWithEdits()
          : this.code;

        const result = await window.esbuild.transform(codeToCompile, {
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

    toggleFullCode() {
      if (this.showFullCode) {
        // Switching back to focused view - extract current edits
        const { editableCode, region } = this.extractEditableRegion(this.code);
        if (region) {
          this.fullCode = this.code;
          this.code = editableCode;
          this.editableRegion = region;
        }
      } else {
        // Switching to full code view - merge edits into full code
        const fullWithEdits = this.getFullCodeWithEdits();
        this.code = fullWithEdits;
      }
      this.showFullCode = !this.showFullCode;

      // Update editor content
      if (this._editorInstance) {
        const model = monacoInstance.editor.getModel(this._mainModelUri);
        if (model) {
          model.setValue(this.code);
        }
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
      if (this._editorInstance && monacoInstance) {
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
      if (!this._editorInstance || !monacoInstance || !this._mainModelUri) return;
      const mainModel = monacoInstance.editor.getModel(this._mainModelUri);
      if (mainModel) {
        this._editorInstance.setModel(mainModel);
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
      const isPreviewFirst = this.previewPosition === 'first';

      let percentage;
      if (isVertical) {
        percentage = ((e.clientY - rect.top) / rect.height) * 100;
        // When preview is first (top), invert so dragging down grows preview
        if (isPreviewFirst) {
          percentage = 100 - percentage;
        }
      } else {
        percentage = ((e.clientX - rect.left) / rect.width) * 100;
        // When preview is first (left), invert so dragging right grows preview
        if (isPreviewFirst) {
          percentage = 100 - percentage;
        }
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
            <button v-if="editableRegion && !viewingDefinition" class="toggle-code-btn" @click="toggleFullCode" :title="showFullCode ? 'Show editable section' : 'Show full code'">
              {{ showFullCode ? 'Focus' : 'Full' }}
            </button>
          </div>
          <span v-if="loading" class="status loading">Loading...</span>
          <span v-else-if="compiling" class="status compiling">Compiling...</span>
          <span v-else-if="error" class="status error">Error</span>
          <span v-else-if="iframeReady" class="status ready">Live</span>
        </div>
        <div ref="editorContainer" class="editor-container"></div>
      </div>
      <div class="resize-handle" :class="{ 'resize-handle-vertical': layout === 'vertical' }" @mousedown="startResize"></div>
      <div class="preview-panel" :style="{ flex: 'none', [layout === 'vertical' ? 'height' : 'width']: (100 - editorWidth) + '%' }">
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
.toggle-code-btn {
  padding: 2px 8px;
  border: 1px solid #555;
  background: transparent;
  color: #aaa;
  font-size: 10px;
  font-weight: 500;
  cursor: pointer;
  border-radius: 3px;
  transition: all 0.15s;
}
.toggle-code-btn:hover {
  background: rgba(255,255,255,0.1);
  border-color: #888;
  color: #fff;
}
.theme-light .toggle-code-btn {
  border-color: #ccc;
  color: #666;
}
.theme-light .toggle-code-btn:hover {
  background: rgba(0,0,0,0.05);
  border-color: #999;
  color: #333;
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
