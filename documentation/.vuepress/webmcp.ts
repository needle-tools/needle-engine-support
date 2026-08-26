/**
 * WebMCP integration for the docs site.
 *
 * WebMCP (https://github.com/webmachinelearning/webmcp) lets a page expose
 * "tools" that a browser-integrated AI agent can call directly, instead of
 * scraping the DOM or driving the UI with simulated clicks. We register one
 * tool that forwards to the public Needle search API — the same knowledge base
 * behind the Needle MCP Server and Needle Cloud AI — so an agent sitting on
 * any docs page can search all Needle content without leaving it.
 *
 * The API surface moved from `navigator.modelContext` to `document.modelContext`
 * (spec change of 2026-07-21). Chrome deprecated the navigator location in 150
 * but its origin trial still serves both, so we resolve either one.
 *
 * Note for deployment: Chrome and Edge ship this behind an origin trial, so the
 * page also needs a trial token (`WEBMCP_ORIGIN_TRIAL_TOKEN`, see config.ts) for
 * the API to be present at all in those browsers.
 */

const SEARCH_ENDPOINT = 'https://search.needle.tools/api/semantic-search'

const DEFAULT_LIMIT = 5
const DEFAULT_MAX_CHARS = 1500

type SearchResult = {
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

type ModelContextLike = {
  registerTool?: (tool: unknown, options?: unknown) => Promise<unknown>
  provideContext?: (context: { tools: unknown[] }) => unknown
}

const clamp = (value: unknown, min: number, max: number, fallback: number) => {
  const n = typeof value === 'number' ? value : parseInt(String(value ?? ''), 10)
  if (!Number.isFinite(n)) return fallback
  return Math.min(max, Math.max(min, Math.round(n)))
}

const text = (value: string, isError = false) => ({
  content: [{ type: 'text', text: value }],
  ...(isError ? { isError: true } : {}),
})

/**
 * Renders results as markdown rather than raw JSON: the URL of each hit is the
 * part the agent needs to cite or follow, and a flat list keeps it obvious which
 * excerpt belongs to which page.
 */
const format = (query: string, results: SearchResult[]) => {
  if (!results.length) {
    return `No results for "${query}".`
  }
  const blocks = results.map((r, i) => {
    const heading = [`### ${i + 1}. ${r.title || 'Untitled'}`]
    if (r.source) heading.push(`Source: ${r.source}`)
    if (r.url) heading.push(`URL: ${r.url}`)
    if (typeof r.score === 'number') heading.push(`Score: ${r.score.toFixed(2)}`)
    const body = (r.content || '').trim()
    return `${heading.join('\n')}\n\n${body}${r.truncated ? '\n\n(excerpt truncated)' : ''}`
  })
  return `Found ${results.length} result(s) for "${query}":\n\n${blocks.join('\n\n---\n\n')}`
}

const searchTool = {
  name: 'search-needle-knowledge-base',
  description:
    'Search the Needle knowledge base for anything about Needle Engine and Needle tools: ' +
    'documentation, API reference, forum posts, community Discord threads and Needle source code. ' +
    'Returns embedding-ranked excerpts with the URL of each source. ' +
    'Use this to answer questions about Needle components, APIs, exporting, deployment, XR, ' +
    'networking or editor integration instead of relying on memory. ' +
    'The same knowledge base is reachable over plain HTTP without a browser — ' +
    'see https://search.needle.tools/api-docs for the endpoints, including POST /api/ask ' +
    'for an answer instead of a result list.',
  inputSchema: {
    type: 'object',
    properties: {
      query: {
        type: 'string',
        description:
          'A natural language question or set of keywords, e.g. "how to add a rigidbody" or "export animation from Blender".',
      },
      limit: {
        type: 'number',
        description: `How many results to return, between 1 and 20. Defaults to ${DEFAULT_LIMIT}.`,
      },
      maxChars: {
        type: 'number',
        description: `Maximum characters of content per result, between 200 and 10000. Defaults to ${DEFAULT_MAX_CHARS}.`,
      },
    },
    required: ['query'],
  },
  async execute(
    args: { query?: string; limit?: number; maxChars?: number },
    options?: { signal?: AbortSignal },
  ) {
    const query = (args?.query ?? '').trim()
    if (!query) return text('Missing "query" — pass the question or keywords to search for.', true)

    const params = new URLSearchParams({
      q: query,
      limit: String(clamp(args?.limit, 1, 20, DEFAULT_LIMIT)),
      max_chars: String(clamp(args?.maxChars, 200, 10000, DEFAULT_MAX_CHARS)),
    })

    try {
      // Requires `Access-Control-Allow-Origin` on search.needle.tools. The endpoints are
      // public and unauthenticated, so `*` is enough — but without it the browser blocks
      // the read and this surfaces as a bare "Failed to fetch" TypeError below.
      const response = await fetch(`${SEARCH_ENDPOINT}?${params}`, {
        headers: { accept: 'application/json' },
        signal: options?.signal,
      })
      if (response.status === 429) {
        // The endpoint is public and rate-limited to 10 requests per minute per IP.
        return text('Needle search is rate limited right now. Wait a moment and try again.', true)
      }
      if (!response.ok) {
        return text(`Needle search failed with HTTP ${response.status}.`, true)
      }
      const data = await response.json()
      return text(format(query, Array.isArray(data?.results) ? data.results : []))
    } catch (err) {
      if (options?.signal?.aborted) throw err
      return text(`Needle search request failed: ${err instanceof Error ? err.message : String(err)}`, true)
    }
  },
}

let registered = false

/** Registers the docs tools with the browser. Safe to call more than once. */
export async function registerWebMCPTools() {
  if (registered || typeof document === 'undefined') return
  const modelContext: ModelContextLike | undefined =
    (document as any).modelContext ?? (globalThis.navigator as any)?.modelContext
  if (!modelContext) return
  registered = true

  try {
    if (typeof modelContext.registerTool === 'function') {
      await modelContext.registerTool(searchTool)
    } else if (typeof modelContext.provideContext === 'function') {
      // Older origin-trial builds only shipped the batch API.
      modelContext.provideContext({ tools: [searchTool] })
    } else {
      registered = false
    }
  } catch (err) {
    // A NotAllowedError just means the `tools` permission is disabled for this
    // document — nothing the page can do about it, and nothing worth breaking over.
    registered = false
    console.debug('[needle] WebMCP tool registration skipped:', err)
  }
}
