<script>
import { withBase } from 'vuepress/client'

export default {
  props: {
    /** Filter by category name (case-insensitive partial match) */
    category: {
      type: String,
      default: '',
    },
    /** Filter by group name */
    group: {
      type: String,
      default: '',
    },
    /** Show property details per component. Default: false */
    details: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      components: [],
      error: null,
    };
  },
  computed: {
    filtered() {
      let list = this.components;
      if (this.category) {
        const cat = this.category.toLowerCase();
        list = list.filter(c => c.categories?.some(x => x.toLowerCase().includes(cat)));
      }
      if (this.group) {
        const grp = this.group.toLowerCase();
        list = list.filter(c => c.groups?.some(x => x.toLowerCase().includes(grp)));
      }
      return list;
    },
    grouped() {
      const map = {};
      for (const c of this.filtered) {
        const cat = c.categories?.[0] || 'Uncategorized';
        if (!map[cat]) map[cat] = [];
        map[cat].push(c);
      }
      // Sort categories alphabetically, sort components within each category
      return Object.keys(map).sort().map(cat => ({
        category: cat,
        components: map[cat].sort((a, b) => a.name.localeCompare(b.name)),
      }));
    },
  },
  async mounted() {
    try {
      const res = await fetch(withBase('/meta/components.needle.json'));
      if (!res.ok) { this.error = 'Could not load component data'; return; }
      this.components = await res.json();
    } catch (e) {
      this.error = e.message;
    }
  },
};
</script>

<template>
  <div class="needle-components" v-if="grouped.length">
    <div v-for="g in grouped" :key="g.category" class="nc-group">
      <h3>{{ g.category }} <span class="nc-count">({{ g.components.length }})</span></h3>
      <div class="nc-list">
        <div v-for="c in g.components" :key="c.name" class="nc-item">
          <div class="nc-item-header">
            <strong>{{ c.name }}</strong>
          </div>
          <p v-if="c.comment?.shortText" class="nc-desc">{{ c.comment.shortText }}</p>
          <div v-if="details && c.children?.length" class="nc-props">
            <table>
              <thead><tr><th>Property</th><th>Type</th><th>Description</th></tr></thead>
              <tbody>
                <tr v-for="child in c.children" :key="child.name">
                  <td><code>{{ child.name }}</code></td>
                  <td><code>{{ child.type }}</code></td>
                  <td>{{ child.comment?.shortText || '' }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else-if="error" class="nc-error">{{ error }}</div>
  <div v-else class="nc-loading">Loading components...</div>
</template>

<style scoped>
.nc-group h3 {
  margin-top: 1.5em;
  border-bottom: 1px solid var(--c-border);
  padding-bottom: 0.3em;
}
.nc-count {
  font-weight: normal;
  opacity: 0.6;
  font-size: 0.85em;
}
.nc-item {
  padding: 0.5em 0;
  border-bottom: 1px solid var(--c-border-dark, #eee);
}
.nc-item-header {
  display: flex;
  align-items: center;
  gap: 0.5em;
}
.nc-desc {
  margin: 0.2em 0 0;
  font-size: 0.9em;
  opacity: 0.85;
}
.nc-props table {
  width: 100%;
  font-size: 0.85em;
  margin-top: 0.4em;
}
.nc-props th {
  text-align: left;
  border-bottom: 2px solid var(--c-border);
  padding: 0.2em 0.4em;
}
.nc-props td {
  padding: 0.2em 0.4em;
  border-bottom: 1px solid var(--c-border);
}
.nc-error { color: var(--c-danger, #cc0000); }
.nc-loading { opacity: 0.6; font-style: italic; }
</style>
