<script>
export default {
  props: {
    // Comma-separated API symbols this step introduces, e.g. "Behaviour, update"
    symbols: { type: String, required: true },
  },
  computed: {
    items() {
      return this.symbols.split(',').map(s => s.trim()).filter(Boolean);
    },
  },
};
</script>

<template>
  <div class="wt-tags">
    <span class="wt-tags__label">Introduces</span>
    <ul class="wt-tags__list">
      <li v-for="symbol in items" :key="symbol">{{ symbol }}</li>
    </ul>
  </div>
</template>

<style scoped>
/*
  These name the API a step introduces, so the page can be scanned for "where is
  setActive taught".

  Accent-tinted now that the takeaway below is plain type with no rule of its
  own — there is no longer a second accented block for these to compete with.
  Spacing comes from flex `gap`; separator characters plus template whitespace
  produced visibly uneven gaps between items.
*/
.wt-tags {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.4rem 0.6rem;
  margin: 0.35rem 0 1rem;
}

.wt-tags__label {
  font-size: 0.88rem;
  opacity: 0.9;
}

.wt-tags__list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.wt-tags__list li {
  margin: 0;
  padding: 0.18em 0.5em;
  border: 1px solid color-mix(in srgb, var(--vp-c-accent, #826aed) 28%, transparent);
  border-radius: 0.4em;
  background: color-mix(in srgb, var(--vp-c-accent, #826aed) 10%, transparent);
  color: color-mix(in srgb, var(--vp-c-accent, #826aed) 75%, currentColor);
  font-family: var(--code-font-family, ui-monospace, monospace);
  font-size: 0.8rem;
  line-height: 1.5;
  white-space: nowrap;
}
</style>
