<script>
export default {
  props: {
    scene: { type: String, default: 'cube' },
    height: { type: String, default: '400px' }
  },
  data() {
    return {
      code: '',
      highlightedCode: '',
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
        // Load Prism and inject scoped styles
        await this.loadScript('https://cdn.jsdelivr.net/npm/prismjs@1.29.0/prism.min.js');
        await this.loadScript('https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-typescript.min.js');
        this.injectPrismStyles();
        this.updateHighlighting();

        // Load esbuild
        console.log('[playground] Loading esbuild-wasm...');
        await this.loadScript('https://cdn.jsdelivr.net/npm/esbuild-wasm@0.20.0/lib/browser.min.js');

        // Use a shared promise to avoid race conditions
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
          console.log('[playground] Iframe was already ready, compiling now...');
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

    loadStylesheet(href) {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`link[href="${href}"]`)) {
          resolve();
          return;
        }
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        link.onload = resolve;
        link.onerror = () => reject(new Error('Failed to load stylesheet'));
        document.head.appendChild(link);
      });
    },

    injectPrismStyles() {
      if (document.getElementById('playground-prism-styles')) return;
      const style = document.createElement('style');
      style.id = 'playground-prism-styles';
      style.textContent = `
        .code-highlight .token.comment, .code-highlight .token.prolog, .code-highlight .token.doctype, .code-highlight .token.cdata { color: #6a9955 !important; }
        .code-highlight .token.punctuation { color: #d4d4d4 !important; }
        .code-highlight .token.property, .code-highlight .token.tag, .code-highlight .token.boolean, .code-highlight .token.number, .code-highlight .token.constant, .code-highlight .token.symbol { color: #b5cea8 !important; }
        .code-highlight .token.selector, .code-highlight .token.attr-name, .code-highlight .token.string, .code-highlight .token.char, .code-highlight .token.builtin { color: #ce9178 !important; }
        .code-highlight .token.operator, .code-highlight .token.entity, .code-highlight .token.url { color: #d4d4d4 !important; }
        .code-highlight .token.atrule, .code-highlight .token.attr-value, .code-highlight .token.function, .code-highlight .token.class-name { color: #dcdcaa !important; }
        .code-highlight .token.keyword { color: #569cd6 !important; }
        .code-highlight .token.regex, .code-highlight .token.important { color: #d16969 !important; }
        .code-highlight code { color: #d4d4d4 !important; }
      `;
      document.head.appendChild(style);
    },

    updateHighlighting() {
      if (window.Prism?.languages?.typescript) {
        this.highlightedCode = window.Prism.highlight(this.code + '\n', window.Prism.languages.typescript, 'typescript');
      } else {
        this.highlightedCode = this.escapeHtml(this.code) + '\n';
      }
    },

    escapeHtml(text) {
      return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    },

    onInput(e) {
      this.code = e.target.value;
      this.updateHighlighting();
      this.syncScroll(e.target);
      this.scheduleCompile();
    },

    syncScroll(textarea) {
      const pre = this.$refs.highlightPre;
      const lines = this.$refs.lineNumbers;
      if (pre) {
        pre.scrollTop = textarea.scrollTop;
        pre.scrollLeft = textarea.scrollLeft;
      }
      if (lines) {
        lines.scrollTop = textarea.scrollTop;
      }
    },

    onScroll(e) {
      this.syncScroll(e.target);
    },

    onKeydown(e) {
      // Handle Tab key for indentation
      if (e.key === 'Tab') {
        e.preventDefault();
        const textarea = e.target;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const value = textarea.value;

        if (e.shiftKey) {
          // Shift+Tab: remove indentation
          const lineStart = value.lastIndexOf('\n', start - 1) + 1;
          if (value.substring(lineStart, lineStart + 2) === '  ') {
            textarea.value = value.substring(0, lineStart) + value.substring(lineStart + 2);
            textarea.selectionStart = textarea.selectionEnd = start - 2;
            this.code = textarea.value;
            this.updateHighlighting();
            this.scheduleCompile();
          }
        } else {
          // Tab: add indentation
          textarea.value = value.substring(0, start) + '  ' + value.substring(end);
          textarea.selectionStart = textarea.selectionEnd = start + 2;
          this.code = textarea.value;
          this.updateHighlighting();
          this.scheduleCompile();
        }
      }
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
        <div class="editor-wrapper">
          <div ref="lineNumbers" class="line-numbers">
            <div v-for="n in code.split('\n').length" :key="n" class="line-number">{{ n }}</div>
          </div>
          <div class="code-container">
            <pre ref="highlightPre" class="code-highlight"><code v-html="highlightedCode"></code></pre>
            <textarea
              ref="textarea"
              class="code-textarea"
              :value="code"
              @input="onInput"
              @scroll="onScroll"
              @keydown="onKeydown"
              spellcheck="false"
              autocomplete="off"
              autocorrect="off"
              autocapitalize="off"
            ></textarea>
          </div>
        </div>
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
  background: #1d1f21;
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
.editor-wrapper {
  flex: 1;
  display: flex;
  overflow: hidden;
  background: #1d1f21;
}
.line-numbers {
  padding: 12px 0;
  background: #1d1f21;
  color: #636d83;
  font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
  font-size: 13px;
  line-height: 1.5;
  text-align: right;
  user-select: none;
  border-right: 1px solid #333;
  min-width: 40px;
  flex-shrink: 0;
  overflow: hidden;
}
.line-number {
  padding: 0 12px 0 8px;
}
.code-container {
  flex: 1;
  position: relative;
  overflow: hidden;
}
.code-highlight {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0;
  padding: 12px;
  background: transparent;
  font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
  font-size: 13px;
  line-height: 1.5;
  tab-size: 2;
  white-space: pre;
  overflow: auto;
  pointer-events: none;
}
.code-highlight code {
  font-family: inherit;
  background: transparent;
}
.code-textarea {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 12px;
  background: transparent;
  color: transparent;
  caret-color: #fff;
  border: none;
  resize: none;
  font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
  font-size: 13px;
  line-height: 1.5;
  tab-size: 2;
  white-space: pre;
  overflow: auto;
}
.code-textarea:focus {
  outline: none;
}
.code-textarea::selection {
  background: rgba(100, 150, 255, 0.3);
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
