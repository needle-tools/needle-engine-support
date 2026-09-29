/**
 * Crawl the built site and report links that do not resolve.
 *
 * This checks what is about to be published, unlike `test:links`, which scans
 * the site already deployed and so cannot see a regression before it ships.
 *
 * Any link that does not resolve fails the run. There is no list of accepted
 * breakage: one would only become somewhere for new breakage to hide.
 */

import { createServer } from 'node:http'
import { createReadStream, existsSync, statSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { LinkChecker } from 'linkinator'

const ROOT = path.resolve(fileURLToPath(new URL('..', import.meta.url)))
const DIST = path.join(ROOT, 'dist')

/**
 * Sections built by their own script. A plain `docs:build` does not produce
 * them, and reporting every link into them would be noise rather than a
 * finding.
 */
const GENERATED = [
  { prefix: '/docs/api/', dir: 'api', script: 'docs:build-api' },
  { prefix: '/docs/reference/changelogs/', dir: 'reference/changelogs', script: 'docs:build-changelogs' },
]

/** Requests a browser makes for its own sake, not links in the content. */
const NOT_CONTENT = /favicon\.ico|webmanifest/

const TYPES = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.ico': 'image/x-icon', '.mp4': 'video/mp4',
  '.webm': 'video/webm', '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf',
  '.txt': 'text/plain', '.xml': 'application/xml', '.glb': 'model/gltf-binary',
}

if (!existsSync(path.join(DIST, 'index.html'))) {
  console.error('No build found. Run `npm run docs:build` first.')
  process.exit(2)
}

/*
  The deployed site serves /docs/<page> from <page>.html. Without the same
  mapping every link between pages reads as a 404 and the run is meaningless.
*/
function resolveFile(urlPath) {
  const rel = decodeURIComponent(urlPath.replace(/^\/docs\/?/, '').split('?')[0])
  const base = path.join(DIST, rel)
  if (!base.startsWith(DIST)) return null
  for (const candidate of [base, `${base}.html`, path.join(base, 'index.html')]) {
    if (existsSync(candidate) && statSync(candidate).isFile()) return candidate
  }
  return null
}

const skipped = GENERATED.filter((section) => !existsSync(path.join(DIST, section.dir)))
for (const section of skipped) {
  console.log(`skipping ${section.prefix}* - not in this build, run \`npm run ${section.script}\` to include it`)
}

const server = createServer((request, response) => {
  const file = resolveFile(new URL(request.url, 'http://localhost').pathname)
  if (!file) {
    response.statusCode = 404
    return response.end('not found')
  }
  response.setHeader('Content-Type', TYPES[path.extname(file).toLowerCase()] ?? 'application/octet-stream')
  createReadStream(file).pipe(response)
})
await new Promise((resolve) => server.listen(0, resolve))
const origin = `http://localhost:${server.address().port}`

const checker = new LinkChecker()
let pages = 0
checker.on('pagestart', () => {
  pages++
})

const result = await checker.check({
  path: `${origin}/docs/`,
  recurse: true,
  timeout: 15000,
  /*
    Internal links only. Whether some third-party site is up says nothing
    about this branch, and making the build depend on the network is how a
    check ends up being ignored.
  */
  linksToSkip: (url) =>
    Promise.resolve(
      !url.startsWith(origin) ||
        NOT_CONTENT.test(url) ||
        skipped.some((section) => url.slice(origin.length).startsWith(section.prefix)),
    ),
})
server.close()

const relative = (url) => String(url).replace(origin, '')
const broken = [...new Set(result.links.filter((link) => link.state === 'BROKEN').map((link) => relative(link.url)))].sort()

/** Which pages link to a given target. */
const parentsOf = (url) =>
  [...new Set(result.links.filter((link) => relative(link.url) === url).map((link) => relative(link.parent)))]

console.log(`\npages crawled: ${pages}`)
console.log(`links checked: ${result.links.filter((link) => link.state !== 'SKIPPED').length}`)
console.log(`broken:        ${broken.length}`)

if (broken.length) {
  console.log(`\n${broken.length} link(s) do not resolve:`)
  for (const url of broken) {
    console.log(`  ${url}`)
    for (const parent of parentsOf(url).slice(0, 5)) console.log(`      linked from ${parent}`)
  }
  process.exit(1)
}

console.log('\nNo broken links.')
