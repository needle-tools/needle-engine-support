<script setup lang="ts">
/**
 * The docs search box, backed by Needle Search instead of Algolia DocSearch.
 *
 * The name is a contract with the default theme: VPNavbar renders a global
 * component called `SearchBox` if one exists, which is how the docsearch plugin
 * used to get into the navbar. registerComponentsPlugin derives the name from
 * the filename, so this file must stay `SearchBox.vue` to appear at all.
 *
 * Unlike a keyword index, the API runs an embedding search on every call and
 * takes a few seconds, and it is rate limited to 10 requests per minute per IP.
 * Both rule out search-as-you-type: queries only go out on submit, results are
 * cached for the session, and the waiting state is explicit about what is
 * happening rather than pretending to be instant.
 */
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useTemplateRef, watch } from 'vue'
import { useRouter } from 'vuepress/client'
import {
  DOCS_SOURCE_BOOST,
  DOCS_SOURCE_ID,
  SEARCH_BASE,
  SearchError,
  askAiUrl,
  semanticSearch,
  type SearchResult,
} from '../search-api'

const RECENT_KEY = 'needle-search-recent'
const MAX_RECENT = 6
/** How long to wait before admitting the search is taking a while. */
const SLOW_AFTER_MS = 2500

const router = useRouter()

const open = ref(false)
const query = ref('')
const results = ref<SearchResult[]>([])
/** The query the current `results` belong to — the input keeps changing, they do not. */
const submitted = ref('')
const loading = ref(false)
const slow = ref(false)
const error = ref<string | null>(null)
const rateLimited = ref(false)
const durationMs = ref<number | null>(null)
const activeIndex = ref(0)
const recent = ref<string[]>([])

const inputEl = useTemplateRef<HTMLInputElement>('input')
const listEl = useTemplateRef<HTMLElement>('list')

/**
 * Repeat queries are the norm in docs search — the same person reopens the modal
 * to re-find the page they just closed. A session cache turns that from another
 * multi-second round trip into an instant result, and spares the rate limit.
 */
const cache = new Map<string, { results: SearchResult[]; durationMs?: number }>()

let controller: AbortController | null = null
let slowTimer: ReturnType<typeof setTimeout> | null = null

// ── result presentation ───────────────────────────────────────────────────────

/**
 * Most hits title themselves after their source ("Needle Engine Docs"), which
 * makes every row in the list look identical. The URL carries the page identity,
 * so fall back to it whenever the title adds nothing.
 */
const displayTitle = (r: SearchResult): string => {
  const title = (r.title ?? '').trim()
  if (title && title !== (r.source ?? '').trim()) return title

  const segments = pathSegments(r.url)
  const last = segments[segments.length - 1]
  if (last) {
    return last
      .replace(/\.(html?|md|txt)$/i, '')
      .replace(/[-_]+/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase())
  }
  return title || r.source || 'Untitled'
}

const pathSegments = (url?: string): string[] => {
  if (!url) return []
  try {
    return new URL(url).pathname.split('/').filter(Boolean)
  } catch {
    return []
  }
}

/**
 * Where the hit lives, so two similarly named pages stay tellable apart.
 * Segments keep their hyphens — "how-to-guides" reads as the path it is,
 * where "how to guides" reads as a typo.
 */
const breadcrumb = (r: SearchResult): string => {
  const segments = pathSegments(r.url)
    .filter(s => s !== 'docs')
    .map(s => s.replace(/\.(html?|md|txt)$/i, ''))
  return segments.slice(0, 3).join(' › ')
}

/**
 * The index spans more than the docs site, so each row says where it came from.
 * The full source names are too long for a badge and all start the same way.
 */
const SOURCE_LABELS: Record<string, string> = {
  'Needle Engine Docs': 'Docs',
  'Needle Engine API': 'API',
  'Needle Engine Package': 'Source',
  'Needle Discord Server': 'Discord',
  'Needle Engine Forum': 'Forum',
  'Needle Cloud': 'Cloud',
  'Needle Sandbox': 'Sandbox',
  'Needle Engine Skill': 'AI Skill',
  'Needle Blender Addon': 'Blender',
}

