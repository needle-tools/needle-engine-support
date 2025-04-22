import { getDirname, path } from '@vuepress/utils';
import { fs } from '@vuepress/utils'; // Use VuePress's fs wrapper (usually fs-extra)

// You might need this if running as a local file, but often not needed when published as npm package
// const __dirname = getDirname(import.meta.url);

export default (options = {}) => {
  // Use a Map to store processed markdown content keyed by absolute source file path
  const processedMarkdownMap = new Map();

  return {
    name: 'vuepress-plugin-copy-markdown',

    // Hook into markdown-it instance setup
    extendsMarkdown: (md, app) => {
      // Store the original render function
      const originalRender = md.render;

      // Wrap the render function
      md.render = (src, env) => {
        // env.filePath should contain the absolute path to the source markdown file
        // during the page compilation phase.
        if (env && env.filePath) {
          // Store the markdown source *before* it's rendered to HTML
          processedMarkdownMap.set(env.filePath, src);
          // Optional: Log for debugging
          // if (app.env.isDebug) {
          //   console.log(`[copy-markdown] Captured markdown for: ${env.filePath}`);
          // }
        } else {
           // This might happen for non-page renders, e.g., excerpts. Ignore them.
           // console.warn(`[copy-markdown] md.render called without env.filePath`);
        }

        // Call the original render function to proceed with HTML generation
        return originalRender.call(md, src, env);
      };
    },

    // Hook after the site has been generated
    onGenerated: async (app) => {
      console.log('[copy-markdown] Starting to copy processed markdown files...');

      let count = 0;
      for (const page of app.pages) {
        // Ensure the page has a source file path (e.g., not a virtual page without one)
        // and that we captured markdown for it.
        if (page.filePath && processedMarkdownMap.has(page.filePath)) {
          const processedMarkdown = processedMarkdownMap.get(page.filePath);
          const htmlFilePath = page.htmlFilePath; // Absolute path to the generated HTML file

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
                console.log(`[copy-markdown] Saved: ${path.relative(app.dir.dest(), targetPath)}`);
              }
            } catch (error) {
              console.error(`[copy-markdown] Error writing file ${targetPath}:`, error);
            }
          } else {
             if (app.env.isDebug) {
                console.warn(`[copy-markdown] Page ${page.path} has no htmlFilePath.`);
             }
          }
        } else {
           // Log if we expected markdown but didn't find it (useful for debugging)
           if (app.env.isDebug && page.filePath) {
             console.warn(`[copy-markdown] No processed markdown found in map for: ${page.filePathRelative || page.filePath}`);
           }
        }
      }

      // Optional: Clear the map after use (good practice, though process exits anyway)
      processedMarkdownMap.clear();

      console.log(`[copy-markdown] Successfully copied ${count} processed markdown files.`);
    },
  };
};

// Export the plugin function directly if using as a local plugin
// export default copyMarkdownPlugin; // Or use named export as above