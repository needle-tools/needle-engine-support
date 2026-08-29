/**
 * Client for the Needle search API (https://search.needle.tools).
 *
 * The knowledge base is embedding-ranked and covers documentation, API
 * reference, forum posts, community Discord threads and Needle source code —
 * the same index behind the Needle MCP server and Needle Cloud AI, refreshed
 * by the crawl step in .github/workflows/deploy-docs.yaml on every docs deploy.
 *
 * Shared by the docs search box (components/SearchBox.vue) and the WebMCP tool
 * (webmcp.ts) so a human searching the site and an agent calling the tool hit
 * the endpoint the same way.
 *
 * The endpoints are public, unauthenticated and rate limited to 10 requests per
 * minute per IP — which is why the search box only queries on submit and never
 * while typing.
 */

export const SEARCH_BASE = 'https://search.needle.tools'
export const SEARCH_ENDPOINT = `${SEARCH_BASE}/api/semantic-search`

/** The chat surface we hand a question to when a result list is not the answer. */
export const ASK_AI_BASE = 'https://cloud.needle.tools/ai/chat/needle-documentation'

export const DEFAULT_LIMIT = 10
export const DEFAULT_MAX_CHARS = 1500

/**
 * The docs source's id in the Needle Search index — the crawl step in
 * .github/workflows/deploy-docs.yaml posts the same id. Passed as a `boost`
 * so results from this site rank first in its own search box, while the shared
 * corpus (forum, Discord, source code) stays reachable behind them.
 */
export const DOCS_SOURCE_ID = '6790017a-f836-4195-8247-7e41a2c70bf0'
export const DOCS_SOURCE_BOOST = 2

export type SearchResult = {
  type?: string
  score?: number
  title?: string
  source?: string
  content?: string
  contentLength?: number
  truncated?: boolean
  url?: string
  timestamp?: string
}

export type SearchResponse = {
  query: string
  results: SearchResult[]
  /** Server-side search time, when the API reports it. */
  durationMs?: number
}

/**
 * Carries whether the failure was the rate limiter, because that is the one
 * case where the caller should tell the user to simply wait and retry.
 */
export class SearchError extends Error {
  readonly rateLimited: boolean

  constructor(message: string, rateLimited = false) {
    super(message)
    this.name = 'SearchError'
    this.rateLimited = rateLimited
  }
}

export const clamp = (value: unknown, min: number, max: number, fallback: number): number => {
  const n = typeof value === 'number' ? value : parseInt(String(value ?? ''), 10)
  if (!Number.isFinite(n)) return fallback
  return Math.min(max, Math.max(min, Math.round(n)))
}

export type SearchOptions = {
  limit?: number
  maxChars?: number
  signal?: AbortSignal
  /** Per-request source boosting: source id → score multiplier (0.1–10). */
  boosts?: Record<string, number>
  /**
   * Skip the server's HyDE step (an LLM writes a hypothetical answer that is
   * embedded together with the query). Skipping embeds the query verbatim —
   * faster, and the better match for keyword-style docs searches.
   */
  skipHyde?: boolean
}

export async function semanticSearch(
  query: string,
  { limit, maxChars, signal, boosts, skipHyde }: SearchOptions = {},
): Promise<SearchResponse> {
  const q = query.trim()
  if (!q) throw new SearchError('Missing query — pass the question or keywords to search for.')

  const params = new URLSearchParams({
    q,
    limit: String(clamp(limit, 1, 20, DEFAULT_LIMIT)),
    max_chars: String(clamp(maxChars, 200, 10000, DEFAULT_MAX_CHARS)),
  })
  if (boosts) {
    const entries = Object.entries(boosts).filter(([id, mult]) => id && Number.isFinite(mult))
    if (entries.length) params.set('boost', entries.map(([id, mult]) => `${id}:${mult}`).join(','))
  }
  if (skipHyde) params.set('hyde', '0')

  let response: Response
  try {
    // Reads cross-origin, so it relies on `Access-Control-Allow-Origin` on
    // search.needle.tools. Without it the browser blocks the response and this
    // surfaces as a bare "Failed to fetch" TypeError right here.
    response = await fetch(`${SEARCH_ENDPOINT}?${params}`, {
      headers: { accept: 'application/json' },
      signal,
    })
  } catch (err) {
    // An abort is the caller superseding its own request, not a failure.
    if (signal?.aborted) throw err
    throw new SearchError(
      `Could not reach Needle Search: ${err instanceof Error ? err.message : String(err)}`,
    )
  }

  if (response.status === 429) {
    throw new SearchError(
      'Needle Search is rate limited right now. Wait a moment and try again.',
      true,
    )
  }
  if (!response.ok) {
    throw new SearchError(`Needle Search failed with HTTP ${response.status}.`)
  }

  const data = await response.json()
  return {
    query: q,
    results: Array.isArray(data?.results) ? data.results : [],
    durationMs: typeof data?.durationMs === 'number' ? data.durationMs : undefined,
  }
}

/** Builds the Needle Cloud AI chat URL for a question. */
export const askAiUrl = (question: string): string =>
  `${ASK_AI_BASE}?message=${encodeURIComponent(question)}`