const sourceLabel = (r: SearchResult): string => {
  const source = (r.source ?? '').trim()
  if (!source) return 'Needle'
  return SOURCE_LABELS[source] ?? source.replace(/^Needle\s+/, '')
}

const escapeHtml = (text: string): string =>
  text.replace(
    /[&<>"']/g,
    c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!,
  )

const escapeRegExp = (text: string): string => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/**
 * Excerpts arrive as raw markdown — headings, fences and link syntax included.
 * Rendered verbatim they read as noise, so flatten them to prose.
 */
const excerpt = (r: SearchResult): string => {
  const raw = (r.content ?? '').trim()
  if (!raw) return ''

  const cleaned = raw
    .replace(/```[\s\S]*?(```|$)/g, ' ')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[*_`>]/g, '')
    .replace(/\s+/g, ' ')
    .trim()

  // A code-only hit is all fences; better to show the code than nothing.
  const text = cleaned || raw.replace(/\s+/g, ' ').trim()
  return text.length > 260 ? `${text.slice(0, 260).replace(/\s+\S*$/, '')}…` : text
}

/**
 * Marking these lights up half of every excerpt without pointing at anything —
 * questions are mostly made of them.
 */
const STOP_WORDS = new Set([
  'and', 'are', 'but', 'can', 'does', 'for', 'from', 'get', 'has', 'have', 'how',
  'not', 'that', 'the', 'them', 'then', 'there', 'they', 'this', 'use', 'using',
  'want', 'was', 'what', 'when', 'where', 'which', 'why', 'with', 'you', 'your',
])

/**
 * Marks query terms in the excerpt. Splits on the raw text and escapes each
 * piece afterwards, so a term can never match inside an entity we just wrote.
 * The index carries forum and Discord text, so nothing here reaches v-html
 * unescaped.
 */
const highlight = (text: string, q: string): string => {
  const terms = q
    .split(/\s+/)
    .map(t => t.replace(/[^\p{L}\p{N}_-]/gu, '').toLowerCase())
    .filter(t => t.length > 2 && !STOP_WORDS.has(t))
    .slice(0, 8)
    .map(escapeRegExp)

  if (!terms.length) return escapeHtml(text)

  // Anchored at the start of a word only: "export" should still light up
  // "exporting", but "how" has no business marking the middle of "showGizmo".
  const parts = text.split(new RegExp(`\\b(${terms.join('|')})`, 'gi'))
  // String.split with a capturing group puts the matches at the odd indices.
  return parts
    .map((part, i) => (i % 2 ? `<mark>${escapeHtml(part)}</mark>` : escapeHtml(part)))
    .join('')
}

const durationLabel = computed(() =>
  durationMs.value == null ? '' : `${(durationMs.value / 1000).toFixed(1)}s`,
)

// ── searching ─────────────────────────────────────────────────────────────────

/**
 * Rybbit analytics for docs searches. Same guarded pattern as
 * walkthrough-step.vue: an ad blocker leaves window.rybbit undefined, and
 * analytics must never break search. The server logs its own semantic_search
 * events; this one adds the docs-site view — what people search for here,
 * how often nothing comes back, and how long they waited.
 */
const trackSearch = (props: {
  query: string
  results: number
  durationMs?: number | null
  cached?: boolean
  error?: string
}) => {
  try {
    ;(window as any).rybbit?.event?.('Docs Search', {
      query: props.query.slice(0, 200),
      results: props.results,
      ...(typeof props.durationMs === 'number' ? { durationMs: Math.round(props.durationMs) } : {}),
      ...(props.cached ? { cached: true } : {}),
      ...(props.error ? { error: props.error.slice(0, 200) } : {}),
    })
  } catch {
    /* analytics only */
  }
}

const resetTransient = () => {
  error.value = null
  rateLimited.value = false
  slow.value = false
  if (slowTimer) {
    clearTimeout(slowTimer)
    slowTimer = null
  }
}

const search = async (raw: string) => {
  const q = raw.trim()
  if (!q) return

  controller?.abort()
  resetTransient()
  submitted.value = q
  activeIndex.value = 0
  rememberQuery(q)

  const cached = cache.get(q)
  if (cached) {
    results.value = cached.results
    durationMs.value = cached.durationMs ?? null
    loading.value = false
    trackSearch({ query: q, results: cached.results.length, cached: true })
    return
  }

  controller = new AbortController()
  const signal = controller.signal
  loading.value = true
  results.value = []
  durationMs.value = null
  slowTimer = setTimeout(() => {
    slow.value = true
  }, SLOW_AFTER_MS)

  try {
    // Docs-first ranking for the docs site's own search box; HyDE off because
    // docs-box queries are keyword-shaped and the skip saves seconds per query.
    // Question-shaped searches have the "Ask Needle AI" hand-off below the results.
    const response = await semanticSearch(q, {
      signal,
      boosts: { [DOCS_SOURCE_ID]: DOCS_SOURCE_BOOST },
      skipHyde: true,
    })
    if (signal.aborted) return
    results.value = response.results
    durationMs.value = response.durationMs ?? null
    cache.set(q, { results: response.results, durationMs: response.durationMs })
    trackSearch({ query: q, results: response.results.length, durationMs: response.durationMs })
  } catch (err) {
    if (signal.aborted) return
    if (err instanceof SearchError) {
      error.value = err.message
      rateLimited.value = err.rateLimited
    } else {
      error.value = err instanceof Error ? err.message : String(err)
    }
    trackSearch({ query: q, results: -1, error: error.value ?? 'unknown' })
  } finally {
    if (!signal.aborted) {
      loading.value = false
      if (slowTimer) {
        clearTimeout(slowTimer)
        slowTimer = null
      }
    }
  }
}

const submit = () => search(query.value)

// ── recent queries ────────────────────────────────────────────────────────────

const loadRecent = () => {
  try {
    const stored = JSON.parse(localStorage.getItem(RECENT_KEY) ?? '[]')
    recent.value = Array.isArray(stored) ? stored.filter(s => typeof s === 'string') : []
  } catch {
    recent.value = []
  }
}

const rememberQuery = (q: string) => {
  recent.value = [q, ...recent.value.filter(entry => entry !== q)].slice(0, MAX_RECENT)
  try {
    localStorage.setItem(RECENT_KEY, JSON.stringify(recent.value))
  } catch {
    // Private mode or a full quota — recents are a nicety, not worth failing over.
  }
}

const clearRecent = () => {
  recent.value = []
  try {
    localStorage.removeItem(RECENT_KEY)
  } catch {
    /* see above */
  }
}

// ── opening, closing, navigating ──────────────────────────────────────────────

const openSearch = () => {
  if (open.value) return
  open.value = true
  loadRecent()
  nextTick(() => inputEl.value?.focus())
}

const closeSearch = () => {
  if (!open.value) return
  open.value = false
  controller?.abort()
  controller = null
  resetTransient()
  loading.value = false
}

const toggle = () => (open.value ? closeSearch() : openSearch())

/**
 * Hits deep-link with a `#:~:text=` fragment directive, which scrolls to and
 * highlights the exact passage — but only the browser can apply it, and only on
 * a real navigation. So a text directive means a full load; anything else stays
 * in the SPA. Cross-origin hits (forum, Discord, npm, and every docs link while
 * developing on localhost) open in a new tab.
 */
const go = (r: SearchResult, event?: MouseEvent) => {
  const href = r.url
  if (!href) return
  // Let the browser handle modified clicks — open in new tab, new window, download.
  if (event && (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0)) {
    return
  }
  event?.preventDefault()

  let url: URL
  try {
    url = new URL(href)
  } catch {
    return
  }

  if (url.origin !== window.location.origin) {
    window.open(url.href, '_blank', 'noopener,noreferrer')
    closeSearch()
    return
  }

  closeSearch()
  if (url.hash.includes(':~:text=')) {
    window.location.assign(url.href)
  } else {
    router.push(url.pathname + url.search + url.hash)
  }
}

const askAi = () => {
  const q = query.value.trim() || submitted.value
  if (!q) return
  window.open(askAiUrl(q), '_blank', 'noopener,noreferrer')
}

// ── keyboard ──────────────────────────────────────────────────────────────────

const isTypingTarget = (target: EventTarget | null): boolean => {
  const el = target as HTMLElement | null
  if (!el?.tagName) return false
  return (
    el.tagName === 'INPUT' ||
    el.tagName === 'TEXTAREA' ||
    el.tagName === 'SELECT' ||
    el.isContentEditable
  )
}

const move = (delta: number) => {
  if (!results.value.length) return
  const count = results.value.length
  activeIndex.value = (activeIndex.value + delta + count) % count
  nextTick(() => {
    listEl.value
      ?.querySelector('.needle-search-result.is-active')
      ?.scrollIntoView({ block: 'nearest' })
  })
}

/**
 * One window-level handler covers both states. Listening on the modal element
 * would miss every key pressed while focus sits outside it — right after a click
 * on the backdrop, say — which is exactly when Escape needs to work.
 */
const onKeydown = (event: KeyboardEvent) => {
  if (!open.value) {
    const isShortcut =
      (event.key === 'k' && (event.metaKey || event.ctrlKey)) ||
      (event.key === '/' && !event.metaKey && !event.ctrlKey && !event.altKey)
    if (!isShortcut) return
    // "/" is a plain character while someone is writing in a field.
    if (event.key === '/' && isTypingTarget(event.target)) return
    event.preventDefault()
    openSearch()
    return
  }

  switch (event.key) {
    case 'Escape':
      event.preventDefault()
      closeSearch()
      break
    case 'ArrowDown':
      event.preventDefault()
      move(1)
      break
    case 'ArrowUp':
      event.preventDefault()
      move(-1)
      break
    case 'Enter': {
      event.preventDefault()
      const active = results.value[activeIndex.value]
      // Enter submits what was typed; once results are up it opens the highlighted one.
      if (active && query.value.trim() === submitted.value) go(active)
      else submit()
      break
    }
  }
}

// ── lifecycle ─────────────────────────────────────────────────────────────────

/**
 * PageNav hides itself behind `.needle-search-active`, and the page must not
 * scroll under the modal.
 */
watch(open, isOpen => {
  document.body.classList.toggle('needle-search-active', isOpen)
  document.body.style.overflow = isOpen ? 'hidden' : ''
})

// Close on navigation, so following a result never leaves the modal hanging over
// the page it just opened.
watch(
  () => router.currentRoute.value.fullPath,
  () => closeSearch(),
)

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
  loadRecent()

  // The first query pays for DNS and TLS otherwise, on top of an already slow
  // round trip. Warm the connection while the browser is idle instead.
  const warm = () => {
    if (document.head.querySelector('#needle-search-preconnect')) return
    const link = document.createElement('link')
    link.id = 'needle-search-preconnect'
    link.rel = 'preconnect'
    link.href = SEARCH_BASE
    link.crossOrigin = ''
    document.head.appendChild(link)
  }
  if ('requestIdleCallback' in window) window.requestIdleCallback(warm)
  else setTimeout(warm, 1000)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  controller?.abort()
  if (slowTimer) clearTimeout(slowTimer)
  document.body.classList.remove('needle-search-active')
  document.body.style.overflow = ''
})
</script>

