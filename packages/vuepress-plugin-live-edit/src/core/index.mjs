/** Public surface of the round-trip core, for tests and tooling. */
export { parseBlocks, serializeBlocks, walkBlocks, splitLines } from './blocks.mjs'
export { markdownToDoc, docToMarkdown, blocksToNodes } from './doc.mjs'
export { schema } from './schema.mjs'
export { buildRegistry, createRegistryCache, componentTagSet, parseComponentProps } from './registry.mjs'
export { parseElement, serializeElement, collectElements } from './vue-template.mjs'
export { decideDensity, suggestAssetDir, imageMarkdown, writePastedImage } from './assets.mjs'
export { assertInside, listMarkdownFiles, routeToSourceFile, slugify } from './paths.mjs'
