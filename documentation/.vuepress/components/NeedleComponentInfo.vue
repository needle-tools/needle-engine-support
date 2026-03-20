<script>
import { withBase } from 'vuepress/client'

export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    /** Show full details including properties. Default: true */
    details: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      component: null,
      error: null,
    };
  },
  async mounted() {
    try {
      const res = await fetch(withBase('/meta/components.needle.json'));
      if (!res.ok) { this.error = 'Could not load component data'; return; }
      const all = await res.json();
      this.component = all.find(c => c.name === this.name);
      if (!this.component) this.error = `Component "${this.name}" not found`;
    } catch (e) {
      this.error = e.message;
    }
  },
};
</script>

<template>
  <div class="needle-component" v-if="component">
    <div class="nc-header">
      <strong>{{ component.name }}</strong>
      <span v-if="component.categories?.length" class="nc-categories">
        <span class="nc-category" v-for="cat in component.categories" :key="cat">{{ cat }}</span>
      </span>
    </div>
    <p v-if="component.comment?.shortText" class="nc-description">{{ component.comment.shortText }}</p>
    <div v-if="component.inheritedFrom" class="nc-inherited">
      extends <code>{{ component.inheritedFrom }}</code>
    </div>
    <div v-if="details && component.children?.length" class="nc-properties">
      <table>
        <thead>
          <tr>
            <th>Property</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="child in component.children" :key="child.name">
            <td><code>{{ child.name }}</code></td>
            <td><code>{{ child.type }}</code></td>
            <td>{{ child.comment?.shortText || '' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div v-else-if="error" class="needle-component nc-error">{{ error }}</div>
  <div v-else class="needle-component nc-loading">Loading component data...</div>
</template>

<style scoped>
.needle-component {
  border: 1px solid var(--c-border);
  border-radius: 8px;
  padding: 1em;
  margin: 0.5em 0 1em;
}
.nc-header {
  display: flex;
  align-items: center;
  gap: 0.5em;
  flex-wrap: wrap;
}
.nc-categories {
  display: flex;
  gap: 0.3em;
}
.nc-category {
  font-size: 0.75em;
  padding: 0.15em 0.5em;
  border-radius: 4px;
  background: var(--c-brand-light, #3eaf7c33);
  color: var(--c-brand, #3eaf7c);
}
.nc-description {
  margin: 0.5em 0 0.25em;
}
.nc-inherited {
  font-size: 0.85em;
  opacity: 0.75;
  margin-bottom: 0.5em;
}
.nc-properties table {
  width: 100%;
  font-size: 0.9em;
  margin-top: 0.5em;
}
.nc-properties th {
  text-align: left;
  border-bottom: 2px solid var(--c-border);
  padding: 0.3em 0.5em;
}
.nc-properties td {
  padding: 0.3em 0.5em;
  border-bottom: 1px solid var(--c-border);
}
.nc-error {
  color: var(--c-danger, #cc0000);
}
.nc-loading {
  opacity: 0.6;
  font-style: italic;
}
</style>
