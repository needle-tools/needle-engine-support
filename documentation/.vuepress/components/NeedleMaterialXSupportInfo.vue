<script>
import { withBase } from 'vuepress/client'

export default {
  props: {
    /** Show only supported, only unsupported, or all. Default: all */
    filter: {
      type: String,
      default: 'all',
      validator: v => ['all', 'supported', 'unsupported'].includes(v),
    },
  },
  data() {
    return {
      data: null,
      error: null,
    };
  },
  computed: {
    supported() {
      return this.data?.supportedNodes ?? [];
    },
    unsupported() {
      return this.data?.unsupportedNodes ?? [];
    },
    total() {
      return this.supported.length + this.unsupported.length;
    },
    percentage() {
      if (!this.total) return 0;
      return Math.round((this.supported.length / this.total) * 100);
    },
    displayNodes() {
      if (this.filter === 'supported') return this.supported;
      if (this.filter === 'unsupported') return this.unsupported;
      return null;
    },
  },
  methods: {
    shortName(fullName) {
      const parts = fullName.split('.');
      const last = parts[parts.length - 1];
      return last.replace(/Node$/, '');
    },
  },
  async mounted() {
    try {
      const res = await fetch(withBase('/meta/materialx_node_coverage.json'));
      if (!res.ok) { this.error = 'Could not load MaterialX coverage data'; return; }
      this.data = await res.json();
    } catch (e) {
      this.error = e.message;
    }
  },
};
</script>

<template>
  <div class="needle-mtlx" v-if="data">
    <div class="mtlx-summary">
      <div class="mtlx-bar">
        <div class="mtlx-bar-fill" :style="{ width: percentage + '%' }"></div>
      </div>
      <p class="mtlx-stats">
        <strong>{{ percentage }}%</strong> ShaderGraph node coverage —
        {{ supported.length }} supported, {{ unsupported.length }} unsupported out of {{ total }} total nodes
      </p>
    </div>

    <div class="custom-container tip">
      <p class="custom-container-title">TIP</p>
      <p>When using an unsupported node in Shader Graph, the exporter will show a warning hint. You can replace the unsupported node with a supported alternative, or use the <code>MATERIALX</code> keyword to provide a fallback path.</p>
    </div>

    <template v-if="!displayNodes">
      <details open>
        <summary>Supported Nodes ({{ supported.length }})</summary>
        <div class="mtlx-nodes">
          <span v-for="n in supported" :key="n" class="mtlx-node mtlx-supported">{{ shortName(n) }}</span>
        </div>
      </details>
      <details>
        <summary>Unsupported Nodes ({{ unsupported.length }})</summary>
        <div class="mtlx-nodes">
          <span v-for="n in unsupported" :key="n" class="mtlx-node mtlx-unsupported">{{ shortName(n) }}</span>
        </div>
      </details>
    </template>

    <div v-else class="mtlx-nodes">
      <span v-for="n in displayNodes" :key="n"
        class="mtlx-node"
        :class="filter === 'supported' ? 'mtlx-supported' : 'mtlx-unsupported'">
        {{ shortName(n) }}
      </span>
    </div>
  </div>
  <div v-else-if="error" class="mtlx-error">{{ error }}</div>
  <div v-else class="mtlx-loading">Loading MaterialX data...</div>
</template>

<style scoped>
.needle-mtlx {
  margin: 0.5em 0 1em;
}
.mtlx-summary {
  margin-bottom: 0.75em;
}
.mtlx-bar {
  height: 8px;
  background: var(--c-border);
  border-radius: 4px;
  overflow: hidden;
}
.mtlx-bar-fill {
  height: 100%;
  background: var(--c-brand, #3eaf7c);
  border-radius: 4px;
  transition: width 0.3s;
}
.mtlx-stats {
  font-size: 0.9em;
  margin-top: 0.4em;
}
.mtlx-nodes {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35em;
  padding: 0.5em 0;
}
.mtlx-node {
  font-size: 0.8em;
  padding: 0.2em 0.65em;
  border-radius: 999px;
  font-family: var(--font-family-code);
  font-weight: 500;
}
.mtlx-supported {
  background: #16a34a22;
  color: #15803d;
  border: 1px solid #16a34a44;
}
.mtlx-unsupported {
  background: #ea580022;
  color: #c2410c;
  border: 1px solid #ea580044;
}

/* dark mode overrides */
html.dark .mtlx-supported {
  background: #22c55e20;
  color: #4ade80;
  border-color: #22c55e40;
}
html.dark .mtlx-unsupported {
  background: #f9731620;
  color: #fb923c;
  border-color: #f9731640;
}

details {
  margin-bottom: 0.5em;
}
summary {
  cursor: pointer;
  font-weight: 600;
  padding: 0.3em 0;
}
.mtlx-error { color: var(--c-danger, #cc0000); }
.mtlx-loading { opacity: 0.6; font-style: italic; }
</style>
