<script setup lang="ts">
import { onMounted } from 'vue'

defineProps<{ src?: string; alt?: string; dataAutoRotate?: string; dataEnvironment?: string }>()

const runtimeUrl = 'https://cdn.jsdelivr.net/npm/@needle-tools/image-3d@0.1.2/dist/img-3d.js'

onMounted(() => {
    void import(/* @vite-ignore */ runtimeUrl).catch(error => {
        console.warn('Image 3D preview unavailable', error)
    })
})
</script>

<template>
    <figure v-if="src" class="image-3d-example">
        <picture data-img-3d :data-auto-rotate="dataAutoRotate" :data-environment="dataEnvironment">
            <img :src="src" :alt="alt ?? 'Image 3D example'" loading="lazy" data-orbit-fit="fixed">
        </picture>
    </figure>
</template>

<style scoped>
:global(.image-3d-gallery) {
    container: image-3d-gallery / inline-size;
    margin-block: 1rem;
}

:global(.image-3d-gallery-grid) {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 184px));
    gap: 0.75rem;
}

@container image-3d-gallery (min-width: 700px) {
    :global(.image-3d-gallery-grid) {
        grid-template-columns: repeat(4, minmax(0, 184px));
    }
}

.image-3d-example {
    width: min(100%, 184px);
    aspect-ratio: 3 / 2;
    overflow: hidden;
    border-radius: 12px;
    background: color-mix(in srgb, var(--vp-c-bg-soft, #f2f4f2) 60%, transparent);
    border: 1px solid color-mix(in srgb, var(--vp-c-border, #a0a4a0) 45%, transparent);
    box-shadow: 0 2px 14px rgb(0 0 0 / 4%);
    box-sizing: border-box;
    margin: 0;
}

.image-3d-example picture {
    display: block;
    height: 100%;
}

.image-3d-example img {
    display: block;
    width: 100%;
    max-width: 100%;
    height: 100%;
    object-fit: contain;
}
</style>
