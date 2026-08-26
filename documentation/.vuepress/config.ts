import { App, defineUserConfig, LocaleConfig, SiteLocaleConfig } from 'vuepress'
import { defaultTheme, DefaultThemeOptions, NavbarGroupOptions, NavbarLinkOptions, NavItemOptions } from '@vuepress/theme-default'
import { viteBundler } from '@vuepress/bundler-vite'
import { path } from '@vuepress/utils'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
// import * as videoplayer from "vuepress-plugin-core-video-player";
// import { pwaPlugin } from '@vuepress/plugin-pwa'
import { docsearchPlugin } from '@vuepress/plugin-docsearch'
import { shikiPlugin } from '@vuepress/plugin-shiki'
import { markdownChartPlugin } from '@vuepress/plugin-markdown-chart'

import { rendererRich, transformerTwoslash } from '@shikijs/twoslash';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { toHast } from 'mdast-util-to-hast';
import { sitemapPlugin } from '@vuepress/plugin-sitemap';

// import { mermaidPlugin } from "@renovamen/vuepress-plugin-mermaid";
//@ts-ignore
import { generateMetaPlugin, cleanLink, cleanHeader } from "./plugins/generate-samples-meta/index"
import { includeSampleCode } from './plugins/include-samples-code/index'
import { generateSharedCode } from './plugins/generate-shared-code/index'
import * as dotenv from 'dotenv'
import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics'
import { modifyHtmlMeta } from './plugins/html-meta/index'
import { existsSync, readdirSync, readFileSync, utimesSync } from 'fs'
import * as nodePath from 'node:path'

import { Element } from 'hast'
import { SiteLocaleData } from 'vuepress/shared'
import copyMarkdown from './plugins/copy-markdown'
import generateLlms from './plugins/generate-llms'
import { fetchEngineData } from './plugins/fetch-engine-data/index'
import { markdownContainerPlugin } from '@vuepress/plugin-markdown-container'

dotenv.config()

const _url = "https://engine.needle.tools/docs"
const _base = "/docs/";

/** True when running `vuepress build` rather than `vuepress dev`. */
const isBuild = process.argv.includes('build');

/**
 * Dev-only: files under `.vuepress/public/code-samples` live in Vite's publicDir,
 * so they are outside the module graph and never trigger HMR. On top of that, pages
 * that print them via `@[code](@code/...)` resolve that import at markdown-compile
 * time, so editing a sample leaves the printed snippet stale too.
 *
 * This watcher fixes both: it touches any page referencing the changed file (so
 * VuePress recompiles it and re-reads the import), then asks the browser to reload
 * (so embedded iframes re-fetch the updated scene).
 *
 * Production builds are unaffected — everything is read fresh at build time.
 */
function collectMarkdownFilesReferencing(dir: string, needle: string, out: string[] = []): string[] {
    let entries: ReturnType<typeof readdirSync>;
    try {
        entries = readdirSync(dir, { withFileTypes: true });
    } catch {
        return out;
    }
    for (const entry of entries) {
        // skip dotfolders (incl. .vuepress) and dependencies
        if (entry.name.startsWith('.') || entry.name === 'node_modules') continue;
        const full = nodePath.join(dir, entry.name);
        if (entry.isDirectory()) {
            collectMarkdownFilesReferencing(full, needle, out);
        }
        else if (entry.name.endsWith('.md')) {
            try {
                if (readFileSync(full, 'utf-8').includes(needle)) out.push(full);
            } catch { /* unreadable file — ignore */ }
        }
    }
    return out;
}

