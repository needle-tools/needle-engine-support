<script>
import { withBase } from 'vuepress/client'

export default {
  props: {
    category: {
      type: String,
      default: '',
    },
    group: {
      type: String,
      default: '',
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
      return Object.keys(map).sort().map(cat => ({
        category: cat,
        components: map[cat].sort((a, b) => a.name.localeCompare(b.name)),
      }));
    },
  },
  methods: {
    apiUrl(name) {
      return `https://engine.needle.tools/docs/api/${name}`;
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
    <div v-for="g in grouped" :key="g.category">
      <h3>{{ g.category }}</h3>
      <table>
        <thead>
          <tr><th>Component</th><th>Description</th></tr>
        </thead>
        <tbody>
          <tr v-for="c in g.components" :key="c.name">
            <td><a :href="apiUrl(c.name)" target="_blank"><code>{{ c.name }}</code></a></td>
            <td>{{ c.comment?.shortText || '' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div v-else-if="error" style="color: var(--c-danger, #cc0000);">{{ error }}</div>
  <div v-else style="opacity: 0.6; font-style: italic;">Loading components...</div>
</template>

<style scoped>

/* Match the first-child column to the markdown tables */
td:first-child {
  white-space: nowrap;
}
td a {
  text-decoration: none;
}
td a:hover {
  text-decoration: underline;
}
</style>
