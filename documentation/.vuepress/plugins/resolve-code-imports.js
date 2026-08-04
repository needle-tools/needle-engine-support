import { fs, path } from '@vuepress/utils';

/**
 * Expands VuePress `@[code](path)` import directives into real fenced code blocks.
 *
 * Pages are captured as raw markdown before markdown-it renders them, so an
 * imported file is still just a directive at that point. Anything consuming
 * that markdown instead of the HTML — the `Copy Markdown` button, the `.md`
 * endpoint, llms.txt — would otherwise show a walkthrough with every code
 * example missing.
 *
 * Handles the forms used in these docs:
 *   @[code js](@code/file.js)
 *   @[code ts twoslash](@code/file.ts)
 *   @[code{1-10} js](@code/file.js)
 */

const EXTENSION_LANGUAGES = {
  '.ts': 'ts',
  '.tsx': 'tsx',
  '.js': 'js',
  '.jsx': 'jsx',
  '.vue': 'vue',
  '.json': 'json',
  '.html': 'html',
  '.css': 'css',
  '.scss': 'scss',
  '.cs': 'csharp',
  '.md': 'md',
};

// Meta tokens that describe rendering rather than the language itself.
const NON_LANGUAGE_TOKENS = new Set(['twoslash', 'code']);

const DIRECTIVE = /^@\[code([^\]]*)\]\(([^)]+)\)\s*$/gm;

function pickLanguage(meta, filePath) {
  const fromMeta = meta
    .replace(/\{[^}]*\}/g, ' ')
    .split(/\s+/)
    .map(token => token.trim())
    .filter(token => token && !NON_LANGUAGE_TOKENS.has(token));

  if (fromMeta.length) return fromMeta[0];
  return EXTENSION_LANGUAGES[path.extname(filePath).toLowerCase()] || '';
}

function applyLineRange(content, meta) {
  const range = meta.match(/\{(\d+)?-(\d+)?\}/);
  if (!range) return content;

  const lines = content.split('\n');
  const from = range[1] ? parseInt(range[1], 10) : 1;
  const to = range[2] ? parseInt(range[2], 10) : lines.length;
  return lines.slice(from - 1, to).join('\n');
}

/**
 * Builds a resolver matching the `markdown.importCode.handleImportPath` mapping
 * in config.ts, so `@code/x.js` points at the same file the renderer uses.
 *
 * @param {import("vuepress").App} app
 */
export function makeCodeImportResolver(app) {
  const handle = app?.options?.markdown?.importCode?.handleImportPath;
  const fallback = path.resolve(app?.dir?.source?.() || '.', '.vuepress/public/code-samples');

  return importPath => {
    const mapped = handle ? handle(importPath) : importPath.replace(/^@code/, fallback);
    return path.isAbsolute(mapped) ? mapped : path.resolve(fallback, mapped);
  };
}

/**
 * @param {string} markdown Raw page markdown
 * @param {(importPath: string) => string} resolvePath Maps an import path to an absolute file path
 * @returns {string} Markdown with code imports inlined
 */
export function resolveCodeImports(markdown, resolvePath) {
  if (!markdown.includes('@[code')) return markdown;

  return markdown.replace(DIRECTIVE, (directive, meta, importPath) => {
    let absolute;
    try {
      absolute = resolvePath(importPath.trim());
    } catch {
      return directive;
    }

    if (!absolute || !fs.existsSync(absolute)) return directive;

    try {
      const content = applyLineRange(
        fs.readFileSync(absolute, 'utf-8').replace(/\s+$/, ''),
        meta
      );
      const language = pickLanguage(meta, absolute);
      return '```' + language + '\n' + content + '\n```';
    } catch {
      // Leave the directive untouched rather than dropping the reference.
      return directive;
    }
  });
}