const watchCodeSamplesPlugin = {
    name: 'needle:watch-code-samples',
    apply: 'serve' as const,
    configureServer(server: any) {
        const samplesDir = nodePath.resolve(__dirname, 'public', 'code-samples');
        const docsDir = nodePath.resolve(__dirname, '..');

        /*
          Vite builds its `publicFiles` set once at startup, so a sample added
          afterwards 404s until the server restarts. Reading from disk per
          request avoids that. Registered directly (not via a returned
          function) so it runs before Vite's own static middleware.

          Dev only — production builds copy `public/` verbatim, which is what
          keeps the printed code byte-identical to the code that runs.
        */
        server.middlewares.use((req: any, res: any, next: any) => {
            const url: string = (req.url || '').split('?')[0];
            const marker = '/code-samples/';
            const at = url.indexOf(marker);
            if (at === -1) return next();

            const rel = decodeURIComponent(url.slice(at + marker.length));
            const target = nodePath.resolve(samplesDir, rel);
            // stay inside the samples dir
            if (!target.startsWith(samplesDir) || !existsSync(target)) return next();

            const type = target.endsWith('.html') ? 'text/html'
                : target.endsWith('.js') ? 'text/javascript'
                    : target.endsWith('.css') ? 'text/css'
                        : 'application/octet-stream';
            res.setHeader('Content-Type', `${type}; charset=utf-8`);
            res.setHeader('Cache-Control', 'no-cache');
            res.end(readFileSync(target));
        });

        server.watcher.add(samplesDir);

        server.watcher.on('change', (file: string) => {
            const normalized = file.split(nodePath.sep).join('/');
            if (!normalized.includes('/code-samples/')) return;

            // 1. Recompile pages that print this file, so the snippet is current.
            const stamp = new Date();
            for (const md of collectMarkdownFilesReferencing(docsDir, `@code/${nodePath.basename(file)}`)) {
                try { utimesSync(md, stamp, stamp); } catch { /* ignore */ }
            }

            // 2. Reload the page, so embedded iframes re-fetch the scene.
            server.ws.send({ type: 'full-reload' });
        });
    },
};

const _title = "Needle Engine Documentation";
const _description = "Needle Engine is a web-based runtime for 3D apps. It runs on your machine for development, and can be deployed anywhere. It is flexible, extensible, and collaboration and XR come naturally. Needle Exporter for Unity bridges the Unity Editor and the web runtime. It helps you to export your assets, animations, lightmaps and so on to the web. It is built around the glTF standard for 3D assets.";
const _previewImg = "preview.jpeg";

// https://css-tricks.com/essential-meta-tags-social-media/
// https://ogp.me/


function renderMarkdown(content: string): any {
    try {
        content = content.replace(/\{@link\s+([^ ]+)(?:\s+([^\}]*))?\}/g, function (match, p1, p2) {
            if (!p1 && !p2) return match;

            // console.log("MATCH", content, match, p1, p2);
            p1 = p1.replace(/^\s+|\s+$/g, '');

            if (p2) {
                // remove newlines and whitespaces at the beginning and end
                p2 = p2.replace(/^\s+|\s+$/g, '');
                return `[${p2.trim()}](${p1.trim()})`;
            }

            return `[${p1.trim()}](${p1.trim()})`;
        });

        // TODO support inline better, right now becomes a paragraph

        const processed = fromMarkdown(content);
        const hast = toHast(processed,
            // Could turn the code samples into nice formatted code again here... inception
            // from https://github.com/shikijs/shiki/blob/644a244aad3513f68c9037d9c46ae6a6a04068ca/packages/vitepress-twoslash/src/renderer-floating-vue.ts#L136
            /*
            {
                handlers: {
                  code: (state, node) => {
                    const lang = node.lang || ''
                    if (lang) {
                      return <Element>{
                        type: 'element',
                        tagName: 'code',
                        properties: {},
                        children: codeToHast(
                          node.value,
                          {
                            ...this.options,
                            transformers: [],
                            lang,
                            structure: node.value.trim().includes('\n') ? 'classic' : 'inline',
                          },
                        ).children,
                      }
                    }
                    return defaultHandlers.code(state, node)
                  },
                },
              },
              */
        );
        return (hast as Element).children;
    } catch (e) {
        console.warn("Error in markdown rendering", e);
        return content;
    }
}



