<script setup>
import { computed } from 'vue'
import { withBase } from 'vuepress/client'

const props = defineProps({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String, required: true },
  video: { type: String, default: '' },
  image: { type: String, default: '' },
  badge: { type: String, default: '' },
  badgeColor: { type: String, default: '' },
  date: { type: String, required: true },
  version: { type: String, default: '' },
  featured: { type: Boolean, default: false },
})

const formattedDate = computed(() => {
  const d = new Date(props.date)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
})

const isYouTube = computed(() =>
  props.video?.includes('youtube.com') || props.video?.includes('youtu.be')
)

const youtubeVideoId = computed(() => {
  if (!props.video || !isYouTube.value) return ''
  try {
    const url = new URL(props.video)
    return url.searchParams.get('v') || url.pathname.split('/').pop() || ''
  } catch {
    return ''
  }
})

const youtubeEmbedUrl = computed(() => {
  if (!youtubeVideoId.value) return ''
  return `https://www.youtube.com/embed/${youtubeVideoId.value}?modestbranding=1&rel=0`
})

const youtubeThumbnail = computed(() => {
  if (!youtubeVideoId.value) return ''
  return `https://img.youtube.com/vi/${youtubeVideoId.value}/maxresdefault.jpg`
})

const thumbnailSrc = computed(() => {
  if (props.image) return props.image
  if (youtubeVideoId.value) return youtubeThumbnail.value
  return ''
})

const hasMedia = computed(() => !!props.video || !!props.image)

const resolvedLink = computed(() => withBase(props.link))
</script>

<template>
  <!-- Featured (big) card -->
  <a v-if="featured" :href="resolvedLink" class="whats-new-card featured" :class="{ 'has-media': hasMedia }">
    <span v-if="badge" class="badge" :style="badgeColor ? { backgroundColor: badgeColor } : {}">
      {{ badge }}
    </span>

    <div v-if="hasMedia" class="card-media">
      <ClientOnly>
        <iframe
          v-if="isYouTube"
          :src="youtubeEmbedUrl"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          loading="lazy"
        />
      </ClientOnly>

      <video
        v-if="video && !isYouTube"
        :src="video"
        autoplay loop muted playsinline
        loading="lazy"
      />

      <img
        v-if="image && !video"
        :src="image"
        :alt="title"
        loading="lazy"
      />
    </div>

    <div class="card-content">
      <h3 class="card-title">{{ title }}</h3>
      <p class="card-description">{{ description }}</p>
      <div class="card-meta">
        <span class="card-date">{{ formattedDate }}</span>
        <span v-if="version" class="card-version">v{{ version }}</span>
      </div>
    </div>
  </a>

  <!-- Compact card -->
  <a v-else :href="resolvedLink" class="whats-new-card compact">
    <img
      v-if="thumbnailSrc"
      :src="thumbnailSrc"
      :alt="title"
      class="compact-thumb"
      loading="lazy"
    />

    <div class="compact-content">
      <span class="compact-title">{{ title }}</span>
      <span v-if="badge" class="compact-badge" :style="badgeColor ? { backgroundColor: badgeColor } : {}">{{ badge }}</span>
      <br/>
      <span class="compact-description">{{ description }}</span>
      <br/>
      <span class="card-meta">
        <span class="card-date">{{ formattedDate }}</span>
        <span v-if="version" class="card-version">v{{ version }}</span>
      </span>
    </div>
  </a>
</template>

<style scoped>
/* ── Shared ── */
.whats-new-card {
  position: relative;
  display: flex;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.5);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  text-decoration: none !important;
  color: var(--c-text) !important;
  transition: box-shadow 0.3s ease, transform 0.3s ease, background 0.3s ease;
}

.whats-new-card:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.8);
  text-decoration: none !important;
  color: var(--c-text) !important;
}

.card-meta {
  display: flex;
  gap: 0.75rem;
  font-size: 0.8rem;
  opacity: 0.6;
}

.card-version {
  font-family: monospace;
}

/* ── Featured (big) card ── */
.whats-new-card.featured {
  flex-direction: row;
}

.whats-new-card.featured .card-media {
  flex: 1.2;
  min-height: 280px;
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: #111;
}

.whats-new-card.featured .card-media iframe,
.whats-new-card.featured .card-media video,
.whats-new-card.featured .card-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.whats-new-card.featured .card-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
}

.whats-new-card.featured .card-title {
  margin: 0 0 0.5rem;
  font-size: 1.5rem;
  font-weight: 600;
  border: none;
  line-height: 1.3;
}

.whats-new-card.featured .card-description {
  margin: 0 0 0.75rem;
  font-size: 1.05rem;
  line-height: 1.5;
  opacity: 0.85;
}

.badge {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: var(--c-brand, #99CC33);
  color: #000;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 0.2rem 0.65rem;
  border-radius: 2rem;
  z-index: 2;
  line-height: 1.4;
}

/* ── Compact card ── */
.whats-new-card.compact {
  flex-direction: row;
  align-items: center;
  padding: 0.5rem;
  gap: 0.75rem;
}

.compact-thumb {
  width: 120px;
  height: 120px;
  border-radius: 0.5rem;
  object-fit: cover;
  flex-shrink: 0;
  display: block;
}

.compact-content {
  flex: 1;
  min-width: 0;
  line-height: 1.3;
}

.compact-title {
  font-size: 1rem;
  font-weight: 600;
  margin-right: 0.4rem;
}

.compact-badge {
  background: var(--c-brand, #99CC33);
  color: #000;
  font-size: 0.55rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 0.1rem 0.4rem;
  border-radius: 2rem;
  vertical-align: middle;
}

.compact-description {
  display: block;
  font-size: 0.85rem;
  line-height: 1.3;
  opacity: 0.75;
}

/* ── Responsive ── */
@media (max-width: 1023px) {
  .whats-new-card.featured {
    flex-direction: column;
  }

  .whats-new-card.featured .card-media {
    min-height: auto;
  }

  .whats-new-card.featured .card-content {
    padding: 1.5rem;
  }
}

@media (max-width: 600px) {
  .compact-thumb {
    width: 100px;
    height: 100px;
  }
}

</style>

<style>
/* ── Dark mode (unscoped so html selector works) ── */
html[data-theme='dark'] .whats-new-card {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.1);
  color: var(--c-text) !important;
}

html[data-theme='dark'] .whats-new-card:hover {
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  color: var(--c-text) !important;
}

html[data-theme='dark'] .whats-new-card .card-media {
  background: #000;
}
</style>
