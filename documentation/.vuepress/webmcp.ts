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

import { SearchError, clamp, semanticSearch, type SearchResult } from './search-api'

// Agents read every result in full, so they get fewer than the search box shows.
const DEFAULT_LIMIT = 5
const DEFAULT_MAX_CHARS = 1500

type ModelContextLike = {
  registerTool?: (tool: unknown, options?: unknown) => Promise<unknown>
  provideContext?: (context: { tools: unknown[] }) => unknown
}

/**
 * WebMCP types the execute return as `any` — it defines no result shape of its own.
 * We follow the MCP convention anyway: `structuredContent` is the real payload, and
 * the `content` text block mirrors it for agents that only read the MCP text channel.
 */
const result = (summary: string, structured?: object, isError = false) => ({
  content: [{ type: 'text', text: summary }],
  ...(structured ? { structuredContent: structured } : {}),
  ...(isError ? { isError: true } : {}),
})

const failure = (message: string) => result(message, { error: message }, true)

/**
 * Renders results as markdown rather than raw JSON: the URL of each hit is the
 * part the agent needs to cite or follow, and a flat list keeps it obvious which
 * excerpt belongs to which page.
 */
const summarize = (query: string, results: SearchResult[]) => {
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
  title: 'Search Needle knowledge base',
  annotations: {
    // Pure lookup: nothing on the page or the server changes.
    readOnlyHint: true,
    // Results include forum posts and Discord messages — user-generated text that can
    // carry prompt injection. The hint tells the agent to treat the payload as data,
    // not instructions.
    untrustedContentHint: true,
  },
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
    if (!query) return failure('Missing "query" — pass the question or keywords to search for.')

    try {
      const { results } = await semanticSearch(query, {
        limit: clamp(args?.limit, 1, 20, DEFAULT_LIMIT),
        maxChars: clamp(args?.maxChars, 200, 10000, DEFAULT_MAX_CHARS),
        signal: options?.signal,
      })

      return result(summarize(query, results), {
        query,
        count: results.length,
        results: results.map(r => ({
          title: r.title ?? null,
          url: r.url ?? null,
          source: r.source ?? null,
          type: r.type ?? null,
          score: r.score ?? null,
          content: r.content ?? '',
          truncated: r.truncated ?? false,
        })),
      })
    } catch (err) {
      if (options?.signal?.aborted) throw err
      // SearchError already phrases the rate-limit and HTTP cases for a reader.
      if (err instanceof SearchError) return failure(err.message)
      return failure(`Needle search request failed: ${err instanceof Error ? err.message : String(err)}`)
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