<template>
  <div class="needle-search">
    <button
      type="button"
      class="needle-search-button"
      aria-label="Search Needle docs"
      @click="toggle"
    >
      <span class="needle-search-button-icon needle-search-icon">search</span>
      <span class="needle-search-button-label">Search</span>
    </button>

    <ClientOnly>
      <Teleport to="body">
        <Transition name="needle-search-fade">
          <div
            v-if="open"
            class="needle-search-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Search Needle docs"
            @click.self="closeSearch"
          >
            <div class="needle-search-modal">
              <form class="needle-search-form" @submit.prevent="submit">
                <span class="needle-search-form-icon needle-search-icon">search</span>
                <input
                  ref="input"
                  v-model="query"
                  type="search"
                  class="needle-search-input"
                  placeholder="Ask anything about Needle…"
                  autocomplete="off"
                  autocorrect="off"
                  autocapitalize="off"
                  spellcheck="false"
                  enterkeyhint="search"
                />
                <button
                  v-if="query"
                  type="button"
                  class="needle-search-clear needle-search-icon"
                  aria-label="Clear search"
                  @click="query = ''"
                >
                  close
                </button>
                <button type="submit" class="needle-search-submit" :disabled="!query.trim() || loading">
                  {{ loading ? 'Searching…' : 'Search' }}
                </button>
              </form>

              <div ref="list" class="needle-search-body">
                <!-- Waiting. Every query is an embedding search, so this is seconds, not
                     milliseconds — say so rather than let it read as a hang. -->
                <div v-if="loading" class="needle-search-status">
                  <div class="needle-search-spinner" />
                  <p class="needle-search-status-text">Searching the Needle knowledge base…</p>
                  <p v-if="slow" class="needle-search-hint">
                    Semantic search reads the whole index — this takes a few seconds.
                  </p>
                </div>

                <div v-else-if="error" class="needle-search-status">
                  <span class="needle-search-status-icon needle-search-icon">
                    {{ rateLimited ? 'hourglass_top' : 'error_outline' }}
                  </span>
                  <p class="needle-search-status-text">{{ error }}</p>
                  <p v-if="rateLimited" class="needle-search-hint">
                    The public search API allows 10 requests per minute.
                  </p>
                  <button type="button" class="needle-search-retry" @click="search(submitted)">
                    Try again
                  </button>
                </div>

                <template v-else-if="submitted">
                  <ul v-if="results.length" class="needle-search-results">
                    <li v-for="(r, i) in results" :key="`${r.url}-${i}`">
                      <a
                        class="needle-search-result"
                        :class="{ 'is-active': i === activeIndex }"
                        :href="r.url"
                        @mouseenter="activeIndex = i"
                        @click="go(r, $event)"
                      >
                        <div class="needle-search-result-head">
                          <span class="needle-search-result-title">{{ displayTitle(r) }}</span>
                          <span class="needle-search-result-badge">{{ sourceLabel(r) }}</span>
                        </div>
                        <div v-if="breadcrumb(r)" class="needle-search-result-path">
                          {{ breadcrumb(r) }}
                        </div>
                        <!-- eslint-disable-next-line vue/no-v-html -- escaped in highlight() -->
                        <p
                          v-if="excerpt(r)"
                          class="needle-search-result-excerpt"
                          v-html="highlight(excerpt(r), submitted)"
                        />
                      </a>
                    </li>
                  </ul>

                  <div v-else class="needle-search-status">
                    <span class="needle-search-status-icon needle-search-icon">search_off</span>
                    <p class="needle-search-status-text">No results for “{{ submitted }}”.</p>
                    <p class="needle-search-hint">
                      Try describing the problem in a sentence — the index matches meaning, not
                      keywords.
                    </p>
                  </div>

                  <button
                    type="button"
                    class="needle-search-ask"
                    data-rybbit-event="Docs Search Ask AI"
                    @click="askAi"
                  >
                    <span class="needle-search-icon">smart_toy</span>
                    Ask Needle AI about “{{ submitted }}”
                  </button>
                </template>

                <!-- Idle. Nothing has been searched yet this session. -->
                <template v-else>
                  <div v-if="recent.length" class="needle-search-recent">
                    <div class="needle-search-section-head">
                      <span>Recent</span>
                      <button type="button" class="needle-search-linkish" @click="clearRecent">
                        Clear
                      </button>
                    </div>
                    <ul>
                      <li v-for="entry in recent" :key="entry">
                        <button
                          type="button"
                          class="needle-search-recent-item"
                          @click="query = entry; search(entry)"
                        >
                          <span class="needle-search-icon">history</span>
                          {{ entry }}
                        </button>
                      </li>
                    </ul>
                  </div>

                  <div v-else class="needle-search-status">
                    <span class="needle-search-status-icon needle-search-icon">manage_search</span>
                    <p class="needle-search-status-text">
                      Search documentation, API reference, the forum, Discord and Needle source.
                    </p>
                    <p class="needle-search-hint">
                      Ask in your own words — “how do I export an animation from Blender”.
                    </p>
                  </div>
                </template>
              </div>

              <footer class="needle-search-footer">
                <div class="needle-search-keys">
                  <kbd>↑</kbd><kbd>↓</kbd><span>navigate</span>
                  <kbd>↵</kbd><span>open</span>
                  <kbd>esc</kbd><span>close</span>
                </div>
                <div class="needle-search-credit">
                  <span v-if="results.length && durationLabel">
                    {{ results.length }} results in {{ durationLabel }} ·
                  </span>
                  <a :href="SEARCH_BASE" target="_blank" rel="noopener">Needle Search</a>
                </div>
              </footer>
            </div>
          </div>
        </Transition>
      </Teleport>
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.needle-search {
  display: flex;
  align-items: center;
  margin-inline-start: 0.6rem;
}

