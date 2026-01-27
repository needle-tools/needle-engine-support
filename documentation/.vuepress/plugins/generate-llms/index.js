import { path } from '@vuepress/utils';
import { fs } from '@vuepress/utils';

/**
 * VuePress plugin that generates LLM-friendly documentation files:
 * - llms.txt: Structured links to all documentation pages
 * - llms-full.txt: Full markdown content of all pages
 */
export default (options = {}) => {
  // Use a Map to store processed markdown content keyed by absolute source file path
  const processedMarkdownMap = new Map();

  /** @returns {import("vuepress").Plugin} */
  return {
    name: 'vuepress-plugin-generate-llms',

    // Hook into markdown-it instance setup to capture raw markdown
    extendsMarkdown: (md) => {
      // Store the original render function
      const originalRender = md.render;

      // Wrap the render function
      md.render = (src, env) => {
        // env.filePath should contain the absolute path to the source markdown file
        // during the page compilation phase.
        if (env && env.filePath) {
          // Store the markdown source *before* it's rendered to HTML
          processedMarkdownMap.set(env.filePath, src);
        }

        // Call the original render function to proceed with HTML generation
        return originalRender.call(md, src, env);
      };
    },

    // Hook after the site has been generated
    onGenerated: async (app) => {
      const baseUrl = options.baseUrl || 'https://engine.needle.tools/docs';

      // === Generate llms.txt (structured links) ===
      console.log('[generate-llms] Generating llms.txt with structured links...');

      const tree = buildPageTree(app.pages);
      let linksOutput = `# Needle Engine Documentation - Links\n`;
      linksOutput += `# ${new Date().toLocaleString('en-US')}\n`;
      linksOutput += `# Base URL: ${baseUrl}\n\n`;
      linksOutput += formatTree(tree, baseUrl, 0);

      // Write llms.txt
      const linksOutpath = path.join(app.dir.dest(), 'llms.txt');
      try {
        await fs.ensureDir(app.dir.dest());
        await fs.writeFile(linksOutpath, linksOutput, 'utf-8');
        console.log(`[generate-llms] Saved links file to: ${path.relative(app.dir.dest(), linksOutpath)}`);

        // Also copy to root directory
        const rootLinksOutpath = path.join(process.cwd(), 'llms.txt');
        await fs.copyFile(linksOutpath, rootLinksOutpath);
        console.log(`[generate-llms] Copied to root: llms.txt`);
      } catch (error) {
        console.error(`[generate-llms] Error writing file ${linksOutpath}:`, error);
      }

      // === Generate llms-full.txt (full content) ===
      console.log('[generate-llms] Generating llms-full.txt with full content...');

      let fullTextEN = `<SYSTEM>
This is the developer documentation for Needle.
Documentation: https://engine.needle.tools/docs/
Last Updated on ${new Date().toLocaleString('en-US')}
</SYSTEM>
`;

      let count = 0;
      for (const page of app.pages) {
        // Ensure the page has a source file path (e.g. not a virtual page without one)
        // and that we captured markdown for it.
        if (page.filePath && processedMarkdownMap.has(page.filePath)) {
          const processedMarkdown = processedMarkdownMap.get(page.filePath);
          const htmlFilePath = page.htmlFilePath; // Absolute path to the generated HTML file

          if (page.filePath.includes("/lang") === false) {
            const pageFilename = path.basename(page.filePath);
            if (!pageFilename.startsWith("_")) {
              const pageUrl = `https://engine.needle.tools/docs/${page.htmlFilePathRelative}`;
              fullTextEN += `${processedMarkdown}\nSource: ${pageUrl}\n\n`;
            }
          }

          if (htmlFilePath) {
            const targetDir = path.dirname(htmlFilePath);
            // Create the target filename by replacing .html with .md
            const targetFileName = path.basename(htmlFilePath, '.html') + '.md';
            const targetPath = path.join(targetDir, targetFileName);

            try {
              // Ensure the output directory exists
              await fs.ensureDir(targetDir);
              // Write the captured markdown content
              await fs.writeFile(targetPath, processedMarkdown, 'utf-8');
              count++;
              if (app.env.isDebug) {
                console.log(`[generate-llms] Saved: ${path.relative(app.dir.dest(), targetPath)}`);
              }
            } catch (error) {
              console.error(`[generate-llms] Error writing file ${targetPath}:`, error);
            }
          } else {
            if (app.env.isDebug) {
              console.warn(`[generate-llms] Page ${page.path} has no htmlFilePath.`);
            }
          }
        } else {
          // Log if we expected markdown but didn't find it (useful for debugging)
          if (app.env.isDebug && page.filePath) {
            console.warn(`[generate-llms] No processed markdown found in map for: ${page.filePathRelative || page.filePath}`);
          }
        }
      }

      // Clear the map after use
      processedMarkdownMap.clear();

      // Write llms-full.txt
      const fullOutpath = path.join(app.dir.dest(), 'llms-full.txt');
      try {
        await fs.ensureDir(app.dir.dest());
        await fs.writeFile(fullOutpath, fullTextEN, 'utf-8');
        console.log(`[generate-llms] Saved full text to: ${path.relative(app.dir.dest(), fullOutpath)}`);

        // Also copy to root directory
        const rootFullOutpath = path.join(process.cwd(), 'llms-full.txt');
        await fs.copyFile(fullOutpath, rootFullOutpath);
        console.log(`[generate-llms] Copied to root: llms-full.txt`);
      } catch (error) {
        console.error(`[generate-llms] Error writing full text file ${fullOutpath}:`, error);
      }

      console.log(`[generate-llms] Successfully processed ${count} markdown files.`);
    },
  };
};

