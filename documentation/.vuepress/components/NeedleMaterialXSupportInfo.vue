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
      return null; // show both sections
    },
  },
  methods: {
    shortName(fullName) {
      // "UnityEditor.ShaderGraph.AbsoluteNode" → "Absolute"
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

    <!-- All mode: show both sections -->
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

    <!-- Filtered mode -->
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
  margin-bottom: 1em;
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
  gap: 0.3em;
  padding: 0.5em 0;
}
.mtlx-node {
  font-size: 0.8em;
  padding: 0.15em 0.5em;
  border-radius: 4px;
  font-family: var(--font-family-code);
}
.mtlx-supported {
  background: #3eaf7c22;
  color: var(--c-brand, #3eaf7c);
}
.mtlx-unsupported {
  background: #cc000015;
  color: var(--c-danger, #cc0000);
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
