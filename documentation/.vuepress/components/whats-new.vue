<script setup>
import { computed } from 'vue'
import highlightsData from '../data/whats-new.json'

const props = defineProps({
  maxItems: { type: Number, default: 4 },
})

const highlights = computed(() => {
  return [...highlightsData.highlights]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, props.maxItems)
})

const featured = computed(() => highlights.value[0] || null)
const rest = computed(() => highlights.value.slice(1))
</script>

<template>
  <section class="whats-new" v-if="highlights.length > 0">
    <whats-new-card
      v-if="featured"
      :key="featured.id"
      v-bind="featured"
      :featured="true"
    />

    <whats-new-card
      v-for="item in rest"
      :key="item.id"
      v-bind="item"
      :featured="false"
    />
  </section>
</template>

<style scoped>
.whats-new {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}
</style>