.needle-search-button {
  display: flex;
  align-items: center;
  gap: 0.35rem;

  height: 2rem;
  padding: 0 0.7rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 999px;

  background: var(--vp-c-control);
  color: var(--vp-c-text-mute);

  font-family: inherit;
  font-size: 0.85rem;
  line-height: 1;

  cursor: pointer;
  transition:
    background-color 0.2s,
    border-color 0.2s,
    color 0.2s;

  &:hover {
    background: var(--vp-c-control-hover);
    border-color: var(--vp-c-border-hard);
    color: var(--vp-c-text);
  }
}

.needle-search-button-icon {
  font-size: 1.1rem;
}

@media screen and (max-width: 719px) {
  // Just the icon once the navbar gets tight.
  .needle-search-button-label {
    display: none;
  }

  .needle-search-button {
    padding: 0 0.45rem;
  }
}

// Deliberately not the shared `.material-icon` class from material-icon.vue —
// that one is scoped to its component, and reusing the name here would leak a
// global rule out of a component that has no business defining one.
.needle-search-icon {
  font-family: 'Material Symbols Outlined';
  font-weight: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  white-space: nowrap;
  direction: ltr;
  -webkit-font-feature-settings: 'liga';
  -webkit-font-smoothing: antialiased;
}

// ── modal ────────────────────────────────────────────────────────────────────