const defaultThemeOpts: DefaultThemeOptions = {
    // repo: "needle-tools/needle-engine-support", // this only adds the github link
    docsRepo: "needle-tools/needle-engine-support",
    docsBranch: "main",
    docsDir: "documentation",
    logo: "/needle-logo-black.svg",
    logoDark: "/needle-logo-white.svg",
    colorModeSwitch: true,
    colorMode: "light",
    lastUpdated: true, // useful for locally testing / seeing which pages are outdated
    contributors: false,
    editLink: true,
    editLinkText: "Suggest changes",
    externalLinkIcon: true,
    notFound: [
        "Oh no — this page does not exist!",
        "Gosh! You found a 🌵 glitch",
    ],
    themePlugins: {
        backToTop: false,
        prismjs: false,
        linksCheck: {
            dev: true,
            build: 'error',
        }
    },
    navbar: [
        {
            text: 'Getting Started',
            link: '/getting-started/',
        },
        {
            text: 'Tutorials',
            link: '/tutorials/',
        },
        {
            text: 'How-To Guides',
            link: '/how-to-guides/',
        },
        {
            text: 'Explanation',
            link: '/explanation/',
        },
        {
            text: 'Reference',
            link: '/reference/',
        },
        {
            text: "Help",
            link: '/help/',
        },
    ],
    sidebar: false,
};

/*
const siteLocaleOptions: SiteLocaleConfig & LocaleConfig<{ selectLanguageName: string }> = {
    '/': {
        lang: 'en-US',
        selectLanguageName: 'English',
    },
    "/lang/zh/": {
        lang: 'zh-CN',
        selectLanguageName: "简体中文",
        title: "Needle Engine 文档",
    },
    "/lang/es/": {
        lang: 'es-ES',
        selectLanguageName: "Español",
        title: "Documentación de Needle Engine",
    },
    "/lang/pt/": {
        lang: 'pt-BR',
        selectLanguageName: "Português",
        title: "Documentação do Needle Engine",
    },
    "/lang/fr/": {
        lang: 'fr-FR',
        selectLanguageName: "Français",
        title: "Documentation de Needle Engine",
    },
    "/lang/hi/": {
        lang: 'hi-IN',
        selectLanguageName: "हिन्दी",
        title: "Needle Engine दस्तावेज़",
    },
    "/lang/ja/": {
        lang: 'ja-JP',
        selectLanguageName: "日本語",
        title: "Needle Engine ドキュメント",
    },
    "/lang/de/": {
        lang: 'de-DE',
        selectLanguageName: "Deutsch",
        title: "Needle Engine Dokumentation",
    },
    "/lang/vn/": {
        lang: 'vn-VN',
        selectLanguageName: "Tiếng Việt",
        title: "Tài liệu Needle Engine",
    },
};

// Insert locale urls into the default theme options
const rootLanguageDirectory = path.resolve(process.cwd(), "./documentation");
if (existsSync(rootLanguageDirectory)) {
    for (const key of Object.keys(siteLocaleOptions)) {
        if (!defaultThemeOpts.locales) defaultThemeOpts.locales = {};
        if (!defaultThemeOpts.locales[key]) defaultThemeOpts.locales[key] = {
            selectLanguageName: siteLocaleOptions[key].selectLanguageName,
        };
        const baseUrl = key.endsWith("/") ? key.substring(0, key.length - 1) : key;
        const navigation = defaultThemeOpts.navbar;
        if (navigation) {
            for (let i = 0; i < navigation.length; i++) {
                const item = navigation[i];
                if (!item) continue;
                if (!defaultThemeOpts.locales[key].navbar) defaultThemeOpts.locales[key].navbar = [];
                const target = defaultThemeOpts.locales[key].navbar;
                copyNavigationItemsForLanguage(item, target, i, baseUrl);
            }
        }
        const sidebar = defaultThemeOpts.sidebar;
        if (sidebar) {
            for (const key2 of Object.keys(sidebar)) {
                const item = sidebar[key2];
                if (!item) continue;
                if (!defaultThemeOpts.locales[key].sidebar) defaultThemeOpts.locales[key].sidebar = {};
                const target = defaultThemeOpts.locales[key].sidebar;
                target[key2] = [];
                for (let i = 0; i < item.length; i++) {
                    const subItem = item[i];
                    if (!subItem) continue;
                    copyNavigationItemsForLanguage(subItem, target[key2], i, baseUrl);
                }
            }
        }
    }
    function copyNavigationItemsForLanguage<T extends NavbarGroupOptions | NavbarLinkOptions>(source: T, target: Array<T>, index: number, languagePath: string) {


        if (typeof source === "string") {
            if (source.startsWith("/") && source.length > 1) {
                const newUrl = languagePath + source;
                const fullLocalPath = path.resolve(rootLanguageDirectory + (newUrl.endsWith("/") ? "/index.md" : newUrl + ".md"));
                if (existsSync(fullLocalPath)) {
                    target[index] = newUrl as any;
                }
                else {
                    console.warn("File does not exist", fullLocalPath);
                    target[index] = source as any;
                }
            }
            else {
                target[index] = source;
            }
        }
        else if (source && typeof source === "object") {
            if (source.link) {
                const link = source.link;
                if (link.startsWith("/")) {
                    const newUrl = languagePath + source.link;
                    const newEntry = {
                        ...source,
                        link: newUrl,
                    }
                    target[index] = newEntry as any;
                    const fullLocalPath = path.resolve(rootLanguageDirectory + (newUrl.endsWith("/") ? "/index.md" : newUrl + ".md"));
                    if (!existsSync(fullLocalPath)) {
                        newEntry.link = link;
                        console.warn("File does not exist", fullLocalPath);
                    }
                }
                else {
                    target[index] = { ...source };
                }
            }
            if ("children" in source && source.children) {
                const newBasePath = languagePath + (source.prefix || "");
                const copy = {
                    ...source,
                    text: source.text,
                    children: []
                } as unknown as any;
                target[index] = copy;

                for (let i = 0; i < source.children.length; i++) {
                    const child = source.children[i];
                    if (!child) continue;
                    copyNavigationItemsForLanguage(child, copy.children, i, newBasePath);
                }
            }
        }
        else {
            console.error("Unknown type", source);
        }
    }
}
*/

