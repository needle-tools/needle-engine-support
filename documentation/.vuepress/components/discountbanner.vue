<script setup lang="ts">

defineProps({
    fallback_image: String,
})

import { ref, nextTick } from 'vue';

// Needle "What's New" feed (supersedes the old cloud discounts endpoint).
// Docs: GET https://marketer.needle.tools/api/whats-new
type FeedItem = {
    id: string,
    banner: {
        title: string,
        subtitle: string,
        cta?: string,
    }
    url: string | null,
    colors?: string[],
    priority?: number,
}

const discount = ref<FeedItem | null>(null);
const bannerEl = ref<HTMLElement | null>(null);
let style = ref("");

// The slot reports where it showed; matches the `surface` we query the feed with.
const SURFACE = typeof window !== "undefined"
    ? window.location.hostname + window.location.pathname
    : "";

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

// ── Engagement tracking (impression + hover) ──────────────────────────────────
// Clicks are already counted server-side by using the feed's `url` (the /r/ click
// redirect) as the CTA href, so we must NOT call needleWhatsNew.click(). We only add
// impression + hover here via the shared tracker, as documented for custom/rotating
// renderers ("mode B"). Per-session dedup + the COEP-safe beacon are handled for us.
function loadTracker() {
    if (typeof document === "undefined") return;
    if (document.querySelector("script[data-needle-whatsnew-tracker]")) return;
    const s = document.createElement("script");
    s.defer = true;
    s.src = "https://marketer.needle.tools/whatsnew.js";
    s.dataset.surface = SURFACE;
    s.setAttribute("data-needle-whatsnew-tracker", "");
    document.head.appendChild(s);
}

// The tracker script loads async; wait for the imperative API before calling it.
function whenTrackerReady(cb: (api: any) => void, tries = 50) {
    const api = (window as any).needleWhatsNew;
    if (api) return cb(api);
    if (tries <= 0) return;
    window.setTimeout(() => whenTrackerReady(cb, tries - 1), 200);
}

let impressionSent = false;
function trackImpression(id: string) {
    if (impressionSent) return;
    impressionSent = true;
    whenTrackerReady(api => api.impression?.(id, { surface: SURFACE }));
}

// Fire the impression only once the banner is actually scrolled into view.
function observeImpression() {
    const el = bannerEl.value;
    const item = discount.value;
    if (!el || !item) return;
    if (typeof IntersectionObserver === "undefined") { trackImpression(item.id); return; }
    const io = new IntersectionObserver(entries => {
        for (const e of entries) {
            if (e.isIntersecting) { trackImpression(item.id); io.disconnect(); break; }
        }
    }, { threshold: 0.5 });
    io.observe(el);
}

let hoverSent = false;
let hoverTimer: number | undefined;
function onPointerEnter() {
    const item = discount.value;
    if (!item || hoverSent) return;
    // Count a *sustained* hover only (~500ms dwell), not a scroll-by.
    hoverTimer = window.setTimeout(() => {
        hoverSent = true;
        whenTrackerReady(api => api.hover?.(item.id, { surface: SURFACE }));
    }, 500);
}
function onPointerLeave() {
    if (hoverTimer !== undefined) { window.clearTimeout(hoverTimer); hoverTimer = undefined; }
}

if (typeof window !== "undefined") {
    // `surface` lets the feed target by domain/path; an unset `license` shows upsell hints.
    // No `limit` -> the feed returns up to 20 ranked items and we pick one client-side.
    const params = new URLSearchParams({ surface: SURFACE });
    fetch(`https://marketer.needle.tools/api/whats-new?${params}`)
        .then(response => response.json())
        .then(data => {
            const items: FeedItem[] = Array.isArray(data.items) ? data.items : [];
            const value = pickWeighted(items);
            discount.value = value;
            style.value = subtleStyle(value?.colors);
            if (value) {
                loadTracker();
                nextTick(observeImpression);
            }
        })
        .catch(() => { /* banner is non-critical, ignore fetch errors */ });
}


</script>

<template>
    <div v-if="discount" ref="bannerEl" class="discount_banner" :style="style"
        @pointerenter="onPointerEnter" @pointerleave="onPointerLeave">
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
                transform: scale(1.03);
            }
        }
    }
}

/* Keep the optional motion tasteful and accessible. */
@media (prefers-reduced-motion: reduce) {
    .discount_banner .action a {
        transition: border-color 0.2s ease-in-out, color 0.2s ease-in-out;
    }

    .discount_banner .action a:hover {
        transform: none;
    }
}
</style>