.needle-search-overlay {
  position: fixed;
  inset: 0;
  z-index: 200;

  // The modal's `max-height: 100%` resolves against this element's content box.
  // Left as content-box it measures the full viewport *plus* the padding below,
  // and a long result list runs off the bottom of a short window.
  box-sizing: border-box;

  display: flex;
  justify-content: center;
  // Without this the modal stretches to the full viewport and a three-result
  // search ends in a tall empty panel.
  align-items: flex-start;

  padding: calc(var(--navbar-height, 3.6rem) + 1rem) 1rem 1rem;

  background: var(--overlay-bg, rgb(16 16 16 / 50%));
  backdrop-filter: blur(2px);
}

.needle-search-modal {
  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: 46rem;
  max-height: 100%;
  overflow: hidden;

  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;

  background: var(--vp-c-bg-elv);
  box-shadow: 0 16px 48px var(--vp-c-shadow);
}

.needle-search-form {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: none;

  padding: 0.85rem 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.needle-search-form-icon {
  font-size: 1.35rem;
  color: var(--vp-c-text-subtle);
}

.needle-search-input {
  flex: 1;
  min-width: 0;

  border: none;
  outline: none;
  background: transparent;

  color: var(--vp-c-text);
  font-family: inherit;
  font-size: 1.05rem;

  &::placeholder {
    color: var(--vp-c-text-subtle);
  }

  // The type="search" clear affordance duplicates our own button.
  &::-webkit-search-cancel-button {
    display: none;
  }
}

.needle-search-clear {
  border: none;
  background: transparent;
  color: var(--vp-c-text-subtle);
  font-size: 1.1rem;
  cursor: pointer;

  &:hover {
    color: var(--vp-c-text);
  }
}

.needle-search-submit {
  flex: none;

  padding: 0.4rem 0.9rem;
  border: 1px solid oklch(from var(--c-text-accent, #826aed) l c h / 0.35);
  border-radius: 999px;

  background: oklch(from var(--c-text-accent, #826aed) l c h / 0.12);
  color: var(--c-text-accent, #826aed);

  font-family: inherit;
  font-size: 0.85rem;
  font-weight: 600;

  cursor: pointer;
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background: oklch(from var(--c-text-accent, #826aed) l c h / 0.2);
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
}

.needle-search-body {
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem;
}

// ── results ──────────────────────────────────────────────────────────────────

.needle-search-results {
  margin: 0;
  padding: 0;
  list-style: none;
}

.needle-search-result {
  display: block;
  padding: 0.7rem 0.85rem;
  border-radius: 12px;
  color: inherit;
  text-decoration: none;
  cursor: pointer;

  &:hover,
  &.is-active {
    background: var(--vp-c-control);
  }

  // The theme appends an icon to every external link; not in here.
  .external-link-icon {
    display: none;
  }
}

.needle-search-result-head {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  // The page's default line height (~1.7) pads the row invisibly and pushes the
  // breadcrumb away from the title — the margin below is 0, the gap was all here.
  line-height: 1.25;
}

.needle-search-result-title {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  color: var(--vp-c-text);
  font-size: 0.98rem;
  font-weight: 600;
}

.needle-search-result-badge {
  flex: none;

  padding: 0.05rem 0.45rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 5px;

  color: var(--vp-c-text-subtle);
  font-size: 0.65rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.needle-search-result-path {
  // Belongs to the title above it, so it hugs the title and keeps its distance
  // from the excerpt below instead of floating between them.
  margin-top: 0;
  line-height: 1.2;
  color: var(--vp-c-text-subtle);
  font-size: 0.72rem;
}

.needle-search-result-excerpt {
  margin: 0.35rem 0 0;
  color: var(--vp-c-text-mute);
  font-size: 0.85rem;
  line-height: 1.5;

  mark {
    padding: 0 0.1em;
    border-radius: 3px;
    background: var(--c-selection-bg, #ccff6ca8);
    // The highlight stays light in dark mode, so the text on it has to stay dark
    // — inheriting the excerpt's near-white would leave it unreadable.
    color: var(--c-selection-color, #000);
  }
}

// ── states ───────────────────────────────────────────────────────────────────

.needle-search-status {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  padding: 2.5rem 1.5rem;
  text-align: center;
}

.needle-search-status-icon {
  font-size: 2rem;
  color: var(--vp-c-text-subtle);
}

.needle-search-status-text {
  margin: 0;
  color: var(--vp-c-text-mute);
  font-size: 0.95rem;
}

.needle-search-hint {
  margin: 0;
  max-width: 30rem;
  color: var(--vp-c-text-subtle);
  font-size: 0.82rem;
}

.needle-search-spinner {
  width: 1.6rem;
  height: 1.6rem;
  border: 2px solid var(--vp-c-divider);
  border-top-color: var(--c-text-accent, #826aed);
  border-radius: 50%;
  animation: needle-search-spin 0.7s linear infinite;
}

@keyframes needle-search-spin {
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .needle-search-spinner {
    animation-duration: 2s;
  }
}

.needle-search-retry {
  margin-top: 0.35rem;
  padding: 0.35rem 0.9rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 999px;
  background: transparent;
  color: var(--vp-c-text);
  font-family: inherit;
  font-size: 0.85rem;
  cursor: pointer;

  &:hover {
    background: var(--vp-c-control);
  }
}

.needle-search-ask {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;

  margin-top: 0.25rem;
  padding: 0.7rem 0.85rem;
  border: 1px dashed var(--vp-c-border);
  border-radius: 12px;

  background: transparent;
  color: var(--c-text-accent, #826aed);

  font-family: inherit;
  font-size: 0.88rem;
  font-weight: 600;
  text-align: start;

  cursor: pointer;

  &:hover {
    background: oklch(from var(--c-text-accent, #826aed) l c h / 0.08);
  }
}

// ── recents ──────────────────────────────────────────────────────────────────

.needle-search-recent {
  padding: 0.5rem 0.35rem;

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
}

.needle-search-section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 0.5rem 0.35rem;

  color: var(--vp-c-text-subtle);
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.needle-search-linkish {
  border: none;
  background: transparent;
  color: inherit;
  font: inherit;
  text-transform: inherit;
  letter-spacing: inherit;
  cursor: pointer;

  &:hover {
    color: var(--vp-c-text);
  }
}

.needle-search-recent-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;

  padding: 0.5rem 0.6rem;
  border: none;
  border-radius: 10px;

  background: transparent;
  color: var(--vp-c-text-mute);

  font-family: inherit;
  font-size: 0.9rem;
  text-align: start;

  cursor: pointer;

  &:hover {
    background: var(--vp-c-control);
    color: var(--vp-c-text);
  }

  .needle-search-icon {
    font-size: 1.05rem;
    color: var(--vp-c-text-subtle);
  }
}

// ── footer ───────────────────────────────────────────────────────────────────

.needle-search-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex: none;

  padding: 0.5rem 1rem;
  border-top: 1px solid var(--vp-c-divider);

  color: var(--vp-c-text-subtle);
  font-size: 0.75rem;
}

.needle-search-keys {
  display: flex;
  align-items: center;
  gap: 0.3rem;

  kbd {
    padding: 0.05rem 0.35rem;
    border: 1px solid var(--vp-c-border);
    border-radius: 4px;
    background: var(--vp-c-control);
    color: var(--vp-c-text-mute);
    font-family: inherit;
    font-size: 0.72rem;
  }

  span + kbd {
    margin-inline-start: 0.4rem;
  }
}

.needle-search-credit a {
  color: inherit;
  text-decoration: none;

  &:hover {
    color: var(--vp-c-text);
  }

  .external-link-icon {
    display: none;
  }
}

@media screen and (max-width: 719px) {
  .needle-search-overlay {
    padding: 0;
  }

  .needle-search-modal {
    max-width: none;
    height: 100%;
    border: none;
    border-radius: 0;
  }

  .needle-search-keys {
    display: none;
  }
}

// ── transition ───────────────────────────────────────────────────────────────

.needle-search-fade-enter-active,
.needle-search-fade-leave-active {
  transition: opacity 0.15s ease;
}

.needle-search-fade-enter-from,
.needle-search-fade-leave-to {
  opacity: 0;
}

/*
  The overlay covers the viewport, and opacity alone does not stop it swallowing
  clicks. Vue removes the element once the leave transition ends — but a tab
  backgrounded mid-fade never fires the frame that drives it, and the invisible
  overlay would sit there making the whole page unclickable. Nobody wants to
  click through a fading-out modal anyway.
*/
.needle-search-fade-leave-active,
.needle-search-fade-leave-to {
  pointer-events: none;
}
</style>