/**
 * Build a hierarchical tree structure from pages
 */
function buildPageTree(pages) {
  const tree = {};

  for (const page of pages) {
    // Skip pages without file paths or in language folders
    if (!page.filePath || page.filePath.includes('/lang/')) continue;

    // Skip files starting with underscore
    const filename = path.basename(page.filePath);
    if (filename.startsWith('_')) continue;

    // Get the path segments
    const pathSegments = page.path.split('/').filter(s => s);

    // Build tree structure
    let currentLevel = tree;
    for (let i = 0; i < pathSegments.length; i++) {
      const segment = pathSegments[i];

      if (i === pathSegments.length - 1) {
        // Last segment - store page info
        if (!currentLevel._pages) currentLevel._pages = [];
        currentLevel._pages.push({
          title: page.title || segment,
          path: page.path,
          htmlPath: page.htmlFilePathRelative || page.path,
        });
      } else {
        // Intermediate segment - create nested structure
        if (!currentLevel[segment]) {
          currentLevel[segment] = {};
        }
        currentLevel = currentLevel[segment];
      }
    }
  }

  return tree;
}

/**
 * Format the tree structure as indented text
 */
function formatTree(tree, baseUrl, depth = 0) {
  let output = '';
  const indent = '  '.repeat(depth);

  // Sort keys alphabetically, but prioritize index pages
  const keys = Object.keys(tree).filter(k => k !== '_pages');
  keys.sort((a, b) => {
    if (a === 'index') return -1;
    if (b === 'index') return 1;
    return a.localeCompare(b);
  });

  // Process pages at this level first
  if (tree._pages) {
    // Sort pages, with index first
    tree._pages.sort((a, b) => {
      if (a.path.endsWith('/')) return -1;
      if (b.path.endsWith('/')) return 1;
      return a.title.localeCompare(b.title);
    });

    for (const page of tree._pages) {
      // Create clean URL (remove trailing .html)
      let url = page.htmlPath.replace(/\.html$/, '').replace(/\/index$/, '/');
      if (!url.startsWith('/')) url = '/' + url;

      output += `${indent}${page.title}\n`;
      output += `${indent}  ${baseUrl}${url}\n\n`;
    }
  }

  // Process subdirectories
  for (const key of keys) {
    if (key === '_pages') continue;

    // Format section header
    const sectionName = key
      .split('-')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

    output += `${indent}## ${sectionName}\n\n`;
    output += formatTree(tree[key], baseUrl, depth + 1);
  }

  return output;
}
