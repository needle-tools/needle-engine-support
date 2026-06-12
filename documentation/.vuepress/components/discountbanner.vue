<script setup lang="ts">

defineProps({
    fallback_image: String,
})

import { ref } from 'vue';

// Needle "What's New" feed (supersedes the old cloud discounts endpoint).
// Docs: GET https://marketer.needle.tools/api/whats-new
type FeedItem = {
    banner: {
        title: string,
        subtitle: string,
        cta?: string,
        css?: string,
    }
    url: string | null,
    colors?: string[],
    priority?: number,
}

const discount = ref<FeedItem | null>(null);
let style = ref("");

// Convert a #rgb / #rrggbb hint into an rgba() string so we can tint subtly.
function hexToRgba(hex: string, alpha: number): string | null {
    let h = hex.replace("#", "").trim();
    if (h.length === 3) h = h.split("").map(c => c + c).join("");
    if (h.length !== 6) return null;
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    if ([r, g, b].some(n => Number.isNaN(n))) return null;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Build a faint background tint from the feed's colour hints instead of applying
// the feed's full `banner.css` (which is a loud, high-contrast gradient).
function subtleStyle(colors?: string[]): string {
    const rgba = (colors ?? []).map(c => hexToRgba(c, 0.12)).filter(Boolean);
    if (rgba.length >= 2) return `background: linear-gradient(20deg, ${rgba[0]}, ${rgba[1]});`;
    if (rgba.length === 1) return `background: ${rgba[0]};`;
    return "";
}

// Pick one item per page load, weighted by priority so higher-priority hints show
// more often. The `+ 1` base weight ensures every eligible item still has a chance.
function pickWeighted(items: FeedItem[]): FeedItem | null {
    if (!items.length) return null;
    const weights = items.map(it => 1 + Math.max(typeof it.priority === "number" ? it.priority : 0, 0));
    const total = weights.reduce((a, b) => a + b, 0);
    let r = Math.random() * total;
    for (let i = 0; i < items.length; i++) {
        r -= weights[i];
        if (r < 0) return items[i];
    }
    return items[items.length - 1];
}

if (typeof window !== "undefined") {
    // `surface` lets the feed target by domain/path; an unset `license` shows upsell hints.
    // No `limit` -> the feed returns up to 20 ranked items and we pick one client-side.
    const params = new URLSearchParams({
        surface: window.location.hostname + window.location.pathname,
    });
    fetch(`https://marketer.needle.tools/api/whats-new?${params}`)
        .then(response => response.json())
        .then(data => {
            const items: FeedItem[] = Array.isArray(data.items) ? data.items : [];
            const value = pickWeighted(items);
            discount.value = value;
            style.value = subtleStyle(value?.colors);
        })
        .catch(() => { /* banner is non-critical, ignore fetch errors */ });
}


</script>

<template>
    <div v-if="discount" class="discount_banner" :style="style">
        <div class="content">
            <h2 class="main_text">{{ discount.banner.title }}</h2>
            <div class="text">{{ discount.banner.subtitle }}</div>
        </div>

        <div class="action" v-if="discount.url && discount.banner.cta">
            <a target="_blank" tabindex="-1" :href="discount.url">
                {{ discount.banner.cta }}
            </a>
        </div>
    </div>
    <div v-else-if="fallback_image" class="banner">
        <img :src="fallback_image" alt="Needle Engine banner" />
    </div>
</template>

<style scoped>
.banner {
    margin: 1rem 0;
}

.discount_banner {
    margin: 1rem 0;

    border-radius: 12px;
    border: 1px solid var(--c-border);
    line-height: initial !important;

    /* Subtle, neutral card by default; the inline style adds a faint colour tint. */
    background: var(--c-background-secondary);
    color: var(--c-text);

    @media screen and (max-width: 800px) {
        margin-left: 0;
    }

    transition: border-color 0.2s ease-in-out;

    &:hover {
        border-color: var(--c-brand);
    }

    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 1.5rem;

    text-align: start;

    padding: 1rem 1.25rem;

    & .content {
        display: flex;
        flex-direction: column;
        gap: 0.15rem;
        max-width: 60ch;
        user-select: none;

        &>* {
            text-decoration: none;
            border: none;
        }

        & .main_text {
            margin: 0;
            padding: 0;
            font-size: 1.35rem;
            font-weight: 700;
            line-height: 1.2em;
        }

        & .text {
            line-height: 1.3em;
            font-size: 0.9rem;
            color: var(--c-text-light, var(--c-text));
            opacity: 0.85;
        }
    }

    & .action {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        align-items: start;
        justify-content: start;

        & a {
            transition: all 0.2s ease-in-out;
            background: transparent;
            color: var(--c-text);
            border: 1px solid var(--c-border);
            outline: none;
            font-size: 0.9rem;
            border-radius: 8px;
            padding: .3rem .9rem;
            white-space: nowrap;

            &:hover {
                border-color: var(--c-brand);
                color: var(--c-brand);
            }
        }
    }
}
</style>