const patterns: string[] = [
    // default patterns
    '**/*.md',
    '!.vuepress',
    '!node_modules',
    // exclude pages that start with _ and end with .md
    '!**/_*.md',
];

if (process.env.NODE_ENV === "development") {
    console.log("Development mode: Excluding all language files");
    // in development, we want to include all language files
    patterns.push('!**/lang/**/*.md');
}


export default defineUserConfig({
    base: _base,
    lang: 'en-US',
    title: 'docs',
    dest: "dist",
    /*
      Builds write to their own temp and cache directories, so running
      `docs:build` while `docs:dev` is up no longer rewrites the dev server's
      state underneath it. Sharing them made the running dev server serve a
      blank page, or throw `__GA_OPTIONS__ is not defined` — the Google
      Analytics client config is registered on build but not in dev.
    */
    temp: nodePath.resolve(__dirname, isBuild ? '.temp-build' : '.temp'),
    cache: nodePath.resolve(__dirname, isBuild ? '.cache-build' : '.cache'),
    description: _description,
    pagePatterns: patterns,
    // locales: siteLocaleOptions,
    plugins: [
        // searchPlugin({
        // }),
        // @ts-ignore
        docsearchPlugin({
            appId: "2LT25GG3KX",
            apiKey: "389be16f732f82c611e1b0f22c031dff",
            indexName: "engine-needle",
            injectStyles: true,
            // initialQuery: "scripting",
        }),
        sitemapPlugin({
            hostname: _url,
            devServer: true,
            changefreq: "weekly",
            excludePaths: [
                "/meta-test.html",
                "/backlog.html",
                "/backlog-mermaid.html",
            ],
        }),
        //@ts-ignore
        // pwaPlugin(),
        // mermaidPlugin({}),
        registerComponentsPlugin({
            componentsDir: path.resolve(__dirname, './components'),
        }),
        // videoplayer
        generateMetaPlugin,
        includeSampleCode,
        fetchEngineData,
        // generateSharedCode, // Disabled: community contributions from GitHub discussions
        modifyHtmlMeta,
        copyMarkdown,
        generateLlms({ baseUrl: _url }),
        //@ts-ignore
        googleAnalyticsPlugin({
            id: "G-V2Q445L3XQ",
            debug: false,
        }),
        (args, ctx) => {
            return {
                name: "kill-broken-pages",
                onInitialized: async (app) => {
                    // for (const page of app.pages) {
                    //     if (!page.filePathRelative) {
                    //         // This one is allowed – only one that is expected to come from a virtual page
                    //         if (page.path === "/404.html") continue;
                    //         console.error("Broken page", page.path);
                    //     }
                    // }
                    const nonBrokenPages = app.pages.filter(x => x.filePathRelative);
                    const nonBrokenLinks = nonBrokenPages.map(x => x.filePathRelative);
                    let allLinks = app.pages.flatMap(x => x.links).map(x => x.relative);
                    allLinks = allLinks.map(x => x.endsWith("/") ? x + "index.md" : x);
                    const missingLinks = allLinks.filter(x => !nonBrokenLinks.includes(x));
                    if (missingLinks.length > 0) {
                        console.error("Missing Links found:", missingLinks); //, allLinks, nonBrokenLinks);
                    }
                    /*
                    console.log("app", app.pages.map(x => {
                        if (!x.filePathRelative) {
                            console.error("Broken page", x.path);
                        }return { path: x.path, data: { ...x, content: undefined, contentRendered: undefined, ...x.routeMeta }, eData: { ...x.data } }}));
                    */
                },
                onPrepared: async (app: App) => {
                },
            }
        },
        shikiPlugin({
            langs: ['ts', 'tsx', 'js', 'jsx', 'svelte', 'json', 'vue', 'md', 'mermaid', 'csharp', 'cs', 'bash', 'html', 'css'],
            themes: { light: 'one-light', dark: 'material-theme' },
            lineNumbers: false,
            highlightLines: false,
            // Disabled because Shiki for vuepress is deprecated:
            // https://github.com/shikijs/shiki/blob/9cd269d9b3358680413ca0f5cc8d2b5636a86eae/docs/guide/migrate.md?plain=1#L50
            // > `vuepress-plugin-shiki` is deprecated as [VuePress](https://github.com/vuejs/vuepress#status) 
            // > is no longer recommended. Its successor [VitePress](https://vitepress.dev/) has a built-in 
            // > Shiki integration.
            // We should look into bringing Shiki back after the migration to vitepress.
            /** @ts-ignore */
            __transformers: [
                // https://twoslash.netlify.app/refs/options#compiler-options
                // complex example: https://github.com/shikijs/shiki/blob/644a244aad3513f68c9037d9c46ae6a6a04068ca/packages/vitepress-twoslash/src/renderer-floating-vue.ts#L50
                transformerTwoslash({
                    renderer: rendererRich({
                        jsdoc: true,
                        renderMarkdown: renderMarkdown,
                        renderMarkdownInline(markdown, context) {
                            return renderMarkdown(markdown);
                        },
                    }),
                    twoslashOptions: {
                        handbookOptions: {
                            noErrorsCutted: true,
                            noErrors: [
                                2532, // Object is possibly 'undefined'
                                2304, // cannot find name
                            ],
                        },
                        compilerOptions: {
                            experimentalDecorators: true,
                        }
                    },
                    explicitTrigger: true, // set to true to debug individual code snippets
                    onTwoslashError: (e, code) => {
                        console.warn("\n-----------\n", "Twoslash error\n", e, "in:\n", code, "\n-----------\n");
                    },
                }),
            ]
        }) as any,
        markdownChartPlugin({
            // Enable Mermaid
            mermaid: true,
        }),
        markdownContainerPlugin({
            type: 'file',
            before: (info) => `<div class="file"><dt>${info}</dt><dd>`,
            after: () => '</dd></div>',
        }),
        markdownContainerPlugin({
            type: 'file-tree',
            before: (info) => `<filetree ${info}>`,
            after: () => '</filetree>',
        }),
    ],
    head: [
        ['link', { rel: 'icon', href: _url + '/icons/favicon.ico' }],
        ['link', { rel: 'manifest', href: 'manifest.webmanifest' }],
        ['meta', { name: 'theme-color', content: '#3eaf7c' }],

        ['meta', { property: "og:title", content: _title }],
        ['meta', { property: "og:type", content: "website" }],
        // this is inserted via the html-meta plugin from the frontmatter description
        // ['meta', { property: "og:description", content: _description }],
        ['meta', { property: "og:image", content: _url + "/" + _previewImg }],
        ['meta', { property: "og:url", content: _url }],
        ['meta', { property: "twitter:card", content: "summary_large_image" }],

        // stackblitz
        ['script', { src: 'https://unpkg.com/@stackblitz/sdk/bundles/sdk.umd.js' }],
        ['script', { src: 'https://analytics-2.needle.tools/api/script.js', defer: "", "data-site-id": "28921995b35b" }],

        // WebMCP (document.modelContext) ships behind an origin trial in Chrome and Edge.
        // Without a token for this origin the API is simply absent there and the tool
        // registration in webmcp.ts no-ops. Register the origin at
        // https://developer.chrome.com/origintrials and put the token in .env.
        ...(process.env.WEBMCP_ORIGIN_TRIAL_TOKEN
            ? [['meta', { 'http-equiv': 'origin-trial', content: process.env.WEBMCP_ORIGIN_TRIAL_TOKEN }]]
            : []) as any,

    ],
    markdown: {
        importCode: {
            handleImportPath: (str) =>
                str.replace(/^@code/, path.resolve(__dirname, 'public', 'code-samples')),
        },
        slugify: (str) => cleanLink(str),
        headers: {
            // https://v2.vuepress.vuejs.org/reference/config.html#markdown-headers
            format: (link) => cleanHeader(link),
        },
    },
    bundler: viteBundler({
        viteOptions: {
            plugins: [watchCodeSamplesPlugin],
            /*
              Prebundle the heavy dependencies at server start.

              Every component is registered with defineAsyncComponent, so these
              are not imported until a component using them first renders. Vite
              then discovers a new dependency mid-session, re-optimizes and
              forces a reload — and that reload re-evaluates @vuepress/client,
              whose clientDataSymbol is a fresh `Symbol()` each evaluation. The
              app root provided under the old symbol, so the next component to
              inject gets undefined and throws "useClientData() is called
              without provider". Listing them here means they are found up
              front and the mid-session reload never happens.
            */
            optimizeDeps: {
                /*
                  @needle-tools/engine and three are deliberately NOT listed.
                  Prebundling makes esbuild resolve every import in them, and
                  the installed engine imports
                  three/examples/jsm/loaders/HDRLoader.js, which does not exist
                  in the three it ships with — so the dev server fails to
                  start. They stay lazy.
                */
                include: ['markdown-it', 'vue-github-button'],
            },
        },
    }),
    extendsMarkdown: (md) => {
        // Custom image renderer for high-DPI images
        const defaultImageRenderer = md.renderer.rules.image || md.renderer.renderToken.bind(md.renderer);
        md.renderer.rules.image = (tokens, idx, options, env, self) => {
            const token = tokens[idx];
            const src = token.attrGet('src');
            const alt = token.content;
            const title = token.attrGet('title');

            if (title === '2x') {
                token.attrSet('title', '');
                return `<img src="${src}" srcset="${src} 2x" alt="${alt}">`;
            } else if (title === '1.5x') {
                token.attrSet('title', '');
                return `<img src="${src}" srcset="${src} 1.5x" alt="${alt}">`;
            } else {
                return defaultImageRenderer(tokens, idx, options, env, self);
            }
        };
    },
    theme: defaultTheme(defaultThemeOpts),
    /*
    alias: {
        '@theme/VPSidebarItem.vue': path.resolve(__dirname, 'components/theme/SidebarItem.vue'),
    },
    */
})

/*
{
    '@theme/SidebarItem': path.resolve(__dirname, 'components/theme/SiderbarItem.vue'),
}
*/