<script>
import { getGroup, ensureGroupCode, registerIframe, unregisterIframe, notifyIframeReady, compileGroup } from './playground-store.js';

export default {
  props: {
    group: { type: String, required: true },
    scene: { type: String, default: 'cube' },
    height: { type: String, default: '400px' },
    pinned: { type: Boolean, default: false },
    file: { type: String, default: '' },
  },
  data() {
    return {
      groupRef: null,
      iframeReady: false,
      isDark: true,
    };
  },
  computed: {
    playgroundUrl() {
      return `/docs/playground/${this.scene}/index.html`;
    },
  },
  async mounted() {
    this.groupRef = getGroup(this.group);

    this.detectTheme();
    this.themeObserver = new MutationObserver(() => this.detectTheme());
    this.themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme'] });

    // Register message listener BEFORE any async work to avoid missing iframe ready
    window.addEventListener('message', this.handleMessage);

    // Register iframe with group
    const iframe = this.$refs.previewFrame;
    if (iframe) {
      registerIframe(this.groupRef, iframe);
    }

    // Load file into group if needed (async)
    if (this.file) {
      await ensureGroupCode(this.groupRef, this.file);
    }

    // Ensure esbuild is loaded
    await this.ensureEsbuild();

    // If iframe became ready during async init, trigger compile now
    if (this.iframeReady) {
      compileGroup(this.groupRef);
    }
  },
  beforeUnmount() {
    window.removeEventListener('message', this.handleMessage);
    if (this.themeObserver) this.themeObserver.disconnect();
    const iframe = this.$refs.previewFrame;
    if (iframe && this.groupRef) {
      unregisterIframe(this.groupRef, iframe);
    }
  },
  methods: {
    handleMessage(event) {
      if (event.data?.type === 'needle-playground-ready') {
        const frame = this.$refs.previewFrame;
        if (!frame) return;
        if (event.source && event.source !== frame.contentWindow) return;
        this.iframeReady = true;
        notifyIframeReady(this.groupRef, frame);
      } else if (event.data?.type === 'needle-playground-error') {
        const frame = this.$refs.previewFrame;
        if (!frame) return;
        if (event.source && event.source !== frame.contentWindow) return;
        if (this.groupRef) this.groupRef.error = event.data.error;
      }
    },

    async ensureEsbuild() {
      if (window.__esbuildReady) return;

      if (!window.__esbuildLoadPromise) {
        window.__esbuildLoadPromise = this.loadScript('https://cdn.jsdelivr.net/npm/esbuild-wasm@0.20.0/lib/browser.min.js');
      }
      await window.__esbuildLoadPromise;

      if (!window.__esbuildInitPromise) {
        window.__esbuildInitPromise = window.esbuild.initialize({
          wasmURL: 'https://cdn.jsdelivr.net/npm/esbuild-wasm@0.20.0/esbuild.wasm'
        }).then(() => {
          window.__esbuildReady = true;
        }).catch(e => {
          if (e.message?.includes('already') || e.message?.includes('initialize')) {
            window.__esbuildReady = true;
          } else throw e;
        });
      }
      await window.__esbuildInitPromise;
    },

    loadScript(src) {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = () => reject(new Error('Failed to load script'));
        document.head.appendChild(script);
      });
    },

    detectTheme() {
      const html = document.documentElement;
      this.isDark = html.classList.contains('dark') ||
                    html.getAttribute('data-theme') === 'dark' ||
                    html.getAttribute('color-scheme') === 'dark';
    },

    toggleFullscreen() {
      const el = this.$refs.outputRoot;
      if (!this.isFullscreen) {
        el?.requestFullscreen?.();
        this.isFullscreen = true;
      } else {
        document.exitFullscreen?.();
        this.isFullscreen = false;
      }
    },
  }
};
</script>

<template>
  <div ref="outputRoot" :class="['playground-output', { pinned, 'theme-light': !isDark }]" :style="{ '--output-height': height }">
    <div class="output-inner">
      <div class="panel-header">
        <span class="panel-title">Preview</span>
        <div class="header-right">
          <span v-if="!iframeReady" class="status loading">Loading...</span>
          <span v-else-if="groupRef?.compiling" class="status compiling">Compiling...</span>
          <span v-else-if="groupRef?.error" class="status error">Error</span>
          <span v-else class="status ready">Live</span>
          <button class="fullscreen-btn" @click="toggleFullscreen" title="Fullscreen">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
            </svg>
          </button>
        </div>
      </div>
      <iframe
        ref="previewFrame"
        :src="playgroundUrl"
        class="preview-frame"
        allow="xr-spatial-tracking; fullscreen"
      ></iframe>
    </div>
    <div v-if="groupRef?.error" class="error-bar">{{ groupRef.error }}</div>
  </div>
</template>

<style scoped>
.playground-output {
  margin: 1em 0;
  border-radius: 12px;
  overflow: hidden;
  background: #1e1e1e;
  border: 1px solid #333;
}
.playground-output.theme-light {
  background: #fff;
  border-color: #e0e0e0;
}

/* Pinned mode - sticks to viewport while scrolling */
.playground-output.pinned {
  position: sticky;
  top: calc(var(--navbar-height, 64px) + 12px);
  z-index: 10;
}

.output-inner {
  display: flex;
  flex-direction: column;
  height: var(--output-height, 400px);
}

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
.header-right {
  display: flex;
  align-items: center;
  gap: 8px;
}
.panel-title { color: #ccc; font-weight: 500; }
.theme-light .panel-title { color: #333; }

.status { font-size: 11px; padding: 2px 8px; border-radius: 10px; }
.status.loading { background: #1a1a3c; color: #88f; }
.status.compiling { background: #3c3c00; color: #fc0; }
.status.error { background: #3c0000; color: #f66; }
.status.ready { background: #003c00; color: #6f6; }
.theme-light .status.loading { background: #e8e8ff; color: #44f; }
.theme-light .status.compiling { background: #fff8e0; color: #b80; }
.theme-light .status.error { background: #ffe8e8; color: #c00; }
.theme-light .status.ready { background: #e8ffe8; color: #080; }

.preview-frame {
  flex: 1;
  width: 100%;
  border: none;
  background: #000;
}

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
.theme-light .fullscreen-btn { color: #666; }
.theme-light .fullscreen-btn:hover { background: rgba(0,0,0,0.1); color: #000; }

/* Expand beyond content width on wide screens */
@media screen and (min-width: 1200px) {
  .playground-output { width: calc(100% + 100px); }
}
@media screen and (min-width: 1500px) {
  .playground-output { width: calc(100% + 200px); }
}
@media (max-width: 768px) {
  .playground-output { min-width: auto !important; margin-left: 0 !important; margin-right: 0 !important; }
  .output-inner { height: 300px !important; }
}
</style>
